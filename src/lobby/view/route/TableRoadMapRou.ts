module lobby.view.route {
	export class TableRoadMapRou extends RouRouteMgr{
		private m_mcAsset	:	MovieClip;
		private roadBtn_0	:	SingleButtonMC;			//红黑
		private roadBtn_1	:	SingleButtonMC;			//打列
		private roadBtn_2	:	SingleButtonMC;			//大小
		private roadBtn_3	:	SingleButtonMC;			//单双
		
		private m_current	:	SingleButtonMC;			//当前选中
		
		public constructor(_mcAsset:MovieClip) {
		
			m_mcAsset = _mcAsset;
			super(_mcAsset);
			
			this.roadBtn_0 = new SingleButtonMC(_mcAsset.mc_7,onChangeRoad);
			this.roadBtn_1 = new SingleButtonMC(_mcAsset.mc_8,onChangeRoad);
			this.roadBtn_2 = new SingleButtonMC(_mcAsset.mc_9,onChangeRoad);
			this.roadBtn_3 = new SingleButtonMC(_mcAsset.mc_10,onChangeRoad);
			
			m_current = roadBtn_2;
			m_current.setSelectedStatus(true);
			changeRoad(RouRoadType.BIG_SMALL);
			onChangeLanguage();
			
			setDozen(false);
		}
		
		
		 protected setRoadInf():void{
			this.m_beadInfo.gridWidth = 15;
			this.m_beadInfo.gridHeight = 6;
			
			//珠盘
			this.m_beadInfo.beadMc_OfftenWidth = 0;
			this.m_beadInfo.beadMc_OfftenHeight =  0;
			this.m_beadInfo.beadMc_OfftenX =  20;
			this.m_beadInfo.beadMc_OfftenY =  0;
			
			//红黑
			this.m_beadInfo.redMc_OfftenWidth = 0;
			this.m_beadInfo.redMc_OfftenHeight =  0;
			this.m_beadInfo.redMc_OfftenX =  18;
			this.m_beadInfo.redMc_OfftenY =  0;
			
			//打列
			this.m_beadInfo.blueMc_OfftenWidth = 0;
			this.m_beadInfo.blueMc_OfftenHeight = 0;
			this.m_beadInfo.blueMc_OfftenX =  124;
			this.m_beadInfo.blueMc_OfftenY =  1;
			
			//大小
			this.m_beadInfo.bigMc_OfftenWidth = 0;
			this.m_beadInfo.bigMc_OfftenHeight = 0;
			this.m_beadInfo.bigMc_OfftenX =  18;
			this.m_beadInfo.bigMc_OfftenY =  0;
			
			//单双
			this.m_beadInfo.oddMc_OfftenWidth = 0;
			this.m_beadInfo.oddMc_OfftenHeight =  0;
			this.m_beadInfo.oddMc_OfftenX =  18;
			this.m_beadInfo.oddMc_OfftenY =  0;
						
			//格子宽高
			this.m_beadInfo.beadW =  28;				
			this.m_beadInfo.beadH =  27;
			
			this.m_beadInfo.zoenRowW =  24;
			this.m_beadInfo.zoenRowH =  23;
			
//			var _colNum:number=17;
			this._bigSmallSp.setBeadSize(this.m_beadInfo);
//			this._bigSmallSp.drawBg(_colNum,6,26);
			this._oddEvenSp.setBeadSize(this.m_beadInfo);
//			this._oddEvenSp.drawBg(_colNum,6,26);
			this._redBlackSp.setBeadSize(this.m_beadInfo);
//			this._redBlackSp.drawBg(_colNum,6,26);
			m_beadInfo.gridWidth = 13;
			this._dozenRowSp.setBeadSize(this.m_beadInfo);
//			this._dozenRowSp.headW=80;
//			this._dozenRowSp.drawHeadBg(_colNum,7,22.3);
			
			
			var beadInfo0:BeadInfo = new BeadInfo();
			beadInfo0.gridWidth = 10;
			beadInfo0.gridHeight = 6;
			beadInfo0.beadW =  28;				
			beadInfo0.beadH =  27;
			m_beadInfo.gridWidth = 15;
			this._beadSp.setBeadSize(beadInfo0);
//			this._beadSp.drawBg(10,6,26)
			
			var X:Number= 262
			this._bigSmallSp.x=X;
			this._oddEvenSp.x=X;
			this._dozenRowSp.x=X;
			this._redBlackSp.x=X;
			
		}
		
		 public onChangeLanguage():void{
//			this._dozenRowSp.setTxtName([
//				LobbyManager.getInstance().lang.getString(Language.sBetType_Dozen_1),
//				LobbyManager.getInstance().lang.getString(Language.sBetType_Dozen_2),
//				LobbyManager.getInstance().lang.getString(Language.sBetType_Dozen_3),
//				LobbyManager.getInstance().lang.getString(Language.sZero),
//				LobbyManager.getInstance().lang.getString(Language.sBetType_Col_1),
//				LobbyManager.getInstance().lang.getString(Language.sBetType_Col_2),
//				LobbyManager.getInstance().lang.getString(Language.sBetType_Col_3),
//			]);
//			
			roadBtn_0.mcAsset.mc_label.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			roadBtn_1.mcAsset.mc_label.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			roadBtn_2.mcAsset.mc_label.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			roadBtn_3.mcAsset.mc_label.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			
			m_mcAsset.mc_dalie_0.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			m_mcAsset.mc_dalie_1.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			m_mcAsset.mc_dalie_2.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			m_mcAsset.mc_dalie_3.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			m_mcAsset.mc_dalie_4.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			m_mcAsset.mc_dalie_5.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			m_mcAsset.mc_dalie_6.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			
			super.onChangeLanguage();
		}
		
		protected onChangeRoad(e:MouseEvent):void {
			LobbyManager.getInstance().hideAllPanel();
			SoundManager.getInstance().play(SoundPackage.sClick_Tools);
			
			var mcbtn:MovieClip = e.currentTarget as MovieClip;
			//this._beadPlate.addEventListener(RouteEvent.ASK_Road_END, onAskRoadEnd);
			//console.log("onRoad::" +mcbtn );
			switch (mcbtn.name) {
				case roadBtn_0.mcAsset.name: 
					setDozen(false);
					if(m_current != roadBtn_0){
						current = roadBtn_0;
						this.changeRoad(RouRoadType.RED_BLACK);
					}
					
					break;
				case roadBtn_1.mcAsset.name: 
					setDozen(true);
					if(m_current != roadBtn_1){
						current = roadBtn_1;
						this.changeRoad(RouRoadType.ZOEN_ROW);
					}
					break;
				case roadBtn_2.mcAsset.name: 
					setDozen(false);
					if(m_current != roadBtn_2){
						current = roadBtn_2;
						this.changeRoad(RouRoadType.BIG_SMALL);
					}
					break;
				case roadBtn_3.mcAsset.name: 
					setDozen(false);
					if(m_current != roadBtn_3){
						current = roadBtn_3;
						this.changeRoad(RouRoadType.ODD_EVEN);
					}
					break;
				
			}
			
			
		}
		
		private set current(_btn:SingleButtonMC):void{
			m_current.setSelectedStatus(false);
			m_current = _btn;
			m_current.setSelectedStatus(true);
		}
		
		private setDozen(_bValue: boolean):void{
			m_mcAsset.mc_dalie.visible = _bValue;
			m_mcAsset.mc_dalie_0.visible = _bValue;
			m_mcAsset.mc_dalie_1.visible = _bValue;
			m_mcAsset.mc_dalie_2.visible = _bValue;
			m_mcAsset.mc_dalie_3.visible = _bValue;
			m_mcAsset.mc_dalie_4.visible = _bValue;
			m_mcAsset.mc_dalie_5.visible = _bValue;
			m_mcAsset.mc_dalie_6.visible = _bValue;
		}
		
		
	}
}