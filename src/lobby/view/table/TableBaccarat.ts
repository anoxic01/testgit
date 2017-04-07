module lobby.view.table {
	export class TableBaccarat extends Table{
		
		private m_mcLabel			;					//桌子名称
		
//		private m_bmpChip			:	Bitmap;						//总筹码数
//		private m_bmpOnline			:	Bitmap;						//在线人数
//		private m_bmpBanker			:	Bitmap;						//下注数据
//		private m_bmpPlayer			:	Bitmap;						//下注数据
//		private m_bmpTie			:	Bitmap;						//下注数据
		
		private m_btnBanker			:	ui.button.SingleButtonMC;				//庄问路
		private m_btnPlayer			:	ui.button.SingleButtonMC;				//闲问路
		
		private m_road				;
		
		public constructor() {
			super();
			this.m_mcAsset = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_TABLE,"Table_Baccarat_Asset") ;
			this.addChild(this.m_mcAsset);
			
			this.m_mcContent = this.m_mcAsset.mc_content;
			this.m_mcHot = this.m_mcAsset.mc_hot;
			
			this.m_mcAsset.mc_hint.tf_mask.text = "";
			
//			this.m_mcContent.mc_30.gotoAndStop(1);
//			this.m_mcContent.mc_30.visible = false;
			
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
			
			this.m_mcContent.mc_limit.visible = false;
			this.m_mcContent.mc_limit_vip.visible = false;
			
			this.m_mcContent.mc_alone.touchEnabled = false;
			this.m_mcContent.mc_alone.touchChildren = false;
			
			
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
//					manager.LobbyManager.getInstance().showDialog(manager.LobbyManager.getInstance().getLanguageString(language.Language.sGame_Relogin), function():void{
//						this.m_struct.BetLimitID = this.tableLoginType.playerTableOwnStatusStruct.CurrBetLimitID;
//						manager.LobbyManager.getInstance().gamePoint = this.tableLoginType.getGlobalPoint();
//						manager.LobbyManager.getInstance().enterGame(this.m_struct);	
//					});
//				}else{
//					manager.LobbyManager.getInstance().showLimitBet(this.m_struct);
//				}
//			});
			
			this.m_btnBanker = new ui.button.SingleButtonMC(this.m_mcContent.mc_12, function(evt:MouseEvent):void{
				manager.LobbyManager.getInstance().hideAllPanel();
				manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
				this.m_road.onAskRoad(route.game.bac.BacRouteMgr.ASK_MODE_BANKER);
				evt.stopImmediatePropagation();
			});
			this.m_btnPlayer = new ui.button.SingleButtonMC(this.m_mcContent.mc_13, function(evt:MouseEvent):void{
				manager.LobbyManager.getInstance().hideAllPanel();
				manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
				this.m_road.onAskRoad(route.game.bac.BacRouteMgr.ASK_MODE_PLAYER);
				evt.stopImmediatePropagation();
			});
			this.m_mcContent.mc_12.touchChildren = false;
			this.m_mcContent.mc_13.touchChildren = false;
			
			//			m_bmpFace = new egret.Bitmap();
			//			this.m_mcContent.mc_face.addChild(m_bmpFace);
			
			this.m_road = new route.TableRoadMapBaccarat(this.m_mcContent);
			
			this.m_spstatisticContain = new egret.Sprite();
			this.m_mcHot.addChild(this.m_spstatisticContain);
			
			this.m_panelStatistic = new route.StatisticsUI(717,0,route.StatisticsUI.HORIZONTAL);
			this.m_spstatisticContain.addChild(this.m_panelStatistic);
			this.m_panelStatistic.setTypes([define.Define.BEAD_BANKER,define.Define.BEAD_PLAYER,define.Define.BEAD_TIE]);
			this.m_panelStatistic.setColor([route.StatisticsUI.RED,route.StatisticsUI.BLUE,route.StatisticsUI.GREEN]);
			this.m_panelStatistic.setIconOffset(10,11);
			this.m_panelStatistic.setIconVGap(2);
			this.m_panelStatistic.draw();
			
			super();
			this.m_spstatisticContain.x -= 2;
			this.m_Statistic_bottom_offsetY = 19;
		}
		
		 public destroy():void{
			super.destroy();
			
			if(this.m_mcLabel){
				if(this.m_mcLabel.parent){
					this.m_mcLabel.parent.removeChild(this.m_mcLabel);
				}
				this.m_mcLabel = null;
			}
			
			if(this.m_btnBanker){
				this.m_btnBanker.destroy();
				this.m_btnBanker = null;
			}
			
			if(this.m_btnPlayer){
				this.m_btnPlayer.destroy();
				this.m_btnPlayer = null;
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
				if(this.m_mcLabel ){
					if(this.m_mcLabel.parent){
						this.m_mcLabel.parent.removeChild(this.m_mcLabel);
					}
					this.m_mcLabel = null;
				}
				super.setData(_struct);
				return;
			}
			
			this.m_bmpIcon.bitmapData = manager.BitmapManager.getInstance().getBmpdTableIcon(_struct.TableType);
			this.m_bmpIcon.smoothing = true;
			
			//一般,急速,機械手臂
			switch(_struct.TableType){
				case define.Define.TABLE_TYPE_NORMAL:
					if(this.m_mcLabel==null){
						this.m_mcLabel = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_TABLE,"Table_Label_Bac_Asset") ;
					}
					if(this.tableLoginType==null){
						this.tableLoginType = new TableLoginNormal(_struct);
					}else{
						this.tableLoginType.setStruct(_struct);
					}
//					this.m_mcContent.mc_30.visible = true;
					break;
				
				case define.Define.TABLE_TYPE_TELBET:
					if(this.m_mcLabel==null){
						this.m_mcLabel = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_TABLE,"Table_Label_Bac_Asset") ;
					}
					this.m_mcContent.mc_limit.visible = true;
					this.m_mcContent.mc_limit.tf_label.text = this.getLimit(_struct);
					if(this.tableLoginType==null){
						this.tableLoginType = new TableLoginNormal(_struct);
					}else{
						this.tableLoginType.setStruct(_struct);
					}
					break;
				
				case define.Define.TABLE_TYPE_SPEEDY:
					if(this.m_mcLabel==null){
						this.m_mcLabel = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_TABLE,"Table_Label_Bac_Speed_Asset") ;
					}
					if(this.tableLoginType==null){
						this.tableLoginType = new TableLoginNormal(_struct);
					}else{
						this.tableLoginType.setStruct(_struct);
					}
//					this.m_mcContent.mc_30.visible = true;
					break;
				
				case define.Define.TABLE_TYPE_ROBOT:
					if(this.m_mcLabel==null){
						this.m_mcLabel = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_TABLE,"Table_Label_Bac_Robot_Asset");
					}
					if(this.tableLoginType==null){
						this.tableLoginType = new TableLoginNormal(_struct);
					}else{
						this.tableLoginType.setStruct(_struct);
					}
//					this.m_mcContent.mc_30.visible = true;
					break;
								
				case define.Define.TABLE_TYPE_PEEK:
					if(this.m_mcLabel==null){
						this.m_mcLabel = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_TABLE,"Table_Label_Bac_Peek_Asset");
					}
					this.m_mcContent.mc_limit.visible = true;
					this.m_mcContent.mc_limit.tf_label.text = this.getLimit(_struct);
					if(this.tableLoginType==null){
						this.tableLoginType = new TableLoginBid(_struct);
					}else{
						this.tableLoginType.setStruct(_struct);
					}
					break;
				
				case define.Define.TABLE_TYPE_CHARTER:
					if(this.m_mcLabel==null){
						this.m_mcLabel = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_TABLE,"Table_Label_Bac_Charter_Asset") ;
					}
					if(this.tableLoginType==null){
						this.tableLoginType = new TableLoginVip(_struct);
						this.m_mcContent.mc_limit_vip.visible = true;
						this.m_mcContent.mc_limit_vip.tf_label.text = this.getLimit(_struct);
					}else{
						this.tableLoginType.setStruct(_struct);
					}
					break;
			}
			this.m_mcContent.mc_1.addChild(this.m_mcLabel);
			
			if(this.tableLoginType){
				this.m_mcHot.addChild(this.tableLoginType);
				this.tableLoginType.x = -3;
				this.tableLoginType.y = -14;
//				this.tableLoginType.init();
			}
			this.m_bmpTable.bitmapData = manager.BitmapManager.getInstance().numberTable.conversion(_struct.TableID);
			this.m_bmpTable.smoothing = true;
			this.m_mcContent.mc_3.x = (this.m_mcContent.mc_2.x + this.m_mcContent.mc_2.width);
			
			super.setData(_struct);
			
			this.update(true);
			
		}
		
		 public onChangeLanguage():void{
			
			this.m_mcLabel.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			this.m_mcContent.mc_2.x = (this.m_mcContent.mc_1.x + this.m_mcContent.mc_1.width);
			this.m_mcContent.mc_3.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			this.m_mcContent.mc_3.x = (this.m_mcContent.mc_2.x + this.m_mcContent.mc_2.width);
//			m_bmpTime.x = int(this.m_mcContent.mc_3.x + this.m_mcContent.mc_3.width + 50);
			this.m_mcContent.mc_4.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			this.m_mcContent.mc_5.x = (this.m_mcContent.mc_4.x + this.m_mcContent.mc_4.width);
			
//			this.m_mcContent.mc_12.tf_label.text = manager.LobbyManager.getInstance().getLanguageString(language.Language.sBankerRoute);
//			this.m_mcContent.mc_13.tf_label.text = manager.LobbyManager.getInstance().getLanguageString(language.Language.sPlayerRoute);
			this.m_mcContent.mc_14.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			this.m_mcContent.mc_16.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			this.m_mcContent.mc_17.x = (this.m_mcContent.mc_16.x + this.m_mcContent.mc_16.width);
			this.m_mcContent.mc_18.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			this.m_mcContent.mc_19.x = (this.m_mcContent.mc_18.x + this.m_mcContent.mc_18.width);
			this.m_mcContent.mc_20.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			this.m_mcContent.mc_21.x = (this.m_mcContent.mc_20.x + this.m_mcContent.mc_20.width);
			
			this.m_mcContent.mc_limit.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			this.m_mcContent.mc_limit_vip.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			
			this.m_mcContent.mc_alone.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			
			(this.m_btnBanker.mcAsset.getChildByName("mc_label")).gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			(this.m_btnPlayer.mcAsset.getChildByName("mc_label")).gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);

			this.m_bmpHintShuffle.bitmapData = manager.BitmapManager.getInstance().getBmpdLanguage(manager.LobbyManager.getInstance().lobbyAuth.Lang, language.Language.sChangeShoe);
			this.m_bmpHintShuffle.smoothing = true;
			
			this.m_road.onChangeLanguage();
			
			this.m_panelStatistic.onChangeLanguage();
			
			this.updateMaintenanceStatus();
			
			super.onChangeLanguage();
		}
		
		 public update(_bInit: boolean=false):void{
			
			//测试代码
//			this.m_road.addRoad("a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a");
			if(this.m_struct.TableID==17){
				console.log("刷新1桌倒计时：",this.m_iCountDown);
			}
			
			this.updateRoad(_bInit);
			
			this.updateCountDown();
			
			this.m_mcContent.mc_alone.visible = this.m_struct.IsAlone;
			this.tableLoginType.updateStatus();
			
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
//						if(this.m_struct.TableID==37){
//							console.log("1 初始化大厅路纸，游戏局号：>>", this.m_struct.GameNo, "  RoadMaps:>>",this.m_struct.RoadMaps, "  LastRoadMap：>> ",this.m_struct.LastRoadMap);
//						}
					}else{
						if(this.m_struct.GameNo == (_len+1)){
							if(this.m_struct.GameStatus!=model.status.GameStatus.SETTLED){
								this.initRoad(this.m_struct.RoadMaps);
//								if(this.m_struct.TableID==37){
//									console.log("2 初始化大厅路纸，","游戏靴号：",this.m_struct.ShoeNo, "游戏状态",this.m_struct.GameStatus ,"游戏局号：>>", this.m_struct.GameNo, "  RoadMaps:>>",this.m_struct.RoadMaps, " length:>>",this.m_struct.RoadMaps.length ,"  LastRoadMap：>> ",this.m_struct.LastRoadMap);
//								}
							}else{
								if(this.m_struct.LastRoadMap.length>0){
									if(this.m_struct.RoadMaps=="" || this.m_struct.RoadMaps==null){
										this.initRoad(this.m_struct.LastRoadMap);
//										if(this.m_struct.TableID==37){
//											console.log("3 初始化大厅路纸，游戏局号：>>", this.m_struct.GameNo, "  RoadMaps:>>",this.m_struct.RoadMaps, "  LastRoadMap：>> ",this.m_struct.LastRoadMap);
//										}
									}else{
										this.initRoad(this.m_struct.RoadMaps+"."+this.m_struct.LastRoadMap);
										this.m_iGameNo = this.m_struct.GameNo;
//										if(this.m_struct.TableID==37){
//											console.log("4 初始化大厅路纸，游戏局号：>>", this.m_struct.GameNo, "  RoadMaps:>>",this.m_struct.RoadMaps, "  LastRoadMap：>> ",this.m_struct.LastRoadMap);
//										}
									}
								}else{
									manager.LobbyManager.getInstance().getRoadmapReqInfo([this.m_struct.TableID]);
//									if(this.m_struct.TableID==37){
//										console.log("5 初始化大厅路纸，游戏局号：>>", this.m_struct.GameNo, "  RoadMaps:>>",this.m_struct.RoadMaps, "  length:>> ",this.m_struct.RoadMaps.length);
//										
//									}
								}
							}
						}else{
							manager.LobbyManager.getInstance().getRoadmapReqInfo([this.m_struct.TableID]);
//							if(this.m_struct.TableID==37){
//								console.log("6 初始化大厅路纸","游戏靴号：",this.m_struct.ShoeNo, "游戏状态",this.m_struct.GameStatus,"游戏局号：>>", this.m_struct.GameNo, "  RoadMaps:>>",this.m_struct.RoadMaps, "  length:>> ",this.m_struct.RoadMaps.length);
//							}
						}
					}
				}else{
					if(this.m_struct.GameStatus==model.status.GameStatus.SETTLED && this.m_iGameNo!=this.m_struct.GameNo && this.m_struct.GameNo!=0){
						if(this.m_struct.LastRoadMap!=null && this.m_struct.LastRoadMap!=""){
							this.m_iGameNo = this.m_struct.GameNo;
							this.m_road.addRoad(this.m_struct.LastRoadMap);
//							if(this.m_struct.TableID==37){
//								console.log("游戏局号：>>", this.m_struct.GameNo, "  更新路纸：>> ",this.m_struct.LastRoadMap);
//							}
						}
					}
				}
			}
		}
		
		 public updateStaticsInfo():void{
			
			//			m_bmpChip.bitmapData = manager.BitmapManager.getInstance().numberChip.conversion(this.m_struct.staticsInfo.TotalBet);
			//			m_bmpChip.smoothing = true;
			this.m_mcContent.tf_7.text = this.m_struct.StaticsInfo.TotalBet.toString() + "/" + this.m_struct.StaticsInfo.TotalBetCnt.toString();
			this.m_mcContent.tf_9.text = (this.m_struct.StaticsInfo ).BankerBetAmt.toString() + "/" + (this.m_struct.StaticsInfo ).BankerBetCnt.toString();
			this.m_mcContent.tf_10.text = (this.m_struct.StaticsInfo ).PlayerBetAmt.toString() + "/" + (this.m_struct.StaticsInfo ).PlayerBetCnt.toString();
			this.m_mcContent.tf_11.text = (this.m_struct.StaticsInfo ).TieBetAmt.toString() + "/" + (this.m_struct.StaticsInfo ).TieBetCnt.toString();
			//			m_bmpOnline.bitmapData = manager.BitmapManager.getInstance().numberOnline.conversion(this.m_struct.OnlinePlayers);
			//			m_bmpOnline.smoothing = true;
			//			m_bmpBanker.bitmapData = manager.BitmapManager.getInstance().numberBet.conversionSlash((this.m_struct.staticsInfo ).BankerBetAmt, (this.m_struct.staticsInfo ).BankerBetCnt);
			//			m_bmpBanker.smoothing = true;
			//			m_bmpPlayer.bitmapData = manager.BitmapManager.getInstance().numberBet.conversionSlash((this.m_struct.staticsInfo ).PlayerBetAmt, (this.m_struct.staticsInfo ).PlayerBetCnt);
			//			m_bmpPlayer.smoothing = true;
			//			m_bmpTie.bitmapData = manager.BitmapManager.getInstance().numberBet.conversionSlash((this.m_struct.staticsInfo ).TieBetAmt, (this.m_struct.staticsInfo ).TieBetCnt);
			//			m_bmpTie.smoothing = true;
			
			//测试代码
			if(this.m_struct.TableID==10){
				var a:number= this.m_struct.TableID;
			}
			this.m_mcContent.tf_0.text = (this.m_struct.StaticsInfo ).BankerWinCnt.toString();
			this.m_mcContent.tf_1.text = (this.m_struct.StaticsInfo ).PlayerWinCnt.toString();
			this.m_mcContent.tf_2.text = (this.m_struct.StaticsInfo ).TieWinCnt.toString();
			this.m_mcContent.tf_3.text = (this.m_struct.StaticsInfo ).BigWinCnt.toString();
			this.m_mcContent.tf_4.text = (this.m_struct.StaticsInfo ).SmallWinCnt.toString();
			this.m_mcContent.tf_5.text = (this.m_struct.StaticsInfo ).BankerPairWinCnt.toString();
			this.m_mcContent.tf_6.text = (this.m_struct.StaticsInfo ).PlayerPairWinCnt.toString();
			
			this.m_panelStatistic.updateValues([(this.m_struct.StaticsInfo ).BankerWinCnt, (this.m_struct.StaticsInfo ).PlayerWinCnt, (this.m_struct.StaticsInfo ).TieWinCnt]);
			
		}
		
		//更新维护状态
		 public updateMaintenanceStatus():void{
			//测试代码
			if(this.struct.TableID==31){
			//	console.log("测试代码");
			}
			if(this.struct.IsMaintaining){
				this.updateHint( language.Language.sMaintenance);
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
					this.updateHint( language.Language.sNoTrial);
					this.showMaintain();
				}
			}else{
				this.otherCheck();
			}
		}
		
		protected otherCheck():void{
			if(this.struct.TableID==12){
//				console.log("struct.TableID>> ",struct.TableID, struct.GameNo, struct.IsChangingShoe, struct.GameStatus, struct.RoadMaps, struct.LastRoadMap);
			}
			if(this.isNotFinish()){
				//游戏未完成
				this.m_bNotFinished = true;
				this.updateHint( language.Language.sMaintenance);
				this.showMaintain();
			}else if(!this.isHaveDealer()){
				//没有荷官
				this.updateHint( language.Language.sMaintenance);
				this.showMaintain();
			}else if(this.m_road.bError){
				//路纸出错
				this.updateHint( language.Language.sMaintenance);
				this.showMaintain();
			}else if(this.m_struct.IsPaused){
				//桌子维护 
				this.updateHint( language.Language.sMaintenance);
				this.showMaintain();
			}else if(this.m_struct.IsAlone){
				//独享
				if(this.tableLoginType.playerTableOwnStatusStruct && this.tableLoginType.playerTableOwnStatusStruct.IsTableOwner && this.tableLoginType.playerTableOwnStatusStruct.PlayerID==model.Player.getInstance().iPlayerID){
					this.m_mcContent.mc_alone.visible = false;
				}else{
					this.m_mcContent.mc_alone.visible = this.m_mcAsset.mc_hint.visible?false:true;
					this.hideStatistics();
				}
				
				if(this.tableLoginType.IsTableOwnerLeave()){//逾时踢出
					this.updateHint( language.Language.sOwnerLeave);
					this.m_mcContent.mc_alone.visible = false;
				}else{
					this.hideMaintain();
				}
				
				this.touchEnabled = !this.m_mcContent.mc_alone.visible;
				this.touchChildren = !this.m_mcContent.mc_alone.visible;
				this.m_mcAsset.mc_mask.visible = false;
			}else if(this.tableLoginType.IsTableOwnerLeave()){
				this.updateHint( language.Language.sOwnerLeave);
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
					default:
						console.log("");
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
		
		 get road():Object{
			return this.m_road;
		}
		
		private getLimit(_struct):string{
			var _limitStruct  = model.LobbyData.getInstance().getBetLimitByGL(_struct.GameID, _struct.BetLimitID);
			var _sLimit	: string;
			if(_limitStruct){
				_sLimit = _limitStruct.MinLimit.toString() + "-" + _limitStruct.MaxLimit.toString();
			}else{
				_sLimit = "0-0";
			}
			return _sLimit;
		}
		
		 set  setBetLimitVisible(_bValue: boolean) {
			this.tableLoginType.setBetLimitVisible = _bValue;
		}		
		
		//游戏进行中
		 public isGameStart(): boolean{
			// 如果游戏处于下注或者发牌阶段，说明游戏已经开始
			switch(this.m_struct.GameStatus){
				case model.status.GameStatus.BETTING:
				case model.status.GameStatus.DEALING:
				case model.status.GameStatus.SETTLING:
				case model.status.GameStatus.FIRST_PEEK:
				case model.status.GameStatus.PLAYER_SECOND_PEEK:
				case model.status.GameStatus.BANKER_SECOND_PEEK:
					return true;
			}
			return false;
		}
	}
}