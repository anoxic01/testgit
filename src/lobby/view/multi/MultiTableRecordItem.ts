module lobby.view.multi {
	export class MultiTableRecordItem implements iface.ISprite{
		private m_mcAsset	;
		private m_spRed		;			//对子标识
		private m_spBlue	;			//对子标识
		private m_bmp		;
//		private m_tfTable	:	TextField;
//		private m_tfBetPos	:	TextField;
//		private m_tfAmt		:	TextField;
//		private m_tfPayout	:	TextField;
		
		private m_struct	;
		
		public constructor(_mcAsset) {
			
			this.m_mcAsset = _mcAsset;
			
			this.m_bmp = new egret.Bitmap();
			this.m_mcAsset.mc_0.addChild(this.m_bmp);
			this.m_spRed = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_TABLE,"Road_Pair_Red_Asset");
//			this.m_spRed.width = 8;
//			this.m_spRed.height =8;
			this.m_mcAsset.mc_0.addChild(this.m_spRed);
			
			this.m_spBlue = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_TABLE,"Road_Pair_Blue_Asset");
//			this.m_spBlue.width = 8;
//			this.m_spBlue.height =8;
			this.m_spBlue.x=17;
			this.m_spBlue.y=17;
			this.m_mcAsset.mc_0.addChild(this.m_spBlue);
			
			this.m_spRed.visible = false;
			this.m_spBlue.visible = false;
			
//			m_tfTable = new egret.TextField();
//			this.addChild(m_tfTable);
//			
//			m_tfBetPos = new egret.TextField();
//			this.addChild(m_tfBetPos);
//			
//			m_tfAmt = new egret.TextField();
//			this.addChild(m_tfAmt);
//			
//			m_tfPayout = new egret.TextField();
//			this.addChild(m_tfPayout);
		}
		
		public destroy():void{
//			if(m_tfTable){
//				this.removeChild(m_tfTable);
//				m_tfTable = null;
//			}
//			if(m_tfBetPos){
//				this.removeChild(m_tfBetPos);
//				m_tfBetPos = null;
//			}
//			if(m_tfAmt){
//				this.removeChild(m_tfAmt);
//				m_tfAmt = null;
//			}
//			if(m_tfPayout){
//				this.removeChild(m_tfPayout);
//				m_tfPayout = null;
//			}
			
			
			if(this.m_spRed){
				this.m_mcAsset.mc_0.removeChild(this.m_spRed);
				this.m_spRed = null;
			}
			if(this.m_spBlue){
				this.m_mcAsset.mc_0.removeChild(this.m_spBlue);
				this.m_spBlue = null;
			}
			
			if(this.m_mcAsset){
				this.m_mcAsset = null;
			}
			
			if(this.m_struct){
				this.m_struct = null;
			}
		}
		
		public setData(_struct):void{
			if(_struct==null){
				this.m_mcAsset.visible = false;
			}else{
				this.m_mcAsset.visible = true;
				this.m_struct = _struct;
				this.onChangeLanguage();
			}
		}
		
		public onChangeLanguage():void{
			this.m_spRed.visible = false;
			this.m_spBlue.visible = false;
			
			if(this.m_struct == null){
				return;
			}
			
			this.m_mcAsset.tf_0.text = manager.LobbyManager.getInstance().getLanguageString(language.Language.sGame_Name_Bac) + " " + this.m_struct.TableID;
			switch(this.m_struct.BetPos){
				case "B1":
					this.m_bmp.bitmapData = manager.BitmapManager.getInstance().getBmpdBead(define.Define.BEAD_BANKER);
					this.m_mcAsset.tf_1.text = /*manager.LobbyManager.getInstance().getLanguageString(language.Language.sBanker) +*/ this.m_struct.Amt.toString();
					break;
				case "B2":
					this.m_spRed.visible = true;
					this.m_bmp.bitmapData = manager.BitmapManager.getInstance().getBmpdBead(define.Define.BEAD_BANKER);
					this.m_mcAsset.tf_1.text = /*manager.LobbyManager.getInstance().getLanguageString(language.Language.sBankerPair) +*/ this.m_struct.Amt.toString();
					break;
				case "B3":
					this.m_bmp.bitmapData = manager.BitmapManager.getInstance().getBmpdBead(define.Define.BEAD_TIE);
					this.m_mcAsset.tf_1.text = /*manager.LobbyManager.getInstance().getLanguageString(language.Language.sTie) +*/ this.m_struct.Amt.toString();
					break;
				case "B4":
					this.m_bmp.bitmapData = manager.BitmapManager.getInstance().getBmpdBead(define.Define.BEAD_PLAYER);
					this.m_mcAsset.tf_1.text = /*manager.LobbyManager.getInstance().getLanguageString(language.Language.sPlayer) +*/ this.m_struct.Amt.toString();
					break;
				case "B5":
					this.m_spBlue.visible = true;
					this.m_bmp.bitmapData = manager.BitmapManager.getInstance().getBmpdBead(define.Define.BEAD_PLAYER);
					this.m_mcAsset.tf_1.text = /*manager.LobbyManager.getInstance().getLanguageString(language.Language.sPlayerPair) +*/ this.m_struct.Amt.toString();
					break;
				case "B6":
					this.m_bmp.bitmapData = manager.BitmapManager.getInstance().getBmpdBead(define.Define.BEAD_BIG_DZ);
					this.m_mcAsset.tf_1.text = /*manager.LobbyManager.getInstance().getLanguageString(language.Language.sBig) +*/ this.m_struct.Amt.toString();
					break;
				case "B7":
					this.m_bmp.bitmapData = manager.BitmapManager.getInstance().getBmpdBead(define.Define.BEAD_SMALL_DZ);
					this.m_mcAsset.tf_1.text = /*manager.LobbyManager.getInstance().getLanguageString(language.Language.sSmall) +*/ this.m_struct.Amt.toString();
					break;
			}
			this.m_bmp.smoothing = true;
			
			if(this.m_struct.Payout>0){
				this.m_mcAsset.tf_2.text = "+" + String(this.m_struct.Payout-this.m_struct.Amt);
				(this.m_mcAsset.tf_2 ).textColor = 0xff0000;
			}else if(this.m_struct.Payout==0){
				this.m_mcAsset.tf_2.text = "-" + this.m_struct.Amt.toString();
				(this.m_mcAsset.tf_2 ).textColor = 0x00ff00;
			}else if(this.m_struct.Payout==this.m_struct.Amt){
				this.m_mcAsset.tf_2.text = "0";
				(this.m_mcAsset.tf_2).textColor = 0x00ff00;
			}
			
		}
	}
}