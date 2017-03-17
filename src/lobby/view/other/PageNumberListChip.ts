module lobby.view.other {
	export class PageNumberListChip extends BSprite{
		private var m_aPageNumbers			:	Array;						//所有页码
		private var m_uCurrentPageNumber	:	PageNumberChip;				//当前页码
		private var m_pagePanel				:	PanelPage;					//
		private var m_uMode					:	uint;
		
		public constructor( _uMode:uint, _pagePanel:PanelPage, _uPage:uint ) {
			super();
			m_uMode = _uMode;
			m_pagePanel = _pagePanel;
			
			m_aPageNumbers = [];
			for (var i:int = 0; i < _uPage; i++) 
			{
				addPageNumber(i);
			}
			m_uCurrentPageNumber = m_aPageNumbers[0];
			m_uCurrentPageNumber.select = true;
			
			if(_uPage<=1){
				this.visible = false;
			}
		}
		override public function destroy():void{
			
			if(m_pagePanel){
				m_pagePanel = null;
			}
			
			if(m_uCurrentPageNumber){
				m_uCurrentPageNumber = null;
			}
			if(m_aPageNumbers){
				var _pageNumber : PageNumberChip;
				while(m_aPageNumbers.length>0){
					_pageNumber = m_aPageNumbers.pop();
					if(_pageNumber.parent){
						_pageNumber.parent.removeChild(_pageNumber);
					}
					_pageNumber.destroy();
				}
				if(_pageNumber){
					_pageNumber = null;
				}
				m_aPageNumbers = null;
			}
		}
		
		public function addPageNumber(_uPage:uint):void{
			var pageNumber : PageNumberChip = new PageNumberChip(m_uMode, m_pagePanel, _uPage);
			this.addChild(pageNumber);
			pageNumber.x = m_aPageNumbers.length * (pageNumber.width+12);
			pageNumber.select = false;
			m_aPageNumbers.push(pageNumber);
			pageNumber = null;
		}
		
		public function setCurrentPageNumber(_pageNumber:PageNumberChip):void{
			m_uCurrentPageNumber.select = false;
			m_uCurrentPageNumber = _pageNumber;
			m_uCurrentPageNumber.select = true;
		}
		
		public function setCurrentPageNumberByIndex(_uIndex:uint):void{
			if(m_uCurrentPageNumber.pageID!=_uIndex){
				m_uCurrentPageNumber.select = false;
				m_uCurrentPageNumber = m_aPageNumbers[_uIndex];
				m_uCurrentPageNumber.select = true;
			}
		}
	}
}