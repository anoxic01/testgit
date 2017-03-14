module packet.game {
	export class S_Game_NAck_Pkt  implements IProtocolStruct{
		
		private var m_controler:GameControler;

		public constructor() {
		}

		
		public function initControler(controler:GameControler):void
		{
			m_controler = controler as GameControler;
		}
		
		public function execute(oData:Object):void
		{
			
			Log.getInstance().log(this, "收到遊戲NAck錯誤::" + oData.SN );
			m_controler=null;
		}
		
		
	}
}