module lobby.view.tool {
	export class Tool_Wifi implements iface.ISprite{
		public static FULL	:	String	=	"FULL";			//信号满格
		public static WELL	:	String	=	"WELL";			//信号良好
		public static NORMAL	:	String	=	"NORMAL";		//信号一般
		public static POOR	:	String	=	"POOR";			//信号很差
		public static NO		:	String	=	"NO";			//没有信号
		
		private m_mcAsset		:	MovieClip;					//资源容器
		
		public constructor( _mcAsset:MovieClip 	) {
		
			m_mcAsset = _mcAsset;
			m_mcAsset.gotoAndStop( POOR );
		}
		
		public destroy():void
		{
			if(m_mcAsset){
				m_mcAsset = null;
			}
		}
		
		set  status( _sStatus:string )
		{
//			console.log("测试");
			if(m_mcAsset){
				m_mcAsset.gotoAndStop(_sStatus);
			}
		}
	}
}