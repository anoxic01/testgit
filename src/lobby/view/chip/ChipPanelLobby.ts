module lobby.view.chip {
	export class ChipPanelLobby extends ChipPanel{
//		private m_btnOk			:	ui.button.SingleButtonMC;
//		private m_btnCancel		:	ui.button.SingleButtonMC;
//		private m_bRebet		:	 boolean;
		private m_bmpBet		;					//下注金额
		private m_bmpHaveBet	;					//已下注金额
		
		public constructor( _fReBet:Function=null) {
			super();
//			m_fReBet = _fReBet;
			this.m_mcAsset = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_LOBBY,"ChipPanelLobbyAsset");
			this.addChild(this.m_mcAsset);
			
			super(this.m_mcAsset);
			
//			m_btnReBet = new ui.button.SingleButtonMC(this.m_mcAsset.mc_rebet, function(event:MouseEvent):void{
//				if(m_fReBet!=null){
//					m_fReBet();
//				}
//			});
//			
//			m_btnCancel = new ui.button.SingleButtonMC(this.m_mcAsset.mc_cancel, function(event:MouseEvent):void{
//				
//			});
//			m_btnOk = new ui.button.SingleButtonMC(this.m_mcAsset.mc_ok, function(event:MouseEvent):void{
//				
//			});
						
			
			this.m_btnRecharge = new ui.button.SingleButtonMC(this.m_mcAsset.mc_3, function(event:MouseEvent):void{
				manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
				manager.TipManager.getInstance().hide();
				manager.LobbyManager.getInstance().hideAllPanel();
//				manager.LobbyManager.getInstance().showDialog(manager.LobbyManager.getInstance().getLanguageString(Language.sPlease_Wait));
				manager.LobbyManager.getInstance().recharge();
			});
			this.m_btnRecharge.fOnOver = function():void{
				manager.TipManager.getInstance().show(manager.LobbyManager.getInstance().getLanguageString(language.Language.sTip_recharge),manager.TipManager.DOWN,this.m_mcAsset.localToGlobal(new egret.Point(this.m_mcAsset.mc_3.x+21,this.m_mcAsset.mc_3.y)));
			};
			this.m_btnRecharge.fOnOut = function():void{
				manager.TipManager.getInstance().hide();
			};
			
			this.goldNum = new display.JNumber();
			this.goldNum.number = model.Player.getInstance().nCoin;
			this.m_mcAsset.mc_pos_2.addChild(this.goldNum);
						
			this.m_bmpBet = new egret.Bitmap();
			this.m_mcAsset.mc_pos_3.addChild(this.m_bmpBet);
			this.m_bmpBet.bitmapData = manager.BitmapManager.getInstance().numberBetGCoin.conversion(0);
			this.m_bmpBet.smoothing = true;
			
			this.m_bmpHaveBet = new egret.Bitmap();
			this.m_mcAsset.mc_pos_4.addChild(this.m_bmpHaveBet);
			this.m_bmpHaveBet.bitmapData = manager.BitmapManager.getInstance().numberBetedGCoin.conversion(0);
			this.m_bmpHaveBet.smoothing = true;
			
			this.m_btnLeft = new ui.button.SingleButtonMC(this.m_mcAsset.mc_left, function(event:MouseEvent):void{
				manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
//				iCurrentPage = this.m_iCurrentPage-1;
				manager.LobbyManager.getInstance().setChipPage(this.m_iCurrentPage-1);
			});
			this.m_btnRight = new ui.button.SingleButtonMC(this.m_mcAsset.mc_right, function(event:MouseEvent):void{
				manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
//				iCurrentPage = this.m_iCurrentPage+1;
				manager.LobbyManager.getInstance().setChipPage(this.m_iCurrentPage+1);
			});
			
			this.btnSetting = new ui.button.SingleButtonMC(this.m_mcAsset.mc_setting, function(event:MouseEvent):void{
				manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
				manager.TipManager.getInstance().hide();
				this.goCustomPage();
				manager.LobbyManager.getInstance().showPanelChipCustom(2);
			});
			this.btnSetting.fOnOver = this.btnSettingTip;
			this.btnSetting.fOnOut = this.btnSettingTip;
			this.btnSetting.fDown = this.btnSettingTip;
			this.btnSetting.fDisable = this.btnSettingTip;
			this.btnSetting.enabled = true;
			
			this.m_spChipList = new egret.Sprite();
			this.m_mcAsset.mc_pos_0.addChild(this.m_spChipList);
			
			this.hideHint();
			
			var aCustom : any[] = model.Player.getInstance().gameSetting.aCustChips;
			this.m_aChipValues = [[10,50,100,300,500],[1000,3000,5000,10000,30000],[30000,50000,100000,300000,500000],aCustom];
			this.m_iTotalPage = this.m_aChipValues.length;
			this.m_vectorChipList = new Array<ChipList>();
			var _chipList	:	ChipList;
			for (var i:number= 0; i < this.m_iTotalPage; i++) 
			{
				_chipList = new ChipList(0, this.m_aChipValues[i], this);
				this.m_spChipList.addChild(_chipList);
				_chipList.x = i*(328);
				this.m_vectorChipList.push(_chipList);
			}
			this.currentChipItem = this.getDefault();
			if(this.currentChipItem==null){
				console.log("当前筹码获取异常...");
			}else{
				this.currentChipItem.select = true;
			}
			
			this.m_pageNumberList = new other.PageNumberListChip(0, this, this.m_aChipValues.length);
			this.m_mcAsset.mc_pos_1.addChild(this.m_pageNumberList);
			this.m_mcAsset.mc_pos_1.x = <number>((308-this.m_pageNumberList.width)*0.5);
			
			this.judgeArrow();
			this.onChangeLanguage();
		}
		
		 public destroy():void{
			if(this.m_bmpBet){
				if(this.m_bmpBet.parent){
					this.m_bmpBet.parent.removeChild(this.m_bmpBet);
				}
				this.m_bmpBet = null;
			}
			if(this.m_bmpHaveBet){
				if(this.m_bmpHaveBet.parent){
					this.m_bmpHaveBet.parent.removeChild(this.m_bmpHaveBet);
				}
				this.m_bmpHaveBet = null;
			}
			
			super.destroy();
		}
		
		 public turning():void{
			egret.Tween.get(this.m_spChipList).to( {x:-this.m_vectorChipList[this.m_iCurrentPage].x}, define.Define.SPEED);
		}
		
		 public onChangeLanguage():void{
//			this.m_mcAsset.tf_0.text = manager.LobbyManager.getInstance().getLanguageString(Language.sBetCount);
//			this.m_mcAsset.tf_1.text = manager.LobbyManager.getInstance().getLanguageString(Language.sBetedCount);
//			(this.m_mcAsset.mc_total).gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
//			(this.m_mcAsset.mc_rebet.mc_label).gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
//			(this.m_mcAsset.mc_cancel.mc_label).gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
//			(this.m_mcAsset.mc_ok.mc_label).gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			if(this.m_mcAsset ){
				this.btnSettingTip();
				
				this.m_mcAsset.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
				
				if(this.m_mcAsset.mc_hint){
					(this.m_mcAsset.mc_hint).gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
				}
			}
		}
		
		public updateBetTotal(_nValue:number):void{
			if(this.m_bmpBet){
				this.m_bmpBet.bitmapData = manager.BitmapManager.getInstance().numberChip.conversion(_nValue);
				this.m_bmpBet.smoothing = true;
			}
		}
		
		public updateHaveBetTotal(_nValue:number):void{
			if(this.m_bmpHaveBet){
				this.m_bmpHaveBet.bitmapData = manager.BitmapManager.getInstance().numberBetedGCoin.conversion(_nValue);
				this.m_bmpHaveBet.smoothing = true;
			}
		}
		
		 public getDefault():ChipItem{
			if(this.m_vectorChipList && this.m_vectorChipList.length>0){
				return this.m_vectorChipList[0].getFirstChipItem();
			}
			return null;
		}
		
		private btnSettingTip():void{
//			if(m_this.btnSetting){
//				m_this.btnSetting.mcAsset.mc_tip.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
//			}
		}
		
		
	}
}