module lobby.view.notice {
	export class NoticeItemView extends BSprite{
		protected m_tfLabel			;
		protected m_format 			; 
		
		public maData				;
		public constructor() {
			super();
			// this.m_format = new TextFormat("Arial",18,0xffffff);//0xffffff
			this.m_tfLabel = new egret.TextField();
			this.addChild(this.m_tfLabel);
			this.m_tfLabel.defaultTextFormat = this.m_format;
			this.m_tfLabel.autoSize = "left";
			this.m_tfLabel.selectable = false;
			this.m_tfLabel.mouseEnabled = false;
			this.m_tfLabel.cacheAsBitmap = true;
		}
		 public destroy():void
		{
			this.maData = null;
			this.m_tfLabel.text = "";
			if (this.m_tfLabel)
			{
				this.removeChild(this.m_tfLabel);
				this.m_tfLabel = null;
			}
			if(this.m_format){
				this.m_format = null;
			}
			super.destroy();
		}
		
		public clear():void
		{
			this.maData = null;
			this.m_tfLabel.text = "";
		}
		
		 public onChangeLanguage():void{
			var sValue : String= "";
			if(this.maData)
			{
				sValue = this.maData.toString();
			}
			this.m_tfLabel.text = sValue;
		}
	}
}