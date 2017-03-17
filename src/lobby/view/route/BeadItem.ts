module lobby.view.route {
	export class BeadItem extends BSprite{
		public static const	A	:	String	=	"a";
		public static const	B	:	String	=	"b";
		public static const	C	:	String	=	"c";
		public static const	D	:	String	=	"d";
		public static const	E	:	String	=	"e";
		public static const	F	:	String	=	"f";
		public static const	G	:	String	=	"g";
		public static const	H	:	String	=	"h";
		public static const	I	:	String	=	"i";
		public static const	J	:	String	=	"j";
		public static const	K	:	String	=	"k";
		public static const	L	:	String	=	"l";
		
		protected var m_bmp		:	Bitmap;
		protected var m_sLabel	:	String;		//标签
		
		public constructor() {
		
			super();
			
			m_bmp = new Bitmap();
			
			this.addChild(m_bmp);
			
		}
		
		override public function destroy():void{
			if(m_bmp){
				this.removeChild(m_bmp);
				if(m_bmp.bitmapData){
					m_bmp.bitmapData = null;
				}
				m_bmp = null;
			}
			super.destroy();
		}
		
		public function setLabel(sLabel:String):void{
			m_sLabel = sLabel;
			onChangeLanguage();
		}
		
	}
}