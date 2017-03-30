module packet.lobby {
	export class S_Lobby_Deputy_Auth_Pkt implements IProtocolStruct{
		public DeputyInfo	:	SimpleDeputyStruct;
		public TableList	:	<TableStruct>;
		
		public constructor() {
		}

		
		public initControler(controler:GameControler):void
		{
		}
		
		public execute(oData:Object):void
		{
			switch(oData.Ret){
				case Define.RET_0:		
					console.log("抢手回复成功。。。");
					break;
				case Define.RET_1:		
					break;
				case Define.RET_2:		
					break;
				
				case Define.RET_4:		
					break;
				case Define.RET_5:		
					break;
				case Define.RET_6:		
					break;
				case Define.RET_7:		
					break;
				
				default:
					console.log("抢手认证回复异常。。。");
					break;
			}
		}
	}
}