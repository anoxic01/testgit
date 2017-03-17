module packet.lobby {
	export class S_Lobby_Gunners_Status_Pkt implements IProtocolStruct{
		public constructor() {
		}
		
		public function initControler(controler:GameControler):void
		{
			
		}
		
		public function execute(oData:Object):void
		{
			var _simepleDeputyStruct:SimpleDeputyStruct = new SimpleDeputyStruct();
				_simepleDeputyStruct.AgentID 			= oData.AgentID;
				_simepleDeputyStruct.AgentKey 			= oData.AgentKey;
				_simepleDeputyStruct.BossAccountType	= oData.BossAccountType;
				_simepleDeputyStruct.BossBalance		= new BalanceStruct(oData.BossBalance);
				_simepleDeputyStruct.BossBetLimitID		= oData.BossBetLimitID;
				_simepleDeputyStruct.BossID				= oData.BossID;
				_simepleDeputyStruct.BossNickName		= oData.BossNickName;
				_simepleDeputyStruct.BroadcastKey		= oData.BroadcastKey;
				_simepleDeputyStruct.DeputyFirstName	= oData.DeputyFirstName;
				_simepleDeputyStruct.DeputyLastName		= oData.DeputyLastName;
				_simepleDeputyStruct.Identity			= oData.Identity;
				_simepleDeputyStruct.IsLogin			= oData.IsLogin;
				_simepleDeputyStruct.LobbyServer		= oData.LobbyServer;
				_simepleDeputyStruct.PrivateKey			= oData.PrivateKey;
//				LobbyManager.getInstance().gunnersConnectStatus( oData.Status , _simepleDeputyStruct );

		}			
		
	}
}