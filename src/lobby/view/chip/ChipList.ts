module lobby.view.chip {
	export class ChipList extends BSprite{
		private m_mcAsset		:	MovieClip;				//筹码列表
		public aChipItems		:	any[];					//筹码集合
		private m_chipPanel		:	ChipPanel;				//筹码面板
		private m_uMode			:	number;					//面板模式	0-多桌	1-游戏（短）	2-游戏（长）
		
		public constructor( _uMode:number, _aChips:any[], _chipPanel:ChipPanel) {
			super();
			m_uMode = _uMode;
			m_chipPanel = _chipPanel;
			
			switch(_uMode){
				case 0:
					m_mcAsset = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_CHIP,"ChipListLobbyAsset");
					break;
				case 1:
					m_mcAsset = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_CHIP,"ChipListGameAsset");
					break;
				case 2:
					m_mcAsset = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_CHIP,"ChipListGameAsset_2");
					break;
				
			}
			this.addChild(m_mcAsset);
			
			aChipItems = [];
			var _uLen : number = _aChips.length;
			var _mc : MovieClip;
			var _chipItem : ChipItem;
			for (var i:number= 0; i < _uLen; i++) 
			{
				_aChips[i] = setChips(_aChips[i] );
				if(_aChips[i]==0){
					break;
				}
				
				_chipItem = new ChipItem(_uMode,_aChips[i], m_chipPanel);
				_mc = m_mcAsset.getChildByName("mc_" + i.toString()) as MovieClip;
				_mc.addChild(_chipItem);
				_mc.mouseEnabled = false;
				aChipItems.push(_chipItem);
//				if(i>=_uLen){
//					_mc.visible = false;
//				}
			}
			_mc = null;
			_chipItem = null;
		}
		
		private setChips( _sChip:String ):String {
			var _sStr:String = _sChip;
			var _iId:number= _sChip.indexOf("k");
			if( _iId != -1 ){
				_sStr = _sChip.substr( 0 , _iId-1 );
				_sStr += "000";
			}
			
			return _sStr;
		}
		
		 public destroy():void{
			
			if(aChipItems){
				clearChip();
				aChipItems = null;
			}
			
			if(m_chipPanel){
				m_chipPanel = null;
			}
			
			if(m_mcAsset){
				this.removeChild(m_mcAsset);
				m_mcAsset = null;
			}
		}
		
		public addChip(_uIndex:number, _uValue:number):void{
			if(_uValue==0){
				return;
			}
			var _mc : MovieClip = m_mcAsset.getChildByName("mc_" + _uIndex.toString()) as MovieClip;
			_mc.visible = true;
			var _chipItem : ChipItem = new ChipItem(m_uMode, _uValue, m_chipPanel);
			_mc.addChild(_chipItem);
			_mc.mouseEnabled = false;
			aChipItems.push(_chipItem);
		}
		
		public getFirstChipItem():ChipItem{
			if(aChipItems && aChipItems.length>1){
				return aChipItems[0];
			}
			return null;
		}
		
		public removeChip(_uIndex:number):void{
			var _chipItem : ChipItem = aChipItems.splice(_uIndex,1);
			if(_chipItem && _chipItem.parent){
				_chipItem.parent.removeChild(_chipItem);
				_chipItem.destroy();
				_chipItem = null;
			}
		}
		
		public clearChip():void{
			var _chipItem : ChipItem;
			while(aChipItems.length){
				_chipItem = aChipItems.pop();
				if(m_chipPanel.currentChipItem==_chipItem){
					m_chipPanel.currentChipItem = null;
				}
				if(_chipItem.parent){
					_chipItem.parent.removeChild(_chipItem);
				}
				_chipItem.destroy()
			}
			if(_chipItem){
				_chipItem = null;
			}
		}
		
		public unselect():void{
			if(aChipItems){
				var item : ChipItem;
				var _len : int = aChipItems.length;
				for (var i:number= 0; i < _len; i++) 
				{
					(aChipItems[i] as ChipItem).selectStatus(false);
				}
			}
		}
	}
}