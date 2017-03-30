module manager {
	export class NetWorkManager {
		private static m_instance		:	NetWorkManager;
		private m_bLock					:	 boolean;			//鎖視窗
		private m_controler				:	GameControler;
		private m_bGameOnlyOne			:	 boolean;			//
		
		public iLobbyNetWorkStatus		:	int = -1;			//大廳網路狀態
		public iGameNetWorkStatus		:	int = -1;			//遊戲網路狀態
		public _gamePopMsg				:	string;
		public static getInstance():NetWorkManager{
			
			if(m_instance == null){
				
				m_instance = new NetWorkManager(new Singleton());
				
			}
			return m_instance;
		}
		
		public constructor() {
		}

		
		/**
		 * 登出原因 
		 * @param _iStatus
		 * 
		 */
		public onLobbyLogout(_reason:number):void{
			//提示用户
			var _panelDialog:PanelWindow;
			var sKey1:string;
			var func:Function;
			
			LobbyManager.getInstance().bImportant = true;
			
			switch( _reason ){
				case Define.LOGOUT_REPEAT_LOGIN:			//大廳玩家重複登入
					LobbyManager.getInstance().closeAllDialog();
					sKey1 = LobbyManager.getInstance().getLanguageString( Language.sPlayer_Repeat_Login );
					_panelDialog = LobbyManager.getInstance().showDialog_2(  sKey1 , true , true, LobbyManager.getInstance().leaveLobby  );
					PanelDialog_2(_panelDialog).fDestroyRun = LobbyManager.getInstance().leaveLobby;
					LobbyManager.getInstance().aCloseWindowList.push( _panelDialog );
					LobbyManager.getInstance().lobbySocketClose();							//大廳斷線
					LobbyManager.getInstance().gameSocketClose();
					MusicManager.singleton.enabled = false;
					break;
				
				case Define.LOGOUT_Active_LOGOUT:
					LobbyManager.getInstance().closeAllDialog();
					LobbyManager.getInstance().lobbySocketClose();
					break;
				
				case Define.LOGOUT_TRY_ACCOUNT_TIME_OUT:									//試玩帳號 時間到
					LobbyManager.getInstance().closeAllDialog();
					sKey1 = LobbyManager.getInstance().getLanguageString( Language.sLogout_TRY_ACCOUNT_TIME_OUT );
					_panelDialog = LobbyManager.getInstance().showDialog_2(  sKey1 ,true ,true, LobbyManager.getInstance().leaveLobby );
					PanelDialog_2(_panelDialog).fDestroyRun = LobbyManager.getInstance().leaveLobby;
					LobbyManager.getInstance().aCloseWindowList.push( _panelDialog ); 
					LobbyManager.getInstance().lobbySocketClose();							//大廳斷線
					LobbyManager.getInstance().gameSocketClose();
					break;
				
				case Define.LOGOUT_CANCEL_SUBSCRIPTION_MULTI:
					break;				
				
				case Define.LOGOUT_DISCONNECT:
					LobbyManager.getInstance().closeAllDialog();
					sKey1 = LobbyManager.getInstance().getLanguageString( Language.sLogout_DISCONNECT );
					func  = LobbyManager.getInstance().refreshWeb;
					_panelDialog = LobbyManager.getInstance().showDialog_2( sKey1, true , false, LobbyManager.getInstance().leaveLobby, func );
					PanelDialog_2(_panelDialog).fDestroyRun = LobbyManager.getInstance().leaveLobby;
					LobbyManager.getInstance().aCloseWindowList.push( _panelDialog ); 
					LobbyManager.getInstance().lobbySocketClose();							//大廳斷線
					LobbyManager.getInstance().gameSocketClose();
					break;		
				
				case Define.LOGOUT_TABLER_DISCONNECT:
					break;		
				
				case Define.LOGOUT_TIME_OUT:				//僅用於 包桌桌主逾時
					
					break;				
				
				case Define.LOGOUT_SERVER_MAINTAIN:
					LobbyManager.getInstance().closeAllDialog();
					sKey1 = LobbyManager.getInstance().getLanguageString( Language.sLogout_Server_Maintain );						
					_panelDialog = LobbyManager.getInstance().showDialog_2( sKey1 , true , true , LobbyManager.getInstance().leaveLobby );
					PanelDialog_2(_panelDialog).fDestroyRun = LobbyManager.getInstance().leaveLobby;
					LobbyManager.getInstance().aCloseWindowList.push( _panelDialog ); 
					LobbyManager.getInstance().lobbySocketClose();							//大廳斷線
					LobbyManager.getInstance().gameSocketClose();
					break;	
				
				case Define.LOGOUT_PROXY_PLAYER_SUSPENDED:
					LobbyManager.getInstance().closeAllDialog();
					sKey1 = LobbyManager.getInstance().getLanguageString( Language.sLogout_Proxy_Player_Suspended );
					_panelDialog = LobbyManager.getInstance().showDialog_2( sKey1 , true , true, LobbyManager.getInstance().leaveLobby);
					PanelDialog_2(_panelDialog).fDestroyRun = LobbyManager.getInstance().leaveLobby;
					LobbyManager.getInstance().aCloseWindowList.push( _panelDialog ); 
					LobbyManager.getInstance().lobbySocketClose();		
					LobbyManager.getInstance().gameSocketClose();
					break;
				
				
				case Define.LOGOUT_RESET_PASSWORD:		//重设密码
					sKey1 = LobbyManager.getInstance().getLanguageString(Language.sResetPassword);
					LobbyManager.getInstance().showDialog_2(sKey1,true,true,LobbyManager.getInstance().leaveLobby);
					break;
				
				case Define.LOGOUT_MAINTAIN_ALL:
					LobbyManager.getInstance().closeAllDialog();
					sKey1 = LobbyManager.getInstance().getLanguageString( Language.sLogout_Lobby_All_Maintain );
					_panelDialog = LobbyManager.getInstance().showDialog_2(  sKey1 , true , true, LobbyManager.getInstance().leaveLobby  );
					PanelDialog_2(_panelDialog).fDestroyRun = LobbyManager.getInstance().leaveLobby;
					LobbyManager.getInstance().aCloseWindowList.push( _panelDialog );
					LobbyManager.getInstance().lobbySocketClose();							//大廳斷線
					LobbyManager.getInstance().gameSocketClose();
					break;
				
				case Define.LOGOUT_MAINTAIN_THEME:
					LobbyManager.getInstance().closeAllDialog();
					_panelDialog = LobbyManager.getInstance().showDialog( LobbyManager.getInstance().getLanguageString( Language.sMaintain_Theme ),null,null,true );
					LobbyManager.getInstance().aCloseWindowList.push( _panelDialog ); 
					break;
				
				case Define.LOGOUT_MAINTAIN_TABLE:
					LobbyManager.getInstance().closeAllDialog();
					_panelDialog = LobbyManager.getInstance().showDialog( LobbyManager.getInstance().getLanguageString( Language.sLogout_Lobby_Table_Maintain ),null,null,true );
					LobbyManager.getInstance().aCloseWindowList.push( _panelDialog ); 
					break;
				
				case Define.LOGOUT_MAINTAIN_AGENT:
					LobbyManager.getInstance().closeAllDialog();
					sKey1 = LobbyManager.getInstance().getLanguageString( Language.sLogout_Lobby_Agent_Maintain );
					_panelDialog = LobbyManager.getInstance().showDialog_2( sKey1 ,true, true, LobbyManager.getInstance().leaveLobby );
					PanelDialog_2(_panelDialog).fDestroyRun = LobbyManager.getInstance().leaveLobby;
					LobbyManager.getInstance().aCloseWindowList.push( _panelDialog ); 
					LobbyManager.getInstance().lobbySocketClose();							//大廳斷線
					LobbyManager.getInstance().gameSocketClose();
					break;
				
				case Define.LOGOUT_LOCK_ACCOUNT:
					LobbyManager.getInstance().closeAllDialog();
					sKey1 = LobbyManager.getInstance().getLanguageString( Language.sLogout_Lock_Account );
					_panelDialog = LobbyManager.getInstance().showDialog_2(  sKey1 ,true ,true, LobbyManager.getInstance().leaveLobby );
					PanelDialog_2(_panelDialog).fDestroyRun = LobbyManager.getInstance().leaveLobby;
					LobbyManager.getInstance().aCloseWindowList.push( _panelDialog ); 
					LobbyManager.getInstance().lobbySocketClose();							//大廳斷線
					LobbyManager.getInstance().gameSocketClose();
					break;
			}
		}
		
		/**
		 * 檢測大廳網路狀態 
		 */
		public checkLobbyNetWork(  _iStatus:number):void {
			//檢測大廳			
			iLobbyNetWorkStatus = _iStatus;
			
			//提示用户
			var _panelDialog:PanelWindow;
			var sKey1:string;
			
			switch( iLobbyNetWorkStatus ){
				case Define.LobbyDisconnect:					//大廳斷線,鎖彈窗
					if(!LobbyManager.getInstance().bImportant){
						showPannel(Language.sNetWork_Abnormal_Lobby , lobbyConnectCloseed );	
						LobbyManager.getInstance().lobbySocketClose();	
						LobbyManager.getInstance().gameSocketClose();
						LobbyManager.getInstance().bImportant=true;
					}
					break;
				case Define.LobbyConnectFailed:					//大廳連線失敗
					//大廳重連
					var _bRes: boolean = LobbyManager.getInstance().reconnect();
					if( _bRes == false  ) {
						//重連失敗
						showPannel(Language.sException_Lobby_Connect_Failed , lobbyConnectFailed );	
						LobbyManager.getInstance().lobbySocketClose();
						LobbyManager.getInstance().gameSocketClose();
					}	
					break;
				
				case Define.LobbyActiveLogOut:		//玩家主動點功能列登出,鎖彈窗
//					m_bLock = true;
					break;
				case Define.LobbyTryAccountDisConnect:
//					LobbyManager.getInstance().closeAllDialog();
//					showPannel(Language.sNetWork_Abnormal_Lobby , lobbyConnectCloseed );								//大廳斷線
					break;
				
				default:
//					LobbyManager.getInstance().closeAllDialog();
//					sKey1 = LobbyManager.getInstance().getLanguageString( Language.sLogout_exception ) ;
//					_panelDialog = LobbyManager.getInstance().showDialog_2( sKey1 , true , true, LobbyManager.getInstance().leaveLobby);
//					PanelDialog_2(_panelDialog).fDestroyRun = LobbyManager.getInstance().leaveLobby;
//					LobbyManager.getInstance().aCloseWindowList.push( _panelDialog );
//					LobbyManager.getInstance().lobbySocketClose();							//大廳斷線
			}	//end switch
			
			//停止心跳包
			LobbyManager.getInstance().stopHeart();
			LobbyManager.getInstance().stopMultiHeart();
			if( m_controler ){
				m_controler.removeGameHeart();
			}	
		}//end checkLobbyNetWork
		
		/**
		 * 檢測遊戲網路狀態 
		 */
		public checkGameNetWork( _iStatus:number, _controler:GameControler = null ):void {
			if( iLobbyNetWorkStatus == Define.LobbyConnected ){
				m_controler = _controler;
				console.log("游戏断线"+_iStatus+"    已存在重要信息:"+LobbyManager.getInstance().bImportant)
				//驗證是否收到遊戲登出消息
				if( LobbyManager.getInstance().bImportant == false ){
					iGameNetWorkStatus = _iStatus; 
					switch( iGameNetWorkStatus ){
						case Define.GameDisconnect:
							if(_gamePopMsg!=Language.sNetWork_Abnormal_Game){
								_gamePopMsg=Language.sNetWork_Abnormal_Game;
								showPannel(Language.sNetWork_Abnormal_Game, gameClosed);
							}
							
							break;
						case Define.GameConnectFailed:
							if(_gamePopMsg!=Language.sNetWork_Abnormal_Game){
								_gamePopMsg=Language.sException_Connect_GameServer_Failed;
								showPannel(Language.sException_Connect_GameServer_Failed , connectGameFailed);
							}
						
							break;
						case Define.GameMultiTableDisconnect:
							if(_gamePopMsg!=Language.sNetWork_Abnormal_Game){
								_gamePopMsg=Language.sNetWork_Abnormal_Game;
								showPannel(Language.sNetWork_Abnormal_Game , connectMulitGameClosed);
							}
							
							break;
						case Define.GameMultiTableFailed:
							if(_gamePopMsg!=Language.sNetWork_Abnormal_Game){
								_gamePopMsg=Language.sNetWork_Abnormal_Game;
								showPannel(Language.sNetWork_Abnormal_Game , connectMulitGameClosed);
							}
							
							break;
					}		
				}
			}//end if
			if( m_controler ){
				m_controler.removeGameHeart();
			}		
			LobbyManager.getInstance().stopMultiHeart();
		}
		
		
		/**
		 * 
		 */
		public showPannel( _sKey:string , _func:Function  ):void {
			console.log("弹框：：："+m_bLock)
			if( m_bLock ){
				return;
			}			
			
			switch( _sKey ){
				case Language.sNetWork_Abnormal_Lobby:					//大廳斷線,鎖彈窗
					_func();
					m_bLock = true;
					break;
				
				case Language.sNetWork_Abnormal_Game:					//遊戲斷線
					_func();
					break;
				
				case Language.sException_Login_Lobby_Pkt_Not_Return:
					//..暫不處裡
					break;
				
				case Language.sException_Lobby_Connect_Failed:					//大廳伺服器連接失敗,鎖彈窗
					_func();
					m_bLock = true;
					break;
				
				case Language.sException_Connect_GameServer_Failed:				//連接遊戲伺服器失敗
					_func();
					break;	
				
				case Language.sException_BetLimit_Is_NULL:				//下注限額錯誤
					//..暫不處裡
					
					break;
				
				case Language.sIllegalOperation:						//違法操作
					_func();
					m_bLock = true;
					break;
			}	
		}
		
		//大廳斷線處裡
		public lobbyConnectCloseed():void {
			LobbyManager.getInstance().closeAllDialog();
			var _sMsg:string;
			var _panelDialog:PanelWindow;
			var _fExitLobby:Function = LobbyManager.getInstance().leaveLobby;
			var _fRefreshWeb:Function = LobbyManager.getInstance().refreshWeb;			
			
			_sMsg = LobbyManager.getInstance().getLanguageString( Language.sNetWork_Abnormal_Lobby );
			_panelDialog = LobbyManager.getInstance().showDialog_2(_sMsg , true , false , _fExitLobby , _fRefreshWeb  );
			PanelDialog_2(_panelDialog).fDestroyRun = LobbyManager.getInstance().leaveLobby;			//關閉紐 偵聽函式
			
		}		
		
		//大廳連接失敗
		private lobbyConnectFailed():void {
			LobbyManager.getInstance().closeAllDialog();
			var _sMsg:string;
			var _panelDialog:PanelWindow;
			var _fExitLobby:Function = LobbyManager.getInstance().leaveLobby;
			var _fRefreshWeb:Function = LobbyManager.getInstance().refreshWeb;	
			
			_sMsg = LobbyManager.getInstance().getLanguageString( Language.sException_Lobby_Connect_Failed );
			_panelDialog= LobbyManager.getInstance().showDialog_2( _sMsg , true , false , LobbyManager.getInstance().leaveLobby , LobbyManager.getInstance().refreshWeb  );
			PanelDialog_2(_panelDialog).fDestroyRun = LobbyManager.getInstance().leaveLobby;			//關閉紐 偵聽函式
			LobbyManager.getInstance().aCloseWindowList.push( _panelDialog ); 	
			LobbyManager.getInstance().lobbyView.hideLoading();
		}
		
		//遊戲斷縣
		public gameClosed():void {
			if( m_controler ){
				m_controler.onConnectClosed();
				if (NetWorkManager.getInstance().iLobbyNetWorkStatus == Define.LobbyConnected){
					var _sMsg:string = LobbyManager.getInstance().getLanguageString( Language.sNetWork_Abnormal_Game );
					var _panelDialog:PanelDialog = LobbyManager.getInstance().showDialog(_sMsg , onPanelDialogClose, onPanelDialogClose, true );
					
					LobbyManager.getInstance().aCloseWindowList.push( _panelDialog ); 
					LobbyManager.getInstance().lobbyView.hideLoading();	
				}
				
			} 
		}
		/**
		 * 点确定或x按钮，都会回到大厅
		 */		
		private onPanelDialogClose():void
		{
			_gamePopMsg="";
			if( m_controler.view ){
				m_controler.view.destroyVideo();
			}
			LobbyManager.getInstance().exitGame();
			LobbyManager.getInstance().exitGoodRoad();
			LobbyManager.getInstance().lobbyView.hideQuickThemeList();
		}
		
		//連接遊戲失敗
		public connectGameFailed():void {
			
			//沒有重連 && m_controler.reConnect() == false
			if( m_controler){
				Log.getInstance().log(this, "遊戲連接失敗");
				m_controler.onConnectFailed(SocketDefine.CONNECT_FAIL);
				
				var _sMsg:string = LobbyManager.getInstance().getLanguageString( Language.sException_Connect_GameServer_Failed );
				var _func:Function = function():void {
					_gamePopMsg="";
//					LobbyManager.getInstance().destroyGame();
					if( m_controler.view ){
						m_controler.view.destroyVideo();
					}
					
					if(LobbyManager.getInstance().bQuickChangeTable){
						LobbyManager.getInstance().destroyNewGame();
						LobbyManager.getInstance().lobbyView.enableQuick(true);
						LobbyManager.getInstance().bQuickChangeTable = false;
					}else{
						LobbyManager.getInstance().exitGame();
						LobbyManager.getInstance().exitGoodRoad();
						LobbyManager.getInstance().lobbyView.hideQuickThemeList();
					}
					
				}
				var _panelDialog:PanelDialog = LobbyManager.getInstance().showDialog(_sMsg , _func  , _func , true);
				
				LobbyManager.getInstance().aCloseWindowList.push( _panelDialog ); 	
				LobbyManager.getInstance().lobbyView.hideLoading();		
				
				
				
			}
		}
		
		//多桌斷線
		public connectMulitGameClosed():void {
			Log.getInstance().log(this, "多桌連接關閉");
			var _panelDialog:PanelDialog;
			var _sMsg:string ;
			var _func:Function 
			if(LobbyManager.getInstance().exitLevel == Define.EXIT_GAME){
				_sMsg = LobbyManager.getInstance().getLanguageString( Language.sEnterGoodFail );
				LobbyManager.getInstance().lobbyView.quickThemeList.currentTheme.setSelect(false);
				
			}else{
				_sMsg = LobbyManager.getInstance().getLanguageString( Language.sNetWork_Abnormal_Game );
				
			}
			
			_func = function():void {
				LobbyManager.getInstance().bImportant=false;
				_gamePopMsg="";
				if(LobbyManager.getInstance().exitLevel == Define.EXIT_GAME){
						LobbyManager.getInstance().destroyMultiSocket();
						LobbyManager.getInstance().lobbyView.enableQuick(true);
						LobbyManager.getInstance().bQuickToMultiTable=false;
				}else{
					LobbyManager.getInstance().exitMultiTable();
					LobbyManager.getInstance().lobbyView.themeList.enable(true);
				}
				
			}
			
			_panelDialog = LobbyManager.getInstance().showDialog(_sMsg , _func,_func,true);
			
			LobbyManager.getInstance().aCloseWindowList.push( _panelDialog ); 
		}
		
		
	}
}