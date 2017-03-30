module lobby.view.quick {
	export class QuickTableBac extends QuickTable{
		private m_road			:	QuickTableRoadMapBac;			//路纸
		
//		private m_btnLimit		:	ButtonMcLanguage;				//限红选择
		private m_btnLogin		:	ButtonMcLanguage;				//进入游戏
		
		private m_btnSideBet	:	ButtonMcLanguage;				//旁观下注
		private m_btnLoginBet	:	ButtonMcLanguage;				//进座下注
		
		private m_btnVip		:	ButtonMcLanguage;				//包桌
		
		private m_bEnable		:	 boolean;
		
		public constructor() {
		
			m_mcAsset = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_TABLE,"Quick_Table_Baccarat_Asset");
			this.addChild(m_mcAsset);
			
			m_glow = m_mcAsset.mc_glow;
			m_glow.visible = false;
			m_glow.mouseEnabled = false;
			m_glow.mouseChildren = false;
			
			m_mcAsset.mc_hint.tf_mask.text = "";
			
			m_bmpTableID = new Bitmap();
			m_mcAsset.mc_5.addChild(m_bmpTableID);
			
			m_bmpTableHint = new Bitmap();
			m_mcAsset.mc_hint.addChild(m_bmpTableHint);
			m_mcAsset.mc_hint.mouseEnabled = false;
			m_mcAsset.mc_hint.mouseChildren = false;
			
//			m_bmpTable = new Bitmap();
//			m_mcAsset.mc_bg.mc_2.addChild(m_bmpTable);
			
			//			m_bmpFace = new Bitmap();
			//			m_mcAsset.mc_face.addChild(m_bmpFace);
			
			m_road = new QuickTableRoadMapBac(m_mcAsset);
//			m_mcAsset.mc_bg.gotoAndStop(1);
			
//			m_mcAsset.mc_1.y = -30;
			m_mcAsset.mc_bg.y = 165;
			m_mcAsset.mc_bg.mouseEnabled = false;
			
			m_mcAsset.mc_alone.mouseEnabled = false;
			m_mcAsset.mc_alone.mouseChildren = false;
			
			super();
		}
		
		 public destroy():void {
			
//			if(m_bmpTable){
//				if(m_bmpTable.parent){
//					m_bmpTable.parent.removeChild(m_bmpTable);
//				}
//				m_bmpTable = null;
//			}
			
			
			if(m_road){
				m_road.destroy();
				m_road = null;
			}
			
//			if(m_btnLimit){
//				m_btnLimit.destroy();
//				m_btnLimit = null;
//			}
			if(m_btnLogin){
				m_btnLogin.destroy();
				m_btnLogin = null;
			}
			
			
			if(m_btnSideBet){
				m_btnSideBet.destroy();
				m_btnSideBet = null;
			}
			if(m_btnLoginBet){
				m_btnLoginBet.destroy();
				m_btnLoginBet = null;
			}
			
			
			if(m_btnVip){
				m_btnVip.destroy();
				m_btnVip = null;
			}
			
			super.destroy();
		}
		
		 public setData(_tableStruct:TableStruct):void{
			super.setData(_tableStruct);
			
			//一般,急速,機械手臂
			switch(m_struct.TableType){
				case Define.TABLE_TYPE_NORMAL:
					m_mcTableName = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_TABLE,"Table_Label_Bac_Asset");
					initNormal();
					break;
				case Define.TABLE_TYPE_SPEEDY:
					m_mcTableName = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_TABLE,"Table_Label_Bac_Speed_Asset");
					initNormal();
					break;
				case Define.TABLE_TYPE_ROBOT:
					m_mcTableName = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_TABLE,"Table_Label_Bac_Robot_Asset");
					initNormal();
					break;
				
				case Define.TABLE_TYPE_PEEK:
					m_mcTableName = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_TABLE,"Table_Label_Bac_Peek_Asset");
					initbid();
					break;
				
				case Define.TABLE_TYPE_CHARTER:
					m_mcTableName = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_TABLE,"Table_Label_Bac_Charter_Asset");
					initVip();
					break;
			}
			
			m_mcAsset.mc_4.addChild(m_mcTableName);
			m_bmpTableID.bitmapData = BitmapManager.getInstance().numberTable.conversion(m_struct.TableID);
			m_bmpTableID.smoothing = true;
			m_mcAsset.mc_5.x = int(m_mcAsset.mc_4.x + m_mcAsset.mc_4.width);
			m_mcAsset.mc_6.x = int(m_mcAsset.mc_5.x + m_mcAsset.mc_5.width);
			
			update(true);
			
			updateStatus();
			
			onChangeLanguage();
			
		}
		
		 public onChangeLanguage():void{
			super.onChangeLanguage();
			
			//一般,急速,機械手臂
//			switch(m_struct.TableType){
//				case Define.TABLE_TYPE_NORMAL:
//				case Define.TABLE_TYPE_TELBET:
//					m_sLabel = Language.sGame_Name_Bac;
//					break;
//				
//				case Define.TABLE_TYPE_SPEEDY:
//					m_sLabel = Language.sGame_Name_Bac_Speed;
//					break;
//				
//				case Define.TABLE_TYPE_ROBOT:
//					m_sLabel = Language.sGame_Name_Bac_Rebot;
//					break;
//				
//				case Define.TABLE_TYPE_PEEK:
//					m_sLabel = Language.sGame_Name_Bac_Peek;
//					break;
//				
//				case Define.TABLE_TYPE_CHARTER:
//					m_sLabel = Language.sGame_Name_Bac_Charter;
//					break;
//			}
			m_mcAsset.tf_label.text = "";//LobbyManager.getInstance().getLanguageString(m_sLabel) + String(m_struct.TableID) + LobbyManager.getInstance().getLanguageString(Language.sTable);
			
			m_mcTableName.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			m_mcAsset.mc_6.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			
//			m_mcAsset.mc_1.tf_label.text = LobbyManager.getInstance().getLanguageString(Language.sLimitSelect);
			m_mcAsset.mc_bg.mc_2.mc_label.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			m_mcAsset.mc_bg.mc_3.mc_label.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			m_mcAsset.mc_bg.mc_4.mc_label.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			m_mcAsset.mc_bg.mc_5.mc_label.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			
			m_mcAsset.mc_5.x = int(m_mcAsset.mc_4.x + m_mcAsset.mc_4.width);
			m_mcAsset.mc_6.x = int(m_mcAsset.mc_5.x + m_mcAsset.mc_5.width);
			m_bmpTime.x = int(m_mcAsset.mc_6.x + m_mcAsset.mc_6.width + 20);
			
			m_mcAsset.mc_alone.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			
			m_road.onChangeLanguage();
			
			updateMaintenanceStatus();
			
		}
		
		 public update(_bInit: boolean=false):void{
			if(m_road==null){
				return;
			}
			updateRoad(_bInit);
			updateCountDown();
			
			m_mcAsset.mc_alone.visible = m_struct.IsAlone;
						
			updateStatus();
			
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
		 public initRoad(_sRoad:String):void{
			m_iGameNo = isGameStart()?m_struct.GameNo-1:m_struct.GameNo;
			
			m_road.clearRoad();
			m_road.addRoad(_sRoad);
		}
		
		//更新路纸
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
		
		 public updateMaintenanceStatus():void{
			if(struct.IsMaintaining){
				updateHint(Language.sMaintenance);
				showMaintain();
				return;
			}
			
			//厅馆维护
			var currcurrentTheme:QuickThemeItem = LobbyManager.getInstance().lobbyView.quickThemeList.currentTheme;
			if(currcurrentTheme && currcurrentTheme.struct.IsMaintaining){
				hideMaintain();
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
		
		private otherCheck():void{
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
				playerTableOwnStatusStruct = LobbyData.getInstance().getPlayerTableOwnStatusStruct(m_struct.TableID);
				if(playerTableOwnStatusStruct && playerTableOwnStatusStruct.IsTableOwner && playerTableOwnStatusStruct.PlayerID==Player.getInstance().iPlayerID){
					this.m_bEnable = true;
					m_mcAsset.mc_alone.visible = false;
				}else{
					m_mcAsset.mc_alone.visible = m_mcAsset.mc_hint.visible?false:true;
				}
				
				if(IsTableOwnerLeave()){//逾时踢出
					updateHint( Language.sOwnerLeave);
					m_mcAsset.mc_alone.visible = false;
				}else{
					hideMaintain();
				}
				
				this.mouseEnabled = !m_mcAsset.mc_alone.visible;
				this.mouseChildren = !m_mcAsset.mc_alone.visible;
				m_mcAsset.mc_mask.visible = false;
			}else if(IsTableOwnerLeave()){
				updateHint( Language.sOwnerLeave);
				m_mcAsset.mc_mask.visible = false;
			}else if(m_struct.GameStatus!=GameStatus.FAILING_GAME&&m_struct.GameStatus!=GameStatus.FAIL_GAME)
			{
				hideMaintain();
			}
			
			if(m_bMaintance){
				return;
			}
			
			m_bSettled =  boolean(m_struct.GameStatus==GameStatus.SETTLED);
			if(m_struct.IsChangingShoe){
				//洗牌中
				switch(m_struct.GameStatus){
					case GameStatus.WAIT_NEXT_NEWGAME:
					case GameStatus.SETTLED:
						m_mcAsset.mc_hint.visible = false;
						break;
					
					case GameStatus.CHANGING_SHOE:
						if(m_struct.IsAlone){
							m_mcAsset.mc_hint.visible = false;
						}else if(!m_bSettled){
							updateHint(Language.sChangeShoe);
							m_mcAsset.mc_mask.visible = false;
							m_mcAsset.mc_hint.visible = true;
						}
						break;
				}
			}
		}
				
		 public showMaintain(_bMc: boolean=true):void{
			
			m_bMaintance = true;
			m_mcAsset.mc_mask.visible = _bMc;
			m_mcAsset.mc_hint.visible = true;
			this.mouseChildren = false;
			this.mouseEnabled = false;
			
			if(m_mcAsset.mc_alone){
				m_mcAsset.mc_alone.visible = false;
			}
		}
		 public hideMaintain():void{
			
			m_bMaintance = false;
			m_mcAsset.mc_mask.visible = false;
			m_mcAsset.mc_hint.visible = false;
			this.mouseChildren = true;
			this.mouseEnabled = true;
		}
		
		 protected bgOver(event:MouseEvent):void{
			super.bgOver(event);
			if(!m_bEnable){
				return;
			}
			if(m_mcAsset){
				TweenLite.to(m_mcAsset.mc_bg, Define.SPEED,{y:122});
//				TweenLite.to(m_mcAsset.mc_1, Define.SPEED,{y:6});
			}
		}
		 protected bgOut(event:MouseEvent):void{
			super.bgOut(event);
			if(!m_bEnable){
				return;
			}
			if(m_mcAsset){
				TweenLite.to(m_mcAsset.mc_bg, Define.SPEED,{y:165});
//				TweenLite.to(m_mcAsset.mc_1, Define.SPEED,{y:-30});
			}
		}
		
		private initNormal():void{
			m_mcAsset.mc_bg.removeChild(m_mcAsset.mc_bg.mc_3);
			m_mcAsset.mc_bg.removeChild(m_mcAsset.mc_bg.mc_4);
			m_mcAsset.mc_bg.removeChild(m_mcAsset.mc_bg.mc_5);
//			m_btnLimit = new ButtonMcLanguage(m_mcAsset.mc_1, function():void{
//				SoundManager.getInstance().play(SoundPackage.sEnterGame);
//				
//				if(LobbyManager.getInstance().IsCanChangeTable()){
//					if(isSelf()){
//						LobbyManager.getInstance().showDialog(LobbyManager.getInstance().getLanguageString(Language.sHaveIn)+String(m_struct.TableID)+LobbyManager.getInstance().getLanguageString(Language.sTable) + "!");
//					}else{
//						playerTableOwnStatusStruct = LobbyData.getInstance().getPlayerTableOwnStatusStruct(m_struct.TableID);
//						if(playerTableOwnStatusStruct){
//							m_struct.BetLimitID = playerTableOwnStatusStruct.CurrBetLimitID;
//							LobbyManager.getInstance().showDialog(LobbyManager.getInstance().getLanguageString(Language.sGame_Relogin), function():void{
//								changeGame();
//							});
//						}else{
//							LobbyManager.getInstance().bQuickChangeTable = true;
//							LobbyManager.getInstance().showLimitBet(m_struct);
//						}
//					}
//				}else{
//					LobbyManager.getInstance().showGameMessage(LobbyManager.getInstance().getLanguageString(Language.sCanNotExitGame));
//				}
//				
//			});
			m_btnLogin = new ButtonMcLanguage(m_mcAsset.mc_bg.mc_2, function():void{
				SoundManager.getInstance().play(SoundPackage.sEnterGame);
				
				if(LobbyManager.getInstance().IsCanChangeTable()){
					if(isSelf()){
						LobbyManager.getInstance().showDialog(LobbyManager.getInstance().getLanguageString(Language.sHaveIn)+ m_sTableName + "!");
					}else{
						playerTableOwnStatusStruct = LobbyData.getInstance().getPlayerTableOwnStatusStruct(m_struct.TableID);
						if(playerTableOwnStatusStruct){
							m_struct.BetLimitID = playerTableOwnStatusStruct.CurrBetLimitID;
//							LobbyManager.getInstance().showDialog(LobbyManager.getInstance().getLanguageString(Language.sGame_Relogin), function():void{
								changeGame();
//							});
						}else{
							if(IsAllowToLogin()){
								m_struct.BetLimitID = 1;
								changeGame();
							}
						}
					}
					
				}else{
					LobbyManager.getInstance().showGameMessage(LobbyManager.getInstance().getLanguageString(Language.sCanNotExitGame));
				}
			});
			m_mcAsset.mc_bg.mc_2.mc_label.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
		}
		private initbid():void{
//			m_mcAsset.removeChild(m_mcAsset.mc_1);
			m_mcAsset.mc_bg.removeChild(m_mcAsset.mc_bg.mc_2);
			m_mcAsset.mc_bg.removeChild(m_mcAsset.mc_bg.mc_5);
			m_mcAsset.mc_bg.mc_3.x = 43;
			m_btnSideBet = new ButtonMcLanguage(m_mcAsset.mc_bg.mc_3, function():void{
				SoundManager.getInstance().play(SoundPackage.sEnterGame);
				
				if(LobbyManager.getInstance().IsCanChangeTable()){
					if(isSelf()){
						LobbyManager.getInstance().showDialog(LobbyManager.getInstance().getLanguageString(Language.sHaveIn)+ m_sTableName + "!");
//						LobbyManager.getInstance().showDialog("您已在"+String(m_struct.TableID)+"桌!");
					}else{
						playerTableOwnStatusStruct = LobbyData.getInstance().getPlayerTableOwnStatusStruct(m_struct.TableID);
						if(playerTableOwnStatusStruct){
//							LobbyManager.getInstance().showDialog(LobbyManager.getInstance().getLanguageString(Language.sGame_Relogin), function():void{
								m_struct.joinTableType = JoinTableType.PEEK_OTHER;
								enterGame();
//							});
						}else{
							m_struct.joinTableType = JoinTableType.PEEK_OTHER;
							enterGame();
						}
					}
				}else{
					LobbyManager.getInstance().showGameMessage(LobbyManager.getInstance().getLanguageString(Language.sCanNotExitGame));
				}
				
			});
			m_mcAsset.mc_bg.mc_4.x = 213;
			m_btnLoginBet = new ButtonMcLanguage(m_mcAsset.mc_bg.mc_4, function():void{
				SoundManager.getInstance().play(SoundPackage.sEnterGame);
				
				if(LobbyManager.getInstance().IsCanChangeTable()){
					if(isSelf()){
						LobbyManager.getInstance().showDialog(LobbyManager.getInstance().getLanguageString(Language.sHaveIn)+ m_sTableName + "!");
					}else{
						playerTableOwnStatusStruct = LobbyData.getInstance().getPlayerTableOwnStatusStruct(m_struct.TableID);
						if(playerTableOwnStatusStruct){
//							LobbyManager.getInstance().showDialog(LobbyManager.getInstance().getLanguageString(Language.sGame_Relogin), function():void{
								m_struct.joinTableType = JoinTableType.PEEK_TABLEER;
								enterGame();
//							});
						}else{
							if(IsAllowToLogin()){
								m_struct.joinTableType = JoinTableType.PEEK_TABLEER;
								enterGame();
							}
						}
					}
				}else{
					LobbyManager.getInstance().showGameMessage(LobbyManager.getInstance().getLanguageString(Language.sCanNotExitGame));
				}
				
			});
			
			m_mcAsset.mc_bg.mc_3.mc_label.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			m_mcAsset.mc_bg.mc_4.mc_label.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			updateStatus();
		}
		private initVip():void{
//			m_mcAsset.removeChild(m_mcAsset.mc_1);
			m_mcAsset.mc_bg.removeChild(m_mcAsset.mc_bg.mc_2);
//			m_mcAsset.mc_bg.removeChild(m_mcAsset.mc_bg.mc_5);
			
			m_btnSideBet = new ButtonMcLanguage(m_mcAsset.mc_bg.mc_3, function():void{
				SoundManager.getInstance().play(SoundPackage.sEnterGame);
				
				if(LobbyManager.getInstance().IsCanChangeTable()){
					if(isSelf()){
						LobbyManager.getInstance().showDialog(LobbyManager.getInstance().getLanguageString(Language.sHaveIn)+ m_sTableName + "!");						
//						LobbyManager.getInstance().showDialog("您已在"+String(m_struct.TableID)+"桌!");
					}else{
						playerTableOwnStatusStruct = LobbyData.getInstance().getPlayerTableOwnStatusStruct(m_struct.TableID);
						if(playerTableOwnStatusStruct){
//							LobbyManager.getInstance().showDialog(LobbyManager.getInstance().getLanguageString(Language.sGame_Relogin), function():void{
								LobbyManager.getInstance().bQuickChangeTable = true;
								m_struct.joinTableType = JoinTableType.CHARTER_OTHER;
								needPwd(m_struct);
//							});
						}else{
							LobbyManager.getInstance().bQuickChangeTable = true;
							m_struct.joinTableType = JoinTableType.CHARTER_OTHER;
							needPwd(m_struct);
						}
					}
				}else{
					LobbyManager.getInstance().showGameMessage(LobbyManager.getInstance().getLanguageString(Language.sCanNotExitGame));
				}
				
			});
			m_btnLoginBet = new ButtonMcLanguage(m_mcAsset.mc_bg.mc_4, function():void{
				SoundManager.getInstance().play(SoundPackage.sEnterGame);
				
				if(LobbyManager.getInstance().IsCanChangeTable()){
					if(isSelf()){
						LobbyManager.getInstance().showDialog(LobbyManager.getInstance().getLanguageString(Language.sHaveIn)+ m_sTableName + "!");						
//						LobbyManager.getInstance().showDialog("您已在"+String(m_struct.TableID)+"桌!");
					}else{
						playerTableOwnStatusStruct = LobbyData.getInstance().getPlayerTableOwnStatusStruct(m_struct.TableID);
						if(playerTableOwnStatusStruct){
//							LobbyManager.getInstance().showDialog(LobbyManager.getInstance().getLanguageString(Language.sGame_Relogin), function():void{
								LobbyManager.getInstance().bQuickChangeTable = true;
								m_struct.joinTableType = JoinTableType.CHARTER_TABLER;
								needPwd(m_struct);
//							});
						}else{
							if(IsAllowToLogin()){
								LobbyManager.getInstance().bQuickChangeTable = true;
								m_struct.joinTableType = JoinTableType.CHARTER_TABLER;
								needPwd(m_struct);
							}
						}
					}
				}else{
					LobbyManager.getInstance().showGameMessage(LobbyManager.getInstance().getLanguageString(Language.sCanNotExitGame));
				}
				
			});
			m_btnVip = new ButtonMcLanguage(m_mcAsset.mc_bg.mc_5, function():void{
				SoundManager.getInstance().play(SoundPackage.sEnterGame);
				
				if(LobbyManager.getInstance().IsCanChangeTable()){
					if(isSelf()){
						LobbyManager.getInstance().showDialog(LobbyManager.getInstance().getLanguageString(Language.sHaveIn)+ m_sTableName + "!");
//						LobbyManager.getInstance().showDialog("您已在"+String(m_struct.TableID)+"桌!");
					}else{
						playerTableOwnStatusStruct = LobbyData.getInstance().getPlayerTableOwnStatusStruct(m_struct.TableID);
						if(playerTableOwnStatusStruct && playerTableOwnStatusStruct.IsTableOwner && playerTableOwnStatusStruct.PlayerID==Player.getInstance().iPlayerID){
//							LobbyManager.getInstance().showDialog(LobbyManager.getInstance().getLanguageString(Language.sGame_Relogin), function():void{
								LobbyManager.getInstance().bQuickChangeTable = true;
								m_struct.joinTableType = JoinTableType.CHARTER_TABLE_OWNER;
								LobbyManager.getInstance().enterGame(m_struct);
//							});
						}else{
							if(IsAllowToLogin(true)){
								LobbyManager.getInstance().bQuickChangeTable = true;
								LobbyManager.getInstance().showTableSetting(m_struct,enterGame);
							}
						}
					}
				}else{
					LobbyManager.getInstance().showGameMessage(LobbyManager.getInstance().getLanguageString(Language.sCanNotExitGame));
				}
				
			});
			
			m_mcAsset.mc_bg.mc_3.mc_label.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			m_mcAsset.mc_bg.mc_4.mc_label.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			m_mcAsset.mc_bg.mc_5.mc_label.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			
			updateStatus();
		}
		 public updateStatus():void{
			super.updateStatus();
			
			playerTableOwnStatusStruct = LobbyData.getInstance().getPlayerTableOwnStatusStruct(m_struct.TableID);
			
			if(playerTableOwnStatusStruct && playerTableOwnStatusStruct.IsTableOwner && playerTableOwnStatusStruct.PlayerID==Player.getInstance().iPlayerID){
				m_mcAsset.mc_alone.visible = false;
				m_btnVip.enable(true);
				m_btnSideBet.enable(false);
				m_btnLoginBet.enable(false);
				return;
			}
			
			var arr : any[] = m_struct.JoinTbStatus.split("");
			if(m_btnVip){
				if(arr[0] == 0){
					m_btnVip.enable(false);
				}else{
					m_btnVip.enable(true);
				}
			}
			if(m_btnLoginBet){
				if(arr[1] == 0){
					m_btnLoginBet.enable(false);
				}else{
					if(playerTableOwnStatusStruct){
						m_btnLoginBet.enable(!playerTableOwnStatusStruct.IsOtherBeter);
					}else{
						m_btnLoginBet.enable(true);
					}
				}
				
			}
			if(m_btnSideBet){
				if(arr[2] == 0){
					m_btnSideBet.enable(false);
				}else{
					if(playerTableOwnStatusStruct){
						m_btnSideBet.enable(playerTableOwnStatusStruct.IsOtherBeter);
					}else{
						m_btnSideBet.enable(true);
					}
				}
			}
		}
		
		public IsTableOwnerLeave(): boolean{
			var arr : any[] = m_struct.JoinTbStatus.split("");
			
			if(arr[3] == "1"){//独享
				if(arr[8] == "1"){
					return true;
				}
			}else{
				if(arr[0]=="0" && arr[1]=="0" && arr[2]=="0"){
					m_bEnable = false;
					if(arr[7]=="1"){
						return true;
					}
				}else{
					m_bEnable = true;
				}
			}
			
			return false;
		}
		
	}
}