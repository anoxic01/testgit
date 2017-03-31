module ui.button {
	export class SingleButtonMC {
        public mcAsset			;
		
		get bSelectStatus():boolean
		{
			return this.m_bSelectStatus;
		}

		set bSelectStatus(value:boolean)
		{
			this.m_bSelectStatus = value;
		}

        public fOnClick			:	Function;
		public fOnOver			:	Function;
		public fOnOut			:	Function;
		public fDown			:	Function;
		public fDisable			:	Function;
        private m_bSelectStatus	:	boolean;

		public ID				:	number;
		private m_bEnable		:	boolean;
		
		public constructor(mcButton, $fOnClick:Function) {
            this.fOnClick = $fOnClick;
            this.mcAsset = mcButton;
            this.addEvent();
            this.enabled = true;
            
		}
		
        public destroy() : void
        {
            this.removeEvent();
            if (this.mcAsset)
            {
                this.mcAsset = null;
            }
            if (this.fOnClick != null)
            {
                this.fOnClick = null;
            }
			
			if (this.fOnOver != null)
			{
				this.fOnOver = null;
			}
			
			if (this.fOnOut != null)
			{
				this.fOnOut = null;
			}
			
			if (this.fDown != null)
			{
				this.fDown = null;
			}
			
			if (this.fDisable != null)
			{
				this.fDisable = null;
			}
			
            
        }

        setSelectedStatus(bStatus:boolean) : void
        {
            if(this.m_bSelectStatus!=bStatus){
				this.m_bSelectStatus = bStatus;
				
				this.mcAsset.gotoAndStop(bStatus ? ("SELECT") : ("DEFAULT"));
			}
        }

        set enabled(bValue:boolean)
        {
			this.m_bEnable = bValue;
            if (this.mcAsset)
            {
				if(this.m_bEnable){
					this.mcAsset.gotoAndStop("DEFAULT");
					if(this.fOnOut!=null){
						this.fOnOut();
					}
				}else{
					this.mcAsset.gotoAndStop("DISABLE");
					if(this.fDisable!=null){
						this.fDisable();
					}
				}
                this.mcAsset.mousethis.enabled = this.m_bEnable;
                this.mcAsset.this.enabled = this.m_bEnable;
                this.mcAsset.mouseChildren = this.m_bEnable;
                this.mcAsset.buttonMode = this.m_bEnable;
            }
            
        }

        set alpha(nValue:number)
        {
            if (this.mcAsset)
            {
                this.mcAsset.alpha = nValue;
            }
        }

        set visible(bStatus:boolean)
        {
            if (this.mcAsset)
            {
                this.mcAsset.visible = bStatus;
            }
        }

        set width(nValue:number)
        {
            this.mcAsset.width = nValue;
        }

        get width() : number
        {
            return this.mcAsset.width;
        }

        set height(nValue:number) 
        {
            this.mcAsset.height = nValue;
        }

        get height() : number
        {
            return this.mcAsset.height;
        }

        set x(nValue:number) 
        {
            this.mcAsset.x = nValue;
        }

        get x() : number
        {
            return this.mcAsset.x;
        }

        set y(nValue:number) 
        {
            this.mcAsset.y = nValue;
        }

        get y() : number
        {
            return this.mcAsset.y;
        }

        private addEvent() : void
        {
            if (this.mcAsset)
            {
                this.mcAsset.addEventListener("click", this.onClick);
                this.mcAsset.addEventListener("rollOver", this.over);
                this.mcAsset.addEventListener("rollOut", this.out);
                this.mcAsset.addEventListener("mouseDown", this.down);
                this.mcAsset.addEventListener("mouseUp", this.up);
            }
        }

        private removeEvent() : void
        {
            if (this.mcAsset)
            {
                this.mcAsset.removeEventListener("click", this.onClick);
                this.mcAsset.removeEventListener("rollOver", this.over);
                this.mcAsset.removeEventListener("rollOut", this.out);
                this.mcAsset.removeEventListener("mouseDown", this.down);
                this.mcAsset.removeEventListener("mouseUp", this.up);
            }
        }

        private onClick(event:MouseEvent) : void
        {
            if (this.fOnClick != null && !this.m_bSelectStatus)
            {
                this.fOnClick(event);
            }
			event.stopImmediatePropagation();
        }

        protected out(event:MouseEvent) : void
        {
			if(this.m_bSelectStatus){
				return;
			}
			if(this.m_bEnable){
				this.mcAsset.gotoAndStop("DEFAULT");
			}
			if(this.fOnOut!=null){
				this.fOnOut();
			}
        }

        protected over(event:MouseEvent) : void
        {
			if(this.m_bSelectStatus){
				return;
			}
			this.mcAsset.gotoAndStop("HOVER");
			if(this.fOnOver!=null){
				this.fOnOver();
			}
        }

        protected down(event:MouseEvent) : void
        {
			if(this.m_bSelectStatus){
				return;
			}
			this.mcAsset.gotoAndStop("HDOWN");
			if(this.fDown!=null){
				this.fDown();
			}
        }

        protected up(event:MouseEvent) : void
        {
			if(this.m_bSelectStatus){
				return;
			}
			this.mcAsset.gotoAndStop("HOVER");
			if(this.fOnOver!=null){
				this.fOnOver();
			}
			
			event.stopImmediatePropagation();
        }

	}
}