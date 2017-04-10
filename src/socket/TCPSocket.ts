module socket {
	export class TCPSocket {
		private MAX_BUFFER_CAPACITY			:	number 	= 	this.MAX_PACKET_SIZE * 2; //128K					//最大缓冲
		private MAX_PACKET_CONTENT_LENGTH		:	number 	= 	this.MAX_PACKET_SIZE - SocketHeader.HEADER_LEN;	//PayLoadData Length
		private MAX_PACKET_SIZE				:	number 	= 	1024  * 400 ;  //400K						//最大数据
		
		private static m_uIdSeed				:	number;													//通讯序号
		private m_uID							:	number;													//连接序号
		
		private m_sServerIP						:	string;													//连接地址
		private m_iServerPort					:	number;													//连接端口
		
		private m_uProductID					:	number;													//产品序号
		private m_uVersionNumber				:	number;													//版本数字
		
		private m_tcpSocketSink					:	ITCPSocketSink;											//数据调度
		
		//****************************************************************************************************************
		private PACKET_HEADER_LEN				:	number 	= 	SocketHeader.HEADER_LEN;					//包头长度
		
		public m_socket							:	WebSocket;													//连接对象
		public DebugMode						:	Boolean;												//输出状态，用全局变量替换
		
		private m_byteBuffer					:	egret.ByteArray;												//缓冲数据
		private m_uHead							:	number;													//针头位置
		private m_uLength						:	number;													//数据长度（缓冲区未读取的部分）
		private m_uWriteOffset					:	number;													//偏移位置(缓冲区已读取的部分)
		private free							:	number;													//剩余缓冲，读取数据缓存区剩余的空间
		
		private m_uState						:	number;													//解析状态
		private requireLen						:	number;													//数据长度（从包头信息里获取的长度）
		
		public constructor(tcpSocketSink:ITCPSocketSink, uProductID:number, uVersionNumber:number) {
			this.m_tcpSocketSink = tcpSocketSink;
			
			this.m_byteBuffer = 	new egret.ByteArray();
			this.m_byteBuffer[this.MAX_BUFFER_CAPACITY] = 0;//在as中这样定义貌似没什么用，因为数组所占内存的大小是动态的不会自动处理“越界”
			
			this.m_socket = new WebSocket();
			this.configureListeners();
			
			this.m_uID = TCPSocket.m_uIdSeed++;
			this.m_uProductID = uProductID;
			this.m_uVersionNumber = uVersionNumber;
			
			this.free = this.MAX_BUFFER_CAPACITY;
		}
		
		public destroy():void
		{
			if ( this.DebugMode )
			{
				//console.log("socket connected = " + this.connected);
			} 
			
//			removeListeners();
			if(this.m_tcpSocketSink){
				this.m_tcpSocketSink = null;
			}
			if(this.m_socket){
				if(this.m_socket.connected){
					this.m_socket.close();
				}
				
				this.m_socket = null;
			}
			
			if(this.m_byteBuffer){
				this.m_byteBuffer.clear();
				this.m_byteBuffer = null;
			}
			this.m_sServerIP = null;
			//this.findPacket = null;
		}
		
		public setTcpSocketSink(tcpSocketSink:ITCPSocketSink):void{
			if(this.m_tcpSocketSink){
				this.m_tcpSocketSink = null;
			}
			this.m_tcpSocketSink = tcpSocketSink;
		}
		
		public connect(sServerIP:string, iServerPort:number):void
		{
			this.m_sServerIP = sServerIP;
			this.m_iServerPort = iServerPort;
			this.m_socket.connect(this.m_sServerIP, this.m_iServerPort);
		} 
		
		public isConnected():boolean
		{
			return this.m_socket.connected;
		}
		
		public getUid():number
		{
			return this.m_uID;
		}
		
		public send(byteBuf:egret.ByteArray, uOff:number, uLen:number):void
		{
			if ( this.m_socket.connected )
			{
				
				this.m_socket.writeBytes(byteBuf, uOff, uLen );
				
				this.m_socket.flush();			
			}
			else
			{
				if(this.m_tcpSocketSink){
					this.m_tcpSocketSink.onCTCPSocketError(SocketDefine.SEND_FAIL);
				}
			} 
		} 
		
		private socketDataHandler(event:ProgressEvent):void
		{
			
			if ( this.DebugMode )
			{
				//console.log("Socket bytesAvailable =" + bytesAvailable);
			}
			
			var _recvLen : number = this.m_socket.bytesAvailable;  //資料長度
			
			// when buffer use over half, move unhandle data to buffer's head part
			if ( this.m_uWriteOffset > (this.MAX_BUFFER_CAPACITY * 0.5) )
			{
				var i:number = 0;
				var j:number = 0;
				var tmpBuf:egret.ByteArray = new egret.ByteArray();
				
				tmpBuf.writeBytes( this.m_byteBuffer , this.m_uHead , this.m_uLength );
				this.m_byteBuffer = tmpBuf;				
				
				this.free += this.m_uHead;
				this.m_uHead = 0;
				this.m_byteBuffer.length   = this.m_uLength;
				this.m_byteBuffer.position = this.m_uLength;
				this.m_uWriteOffset     = this.m_uLength;
			} 
			
			// Recv data from socket
			//recv.call(null, buffer, writeOffset, recvLen);
			this.recv(this.m_byteBuffer, this.m_uWriteOffset, this.m_socket.bytesAvailable);
			
			if ( _recvLen > 0 )
			{
				this.m_uWriteOffset += _recvLen;
				this.m_uLength += _recvLen;
				this.free -= _recvLen;
				
				// handle the data and find packet
				this.parseData();
			}
			else
			{
				// do not to parse data
			}
			
			if ( this.DebugMode )
			{
				//console.log("buffer length = " + buffer.length + ", length = " + length + ", head = " + head + ", requireLen = " + requireLen + ", writeOffset = " + writeOffset);
			}
		}
		
		public recv(byteBuf:egret.ByteArray, uOff:number, uReadLen:number):void
		{
			if ( this.m_socket.connected )
			{
				// do read data
				if ( uReadLen <= this.m_socket.bytesAvailable )
				{
					this.m_socket.readBytes(byteBuf, uOff, uReadLen);
				}
			}
			else
			{
				if(this.m_tcpSocketSink){
					this.m_tcpSocketSink.onCTCPSocketError(SocketDefine.RECV_FAIL);
				}
			}
		}
		
		/*
		*	find a vaild packet from buffer and dispatch event to info packet level that find packet 
		*/
		private parseData():void
		{
			var offset:number;					//現在處理到的資料索引位置(缓冲区数据的偏移量，就是已读取的部分)
			var findeHeader:Boolean = false;	//是否找到包头
			
			offset = this.m_uHead;  
			
			while ( true )
			{
				if(this.m_byteBuffer == null ){
					return;
				}
				
				switch ( this.m_uState )
				{
					case 0:
						// find a vaild header
						// 1. check if enough header length
						// 2. check first byte is 0x55 ?
						// 3. check second byte is 0xAA ?
						// 4. check packet content size > MAX_PACKET_CONTENT_LENGTH ?
						
						findeHeader = false;
						
						while ( (offset + this.PACKET_HEADER_LEN <= this.m_uWriteOffset) && SocketHeader.checkHeader(this.m_byteBuffer , offset )  )
						{
							findeHeader =  true;
							offset++;
						}
						
						if ( findeHeader ) {
							offset -= 1;
						}
						
						if ( offset + this.PACKET_HEADER_LEN > this.m_uWriteOffset )
						{
							// data not enough, wait enough data then process
							this.m_uHead = offset;
							this.m_uLength = this.m_uWriteOffset - this.m_uHead;
							return;
						}
						else
						{
							// Find valid header
							this.requireLen = SocketHeader.getPayLoadDataLength( this.m_byteBuffer , offset);
							this.m_uState = 1;
						} /* end while */
						
						break;
					case 1:
						if ( (this.m_uWriteOffset - (offset + this.PACKET_HEADER_LEN) >= this.requireLen) && (this.requireLen > 0) )
						{
							// find a complete packet
							// 1. read this complete packet from buffer
							// 2. delete this complete packet from buffer(rest buffer, head, length)
							// 3. set state = 0
							
							if(this.m_tcpSocketSink){
								this.m_tcpSocketSink.onCTCPSocketRead(this.m_uID,new TagTCPData(this.m_byteBuffer, offset, this.PACKET_HEADER_LEN + this.requireLen));
							}
							
							this.m_uLength = this.m_uWriteOffset - (offset + this.PACKET_HEADER_LEN + this.requireLen);
							this.m_uHead = offset + this.PACKET_HEADER_LEN + this.requireLen;
							
							this.requireLen = 0;
							offset = this.m_uHead;
							this.m_uState = 0;
						}
						else
						{
							// data not enough, wait enough data then process
							return;
						}
						
						break;
					default:
						// error handle, unable to execute here
						break;
				} 
			} 
		} 
		
		private configureListeners():void
		{
			if(this.m_socket){
				this.m_socket.addEventListener(Event.CLOSE, this.closeHandler);
				this.m_socket.addEventListener(Event.CONNECT, this.connectHandler);
				this.m_socket.addEventListener(ProgressEvent.SOCKET_DATA, this.socketDataHandler);
				this.m_socket.addEventListener(IOErrorEvent.IO_ERROR, this.ioErrorHandler);
				this.m_socket.addEventListener(SecurityErrorEvent.SECURITY_ERROR, this.securityErrorHandler);
			}
		} 
		
		private removeListeners():void
		{
			if(this.m_socket){
				this.m_socket.removeEventListener(egret.Event.CLOSE, this.closeHandler);
				this.m_socket.removeEventListener(egret.Event.CONNECT, this.connectHandler);
				this.m_socket.removeEventListener(egret.ProgressEvent.SOCKET_DATA, this.socketDataHandler);
				this.m_socket.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.ioErrorHandler);
				this.m_socket.removeEventListener(egret.SecurityErrorEvent.SECURITY_ERROR, this.securityErrorHandler);
			}
		} 
		
		private connectHandler(event:Event):void
		{
			if(this.m_tcpSocketSink){
				this.m_tcpSocketSink.onCTCPSocketConnected(this.m_uID);
			}
		}
		
		private closeHandler(event:Event):void
		{
			console.log("Gateway disconnect!!!!!");
			
			if(this.m_tcpSocketSink){
				this.m_tcpSocketSink.onCTCPSocketClose(this.m_uID,SocketDefine.GATEWAY_DISCONNECT);
			}
		} 
		
		private ioErrorHandler(event:IOErrorEvent):void
		{
			if(this.m_tcpSocketSink){
				this.m_tcpSocketSink.onCTCPSocketError(SocketDefine.CONNECT_FAIL);
			}
		} 
		
		private securityErrorHandler(event:SecurityErrorEvent):void
		{
			if(this.m_tcpSocketSink){
				this.m_tcpSocketSink.onCTCPSocketError(SocketDefine.SOCKET_SECURITY_ERROR);
			}
		}
		
	}
}