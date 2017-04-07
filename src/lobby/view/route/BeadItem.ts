module lobby.view.route {
	export class BeadItem extends BSprite{
		public static A	:	string	=	"a";
		public static B	:	string	=	"b";
		public static C	:	string	=	"c";
		public static D	:	string	=	"d";
		public static E	:	string	=	"e";
		public static F	:	string	=	"f";
		public static G	:	string	=	"g";
		public static H	:	string	=	"h";
		public static I	:	string	=	"i";
		public static J	:	string	=	"j";
		public static K	:	string	=	"k";
		public static L	:	string	=	"l";
		
		protected m_bmp		:	egret.Bitmap;
		protected m_sLabel	:	string;		//标签
		
		public constructor() {
		
			super();
			
			this.m_bmp = new egret.Bitmap();
			
			this.addChild(this.m_bmp);
			
		}
		
		 public destroy():void{
			if(this.m_bmp){
				this.removeChild(this.m_bmp);
				if(this.m_bmp.bitmapData){
					this.m_bmp.bitmapData = null;
				}
				this.m_bmp = null;
			}
			super.destroy();
		}
		
		public setLabel(sLabel:string):void{
			this.m_sLabel = sLabel;
			this.onChangeLanguage();
		}
		
	}
}