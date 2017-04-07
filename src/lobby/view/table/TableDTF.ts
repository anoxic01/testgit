module lobby.view.table {
	export class TableDTF extends Table{
//		private m_bmpChip		:	Bitmap;						//总筹码数
//		private m_bmpOnline		:	Bitmap;						//在线人数
//		private m_bmpBanker		:	Bitmap;						//下注数据
//		private m_bmpPlayer		:	Bitmap;						//下注数据
//		private m_bmpTie		:	Bitmap;						//下注数据
				
		private m_btnDragon		:	ui.button.SingleButtonMC;				//龙问路
		private m_btnTiger		:	ui.button.SingleButtonMC;				//虎问路
		private m_road			;			//路子
		
		public constructor() {
			super();
		
			this.m_mcAsset = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_TABLE,"Table_DTF_Asset") ;
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
			if(this.m_mcContent.mc_limit)TextUtils.setEmbedFont(this.m_mcContent.mc_limit.tf_label);
			if(this.m_mcContent.mc_limit_vip)TextUtils.setEmbedFont(this.m_mcContent.mc_limit_vip.tf_label);
			
			
			
//			m_bmpChip = new egret.Bitmap();
//			this.m_mcContent.mc_5.addChild(m_bmpChip);
//			
//			m_bmpOnline = new egret.Bitmap();
//			this.m_mcContent.mc_15.addChild(m_bmpOnline);
//			
//			m_bmpBanker = new egret.Bitmap();
//			this.m_mcContent.mc_17.addChild(m_bmpBanker);
//			
//			m_bmpPlayer = new egret.Bitmap();
//			this.m_mcContent.mc_19.addChild(m_bmpPlayer);
//			
//			m_bmpTie = new egret.Bitmap();
//			this.m_mcContent.mc_21.addChild(m_bmpTie);
			
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
			
			this.m_btnDragon = new ui.button.SingleButtonMC(this.m_mcContent.mc_12, function(evt:MouseEvent):void{
				manager.LobbyManager.getInstance().hideAllPanel();
				manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
				this.m_road.onAskRoad(route.game.dtf.DtfRouteMgr.ASK_MODE_DRAGON);
				evt.stopImmediatePropagation();
			});
			this.m_btnTiger = new ui.button.SingleButtonMC(this.m_mcContent.mc_13, function(evt:MouseEvent):void{
				manager.LobbyManager.getInstance().hideAllPanel();
				manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
				this.m_road.onAskRoad(route.game.dtf.DtfRouteMgr.ASK_MODE_TIGER);
				evt.stopImmediatePropagation();
			});
			
			this.m_road = new route.TableRoadMapDTF(this.m_mcContent);
			
			//			m_bmpFace = new egret.Bitmap();
			//			this.m_mcContent.mc_face.addChild(m_bmpFace);
			
			this.m_spstatisticContain = new egret.Sprite();
			this.m_mcHot.addChild(this.m_spstatisticContain);
			
			this.m_panelStatistic = new route.StatisticsUI(717,0,route.StatisticsUI.HORIZONTAL,new egret.Rectangle(0,0,0,0));
			this.m_spstatisticContain.addChild(this.m_panelStatistic);
			this.m_panelStatistic.setTypes([define.Define.BEAD_DRAGON,define.Define.BEAD_TIGER, define.Define.BEAD_TIE]);
			this.m_panelStatistic.setColor([route.StatisticsUI.RED, route.StatisticsUI.BLUE, route.StatisticsUI.GREEN]);
			this.m_panelStatistic.setIconOffset(10,11);
			this.m_panelStatistic.setIconVGap(2);
			this.m_panelStatistic.draw();
			
			super();
		}
		 public destroy():void{
			super.destroy();
			
			if(this.m_btnDragon){
				this.m_btnDragon.destroy();
				this.m_btnDragon = null;
			}
			if(this.m_btnTiger){
				this.m_btnTiger.destroy();
				this.m_btnTiger = null;
			}		
			if(this.m_road){
				this.m_road.destroy();
				this.m_road = null;
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
			
			_struct.joinTableType = model.type.JoinTableType.NORMAL_PAIR_TABLE_SEAT;
			
			this.m_bmpIcon.bitmapData = manager.BitmapManager.getInstance().getBmpdTableIcon(define.Define.TABLE_TYPE_DTF);
			this.m_bmpIcon.smoothing = true;
			
			this.m_bmpTable.bitmapData = manager.BitmapManager.getInstance().numberTable.conversion(_struct.TableID);
			this.m_bmpTable.smoothing = true;
			this.m_mcContent.mc_3.x = (this.m_mcContent.mc_2.x + this.m_mcContent.mc_2.width);
			
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
			
//			this.m_mcContent.tf_totalGoldTitle.text = manager.LobbyManager.getInstance().getLanguageString(language.Language.sTable_0);
//			this.m_mcContent.tf_totalGold.text = _struct.staticsInfo.TotalBet.toString();
//			
//			this.m_mcContent.tf_online.text = _struct.iOnlinePlayers.toString();
//			this.m_mcContent.tf_bankerTitle.text = manager.LobbyManager.getInstance().getLanguageString(language.Language.sBanker);
//			this.m_mcContent.tf_bankerGold.text = String(_struct.staticsInfo["BankerBetAmt"]) + "/" + String(_struct.staticsInfo["BankerBetCnt"]);
//			this.m_mcContent.tf_playerTitle.text = manager.LobbyManager.getInstance().getLanguageString(language.Language.sPlayer);
//			this.m_mcContent.tf_playerGold.text = String(_struct.staticsInfo["PlayerBetAmt"]) + "/" + String(_struct.staticsInfo["PlayerBetCnt"]);
//			this.m_mcContent.tf_tieTitle.text = manager.LobbyManager.getInstance().getLanguageString(language.Language.sTie);
//			this.m_mcContent.tf_tieGold.text = String(_struct.staticsInfo["TieBetAmt"]) + "/" + String(_struct.staticsInfo["TieBetCnt"]);
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
			var str : String = this.m_struct.DealerName?this.m_struct.DealerName:"";
			this.m_mcContent.mc_6.tf_label.text = str;
			if((this.m_mcContent.mc_6.tf_label).textWidth>115){
				str = str.slice(0,2) + "..." + str.slice(str.length-2,str.length);
				this.m_mcContent.mc_6.tf_label.text = str;
			}
			this.m_mcContent.mc_7.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			this.m_mcContent.mc_8.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			this.m_mcContent.mc_9.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			this.m_mcContent.mc_10.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
//			this.m_mcContent.mc_12.tf_label.text = manager.LobbyManager.getInstance().getLanguageString(language.Language.sDragonRoute);
//			this.m_mcContent.mc_13.tf_label.text = manager.LobbyManager.getInstance().getLanguageString(language.Language.sTigerRoute);
//			this.m_mcContent.mc_14.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			this.m_mcContent.mc_16.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			this.m_mcContent.mc_17.x = (this.m_mcContent.mc_16.x + this.m_mcContent.mc_16.width);
			this.m_mcContent.mc_18.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			this.m_mcContent.mc_19.x = (this.m_mcContent.mc_18.x + this.m_mcContent.mc_18.width);
			this.m_mcContent.mc_20.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			this.m_mcContent.mc_21.x = (this.m_mcContent.mc_20.x + this.m_mcContent.mc_20.width);
			
			(this.m_btnDragon.mcAsset.getChildByName("mc_label")).gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			(this.m_btnTiger.mcAsset.getChildByName("mc_label")).gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			
			
			this.m_bmpHintShuffle.bitmapData = manager.BitmapManager.getInstance().getBmpdLanguage(manager.LobbyManager.getInstance().lobbyAuth.Lang, language.Language.sChangeShoe);
			this.m_bmpHintShuffle.smoothing = true;
			
			this.m_road.onChangeLanguage();
			
			this.m_panelStatistic.onChangeLanguage();
			
			this.updateMaintenanceStatus();
			
			super.onChangeLanguage();
//			this.m_mcContent.tf_totalGoldTitle.text = manager.LobbyManager.getInstance().getLanguageString(language.Language.sTable_0);
//			this.m_mcContent.tf_bankerTitle.text = manager.LobbyManager.getInstance().getLanguageString(language.Language.sBanker);
//			this.m_mcContent.tf_playerTitle.text = manager.LobbyManager.getInstance().getLanguageString(language.Language.sPlayer);
//			this.m_mcContent.tf_tieTitle.text = manager.LobbyManager.getInstance().getLanguageString(language.Language.sTie);
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
			
			//			m_bmpChip.bitmapData = manager.BitmapManager.getInstance().numberChip.conversionSlash(this.m_struct.staticsInfo.TotalBet, this.m_struct.staticsInfo.TotalBetCnt);
			//			m_bmpChip.smoothing = true;
			
			this.m_mcContent.tf_7.text = this.m_struct.StaticsInfo.TotalBet.toString() + "/" + this.m_struct.StaticsInfo.TotalBetCnt.toString();
			this.m_mcContent.tf_9.text = (this.m_struct.StaticsInfo ).DragonBetAmt.toString() + "/" + (this.m_struct.StaticsInfo ).DragonBetCnt.toString();
			this.m_mcContent.tf_10.text = (this.m_struct.StaticsInfo ).TigerBetAmt.toString() + "/" + (this.m_struct.StaticsInfo ).TigerBetCnt.toString();
			this.m_mcContent.tf_11.text = (this.m_struct.StaticsInfo ).TieBetAmt.toString() + "/" + (this.m_struct.StaticsInfo ).TieBetCnt.toString();
			
			//			m_bmpOnline.bitmapData = manager.BitmapManager.getInstance().numberOnline.conversion(this.m_struct.OnlinePlayers);
			//			m_bmpOnline.smoothing = true;
			//			m_bmpBanker.bitmapData = manager.BitmapManager.getInstance().numberBet.conversionSlash((this.m_struct.staticsInfo ).DragonBetAmt, (this.m_struct.staticsInfo ).DragonBetCnt);
			//			m_bmpBanker.smoothing = true;
			//			m_bmpPlayer.bitmapData = manager.BitmapManager.getInstance().numberBet.conversionSlash((this.m_struct.staticsInfo ).TigerBetAmt, (this.m_struct.staticsInfo ).TigerBetCnt);
			//			m_bmpPlayer.smoothing = true;
			//			m_bmpTie.bitmapData = manager.BitmapManager.getInstance().numberBet.conversionSlash((this.m_struct.staticsInfo ).TieBetAmt, (this.m_struct.staticsInfo ).TieBetCnt);
			//			m_bmpTie.smoothing = true;
			
			this.m_mcContent.tf_0.text = (this.m_struct.StaticsInfo ).DragonWinCnt.toString();
			this.m_mcContent.tf_1.text = (this.m_struct.StaticsInfo ).TigerWinCnt.toString();
			this.m_mcContent.tf_2.text = (this.m_struct.StaticsInfo ).TieWinCnt.toString();
			this.m_mcContent.tf_3.text = String((this.m_struct.StaticsInfo ).DragonWinCnt + (this.m_struct.StaticsInfo ).TigerWinCnt + (this.m_struct.StaticsInfo ).TieWinCnt);
			
			this.m_panelStatistic.updateValues([(this.m_struct.StaticsInfo ).DragonWinCnt, (this.m_struct.StaticsInfo ).TigerWinCnt, (this.m_struct.StaticsInfo ).TieWinCnt]);
			
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