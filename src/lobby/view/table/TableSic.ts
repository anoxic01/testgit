module lobby.view.table {
	export class TableSic extends Table{
//		private m_btmChip		:	Bitmap;						//总筹码数
//		private m_bmpOnline		:	Bitmap;						//在线人数
//		private m_bmpBig		:	Bitmap;						//下注数据
//		private m_bmpSmall		:	Bitmap;						//下注数据
//		private m_bmpOdd		:	Bitmap;						//下注数据
//		private m_bmpDouble		:	Bitmap;						//下注数据
		
		private m_btnOddEven		:	ButtonMcLanguage;			//单双
		private m_btnBigSmall		:	ButtonMcLanguage;			//大小
		private m_btnTie			:	ButtonMcLanguage;			//和值
		private m_btnBead			:	ButtonMcLanguage;			//珠仔
		private m_btnCurrent		:	ButtonMcLanguage;			//当前
		
		private m_road				:	TableRoadMapSic;			//路子
		
		private m_panelStatistic_1	:	StatisticsUI;				//统计面板
		
		public constructor() {
			super();
		
			m_mcAsset = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_TABLE,"Table_Sic_Asset");
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
			TextUtils.setEmbedFont(m_mcContent.tf_12);
			
			if(m_mcContent.mc_limit)TextUtils.setEmbedFont(m_mcContent.mc_limit.tf_label);
			if(m_mcContent.mc_limit_vip)TextUtils.setEmbedFont(m_mcContent.mc_limit_vip.tf_label);
//			m_btmChip = new Bitmap();
//			m_mcContent.mc_5.addChild(m_btmChip);
//			
//			m_bmpOnline = new Bitmap();
//			m_mcContent.mc_15.addChild(m_bmpOnline);
//			
//			m_bmpOnline = new Bitmap();
//			m_mcContent.mc_15.addChild(m_bmpOnline);
//			
//			m_bmpBig = new Bitmap();
//			m_mcContent.mc_17.addChild(m_bmpBig);
//			
//			m_bmpSmall = new Bitmap();
//			m_mcContent.mc_19.addChild(m_bmpSmall);
//			
//			m_bmpOdd = new Bitmap();
//			m_mcContent.mc_21.addChild(m_bmpOdd);
//			
//			m_bmpDouble = new Bitmap();
//			m_mcContent.mc_23.addChild(m_bmpDouble);
			
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
			
			m_btnBigSmall = new ButtonMcLanguage(m_mcContent.mc_7, (evt:MouseEvent):void{
				LobbyManager.getInstance().hideAllPanel();
				SoundManager.getInstance().play(SoundPackage.sClick_Tools);
				m_btnCurrent.setSelectedStatus(false);
				m_btnCurrent = m_btnBigSmall;
				m_btnCurrent.setSelectedStatus(true);
				if(m_road){
					m_road.changeRoad(SicRoadType.BIG_SMALL);
				}
				evt.stopImmediatePropagation();
			});
			
			m_btnOddEven = new ButtonMcLanguage(m_mcContent.mc_8, (evt:MouseEvent):void{
				LobbyManager.getInstance().hideAllPanel();
				SoundManager.getInstance().play(SoundPackage.sClick_Tools);
				m_btnCurrent.setSelectedStatus(false);
				m_btnCurrent = m_btnOddEven;
				m_btnCurrent.setSelectedStatus(true);
				if(m_road){
					m_road.changeRoad(SicRoadType.ODD_EVEN);
				}
				evt.stopImmediatePropagation();
			});
			
			m_btnTie = new ButtonMcLanguage(m_mcContent.mc_9, (evt:MouseEvent):void{
				LobbyManager.getInstance().hideAllPanel();
				SoundManager.getInstance().play(SoundPackage.sClick_Tools);
				m_btnCurrent.setSelectedStatus(false);
				m_btnCurrent = m_btnTie;
				m_btnCurrent.setSelectedStatus(true);
				if(m_road){
					m_road.changeRoad(SicRoadType.TIE);
				}
				evt.stopImmediatePropagation();
			});
			m_btnBead = new ButtonMcLanguage(m_mcContent.mc_10, (evt:MouseEvent):void{
				LobbyManager.getInstance().hideAllPanel();
				SoundManager.getInstance().play(SoundPackage.sClick_Tools);
				m_btnCurrent.setSelectedStatus(false);
				m_btnCurrent = m_btnBead;
				m_btnCurrent.setSelectedStatus(true);
				if(m_road){
					m_road.changeRoad(SicRoadType.BEAD);
				}
				evt.stopImmediatePropagation();
			});
			
			m_road = new TableRoadMapSic(m_mcContent);
			
			m_btnCurrent = m_btnBigSmall;
			m_btnCurrent.setSelectedStatus(true);
			m_road.changeRoad(SicRoadType.BIG_SMALL);
			
			//			m_bmpFace = new Bitmap();
			//			m_mcContent.mc_face.addChild(m_bmpFace);
			
			m_spstatisticContain = new Sprite();
			m_mcHot.addChild(m_spstatisticContain);
			
			m_panelStatistic = new StatisticsUI(358.5,0,StatisticsUI.HORIZONTAL,new Rectangle(0,0,9,0));
			m_spstatisticContain.addChild(m_panelStatistic);
			m_panelStatistic.setTypes([Define.BEAD_BIG_DZ,Define.BEAD_SMALL_DZ, Define.BEAD_WEI_DZ]);
			m_panelStatistic.setColor([StatisticsUI.RED,StatisticsUI.BLUE, StatisticsUI.GREEN]);
			m_panelStatistic.setIconOffset(10,11);
			m_panelStatistic.setIconVGap(2);
			m_panelStatistic.draw();
			
			m_panelStatistic_1 = new StatisticsUI(359,0,StatisticsUI.HORIZONTAL,new Rectangle(0,0,0,0));
			m_spstatisticContain.addChild(m_panelStatistic_1);
			m_panelStatistic_1.setTypes([Define.BEAD_DAN_DZ, Define.BEAD_SHUANG_DZ]);
			m_panelStatistic_1.setColor([StatisticsUI.BLUE,StatisticsUI.RED]);
			m_panelStatistic_1.setIconOffset(10,11);
			m_panelStatistic_1.setIconVGap(2);
			m_panelStatistic_1.draw();
			m_panelStatistic_1.x = 358;
			
			super();
			m_spStatisticMask.x -= 1;
			m_spstatisticContain.x -= 2;
			
			m_Statistic_topY -= 1;
			m_Statistic_bottomY += 3;
			m_spStatisticMask.y = m_Statistic_topY;
			m_spstatisticContain.y = m_Statistic_bottomY;
		}
		 public destroy():void{
			super.destroy();
			
			if(m_btnCurrent){
				m_btnCurrent = null;
			}
			if(m_btnOddEven){
				m_btnOddEven.destroy();
				m_btnOddEven = null;
			}
			if(m_btnBigSmall){
				m_btnBigSmall.destroy();
				m_btnBigSmall = null;
			}
			if(m_btnTie){
				m_btnTie.destroy();
				m_btnTie = null;
			}
			if(m_btnBead){
				m_btnBead.destroy();
				m_btnBead = null;
			}
			
			if(m_road){
				m_road.destroy();
				m_road = null;
			}
			if(m_panelStatistic_1)
			{
				m_panelStatistic_1.parent.removeChild(m_panelStatistic_1);
				m_panelStatistic_1.destroy();
				m_panelStatistic_1=null;
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
			
			m_bmpIcon.bitmapData = BitmapManager.getInstance().getBmpdTableIcon(Define.TABLE_TYPE_SIC);
			m_bmpIcon.smoothing = true;
			
			m_bmpTable.bitmapData = BitmapManager.getInstance().numberTable.conversion(_struct.TableID);
			m_bmpTable.smoothing = true;
			m_mcContent.mc_3.x = int(m_mcContent.mc_2.x + m_mcContent.mc_2.width);
			
			if(tableLoginType==null){
				tableLoginType = new TableLoginNormal(_struct);
				m_mcHot.addChild(tableLoginType);
				tableLoginType.x = -1;
				tableLoginType.y = 2;
//				tableLoginType.init();
			}
			
			super.setData(_struct);
			
			update(true);
//			m_mcContent.mc_6.tf_label.text = m_struct.DealerName?m_struct.DealerName:"";
			
		}
		 public onChangeLanguage():void{
			
			m_mcContent.mc_1.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			m_mcContent.mc_2.x = m_mcContent.mc_1.x + m_mcContent.mc_1.width;
			m_mcContent.mc_3.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			m_mcContent.mc_3.x = int(m_mcContent.mc_2.x + m_mcContent.mc_2.width);
//			m_bmpTime.x = int(m_mcContent.mc_3.x + m_mcContent.mc_3.width + 50);
			m_mcContent.mc_4.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			m_mcContent.mc_5.x = int(m_mcContent.mc_4.x + m_mcContent.mc_4.width);
			m_mcContent.mc_16.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			m_mcContent.mc_17.x = int(m_mcContent.mc_16.x + m_mcContent.mc_16.width);
			m_mcContent.mc_18.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			m_mcContent.mc_19.x = int(m_mcContent.mc_18.x + m_mcContent.mc_18.width);
			m_mcContent.mc_20.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			m_mcContent.mc_21.x = int(m_mcContent.mc_20.x + m_mcContent.mc_20.width);
			m_mcContent.mc_22.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			m_mcContent.mc_23.x = int(m_mcContent.mc_22.x + m_mcContent.mc_22.width);
			
			m_btnOddEven.onChangeLanguage(LobbyManager.getInstance().lobbyAuth.Lang+1);
			m_btnBigSmall.onChangeLanguage(LobbyManager.getInstance().lobbyAuth.Lang+1);
			m_btnTie.onChangeLanguage(LobbyManager.getInstance().lobbyAuth.Lang+1);
			m_btnBead.onChangeLanguage(LobbyManager.getInstance().lobbyAuth.Lang+1);
			
			m_bmpHintShuffle.bitmapData = BitmapManager.getInstance().getBmpdLanguage(LobbyManager.getInstance().lobbyAuth.Lang, Language.sChangeShoe);
			m_bmpHintShuffle.smoothing = true;
			
			m_road.onChangeLanguage();
			
			m_panelStatistic.onChangeLanguage();
			m_panelStatistic_1.onChangeLanguage();
			
			updateMaintenanceStatus();
			
			super.onChangeLanguage();
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
			
			m_mcContent.tf_7.text = m_struct.StaticsInfo.TotalBet.toString() + "/" + m_struct.StaticsInfo.TotalBetCnt.toString();
			m_mcContent.tf_9.text = (m_struct.StaticsInfo as StaticsInfoSic).BigBetAmt.toString() + "/" + (m_struct.StaticsInfo as StaticsInfoSic).BigBetCnt.toString();
			m_mcContent.tf_10.text = (m_struct.StaticsInfo as StaticsInfoSic).SmallBetAmt.toString() + "/" + (m_struct.StaticsInfo as StaticsInfoSic).SmallBetCnt.toString();
			m_mcContent.tf_11.text = (m_struct.StaticsInfo as StaticsInfoSic).OddBetAmt.toString() + "/" + (m_struct.StaticsInfo as StaticsInfoSic).OddBetCnt.toString();
			m_mcContent.tf_12.text = (m_struct.StaticsInfo as StaticsInfoSic).EvenBetAmt.toString() + "/" + (m_struct.StaticsInfo as StaticsInfoSic).EvenBetCnt.toString();
			
			
			//			m_btmChip.bitmapData = BitmapManager.getInstance().numberChip.conversion(m_struct.staticsInfo.TotalBet);
			//			m_btmChip.smoothing = true;
			//			m_bmpOnline.bitmapData = BitmapManager.getInstance().numberOnline.conversion(m_struct.OnlinePlayers);
			//			m_bmpOnline.smoothing = true;
			//			m_bmpBig.bitmapData = BitmapManager.getInstance().numberBet.conversionSlash((m_struct.staticsInfo as StaticsInfoSic).BigBetAmt, (m_struct.staticsInfo as StaticsInfoSic).BigBetCnt);
			//			m_bmpBig.smoothing = true;
			//			m_bmpSmall.bitmapData = BitmapManager.getInstance().numberBet.conversionSlash((m_struct.staticsInfo as StaticsInfoSic).SmallBetAmt, (m_struct.staticsInfo as StaticsInfoSic).SmallBetCnt);
			//			m_bmpSmall.smoothing = true;
			//			m_bmpOdd.bitmapData = BitmapManager.getInstance().numberBet.conversionSlash((m_struct.staticsInfo as StaticsInfoSic).OddBetAmt, (m_struct.staticsInfo as StaticsInfoSic).OddBetCnt);
			//			m_bmpOdd.smoothing = true;
			//			m_bmpDouble.bitmapData = BitmapManager.getInstance().numberBet.conversionSlash((m_struct.staticsInfo as StaticsInfoSic).EvenBetAmt, (m_struct.staticsInfo as StaticsInfoSic).EvenBetCnt);
			//			m_bmpDouble.smoothing = true;
			
			m_panelStatistic.updateValues([(m_struct.StaticsInfo as StaticsInfoSic).BigWinCnt, (m_struct.StaticsInfo as StaticsInfoSic).SmallWinCnt, (m_struct.StaticsInfo as StaticsInfoSic).TripleX24WinCnt]);
			m_panelStatistic_1.updateValues([(m_struct.StaticsInfo as StaticsInfoSic).OddWinCnt, (m_struct.StaticsInfo as StaticsInfoSic).EvenWinCnt]);
			
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