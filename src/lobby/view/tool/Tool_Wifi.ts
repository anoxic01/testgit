module lobby.view.tool {
	export class Tool_Wifi implements iface.ISprite{
		public static FULL		:	string	=	"FULL";			//信号满格
		public static WELL		:	string	=	"WELL";			//信号良好
		public static NORMAL	:	string	=	"NORMAL";		//信号一般
		public static POOR		:	string	=	"POOR";			//信号很差
		public static NO		:	string	=	"NO";			//没有信号
		
		private m_mcAsset		;					//资源容器
		
		public constructor( _mcAsset 	) {
		
			this.m_mcAsset = _mcAsset;
			this.m_mcAsset.gotoAndStop( Tool_Wifi.POOR );
		}
		
		public destroy():void
		{
			if(this.m_mcAsset){
				this.m_mcAsset = null;
			}
		}
		
		set  status( _sStatus:string )
		{
//			console.log("测试");
			if(this.m_mcAsset){
				this.m_mcAsset.gotoAndStop(_sStatus);
			}
		}
	}
}