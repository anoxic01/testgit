module ui.paging {
	export class PagingItem extends lobby.view.BSprite{
		public static DEFAULT	: 	string	=	"DEFAULT";
		public static HOVER		: 	string	=	"HOVER";
		public static SELECT	: 	string	=	"SELECT";
		
		private m_bSelect		:	boolean;			//选中状态
		private m_fSelect		:	Function;			//回调方法
		private m_mcAsset		:	egret.MovieClip;			//美术资源
		private m_pagingList	:	PagingList;			//翻页列表
		public iIndex			:	number;				//页面序号
		private m_bAsset		:	boolean;			//自定UI
		
		public constructor(_pagingList:PagingList, _classAsset=null, _fSelect:Function=null) {
			super();

			this.m_pagingList = _pagingList;
			
			if(_classAsset){
				this.m_mcAsset = new _classAsset();
				this.m_bAsset = true;
				this.m_mcAsset.gotoAndStop(PagingItem.DEFAULT);
			}else{
				this.m_mcAsset = new egret.MovieClip();
				this.m_mcAsset.graphics.beginFill(0xffffff);
				this.m_mcAsset.graphics.drawCircle(0,0,10);
				this.m_mcAsset.graphics.endFill();
			}
			this.addChild( m_mcAsset );
			
			this.m_fSelect = _fSelect;
			
			// this.m_mcAsset.buttonMode = true;
			this.m_mcAsset.addEventListener(mouse.MouseEvent.MOUSE_OVER, over, this);
			this.m_mcAsset.addEventListener(mouse.MouseEvent.MOUSE_OUT, out, this);
			this.m_mcAsset.addEventListener(mouse.MouseEvent.CLICK, click, this);
		}
		
		protected click(event:mouse.MouseEvent):void
		{
			this.m_pagingList.currentPage(this.iIndex);
		}		
		
		public destroy():void
		{
			if( this.m_mcAsset ){
				this.m_mcAsset.removeEventListener(mouse.MouseEvent.MOUSE_OVER, over, this);
				this.m_mcAsset.removeEventListener(mouse.MouseEvent.MOUSE_OUT, out, this);
				this.m_mcAsset.removeEventListener(mouse.MouseEvent.CLICK, click, this);
				this.m_mcAsset = null;
			}
			if( this.m_fSelect != null ){
				this.m_fSelect = null;
			}
			if(this.m_pagingList){
				this.m_pagingList = null;
			}
		}
		
		public select( _bStatus:Boolean ):void{
			if( this.m_bSelect != _bStatus ){
				this.m_bSelect = _bStatus;
				if( this.m_bSelect ){
					if( this.m_fSelect!=null ){
						this.m_fSelect(this.iIndex);
					}
					if(this.m_bAsset){
						this.m_mcAsset.gotoAndStop(PagingItem.SELECT);
					}else{
						this.m_mcAsset.graphics.clear();
						this.m_mcAsset.graphics.beginFill(0x0000ff);
						this.m_mcAsset.graphics.drawCircle(0,0,10);
						this.m_mcAsset.graphics.endFill();
					}
				}else{
					if(this.m_bAsset){
						this.m_mcAsset.gotoAndStop(PagingItem.DEFAULT);
					}else{
						this.m_mcAsset.graphics.clear();
						this.m_mcAsset.graphics.beginFill(0xffffff);
						this.m_mcAsset.graphics.drawCircle(0,0,10);
						this.m_mcAsset.graphics.endFill();
					}
				}
			}
		}
		
		
		protected out(event:mouse.MouseEvent):void
		{
			if( this.m_mcAsset && !this.m_bSelect ){
				if(this.m_bAsset){
					this.m_mcAsset.gotoAndStop(PagingItem.DEFAULT);
				}else{
					this.m_mcAsset.graphics.clear();
					this.m_mcAsset.graphics.beginFill(0xffffff);
					this.m_mcAsset.graphics.drawCircle(0,0,10);
					this.m_mcAsset.graphics.endFill();
				}
			}
		}
		
		protected over(event:mouse.MouseEvent):void
		{
			if( this.m_mcAsset && !this.m_bSelect ){
				if(this.m_bAsset){
					this.m_mcAsset.gotoAndStop(PagingItem.HOVER);
				}else{
					this.m_mcAsset.graphics.clear();
					this.m_mcAsset.graphics.beginFill(0x0000ff);
					this.m_mcAsset.graphics.drawCircle(0,0,10);
					this.m_mcAsset.graphics.endFill();
				}
				
			}
		}
	}
}