module manager {
	export class LobbyManager {

		public stageW;
		public stageH;

		
		

		/** 大厅通讯 **/
		private m_socket				:	socket.TCPSocket;							//通讯连接
		private m_lobbySocketSink		:	socket.ITCPSocketSink;						//通讯连接
		public lobbyAuth 				: 	lobby.model.LobbyAuth;				//登陆数据
		public socketParser				:	packet.SocketParser;						//数据解析
		public dataPacket 				: 	packet.DataPacket;							//数据封包
		
		/** 初始大厅 **/
		public lobbyView 		: lobby.view.LobbyView;							//主类容器
		
//		private m_bmpSnapshotGame		:	Bitmap;
		
		get uWindowIndex():number
		{
			return this.m_uWindowIndex;
		}
		
		set uWindowIndex(value:number)
		{
			this.m_uWindowIndex = value;
			if(this.m_uWindowIndex<0){
				this.m_uWindowIndex = 0;
			}
		}
		
		get videoMaxBytePerSecond():lobby.view.lives.BLiveVideo
		{
			return this.m_videoMaxBytePerSecond;
		}
		
		set videoMaxBytePerSecond(value:lobby.view.lives.BLiveVideo)
		{
			this.m_videoMaxBytePerSecond = value;
			
			if( this.m_videoMaxBytePerSecond == null ){
				return;
			}
			
//			if( m_bLiveStatus ){
//				m_videoMaxBytePerSecond.setVolume( m_nLiveVolume );
//			}
//			else {
//				m_videoMaxBytePerSecond.setVolume( 0 );
//			}
		}
		
		private m_fInit					:	Function;							//回调函数
		public stage					:	egret.Stage;								//舞台引用
		private m_uWindowIndex			:	number;								//窗口数量
		
		/** 功能界面 **/
		public personalinformation		:	lobby.view.panel.PanelPersonalinformation;			//个人资讯
		public panelLiveVideo			:	lobby.view.panel.PanelLiveVideo;						//全景视讯
		public channel					:	lobby.view.panel.PanelChannel;						//视讯频道
		private m_panelChipCustom		:	lobby.view.panel.PanelChipCustom;					//自订筹码
		public systemSetting			:	lobby.view.panel.PanelSystemSetting;					//系统设置
		private m_tableSetting			:	lobby.view.panel.PanelTableSetting;					//包桌设置
		private m_tableEnter			:	lobby.view.panel.PanelTableEnter;					//进桌密码
		private m_limitBet				:	lobby.view.panel.PanelLimitBet;						//限红选择
		
		/** 状态设置 **/
		public bPlazaBlueFilter			:	 boolean	=	false;					//模糊状态
		
		/** 语言设置 **/
		public lang						:	language.Language;							//当前语言
		private m_language_cn			:	language.Language_CN;						//简体中文
		private m_language_en			:	language.Language_EN;						//英文语言
		private m_language_tw			:	language.Language_TW;						//繁体中文
		
		/** 多桌界面 **/
		public multiTableView			:	lobby.view.multi.MultiTableView;						//
		private m_vecLive				:	any[];					//打开视讯的桌子
		private m_arrVideoNo			:   any[];
		private m_nTotalBet				:	Number	=	0;						//下注金额
		private m_nTotalHaveBet			:	Number	=	0;						//已下注金额
		public multiTableEntryStruct	:	lobby.model.struct.TableStruct;						//多桌入口
		public iEnterMultitableThemeID	:	number		=	255;					//进多桌时的厅馆id
		public multiEnterGame			:	lobby.view.game.Game;								//多桌入口桌实例
		public maintainLevel			:	number 	= 	0;						//维护级别 SysMaintainType
		public maintainAgent			:	number	=	0;						//代理维护ID
		public bMultiExit				:	 boolean;							//入口桌socket关闭 ，登入失败、维护、超时退出
		
		/** 胜利动画 **/
		private m_animationGameWinC		:	lobby.view.animation.AnimationGameWinC;
		private m_animationGameWinA		:	lobby.view.animation.AnimationGameWinA;
		
		/**	好路设置 **/
		public panelGoodRoadType		:	lobby.view.panel.PanelGoodRoadSetting;
		
		/** 多桌通讯 **/
		public socket_multi				:	socket.TCPSocket;							//通讯连接
		public multiTableSocketSink		:	packet.sink.MultiTableTCPSink;					//通讯连接
		public socketParser_multi		:	packet.SocketParser;						//数据解析
		public dataPacket_multi			: 	packet.DataPacket;							//数据封包
		public multiTableId				:	number									//接口桌ID
		public goodTableId				:	number									//好路接口桌ID
		
		//		public dataPacket_good			:	DataPacket;							//数据封包
		
		private m_bLoginMultiTable		:	 boolean;							//登陆状态
		
		/** 视讯声音 **/
		private m_nLiveVolume			:	number;								//视讯音量
		private m_bLiveStatus			:	 boolean;							//禁音开关
		
		public fChangChannel			:	Function;							//切换频道
		
		
		//		private m_timer					:	Timer;								//网络状态
		private m_videoMaxBytePerSecond	:	BLiveVideo;							//
		
		private m_nowScene				:	Game;								//当前游戏
		private m_newGame				:	Game;								//预进入的新游戏
		private m_gamePoint				:	Point	=	new Point();			//全局坐标
		
		public chipPanelGame			:	ChipPanel;							//筹码面板
		public chipPanelGame_1			:	ChipPanelGame;						//百家、龙虎
		public chipPanelGame_2			:	ChipPanelGame;						//轮盘、骰宝
		public chipPanelLobby			:	ChipPanelLobby;						//筹码面板
		
		/**臨時處理 , 之後 視窗看要不要更改*/			
		public aCloseWindowList			:	PanelWindow[];				//待關閉的視窗列表,用於 大廳連線 或登入 等例外處理
		
		/** 快速转桌 **/
		public bQuickTableListTween		:	 boolean;							//缓动状态
		public bQuickChangeTable		:	 boolean;							//快速转桌
		public bQuickToMultiTable		:	 boolean;							//快速转桌
		
		/** 自订筹码 **/
		private m_uPanelChipCustom		:	number;
		
		/** 当前桌子 **/
		public currentTableStruct		:	lobby.model.struct.TableStruct;
		
		/** 个人资讯 **/
		private m_aData 				: 	lobby.model.CData;
		
		private static m_instance		:	LobbyManager;
		public iReTryConnect			:	number;								//重連次數
//		private m_tHeart				:	JTimer;
//		public iSendHeartFailCount		:	number;								//送大廳心跳包失敗次數
		public nRevServerTime			:	number = 0;							//紀錄接收心跳包時間
		public nHeartRate				:	number	= 5000;						//心跳包送的速率
		
		
//		public iReTryConnectM			:	number;								//重連次數
//		public iSendHeartFailCountM		:	number;								//送大廳心跳包失敗次數
		public nRevServerTimeM			:	number = 0;							//紀錄接收心跳包時間
		public loginNM					:	number;								//多桌登入次數
		public bRetryM					:	 boolean;							//是否重连多桌中
		
		private m_gameTransition		:	GameSceneTransformer;				//进桌过渡
		
		public bImportant				:	 boolean;							//保留重要弹窗提示，取消网络断开的提示
		
		public bStageVideoAvailable		:	 boolean;							//支持显卡渲染
		private m_timer					:	JTimer;
		public transparentLayer			:	egret.Sprite;
		
		public uDialogCount				:	number;								//提示框数量
		
		public bSubscribeTheme			:	 boolean;							//订阅厅馆
		
		public bEnterGame				:	 boolean;							//进桌状态

		public bRegist					:	 boolean;							//点击注册
		
		/**
		 *	当前模式：
		 * 	高配版-0
		 * 	低配版-1
		 */		
		public uRenderMode				:	number;								//当前模式
		private m_uDetection			:	number;								//检测次数
		private m_uDetectionCount		:	number;								//总检测数
		private m_detectionTimer		:	egret.Timer;
		private m_bDetection			:	 boolean	=	true;					//功能开关
		
		public bClickResolution			:	 boolean;
		

		private static instance	:	LobbyManager;

		public static getInstance():LobbyManager{
            	if(this.instance == null){
                    this.instance = new LobbyManager();
            	}
            	return this.instance;
     	}
		public constructor() {
		}

		public  initialize( _stage, $lobbyAuth:lobby.model.LobbyAuth, $lobbyView:lobby.view.LobbyView, _init:Function ):void{
			
			this.stage		=	_stage;
			this.lobbyAuth = $lobbyAuth;
			this.lobbyView = $lobbyView;
			this.m_fInit 	=	_init;
			
			if(!this.socketParser){
				this.socketParser = new packet.SocketParser();
			}
			
			if(!this.dataPacket){
				this.dataPacket = new packet.DataPacket(this.socketParser);
			}
			
			if(!this.m_socket){
				if(!this.m_lobbySocketSink){
					this.m_lobbySocketSink = new packet.sink.LobbyTCPSocketSink();
				}
				
				this.m_socket = new TCPSocket(m_lobbySocketSink, 0, 0);
			}
			
			if(m_bDetection){
				m_detectionTimer = new Timer(10000);
				m_detectionTimer.addEventListener(TimerEvent.TIMER, detection);
				m_detectionTimer.addEventListener(TimerEvent.TIMER_COMPLETE, detectionComplete);
			}
			
			BitmapManager.getInstance().initialize();
			
			changeLanguage(lobbyAuth.Lang);
			
			///// 获取用户设置
			MusicManager.singleton.enabled = SharedObjectManager.getMusicOnOff();
			SoundManager.getInstance().soundEffectSwitch = SharedObjectManager.getEffectOnOff();
			LobbyManager.getInstance().bLiveStatus = SharedObjectManager.getLiveOnOff();
			MusicManager.singleton.nVolume = SharedObjectManager.getMusicVolume();
			SoundManager.getInstance().nVolume = SharedObjectManager.getEffectVolume();
			LobbyManager.getInstance().nLiveVolume = SharedObjectManager.getLiveVolume();
			
			//			m_timer = new Timer(1000);
			//			m_timer.addEventListener(TimerEvent.TIMER, onTimer);
			//			m_timer.start();
			
			var currentMusicKey:string = [SoundPackage.sBackGround_Music_1,SoundPackage.sBackGround_Music_2,SoundPackage.sBackGround_Music_3][SharedObjectManager.getMusicSelectIndex()];
			//背景音樂
			SoundManager.getInstance().soundPkg.getBackgroundMusic( currentMusicKey , function( _snd:LiveSound ):void 
			{ 
				if( _snd.bLoadComplete )
				{
					var _soundChannel:SoundChannel = _snd.sound.play(0,99999);
					MusicManager.singleton.setSoundData( _snd.sound , _soundChannel );
				}
			} );
			SoundManager.getInstance().soundPkg.getBackgroundMusic( SoundPackage.sBackGround_Music_2  );
			SoundManager.getInstance().soundPkg.getBackgroundMusic( SoundPackage.sBackGround_Music_3  );	
			
			
			//範例
			/*SoundManager.getInstance().soundPkg.getMusic( "effect", SoundPackage.sPopup , function( _snd:LiveSound ):void { 
			if( _snd.bLoadComplete ){
			var _soundChannel:SoundChannel = _snd.sound.play(0,99999);
			}
			} );*/
			
			
			aCloseWindowList = new PanelWindow[]();
			m_nLiveVolume 	 = SharedObjectManager.getLiveVolume();
			
			nRevServerTime   = getTimer();
			TimeManager.getInstance().run();
			//			m_tHeart = new Timer(20000);
			//			m_tHeart.addEventListener(TimerEvent.TIMER , onHeart );
			
			transparentLayer = new Sprite();
			transparentLayer.graphics.beginFill(0x000000,0.3);
			transparentLayer.graphics.drawRect(0,0,1920,1080);
			transparentLayer.graphics.endFill();
			_lobbyView.addChild(transparentLayer);
			transparentLayer.visible = false;
			
			cacheWinMc();
			/*m_timer = new Timer(50,1);
			m_timer.addEventListener(TimerEvent.TIMER_COMPLETE,handleTimerComplete);*/
			m_timer = JTimer.getTimer(50,1);
			m_timer.addTimerCallback(null,handleTimerComplete);
			stage.addEventListener(Event.FULLSCREEN , stageChangeSizeHandle);
			stage.addEventListener(FullScreenEvent.FULL_SCREEN_INTERACTIVE_ACCEPTED,handleFSIA);
			
		}
		
		
		
		protected handleFSIA(event:Event):void
		{
			m_timer.reset();
			m_timer.start();
		}
		protected handleTimerComplete():void{
			if(transparentLayer){
				transparentLayer.visible = false;
			}
		}
		
		protected stageChangeSizeHandle(event:FullScreenEvent):void
		{
			// TODO Auto-generated method stub
			switch(stage.displayState){
				case StageDisplayState.NORMAL:
					lobbyView.toolView.screenFull(false);
					transparentLayer.visible = false;
					break;
				
				case StageDisplayState.FULL_SCREEN:
				case StageDisplayState.FULL_SCREEN_INTERACTIVE:
					lobbyView.toolView.screenFull(true);
					if(ExternalInterface.available){
						transparentLayer.visible = true;
					}
					break;
			}
		}
		
		/**
		 *	连接大厅 
		 */		
		public connect(_sServerIP:string, _iServerPort:number):void{
			
			console.log("连接大厅...","m_socket:", m_socket.getUid(), "_sServerIP:", _sServerIP, "_iServerPort:",_iServerPort,"###");
			m_socket.connect( _sServerIP, _iServerPort );
			
			//			m_socket.connect( "127.0.0.1", _iServerPort );			//測試代碼
			
			//			var _panelDialog:PanelDialog = showDialog( getLanguageString( Language.sWarn_LobbyConnecting ) );
			//			aCloseWindowList.push( _panelDialog ); 			
		}
		
		/**
		 *	登陆大厅 
		 */		
		public sendLoginLobby():void{
			
			if ( this.lobbyAuth != null ) {
				/** 旧做法 **/
//				var _lobbyLoginReqPkt : C_Lobby_Login_Pkt 	=	new C_Lobby_Login_Pkt();
//				_lobbyLoginReqPkt.AuthInfo.AuthToken		=	lobbyAuth.AuthToken;
//				_lobbyLoginReqPkt.AuthInfo.Identity			=	lobbyAuth.Identity;
//				_lobbyLoginReqPkt.AuthInfo.Lang				=	lobbyAuth.Lang;
//				_lobbyLoginReqPkt.AuthInfo.Platform			=	lobbyAuth.Platform;	
//				_lobbyLoginReqPkt.AuthInfo.ProtocolVer		= 	1;							//当前通讯版本号为1
//				_lobbyLoginReqPkt.AuthInfo.ThemeType		=	-1;
//				_lobbyLoginReqPkt.AuthInfo.DefThemeID   	=   lobbyAuth.loginMode;							//網投
				
				/** 新做法 **/
				var _byte : egret.ByteArray = new egret.ByteArray();
				var _urlloader : URLLoader = new URLLoader();
				_urlloader.addEventListener(Event.COMPLETE, onComplete1(evt){
					_urlloader.removeEventListener(Event.COMPLETE, onComplete1);
					
					var byte : ByteArray = evt.currentTarget.data;
					byte[0] -= 8;
					byte[1] -= 8;
					byte[2] -= 8;
					
					
					var _loader : Loader = new Loader();
					_loader.contentLoaderInfo.addEventListener(IOErrorEvent.IO_ERROR,function onError():void{});
					_loader.contentLoaderInfo.addEventListener(Event.COMPLETE, onComplete2(event:Event):void{
						_loader.contentLoaderInfo.removeEventListener(IOErrorEvent.IO_ERROR, onError);
						_loader.contentLoaderInfo.removeEventListener(Event.COMPLETE, onComplete2);
						
						var _class : Class = getDefinitionByName("KeyTest") as Class;
						if(_class){
							var data : * = new _class();
							
							_byte = data.enterLobby(lobbyAuth, socketParser);
							
							Utils.DumpBinary( "", _byte, 0, 11);
							m_socket.send( _byte, 0,  _byte.length);
							
							Log.getInstance().log(this, "登陆大厅..." );
						}
					});
					_loader.loadBytes(byte,new LoaderContext(false, ApplicationDomain.currentDomain));
				});
				_urlloader.dataFormat = URLLoaderDataFormat.BINARY;
				_urlloader.load(new URLRequest(UrlManager.getInstance().getImageUrl("test.png")));
				
//				var byte:ByteArray = dataPacket.pack( PacketDefine.LOGIN_IN , _lobbyLoginReqPkt );
//				console.log("登陆大厅..." , _lobbyLoginReqPkt.AuthInfo.ThemeType );
//				Utils.DumpBinary( "", _byte, 0, 11);
//				m_socket.send( _byte, 0,  _byte.length);
//				
//				Log.getInstance().log(this, "登陆大厅..." );
			} else {
				console.log("打开页面时，没有获取到web数据.");
			}
		}
		
		/** 登陆确认**/
		public sendLoginLobbySuccess():void {
			if ( this.lobbyAuth != null ) {
				var _pkt:C_Lobby_Login_OK_Pkt = new C_Lobby_Login_OK_Pkt();
				_pkt.AuthToken = string(Player.getInstance().iPlayerID);
				_pkt.Identity  = lobbyAuth.Identity;
				
				var byte:ByteArray = dataPacket.pack( PacketDefine.C_LOGIN_LOBBY_OK , _pkt );
				console.log("回復 確認登陆大厅成功消息...");
				Utils.DumpBinary( "", byte, 0, 11);
				m_socket.send( byte, 0,  byte.length);
				
			}
			else {
				console.log("打开页面时，没有获取到web数据.");
			}
		}
		
		public setMultiSocket():void{
			if(!socketParser_multi){
				socketParser_multi = new SocketParser();
				socketParser_multi.setCData(PacketDefine.GAME);
			}
			
			if(!dataPacket_multi){
				dataPacket_multi = new DataPacket(socketParser_multi);
			}
			
			if(!socket_multi){
				if(!multiTableSocketSink){
					multiTableSocketSink = new MultiTableTCPSink();
					multiTableSocketSink.subscibeNum =16;
					multiTableSocketSink.socketParser = socketParser_multi;
				}
				
				socket_multi = new TCPSocket(multiTableSocketSink, 0, 0);
			}
		}
		
		
		
		/** 多桌入口 **/
		public sendMultiTableEntry():void{
			var _entry : C_MultiTable_Entry_Pkt = new C_MultiTable_Entry_Pkt();
			
			var byte:ByteArray = dataPacket.pack( PacketDefine.C_MultiTable_Entry , _entry );
			Log.getInstance().log(this,"请求多桌入口...");
			m_socket.send( byte, 0,  byte.length);
		}
		
		/** 订阅厅馆 **/
		public sendSubscribeTheme(_iSubscribe:number=-1, _iUnsubscribe:number=-1):void{
			bSubscribeTheme = true;
			var _subscribeTheme : C_Lobby_Theme_Subscribe_Pkt = new C_Lobby_Theme_Subscribe_Pkt();
			_subscribeTheme.SubscribleThemeID = _iSubscribe;
			_subscribeTheme.UnsubscribleThemeID = _iUnsubscribe;
			
			var byte:ByteArray = dataPacket.pack( PacketDefine.C_Lobby_Theme_Subscribe , _subscribeTheme );
		//	console.log("订阅厅馆..."+_iSubscribe);
			Log.getInstance().log(this, "订阅厅馆..."+_iSubscribe);
			m_socket.send( byte, 0,  byte.length);
		}
		
		/** 自订筹码 **/
		public sendCustomChipData(_sData:string):void{
			var _customChip : C_CustomChip_Pkt 	=	new C_CustomChip_Pkt();
			_customChip.PlayerCustChipsInfo.CustChips	=	_sData;
			var byte:ByteArray = dataPacket.pack( PacketDefine.C_SET_CHIP , _customChip );
			Log.getInstance().log(this,"自订筹码...");
			Utils.DumpBinary( "", byte, 0, 11);
			m_socket.send( byte, 0,  byte.length);
		}
		
		/** 个人资料 **/
		public getUserDataGameApi():void{
			Log.getInstance().log(this," 请求个人资料 >>>");
			var _class : Class = getDefinitionByName("KeyTest") as Class;
			if(_class){
				Log.getInstance().log(this," 请求个人资料 >>> 执行类"+_class);
				var data = new _class();
				data.fUserDataComplete = function(oData:Object):void{
					Player.getInstance().Country = oData.CountryCode;
				};
				data.getUserData(Player.getInstance().iPlayerID);
				Log.getInstance().log(this," 请求用户资料 >>> playerID"+Player.getInstance().iPlayerID);
			}else{
				Log.getInstance().log(this," 请求个人资料 >>> _class=null");
			}
		}
		
		/**修改“已下注”的RightX值*/
		public setBetSelectPannelRightX(x:number):void{
			if(m_nowScene){
				m_nowScene.setBetSelectPannelRightX(x);
			}
		}
		
		//		private openHandler(event:Event):void {
		//			console.log("openHandler: " + event);
		//		}
		//		private httpStatusHandler(event:HTTPStatusEvent):void {
		//			console.log("httpStatusHandler: " + event);
		//		}
		protected onError(event:IOErrorEvent):void
		{
			// TODO Auto-generated method stub
			console.log("httpStatusHandler: " + event);
			event.target.removeEventListener(IOErrorEvent.IO_ERROR,onError);
			event.target.removeEventListener(Event.COMPLETE, onComplete);
			event.target.removeEventListener(SecurityErrorEvent.SECURITY_ERROR , securityError);
		}
		protected securityError(event:SecurityErrorEvent):void{
			console.log("GameReCord securityError");
			event.target.removeEventListener(Event.COMPLETE , onComplete );
			event.target.removeEventListener(IOErrorEvent.IO_ERROR , onError );
			event.target.removeEventListener(SecurityErrorEvent.SECURITY_ERROR , securityError);				
			
		}
		protected onComplete(event:Event):void
		{
			console.log("httpStatusHandler: " + event);
			event.target.removeEventListener(IOErrorEvent.IO_ERROR,onError);
			event.target.removeEventListener(SecurityErrorEvent.SECURITY_ERROR , securityError);
			event.target.removeEventListener(Event.COMPLETE, onComplete);
			
			// TODO Auto-generated method stub
			console.log(event.target.data);
			var jsonStr : string = event.target.data;
			if( jsonStr != "" ){
				jsonStr = m_aData.decryptStringFromBase64(jsonStr);
				var oData : Object = JSON.parse(jsonStr);
				console.log(oData);
				Player.getInstance().Country = oData.Country;
			}
			
		}		
		
		
		public getRoadmapReqInfo(_tableList:any[]):void{
			var c_lobby_info : C_Lobby_Info_Pkt = new C_Lobby_Info_Pkt();
			c_lobby_info.ReqType = 0;
			c_lobby_info.ArgInfo.TableIDList = _tableList;
			
			var byte:ByteArray = dataPacket.pack( PacketDefine.C_LOBBY_INFO , c_lobby_info );
			console.log("补全路纸请求...");
			m_socket.send( byte, 0,  byte.length);
		}
		
		
		/**
		 * =============================================================================================
		 * 华丽的分割线 ================================================================================== 
		 * ==============================================================================================
		 */		
		
		/**
		 *	显示大厅 
		 */		
		public initLobby():void{
			if(m_fInit!=null){
				m_fInit();
			}
		}
		
		/**
		 *	个人资讯
		 */		
		public showPersonalinformation(_x:number, _y:number):void{
			if(!lobbyView ){
				console.log("大厅未初始化，显示异常...");
				return;
			}
			
			
			
	/*		
			test
			var cmd:S_Lobby_Logout_Pkt = new S_Lobby_Logout_Pkt();
			cmd.execute({LogoutInfo:{Reason:16}});
			return;*/
			
			
			if(personalinformation==null){
				personalinformation = new PanelPersonalinformation();
				
				lobbyView.spWindowLayer.addChild(personalinformation);
				
				var move_y:number;
				
				if(exitLevel == Define.EXIT_GAME && currentTableStruct && currentTableStruct.TableType == Define.TABLE_TYPE_ROBOT){//金臂百家位置调整
					move_y = 188;
					
				}else{
					move_y = 150;
				}
				
				personalinformation.x = _x;
				personalinformation.y = _y;
				
				TweenLite.to(personalinformation, Define.SPEED, {y:move_y});
			}else{
				hidePersonalinformation();
			}
			
		}
		public hidePersonalinformation():void{
			if(personalinformation){
				//				PopupManager.getInstance().close( m_personalinformation );
				TweenLite.to(personalinformation, Define.SPEED,{y:Define.PERSON_INFO_OUT_POSY, ease:Back.easeIn, onComplete:function():void{
					if(personalinformation){
						lobbyView.spWindowLayer.removeChild(personalinformation);
						personalinformation.destroy();
						personalinformation = null;
					}
				}});
				//				uWindowIndex--;
			}
			
		}	
		
		/**
		 *	全景视讯 
		 * @param _sLanguage
		 * 
		 */		
		public showLiveVideo(_uWidth:number, _uHeight:number, _sServer:string, _sStream:string):void{
			if(panelLiveVideo==null){
				panelLiveVideo = new PanelLiveVideo( _uWidth>1280?_uWidth:1280, _uHeight>720?_uHeight:720);
				
				
				lobbyView.spWindowLayer.addChild(panelLiveVideo);
				lobbyView.spShieldLayer.alpha = 1;
				lobbyView.spShieldLayer.graphics.beginFill(0x000000,0.5);
				lobbyView.spShieldLayer.graphics.drawRect(0,0,stage.stageWidth,stage.stageHeight+100);
				lobbyView.spShieldLayer.graphics.endFill();		
				
				
				
				panelLiveVideo.initializeRTMPPlayer(_sServer, _sStream);
				panelLiveVideo.x = stage.stageWidth * 0.5 + uWindowIndex * 50;
				panelLiveVideo.y = stage.stageHeight * 0.5 + uWindowIndex * 50;
				//				PopupManager.getInstance().show( m_liveVideo );
				panelLiveVideo.scaleX = Define.SCALE_MIN;
				panelLiveVideo.scaleY = Define.SCALE_MIN;
				TweenLite.to(panelLiveVideo, Define.SPEED, {scaleX:1, scaleY:1});
				uWindowIndex++;
			}else{
				hideLiveVideo();
			}
		}
		public hideLiveVideo():void{
			if(panelLiveVideo){
				
//				lobbyView.spShieldLayer.graphics.clear();
				//				PopupManager.getInstance().close( m_liveVideo );
				uWindowIndex--;
				TweenLite.to(panelLiveVideo, Define.SPEED, {scaleX:Define.SCALE_MIN, scaleY:Define.SCALE_MIN, onComplete:function():void{
					
					if(panelLiveVideo){
						lobbyView.spWindowLayer.removeChild(panelLiveVideo);
						panelLiveVideo.destroy();
						panelLiveVideo = null;
					}
					
					TweenLite.to(lobbyView.spShieldLayer, Define.SPEED, {alpha:0, onComplete:function():void{
						lobbyView.spShieldLayer.graphics.clear();
					}});
				}});
			}
			
		}
		
		/**
		 *	视讯频道
		 * @param _sLanguage
		 * 
		 */		
		public showChannel(_default: boolean=true,offX:number=0):void{
			if(m_bChannelTween){
				m_fDelayTween = function():void{
					showChannel(_default,offX);
				}
				return;
			}else{
				m_fDelayTween = null;
			}
			if(channel==null){
				channel = new PanelChannel();
				
				lobbyView.spWindowLayer.addChild(channel);
				var move_x:number;
				var move_y:number;
				
				if(currentTableStruct && currentTableStruct.TableType == Define.TABLE_TYPE_ROBOT){//金臂百家位置调整
					move_x = lobbyView.toolView.getBtnChannelPoint().x;
					move_y = 172+37;
					
				}else{
					move_x = lobbyView.toolView.getBtnChannelPoint().x+offX;
					move_y = 172;
				}
				
				channel.x = move_x;
				channel.y = -180;
				
				
				TweenLite.to(channel, Define.SPEED,{y:move_y});
			}else{
				if(_default){
					hideChannel();
				}
			}
		}
		private m_bChannelTween :  boolean;
		private m_fDelayTween	: Function;
		public hideChannel():void{
			if(m_bChannelTween){
				return;
			}
			if(channel){
				//				PopupManager.getInstance().close( m_channel );
				//				uWindowIndex--;
				
				m_bChannelTween = true;
				TweenLite.to(channel, Define.SPEED,{y:-300, ease:Back.easeIn, onComplete:function():void{
					if(channel){
						lobbyView.spWindowLayer.removeChild(channel);
						
						channel.destroy();
						channel = null;
						m_bChannelTween = false;
					}
					if(m_fDelayTween!=null){
						m_fDelayTween();
					}
				}});
			}
			
			
		}
		
	
		
		
		/**
		 *	切换语言 
		 * 
		 */		
		public changeLanguage( _iLanguage:number ):void{
			lobbyAuth.Lang = _iLanguage;
			lang = getLanguage( _iLanguage );
			
			if(lobbyView){
				lobbyView.onChangeLanguage();
			}
			
			if(personalinformation){
				personalinformation.onChangeLanguage();
			}
			
			if(m_nowScene){
				m_nowScene.onChangeLanguage();
			}
			
			
			if(multiTableView){
				multiTableView.onChangeLanguage();
			}
			
			if(systemSetting){
				systemSetting.onChangeLanguage();
			}
			
			if(m_tableSetting){
				m_tableSetting.onChangeLanguage();
			}
			
			if(m_panelChipCustom){
				m_panelChipCustom.onChangeLanguage();
			}
			
			if(channel){
				channel.onChangeLanguage();
			}
			
			SoundManager.getInstance().changeLanguage(_iLanguage);
			GameRecordManager.getInstance().onChangeLanguage();
		}
		private getLanguage( _iLanguage:number ):Language{
			switch(_iLanguage){
				
				case Define.LANGUAGE_CN:
					if(m_language_cn==null){
						m_language_cn = new Language_CN();
					}
					lang = m_language_cn;
					break;
				
				case Define.LANGUAGE_EN:
					if(m_language_en==null){
						m_language_en = new Language_EN();
					}		
					lang = m_language_en;
					break;
				
				case Define.LANGUAGE_TW:
					if(m_language_tw==null){
						m_language_tw = new Language_TW();
					}			
					lang = m_language_tw;
					break;
				
			}
			
			return lang;
		}
		public getLanguageString( _string:string):string{
			
			return lang.getString(_string);
			
		}
		
		/**
		 *	计时器 
		 * @param evt
		 * 
		 */		
		//		private onTimer(evt:TimerEvent):void{
		//			if(m_videoMaxBytePerSecond){
		////				console.log("spLobbyView.liveVideo.iMaxBytePerSecond:",lobbyView.liveVideo.iMaxBytePerSecond);
		//				if(m_videoMaxBytePerSecond.iMaxBytePerSecond > 1000){
		//					lobbyView.toolView.wifi.status = Tool_Wifi.FULL; 
		//				} else if (m_videoMaxBytePerSecond.iMaxBytePerSecond > 500 ){
		//					lobbyView.toolView.wifi.status = Tool_Wifi.WELL; 
		//				} else if (m_videoMaxBytePerSecond.iMaxBytePerSecond > 300) {
		//					lobbyView.toolView.wifi.status = Tool_Wifi.NORMAL; 
		//				} else if (m_videoMaxBytePerSecond.iMaxBytePerSecond > 0){
		//					lobbyView.toolView.wifi.status = Tool_Wifi.POOR; 
		//				} else {
		//					lobbyView.toolView.wifi.status = Tool_Wifi.NO; 
		//				}
		//			}else{
		//				lobbyView.toolView.wifi.status = Tool_Wifi.NO; 
		//			}
		//		}
		
		
		/**
		 *	退出等级 
		 */		
		get exitLevel():number{
			
			return lobbyView.toolView.iExitLevel;	
			
		}
		set exitLevel(_uLevel:number){
			lobbyView.toolView.iExitLevel = _uLevel;
			
		}
		
		/**
		 *	房间列表 
		 */		
		public changeThemelist(_iThemeID : int):void{
			lobbyView.changeTheme(_iThemeID);
		}
		public changeQuickThemelist(_iThemeID : int):void{
			lobbyView.showQuickTheme(_iThemeID);
		}
		
		/**
		 *是否 当前百家乐游戏桌ID
		 * @param param0
		 * @return 
		 * 
		 */
		public isNowGameTable(_tableId:number): boolean
		{
			if(m_nowScene && (m_nowScene.GameID==GameDefine.BAC || m_nowScene.GameID==GameDefine.MACHINE_BAC) && m_nowScene.tableStruct.TableID==_tableId){
				return true;
			}
			return false;
		}
		public NowGameTableID():number{
			if(m_nowScene){
				return m_nowScene.tableStruct.TableID;
			}
			return  -1;
		}
		/**
		 *	登陆游戏 
		 * @param _tableStruct
		 * 
		 */		
		public enterGame(_tableStruct:TableStruct):void{
			if(bEnterGame){
				return;
			}else{
				bEnterGame = true;
				lobbyView.enableQuick(false);
			}
			
			//屏蔽退出按钮
			LobbyManager.getInstance().lobbyView.toolView.btnExit.enabled = false;
			
			var _gameName : string;
			switch(_tableStruct.GameID){
				case GameDefine.BAC:
					_gameName = GameDefine.BAC_NAME;//+".swf";
					break;
				
				case GameDefine.SIC:
					_gameName = GameDefine.SIC_NAME;//+".swf";
					break;
				
				case GameDefine.ROU:
					_gameName = GameDefine.ROU_NAME;//+".swf";
					break;
				
				case GameDefine.DTF:
					_gameName = GameDefine.DTF_NAME;//+".swf";
					break;
			}
			
			if( _tableStruct.TableType == Define.TABLE_TYPE_ROBOT ){
				_gameName = GameDefine.ROBOT_BAC_NAME;// + ".swf";
			}
			
			var _gameClass:Class;
			
			
			//显示loading
//			if(LoaderManager.getInstance().IsLoaded(_gameName)){
				lobbyView.showLoading();
//			}
			
			//加载游戏
			LoaderManager.getInstance().loadGame(_gameName, function():void{
				_gameClass = getDefinitionByName(_gameName) as Class;
				/*
				 * 记录实例，登入失败销毁
					不能记在m_nowScene,因为转桌 不能改变原来的m_nowScene，失败后还停留在原来游戏桌上 
					转桌成功showGame后才改变m_nowScene
				*/
				
				m_newGame = new _gameClass();//ResourceManager.getInstance().getLoader(gameName).content as Game;
				
				//傳給Game.swf 進桌資料,認證資料,model實體
				m_newGame.receiveTableStruct(_tableStruct);
				//重置遊戲網路狀態
				NetWorkManager.getInstance().iGameNetWorkStatus = -1;
				
				//登录成功 或失败后才隐藏loading
				//lobbyView.hideLoading();
				
			});
			
			/*if( goodSocketSink ){
			goodSocketSink.bShowDialog = false;		//重連遊戲,旗標重置
			}	*/		
			
		}
		
		/**
		 *	显示游戏 
		 */		
		public showGame(_game:Game):void{
			bEnterGame = false;
			
			//删除大厅已关闭桌子
			var len : int = LobbyData.getInstance().MaintainTableStruct.length;
			for (var i:number = 0; i < len; i++) 
			{
				var _themeStruct : ThemeStruct = LobbyData.getInstance().lobbyInfo.getThemeStruct(LobbyData.getInstance().MaintainTableStruct[i].ThemeID);
				if(_themeStruct){
					_themeStruct.removeTableStruct(LobbyData.getInstance().MaintainTableStruct[i].TableID);
				}
				lobbyView.removeTable(LobbyData.getInstance().MaintainTableStruct[i]);
				LobbyData.getInstance().MaintainTableStruct[i] = null;
			}
			LobbyData.getInstance().removeAllMaintainTableStruct();
			
			if(bQuickChangeTable){
				bQuickChangeTable = false;
				
				var _bStatus :  boolean;
				if(_game.tableStruct.GameID==GameDefine.BAC || _game.tableStruct.GameID==GameDefine.MACHINE_BAC)
				{//转到百家乐不调用移除 好路
					_bStatus = true;
				}
				changeGame(_bStatus);
			}
			
			m_nowScene = _game;
			m_newGame = null;
			
			lobbyView.uCurrentThemeIDTemp = lobbyView.uCurrentThemeID;
			
			m_nowScene.setChipPanel();
			
			currentTableStruct = m_nowScene.tableStruct;
			
			lobbyView.spGame.alpha = 1;
			lobbyView.spGameLayer.addChild(lobbyView.spGame);
			if ( !lobbyView.spGame.contains( m_nowScene ) ) {
				lobbyView.spGame.addGame(m_nowScene);
				
				
				//修改注册点
				m_nowScene.x = -960;//-gamePoint.x;
				m_nowScene.y = -540;//-gamePoint.y;
			}
			
			lobbyView.hideLoading();
			//取消订阅厅馆消息
			sendSubscribeTheme(-1, lobbyView.themeList.currentTheme.struct.ThemeID);
			
			
			//退出等级
			exitLevel = Define.EXIT_GAME;
			
			//关闭视讯
			lobbyView.liveVideo.toGame();
			//停放跑马
			lobbyView.information.stopMarquee();
			//隐藏大厅
			lobbyView.toGame();
			//停止广告
			lobbyView.advertisement.stop();
			
			
			
			if ( m_nowScene != null ) {
				
				lobbyView.spGame.visible = true;
				
				console.log("width:::" + lobbyView.spGame.width);
				console.log("height:::" + lobbyView.spGame.height);
				
//				lobbyView.spGame.scaleX = 0;
//				lobbyView.spGame.scaleY = 0;
//				
//				TweenLite.to(lobbyView.spGame,Define.SPEED,{x:960, y:540, scaleX:1, scaleY:1, onComplete:function():void{
				
				lobbyView.showQuickThemeList();
				
//				}});	
			}
			
			hidePersonalinformation();	//收合個人資訊面板
			//隐藏紧急公告
//			lobbyView.urgentNotice.hide();
			NoticeManeger.getInstance().hide();
			
			//機械百家例外處裡
			if( currentTableStruct.TableType != Define.TABLE_TYPE_ROBOT ){
				m_nowScene.setTool();
				if(m_gameTransition==null){
					m_gameTransition = new GameSceneTransformer(1920,1080,true);
					m_gameTransition.onPlayComplete = function():void{
						m_nowScene.init();
//						lobbyView.urgentNotice_game.enterGame();		//过滤维护消息
//						lobbyView.urgentNotice_game.show();				//显示紧急公告
						NoticeManeger.getInstance().refresh();
					}
					m_gameTransition.addLeftAreaObject([lobbyView.quickThemeList]);
					m_gameTransition.addTopAreaObject([lobbyView.spToolLayer, m_nowScene.transitionDict[GameDefine.Transition_CountDown]]);
					m_gameTransition.addButtomAreaObject([chipPanelGame_1,chipPanelGame_2,m_nowScene.transitionDict[GameDefine.Transition_Route]]);
					if(m_nowScene.transitionDict[GameDefine.Transition_GoodRoad]){
						m_gameTransition.addRightAreaObject([m_nowScene.transitionDict[GameDefine.Transition_TableInfo],m_nowScene.transitionDict[GameDefine.Transition_GoodRoad]]);
					}else{
						m_gameTransition.addRightAreaObject([m_nowScene.transitionDict[GameDefine.Transition_TableInfo]]);
					}
					m_gameTransition.start();
				}
			}else{
//				lobbyView.urgentNotice_game.enterGame();		//过滤维护消息
//				lobbyView.urgentNotice_game.show();				//显示紧急公告
				m_nowScene.init();
				m_nowScene.setTool();
				NoticeManeger.getInstance().refresh();
			}
			
			switch(m_nowScene.tableStruct.GameID){
				case GameDefine.BAC:
				case GameDefine.DTF:
					lobbyView.quickThemeList.toBac();
					break;
				
				case GameDefine.SIC:
				case GameDefine.ROU:
					lobbyView.quickThemeList.toSic();
					break;
			}
			
			//激活快速转桌
			lobbyView.enableQuick(true);
			//激活退出按钮
			LobbyManager.getInstance().lobbyView.toolView.btnExit.enabled = true;
		}
		
		
		
		public exitGame():void {
			TimeManager.getInstance().stopAll();
			if(m_nowScene){
				//赌桌关闭是不更新赌桌信息，将游戏中的接受到的彩池信息赋值到桌子中
				var tableStruct:TableStruct = LobbyData.getInstance().getTableStructByTableID(m_nowScene.tableStruct.TableID);
				if(tableStruct&&tableStruct.getTable()){
					tableStruct.getTable().updateOnlinePlayers(tableStruct.OnlinePlayers>0?(tableStruct.OnlinePlayers-1):0);
					tableStruct.getTable().updateCountDown();
					tableStruct.getTable().updateStaticsInfo();
					tableStruct.getTable().updateRoad(true);
				}
				
			}
			//防止退出过程动画中多次点击
			lobbyView.toolView.fExitGame=null;
			
			if(m_animationGameWinC){
				m_animationGameWinC.stop();
			}
			if(m_animationGameWinA){
				m_animationGameWinA.stop();
			}
			Log.getInstance().log(this,"->exitGame:");
			
			bLoginMultiTable = false
			hideChannel();
			hidePanelChipCustom();
			
			
			if(lobbyView.quickThemeList.currentTheme){
				lobbyView.quickThemeList.currentTheme.setSelect(false, false);
			}
			
			//			lobbyView.iCurrentQuick = 255;
			
			//收合個人資訊面板
			hidePersonalinformation();
			//收和客服面板
			lobbyView.toolView.toolContact.hide();
			//收好路设置面板
			hideGoodRoadSetting();
			SoundManager.getInstance().stopAllSound();
			//隐藏紧急公告
//			lobbyView.urgentNotice.show();
//			lobbyView.urgentNotice.toLobbyUrgentNotice();
//			lobbyView.urgentNotice_game.hide();
			NoticeManeger.getInstance().hide();
			NoticeManeger.getInstance().toLobbyUrgentNotice();
			
			//隐藏app面板
//			lobbyView.mobileApp.hidePannel();
			
			
			//提示窗口
			var _wc : int = lobbyView.spWarn.numChildren;
			var _panel;
			var _iValue:number=0;
			for (var i:number = 0; i < _wc; i++) 
			{
				_panel = lobbyView.spWarn.getChildAt(i);
				if((_panel instanceof PanelDialog) || (_panel instanceof PanelDialog_2)){
					_panel.destroy();
					_iValue = uWindowIndex - 1;
					if( _iValue > 0 ){
						uWindowIndex--;	
					}
					
					lobbyView.spWarn.graphics.clear();
					break;
				}
			}
			
//			Log.getInstance().log(this,"->exitGame:截图完成，准备切图");
//			var bmp  : Bitmap = new Bitmap(snapshotGame());
//			Log.getInstance().log(this,"->exitGame:切图完成");
//			bmp.x = -gamePoint.x;
//			bmp.y = -gamePoint.y;
//			lobbyView.spTweenGame.addChild(bmp);
//			bmp.smoothing = true;
			
			//			lobbyView.spTweenGame.x = gamePoint.x;
			//			lobbyView.spTweenGame.y = gamePoint.y;
//			lobbyView.spTweenGame.scaleX = 1;
//			lobbyView.spTweenGame.scaleY = 1;
//			lobbyView.spTweenGame.alpha = 1;
//			lobbyView.spGame.visible = false;
//			Log.getInstance().log(this,"->exitGame:准备缓动");
			
			if(m_gameTransition){
				m_gameTransition.onPlayComplete = exitGameComplete;
				m_gameTransition.reverse();
			}else {
				exitGameComplete();
			}
			
		}
		private exitGameComplete():void{
			if(m_nowScene && m_nowScene.GameID==GameDefine.MACHINE_BAC){
				lobbyView.exitMachineBac();
			}
			TweenLite.to(lobbyView.spGame, 0.6,{alpha:0,onComplete:function():void{
				
				//退出等级
				exitLevel = Define.EXIT_LOBBY;
				
				//开启视讯
				lobbyView.liveVideo.toLobby();
				//开启跑马
				lobbyView.information.playMarquee();
				lobbyView.information.visible = true;
				//开启广告
				if(!lobbyView.bWheelToTop){
					lobbyView.advertisement.start();
				}
				
				//返回大厅
				lobbyView.toolView.toLobby();
				
				//显示紧急公告
//				lobbyView.urgentNotice.show();
//				NoticeManeger.getInstance().refresh();//此处TableID还在
				
				//转桌列表
				lobbyView.hideQuickThemeList();
				lobbyView.hideQuickTableList(false);
				
//				lobbyView.uCurrentThemeID = lobbyView.uCurrentThemeIDTemp;
				
				if(m_nowScene==null){
					if( lobbyView.themeListVisible ){
						if(lobbyView.uCurrentThemeID != lobbyView.quickThemeList.iCurrentTheme){
							sendSubscribeTheme(lobbyView.uCurrentThemeID, lobbyView.quickThemeList.iCurrentTheme);
						}else{
							sendSubscribeTheme(lobbyView.uCurrentThemeID);
						}
						lobbyView.quickThemeList.iCurrentTheme = -1;
					}
					destroyNewGame();
					return;
				}
				if(m_nowScene.GameID==GameDefine.BAC || m_nowScene.GameID==GameDefine.MACHINE_BAC){
					exitGoodRoad();
				}
				if(m_newGame != m_nowScene){
					destroyNewGame();
				}
				destroyGame(false);
				
				if(lobbyView.uCurrentThemeID != lobbyView.quickThemeList.iCurrentTheme){
					sendSubscribeTheme(lobbyView.uCurrentThemeID, lobbyView.quickThemeList.iCurrentTheme);
				}else{
					sendSubscribeTheme(lobbyView.uCurrentThemeID);
				}
				lobbyView.quickThemeList.iCurrentTheme = -1;
				
				if(m_nowScene){
					m_nowScene = null;
				}
				if(m_gameTransition){
					m_gameTransition.destroy();
					m_gameTransition = null;
				}
				
				lobbyView.toLobby();
				
				NoticeManeger.getInstance().refresh();
				
				Memory.gc();
				
			}});
			
		}
		
		private snapshotGame():BitmapData{
			var bmpd : BitmapData = BitmapUtil.snapshot_1(lobbyView.spGame);
			if(bmpd){
				return BitmapUtil.snapshot_3(bmpd,1920,1080,0,578);
			}
			return new BitmapData(2,2);
		}
		
		public destroyGame(bGC: boolean=true):void {
			if ( m_nowScene != null ) {
				
				//激活退出按钮
				LobbyManager.getInstance().lobbyView.toolView.btnExit.enabled = true;
				
				if(m_nowScene.parent){
					m_nowScene.parent.removeChild(m_nowScene);
				}
				lobbyView.toolView.cleanGameFun();
				m_nowScene.destroy();
				m_nowScene = null;
				currentTableStruct=null;
				
				if(lobbyView.spGame){
					if(lobbyView.spGame.parent){
						lobbyView.spGame.parent.removeChild(lobbyView.spGame);
					}
//					lobbyView.spGame.destroy();
				}
				
			}
			
			if(bGC){
				Memory.gc();
			}
			
		}
		
		/**
		 *销毁预进入的游戏桌（连接、登入失败） 
		 * 
		 */
		public destroyNewGame():void {
			if (m_newGame){
				
				//激活退出按钮
				lobbyView.toolView.btnExit.enabled = true;
				m_newGame.destroy();
				m_newGame = null;
			}
		
		}
		
		
		/**
		 *	多桌 
		 * 
		 */	
		/** 登陆状态 **/
		get bLoginMultiTable(): boolean
		{
			return m_bLoginMultiTable;
		}
		
		set bLoginMultiTable(value: boolean)
		{
			m_bLoginMultiTable = value;
		}
		public showMultiTable():void{
			
			//删除大厅已关闭桌子
			var len : int = LobbyData.getInstance().MaintainTableStruct.length;
			for (var i:number = 0; i < len; i++) 
			{
				var _themeStruct : ThemeStruct = LobbyData.getInstance().lobbyInfo.getThemeStruct(LobbyData.getInstance().MaintainTableStruct[i].ThemeID);
				if(_themeStruct){
					_themeStruct.removeTableStruct(LobbyData.getInstance().MaintainTableStruct[i].TableID);
				}
				lobbyView.removeTable(LobbyData.getInstance().MaintainTableStruct[i]);
				LobbyData.getInstance().MaintainTableStruct[i] = null;
			}
			LobbyData.getInstance().removeAllMaintainTableStruct();
			
			if(bQuickToMultiTable){
				//快速转桌过来的 ,销毁原游戏
				changeGame();
			}
			
			
//			clearSnapshotGame();
			
			/*if(!socketParser_multi){
				socketParser_multi = new SocketParser();
				socketParser_multi.setCData(PacketDefine.GAME);
			}
			
			if(!dataPacket_multi){
				dataPacket_multi = new DataPacket(socketParser_multi);
			}
			
			if(!socket_multi){
				if(!multiTableSocketSink){
					multiTableSocketSink = new MultiTableTCPSink();
					multiTableSocketSink.socketParser = socketParser_multi;
				}
				
				socket_multi = new TCPSocket(multiTableSocketSink, 0, 0);
			}*/
			
			lobbyView.spToolLayer.x = 0;
			lobbyView.toolView.toMulti();
			lobbyView.toGame();
			//关闭视讯
			lobbyView.liveVideo.stop();
			//停放跑马
			lobbyView.information.stopMarquee();
			//退出等级
			exitLevel = Define.EXIT_MULTI_TABLE;
			//屏蔽大厅桌子
			//			lobbyView.removeChildTableList();
			//停止广告
			lobbyView.advertisement.stop();
			//快速转桌
			lobbyView.hideQuickThemeList();
			lobbyView.hideQuickTableList(false);
			
			//隐藏紧急公告
//			lobbyView.urgentNotice_game.hide();
//			lobbyView.urgentNotice.hide();
//			lobbyView.urgentNotice.toMultiUrgentNotice();
//			lobbyView.urgentNotice.show();
			NoticeManeger.getInstance().refresh();
			NoticeManeger.getInstance().toMultiUrgentNotice();
			bMultiExit=false;
			if(multiTableView==null){
				multiTableView = new MultiTableView();
				multiTableView.x = 960;
				multiTableView.y = 540;
				lobbyView.spMultiTableLayer.addChild(multiTableView);
				m_vecLive = new any[];
				m_arrVideoNo=[false,false,false,false];
				multiTableView.scaleX = 0.3;
				multiTableView.scaleY = 0.3;
				multiTableView.alpha = 1;
				
				TweenLite.to(multiTableView,Define.SPEED,{scaleX:1, scaleY:1, alpha:1, onComplete:function():void{
					if(multiTableView){
						multiTableView.onInit();
					}
				}});
			}else{
				if(multiTableView){
					multiTableView.onInit();
				}
			}
			
			
			setBet(0);
			setHaveBet(0);
			
			//激活退出按钮
			LobbyManager.getInstance().lobbyView.toolView.btnExit.enabled = true;
			
			
		}
		
		
		/**
		 *销毁多桌连接 (登入多桌不成功时) 
		 * 
		 */
		public destroyMultiSocket():void{
			removeMultiTablePacket();
			if(socket_multi){
				socket_multi.destroy();
				socket_multi = null;
			}
			
			if (multiTableSocketSink){
				multiTableSocketSink.destroy();
				multiTableSocketSink=null;
			}
			bMultiExit=true;
		}
		
		
		public exitMultiTable():void{
			TimeManager.getInstance().stopAll();
			TipManager.getInstance().hide();
			setBet(0);
			setHaveBet(0);
			bLoginMultiTable = false;
			bQuickToMultiTable = false;
			hidePanelChipCustom();
			if (multiTableView){
				multiTableView.exit();
			}
			
			if (multiEnterGame){
				multiEnterGame.destroy();
				multiEnterGame=null;
			}
			
			LobbyData.getInstance().clearSubscribed();
			
			//			PopupManager.getInstance().fCloseWindowComplete = function():void{
			//				LobbyManager.getInstance().sendSubscribeTheme(LobbyManager.getInstance().iEnterMultitableThemeID);
			//				PopupManager.getInstance().fCloseWindowComplete = null;
			//			}
			//			PopupManager.getInstance().close(multiTableView);
			//			if(multiTableView){
			//				multiTableView = null;
			//			}
			
			destroyMultiSocket();
			
			//隐藏个人资讯
			hidePersonalinformation();
			
			//退出等级
			exitLevel = Define.EXIT_LOBBY;
			if (multiTableView){
				lobbyView.toolView.btnExit.enabled = false;
			}
			//开启视讯
			lobbyView.liveVideo.toLobby();
			//开启跑马
			lobbyView.information.playMarquee();
			//开启广告
			if(!lobbyView.bWheelToTop){
				lobbyView.advertisement.start();
			}
			
			//收合個人資訊面板
			hidePersonalinformation();
			//收和客服面板
			lobbyView.toolView.toolContact.hide();
			//收好路设置面板
			hideGoodRoadSetting();
			
			//隐藏紧急公告
//			lobbyView.urgentNotice.hide();
//			lobbyView.urgentNotice.toLobbyUrgentNotice();
//			lobbyView.urgentNotice.show();
			NoticeManeger.getInstance().refresh();
			NoticeManeger.getInstance().toLobbyUrgentNotice();
			
			lobbyView.toLobby();
			SoundManager.getInstance().stopAllSound();
			//需等退出动画结束才变换功能栏
//			lobbyView.toolView.toLobby();
			
			//屏蔽大厅桌子
			//			lobbyView.addChildTableList();
			
			//			lobbyView.themeList.setDefaultThemeButtonSelect();
			
			
		}
		
		public exitMultiComplete():void{
			sendSubscribeTheme(lobbyView.themeList.currentTheme.struct.ThemeID);
			lobbyView.toolView.toLobby();
			lobbyView.toolView.btnExit.enabled = true;
			if(multiTableView){
				multiTableView.destroy();
				multiTableView = null;
			}
			TipManager.getInstance().hide();
			Memory.gc();
		}
		
		/**
		 *退出好路 
		 * 
		 */
		public exitGoodRoad():void{
			LobbyData.getInstance().clearSubscribed();
			var loader:Loader = ResourceManager.getInstance().getLoader("GameBaccaratGood.swf");
			if (loader){
				var swf:Game =	loader.content as Game;
				console.log("remove GameBaccaratGood Packet")
				swf.removePacket();
			}else{
				console.log("removeMultiTablePacket 不存在好路百家乐swf")
			}
			//removeMultiTablePacket();
		}
		
		get liveVideoNum():number{
			return m_vecLive.length;
		}
		
		private getEmptyVideoIndex():number{
			for (var i:number = 0; i < 4; i++) 
			{
				if(m_arrVideoNo[i]==false){
					return i;
				}
			}
			
			return -1;
		}
		
		/**
		 * 视讯限制
		 * @param _TableID
		 * @return 使用的stagevideoindex
		 * 
		 */
		public addMultiTableLive(_TableID:number):number{
			if(m_vecLive && multiTableView.currentList){
				for (var i:number = 0; i < m_vecLive.length; i++) 
				{
					if(m_vecLive[i].TableID == _TableID){
						return m_vecLive[i].Channel;
					}
				}
				
				var ob : Object = {};
				ob.TableID = _TableID;
				
				if(m_vecLive.length<4){
					
					ob.Channel = getEmptyVideoIndex();
					m_arrVideoNo[ob.Channel]=true;
					m_vecLive.push(ob);
				//	console.log("台子：：：："+_TableID+"  使用通道  "+ob.Channel)
					return ob.Channel;
				}else{
					if(multiTableView){
						var _multiTableItem : MultiTableItem = multiTableView.currentList.getTableItemByTableID(m_vecLive[0].TableID);
						if(_multiTableItem){
							ob.Channel = m_vecLive[0].Channel;
							m_arrVideoNo[ob.Channel]=true;
						//	console.log("关闭台子"+m_vecLive[0].TableID+"  开启台子：：：："+_TableID+"  使用通道  "+ob.Channel)
							_multiTableItem.gameApp.stopVideo();
							_multiTableItem = null;
						}else{
							console.log("多桌视讯数量限制异常...");
							ob.Channel = m_vecLive[0].Channel;
							m_arrVideoNo[ob.Channel]=true;
						}
						
						m_vecLive.push(ob);
						return ob.Channel;
					}
				}
			}
			return -1;
		}
		public removeMultiTableLive(_iTableID:number):void{
		//	console.log("移除多桌视频----"+_iTableID)
			var _len : int = m_vecLive.length;
			for (var i:number = 0; i < _len; i++) 
			{
				if(m_vecLive){
					if(_iTableID == m_vecLive[i].TableID){
						m_arrVideoNo[m_vecLive[i].Channel]=false;
						m_vecLive.splice(i,1);
						break;
					}
				}
			}
			
		}
		public clearMultiTableLive():void{
			while(m_vecLive.length>0){
				m_vecLive.pop();
			}
			
			for (var i:number = 0; i < 4; i++) 
			{
				m_arrVideoNo[i]==false
			}
		}
		/** 多桌下注 **/
		public addBet(_nValue:Number):void{
			m_nTotalBet += _nValue;
			if(multiTableView){
				chipPanelLobby.updateBetTotal(m_nTotalBet);
			}
		}
		public decreaseBet(_nValue:Number):void{
			m_nTotalBet -= _nValue;
			if (m_nTotalBet<0) {
				m_nTotalBet = 0;
			}
			if(multiTableView){
				chipPanelLobby.updateBetTotal(m_nTotalBet);
			}
		}
		
		public resetBet():void{
			m_nTotalBet = 0;
			if(multiTableView){
				chipPanelLobby.updateBetTotal(m_nTotalBet);
			}
		}
		public setBet(_nValue:Number):void{
			m_nTotalBet = _nValue;
			if(multiTableView){
				chipPanelLobby.updateBetTotal(m_nTotalBet);
			}
		}
		public addHaveBet(_nValue:Number):void{
			m_nTotalHaveBet += _nValue;
			if(multiTableView){
				chipPanelLobby.updateHaveBetTotal(m_nTotalHaveBet);
			}
		}
		public decreaseHaveBet(_nValue:Number):void{
			m_nTotalHaveBet -= _nValue;
			if (m_nTotalHaveBet<0){
				console.log("WARN!!! 多桌已下注额出现负数"+m_nTotalHaveBet);
				m_nTotalHaveBet=0;
			}
			if(multiTableView){
				chipPanelLobby.updateHaveBetTotal(m_nTotalHaveBet);
			}
		}
		public setHaveBet(_nValue:Number):void{
			m_nTotalHaveBet = _nValue;
			if(multiTableView){
				chipPanelLobby.updateHaveBetTotal(m_nTotalHaveBet);
			}
		}
		
		public resetHaveBet():void{
			m_nTotalHaveBet = 0;
			if(multiTableView){
				chipPanelLobby.updateHaveBetTotal(m_nTotalHaveBet);
			}
		}
		
		/** 下注记录 **/
		public addBetRecord(_vecStruct:RecordBetStruct[]):void{
			if(multiTableView){
				multiTableView.record.addRecord(_vecStruct);
			}
		}
		
		/** 添加好路多桌协议 **/
		public addMultiTablePacket():void{
			var swf:Game = ResourceManager.getInstance().getLoader("GameBaccaratMulti.swf").content as Game;
			swf.addPacket();
		}
		/** 移除协议 **/
		private removeMultiTablePacket():void{
			var loader:Loader = ResourceManager.getInstance().getLoader("GameBaccaratMulti.swf");
			if (loader){
				var swf:Game =	loader.content as Game;
				console.log("removeMultiTablePacket")
				swf.removePacket();
			}else{
				console.log("removeMultiTablePacket 不存在百家乐多桌swf")
			}
		}
		/** 连接多桌 **/
		public connectMultiTable(_struct : TableStruct):void{
			multiTableEntryStruct = _struct;
			addMultiTablePacket();
			//			var _struct : TableStruct = LobbyData.getInstance().getMultiTableStruct(GameDefine.BAC);
			if(_struct){
				Log.getInstance().log(this,"连接游戏...struct.ServerIP:" + string(_struct.ServerIP)+ "struct.ServerPort:"+string(_struct.ServerPort));
				
				console.log("连接游戏...","m_socket_multi:", socket_multi.getUid(), "struct.ServerIP:", _struct.ServerIP, "struct.ServerPort:", _struct.ServerPort,"###");
				socket_multi.connect( _struct.ServerIP, _struct.ServerPort );
			}else{
				console.log("获取多桌入口资料失败...");
				Log.getInstance().log(this,"获取多桌入口资料失败...");
			}
		}
		/** 登陆多桌 **/
		public sendLoginMultiTable():void  {
			//bLoginMultiTable = true;
			
			console.log("Login MultiTable");
			if ( lobbyAuth != null ) {
				
				//新方法
				var _class : Class = getDefinitionByName("KeyTest") as Class;
				if(_class){
					var data  = new _class();
					
					var byte:ByteArray = data.enterMultiTable(LobbyManager.getInstance().lobbyAuth);
					
					Utils.DumpBinary( "", byte, 0, 11);
					socket_multi.send( byte, 0,  byte.length);
					
					Log.getInstance().log(this, "登陆好路多桌..." );
				}
				
				//旧方法
//				var _gameLoginPkt : C_Game_Login_Pkt = new C_Game_Login_Pkt();
//				_gameLoginPkt.AuthInfo.AuthToken = lobbyAuth.AuthToken; 			//認證碼
//				_gameLoginPkt.AuthInfo.Identity = lobbyAuth.Identity;			//身份
//				_gameLoginPkt.AuthInfo.Lang = lobbyAuth.Lang;					//語系
//				_gameLoginPkt.AuthInfo.Platform = lobbyAuth.Platform;
//				_gameLoginPkt.AuthInfo.GameID = multiTableEntryStruct.GameID ;
//				_gameLoginPkt.AuthInfo.TableID = multiTableEntryStruct.TableID;
//				_gameLoginPkt.AuthInfo.LobbyServer = Player.getInstance().sLobbyServer; 					//連線Server
//				_gameLoginPkt.AuthInfo.JoinTbType = GameDefine.MULTIPLE;									//進桌類型
//				_gameLoginPkt.AuthInfo.BetLimitID = multiTableEntryStruct.BetLimitID;
//				//				_gameLoginPkt.AuthInfo.BetLimitID = judgeBetLimitId(multiTableEntryStruct.joinTableType , multiTableEntryStruct );	//限紅
//				_gameLoginPkt.AuthInfo.ProtocolVer = 1;
//				multiTableSocketSink.hasKey = false;
//				bLoginMultiTable = false;
//				multiTableId=multiTableEntryStruct.TableID;
//				
//				TimeManager.getInstance().start(PacketDefine.ENTER_TABLE.tostring(16) ,warnConnect);
//				
//				var byte:ByteArray = dataPacket_multi.pack( PacketDefine.ENTER_TABLE , _gameLoginPkt );
//				console.log("登陆多桌..."+multiTableEntryStruct.GameID +"台号"+multiTableEntryStruct.TableID);
//				socket_multi.send( byte, 0,  byte.length);
				
			} else {
				console.log("打开页面时，没有获取到web数据.");
			}
			
		}
		
		public loginMultiEnterOK():void  {
			var _gameClass:Class = getDefinitionByName(GameDefine.BAC_MULTI_NAME) as Class;
			multiEnterGame = new _gameClass(Define.MULTI_TABLE_MODE_0, null, null);
			multiEnterGame.tableStruct.TableID=multiTableId;
			
			sendLoginMultiTableOK();
		}
		
		/** 登陆多桌 **/
		public sendLoginMultiTableOK():void  {
			var _pkt:C_Game_Login_OK_Pkt = new C_Game_Login_OK_Pkt();
			_pkt.AuthToken = string(Player.getInstance().iPlayerID);
			_pkt.Identity  = lobbyAuth.Identity;
			
			var byte:ByteArray = dataPacket_multi.pack( PacketDefine.C_ENTER_TABLE_OK , _pkt );
			console.log("回復 多桌登录成功消息...");
			Utils.DumpBinary( "", byte, 0, 11);
			socket_multi.send( byte, 0,  byte.length);
		}
		
		
		/**
		 * 判斷用哪種限紅進桌
		 * @param	type
		 * @param	connectObj
		 * @return
		 */
		protected judgeBetLimitId(type:number , connectObj:TableStruct ):number {
			var betLimitId:number = -1;
			//以下進桌類型 要用賭桌限紅ID
			/*if ( type == JoinTableType.CHARTER_OTHER || type == JoinTableType.CHARTER_TABLE_OWNER ||  type == JoinTableType.CHARTER_TABLER
			|| type == JoinTableType.PEEK_OTHER || type == JoinTableType.PEEK_TABLEER || type == JoinTableType.TELBET ||type == JoinTableType.MULTIPLE ) {
			
			
			betLimitId = connectObj.BetLimitID;  //賭桌限紅
			}
			else {//急速,一般 ,手臂 用玩家選擇限紅
			
			betLimitId = Player.getInstance().gameSetting.BetLimitId;  //玩家限紅
			}*/
			//玩家沒選限紅(額)
			if ( betLimitId == 0 ) {
				betLimitId = 1;
			}
			
			return betLimitId;
			
			
		}
		/** 订阅多桌 **/
		public sendSubscription(_aData:any[]):void{
			if(socket_multi){
				//				_aData.push( 1 ); 	//測試代碼
				var _subscriptionPkt : C_Multi_Table_Subscription_Pkt = new C_Multi_Table_Subscription_Pkt();
				_subscriptionPkt.TableSubscriptionList = _aData;
				
				var byte:ByteArray = dataPacket_multi.pack( PacketDefine.C_MULTI_TABLE_REQ , _subscriptionPkt );
				
		//		console.log("订阅多桌..."+_aData);
				Utils.DumpBinary( "", byte, 0, 11);
				socket_multi.send( byte, 0,  byte.length);
				byte.clear();
//可能出现没响应的桌子				TimeManager.getInstance().start(PacketDefine.ENTER_TABLE.toString(16) ,warnConnect);
			}
		}
		/** 取消订阅 **/
		public sendUnsubscribe(_aData:any[]):void{
			if(socket_multi){
				for (var i:number = 0; i < _aData.length; i++) 
				{
					if(LobbyData.getInstance().isSubscribed(_aData[i])){
						LobbyData.getInstance().removeSubscribeTable(_aData[i]);
					}
				}
				if(_aData.length>0){
					if (_aData[0] == multiTableId){
						return;
					}
					
					var _unsubscribePkt : C_Multi_Table_Unsubscribe_Pkt = new C_Multi_Table_Unsubscribe_Pkt();
					_unsubscribePkt.TableSubscriptionList = _aData;
					
					var byte:ByteArray = dataPacket_multi.pack( PacketDefine.C_MULTI_TABLE_UNSUBSCRIBE , _unsubscribePkt );
				//	console.log("取消订阅..."+_aData);
					Utils.DumpBinary( "", byte, 0, 11);
					socket_multi.send( byte, 0,  byte.length);
				}else{
					console.log("取消订阅的桌子未订阅。。。");
				}
				
			}
		}
		/** 订阅多桌 **/
		//		public sendSubscriptionAll(n:number= 16):void{
		//			var arr : any[] = [];
		//			var ad : any[] = LobbyData.getInstance().aGoodRoadMapList;
		//			//var len:number = Math.min(n,ad.length);
		//			var len:number = ad.length;
		//			for (var i:number = 0; i < len; i++) 
		//			{
		//				arr.push(ad[i].TableID);
		//			}
		//			if (arr.length>0){
		//				sendSubscription(arr);
		//			}
		//			arr = null;
		//			ad = null;
		//		}
		
		
		
		
		/** 退出多桌 **/
		public sendExitMultiTable():void{
			var _exitPkt:C_Multi_Table_Exit_Pkt = new C_Multi_Table_Exit_Pkt();
			
			var byte:ByteArray = dataPacket_multi.pack( PacketDefine.C_EXIT_TABLE , _exitPkt );
			console.log("退出多桌...");
			//判斷是否為NULL
			if( socket_multi ){
				socket_multi.send( byte, 0,  byte.length);
			}
		}
		
		/** 多桌投注 **/
		public sendBetMultiTable(data:Object):void{
			if (data.TableID != multiTableId){
				data.IsCrossServer = true;
				
			}
			var byte:ByteArray = dataPacket_multi.pack( PacketDefine.C_BET_INFO , data );
			console.log("入口ID:"+multiTableId+"多桌投注..."+data.TableID+"是否跨桌"+data.IsCrossServer);
			if( socket_multi ){
				socket_multi.send( byte, 0,  byte.length);
			}
			
		}
		
		/** 多桌投注 **/
		public complementedRoadMap(data:Object):void{
			
			var byte:ByteArray = dataPacket_multi.pack( PacketDefine.C_Game_Update_Table_Data , data );
			if( socket_multi ){
				socket_multi.send( byte, 0,  byte.length);
			}
			
		}
		
		
		
		
		/**
		 *	自订筹码 
		 * 
		 */		
		public showPanelChipCustom(_uMode:number=0):void{
			m_uPanelChipCustom = _uMode;
			chipPanelLobby.btnSetting.enabled = false;
			chipPanelGame_1.btnSetting.enabled = false;
			chipPanelGame_2.btnSetting.enabled = false;
			if(m_panelChipCustom==null){
				m_panelChipCustom = new PanelChipCustom();
				
				if(m_nowScene){
					m_nowScene.chipSetSprite.addChild(m_panelChipCustom);
					m_nowScene.chipSetSprite.mask = lobbyView.spChipMask;
				}else{
					lobbyView.spChipLayer.addChild(m_panelChipCustom);
					lobbyView.spChipLayer.mask = lobbyView.spChipMask;
				}
				
				
				switch(m_uPanelChipCustom){
					case 0:
						m_panelChipCustom.x = 1430;//stage.stageWidth * 0.5 + uWindowIndex * 50;
						m_panelChipCustom.y = 1500;//stage.stageHeight * 0.5 - 50 + uWindowIndex * 50;
						
						lobbyView.spChipMask.graphics.clear();
						lobbyView.spChipMask.graphics.beginFill(0x000000);
						lobbyView.spChipMask.graphics.drawRect(0,50,1920,823);
						lobbyView.spChipMask.graphics.endFill();
						
						TweenLite.to(m_panelChipCustom,Define.SPEED,{y:630, ease:Back.easeOut, onComplete:function():void{
							if(m_panelChipCustom){
								m_panelChipCustom.init();
							}
							chipPanelLobby.btnSetting.enabled = true;
							chipPanelGame_1.btnSetting.enabled = true;
							chipPanelGame_2.btnSetting.enabled = true;
						}});
						break;
					
					case 1:
						m_panelChipCustom.x = 1430;
						m_panelChipCustom.y = 1500;
						
						lobbyView.spChipMask.graphics.clear();
						lobbyView.spChipMask.graphics.beginFill(0x000000);
						lobbyView.spChipMask.graphics.drawRect(0,50,1920,866);
						lobbyView.spChipMask.graphics.endFill();
						
						TweenLite.to(m_panelChipCustom,Define.SPEED,{y:630, ease:Back.easeOut, onComplete:function():void{
							if(m_panelChipCustom){
								m_panelChipCustom.init();
							}
							chipPanelLobby.btnSetting.enabled = true;
							chipPanelGame_1.btnSetting.enabled = true;
							chipPanelGame_2.btnSetting.enabled = true;
						}});
						break;
					
					case 2:
						m_panelChipCustom.x = 2500;
						m_panelChipCustom.y = 830;
						lobbyView.spChipMask.graphics.clear();
						lobbyView.spChipMask.graphics.beginFill(0x000000);
						lobbyView.spChipMask.graphics.drawRect(0,50,1616,1080);
						lobbyView.spChipMask.graphics.endFill();
						
						TweenLite.to(m_panelChipCustom,Define.SPEED,{x:1355, ease:Back.easeOut, onComplete:function():void{
							if(m_panelChipCustom){
								m_panelChipCustom.init();
							}
							chipPanelLobby.btnSetting.enabled = true;
							chipPanelGame_1.btnSetting.enabled = true;
							chipPanelGame_2.btnSetting.enabled = true;
						}});
						break;
				}
				
				//				PopupManager.getInstance().show( m_panelChipCustom, function():void{
				//					m_panelChipCustom.init();
				//				} );
				//				uWindowIndex++;
				
			}else{
				hidePanelChipCustom();
			}
		}
		public hidePanelChipCustom():void{
			if(m_panelChipCustom){
				switch(m_uPanelChipCustom){
					case 0:
					case 1:
						TweenLite.to(m_panelChipCustom,Define.SPEED,{y:1500, ease:Back.easeIn, onComplete:function():void{
							if(m_panelChipCustom.parent){
								m_panelChipCustom.parent.removeChild(m_panelChipCustom);
							}
							m_panelChipCustom.destroy();
							m_panelChipCustom = null;
							
							chipPanelLobby.btnSetting.enabled = true;
							chipPanelGame_1.btnSetting.enabled = true;
							chipPanelGame_2.btnSetting.enabled = true;
						}});
						
						break;
					case 2:
						TweenLite.to(m_panelChipCustom,Define.SPEED,{x:2500, ease:Back.easeIn, onComplete:function():void{
							if(m_panelChipCustom){
								if(m_panelChipCustom.parent){
									m_panelChipCustom.parent.removeChild(m_panelChipCustom);
								}
								m_panelChipCustom.destroy();
								m_panelChipCustom = null;
							}
							
							chipPanelLobby.btnSetting.enabled = true;
							chipPanelGame_1.btnSetting.enabled = true;
							chipPanelGame_2.btnSetting.enabled = true;
						}});
				}
				
				
				//				PopupManager.getInstance().close( m_panelChipCustom );
				//				uWindowIndex--;
				//				m_panelChipCustom = null;
			}
		}
		public setCustomChip(_aCustomChip:any[]):void{
			if(chipPanelGame_1){
				chipPanelGame_1.clearCustomChip();
				for (var i:number = 0; i < _aCustomChip.length; i++) 
				{
					chipPanelGame_1.addCustomChip(i,_aCustomChip[i]);
				}
			}
			if(chipPanelGame_2){
				chipPanelGame_2.clearCustomChip();
				for (var k:number = 0; k < _aCustomChip.length; k++) 
				{
					chipPanelGame_2.addCustomChip(k,_aCustomChip[k]);
				}
			}
			if(chipPanelLobby){
				chipPanelLobby.clearCustomChip();
				for (var j:number = 0; j < _aCustomChip.length; j++) 
				{
					chipPanelLobby.addCustomChip(j,_aCustomChip[j]);
				}
			}
		}
		
		//选择筹码
		public setSelectChip(nValue:Number):void{
			var item : ChipItem;
			if(chipPanelGame_1){
				chipPanelGame_1.unselect();
				item = chipPanelGame_1.getChip(nValue);
				if(item){
					chipPanelGame_1.setChipSelect(nValue);
					
					if(chipPanelGame_1.currentChipItem){
						if(chipPanelGame_1.currentChipItem != item){
							chipPanelGame_1.currentChipItem = item;
						}
					}else{
						chipPanelGame_1.currentChipItem = item;
					}
				}
			}
			
			if(chipPanelGame_2){
				chipPanelGame_2.unselect();
				item = chipPanelGame_2.getChip(nValue);
				if(item){
					chipPanelGame_2.setChipSelect(nValue);
					
					if(chipPanelGame_2.currentChipItem){
						if(chipPanelGame_2.currentChipItem != item){
							chipPanelGame_2.currentChipItem = item;
						}
					}else{
						chipPanelGame_2.currentChipItem = item;
					}
				}
			}
			
			if(chipPanelLobby){
				chipPanelLobby.unselect();
				item = chipPanelLobby.getChip(nValue);
				if(item){
					chipPanelLobby.setChipSelect(nValue);
					
					if(chipPanelLobby.currentChipItem){
						if(chipPanelLobby.currentChipItem != item){
							chipPanelLobby.currentChipItem = item;
						}
					}else{
						chipPanelLobby.currentChipItem = item;
					}
				}
			}
		}
		//筹码翻页
		public setChipPage(iValue:number):void{
			if(chipPanelGame_1){
				chipPanelGame_1.iCurrentPage = iValue;
			}
			if(chipPanelGame_2){
				chipPanelGame_2.iCurrentPage = iValue;
			}
			if(chipPanelLobby){
				chipPanelLobby.iCurrentPage = iValue;
			}
		}
		
		/** 筹码面板 **/
		public showChipPanelGame(_chipPanelGame:ChipPanelGame, _x:number, _y:number, _sParent:Sprite, _fRebet:Function):void{
			chipPanelGame = _chipPanelGame;
			_sParent.addChild(chipPanelGame);
			chipPanelGame.x = _x;
			chipPanelGame.y = _y;
			chipPanelGame.fReBet = _fRebet;
		}
		
		/**游戏筹码**/
		public currentChipValueGame():number{
			if(chipPanelGame && chipPanelGame.currentChipItem){
				return chipPanelGame.currentChipItem.uValue;
			}
			console.log("获取当前筹码异常...");
			return 10;
		}
		
		/**多桌筹码**/
		public currentChipValueLobby():number{
			if(chipPanelLobby && chipPanelLobby.currentChipItem){
				return chipPanelLobby.currentChipItem.uValue;
			}
			console.log("获取当前筹码异常...");
			return 10;
		}
		
		/**
		 *	大厅 
		 * 
		 */		
		public showLobby( ):void{
			exitLevel = Define.EXIT_LOBBY;
			
			lobbyView.spGameLayer.addChild(lobbyView.spGame);
			
			lobbyView.spMainLayer.visible = true;
			lobbyView.themeListVisible = true;
			
			//			lobbyView.themeList.setDefaultThemeButtonSelect();
			lobbyView.setNetPosition();
			lobbyView.spTableLayer.visible = true;
		}
		
		public exitTelLobby():void{
			showLobby();
			lobbyView.spTelLobbyLayer.visible = false;
		}
		/**
		 * 更新幣別
		 */
		public updateCurrency():void {
			//好路多桌 退注的消息 都从这里更新金额消息 数额才会比较准确			
			if(multiTableView){
				chipPanelLobby.updateGold();
			}else{
				updateGameCurrency();
			}
			
		}
		
		/**
		 *更新游戏中余额 (好路派彩) 
		 * 
		 */
		public updateGameCurrency():void {
			if( m_nowScene ){
//				收到派彩直接更新余额变动 不按状态过滤				
//				if(m_nowScene.model.tableStruct.GameStatus==GameStatus.SETTLING&&m_nowScene.model.prevStatus!=GameStatus.SETTLING)
//				{
//					return;
//				}
				m_nowScene.updateCurrency();
			}
		}
		
		public offlineTable(table:TableStruct):void{
			if(multiTableView){
				multiTableView.offline(table.TableID);
			}else if( m_nowScene ){
				m_nowScene.offline(table.TableID);
			}
		}
		
		
		/**
		 *	提示对话 
		 */		
		public showDialog( _sValue:string ,_fOk:Function = null, _fNo:Function=null, _bSingleMode: boolean=false, _autoClose:number=0):PanelDialog{
			uDialogCount++;
			var _dialog : PanelDialog = new PanelDialog(false, _fOk, _fNo, _bSingleMode, _autoClose);
			
			Log.getInstance().log(this, "uWindowIndex:::" + uWindowIndex );
			lobbyView.spWarn.addChild(_dialog);
			lobbyView.spWarn.graphics.clear();
			lobbyView.spWarn.graphics.beginFill(0x000000,0.5);
			lobbyView.spWarn.graphics.drawRect(0,0,stage.stageWidth,stage.stageHeight);
			lobbyView.spWarn.graphics.endFill();
			
			_dialog.x = stage.stageWidth * 0.5 + uWindowIndex * 50;
			_dialog.y = stage.stageHeight * 0.5 + uWindowIndex * 50;
			_dialog.text( _sValue );
			//			PopupManager.getInstance().show(_dialog);
			_dialog.scaleX = Define.SCALE_MIN;
			_dialog.scaleY = Define.SCALE_MIN;
			TweenLite.to(_dialog,Define.SPEED,{scaleX:1, scaleY:1});
			uWindowIndex++;
			return _dialog;
		}
		
		/**
		 *	全屏 
		 */		
		public full():void{
			switch(stage.displayState){
				case StageDisplayState.NORMAL:
					stage.displayState = StageDisplayState.FULL_SCREEN_INTERACTIVE;
					break;
				
				case StageDisplayState.FULL_SCREEN:
				case StageDisplayState.FULL_SCREEN_INTERACTIVE:
					stage.displayState = StageDisplayState.NORMAL;
					break;
			}
		}
		
		/**
		 *	系统设置 
		 */		
		public showSystemSetting():void{
			if(!lobbyView ){
				console.log("大厅未初始化，显示异常...");
				return;
			}
			
			if(systemSetting==null){
				systemSetting = new PanelSystemSetting();
				
				lobbyView.spWindowLayer.addChild(systemSetting);
				lobbyView.spShieldLayer.alpha = 1;
				lobbyView.spShieldLayer.graphics.beginFill(0x000000,0.5);
				lobbyView.spShieldLayer.graphics.drawRect(0,0,stage.stageWidth,stage.stageHeight+100);
				lobbyView.spShieldLayer.graphics.endFill();
				
				var move_y:number;
				var point:Point = lobbyView.toolView.getBtnSettingPoint();
				if(exitLevel == Define.EXIT_GAME && currentTableStruct && currentTableStruct.TableType == Define.TABLE_TYPE_ROBOT){//金臂百家位置调整
					move_y = 280 + 37;
					systemSetting.x = point.x;
				}else{
					move_y = 280;
					systemSetting.x = stage.stageWidth - systemSetting.width/2;
				}
				
				systemSetting.y = -300;
				TweenLite.to(systemSetting,Define.SPEED,{y:move_y});
				
				//				PopupManager.getInstance().show( systemSetting );
				//				uWindowIndex++;
			}else{
				hideSystemSetting();
			}
		}
		public hideSystemSetting():void{
			if(systemSetting){
				
				//				PopupManager.getInstance().close( systemSetting );
				TweenLite.to(systemSetting,Define.SPEED,{y:-400, ease:Back.easeIn, onComplete:function():void{
					TweenLite.to(lobbyView.spShieldLayer, Define.SPEED, {alpha:0, onComplete:function():void{
						lobbyView.spShieldLayer.graphics.clear();
					}});
					if(systemSetting){
						lobbyView.spWindowLayer.removeChild(systemSetting);
						systemSetting.defaultState();
						systemSetting.destroy();
						systemSetting = null;
					}
				}});
				
				
				//				uWindowIndex--;
			}
		}
		public changeVolume(_iType:number):void{
			
		}
		
		/**
		 *	包桌设置 
		 * @param _type
		 * @param _sn
		 * @param _socket
		 * 
		 */		
		public showTableSetting(_struct:TableStruct,_fQuickTable:Function=null):void{
			if(!lobbyView){
				console.log("大厅未初始化，显示异常...");
				return;
			}
			
			if(m_tableSetting==null){
				m_tableSetting = new PanelTableSetting(_struct,false,_fQuickTable);
				lobbyView.spWindowLayer.addChild(m_tableSetting);
				lobbyView.spShieldLayer.alpha = 1;
				lobbyView.spShieldLayer.graphics.beginFill(0x000000,0.5);
				lobbyView.spShieldLayer.graphics.drawRect(0,0,stage.stageWidth,stage.stageHeight);
				lobbyView.spShieldLayer.graphics.endFill();
				m_tableSetting.x = stage.stageWidth * 0.5 + uWindowIndex * 50;
				m_tableSetting.y = stage.stageHeight * 0.5 - 50 + uWindowIndex * 50;
				//				PopupManager.getInstance().show( m_tableSetting );
				m_tableSetting.scaleX = Define.SCALE_MIN;
				m_tableSetting.scaleY = Define.SCALE_MIN;
				TweenLite.to(m_tableSetting,Define.SPEED,{scaleX:1, scaleY:1});
				uWindowIndex++;
			}
		}
		public hideTableSetting(_bTween: boolean=true):void{
			if(m_tableSetting){
				if(_bTween){
					//					PopupManager.getInstance().close( m_tableSetting );
					TweenLite.to(m_tableSetting,Define.SPEED,{scaleX:Define.SCALE_MIN, scaleY:Define.SCALE_MIN, onComplete:function():void
					{
						TweenLite.to(lobbyView.spShieldLayer, Define.SPEED, {alpha:0, onComplete:function():void
						{
							lobbyView.spShieldLayer.graphics.clear();
						}});
						if(m_tableSetting)
						{
							if(m_tableSetting.parent){
								m_tableSetting.parent.removeChild(m_tableSetting);
							}
							m_tableSetting.destroy();
							m_tableSetting = null;
						}
					}});
				}else{
					lobbyView.spShieldLayer.graphics.clear();
					if(m_tableSetting)
					{
						if(m_tableSetting.parent){
							m_tableSetting.parent.removeChild(m_tableSetting);
						}
						m_tableSetting.destroy();
						m_tableSetting = null;
					}
				}
				uWindowIndex--;
			}
		}
		/**
		 *	密码进桌 
		 * @param _struct
		 * 
		 */		
		public showTableEnterPwd(_struct:TableStruct,_fQuickTable:Function=null):void{
			if(!lobbyView){
				console.log("大厅未初始化，显示异常...");
				return;
			}
			
			if(m_tableEnter==null){
				m_tableEnter = new PanelTableEnter(_struct,false,_fQuickTable);
				lobbyView.spWindowLayer.addChild(m_tableEnter);
				lobbyView.spShieldLayer.alpha = 1;
				lobbyView.spShieldLayer.graphics.beginFill(0x000000,0.5);
				lobbyView.spShieldLayer.graphics.drawRect(0,0,stage.stageWidth,stage.stageHeight);
				lobbyView.spShieldLayer.graphics.endFill();
				m_tableEnter.x = stage.stageWidth * 0.5 + uWindowIndex * 50;
				m_tableEnter.y = stage.stageHeight * 0.5 - 50 + uWindowIndex * 50;
				//				PopupManager.getInstance().show( m_tableEnter );
				m_tableEnter.scaleX = Define.SCALE_MIN;
				m_tableEnter.scaleY = Define.SCALE_MIN;
				TweenLite.to(m_tableEnter,Define.SPEED,{scaleX:1, scaleY:1});
				uWindowIndex++;
			}
		}
		public hideTableEnterPwd(_bTween: boolean=true):void{
			if(m_tableEnter){
				
				if(_bTween){
					//					PopupManager.getInstance().close( m_tableEnter );
					TweenLite.to(m_tableEnter,Define.SPEED,{scaleX:Define.SCALE_MIN, scaleY:Define.SCALE_MIN, onComplete:function():void{
						TweenLite.to(lobbyView.spShieldLayer, Define.SPEED, {alpha:0, onComplete:function():void{
							lobbyView.spShieldLayer.graphics.clear();
						}});
						if(m_tableEnter){
							if(m_tableEnter.parent){
								m_tableEnter.parent.removeChild(m_tableEnter);
							}
							m_tableEnter.destroy();
							m_tableEnter = null;
						}
						
					}});
				}else{
					lobbyView.spShieldLayer.graphics.clear();
					if(m_tableEnter){
						if(m_tableEnter.parent){
							m_tableEnter.parent.removeChild(m_tableEnter);
						}
						m_tableEnter.destroy();
						m_tableEnter = null;
					}
				}
				
				uWindowIndex--;
			}
		}
		/**
		 *	限红选择 
		 * @param _struct
		 * 
		 */		
		public showLimitBet(_struct:TableStruct=null):void{
			if(!lobbyView){
				console.log("大厅未初始化，显示异常...");
				return;
			}
			
			if(m_limitBet==null){
				m_limitBet = new PanelLimitBet(_struct,false);
				lobbyView.spWindowLayer.addChild(m_limitBet);
				lobbyView.spShieldLayer.alpha = 1;
				lobbyView.spShieldLayer.graphics.beginFill(0x000000,0.5);
				lobbyView.spShieldLayer.graphics.drawRect(0,0,stage.stageWidth,stage.stageHeight);
				lobbyView.spShieldLayer.graphics.endFill();
				m_limitBet.x = stage.stageWidth * 0.5 + uWindowIndex * 50;
				m_limitBet.y = stage.stageHeight * 0.5 - 50 + uWindowIndex * 50;
				//				PopupManager.getInstance().show( m_limitBet );
				m_limitBet.scaleX = Define.SCALE_MIN;
				m_limitBet.scaleY = Define.SCALE_MIN;
				TweenLite.to(m_limitBet,Define.SPEED,{scaleX:1, scaleY:1});
				uWindowIndex++;
			}
		}
		public hideLimitBet(_bTween: boolean=true):void{
			if(m_limitBet){
				
				if(_bTween){
					//					PopupManager.getInstance().close( m_limitBet );
					TweenLite.to(m_limitBet,Define.SPEED,{scaleX:Define.SCALE_MIN, scaleY:Define.SCALE_MIN, onComplete:function():void{
						TweenLite.to(lobbyView.spShieldLayer, Define.SPEED, {alpha:0, onComplete:function():void{
							lobbyView.spShieldLayer.graphics.clear();
						}});
						if(m_limitBet){
							if(m_limitBet.parent){
								m_limitBet.parent.removeChild(m_limitBet);
							}
							m_limitBet.destroy();
							m_limitBet = null;
						}
						
					}});
				}else{
					lobbyView.spShieldLayer.graphics.clear();
					if(m_limitBet){
						if(m_limitBet.parent){
							m_limitBet.parent.removeChild(m_limitBet);
						}
						m_limitBet.destroy();
						m_limitBet = null;
					}
					
				}
				
				uWindowIndex--;
			}
		}
		
		/**
		 *	好路通知
		 * @param _struct
		 * 
		 */		
		
		public addGoodRoadNotification(_goodroadMapStruct:GoodRoadStruct):void{
			if (maintainLevel==0){
				if(multiTableView && bMultiExit==false){
					//	console.log("通知多桌加入好路"+_goodroadMapStruct.TableID)
					multiTableView.addGoodRoadStruct(_goodroadMapStruct);
				}
				if(m_nowScene && (m_nowScene.GameID==GameDefine.BAC || m_nowScene.GameID==GameDefine.MACHINE_BAC)){
					m_nowScene.addGoodRoadNotification(_goodroadMapStruct);
				}
			}
			
		}
		
		public removeGoodRoadNotification(_tableID:number):void{
			
			if(multiTableView){
				multiTableView.removeGoodRoadStruct(_tableID);
			}
			
			
			if(m_nowScene && (m_nowScene.GameID==GameDefine.BAC || m_nowScene.GameID==GameDefine.MACHINE_BAC)){
				console.log("游戏好路通知移除好路桌TableID:"+_tableID);
				m_nowScene.removeGoodRoadNotification(_tableID);
			}
		}
		
		/**
		 *	胜利动画 
		 * @param _type
		 * @param _sn
		 * @param _socket
		 * 
		 */		
		public showAnimationGameWinC(_nValue:Number):void{
			if(m_animationGameWinC==null){
				m_animationGameWinC = new AnimationGameWinC(_nValue);
				
				lobbyView.spAnimationLayer.addChild(m_animationGameWinC);
				
				m_animationGameWinC.x = 570;
				m_animationGameWinC.y = 239;
			}
			m_animationGameWinC.value = _nValue;
			m_animationGameWinC.play();
		}
		public stopAnimationGameWinC():void{
			if(m_animationGameWinC){
				m_animationGameWinC.stop();
			}
		}
		
		public showAnimationGameWinA(_nValue:Number,_uCount:number=1):void{
			if(m_animationGameWinA==null){
				m_animationGameWinA = new AnimationGameWinA(_nValue,_uCount);
				
				lobbyView.spAnimationLayer.addChild(m_animationGameWinA);
				
				m_animationGameWinA.x = 545;
				m_animationGameWinA.y = 490;
			}
			m_animationGameWinA.count(_uCount);
			m_animationGameWinA.value = _nValue;
			m_animationGameWinA.play();
		}
		public stopAnimationGameWinA():void{
			if(m_animationGameWinA){
				m_animationGameWinA.stop();
			}
		}
		
		/**
		 *	好路类型 
		 * @param _type
		 * @param _sn
		 * @param _socket
		 * 
		 */		
		public showGoodRoadSetting():void{
			if(panelGoodRoadType==null){
				panelGoodRoadType = new PanelGoodRoadSetting();
				lobbyView.spWindowLayer.addChild(panelGoodRoadType);
				lobbyView.spShieldLayer.alpha = 1;
				lobbyView.spShieldLayer.graphics.beginFill(0x000000,0.5);
				lobbyView.spShieldLayer.graphics.drawRect(0,0,stage.stageWidth,stage.stageHeight);
				lobbyView.spShieldLayer.graphics.endFill();
				panelGoodRoadType.x = stage.stageWidth * 0.5 + uWindowIndex * 50;
				panelGoodRoadType.y = stage.stageHeight * 0.5 - 50 + uWindowIndex * 50;
				//				PopupManager.getInstance().show( panelGoodRoadType );
				panelGoodRoadType.scaleX = Define.SCALE_MIN;
				panelGoodRoadType.scaleY = Define.SCALE_MIN;
				TweenLite.to(panelGoodRoadType,0.5,{scaleX:1, scaleY:1});
				uWindowIndex++;
			}
		}
		public hideGoodRoadSetting():void{
			if(panelGoodRoadType){
				//				PopupManager.getInstance().close( panelGoodRoadType );
				TweenLite.to(panelGoodRoadType,Define.SPEED,{scaleX:Define.SCALE_MIN, scaleY:Define.SCALE_MIN, onComplete:function():void{
					TweenLite.to(lobbyView.spShieldLayer, Define.SPEED, {alpha:0, onComplete:function():void{
						lobbyView.spShieldLayer.graphics.clear();
					}});
					if(panelGoodRoadType){
						if(panelGoodRoadType.parent){
							panelGoodRoadType.parent.removeChild(panelGoodRoadType);
						}
						panelGoodRoadType.destroy();
						panelGoodRoadType = null;
					}
					
				}});
				
				uWindowIndex--;
			}
		}
		
		/**
		 *选定设置好路类型 
		 * 
		 */
		public setGoodRoadSetting():void{
			if(multiTableView){
				//清空所有桌
				multiTableView.currentList.clearTableList();
				multiTableView.currentList.iCurrentPage = 0;
			}
			if( m_nowScene && (m_nowScene.GameID==GameDefine.BAC || m_nowScene.GameID==GameDefine.MACHINE_BAC)){
				m_nowScene.setGoodRoads();
			}
		}
		
		
		/**
		 *	收包回复 
		 */		
		public sendAck(_type:number, _sn:number, _socket:TCPSocket=null):void{
			var _ack : C_Ack_Pkt = new C_Ack_Pkt();
			_ack.SN = _sn;
			var byte:ByteArray = dataPacket.pack( PacketDefine.ACK , _ack );
			Utils.DumpBinary( "", byte, 0, 11);
			switch(_type){
				case 0:
					m_socket.send( byte, 0,  byte.length);
					break;
				case 1:
					m_socket.send( byte, 0,  byte.length);
					break;
				case 2:
					_socket.send( byte, 0,  byte.length);
					break;
			}
		}
		public sendNAck(_type:number, _sn:number, _socket:TCPSocket=null):void{
			var _nack : C_NAck_Pkt = new C_NAck_Pkt();
			_nack.SN = _sn;
			var byte:ByteArray = dataPacket.pack( PacketDefine.N_ACK , _nack );
			Utils.DumpBinary( "", byte, 0, 11);
			switch(_type){
				case 0:
					m_socket.send( byte, 0,  byte.length);
					break;
				case 1:
					m_socket.send( byte, 0,  byte.length);
					break;
				case 2:
					_socket.send( byte, 0,  byte.length);
					break;
			}
			
		}
		
		/**
		 * 送給服務端 大廳登出
		 */
		public sendLobbyLogout():void {
			var _oData:Object = {};
			_oData.PlayerID = Player.getInstance().iPlayerID;
			_oData.Identity = Player.getInstance().iIdentity;
			_oData.Reason   = 1;
			
			var _logoutLobbyPkt:LobbyLogoutReqPkt = new LobbyLogoutReqPkt();
			_logoutLobbyPkt.LogoutInfo = new LogoutStruct( _oData );
			
			var byte:ByteArray = dataPacket.pack( PacketDefine.C_LOGIN_OUT , _logoutLobbyPkt );
			console.log("登出大廳...");
			Utils.DumpBinary( "", byte, 0, 11);
			m_socket.send( byte, 0,  byte.length);
		}
		
		/**
		 *  发送log 
		 * 
		 */		
		public sendLog(sLog:string):void{
			var _encryptData : C_Log_Req_Pkt = new C_Log_Req_Pkt();
			_encryptData.LogID = LobbyData.LTK;
			_encryptData.Log = sLog;
			var _encryptStr:string = JSON.stringify(_encryptData);
			
			var _logReq : URLRequest = new URLRequest(TemConfig.getInstance().LogServerApiUrl + "/LogHandler/WriteLog");
			_logReq.method = URLRequestMethod.POST;
			var _param : URLVariables = new URLVariables();
			_param.JsonLogString = _encryptStr;
			_logReq.data = _param;
			var _logLoader : URLLoader = new URLLoader();
			_logLoader.addEventListener(IOErrorEvent.IO_ERROR,function(evt:IOErrorEvent):void{});
			_logLoader.addEventListener(SecurityErrorEvent.SECURITY_ERROR,function(evt:SecurityErrorEvent):void{});
			_logLoader.addEventListener(Event.COMPLETE, onComplete(evt:egret.Event):void{
				console.log("发送消息给logServer成功 ***");
			}, this);
			_logLoader.load( _logReq );
		}
		
		
		public warnConnect():void {
			console.log("游戏超时  已存在重要信息:"+LobbyManager.getInstance().bImportant)
			if (bImportant==false){
				var _sMsg:string;
				var _panelDialog:PanelWindow;
				closeAllDialog();
				_sMsg = getLanguageString( Language.sNetWork_Abnormal_Game );
				_panelDialog = showDialog_2(_sMsg , true , false , leaveLobby , refreshWeb  );
				PanelDialog_2(_panelDialog).fDestroyRun =leaveLobby;			//關閉紐 偵聽函式
				LobbyManager.getInstance().aCloseWindowList.push(_panelDialog);
				bImportant=true;
			}
			
		}
		
		/**
		 *游戏中收到全站 、代理维护提示 
		 */
		public alertMaintain(key:string):void{
			closeAllDialog();
			var _panelDialog:PanelDialog_2 = LobbyManager.getInstance().showDialog_2( key , true , true , leaveLobby );
			PanelDialog_2(_panelDialog).fDestroyRun = leaveLobby;
			aCloseWindowList.push( _panelDialog); 
			lobbySocketClose();							//大廳斷線
			gameSocketClose();
			bImportant=true;
		}
		
		
	
		/**
		 *	视讯音量 
		 */		
		set nLiveVolume(_nValue:Number){
			//调整音量
			m_nLiveVolume = _nValue;
			if(m_bLiveStatus){
				//				m_nLiveVolume = _nValue==0?0.6:_nValue;
				//遊戲視訊  音量
				if(m_videoMaxBytePerSecond){
					if( m_videoMaxBytePerSecond instanceof LiveVideo ){
						m_videoMaxBytePerSecond.setVolume( 0 );
					}else{
						m_videoMaxBytePerSecond.setVolume( m_nLiveVolume );
					}
				}
				
				//全景視訊 音量
				if( panelLiveVideo ){
					panelLiveVideo.setVolume( m_nLiveVolume );
				}
				
				//大廳視訊 音量
//				if( lobbyView && lobbyView.liveVideo.bIsPlaying ){
//					lobbyView.liveVideo.setVolume( m_nLiveVolume );
//				}
			}
			
		}
		
		get nLiveVolume():Number {
			return m_nLiveVolume;
		}
		
		set bLiveStatus(_bValue: boolean){
			m_bLiveStatus = _bValue;
			//禁音开关
			
			if( m_bLiveStatus ){
				nLiveVolume = m_nLiveVolume;
			}
			else {
				//遊戲視訊  音量
				if( m_videoMaxBytePerSecond ){
					if( m_videoMaxBytePerSecond instanceof LiveVideo ){
						m_videoMaxBytePerSecond.setVolume( 0 );
					}else{
						m_videoMaxBytePerSecond.setVolume( m_nLiveVolume );
					}
				}
				
				//全景視訊 音量
				if( panelLiveVideo ){
					panelLiveVideo.setVolume( m_nLiveVolume );
				}
				
				//大廳視訊 音量
//				if( lobbyView && lobbyView.liveVideo && lobbyView.liveVideo.bIsPlaying ){
//					lobbyView.liveVideo.setVolume( 0 );
//				}	
				
				
			}
			
			
		}
		
		/**
		 * 返回首页 
		 * 
		 */		
		public leaveLobby():void {
//			if(ExternalInterface.available){
//				ExternalInterface.call("LeaveLobby");
//			}
			js_call(Define.JS_Index);
		}
		
		/**
		 * 連結電投大廳
		 */
		public enterTelLobby():void {
			console.log("進入電投 登入頁");
			//			if(ExternalInterface.available){
			//				ExternalInterface.call("TelephoneLobby");
			//			}
			js_call(Define.JS_JUMP_TELBET);
		}
		/**
		 * 充值
		 */		
		public recharge():void{
			js_call(Define.JS_Recharge);
		}
		/**
		 * 注册
		 */		
		public regist():void{
			js_call(Define.JS_Regist);
		}
		
		/**
		 *	刷新页面 
		 * 
		 */		
		public refreshWeb():void{
			console.log("refreshWeb");
			//			if(ExternalInterface.available){
			//				ExternalInterface.call("RefreshFlash");
			//			}
			js_call(Define.JS_Refresh);
		}
		public js_call(_value:number=-1):void{
			if(ExternalInterface.available){
				//全屏模式先退出全屏，再打开其他页面
				if(LobbyManager.getInstance().stage.displayState == StageDisplayState.FULL_SCREEN || 
					LobbyManager.getInstance().stage.displayState == StageDisplayState.FULL_SCREEN_INTERACTIVE){
					LobbyManager.getInstance().full();
				}
				
				ExternalInterface.call("RedirectCustomizedUrl",_value);
			}
		}
		
		/**
		 *	另一種 提示对话框 
		 */		
		public showDialog_2( _sValue:string , bShowMask: boolean = false , bSingleMode: boolean = false ,_fOk:Function = null ,_fRetry:Function = null):PanelDialog_2{
			uDialogCount++;
			var _dialog : PanelDialog_2 = new PanelDialog_2(false, bShowMask , bSingleMode ,_fOk , _fRetry );
			
			
			lobbyView.spWarn.addChild(_dialog);
			lobbyView.spWarn.graphics.clear();
			lobbyView.spWarn.graphics.beginFill(0x000000,0.5);
			lobbyView.spWarn.graphics.drawRect(0,0,stage.stageWidth,stage.stageHeight);
			lobbyView.spWarn.graphics.endFill();
			
			
			
			_dialog.x = stage.stageWidth * 0.5 + uWindowIndex * 50;
			_dialog.y = stage.stageHeight * 0.5 + uWindowIndex * 50;
			_dialog.text( _sValue );
			//			PopupManager.getInstance().show(_dialog);
			_dialog.scaleX = Define.SCALE_MIN;
			_dialog.scaleY = Define.SCALE_MIN;
			TweenLite.to(_dialog,Define.SPEED,{scaleX:1, scaleY:1});
			uWindowIndex++;
			return _dialog;
		}		
		
		
		
		set gamePoint(_point:Point){
			m_gamePoint = _ponumber;
			
			//			console.log("************************************************************ 全局坐标：",m_gamePoint);
			//			lobbyView.spGame.x =<number>(m_gamePoint.x);
			//			lobbyView.spGame.y =<number>(m_gamePoint.y);
			
			lobbyView.spTweenGame.x =<number>(m_gamePoint.x);
			lobbyView.spTweenGame.y =<number>(m_gamePoint.y);
			
			
		}
		get gamePoint():Point{
			return m_gamePonumber;
		}
		
		/**
		 *	重连视讯 
		 */		
		public liveReplay(tableList:any[] = null):void{
			if(m_nowScene && tableList){
				for(var i:number=0; i<tableList.length; i++){
					if(tableList[i] == m_nowScene.tableStruct.TableID){
						m_nowScene.stopVideo();
						m_nowScene.playVideo();
						break;
					}
				}
			}
			
			//多桌重连视讯
			if(exitLevel==Define.EXIT_MULTI_TABLE){
				if(multiTableView && multiTableView.currentList){
					multiTableView.currentList.PlayAllVideo();
				}
			}
		}
		
		//更新荷官
		public updateDealerInfo(_struct : DealerStruct):void{
			if(m_nowScene){
				if(m_nowScene.tableStruct.ThemeID == _struct.ThemeID  && m_nowScene.tableStruct.TableID==_struct.TableID){
					m_nowScene.updateDealerInfo(_struct);
				}
			}
		}
		
		public lobbySocketClose():void {
			if( m_socket && m_socket.isConnected() ) {
				try{
					m_socket.m_socket.close();
				}
				catch(e:Error){
					
				}
			}
		}
		public isLobbySocketConnected(): boolean
		{
			if(m_socket)return m_socket.isConnected();
			return false;
		}
		public gameSocketClose():void{
			TimeManager.getInstance().stopAll();
			if (m_nowScene){
				m_nowScene.closeGame();
			}else if (bLoginMultiTable && socket_multi){
				destroyMultiSocket();
			}
			
		}
		
		//快速转桌
		public changeGame(bToBac: boolean=false):void{
			if(lobbyView.quickThemeList.currentTheme){
				lobbyView.quickThemeList.currentTheme.setSelect(false, false);
			}
			//			lobbyView.iCurrentQuick = 255;
			//			ActionManager.getInstance().fExitGame = m_nowScene.destroy;
			
			m_nowScene.changeTable();
			if(!bToBac || bQuickToMultiTable){
				exitGoodRoad();
				m_nowScene.removePacket();
			}
			
			
			if(m_animationGameWinC){
				m_animationGameWinC.stop();
			}
			if(m_animationGameWinA){
				m_animationGameWinA.stop();
			}
			
			//隐藏面板
			hideChannel();
			hidePanelChipCustom();
			
			if(m_gameTransition){
				m_gameTransition.destroy();
				m_gameTransition = null;
			}
			
			//截图
//			if(m_bmpSnapshotGame==null){
//				m_bmpSnapshotGame = new Bitmap(snapshotGame());
//				lobbyView.spGameLayer.addChild(m_bmpSnapshotGame);
//				m_bmpSnapshotGame.smoothing = true;
//			}
			destroyGame();
		}
		
		public closeAllDialog():void {
			for( var i:number =0 ; i < aCloseWindowList.length ; i++ ){
				if(  aCloseWindowList[i].parent ){
					aCloseWindowList[i].parent.removeChild(aCloseWindowList[i]); 
				}
				aCloseWindowList[i].destroy();
			}
			aCloseWindowList = new Array<PanelWindow>();
		}
		
		public reconnect(): boolean {
			Log.getInstance().log(this, "大廳重連..." );
			if( iReTryConnect < 2 ){	//1.5秒重連一次
				lobbySocketClose();
				/*var timer:Timer = new Timer( 1500 , 1); 
				timer.addEventListener(TimerEvent.TIMER_COMPLETE , onRetryLogin );
				timer.start();*/
				var timer:JTimer = JTimer.getTimer(1500,1);
				timer.addTimerCallback(null,onRetryLogin);
				timer.start();
				return true;
			}
			else {
				lobbySocketClose();
				return false;
			}	
			
		}
		
		protected onRetryLogin(timer:JTimer):void
		{
			Log.getInstance().log(this , "大廳重連" );
			/*var timer:Timer = event.target as Timer;
			timer.removeEventListener(TimerEvent.TIMER_COMPLETE , onRetryLogin );
			timer =null;*/
			timer.dispose();
			//连接大厅
			connect( lobbyAuth.serverIP , lobbyAuth.serverPort);
			iReTryConnect = iReTryConnect + 1;
		}	
		
//		private clearSnapshotGame():void{
//			if(m_bmpSnapshotGame){
//				if(m_bmpSnapshotGame.parent){
//					m_bmpSnapshotGame.parent.removeChild(m_bmpSnapshotGame);
//				}
//				if(m_bmpSnapshotGame.bitmapData){
//					m_bmpSnapshotGame.bitmapData.dispose();
//				}
//				m_bmpSnapshotGame = null;
//			}
//		}
		
		public IsCanChangeTable(): boolean{
			if(m_nowScene){
				return m_nowScene.bCanExit;
			}
			return true;
		}
		
		public showGameMessage(sValue:string):void{
			if(m_nowScene){
				m_nowScene.showMessage(sValue);
			}
		}
		
		public getGameID():number{
			if(m_nowScene){
				return m_nowScene.tableStruct.GameID;
			}
			return 0;
		}
		public getGameTableID():number{
			if(m_nowScene){
				return m_nowScene.tableStruct.TableID;
			}
			return 0;
		}
		public getGameThemeID():number{
			if(m_nowScene){
				return m_nowScene.tableStruct.ThemeID;
			}
			return 0;
		}
		public IsInTable(): boolean{
			return m_nowScene!=null;
		}
		
		public showGameStatistic():void{
			if(m_nowScene){
				m_nowScene.showStatistic();
			}
		}
		
		public hideGameStatistic():void{
			if(m_nowScene){
				m_nowScene.hideStatistic();
			}
		}
		
		public IsLiveConnected(): boolean{
			if(m_nowScene){
				return m_nowScene.bVideoConnected;
			}
			return false;
		}
		
		/****************************大廳心跳包處裡**************************************/
		
		
		/**
		 *  大廳心跳包
		 */
		public sendHeartPkt():void {
			var _lobbyHeartPkt : C_Lobby_Heart_Pkt 	=	new C_Lobby_Heart_Pkt();
			_lobbyHeartPkt.Identity = lobbyAuth.Identity;
			_lobbyHeartPkt.PlayerID = Player.getInstance().iPlayerID;
			var byte:ByteArray = dataPacket.pack( PacketDefine.C_Heart , _lobbyHeartPkt );
			
			
			Utils.DumpBinary( "", byte, 0, 11);
			m_socket.send( byte, 0,  byte.length);
			
//			Log.getInstance().log(this, "送出心跳..." );
			
		}	
		/**
		 * 回送服務器傳來心跳包消息
		 */
		public responseHeartPkt():void {
			var _lobbyHeartPkt : C_Lobby_Heart_Pkt 	=	new C_Lobby_Heart_Pkt();
			_lobbyHeartPkt.Identity = lobbyAuth.Identity;
			_lobbyHeartPkt.PlayerID = Player.getInstance().iPlayerID;
			var byte:ByteArray = dataPacket.pack( PacketDefine.S_Heart , _lobbyHeartPkt );
			
			
			Utils.DumpBinary( "", byte, 0, 11);
			
			m_socket.send( byte, 0,  byte.length);
		}		
		
		//5秒檢測一次
		protected onHeart():void
		{
			//			Log.getInstance().log(this, "檢測大廳心跳..." );
			var _nTime:Number = getTimer();
			var _time:Number = (_nTime - nRevServerTime)/1000;
			var _nDelay:Number = (nHeartRate*2)/1000;			//延遲時間
			
			if( _time < _nDelay ){
				sendHeartPkt();
			}else {
				pktException();
			}
			
		}	
		
		/**
		 * 心跳包傳遞異常
		 */
		public pktException():void {
			lobbySocketClose();	//關閉大廳連接
			if( lobbyAuth ){
				
				if( lobbyAuth.Identity != Define.iTryAccount ){
					lobbyView.showLoading();									//打開laoding
					reconnect();												//重連
				}else {			//試玩帳號直接彈跳提示窗
					NetWorkManager.getInstance().checkLobbyNetWork(Define.LobbyTryAccountDisConnect);
				}
			}
			else {
				Log.getInstance().log(this, "包傳遞異常 LobbyAuth::" + lobbyAuth );
			}
			nRevServerTime = getTimer();
			stopHeart();
		}
		
		/**
		 * 啟動心跳包
		 */
		public runHeart():void {
			TimeManager.getInstance().addFun( onHeart , nHeartRate);
		}
		
		/**
		 * 停止心跳包
		 */
		public stopHeart():void {
			TimeManager.getInstance().removeFun(onHeart);
		}
		
		
		/****************************大廳心跳包處裡END**************************************/
		
		
		
		
		/****************************多桌心跳包處裡**************************************/
		
		/**
		 *  多桌心跳包
		 */
		public sendMultiHeartPkt():void {
			var _pkt:C_Game_Heart_Pkt = new C_Game_Heart_Pkt();
			_pkt.PlayerID = Player.getInstance().iPlayerID;
			_pkt.Identity = lobbyAuth.Identity;
			
			var byte:ByteArray = dataPacket_multi.pack( PacketDefine.C_Heart , _pkt );
			Utils.DumpBinary( "", byte, 0, 11);
			
			socket_multi.send( byte, 0,  byte.length);
			
			//			Log.getInstance().log(this, "送出心跳..." );
			
		}	
		/**
		 * 回送服務器傳來心跳包消息
		 */
		public responseMultiHeartPkt():void {
			nRevServerTimeM = getTimer();
			
			var _pkt:C_Game_Heart_Pkt = new C_Game_Heart_Pkt();
			_pkt.PlayerID = Player.getInstance().iPlayerID;
			_pkt.Identity = lobbyAuth.Identity;
			
			var byte:ByteArray = dataPacket_multi.pack( PacketDefine.S_Heart , _pkt );
			Utils.DumpBinary( "", byte, 0, 11);
			
			socket_multi.send( byte, 0,  byte.length);
		}		
		
		//5秒檢測一次
		protected onMultiHeart():void
		{
			//			Log.getInstance().log(this, "檢測大廳心跳..." );
			var _nTime:Number = getTimer();
			var _time:Number = (_nTime - nRevServerTimeM)/1000;
			var _nDelay:Number = (nHeartRate*2)/1000;			//延遲時間
			
			
			pktMultiException();
			
		/*	if( _time < _nDelay ){
				sendMultiHeartPkt();
			}else {
				pktMultiException();
			}*/
			
		}	
		
		/**
		 * 心跳包傳遞異常
		 */
		public pktMultiException():void {
			console.log("!!!!!!!!!!!!!!!!多桌心跳异常!!!!!!!!!!!!!!!!!!!!!!")
			
			if( socket_multi  &&socket_multi.m_socket.connected){
				try {
					socket_multi.m_socket.close();
				}catch(e:Error){
					
				}
				
				reConnectMulti();
			}
			
			nRevServerTimeM = getTimer();
			stopMultiHeart();
		}
		
		/**
		 * 啟動心跳包
		 */
		public runMultiHeart():void {
		//	nRevServerTimeM = getTimer();
		//	TimeManager.getInstance().addFun( onMultiHeart , nHeartRate);
		}
		
		/**
		 * 停止心跳包
		 */
		public stopMultiHeart():void {
			TimeManager.getInstance().removeFun(onMultiHeart);
		}
		
		
		/****************************多桌心跳包處裡END**************************************/
		
		/****************************多桌重连**************************************/
		public reConnectMulti(): boolean {
			if( loginNM < 2 ){
				Log.getInstance().log(this,"重新登入多桌..");
				if( socket_multi ){
					loginNM++			
					/*var timer:Timer = new Timer( 1500 , 1); 
					timer.addEventListener(TimerEvent.TIMER_COMPLETE , onRetryLogin );
					timer.start();*/
					var timer:JTimer = JTimer.getTimer(1500.1);
					timer.addTimerCallback(null,onRetryLogin);
					timer.start();
					
					bRetryM = true;
					lobbyView.showLoading();
					socket_multi.m_socket.close();			//先斷線
				}
				return bRetryM;	
			}
			Log.getInstance().log(this,"重新登入多桌失敗..");
			lobbyView.hideLoading();
			bRetryM = false;
			if( socket_multi ){
				socket_multi.m_socket.close();
			}
			
			return bRetryM;
		}	
		
		protected onRetryLoginM(timer:JTimer):void{
			/*var timer:Timer = event.target as Timer;
			timer.removeEventListener(TimerEvent.TIMER_COMPLETE , onRetryLogin );
			timer =null;*/
			timer.dispose();
			connectMultiTable(multiTableEntryStruct);
			
		}	
		
		public hidePanelDetail():void{
			if(m_nowScene){
				m_nowScene.hidePanelDetail();
			}
		}
		
		public addChildToGame(_view:DisplayObject):void{
			if(m_nowScene){
				m_nowScene.addChild(_view);
			}
		}
		public removeChildToGame(_view:DisplayObject):void{
			if(m_nowScene){
				m_nowScene.addChild(_view);
			}
		}
		
		public hideAllPanel():void{
			hideChannel();
			hidePanelDetail();
			hidePersonalinformation();
			lobbyView.toolView.toolContact.hide();
		}
		
		
		public subscripThemeTimeToShowLoading():void{
			TimeManager.getInstance().removeFun(subscripThemeTimeToShowLoading);
			
			if(bSubscribeTheme){
				lobbyView.showLoading();
			}
		}
		public subscripThemeTimeToHint():void{
			TimeManager.getInstance().removeFun(subscripThemeTimeToHint);
			
			lobbyView.hideLoading();
			NetWorkManager.getInstance().showPannel(Language.sNetWork_Abnormal_Lobby , NetWorkManager.getInstance().lobbyConnectCloseed );	
			lobbySocketClose();	
			gameSocketClose();
		}
		
		/**
		 * 加载游戏 
		 */		
		public loaderGame(_tableType:number):void{
			switch(_tableType){
				case Define.TABLE_TYPE_NORMAL:
					break;
				
				case Define.TABLE_TYPE_DTF:
					break;
				
				case Define.TABLE_TYPE_ROBOT:
					break;
				
				case Define.TABLE_TYPE_ROU:
					break;
				
				case Define.TABLE_TYPE_SIC:
					break;
			}
		}
		
		/**
		 *缓存结果动画，好路用
		 * win11(红色赢中字） win13(红色赢英文) 
		 * win31(和局中字） win13(和局英文) 
		 */
		private cacheWinMc():void{
			
			var win1:MovieClip=ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_MULTITABLE, "WinRedMc");
			var win3:MovieClip=ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_MULTITABLE, "WinGreenMc");
			if(CacheManager.getInstance().hasCache("win11")==false){
				CacheManager.getInstance().cacheMovieClip("win11",win1);
			}
			if(CacheManager.getInstance().hasCache("win31")==false){
				CacheManager.getInstance().cacheMovieClip("win31",win3);
			}
			
			win1.mc.gotoAndStop(3);
			win3.mc.gotoAndStop(3);
			
			if(CacheManager.getInstance().hasCache("win13")==false){
				CacheManager.getInstance().cacheMovieClip("win13",win1);
			}
			if(CacheManager.getInstance().hasCache("win33")==false){
				CacheManager.getInstance().cacheMovieClip("win33",win3);
			}
			win1=null;
			win3=null;
			
			
		}
		
		protected detectionComplete(event:TimerEvent):void
		{
			// TODO Auto-generated method stub
			if(m_uDetection==m_uDetectionCount){
				showIsChangeRenderModeAsk();
			}
		}
		protected detection(event:TimerEvent):void
		{
			// TODO Auto-generated method stub
			if(lobbyView.iCurrentFps<20){
				m_uDetection++;
			}
		}
		public startDetection(uCount:number):void{
			if(!m_bDetection){
				return;
			}
			if(uRenderMode==1){
				stopDetection();
				return;
			}
			
			m_uDetection = 0;
			m_uDetectionCount = uCount;
			if(m_detectionTimer){
				if(m_detectionTimer.running){
					m_detectionTimer.stop();
				}
				m_detectionTimer.repeatCount = uCount;
				m_detectionTimer.start();
			}
			
		}
		public stopDetection():void{
			if(!m_bDetection){
				return;
			}
			if(m_detectionTimer){
				if(m_detectionTimer.running){
					m_detectionTimer.stop();
				}
			}
		}
		public showIsChangeRenderModeAsk():void{
			if(!m_bDetection){
				return;
			}
			showDialog(getLanguageString(Language.sIsChangeRenderToLow),changeRenderModeToLow,null);
		}
		public changeRenderModeToLow():void{
			if(!m_bDetection){
				return;
			}
			uRenderMode = 1;
			if(multiTableView){
				multiTableView.changeModeToLow();
			}
		}


	}
}