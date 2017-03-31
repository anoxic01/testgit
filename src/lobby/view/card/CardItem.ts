module lobby.view.card {
	export class CardItem extends BSprite{
		protected m_bmpBg		;
		protected m_bmpAsset	;
		public bCenter			:	boolean;
		public cardId			:	string;
		public cardType			:	number;			//扑克类型	1-默认扑克	2-小扑克		3-大扑克
//		private m_aCard			:	any[]	=	["Kc","Kd","Kh","Ks","Qc","Qd","Qh","Qs","Jc","Jd","Jh","Js"];
		
		public constructor(_cardId:string,_cardType:number=1,_bCenter: boolean=false) {
			
			super();
			
			this.cardType=_cardType;
			this.bCenter = _bCenter;
			
			this.m_bmpBg = new egret.Bitmap();
			this.addChild(this.m_bmpBg);
			this.m_bmpBg.bitmapData = manager.BitmapManager.getInstance().getCard("Bg",this.cardType);
			this.m_bmpBg.smoothing=true;
			if (this.bCenter){
				this.m_bmpBg.x=-<number>(this.m_bmpBg.width*0.5);
				this.m_bmpBg.y=-<number>(this.m_bmpBg.height*0.5);
			}
			
			this.m_bmpAsset = new egret.Bitmap();
			this.addChild(this.m_bmpAsset);
			
			this.setData(_cardId);
		}
		
		 public destroy():void{
			if(this.m_bmpAsset){
				if(this.m_bmpAsset.bitmapData){
					this.m_bmpAsset.bitmapData = null;
				}
				this.removeChild(this.m_bmpAsset);
				this.m_bmpAsset = null;
			}
			
			if (this.m_bmpBg){
				if(this.m_bmpBg.bitmapData){
					this.m_bmpBg.bitmapData=null;
				}
				this.removeChild(this.m_bmpBg);
				this.m_bmpBg=null;
			}
		}
		
		public setData(_cardId:string):void{
			if(this.m_bmpAsset==null) return;
			this.cardId = _cardId;
			this.m_bmpAsset.bitmapData = manager.BitmapManager.getInstance().getCard(_cardId,this.cardType);
			this.m_bmpAsset.smoothing=true;
			if (this.bCenter){
				this.m_bmpAsset.x = -<number>(this.m_bmpAsset.width*0.5);
				this.m_bmpAsset.y = -<number>(this.m_bmpAsset.height*0.5);
			}else{
				if(_cardId!="BB"){
					switch(this.cardType){
						case 1:
							this.m_bmpAsset.x = 6;
							this.m_bmpAsset.y = 9;
							break;
						
						case 3:
//							if(m_aCard.indexOf(cardId)==-1){
								this.m_bmpAsset.x = 11;
								this.m_bmpAsset.y = 16;
//							}
							break;
					}
				}
			}
			
		}
	}
}