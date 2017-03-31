module lobby.view.table {
	export class TableDTF extends Table{
//		private m_bmpChip		:	Bitmap;						//总筹码数
//		private m_bmpOnline		:	Bitmap;						//在线人数
//		private m_bmpBanker		:	Bitmap;						//下注数据
//		private m_bmpPlayer		:	Bitmap;						//下注数据
//		private m_bmpTie		:	Bitmap;						//下注数据
				
		private m_btnDragon		:	ui.button.SingleButtonMC;				//龙问路
		private m_btnTiger		:	ui.button.SingleButtonMC;				//虎问路
		private m_road			:	TableRoadMapDTF;			//路子
		
		public constructor() {
			super();
		
			m_mcAsset = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_TABLE,"Table_DTF_Asset") ;
			this.addChild(m_mcAsset);
			
			m_mcContent = m_mcAsset.mc_content;
			m_mcHot = m_mcAsset.mc_hot;
			
			m_mcAsset.mc_hint.tf_mask.text = "";
			
			m_bmpTable = new Bitmap();
			m_mcContent.mc_2.addChild(m_bmpTable);
			
			m_bmpTableHint = new Bitmap();
			m_mcAsset.mc_hint.addChild(m_bmpTableHint);
			m_mcAsset.mc_hint.mouseEnabled = false;
			m_mcAsset.mc_hint.mouseChildren = false;
			
			m_bmpHintShuffle = new Bitmap();
			m_mcContent.mc_shuffle.addChild(m_bmpHintShuffle);
			m_mcContent.mc_shuffle.mouseEnabled = false;
			m_mcContent.mc_shuffle.mouseChildren = false;
			m_mcContent.mc_shuffle.visible = false;
			
			
			TextUtils.setEmbedFont(m_mcContent.tf_7);
			TextUtils.setEmbedFont(m_mcContent.tf_8);
			TextUtils.setEmbedFont(m_mcContent.tf_9);
			TextUtils.setEmbedFont(m_mcContent.tf_10);
			TextUtils.setEmbedFont(m_mcContent.tf_11);
			if(m_mcContent.mc_limit)TextUtils.setEmbedFont(m_mcContent.mc_limit.tf_label);
			if(m_mcContent.mc_limit_vip)TextUtils.setEmbedFont(m_mcContent.mc_limit_vip.tf_label);
			
			
			
//			m_bmpChip = new Bitmap();
//			m_mcContent.mc_5.addChild(m_bmpChip);
//			
//			m_bmpOnline = new Bitmap();
//			m_mcContent.mc_15.addChild(m_bmpOnline);
//			
//			m_bmpBanker = new Bitmap();
//			m_mcContent.mc_17.addChild(m_bmpBanker);
//			
//			m_bmpPlayer = new Bitmap();
//			m_mcContent.mc_19.addChild(m_bmpPlayer);
//			
//			m_bmpTie = new Bitmap();
//			m_mcContent.mc_21.addChild(m_bmpTie);
			
			m_spFaceContainer = m_mcContent.mc_6.mc_img;
			
//			m_btnLimit = new ButtonMcLanguage(m_mcContent.mc_30, function():void{
//				SoundManager.getInstance().play(SoundPackage.sClick_Tools);
//				tableLoginType.playerTableOwnStatusStruct = LobbyData.getInstance().getPlayerTableOwnStatusStruct(m_struct.TableID);
//				if(tableLoginType.playerTableOwnStatusStruct){
//					m_struct.BetLimitID = tableLoginType.playerTableOwnStatusStruct.CurrBetLimitID;
//					LobbyManager.getInstance().showDialog(LobbyManager.getInstance().getLanguageString(Language.sGame_Relogin), function():void{
//						LobbyManager.getInstance().gamePoint = tableLoginType.getGlobalPoint();
//						LobbyManager.getInstance().enterGame(m_struct);	
//					});
//				}else{
//					LobbyManager.getInstance().showLimitBet(m_struct);
//				}
//			});
			
			m_btnDragon = new ui.button.SingleButtonMC(m_mcContent.mc_12, function(evt:MouseEvent):void{
				LobbyManager.getInstance().hideAllPanel();
				SoundManager.getInstance().play(SoundPackage.sClick_Tools);
				m_road.onAskRoad(DtfRouteMgr.ASK_MODE_DRAGON);
				evt.stopImmediatePropagation();
			});
			m_btnTiger = new ui.button.SingleButtonMC(m_mcContent.mc_13, function(evt:MouseEvent):void{
				LobbyManager.getInstance().hideAllPanel();
				SoundManager.getInstance().play(SoundPackage.sClick_Tools);
				m_road.onAskRoad(DtfRouteMgr.ASK_MODE_TIGER);
				evt.stopImmediatePropagation();
			});
			
			m_road = new TableRoadMapDTF(m_mcContent);
			
			//			m_bmpFace = new Bitmap();
			//			m_mcContent.mc_face.addChild(m_bmpFace);
			
			m_spstatisticContain = new Sprite();
			m_mcHot.addChild(m_spstatisticContain);
			
			m_panelStatistic = new StatisticsUI(717,0,StatisticsUI.HORIZONTAL,new Rectangle(0,0,0,0));
			m_spstatisticContain.addChild(m_panelStatistic);
			m_panelStatistic.setTypes([Define.BEAD_DRAGON,Define.BEAD_TIGER, Define.BEAD_TIE]);
			m_panelStatistic.setColor([StatisticsUI.RED,StatisticsUI.BLUE, StatisticsUI.GREEN]);
			m_panelStatistic.setIconOffset(10,11);
			m_panelStatistic.setIconVGap(2);
			m_panelStatistic.draw();
			
			super();
		}
		 public destroy():void{
			super.destroy();
			
			if(m_btnDragon){
				m_btnDragon.destroy();
				m_btnDragon = null;
			}
			if(m_btnTiger){
				m_btnTiger.destroy();
				m_btnTiger = null;
			}		
			if(m_road){
				m_road.destroy();
				m_road = null;
			}
			if(tableLoginType)
			{
				if(tableLoginType.parent)
				{
					tableLoginType.parent.removeChild(tableLoginType);
				}
				tableLoginType.destroy();
				tableLoginType=null;
			}
			
		}
		 public setData(_struct:TableStruct):void{
			if(_struct==null){
				super.setData(_struct);
				return;
			}
			
			_struct.joinTableType = JoinTableType.NORMAL_PAIR_TABLE_SEAT;
			
			m_bmpIcon.bitmapData = BitmapManager.getInstance().getBmpdTableIcon(Define.TABLE_TYPE_DTF);
			m_bmpIcon.smoothing = true;
			
			m_bmpTable.bitmapData = BitmapManager.getInstance().numberTable.conversion(_struct.TableID);
			m_bmpTable.smoothing = true;
			m_mcContent.mc_3.x = int(m_mcContent.mc_2.x + m_mcContent.mc_2.width);
			
			if(tableLoginType==null){
				tableLoginType = new TableLoginNormal(_struct);
				m_mcHot.addChild(tableLoginType);
//				tableLoginType.x = -28;
//				tableLoginType.y = -28;
//				tableLoginType.init();
				
			}
			
			super.setData(_struct);
			
			update(true);
//			m_mcContent.mc_6.tf_label.text = m_struct.DealerName?m_struct.DealerName:"";
			
//			m_mcContent.tf_totalGoldTitle.text = LobbyManager.getInstance().getLanguageString(Language.sTable_0);
//			m_mcContent.tf_totalGold.text = _struct.staticsInfo.TotalBet.toString();
//			
//			m_mcContent.tf_online.text = _struct.iOnlinePlayers.toString();
//			m_mcContent.tf_bankerTitle.text = LobbyManager.getInstance().getLanguageString(Language.sBanker);
//			m_mcContent.tf_bankerGold.text = String(_struct.staticsInfo["BankerBetAmt"]) + "/" + String(_struct.staticsInfo["BankerBetCnt"]);
//			m_mcContent.tf_playerTitle.text = LobbyManager.getInstance().getLanguageString(Language.sPlayer);
//			m_mcContent.tf_playerGold.text = String(_struct.staticsInfo["PlayerBetAmt"]) + "/" + String(_struct.staticsInfo["PlayerBetCnt"]);
//			m_mcContent.tf_tieTitle.text = LobbyManager.getInstance().getLanguageString(Language.sTie);
//			m_mcContent.tf_tieGold.text = String(_struct.staticsInfo["TieBetAmt"]) + "/" + String(_struct.staticsInfo["TieBetCnt"]);
		}
		 public onChangeLanguage():void{
			
			m_mcContent.mc_1.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			m_mcContent.mc_2.x = m_mcContent.mc_1.x + m_mcContent.mc_1.width;
			m_mcContent.mc_3.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			m_mcContent.mc_3.x = int(m_mcContent.mc_2.x + m_mcContent.mc_2.width);
//			m_bmpTime.x = int(m_mcContent.mc_3.x + m_mcContent.mc_3.width + 50);
			m_mcContent.mc_4.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			m_mcContent.mc_5.x = int(m_mcContent.mc_4.x + m_mcContent.mc_4.width);
//			m_mcContent.mc_6.tf_label.text = m_struct.DealerName?m_struct.DealerName:"";
			var str : String = m_struct.DealerName?m_struct.DealerName:"";
			m_mcContent.mc_6.tf_label.text = str;
			if((m_mcContent.mc_6.tf_label as TextField).textWidth>115){
				str = str.slice(0,2) + "..." + str.slice(str.length-2,str.length);
				m_mcContent.mc_6.tf_label.text = str;
			}
			m_mcContent.mc_7.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			m_mcContent.mc_8.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			m_mcContent.mc_9.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			m_mcContent.mc_10.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
//			m_mcContent.mc_12.tf_label.text = LobbyManager.getInstance().getLanguageString(Language.sDragonRoute);
//			m_mcContent.mc_13.tf_label.text = LobbyManager.getInstance().getLanguageString(Language.sTigerRoute);
//			m_mcContent.mc_14.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			m_mcContent.mc_16.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			m_mcContent.mc_17.x = int(m_mcContent.mc_16.x + m_mcContent.mc_16.width);
			m_mcContent.mc_18.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			m_mcContent.mc_19.x = int(m_mcContent.mc_18.x + m_mcContent.mc_18.width);
			m_mcContent.mc_20.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			m_mcContent.mc_21.x = int(m_mcContent.mc_20.x + m_mcContent.mc_20.width);
			
			(m_btnDragon.mcAsset.getChildByName("mc_label") as MovieClip).gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			(m_btnTiger.mcAsset.getChildByName("mc_label") as MovieClip).gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			
			
			m_bmpHintShuffle.bitmapData = BitmapManager.getInstance().getBmpdLanguage(LobbyManager.getInstance().lobbyAuth.Lang, Language.sChangeShoe);
			m_bmpHintShuffle.smoothing = true;
			
			m_road.onChangeLanguage();
			
			m_panelStatistic.onChangeLanguage();
			
			updateMaintenanceStatus();
			
			super.onChangeLanguage();
//			m_mcContent.tf_totalGoldTitle.text = LobbyManager.getInstance().getLanguageString(Language.sTable_0);
//			m_mcContent.tf_bankerTitle.text = LobbyManager.getInstance().getLanguageString(Language.sBanker);
//			m_mcContent.tf_playerTitle.text = LobbyManager.getInstance().getLanguageString(Language.sPlayer);
//			m_mcContent.tf_tieTitle.text = LobbyManager.getInstance().getLanguageString(Language.sTie);
		}
		
		 public update(_bInit: boolean=false):void{
			
			updateRoad(_bInit);
			
			updateCountDown();
			
			if(m_struct.GameStatus==GameStatus.CHANG_SHOE_COMPLETED){
				m_bNotFinished = false;
				if( m_iShoeNo!=m_struct.ShoeNo){
					m_iShoeNo = m_struct.ShoeNo;
					m_iGameNo = 0;
					m_road.clearRoad();
				}
				if(m_struct.GameNo==0){
					//显示“未开局”
					
				}
			}else if(m_struct.GameStatus==GameStatus.WAIT_NEXT_NEWGAME && m_struct.GameNo==0){
				if( m_iShoeNo!=m_struct.ShoeNo){
					m_iShoeNo = m_struct.ShoeNo;
					m_road.clearRoad();
				}
				m_iGameNo = 0;
				//显示“未开局”
				
			}else if(m_struct.GameStatus==GameStatus.FAILING_GAME||m_struct.GameStatus==GameStatus.FAIL_GAME)
			{
				if(!m_struct.IsAlone){//已独享不显示此局作废
					updateHint(Language.sQuickFailGame);
					m_mcAsset.mc_mask.visible = false;
				}
//				showMaintain(false);
			}
			
			updateMaintenanceStatus();
						
			m_mcContent.tf_8.text = m_struct.OnlinePlayers.toString();
		}
		 public updateRoad(_bInit: boolean):void{
			if(m_struct.IsCurrFailGame){
				if(m_struct.RoadMaps.length==1){
					m_struct.RoadMaps = m_struct.RoadMaps.replace("#","");
				}else{
					m_struct.RoadMaps = m_struct.RoadMaps.replace(/.\#/g,"");
				}
			}
			
			//换靴后GameNo为0时，路纸为"#"
			if(m_struct.RoadMaps.indexOf("#")!=-1){
				m_road.bError = true;
			}else{
				m_road.bError = false;
				
				if(_bInit){
					var _len : number;
					if(m_struct.RoadMaps!="" && m_struct.RoadMaps!=null){
						_len = m_struct.RoadMaps.split(".").length;
					}
					
					if(m_struct.GameNo == _len){
						initRoad(m_struct.RoadMaps);
					}else{
						if(m_struct.GameNo == (_len+1)){
							if(m_struct.GameStatus!=GameStatus.SETTLED){
								initRoad(m_struct.RoadMaps);
							}else{
								if(m_struct.LastRoadMap.length>0){
									if(m_struct.RoadMaps=="" || m_struct.RoadMaps==null){
										initRoad(m_struct.LastRoadMap);
									}else{
										initRoad(m_struct.RoadMaps+"."+m_struct.LastRoadMap);
										m_iGameNo = m_struct.GameNo;
									}
								}else{
									LobbyManager.getInstance().getRoadmapReqInfo([m_struct.TableID]);
								}
							}
						}else{
							LobbyManager.getInstance().getRoadmapReqInfo([m_struct.TableID]);
						}
					}
				}else{
					if(m_struct.GameStatus==GameStatus.SETTLED && m_iGameNo!=m_struct.GameNo && m_struct.GameNo!=0){
						if(m_struct.LastRoadMap!=null && m_struct.LastRoadMap!=""){
							m_iGameNo = m_struct.GameNo;
							m_road.addRoad(m_struct.LastRoadMap);
						}
					}
				}
			}
		}
		 public updateStaticsInfo():void{
			
			//			m_bmpChip.bitmapData = BitmapManager.getInstance().numberChip.conversionSlash(m_struct.staticsInfo.TotalBet, m_struct.staticsInfo.TotalBetCnt);
			//			m_bmpChip.smoothing = true;
			
			m_mcContent.tf_7.text = m_struct.StaticsInfo.TotalBet.toString() + "/" + m_struct.StaticsInfo.TotalBetCnt.toString();
			m_mcContent.tf_9.text = (m_struct.StaticsInfo as StaticsInfoDTF).DragonBetAmt.toString() + "/" + (m_struct.StaticsInfo as StaticsInfoDTF).DragonBetCnt.toString();
			m_mcContent.tf_10.text = (m_struct.StaticsInfo as StaticsInfoDTF).TigerBetAmt.toString() + "/" + (m_struct.StaticsInfo as StaticsInfoDTF).TigerBetCnt.toString();
			m_mcContent.tf_11.text = (m_struct.StaticsInfo as StaticsInfoDTF).TieBetAmt.toString() + "/" + (m_struct.StaticsInfo as StaticsInfoDTF).TieBetCnt.toString();
			
			//			m_bmpOnline.bitmapData = BitmapManager.getInstance().numberOnline.conversion(m_struct.OnlinePlayers);
			//			m_bmpOnline.smoothing = true;
			//			m_bmpBanker.bitmapData = BitmapManager.getInstance().numberBet.conversionSlash((m_struct.staticsInfo as StaticsInfoDTF).DragonBetAmt, (m_struct.staticsInfo as StaticsInfoDTF).DragonBetCnt);
			//			m_bmpBanker.smoothing = true;
			//			m_bmpPlayer.bitmapData = BitmapManager.getInstance().numberBet.conversionSlash((m_struct.staticsInfo as StaticsInfoDTF).TigerBetAmt, (m_struct.staticsInfo as StaticsInfoDTF).TigerBetCnt);
			//			m_bmpPlayer.smoothing = true;
			//			m_bmpTie.bitmapData = BitmapManager.getInstance().numberBet.conversionSlash((m_struct.staticsInfo as StaticsInfoDTF).TieBetAmt, (m_struct.staticsInfo as StaticsInfoDTF).TieBetCnt);
			//			m_bmpTie.smoothing = true;
			
			m_mcContent.tf_0.text = (m_struct.StaticsInfo as StaticsInfoDTF).DragonWinCnt.toString();
			m_mcContent.tf_1.text = (m_struct.StaticsInfo as StaticsInfoDTF).TigerWinCnt.toString();
			m_mcContent.tf_2.text = (m_struct.StaticsInfo as StaticsInfoDTF).TieWinCnt.toString();
			m_mcContent.tf_3.text = String((m_struct.StaticsInfo as StaticsInfoDTF).DragonWinCnt + (m_struct.StaticsInfo as StaticsInfoDTF).TigerWinCnt + (m_struct.StaticsInfo as StaticsInfoDTF).TieWinCnt);
			
			m_panelStatistic.updateValues([(m_struct.StaticsInfo as StaticsInfoDTF).DragonWinCnt, (m_struct.StaticsInfo as StaticsInfoDTF).TigerWinCnt, (m_struct.StaticsInfo as StaticsInfoDTF).TieWinCnt]);
			
		}
		
		//更新维护状态
		 public updateMaintenanceStatus():void{
			if(struct.IsMaintaining){
				updateHint(Language.sMaintenance);
				showMaintain();
				return;
			}
			//厅馆维护
			var currcurrentTheme:ThemeItem = LobbyManager.getInstance().lobbyView.themeList.currentTheme;
			if(currcurrentTheme && currcurrentTheme.struct.IsMaintaining){
				hideMaintain();
				currcurrentTheme = null;
				return;
			}
			
			//身份判断
			if(Player.getInstance().iIdentity==2){
				var _bTrial :  boolean = isSupportTrial();
				if(_bTrial){
					otherCheck();
				}else{
					//不支持试玩
					updateHint(Language.sNoTrial);
					showMaintain();
				}
			}else{
				otherCheck();
			}
		}
		
		protected otherCheck():void{
			if(isNotFinish()){
				//游戏未完成
				m_bNotFinished = true;
				updateHint(Language.sMaintenance);
				showMaintain();
			}else if(!isHaveDealer()){
				//没有荷官
				updateHint(Language.sMaintenance);
				showMaintain();
			}else if(m_road.bError){
				//路纸出错
				updateHint(Language.sMaintenance);
				showMaintain();
			}else if(m_struct.IsPaused){
				//桌子维护 
				updateHint(Language.sMaintenance);
				showMaintain();
			}else if(m_struct.IsAlone){
				//独享
				showMaintain();
				m_mcAsset.mc_mask.visible = false;
			}else if(m_struct.GameStatus!=GameStatus.FAILING_GAME&&m_struct.GameStatus!=GameStatus.FAIL_GAME){
				hideMaintain();
			}
			
			m_bSettled =  boolean(m_struct.GameStatus==GameStatus.SETTLED);
			
			if(m_struct.IsChangingShoe){
				//洗牌中
				switch(m_struct.GameStatus){
					case GameStatus.WAIT_NEXT_NEWGAME:
					case GameStatus.SETTLED:
						m_mcContent.mc_shuffle.visible = false;
						break;
					
					case GameStatus.CHANGING_SHOE:
						if(!m_bSettled){
							m_mcContent.mc_shuffle.visible = true;
						}
						break;
				}
			}else{
				m_mcContent.mc_shuffle.visible = false;
			}
		}
		
		 public initRoad(_sRoad:String):void{
			m_iGameNo = isGameStart()?m_struct.GameNo-1:m_struct.GameNo;
			
			m_road.clearRoad();
			m_road.addRoad(_sRoad);
		}
		
		
	}
}