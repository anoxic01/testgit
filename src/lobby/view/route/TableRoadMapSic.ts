module lobby.view.route {
	export class TableRoadMapSic extends SicRouteMgr{
		public constructor(view:MovieClip) {
		super(view);
		}
		
		
		 protected setRoadInf():void{
			
			//路紙參數均在此設定
			m_beadInfo = new BeadInfo();
			
			m_beadInfo.gridWidth = 25;
			m_beadInfo.gridHeight = 6;
			m_beadInfo.beadW =  28;			
			m_beadInfo.beadH =  27;
			
			m_beadInfo.oddMc_OfftenX = 1;
			m_beadInfo.oddMc_OfftenY = 0;
			m_beadInfo.oddMc_OfftenWidth = 0;
			m_beadInfo.oddMc_OfftenHeight =	0;
			
			m_beadInfo.bigMc_OfftenX = 1;
			m_beadInfo.bigMc_OfftenY = 0;
			m_beadInfo.bigMc_OfftenWidth = 0;
			m_beadInfo.bigMc_OfftenHeight = 0;
			
			m_beadInfo.tieMc_OfftenX = 1;
			m_beadInfo.tieMc_OfftenY = 0;
			m_beadInfo.tieMc_OfftenWidth = 0;
			m_beadInfo.tieMc_OfftenHeight  = 0;
			
			
			m_beadInfo.beadMc_OfftenX = 1;
			m_beadInfo.beadMc_OfftenY = 0;
			m_beadInfo.beadMc_OfftenWidth = 0;
			m_beadInfo.beadMc_OfftenHeight = 0;
			
			
			var _colNum : int = 26
			var _rowNum	: int = 6;
			var _size	: int = 30;
			
			m_bigSmallSp.setBeadSize(this.m_beadInfo);
//			m_bigSmallSp.drawBg(_colNum,_rowNum,_size);
			m_oddEvenSp.setBeadSize(this.m_beadInfo);
//			m_oddEvenSp.drawBg(_colNum,_rowNum,_size);
			m_tieSp.setBeadSize(this.m_beadInfo);
//			m_tieSp.drawBg(_colNum,_rowNum,_size);
			m_beadSp.setBeadSize(this.m_beadInfo);
//			m_beadSp.drawBg(_colNum,_rowNum,_size);
			
		}
		
	}
}