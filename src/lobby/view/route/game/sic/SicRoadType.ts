module lobby.view.route.game.sic {
	export class SicRoadType extends EventDispatcher{
		public static const BIG_SMALL	:	string 	= 	"BIG_SMALL";			//大小
		public static const ODD_EVEN	:	string 	= 	"ODD_EVEN";				//单双
		public static const TIE			:	string 	= 	"TIE";					//和值
		public static const BEAD		:	string 	= 	"BEAD";					//珠仔
		
		public constructor() {
		}
	}
}