module lobby.view.advertisements {
	export class AdvertisementItem extends BSprite{
		
		private m_loader	:	egret.ImageLoader;
		private m_struct	:	model.struct.AdvertisementStruct;
		private m_bClick	:	 boolean;
		private m_adver		:	Advertisement;
		
		public constructor( _adver:Advertisement, _struct:model.struct.AdvertisementStruct, bClick: boolean = true ) {
			super();
			this.m_adver = _adver;
			this.m_struct = _struct;
			this.m_bClick = bClick;
			
			this.m_loader = new egret.ImageLoader();
			this.m_loader.addEventListener(egret.Event.COMPLETE,this.onComplete, this);
			this.m_loader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.error, this);
			this.m_loader.load(this.m_struct.AdsUrl);
			console.log(this,"广告加载："+this.m_struct.AdsUrl);
			if (bClick)
			{
				// this.buttonMode = true;
				this.addEventListener(mouse.MouseEvent.MOUSE_OVER,this.over, this);
				this.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.out, this);
				this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
			}
		}
		
		protected over(event:MouseEvent):void
		{
			this.m_adver.stop();
		}
		
		protected out(event:MouseEvent):void
		{
			this.m_adver.start();
		}
		private removeEvent():void{
			if(this.m_loader){
				this.m_loader.removeEventListener(egret.Event.COMPLETE,this.onComplete, this);
				this.m_loader.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.error, this);
			}
			
		}
		
		protected onComplete(event:egret.Event):void
		{
			var imageLoader = <egret.ImageLoader>event.currentTarget;
			var bitmap:egret.Bitmap = new egret.Bitmap(imageLoader.data);
			this.addChild(bitmap);
			bitmap.width = 1494;
			bitmap.height = 240;

			this.removeEvent();

//			(m_loader.content as Bitmap).smoothing = true;
		}
		
		protected error(event:Event):void
		{
			// TODO Auto-generated method stub
			console.log(event);
			this.removeEvent();
		}
		 public destroy():void{
			if(this.m_adver){
				this.m_adver = null;
			}
			if (this.m_bClick)
			{
				this.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.over, this);
				this.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.out, this);
				this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
			}
			if (this.m_loader)
			{
				this.removeEvent();
				while(this.numChildren>0){
					this.removeChildAt(0);
				}
				this.m_loader = null;
			}
		}
		
		protected onClick(event:MouseEvent) : void
		{
			if(this.m_struct.LinkUrl.indexOf("http://")==-1){
				// this.navigateToURL(new egret.URLRequest("http://"+this.m_struct.LinkUrl),"_blank");
			}else{
				// this.navigateToURL(new egret.RLRequest(this.m_struct.LinkUrl),"_blank");
			}
		}
		
	}
}