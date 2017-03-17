module lobby.view.panel {
	export class PanelGoodRoadSetting extends PanelWindow{
//		private var m_bg				:	BitmapScale9Grid;
		private var m_btnOk				:	SingleButtonMC;
		private var m_btnNo				:	SingleButtonMC;
		private var m_btnClose			:	SingleButtonMC;
		private var m_btnExplain		:	SingleButtonMC;
		public var 	select				:	Select;
		
		private var m_vecItems			:	Vector.<Item>;
		private var m_bOk				:	Boolean;
		
		public constructor($bShake:Boolean=false) {
		
			super($bShake);
			
			m_mcAsset = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_PANEL,"Panel_Good_Road_Setting_Asset");
			this.addChild(m_mcAsset);
			
//			m_bg = new BitmapScale9Grid(new Window_Bg_Asset(), 1, 12, 24, 12, 30);
//			m_mcAsset.addChildAt(m_bg,0);
//			m_bg.setSize(816, 370);
//			m_bg.x = -408;
//			m_bg.y = -182;
			
			m_mcHot = m_mcAsset.mc_hot;
			
			nAssetWidth = 816;
			nAssetHeight = 368;
			
			m_btnOk = new SingleButtonMC(m_mcAsset.mc_ok, function(event:MouseEvent):void{
				SoundManager.getInstance().play(SoundPackage.sClick_Tools);
				var _bOk : Boolean;
				for (var j:int = 0; j < 10; j++) 
				{
					if(m_vecItems[j].bSelect){
						_bOk = true;
						break;
					}
				}
				
				if(_bOk){
					for (var k:int = 0; k < 10; k++) 
					{
						SharedObjectManager.setGoodRoadSetting(k,m_vecItems[k].bSelect);
						
						if(m_vecItems[k].bSelect){
							LobbyData.getInstance().addGoodRoadType(k+1);
						}else{
							LobbyData.getInstance().removeGoodRoadType(k+1);
						}
					}
					LobbyData.getInstance().resetGoodRoadTemp();
					SharedObjectManager.flush();
					
					LobbyManager.getInstance().hideGoodRoadSetting();
					LobbyManager.getInstance().setGoodRoadSetting();
					
				}else{
					LobbyManager.getInstance().showDialog(LobbyManager.getInstance().getLanguageString(Language.sSelectOne));
				}
			});
			
			m_btnNo = new SingleButtonMC(m_mcAsset.mc_no, function(event:MouseEvent):void{
				SoundManager.getInstance().play(SoundPackage.sClick_Tools);
				LobbyManager.getInstance().hideGoodRoadSetting();
			});
			m_btnClose = new SingleButtonMC(m_mcAsset.mc_close, function(event:MouseEvent):void{
				SoundManager.getInstance().play(SoundPackage.sClick_Tools);
				LobbyManager.getInstance().hideGoodRoadSetting();
			});
			
			var aStatus : Array = SharedObjectManager.getGoodRoadSetting();
			m_vecItems = new Vector.<Item>();
			var _item	:	Item;
			var _bStatus : Boolean = true;
			for (var i:int = 0; i < 10; i++) 
			{
				_item = new Item(m_mcAsset.getChildByName("mc_" + String(i)) as MovieClip, i);
				m_vecItems.push(_item);
				_item.setStatus(aStatus[i]);
				if(_bStatus && aStatus[i]==false){
					_bStatus = false;
				}
			}
			
			select = new Select(m_mcAsset.mc_10);
			select.setStatus(_bStatus);
			
			onChangeLanguage();
		}
		
		public function selectAll():void
		{
			select.setStatus(!select.bSelect);
			var _item	:	Item;
			for (var i:int = 0; i < 10; i++) {
				_item = m_vecItems[i];
				_item.setStatus(select.bSelect);
			}
			
		}
		
		override public function destroy():void{
//			if(m_bg){
//				if(m_bg.parent){
//					m_bg.parent.removeChild(m_bg);
//				}
//				m_bg.dispose();
//				m_bg = null;
//			}
			
			if(m_btnOk){
				m_btnOk.destroy();
				m_btnOk = null;
			}
			if(m_btnNo){
				m_btnNo.destroy();
				m_btnNo = null;
			}
			
			if(m_btnExplain){
				m_btnExplain.destroy();
				m_btnExplain = null;
			}
			
			if(m_mcAsset){
				(m_mcAsset.mc_10 as MovieClip).removeEventListener(MouseEvent.CLICK,selectAll);
				this.removeChild(m_mcAsset);
				m_mcAsset = null;
			}
			
			super.destroy();
		}
		
		override public function onChangeLanguage():void{
			m_mcAsset.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);// LobbyManager.getInstance().getLanguageString(Language.sGoodRoadSetting);
			
			(m_mcAsset.mc_ok.mc_label as MovieClip).gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			(m_mcAsset.mc_no.mc_label as MovieClip).gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			
			m_mcAsset.mc_0.mc_label.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			m_mcAsset.mc_1.mc_label.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			m_mcAsset.mc_2.mc_label.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			m_mcAsset.mc_3.mc_label.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			m_mcAsset.mc_4.mc_label.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			m_mcAsset.mc_5.mc_label.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			m_mcAsset.mc_6.mc_label.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			m_mcAsset.mc_7.mc_label.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			m_mcAsset.mc_8.mc_label.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			m_mcAsset.mc_9.mc_label.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			m_mcAsset.mc_10.tf_label.text = LobbyManager.getInstance().getLanguageString(Language.sGoodRoadSetting_0);
			
			if(m_btnExplain){
				m_btnExplain.destroy();
				m_btnExplain = null;
			}
			m_btnExplain = new SingleButtonMC(m_mcAsset.mc_11,function(event:MouseEvent):void{
				navigateToURL(new URLRequest("http://www.help.com"),"_blank");
			})
		}
		
		public function judgeSelectAll():Boolean{
			var _len : int = m_vecItems.length;
			for (var i:int = 0; i < _len; i++) 
			{
				if(m_vecItems[i].bSelect == false){
					return false;
				}
			}
			
			return true;
		}
		
		
	}
}
import flash.display.BitmapData;
import flash.display.MovieClip;
import flash.events.MouseEvent;

import IInterface.ISprite;

import bitmap.BitmapScale9Grid;

import define.Define;

import manager.LobbyManager;
import manager.ResourceManager;
import manager.SoundManager;

import sounds.SoundPackage;

class Item implements ISprite{
	public var ID			:	int;
	public var bSelect		:	Boolean;
	private var m_mcAsset 	: 	MovieClip;
	private var m_glow		:	BitmapScale9Grid;
	
	public function Item(_mcAsset:MovieClip, _id:int){
		m_mcAsset = _mcAsset;
		ID = _id;
		
		m_glow = new BitmapScale9Grid(ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_LOBBY, "General_Rollover_Select_Asset") as BitmapData, 1,10,15,10,15);
		m_mcAsset.addChild(m_glow);
		m_glow.setSize(156,102);
		m_glow.alpha = 0;
		
		m_mcAsset.buttonMode = true;
		m_mcAsset.addEventListener(MouseEvent.MOUSE_OVER, itemOver);
		m_mcAsset.addEventListener(MouseEvent.MOUSE_OUT, itemOut);
		m_mcAsset.addEventListener(MouseEvent.CLICK, itemClick);
	}
	public function destroy():void{
		
		if(m_glow){
			if(m_glow.parent){
				m_glow.parent.removeChild(m_glow);
			}
			m_glow.dispose();
			m_glow = null;
		}
		
		if(m_mcAsset){
			
			m_mcAsset.removeEventListener(MouseEvent.MOUSE_OVER, itemOver);
			m_mcAsset.removeEventListener(MouseEvent.MOUSE_OUT, itemOut);
			m_mcAsset.removeEventListener(MouseEvent.CLICK, itemClick);
			
			m_mcAsset = null;
		}
	}
	
	public function setStatus(_bValue:Boolean):void{
		if(bSelect != _bValue){
			bSelect = _bValue;
			if(bSelect){
				m_glow.alpha = 1;
			}else{
				m_glow.alpha = 0;
			}
		}
	}
	
	protected function itemOver(event:MouseEvent):void
	{
		if(bSelect){
			return;
		}
		m_glow.alpha = 1;
	}
	
	protected function itemOut(event:MouseEvent):void
	{
		if(bSelect){
			return;
		}
		m_glow.alpha = 0;
	}
	
	protected function itemClick(event:MouseEvent):void
	{
		SoundManager.getInstance().play(SoundPackage.sClick_Tools);
		
		bSelect = !bSelect;
		if(bSelect){
			m_glow.alpha = 1;
		}else{
			m_glow.alpha = 0;
		}
		
		if(bSelect){
			if(LobbyManager.getInstance().panelGoodRoadType.judgeSelectAll()){
				LobbyManager.getInstance().panelGoodRoadType.select.setStatus(true);
			}
		}else{
			if(LobbyManager.getInstance().panelGoodRoadType.select.bSelect){
				LobbyManager.getInstance().panelGoodRoadType.select.setStatus(false);
			}
		}
		
	}
}

class Select implements ISprite{
	private var m_mcAsset	:	MovieClip;
//	private var m_glow		:	Bitmap;
	public var bSelect		:	Boolean;
	
	public function Select(_mcAsset:MovieClip){
		m_mcAsset = _mcAsset;
		
//		m_glow = new Bitmap(new General_Rollover_Select_Asset(),"auto", true);
//		m_mcAsset.addChildAt(m_glow,1);
//		m_glow.visible = false;
//		m_glow.y = 2;
		
		m_mcAsset.gotoAndStop(1);
		m_mcAsset.buttonMode = true;
		m_mcAsset.mouseChildren = false;
		m_mcAsset.addEventListener(MouseEvent.MOUSE_OVER, selectOver);
		m_mcAsset.addEventListener(MouseEvent.MOUSE_OUT, selectOut);
		m_mcAsset.addEventListener(MouseEvent.CLICK,selectClick);
	}
	public function destroy():void{
		if(m_mcAsset){
			m_mcAsset.removeEventListener(MouseEvent.MOUSE_OVER, selectOver);
			m_mcAsset.removeEventListener(MouseEvent.MOUSE_OUT, selectOut);
			m_mcAsset.removeEventListener(MouseEvent.CLICK,selectClick);
			
			m_mcAsset = null;
		}
	}
	
	protected function selectClick(event:MouseEvent):void
	{
		SoundManager.getInstance().play(SoundPackage.sClick_Tools);
		LobbyManager.getInstance().panelGoodRoadType.selectAll();
	}
	
	public function setStatus(_bValue:Boolean):void{
		bSelect = _bValue;
		
		m_mcAsset.mc_label.visible = bSelect;
	}
	
	protected function selectOver(event:MouseEvent):void
	{
//		m_glow.visible = true;
		m_mcAsset.gotoAndStop(2);
	}
	
	protected function selectOut(event:MouseEvent):void
	{
//		m_glow.visible = false;
		m_mcAsset.gotoAndStop(1);
	}
	
}