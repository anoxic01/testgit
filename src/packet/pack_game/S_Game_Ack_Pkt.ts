module packet.pack_game {
	export class S_Game_Ack_Pkt implements iface.IProtocolStruct{
		
		private m_controler;

		public constructor() {
		}
		
		public initControler(controler):void
		{
			this.m_controler = controler;
		}
		
		public execute(oData):void
		{
			
//			console.log(this, "收到遊戲Ack::" + oData.SN);
			
			if( this.m_controler ){
				//收到登入確認封包回復 的  Ack
				if( oData.SN == lobby.model.ClientPacketSN.instance().Login_Game_Check_SN ){
//					if(m_controler.bMulti==false){
//						m_controler.nRevServerTime = getTimer();
//						m_controler.runGameHeart();
//					}
				}
			}else {
				console.log(this , "Ack Controler is ::" + this.m_controler );
			}
			
			this.m_controler=null;
			
		}
		
		
	}
}