module lobby.view.route {
	export class TableRoadMapSic extends route.game.sic.SicRouteMgr{
		public constructor(view) {
		super(view);
		}
		
		
		 protected setRoadInf():void{
			
			//路紙參數均在此設定
			this.m_beadInfo = new BeadInfo();
			
			this.m_beadInfo.gridWidth = 25;
			this.m_beadInfo.gridHeight = 6;
			this.m_beadInfo.beadW =  28;			
			this.m_beadInfo.beadH =  27;
			
			this.m_beadInfo.oddMc_OfftenX = 1;
			this.m_beadInfo.oddMc_OfftenY = 0;
			this.m_beadInfo.oddMc_OfftenWidth = 0;
			this.m_beadInfo.oddMc_OfftenHeight =	0;
			
			this.m_beadInfo.bigMc_OfftenX = 1;
			this.m_beadInfo.bigMc_OfftenY = 0;
			this.m_beadInfo.bigMc_OfftenWidth = 0;
			this.m_beadInfo.bigMc_OfftenHeight = 0;
			
			this.m_beadInfo.tieMc_OfftenX = 1;
			this.m_beadInfo.tieMc_OfftenY = 0;
			this.m_beadInfo.tieMc_OfftenWidth = 0;
			this.m_beadInfo.tieMc_OfftenHeight  = 0;
			
			
			this.m_beadInfo.beadMc_OfftenX = 1;
			this.m_beadInfo.beadMc_OfftenY = 0;
			this.m_beadInfo.beadMc_OfftenWidth = 0;
			this.m_beadInfo.beadMc_OfftenHeight = 0;
			
			
			var _colNum  = 26
			var _rowNum	 = 6;
			var _size	 = 30;
			
			this.m_bigSmallSp.setBeadSize(this.m_beadInfo);
//			m_bigSmallSp.drawBg(_colNum,_rowNum,_size);
			this.m_oddEvenSp.setBeadSize(this.m_beadInfo);
//			m_oddEvenSp.drawBg(_colNum,_rowNum,_size);
			this.m_tieSp.setBeadSize(this.m_beadInfo);
//			m_tieSp.drawBg(_colNum,_rowNum,_size);
			this.m_beadSp.setBeadSize(this.m_beadInfo);
//			m_beadSp.drawBg(_colNum,_rowNum,_size);
			
		}
		
	}
}