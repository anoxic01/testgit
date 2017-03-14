module event {
	export class SocketDataEvent extends egret.Event{

		public static const  CONNECTING:String = "connecting";			//連線成功
		public static const  CLOSE:String = "close";					//連線關閉
		public static const  IO_ERROR:String = "IO_ERROR";             //連線失敗,網路或伺服器問題,或者ip錯誤
		public static const  Security_Error:String = "Security_Error";  //安全性錯誤
		public static const  DATA_RESPONSE:String = "DATA_RESPONSE";  //資料回傳
		public static const	 WEB_DATA:String = "WEB_DATA";				//web資料
		
		public var data:Object;  //傳遞的資料
		
		
		public constructor( type:string, data:Object = null , bubbles:Boolean=false, cancelable:Boolean=false) {
			super(type,bubbles,cancelable);
			this.data = data;
		}
		
		public override function clone():Event 
		{ 
			return new SocketDataEvent(type, bubbles, cancelable);
		} 
		
		public override function toString():String 
		{ 
			return formatToString("SocketDataEvent", "type", "bubbles", "cancelable", "eventPhase"); 
		}
		
	}
}