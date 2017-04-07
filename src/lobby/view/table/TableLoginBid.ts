module lobby.view.table {
	export class TableLoginBid extends TableLogin{
//		private this.m_btnSideBet	:	ButtonMcLanguage;					//旁观下注
//		private this.m_btnLogin		:	ButtonMcLanguage;					//进座下注
		private m_btnSideBet	;							//旁观下注
		private m_btnLogin		;							//进座下注
		private m_bAnimation	:	 boolean;							//播放状态
		private m_bSideVisible	:	 boolean;
		private m_bLoginVisible	:	 boolean;
		
		public constructor(_tableStruct) {
		
			super();
			
			this.m_tableStruct = _tableStruct;
			
			this.m_limitStruct = model.LobbyData.getInstance().getBetLimitByGL(this.m_tableStruct.GameID, this.m_tableStruct.BetLimitID);
			
			this.m_mcAsset = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_TABLE,"Table_Login_Bid_Asset") ;
			
			this.m_btnSideBet = new egret.MovieClip(this.m_mcAsset.mc_0);
			this.m_btnSideBet.mcAsset.buttonMode = true;
			this.m_btnSideBet.mcAsset.touchChildren = false;
			this.m_btnSideBet.mcAsset.visible = false;
			this.m_btnSideBet.gotoAndStop(this.normal);
			this.m_btnSideBet.mcAsset.addEventListener(mouse.MouseEvent.ROLL_OVER,this.btnSideBetover);
			this.m_btnSideBet.mcAsset.addEventListener(mouse.MouseEvent.ROLL_OUT,this.btnSideBetout);
			this.m_btnSideBet.mcAsset.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btnSideBetonClick);
			this.m_btnSideBet.addFrameScript(19,function():void{
				if(this.m_btnSideBet){
					this.m_btnSideBet.currentFrame = 2;
				}
			});
			this.m_btnSideBet.addFrameScript(28,function():void{
				if(this.m_btnSideBet){
					this.m_btnSideBet.gotoAndStop(29);
				}
			});
			this.m_btnSideBet.addFrameScript(39,function():void{
				if(this.m_btnSideBet){
					this.m_btnSideBet.gotoAndStop(40);
				}
			});
//			this.m_btnSideBet.addFrameScript(showFrame,checkStatus);
			
			this.m_btnLogin = new egret.MovieClip(this.m_mcAsset.mc_1);
			this.m_btnLogin.mcAsset.buttonMode = true;
			this.m_btnLogin.mcAsset.touchChildren = false;
			this.m_btnLogin.mcAsset.visible = false;
			this.m_btnLogin.gotoAndStop(this.normal);
			this.m_btnLogin.mcAsset.addEventListener(mouse.MouseEvent.ROLL_OVER,this.Loginover);
			this.m_btnLogin.mcAsset.addEventListener(mouse.MouseEvent.ROLL_OUT,this.Loginout);
			this.m_btnLogin.mcAsset.addEventListener(egret.TouchEvent.TOUCH_TAP,this.LoginonClick);
			this.m_btnLogin.addFrameScript(19,function():void{
				if(this.m_btnLogin){
					this.m_btnLogin.currentFrame = 2;
				}
			});
			this.m_btnLogin.addFrameScript(28,function():void{
				if(this.m_btnLogin){
					this.m_btnLogin.gotoAndStop(29);
				}
			});
			this.m_btnLogin.addFrameScript(39,function():void{
				if(this.m_btnLogin){
					this.m_btnLogin.gotoAndStop(40);
				}
			});
			
			this.addChild(this.m_mcAsset);
			
			this.onChangeLanguage();
		}
		
		protected btnSideBetover(event:MouseEvent):void
		{
			if(this.m_bAnimation){
				return;
			}
			if(this.m_btnSideBet){
				this.m_btnSideBet.gotoAndPlay("HOVER");
			}
		}
		
		protected btnSideBetout(event:MouseEvent):void
		{
			if(this.m_bAnimation){
				return;
			}
			if(this.m_btnSideBet){
				this.m_btnSideBet.gotoAndStop("DEFAULT");
			}
		}
		
		protected btnSideBetonClick(event:MouseEvent):void
		{
			this.playerTableOwnStatusStruct = model.LobbyData.getInstance().getPlayerTableOwnStatusStruct(this.m_tableStruct.TableID);
			if(this.playerTableOwnStatusStruct){
				manager.LobbyManager.getInstance().showDialog(manager.LobbyManager.getInstance().getLanguageString(language.Language.sGame_Relogin), function():void{
					manager.LobbyManager.getInstance().gamePoint = this.getGlobalPoint();
					this.m_tableStruct.joinTableType = model.type.JoinTableType.PEEK_OTHER;
					manager.LobbyManager.getInstance().enterGame(this.m_tableStruct);
				});
			}else{
				manager.LobbyManager.getInstance().gamePoint = this.getGlobalPoint();
				this.m_tableStruct.joinTableType = model.type.JoinTableType.PEEK_OTHER;
				manager.LobbyManager.getInstance().enterGame(this.m_tableStruct);
			}
			
			manager.SoundManager.getInstance().play(sound.SoundPackage.sEnterGame);
		}
		
		protected Loginover(event:MouseEvent):void
		{
			if(this.m_bAnimation){
				return;
			}
			if(this.m_btnLogin){
				this.m_btnLogin.gotoAndPlay("HOVER");
			}
		}
		
		protected Loginout(event:MouseEvent):void
		{
			if(this.m_bAnimation){
				return;
			}
			if(this.m_btnLogin){
				this.m_btnLogin.gotoAndStop("DEFAULT");
			}
		}
		
		protected LoginonClick(event:MouseEvent):void
		{
			this.playerTableOwnStatusStruct = model.LobbyData.getInstance().getPlayerTableOwnStatusStruct(this.m_tableStruct.TableID);
			if(this.playerTableOwnStatusStruct){
				manager.LobbyManager.getInstance().showDialog(manager.LobbyManager.getInstance().getLanguageString(language.Language.sGame_Relogin), function():void{
					manager.LobbyManager.getInstance().gamePoint = this.getGlobalPoint();
					this.m_tableStruct.joinTableType = model.type.JoinTableType.PEEK_TABLEER;
					manager.LobbyManager.getInstance().enterGame(this.m_tableStruct);
				});
			}else{
				if(this.IsAllowToLogin()){
					manager.LobbyManager.getInstance().gamePoint = this.getGlobalPoint();
					this.m_tableStruct.joinTableType = model.type.JoinTableType.PEEK_TABLEER;
					manager.LobbyManager.getInstance().enterGame(this.m_tableStruct);
				}
			}
			
			manager.SoundManager.getInstance().play(sound.SoundPackage.sEnterGame);
		}
		
		 public destroy():void{
			
			if(this.m_btnSideBet){
				this.m_btnSideBet.mcAsset.removeEventListener(mouse.MouseEvent.ROLL_OVER,this.btnSideBetover);
				this.m_btnSideBet.mcAsset.removeEventListener(mouse.MouseEvent.ROLL_OUT,this.btnSideBetout);
				this.m_btnSideBet.mcAsset.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.btnSideBetonClick);
				this.m_btnSideBet.dispose();
				this.m_btnSideBet = null;
			}
			if(this.m_btnLogin){
				this.m_btnLogin.mcAsset.removeEventListener(mouse.MouseEvent.ROLL_OVER,this.Loginover);
				this.m_btnLogin.mcAsset.removeEventListener(mouse.MouseEvent.ROLL_OUT,this.Loginout);
				this.m_btnLogin.mcAsset.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.LoginonClick);
				this.m_btnLogin.dispose();
				this.m_btnLogin = null;
			}
			
			super.destroy();
		}
		
		 public show():void{
			super.show();
			
//			this.m_bAnimation = true;
			
			this.m_btnSideBet.mcAsset.visible = this.m_bSideVisible;
			this.m_btnLogin.mcAsset.visible = this.m_bLoginVisible;
			
			if(this.m_btnSideBet && this.m_bSideVisible){
				this.m_btnSideBet.gotoAndPlay("SHOW");
			}
			if(this.m_btnLogin && this.m_bLoginVisible){
				this.m_btnLogin.gotoAndPlay("SHOW");
			}
		}
		 public hide():void{
			super.hide();
			
			if(this.m_btnSideBet && this.m_bSideVisible){
				this.m_btnSideBet.gotoAndPlay("HIDE");
			}
			if(this.m_btnLogin && this.m_bLoginVisible){
				this.m_btnLogin.gotoAndPlay("HIDE");
			}
		}
		
//		 public init():void{
//			if(m_bInit){
//				return;
//			}
//			
//			if(this.m_bShow)
//			{
//				if(this.m_btnSideBet){
//					this.m_btnSideBet.gotoAndPlay("SHOW");
//				}
//				if(this.m_btnLogin){
//					this.m_btnLogin.gotoAndPlay("SHOW");
//				}
//			}else
//			{
//				if(this.m_btnSideBet){
//					this.m_btnSideBet.gotoAndStop(normal);
//				}
//				if(this.m_btnLogin){
//					this.m_btnLogin.gotoAndStop(normal);
//				}
//			}
//		}
		
		
		 public onChangeLanguage():void{
			this.m_mcAsset.mc_0.mc_label.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			this.m_mcAsset.mc_1.mc_label.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
		}
		
		 public updateStatus():void{
			
			this.m_aShow = [];
			this.playerTableOwnStatusStruct = model.LobbyData.getInstance().getPlayerTableOwnStatusStruct(this.m_tableStruct.TableID);
			
			if(this.playerTableOwnStatusStruct){
				this.sideEnable(this.playerTableOwnStatusStruct.IsOtherBeter);
				this.loginEnable(!this.playerTableOwnStatusStruct.IsOtherBeter);
				if(this.playerTableOwnStatusStruct.IsOtherBeter){
					this.m_aShow.push(this.m_btnSideBet);
				}else{
					this.m_aShow.push(this.m_btnLogin);
				}
				this.sortBtn();
				return;
			}
			var arr : any[] = this.m_tableStruct.JoinTbStatus.split("");
			
			
			if(arr[2] == 0){	//旁注
				this.sideEnable(false);
			}else{
				this.sideEnable(true);
				this.m_aShow.push(this.m_btnSideBet);
			}
			
			if(arr[1] == 0){	//进桌
				this.loginEnable(false);
			}else{
				this.loginEnable(true);
				this.m_aShow.push(this.m_btnLogin);
			}
			
			
			this.sortBtn();
		}
		private sideEnable(_bEnable: boolean):void{
			this.m_bSideVisible = _bEnable;
			if(this.m_bShow){
				this.m_btnSideBet.mcAsset.gotoAndStop(this.showEnd);
				this.m_btnSideBet.mcAsset.visible = _bEnable;
			}
			
			this.m_btnSideBet.mcAsset.touchEnabled = _bEnable;
			this.m_btnSideBet.mcAsset.enabled = _bEnable;
			this.m_btnSideBet.mcAsset.buttonMode = _bEnable;
		}
		private loginEnable(_bEnable: boolean):void{
			this.m_bLoginVisible = _bEnable;
			if(this.m_bShow){
				this.m_btnLogin.mcAsset.visible = _bEnable;
				this.m_btnLogin.mcAsset.gotoAndStop(this.showEnd);
			}
			
			this.m_btnLogin.mcAsset.touchEnabled = _bEnable;
			this.m_btnLogin.mcAsset.enabled = _bEnable;
			this.m_btnLogin.mcAsset.buttonMode = _bEnable;
		}
		private checkStatus():void{
			this.m_btnSideBet.gotoAndStop(this.showEnd);
			this.m_bAnimation = false;
			
			this.playerTableOwnStatusStruct = model.LobbyData.getInstance().getPlayerTableOwnStatusStruct(this.m_tableStruct.TableID);
			if(this.playerTableOwnStatusStruct){
				if(this.playerTableOwnStatusStruct.IsOtherBeter){
					this.m_btnLogin.gotoAndStop("DISABLE");
				}else{
					this.m_btnSideBet.gotoAndStop("DISABLE");
				}
				return;
			}
			
			var arr : any[] = this.m_tableStruct.JoinTbStatus.split("");
			
			if(arr[1] == 0){	//进桌
				this.m_btnLogin.gotoAndStop("DISABLE");
			}
			
			if(arr[2] == 0){	//旁注
				this.m_btnSideBet.gotoAndStop("DISABLE");
			}
		}
		
	}
}