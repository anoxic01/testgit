module lobby.view.panel {
	export class PanelGoodRoadSetting extends PanelWindow{
//		private m_bg				:	BitmapScale9Grid;
		private m_btnOk				:	ui.button.SingleButtonMC;
		private m_btnNo				:	ui.button.SingleButtonMC;
		private m_btnExplain		:	ui.button.SingleButtonMC;
		public 	select				:	PanelGoodRoadSettingSelect;
		
		private m_vecItems			:	PanelGoodRoadSettingItem[];
		private m_bOk				:	 boolean;
		
		public constructor($bShake: boolean=false) {
		
			super($bShake);
			
			this.m_mcAsset = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_PANEL,"Panel_Good_Road_Setting_Asset");
			this.addChild(this.m_mcAsset);
			
//			m_bg = new BitmapScale9Grid(new Window_Bg_Asset(), 1, 12, 24, 12, 30);
//			this.m_mcAsset.addChildAt(m_bg,0);
//			m_bg.setSize(816, 370);
//			m_bg.x = -408;
//			m_bg.y = -182;
			
			this.m_mcHot = this.m_mcAsset.mc_hot;
			
			this.nAssetWidth = 816;
			this.nAssetHeight = 368;
			
			this.m_btnOk = new ui.button.SingleButtonMC(this.m_mcAsset.mc_ok, function(event:MouseEvent):void{
				manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
				var _bOk :  boolean;
				for (var j:number= 0; j < 10; j++) 
				{
					if(this.m_vecItems[j].bSelect){
						_bOk = true;
						break;
					}
				}
				
				if(_bOk){
					for (var k:number= 0; k < 10; k++) 
					{
						manager.SharedObjectManager.setGoodRoadSetting(k,this.m_vecItems[k].bSelect);
						
						if(this.m_vecItems[k].bSelect){
							model.LobbyData.getInstance().addGoodRoadType(k+1);
						}else{
							model.LobbyData.getInstance().removeGoodRoadType(k+1);
						}
					}
					model.LobbyData.getInstance().resetGoodRoadTemp();
					manager.SharedObjectManager.flush();
					
					manager.LobbyManager.getInstance().hideGoodRoadSetting();
					manager.LobbyManager.getInstance().setGoodRoadSetting();
					
				}else{
					manager.LobbyManager.getInstance().showDialog(manager.LobbyManager.getInstance().getLanguageString(language.Language.sSelectOne));
				}
			});
			
			this.m_btnNo = new ui.button.SingleButtonMC(this.m_mcAsset.mc_no, function(event:MouseEvent):void{
				manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
				manager.LobbyManager.getInstance().hideGoodRoadSetting();
			});
			this.m_btnClose = new ui.button.SingleButtonMC(this.m_mcAsset.mc_close, function(event:MouseEvent):void{
				manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
				manager.LobbyManager.getInstance().hideGoodRoadSetting();
			});
			
			var aStatus : any[] = manager.SharedObjectManager.getGoodRoadSetting();
			this.m_vecItems = new Array<PanelGoodRoadSettingItem>();
			var _item;
			var _bStatus :  boolean = true;
			for (var i:number= 0; i < 10; i++) 
			{
				_item = new PanelGoodRoadSettingItem(this.m_mcAsset.getChildByName("mc_" + String(i)), i);
				this.m_vecItems.push(_item);
				_item.setStatus(aStatus[i]);
				if(_bStatus && aStatus[i]==false){
					_bStatus = false;
				}
			}
			
			this.select = new PanelGoodRoadSettingSelect(this.m_mcAsset.mc_10);
			this.select.setStatus(_bStatus);
			
			this.onChangeLanguage();
		}
		
		public selectAll():void
		{
			this.select.setStatus(!this.select.bSelect);
			var _item;
			for (var i:number= 0; i < 10; i++) {
				_item = this.m_vecItems[i];
				_item.setStatus(this.select.bSelect);
			}
			
		}
		
		 public destroy():void{
//			if(m_bg){
//				if(m_bg.parent){
//					m_bg.parent.removeChild(m_bg);
//				}
//				m_bg.dispose();
//				m_bg = null;
//			}
			
			if(this.m_btnOk){
				this.m_btnOk.destroy();
				this.m_btnOk = null;
			}
			if(this.m_btnNo){
				this.m_btnNo.destroy();
				this.m_btnNo = null;
			}
			
			if(this.m_btnExplain){
				this.m_btnExplain.destroy();
				this.m_btnExplain = null;
			}
			
			if(this.m_mcAsset){
				(this.m_mcAsset.mc_10 ).removeEventListener(egret.TouchEvent.TOUCH_TAP, this.selectAll);
				this.removeChild(this.m_mcAsset);
				this.m_mcAsset = null;
			}
			
			super.destroy();
		}
		
		 public onChangeLanguage():void{
			this.m_mcAsset.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);// manager.LobbyManager.getInstance().getLanguageString(language.Language.sGoodRoadSetting);
			
			(this.m_mcAsset.mc_ok.mc_label ).gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			(this.m_mcAsset.mc_no.mc_label ).gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			
			this.m_mcAsset.mc_0.mc_label.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			this.m_mcAsset.mc_1.mc_label.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			this.m_mcAsset.mc_2.mc_label.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			this.m_mcAsset.mc_3.mc_label.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			this.m_mcAsset.mc_4.mc_label.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			this.m_mcAsset.mc_5.mc_label.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			this.m_mcAsset.mc_6.mc_label.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			this.m_mcAsset.mc_7.mc_label.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			this.m_mcAsset.mc_8.mc_label.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			this.m_mcAsset.mc_9.mc_label.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			this.m_mcAsset.mc_10.tf_label.text = manager.LobbyManager.getInstance().getLanguageString(language.Language.sGoodRoadSetting_0);
			
			if(this.m_btnExplain){
				this.m_btnExplain.destroy();
				this.m_btnExplain = null;
			}
			this.m_btnExplain = new ui.button.SingleButtonMC(this.m_mcAsset.mc_11,function(event:MouseEvent):void{
				navigateToURL(new URLRequest("http://www.help.com"),"_blank");
			})
		}
		
		public judgeSelectAll(): boolean{
			var _len  = this.m_vecItems.length;
			for (var i:number= 0; i < _len; i++) 
			{
				if(this.m_vecItems[i].bSelect == false){
					return false;
				}
			}
			
			return true;
		}
		
		
	}
}