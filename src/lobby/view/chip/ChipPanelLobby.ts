module lobby.view.chip {
	export class ChipPanelLobby extends ChipPanel{
//		private var m_btnOk			:	SingleButtonMC;
//		private var m_btnCancel		:	SingleButtonMC;
//		private var m_bRebet		:	Boolean;
		private var m_bmpBet		:	Bitmap;					//下注金额
		private var m_bmpHaveBet	:	Bitmap;					//已下注金额
		
		public constructor( _fReBet:Function=null) {
//			m_fReBet = _fReBet;
			m_mcAsset = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_LOBBY,"ChipPanelLobbyAsset");
			this.addChild(m_mcAsset);
			
			super(m_mcAsset);
			
//			m_btnReBet = new SingleButtonMC(m_mcAsset.mc_rebet, function(event:MouseEvent):void{
//				if(m_fReBet!=null){
//					m_fReBet();
//				}
//			});
//			
//			m_btnCancel = new SingleButtonMC(m_mcAsset.mc_cancel, function(event:MouseEvent):void{
//				
//			});
//			m_btnOk = new SingleButtonMC(m_mcAsset.mc_ok, function(event:MouseEvent):void{
//				
//			});
						
			
			m_btnRecharge = new SingleButtonMC(m_mcAsset.mc_3, function(event:MouseEvent):void{
				SoundManager.getInstance().play(SoundPackage.sClick_Tools);
				TipManager.getInstance().hide();
				LobbyManager.getInstance().hideAllPanel();
//				LobbyManager.getInstance().showDialog(LobbyManager.getInstance().getLanguageString(Language.sPlease_Wait));
				LobbyManager.getInstance().recharge();
			});
			m_btnRecharge.fOnOver = function():void{
				TipManager.getInstance().show(LobbyManager.getInstance().getLanguageString(Language.sTip_recharge),TipManager.DOWN,m_mcAsset.localToGlobal(new Point(m_mcAsset.mc_3.x+21,m_mcAsset.mc_3.y)));
			};
			m_btnRecharge.fOnOut = function():void{
				TipManager.getInstance().hide();
			};
			
			goldNum = new JNumber();
			goldNum.number = Player.getInstance().nCoin;
			m_mcAsset.mc_pos_2.addChild(goldNum);
						
			m_bmpBet = new Bitmap();
			m_mcAsset.mc_pos_3.addChild(m_bmpBet);
			m_bmpBet.bitmapData = BitmapManager.getInstance().numberBetGCoin.conversion(0);
			m_bmpBet.smoothing = true;
			
			m_bmpHaveBet = new Bitmap();
			m_mcAsset.mc_pos_4.addChild(m_bmpHaveBet);
			m_bmpHaveBet.bitmapData = BitmapManager.getInstance().numberBetedGCoin.conversion(0);
			m_bmpHaveBet.smoothing = true;
			
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
				goCustomPage();
				LobbyManager.getInstance().showPanelChipCustom(2);
			});
			btnSetting.fOnOver = btnSettingTip;
			btnSetting.fOnOut = btnSettingTip;
			btnSetting.fDown = btnSettingTip;
			btnSetting.fDisable = btnSettingTip;
			btnSetting.enabled = true;
			
			m_spChipList = new Sprite();
			m_mcAsset.mc_pos_0.addChild(m_spChipList);
			
			hideHint();
			
			var aCustom : Array = Player.getInstance().gameSetting.aCustChips;
			m_aChipValues = [[10,50,100,300,500],[1000,3000,5000,10000,30000],[30000,50000,100000,300000,500000],aCustom];
			m_iTotalPage = m_aChipValues.length;
			m_vectorChipList = new Vector.<ChipList>;
			var _chipList	:	ChipList;
			for (var i:int = 0; i < m_iTotalPage; i++) 
			{
				_chipList = new ChipList(0, m_aChipValues[i], this);
				m_spChipList.addChild(_chipList);
				_chipList.x = i*(328);
				m_vectorChipList.push(_chipList);
			}
			currentChipItem = getDefault();
			if(currentChipItem==null){
				trace("当前筹码获取异常...");
			}else{
				currentChipItem.select = true;
			}
			
			m_pageNumberList = new PageNumberListChip(0, this, m_aChipValues.length);
			m_mcAsset.mc_pos_1.addChild(m_pageNumberList);
			m_mcAsset.mc_pos_1.x = int((308-m_pageNumberList.width)*0.5);
			
			judgeArrow();
			onChangeLanguage();
		}
		
		override public function destroy():void{
			if(m_bmpBet){
				if(m_bmpBet.parent){
					m_bmpBet.parent.removeChild(m_bmpBet);
				}
				m_bmpBet = null;
			}
			if(m_bmpHaveBet){
				if(m_bmpHaveBet.parent){
					m_bmpHaveBet.parent.removeChild(m_bmpHaveBet);
				}
				m_bmpHaveBet = null;
			}
			
			super.destroy();
		}
		
		override public function turning():void{
			TweenLite.to(m_spChipList, Define.SPEED, {x:-m_vectorChipList[m_iCurrentPage].x});
//			TweenUtil.moveToX(m_spChipList,50,50,10,-m_iCurrentPage*302,0.7);
		}
		
		override public function onChangeLanguage():void{
//			m_mcAsset.tf_0.text = LobbyManager.getInstance().getLanguageString(Language.sBetCount);
//			m_mcAsset.tf_1.text = LobbyManager.getInstance().getLanguageString(Language.sBetedCount);
//			(m_mcAsset.mc_total as MovieClip).gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
//			(m_mcAsset.mc_rebet.mc_label as MovieClip).gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
//			(m_mcAsset.mc_cancel.mc_label as MovieClip).gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
//			(m_mcAsset.mc_ok.mc_label as MovieClip).gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			if(m_mcAsset ){
				btnSettingTip();
				
				m_mcAsset.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
				
				if(m_mcAsset.mc_hint){
					(m_mcAsset.mc_hint as MovieClip).gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
				}
			}
		}
		
		public function updateBetTotal(_nValue:Number):void{
			if(m_bmpBet){
				m_bmpBet.bitmapData = BitmapManager.getInstance().numberChip.conversion(_nValue);
				m_bmpBet.smoothing = true;
			}
		}
		
		public function updateHaveBetTotal(_nValue:Number):void{
			if(m_bmpHaveBet){
				m_bmpHaveBet.bitmapData = BitmapManager.getInstance().numberBetedGCoin.conversion(_nValue);
				m_bmpHaveBet.smoothing = true;
			}
		}
		
		override public function getDefault():ChipItem{
			if(m_vectorChipList && m_vectorChipList.length>0){
				return m_vectorChipList[0].getFirstChipItem();
			}
			return null;
		}
		
		private function btnSettingTip():void{
//			if(m_btnSetting){
//				m_btnSetting.mcAsset.mc_tip.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
//			}
		}
		
		
	}
}