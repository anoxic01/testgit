module packet.game {
	export class S_Game_Ack_Pkt implements IProtocolStruct{
		
		private var m_controler:GameControler;

		public constructor() {
		}
		
		public function initControler(controler:GameControler):void
		{
			m_controler = controler as GameControler;
		}
		
		public function execute(oData:Object):void
		{
			
//			Log.getInstance().log(this, "收到遊戲Ack::" + oData.SN);
			
			if( m_controler ){
				//收到登入確認封包回復 的  Ack
				if( oData.SN == ClientPacketSN.instance().Login_Game_Check_SN ){
//					if(m_controler.bMulti==false){
//						m_controler.nRevServerTime = getTimer();
//						m_controler.runGameHeart();
//					}
				}
			}else {
				Log.getInstance().log(this , "Ack Controler is ::" + m_controler );
			}
			
			m_controler=null;
			
		}
		
		
	}
}