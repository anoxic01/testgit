module lobby.view.panel {
	export class PanelChannel extends PanelWindow{
		
//		private var m_bg				:	BitmapScale9Grid;
		private var m_btnClose			:	SingleButtonMC;						//关闭按钮
		private var m_btnOk				:	SingleButtonMC;						//确认切换
		
		private var m_aItems			:	Array;
		private var m_currentChannel	:	Item;
		
		public constructor($bShake:Boolean=false) {
		
			super($bShake);
			
			m_mcAsset = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_PANEL,"Panel_Channel_Asset");
			this.addChild(m_mcAsset);
			
//			m_bg = new BitmapScale9Grid(new Window_Bg_Asset(), 1, 12, 24, 12, 30);
//			m_mcAsset.addChildAt(m_bg,0);
//			m_bg.setSize(342, 220);
//			m_bg.x = -171;
//			m_bg.y = -104;
			
			nAssetWidth = 342;
			nAssetHeight = 208;
			
			m_mcHot = m_mcAsset.mc_hot;
			
			addItem();
			
			m_btnClose = new SingleButtonMC(m_mcAsset.mc_close,function(event:MouseEvent):void{
				SoundManager.getInstance().play(SoundPackage.sClick_Tools);
				initStatus();
				LobbyManager.getInstance().hideChannel();
			});
			m_btnClose.enabled = false;
			
			m_btnOk = new SingleButtonMC(m_mcAsset.mc_ok,function(event:MouseEvent):void{
				SoundManager.getInstance().play(SoundPackage.sClick_Tools);
				LobbyData.getInstance().lobbyInfo.currentCDN = LobbyData.getInstance().lobbyInfo.getChannelByChannelNo(m_currentChannel.uID);
				SharedObjectManager.setCDNList(LobbyData.getInstance().lobbyInfo.currentCDN);
				SharedObjectManager.flush();
				
				if(LobbyManager.getInstance().fChangChannel != null){
					LobbyManager.getInstance().fChangChannel();
				}
								
				LobbyManager.getInstance().hideChannel();
			});
			
			onChangeLanguage();
			
			initStatus();
			
			this.addEventListener(MouseEvent.CLICK,onclick);
		}
		
		private function checkChannel(_channel:int):VideoCDNStruct{
			var vecCDNList : Vector.<VideoCDNStruct> = LobbyData.getInstance().lobbyInfo.vecCDNList;
			for (var i:int = 0; i < vecCDNList.length; i++) 
			{
				if(_channel==vecCDNList[i].ChannelNo){
					return vecCDNList[i];
				}
			}
			return null;
		}
		
		protected function onclick(event:MouseEvent):void
		{
			event.stopImmediatePropagation();
		}
		
		public function get currentChannel():Item
		{
			return m_currentChannel;
		}

		public function set currentChannel(value:Item):void
		{
			if(m_currentChannel){
				m_currentChannel.select = false;
			}
			
			m_currentChannel = value;
			
			if(m_currentChannel){
				m_currentChannel.select = true;
			}
		}
//		
//		public function get currentResolution():int
//		{
//			return m_currentResolution;
//		}
//
//		public function set currentResolution(value:int):void
//		{
//			m_currentResolution = value;
//			LobbyData.getInstance().lobbyInfo.currentResolution = LobbyData.getInstance().lobbyInfo.getResolutionByIndex(m_currentResolution);
//		}

		protected function click(event:MouseEvent):void
		{
			if(m_currentChannel != event.target){
				
				SoundManager.getInstance().play(SoundPackage.sClick_Tools);
				
				switch(event.target.name){
					case "mc_0":
						currentChannel = m_aItems[0];
						break;
					case "mc_1":
						currentChannel = m_aItems[1];
						break;
					case "mc_2":
						currentChannel = m_aItems[2];
						break;
					case "mc_3":
						currentChannel = m_aItems[3];
						break;
				}
				
			}
			
		}		
		
		public function initStatus():void{
			
			var _index : int;
			if(SharedObjectManager.getCDNList()!=null){
				_index = SharedObjectManager.getCDNList().ChannelNo;
			}else{
				if(LobbyData.getInstance().lobbyInfo.currentCDN){
					_index = LobbyData.getInstance().lobbyInfo.currentCDN.ChannelNo;
				}else{
					_index = 0;
				}
			}
			switch(_index){
				case 1:
					currentChannel = m_aItems[0];
					break;
				case 2:
					currentChannel = m_aItems[1];
					break;
				case 3:
					currentChannel = m_aItems[2];
					break;
				case 4:
					currentChannel = m_aItems[3];
					break;
			}
		}
		
		
		
		public function upDate():void{
			clearItem();
			addItem();
			initStatus();
		}
		
		public function addItem():void{
			var vecCDNList : Vector.<VideoCDNStruct> = LobbyData.getInstance().lobbyInfo.vecCDNList;
			var _len : int = vecCDNList.length>4?4:vecCDNList.length;
			var _channel : int;
			var _struct : VideoCDNStruct;
			m_aItems = [];
			for (var i:int = 0; i < 4; i++) 
			{
				_channel = i+1;
				_struct = checkChannel(_channel); 
				if(_struct){
					m_aItems[i] = new Item(m_mcAsset.getChildByName("mc_"+String(i)) as MovieClip, _channel);
					(m_mcAsset.getChildByName("mc_"+String(i)) as MovieClip).addEventListener(MouseEvent.CLICK, click);
					
				}else{
					(m_mcAsset.getChildByName("mc_"+String(i)) as MovieClip).gotoAndStop("DEFAULT");
					(m_mcAsset.getChildByName("mc_"+String(i)) as MovieClip).alpha = .5;
				}
			}
		}
		
		public function clearItem():void{
			for(var i:int = 0; i<m_aItems.length; i++){
				if(m_aItems[i]){
					m_aItems[i].destroy();
					m_aItems[i] = null;
				}
			}
			m_aItems = null;
			m_currentChannel = null;
			
			(m_mcAsset.mc_0 as MovieClip).removeEventListener(MouseEvent.CLICK, click);
			(m_mcAsset.mc_1 as MovieClip).removeEventListener(MouseEvent.CLICK, click);
			(m_mcAsset.mc_2 as MovieClip).removeEventListener(MouseEvent.CLICK, click);
			(m_mcAsset.mc_3 as MovieClip).removeEventListener(MouseEvent.CLICK, click);
		}
		
		override public function destroy():void{
//			if(m_bg){
//				if(m_bg.parent){
//					m_bg.parent.removeChild(m_bg);
//				}
//				m_bg.dispose();
//				m_bg = null;
//			}
			
			this.removeEventListener(MouseEvent.CLICK,onclick);
			
			if(m_btnClose){
				m_btnClose.destroy();
				m_btnClose = null;
			}
			
			if(m_btnOk){
				m_btnOk.destroy();
				m_btnOk = null;
			}
			
			if(m_mcAsset){
				(m_mcAsset.mc_0 as MovieClip).removeEventListener(MouseEvent.CLICK, click);
				(m_mcAsset.mc_1 as MovieClip).removeEventListener(MouseEvent.CLICK, click);
				(m_mcAsset.mc_2 as MovieClip).removeEventListener(MouseEvent.CLICK, click);
				(m_mcAsset.mc_3 as MovieClip).removeEventListener(MouseEvent.CLICK, click);
				
				this.removeChild(m_mcAsset);
				m_mcAsset = null;
			}
			
		}
		
		override public function onChangeLanguage():void{
			m_mcAsset.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);// LobbyManager.getInstance().getLanguageString(Language.sPanelChannel_Label);
			
			m_mcAsset.mc_ok.mc_label.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
		}
		
	}
}
import flash.display.MovieClip;
import flash.events.MouseEvent;


class Item{
	
	public var uID 			:	uint;
	public var mcAsset 		: 	MovieClip;
	private var m_bSelect	:	Boolean;
	
	public function Item(_mcAsset:MovieClip, _id:int){
		mcAsset = _mcAsset;
		uID = _id;
		
		mcAsset.alpha = 1;
		mcAsset.gotoAndStop("DEFAULT");
		mcAsset.buttonMode = true;
		mcAsset.mouseChildren = false;
//		m_mcAsset.tf_label.text = String(uID);
		mcAsset.addEventListener(MouseEvent.MOUSE_OVER, over);
		mcAsset.addEventListener(MouseEvent.MOUSE_OUT, out);
	}
	
	public function destroy():void{
		if(mcAsset){
			mcAsset.buttonMode = false;
			mcAsset.removeEventListener(MouseEvent.MOUSE_OVER, over);
			mcAsset.removeEventListener(MouseEvent.MOUSE_OUT, out);
			mcAsset = null;
		}
	}
	
	public function set select(_bValue:Boolean):void{
		if(_bValue != m_bSelect){
			m_bSelect = _bValue;
			
			if(m_bSelect){
				mcAsset.gotoAndStop("HOVER");
			}else{
				mcAsset.gotoAndStop("DEFAULT");
			}
		}
	}
	
	public function get select():Boolean{
		return m_bSelect;
	}
	
	
	protected function over(event:MouseEvent):void
	{
		if(m_bSelect){
			return;
		}
		mcAsset.gotoAndStop("HOVER");
	}
	
	protected function out(event:MouseEvent):void
	{
		if(m_bSelect){
			return;
		}
		mcAsset.gotoAndStop("DEFAULT");
	}
	
	
}
