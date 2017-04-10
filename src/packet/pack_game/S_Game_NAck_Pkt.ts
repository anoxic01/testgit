module packet.pack_game {
	export class S_Game_NAck_Pkt  implements iface.IProtocolStruct{
		
		private m_controler;

		public constructor() {
		}

		
		public initControler(controler):void
		{
			this.m_controler = controler;
		}
		
		public execute(oData):void
		{
			
			console.log(this, "收到遊戲NAck錯誤::" + oData.SN );
			this.m_controler=null;
		}
		
		
	}
}