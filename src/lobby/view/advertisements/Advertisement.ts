module lobby.view.advertisements {
	export class Advertisement  extends ui.paging.Paging{
		private m_uWidth				:	number;									//广告宽度
		private m_uIndex				:	number;									//当前序号
		private m_paginglist 			:	ui.paging.PagingList;								//翻页按钮
		private m_vectorAdvertisement	:	AdvertisementItem[];				//所有广告
		private m_spContainer			:	egret.Sprite;									//广告容器
		private m_spPaging				:	egret.Sprite;
		private m_spMask				:	egret.Sprite;									//遮罩容器
		// private m_timer					:	JTimer;
		
		
		public constructor() {
			super();

			let ad = manager.ResourceManager.getInstance().createBitmapByName("ad_0_jpg");
			this.addChild(ad);
				
			this.m_spContainer = new egret.Sprite();
			this.addChild(this.m_spContainer);
			
			this.m_spPaging = new egret.Sprite();
			this.addChild(this.m_spPaging);
			
			this.m_spMask = new egret.Sprite();
			this.addChild(this.m_spMask);
			
			this.m_paginglist = new ui.paging.PagingList( this, manager.ResourceManager.getInstance().getClassByNameFromDomain(define.Define.SWF_LOBBY, "Ad_Page_Item_Asset" ));
			this.m_spPaging.addChild(this.m_paginglist);
			this.m_spPaging.x = 1350;
			this.m_spPaging.y = 220;
			
//			drawMask(200,100);
		}
		
		 public destroy():void{
			// if(m_timer){
			// 	/*m_timer.stop();
			// 	m_timer.removeEventListener(TimerEvent.TIMER,changeAD);*/
			// 	m_timer.dispose();
			// 	m_timer = null;
			// }
			
			if(this.m_paginglist){
				this.removeChild( this.m_paginglist );
				this.m_paginglist.destroy();
				this.m_paginglist = null;
			}
			
			this.clean();
			
			if(this.m_spContainer){
				this.removeChild(this.m_spContainer);
				this.m_spContainer = null;
			}
			
		}
		private clean():void{
			if(this.m_vectorAdvertisement){
				var item : AdvertisementItem;
				while (this.m_vectorAdvertisement.length>0) 
				{
					item = this.m_vectorAdvertisement.pop();
					this.m_spContainer.removeChild(item);
					item.destroy();
				}
				if(item){
					item = null;
				}
				this.m_vectorAdvertisement = null;
			}
		}
		
		public setData():void{
			//初始广告
			this.m_uIndex = 255;
			this.clean();
			
			if(this.m_vectorAdvertisement==null){
				this.m_vectorAdvertisement = new Array<AdvertisementItem>();
			}
			var item : AdvertisementItem;
			this.uCount = model.LobbyData.getInstance().AdvList.length;
			for (var i:number= 0; i < this.uCount; i++) 
			{
				item = new AdvertisementItem(this, model.LobbyData.getInstance().AdvList[i]);
				this.m_vectorAdvertisement.push(item);
				this.m_spContainer.addChild(item);
			}
			if(item){
				item = null;
			}
			
			if(this.uCount>1){
				// if(this.m_timer==null){
				// 	/*m_timer = new Timer(3000);
				// 	m_timer.addEventListener(TimerEvent.TIMER, changeAD);*/
				// 	m_timer = JTimer.getTimer(3000);
				// 	m_timer.addTimerCallback(changeAD);
				// }
				this.start();
			}
			
			this.m_paginglist.setData();
			this.m_spPaging.x = <number>((1494-this.m_paginglist.width)*0.5);
			this.m_paginglist.currentPage(0);
		}
		
		public start():void{
			// if(m_timer){
			// 	m_timer.reset();
			// 	m_timer.start();
			// }
			
		}
		public stop():void{
			// if(m_timer){
			// 	m_timer.stop();
			// }
		}
		
		protected changeAD():void
		{
			// TODO Auto-generated method stub
			this.m_uIndex++;
			if(this.m_uIndex >= this.uCount){
				this.m_uIndex = 0;
			}
			
			this.m_paginglist.currentPage(this.m_uIndex);
		}
		
		 public showView( _iIndex:number):void{
			this.m_uIndex = _iIndex;
			this.m_vectorAdvertisement[this.m_uIndex].alpha = 0;
			this.m_spContainer.setChildIndex(this.m_vectorAdvertisement[this.m_uIndex],this.m_spContainer.numChildren-1);
			// egret.Tween.to(this.m_vectorAdvertisement[this.m_uIndex], define.Define.SPEED, {alpha:1});
			//				TweenUtil.moveToX(m_spContainer, 30, 50, 10, -m_iIndex*m_iWidth, 0.3);
			
			this.start();
		}
		
		public resize( _iWidth:number, _iHeight:number):void{
//			m_iWidth = _iWidth;
//			var item : AdvertisementItem;
//			for (var i:number= 0; i < _vectorAdvertisement.length; i++) 
//			{
//				item = _vectorAdvertisement[i];
//				item.resize( _iWidth, _iHeight );
//			}
//			item = null;
//			drawMask( _iWidth, _iHeight );
			
			//临时处理
			this.m_spContainer.graphics.clear();
			this.m_spContainer.graphics.beginFill(0x00ff00);
			this.m_spContainer.graphics.drawRect(0,0,_iWidth,_iHeight);
			this.m_spContainer.graphics.endFill();
		}
		
		private drawMask( _iWidth:number, _iHeight:number):void
		{
			this.m_spMask.graphics.clear();
			this.m_spMask.graphics.beginFill(0x000000);
			this.m_spMask.graphics.drawRect(0,0,_iWidth,_iHeight);
			this.m_spMask.graphics.endFill();
		}
	}
}