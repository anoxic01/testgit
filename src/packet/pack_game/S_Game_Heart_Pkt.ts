module packet.pack_game {
	export class S_Game_Heart_Pkt  implements iface.IProtocolStruct{

		private m_controler;

		public constructor() {
		}
		
		public initControler(controler):void
		{
			this.m_controler = controler;
		}
		
		public execute(oData):void
		{
			
//			console.log(this, "收到遊戲心跳::" );
			
			var _heartStruct = new lobby.model.struct.HeartStruct();
				_heartStruct.PlayerID = oData.PlayerID;
				_heartStruct.Identity = oData.Identity;
				//身分驗證..
			//待服務端進版時,注釋要打開
			/*if( _heartStruct.PlayerID != Player.getInstance().iPlayerID ||
				_heartStruct.Identity != LobbyManager.getInstance().lobbyAuth.Identity ){
				try{
					m_controler.proxy.socket.m_socket.close();
				}catch(e:Error){
					
				}
				LobbyManager.getInstance().lobbySocketClose();
				
				PanelWindowManager.getInstance().showPannel(Language.sIllegalOperation,illegalOperation);
				
			}*/
			
			if( this.m_controler ){
				this.m_controler.nRevServerTime = egret.getTimer();
				//服務端主動送心跳包
				if( oData.Type == define.PacketDefine.C_Heart ){
//					console.log("回復服務端心跳包...")
					this.m_controler.proxy.responseHeartPkt();
				}					
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