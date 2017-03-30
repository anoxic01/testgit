module lobby.view.notice {
	export class NoticeItemView extends BSprite{
		protected m_tfLabel			:	TextField;
		protected m_format 			: 	TextFormat; 
		
		public maData				:	MessageStruct;
		public constructor() {
			super();
			m_format = new TextFormat("Arial",18,0xffffff);//0xffffff
			m_tfLabel = new TextField();
			this.addChild(m_tfLabel);
			m_tfLabel.defaultTextFormat = m_format;
			m_tfLabel.autoSize = "left";
			m_tfLabel.selectable = false;
			m_tfLabel.mouseEnabled = false;
			m_tfLabel.cacheAsBitmap = true;
		}
		 public destroy():void
		{
			maData = null;
			m_tfLabel.text = "";
			if (m_tfLabel)
			{
				this.removeChild(m_tfLabel);
				m_tfLabel = null;
			}
			if(m_format){
				m_format = null;
			}
			super.destroy();
		}
		
		public clear():void
		{
			maData = null;
			m_tfLabel.text = "";
		}
		
		 public onChangeLanguage():void{
			var sValue : String= "";
			if(maData)
			{
				sValue = maData.toString();
			}
			m_tfLabel.text = sValue;
		}
	}
}