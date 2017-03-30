module events {
	export class SocketDataEvent extends egret.Event{

		public static CONNECTING:string = "connecting";			//連線成功
		public static CLOSE:string = "close";					//連線關閉
		public static IO_ERROR:string = "IO_ERROR";             //連線失敗,網路或伺服器問題,或者ip錯誤
		public static Security_Error:string = "Security_Error";  //安全性錯誤
		public static DATA_RESPONSE:string = "DATA_RESPONSE";  //資料回傳
		public static WEB_DATA:string = "WEB_DATA";				//web資料
		
		public data:Object;  //傳遞的資料
		
		
		public constructor( type:string, data:Object = null , bubbles: boolean=false, cancelable: boolean=false) {
			super(type,bubbles,cancelable);
			this.data = data;
		}
		
		public  clone():egret.Event 
		{ 
			return new SocketDataEvent(this.type, this.bubbles, this.cancelable);
		} 
		
		// public  toString():string 
		// { 
		// 	return formatToString("SocketDataEvent", "type", "bubbles", "cancelable", "eventPhase"); 
		// }
		
	}
}