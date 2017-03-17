module lobby.view.tool {
	export class Tool implements ISprite{
		private var m_mcAsset				:	*;							//美术资源
		
		private var m_btnRefresh			:	SingleButtonMC;				//重整视讯
		
		private var m_btnResolution			:	Resolution;					//分辨率
		private var m_btnChannel			:	SingleButtonMC;				//频道选择
		private var m_btnPersonalInfomation	:	SingleButtonMC;				//个人资讯
		private var m_btnContact			:	SingleButtonMC;				//联系客服
		private var m_btnFull				:	SingleButtonMC;				//全屏按钮
		private var m_btnNormal				:	SingleButtonMC;				//退出全屏
		private var m_btnDetail				:	SingleButtonMC;				//桌子详情
		private var m_btnRecord				:	SingleButtonMC;				//账户记录
		private var m_btnSetting			:	SingleButtonMC;				//设置按钮
		public var btnExit					:	SingleButtonMC;				//退出按钮
		
		public var fRefresh					:	Function;					//重整视讯
		public var fDetail					:	Function;					//桌子详情
		public var fExitGame				:	Function;					//退出游戏
		
		public var iExitLevel				:	int;						//退出等级	0-大厅，1-游戏
//		public var wifi						:	Tool_Wifi;					//网络信号
		public var toolContact				:	Tool_Contact;				//联系客服
		private var m_bmpBg					:	*;							//功能列背景
		private var m_spParent				:	Sprite;						//外部容器
		
		private var m_currentResolution		:	int;						//当前模式
		
		private var m_mcHint				:	MovieClip;					//全屏提示
		private var m_mcHintFull			:	MMovieClip;
		private var m_btnHintClose			:	SingleButtonMC;				//关闭按钮
		private var m_mcHintLabel			:	MovieClip;					//提示标签
		private var m_bHint					:	Boolean;					//提示状态
		public var iMode					:	uint;						//当前模式
		public constructor(_spParent:Sprite) {
		
			if(SharedObjectManager.getClickFullScreenCount()<12){
				m_bHint = true;
			}else{
				m_bHint = false;
			}
			m_mcAsset = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_LOBBY,"Tool_View_Asset");
			m_mcAsset.cacheAsBitmap = true;
			_spParent.addChild(m_mcAsset);
			m_spParent = _spParent;
//			m_mcAsset.y = 30;
			
			m_btnRefresh = new SingleButtonMC(m_mcAsset.mc_refresh, function(evt:MouseEvent):void{
				if(LobbyManager.getInstance().IsLiveConnected()){
					LobbyManager.getInstance().bClickResolution = true;
				}
				SoundManager.getInstance().play(SoundPackage.sClick_Tools);
				TipManager.getInstance().hide();
				if(fRefresh!=null){
					fRefresh();
				}
				LobbyManager.getInstance().hideChannel();
				LobbyManager.getInstance().hidePanelDetail();
				LobbyManager.getInstance().hidePersonalInfomation();
				toolContact.hide();
			});
			m_btnRefresh.fOnOver = function():void{
				TipManager.getInstance().show(LobbyManager.getInstance().getLanguageString(Language.sTip_Refresh),TipManager.UP,m_mcAsset.localToGlobal(new Point(m_mcAsset.mc_refresh.x+15,m_mcAsset.mc_refresh.y+30)),1);
			};
			m_btnRefresh.fOnOut = function():void{
				TipManager.getInstance().hide();
			};
			
			m_btnResolution = new Resolution(m_mcAsset);
			
			m_btnChannel = new SingleButtonMC(m_mcAsset.mc_channel, function(event:MouseEvent):void{
				SoundManager.getInstance().play(SoundPackage.sPopupPanel);
				TipManager.getInstance().hide();
				if(toolContact){
					toolContact.hide();
				}
				LobbyManager.getInstance().hidePersonalInfomation();
				LobbyManager.getInstance().hideSystemSetting();
				LobbyManager.getInstance().hidePanelDetail();
				LobbyManager.getInstance().showChannel();
			});
			m_btnChannel.fOnOver = function():void{
				TipManager.getInstance().show(LobbyManager.getInstance().getLanguageString(Language.sTip_Channel),TipManager.UP,m_mcAsset.localToGlobal(new Point(m_mcAsset.mc_channel.x+15,m_mcAsset.mc_channel.y+30)),1);
			};
			m_btnChannel.fOnOut = function():void{
				TipManager.getInstance().hide();
			};
			(m_mcAsset.mc_channel.mc_label as MovieClip).gotoAndStop(5);
			
//			var _bPersonal	:	Boolean;
			m_btnPersonalInfomation = new SingleButtonMC(m_mcAsset.mc_personal, function(evt:MouseEvent):void{
				SoundManager.getInstance().play(SoundPackage.sPopupPanel);
				
				TipManager.getInstance().hide();
				if(toolContact){
					toolContact.hide();
				}
				LobbyManager.getInstance().hideChannel();
				LobbyManager.getInstance().hideSystemSetting();
				LobbyManager.getInstance().hidePanelDetail();
				
				var point:Point = m_mcAsset.localToGlobal(new Point(m_mcAsset.mc_personal.x+15,m_mcAsset.mc_contact.y+30));
				switch(LobbyManager.getInstance().exitLevel){
					case Define.EXIT_LOBBY:
						LobbyManager.getInstance().showPersonalInfomation(point.x, point.y);
						break;
					case Define.EXIT_GAME:
						LobbyManager.getInstance().showPersonalInfomation(point.x, point.y);
						break;
					case Define.EXIT_TEL_LOBBY:
						break;
					case Define.EXIT_MULTI_TABLE:
						LobbyManager.getInstance().showPersonalInfomation(point.x, point.y);
						break;
				}
					
//				}
//				
//				_bPersonal = !_bPersonal;
			});
			m_btnPersonalInfomation.fOnOver = function():void{
				TipManager.getInstance().show(LobbyManager.getInstance().getLanguageString(Language.sTip_Tool_PersonalInfo),TipManager.UP,m_mcAsset.localToGlobal(new Point(m_mcAsset.mc_personal.x+15,m_mcAsset.mc_personal.y+30)),1);
			};
			m_btnPersonalInfomation.fOnOut = function():void{
				TipManager.getInstance().hide();
			};
			
			
//			wifi = new Tool_Wifi(m_mcAsset.mc_wifi);
			
			toolContact = new Tool_Contact(m_mcAsset.mc_contact_view);
			
			m_mcHintFull = new MMovieClip(m_mcAsset.mc_full.mc);
			m_btnFull = new SingleButtonMC(m_mcAsset.mc_full, function(evt:MouseEvent):void{
				SharedObjectManager.setClickFullScreenCount();
				SharedObjectManager.flush();
				m_bHint = false;
				hideHint();
				SoundManager.getInstance().play(SoundPackage.sClick_Tools);
				TipManager.getInstance().hide();
				screenFull(true);
				LobbyManager.getInstance().full();
			});
			m_btnFull.fOnOver = function():void{
				if(m_bHint){
					m_mcHintFull.gotoAndStop(1);
				}else{
					TipManager.getInstance().show(LobbyManager.getInstance().getLanguageString(Language.sTip_Tool_Full),TipManager.UP,m_mcAsset.localToGlobal(new Point(m_mcAsset.mc_full.x+15,m_mcAsset.mc_full.y+30)),1);
				}
			};
			m_btnFull.fOnOut = function():void{
				if(m_bHint){
					m_mcHintFull.gotoAndPlay(1);
				}else{
					TipManager.getInstance().hide();
				}
				
			};
			m_btnNormal = new SingleButtonMC(m_mcAsset.mc_normal, function(evt:MouseEvent):void{
				SoundManager.getInstance().play(SoundPackage.sClick_Tools);
				TipManager.getInstance().hide();
				screenFull(false);
				LobbyManager.getInstance().full();
			});
			m_btnNormal.fOnOver = function():void{
				TipManager.getInstance().show(LobbyManager.getInstance().getLanguageString(Language.sTip_Tool_ExitFull),TipManager.UP,m_mcAsset.localToGlobal(new Point(m_mcAsset.mc_normal.x+15,m_mcAsset.mc_normal.y+30)),1);
			};
			m_btnNormal.fOnOut = function():void{
				TipManager.getInstance().hide();
			};
			
			m_btnDetail = new SingleButtonMC(m_mcAsset.mc_detail, function():void{
				SoundManager.getInstance().play(SoundPackage.sPopupPanel);
				TipManager.getInstance().hide();
				if(toolContact){
					toolContact.hide();
				}
				LobbyManager.getInstance().hideChannel();
				LobbyManager.getInstance().hidePersonalInfomation();
				LobbyManager.getInstance().hideSystemSetting();
				
				if(fDetail!=null){
					fDetail();
				}else{
					LobbyManager.getInstance().showDialog(LobbyManager.getInstance().getLanguageString(Language.sPlease_Wait));
				}
			});
			m_btnDetail.fOnOver = function():void{
				TipManager.getInstance().show(LobbyManager.getInstance().getLanguageString(Language.sTip_Tool_Detail),TipManager.UP,m_mcAsset.localToGlobal(new Point(m_mcAsset.mc_detail.x+15,m_mcAsset.mc_detail.y+30)),1);
			};
			m_btnDetail.fOnOut = function():void{
				TipManager.getInstance().hide();
			};
			
			m_btnRecord = new SingleButtonMC(m_mcAsset.mc_record, function(event:MouseEvent):void{
				SoundManager.getInstance().play(SoundPackage.sPopupPanel);
				TipManager.getInstance().hide();
				if(toolContact){
					toolContact.hide();
				}
				LobbyManager.getInstance().hideChannel();
				LobbyManager.getInstance().hidePersonalInfomation();
				LobbyManager.getInstance().hideSystemSetting();
				LobbyManager.getInstance().hidePanelDetail();
//				LobbyManager.getInstance().showDialog(LobbyManager.getInstance().getLanguageString(Language.sPlease_Wait));
				GameRecordManager.getInstance().showBetRecordPannel();
			});
			m_btnRecord.fOnOver = function():void{
				TipManager.getInstance().show(LobbyManager.getInstance().getLanguageString(Language.sTip_Tool_Record),TipManager.UP,m_mcAsset.localToGlobal(new Point(m_mcAsset.mc_record.x+15,m_mcAsset.mc_record.y+30)),1);
			};
			m_btnRecord.fOnOut = function():void{
				TipManager.getInstance().hide();
			};
			
			m_btnSetting = new SingleButtonMC(m_mcAsset.mc_setting, function(evt:MouseEvent):void{
				SoundManager.getInstance().play(SoundPackage.sPopupPanel);
				TipManager.getInstance().hide();
				if(toolContact){
					toolContact.hide();
				}
				LobbyManager.getInstance().hideChannel();
				LobbyManager.getInstance().hidePersonalInfomation();
				LobbyManager.getInstance().hidePanelDetail();
				LobbyManager.getInstance().showSystemSetting();
				SoundManager.getInstance().play(SoundPackage.sPopupPanel);
				//测试代码
//				LobbyManager.getInstance().showGoodRoadSetting();
			});
			m_btnSetting.fOnOver = function():void{
				TipManager.getInstance().show(LobbyManager.getInstance().getLanguageString(Language.sTip_Tool_System),TipManager.UP,m_mcAsset.localToGlobal(new Point(m_mcAsset.mc_setting.x+15,m_mcAsset.mc_setting.y+30)),1);
			};
			m_btnSetting.fOnOut = function():void{
				TipManager.getInstance().hide();
			};
			
			m_btnContact = new SingleButtonMC(m_mcAsset.mc_contact, function(evt:MouseEvent):void{
				SoundManager.getInstance().play(SoundPackage.sPopupPanel);
				TipManager.getInstance().hide();
				LobbyManager.getInstance().hideChannel();
				LobbyManager.getInstance().hidePersonalInfomation();
				LobbyManager.getInstance().hideSystemSetting();
				LobbyManager.getInstance().hidePanelDetail();
				toolContact.showOrHide();
				evt.stopImmediatePropagation();
			});
			m_btnContact.fOnOver = function():void{
				TipManager.getInstance().show(LobbyManager.getInstance().getLanguageString(Language.sTip_Tool_Other),TipManager.UP,m_mcAsset.localToGlobal(new Point(m_mcAsset.mc_contact.x+15,m_mcAsset.mc_contact.y+30)),1);
			};
			m_btnContact.fOnOut = function():void{
				TipManager.getInstance().hide();
			};
			
			btnExit = new SingleButtonMC(m_mcAsset.mc_exit, function(evt:MouseEvent):void{
				
//				Log.getInstance().log(this,"->点击退出");
				TipManager.getInstance().hide();
//				Log.getInstance().log(this,"->隐藏tip");
				switch(LobbyManager.getInstance().exitLevel){
					case Define.EXIT_LOBBY:
						SoundManager.getInstance().play(SoundPackage.sChangePage);
						LobbyManager.getInstance().showDialog(LobbyManager.getInstance().getLanguageString(Language.sExitLobby),function():void{
							LobbyManager.getInstance().sendLobbyLogout();
							LobbyManager.getInstance().leaveLobby();
//							NetWorkManager.getInstance().iLobbyNetWorkStatus = Define.LobbyDisconnect;
						});
						
						break;
					
					case Define.EXIT_GAME:
						SoundManager.getInstance().play(SoundPackage.sClick_Tools);
						if(fExitGame!=null){
//							Log.getInstance().log(this,"->准备执行退出行为");
							fExitGame();
//							Log.getInstance().log(this,"->退出完毕");
						}
						break;
					case Define.EXIT_TEL_LOBBY:
						SoundManager.getInstance().play(SoundPackage.sClick_Tools);
						LobbyManager.getInstance().exitTelLobby();
						break;
					case Define.EXIT_MULTI_TABLE:
						SoundManager.getInstance().play(SoundPackage.sChangePage);
						LobbyManager.getInstance().sendExitMultiTable();
						LobbyManager.getInstance().exitMultiTable();
						LobbyManager.getInstance().lobbyView.themeList.enable(true);
						break;
				}
			});
			btnExit.fOnOver = function():void{
				switch(LobbyManager.getInstance().exitLevel){
					case Define.EXIT_LOBBY:
						TipManager.getInstance().show(LobbyManager.getInstance().getLanguageString(Language.sTip_Tool_Exit),TipManager.UP,m_mcAsset.localToGlobal(new Point(m_mcAsset.mc_exit.x+15,m_mcAsset.mc_exit.y+30)),1);
						break;
					case Define.EXIT_GAME:
					case Define.EXIT_MULTI_TABLE:
						TipManager.getInstance().show(LobbyManager.getInstance().getLanguageString(Language.sTip_Back_To_Lobby),TipManager.UP,m_mcAsset.localToGlobal(new Point(m_mcAsset.mc_exit.x+15,m_mcAsset.mc_exit.y+30)),1);
						break;
				}
				
			};
			btnExit.fOnOut = function():void{
				TipManager.getInstance().hide();
			};
			
			initHint();
			screenFull(false);
			resize();
			toLobby();
		}
		
		public function destroy():void
		{
			
			if(fExitGame!=null){
				fExitGame = null;
			}
			
			if(m_btnPersonalInfomation){
				m_btnPersonalInfomation.destroy();
				m_btnPersonalInfomation = null;
			}
			
			if(m_btnRecord){
				m_btnRecord.destroy();
				m_btnRecord = null;
			}
			
			if(m_btnContact){
				m_btnContact.destroy();
				m_btnContact = null;
			}
			
			if(toolContact){
				toolContact.destroy();
				toolContact = null;
			}
			
			if(m_mcAsset){
				if(m_mcAsset.parent){
					m_mcAsset.parent.removeChild(m_mcAsset);
				}
				m_mcAsset = null;
			}
			if( m_bmpBg ){
				if( m_bmpBg.parent ) {
					m_bmpBg.parent.removeChild( m_bmpBg );
				}
//				m_bmpBg.dispose();
				m_bmpBg = null;
			}
			if(m_spParent){
				m_spParent = null;
			}
			
		}
		
		public function cleanGameFun():void{
			fRefresh=null;
			fDetail=null;
			fExitGame=null;
		}
		
		
		public function resize():void{
			if(m_mcAsset){
				m_mcAsset.x = LobbyManager.getInstance().stage.stageWidth - 630;
				m_mcAsset.y = 0;
			}
		}
		
		public function getView():Sprite{
			return m_mcAsset as Sprite;
		}
		
		public function toLobby():void{
		
//			LobbyManager.getInstance().videoMaxBytePerSecond = LobbyManager.getInstance().lobbyView.liveVideo;
			if( m_bmpBg ){
				if( m_bmpBg.parent){
					m_bmpBg.parent.removeChild( m_bmpBg );
				}
//				m_bmpBg.dispose();
				m_bmpBg = null;
			}
			
//			m_mcAsset.mc_bg.visible = false;
			
			m_btnRefresh.visible = false;
			m_mcAsset.mc_0.visible = false;
			m_btnResolution.visible = false;
			m_mcAsset.mc_1.visible = false;
			m_btnChannel.visible = false;
			m_mcAsset.mc_2.visible = false;
			m_btnDetail.visible = false;
			m_btnRecord.visible=true;
			
			for (var i:int = 3; i < 9; i++) 
			{
				m_mcAsset["mc_"+i].visible = true;
			}
			
			if(LobbyManager.getInstance().lobbyView.advertisement){
				LobbyManager.getInstance().lobbyView.advertisement.start();
			}
			if(m_bHint){
				showHint();
			}else{
				hideHint();
			}
			
//			m_mcAsset.mc_wifi.visible = true;
			m_mcAsset.mc_8.visible = true;
			
			var uInitX:	int	=	45;
			var uW : uint = 65;
			var uY : uint = 0;
			m_mcAsset.mc_refresh.x = 0;
			m_mcAsset.mc_refresh.y = uY;
			
			m_btnResolution.x = uW;
			m_btnResolution.y = uY;
			
			
			m_mcAsset.mc_channel.x = uW*2;
			m_mcAsset.mc_channel.y = uY;
			
			
			m_mcAsset.mc_detail.x = uW*3;
			m_mcAsset.mc_detail.y = uY;
			
			m_mcAsset.mc_full.x = uW*4;
			m_mcAsset.mc_full.y = uY;
			m_mcAsset.mc_normal.x = uW*4;
			m_mcAsset.mc_normal.y = uY;
			
			m_mcAsset.mc_personal.x = uW*5;
			m_mcAsset.mc_personal.y = uY;
			
			m_mcAsset.mc_record.x = uW*6;
			m_mcAsset.mc_record.y = uY;
			
			m_mcAsset.mc_contact.x = uW*7;
			m_mcAsset.mc_contact.y = uY;
			m_mcAsset.mc_contact_view.x = uW*6;
			m_mcAsset.mc_contact_view.y = 55;
			
			m_mcAsset.mc_setting.x = uW*8;
			m_mcAsset.mc_setting.y = uY;
			
			m_mcAsset.mc_exit.x = uW*9;
			m_mcAsset.mc_exit.y = uY;
			
			m_mcAsset.mc_0.x = uInitX;
			m_mcAsset.mc_1.x = uInitX + uW;
			m_mcAsset.mc_2.x = uInitX + uW*2;
			m_mcAsset.mc_3.x = uInitX + uW*3;
			m_mcAsset.mc_4.x = uInitX + uW*4;
			m_mcAsset.mc_5.x = uInitX + uW*5;
			m_mcAsset.mc_6.x = uInitX + uW*6;
			m_mcAsset.mc_7.x = uInitX + uW*7;
			m_mcAsset.mc_8.x = uInitX + uW*8;
			
			m_mcAsset.mc_0.y = 1;
			m_mcAsset.mc_1.y = 1;
			m_mcAsset.mc_2.y = 1;
			m_mcAsset.mc_3.y = 1;
			m_mcAsset.mc_4.y = 1;
			m_mcAsset.mc_5.y = 1;
			m_mcAsset.mc_6.y = 1;
			m_mcAsset.mc_7.y = 1;
			m_mcAsset.mc_8.y = 1;
			
			resize();
		}
		
		//个人资讯
		public function getBtnDetailPoint():Point{
			var point:Point = m_mcAsset.localToGlobal(new Point(m_mcAsset.mc_detail.x+15,m_mcAsset.mc_detail.y+30));;
			return point;
		}
		
		//频道
		public function getBtnChannelPoint():Point{
			var point:Point = m_mcAsset.localToGlobal(new Point(m_mcAsset.mc_channel.x+15,m_mcAsset.mc_channel.y+30));;
			return point;
		}
		
		//系统设置
		public function getBtnSettingPoint():Point{
			var point:Point = m_mcAsset.localToGlobal(new Point(m_mcAsset.mc_setting.x+15,m_mcAsset.mc_setting.y+30));;
			return point;
		}
		
		public function toGame(_fQuality:Function, _fRefresh:Function, _fDetail:Function, _fExit:Function,isMachine=false):void{
			if(fRefresh!=null){
				fRefresh = null;
			}
			if(fDetail!=null){
				fDetail = null;
			}
			if(fExitGame!=null){
				fExitGame = null;
			}
			
			LobbyManager.getInstance().lobbyView.advertisement.stop();
			hideHint();
			
			fRefresh = _fRefresh;
			fExitGame = _fExit;
			fDetail = _fDetail;
			
			if( !m_bmpBg ){
				m_bmpBg = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_PANEL,"Tool_Bg_Asset");
				m_bmpBg.width = 657;
				m_bmpBg.height = 55;
				m_mcAsset.addChildAt(m_bmpBg,0);
				m_bmpBg.x = -25;
				m_bmpBg.y = -15;
				
			}
			
		
				m_bmpBg.visible=true;
			
			
//			m_mcAsset.mc_bg.visible = true;
			m_btnRefresh.visible = true;
			m_btnResolution.visible = true;
			m_btnChannel.visible = true;
			m_btnDetail.visible = true;
//			m_btnQulity.visible = true;
			
			for (var i:int = 0 ; i < 9; i++) 
			{
				m_mcAsset["mc_"+i].visible = true;
			}
			
			var uInitX:	int	=	45;
			var uW : uint = 65;
			var uY : uint = 0;
			m_mcAsset.mc_refresh.x = 0;
			m_mcAsset.mc_refresh.y = uY;
			
			m_btnResolution.x = uW;
			m_btnResolution.y = uY;
			
			
			m_mcAsset.mc_channel.x = uW*2;
			m_mcAsset.mc_channel.y = uY;
			
			
			m_mcAsset.mc_detail.x = uW*3;
			m_mcAsset.mc_detail.y = uY;
			
			m_mcAsset.mc_full.x = uW*4;
			m_mcAsset.mc_full.y = uY;
			m_mcAsset.mc_normal.x = uW*4;
			m_mcAsset.mc_normal.y = uY;
			
			m_mcAsset.mc_personal.x = uW*5;
			m_mcAsset.mc_personal.y = uY;
			
			m_mcAsset.mc_record.x = uW*6;
			m_mcAsset.mc_record.y = uY;
			
			m_mcAsset.mc_contact.x = uW*7;
			m_mcAsset.mc_contact.y = uY;
			m_mcAsset.mc_contact_view.x = uW*6;
			m_mcAsset.mc_contact_view.y = 55;
			
			m_mcAsset.mc_setting.x = uW*8;
			m_mcAsset.mc_setting.y = uY;
			
			m_mcAsset.mc_exit.x = uW*9;
			m_mcAsset.mc_exit.y = uY;
			
			m_mcAsset.mc_0.x = uInitX;
			m_mcAsset.mc_1.x = uInitX + uW;
			m_mcAsset.mc_2.x = uInitX + uW*2;
			m_mcAsset.mc_3.x = uInitX + uW*3;
			m_mcAsset.mc_4.x = uInitX + uW*4;
			m_mcAsset.mc_5.x = uInitX + uW*5;
			m_mcAsset.mc_6.x = uInitX + uW*6;
			m_mcAsset.mc_7.x = uInitX + uW*7;
			m_mcAsset.mc_8.x = uInitX + uW*8;
			
			m_mcAsset.mc_0.y = 1;
			m_mcAsset.mc_1.y = 1;
			m_mcAsset.mc_2.y = 1;
			m_mcAsset.mc_3.y = 1;
			m_mcAsset.mc_4.y = 1;
			m_mcAsset.mc_5.y = 1;
			m_mcAsset.mc_6.y = 1;
			m_mcAsset.mc_7.y = 1;
			m_mcAsset.mc_8.y = 1;
			
			if(isMachine){
				if(m_mcAsset){
					m_mcAsset.x = LobbyManager.getInstance().stage.stageWidth - 630 - 268;
					m_mcAsset.y = 37;
					LobbyManager.getInstance().lobbyView.setMachineMask();
				}
			}else{
				resize();
			}
			
			if(m_bHint && m_mcHintFull){
				setTimeout(function():void{
					m_mcHintFull.gotoAndPlay(1);
				},5)
			}
		}
		
		public function toMulti():void{
			if( m_bmpBg ){
				if( m_bmpBg.parent){
					m_bmpBg.parent.removeChild( m_bmpBg );
				}
//				m_bmpBg.dispose();
				m_bmpBg = null;
			}
			m_btnRefresh.visible = false;
			m_mcAsset.mc_0.visible = false;
			m_btnResolution.visible = false;
			m_mcAsset.mc_1.visible = false;
			m_btnChannel.visible = false;
			m_mcAsset.mc_2.visible = false;
			m_btnDetail.visible = false;
//			m_mcAsset.mc_wifi.visible = false;
			m_mcAsset.mc_8.visible = false;
			
			for (var i:int = 3 ; i < 8; i++) 
			{
				m_mcAsset["mc_"+i].visible = true;
			}
			
			LobbyManager.getInstance().lobbyView.advertisement.stop();
			hideHint();
			
			var iInitX : int = 340;
			var uW : uint = 50;
			var uY : uint = 0;
//			m_mcAsset.mc_wifi.x = iInitX;
//			m_mcAsset.mc_wifi.y = uY;
			
			m_mcAsset.mc_full.x = iInitX;
			m_mcAsset.mc_full.y = uY;
			m_mcAsset.mc_normal.x = iInitX;
			m_mcAsset.mc_normal.y = uY;
			
			m_mcAsset.mc_personal.x = iInitX+uW;
			m_mcAsset.mc_personal.y = uY;
			
			m_mcAsset.mc_record.x = iInitX+uW*2;
			m_mcAsset.mc_record.y = uY;
			
			m_mcAsset.mc_contact.x = iInitX+uW*3;
			m_mcAsset.mc_contact.y = uY;
			
			m_mcAsset.mc_contact_view.x = iInitX+uW*2;
			m_mcAsset.mc_contact_view.y = 55;
			
			m_mcAsset.mc_setting.x = iInitX+uW*4;
			m_mcAsset.mc_setting.y = uY;
			
			m_mcAsset.mc_exit.x = iInitX+uW*5;
			m_mcAsset.mc_exit.y = uY;
			
			m_mcAsset.mc_3.x = iInitX + uW  - 10;
			m_mcAsset.mc_4.x = iInitX + uW*2 - 10;
			m_mcAsset.mc_5.x = iInitX + uW*3 - 10;
			m_mcAsset.mc_6.x = iInitX + uW*4 - 10;
			m_mcAsset.mc_7.x = iInitX + uW*5 - 10;
			m_mcAsset.mc_8.x = iInitX + uW*6 - 10;
			
			m_mcAsset.mc_3.y = 2;
			m_mcAsset.mc_4.y = 2;
			m_mcAsset.mc_5.y = 2;
			m_mcAsset.mc_6.y = 2;
			m_mcAsset.mc_7.y = 2;
			m_mcAsset.mc_8.y = 2;
			
			resize();
			
			if(m_bHint && m_mcHintFull){
				setTimeout(function():void{
					m_mcHintFull.gotoAndPlay(1);
				},5)
			}
		}
		
		public function toMachine(_fQuality:Function, _fRefresh:Function, _fDetail:Function, _fExit:Function):void{
			if (m_bmpBg){
				m_bmpBg.visible=false;
			}
			if(fRefresh!=null){
				fRefresh = null;
			}
			if(fDetail!=null){
				fDetail = null;
			}
			if(fExitGame!=null){
				fExitGame = null;
			}
			
			LobbyManager.getInstance().lobbyView.advertisement.stop();
			hideHint();
			
			fRefresh = _fRefresh;
			fExitGame = _fExit;
			fDetail = _fDetail;
			hideHint();
			
			m_btnRefresh.visible = true;
			m_btnResolution.visible = true;
			m_btnChannel.visible = true;
			m_btnDetail.visible = true;
			
			for (var i:int = 0; i < 9; i++) 
			{
				m_mcAsset["mc_"+i].visible = false;
			}
			
			
			
			
			var _nY : Number = 23;
			var _nY2 : Number = 70;
			var _nX	 : Number = 410;
			var _offX: Number = 40;
			
			//第一列組件
			
			m_mcAsset.mc_full.x = _nX;
			m_mcAsset.mc_full.y = _nY;
			
			m_mcAsset.mc_normal.x = m_mcAsset.mc_full.x;
			m_mcAsset.mc_normal.y = m_mcAsset.mc_full.y;
			
			m_mcAsset.mc_personal.x = _nX + _offX;
			m_mcAsset.mc_personal.y = _nY;
			
			m_mcAsset.mc_contact.x	= _nX + _offX*2;
			m_mcAsset.mc_contact.y	= _nY;
			
			m_mcAsset.mc_contact_view.x = _nX + 20;
			m_mcAsset.mc_contact_view.y = _nY+55;			
			
			m_mcAsset.mc_setting.x	= _nX + _offX*3;
			m_mcAsset.mc_setting.y	= _nY;
			
			m_mcAsset.mc_exit.x		= _nX + _offX*4;
			m_mcAsset.mc_exit.y		= _nY;
			
			//第二列組件
			m_mcAsset.mc_refresh.x	= _nX;
			m_mcAsset.mc_refresh.y	= _nY2;
//			m_mcAsset.mc_quality.x	= m_mcAsset.mc_personal.x;
//			m_mcAsset.mc_quality.y	= _nY2 + 2;

			m_btnResolution.x = m_mcAsset.mc_personal.x;
			m_btnResolution.y = _nY2;

			m_mcAsset.mc_detail.x	= m_mcAsset.mc_contact.x;
			m_mcAsset.mc_detail.y	= _nY2;
			
			m_mcAsset.mc_channel.x	= m_mcAsset.mc_setting.x;
			m_mcAsset.mc_channel.y	= _nY2;	
			
			m_mcAsset.mc_record.x	= m_mcAsset.mc_exit.x;
			m_mcAsset.mc_record.y	= _nY2;	
		}
		
		public function onChangeLanguage():void{
			if(toolContact){
				toolContact.onChangeLanguage();
			}
			if(m_mcHintLabel){
				m_mcHintLabel.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			}
		}
				
		
		
		public function screenFull(_bValue:Boolean):void{
			m_btnNormal.visible = _bValue;
			m_btnFull.visible = !_bValue;
		}
		
		public function changeResolution():void{
			m_btnResolution.changeResolution();
		}
		
		
		public function get currentResolution():int
		{
			return m_currentResolution;
		}
		
		public function set currentResolution(value:int):void
		{
			m_currentResolution = value;
		}
		
		public function setBtnChannelValue(_uValue:uint):void{
			if(m_mcAsset){
				if(_uValue>4){
					_uValue = 5;
					Log.getInstance().log(this, "频道设置异常。。。");
				}
				(m_mcAsset.mc_channel.mc_label as MovieClip).gotoAndStop(_uValue);
			}
		}
		
		public function setData():void{
			if(SharedObjectManager.getResolution()==null){
				if(LobbyData.getInstance().lobbyInfo.currentResolution)
				{
					currentResolution = LobbyData.getInstance().lobbyInfo.currentResolution.PriorityNo;
				}
			}else{
				currentResolution = SharedObjectManager.getResolution().PriorityNo;
			}
			m_btnResolution.setData();
			m_btnResolution.visible = false;
		}
		
		
		private function initHint():void{
			m_mcHint = m_mcAsset.mc_hint;
			m_mcHintLabel = m_mcHint.mc_label;
			if(m_mcHintLabel){
				m_mcHintLabel.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			}
			m_btnHintClose = new SingleButtonMC(m_mcHint.mc_close,function():void{
//				m_mcHint.removeEventListener(MouseEvent.MOUSE_OVER, hintOver);
//				m_mcHint.removeEventListener(MouseEvent.MOUSE_OUT, hintOut);
//				m_mcHint.gotoAndStop(1);
				if(m_mcHint.parent){
					m_mcHint.parent.removeChild(m_mcHint);
				}
				m_mcHint = null;
			});
//			m_mcHint.gotoAndPlay(1);
//			
//			var hintOver : Function = function():void{
//				m_mcHint.gotoAndStop(m_mcHint.currentFrame);
//			};
//			
//			var hintOut : Function = function():void{
//				m_mcHint.gotoAndPlay(m_mcHint.currentFrame);
//			};
//			
//			m_mcHint.addEventListener(MouseEvent.MOUSE_OVER, hintOver);
//			m_mcHint.addEventListener(MouseEvent.MOUSE_OUT, hintOut);
			
		}
		private function showHint():void{
			if(m_mcHint){
//				m_mcHint.gotoAndPlay(1);
				m_mcHint.visible = true;
			}
			if(m_mcHintFull){
				m_mcHintFull.gotoAndPlay(1);
			}
		}
		private function hideHint():void{
			if(m_mcHint){
//				m_mcHint.gotoAndStop(1);
				m_mcHint.visible = false;
			}
			if(m_mcHintFull){
				m_mcHintFull.gotoAndStop(1);
			}
		}
		
	}
}
import flash.display.MovieClip;
import flash.events.MouseEvent;
import flash.geom.Point;

import component.button.SingleButtonMC;

import define.Define;

import language.Language;

import manager.LobbyManager;
import manager.SharedObjectManager;
import manager.SoundManager;
import manager.TipManager;

import models.LobbyData;
import models.struct.ResolutionStruct;

import sounds.SoundPackage;

class Resolution{
	private var m_btnSD					:	SingleButtonMC;				//标清频道
	private var m_btnHD					:	SingleButtonMC;				//高清频道
	private var m_btnCurrent			:	SingleButtonMC;
	private var m_mcAsset				:	MovieClip;
	
	public function Resolution(_mcAsset:MovieClip){
		m_mcAsset = _mcAsset;
		
		m_btnSD = new SingleButtonMC(_mcAsset.mc_sd, function(evt:MouseEvent):void{
			
			if(LobbyManager.getInstance().IsLiveConnected()){
				LobbyManager.getInstance().bClickResolution = true;
			}
			
			SoundManager.getInstance().play(SoundPackage.sClick_Tools);
			TipManager.getInstance().hide();

			LobbyManager.getInstance().lobbyView.toolView.currentResolution = Define.HD;
			
			SharedObjectManager.setResolution(LobbyData.getInstance().lobbyInfo.getResolutionByIndex(Define.HD));
			SharedObjectManager.flush();
			
			changeResolution();
			
			if(LobbyManager.getInstance().fChangChannel != null){
				LobbyManager.getInstance().fChangChannel();
			}
			
			LobbyManager.getInstance().hideChannel();
			LobbyManager.getInstance().hidePanelDetail();
			LobbyManager.getInstance().hidePersonalInfomation();
			LobbyManager.getInstance().lobbyView.toolView.toolContact.hide();
		});
		m_btnSD.fOnOver = function():void{
			TipManager.getInstance().show(LobbyManager.getInstance().getLanguageString(Language.sTip_Tool_SD),TipManager.UP,m_mcAsset.localToGlobal(new Point(m_mcAsset.mc_sd.x+15,m_mcAsset.mc_sd.y+30)),1);
		};
		m_btnSD.fOnOut = function():void{
			TipManager.getInstance().hide();
		};
		m_btnSD.visible = false;
		
		m_btnHD = new SingleButtonMC(_mcAsset.mc_hd, function(evt:MouseEvent):void{
			
			if(LobbyManager.getInstance().IsLiveConnected()){
				LobbyManager.getInstance().bClickResolution = true;
			}
			
			SoundManager.getInstance().play(SoundPackage.sClick_Tools);
			TipManager.getInstance().hide();
			
			LobbyManager.getInstance().lobbyView.toolView.currentResolution = Define.SD;
			
			SharedObjectManager.setResolution(LobbyData.getInstance().lobbyInfo.getResolutionByIndex(Define.SD));
			SharedObjectManager.flush();
			
			changeResolution();
			
			if(LobbyManager.getInstance().fChangChannel != null){
				LobbyManager.getInstance().fChangChannel();
			}
			
			LobbyManager.getInstance().hideChannel();
			LobbyManager.getInstance().hidePanelDetail();
			LobbyManager.getInstance().hidePersonalInfomation();
			LobbyManager.getInstance().lobbyView.toolView.toolContact.hide();
		});
		m_btnHD.fOnOver = function():void{
			TipManager.getInstance().show(LobbyManager.getInstance().getLanguageString(Language.sTip_Tool_HD),TipManager.UP,m_mcAsset.localToGlobal(new Point(m_mcAsset.mc_hd.x+15,m_mcAsset.mc_hd.y+30)),1);
		};
		m_btnHD.fOnOut = function():void{
			TipManager.getInstance().hide();
		};
		m_btnHD.visible = false;
		
		
	}
	
	public function setData():void{
		changeResolution();
	}
	
	public function set visible(_bValue:Boolean):void{
		if(m_btnCurrent){
			m_btnCurrent.visible = _bValue;
		}
		
		if(!_bValue){
			m_btnSD.visible = false;
			m_btnHD.visible = false;
		}else{
			IsQualified();
		}
	}
	
	public function set x(_iValue:int):void{
		m_mcAsset.mc_sd.x = _iValue;
		m_mcAsset.mc_hd.x = _iValue;
	}
	
	public function set y(_iValue:int):void{
		m_mcAsset.mc_sd.y = _iValue;
		m_mcAsset.mc_hd.y = _iValue;
	}
	
	public function IsQualified():Boolean{
		//检测视讯解析度资料笔数和priorityNo是否正确
		var data:Vector.<ResolutionStruct> = LobbyData.getInstance().lobbyInfo.vecResolutionList;
		if(!data || data.length != 3){//解析度資料筆數必须为3筆
			m_btnSD.visible = false;
			m_btnHD.visible = false;
			return false;
		}
		
		if(data[0].PriorityNo != 1 || data[1].PriorityNo != 2 || data[2].PriorityNo != 3){//PriorityNo必须为1~3
			m_btnSD.visible = false;
			m_btnHD.visible = false;
			return false;
		}
		
		return true;
	}
	
	public function changeResolution():void{
		if(!IsQualified()){
			return;
		}
		
		if( SharedObjectManager.getResolution() == null ){
			
			if(LobbyData.getInstance().lobbyInfo.currentResolution)
			{
				switch(LobbyData.getInstance().lobbyInfo.currentResolution.PriorityNo){
					case Define.HD:
						m_btnCurrent = m_btnHD;
						m_btnCurrent.visible = true;
						m_btnSD.visible = false;
						break;
					
					case Define.SD:
						m_btnCurrent = m_btnSD;
						m_btnCurrent.visible = true;
						m_btnHD.visible = false;
						break;
				}
			}
			
		}else{
			switch(SharedObjectManager.getResolution().PriorityNo){
				case Define.HD:
					m_btnCurrent = m_btnHD;
					m_btnCurrent.visible = true;
					m_btnSD.visible = false;
					break;
				
				case Define.SD:
					m_btnCurrent = m_btnSD;
					m_btnCurrent.visible = true;
					m_btnHD.visible = false;
					break;
			}
		}
		
		if(LobbyManager.getInstance().exitLevel!=Define.EXIT_GAME){
			m_btnSD.visible = false;
			m_btnHD.visible = false;
		}
		
	}
	
}