module socket {
	export interface ITCPSocketSink {
		
		/**
		 *	正在连接 
		 * @param uSocketID
		 * 
		 */		
        onCTCPSocketConnecting(_uSocketID:number) : void;
		
		/**
		 *	连接成功 
		 * @param uSocketID
		 * 
		 */	
        onCTCPSocketConnected(_uSocketID:number) : void;
		
		/**
		 *	关闭连接 
		 * @param uSocketID
		 * @param cmd
		 * 
		 */		
        onCTCPSocketClose(_uSocketID:number, _cmd:number) : void;
		
		/**
		 *	收到数据 
		 * @param uSocketID
		 * @param oData
		 * 
		 */	
        onCTCPSocketRead(_uSocketID:number, _tagTCPData:ITagTCPData) : void;
		
		/**
		 *	连接错误 
		 * @param uFail
		 * 
		 */
		onCTCPSocketError(_iFail:number) : void;
		
		
		destroy():void;
		

	}
}