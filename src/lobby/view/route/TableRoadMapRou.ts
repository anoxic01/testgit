module lobby.view.route {
	export class TableRoadMapRou extends route.game.rou.RouRouteMgr{
		private m_mcAsset	;
		private roadBtn_0	:	ui.button.SingleButtonMC;			//红黑
		private roadBtn_1	:	ui.button.SingleButtonMC;			//打列
		private roadBtn_2	:	ui.button.SingleButtonMC;			//大小
		private roadBtn_3	:	ui.button.SingleButtonMC;			//单双
		
		private m_current	:	ui.button.SingleButtonMC;			//当前选中
		
		public constructor(_mcAsset) {
			
			super(_mcAsset);

			this.m_mcAsset = _mcAsset;
			this.roadBtn_0 = new ui.button.SingleButtonMC(_mcAsset.mc_7,this.onChangeRoad);
			this.roadBtn_1 = new ui.button.SingleButtonMC(_mcAsset.mc_8,this.onChangeRoad);
			this.roadBtn_2 = new ui.button.SingleButtonMC(_mcAsset.mc_9,this.onChangeRoad);
			this.roadBtn_3 = new ui.button.SingleButtonMC(_mcAsset.mc_10,this.onChangeRoad);
			
			this.m_current = this.roadBtn_2;
			this.m_current.setSelectedStatus(true);
			this.changeRoad(route.game.rou.RouRoadType.BIG_SMALL);
			this.onChangeLanguage();
			
			this.setDozen(false);
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
			this.m_beadInfo.gridWidth = 13;
			this._dozenRowSp.setBeadSize(this.m_beadInfo);
//			this._dozenRowSp.headW=80;
//			this._dozenRowSp.drawHeadBg(_colNum,7,22.3);
			
			
			var beadInfo0:BeadInfo = new BeadInfo();
			beadInfo0.gridWidth = 10;
			beadInfo0.gridHeight = 6;
			beadInfo0.beadW =  28;				
			beadInfo0.beadH =  27;
			this.m_beadInfo.gridWidth = 15;
			this._beadSp.setBeadSize(beadInfo0);
//			this._beadSp.drawBg(10,6,26)
			
			var X:number= 262
			this._bigSmallSp.x=X;
			this._oddEvenSp.x=X;
			this._dozenRowSp.x=X;
			this._redBlackSp.x=X;
			
		}
		
		 public onChangeLanguage():void{
//			this._dozenRowSp.setTxtName([
//				manager.LobbyManager.getInstance().lang.getString(Language.sBetType_Dozen_1),
//				manager.LobbyManager.getInstance().lang.getString(Language.sBetType_Dozen_2),
//				manager.LobbyManager.getInstance().lang.getString(Language.sBetType_Dozen_3),
//				manager.LobbyManager.getInstance().lang.getString(Language.sZero),
//				manager.LobbyManager.getInstance().lang.getString(Language.sBetType_Col_1),
//				manager.LobbyManager.getInstance().lang.getString(Language.sBetType_Col_2),
//				manager.LobbyManager.getInstance().lang.getString(Language.sBetType_Col_3),
//			]);
//			
			this.roadBtn_0.mcAsset.mc_label.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			this.roadBtn_1.mcAsset.mc_label.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			this.roadBtn_2.mcAsset.mc_label.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			this.roadBtn_3.mcAsset.mc_label.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			
			this.m_mcAsset.mc_dalie_0.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			this.m_mcAsset.mc_dalie_1.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			this.m_mcAsset.mc_dalie_2.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			this.m_mcAsset.mc_dalie_3.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			this.m_mcAsset.mc_dalie_4.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			this.m_mcAsset.mc_dalie_5.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			this.m_mcAsset.mc_dalie_6.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			
			super.onChangeLanguage();
		}
		
		protected onChangeRoad(e:egret.Event):void {
			manager.LobbyManager.getInstance().hideAllPanel();
			manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
			
			var mcbtn = e.currentTarget;
			//this._beadPlate.addEventListener(RouteEvent.ASK_Road_END, onAskRoadEnd);
			//console.log("onRoad::" +mcbtn );
			switch (mcbtn.name) {
				case this.roadBtn_0.mcAsset.name: 
					this.setDozen(false);
					if(this.m_current != this.roadBtn_0){
						this.current = this.roadBtn_0;
						this.changeRoad(route.game.rou.RouRoadType.RED_BLACK);
					}
					
					break;
				case this.roadBtn_1.mcAsset.name: 
					this.setDozen(true);
					if(this.m_current != this.roadBtn_1){
						this.current = this.roadBtn_1;
						this.changeRoad(route.game.rou.RouRoadType.ZOEN_ROW);
					}
					break;
				case this.roadBtn_2.mcAsset.name: 
					this.setDozen(false);
					if(this.m_current != this.roadBtn_2){
						this.current = this.roadBtn_2;
						this.changeRoad(route.game.rou.RouRoadType.BIG_SMALL);
					}
					break;
				case this.roadBtn_3.mcAsset.name: 
					this.setDozen(false);
					if(this.m_current != this.roadBtn_3){
						this.current = this.roadBtn_3;
						this.changeRoad(route.game.rou.RouRoadType.ODD_EVEN);
					}
					break;
				
			}
			
			
		}
		
		set current(_btn:ui.button.SingleButtonMC){
			this.m_current.setSelectedStatus(false);
			this.m_current = _btn;
			this.m_current.setSelectedStatus(true);
		}
		
		private setDozen(_bValue: boolean):void{
			this.m_mcAsset.mc_dalie.visible = _bValue;
			this.m_mcAsset.mc_dalie_0.visible = _bValue;
			this.m_mcAsset.mc_dalie_1.visible = _bValue;
			this.m_mcAsset.mc_dalie_2.visible = _bValue;
			this.m_mcAsset.mc_dalie_3.visible = _bValue;
			this.m_mcAsset.mc_dalie_4.visible = _bValue;
			this.m_mcAsset.mc_dalie_5.visible = _bValue;
			this.m_mcAsset.mc_dalie_6.visible = _bValue;
		}
		
		
	}
}