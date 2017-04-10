module packet.pack_lobby {
	export class S_Lobby_Deputy_Auth_Pkt implements iface.IProtocolStruct{
		public DeputyInfo	;
		public TableList	;
		
		public constructor() {
		}

		
		public initControler(controler):void
		{
		}
		
		public execute(oData):void
		{
			switch(oData.Ret){
				case define.Define.RET_0:		
					console.log("抢手回复成功。。。");
					break;
				case define.Define.RET_1:		
					break;
				case define.Define.RET_2:		
					break;
				
				case define.Define.RET_4:		
					break;
				case define.Define.RET_5:		
					break;
				case define.Define.RET_6:		
					break;
				case define.Define.RET_7:		
					break;
				
				default:
					console.log("抢手认证回复异常。。。");
					break;
			}
		}
	}
}