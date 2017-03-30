module packet.lobby {
	export class S_Lobby_Heart_Pkt implements IProtocolStruct{
		public PlayerID:number;
		public Identity:number;

		public constructor() {

		}
		
		
		public initControler(controler:GameControler):void
		{
		}
		
		public execute(oData:Object):void
		{
//			Log.getInstance().log(this , "接收心跳" );
			var _heartStruct:HeartStruct = new HeartStruct();
			_heartStruct.PlayerID = oData.PlayerID;
			_heartStruct.Identity = oData.Identity;
			//身分驗證..
			//待服務端進版時,注釋要打開
			/*if( _heartStruct.PlayerID != Player.getInstance().iPlayerID ||
				_heartStruct.Identity != LobbyManager.getInstance().lobbyAuth.Identity ){
				
				LobbyManager.getInstance().lobbySocketClose();
				
				PanelWindowManager.getInstance().showPannel(Language.sIllegalOperation,illegalOperation);
				
			}*/
						
			LobbyManager.getInstance().nRevServerTime = getTimer();
			//服務端主動送心跳包
			if( oData.Type == PacketDefine.C_Heart ){
//				console.log("回復服務端心跳包")
				LobbyManager.getInstance().responseHeartPkt();	//回復
			}			
		}		
		
		public illegalOperation():void {
			var _sMsg:String;
			var _panelDialog:PanelWindow;
			var _fExitLobby:Function = LobbyManager.getInstance().leaveLobby;		
			LobbyManager.getInstance().closeAllDialog();
			_sMsg = LobbyManager.getInstance().getLanguageString( Language.sIllegalOperation );
			_panelDialog = LobbyManager.getInstance().showDialog_2(_sMsg , true , true , _fExitLobby ,null  );
			PanelDialog_2(_panelDialog).fDestroyRun = LobbyManager.getInstance().leaveLobby;			//關閉紐 偵聽函式
			
		}			
		
	}
}