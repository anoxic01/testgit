module lobby.view.route {
	export class TableRoadMapDTF extends DtfRouteMgr{
		public constructor(view:MovieClip) {
		
			super(view);
			m_beadPlate.setBeads(1,0,28,27);
		}
		override protected function setRoadInf():void{
			//路紙參數均在此設定
			this.m_beadInfo = new BeadInfo();
			this.m_beadInfo.gridWidth = 30;
			this.m_beadInfo.gridHeight = 6;
			this.m_beadInfo.size=6.5;
			
			//this.m_beadInfo.bigRoad_OfftenWidth =  1.125;
			this.m_beadInfo.bigRoad_OfftenWidth =  0;
			//this.m_beadInfo.bigRoad_OfftenHeight =  1.155;
			this.m_beadInfo.bigRoad_OfftenHeight =  0;
			this.m_beadInfo.bigRoad_OfftenX =  1;
			//this.m_beadInfo.bigRoad_OfftenY =  1.125;
			this.m_beadInfo.bigRoad_OfftenY =  1;
			this.m_beadInfo.beadW =  14;				//設定大路元件大小
			this.m_beadInfo.beadH =  13;
			
			//this.m_beadInfo.bigEyeRoad_OfftenWidth = 0.5;
			this.m_beadInfo.bigEyeRoad_OfftenWidth = 0;
			this.m_beadInfo.bigEyeRoad_OfftenHeight = 0;
			this.m_beadInfo.bigEyeRoad_OfftenX = 0;
			this.m_beadInfo.bigEyeRoad_OfftenY = 0;
			m_beadInfo.bigEyeW = 3;
			m_beadInfo.bigEyeH = 3;
			
			//this.m_beadInfo.smallRoad_OfftenWidth = 0.5;
			this.m_beadInfo.smallRoad_OfftenWidth = 0;
			//this.m_beadInfo.smallRoad_OfftenHeight = 0.5;
			this.m_beadInfo.smallRoad_OfftenHeight = 0;
			this.m_beadInfo.smallRoad_OfftenX = 0;
			this.m_beadInfo.smallRoad_OfftenY = 0;
			m_beadInfo.smallW = 3;
			m_beadInfo.smallH = 3;
			
			//this.m_beadInfo.roachRoad_OfftenWidth = 0.025;
			this.m_beadInfo.roachRoad_OfftenWidth = 0;
			this.m_beadInfo.roachRoad_OfftenHeight = 0;
			this.m_beadInfo.roachRoad_OfftenX = 0;
			this.m_beadInfo.roachRoad_OfftenY =  0;
			
			this.m_bigSprite.setBeadSize(this.m_beadInfo);
			this.m_bigEyeSprite.setBeadSize(this.m_beadInfo);
			this.m_smallSprite.setBeadSize(this.m_beadInfo);
			this.m_roachSprite.setBeadSize(this.m_beadInfo);
			
			m_beadPlate.setBeads(0,0,27,27);
			
			//			_bigSprite.drawBg(42,6,17);
			//			_bigEyeSprite.drawBg(21,3,17);
			//			_smallSprite.drawBg(21,3,17);
			//			_roachSprite.drawBg(21,3,17);
		}
	}
}