module ui.paging {
	export class PagingList extends lobby.view.BSprite{
		private  m_currentItem	:	PagingItem;
		private  m_vectorList	:	PagingItem[];
		private  m_pagingView	:	Paging;
		private  m_classAsset;
		
		public constructor( _pagingView:Paging, _classAsset=null ) {
			super();
			this.m_pagingView = _pagingView;
			this.m_classAsset = _classAsset;
			
		}
		
		public destroy():void
		{
			this.clean();
			
			if(this.m_currentItem){
				this.m_currentItem = null;
			}
			if(this.m_pagingView){
				this.m_pagingView = null;
			}
			if(this.m_classAsset){
				this.m_classAsset = null;
			}
		}
		
		private clean():void{
			if(this.m_vectorList){
				var _uLen : number = this.m_vectorList.length;
				for (var i:number = 0; i < _uLen; i++) 
				{
					this.m_currentItem = this.m_vectorList.pop();
					this.removeChild( this.m_currentItem );
					this.m_currentItem.destroy();
				}
				
				this.m_vectorList = null;
			}
		}
		
		public setData():void{
			this.clean();
			
			if(this.m_vectorList==null){
				this.m_vectorList = new Array<PagingItem>();
			}
			
			for (var i:number = 0; i < this.m_pagingView.uCount; i++) 
			{
				this.m_currentItem = new  PagingItem( this, this.m_classAsset, this.m_pagingView.showView);
				this.addChild(this.m_currentItem);
				this.m_currentItem.x = (this.m_currentItem.width+2) * i;
				this.m_currentItem.iIndex = i;
				this.m_vectorList.push(this.m_currentItem);
			}
			
		}
		
		public currentPage( _iIndex:number ):void{
			if(this.m_vectorList.length > _iIndex){
				if(this.m_currentItem != this.m_vectorList[_iIndex]){
					if(this.m_currentItem){
						this.m_currentItem.select(false);
					}
					this.m_currentItem = this.m_vectorList[_iIndex];
					this.m_currentItem.select(true);
				}
			}
		}
		
	}
}