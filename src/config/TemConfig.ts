module config {
	export class TemConfig {
		public  AuthToken;
		public  LoginMode;
		public  ServerIp = "127.0.0.1:2001";
		public  ApiUrl;
		public  PhoneBetID = 5;
		public  ThemeList 	= [];
		public  Data;
		public  TryAccountApiUrl;								//试玩账号查询账号记录
		public  Test;
		public  version;
		public  LogServerApiUrl;
		
		public static  VERSION	=	"V1_1_23_22";

		private static instance	:	TemConfig;

		public static getInstance():TemConfig{
            if(this.instance == null){
                    this.instance = new TemConfig();
            }
            return this.instance;
     	}
		public constructor() {
		}
	}
}