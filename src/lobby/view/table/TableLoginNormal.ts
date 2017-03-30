module lobby.view.table {
	export class TableLoginNormal extends TableLogin{
//		private m_btnLogin	:	ButtonMcLanguage;			//进入游戏
		private m_btnLogin	:	MMovieClip;
		private m_btnLimit	:	ButtonMcLanguage;			//限红选择
		
		public constructor( _tableStruct:TableStruct ) {
		
			super();
			
			m_tableStruct = _tableStruct;
			
			m_tableStruct.BetLimitID = 1;	//默认为限红选择第一个
			m_limitStruct = LobbyData.getInstance().getBetLimitByGL(m_tableStruct.GameID, m_tableStruct.BetLimitID);
			
			switch(m_tableStruct.GameID){
				case GameDefine.BAC:
				case GameDefine.DTF:
					m_tableStruct.joinTableType = JoinTableType.NORMAL_PAIR_TABLE_SEAT;
					break;
				case GameDefine.ROU:
				case GameDefine.SIC:
					m_tableStruct.joinTableType = JoinTableType.SINGEL;
					break;
			}
			
			m_mcAsset = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_TABLE,"Table_Login_Normal_Asset") ;
			this.addChild(m_mcAsset);
			
			m_btnLogin = new MMovieClip(m_mcAsset.mc_1);
			m_btnLogin.mcAsset.buttonMode = true;
			m_btnLogin.mcAsset.mouseChildren = false;
			m_btnLogin.mcAsset.visible = false;
			m_btnLogin.gotoAndStop(normal);
			m_btnLogin.mcAsset.addEventListener(MouseEvent.ROLL_OVER,over);
			m_btnLogin.mcAsset.addEventListener(MouseEvent.ROLL_OUT,out);
			m_btnLogin.mcAsset.addEventListener(MouseEvent.CLICK,onClick);
			m_btnLogin.mcAsset.x = 430;
			
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
			
			m_btnLimit = new ButtonMcLanguage(m_mcAsset.mc_30, function():void{
				SoundManager.getInstance().play(SoundPackage.sClick_Tools);
				playerTableOwnStatusStruct = LobbyData.getInstance().getPlayerTableOwnStatusStruct(m_tableStruct.TableID);
				if(playerTableOwnStatusStruct){
					LobbyManager.getInstance().showDialog(LobbyManager.getInstance().getLanguageString(Language.sGame_Relogin), function():void{
						m_tableStruct.BetLimitID = playerTableOwnStatusStruct.CurrBetLimitID;
						LobbyManager.getInstance().gamePoint = getGlobalPoint();
						LobbyManager.getInstance().enterGame(m_tableStruct);	
					});
				}else{
					LobbyManager.getInstance().showLimitBet(m_tableStruct);
				}
			});
			m_btnLimit.mcAsset.alpha = 0;
			m_btnLimit.mcAsset.visible = false;
			
			onChangeLanguage();
		}
		
		 public destroy():void{
			
			if(m_btnLimit){
				m_btnLimit.destroy();
				m_btnLimit = null;
			}
			
			if(m_btnLogin){
				m_btnLogin.mcAsset.removeEventListener(MouseEvent.ROLL_OVER,over);
				m_btnLogin.mcAsset.removeEventListener(MouseEvent.ROLL_OUT,out);
				m_btnLogin.mcAsset.removeEventListener(MouseEvent.CLICK,onClick);
				m_btnLogin.dispose();
				m_btnLogin = null;
			}
			
			super.destroy();
		}
		
		
		 public show():void{
			super.show();
			
			if(m_btnLogin){
				m_btnLogin.mcAsset.visible = true;
				m_btnLogin.gotoAndPlay("SHOW");
			}
			if(m_btnLimit){
				m_btnLimit.mcAsset.visible = true;
				TweenLite.killTweensOf(m_btnLimit.mcAsset);
				TweenLite.to(m_btnLimit.mcAsset, Define.SPEED,{alpha:1});
			}
		}
		 public hide():void{
			super.hide();
			
			if(m_btnLogin){
				m_btnLogin.gotoAndPlay("HIDE");
			}
			if(m_btnLimit){
				TweenLite.killTweensOf(m_btnLimit.mcAsset);
				TweenLite.to(m_btnLimit.mcAsset, Define.SPEED,{alpha:0, onComplete:function():void{
					if(m_btnLimit){
						m_btnLimit.mcAsset.visible = false;
					}
				}});
			}
		}
		
//		 public init():void{
//			if(m_bInit){
//				return;
//			}else{
//				m_bInit = true;
//			}
//			
//			if(m_btnLogin){
//				if(m_bShow)
//				{
//					m_btnLogin.gotoAndPlay("SHOW");
//				}else{
//					m_btnLogin.gotoAndStop(normal);
//				}
//			}
//			
//		}
		
		protected over(event:MouseEvent):void
		{
			// TODO Auto-generated method stub
			if(m_btnLogin){
				m_btnLogin.gotoAndPlay("HOVER");
			}
		}
		
		protected out(event:MouseEvent):void
		{
			if(m_btnLogin){
				m_btnLogin.gotoAndStop("DEFAULT");
			}
			
		}
		
		protected onClick(event:MouseEvent):void
		{
			playerTableOwnStatusStruct = LobbyData.getInstance().getPlayerTableOwnStatusStruct(m_tableStruct.TableID);
			if(playerTableOwnStatusStruct){
				m_tableStruct.BetLimitID = playerTableOwnStatusStruct.CurrBetLimitID;
				LobbyManager.getInstance().showDialog(LobbyManager.getInstance().getLanguageString(Language.sGame_Relogin), function():void{
					enterGame();
				});
			}else{
				if(IsAllowToLogin()){
					m_tableStruct.BetLimitID = 1;
					enterGame();
				}
			}
			SoundManager.getInstance().play(SoundPackage.sEnterGame);
		}
		
		 public onChangeLanguage():void{
//			m_mcAsset.mc_0.tf_label.text = LobbyManager.getInstance().getLanguageString(Language.sLimitSelect);
			m_mcAsset.mc_1.mc_label.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			if(m_btnLimit){
				(m_btnLimit.mcAsset.getChildByName("mc_label") as MovieClip).gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			}
		}
		
		private enterGame():void{
			LobbyManager.getInstance().gamePoint = getGlobalPoint();
			LobbyManager.getInstance().enterGame(m_tableStruct);	
		}
		
		
		
	}
}