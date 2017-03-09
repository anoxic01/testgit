module define {
	export class MobileDefine {

		public static IOS:number = 0;
		public static ANDROID:number = 1;
		public static DETAIL:number = 2;
		
		public static GRID:number = 0;
		public static HORIZONTAL:number = 1;
		
		public static IOS_COUNT:number = 11;//BGios01,Num01
		public static AND_COUNT:number = 10;//BGAndroid_01,Num01
		
		public static LINK_IOS:string = "BGios";
		public static LINK_AND:string = "BGAndroid_";
		public static LINK_NUM:string = "Num";
		
		public static CARD_W:number = 243;
		public static CARD_H:number = 429;
		
		public static DETAIL_COUNT:number = 5;
		
		public static LANG_IOS:string = "ios";
		public static LANG_AND:string = "and";

		public constructor() {
		}
	}
}