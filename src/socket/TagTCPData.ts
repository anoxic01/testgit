module socket {
	export class TagTCPData implements ITagTCPData{

		private m_byteHeader			:	egret.ByteArray = new egret.ByteArray();		//包头数据
		private m_byteContent			:	egret.ByteArray = new egret.ByteArray();		//包体数据
		private m_byteBuffer			:	egret.ByteArray;							//缓冲数据
		
		private m_uPacketHead			:	number;								//针头位置
		private m_uPacketLen			:	number;								//截取数据
		private m_uContentLen			:	number;								//包体长度
		private m_uPacketSerialNumber	:	number	=	0;						//数据序号
		
		public constructor(_byteBuffer:egret.ByteArray, _uPacketHead:number, _uPacketLen:number) {
			
			this.m_byteBuffer = _byteBuffer;
			this.m_uPacketHead = _uPacketHead;
			this.m_uPacketLen  = _uPacketLen;
			this.m_uContentLen = _uPacketLen - SocketHeader.HEADER_LEN;
			
			//setPacketSerialNumber();
			this.setHeader();
			this.setContent();
			
		}

		
		public destroy():void{
			
			if(this.m_byteBuffer){
				this.m_byteBuffer = null;
			}
			
			if(this.m_byteHeader){
				this.m_byteHeader.clear();
				this.m_byteHeader = null;
			}
			
			if(this.m_byteContent){
				this.m_byteContent.clear();
				this.m_byteContent = null;
			}
			
		}
		
		public getContent():egret.ByteArray
		{
			return this.m_byteContent;
		}
		
		public getHeader():egret.ByteArray
		{
			return this.m_byteHeader;
		}
		
		public getPacketSerialNumber():number
		{
			return this.m_uPacketSerialNumber;
		}
		
		public getPacketHead():number {
			return this.m_uPacketHead;
		}
		
		public getContentSize():number
		{
			return this.m_uContentLen;
		}
		
		public getPacketSize():number
		{
			return this.m_uPacketLen;
		}
		
		private setPacketSerialNumber():void
		{
			this.m_uPacketSerialNumber  = (this.m_byteBuffer[this.m_uPacketHead+5]) << 8;
			this.m_uPacketSerialNumber += (this.m_byteBuffer[this.m_uPacketHead+6]);
		} 
		
		private setHeader():void
		{
			var _i:number;
			var _j:number;
			
			for ( _i = this.m_uPacketHead; _i < this.m_uPacketHead + SocketHeader.HEADER_LEN; _i++ )
			{
				this.m_byteHeader[_j] = this.m_byteBuffer[_i];
				_j++;
			}
		}
		
		/**
		 * pay load data內容
		 */
		private setContent():void
		{
			var _i:number;
			var _j:number;
			
			for ( _i = this.m_uPacketHead + SocketHeader.HEADER_LEN; _i < this.m_uPacketHead + this.m_uPacketLen; _i++ )
			{
				this.m_byteContent[_j] = this.m_byteBuffer[_i];
				_j++;
			} 
		}
	}
}