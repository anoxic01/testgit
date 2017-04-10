module packet.pack_lobby {
	export class S_Lobby_Gunners_Status_Pkt implements iface.IProtocolStruct{
		public constructor() {
		}
		
		public initControler(controler):void
		{
			
		}
		
		public execute(oData):void
		{
			var _simepleDeputyStruct = new lobby.model.struct.SimpleDeputyStruct();
				_simepleDeputyStruct.AgentID 			= oData.AgentID;
				_simepleDeputyStruct.AgentKey 			= oData.AgentKey;
				_simepleDeputyStruct.BossAccountType	= oData.BossAccountType;
				_simepleDeputyStruct.BossBalance		= new lobby.model.struct.BalanceStruct(oData.BossBalance);
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