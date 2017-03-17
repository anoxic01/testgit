module ui.button {
	export class Scroll_Bar extends BSprite{
		public var mcAsset			:	MovieClip;
		protected var m_bmpdDefault	:	BitmapData;
		protected var m_bmpdHover		:	BitmapData;
		protected var m_bmpdHdown		:	BitmapData;
		protected var m_bmpdDisable	:	BitmapData;
		
		private var m_s9Default		:	BitmapScale9Grid;
		private var m_s9Hover		:	BitmapScale9Grid;
		private var m_s9Hdown		:	BitmapScale9Grid;
		private var m_s9Disable		:	BitmapScale9Grid;
		
		public var fOnClick			:	Function;
		public var fOnOver			:	Function;
		public var fOnOut			:	Function;
		private var m_bSelectStatus	:	Boolean;
		
		public var ID				:	int;
		protected var m_bEnable		:	Boolean;
		
		public constructor(mcButton:MovieClip, $fOnClick:Function) {
			super();
			
			fOnClick = $fOnClick;
			this.mcAsset = mcButton;
			initBarView();
//			mcAsset = mcButton;
//			this.addChild(mcAsset);
			
			
		}
		
		protected function initBarView():void
		{
			var _w : uint = mcAsset.width;
			var _h : uint = mcAsset.height;
			
			m_bmpdDefault = new BitmapData(_w, _h);
			m_bmpdHover = new BitmapData(_w, _h);
			m_bmpdHdown = new BitmapData(_w, _h);
			m_bmpdDisable = new BitmapData(_w, _h);
			
			
			
			mcAsset.gotoAndStop("DEFAULT");
			m_bmpdDefault.draw(mcAsset);
			m_s9Default = new BitmapScale9Grid(m_bmpdDefault, 0, 14, 50, 10, 14);
			
			mcAsset.gotoAndStop("HOVER");
			m_bmpdHover.draw(mcAsset);
			m_s9Hover = new BitmapScale9Grid(m_bmpdHover, 0, 14, 50, 10, 14);
			
			mcAsset.gotoAndStop("HDOWN");
			m_bmpdHdown.draw(mcAsset);
			m_s9Hdown = new BitmapScale9Grid(m_bmpdHdown, 0, 14, 50, 10, 14);
			
			mcAsset.gotoAndStop("DISABLE");
			m_bmpdDisable.draw(mcAsset);
			m_s9Disable = new BitmapScale9Grid(m_bmpdDisable, 0, 14, 50, 10, 14);
			
			m_bmpdDefault.dispose();
			m_bmpdHover.dispose();
			m_bmpdHdown.dispose();
			m_bmpdDisable.dispose();
			
			this.addChild(m_s9Default);
			this.addChild(m_s9Hover);
			this.addChild(m_s9Hdown);
			this.addChild(m_s9Disable);
			
			if(mcAsset){
				mcAsset = null;
			}
			
			addEvent();
			enabled = true;
		}
		
		public function destroy() : void
		{
			removeEvent();
//			if (mcAsset)
//			{
//				this.removeChild(mcAsset);
//				mcAsset = null;
//			}
			if (fOnClick != null)
			{
				fOnClick = null;
			}
			
		}
		
		public function setSelectedStatus(bStatus:Boolean) : void
		{
			if(m_bSelectStatus!=bStatus){
				m_bSelectStatus = bStatus;
				
				setCurrent(bStatus ? ("SELECT") : ("DEFAULT"));
			}
		}
		
		public function set enabled(bValue:Boolean) : void
		{
			m_bEnable = bValue;
//			if (mcAsset)
//			{
			if(m_bEnable){
				setCurrent("DEFAULT");
			}else{
				setCurrent("DISABLE");
			}
				this.mouseEnabled = m_bEnable;
				this.mouseChildren = m_bEnable;
				this.buttonMode = m_bEnable;
//			}
			
		}
		
		public function setWidth(uValue:uint) : void
		{
//			mcAsset.width = nValue;
			m_s9Default.width = uValue;
			m_s9Hover.width = uValue;
			m_s9Hdown.width = uValue;
			m_s9Disable.width = uValue;
			
			this.graphics.clear();
			this.graphics.beginFill(0x000000,0);
			this.graphics.drawRect(0,0,uValue,height);
			this.graphics.endFill();
		}
		
		public function setHeight(uValue:uint) : void
		{
//			mcAsset.height = nValue;
			
			m_s9Default.height = uValue;
			m_s9Hover.height = uValue;
			m_s9Hdown.height = uValue;
			m_s9Disable.height = uValue;
			
			this.graphics.clear();
			this.graphics.beginFill(0x000000,0);
			this.graphics.drawRect(0,0,width,uValue);
			this.graphics.endFill();
		}
		
		protected function addEvent() : void
		{
//			if(mcAsset){
				this.addEventListener("click", onClick);
				this.addEventListener("rollOver", over);
				this.addEventListener("rollOut", out);
				this.addEventListener("mouseDown", down);
				this.addEventListener("mouseUp", up);
//			}
			
		}
		
		protected function removeEvent() : void
		{
//			if(mcAsset){
				this.removeEventListener("click", onClick);
				this.removeEventListener("rollOver", over);
				this.removeEventListener("rollOut", out);
				this.removeEventListener("mouseDown", down);
				this.removeEventListener("mouseUp", up);
//			}
			
		}
		
		protected function onClick(event:MouseEvent) : void
		{
			if (fOnClick != null && !m_bSelectStatus)
			{
				this.fOnClick(event);
			}
		}
		
		protected function out(event:MouseEvent) : void
		{
			if(m_bSelectStatus){
				return;
			}
			if(m_bEnable){
				setCurrent("DEFAULT");
			}
			if(fOnOut!=null){
				fOnOut();
			}
		}
		
		protected function over(event:MouseEvent) : void
		{
			if(m_bSelectStatus){
				return;
			}
			setCurrent("HOVER");
			if(fOnOver!=null){
				fOnOver();
			}
		}
		
		protected function down(event:MouseEvent) : void
		{
			if(m_bSelectStatus){
				return;
			}
			setCurrent("HDOWN");
		}
		
		protected function up(event:MouseEvent) : void
		{
			if(m_bSelectStatus){
				return;
			}
			setCurrent("HOVER");
		}
		
		protected function setCurrent(sFrame:String):void{
			m_s9Default.visible = false;
			m_s9Hover.visible = false;
			m_s9Hdown.visible = false;
			m_s9Disable.visible = false;
			
			switch(sFrame){
				case "DEFAULT":
					m_s9Default.visible = true;
					break;
				
				case "HOVER":
					m_s9Hover.visible = true;
					break;
				
				case "HDOWN":
					m_s9Hdown.visible = true;
					break;
				
				case "DISABLE":
					m_s9Disable.visible = true;
					break;
			}
		}
		
	}
}