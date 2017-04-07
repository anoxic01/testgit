module lobby.view.theme {
	export class QuickThemeItem extends BSprite{
		private m_bSelect			:	boolean;					//选中状态
		public struct				;				//数据结构
		private m_quickThemeList	:	QuickThemeList;				//厅别列表
		private m_bmpLabel			;						//标签位图
		public sKey					:	String;						//标签键值
		
		private m_mcAsset			;					//美术资源
		
		public constructor(_themeStruct, _quickThemeList:QuickThemeList, _themeID:number) {
		
			super();
			
			this.struct = _themeStruct;
			this.m_quickThemeList = _quickThemeList;
			
			switch(_themeID){
				case define.Define.THEME_6:
					this.m_mcAsset = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_THEME,"Quick_ThemeItem_ZS_Asset") ;
					this.sKey = language.Language.sQuickBitmapdataZS;
					break;
				case define.Define.THEME_0:
					this.m_mcAsset = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_THEME,"Quick_ThemeItem_BJ_Asset") ;
					this.sKey = language.Language.sQuickBitmapdataBJ;
					break;
				case define.Define.THEME_5:
					this.m_mcAsset = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_THEME,"Quick_ThemeItem_JM_Asset") ;
					this.sKey = language.Language.sQuickBitmapdataJM;
					break;
				
				case define.Define.THEME_3:
					this.m_mcAsset = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_THEME,"Quick_ThemeItem_JB_Asset") ;
					this.sKey = language.Language.sQuickBitmapdataJB;
					break;
				case define.Define.THEME_4:
					this.m_mcAsset = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_THEME,"Quick_ThemeItem_GB_Asset") ;
					this.sKey = language.Language.sQuickBitmapdataGB;
					break;
				case define.Define.THEME_1:
					this.m_mcAsset = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_THEME,"Quick_ThemeItem_DT_Asset") ;
					this.sKey = language.Language.sQuickBitmapdataDT;
					break;
				
				case define.Define.THEME_2:
					this.m_mcAsset = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_THEME,"Quick_ThemeItem_DZ_Asset") ;
					this.sKey = language.Language.sQuickBitmapdataDZ;
					break;
			}
			if(this.m_mcAsset==null){
				return;
			}
			this.addChild(this.m_mcAsset);
			
			this.m_bmpLabel = new egret.Bitmap();
			this.m_mcAsset.mc_label.addChild(this.m_bmpLabel);
			this.m_mcAsset.touchChildren = false;
									
			this.onChangeLanguage();
			
			this.touchEnabled = true;
			this.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.onOver, this);
			this.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.onOut, this);
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
		}
		
		get bSelect(): boolean
		{
			return this.m_bSelect;
		}

		set  bSelect(value: boolean)
		{
			this.m_bSelect = value;
		}

		 public destroy():void{
			this.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.onOver, this);
			this.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.onOut, this);
			this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
			
			if(this.m_bmpLabel){
				if(this.m_bmpLabel.parent){
					this.m_bmpLabel.parent.removeChild(this.m_bmpLabel);
				}
				this.m_bmpLabel = null;
			}
			
			if(this.m_quickThemeList){
				this.m_quickThemeList = null;
			}
			
		}
		
		 public onChangeLanguage():void{
			if(this.m_bmpLabel){
				if(this.m_bSelect){
					this.m_bmpLabel.bitmapData = manager.BitmapManager.getInstance().getBmpdLanguage(manager.LobbyManager.getInstance().lobbyAuth.Lang, this.sKey+"_"+language.Language.sMouseOver);
					this.m_bmpLabel.smoothing = true;
					return;
				}
				this.onDefault();
			}
			if(this.m_mcAsset && this.m_mcAsset.mc_label){
				this.m_mcAsset.mc_label.x = ((116-this.m_mcAsset.mc_label.width)*0.5);
			}
		}
		
		public setSelect(_bSelect: boolean, _bTween: boolean=true):void{
			if(!_bSelect){
				this.onDefault();
			}
			//进入选择游戏
			if(this.m_bSelect != _bSelect){
				
				this.m_bSelect = _bSelect;
				
				if(this.m_bSelect){
					
					this.onMouseDown();
					manager.SoundManager.getInstance().play(sound.SoundPackage.sChangePage);
					manager.LobbyManager.getInstance().lobbyView.quickThemeList.iCurrentTheme = this.struct.ThemeID;
					
					if(this.struct.IsTelBet){
						manager.LobbyManager.getInstance().showDialog(manager.LobbyManager.getInstance().getLanguageString(language.Language.sLeaveToTel),function():void{
								manager.LobbyManager.getInstance().enterTelLobby();
								//								manager.LobbyManager.getInstance().lobbyView.iCurrentQuick = 255;
								manager.LobbyManager.getInstance().lobbyView.quickThemeList.currentTheme.setSelect(false);
							
							
						},function():void{
							//								manager.LobbyManager.getInstance().lobbyView.iCurrentQuick = 255;
							manager.LobbyManager.getInstance().lobbyView.quickThemeList.currentTheme.setSelect(false);
						});
						return;
					}
					switch(this.struct.ThemeID){
						case define.Define.THEME_2:
							manager.LobbyManager.getInstance().showDialog(manager.LobbyManager.getInstance().getLanguageString(language.Language.sLeaveToMultitable),function():void{
								
								if(manager.LobbyManager.getInstance().IsCanChangeTable()){
									manager.LobbyManager.getInstance().bQuickToMultiTable = true;
									manager.LobbyManager.getInstance().lobbyView.quickThemeList.enable(false);
	//manager.LobbyManager.getInstance().changeGame();
									manager.LobbyManager.getInstance().setMultiSocket();
									manager.LobbyManager.getInstance().sendMultiTableEntry();
									//manager.LobbyManager.getInstance().showMultiTable();
									
								}else{
									manager.LobbyManager.getInstance().lobbyView.quickThemeList.currentTheme.setSelect(false);
									manager.LobbyManager.getInstance().showGameMessage(manager.LobbyManager.getInstance().getLanguageString(language.Language.sCanNotExitGame));
								}
							},function():void{
//								manager.LobbyManager.getInstance().lobbyView.iCurrentQuick = 255;
								manager.LobbyManager.getInstance().lobbyView.quickThemeList.currentTheme.setSelect(false);
							});
							break;
						
						
						default:
							manager.LobbyManager.getInstance().lobbyView.showQuickTableList(true);
							break;
						
					}
				}else{
					manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
					manager.LobbyManager.getInstance().lobbyView.quickThemeList.currentTheme = null;
					manager.LobbyManager.getInstance().lobbyView.hideQuickTableList(_bTween);
				}
			}
		}
		
		protected onOver(event:MouseEvent):void
		{
			if(this.m_bSelect){
				return;
			}
			this.onMouseOver();
		}
		
		protected onOut(event:MouseEvent):void
		{
			if(this.m_bSelect){
				return;
			}
			this.onDefault();
		}
		
		
		//		protected onDown(event:MouseEvent):void
		//		{
		//			if(this.m_bSelect){
		//				return;
		//			}
		//			onMouseDown();
		//		}
		
		
		protected onClick(event:MouseEvent):void
		{
			if(this.struct==null){
				manager.LobbyManager.getInstance().showDialog(manager.LobbyManager.getInstance().getLanguageString(language.Language.sPlease_Wait));
				return;
			}
			
			if(this.m_quickThemeList){
				this.m_quickThemeList.setCurrent(this);
				manager.LobbyManager.getInstance().lobbyView.uCurrentThemeIDTemp = this.struct.ThemeID;
			}
			
			
		}
		
		public onDefault():void{
//			m_bmpAsset.gotoAndStop("DEFAULT");
			if(this.m_bmpLabel){
				this.m_bmpLabel.bitmapData = manager.BitmapManager.getInstance().getBmpdLanguage(manager.LobbyManager.getInstance().lobbyAuth.Lang, this.sKey+"_"+language.Language.sDefault);
				this.m_bmpLabel.smoothing = true;
			}
			
			if(this.m_mcAsset){
				this.m_mcAsset.gotoAndStop("DEFAULT");
			}
		}
		private onMouseOver():void{
//			m_bmpAsset.gotoAndStop("HOVER");
			if(this.m_bmpLabel){
				this.m_bmpLabel.bitmapData = manager.BitmapManager.getInstance().getBmpdLanguage(manager.LobbyManager.getInstance().lobbyAuth.Lang, this.sKey+"_"+language.Language.sMouseOver);
				this.m_bmpLabel.smoothing = true;
			}
			
			if(this.m_mcAsset){
				this.m_mcAsset.gotoAndStop("HOVER");
			}
//			manager.SoundManager.getInstance().play(sound.SoundPackage.sLobbyMouseOver);
		}
		private onMouseDown():void{
//			m_bmpAsset.gotoAndStop("HDOWN");
			if(this.m_bmpLabel){
				this.m_bmpLabel.bitmapData = manager.BitmapManager.getInstance().getBmpdLanguage(manager.LobbyManager.getInstance().lobbyAuth.Lang, this.sKey+"_"+language.Language.sMouseOver);
				this.m_bmpLabel.smoothing = true;
			}
			
			if(this.m_mcAsset){
				this.m_mcAsset.gotoAndStop("HOVER");
			}
		}	
		
		
	}
}