module lobby.view.route.game.sic {
	export class SicRoadType extends EventDispatcher{
		public static const BIG_SMALL	:	String 	= 	"BIG_SMALL";			//大小
		public static const ODD_EVEN	:	String 	= 	"ODD_EVEN";				//单双
		public static const TIE			:	String 	= 	"TIE";					//和值
		public static const BEAD		:	String 	= 	"BEAD";					//珠仔
		
		public constructor() {
		}
	}
}