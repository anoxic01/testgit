module lobby.view.theme {
	export class QuickThemeItem extends BSprite{
		private m_bSelect			:	 boolean;					//选中状态
		public struct				:	ThemeStruct;				//数据结构
		private m_quickThemeList	:	QuickThemeList;				//厅别列表
		private m_bmpLabel			:	Bitmap;						//标签位图
		public sKey					:	String;						//标签键值
		
		private m_mcAsset			:	MovieClip;					//美术资源
		
		public constructor(_themeStruct:ThemeStruct, _quickThemeList:QuickThemeList, _themeID:number) {
		
			super();
			
			struct = _themeStruct;
			m_quickThemeList = _quickThemeList;
			
			switch(_themeID){
				case Define.THEME_DIAMOND:
					m_mcAsset = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_THEME,"Quick_ThemeItem_ZS_Asset") ;
					sKey = Language.sQuickBitmapdataZS;
					break;
				case Define.THEME_PLATINUM:
					m_mcAsset = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_THEME,"Quick_ThemeItem_BJ_Asset") ;
					sKey = Language.sQuickBitmapdataBJ;
					break;
				case Define.THEME_BID:
					m_mcAsset = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_THEME,"Quick_ThemeItem_JM_Asset") ;
					sKey = Language.sQuickBitmapdataJM;
					break;
				
				case Define.THEME_ARM:
					m_mcAsset = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_THEME,"Quick_ThemeItem_JB_Asset") ;
					sKey = Language.sQuickBitmapdataJB;
					break;
				case Define.THEME_VIP:
					m_mcAsset = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_THEME,"Quick_ThemeItem_GB_Asset") ;
					sKey = Language.sQuickBitmapdataGB;
					break;
				case Define.THEME_TELPHONE:
					m_mcAsset = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_THEME,"Quick_ThemeItem_DT_Asset") ;
					sKey = Language.sQuickBitmapdataDT;
					break;
				
				case Define.THEME_MULTI_TABLE:
					m_mcAsset = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_THEME,"Quick_ThemeItem_DZ_Asset") ;
					sKey = Language.sQuickBitmapdataDZ;
					break;
			}
			if(m_mcAsset==null){
				return;
			}
			this.addChild(m_mcAsset);
			
			m_bmpLabel = new Bitmap();
			m_mcAsset.mc_label.addChild(m_bmpLabel);
			m_mcAsset.mouseChildren = false;
									
			onChangeLanguage();
			
			this.buttonMode = true;
			this.addEventListener(mouse.MouseEvent.MOUSE_OVER, onOver);
			this.addEventListener(mouse.MouseEvent.MOUSE_OUT, onOut);
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, onClick);
		}
		
		get bSelect(): boolean
		{
			return m_bSelect;
		}

		set  bSelect(value: boolean)
		{
			m_bSelect = value;
		}

		 public destroy():void{
			this.removeEventListener(mouse.MouseEvent.MOUSE_OVER, onOver);
			this.removeEventListener(mouse.MouseEvent.MOUSE_OUT, onOut);
			this.removeEventListener(egret.TouchEvent.TOUCH_TAP, onClick);
			
			if(m_bmpLabel){
				if(m_bmpLabel.parent){
					m_bmpLabel.parent.removeChild(m_bmpLabel);
				}
				m_bmpLabel = null;
			}
			
			if(m_quickThemeList){
				m_quickThemeList = null;
			}
			
		}
		
		 public onChangeLanguage():void{
			if(m_bmpLabel){
				if(m_bSelect){
					m_bmpLabel.bitmapData = BitmapManager.getInstance().getBmpdLanguage(LobbyManager.getInstance().lobbyAuth.Lang, sKey+"_"+Language.sMouseOver);
					m_bmpLabel.smoothing = true;
					return;
				}
				onDefault();
			}
			if(m_mcAsset && m_mcAsset.mc_label){
				m_mcAsset.mc_label.x = int((116-m_mcAsset.mc_label.width)*0.5);
			}
		}
		
		public setSelect(_bSelect: boolean, _bTween: boolean=true):void{
			if(!_bSelect){
				onDefault();
			}
			//进入选择游戏
			if(m_bSelect != _bSelect){
				
				m_bSelect = _bSelect;
				
				if(m_bSelect){
					
					onMouseDown();
					SoundManager.getInstance().play(SoundPackage.sChangePage);
					LobbyManager.getInstance().lobbyView.quickThemeList.iCurrentTheme = struct.ThemeID;
					
					if(struct.IsTelBet){
						LobbyManager.getInstance().showDialog(LobbyManager.getInstance().getLanguageString(Language.sLeaveToTel),function():void{
								LobbyManager.getInstance().enterTelLobby();
								//								LobbyManager.getInstance().lobbyView.iCurrentQuick = 255;
								LobbyManager.getInstance().lobbyView.quickThemeList.currentTheme.setSelect(false);
							
							
						},function():void{
							//								LobbyManager.getInstance().lobbyView.iCurrentQuick = 255;
							LobbyManager.getInstance().lobbyView.quickThemeList.currentTheme.setSelect(false);
						});
						return;
					}
					switch(struct.ThemeID){
						case Define.THEME_MULTI_TABLE:
							LobbyManager.getInstance().showDialog(LobbyManager.getInstance().getLanguageString(Language.sLeaveToMultitable),function():void{
								
								if(LobbyManager.getInstance().IsCanChangeTable()){
									LobbyManager.getInstance().bQuickToMultiTable = true;
									LobbyManager.getInstance().lobbyView.quickThemeList.enable(false);
	//LobbyManager.getInstance().changeGame();
									LobbyManager.getInstance().setMultiSocket();
									LobbyManager.getInstance().sendMultiTableEntry();
									//LobbyManager.getInstance().showMultiTable();
									
								}else{
									LobbyManager.getInstance().lobbyView.quickThemeList.currentTheme.setSelect(false);
									LobbyManager.getInstance().showGameMessage(LobbyManager.getInstance().getLanguageString(Language.sCanNotExitGame));
								}
							},function():void{
//								LobbyManager.getInstance().lobbyView.iCurrentQuick = 255;
								LobbyManager.getInstance().lobbyView.quickThemeList.currentTheme.setSelect(false);
							});
							break;
						
						
						default:
							LobbyManager.getInstance().lobbyView.showQuickTableList(true);
							break;
						
					}
				}else{
					SoundManager.getInstance().play(SoundPackage.sClick_Tools);
					LobbyManager.getInstance().lobbyView.quickThemeList.currentTheme = null;
					LobbyManager.getInstance().lobbyView.hideQuickTableList(_bTween);
				}
			}
		}
		
		protected onOver(event:MouseEvent):void
		{
			if(m_bSelect){
				return;
			}
			onMouseOver();
		}
		
		protected onOut(event:MouseEvent):void
		{
			if(m_bSelect){
				return;
			}
			onDefault();
		}
		
		
		//		protected onDown(event:MouseEvent):void
		//		{
		//			if(m_bSelect){
		//				return;
		//			}
		//			onMouseDown();
		//		}
		
		
		protected onClick(event:MouseEvent):void
		{
			if(struct==null){
				LobbyManager.getInstance().showDialog(LobbyManager.getInstance().getLanguageString(Language.sPlease_Wait));
				return;
			}
			
			if(m_quickThemeList){
				m_quickThemeList.setCurrent(this);
				LobbyManager.getInstance().lobbyView.uCurrentThemeIDTemp = struct.ThemeID;
			}
			
			
		}
		
		public onDefault():void{
//			m_bmpAsset.gotoAndStop("DEFAULT");
			if(m_bmpLabel){
				m_bmpLabel.bitmapData = BitmapManager.getInstance().getBmpdLanguage(LobbyManager.getInstance().lobbyAuth.Lang, sKey+"_"+Language.sDefault);
				m_bmpLabel.smoothing = true;
			}
			
			if(m_mcAsset){
				m_mcAsset.gotoAndStop("DEFAULT");
			}
		}
		private onMouseOver():void{
//			m_bmpAsset.gotoAndStop("HOVER");
			if(m_bmpLabel){
				m_bmpLabel.bitmapData = BitmapManager.getInstance().getBmpdLanguage(LobbyManager.getInstance().lobbyAuth.Lang, sKey+"_"+Language.sMouseOver);
				m_bmpLabel.smoothing = true;
			}
			
			if(m_mcAsset){
				m_mcAsset.gotoAndStop("HOVER");
			}
//			SoundManager.getInstance().play(SoundPackage.sLobbyMouseOver);
		}
		private onMouseDown():void{
//			m_bmpAsset.gotoAndStop("HDOWN");
			if(m_bmpLabel){
				m_bmpLabel.bitmapData = BitmapManager.getInstance().getBmpdLanguage(LobbyManager.getInstance().lobbyAuth.Lang, sKey+"_"+Language.sMouseOver);
				m_bmpLabel.smoothing = true;
			}
			
			if(m_mcAsset){
				m_mcAsset.gotoAndStop("HOVER");
			}
		}	
		
		
	}
}