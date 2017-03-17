module lobby.view.panel {
	export class PanelChipCustom extends PanelWindow{
//		private var m_bg			:	BitmapScale9Grid;
		private var m_mcAsset		:	*;										//资源容器
		private var m_mcText		:	MovieClip;								//文本
		private var m_btnOk			:	SingleButtonMC;							//确认按钮
		private var m_btnCancel		:	SingleButtonMC;							//取消按钮
		private var m_btnClose		:	SingleButtonMC;							//关闭按钮
		
		private var m_aChipValues	:	Array;									//筹码面值
		private var m_vectorChip	:	Vector.<ChipItemCustom>;				//筹码数组
		private var m_aCustom		:	Array;									//选中筹码
		private var m_uSelect		:	uint;									//已选数量
		
		public constructor() {
		
			super();
			m_mcAsset = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_PANEL,"ChipPanelCustomAsset");
			this.addChild(m_mcAsset);
			
//			m_bg = new BitmapScale9Grid(new Window_Bg_Asset(), 1, 12, 24, 12, 30);
//			m_mcAsset.addChildAt(m_bg,0);
//			m_bg.setSize(524, 530);
//			m_bg.x = -262;
//			m_bg.y = -280;
			
			nAssetWidth = 524;
			nAssetHeight = 561;
			
			m_mcHot = m_mcAsset.mc_hot;
			
			m_mcText = m_mcAsset.mc_0;
			
			m_btnOk = new SingleButtonMC(m_mcAsset.mc_ok, function(event:MouseEvent):void{
				SoundManager.getInstance().play(SoundPackage.sClick_Tools);
				LobbyManager.getInstance().sendCustomChipData(getCustomChip());
			});
			
			m_btnCancel = new SingleButtonMC(m_mcAsset.mc_no, function(event:MouseEvent):void{
				SoundManager.getInstance().play(SoundPackage.sClick_Tools);
				LobbyManager.getInstance().hidePanelChipCustom();
			});
			
			m_btnClose = new SingleButtonMC(m_mcAsset.mc_close,function(event:MouseEvent):void{
				SoundManager.getInstance().play(SoundPackage.sClick_Tools);
				LobbyManager.getInstance().hidePanelChipCustom();
			});
			
			m_aCustom = [];
			m_aChipValues = [10,50,100,300,500,1000,3000,5000,10000,30000,50000,100000,300000,500000];
			m_vectorChip = new Vector.<ChipItemCustom>;
			
			onChangeLanguage();
		}
		
		override public function destroy():void{
//			if(m_bg){
//				if(m_bg.parent){
//					m_bg.parent.removeChild(m_bg);
//				}
//				m_bg.dispose();
//				m_bg = null;
//			}
			if(m_vectorChip){
				var _chip : ChipItemCustom;
				while (m_vectorChip.length>0) 
				{
					_chip = m_vectorChip.pop();
					if(_chip.parent){
						_chip.parent.removeChild(_chip);
					}
					_chip.destroy();
				}
				if(_chip){
					_chip = null;
				}
				m_vectorChip = null;
			}
			
			if(m_btnOk){
				m_btnOk.destroy();
				m_btnOk = null;
			}
			if(m_btnCancel){
				m_btnCancel.destroy();
				m_btnCancel = null;
			}
			if(m_btnClose){
				m_btnClose.destroy();
				m_btnClose = null;
			}
			if(m_mcAsset){
				this.removeChild(m_mcAsset);
				m_mcAsset = null;
			}
			if(m_aCustom){
				m_aCustom = null;
			}
		}
		
		public function init():void{
			var _aCustom : Array = Player.getInstance().gameSetting.aCustChips;
			var _len : int = m_aChipValues.length;
			var _chip : ChipItemCustom;
			for (var i:int = 0; i < _len; i++) 
			{
				_chip = new ChipItemCustom(m_aChipValues[i],this);
				m_mcAsset.addChild(_chip);
				_chip.x = -225 + (i%4) * (_chip.width+30);
				_chip.y = -200 + Math.floor(i/4) * (_chip.height+20);
				m_vectorChip.push(_chip);
				
				if(_aCustom){
					for (var j:int = 0; j < _aCustom.length; j++) 
					{
						if(m_aChipValues[i] == _aCustom[j]){
							_chip.select  = true;
							break;
						}
					}
				}
				
				
			}
			if(_chip){
				_chip = null;
			}
			
		}
		public function setSelect():void{
			
		}
		
		public function addSelect(_uValue:uint):Boolean{
			if(m_aCustom.length<5){
				m_uSelect++;
				m_aCustom.push(_uValue);
				m_aCustom.sort(Array.NUMERIC);
				m_mcAsset.tf_0.text = String(5-m_aCustom.length);//LobbyManager.getInstance().getLanguageString(Language.sChipPanelCustom) + ":" + String(5-m_aCustom.length);
				return true;
			}
			return false;
		}
		public function removeSelect(_uValue:uint):Boolean{
			if(m_aCustom.length>0){
				for (var i:int = 0; i < m_aCustom.length; i++) 
				{
					if(m_aCustom[i] == _uValue){
						m_uSelect--;
						m_aCustom.splice(i,1);
						m_aCustom.sort(Array.NUMERIC);
						m_mcAsset.tf_0.text = String(5-m_aCustom.length);//LobbyManager.getInstance().getLanguageString(Language.sChipPanelCustom) + ":" + String(5-m_aCustom.length);
						return true;
					}
				}
			}
			return false;
		}
		
		override public function onChangeLanguage():void{
			m_mcText.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			m_mcAsset.tf_0.text = String(5-m_aCustom.length);//LobbyManager.getInstance().getLanguageString(Language.sChipPanelCustom) + ":" + String(5-m_aCustom.length);
			m_mcAsset.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);// LobbyManager.getInstance().getLanguageString(Language.sChipPanelCustom_Label);
			m_mcAsset.mc_ok.mc_label.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			m_mcAsset.mc_no.mc_label.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
		}
		
		private function getCustomChip():String{
			if(m_aCustom){
				while(m_aCustom.length<5){
					m_aCustom.push(0);
				}
				return m_aCustom.join(",");
			}
			return "0,0,0,0,0";
		}
	}
}