module ui {
	export class ComboboxItem extends BSprite{
		private var m_mcAsset		:	MovieClip;
		private var m_btnAsset		:	SingleButtonMC;
		private var m_sValue		:	String;
		
		protected var m_combobox	:	Combobox;
		
		public var uIndex			:	uint;
		public var sKey				:	String;
		public constructor( _combobox:Combobox, _assetClass:Class, _sValue:String , _sKey:String ) {
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
		
		public function destroy():void
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
		
		public function onChangeLanauge():void{
			m_mcAsset.tf_label.text = LobbyManager.getInstance().getLanguageString(m_sValue);
		}
		
		public function select(_bValue:Boolean):void{
			m_btnAsset.setSelectedStatus(_bValue);
		}
		
		public function get text():String{
			return m_mcAsset.tf_label.text;
		}
		
		public function get sValue():String {
			return m_sValue;
		}
		
	}
}