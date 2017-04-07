module lobby.view.table {
	export class TableSic extends Table{
//		private m_btmChip		:	Bitmap;						//总筹码数
//		private m_bmpOnline		:	Bitmap;						//在线人数
//		private m_bmpBig		:	Bitmap;						//下注数据
//		private m_bmpSmall		:	Bitmap;						//下注数据
//		private m_bmpOdd		:	Bitmap;						//下注数据
//		private m_bmpDouble		:	Bitmap;						//下注数据
		
		private m_btnOddEven		;			//单双
		private m_btnBigSmall		;			//大小
		private m_btnTie			;			//和值
		private m_btnBead			;			//珠仔
		private m_btnCurrent		;			//当前
		
		private m_road				;			//路子
		
		private m_panelStatistic_1	;				//manager.LobbyManager
		
		public constructor() {
			super();
		
			this.m_mcAsset = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_TABLE,"Table_Sic_Asset");
			this.addChild(this.m_mcAsset);
			
			this.m_mcContent = this.m_mcAsset.mc_content;
			this.m_mcHot = this.m_mcAsset.mc_hot;
			
			this.m_mcAsset.mc_hint.tf_mask.text = "";
			
			this.m_bmpTable = new egret.Bitmap();
			this.m_mcContent.mc_2.addChild(this.m_bmpTable);
			
			this.m_bmpTableHint = new egret.Bitmap();
			this.m_mcAsset.mc_hint.addChild(this.m_bmpTableHint);
			this.m_mcAsset.mc_hint.touchEnabled = false;
			this.m_mcAsset.mc_hint.touchChildren = false;
			
			this.m_bmpHintShuffle = new egret.Bitmap();
			this.m_mcContent.mc_shuffle.addChild(this.m_bmpHintShuffle);
			this.m_mcContent.mc_shuffle.touchEnabled = false;
			this.m_mcContent.mc_shuffle.touchChildren = false;
			this.m_mcContent.mc_shuffle.visible = false;
			TextUtils.setEmbedFont(this.m_mcContent.tf_7);
			TextUtils.setEmbedFont(this.m_mcContent.tf_8);
			TextUtils.setEmbedFont(this.m_mcContent.tf_9);
			TextUtils.setEmbedFont(this.m_mcContent.tf_10);
			TextUtils.setEmbedFont(this.m_mcContent.tf_11);
			TextUtils.setEmbedFont(this.m_mcContent.tf_12);
			
			if(this.m_mcContent.mc_limit)TextUtils.setEmbedFont(this.m_mcContent.mc_limit.tf_label);
			if(this.m_mcContent.mc_limit_vip)TextUtils.setEmbedFont(this.m_mcContent.mc_limit_vip.tf_label);
//			m_btmChip = new egret.Bitmap();
//			this.m_mcContent.mc_5.addChild(m_btmChip);
//			
//			m_bmpOnline = new egret.Bitmap();
//			this.m_mcContent.mc_15.addChild(m_bmpOnline);
//			
//			m_bmpOnline = new egret.Bitmap();
//			this.m_mcContent.mc_15.addChild(m_bmpOnline);
//			
//			m_bmpBig = new egret.Bitmap();
//			this.m_mcContent.mc_17.addChild(m_bmpBig);
//			
//			m_bmpSmall = new egret.Bitmap();
//			this.m_mcContent.mc_19.addChild(m_bmpSmall);
//			
//			m_bmpOdd = new egret.Bitmap();
//			this.m_mcContent.mc_21.addChild(m_bmpOdd);
//			
//			m_bmpDouble = new egret.Bitmap();
//			this.m_mcContent.mc_23.addChild(m_bmpDouble);
			
			this.m_spFaceContainer = this.m_mcContent.mc_6.mc_img;
			
//			m_btnLimit = new ButtonMcLanguage(this.m_mcContent.mc_30, function():void{
//				manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
//				this.tableLoginType.playerTableOwnStatusStruct = LobbyData.getInstance().getPlayerTableOwnStatusStruct(this.m_struct.TableID);
//				if(this.tableLoginType.playerTableOwnStatusStruct){
//					this.m_struct.BetLimitID = this.tableLoginType.playerTableOwnStatusStruct.CurrBetLimitID;
//					LobbyManager.getInstance().showDialog(LobbyManager.getInstance().getLanguageString(language.Language.sGame_Relogin), function():void{
//						LobbyManager.getInstance().gamePoint = this.tableLoginType.getGlobalPoint();
//						LobbyManager.getInstance().enterGame(this.m_struct);	
//					});
//				}else{
//					LobbyManager.getInstance().showLimitBet(this.m_struct);
//				}
//			});
			
			this.m_btnBigSmall = new ui.button.ButtonMcLanguage(this.m_mcContent.mc_7, function (evt:MouseEvent):void{
				manager.LobbyManager.getInstance().hideAllPanel();
				manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
				this.m_btnCurrent.setSelectedStatus(false);
				this.m_btnCurrent = this.m_btnBigSmall;
				this.m_btnCurrent.setSelectedStatus(true);
				if(this.m_road){
					this.m_road.changeRoad(route.game.sic.SicRoadType.BIG_SMALL);
				}
				evt.stopImmediatePropagation();
			});
			
			this.m_btnOddEven = new ui.button.ButtonMcLanguage(this.m_mcContent.mc_8, function (evt:MouseEvent):void{
				manager.LobbyManager.getInstance().hideAllPanel();
				manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
				this.m_btnCurrent.setSelectedStatus(false);
				this.m_btnCurrent = this.m_btnOddEven;
				this.m_btnCurrent.setSelectedStatus(true);
				if(this.m_road){
					this.m_road.changeRoad(route.game.sic.SicRoadType.ODD_EVEN);
				}
				evt.stopImmediatePropagation();
			});
			
			this.m_btnTie = new ui.button.ButtonMcLanguage(this.m_mcContent.mc_9, function (evt:MouseEvent):void{
				manager.LobbyManager.getInstance().hideAllPanel();
				manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
				this.m_btnCurrent.setSelectedStatus(false);
				this.m_btnCurrent = this.m_btnTie;
				this.m_btnCurrent.setSelectedStatus(true);
				if(this.m_road){
					this.m_road.changeRoad(route.game.sic.SicRoadType.TIE);
				}
				evt.stopImmediatePropagation();
			});
			this.m_btnBead = new ui.button.ButtonMcLanguage(this.m_mcContent.mc_10, function (evt:MouseEvent):void{
				manager.LobbyManager.getInstance().hideAllPanel();
				manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
				this.m_btnCurrent.setSelectedStatus(false);
				this.m_btnCurrent = this.m_btnBead;
				this.m_btnCurrent.setSelectedStatus(true);
				if(this.m_road){
					this.m_road.changeRoad(route.game.sic.SicRoadType.BEAD);
				}
				evt.stopImmediatePropagation();
			});
			
			this.m_road = new route.TableRoadMapSic(this.m_mcContent);
			
			this.m_btnCurrent = this.m_btnBigSmall;
			this.m_btnCurrent.setSelectedStatus(true);
			this.m_road.changeRoad(route.game.sic.SicRoadType.BIG_SMALL);
			
			//			m_bmpFace = new egret.Bitmap();
			//			this.m_mcContent.mc_face.addChild(m_bmpFace);
			
			this.m_spstatisticContain = new egret.Sprite();
			this.m_mcHot.addChild(this.m_spstatisticContain);
			
			this.m_panelStatistic = new route.StatisticsUI(358.5,0, route.StatisticsUI.HORIZONTAL,new egret.Rectangle(0,0,9,0));
			this.m_spstatisticContain.addChild(this.m_panelStatistic);
			this.m_panelStatistic.setTypes([define.Define.BEAD_BIG_DZ,define.Define.BEAD_SMALL_DZ, define.Define.BEAD_WEI_DZ]);
			this.m_panelStatistic.setColor([route.StatisticsUI.RED, route.StatisticsUI.BLUE, route.StatisticsUI.GREEN]);
			this.m_panelStatistic.setIconOffset(10,11);
			this.m_panelStatistic.setIconVGap(2);
			this.m_panelStatistic.draw();
			
			this.m_panelStatistic_1 = new route.StatisticsUI(359,0, route.StatisticsUI.HORIZONTAL,new egret.Rectangle(0,0,0,0));
			this.m_spstatisticContain.addChild(this.m_panelStatistic_1);
			this.m_panelStatistic_1.setTypes([define.Define.BEAD_DAN_DZ, define.Define.BEAD_SHUANG_DZ]);
			this.m_panelStatistic_1.setColor([route.StatisticsUI.BLUE, route.StatisticsUI.RED]);
			this.m_panelStatistic_1.setIconOffset(10,11);
			this.m_panelStatistic_1.setIconVGap(2);
			this.m_panelStatistic_1.draw();
			this.m_panelStatistic_1.x = 358;
			
			super();
			this.m_spStatisticMask.x -= 1;
			this.m_spstatisticContain.x -= 2;
			
			this.m_Statistic_topY -= 1;
			this.m_Statistic_bottomY += 3;
			this.m_spStatisticMask.y = this.m_Statistic_topY;
			this.m_spstatisticContain.y = this.m_Statistic_bottomY;
		}
		 public destroy():void{
			super.destroy();
			
			if(this.m_btnCurrent){
				this.m_btnCurrent = null;
			}
			if(this.m_btnOddEven){
				this.m_btnOddEven.destroy();
				this.m_btnOddEven = null;
			}
			if(this.m_btnBigSmall){
				this.m_btnBigSmall.destroy();
				this.m_btnBigSmall = null;
			}
			if(this.m_btnTie){
				this.m_btnTie.destroy();
				this.m_btnTie = null;
			}
			if(this.m_btnBead){
				this.m_btnBead.destroy();
				this.m_btnBead = null;
			}
			
			if(this.m_road){
				this.m_road.destroy();
				this.m_road = null;
			}
			if(this.m_panelStatistic_1)
			{
				this.m_panelStatistic_1.parent.removeChild(this.m_panelStatistic_1);
				this.m_panelStatistic_1.destroy();
				this.m_panelStatistic_1=null;
			}
			if(this.tableLoginType)
			{
				if(this.tableLoginType.parent)
				{
					this.tableLoginType.parent.removeChild(this.tableLoginType);
				}
				this.tableLoginType.destroy();
				this.tableLoginType=null;
			}
		}
		 public setData(_struct):void{
			if(_struct==null){
				super.setData(_struct);
				return;
			}
			
			this.m_bmpIcon.bitmapData = manager.BitmapManager.getInstance().getBmpdTableIcon(define.Define.TABLE_TYPE_SIC);
			this.m_bmpIcon.smoothing = true;
			
			this.m_bmpTable.bitmapData = manager.BitmapManager.getInstance().numberTable.conversion(_struct.TableID);
			this.m_bmpTable.smoothing = true;
			this.m_mcContent.mc_3.x = (this.m_mcContent.mc_2.x + this.m_mcContent.mc_2.width);
			
			if(this.tableLoginType==null){
				this.tableLoginType = new TableLoginNormal(_struct);
				this.m_mcHot.addChild(this.tableLoginType);
				this.tableLoginType.x = -1;
				this.tableLoginType.y = 2;
//				this.tableLoginType.init();
			}
			
			super.setData(_struct);
			
			this.update(true);
//			this.m_mcContent.mc_6.tf_label.text = this.m_struct.DealerName?this.m_struct.DealerName:"";
			
		}
		 public onChangeLanguage():void{
			
			this.m_mcContent.mc_1.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			this.m_mcContent.mc_2.x = this.m_mcContent.mc_1.x + this.m_mcContent.mc_1.width;
			this.m_mcContent.mc_3.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			this.m_mcContent.mc_3.x = (this.m_mcContent.mc_2.x + this.m_mcContent.mc_2.width);
//			m_bmpTime.x = int(this.m_mcContent.mc_3.x + this.m_mcContent.mc_3.width + 50);
			this.m_mcContent.mc_4.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			this.m_mcContent.mc_5.x = (this.m_mcContent.mc_4.x + this.m_mcContent.mc_4.width);
			this.m_mcContent.mc_16.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			this.m_mcContent.mc_17.x = (this.m_mcContent.mc_16.x + this.m_mcContent.mc_16.width);
			this.m_mcContent.mc_18.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			this.m_mcContent.mc_19.x = (this.m_mcContent.mc_18.x + this.m_mcContent.mc_18.width);
			this.m_mcContent.mc_20.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			this.m_mcContent.mc_21.x = (this.m_mcContent.mc_20.x + this.m_mcContent.mc_20.width);
			this.m_mcContent.mc_22.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			this.m_mcContent.mc_23.x = (this.m_mcContent.mc_22.x + this.m_mcContent.mc_22.width);
			
			this.m_btnOddEven.onChangeLanguage(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			this.m_btnBigSmall.onChangeLanguage(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			this.m_btnTie.onChangeLanguage(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			this.m_btnBead.onChangeLanguage(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			
			this.m_bmpHintShuffle.bitmapData = manager.BitmapManager.getInstance().getBmpdLanguage(manager.LobbyManager.getInstance().lobbyAuth.Lang, language.Language.sChangeShoe);
			this.m_bmpHintShuffle.smoothing = true;
			
			this.m_road.onChangeLanguage();
			
			this.m_panelStatistic.onChangeLanguage();
			this.m_panelStatistic_1.onChangeLanguage();
			
			this.updateMaintenanceStatus();
			
			super.onChangeLanguage();
		}
		
		 public update(_bInit: boolean=false):void{
			
			this.updateRoad(_bInit);
			
			this.updateCountDown();
			
			if(this.m_struct.GameStatus==model.status.GameStatus.CHANG_SHOE_COMPLETED){
				this.m_bNotFinished = false;
				if( this.m_iShoeNo!=this.m_struct.ShoeNo){
					this.m_iShoeNo = this.m_struct.ShoeNo;
					this.m_iGameNo = 0;
					this.m_road.clearRoad();
				}
				if(this.m_struct.GameNo==0){
					//显示“未开局”
					
				}
			}else if(this.m_struct.GameStatus==model.status.GameStatus.WAIT_NEXT_NEWGAME && this.m_struct.GameNo==0){
				if( this.m_iShoeNo!=this.m_struct.ShoeNo){
					this.m_iShoeNo = this.m_struct.ShoeNo;
					this.m_road.clearRoad();
				}
				this.m_iGameNo = 0;
				//显示“未开局”
				
			}else if(this.m_struct.GameStatus==model.status.GameStatus.FAILING_GAME||this.m_struct.GameStatus==model.status.GameStatus.FAIL_GAME)
			{
				if(!this.m_struct.IsAlone){//已独享不显示此局作废
					this.updateHint(language.Language.sQuickFailGame);
					this.m_mcAsset.mc_mask.visible = false;
				}
//				showMaintain(false);
			}
			
			this.updateMaintenanceStatus();
			
			this.m_mcContent.tf_8.text = this.m_struct.OnlinePlayers.toString();
		}
		
		 public updateRoad(_bInit: boolean):void{
			if(this.m_struct.IsCurrFailGame){
				if(this.m_struct.RoadMaps.length==1){
					this.m_struct.RoadMaps = this.m_struct.RoadMaps.replace("#","");
				}else{
					this.m_struct.RoadMaps = this.m_struct.RoadMaps.replace(/.\#/g,"");
				}
			}
			
			//换靴后GameNo为0时，路纸为"#"
			if(this.m_struct.RoadMaps.indexOf("#")!=-1){
				this.m_road.bError = true;
			}else{
				this.m_road.bError = false;
				
				if(_bInit){
					var _len : number;
					if(this.m_struct.RoadMaps!="" && this.m_struct.RoadMaps!=null){
						_len = this.m_struct.RoadMaps.split(".").length;
					}
					if(this.m_struct.GameNo == _len){
						this.initRoad(this.m_struct.RoadMaps);
					}else{
						if(this.m_struct.GameNo == (_len+1)){
							if(this.m_struct.GameStatus!=model.status.GameStatus.SETTLED){
								this.initRoad(this.m_struct.RoadMaps);
							}else{
								if(this.m_struct.LastRoadMap.length>0){
									if(this.m_struct.RoadMaps=="" || this.m_struct.RoadMaps==null){
										this.initRoad(this.m_struct.LastRoadMap);
									}else{
										this.initRoad(this.m_struct.RoadMaps+"."+this.m_struct.LastRoadMap);
										this.m_iGameNo = this.m_struct.GameNo;
									}
								}else{
									manager.LobbyManager.getInstance().getRoadmapReqInfo([this.m_struct.TableID]);
								}
							}
						}else{
							manager.LobbyManager.getInstance().getRoadmapReqInfo([this.m_struct.TableID]);
						}
					}
				}else{
					if(this.m_struct.GameStatus==model.status.GameStatus.SETTLED && this.m_iGameNo!=this.m_struct.GameNo && this.m_struct.GameNo!=0){
						if(this.m_struct.LastRoadMap!=null && this.m_struct.LastRoadMap!=""){
							this.m_iGameNo = this.m_struct.GameNo;
							this.m_road.addRoad(this.m_struct.LastRoadMap);
						}
					}
				}
			}
		}
		 public updateStaticsInfo():void{
			
			this.m_mcContent.tf_7.text = this.m_struct.StaticsInfo.TotalBet.toString() + "/" + this.m_struct.StaticsInfo.TotalBetCnt.toString();
			this.m_mcContent.tf_9.text = (this.m_struct.StaticsInfo ).BigBetAmt.toString() + "/" + (this.m_struct.StaticsInfo ).BigBetCnt.toString();
			this.m_mcContent.tf_10.text = (this.m_struct.StaticsInfo ).SmallBetAmt.toString() + "/" + (this.m_struct.StaticsInfo ).SmallBetCnt.toString();
			this.m_mcContent.tf_11.text = (this.m_struct.StaticsInfo ).OddBetAmt.toString() + "/" + (this.m_struct.StaticsInfo ).OddBetCnt.toString();
			this.m_mcContent.tf_12.text = (this.m_struct.StaticsInfo ).EvenBetAmt.toString() + "/" + (this.m_struct.StaticsInfo ).EvenBetCnt.toString();
			
			
			//			m_btmChip.bitmapData = manager.BitmapManager.getInstance().numberChip.conversion(this.m_struct.staticsInfo.TotalBet);
			//			m_btmChip.smoothing = true;
			//			m_bmpOnline.bitmapData = manager.BitmapManager.getInstance().numberOnline.conversion(this.m_struct.OnlinePlayers);
			//			m_bmpOnline.smoothing = true;
			//			m_bmpBig.bitmapData = manager.BitmapManager.getInstance().numberBet.conversionSlash((this.m_struct.staticsInfo ).BigBetAmt, (this.m_struct.staticsInfo ).BigBetCnt);
			//			m_bmpBig.smoothing = true;
			//			m_bmpSmall.bitmapData = manager.BitmapManager.getInstance().numberBet.conversionSlash((this.m_struct.staticsInfo ).SmallBetAmt, (this.m_struct.staticsInfo ).SmallBetCnt);
			//			m_bmpSmall.smoothing = true;
			//			m_bmpOdd.bitmapData = manager.BitmapManager.getInstance().numberBet.conversionSlash((this.m_struct.staticsInfo ).OddBetAmt, (this.m_struct.staticsInfo ).OddBetCnt);
			//			m_bmpOdd.smoothing = true;
			//			m_bmpDouble.bitmapData = manager.BitmapManager.getInstance().numberBet.conversionSlash((this.m_struct.staticsInfo ).EvenBetAmt, (this.m_struct.staticsInfo ).EvenBetCnt);
			//			m_bmpDouble.smoothing = true;
			
			this.m_panelStatistic.updateValues([(this.m_struct.StaticsInfo ).BigWinCnt, (this.m_struct.StaticsInfo ).SmallWinCnt, (this.m_struct.StaticsInfo ).TripleX24WinCnt]);
			this.m_panelStatistic_1.updateValues([(this.m_struct.StaticsInfo ).OddWinCnt, (this.m_struct.StaticsInfo ).EvenWinCnt]);
			
		}
		
		//更新维护状态
		 public updateMaintenanceStatus():void{
			if(this.struct.IsMaintaining){
				this.updateHint(language.Language.sMaintenance);
				this.showMaintain();
				return;
			}
			//厅馆维护
			var currcurrentTheme = manager.LobbyManager.getInstance().lobbyView.themeList.currentTheme;
			if(currcurrentTheme && currcurrentTheme.struct.IsMaintaining){
				this.hideMaintain();
				currcurrentTheme = null;
				return;
			}
			//身份判断
			if(model.Player.getInstance().iIdentity==2){
				var _bTrial :  boolean = this.isSupportTrial();
				if(_bTrial){
					this.otherCheck();
				}else{
					//不支持试玩
					this.updateHint(language.Language.sNoTrial);
					this.showMaintain();
				}
			}else{
				this.otherCheck();
			}
		}
		
		protected otherCheck():void{
			if(this.isNotFinish()){
				//游戏未完成
				this.m_bNotFinished = true;
				this.updateHint(language.Language.sMaintenance);
				this.showMaintain();
			}else if(!this.isHaveDealer()){
				//没有荷官
				this.updateHint(language.Language.sMaintenance);
				this.showMaintain();
			}else if(this.m_road.bError){
				//路纸出错
				this.updateHint(language.Language.sMaintenance);
				this.showMaintain();
			}else if(this.m_struct.IsPaused){
				//桌子维护 
				this.updateHint(language.Language.sMaintenance);
				this.showMaintain();
			}else if(this.m_struct.IsAlone){
				//独享
				this.showMaintain();
				this.m_mcAsset.mc_mask.visible = false;
			}else if(this.m_struct.GameStatus!=model.status.GameStatus.FAILING_GAME&&this.m_struct.GameStatus!=model.status.GameStatus.FAIL_GAME){
				this.hideMaintain();
			}
			
			this.m_bSettled =  <boolean>(this.m_struct.GameStatus==model.status.GameStatus.SETTLED);
			
			if(this.m_struct.IsChangingShoe){
				//洗牌中
				switch(this.m_struct.GameStatus){
					case model.status.GameStatus.WAIT_NEXT_NEWGAME:
					case model.status.GameStatus.SETTLED:
						this.m_mcContent.mc_shuffle.visible = false;
						break;
					
					case model.status.GameStatus.CHANGING_SHOE:
						if(!this.m_bSettled){
							this.m_mcContent.mc_shuffle.visible = true;
						}
						break;
				}
			}else{
				this.m_mcContent.mc_shuffle.visible = false;
			}
		}
		
		 public initRoad(_sRoad:string):void{
			this.m_iGameNo = this.isGameStart()?this.m_struct.GameNo-1:this.m_struct.GameNo;
			
			this.m_road.clearRoad();
			this.m_road.addRoad(_sRoad);
		}
		
		
	}
}