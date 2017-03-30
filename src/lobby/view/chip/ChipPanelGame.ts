module lobby.view.chip {
	export class ChipPanelGame extends ChipPanel{
		public constructor( _iMode:number= 0 , _fReBet:Function=null) {
			
			this.mouseEnabled=false;
			
			m_fReBet = _fReBet;
			if( _iMode == 0 ) {
				m_mcAsset = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_LOBBY,"ChipPanelGameAsset");
				m_uWidth = 640;
			}
			else if( _iMode == 1 ){
				m_mcAsset = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_LOBBY,"ChipPanelGameAsset2");
				m_uWidth = 700;
				this.m_mcAsset.mouseEnabled=false;
			}
			this.addChild(m_mcAsset);
			this.cacheAsBitmap=true;
			super(m_mcAsset);
			
			btnReBet = new SingleButtonMC(m_mcAsset.mc_rebet, function(event:MouseEvent):void{
				SoundManager.getInstance().play(SoundPackage.sClick_Tools);
				rebet();
			});
			btnReBet.fOnOver = btnRebetTip;
			btnReBet.fOnOut = btnRebetTip;
			btnReBet.fDown = btnRebetTip;
			btnReBet.fDisable = btnRebetTip;
			btnReBet.enabled = true;
//			btnReBet_tw = new SingleButtonMC(m_mcAsset.mc_rebet_tw, function(event:MouseEvent):void{
//				rebet();
//			});
//			btnReBet_tw.fOnOver = function():void{
//				TipManager.getInstance().show(LobbyManager.getInstance().getLanguageString(Language.sTip_ChipPanel_Rebet),TipManager.RIGHT,m_mcAsset.localToGlobal(new Point(m_mcAsset.mc_rebet_tw.x,m_mcAsset.mc_rebet_tw.y+25)));
//			};
//			btnReBet_tw.fOnOut = function():void{
//				TipManager.getInstance().hide();
//			};
//			btnReBet_en = new SingleButtonMC(m_mcAsset.mc_rebet_en, function(event:MouseEvent):void{
//				rebet();
//			});
//			btnReBet_en.fOnOver = function():void{
//				TipManager.getInstance().show(LobbyManager.getInstance().getLanguageString(Language.sTip_ChipPanel_Rebet),TipManager.RIGHT,m_mcAsset.localToGlobal(new Point(m_mcAsset.mc_rebet_en.x,m_mcAsset.mc_rebet_en.y+25)));
//			};
//			btnReBet_en.fOnOut = function():void{
//				TipManager.getInstance().hide();
//			};
			
			m_btnRecharge = new SingleButtonMC(m_mcAsset.mc_3, function(event:MouseEvent):void{
				SoundManager.getInstance().play(SoundPackage.sClick_Tools);
				TipManager.getInstance().hide();
				LobbyManager.getInstance().hideAllPanel();
//				LobbyManager.getInstance().showDialog(LobbyManager.getInstance().getLanguageString(Language.sPlease_Wait));
				LobbyManager.getInstance().recharge();
			});
			m_btnRecharge.fOnOver = function():void{
				TipManager.getInstance().show(LobbyManager.getInstance().getLanguageString(Language.sTip_recharge),TipManager.LEFT,m_mcAsset.localToGlobal(new Point(m_mcAsset.mc_3.x+32,m_mcAsset.mc_3.y+21)));
			};
			m_btnRecharge.fOnOut = function():void{
				TipManager.getInstance().hide();
			};
			
			goldNum = new JNumber();
			goldNum.number = Player.getInstance().nCoin;
			m_mcAsset.mc_pos_2.addChild(goldNum);
			
			m_btnLeft = new SingleButtonMC(m_mcAsset.mc_left, function(event:MouseEvent):void{
				SoundManager.getInstance().play(SoundPackage.sClick_Tools);
//				iCurrentPage = m_iCurrentPage-1;
				LobbyManager.getInstance().setChipPage(m_iCurrentPage-1);
			});
			m_btnRight = new SingleButtonMC(m_mcAsset.mc_right, function(event:MouseEvent):void{
				SoundManager.getInstance().play(SoundPackage.sClick_Tools);
//				iCurrentPage = m_iCurrentPage+1;
				LobbyManager.getInstance().setChipPage(m_iCurrentPage+1);
			});
			
			btnSetting = new SingleButtonMC(m_mcAsset.mc_setting, function(event:MouseEvent):void{
				SoundManager.getInstance().play(SoundPackage.sClick_Tools);
				TipManager.getInstance().hide();
				LobbyManager.getInstance().hideAllPanel();
				goCustomPage();
				LobbyManager.getInstance().showPanelChipCustom(_iMode);
			});
			btnSetting.fOnOver = btnSettingTip;
			btnSetting.fOnOut = btnSettingTip;
			btnSetting.fDown = btnSettingTip;
			btnSetting.fDisable = btnSettingTip;
			btnSetting.enabled = true;
			
			m_spChipList = new Sprite();
			m_mcAsset.mc_pos_0.addChild(m_spChipList);
			
			hideHint();
			
			var aCustom : any[] = Player.getInstance().gameSetting.aCustChips;
			m_aChipValues = [[10,50,100,300,500],[1000,3000,5000,10000,30000],[30000,50000,100000,300000,500000],aCustom];
			m_iTotalPage = m_aChipValues.length;
			m_vectorChipList = new <ChipList>;
			var _chipList	:	ChipList;
			for (var i:number= 0; i < m_iTotalPage; i++) 
			{
				_chipList = new ChipList((_iMode==0?1:2), m_aChipValues[i], this as ChipPanelGame);
				m_spChipList.addChild(_chipList);
				_chipList.x = i*(m_uWidth);
				m_vectorChipList.push(_chipList);
			}
			currentChipItem = getDefault();
			if(currentChipItem==null){
				console.log("当前筹码获取异常...");
			}else{
				currentChipItem.select = true;
			}
			
			m_pageNumberList = new PageNumberListChip(1, (this as ChipPanelGame), m_aChipValues.length);
			m_mcAsset.mc_pos_1.addChild(m_pageNumberList);
			//			m_mcAsset.mc_pos_1.x = int((716-m_pageNumberList.width)*0.5);
			
			judgeArrow();
			
			onChangeLanguage();
		}
		
		private btnRebetTip():void{
			if(btnReBet){
				btnReBet.mcAsset.mc_tip.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			}
		}
		private btnSettingTip():void{
			if(btnSetting){
				btnSetting.mcAsset.mc_tip.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			}
		}
		
		 public turning():void{
			TweenLite.to(m_spChipList, Define.SPEED, {x:-m_vectorChipList[m_iCurrentPage].x});
			//			TweenUtil.moveToX(m_spChipList,50,50,10,-m_iCurrentPage*600,0.7);
		}
		
		 public onChangeLanguage():void{
//			switch(LobbyManager.getInstance().lobbyAuth.Lang){
//				case 0:
//					btnReBet = btnReBet_cn;
//					btnReBet_cn.visible = true;
//					btnReBet_tw.visible = false;
//					btnReBet_en.visible = false;
//					break;
//				
//				case 1:
//					btnReBet = btnReBet_tw;
//					btnReBet_cn.visible = false;
//					btnReBet_tw.visible = true;
//					btnReBet_en.visible = false;
//					break;
//				
//				case 2:
//					btnReBet = btnReBet_en;
//					btnReBet_cn.visible = false;
//					btnReBet_tw.visible = false;
//					btnReBet_en.visible = true;
//					break;
//			}
			
			btnRebetTip();
			btnSettingTip();
			
			if(m_mcAsset && m_mcAsset.mc_hint){
				(m_mcAsset.mc_hint as MovieClip).gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			}
		}
		
		 public getDefault():ChipItem{
			if(m_vectorChipList && m_vectorChipList.length>0){
				return m_vectorChipList[0].getFirstChipItem();
			}
			return null;
		}
		
		private rebet():void{
			TipManager.getInstance().hide();
			if(m_fReBet!=null){
				m_fReBet();
			}
		}
		
	}
}