module events {
	export class RouteEvent extends egret.Event {
		
		public static  ASK_ROAD:string = "ASK_ROAD";
		public static  ASK_Road_END:string = "ASK_Road_END";
		public data;

		public constructor(type:string, data ,  bubbles: boolean=false, cancelable: boolean=false) {
			super(type, bubbles, cancelable);
			this.data = data;
		} 
		
		public  clone():egret.Event 
		{ 
			return new RouteEvent(this.type, this.data, this.bubbles, this.cancelable);
		} 
		
	}
	
}