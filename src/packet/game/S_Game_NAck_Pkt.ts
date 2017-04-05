module packet.game {
	export class S_Game_NAck_Pkt  implements IProtocolStruct{
		
		private m_controler:GameControler;

		public constructor() {
		}

		
		public initControler(controler:GameControler):void
		{
			m_controler = controler as GameControler;
		}
		
		public execute(oData:Object):void
		{
			
			console.log(this, "收到遊戲NAck錯誤::" + oData.SN );
			m_controler=null;
		}
		
		
	}
}