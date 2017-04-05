module packet.lobby {
	export class S_Lobby_Login_Pkt implements IProtocolStruct{
		public constructor() {
		}
		
		public initControler(controler:GameControler):void{
			
		}
		
		public execute( _oData:Object ):void
		{
			var _fExitLobby:Function = LobbyManager.getInstance().leaveLobby;	
			var _fRefresh:Function = LobbyManager.getInstance().refreshWeb;
			var _pannelDialog:PanelWindow;
			
			LobbyManager.getInstance().bImportant = true;
			
			switch(_oData.Ret){
				case Define.RET_0:
					LobbyManager.getInstance().bImportant = false;
					LobbyManager.getInstance().iReTryConnect = 0;
					LobbyManager.getInstance().maintainLevel = 0;
					LobbyData.getInstance().onLoginLobby(_oData);
//					LobbyManager.getInstance().getRoadmapReqInfo([1]);//測試代碼
					console.log(this, "登陆大厅成功..." );
					break;
				case Define.RET_1:			//登入大廳失敗
					_pannelDialog = LobbyManager.getInstance().showDialog( LobbyManager.getInstance().getLanguageString( Language.sWarn_Login_Lobby_Fail ) , _fExitLobby );

					break;
				case Define.RET_2:			//連線超時
					_pannelDialog = LobbyManager.getInstance().showDialog( LobbyManager.getInstance().getLanguageString( Language.sTimeOut ) , _fExitLobby  );

					break;
				case Define.RET_4:			//通信版本不對
					_pannelDialog = LobbyManager.getInstance().showDialog( LobbyManager.getInstance().getLanguageString( Language.sProtocolError )   );				//重載
					
					break;
				case Define.RET_5:			//老板尚未登录
					_pannelDialog = LobbyManager.getInstance().showDialog( LobbyManager.getInstance().getLanguageString( Language.sWarn_Boss_Never_Login ) );
					break;
				case Define.RET_6:			//配抢手尚未审核
					_pannelDialog = LobbyManager.getInstance().showDialog( LobbyManager.getInstance().getLanguageString( Language.sWarn_Deputy_Never_Reviewed ) );
					break;
				case Define.RET_7:			//维护中
					_pannelDialog = LobbyManager.getInstance().showDialog( LobbyManager.getInstance().getLanguageString( Language.sWarn_System_Maintain ) , _fExitLobby );
					break;
				case Define.RET_10:			//大廳服務器忙碌中,需做重複登入
					console.log(this, "Retry  Lobby Login:::");
					
					var _bRes: boolean = LobbyManager.getInstance().reconnect();
					if( _bRes == false ){
						var _sMsg:String = LobbyManager.getInstance().getLanguageString( Language.sWarn_Server_Busy );
						_pannelDialog = LobbyManager.getInstance().showDialog_2( _sMsg , true, false,  _fExitLobby , _fRefresh); 
						PanelDialog_2(_pannelDialog).fDestroyRun = LobbyManager.getInstance().leaveLobby;			//關閉紐 偵聽函式	
					}
					break;
				case Define.RET_11:			//全站維護中不允許登入
					_pannelDialog = LobbyManager.getInstance().showDialog( LobbyManager.getInstance().getLanguageString( Language.sWarn_Web_Maintain ) , _fExitLobby , _fExitLobby);
					break;
				case Define.RET_12:			// 代理維護中不允許登入
					_pannelDialog = LobbyManager.getInstance().showDialog( LobbyManager.getInstance().getLanguageString( Language.sWarn_Proxy_Maintain ) , _fExitLobby, _fExitLobby );
					break;
				case Define.RET_13:
					_pannelDialog = LobbyManager.getInstance().showDialog( LobbyManager.getInstance().getLanguageString( Language.sWarn_Account_Limit ) , _fExitLobby );
					break;
				case Define.RET_14:
					_pannelDialog = LobbyManager.getInstance().showDialog( LobbyManager.getInstance().getLanguageString( Language.sWarn_Ret_14 ) , _fExitLobby );
					break;
				
				default:
					console.log("登录大厅异常。。。");
					_pannelDialog = LobbyManager.getInstance().showDialog( LobbyManager.getInstance().getLanguageString( Language.sWarn_Login_Lobby_Other_Error ) , _fExitLobby );
					break;
			}
			
			if( _oData.Ret != Define.RET_0 ){
				console.log(this, "登陆大厅失敗: "+ Define.RET_6);
			}
			
			if( _pannelDialog != null ) {
				LobbyManager.getInstance().aCloseWindowList.push( _pannelDialog );
			}
			
//			ExceptionPacketManager.getInstance().removeCountdownPakcetTime( PacketDefine.LOBBY , PacketDefine.LOGIN_IN );  
		}
		
	}
}