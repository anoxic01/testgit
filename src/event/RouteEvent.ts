module event {
	export class RouteEvent extends Event {
		
		public static const ASK_ROAD:String = "ASK_ROAD";
		public static const ASK_Road_END:String = "ASK_Road_END";
		public var data:Object;

		public constructor(type:String, data:Object ,  bubbles:Boolean=false, cancelable:Boolean=false) {
			super(type, bubbles, cancelable);
			this.data = data;
		} 
		
		public override function clone():Event 
		{ 
			return new RouteEvent(type, data, bubbles, cancelable);
		} 
		
		public override function toString():String 
		{ 
			return formatToString("RouteEvent", "type", "data" ,"bubbles", "cancelable", "eventPhase"); 
		}
		
	}
	
}