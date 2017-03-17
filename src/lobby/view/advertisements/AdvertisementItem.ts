module lobby.view.advertisements extends BSprite{
	export class AdvertisementItem {
		
		private var m_loader	:	Loader;
		private var m_struct	:	AdvertisementStruct;
		private var m_bClick	:	Boolean;
		private var m_adver		:	Advertisement;
		
		public constructor( _adver:Advertisement, _struct:AdvertisementStruct, bClick:Boolean = true ) {
			super();
			m_adver = _adver;
			m_struct = _struct;
			m_bClick = bClick;
			
			m_loader = new Loader();
			this.addChild(m_loader);
			m_loader.contentLoaderInfo.addEventListener(Event.COMPLETE,onComplete);
			m_loader.contentLoaderInfo.addEventListener(IOErrorEvent.IO_ERROR, error);
			m_loader.contentLoaderInfo.addEventListener(SecurityErrorEvent.SECURITY_ERROR,securityError);
			m_loader.load(new URLRequest(m_struct.AdsUrl));
			Log.getInstance().log(this,"广告加载："+m_struct.AdsUrl);
			if (bClick)
			{
				this.buttonMode = true;
				this.addEventListener(MouseEvent.MOUSE_OVER,over);
				this.addEventListener(MouseEvent.MOUSE_OUT, out);
				this.addEventListener(MouseEvent.CLICK, onClick);
			}
		}
		
		protected function over(event:MouseEvent):void
		{
			m_adver.stop();
		}
		
		protected function out(event:MouseEvent):void
		{
			m_adver.start();
		}
		private function removeEvent():void{
			if(m_loader){
				m_loader.contentLoaderInfo.removeEventListener(Event.COMPLETE,onComplete);
				m_loader.contentLoaderInfo.removeEventListener(IOErrorEvent.IO_ERROR, error);
				m_loader.contentLoaderInfo.removeEventListener(SecurityErrorEvent.SECURITY_ERROR,securityError);
			}
			
		}
		
		protected function onComplete(event:Event):void
		{
			removeEvent();
			m_loader.width = 1494;
			m_loader.height = 240;
//			(m_loader.content as Bitmap).smoothing = true;
		}
		
		protected function securityError(event:Event):void
		{
			// TODO Auto-generated method stub
			trace(event);
			removeEvent();
		}
		
		protected function error(event:Event):void
		{
			// TODO Auto-generated method stub
			trace(event);
			removeEvent();
		}
		override public function destroy():void{
			if(m_adver){
				m_adver = null;
			}
			if (m_bClick)
			{
				this.removeEventListener(MouseEvent.MOUSE_OVER,over);
				this.removeEventListener(MouseEvent.MOUSE_OUT, out);
				this.removeEventListener(MouseEvent.CLICK, onClick);
			}
			if (m_loader)
			{
				removeEvent();
				this.removeChild(m_loader);
				m_loader = null;
			}
		}
		
		protected function onClick(event:MouseEvent) : void
		{
			if(m_struct.LinkUrl.indexOf("http://")==-1){
				navigateToURL(new URLRequest("http://"+m_struct.LinkUrl),"_blank");
			}else{
				navigateToURL(new URLRequest(m_struct.LinkUrl),"_blank");
			}
		}
		
	}
}