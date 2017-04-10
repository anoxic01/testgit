module packet.pack_lobby {
	export class S_Lobby_Login_Pkt implements iface.IProtocolStruct{
		public constructor() {
		}
		
		public initControler(controler):void{
			
		}
		
		public execute( _oData ):void
		{
			var _fExitLobby:Function = manager.LobbyManager.getInstance().leaveLobby;	
			var _fRefresh:Function = manager.LobbyManager.getInstance().refreshWeb;
			var _pannelDialog;
			
			manager.LobbyManager.getInstance().bImportant = true;
			
			switch(_oData.Ret){
				case define.Define.RET_0:
					manager.LobbyManager.getInstance().bImportant = false;
					manager.LobbyManager.getInstance().iReTryConnect = 0;
					manager.LobbyManager.getInstance().maintainLevel = 0;
					lobby.model.LobbyData.getInstance().onLoginLobby(_oData);
//					manager.LobbyManager.getInstance().getRoadmapReqInfo([1]);//測試代碼
					console.log(this, "登陆大厅成功..." );
					break;
				case define.Define.RET_1:			//登入大廳失敗
					_pannelDialog = manager.LobbyManager.getInstance().showDialog( manager.LobbyManager.getInstance().getLanguageString( language.Language.sWarn_Login_Lobby_Fail ) , _fExitLobby );

					break;
				case define.Define.RET_2:			//連線超時
					_pannelDialog = manager.LobbyManager.getInstance().showDialog( manager.LobbyManager.getInstance().getLanguageString( language.Language.sTimeOut ) , _fExitLobby  );

					break;
				case define.Define.RET_4:			//通信版本不對
					_pannelDialog = manager.LobbyManager.getInstance().showDialog( manager.LobbyManager.getInstance().getLanguageString( language.Language.sProtocolError )   );				//重載
					
					break;
				case define.Define.RET_5:			//老板尚未登录
					_pannelDialog = manager.LobbyManager.getInstance().showDialog( manager.LobbyManager.getInstance().getLanguageString( language.Language.sWarn_Boss_Never_Login ) );
					break;
				case define.Define.RET_6:			//配抢手尚未审核
					_pannelDialog = manager.LobbyManager.getInstance().showDialog( manager.LobbyManager.getInstance().getLanguageString( language.Language.sWarn_Deputy_Never_Reviewed ) );
					break;
				case define.Define.RET_7:			//维护中
					_pannelDialog = manager.LobbyManager.getInstance().showDialog( manager.LobbyManager.getInstance().getLanguageString( language.Language.sWarn_System_Maintain ) , _fExitLobby );
					break;
				case define.Define.RET_10:			//大廳服務器忙碌中,需做重複登入
					console.log(this, "Retry  Lobby Login:::");
					
					var _bRes: boolean = manager.LobbyManager.getInstance().reconnect();
					if( _bRes == false ){
						var _sMsg:string = manager.LobbyManager.getInstance().getLanguageString( language.Language.sWarn_Server_Busy );
						_pannelDialog = manager.LobbyManager.getInstance().showDialog_2( _sMsg , true, false,  _fExitLobby , _fRefresh); 
						_pannelDialog.fDestroyRun = manager.LobbyManager.getInstance().leaveLobby;			//關閉紐 偵聽函式	
					}
					break;
				case define.Define.RET_11:			//全站維護中不允許登入
					_pannelDialog = manager.LobbyManager.getInstance().showDialog( manager.LobbyManager.getInstance().getLanguageString( language.Language.sWarn_Web_Maintain ) , _fExitLobby , _fExitLobby);
					break;
				case define.Define.RET_12:			// 代理維護中不允許登入
					_pannelDialog = manager.LobbyManager.getInstance().showDialog( manager.LobbyManager.getInstance().getLanguageString( language.Language.sWarn_Proxy_Maintain ) , _fExitLobby, _fExitLobby );
					break;
				case define.Define.RET_13:
					_pannelDialog = manager.LobbyManager.getInstance().showDialog( manager.LobbyManager.getInstance().getLanguageString( language.Language.sWarn_Account_Limit ) , _fExitLobby );
					break;
				case define.Define.RET_14:
					_pannelDialog = manager.LobbyManager.getInstance().showDialog( manager.LobbyManager.getInstance().getLanguageString( language.Language.sWarn_Ret_14 ) , _fExitLobby );
					break;
				
				default:
					console.log("登录大厅异常。。。");
					_pannelDialog = manager.LobbyManager.getInstance().showDialog( manager.LobbyManager.getInstance().getLanguageString( language.Language.sWarn_Login_Lobby_Other_Error ) , _fExitLobby );
					break;
			}
			
			if( _oData.Ret != define.Define.RET_0 ){
				console.log(this, "登陆大厅失敗: "+ define.Define.RET_6);
			}
			
			if( _pannelDialog != null ) {
				manager.LobbyManager.getInstance().aCloseWindowList.push( _pannelDialog );
			}
			
//			ExceptionPacketManager.getInstance().removeCountdownPakcetTime( Packetdefine.Define.LOBBY , Packetdefine.Define.LOGIN_IN );  
		}
		
	}
}