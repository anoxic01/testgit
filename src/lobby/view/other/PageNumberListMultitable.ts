module lobby.view.other {
	export class PageNumberListMultitable extends BSprite{
		private m_aPageNumbers			;						//所有页码
		private m_uCurrentPageNumber	:	PageNumberMutitable;		//当前页码
		private m_pagePanel				;					//
		
		public constructor(_pagePanel, _uPage:number) {
			super();
			this.m_pagePanel = _pagePanel;
			
			this.m_aPageNumbers = [];
			for (var i:number= 0; i < _uPage; i++) 
			{
				this.addPageNumber(i);
			}
			this.m_uCurrentPageNumber = this.m_aPageNumbers[0];
			this.m_uCurrentPageNumber.select = true;
			
			if(_uPage<=1){
				this.visible = false;
			}
		}
		
		 public destroy():void{
			
			if(this.m_pagePanel){
				this.m_pagePanel = null;
			}
			
			if(this.m_uCurrentPageNumber){
				this.m_uCurrentPageNumber = null;
			}
			if(this.m_aPageNumbers){
				var _pageNumber : PageNumberMutitable;
				while(this.m_aPageNumbers.length>0){
					_pageNumber = this.m_aPageNumbers.pop();
					if(_pageNumber.parent){
						_pageNumber.parent.removeChild(_pageNumber);
					}
					_pageNumber.destroy();
				}
				if(_pageNumber){
					_pageNumber = null;
				}
				this.m_aPageNumbers = null;
			}
		}
		
		public addPageNumber(_uPage:number):void{
			var pageNumber : PageNumberMutitable = new PageNumberMutitable(this.m_pagePanel, _uPage);
			this.addChild(pageNumber);
			pageNumber.x = this.m_aPageNumbers.length * (pageNumber.width+13) - 13;
			pageNumber.select = false;
			this.m_aPageNumbers.push(pageNumber);
			pageNumber = null;
		}
		
		public setCurrentPageNumber(_pageNumber:PageNumberMutitable):void{
			this.m_uCurrentPageNumber.select = false;
			this.m_uCurrentPageNumber = _pageNumber;
			this.m_uCurrentPageNumber.select = true;
		}
		
		public setCurrentPageNumberByIndex(_uIndex:number):void{
			if(this.m_uCurrentPageNumber.pageID!=_uIndex){
				this.m_uCurrentPageNumber.select = false;
				this.m_uCurrentPageNumber = this.m_aPageNumbers[_uIndex];
				this.m_uCurrentPageNumber.select = true;
			}
		}
		
		
	}
}