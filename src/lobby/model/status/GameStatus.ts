module lobby.model.status {
	export class GameStatus {

		public static NOT_INIT:string = "";				//尚未出使
        public static NOT_FINISHED:string = "X";			//上一局未正常結束或是路紙有問題 
		public static WAIT_NEXT_NEWGAME:string = "W";		//等待新局
		public static FAILING_GAME:string = "A";			//退押注中
		public static FAIL_GAME:string = "B";				//退押注完成
		
        public static READY:string = "0";					//準備中
        public static BETTING:string = "1";				//下注中
        public static DEALING:string = "2";				//發牌中
        public static SETTLING:string = "3";				//結算中
        public static SETTLED:string = "4";				//結算完成
        public static FIRST_PEEK:string = "5";			//第一階段瞇牌中
        public static PLAYER_SECOND_PEEK:string = "6";	//閒家第二階段瞇牌中
        public static BANKER_SECOND_PEEK:string = "7";	//庄家第二階段瞇牌中 
        public static CHANGING_SHOE:string = "8";			//換靴中
        public static CHANG_SHOE_COMPLETED:string = "9";	//換靴完成

		public constructor() {
		}
	}
}