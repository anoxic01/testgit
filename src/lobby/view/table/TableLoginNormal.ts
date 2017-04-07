module lobby.view.table {
	export class TableLoginNormal extends TableLogin{
//		private this.m_btnLogin	:	ButtonMcLanguage;			//进入游戏
		private m_btnLogin	;
		private m_btnLimit	;			//限红选择
		
		public constructor( _tableStruct ) {
		
			super();
			
			this.m_tableStruct = _tableStruct;
			
			this.m_tableStruct.BetLimitID = 1;	//默认为限红选择第一个
			this.m_limitStruct = model.LobbyData.getInstance().getBetLimitByGL(this.m_tableStruct.GameID, this.m_tableStruct.BetLimitID);
			
			switch(this.m_tableStruct.GameID){
				case define.GameDefine.BAC:
				case define.GameDefine.DTF:
					this.m_tableStruct.joinTableType = model.type.JoinTableType.NORMAL_PAIR_TABLE_SEAT;
					break;
				case define.GameDefine.ROU:
				case define.GameDefine.SIC:
					this.m_tableStruct.joinTableType = model.type.JoinTableType.SINGEL;
					break;
			}
			
			this.m_mcAsset = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_TABLE,"Table_Login_Normal_Asset") ;
			this.addChild(this.m_mcAsset);
			
			this.m_btnLogin = new egret.MovieClip(this.m_mcAsset.mc_1);
			this.m_btnLogin.mcAsset.buttonMode = true;
			this.m_btnLogin.mcAsset.touchChildren = false;
			this.m_btnLogin.mcAsset.visible = false;
			this.m_btnLogin.gotoAndStop(this.normal);
			this.m_btnLogin.mcAsset.addEventListener(mouse.MouseEvent.ROLL_OVER,this.over);
			this.m_btnLogin.mcAsset.addEventListener(mouse.MouseEvent.ROLL_OUT,this.out);
			this.m_btnLogin.mcAsset.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClick);
			this.m_btnLogin.mcAsset.x = 430;
			
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
			
			this.m_btnLimit = new ui.button.ButtonMcLanguage(this.m_mcAsset.mc_30, function():void{
				manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
				this.playerTableOwnStatusStruct = model.LobbyData.getInstance().getPlayerTableOwnStatusStruct(this.m_tableStruct.TableID);
				if(this.playerTableOwnStatusStruct){
					manager.LobbyManager.getInstance().showDialog(manager.LobbyManager.getInstance().getLanguageString(language.Language.sGame_Relogin), function():void{
						this.m_tableStruct.BetLimitID = this.playerTableOwnStatusStruct.CurrBetLimitID;
						manager.LobbyManager.getInstance().gamePoint = this.getGlobalPoint();
						manager.LobbyManager.getInstance().enterGame(this.m_tableStruct);	
					});
				}else{
					manager.LobbyManager.getInstance().showLimitBet(this.m_tableStruct);
				}
			});
			this.m_btnLimit.mcAsset.alpha = 0;
			this.m_btnLimit.mcAsset.visible = false;
			
			this.onChangeLanguage();
		}
		
		 public destroy():void{
			
			if(this.m_btnLimit){
				this.m_btnLimit.destroy();
				this.m_btnLimit = null;
			}
			
			if(this.m_btnLogin){
				this.m_btnLogin.mcAsset.removeEventListener(mouse.MouseEvent.ROLL_OVER,this.over);
				this.m_btnLogin.mcAsset.removeEventListener(mouse.MouseEvent.ROLL_OUT,this.out);
				this.m_btnLogin.mcAsset.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClick);
				this.m_btnLogin.dispose();
				this.m_btnLogin = null;
			}
			
			super.destroy();
		}
		
		
		 public show():void{
			super.show();
			
			if(this.m_btnLogin){
				this.m_btnLogin.mcAsset.visible = true;
				this.m_btnLogin.gotoAndPlay("SHOW");
			}
			if(this.m_btnLimit){
				this.m_btnLimit.mcAsset.visible = true;
				egret.Tween.get(this.m_btnLimit.mcAsset).to({alpha:1}, define.Define.SPEED);
			}
		}
		 public hide():void{
			super.hide();
			
			if(this.m_btnLogin){
				this.m_btnLogin.gotoAndPlay("HIDE");
			}
			if(this.m_btnLimit){
				egret.Tween.get(this.m_btnLimit.mcAsset).to({alpha:0}, define.Define.SPEED).call(function():void{
					if(this.m_btnLimit){
						this.m_btnLimit.mcAsset.visible = false;
					}
				});
			}
		}
		
//		 public init():void{
//			if(m_bInit){
//				return;
//			}else{
//				m_bInit = true;
//			}
//			
//			if(this.m_btnLogin){
//				if(this.m_bShow)
//				{
//					this.m_btnLogin.gotoAndPlay("SHOW");
//				}else{
//					this.m_btnLogin.gotoAndStop(normal);
//				}
//			}
//			
//		}
		
		protected over(event:MouseEvent):void
		{
			// TODO Auto-generated method stub
			if(this.m_btnLogin){
				this.m_btnLogin.gotoAndPlay("HOVER");
			}
		}
		
		protected out(event:MouseEvent):void
		{
			if(this.m_btnLogin){
				this.m_btnLogin.gotoAndStop("DEFAULT");
			}
			
		}
		
		protected onClick(event:MouseEvent):void
		{
			this.playerTableOwnStatusStruct = model.LobbyData.getInstance().getPlayerTableOwnStatusStruct(this.m_tableStruct.TableID);
			if(this.playerTableOwnStatusStruct){
				this.m_tableStruct.BetLimitID = this.playerTableOwnStatusStruct.CurrBetLimitID;
				manager.LobbyManager.getInstance().showDialog(manager.LobbyManager.getInstance().getLanguageString(language.Language.sGame_Relogin), function():void{
					this.enterGame();
				});
			}else{
				if(this.IsAllowToLogin()){
					this.m_tableStruct.BetLimitID = 1;
					this.enterGame();
				}
			}
			manager.SoundManager.getInstance().play(sound.SoundPackage.sEnterGame);
		}
		
		 public onChangeLanguage():void{
//			this.m_mcAsset.mc_0.tf_label.text = manager.LobbyManager.getInstance().getLanguageString(language.Language.sLimitSelect);
			this.m_mcAsset.mc_1.mc_label.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			if(this.m_btnLimit){
				(this.m_btnLimit.mcAsset.getChildByName("mc_label")).gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			}
		}
		
		private enterGame():void{
			manager.LobbyManager.getInstance().gamePoint = this.getGlobalPoint();
			manager.LobbyManager.getInstance().enterGame(this.m_tableStruct);	
		}
		
		
		
	}
}