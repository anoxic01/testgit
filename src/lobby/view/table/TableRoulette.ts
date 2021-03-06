module lobby.view.table {
	export class TableRoulette extends Table{
//		private m_bmpChip			:	Bitmap;							//总筹码数
		
		protected m_road			;
		
		private m_panelStatistic_1	;				//大小
		private m_panelStatistic_2	;				//单双
		
		public constructor() {
			super();
		
			this.m_mcAsset = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_TABLE,"Table_Roulette_Asset") ;
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
//			m_bmpChip = new egret.Bitmap();
//			this.m_mcContent.mc_5.addChild(m_bmpChip);
			
			this.m_spFaceContainer = this.m_mcContent.mc_6.mc_img;
			
//			m_btnLimit = new ButtonMcLanguage(this.m_mcContent.mc_30, function():void{
//				manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
//				this.tableLoginType.playerTableOwnStatusStruct = LobbyData.getInstance().getPlayerTableOwnStatusStruct(this.m_struct.TableID);
//				if(this.tableLoginType.playerTableOwnStatusStruct){
//					this.m_struct.BetLimitID = this.tableLoginType.playerTableOwnStatusStruct.CurrBetLimitID;
//					manager.LobbyManager.getInstance().showDialog(manager.LobbyManager.getInstance().getLanguageString(language.Language.sGame_Relogin), function():void{
//						manager.LobbyManager.getInstance().gamePoint = this.tableLoginType.getGlobalPoint();
//						manager.LobbyManager.getInstance().enterGame(this.m_struct);	
//					});
//				}else{
//					manager.LobbyManager.getInstance().showLimitBet(this.m_struct);
//				}
//			});
			
			//			m_bmpFace = new egret.Bitmap();
			//			this.m_mcContent.mc_6.addChild(m_bmpFace);
			
			this.m_road = new route.TableRoadMapRou(this.m_mcContent);
			
			this.m_spstatisticContain = new egret.Sprite();
			this.m_mcHot.addChild(this.m_spstatisticContain);
			
			this.m_panelStatistic = new route.StatisticsUI(239,0, route.StatisticsUI.HORIZONTAL,new egret.Rectangle(0,0,9,0));
			this.m_spstatisticContain.addChild(this.m_panelStatistic);
			this.m_panelStatistic.setTypes([define.Define.BEAD_BIG_DZ,define.Define.BEAD_SMALL_DZ, define.Define.BEAD_ZERO_DZ]);
			this.m_panelStatistic.setColor([route.StatisticsUI.RED, route.StatisticsUI.BLUE, route.StatisticsUI.GREEN]);
			this.m_panelStatistic.setIconOffset(10,11);
			this.m_panelStatistic.setIconVGap(2);
			this.m_panelStatistic.setIconHGap(-15);
			this.m_panelStatistic.draw();
			
			this.m_panelStatistic_1 = new route.StatisticsUI(239,0, route.StatisticsUI.HORIZONTAL,new egret.Rectangle(0,0,9,0));
			this.m_spstatisticContain.addChild(this.m_panelStatistic_1);
			this.m_panelStatistic_1.setTypes([define.Define.BEAD_DAN_DZ,define.Define.BEAD_SHUANG_DZ]);
			this.m_panelStatistic_1.setColor([route.StatisticsUI.BLUE, route.StatisticsUI.RED]);
			this.m_panelStatistic_1.setIconOffset(10,11);
			this.m_panelStatistic_1.setIconVGap(2);
			this.m_panelStatistic_1.draw();
			this.m_panelStatistic_1.x = 239;
			
			this.m_panelStatistic_2 = new route.StatisticsUI(239,0, route.StatisticsUI.HORIZONTAL,new egret.Rectangle(0,0,0,0));
			this.m_spstatisticContain.addChild(this.m_panelStatistic_2);
			this.m_panelStatistic_2.setTypes([define.Define.BEAD_RED_DZ,define.Define.BEAD_BLACK_DZ]);
			this.m_panelStatistic_2.setColor([route.StatisticsUI.RED, route.StatisticsUI.BLACK]);
			this.m_panelStatistic_2.setIconOffset(10,11);
			this.m_panelStatistic_2.setIconVGap(2);
			this.m_panelStatistic_2.draw();
			this.m_panelStatistic_2.x = 478;
			
			super();
			this.m_spStatisticMask.x -= 1;
			this.m_spstatisticContain.x -= 2;
		}
		 public destroy():void{
			super.destroy();
			
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
			if(this.m_panelStatistic_2)
			{
				this.m_panelStatistic_2.parent.removeChild(this.m_panelStatistic_2);
				this.m_panelStatistic_2.destroy();
				this.m_panelStatistic_2=null;
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
			
			this.m_bmpIcon.bitmapData = manager.BitmapManager.getInstance().getBmpdTableIcon(define.Define.TABLE_TYPE_ROU);
			this.m_bmpIcon.smoothing = true;
			
			this.m_bmpTable.bitmapData = manager.BitmapManager.getInstance().numberTable.conversion(_struct.TableID);
			this.m_bmpTable.smoothing = true;
			this.m_mcContent.mc_3.x = (this.m_mcContent.mc_2.x + this.m_mcContent.mc_2.width);
			this.m_mcContent.tf_7.text = _struct.StaticsInfo.TotalBet.toString();// + "/" + _struct.staticsInfo.TotalBetCnt.toString();
//			m_bmpChip.bitmapData = manager.BitmapManager.getInstance().numberChip.conversionSlash(_struct.staticsInfo.TotalBet, _struct.staticsInfo.TotalBetCnt);
//			m_bmpChip.smoothing = true;
			
			if(this.tableLoginType==null){
				this.tableLoginType = new TableLoginNormal(_struct);
				this.m_mcHot.addChild(this.tableLoginType);
//				this.tableLoginType.x = -28;
//				this.tableLoginType.y = -28;
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
//			this.m_mcContent.mc_6.tf_label.text = this.m_struct.DealerName?this.m_struct.DealerName:"";
			
			this.m_mcContent.mc_16.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
//			this.m_mcContent.mc_17.x = int(this.m_mcContent.mc_16.x + this.m_mcContent.mc_16.width);
			this.m_mcContent.mc_18.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
//			this.m_mcContent.mc_19.x = int(this.m_mcContent.mc_18.x + this.m_mcContent.mc_18.width);
			this.m_mcContent.mc_20.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
//			this.m_mcContent.mc_21.x = int(this.m_mcContent.mc_20.x + this.m_mcContent.mc_20.width);
			this.m_mcContent.mc_22.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
//			this.m_mcContent.mc_23.x = int(this.m_mcContent.mc_22.x + this.m_mcContent.mc_22.width);
			
			this.m_bmpHintShuffle.bitmapData = manager.BitmapManager.getInstance().getBmpdLanguage(manager.LobbyManager.getInstance().lobbyAuth.Lang, language.Language.sChangeShoe);
			this.m_bmpHintShuffle.smoothing = true;
			
			this.m_road.onChangeLanguage();
			
			this.m_panelStatistic.onChangeLanguage();
			this.m_panelStatistic_1.onChangeLanguage();
			this.m_panelStatistic_2.onChangeLanguage();
			
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
			
			this.m_panelStatistic.updateValues([(this.m_struct.StaticsInfo ).BigWinCnt, (this.m_struct.StaticsInfo ).SmallWinCnt, (this.m_struct.StaticsInfo ).ZeroWinCnt]);
			this.m_panelStatistic_1.updateValues([(this.m_struct.StaticsInfo ).OddWinCnt, (this.m_struct.StaticsInfo ).EvenWinCnt]);
			this.m_panelStatistic_2.updateValues([(this.m_struct.StaticsInfo ).RedWinCnt, (this.m_struct.StaticsInfo ).BlackWinCnt]);
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