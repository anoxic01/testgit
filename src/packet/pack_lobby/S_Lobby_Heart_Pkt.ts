module packet.pack_lobby {
	export class S_Lobby_Heart_Pkt implements iface.IProtocolStruct{
		public PlayerID:number;
		public Identity:number;

		public constructor() {

		}
		
		
		public initControler(controler):void
		{
		}
		
		public execute(oData):void
		{
//			console.log(this , "接收心跳" );
			var _heartStruct = new lobby.model.struct.HeartStruct();
			_heartStruct.PlayerID = oData.PlayerID;
			_heartStruct.Identity = oData.Identity;
			//身分驗證..
			//待服務端進版時,注釋要打開
			/*if( _heartStruct.PlayerID != Player.getInstance().iPlayerID ||
				_heartStruct.Identity != manager.LobbyManager.getInstance().lobbyAuth.Identity ){
				
				manager.LobbyManager.getInstance().lobbySocketClose();
				
				PanelWindowManager.getInstance().showPannel(Language.sIllegalOperation,illegalOperation);
				
			}*/
						
			manager.LobbyManager.getInstance().nRevServerTime = egret.getTimer();
			//服務端主動送心跳包
			if( oData.Type == define.PacketDefine.C_Heart ){
//				console.log("回復服務端心跳包")
				manager.LobbyManager.getInstance().responseHeartPkt();	//回復
			}			
		}		
		
		public illegalOperation():void {
			var _sMsg:string;
			var _panelDialog;
			var _fExitLobby:Function = manager.LobbyManager.getInstance().leaveLobby;		
			manager.LobbyManager.getInstance().closeAllDialog();
			_sMsg = manager.LobbyManager.getInstance().getLanguageString( language.Language.sIllegalOperation );
			_panelDialog = manager.LobbyManager.getInstance().showDialog_2(_sMsg , true , true , _fExitLobby ,null  );
			_panelDialog.fDestroyRun = manager.LobbyManager.getInstance().leaveLobby;			//關閉紐 偵聽函式
			
		}			
		
	}
}