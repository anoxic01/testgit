module lobby.view.panel {
	export class PanelChannel extends PanelWindow{
		
//		private m_bg				:	BitmapScale9Grid;
		private m_btnOk				:	ui.button.SingleButtonMC;						//确认切换
		
		private m_aItems			:	any[];
		private m_currentChannel	;
		
		public constructor($bShake: boolean=false) {
		
			super($bShake);
			
			this.m_mcAsset = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_PANEL,"Panel_Channel_Asset");
			this.addChild(this.m_mcAsset);
			
//			m_bg = new BitmapScale9Grid(new Window_Bg_Asset(), 1, 12, 24, 12, 30);
//			this.m_mcAsset.addChildAt(m_bg,0);
//			m_bg.setSize(342, 220);
//			m_bg.x = -171;
//			m_bg.y = -104;
			
			this.nAssetWidth = 342;
			this.nAssetHeight = 208;
			
			this.m_mcHot = this.m_mcAsset.mc_hot;
			
			this.addItem();
			
			this.m_btnClose = new ui.button.SingleButtonMC(this.m_mcAsset.mc_close,function(event:MouseEvent):void{
				manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
				this.initStatus();
				manager.LobbyManager.getInstance().hideChannel();
			});
			this.m_btnClose.enabled = false;
			
			this.m_btnOk = new ui.button.SingleButtonMC(this.m_mcAsset.mc_ok,function(event:MouseEvent):void{
				manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
				model.LobbyData.getInstance().lobbyInfo.currentCDN = model.LobbyData.getInstance().lobbyInfo.getChannelByChannelNo(this.m_currentChannel.uID);
				manager.SharedObjectManager.setCDNList(model.LobbyData.getInstance().lobbyInfo.currentCDN);
				manager.SharedObjectManager.flush();
				
				if(manager.LobbyManager.getInstance().fChangChannel != null){
					manager.LobbyManager.getInstance().fChangChannel();
				}
								
				manager.LobbyManager.getInstance().hideChannel();
			});
			
			this.onChangeLanguage();
			
			this.initStatus();
			
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick, this);
		}
		
		private checkChannel(_channel:number):model.struct.VideoCDNStruct{
			var vecCDNList  = model.LobbyData.getInstance().lobbyInfo.vecCDNList;
			for (var i:number= 0; i < vecCDNList.length; i++) 
			{
				if(_channel==vecCDNList[i].ChannelNo){
					return vecCDNList[i];
				}
			}
			return null;
		}
		
		protected onclick(event:MouseEvent):void
		{
			event.stopImmediatePropagation();
		}
		
		get currentChannel():PanelChannelItem
		{
			return this.m_currentChannel;
		}

		set  currentChannel(value)
		{
			if(this.m_currentChannel){
				this.m_currentChannel.select = false;
			}
			
			this.m_currentChannel = value;
			
			if(this.m_currentChannel){
				this.m_currentChannel.select = true;
			}
		}
//		
//		get currentResolution():number
//		{
//			return m_currentResolution;
//		}
//
//		set  currentResolution(value:number)
//		{
//			m_currentResolution = value;
//			model.LobbyData.getInstance().lobbyInfo.currentResolution = model.LobbyData.getInstance().lobbyInfo.getResolutionByIndex(m_currentResolution);
//		}

		protected click(event:egret.Event):void
		{
			if(this.m_currentChannel != event.target){
				
				manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
				
				switch(event.target.name){
					case "mc_0":
						this.currentChannel = this.m_aItems[0];
						break;
					case "mc_1":
						this.currentChannel = this.m_aItems[1];
						break;
					case "mc_2":
						this.currentChannel = this.m_aItems[2];
						break;
					case "mc_3":
						this.currentChannel = this.m_aItems[3];
						break;
				}
				
			}
			
		}		
		
		public initStatus():void{
			
			var _index : number;
			if(manager.SharedObjectManager.getCDNList()!=null){
				_index = manager.SharedObjectManager.getCDNList().ChannelNo;
			}else{
				if(model.LobbyData.getInstance().lobbyInfo.currentCDN){
					_index = model.LobbyData.getInstance().lobbyInfo.currentCDN.ChannelNo;
				}else{
					_index = 0;
				}
			}
			switch(_index){
				case 1:
					this.currentChannel = this.m_aItems[0];
					break;
				case 2:
					this.currentChannel = this.m_aItems[1];
					break;
				case 3:
					this.currentChannel = this.m_aItems[2];
					break;
				case 4:
					this.currentChannel = this.m_aItems[3];
					break;
			}
		}
		
		
		
		public upDate():void{
			this.clearItem();
			this.addItem();
			this.initStatus();
		}
		
		public addItem():void{
			var vecCDNList  = model.LobbyData.getInstance().lobbyInfo.vecCDNList;
			var _len  = vecCDNList.length>4?4:vecCDNList.length;
			var _channel : number;
			var _struct ;
			this.m_aItems = [];
			for (var i:number= 0; i < 4; i++) 
			{
				_channel = i+1;
				_struct = this.checkChannel(_channel); 
				if(_struct){
					this.m_aItems[i] = new PanelChannelItem(this.m_mcAsset.getChildByName("mc_"+String(i)) , _channel);
					(this.m_mcAsset.getChildByName("mc_"+String(i)) ).addEventListener(egret.TouchEvent.TOUCH_TAP, this.click);
					
				}else{
					(this.m_mcAsset.getChildByName("mc_"+String(i)) ).gotoAndStop("DEFAULT");
					(this.m_mcAsset.getChildByName("mc_"+String(i)) ).alpha = .5;
				}
			}
		}
		
		public clearItem():void{
			for(var i:number= 0; i<this.m_aItems.length; i++){
				if(this.m_aItems[i]){
					this.m_aItems[i].destroy();
					this.m_aItems[i] = null;
				}
			}
			this.m_aItems = null;
			this.m_currentChannel = null;
			
			(this.m_mcAsset.mc_0 ).removeEventListener(egret.TouchEvent.TOUCH_TAP, this.click);
			(this.m_mcAsset.mc_1 ).removeEventListener(egret.TouchEvent.TOUCH_TAP, this.click);
			(this.m_mcAsset.mc_2 ).removeEventListener(egret.TouchEvent.TOUCH_TAP, this.click);
			(this.m_mcAsset.mc_3 ).removeEventListener(egret.TouchEvent.TOUCH_TAP, this.click);
		}
		
		 public destroy():void{
//			if(m_bg){
//				if(m_bg.parent){
//					m_bg.parent.removeChild(m_bg);
//				}
//				m_bg.dispose();
//				m_bg = null;
//			}
			
			this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick, this);
			
			if(this.m_btnClose){
				this.m_btnClose.destroy();
				this.m_btnClose = null;
			}
			
			if(this.m_btnOk){
				this.m_btnOk.destroy();
				this.m_btnOk = null;
			}
			
			if(this.m_mcAsset){
				(this.m_mcAsset.mc_0 ).removeEventListener(egret.TouchEvent.TOUCH_TAP, this.click);
				(this.m_mcAsset.mc_1 ).removeEventListener(egret.TouchEvent.TOUCH_TAP, this.click);
				(this.m_mcAsset.mc_2 ).removeEventListener(egret.TouchEvent.TOUCH_TAP, this.click);
				(this.m_mcAsset.mc_3 ).removeEventListener(egret.TouchEvent.TOUCH_TAP, this.click);
				
				this.removeChild(this.m_mcAsset);
				this.m_mcAsset = null;
			}
			
		}
		
		 public onChangeLanguage():void{
			this.m_mcAsset.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);// manager.LobbyManager.getInstance().getLanguageString(Language.sPanelChannel_Label);
			
			this.m_mcAsset.mc_ok.mc_label.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
		}
		
	}
}
