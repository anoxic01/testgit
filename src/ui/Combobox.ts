module ui {
	export class Combobox extends BSprite{
		private var m_mcAsset		:	MovieClip;
		public var tfLabel			:	TextField;
//		protected var m_btnPullDown	:	SingleButtonMC;
		
		protected var m_mcList		:	MovieClip;
		protected var m_currentItem	:	ComboboxItem;
		
		public var bShowList		:	Boolean;
		
		protected var m_vecList		:	Vector.<ComboboxItem>;
		private var m_scroll		:	Scroll_2;
		private var m_itemClass		:	Class;
		
		public var fSelectItem		:	Function;
		
		public constructor( _comboboxClass:Class, _scrollHandClass:Class, _scrollLineClass:Class, _itemClass:Class ) {
			super();
			
			m_itemClass = _itemClass;
			
			m_mcAsset = new _comboboxClass();
			this.addChild(m_mcAsset);
			
			tfLabel = m_mcAsset.getChildByName("tf_label") as TextField;
			
			var this2 : Sprite = this;
//			m_btnPullDown = new SingleButtonMC(m_mcAsset.getChildByName("mc_0") as MovieClip, function(evt:MouseEvent):void{
//				
//			});
			m_mcAsset.mc_0.gotoAndStop(1);
			
			m_vecList = new Vector.<ComboboxItem>;
			
			m_mcList = m_mcAsset.mc_1;
			
			m_scroll = new Scroll_2(false, null, null, true);
			m_scroll.x = 0;
			m_scroll.y = 0;
			m_mcList.addChild(m_scroll);
			
			onChangeLanguage();
			m_mcAsset.addEventListener(MouseEvent.CLICK, click);
			m_mcAsset.addEventListener(MouseEvent.MOUSE_OVER, over);
			m_mcAsset.addEventListener(MouseEvent.MOUSE_OUT, out);
		}
		
		protected function over(event:MouseEvent):void
		{
			if(bShowList){
				return;
			}
			m_mcAsset.mc_0.gotoAndStop(2);
		}
		
		protected function out(event:MouseEvent):void
		{
			if(bShowList){
				return;
			}
			m_mcAsset.mc_0.gotoAndStop(1);
		}
		
		protected function click(event:MouseEvent):void
		{
			SoundManager.getInstance().play(SoundPackage.sClick_Tools);
			
			if(bShowList){
				hideList();
			}else{
				showList();
			}
			this.parent.setChildIndex(this, this.parent.numChildren-1);
			event.stopImmediatePropagation();
		}
		
		public function destroy():void
		{
			
			if(m_vecList){
				var _item : ComboboxItem;
				while(m_vecList.length>0){
					_item = m_vecList.pop();
					if(_item.parent){
						_item.parent.removeChild(_item);
					}
					_item.destroy();
				}
				if(_item){
					_item = null;
				}
			}
			
			if(m_scroll){
				if(m_scroll.parent){
					m_scroll.parent.removeChild(m_scroll);
				}
				m_scroll = null;
			}
			
			if(m_mcList){
				if(m_mcList.parent){
					m_mcList.parent.removeChild(m_mcList);
				}
				m_mcList = null;
			}
			
			if(m_currentItem){
				m_currentItem = null;
			}
		}
		
		
		public function setData(_aData:Array ,_aKey:Array = null ):void{			
			var _len : int = _aData.length;
			
			if( _aKey == null ){
				for (var i:int = 0; i < _len; i++) {
					addComboboxItem(_aData[i]);
				}
			}
			else {
				for (var j:int = 0; j < _len; j++) {
					addComboboxItem(_aData[j], _aKey[j]);
				}				
				
			}
			

			
			m_scroll.resize( 180, 135 );
			
			m_mcList.y = -m_mcList.height;
		}
		
		public function addComboboxItem( _sValue:String , _sKey:String = null ):void{
			var _item:ComboboxItem = new ComboboxItem(this, m_itemClass, _sValue , _sKey );
			m_scroll.add(_item);
			_item.uIndex = m_vecList.length;
			_item.y = m_vecList.length*_item.height;
			m_vecList.push(_item);
			
		}
		
		public function removeComboboxItem(_item:ComboboxItem):void{
			
		}
		
		
		public function showList():void{
			if(!bShowList){
				m_mcList.y = 25;
				bShowList = true;
			}
		}
		
		public function hideList():void{
			if(bShowList){
				m_mcList.y = -m_mcList.height;
				bShowList = false;
			}
		}
		
		
		public function setCurrentItem( _item:ComboboxItem, _bSelect:Boolean=false):void{
			if(m_currentItem){
				m_currentItem.select(false);
			}
			m_currentItem = _item;
			m_currentItem.select(true);
			
			tfLabel.text = m_currentItem.text;
			
			if(_bSelect && (fSelectItem!=null)){
				fSelectItem(m_currentItem.sKey);
			}
		}
		public function get currentItem():ComboboxItem{
			return m_currentItem;
		}
		
		public function get vecList():Vector.<ComboboxItem>{
			return m_vecList;
		}
		
		public function onChangeLanguage():void{
			if(m_vecList){
				var _len : int = m_vecList.length;
				for (var i:int = 0; i < _len; i++) 
				{
					m_vecList[i].onChangeLanauge();
				}
			}
			if(m_currentItem){
				tfLabel.text = m_currentItem.text;
			}
		}
		
	}
}