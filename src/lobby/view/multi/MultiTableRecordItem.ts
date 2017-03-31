module lobby.view.multi {
	export class MultiTableRecordItem implements iface.ISprite{
		private m_mcAsset	:	MovieClip;
		private m_spRed		:	Sprite;			//对子标识
		private m_spBlue	:	Sprite;			//对子标识
		private m_bmp		:	Bitmap;
//		private m_tfTable	:	TextField;
//		private m_tfBetPos	:	TextField;
//		private m_tfAmt		:	TextField;
//		private m_tfPayout	:	TextField;
		
		private m_struct	:	RecordBetStruct;
		
		public constructor(_mcAsset:MovieClip) {
			super();
			
			m_mcAsset = _mcAsset;
			
			m_bmp = new Bitmap();
			m_mcAsset.mc_0.addChild(m_bmp);
			m_spRed = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_TABLE,"Road_Pair_Red_Asset");
//			m_spRed.width = 8;
//			m_spRed.height =8;
			m_mcAsset.mc_0.addChild(m_spRed);
			
			m_spBlue = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_TABLE,"Road_Pair_Blue_Asset");
//			m_spBlue.width = 8;
//			m_spBlue.height =8;
			m_spBlue.x=17;
			m_spBlue.y=17;
			m_mcAsset.mc_0.addChild(m_spBlue);
			
			m_spRed.visible = false;
			m_spBlue.visible = false;
			
//			m_tfTable = new TextField();
//			this.addChild(m_tfTable);
//			
//			m_tfBetPos = new TextField();
//			this.addChild(m_tfBetPos);
//			
//			m_tfAmt = new TextField();
//			this.addChild(m_tfAmt);
//			
//			m_tfPayout = new TextField();
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
			
			
			if(m_spRed){
				m_mcAsset.mc_0.removeChild(m_spRed);
				m_spRed = null;
			}
			if(m_spBlue){
				m_mcAsset.mc_0.removeChild(m_spBlue);
				m_spBlue = null;
			}
			
			if(m_mcAsset){
				m_mcAsset = null;
			}
			
			if(m_struct){
				m_struct = null;
			}
		}
		
		public setData(_struct:RecordBetStruct):void{
			if(_struct==null){
				m_mcAsset.visible = false;
			}else{
				m_mcAsset.visible = true;
				m_struct = _struct;
				onChangeLanguage();
			}
		}
		
		public onChangeLanguage():void{
			m_spRed.visible = false;
			m_spBlue.visible = false;
			
			if(m_struct == null){
				return;
			}
			
			m_mcAsset.tf_0.text = LobbyManager.getInstance().getLanguageString(Language.sGame_Name_Bac) + " " + m_struct.TableID;
			switch(m_struct.BetPos){
				case "B1":
					m_bmp.bitmapData = BitmapManager.getInstance().getBmpdBead(Define.BEAD_BANKER);
					m_mcAsset.tf_1.text = /*LobbyManager.getInstance().getLanguageString(Language.sBanker) +*/ m_struct.Amt.toString();
					break;
				case "B2":
					m_spRed.visible = true;
					m_bmp.bitmapData = BitmapManager.getInstance().getBmpdBead(Define.BEAD_BANKER);
					m_mcAsset.tf_1.text = /*LobbyManager.getInstance().getLanguageString(Language.sBankerPair) +*/ m_struct.Amt.toString();
					break;
				case "B3":
					m_bmp.bitmapData = BitmapManager.getInstance().getBmpdBead(Define.BEAD_TIE);
					m_mcAsset.tf_1.text = /*LobbyManager.getInstance().getLanguageString(Language.sTie) +*/ m_struct.Amt.toString();
					break;
				case "B4":
					m_bmp.bitmapData = BitmapManager.getInstance().getBmpdBead(Define.BEAD_PLAYER);
					m_mcAsset.tf_1.text = /*LobbyManager.getInstance().getLanguageString(Language.sPlayer) +*/ m_struct.Amt.toString();
					break;
				case "B5":
					m_spBlue.visible = true;
					m_bmp.bitmapData = BitmapManager.getInstance().getBmpdBead(Define.BEAD_PLAYER);
					m_mcAsset.tf_1.text = /*LobbyManager.getInstance().getLanguageString(Language.sPlayerPair) +*/ m_struct.Amt.toString();
					break;
				case "B6":
					m_bmp.bitmapData = BitmapManager.getInstance().getBmpdBead(Define.BEAD_BIG_DZ);
					m_mcAsset.tf_1.text = /*LobbyManager.getInstance().getLanguageString(Language.sBig) +*/ m_struct.Amt.toString();
					break;
				case "B7":
					m_bmp.bitmapData = BitmapManager.getInstance().getBmpdBead(Define.BEAD_SMALL_DZ);
					m_mcAsset.tf_1.text = /*LobbyManager.getInstance().getLanguageString(Language.sSmall) +*/ m_struct.Amt.toString();
					break;
			}
			m_bmp.smoothing = true;
			
			if(m_struct.Payout>0){
				m_mcAsset.tf_2.text = "+" + String(m_struct.Payout-m_struct.Amt);
				(m_mcAsset.tf_2 as TextField).textColor = 0xff0000;
			}else if(m_struct.Payout==0){
				m_mcAsset.tf_2.text = "-" + m_struct.Amt.toString();
				(m_mcAsset.tf_2 as TextField).textColor = 0x00ff00;
			}else if(m_struct.Payout==m_struct.Amt){
				m_mcAsset.tf_2.text = "0"
				(m_mcAsset.tf_2 as TextField).textColor = 0x00ff00;
			}
			
		}
	}
}