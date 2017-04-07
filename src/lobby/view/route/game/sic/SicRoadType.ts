module lobby.view.route.game.sic {
	export class SicRoadType extends egret.EventDispatcher{
		public static BIG_SMALL	:	string 	= 	"BIG_SMALL";			//大小
		public static ODD_EVEN	:	string 	= 	"ODD_EVEN";				//单双
		public static TIE			:	string 	= 	"TIE";					//和值
		public static BEAD		:	string 	= 	"BEAD";					//珠仔
		
		public constructor() {
			super();
		}
	}
}