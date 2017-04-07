module lobby.view.chip {
	export class ChipPanelGame extends ChipPanel{
		public constructor( _iMode:number= 0 , _fReBet:Function=null) {
			super();
			
			this.touchEnabled=false;
			
			this.m_fReBet = _fReBet;
			if( _iMode == 0 ) {
				this.m_mcAsset = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_LOBBY,"ChipPanelGameAsset");
				this.m_uWidth = 640;
			}
			else if( _iMode == 1 ){
				this.m_mcAsset = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_LOBBY,"ChipPanelGameAsset2");
				this.m_uWidth = 700;
				this.m_mcAsset.touchEnabled=false;
			}
			this.addChild(this.m_mcAsset);
			this.cacheAsBitmap=true;
			super(this.m_mcAsset);
			
			this.btnReBet = new ui.button.SingleButtonMC(this.m_mcAsset.mc_rebet, function(event:MouseEvent):void{
				manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
				this.rebet();
			});
			this.btnReBet.fOnOver = this.btnReBetTip;
			this.btnReBet.fOnOut = this.btnReBetTip;
			this.btnReBet.fDown = this.btnReBetTip;
			this.btnReBet.fDisable = this.btnReBetTip;
			this.btnReBet.enabled = true;
//			this.btnReBet_tw = new ui.button.SingleButtonMC(this.m_mcAsset.mc_rebet_tw, function(event:MouseEvent):void{
//				rebet();
//			});
//			this.btnReBet_tw.fOnOver = function():void{
//				manager.TipManager.getInstance().show(manager.LobbyManager.getInstance().getLanguageString(Language.sTip_ChipPanel_Rebet),manager.TipManager.RIGHT,this.m_mcAsset.localToGlobal(new egret.Point(this.m_mcAsset.mc_rebet_tw.x,this.m_mcAsset.mc_rebet_tw.y+25)));
//			};
//			this.btnReBet_tw.fOnOut = function():void{
//				manager.TipManager.getInstance().hide();
//			};
//			this.btnReBet_en = new ui.button.SingleButtonMC(this.m_mcAsset.mc_rebet_en, function(event:MouseEvent):void{
//				rebet();
//			});
//			this.btnReBet_en.fOnOver = function():void{
//				manager.TipManager.getInstance().show(manager.LobbyManager.getInstance().getLanguageString(Language.sTip_ChipPanel_Rebet),manager.TipManager.RIGHT,this.m_mcAsset.localToGlobal(new egret.Point(this.m_mcAsset.mc_rebet_en.x,this.m_mcAsset.mc_rebet_en.y+25)));
//			};
//			this.btnReBet_en.fOnOut = function():void{
//				manager.TipManager.getInstance().hide();
//			};
			
			this.m_btnRecharge = new ui.button.SingleButtonMC(this.m_mcAsset.mc_3, function(event:MouseEvent):void{
				manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
				manager.TipManager.getInstance().hide();
				manager.LobbyManager.getInstance().hideAllPanel();
//				manager.LobbyManager.getInstance().showDialog(manager.LobbyManager.getInstance().getLanguageString(Language.sPlease_Wait));
				manager.LobbyManager.getInstance().recharge();
			});
			this.m_btnRecharge.fOnOver = function():void{
				manager.TipManager.getInstance().show(manager.LobbyManager.getInstance().getLanguageString(language.Language.sTip_recharge),manager.TipManager.LEFT,this.m_mcAsset.localToGlobal(new egret.Point(this.m_mcAsset.mc_3.x+32,this.m_mcAsset.mc_3.y+21)));
			};
			this.m_btnRecharge.fOnOut = function():void{
				manager.TipManager.getInstance().hide();
			};
			
			this.goldNum = new JNumber();
			this.goldNum.number = model.Player.getInstance().nCoin;
			this.m_mcAsset.mc_pos_2.addChild(this.goldNum);
			
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
				manager.LobbyManager.getInstance().hideAllPanel();
				this.goCustomPage();
				manager.LobbyManager.getInstance().showPanelChipCustom(_iMode);
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
				_chipList = new ChipList((_iMode==0?1:2), this.m_aChipValues[i], this as ChipPanelGame);
				this.m_spChipList.addChild(_chipList);
				_chipList.x = i*(this.m_uWidth);
				this.m_vectorChipList.push(_chipList);
			}
			this.currentChipItem = this.getDefault();
			if(this.currentChipItem==null){
				console.log("当前筹码获取异常...");
			}else{
				this.currentChipItem.select = true;
			}
			
			this.m_pageNumberList = new other.PageNumberListChip(1, (this as ChipPanelGame), this.m_aChipValues.length);
			this.m_mcAsset.mc_pos_1.addChild(this.m_pageNumberList);
			//			this.m_mcAsset.mc_pos_1.x = int((716-this.m_pageNumberList.width)*0.5);
			
			this.judgeArrow();
			
			this.onChangeLanguage();
		}
		
		private btnReBetTip():void{
			if(this.btnReBet){
				this.btnReBet.mcAsset.mc_tip.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			}
		}
		private btnSettingTip():void{
			if(this.btnSetting){
				this.btnSetting.mcAsset.mc_tip.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			}
		}
		
		 public turning():void{
			egret.Tween.get(this.m_spChipList).to( {x:-this.m_vectorChipList[this.m_iCurrentPage].x}, define.Define.SPEED);
		}
		
		 public onChangeLanguage():void{
//			switch(manager.LobbyManager.getInstance().lobbyAuth.Lang){
//				case 0:
//					this.btnReBet = this.btnReBet_cn;
//					this.btnReBet_cn.visible = true;
//					this.btnReBet_tw.visible = false;
//					this.btnReBet_en.visible = false;
//					break;
//				
//				case 1:
//					this.btnReBet = this.btnReBet_tw;
//					this.btnReBet_cn.visible = false;
//					this.btnReBet_tw.visible = true;
//					this.btnReBet_en.visible = false;
//					break;
//				
//				case 2:
//					this.btnReBet = this.btnReBet_en;
//					this.btnReBet_cn.visible = false;
//					this.btnReBet_tw.visible = false;
//					this.btnReBet_en.visible = true;
//					break;
//			}
			
			this.btnReBetTip();
			this.btnSettingTip();
			
			if(this.m_mcAsset && this.m_mcAsset.mc_hint){
				(this.m_mcAsset.mc_hint).gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			}
		}
		
		 public getDefault():ChipItem{
			if(this.m_vectorChipList && this.m_vectorChipList.length>0){
				return this.m_vectorChipList[0].getFirstChipItem();
			}
			return null;
		}
		
		private rebet():void{
			manager.TipManager.getInstance().hide();
			if(this.m_fReBet!=null){
				this.m_fReBet();
			}
		}
		
	}
}