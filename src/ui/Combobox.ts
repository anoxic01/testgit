module ui {
	export class Combobox extends BSprite{
		private m_mcAsset		:	MovieClip;
		public tfLabel			:	TextField;
//		protected m_btnPullDown	:	ui.button.SingleButtonMC;
		
		protected m_mcList		:	MovieClip;
		protected m_currentItem	:	ComboboxItem;
		
		public bShowList		:	 boolean;
		
		protected m_vecList		:	<ComboboxItem>;
		private m_scroll		:	Scroll_2;
		private m_itemClass		:	Class;
		
		public fSelectItem		:	Function;
		
		public constructor( _comboboxClass:Class, _scrollHandClass:Class, _scrollLineClass:Class, _itemClass:Class ) {
			super();
			
			m_itemClass = _itemClass;
			
			m_mcAsset = new _comboboxClass();
			this.addChild(m_mcAsset);
			
			tfLabel = m_mcAsset.getChildByName("tf_label") as TextField;
			
			var this2 : Sprite = this;
//			m_btnPullDown = new ui.button.SingleButtonMC(m_mcAsset.getChildByName("mc_0") as MovieClip, function(evt:MouseEvent):void{
//				
//			});
			m_mcAsset.mc_0.gotoAndStop(1);
			
			m_vecList = new <ComboboxItem>;
			
			m_mcList = m_mcAsset.mc_1;
			
			m_scroll = new Scroll_2(false, null, null, true);
			m_scroll.x = 0;
			m_scroll.y = 0;
			m_mcList.addChild(m_scroll);
			
			onChangeLanguage();
			m_mcAsset.addEventListener(egret.TouchEvent.TOUCH_TAP, click);
			m_mcAsset.addEventListener(mouse.MouseEvent.MOUSE_OVER, over);
			m_mcAsset.addEventListener(mouse.MouseEvent.MOUSE_OUT, out);
		}
		
		protected over(event:MouseEvent):void
		{
			if(bShowList){
				return;
			}
			m_mcAsset.mc_0.gotoAndStop(2);
		}
		
		protected out(event:MouseEvent):void
		{
			if(bShowList){
				return;
			}
			m_mcAsset.mc_0.gotoAndStop(1);
		}
		
		protected click(event:MouseEvent):void
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
		
		public destroy():void
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
		
		
		public setData(_aData:any[] ,_aKey:any[] = null ):void{			
			var _len : int = _aData.length;
			
			if( _aKey == null ){
				for (var i:number= 0; i < _len; i++) {
					addComboboxItem(_aData[i]);
				}
			}
			else {
				for (var j:number= 0; j < _len; j++) {
					addComboboxItem(_aData[j], _aKey[j]);
				}				
				
			}
			

			
			m_scroll.resize( 180, 135 );
			
			m_mcList.y = -m_mcList.height;
		}
		
		public addComboboxItem( _sValue:string , _sKey:string = null ):void{
			var _item:ComboboxItem = new ComboboxItem(this, m_itemClass, _sValue , _sKey );
			m_scroll.add(_item);
			_item.uIndex = m_vecList.length;
			_item.y = m_vecList.length*_item.height;
			m_vecList.push(_item);
			
		}
		
		public removeComboboxItem(_item:ComboboxItem):void{
			
		}
		
		
		public showList():void{
			if(!bShowList){
				m_mcList.y = 25;
				bShowList = true;
			}
		}
		
		public hideList():void{
			if(bShowList){
				m_mcList.y = -m_mcList.height;
				bShowList = false;
			}
		}
		
		
		public setCurrentItem( _item:ComboboxItem, _bSelect: boolean=false):void{
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
		get currentItem():ComboboxItem{
			return m_currentItem;
		}
		
		get vecList():<ComboboxItem>{
			return m_vecList;
		}
		
		public onChangeLanguage():void{
			if(m_vecList){
				var _len : int = m_vecList.length;
				for (var i:number= 0; i < _len; i++) 
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