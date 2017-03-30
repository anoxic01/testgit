module lobby.view.table {
	export class TableLoginBid extends TableLogin{
//		private m_btnSideBet	:	ButtonMcLanguage;					//旁观下注
//		private m_btnLogin		:	ButtonMcLanguage;					//进座下注
		private m_btnSideBet	:	MMovieClip;							//旁观下注
		private m_btnLogin		:	MMovieClip;							//进座下注
		private m_bAnimation	:	 boolean;							//播放状态
		private m_bSideVisible	:	 boolean;
		private m_bLoginVisible	:	 boolean;
		
		public constructor(_tableStruct:TableStruct) {
		
			super();
			
			m_tableStruct = _tableStruct;
			
			m_limitStruct = LobbyData.getInstance().getBetLimitByGL(m_tableStruct.GameID, m_tableStruct.BetLimitID);
			
			m_mcAsset = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_TABLE,"Table_Login_Bid_Asset") ;
			
			m_btnSideBet = new MMovieClip(m_mcAsset.mc_0);
			m_btnSideBet.mcAsset.buttonMode = true;
			m_btnSideBet.mcAsset.mouseChildren = false;
			m_btnSideBet.mcAsset.visible = false;
			m_btnSideBet.gotoAndStop(normal);
			m_btnSideBet.mcAsset.addEventListener(MouseEvent.ROLL_OVER,btnSideBetover);
			m_btnSideBet.mcAsset.addEventListener(MouseEvent.ROLL_OUT,btnSideBetout);
			m_btnSideBet.mcAsset.addEventListener(MouseEvent.CLICK,btnSideBetonClick);
			m_btnSideBet.addFrameScript(19,function():void{
				if(m_btnSideBet){
					m_btnSideBet.currentFrame = 2;
				}
			});
			m_btnSideBet.addFrameScript(28,function():void{
				if(m_btnSideBet){
					m_btnSideBet.gotoAndStop(29);
				}
			});
			m_btnSideBet.addFrameScript(39,function():void{
				if(m_btnSideBet){
					m_btnSideBet.gotoAndStop(40);
				}
			});
//			m_btnSideBet.addFrameScript(showFrame,checkStatus);
			
			m_btnLogin = new MMovieClip(m_mcAsset.mc_1);
			m_btnLogin.mcAsset.buttonMode = true;
			m_btnLogin.mcAsset.mouseChildren = false;
			m_btnLogin.mcAsset.visible = false;
			m_btnLogin.gotoAndStop(normal);
			m_btnLogin.mcAsset.addEventListener(MouseEvent.ROLL_OVER,Loginover);
			m_btnLogin.mcAsset.addEventListener(MouseEvent.ROLL_OUT,Loginout);
			m_btnLogin.mcAsset.addEventListener(MouseEvent.CLICK,LoginonClick);
			m_btnLogin.addFrameScript(19,function():void{
				if(m_btnLogin){
					m_btnLogin.currentFrame = 2;
				}
			});
			m_btnLogin.addFrameScript(28,function():void{
				if(m_btnLogin){
					m_btnLogin.gotoAndStop(29);
				}
			});
			m_btnLogin.addFrameScript(39,function():void{
				if(m_btnLogin){
					m_btnLogin.gotoAndStop(40);
				}
			});
			
			this.addChild(m_mcAsset);
			
			onChangeLanguage();
		}
		
		protected btnSideBetover(event:MouseEvent):void
		{
			if(m_bAnimation){
				return;
			}
			if(m_btnSideBet){
				m_btnSideBet.gotoAndPlay("HOVER");
			}
		}
		
		protected btnSideBetout(event:MouseEvent):void
		{
			if(m_bAnimation){
				return;
			}
			if(m_btnSideBet){
				m_btnSideBet.gotoAndStop("DEFAULT");
			}
		}
		
		protected btnSideBetonClick(event:MouseEvent):void
		{
			playerTableOwnStatusStruct = LobbyData.getInstance().getPlayerTableOwnStatusStruct(m_tableStruct.TableID);
			if(playerTableOwnStatusStruct){
				LobbyManager.getInstance().showDialog(LobbyManager.getInstance().getLanguageString(Language.sGame_Relogin), function():void{
					LobbyManager.getInstance().gamePoint = getGlobalPoint();
					m_tableStruct.joinTableType = JoinTableType.PEEK_OTHER;
					LobbyManager.getInstance().enterGame(m_tableStruct);
				});
			}else{
				LobbyManager.getInstance().gamePoint = getGlobalPoint();
				m_tableStruct.joinTableType = JoinTableType.PEEK_OTHER;
				LobbyManager.getInstance().enterGame(m_tableStruct);
			}
			
			SoundManager.getInstance().play(SoundPackage.sEnterGame);
		}
		
		protected Loginover(event:MouseEvent):void
		{
			if(m_bAnimation){
				return;
			}
			if(m_btnLogin){
				m_btnLogin.gotoAndPlay("HOVER");
			}
		}
		
		protected Loginout(event:MouseEvent):void
		{
			if(m_bAnimation){
				return;
			}
			if(m_btnLogin){
				m_btnLogin.gotoAndStop("DEFAULT");
			}
		}
		
		protected LoginonClick(event:MouseEvent):void
		{
			playerTableOwnStatusStruct = LobbyData.getInstance().getPlayerTableOwnStatusStruct(m_tableStruct.TableID);
			if(playerTableOwnStatusStruct){
				LobbyManager.getInstance().showDialog(LobbyManager.getInstance().getLanguageString(Language.sGame_Relogin), function():void{
					LobbyManager.getInstance().gamePoint = getGlobalPoint();
					m_tableStruct.joinTableType = JoinTableType.PEEK_TABLEER;
					LobbyManager.getInstance().enterGame(m_tableStruct);
				});
			}else{
				if(IsAllowToLogin()){
					LobbyManager.getInstance().gamePoint = getGlobalPoint();
					m_tableStruct.joinTableType = JoinTableType.PEEK_TABLEER;
					LobbyManager.getInstance().enterGame(m_tableStruct);
				}
			}
			
			SoundManager.getInstance().play(SoundPackage.sEnterGame);
		}
		
		 public destroy():void{
			
			if(m_btnSideBet){
				m_btnSideBet.mcAsset.removeEventListener(MouseEvent.ROLL_OVER,btnSideBetover);
				m_btnSideBet.mcAsset.removeEventListener(MouseEvent.ROLL_OUT,btnSideBetout);
				m_btnSideBet.mcAsset.removeEventListener(MouseEvent.CLICK,btnSideBetonClick);
				m_btnSideBet.dispose();
				m_btnSideBet = null;
			}
			if(m_btnLogin){
				m_btnLogin.mcAsset.removeEventListener(MouseEvent.ROLL_OVER,Loginover);
				m_btnLogin.mcAsset.removeEventListener(MouseEvent.ROLL_OUT,Loginout);
				m_btnLogin.mcAsset.removeEventListener(MouseEvent.CLICK,LoginonClick);
				m_btnLogin.dispose();
				m_btnLogin = null;
			}
			
			super.destroy();
		}
		
		 public show():void{
			super.show();
			
//			m_bAnimation = true;
			
			m_btnSideBet.mcAsset.visible = m_bSideVisible;
			m_btnLogin.mcAsset.visible = m_bLoginVisible;
			
			if(m_btnSideBet && m_bSideVisible){
				m_btnSideBet.gotoAndPlay("SHOW");
			}
			if(m_btnLogin && m_bLoginVisible){
				m_btnLogin.gotoAndPlay("SHOW");
			}
		}
		 public hide():void{
			super.hide();
			
			if(m_btnSideBet && m_bSideVisible){
				m_btnSideBet.gotoAndPlay("HIDE");
			}
			if(m_btnLogin && m_bLoginVisible){
				m_btnLogin.gotoAndPlay("HIDE");
			}
		}
		
//		 public init():void{
//			if(m_bInit){
//				return;
//			}
//			
//			if(m_bShow)
//			{
//				if(m_btnSideBet){
//					m_btnSideBet.gotoAndPlay("SHOW");
//				}
//				if(m_btnLogin){
//					m_btnLogin.gotoAndPlay("SHOW");
//				}
//			}else
//			{
//				if(m_btnSideBet){
//					m_btnSideBet.gotoAndStop(normal);
//				}
//				if(m_btnLogin){
//					m_btnLogin.gotoAndStop(normal);
//				}
//			}
//		}
		
		
		 public onChangeLanguage():void{
			m_mcAsset.mc_0.mc_label.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			m_mcAsset.mc_1.mc_label.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
		}
		
		 public updateStatus():void{
			
			m_aShow = [];
			playerTableOwnStatusStruct = LobbyData.getInstance().getPlayerTableOwnStatusStruct(m_tableStruct.TableID);
			
			if(playerTableOwnStatusStruct){
				sideEnable(playerTableOwnStatusStruct.IsOtherBeter);
				loginEnable(!playerTableOwnStatusStruct.IsOtherBeter);
				if(playerTableOwnStatusStruct.IsOtherBeter){
					m_aShow.push(m_btnSideBet);
				}else{
					m_aShow.push(m_btnLogin);
				}
				sortBtn();
				return;
			}
			var arr : any[] = m_tableStruct.JoinTbStatus.split("");
			
			
			if(arr[2] == 0){	//旁注
				sideEnable(false);
			}else{
				sideEnable(true);
				m_aShow.push(m_btnSideBet);
			}
			
			if(arr[1] == 0){	//进桌
				loginEnable(false);
			}else{
				loginEnable(true);
				m_aShow.push(m_btnLogin);
			}
			
			
			sortBtn();
		}
		private sideEnable(_bEnable: boolean):void{
			m_bSideVisible = _bEnable;
			if(m_bShow){
				m_btnSideBet.mcAsset.gotoAndStop(showEnd);
				m_btnSideBet.mcAsset.visible = _bEnable;
			}
			
			m_btnSideBet.mcAsset.mouseEnabled = _bEnable;
			m_btnSideBet.mcAsset.enabled = _bEnable;
			m_btnSideBet.mcAsset.buttonMode = _bEnable;
		}
		private loginEnable(_bEnable: boolean):void{
			m_bLoginVisible = _bEnable;
			if(m_bShow){
				m_btnLogin.mcAsset.visible = _bEnable;
				m_btnLogin.mcAsset.gotoAndStop(showEnd);
			}
			
			m_btnLogin.mcAsset.mouseEnabled = _bEnable;
			m_btnLogin.mcAsset.enabled = _bEnable;
			m_btnLogin.mcAsset.buttonMode = _bEnable;
		}
		private checkStatus():void{
			m_btnSideBet.gotoAndStop(showEnd);
			m_bAnimation = false;
			
			playerTableOwnStatusStruct = LobbyData.getInstance().getPlayerTableOwnStatusStruct(m_tableStruct.TableID);
			if(playerTableOwnStatusStruct){
				if(playerTableOwnStatusStruct.IsOtherBeter){
					m_btnLogin.gotoAndStop("DISABLE");
				}else{
					m_btnSideBet.gotoAndStop("DISABLE");
				}
				return;
			}
			
			var arr : any[] = m_tableStruct.JoinTbStatus.split("");
			
			if(arr[1] == 0){	//进桌
				m_btnLogin.gotoAndStop("DISABLE");
			}
			
			if(arr[2] == 0){	//旁注
				m_btnSideBet.gotoAndStop("DISABLE");
			}
		}
		
	}
}