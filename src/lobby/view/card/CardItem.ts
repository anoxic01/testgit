module lobby.view.card {
	export class CardItem extends BSprite{
		protected m_bmpBg		:	Bitmap;
		protected m_bmpAsset	:	Bitmap;
		public bCenter			:	 boolean;
		public cardId			:	String;
		public cardType			:	number;			//扑克类型	1-默认扑克	2-小扑克		3-大扑克
//		private m_aCard			:	any[]	=	["Kc","Kd","Kh","Ks","Qc","Qd","Qh","Qs","Jc","Jd","Jh","Js"];
		
		public constructor(_cardId:String,_cardType:number=1,_bCenter: boolean=false) {
			
			super();
			
			cardType=_cardType;
			this.bCenter = _bCenter;
			
			m_bmpBg = new Bitmap();
			this.addChild(m_bmpBg);
			m_bmpBg.bitmapData = BitmapManager.getInstance().getCard("Bg",cardType);
			m_bmpBg.smoothing=true;
			if (bCenter){
				m_bmpBg.x=-int(m_bmpBg.width*0.5);
				m_bmpBg.y=-int(m_bmpBg.height*0.5);
			}
			
			m_bmpAsset = new Bitmap();
			this.addChild(m_bmpAsset);
			
			setData(_cardId);
		}
		
		 public destroy():void{
			if(m_bmpAsset){
				if(m_bmpAsset.bitmapData){
					m_bmpAsset.bitmapData = null;
				}
				this.removeChild(m_bmpAsset);
				m_bmpAsset = null;
			}
			
			if (m_bmpBg){
				if(m_bmpBg.bitmapData){
					m_bmpBg.bitmapData=null;
				}
				this.removeChild(m_bmpBg);
				m_bmpBg=null;
			}
		}
		
		public setData(_cardId:String):void{
			if(m_bmpAsset==null) return;
			this.cardId = _cardId;
			m_bmpAsset.bitmapData = BitmapManager.getInstance().getCard(_cardId,cardType);
			m_bmpAsset.smoothing=true;
			if (bCenter){
				m_bmpAsset.x = -int(m_bmpAsset.width*0.5);
				m_bmpAsset.y = -int(m_bmpAsset.height*0.5);
			}else{
				if(_cardId!="BB"){
					switch(cardType){
						case 1:
							m_bmpAsset.x = 6;
							m_bmpAsset.y = 9;
							break;
						
						case 3:
//							if(m_aCard.indexOf(cardId)==-1){
								m_bmpAsset.x = 11;
								m_bmpAsset.y = 16;
//							}
							break;
					}
				}
			}
			
		}
	}
}