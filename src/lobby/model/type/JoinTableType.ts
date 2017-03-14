module lobby.model.type {
	export class JoinTableType {

		/** 一般進桌不配位*/
        public static SINGEL:number = 0;
		/**一般進桌(配桌配位)*/
		public static NORMAL_PAIR_TABLE_SEAT:number = 1;
		/** 競瞇下注進桌*/
        public static PEEK_TABLEER:number = 2;
		/** 競瞇旁觀下注進桌*/
        public static PEEK_OTHER:number = 3;
       /** 包桌桌主進桌*/
        public static CHARTER_TABLE_OWNER:number = 4;
        /** 包桌進桌下注進桌*/
        public static CHARTER_TABLER:number = 5;
       /**包桌旁觀下注進桌*/
        public static CHARTER_OTHER:number = 6;
        /** 多桌進桌*/
        public static MULTIPLE:number = 7;
       /** 電投進桌*/
        public static TELBET:number = 8;
        /**槍手進桌*/
        public static DEPUTY:number = 9;		
		/**电投旁注进桌**/
		public static TELBET_SIDE:number = 10;

		public constructor() {
		}
	}
}