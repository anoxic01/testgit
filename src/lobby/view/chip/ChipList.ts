module lobby.view.chip {
	export class ChipList extends BSprite{
		private m_mcAsset		;				//筹码列表
		public aChipItems		:	any[];					//筹码集合
		private m_chipPanel		:	ChipPanel;				//筹码面板
		private m_uMode			:	number;					//面板模式	0-多桌	1-游戏（短）	2-游戏（长）
		
		public constructor( _uMode:number, _aChips:any[], _chipPanel:ChipPanel) {
			super();
			this.m_uMode = _uMode;
			this.m_chipPanel = _chipPanel;
			
			switch(_uMode){
				case 0:
					this.m_mcAsset = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_CHIP,"ChipListLobbyAsset");
					break;
				case 1:
					this.m_mcAsset = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_CHIP,"ChipListGameAsset");
					break;
				case 2:
					this.m_mcAsset = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_CHIP,"ChipListGameAsset_2");
					break;
				
			}
			this.addChild(this.m_mcAsset);
			
			this.aChipItems = [];
			var _uLen : number = _aChips.length;
			var _mc ;
			var _chipItem : ChipItem;
			for (var i:number= 0; i < _uLen; i++) 
			{
				_aChips[i] = this.setChips(_aChips[i] );
				if(_aChips[i]==0){
					break;
				}
				
				_chipItem = new ChipItem( _uMode!=0?true:false,_aChips[i], this.m_chipPanel);
				_mc = this.m_mcAsset.getChildByName("mc_" + i.toString());
				_mc.addChild(_chipItem);
				_mc.mouseEnabled = false;
				this.aChipItems.push(_chipItem);
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
			
			if(this.aChipItems){
				this.clearChip();
				this.aChipItems = null;
			}
			
			if(this.m_chipPanel){
				this.m_chipPanel = null;
			}
			
			if(this.m_mcAsset){
				this.removeChild(this.m_mcAsset);
				this.m_mcAsset = null;
			}
		}
		
		public addChip(_uIndex:number, _uValue:number):void{
			if(_uValue==0){
				return;
			}
			var _mc  = this.m_mcAsset.getChildByName("mc_" + _uIndex.toString());
			_mc.visible = true;
			var _chipItem : ChipItem = new ChipItem(this.m_uMode!=0?true:false, _uValue, this.m_chipPanel);
			_mc.addChild(_chipItem);
			_mc.mouseEnabled = false;
			this.aChipItems.push(_chipItem);
		}
		
		public getFirstChipItem():ChipItem{
			if(this.aChipItems && this.aChipItems.length>1){
				return this.aChipItems[0];
			}
			return null;
		}
		
		public removeChip(_uIndex:number):void{
			var _chipItem = this.aChipItems.splice(_uIndex,1);
			if(_chipItem && _chipItem.parent){
				_chipItem.parent.removeChild(_chipItem);
				_chipItem.destroy();
				_chipItem = null;
			}
		}
		
		public clearChip():void{
			var _chipItem : ChipItem;
			while(this.aChipItems.length){
				_chipItem = this.aChipItems.pop();
				if(this.m_chipPanel.currentChipItem==_chipItem){
					this.m_chipPanel.currentChipItem = null;
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
			if(this.aChipItems){
				var item : ChipItem;
				var _len : number = this.aChipItems.length;
				for (var i:number= 0; i < _len; i++) 
				{
					(this.aChipItems[i] as ChipItem).selectStatus(false);
				}
			}
		}
	}
}