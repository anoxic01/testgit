module lobby.view.advertisements {
	export class Advertisement  extends Paging{
		private var m_uWidth				:	uint;									//广告宽度
		private var m_uIndex				:	uint;									//当前序号
		private var m_paginglist 			:	PagingList;								//翻页按钮
		private var m_vectorAdvertisement	:	Vector.<AdvertisementItem>;				//所有广告
		private var m_spContainer			:	Sprite;									//广告容器
		private var m_spPaging				:	Sprite;
		private var m_spMask				:	Sprite;									//遮罩容器
		private var m_timer					:	JTimer;
		
		
		public constructor() {
			super();

			let ad = manager.ResourceManager.getInstance().createBitmapByName("ad_0_jpg");
			this.addChild(ad);
				
			m_spContainer = new Sprite();
			this.addChild(m_spContainer);
			
			m_spPaging = new Sprite();
			this.addChild(m_spPaging);
			
			m_spMask = new Sprite();
			this.addChild(m_spMask);
			
			m_paginglist = new PagingList( this, ResourceManager.getInstance().getClassByNameFromDomain(Define.SWF_LOBBY, "Ad_Page_Item_Asset" ));
			m_spPaging.addChild(m_paginglist);
			m_spPaging.x = 1350;
			m_spPaging.y = 220;
			
//			drawMask(200,100);
		}
		
		override public function destroy():void{
			if(m_timer){
				/*m_timer.stop();
				m_timer.removeEventListener(TimerEvent.TIMER,changeAD);*/
				m_timer.dispose();
				m_timer = null;
			}
			
			if(m_paginglist){
				this.removeChild( m_paginglist );
				m_paginglist.destroy();
				m_paginglist = null;
			}
			
			clean();
			
			if(m_spContainer){
				this.removeChild(m_spContainer);
				m_spContainer = null;
			}
			
		}
		private function clean():void{
			if(m_vectorAdvertisement){
				var item : AdvertisementItem;
				while (m_vectorAdvertisement.length>0) 
				{
					item = m_vectorAdvertisement.pop();
					m_spContainer.removeChild(item);
					item.destroy();
				}
				if(item){
					item = null;
				}
				m_vectorAdvertisement = null;
			}
		}
		
		public function setData():void{
			//初始广告
			m_uIndex = 255;
			clean();
			
			if(m_vectorAdvertisement==null){
				m_vectorAdvertisement = new Vector.<AdvertisementItem>;
			}
			var item : AdvertisementItem;
			uCount = LobbyData.getInstance().AdvList.length;
			for (var i:int = 0; i < uCount; i++) 
			{
				item = new AdvertisementItem(this, LobbyData.getInstance().AdvList[i]);
				m_vectorAdvertisement.push(item);
				m_spContainer.addChild(item);
			}
			if(item){
				item = null;
			}
			
			if(uCount>1){
				if(m_timer==null){
					/*m_timer = new Timer(3000);
					m_timer.addEventListener(TimerEvent.TIMER, changeAD);*/
					m_timer = JTimer.getTimer(3000);
					m_timer.addTimerCallback(changeAD);
				}
				start();
			}
			
			m_paginglist.setData();
			m_spPaging.x = int((1494-m_paginglist.width)*0.5);
			m_paginglist.currentPage(0);
		}
		
		public function start():void{
			if(m_timer){
				m_timer.reset();
				m_timer.start();
			}
			
		}
		public function stop():void{
			if(m_timer){
				m_timer.stop();
			}
		}
		
		protected function changeAD():void
		{
			// TODO Auto-generated method stub
			m_uIndex++;
			if(m_uIndex >= uCount){
				m_uIndex = 0;
			}
			
			m_paginglist.currentPage(m_uIndex);
		}
		
		override public function showView( _iIndex:int ):void{
			m_uIndex = _iIndex;
			m_vectorAdvertisement[m_uIndex].alpha = 0;
			m_spContainer.setChildIndex(m_vectorAdvertisement[m_uIndex],m_spContainer.numChildren-1);
			TweenLite.to(m_vectorAdvertisement[m_uIndex], Define.SPEED, {alpha:1});
			//				TweenUtil.moveToX(m_spContainer, 30, 50, 10, -m_iIndex*m_iWidth, 0.3);
			
			start();
		}
		
		public function resize( _iWidth:int, _iHeight:int ):void{
//			m_iWidth = _iWidth;
//			var item : AdvertisementItem;
//			for (var i:int = 0; i < _vectorAdvertisement.length; i++) 
//			{
//				item = _vectorAdvertisement[i];
//				item.resize( _iWidth, _iHeight );
//			}
//			item = null;
//			drawMask( _iWidth, _iHeight );
			
			//临时处理
			m_spContainer.graphics.clear();
			m_spContainer.graphics.beginFill(0x00ff00);
			m_spContainer.graphics.drawRect(0,0,_iWidth,_iHeight);
			m_spContainer.graphics.endFill();
		}
		
		private function drawMask( _iWidth:int, _iHeight:int ):void
		{
			m_spMask.graphics.clear();
			m_spMask.graphics.beginFill(0x000000);
			m_spMask.graphics.drawRect(0,0,_iWidth,_iHeight);
			m_spMask.graphics.endFill();
		}
	}
}