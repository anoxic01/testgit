module lobby.view.table {
	export class TableBaccarat extends Table{
		
		private m_mcLabel			:	MovieClip;					//桌子名称
		
//		private m_bmpChip			:	Bitmap;						//总筹码数
//		private m_bmpOnline			:	Bitmap;						//在线人数
//		private m_bmpBanker			:	Bitmap;						//下注数据
//		private m_bmpPlayer			:	Bitmap;						//下注数据
//		private m_bmpTie			:	Bitmap;						//下注数据
		
		private m_btnBanker			:	ui.button.SingleButtonMC;				//庄问路
		private m_btnPlayer			:	ui.button.SingleButtonMC;				//闲问路
		
		private m_road				:	TableRoadMapBaccarat;
		
		public constructor() {
			
			m_mcAsset = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_TABLE,"Table_Baccarat_Asset") ;
			this.addChild(m_mcAsset);
			
			m_mcContent = m_mcAsset.mc_content;
			m_mcHot = m_mcAsset.mc_hot;
			
			m_mcAsset.mc_hint.tf_mask.text = "";
			
//			m_mcContent.mc_30.gotoAndStop(1);
//			m_mcContent.mc_30.visible = false;
			
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
			
			m_mcContent.mc_limit.visible = false;
			m_mcContent.mc_limit_vip.visible = false;
			
			m_mcContent.mc_alone.mouseEnabled = false;
			m_mcContent.mc_alone.mouseChildren = false;
			
			
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
//					LobbyManager.getInstance().showDialog(LobbyManager.getInstance().getLanguageString(Language.sGame_Relogin), function():void{
//						m_struct.BetLimitID = tableLoginType.playerTableOwnStatusStruct.CurrBetLimitID;
//						LobbyManager.getInstance().gamePoint = tableLoginType.getGlobalPoint();
//						LobbyManager.getInstance().enterGame(m_struct);	
//					});
//				}else{
//					LobbyManager.getInstance().showLimitBet(m_struct);
//				}
//			});
			
			m_btnBanker = new ui.button.SingleButtonMC(m_mcContent.mc_12, function(evt:MouseEvent):void{
				LobbyManager.getInstance().hideAllPanel();
				SoundManager.getInstance().play(SoundPackage.sClick_Tools);
				m_road.onAskRoad(BacRouteMgr.ASK_MODE_BANKER);
				evt.stopImmediatePropagation();
			});
			m_btnPlayer = new ui.button.SingleButtonMC(m_mcContent.mc_13, function(evt:MouseEvent):void{
				LobbyManager.getInstance().hideAllPanel();
				SoundManager.getInstance().play(SoundPackage.sClick_Tools);
				m_road.onAskRoad(BacRouteMgr.ASK_MODE_PLAYER);
				evt.stopImmediatePropagation();
			});
			m_mcContent.mc_12.mouseChildren = false;
			m_mcContent.mc_13.mouseChildren = false;
			
			//			m_bmpFace = new Bitmap();
			//			m_mcContent.mc_face.addChild(m_bmpFace);
			
			m_road = new TableRoadMapBaccarat(m_mcContent);
			
			m_spstatisticContain = new Sprite();
			m_mcHot.addChild(m_spstatisticContain);
			
			m_panelStatistic = new StatisticsUI(717,0,StatisticsUI.HORIZONTAL);
			m_spstatisticContain.addChild(m_panelStatistic);
			m_panelStatistic.setTypes([Define.BEAD_BANKER,Define.BEAD_PLAYER,Define.BEAD_TIE]);
			m_panelStatistic.setColor([StatisticsUI.RED,StatisticsUI.BLUE,StatisticsUI.GREEN]);
			m_panelStatistic.setIconOffset(10,11);
			m_panelStatistic.setIconVGap(2);
			m_panelStatistic.draw();
			
			super();
			m_spstatisticContain.x -= 2;
			m_Statistic_bottom_offsetY = 19;
		}
		
		 public destroy():void{
			super.destroy();
			
			if(m_mcLabel){
				if(m_mcLabel.parent){
					m_mcLabel.parent.removeChild(m_mcLabel);
				}
				m_mcLabel = null;
			}
			
			if(m_btnBanker){
				m_btnBanker.destroy();
				m_btnBanker = null;
			}
			
			if(m_btnPlayer){
				m_btnPlayer.destroy();
				m_btnPlayer = null;
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
				if(m_mcLabel ){
					if(m_mcLabel.parent){
						m_mcLabel.parent.removeChild(m_mcLabel);
					}
					m_mcLabel = null;
				}
				super.setData(_struct);
				return;
			}
			
			m_bmpIcon.bitmapData = BitmapManager.getInstance().getBmpdTableIcon(_struct.TableType);
			m_bmpIcon.smoothing = true;
			
			//一般,急速,機械手臂
			switch(_struct.TableType){
				case Define.TABLE_TYPE_NORMAL:
					if(m_mcLabel==null){
						m_mcLabel = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_TABLE,"Table_Label_Bac_Asset") ;
					}
					if(tableLoginType==null){
						tableLoginType = new TableLoginNormal(_struct);
					}else{
						tableLoginType.setStruct(_struct);
					}
//					m_mcContent.mc_30.visible = true;
					break;
				
				case Define.TABLE_TYPE_TELBET:
					if(m_mcLabel==null){
						m_mcLabel = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_TABLE,"Table_Label_Bac_Asset") ;
					}
					m_mcContent.mc_limit.visible = true;
					m_mcContent.mc_limit.tf_label.text = getLimit(_struct);
					if(tableLoginType==null){
						tableLoginType = new TableLoginNormal(_struct);
					}else{
						tableLoginType.setStruct(_struct);
					}
					break;
				
				case Define.TABLE_TYPE_SPEEDY:
					if(m_mcLabel==null){
						m_mcLabel = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_TABLE,"Table_Label_Bac_Speed_Asset") ;
					}
					if(tableLoginType==null){
						tableLoginType = new TableLoginNormal(_struct);
					}else{
						tableLoginType.setStruct(_struct);
					}
//					m_mcContent.mc_30.visible = true;
					break;
				
				case Define.TABLE_TYPE_ROBOT:
					if(m_mcLabel==null){
						m_mcLabel = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_TABLE,"Table_Label_Bac_Robot_Asset");
					}
					if(tableLoginType==null){
						tableLoginType = new TableLoginNormal(_struct);
					}else{
						tableLoginType.setStruct(_struct);
					}
//					m_mcContent.mc_30.visible = true;
					break;
								
				case Define.TABLE_TYPE_PEEK:
					if(m_mcLabel==null){
						m_mcLabel = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_TABLE,"Table_Label_Bac_Peek_Asset");
					}
					m_mcContent.mc_limit.visible = true;
					m_mcContent.mc_limit.tf_label.text = getLimit(_struct);
					if(tableLoginType==null){
						tableLoginType = new TableLoginBid(_struct);
					}else{
						tableLoginType.setStruct(_struct);
					}
					break;
				
				case Define.TABLE_TYPE_CHARTER:
					if(m_mcLabel==null){
						m_mcLabel = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_TABLE,"Table_Label_Bac_Charter_Asset") ;
					}
					if(tableLoginType==null){
						tableLoginType = new TableLoginVip(_struct);
						m_mcContent.mc_limit_vip.visible = true;
						m_mcContent.mc_limit_vip.tf_label.text = getLimit(_struct);
					}else{
						tableLoginType.setStruct(_struct);
					}
					break;
			}
			m_mcContent.mc_1.addChild(m_mcLabel);
			
			if(tableLoginType){
				m_mcHot.addChild(tableLoginType);
				tableLoginType.x = -3;
				tableLoginType.y = -14;
//				tableLoginType.init();
			}
			m_bmpTable.bitmapData = BitmapManager.getInstance().numberTable.conversion(_struct.TableID);
			m_bmpTable.smoothing = true;
			m_mcContent.mc_3.x = int(m_mcContent.mc_2.x + m_mcContent.mc_2.width);
			
			super.setData(_struct);
			
			update(true);
			
		}
		
		 public onChangeLanguage():void{
			
			m_mcLabel.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			m_mcContent.mc_2.x = int(m_mcContent.mc_1.x + m_mcContent.mc_1.width);
			m_mcContent.mc_3.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			m_mcContent.mc_3.x = int(m_mcContent.mc_2.x + m_mcContent.mc_2.width);
//			m_bmpTime.x = int(m_mcContent.mc_3.x + m_mcContent.mc_3.width + 50);
			m_mcContent.mc_4.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			m_mcContent.mc_5.x = int(m_mcContent.mc_4.x + m_mcContent.mc_4.width);
			
//			m_mcContent.mc_12.tf_label.text = LobbyManager.getInstance().getLanguageString(Language.sBankerRoute);
//			m_mcContent.mc_13.tf_label.text = LobbyManager.getInstance().getLanguageString(Language.sPlayerRoute);
			m_mcContent.mc_14.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			m_mcContent.mc_16.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			m_mcContent.mc_17.x = int(m_mcContent.mc_16.x + m_mcContent.mc_16.width);
			m_mcContent.mc_18.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			m_mcContent.mc_19.x = int(m_mcContent.mc_18.x + m_mcContent.mc_18.width);
			m_mcContent.mc_20.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			m_mcContent.mc_21.x = int(m_mcContent.mc_20.x + m_mcContent.mc_20.width);
			
			m_mcContent.mc_limit.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			m_mcContent.mc_limit_vip.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			
			m_mcContent.mc_alone.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			
			(m_btnBanker.mcAsset.getChildByName("mc_label") as MovieClip).gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			(m_btnPlayer.mcAsset.getChildByName("mc_label") as MovieClip).gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);

			m_bmpHintShuffle.bitmapData = BitmapManager.getInstance().getBmpdLanguage(LobbyManager.getInstance().lobbyAuth.Lang, Language.sChangeShoe);
			m_bmpHintShuffle.smoothing = true;
			
			m_road.onChangeLanguage();
			
			m_panelStatistic.onChangeLanguage();
			
			updateMaintenanceStatus();
			
			super.onChangeLanguage();
		}
		
		 public update(_bInit: boolean=false):void{
			
			//测试代码
//			m_road.addRoad("a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a");
			if(m_struct.TableID==17){
				console.log("刷新1桌倒计时：",m_iCountDown);
			}
			
			updateRoad(_bInit);
			
			updateCountDown();
			
			m_mcContent.mc_alone.visible = m_struct.IsAlone;
			tableLoginType.updateStatus();
			
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
//						if(m_struct.TableID==37){
//							console.log("1 初始化大厅路纸，游戏局号：>>", m_struct.GameNo, "  RoadMaps:>>",m_struct.RoadMaps, "  LastRoadMap：>> ",m_struct.LastRoadMap);
//						}
					}else{
						if(m_struct.GameNo == (_len+1)){
							if(m_struct.GameStatus!=GameStatus.SETTLED){
								initRoad(m_struct.RoadMaps);
//								if(m_struct.TableID==37){
//									console.log("2 初始化大厅路纸，","游戏靴号：",m_struct.ShoeNo, "游戏状态",m_struct.GameStatus ,"游戏局号：>>", m_struct.GameNo, "  RoadMaps:>>",m_struct.RoadMaps, " length:>>",m_struct.RoadMaps.length ,"  LastRoadMap：>> ",m_struct.LastRoadMap);
//								}
							}else{
								if(m_struct.LastRoadMap.length>0){
									if(m_struct.RoadMaps=="" || m_struct.RoadMaps==null){
										initRoad(m_struct.LastRoadMap);
//										if(m_struct.TableID==37){
//											console.log("3 初始化大厅路纸，游戏局号：>>", m_struct.GameNo, "  RoadMaps:>>",m_struct.RoadMaps, "  LastRoadMap：>> ",m_struct.LastRoadMap);
//										}
									}else{
										initRoad(m_struct.RoadMaps+"."+m_struct.LastRoadMap);
										m_iGameNo = m_struct.GameNo;
//										if(m_struct.TableID==37){
//											console.log("4 初始化大厅路纸，游戏局号：>>", m_struct.GameNo, "  RoadMaps:>>",m_struct.RoadMaps, "  LastRoadMap：>> ",m_struct.LastRoadMap);
//										}
									}
								}else{
									LobbyManager.getInstance().getRoadmapReqInfo([m_struct.TableID]);
//									if(m_struct.TableID==37){
//										console.log("5 初始化大厅路纸，游戏局号：>>", m_struct.GameNo, "  RoadMaps:>>",m_struct.RoadMaps, "  length:>> ",m_struct.RoadMaps.length);
//										
//									}
								}
							}
						}else{
							LobbyManager.getInstance().getRoadmapReqInfo([m_struct.TableID]);
//							if(m_struct.TableID==37){
//								console.log("6 初始化大厅路纸","游戏靴号：",m_struct.ShoeNo, "游戏状态",m_struct.GameStatus,"游戏局号：>>", m_struct.GameNo, "  RoadMaps:>>",m_struct.RoadMaps, "  length:>> ",m_struct.RoadMaps.length);
//							}
						}
					}
				}else{
					if(m_struct.GameStatus==GameStatus.SETTLED && m_iGameNo!=m_struct.GameNo && m_struct.GameNo!=0){
						if(m_struct.LastRoadMap!=null && m_struct.LastRoadMap!=""){
							m_iGameNo = m_struct.GameNo;
							m_road.addRoad(m_struct.LastRoadMap);
//							if(m_struct.TableID==37){
//								console.log("游戏局号：>>", m_struct.GameNo, "  更新路纸：>> ",m_struct.LastRoadMap);
//							}
						}
					}
				}
			}
		}
		
		 public updateStaticsInfo():void{
			
			//			m_bmpChip.bitmapData = BitmapManager.getInstance().numberChip.conversion(m_struct.staticsInfo.TotalBet);
			//			m_bmpChip.smoothing = true;
			m_mcContent.tf_7.text = m_struct.StaticsInfo.TotalBet.toString() + "/" + m_struct.StaticsInfo.TotalBetCnt.toString();
			m_mcContent.tf_9.text = (m_struct.StaticsInfo as StaticsInfoBaccarat).BankerBetAmt.toString() + "/" + (m_struct.StaticsInfo as StaticsInfoBaccarat).BankerBetCnt.toString();
			m_mcContent.tf_10.text = (m_struct.StaticsInfo as StaticsInfoBaccarat).PlayerBetAmt.toString() + "/" + (m_struct.StaticsInfo as StaticsInfoBaccarat).PlayerBetCnt.toString();
			m_mcContent.tf_11.text = (m_struct.StaticsInfo as StaticsInfoBaccarat).TieBetAmt.toString() + "/" + (m_struct.StaticsInfo as StaticsInfoBaccarat).TieBetCnt.toString();
			//			m_bmpOnline.bitmapData = BitmapManager.getInstance().numberOnline.conversion(m_struct.OnlinePlayers);
			//			m_bmpOnline.smoothing = true;
			//			m_bmpBanker.bitmapData = BitmapManager.getInstance().numberBet.conversionSlash((m_struct.staticsInfo as StaticsInfoBaccarat).BankerBetAmt, (m_struct.staticsInfo as StaticsInfoBaccarat).BankerBetCnt);
			//			m_bmpBanker.smoothing = true;
			//			m_bmpPlayer.bitmapData = BitmapManager.getInstance().numberBet.conversionSlash((m_struct.staticsInfo as StaticsInfoBaccarat).PlayerBetAmt, (m_struct.staticsInfo as StaticsInfoBaccarat).PlayerBetCnt);
			//			m_bmpPlayer.smoothing = true;
			//			m_bmpTie.bitmapData = BitmapManager.getInstance().numberBet.conversionSlash((m_struct.staticsInfo as StaticsInfoBaccarat).TieBetAmt, (m_struct.staticsInfo as StaticsInfoBaccarat).TieBetCnt);
			//			m_bmpTie.smoothing = true;
			
			//测试代码
			if(m_struct.TableID==10){
				var a:number= m_struct.TableID;
			}
			m_mcContent.tf_0.text = (m_struct.StaticsInfo as StaticsInfoBaccarat).BankerWinCnt.toString();
			m_mcContent.tf_1.text = (m_struct.StaticsInfo as StaticsInfoBaccarat).PlayerWinCnt.toString();
			m_mcContent.tf_2.text = (m_struct.StaticsInfo as StaticsInfoBaccarat).TieWinCnt.toString();
			m_mcContent.tf_3.text = (m_struct.StaticsInfo as StaticsInfoBaccarat).BigWinCnt.toString();
			m_mcContent.tf_4.text = (m_struct.StaticsInfo as StaticsInfoBaccarat).SmallWinCnt.toString();
			m_mcContent.tf_5.text = (m_struct.StaticsInfo as StaticsInfoBaccarat).BankerPairWinCnt.toString();
			m_mcContent.tf_6.text = (m_struct.StaticsInfo as StaticsInfoBaccarat).PlayerPairWinCnt.toString();
			
			m_panelStatistic.updateValues([(m_struct.StaticsInfo as StaticsInfoBaccarat).BankerWinCnt, (m_struct.StaticsInfo as StaticsInfoBaccarat).PlayerWinCnt, (m_struct.StaticsInfo as StaticsInfoBaccarat).TieWinCnt]);
			
		}
		
		//更新维护状态
		 public updateMaintenanceStatus():void{
			//测试代码
			if(struct.TableID==31){
			//	console.log("测试代码");
			}
			if(struct.IsMaintaining){
				updateHint( Language.sMaintenance);
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
					updateHint( Language.sNoTrial);
					showMaintain();
				}
			}else{
				otherCheck();
			}
		}
		
		protected otherCheck():void{
			if(struct.TableID==12){
//				console.log("struct.TableID>> ",struct.TableID, struct.GameNo, struct.IsChangingShoe, struct.GameStatus, struct.RoadMaps, struct.LastRoadMap);
			}
			if(isNotFinish()){
				//游戏未完成
				m_bNotFinished = true;
				updateHint( Language.sMaintenance);
				showMaintain();
			}else if(!isHaveDealer()){
				//没有荷官
				updateHint( Language.sMaintenance);
				showMaintain();
			}else if(m_road.bError){
				//路纸出错
				updateHint( Language.sMaintenance);
				showMaintain();
			}else if(m_struct.IsPaused){
				//桌子维护 
				updateHint( Language.sMaintenance);
				showMaintain();
			}else if(m_struct.IsAlone){
				//独享
				if(tableLoginType.playerTableOwnStatusStruct && tableLoginType.playerTableOwnStatusStruct.IsTableOwner && tableLoginType.playerTableOwnStatusStruct.PlayerID==Player.getInstance().iPlayerID){
					m_mcContent.mc_alone.visible = false;
				}else{
					m_mcContent.mc_alone.visible = m_mcAsset.mc_hint.visible?false:true;
					hideStatistics();
				}
				
				if(tableLoginType.IsTableOwnerLeave()){//逾时踢出
					updateHint( Language.sOwnerLeave);
					m_mcContent.mc_alone.visible = false;
				}else{
					hideMaintain();
				}
				
				this.mouseEnabled = !m_mcContent.mc_alone.visible;
				this.mouseChildren = !m_mcContent.mc_alone.visible;
				m_mcAsset.mc_mask.visible = false;
			}else if(tableLoginType.IsTableOwnerLeave()){
				updateHint( Language.sOwnerLeave);
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
					default:
						console.log("");
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
		
		 get road():Object{
			return m_road;
		}
		
		private getLimit(_struct:TableStruct):String{
			var _limitStruct : BetLimitStruct = LobbyData.getInstance().getBetLimitByGL(_struct.GameID, _struct.BetLimitID);
			var _sLimit	: String;
			if(_limitStruct){
				_sLimit = _limitStruct.MinLimit.toString() + "-" + _limitStruct.MaxLimit.toString();
			}else{
				_sLimit = "0-0";
			}
			return _sLimit;
		}
		
		 set  setBetLimitVisible(_bValue: boolean) {
			tableLoginType.setBetLimitVisible = _bValue;
		}		
		
		//游戏进行中
		 public isGameStart(): boolean{
			// 如果游戏处于下注或者发牌阶段，说明游戏已经开始
			switch(m_struct.GameStatus){
				case GameStatus.BETTING:
				case GameStatus.DEALING:
				case GameStatus.SETTLING:
				case GameStatus.FIRST_PEEK:
				case GameStatus.PLAYER_SECOND_PEEK:
				case GameStatus.BANKER_SECOND_PEEK:
					return true;
			}
			return false;
		}
	}
}