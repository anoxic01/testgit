module packet.lobby {
	export class S_Lobby_Deputy_Auth_Pkt implements IProtocolStruct{
		public var DeputyInfo	:	SimpleDeputyStruct;
		public var TableList	:	Vector.<TableStruct>;
		
		public constructor() {
		}

		
		public function initControler(controler:GameControler):void
		{
		}
		
		public function execute(oData:Object):void
		{
			switch(oData.Ret){
				case Define.RET_0:		
					trace("抢手回复成功。。。");
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
					trace("抢手认证回复异常。。。");
					break;
			}
		}
	}
}