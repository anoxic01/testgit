module lobby.view.tool {
	export class Tool implements iface.ISprite{
		private m_mcAsset				;							//美术资源
		
		private m_btnRefresh			:	ui.button.SingleButtonMC;				//重整视讯
		
		private m_btnResolution			:	Resolution;					//分辨率
		private m_btnChannel			:	ui.button.SingleButtonMC;				//频道选择
		private m_btnPersonalinformation	:	ui.button.SingleButtonMC;				//个人资讯
		private m_btnContact			:	ui.button.SingleButtonMC;				//联系客服
		private m_btnFull				:	ui.button.SingleButtonMC;				//全屏按钮
		private m_btnNormal				:	ui.button.SingleButtonMC;				//退出全屏
		private m_btnDetail				:	ui.button.SingleButtonMC;				//桌子详情
		private m_btnRecord				:	ui.button.SingleButtonMC;				//账户记录
		private m_btnSetting			:	ui.button.SingleButtonMC;				//设置按钮
		public btnExit					:	ui.button.SingleButtonMC;				//退出按钮
		
		public fRefresh					:	Function;					//重整视讯
		public fDetail					:	Function;					//桌子详情
		public fExitGame				:	Function;					//退出游戏
		
		public iExitLevel				:	number;						//退出等级	0-大厅，1-游戏
//		public wifi						:	Tool_Wifi;					//网络信号
		public toolContact				:	Tool_Contact;				//联系客服
		private m_bmpBg					;							//功能列背景
		private m_spParent				;						//外部容器
		
		private m_currentResolution		:	number;						//当前模式
		
		private m_mcHint				;					//全屏提示
		private m_mcHintFull			;
		private m_btnHintClose			:	ui.button.SingleButtonMC;				//关闭按钮
		private m_mcHintLabel			;					//提示标签
		private m_bHint					:	 boolean;					//提示状态
		public iMode					:	number;						//当前模式
		public constructor(_spParent) {
		
			if(manager.SharedObjectManager.getClickFullScreenCount()<12){
				this.m_bHint = true;
			}else{
				this.m_bHint = false;
			}
			this.m_mcAsset = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_LOBBY,"Tool_View_Asset");
			this.m_mcAsset.cacheAsBitmap = true;
			_spParent.addChild(this.m_mcAsset);
			this.m_spParent = _spParent;
//			this.m_mcAsset.y = 30;
			
			this.m_btnRefresh = new ui.button.SingleButtonMC(this.m_mcAsset.mc_refresh, function(evt:MouseEvent):void{
				if(manager.LobbyManager.getInstance().IsLiveConnected()){
					manager.LobbyManager.getInstance().bClickResolution = true;
				}
				manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
				manager.TipManager.getInstance().hide();
				if(this.fRefresh!=null){
					this.fRefresh();
				}
				manager.LobbyManager.getInstance().hideChannel();
				manager.LobbyManager.getInstance().hidePanelDetail();
				manager.LobbyManager.getInstance().hidePersonalInformation();
				this.toolContact.hide();
			});
			this.m_btnRefresh.fOnOver = function():void{
				manager.TipManager.getInstance().show(manager.LobbyManager.getInstance().getLanguageString(language.Language.sTip_Refresh),manager.TipManager.UP,this.m_mcAsset.localToGlobal(new egret.Point(this.m_mcAsset.mc_refresh.x+15,this.m_mcAsset.mc_refresh.y+30)),1);
			};
			this.m_btnRefresh.fOnOut = function():void{
				manager.TipManager.getInstance().hide();
			};
			
			this.m_btnResolution = new Resolution(this.m_mcAsset);
			
			this.m_btnChannel = new ui.button.SingleButtonMC(this.m_mcAsset.mc_channel, function(event:MouseEvent):void{
				manager.SoundManager.getInstance().play(sound.SoundPackage.sPopupPanel);
				manager.TipManager.getInstance().hide();
				if(this.toolContact){
					this.toolContact.hide();
				}
				manager.LobbyManager.getInstance().hidePersonalInformation();
				manager.LobbyManager.getInstance().hideSystemSetting();
				manager.LobbyManager.getInstance().hidePanelDetail();
				manager.LobbyManager.getInstance().showChannel();
			});
			this.m_btnChannel.fOnOver = function():void{
				manager.TipManager.getInstance().show(manager.LobbyManager.getInstance().getLanguageString(language.Language.sTip_Channel),manager.TipManager.UP,this.m_mcAsset.localToGlobal(new egret.Point(this.m_mcAsset.mc_channel.x+15,this.m_mcAsset.mc_channel.y+30)),1);
			};
			this.m_btnChannel.fOnOut = function():void{
				manager.TipManager.getInstance().hide();
			};
			(this.m_mcAsset.mc_channel.mc_label).gotoAndStop(5);
			
//			var _bPersonal	:	 boolean;
			this.m_btnPersonalinformation = new ui.button.SingleButtonMC(this.m_mcAsset.mc_personal, function(evt:MouseEvent):void{
				manager.SoundManager.getInstance().play(sound.SoundPackage.sPopupPanel);
				
				manager.TipManager.getInstance().hide();
				if(this.toolContact){
					this.toolContact.hide();
				}
				manager.LobbyManager.getInstance().hideChannel();
				manager.LobbyManager.getInstance().hideSystemSetting();
				manager.LobbyManager.getInstance().hidePanelDetail();
				
				var point = this.m_mcAsset.localToGlobal(new egret.Point(this.m_mcAsset.mc_personal.x+15,this.m_mcAsset.mc_contact.y+30));
				switch(manager.LobbyManager.getInstance().exitLevel){
					case define.Define.EXIT_LOBBY:
						manager.LobbyManager.getInstance().showPersonalinformation(point.x, point.y);
						break;
					case define.Define.EXIT_GAME:
						manager.LobbyManager.getInstance().showPersonalinformation(point.x, point.y);
						break;
					case define.Define.EXIT_TEL_LOBBY:
						break;
					case define.Define.EXIT_MULTI_TABLE:
						manager.LobbyManager.getInstance().showPersonalinformation(point.x, point.y);
						break;
				}
					
//				}
//				
//				_bPersonal = !_bPersonal;
			});
			this.m_btnPersonalinformation.fOnOver = function():void{
				manager.TipManager.getInstance().show(manager.LobbyManager.getInstance().getLanguageString(language.Language.sTip_Tool_PersonalInfo),manager.TipManager.UP,this.m_mcAsset.localToGlobal(new egret.Point(this.m_mcAsset.mc_personal.x+15,this.m_mcAsset.mc_personal.y+30)),1);
			};
			this.m_btnPersonalinformation.fOnOut = function():void{
				manager.TipManager.getInstance().hide();
			};
			
			
//			wifi = new Tool_Wifi(this.m_mcAsset.mc_wifi);
			
			this.toolContact = new Tool_Contact(this.m_mcAsset.mc_contact_view);
			
			this.m_mcHintFull = new egret.MovieClip(this.m_mcAsset.mc_full.mc);
			this.m_btnFull = new ui.button.SingleButtonMC(this.m_mcAsset.mc_full, function(evt:MouseEvent):void{
				manager.SharedObjectManager.setClickFullScreenCount();
				manager.SharedObjectManager.flush();
				this.m_bHint = false;
				this.hideHint();
				manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
				manager.TipManager.getInstance().hide();
				this.screenFull(true);
				manager.LobbyManager.getInstance().full();
			});
			this.m_btnFull.fOnOver = function():void{
				if(this.m_bHint){
					this.m_mcHintFull.gotoAndStop(1);
				}else{
					manager.TipManager.getInstance().show(manager.LobbyManager.getInstance().getLanguageString(language.Language.sTip_Tool_Full),manager.TipManager.UP,this.m_mcAsset.localToGlobal(new egret.Point(this.m_mcAsset.mc_full.x+15,this.m_mcAsset.mc_full.y+30)),1);
				}
			};
			this.m_btnFull.fOnOut = function():void{
				if(this.m_bHint){
					this.m_mcHintFull.gotoAndPlay(1);
				}else{
					manager.TipManager.getInstance().hide();
				}
				
			};
			this.m_btnNormal = new ui.button.SingleButtonMC(this.m_mcAsset.mc_normal, function(evt:MouseEvent):void{
				manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
				manager.TipManager.getInstance().hide();
				this.screenFull(false);
				manager.LobbyManager.getInstance().full();
			});
			this.m_btnNormal.fOnOver = function():void{
				manager.TipManager.getInstance().show(manager.LobbyManager.getInstance().getLanguageString(language.Language.sTip_Tool_ExitFull),manager.TipManager.UP,this.m_mcAsset.localToGlobal(new egret.Point(this.m_mcAsset.mc_normal.x+15,this.m_mcAsset.mc_normal.y+30)),1);
			};
			this.m_btnNormal.fOnOut = function():void{
				manager.TipManager.getInstance().hide();
			};
			
			this.m_btnDetail = new ui.button.SingleButtonMC(this.m_mcAsset.mc_detail, function():void{
				manager.SoundManager.getInstance().play(sound.SoundPackage.sPopupPanel);
				manager.TipManager.getInstance().hide();
				if(this.toolContact){
					this.toolContact.hide();
				}
				manager.LobbyManager.getInstance().hideChannel();
				manager.LobbyManager.getInstance().hidePersonalInformation();
				manager.LobbyManager.getInstance().hideSystemSetting();
				
				if(this.fDetail!=null){
					this.fDetail();
				}else{
					manager.LobbyManager.getInstance().showDialog(manager.LobbyManager.getInstance().getLanguageString(language.Language.sPlease_Wait));
				}
			});
			this.m_btnDetail.fOnOver = function():void{
				manager.TipManager.getInstance().show(manager.LobbyManager.getInstance().getLanguageString(language.Language.sTip_Tool_Detail),manager.TipManager.UP,this.m_mcAsset.localToGlobal(new egret.Point(this.m_mcAsset.mc_detail.x+15,this.m_mcAsset.mc_detail.y+30)),1);
			};
			this.m_btnDetail.fOnOut = function():void{
				manager.TipManager.getInstance().hide();
			};
			
			this.m_btnRecord = new ui.button.SingleButtonMC(this.m_mcAsset.mc_record, function(event:MouseEvent):void{
				manager.SoundManager.getInstance().play(sound.SoundPackage.sPopupPanel);
				manager.TipManager.getInstance().hide();
				if(this.toolContact){
					this.toolContact.hide();
				}
				manager.LobbyManager.getInstance().hideChannel();
				manager.LobbyManager.getInstance().hidePersonalInformation();
				manager.LobbyManager.getInstance().hideSystemSetting();
				manager.LobbyManager.getInstance().hidePanelDetail();
//				manager.LobbyManager.getInstance().showDialog(manager.LobbyManager.getInstance().getLanguageString(language.Language.sPlease_Wait));
				manager.GameRecordManager.getInstance().showBetRecordPannel();
			});
			this.m_btnRecord.fOnOver = function():void{
				manager.TipManager.getInstance().show(manager.LobbyManager.getInstance().getLanguageString(language.Language.sTip_Tool_Record),manager.TipManager.UP,this.m_mcAsset.localToGlobal(new egret.Point(this.m_mcAsset.mc_record.x+15,this.m_mcAsset.mc_record.y+30)),1);
			};
			this.m_btnRecord.fOnOut = function():void{
				manager.TipManager.getInstance().hide();
			};
			
			this.m_btnSetting = new ui.button.SingleButtonMC(this.m_mcAsset.mc_setting, function(evt:MouseEvent):void{
				manager.SoundManager.getInstance().play(sound.SoundPackage.sPopupPanel);
				manager.TipManager.getInstance().hide();
				if(this.toolContact){
					this.toolContact.hide();
				}
				manager.LobbyManager.getInstance().hideChannel();
				manager.LobbyManager.getInstance().hidePersonalInformation();
				manager.LobbyManager.getInstance().hidePanelDetail();
				manager.LobbyManager.getInstance().showSystemSetting();
				manager.SoundManager.getInstance().play(sound.SoundPackage.sPopupPanel);
				//测试代码
//				manager.LobbyManager.getInstance().showGoodRoadSetting();
			});
			this.m_btnSetting.fOnOver = function():void{
				manager.TipManager.getInstance().show(manager.LobbyManager.getInstance().getLanguageString(language.Language.sTip_Tool_System),manager.TipManager.UP,this.m_mcAsset.localToGlobal(new egret.Point(this.m_mcAsset.mc_setting.x+15,this.m_mcAsset.mc_setting.y+30)),1);
			};
			this.m_btnSetting.fOnOut = function():void{
				manager.TipManager.getInstance().hide();
			};
			
			this.m_btnContact = new ui.button.SingleButtonMC(this.m_mcAsset.mc_contact, function(evt:MouseEvent):void{
				manager.SoundManager.getInstance().play(sound.SoundPackage.sPopupPanel);
				manager.TipManager.getInstance().hide();
				manager.LobbyManager.getInstance().hideChannel();
				manager.LobbyManager.getInstance().hidePersonalInformation();
				manager.LobbyManager.getInstance().hideSystemSetting();
				manager.LobbyManager.getInstance().hidePanelDetail();
				this.toolContact.showOrHide();
				evt.stopImmediatePropagation();
			});
			this.m_btnContact.fOnOver = function():void{
				manager.TipManager.getInstance().show(manager.LobbyManager.getInstance().getLanguageString(language.Language.sTip_Tool_Other),manager.TipManager.UP,this.m_mcAsset.localToGlobal(new egret.Point(this.m_mcAsset.mc_contact.x+15,this.m_mcAsset.mc_contact.y+30)),1);
			};
			this.m_btnContact.fOnOut = function():void{
				manager.TipManager.getInstance().hide();
			};
			
			this.btnExit = new ui.button.SingleButtonMC(this.m_mcAsset.mc_exit, function(evt:MouseEvent):void{
				
//				console.log(this,"->点击退出");
				manager.TipManager.getInstance().hide();
//				console.log(this,"->隐藏tip");
				switch(manager.LobbyManager.getInstance().exitLevel){
					case define.Define.EXIT_LOBBY:
						manager.SoundManager.getInstance().play(sound.SoundPackage.sChangePage);
						manager.LobbyManager.getInstance().showDialog(manager.LobbyManager.getInstance().getLanguageString(language.Language.sExitLobby),function():void{
							manager.LobbyManager.getInstance().sendLobbyLogout();
							manager.LobbyManager.getInstance().leaveLobby();
//							NetWorkManager.getInstance().iLobbyNetWorkStatus = define.Define.LobbyDisconnect;
						});
						
						break;
					
					case define.Define.EXIT_GAME:
						manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
						if(this.fExitGame!=null){
//							console.log(this,"->准备执行退出行为");
							this.fExitGame();
//							console.log(this,"->退出完毕");
						}
						break;
					case define.Define.EXIT_TEL_LOBBY:
						manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
						manager.LobbyManager.getInstance().exitTelLobby();
						break;
					case define.Define.EXIT_MULTI_TABLE:
						manager.SoundManager.getInstance().play(sound.SoundPackage.sChangePage);
						manager.LobbyManager.getInstance().sendExitMultiTable();
						manager.LobbyManager.getInstance().exitMultiTable();
						manager.LobbyManager.getInstance().lobbyView.themeList.enable(true);
						break;
				}
			});
			this.btnExit.fOnOver = function():void{
				switch(manager.LobbyManager.getInstance().exitLevel){
					case define.Define.EXIT_LOBBY:
						manager.TipManager.getInstance().show(manager.LobbyManager.getInstance().getLanguageString(language.Language.sTip_Tool_Exit),manager.TipManager.UP,this.m_mcAsset.localToGlobal(new egret.Point(this.m_mcAsset.mc_exit.x+15,this.m_mcAsset.mc_exit.y+30)),1);
						break;
					case define.Define.EXIT_GAME:
					case define.Define.EXIT_MULTI_TABLE:
						manager.TipManager.getInstance().show(manager.LobbyManager.getInstance().getLanguageString(language.Language.sTip_Back_To_Lobby),manager.TipManager.UP,this.m_mcAsset.localToGlobal(new egret.Point(this.m_mcAsset.mc_exit.x+15,this.m_mcAsset.mc_exit.y+30)),1);
						break;
				}
				
			};
			this.btnExit.fOnOut = function():void{
				manager.TipManager.getInstance().hide();
			};
			
			this.initHint();
			this.screenFull(false);
			this.resize();
			this.toLobby();
		}
		
		public destroy():void
		{
			
			if(this.fExitGame!=null){
				this.fExitGame = null;
			}
			
			if(this.m_btnPersonalinformation){
				this.m_btnPersonalinformation.destroy();
				this.m_btnPersonalinformation = null;
			}
			
			if(this.m_btnRecord){
				this.m_btnRecord.destroy();
				this.m_btnRecord = null;
			}
			
			if(this.m_btnContact){
				this.m_btnContact.destroy();
				this.m_btnContact = null;
			}
			
			if(this.toolContact){
				this.toolContact.destroy();
				this.toolContact = null;
			}
			
			if(this.m_mcAsset){
				if(this.m_mcAsset.parent){
					this.m_mcAsset.parent.removeChild(this.m_mcAsset);
				}
				this.m_mcAsset = null;
			}
			if( this.m_bmpBg ){
				if( this.m_bmpBg.parent ) {
					this.m_bmpBg.parent.removeChild( this.m_bmpBg );
				}
//				this.m_bmpBg.dispose();
				this.m_bmpBg = null;
			}
			if(this.m_spParent){
				this.m_spParent = null;
			}
			
		}
		
		public cleanGameFun():void{
			this.fRefresh=null;
			this.fDetail=null;
			this.fExitGame=null;
		}
		
		
		public resize():void{
			if(this.m_mcAsset){
				this.m_mcAsset.x = manager.LobbyManager.getInstance().stage.stageWidth - 630;
				this.m_mcAsset.y = 0;
			}
		}
		
		public getView():egret.Sprite{
			return this.m_mcAsset;
		}
		
		public toLobby():void{
		
//			manager.LobbyManager.getInstance().videoMaxBytePerSecond = manager.LobbyManager.getInstance().lobbyView.liveVideo;
			if( this.m_bmpBg ){
				if( this.m_bmpBg.parent){
					this.m_bmpBg.parent.removeChild( this.m_bmpBg );
				}
//				this.m_bmpBg.dispose();
				this.m_bmpBg = null;
			}
			
//			this.m_mcAsset.mc_bg.visible = false;
			
			this.m_btnRefresh.visible = false;
			this.m_mcAsset.mc_0.visible = false;
			this.m_btnResolution.visible = false;
			this.m_mcAsset.mc_1.visible = false;
			this.m_btnChannel.visible = false;
			this.m_mcAsset.mc_2.visible = false;
			this.m_btnDetail.visible = false;
			this.m_btnRecord.visible=true;
			
			for (var i:number= 3; i < 9; i++) 
			{
				this.m_mcAsset["mc_"+i].visible = true;
			}
			
			if(manager.LobbyManager.getInstance().lobbyView.advertisement){
				manager.LobbyManager.getInstance().lobbyView.advertisement.start();
			}
			if(this.m_bHint){
				this.showHint();
			}else{
				this.hideHint();
			}
			
//			this.m_mcAsset.mc_wifi.visible = true;
			this.m_mcAsset.mc_8.visible = true;
			
			var uInitX	=	45;
			var uW : number = 65;
			var uY : number = 0;
			this.m_mcAsset.mc_refresh.x = 0;
			this.m_mcAsset.mc_refresh.y = uY;
			
			this.m_btnResolution.x = uW;
			this.m_btnResolution.y = uY;
			
			
			this.m_mcAsset.mc_channel.x = uW*2;
			this.m_mcAsset.mc_channel.y = uY;
			
			
			this.m_mcAsset.mc_detail.x = uW*3;
			this.m_mcAsset.mc_detail.y = uY;
			
			this.m_mcAsset.mc_full.x = uW*4;
			this.m_mcAsset.mc_full.y = uY;
			this.m_mcAsset.mc_normal.x = uW*4;
			this.m_mcAsset.mc_normal.y = uY;
			
			this.m_mcAsset.mc_personal.x = uW*5;
			this.m_mcAsset.mc_personal.y = uY;
			
			this.m_mcAsset.mc_record.x = uW*6;
			this.m_mcAsset.mc_record.y = uY;
			
			this.m_mcAsset.mc_contact.x = uW*7;
			this.m_mcAsset.mc_contact.y = uY;
			this.m_mcAsset.mc_contact_view.x = uW*6;
			this.m_mcAsset.mc_contact_view.y = 55;
			
			this.m_mcAsset.mc_setting.x = uW*8;
			this.m_mcAsset.mc_setting.y = uY;
			
			this.m_mcAsset.mc_exit.x = uW*9;
			this.m_mcAsset.mc_exit.y = uY;
			
			this.m_mcAsset.mc_0.x = uInitX;
			this.m_mcAsset.mc_1.x = uInitX + uW;
			this.m_mcAsset.mc_2.x = uInitX + uW*2;
			this.m_mcAsset.mc_3.x = uInitX + uW*3;
			this.m_mcAsset.mc_4.x = uInitX + uW*4;
			this.m_mcAsset.mc_5.x = uInitX + uW*5;
			this.m_mcAsset.mc_6.x = uInitX + uW*6;
			this.m_mcAsset.mc_7.x = uInitX + uW*7;
			this.m_mcAsset.mc_8.x = uInitX + uW*8;
			
			this.m_mcAsset.mc_0.y = 1;
			this.m_mcAsset.mc_1.y = 1;
			this.m_mcAsset.mc_2.y = 1;
			this.m_mcAsset.mc_3.y = 1;
			this.m_mcAsset.mc_4.y = 1;
			this.m_mcAsset.mc_5.y = 1;
			this.m_mcAsset.mc_6.y = 1;
			this.m_mcAsset.mc_7.y = 1;
			this.m_mcAsset.mc_8.y = 1;
			
			this.resize();
		}
		
		//个人资讯
		public getBtnDetailPoint():egret.Point{
			var point = this.m_mcAsset.localToGlobal(new egret.Point(this.m_mcAsset.mc_detail.x+15,this.m_mcAsset.mc_detail.y+30));;
			return point;
		}
		
		//频道
		public getBtnChannelPoint():egret.Point{
			var point = this.m_mcAsset.localToGlobal(new egret.Point(this.m_mcAsset.mc_channel.x+15,this.m_mcAsset.mc_channel.y+30));;
			return point;
		}
		
		//系统设置
		public getBtnSettingPoint():egret.Point{
			var point = this.m_mcAsset.localToGlobal(new egret.Point(this.m_mcAsset.mc_setting.x+15,this.m_mcAsset.mc_setting.y+30));;
			return point;
		}
		
		public toGame(_fQuality:Function, _fRefresh:Function, _fDetail:Function, _fExit:Function,isMachine=false):void{
			if(this.fRefresh!=null){
				this.fRefresh = null;
			}
			if(this.fDetail!=null){
				this.fDetail = null;
			}
			if(this.fExitGame!=null){
				this.fExitGame = null;
			}
			
			manager.LobbyManager.getInstance().lobbyView.advertisement.stop();
			this.hideHint();
			
			this.fRefresh = _fRefresh;
			this.fExitGame = _fExit;
			this.fDetail = _fDetail;
			
			if( !this.m_bmpBg ){
				this.m_bmpBg = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_PANEL,"Tool_Bg_Asset");
				this.m_bmpBg.width = 657;
				this.m_bmpBg.height = 55;
				this.m_mcAsset.addChildAt(this.m_bmpBg,0);
				this.m_bmpBg.x = -25;
				this.m_bmpBg.y = -15;
				
			}
			
		
				this.m_bmpBg.visible=true;
			
			
//			this.m_mcAsset.mc_bg.visible = true;
			this.m_btnRefresh.visible = true;
			this.m_btnResolution.visible = true;
			this.m_btnChannel.visible = true;
			this.m_btnDetail.visible = true;
//			m_btnQulity.visible = true;
			
			for (var i:number= 0 ; i < 9; i++) 
			{
				this.m_mcAsset["mc_"+i].visible = true;
			}
			
			var uInitX	=	45;
			var uW : number = 65;
			var uY : number = 0;
			this.m_mcAsset.mc_refresh.x = 0;
			this.m_mcAsset.mc_refresh.y = uY;
			
			this.m_btnResolution.x = uW;
			this.m_btnResolution.y = uY;
			
			
			this.m_mcAsset.mc_channel.x = uW*2;
			this.m_mcAsset.mc_channel.y = uY;
			
			
			this.m_mcAsset.mc_detail.x = uW*3;
			this.m_mcAsset.mc_detail.y = uY;
			
			this.m_mcAsset.mc_full.x = uW*4;
			this.m_mcAsset.mc_full.y = uY;
			this.m_mcAsset.mc_normal.x = uW*4;
			this.m_mcAsset.mc_normal.y = uY;
			
			this.m_mcAsset.mc_personal.x = uW*5;
			this.m_mcAsset.mc_personal.y = uY;
			
			this.m_mcAsset.mc_record.x = uW*6;
			this.m_mcAsset.mc_record.y = uY;
			
			this.m_mcAsset.mc_contact.x = uW*7;
			this.m_mcAsset.mc_contact.y = uY;
			this.m_mcAsset.mc_contact_view.x = uW*6;
			this.m_mcAsset.mc_contact_view.y = 55;
			
			this.m_mcAsset.mc_setting.x = uW*8;
			this.m_mcAsset.mc_setting.y = uY;
			
			this.m_mcAsset.mc_exit.x = uW*9;
			this.m_mcAsset.mc_exit.y = uY;
			
			this.m_mcAsset.mc_0.x = uInitX;
			this.m_mcAsset.mc_1.x = uInitX + uW;
			this.m_mcAsset.mc_2.x = uInitX + uW*2;
			this.m_mcAsset.mc_3.x = uInitX + uW*3;
			this.m_mcAsset.mc_4.x = uInitX + uW*4;
			this.m_mcAsset.mc_5.x = uInitX + uW*5;
			this.m_mcAsset.mc_6.x = uInitX + uW*6;
			this.m_mcAsset.mc_7.x = uInitX + uW*7;
			this.m_mcAsset.mc_8.x = uInitX + uW*8;
			
			this.m_mcAsset.mc_0.y = 1;
			this.m_mcAsset.mc_1.y = 1;
			this.m_mcAsset.mc_2.y = 1;
			this.m_mcAsset.mc_3.y = 1;
			this.m_mcAsset.mc_4.y = 1;
			this.m_mcAsset.mc_5.y = 1;
			this.m_mcAsset.mc_6.y = 1;
			this.m_mcAsset.mc_7.y = 1;
			this.m_mcAsset.mc_8.y = 1;
			
			if(isMachine){
				if(this.m_mcAsset){
					this.m_mcAsset.x = manager.LobbyManager.getInstance().stage.stageWidth - 630 - 268;
					this.m_mcAsset.y = 37;
					manager.LobbyManager.getInstance().lobbyView.setMachineMask();
				}
			}else{
				this.resize();
			}
			
			if(this.m_bHint && this.m_mcHintFull){
				setTimeout(function():void{
					this.m_mcHintFull.gotoAndPlay(1);
				},5)
			}
		}
		
		public toMulti():void{
			if( this.m_bmpBg ){
				if( this.m_bmpBg.parent){
					this.m_bmpBg.parent.removeChild( this.m_bmpBg );
				}
//				this.m_bmpBg.dispose();
				this.m_bmpBg = null;
			}
			this.m_btnRefresh.visible = false;
			this.m_mcAsset.mc_0.visible = false;
			this.m_btnResolution.visible = false;
			this.m_mcAsset.mc_1.visible = false;
			this.m_btnChannel.visible = false;
			this.m_mcAsset.mc_2.visible = false;
			this.m_btnDetail.visible = false;
//			this.m_mcAsset.mc_wifi.visible = false;
			this.m_mcAsset.mc_8.visible = false;
			
			for (var i:number= 3 ; i < 8; i++) 
			{
				this.m_mcAsset["mc_"+i].visible = true;
			}
			
			manager.LobbyManager.getInstance().lobbyView.advertisement.stop();
			this.hideHint();
			
			var iInitX  = 340;
			var uW : number = 50;
			var uY : number = 0;
//			this.m_mcAsset.mc_wifi.x = iInitX;
//			this.m_mcAsset.mc_wifi.y = uY;
			
			this.m_mcAsset.mc_full.x = iInitX;
			this.m_mcAsset.mc_full.y = uY;
			this.m_mcAsset.mc_normal.x = iInitX;
			this.m_mcAsset.mc_normal.y = uY;
			
			this.m_mcAsset.mc_personal.x = iInitX+uW;
			this.m_mcAsset.mc_personal.y = uY;
			
			this.m_mcAsset.mc_record.x = iInitX+uW*2;
			this.m_mcAsset.mc_record.y = uY;
			
			this.m_mcAsset.mc_contact.x = iInitX+uW*3;
			this.m_mcAsset.mc_contact.y = uY;
			
			this.m_mcAsset.mc_contact_view.x = iInitX+uW*2;
			this.m_mcAsset.mc_contact_view.y = 55;
			
			this.m_mcAsset.mc_setting.x = iInitX+uW*4;
			this.m_mcAsset.mc_setting.y = uY;
			
			this.m_mcAsset.mc_exit.x = iInitX+uW*5;
			this.m_mcAsset.mc_exit.y = uY;
			
			this.m_mcAsset.mc_3.x = iInitX + uW  - 10;
			this.m_mcAsset.mc_4.x = iInitX + uW*2 - 10;
			this.m_mcAsset.mc_5.x = iInitX + uW*3 - 10;
			this.m_mcAsset.mc_6.x = iInitX + uW*4 - 10;
			this.m_mcAsset.mc_7.x = iInitX + uW*5 - 10;
			this.m_mcAsset.mc_8.x = iInitX + uW*6 - 10;
			
			this.m_mcAsset.mc_3.y = 2;
			this.m_mcAsset.mc_4.y = 2;
			this.m_mcAsset.mc_5.y = 2;
			this.m_mcAsset.mc_6.y = 2;
			this.m_mcAsset.mc_7.y = 2;
			this.m_mcAsset.mc_8.y = 2;
			
			this.resize();
			
			if(this.m_bHint && this.m_mcHintFull){
				setTimeout(function():void{
					this.m_mcHintFull.gotoAndPlay(1);
				},5)
			}
		}
		
		public toMachine(_fQuality:Function, _fRefresh:Function, _fDetail:Function, _fExit:Function):void{
			if (this.m_bmpBg){
				this.m_bmpBg.visible=false;
			}
			if(this.fRefresh!=null){
				this.fRefresh = null;
			}
			if(this.fDetail!=null){
				this.fDetail = null;
			}
			if(this.fExitGame!=null){
				this.fExitGame = null;
			}
			
			manager.LobbyManager.getInstance().lobbyView.advertisement.stop();
			this.hideHint();
			
			this.fRefresh = _fRefresh;
			this.fExitGame = _fExit;
			this.fDetail = _fDetail;
			this.hideHint();
			
			this.m_btnRefresh.visible = true;
			this.m_btnResolution.visible = true;
			this.m_btnChannel.visible = true;
			this.m_btnDetail.visible = true;
			
			for (var i:number= 0; i < 9; i++) 
			{
				this.m_mcAsset["mc_"+i].visible = false;
			}
			
			
			
			
			var _nY : number = 23;
			var _nY2 : number = 70;
			var _nX	 : number = 410;
			var _offX: number = 40;
			
			//第一列組件
			
			this.m_mcAsset.mc_full.x = _nX;
			this.m_mcAsset.mc_full.y = _nY;
			
			this.m_mcAsset.mc_normal.x = this.m_mcAsset.mc_full.x;
			this.m_mcAsset.mc_normal.y = this.m_mcAsset.mc_full.y;
			
			this.m_mcAsset.mc_personal.x = _nX + _offX;
			this.m_mcAsset.mc_personal.y = _nY;
			
			this.m_mcAsset.mc_contact.x	= _nX + _offX*2;
			this.m_mcAsset.mc_contact.y	= _nY;
			
			this.m_mcAsset.mc_contact_view.x = _nX + 20;
			this.m_mcAsset.mc_contact_view.y = _nY+55;			
			
			this.m_mcAsset.mc_setting.x	= _nX + _offX*3;
			this.m_mcAsset.mc_setting.y	= _nY;
			
			this.m_mcAsset.mc_exit.x		= _nX + _offX*4;
			this.m_mcAsset.mc_exit.y		= _nY;
			
			//第二列組件
			this.m_mcAsset.mc_refresh.x	= _nX;
			this.m_mcAsset.mc_refresh.y	= _nY2;
//			this.m_mcAsset.mc_quality.x	= this.m_mcAsset.mc_personal.x;
//			this.m_mcAsset.mc_quality.y	= _nY2 + 2;

			this.m_btnResolution.x = this.m_mcAsset.mc_personal.x;
			this.m_btnResolution.y = _nY2;

			this.m_mcAsset.mc_detail.x	= this.m_mcAsset.mc_contact.x;
			this.m_mcAsset.mc_detail.y	= _nY2;
			
			this.m_mcAsset.mc_channel.x	= this.m_mcAsset.mc_setting.x;
			this.m_mcAsset.mc_channel.y	= _nY2;	
			
			this.m_mcAsset.mc_record.x	= this.m_mcAsset.mc_exit.x;
			this.m_mcAsset.mc_record.y	= _nY2;	
		}
		
		public onChangeLanguage():void{
			if(this.toolContact){
				this.toolContact.onChangeLanguage();
			}
			if(this.m_mcHintLabel){
				this.m_mcHintLabel.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			}
		}
				
		
		
		public screenFull(_bValue: boolean):void{
			this.m_btnNormal.visible = _bValue;
			this.m_btnFull.visible = !_bValue;
		}
		
		public changeResolution():void{
			this.m_btnResolution.changeResolution();
		}
		
		
		get currentResolution():number
		{
			return this.m_currentResolution;
		}
		
		set  currentResolution(value:number)
		{
			this.m_currentResolution = value;
		}
		
		public setBtnChannelValue(_uValue:number):void{
			if(this.m_mcAsset){
				if(_uValue>4){
					_uValue = 5;
					console.log(this, "频道设置异常。。。");
				}
				(this.m_mcAsset.mc_channel.mc_label).gotoAndStop(_uValue);
			}
		}
		
		public setData():void{
			if(manager.SharedObjectManager.getResolution()==null){
				if(model.LobbyData.getInstance().lobbyInfo.currentResolution)
				{
					this.currentResolution = model.LobbyData.getInstance().lobbyInfo.currentResolution.PriorityNo;
				}
			}else{
				this.currentResolution = manager.SharedObjectManager.getResolution().PriorityNo;
			}
			this.m_btnResolution.setData();
			this.m_btnResolution.visible = false;
		}
		
		
		private initHint():void{
			this.m_mcHint = this.m_mcAsset.mc_hint;
			this.m_mcHintLabel = this.m_mcHint.mc_label;
			if(this.m_mcHintLabel){
				this.m_mcHintLabel.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			}
			this.m_btnHintClose = new ui.button.SingleButtonMC(this.m_mcHint.mc_close,function():void{
//				m_mcHint.removeEventListener(mouse.MouseEvent.MOUSE_OVER, hintOver);
//				m_mcHint.removeEventListener(mouse.MouseEvent.MOUSE_OUT, hintOut);
//				m_mcHint.gotoAndStop(1);
				if(this.m_mcHint.parent){
					this.m_mcHint.parent.removeChild(this.m_mcHint);
				}
				this.m_mcHint = null;
			});
//			m_mcHint.gotoAndPlay(1);
//			
//			var hintOver : = function():void{
//				m_mcHint.gotoAndStop(m_mcHint.currentFrame);
//			};
//			
//			var hintOut : = function():void{
//				m_mcHint.gotoAndPlay(m_mcHint.currentFrame);
//			};
//			
//			m_mcHint.addEventListener(mouse.MouseEvent.MOUSE_OVER, hintOver);
//			m_mcHint.addEventListener(mouse.MouseEvent.MOUSE_OUT, hintOut);
			
		}
		private showHint():void{
			if(this.m_mcHint){
//				m_mcHint.gotoAndPlay(1);
				this.m_mcHint.visible = true;
			}
			if(this.m_mcHintFull){
				this.m_mcHintFull.gotoAndPlay(1);
			}
		}
		private hideHint():void{
			if(this.m_mcHint){
//				m_mcHint.gotoAndStop(1);
				this.m_mcHint.visible = false;
			}
			if(this.m_mcHintFull){
				this.m_mcHintFull.gotoAndStop(1);
			}
		}
		
	}
}

class Resolution{
	private m_btnSD					:	ui.button.SingleButtonMC;				//标清频道
	private m_btnHD					:	ui.button.SingleButtonMC;				//高清频道
	private m_btnCurrent			:	ui.button.SingleButtonMC;
	private m_mcAsset			;
	
	public Resolution(_mcAsset){
		this.m_mcAsset = _mcAsset;
		
		this.m_btnSD = new ui.button.SingleButtonMC(_mcAsset.mc_sd, function(evt:MouseEvent):void{
			
			if(manager.LobbyManager.getInstance().IsLiveConnected()){
				manager.LobbyManager.getInstance().bClickResolution = true;
			}
			
			manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
			manager.TipManager.getInstance().hide();

			manager.LobbyManager.getInstance().lobbyView.toolView.currentResolution = define.Define.HD;
			
			manager.SharedObjectManager.setResolution(lobby.model.LobbyData.getInstance().lobbyInfo.getResolutionByIndex(define.Define.HD));
			manager.SharedObjectManager.flush();
			
			this.changeResolution();
			
			if(manager.LobbyManager.getInstance().fChangChannel != null){
				manager.LobbyManager.getInstance().fChangChannel();
			}
			
			manager.LobbyManager.getInstance().hideChannel();
			manager.LobbyManager.getInstance().hidePanelDetail();
			manager.LobbyManager.getInstance().hidePersonalInformation();
			manager.LobbyManager.getInstance().lobbyView.toolView.toolContact.hide();
		});
		this.m_btnSD.fOnOver = function():void{
			manager.TipManager.getInstance().show(manager.LobbyManager.getInstance().getLanguageString(language.Language.sTip_Tool_SD),manager.TipManager.UP,this.m_mcAsset.localToGlobal(new egret.Point(this.m_mcAsset.mc_sd.x+15,this.m_mcAsset.mc_sd.y+30)),1);
		};
		this.m_btnSD.fOnOut = function():void{
			manager.TipManager.getInstance().hide();
		};
		this.m_btnSD.visible = false;
		
		this.m_btnHD = new ui.button.SingleButtonMC(_mcAsset.mc_hd, function(evt:MouseEvent):void{
			
			if(manager.LobbyManager.getInstance().IsLiveConnected()){
				manager.LobbyManager.getInstance().bClickResolution = true;
			}
			
			manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
			manager.TipManager.getInstance().hide();
			
			manager.LobbyManager.getInstance().lobbyView.toolView.currentResolution = define.Define.SD;
			
			manager.SharedObjectManager.setResolution(lobby.model.LobbyData.getInstance().lobbyInfo.getResolutionByIndex(define.Define.SD));
			manager.SharedObjectManager.flush();
			
			this.changeResolution();
			
			if(manager.LobbyManager.getInstance().fChangChannel != null){
				manager.LobbyManager.getInstance().fChangChannel();
			}
			
			manager.LobbyManager.getInstance().hideChannel();
			manager.LobbyManager.getInstance().hidePanelDetail();
			manager.LobbyManager.getInstance().hidePersonalInformation();
			manager.LobbyManager.getInstance().lobbyView.toolView.toolContact.hide();
		});
		this.m_btnHD.fOnOver = function():void{
			manager.TipManager.getInstance().show(manager.LobbyManager.getInstance().getLanguageString(language.Language.sTip_Tool_HD),manager.TipManager.UP,this.m_mcAsset.localToGlobal(new egret.Point(this.m_mcAsset.mc_hd.x+15,this.m_mcAsset.mc_hd.y+30)),1);
		};
		this.m_btnHD.fOnOut = function():void{
			manager.TipManager.getInstance().hide();
		};
		this.m_btnHD.visible = false;
		
		
	}
	
	public setData():void{
		this.changeResolution();
	}
	
	set  visible(_bValue: boolean){
		if(this.m_btnCurrent){
			this.m_btnCurrent.visible = _bValue;
		}
		
		if(!_bValue){
			this.m_btnSD.visible = false;
			this.m_btnHD.visible = false;
		}else{
			this.IsQualified();
		}
	}
	
	set  x(_iValue:number){
		this.m_mcAsset.mc_sd.x = _iValue;
		this.m_mcAsset.mc_hd.x = _iValue;
	}
	
	set  y(_iValue:number){
		this.m_mcAsset.mc_sd.y = _iValue;
		this.m_mcAsset.mc_hd.y = _iValue;
	}
	
	public IsQualified(): boolean{
		//检测视讯解析度资料笔数和priorityNo是否正确
		var data = lobby.model.LobbyData.getInstance().lobbyInfo.vecResolutionList;
		if(!data || data.length != 3){//解析度資料筆數必须为3筆
			this.m_btnSD.visible = false;
			this.m_btnHD.visible = false;
			return false;
		}
		
		if(data[0].PriorityNo != 1 || data[1].PriorityNo != 2 || data[2].PriorityNo != 3){//PriorityNo必须为1~3
			this.m_btnSD.visible = false;
			this.m_btnHD.visible = false;
			return false;
		}
		
		return true;
	}
	
	public changeResolution():void{
		if(!this.IsQualified()){
			return;
		}
		
		if( manager.SharedObjectManager.getResolution() == null ){
			
			if(lobby.model.LobbyData.getInstance().lobbyInfo.currentResolution)
			{
				switch(lobby.model.LobbyData.getInstance().lobbyInfo.currentResolution.PriorityNo){
					case define.Define.HD:
						this.m_btnCurrent = this.m_btnHD;
						this.m_btnCurrent.visible = true;
						this.m_btnSD.visible = false;
						break;
					
					case define.Define.SD:
						this.m_btnCurrent = this.m_btnSD;
						this.m_btnCurrent.visible = true;
						this.m_btnHD.visible = false;
						break;
				}
			}
			
		}else{
			switch(manager.SharedObjectManager.getResolution().PriorityNo){
				case define.Define.HD:
					this.m_btnCurrent = this.m_btnHD;
					this.m_btnCurrent.visible = true;
					this.m_btnSD.visible = false;
					break;
				
				case define.Define.SD:
					this.m_btnCurrent = this.m_btnSD;
					this.m_btnCurrent.visible = true;
					this.m_btnHD.visible = false;
					break;
			}
		}
		
		if(manager.LobbyManager.getInstance().exitLevel!=define.Define.EXIT_GAME){
			this.m_btnSD.visible = false;
			this.m_btnHD.visible = false;
		}
		
	}
	
}