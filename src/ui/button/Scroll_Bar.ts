module ui.button {
	export class Scroll_Bar extends BSprite{
		public mcAsset			:	MovieClip;
		protected m_bmpdDefault	:	BitmapData;
		protected m_bmpdHover		:	BitmapData;
		protected m_bmpdHdown		:	BitmapData;
		protected m_bmpdDisable	:	BitmapData;
		
		private m_s9Default		:	BitmapScale9Grid;
		private m_s9Hover		:	BitmapScale9Grid;
		private m_s9Hdown		:	BitmapScale9Grid;
		private m_s9Disable		:	BitmapScale9Grid;
		
		public fOnClick			:	Function;
		public fOnOver			:	Function;
		public fOnOut			:	Function;
		private m_bSelectStatus	:	 boolean;
		
		public ID				:	number;
		protected m_bEnable		:	 boolean;
		
		public constructor(mcButton:MovieClip, $fOnClick:Function) {
			super();
			
			fOnClick = $fOnClick;
			this.mcAsset = mcButton;
			initBarView();
//			mcAsset = mcButton;
//			this.addChild(mcAsset);
			
			
		}
		
		protected initBarView():void
		{
			var _w : number = mcAsset.width;
			var _h : number = mcAsset.height;
			
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
		
		public destroy() : void
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
		
		public setSelectedStatus(bStatus: boolean) : void
		{
			if(m_bSelectStatus!=bStatus){
				m_bSelectStatus = bStatus;
				
				setCurrent(bStatus ? ("SELECT") : ("DEFAULT"));
			}
		}
		
		set  enabled(bValue: boolean) 
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
		
		public setWidth(uValue:number) : void
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
		
		public setHeight(uValue:number) : void
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
		
		protected addEvent() : void
		{
//			if(mcAsset){
				this.addEventListener("click", onClick);
				this.addEventListener("rollOver", over);
				this.addEventListener("rollOut", out);
				this.addEventListener("mouseDown", down);
				this.addEventListener("mouseUp", up);
//			}
			
		}
		
		protected removeEvent() : void
		{
//			if(mcAsset){
				this.removeEventListener("click", onClick);
				this.removeEventListener("rollOver", over);
				this.removeEventListener("rollOut", out);
				this.removeEventListener("mouseDown", down);
				this.removeEventListener("mouseUp", up);
//			}
			
		}
		
		protected onClick(event:MouseEvent) : void
		{
			if (fOnClick != null && !m_bSelectStatus)
			{
				this.fOnClick(event);
			}
		}
		
		protected out(event:MouseEvent) : void
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
		
		protected over(event:MouseEvent) : void
		{
			if(m_bSelectStatus){
				return;
			}
			setCurrent("HOVER");
			if(fOnOver!=null){
				fOnOver();
			}
		}
		
		protected down(event:MouseEvent) : void
		{
			if(m_bSelectStatus){
				return;
			}
			setCurrent("HDOWN");
		}
		
		protected up(event:MouseEvent) : void
		{
			if(m_bSelectStatus){
				return;
			}
			setCurrent("HOVER");
		}
		
		protected setCurrent(sFrame:String):void{
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