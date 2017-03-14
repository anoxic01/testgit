module event {
	export class TableEvent {
		
		public static const CHANGE	:	String	=	"change";
		
		public constructor(type:String, bubbles:Boolean=false, cancelable:Boolean=false) {
			super(type, bubbles, cancelable);
		}
	}
}