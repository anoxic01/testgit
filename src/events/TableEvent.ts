module events {
	export class TableEvent extends egret.Event{
		
		public static CHANGE	:	string	=	"change";
		
		public constructor(type:string, bubbles: boolean=false, cancelable: boolean=false) {
			super(type, bubbles, cancelable);
		}
	}
}