module lobby.view.quick {
	export class QuickTableBac extends QuickTable{
		private m_road			;			//路纸
		
//		private m_btnLimit		:	ButtonMcLanguage;				//限红选择
		private m_btnLogin		;				//进入游戏
		
		private m_btnSideBet	;				//旁观下注
		private m_btnLoginBet	;				//进座下注
		
		private m_btnVip		;				//包桌
		
		private m_bEnable		:	 boolean;
		
		public constructor() {
			super();

			this.m_mcAsset = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_TABLE,"Quick_Table_Baccarat_Asset");
			this.addChild(this.m_mcAsset);
			
			this.m_glow = this.m_mcAsset.mc_glow;
			this.m_glow.visible = false;
			this.m_glow.touchEnabled = false;
			
			this.m_mcAsset.mc_hint.tf_mask.text = "";
			
			this.m_bmpTableID = new egret.Bitmap();
			this.m_mcAsset.mc_5.addChild(this.m_bmpTableID);
			
			this.m_bmpTableHint = new egret.Bitmap();
			this.m_mcAsset.mc_hint.addChild(this.m_bmpTableHint);
			this.m_mcAsset.mc_hint.touchEnabled = false;
			this.m_mcAsset.mc_hint.touchChildren = false;
			
//			m_bmpTable = new egret.Bitmap();
//			this.m_mcAsset.mc_bg.mc_2.addChild(m_bmpTable);
			
			//			m_bmpFace = new egret.Bitmap();
			//			this.m_mcAsset.mc_face.addChild(m_bmpFace);
			
			this.m_road = new route.quick.QuickTableRoadMapBac(this.m_mcAsset);
//			this.m_mcAsset.mc_bg.gotoAndStop(1);
			
//			this.m_mcAsset.mc_1.y = -30;
			this.m_mcAsset.mc_bg.y = 165;
			this.m_mcAsset.mc_bg.touchEnabled = false;
			
			this.m_mcAsset.mc_alone.touchEnabled = false;
			this.m_mcAsset.mc_alone.touchChildren = false;
			
			super();
		}
		
		 public destroy():void {
			
//			if(m_bmpTable){
//				if(m_bmpTable.parent){
//					m_bmpTable.parent.removeChild(m_bmpTable);
//				}
//				m_bmpTable = null;
//			}
			
			
			if(this.m_road){
				this.m_road.destroy();
				this.m_road = null;
			}
			
//			if(m_btnLimit){
//				m_btnLimit.destroy();
//				m_btnLimit = null;
//			}
			if(this.m_btnLogin){
				this.m_btnLogin.destroy();
				this.m_btnLogin = null;
			}
			
			
			if(this.m_btnSideBet){
				this.m_btnSideBet.destroy();
				this.m_btnSideBet = null;
			}
			if(this.m_btnLoginBet){
				this.m_btnLoginBet.destroy();
				this.m_btnLoginBet = null;
			}
			
			
			if(this.m_btnVip){
				this.m_btnVip.destroy();
				this.m_btnVip = null;
			}
			
			super.destroy();
		}
		
		 public setData(_tableStruct):void{
			super.setData(_tableStruct);
			
			//一般,急速,機械手臂
			switch(this.m_struct.TableType){
				case define.Define.TABLE_TYPE_NORMAL:
					this.m_mcTableName = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_TABLE,"Table_Label_Bac_Asset");
					this.initNormal();
					break;
				case define.Define.TABLE_TYPE_SPEEDY:
					this.m_mcTableName = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_TABLE,"Table_Label_Bac_Speed_Asset");
					this.initNormal();
					break;
				case define.Define.TABLE_TYPE_ROBOT:
					this.m_mcTableName = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_TABLE,"Table_Label_Bac_Robot_Asset");
					this.initNormal();
					break;
				
				case define.Define.TABLE_TYPE_PEEK:
					this.m_mcTableName = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_TABLE,"Table_Label_Bac_Peek_Asset");
					this.initbid();
					break;
				
				case define.Define.TABLE_TYPE_CHARTER:
					this.m_mcTableName = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_TABLE,"Table_Label_Bac_Charter_Asset");
					this.initVip();
					break;
			}
			
			this.m_mcAsset.mc_4.addChild(this.m_mcTableName);
			this.m_bmpTableID.bitmapData = manager.BitmapManager.getInstance().numberTable.conversion(this.m_struct.TableID);
			this.m_bmpTableID.smoothing = true;
			this.m_mcAsset.mc_5.x = (this.m_mcAsset.mc_4.x + this.m_mcAsset.mc_4.width);
			this.m_mcAsset.mc_6.x = (this.m_mcAsset.mc_5.x + this.m_mcAsset.mc_5.width);
			
			this.update(true);
			
			this.updateStatus();
			
			this.onChangeLanguage();
			
		}
		
		 public onChangeLanguage():void{
			super.onChangeLanguage();
			
			//一般,急速,機械手臂
//			switch(this.m_struct.TableType){
//				case define.Define.TABLE_TYPE_NORMAL:
//				case define.Define.TABLE_TYPE_TELBET:
//					m_sLabel = language.Language.sGame_Name_Bac;
//					break;
//				
//				case define.Define.TABLE_TYPE_SPEEDY:
//					m_sLabel = language.Language.sGame_Name_Bac_Speed;
//					break;
//				
//				case define.Define.TABLE_TYPE_ROBOT:
//					m_sLabel = language.Language.sGame_Name_Bac_Rebot;
//					break;
//				
//				case define.Define.TABLE_TYPE_PEEK:
//					m_sLabel = language.Language.sGame_Name_Bac_Peek;
//					break;
//				
//				case define.Define.TABLE_TYPE_CHARTER:
//					m_sLabel = language.Language.sGame_Name_Bac_Charter;
//					break;
//			}
			this.m_mcAsset.tf_label.text = "";//manager.LobbyManager.getInstance().getLanguageString(m_sLabel) + String(this.m_struct.TableID) + manager.LobbyManager.getInstance().getLanguageString(language.Language.sTable);
			
			this.m_mcTableName.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			this.m_mcAsset.mc_6.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			
//			this.m_mcAsset.mc_1.tf_label.text = manager.LobbyManager.getInstance().getLanguageString(language.Language.sLimitSelect);
			this.m_mcAsset.mc_bg.mc_2.mc_label.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			this.m_mcAsset.mc_bg.mc_3.mc_label.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			this.m_mcAsset.mc_bg.mc_4.mc_label.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			this.m_mcAsset.mc_bg.mc_5.mc_label.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			
			this.m_mcAsset.mc_5.x = (this.m_mcAsset.mc_4.x + this.m_mcAsset.mc_4.width);
			this.m_mcAsset.mc_6.x = (this.m_mcAsset.mc_5.x + this.m_mcAsset.mc_5.width);
			this.m_bmpTime.x = (this.m_mcAsset.mc_6.x + this.m_mcAsset.mc_6.width + 20);
			
			this.m_mcAsset.mc_alone.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			
			this.m_road.onChangeLanguage();
			
			this.updateMaintenanceStatus();
			
		}
		
		 public update(_bInit: boolean=false):void{
			if(this.m_road==null){
				return;
			}
			this.updateRoad(_bInit);
			this.updateCountDown();
			
			this.m_mcAsset.mc_alone.visible = this.m_struct.IsAlone;
						
			this.updateStatus();
			
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
		 public initRoad(_sRoad:string):void{
			this.m_iGameNo = this.isGameStart()?this.m_struct.GameNo-1:this.m_struct.GameNo;
			
			this.m_road.clearRoad();
			this.m_road.addRoad(_sRoad);
		}
		
		//更新路纸
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
		
		 public updateMaintenanceStatus():void{
			if(this.struct.IsMaintaining){
				this.updateHint(language.Language.sMaintenance);
				this.showMaintain();
				return;
			}
			
			//厅馆维护
			var currcurrentTheme = manager.LobbyManager.getInstance().lobbyView.quickThemeList.currentTheme;
			if(currcurrentTheme && currcurrentTheme.struct.IsMaintaining){
				this.hideMaintain();
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
		
		private otherCheck():void{
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
				this.playerTableOwnStatusStruct = model.LobbyData.getInstance().getPlayerTableOwnStatusStruct(this.m_struct.TableID);
				if(this.playerTableOwnStatusStruct && this.playerTableOwnStatusStruct.IsTableOwner && this.playerTableOwnStatusStruct.PlayerID==model.Player.getInstance().iPlayerID){
					this.m_bEnable = true;
					this.m_mcAsset.mc_alone.visible = false;
				}else{
					this.m_mcAsset.mc_alone.visible = this.m_mcAsset.mc_hint.visible?false:true;
				}
				
				if(this.IsTableOwnerLeave()){//逾时踢出
					this.updateHint( language.Language.sOwnerLeave);
					this.m_mcAsset.mc_alone.visible = false;
				}else{
					this.hideMaintain();
				}
				
				this.touchEnabled = !this.m_mcAsset.mc_alone.visible;
				this.touchChildren = !this.m_mcAsset.mc_alone.visible;
				this.m_mcAsset.mc_mask.visible = false;
			}else if(this.IsTableOwnerLeave()){
				this.updateHint( language.Language.sOwnerLeave);
				this.m_mcAsset.mc_mask.visible = false;
			}else if(this.m_struct.GameStatus!=model.status.GameStatus.FAILING_GAME&&this.m_struct.GameStatus!=model.status.GameStatus.FAIL_GAME)
			{
				this.hideMaintain();
			}
			
			if(this.m_bMaintance){
				return;
			}
			
			this.m_bSettled =  <boolean>(this.m_struct.GameStatus==model.status.GameStatus.SETTLED);
			if(this.m_struct.IsChangingShoe){
				//洗牌中
				switch(this.m_struct.GameStatus){
					case model.status.GameStatus.WAIT_NEXT_NEWGAME:
					case model.status.GameStatus.SETTLED:
						this.m_mcAsset.mc_hint.visible = false;
						break;
					
					case model.status.GameStatus.CHANGING_SHOE:
						if(this.m_struct.IsAlone){
							this.m_mcAsset.mc_hint.visible = false;
						}else if(!this.m_bSettled){
							this.updateHint(language.Language.sChangeShoe);
							this.m_mcAsset.mc_mask.visible = false;
							this.m_mcAsset.mc_hint.visible = true;
						}
						break;
				}
			}
		}
				
		 public showMaintain(_bMc: boolean=true):void{
			
			this.m_bMaintance = true;
			this.m_mcAsset.mc_mask.visible = _bMc;
			this.m_mcAsset.mc_hint.visible = true;
			this.touchChildren = false;
			this.touchEnabled = false;
			
			if(this.m_mcAsset.mc_alone){
				this.m_mcAsset.mc_alone.visible = false;
			}
		}
		 public hideMaintain():void{
			
			this.m_bMaintance = false;
			this.m_mcAsset.mc_mask.visible = false;
			this.m_mcAsset.mc_hint.visible = false;
			this.touchChildren = true;
			this.touchEnabled = true;
		}
		
		 protected bgOver(event:MouseEvent):void{
			super.bgOver(event);
			if(!this.m_bEnable){
				return;
			}
			if(this.m_mcAsset){
				egret.Tween.get(this.m_mcAsset.mc_bg).to({y:122}, define.Define.SPEED);
			}
		}
		 protected bgOut(event:MouseEvent):void{
			super.bgOut(event);
			if(!this.m_bEnable){
				return;
			}
			if(this.m_mcAsset){
				egret.Tween.get(this.m_mcAsset.mc_bg).to({y:165}, define.Define.SPEED);
			}
		}
		
		private initNormal():void{
			this.m_mcAsset.mc_bg.removeChild(this.m_mcAsset.mc_bg.mc_3);
			this.m_mcAsset.mc_bg.removeChild(this.m_mcAsset.mc_bg.mc_4);
			this.m_mcAsset.mc_bg.removeChild(this.m_mcAsset.mc_bg.mc_5);
//			m_btnLimit = new ButtonMcLanguage(this.m_mcAsset.mc_1, function():void{
//				manager.SoundManager.getInstance().play(sound.SoundPackage.sEnterGame);
//				
//				if(manager.LobbyManager.getInstance().IsCanChangeTable()){
//					if(isSelf()){
//						manager.LobbyManager.getInstance().showDialog(manager.LobbyManager.getInstance().getLanguageString(language.Language.sHaveIn)+String(this.m_struct.TableID)+manager.LobbyManager.getInstance().getLanguageString(language.Language.sTable) + "!");
//					}else{
//						this.playerTableOwnStatusStruct = model.LobbyData.getInstance().getPlayerTableOwnStatusStruct(this.m_struct.TableID);
//						if(this.playerTableOwnStatusStruct){
//							this.m_struct.BetLimitID = this.playerTableOwnStatusStruct.CurrBetLimitID;
//							manager.LobbyManager.getInstance().showDialog(manager.LobbyManager.getInstance().getLanguageString(language.Language.sGame_Relogin), function():void{
//								changeGame();
//							});
//						}else{
//							manager.LobbyManager.getInstance().bQuickChangeTable = true;
//							manager.LobbyManager.getInstance().showLimitBet(this.m_struct);
//						}
//					}
//				}else{
//					manager.LobbyManager.getInstance().showGameMessage(manager.LobbyManager.getInstance().getLanguageString(language.Language.sCanNotExitGame));
//				}
//				
//			});
			this.m_btnLogin = new ui.button.ButtonMcLanguage(this.m_mcAsset.mc_bg.mc_2, function():void{
				manager.SoundManager.getInstance().play(sound.SoundPackage.sEnterGame);
				
				if(manager.LobbyManager.getInstance().IsCanChangeTable()){
					if(this.isSelf()){
						manager.LobbyManager.getInstance().showDialog(manager.LobbyManager.getInstance().getLanguageString(language.Language.sHaveIn)+ this.m_sTableName + "!");
					}else{
						this.playerTableOwnStatusStruct = model.LobbyData.getInstance().getPlayerTableOwnStatusStruct(this.m_struct.TableID);
						if(this.playerTableOwnStatusStruct){
							this.m_struct.BetLimitID = this.playerTableOwnStatusStruct.CurrBetLimitID;
//							manager.LobbyManager.getInstance().showDialog(manager.LobbyManager.getInstance().getLanguageString(language.Language.sGame_Relogin), function():void{
								this.changeGame();
//							});
						}else{
							if(this.IsAllowToLogin()){
								this.m_struct.BetLimitID = 1;
								this.changeGame();
							}
						}
					}
					
				}else{
					manager.LobbyManager.getInstance().showGameMessage(manager.LobbyManager.getInstance().getLanguageString(language.Language.sCanNotExitGame));
				}
			});
			this.m_mcAsset.mc_bg.mc_2.mc_label.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
		}
		private initbid():void{
//			this.m_mcAsset.removeChild(this.m_mcAsset.mc_1);
			this.m_mcAsset.mc_bg.removeChild(this.m_mcAsset.mc_bg.mc_2);
			this.m_mcAsset.mc_bg.removeChild(this.m_mcAsset.mc_bg.mc_5);
			this.m_mcAsset.mc_bg.mc_3.x = 43;
			this.m_btnSideBet = new ui.button.ButtonMcLanguage(this.m_mcAsset.mc_bg.mc_3, function():void{
				manager.SoundManager.getInstance().play(sound.SoundPackage.sEnterGame);
				
				if(manager.LobbyManager.getInstance().IsCanChangeTable()){
					if(this.isSelf()){
						manager.LobbyManager.getInstance().showDialog(manager.LobbyManager.getInstance().getLanguageString(language.Language.sHaveIn)+ this.m_sTableName + "!");
//						manager.LobbyManager.getInstance().showDialog("您已在"+String(this.m_struct.TableID)+"桌!");
					}else{
						this.playerTableOwnStatusStruct = model.LobbyData.getInstance().getPlayerTableOwnStatusStruct(this.m_struct.TableID);
						if(this.playerTableOwnStatusStruct){
//							manager.LobbyManager.getInstance().showDialog(manager.LobbyManager.getInstance().getLanguageString(language.Language.sGame_Relogin), function():void{
								this.m_struct.model.type.JoinTableType = model.type.JoinTableType.PEEK_OTHER;
								this.enterGame();
//							});
						}else{
							this.m_struct.model.type.JoinTableType = model.type.JoinTableType.PEEK_OTHER;
							this.enterGame();
						}
					}
				}else{
					manager.LobbyManager.getInstance().showGameMessage(manager.LobbyManager.getInstance().getLanguageString(language.Language.sCanNotExitGame));
				}
				
			});
			this.m_mcAsset.mc_bg.mc_4.x = 213;
			this.m_btnLoginBet = new ui.button.ButtonMcLanguage(this.m_mcAsset.mc_bg.mc_4, function():void{
				manager.SoundManager.getInstance().play(sound.SoundPackage.sEnterGame);
				
				if(manager.LobbyManager.getInstance().IsCanChangeTable()){
					if(this.isSelf()){
						manager.LobbyManager.getInstance().showDialog(manager.LobbyManager.getInstance().getLanguageString(language.Language.sHaveIn)+ this.m_sTableName + "!");
					}else{
						this.playerTableOwnStatusStruct = model.LobbyData.getInstance().getPlayerTableOwnStatusStruct(this.m_struct.TableID);
						if(this.playerTableOwnStatusStruct){
//							manager.LobbyManager.getInstance().showDialog(manager.LobbyManager.getInstance().getLanguageString(language.Language.sGame_Relogin), function():void{
								this.m_struct.model.type.JoinTableType = model.type.JoinTableType.PEEK_TABLEER;
								this.enterGame();
//							});
						}else{
							if(this.IsAllowToLogin()){
								this.m_struct.model.type.JoinTableType = model.type.JoinTableType.PEEK_TABLEER;
								this.enterGame();
							}
						}
					}
				}else{
					manager.LobbyManager.getInstance().showGameMessage(manager.LobbyManager.getInstance().getLanguageString(language.Language.sCanNotExitGame));
				}
				
			});
			
			this.m_mcAsset.mc_bg.mc_3.mc_label.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			this.m_mcAsset.mc_bg.mc_4.mc_label.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			this.updateStatus();
		}
		private initVip():void{
//			this.m_mcAsset.removeChild(this.m_mcAsset.mc_1);
			this.m_mcAsset.mc_bg.removeChild(this.m_mcAsset.mc_bg.mc_2);
//			this.m_mcAsset.mc_bg.removeChild(this.m_mcAsset.mc_bg.mc_5);
			
			this.m_btnSideBet = new ui.button.ButtonMcLanguage(this.m_mcAsset.mc_bg.mc_3, function():void{
				manager.SoundManager.getInstance().play(sound.SoundPackage.sEnterGame);
				
				if(manager.LobbyManager.getInstance().IsCanChangeTable()){
					if(this.isSelf()){
						manager.LobbyManager.getInstance().showDialog(manager.LobbyManager.getInstance().getLanguageString(language.Language.sHaveIn) + this.m_sTableName + "!");						
//						manager.LobbyManager.getInstance().showDialog("您已在"+String(this.m_struct.TableID)+"桌!");
					}else{
						this.playerTableOwnStatusStruct = model.LobbyData.getInstance().getPlayerTableOwnStatusStruct(this.m_struct.TableID);
						if(this.playerTableOwnStatusStruct){
//							manager.LobbyManager.getInstance().showDialog(manager.LobbyManager.getInstance().getLanguageString(language.Language.sGame_Relogin), function():void{
								manager.LobbyManager.getInstance().bQuickChangeTable = true;
								this.m_struct.model.type.JoinTableType = model.type.JoinTableType.CHARTER_OTHER;
								this.needPwd(this.m_struct);
//							});
						}else{
							manager.LobbyManager.getInstance().bQuickChangeTable = true;
							this.m_struct.model.type.JoinTableType = model.type.JoinTableType.CHARTER_OTHER;
							this.needPwd(this.m_struct);
						}
					}
				}else{
					manager.LobbyManager.getInstance().showGameMessage(manager.LobbyManager.getInstance().getLanguageString(language.Language.sCanNotExitGame));
				}
				
			});
			this.m_btnLoginBet = new ui.button.ButtonMcLanguage(this.m_mcAsset.mc_bg.mc_4, function():void{
				manager.SoundManager.getInstance().play(sound.SoundPackage.sEnterGame);
				
				if(manager.LobbyManager.getInstance().IsCanChangeTable()){
					if(this.isSelf()){
						manager.LobbyManager.getInstance().showDialog(manager.LobbyManager.getInstance().getLanguageString(language.Language.sHaveIn) + this.m_sTableName + "!");						
//						manager.LobbyManager.getInstance().showDialog("您已在"+String(this.m_struct.TableID)+"桌!");
					}else{
						this.playerTableOwnStatusStruct = model.LobbyData.getInstance().getPlayerTableOwnStatusStruct(this.m_struct.TableID);
						if(this.playerTableOwnStatusStruct){
//							manager.LobbyManager.getInstance().showDialog(manager.LobbyManager.getInstance().getLanguageString(language.Language.sGame_Relogin), function():void{
								manager.LobbyManager.getInstance().bQuickChangeTable = true;
								this.m_struct.model.type.JoinTableType = model.type.JoinTableType.CHARTER_TABLER;
								this.needPwd(this.m_struct);
//							});
						}else{
							if(this.IsAllowToLogin()){
								manager.LobbyManager.getInstance().bQuickChangeTable = true;
								this.m_struct.model.type.JoinTableType = model.type.JoinTableType.CHARTER_TABLER;
								this.needPwd(this.m_struct);
							}
						}
					}
				}else{
					manager.LobbyManager.getInstance().showGameMessage(manager.LobbyManager.getInstance().getLanguageString(language.Language.sCanNotExitGame));
				}
				
			});
			this.m_btnVip = new ui.button.ButtonMcLanguage(this.m_mcAsset.mc_bg.mc_5, function():void{
				manager.SoundManager.getInstance().play(sound.SoundPackage.sEnterGame);
				
				if(manager.LobbyManager.getInstance().IsCanChangeTable()){
					if(this.isSelf()){
						manager.LobbyManager.getInstance().showDialog(manager.LobbyManager.getInstance().getLanguageString(language.Language.sHaveIn)+ this.m_sTableName + "!");
//						manager.LobbyManager.getInstance().showDialog("您已在"+String(this.m_struct.TableID)+"桌!");
					}else{
						this.playerTableOwnStatusStruct = model.LobbyData.getInstance().getPlayerTableOwnStatusStruct(this.m_struct.TableID);
						if(this.playerTableOwnStatusStruct && this.playerTableOwnStatusStruct.IsTableOwner && this.playerTableOwnStatusStruct.PlayerID==model.Player.getInstance().iPlayerID){
//							manager.LobbyManager.getInstance().showDialog(manager.LobbyManager.getInstance().getLanguageString(language.Language.sGame_Relogin), function():void{
								manager.LobbyManager.getInstance().bQuickChangeTable = true;
								this.m_struct.model.type.JoinTableType = model.type.JoinTableType.CHARTER_TABLE_OWNER;
								manager.LobbyManager.getInstance().enterGame(this.m_struct);
//							});
						}else{
							if(this.IsAllowToLogin(true)){
								manager.LobbyManager.getInstance().bQuickChangeTable = true;
								manager.LobbyManager.getInstance().showTableSetting(this.m_struct,this.enterGame);
							}
						}
					}
				}else{
					manager.LobbyManager.getInstance().showGameMessage(manager.LobbyManager.getInstance().getLanguageString(language.Language.sCanNotExitGame));
				}
				
			});
			
			this.m_mcAsset.mc_bg.mc_3.mc_label.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			this.m_mcAsset.mc_bg.mc_4.mc_label.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			this.m_mcAsset.mc_bg.mc_5.mc_label.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			
			this.updateStatus();
		}
		 public updateStatus():void{
			super.updateStatus();
			
			this.playerTableOwnStatusStruct = model.LobbyData.getInstance().getPlayerTableOwnStatusStruct(this.m_struct.TableID);
			
			if(this.playerTableOwnStatusStruct && this.playerTableOwnStatusStruct.IsTableOwner && this.playerTableOwnStatusStruct.PlayerID==model.Player.getInstance().iPlayerID){
				this.m_mcAsset.mc_alone.visible = false;
				this.m_btnVip.enable(true);
				this.m_btnSideBet.enable(false);
				this.m_btnLoginBet.enable(false);
				return;
			}
			
			var arr : any[] = this.m_struct.JoinTbStatus.split("");
			if(this.m_btnVip){
				if(arr[0] == 0){
					this.m_btnVip.enable(false);
				}else{
					this.m_btnVip.enable(true);
				}
			}
			if(this.m_btnLoginBet){
				if(arr[1] == 0){
					this.m_btnLoginBet.enable(false);
				}else{
					if(this.playerTableOwnStatusStruct){
						this.m_btnLoginBet.enable(!this.playerTableOwnStatusStruct.IsOtherBeter);
					}else{
						this.m_btnLoginBet.enable(true);
					}
				}
				
			}
			if(this.m_btnSideBet){
				if(arr[2] == 0){
					this.m_btnSideBet.enable(false);
				}else{
					if(this.playerTableOwnStatusStruct){
						this.m_btnSideBet.enable(this.playerTableOwnStatusStruct.IsOtherBeter);
					}else{
						this.m_btnSideBet.enable(true);
					}
				}
			}
		}
		
		public IsTableOwnerLeave(): boolean{
			var arr : any[] = this.m_struct.JoinTbStatus.split("");
			
			if(arr[3] == "1"){//独享
				if(arr[8] == "1"){
					return true;
				}
			}else{
				if(arr[0]=="0" && arr[1]=="0" && arr[2]=="0"){
					this.m_bEnable = false;
					if(arr[7]=="1"){
						return true;
					}
				}else{
					this.m_bEnable = true;
				}
			}
			
			return false;
		}
		
	}
}