module ui {
	export class ComboboxItem extends BSprite{
		private m_mcAsset		:	MovieClip;
		private m_btnAsset		:	SingleButtonMC;
		private m_sValue		:	string;
		
		protected m_combobox	:	Combobox;
		
		public uIndex			:	number;
		public sKey				:	string;
		public constructor( _combobox:Combobox, _assetClass:Class, _sValue:string , _sKey:string ) {
			super();
			m_combobox = _combobox;
			sKey	   = _sKey;
			m_mcAsset = new _assetClass();
			this.addChild(m_mcAsset);
			
			m_sValue = _sValue;
			
			var item : ComboboxItem = this;
			m_btnAsset = new SingleButtonMC(m_mcAsset, function(event:MouseEvent):void{
				m_combobox.setCurrentItem(item,true);
				m_combobox.hideList();
			});
			
			m_mcAsset.tf_label.text = LobbyManager.getInstance().getLanguageString(m_sValue);
			
			onChangeLanauge();
		}
		
		public destroy():void
		{
			if(m_btnAsset){
				m_btnAsset.destroy();
				m_btnAsset = null;
			}
			
			if(m_combobox){
				m_combobox = null;
			}
			
			if(m_mcAsset){
				this.removeChild(m_mcAsset);
				m_mcAsset = null;
			}
		}
		
		public onChangeLanauge():void{
			m_mcAsset.tf_label.text = LobbyManager.getInstance().getLanguageString(m_sValue);
		}
		
		public select(_bValue: boolean):void{
			m_btnAsset.setSelectedStatus(_bValue);
		}
		
		get text():string{
			return m_mcAsset.tf_label.text;
		}
		
		get sValue():string {
			return m_sValue;
		}
		
	}
}