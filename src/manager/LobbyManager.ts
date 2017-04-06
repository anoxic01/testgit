module manager {
	export class LobbyManager {

		public stageW;
		public stageH;

		
		

		/** 大厅通讯 **/
		private m_socket				:	socket.TCPSocket;							//通讯连接
		private m_lobbySocketSink		:	socket.ITCPSocketSink;						//通讯连接
		public lobbyAuth 				;				//登陆数据
		public socketParser				;						//数据解析
		public dataPacket 				: 	packet.DataPacket;							//数据封包
		
		/** 初始大厅 **/
		public lobbyView 				;							//主类容器
		
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
			
//			if( this.m_bLiveStatus ){
//				this.m_videoMaxBytePerSecond.setVolume( this.m_nLiveVolume );
//			}
//			else {
//				this.m_videoMaxBytePerSecond.setVolume( 0 );
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
		private m_nTotalBet				:	number	=	0;						//下注金额
		private m_nTotalHaveBet			:	number	=	0;						//已下注金额
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
		public socketParser_multi		;						//数据解析
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
		private m_videoMaxBytePerSecond	;							//
		
		private m_nowScene				;								//当前游戏
		private m_newGame				;								//预进入的新游戏
		private m_gamePoint				=	new egret.Point();			//全局坐标
		
		public chipPanelGame			;							//筹码面板
		public chipPanelGame_1			;						//百家、龙虎
		public chipPanelGame_2			;						//轮盘、骰宝
		public chipPanelLobby			;						//筹码面板
		
		/**臨時處理 , 之後 視窗看要不要更改*/			
		public aCloseWindowList			;				//待關閉的視窗列表,用於 大廳連線 或登入 等例外處理
		
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
		
		private static m_instance		:	manager.LobbyManager;
		public iReTryConnect			:	number;								//重連次數
//		private m_tHeart				:	timer.JTimer;
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
		private m_timer					:	timers.JTimer;
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
		

		private static instance	:	manager.LobbyManager;

		public static getInstance():manager.LobbyManager{
            	if(this.instance == null){
                    this.instance = new manager.LobbyManager();
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
				
				this.m_socket = new socket.TCPSocket(this.m_lobbySocketSink, 0, 0);
			}
			
			if(this.m_bDetection){
				this.m_detectionTimer = new egret.Timer(10000);
				this.m_detectionTimer.addEventListener(egret.TimerEvent.TIMER, this.detection, this);
				this.m_detectionTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.detectionComplete, this);
			}
			
			BitmapManager.getInstance().initialize();
			
			this.changeLanguage(this.lobbyAuth.Lang);
			
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
			
			var currentMusicKey:string = [sound.SoundPackage.sBackGround_Music_1,sound.SoundPackage.sBackGround_Music_2,sound.SoundPackage.sBackGround_Music_3][SharedObjectManager.getMusicSelectIndex()];
			//背景音樂
			SoundManager.getInstance().soundPkg.getBackgroundMusic( currentMusicKey , function( _snd ):void 
			{ 
				if( _snd.bLoadComplete )
				{
					var _soundChannel = _snd.sound.play(0,99999);
					MusicManager.singleton.setSoundData( _snd.sound , _soundChannel );
				}
			} );
			SoundManager.getInstance().soundPkg.getBackgroundMusic( sound.SoundPackage.sBackGround_Music_2  );
			SoundManager.getInstance().soundPkg.getBackgroundMusic( sound.SoundPackage.sBackGround_Music_3  );	
			
			
			//範例
			/*manager.SoundManager.getInstance().soundPkg.getMusic( "effect", sound.SoundPackage.sPopup , function( _snd:LiveSound ):void { 
			if( _snd.bLoadComplete ){
			var _soundChannel:SoundChannel = _snd.sound.play(0,99999);
			}
			} );*/
			
			
			this.aCloseWindowList = new lobby.view.panel.PanelWindow[]();
			this.m_nLiveVolume 	 = SharedObjectManager.getLiveVolume();
			
			this.nRevServerTime   = egret.getTimer();
			TimeManager.getInstance().run();
			//			m_tHeart = new Timer(20000);
			//			m_tHeart.addEventListener(TimerEvent.TIMER , onHeart );
			
			this.transparentLayer = new egret.Sprite();
			this.transparentLayer.graphics.beginFill(0x000000,0.3);
			this.transparentLayer.graphics.drawRect(0,0,1920,1080);
			this.transparentLayer.graphics.endFill();
			this.lobbyView.addChild(this.transparentLayer);
			this.transparentLayer.visible = false;
			
			this.cacheWinMc();
			/*m_timer = new Timer(50,1);
			m_timer.addEventListener(TimerEvent.TIMER_COMPLETE,handleTimerComplete);*/
			this.m_timer = timers.JTimer.getTimer(50,1);
			this.m_timer.addTimerCallback(null,this.handleTimerComplete);
			this.stage.addEventListener(egret.Event.FULLSCREEN , this.stageChangeSizeHandle, this);
			this.stage.addEventListener(egret.FullScreenEvent.FULL_SCREEN_INTERACTIVE_ACCEPTED,this.handleFSIA, this);
			
		}
		
		
		
		protected handleFSIA(event:Event):void
		{
			this.m_timer.reset();
			this.m_timer.start();
		}
		protected handleTimerComplete():void{
			if(this.transparentLayer){
				this.transparentLayer.visible = false;
			}
		}
		
		protected stageChangeSizeHandle(event:FullScreenEvent):void
		{
			// TODO Auto-generated method stub
			switch(this.stage.displayState){
				case StageDisplayState.NORMAL:
					this.lobbyView.toolView.screenFull(false);
					this.transparentLayer.visible = false;
					break;
				
				case StageDisplayState.FULL_SCREEN:
				case StageDisplayState.FULL_SCREEN_INTERACTIVE:
					this.lobbyView.toolView.screenFull(true);
					this.transparentLayer.visible = true;
					break;
			}
		}
		
		/**
		 *	连接大厅 
		 */		
		public connect(_sServerIP:string, _iServerPort:number):void{
			
			console.log("连接大厅...","m_socket:", this.m_socket.getUid(), "_sServerIP:", _sServerIP, "_iServerPort:",_iServerPort,"###");
			this.m_socket.connect( _sServerIP, _iServerPort );
			
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
//				_lobbyLoginReqPkt.AuthInfo.AuthToken		=	this.lobbyAuth.AuthToken;
//				_lobbyLoginReqPkt.AuthInfo.Identity			=	this.lobbyAuth.Identity;
//				_lobbyLoginReqPkt.AuthInfo.Lang				=	this.lobbyAuth.Lang;
//				_lobbyLoginReqPkt.AuthInfo.Platform			=	this.lobbyAuth.Platform;	
//				_lobbyLoginReqPkt.AuthInfo.ProtocolVer		= 	1;							//当前通讯版本号为1
//				_lobbyLoginReqPkt.AuthInfo.ThemeType		=	-1;
//				_lobbyLoginReqPkt.AuthInfo.DefThemeID   	=   this.lobbyAuth.loginMode;							//網投
				
				/** 新做法 **/
				var _byte : egret.ByteArray = new egret.ByteArray();
				var _urlloader : URLLoader = new URLLoader();
				_urlloader.addEventListener(egret.Event.COMPLETE, onComplete1(evt){
					_urlloader.removeEventListener(egret.Event.COMPLETE, this.onComplete1, this);
					
					var byte = evt.currentTarget.data;
					byte[0] -= 8;
					byte[1] -= 8;
					byte[2] -= 8;
					
					
					var _loader : Loader = new Loader();
					_loader.contentLoaderInfo.addEventListener(IOErrorEvent.IO_ERROR,function onError():void{});
					_loader.contentLoaderInfo.addEventListener(Event.COMPLETE, onComplete2(event:Event):void{
						_loader.contentLoaderInfo.removeEventListener(IOErrorEvent.IO_ERROR, this.onError, this);
						_loader.contentLoaderInfo.removeEventListener(Event.COMPLETE, this.onComplete2, this);
						
						var _class = getDefinitionByName("KeyTest");
						if(_class){
							var data = new _class();
							
							_byte = data.enterLobby(this.lobbyAuth, this.socketParser);
							
							util.Utils.DumpBinary( "", _byte, 0, 11);
							this.m_socket.send( _byte, 0,  _byte.length);
							
							console.log(this, "登陆大厅..." );
						}
					});
					_loader.loadBytes(byte,new LoaderContext(false, ApplicationDomain.currentDomain));
				});
				_urlloader.dataFormat = URLLoaderDataFormat.BINARY;
				_urlloader.load(new URLRequest(UrlManager.getInstance().getImageUrl("test.png")));
				
//				var byte:egret.ByteArray = dataPacket.pack( define.PacketDefine.LOGIN_IN , _lobbyLoginReqPkt );
//				console.log("登陆大厅..." , _lobbyLoginReqPkt.AuthInfo.ThemeType );
//				util.Utils.DumpBinary( "", _byte, 0, 11);
//				m_socket.send( _byte, 0,  _byte.length);
//				
//				console.log(this, "登陆大厅..." );
			} else {
				console.log("打开页面时，没有获取到web数据.");
			}
		}
		
		/** 登陆确认**/
		public sendLoginLobbySuccess():void {
			if ( this.lobbyAuth != null ) {
				var _pkt = new packet.lobby.C_Lobby_Login_OK_Pkt();
				_pkt.AuthToken = "" + lobby.model.Player.getInstance().iPlayerID.toString;
				_pkt.Identity  = this.lobbyAuth.Identity;
				
				var byte:egret.ByteArray = this.dataPacket.pack( define.PacketDefine.C_LOGIN_LOBBY_OK , _pkt );
				console.log("回復 確認登陆大厅成功消息...");
				util.Utils.DumpBinary( "", byte, 0, 11);
				this.m_socket.send( byte, 0,  byte.length);
				
			}
			else {
				console.log("打开页面时，没有获取到web数据.");
			}
		}
		
		public setMultiSocket():void{
			if(!this.socketParser_multi){
				this.socketParser_multi = new packet.SocketParser();
				this.socketParser_multi.setCData(define.PacketDefine.GAME);
			}
			
			if(!this.dataPacket_multi){
				this.dataPacket_multi = new packet.DataPacket(this.socketParser_multi);
			}
			
			if(!this.socket_multi){
				if(!this.multiTableSocketSink){
					this.multiTableSocketSink = new packet.sink.MultiTableTCPSink();
					this.multiTableSocketSink.subscibeNum =16;
					this.multiTableSocketSink.socketParser = this.socketParser_multi;
				}
				
				this.socket_multi = new socket.TCPSocket(this.multiTableSocketSink, 0, 0);
			}
		}
		
		
		
		/** 多桌入口 **/
		public sendMultiTableEntry():void{
			var _entry = new packet.lobby.C_MultiTable_Entry_Pkt();
			
			var byte:egret.ByteArray = this.dataPacket.pack( define.PacketDefine.C_MultiTable_Entry , _entry );
			console.log(this,"请求多桌入口...");
			this.m_socket.send( byte, 0,  byte.length);
		}
		
		/** 订阅厅馆 **/
		public sendSubscribeTheme(_iSubscribe:number=-1, _iUnsubscribe:number=-1):void{
			this.bSubscribeTheme = true;
			var _subscribeTheme  = new packet.lobby.C_Lobby_Theme_Subscribe_Pkt();
			_subscribeTheme.SubscribleThemeID = _iSubscribe;
			_subscribeTheme.UnsubscribleThemeID = _iUnsubscribe;
			
			var byte:egret.ByteArray = this.dataPacket.pack( define.PacketDefine.C_Lobby_Theme_Subscribe , _subscribeTheme );
		//	console.log("订阅厅馆..."+_iSubscribe);
			console.log(this, "订阅厅馆..."+_iSubscribe);
			this.m_socket.send( byte, 0,  byte.length);
		}
		
		/** 自订筹码 **/
		public sendCustomChipData(_sData:string):void{
			var _customChip	=	new packet.lobby.C_CustomChip_Pkt();
			_customChip.PlayerCustChipsInfo.CustChips	=	_sData;
			var byte:egret.ByteArray = this.dataPacket.pack( define.PacketDefine.C_SET_CHIP , _customChip );
			console.log(this,"自订筹码...");
			util.Utils.DumpBinary( "", byte, 0, 11);
			this.m_socket.send( byte, 0,  byte.length);
		}
		
		/** 个人资料 **/
		public getUserDataGameApi():void{
			console.log(this," 请求个人资料 >>>");
			var _class = getDefinitionByName("KeyTest");
			if(_class){
				console.log(this," 请求个人资料 >>> 执行类"+_class);
				var data = new _class();
				data.fUserDataComplete = function(oData):void{
					lobby.model.Player.getInstance().Country = oData.CountryCode;
				};
				data.getUserData(lobby.model.Player.getInstance().iPlayerID);
				console.log(this," 请求用户资料 >>> playerID"+lobby.model.Player.getInstance().iPlayerID);
			}else{
				console.log(this," 请求个人资料 >>> _class=null");
			}
		}
		
		/**修改“已下注”的RightX值*/
		public setBetSelectPannelRightX(x:number):void{
			if(this.m_nowScene){
				this.m_nowScene.setBetSelectPannelRightX(x);
			}
		}
		
		//		private openHandler(event:Event):void {
		//			console.log("openHandler: " + event);
		//		}
		//		private httpStatusHandler(event:HTTPStatusEvent):void {
		//			console.log("httpStatusHandler: " + event);
		//		}
		protected onError(event:egret.IOErrorEvent):void
		{
			// TODO Auto-generated method stub
			console.log("httpStatusHandler: " + event);
			event.target.removeEventListener(egret.IOErrorEvent.IO_ERROR,this.onError);
			event.target.removeEventListener(egret.Event.COMPLETE, this.onComplete);
		}
		protected onComplete(event:egret.Event):void
		{
			console.log("httpStatusHandler: " + event);
			event.target.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onError);
			event.target.removeEventListener(egret.Event.COMPLETE, this.onComplete);
			
			// TODO Auto-generated method stub
			console.log(event.target.data);
			var jsonStr : string = event.target.data;
			if( jsonStr != "" ){
				jsonStr = this.m_aData.decryptStringFromBase64(jsonStr);
				var oData  = JSON.parse(jsonStr);
				console.log(oData);
				lobby.model.Player.getInstance().Country = oData.Country;
			}
			
		}		
		
		
		public getRoadmapReqInfo(_tableList:any[]):void{
			var c_lobby_info = new packet.lobby.C_Lobby_Info_Pkt();
			c_lobby_info.ReqType = 0;
			c_lobby_info.ArgInfo.TableIDList = _tableList;
			
			var byte:egret.ByteArray = this.dataPacket.pack( define.PacketDefine.C_LOBBY_INFO , c_lobby_info );
			console.log("补全路纸请求...");
			this.m_socket.send( byte, 0,  byte.length);
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
			if(this.m_fInit!=null){
				this.m_fInit();
			}
		}
		
		/**
		 *	个人资讯
		 */		
		public showpersonalinformation(_x:number, _y:number):void{
			if(!this.lobbyView ){
				console.log("大厅未初始化，显示异常...");
				return;
			}
			
			
			
	/*		
			test
			var cmd:S_Lobby_Logout_Pkt = new S_Lobby_Logout_Pkt();
			cmd.execute({LogoutInfo:{Reason:16}});
			return;*/
			
			
			if(this.personalinformation==null){
				this.personalinformation = new lobby.view.panel.PanelPersonalinformation();
				
				this.lobbyView.spWindowLayer.addChild(this.personalinformation);
				
				var move_y:number;
				
				if(this.exitLevel == define.Define.EXIT_GAME && this.currentTableStruct && this.currentTableStruct.TableType == define.Define.TABLE_TYPE_ROBOT){//金臂百家位置调整
					move_y = 188;
					
				}else{
					move_y = 150;
				}
				
				this.personalinformation.x = _x;
				this.personalinformation.y = _y;
				
				egret.Tween.get(this.personalinformation).to({y:move_y}, define.Define.SPEED);
			}else{
				this.hidePersonalinformation();
			}
			
		}
		public hidePersonalinformation():void{
			if(this.personalinformation){
				//				PopupManager.getInstance().close( m_this.personalinformation );
				egret.Tween.get(this.personalinformation).to({y:define.Define.PERSON_INFO_OUT_POSX}, define.Define.SPEED, egret.Ease.backIn).call(function():void{
					if(this.personalinformation){
						this.lobbyView.spWindowLayer.removeChild(this.personalinformation);
						this.personalinformation.destroy();
						this.personalinformation = null;
					}
				});
				//				this.uWindowIndex--;
			}
			
		}	
		
		/**
		 *	全景视讯 
		 * @param _sLanguage
		 * 
		 */		
		public showLiveVideo(_uWidth:number, _uHeight:number, _sServer:string, _sStream:string):void{
			if(this.panelLiveVideo==null){
				this.panelLiveVideo = new lobby.view.panel.PanelLiveVideo( _uWidth>1280?_uWidth:1280, _uHeight>720?_uHeight:720);
				
				
				this.lobbyView.spWindowLayer.addChild(this.panelLiveVideo);
				this.lobbyView.spShieldLayer.alpha = 1;
				this.lobbyView.spShieldLayer.graphics.beginFill(0x000000,0.5);
				this.lobbyView.spShieldLayer.graphics.drawRect(0,0,this.stage.stageWidth,this.stage.stageHeight+100);
				this.lobbyView.spShieldLayer.graphics.endFill();		
				
				
				
				this.panelLiveVideo.initializeRTMPPlayer(_sServer, _sStream);
				this.panelLiveVideo.x = this.stage.stageWidth * 0.5 + this.uWindowIndex * 50;
				this.panelLiveVideo.y = this.stage.stageHeight * 0.5 + this.uWindowIndex * 50;
				//				PopupManager.getInstance().show( m_liveVideo );
				this.panelLiveVideo.scaleX = define.Define.SCALE_MIN;
				this.panelLiveVideo.scaleY = define.Define.SCALE_MIN;
				egret.Tween.get(this.panelLiveVideo).to({scaleX:1, scaleY:1}, define.Define.SPEED)
				this.uWindowIndex++;
			}else{
				this.hideLiveVideo();
			}
		}
		public hideLiveVideo():void{
			if(this.panelLiveVideo){
				
//				this.lobbyView.spShieldLayer.graphics.clear();
				//				PopupManager.getInstance().close( m_liveVideo );
				this.uWindowIndex--;
				egret.Tween.get(this.panelLiveVideo).to({scaleX:define.Define.SCALE_MIN, scaleY:define.Define.SCALE_MIN}, define.Define.SPEED).call(function():void{
					
					if(this.panelLiveVideo){
						this.lobbyView.spWindowLayer.removeChild(this.panelLiveVideo);
						this.panelLiveVideo.destroy();
						this.panelLiveVideo = null;
					}
					
					egret.Tween.get(this.lobbyView.spShieldLayer).to({alpha:0}, define.Define.SPEED).call(function():void{
						this.lobbyView.spShieldLayer.graphics.clear();
					});
				});
			}
			
		}
		
		/**
		 *	视讯频道
		 * @param _sLanguage
		 * 
		 */		
		public showChannel(_default: boolean=true,offX:number=0):void{
			if(this.m_bChannelTween){
				this.m_fDelayTween = function():void{
					this.showChannel(_default,offX);
				}
				return;
			}else{
				this.m_fDelayTween = null;
			}
			if(this.channel==null){
				this.channel = new lobby.view.panel.PanelChannel();
				
				this.lobbyView.spWindowLayer.addChild(this.channel);
				var move_x:number;
				var move_y:number;
				
				if(this.currentTableStruct && this.currentTableStruct.TableType == define.Define.TABLE_TYPE_ROBOT){//金臂百家位置调整
					move_x = this.lobbyView.toolView.getBtnChannelPoint().x;
					move_y = 172+37;
					
				}else{
					move_x = this.lobbyView.toolView.getBtnChannelPoint().x+offX;
					move_y = 172;
				}
				
				this.channel.x = move_x;
				this.channel.y = -180;
				
				
				egret.Tween.get(this.channel).to({y:move_y}, define.Define.SPEED);
			}else{
				if(_default){
					this.hideChannel();
				}
			}
		}
		private m_bChannelTween :  boolean;
		private m_fDelayTween	: Function;
		public hideChannel():void{
			if(this.m_bChannelTween){
				return;
			}
			if(this.channel){
				//				PopupManager.getInstance().close( m_channel );
				//				this.uWindowIndex--;
				
				this.m_bChannelTween = true;
				egret.Tween.get(this.channel).to({y:-300}, define.Define.SPEED, egret.Ease.backIn).call(function():void{
					if(this.channel){
						this.lobbyView.spWindowLayer.removeChild(this.channel);
						
						this.channel.destroy();
						this.channel = null;
						this.m_bChannelTween = false;
					}
					if(this.m_fDelayTween!=null){
						this.m_fDelayTween();
					}
				});
			}
			
			
		}
		
	
		
		
		/**
		 *	切换语言 
		 * 
		 */		
		public changeLanguage( _iLanguage:number ):void{
			this.lobbyAuth.Lang = _iLanguage;
			this.lang = this.getLanguage( _iLanguage );
			
			if(this.lobbyView){
				this.lobbyView.onChangeLanguage();
			}
			
			if(this.personalinformation){
				this.personalinformation.onChangeLanguage();
			}
			
			if(this.m_nowScene){
				this.m_nowScene.onChangeLanguage();
			}
			
			
			if(this.multiTableView){
				this.multiTableView.onChangeLanguage();
			}
			
			if(this.systemSetting){
				this.systemSetting.onChangeLanguage();
			}
			
			if(this.m_tableSetting){
				this.m_tableSetting.onChangeLanguage();
			}
			
			if(this.m_panelChipCustom){
				this.m_panelChipCustom.onChangeLanguage();
			}
			
			if(this.channel){
				this.channel.onChangeLanguage();
			}
			
			SoundManager.getInstance().changeLanguage(_iLanguage);
			GameRecordManager.getInstance().onChangeLanguage();
		}
		private getLanguage( _iLanguage:number ):language.Language{
			switch(_iLanguage){
				
				case define.Define.LANGUAGE_CN:
					if(this.m_language_cn==null){
						this.m_language_cn = new language.Language_CN();
					}
					this.lang = this.m_language_cn;
					break;
				
				case define.Define.LANGUAGE_EN:
					if(this.m_language_en==null){
						this.m_language_en = new language.Language_EN();
					}		
					this.lang = this.m_language_en;
					break;
				
				case define.Define.LANGUAGE_TW:
					if(this.m_language_tw==null){
						this.m_language_tw = new language.Language_TW();
					}			
					this.lang = this.m_language_tw;
					break;
				
			}
			
			return this.lang;
		}
		public getLanguageString( _string:string):string{
			
			return this.lang.getString(_string);
			
		}
		
		/**
		 *	计时器 
		 * @param evt
		 * 
		 */		
		//		private onTimer(evt:TimerEvent):void{
		//			if(this.m_videoMaxBytePerSecond){
		////				console.log("spthis.lobbyView.liveVideo.iMaxBytePerSecond:",this.lobbyView.liveVideo.iMaxBytePerSecond);
		//				if(this.m_videoMaxBytePerSecond.iMaxBytePerSecond > 1000){
		//					this.lobbyView.toolView.wifi.status = Tool_Wifi.FULL; 
		//				} else if (this.m_videoMaxBytePerSecond.iMaxBytePerSecond > 500 ){
		//					this.lobbyView.toolView.wifi.status = Tool_Wifi.WELL; 
		//				} else if (this.m_videoMaxBytePerSecond.iMaxBytePerSecond > 300) {
		//					this.lobbyView.toolView.wifi.status = Tool_Wifi.NORMAL; 
		//				} else if (this.m_videoMaxBytePerSecond.iMaxBytePerSecond > 0){
		//					this.lobbyView.toolView.wifi.status = Tool_Wifi.POOR; 
		//				} else {
		//					this.lobbyView.toolView.wifi.status = Tool_Wifi.NO; 
		//				}
		//			}else{
		//				this.lobbyView.toolView.wifi.status = Tool_Wifi.NO; 
		//			}
		//		}
		
		
		/**
		 *	退出等级 
		 */		
		get exitLevel():number{
			
			return this.lobbyView.toolView.iExitLevel;	
			
		}
		set exitLevel(_uLevel:number){
			this.lobbyView.toolView.iExitLevel = _uLevel;
			
		}
		
		/**
		 *	房间列表 
		 */		
		public changeThemelist(_iThemeID : number):void{
			this.lobbyView.changeTheme(_iThemeID);
		}
		public changeQuickThemelist(_iThemeID : number):void{
			this.lobbyView.showQuickTheme(_iThemeID);
		}
		
		/**
		 *是否 当前百家乐游戏桌ID
		 * @param param0
		 * @return 
		 * 
		 */
		public isNowGameTable(_tableId:number): boolean
		{
			if(this.m_nowScene && (this.m_nowScene.GameID==define.GameDefine.BAC || this.m_nowScene.GameID==define.GameDefine.MACHINE_BAC) && this.m_nowScene.tableStruct.TableID==_tableId){
				return true;
			}
			return false;
		}
		public NowGameTableID():number{
			if(this.m_nowScene){
				return this.m_nowScene.tableStruct.TableID;
			}
			return  -1;
		}
		/**
		 *	登陆游戏 
		 * @param _tableStruct
		 * 
		 */		
		public enterGame(_tableStruct:lobby.model.struct.TableStruct):void{
			if(this.bEnterGame){
				return;
			}else{
				this.bEnterGame = true;
				this.lobbyView.enableQuick(false);
			}
			
			//屏蔽退出按钮
			manager.LobbyManager.getInstance().lobbyView.toolView.btnExit.enabled = false;
			
			var _gameName : string;
			switch(_tableStruct.GameID){
				case define.GameDefine.BAC:
					_gameName = define.GameDefine.BAC_NAME;//+".swf";
					break;
				
				case define.GameDefine.SIC:
					_gameName = define.GameDefine.SIC_NAME;//+".swf";
					break;
				
				case define.GameDefine.ROU:
					_gameName = define.GameDefine.ROU_NAME;//+".swf";
					break;
				
				case define.GameDefine.DTF:
					_gameName = define.GameDefine.DTF_NAME;//+".swf";
					break;
			}
			
			if( _tableStruct.TableType == define.Define.TABLE_TYPE_ROBOT ){
				_gameName = define.GameDefine.ROBOT_BAC_NAME;// + ".swf";
			}
			
			var _gameClass;
			
			
			//显示loading
//			if(manager.LoaderManager.getInstance().IsLoaded(_gameName)){
				this.lobbyView.showLoading();
//			}
			
			//加载游戏
			manager.LoaderManager.getInstance().loadGame(_gameName, function():void{
				_gameClass = getDefinitionByName(_gameName);
				/*
				 * 记录实例，登入失败销毁
					不能记在this.m_nowScene,因为转桌 不能改变原来的this.m_nowScene，失败后还停留在原来游戏桌上 
					转桌成功showGame后才改变this.m_nowScene
				*/
				
				this.m_newGame = new _gameClass();//ResourceManager.getInstance().getLoader(gameName).content as Game;
				
				//傳給Game.swf 進桌資料,認證資料,model實體
				this.m_newGame.receiveTableStruct(_tableStruct);
				//重置遊戲網路狀態
				NetWorkManager.getInstance().iGameNetWorkStatus = -1;
				
				//登录成功 或失败后才隐藏loading
				//this.lobbyView.hideLoading();
				
			});
			
			/*if( goodSocketSink ){
			goodSocketSink.bShowDialog = false;		//重連遊戲,旗標重置
			}	*/		
			
		}
		
		/**
		 *	显示游戏 
		 */		
		public showGame(_game):void{
			this.bEnterGame = false;
			
			//删除大厅已关闭桌子
			var len : number = lobby.model.LobbyData.getInstance().MaintainTableStruct.length;
			for (var i:number = 0; i < len; i++) 
			{
				var _themeStruct : lobby.model.struct.ThemeStruct = lobby.model.LobbyData.getInstance().lobbyInfo.getThemeStruct(lobby.model.LobbyData.getInstance().MaintainTableStruct[i].ThemeID);
				if(_themeStruct){
					_themeStruct.removeTableStruct(lobby.model.LobbyData.getInstance().MaintainTableStruct[i].TableID);
				}
				this.lobbyView.removeTable(lobby.model.LobbyData.getInstance().MaintainTableStruct[i]);
				lobby.model.LobbyData.getInstance().MaintainTableStruct[i] = null;
			}
			lobby.model.LobbyData.getInstance().removeAllMaintainTableStruct();
			
			if(this.bQuickChangeTable){
				this.bQuickChangeTable = false;
				
				var _bStatus :  boolean;
				if(_game.tableStruct.GameID==define.GameDefine.BAC || _game.tableStruct.GameID==define.GameDefine.MACHINE_BAC)
				{//转到百家乐不调用移除 好路
					_bStatus = true;
				}
				this.changeGame(_bStatus);
			}
			
			this.m_nowScene = _game;
			this.m_newGame = null;
			
			this.lobbyView.uCurrentThemeIDTemp = this.lobbyView.uCurrentThemeID;
			
			this.m_nowScene.setChipPanel();
			
			this.currentTableStruct = this.m_nowScene.tableStruct;
			
			this.lobbyView.spGame.alpha = 1;
			this.lobbyView.spGameLayer.addChild(this.lobbyView.spGame);
			if ( !this.lobbyView.spGame.contains( this.m_nowScene ) ) {
				this.lobbyView.spGame.addGame(this.m_nowScene);
				
				
				//修改注册点
				this.m_nowScene.x = -960;//-gamePoint.x;
				this.m_nowScene.y = -540;//-gamePoint.y;
			}
			
			this.lobbyView.hideLoading();
			//取消订阅厅馆消息
			this.sendSubscribeTheme(-1, this.lobbyView.themeList.currentTheme.struct.ThemeID);
			
			
			//退出等级
			this.exitLevel = define.Define.EXIT_GAME;
			
			//关闭视讯
			this.lobbyView.liveVideo.toGame();
			//停放跑马
			this.lobbyView.information.stopMarquee();
			//隐藏大厅
			this.lobbyView.toGame();
			//停止广告
			this.lobbyView.advertisement.stop();
			
			
			
			if ( this.m_nowScene != null ) {
				
				this.lobbyView.spGame.visible = true;
				
				console.log("width:::" + this.lobbyView.spGame.width);
				console.log("height:::" + this.lobbyView.spGame.height);
				
//				this.lobbyView.spGame.scaleX = 0;
//				this.lobbyView.spGame.scaleY = 0;
//				
//				TweenLite.to(this.lobbyView.spGame,define.Define.SPEED,{x:960, y:540, scaleX:1, scaleY:1, onComplete:function():void{
				
				this.lobbyView.showQuickThemeList();
				
//				}});	
			}
			
			this.hidePersonalinformation();	//收合個人資訊面板
			//隐藏紧急公告
//			this.lobbyView.urgentNotice.hide();
			manager.NoticeManager.getInstance().hide();
			
			//機械百家例外處裡
			if( this.currentTableStruct.TableType != define.Define.TABLE_TYPE_ROBOT ){
				this.m_nowScene.setTool();
				if(this.m_gameTransition==null){
					this.m_gameTransition = new GameSceneTransformer(1920,1080,true);
					this.m_gameTransition.onPlayComplete = function():void{
						this.m_nowScene.init();
//						this.lobbyView.urgentNotice_game.enterGame();		//过滤维护消息
//						this.lobbyView.urgentNotice_game.show();				//显示紧急公告
						manager.NoticeManager.getInstance().refresh();
					}
					this.m_gameTransition.addLeftAreaObject([this.lobbyView.quickThemeList]);
					this.m_gameTransition.addTopAreaObject([this.lobbyView.spToolLayer, this.m_nowScene.transitionDict[define.GameDefine.Transition_CountDown]]);
					this.m_gameTransition.addButtomAreaObject([this.chipPanelGame_1,this.chipPanelGame_2,this.m_nowScene.transitionDict[define.GameDefine.Transition_Route]]);
					if(this.m_nowScene.transitionDict[define.GameDefine.Transition_GoodRoad]){
						this.m_gameTransition.addRightAreaObject([this.m_nowScene.transitionDict[define.GameDefine.Transition_TableInfo],this.m_nowScene.transitionDict[define.GameDefine.Transition_GoodRoad]]);
					}else{
						this.m_gameTransition.addRightAreaObject([this.m_nowScene.transitionDict[define.GameDefine.Transition_TableInfo]]);
					}
					this.m_gameTransition.start();
				}
			}else{
//				this.lobbyView.urgentNotice_game.enterGame();		//过滤维护消息
//				this.lobbyView.urgentNotice_game.show();				//显示紧急公告
				this.m_nowScene.init();
				this.m_nowScene.setTool();
				manager.NoticeManager.getInstance().refresh();
			}
			
			switch(this.m_nowScene.tableStruct.GameID){
				case define.GameDefine.BAC:
				case define.GameDefine.DTF:
					this.lobbyView.quickThemeList.toBac();
					break;
				
				case define.GameDefine.SIC:
				case define.GameDefine.ROU:
					this.lobbyView.quickThemeList.toSic();
					break;
			}
			
			//激活快速转桌
			this.lobbyView.enableQuick(true);
			//激活退出按钮
			LobbyManager.getInstance().lobbyView.toolView.btnExit.enabled = true;
		}
		
		
		
		public exitGame():void {
			TimeManager.getInstance().stopAll();
			if(this.m_nowScene){
				//赌桌关闭是不更新赌桌信息，将游戏中的接受到的彩池信息赋值到桌子中
				var tableStruct:lobby.model.struct.TableStruct = lobby.model.LobbyData.getInstance().getTableStructByTableID(this.m_nowScene.tableStruct.TableID);
				if(tableStruct&&tableStruct.getTable()){
					tableStruct.getTable().updateOnlinePlayers(tableStruct.OnlinePlayers>0?(tableStruct.OnlinePlayers-1):0);
					tableStruct.getTable().updateCountDown();
					tableStruct.getTable().updateStaticsInfo();
					tableStruct.getTable().updateRoad(true);
				}
				
			}
			//防止退出过程动画中多次点击
			this.lobbyView.toolView.fExitGame=null;
			
			if(this.m_animationGameWinC){
				this.m_animationGameWinC.stop();
			}
			if(this.m_animationGameWinA){
				this.m_animationGameWinA.stop();
			}
			console.log(this,"->exitGame:");
			
			this.bLoginMultiTable = false
			this.hideChannel();
			this.hidePanelChipCustom();
			
			
			if(this.lobbyView.quickThemeList.currentTheme){
				this.lobbyView.quickThemeList.currentTheme.setSelect(false, false);
			}
			
			//			this.lobbyView.iCurrentQuick = 255;
			
			//收合個人資訊面板
			this.hidePersonalinformation();
			//收和客服面板
			this.lobbyView.toolView.toolContact.hide();
			//收好路设置面板
			this.hideGoodRoadSetting();
			SoundManager.getInstance().stopAllSound();
			//隐藏紧急公告
//			this.lobbyView.urgentNotice.show();
//			this.lobbyView.urgentNotice.toLobbyUrgentNotice();
//			this.lobbyView.urgentNotice_game.hide();
			manager.NoticeManager.getInstance().hide();
			manager.NoticeManager.getInstance().toLobbyUrgentNotice();
			
			//隐藏app面板
//			this.lobbyView.mobileApp.hidePannel();
			
			
			//提示窗口
			var _wc : number = this.lobbyView.spWarn.numChildren;
			var _panel;
			var _iValue:number=0;
			for (var i:number = 0; i < _wc; i++) 
			{
				_panel = this.lobbyView.spWarn.getChildAt(i);
				if((_panel instanceof lobby.view.panel.PanelDialog) || (_panel instanceof lobby.view.panel.PanelDialog_2)){
					_panel.destroy();
					_iValue = this.uWindowIndex - 1;
					if( _iValue > 0 ){
						this.uWindowIndex--;	
					}
					
					this.lobbyView.spWarn.graphics.clear();
					break;
				}
			}
			
//			console.log(this,"->exitGame:截图完成，准备切图");
//			var bmp  : Bitmap = new Bitmap(snapshotGame());
//			console.log(this,"->exitGame:切图完成");
//			bmp.x = -gamePoint.x;
//			bmp.y = -gamePoint.y;
//			this.lobbyView.spTweenGame.addChild(bmp);
//			bmp.smoothing = true;
			
			//			this.lobbyView.spTweenGame.x = gamePoint.x;
			//			this.lobbyView.spTweenGame.y = gamePoint.y;
//			this.lobbyView.spTweenGame.scaleX = 1;
//			this.lobbyView.spTweenGame.scaleY = 1;
//			this.lobbyView.spTweenGame.alpha = 1;
//			this.lobbyView.spGame.visible = false;
//			console.log(this,"->exitGame:准备缓动");
			
			if(this.m_gameTransition){
				this.m_gameTransition.onPlayComplete = this.exitGameComplete;
				this.m_gameTransition.reverse();
			}else {
				this.exitGameComplete();
			}
			
		}
		private exitGameComplete():void{
			if(this.m_nowScene && this.m_nowScene.GameID==define.GameDefine.MACHINE_BAC){
				this.lobbyView.exitMachineBac();
			}
			egret.Tween.get(this.lobbyView.spGame).to({alpha:0}, 0.6).call(function():void{
				
				//退出等级
				this.exitLevel = define.Define.EXIT_LOBBY;
				
				//开启视讯
				this.lobbyView.liveVideo.toLobby();
				//开启跑马
				this.lobbyView.information.playMarquee();
				this.lobbyView.information.visible = true;
				//开启广告
				if(!this.lobbyView.bWheelToTop){
					this.lobbyView.advertisement.start();
				}
				
				//返回大厅
				this.lobbyView.toolView.toLobby();
				
				//显示紧急公告
//				this.lobbyView.urgentNotice.show();
//				manager.NoticeManager.getInstance().refresh();//此处TableID还在
				
				//转桌列表
				this.lobbyView.hideQuickThemeList();
				this.lobbyView.hideQuickTableList(false);
				
//				this.lobbyView.uCurrentThemeID = this.lobbyView.uCurrentThemeIDTemp;
				
				if(this.m_nowScene==null){
					if( this.lobbyView.themeListVisible ){
						if(this.lobbyView.uCurrentThemeID != this.lobbyView.quickThemeList.iCurrentTheme){
							this.sendSubscribeTheme(this.lobbyView.uCurrentThemeID, this.lobbyView.quickThemeList.iCurrentTheme);
						}else{
							this.sendSubscribeTheme(this.lobbyView.uCurrentThemeID);
						}
						this.lobbyView.quickThemeList.iCurrentTheme = -1;
					}
					this.destroyNewGame();
					return;
				}
				if(this.m_nowScene.GameID==define.GameDefine.BAC || this.m_nowScene.GameID==define.GameDefine.MACHINE_BAC){
					this.exitGoodRoad();
				}
				if(this.m_newGame != this.m_nowScene){
					this.destroyNewGame();
				}
				this.destroyGame(false);
				
				if(this.lobbyView.uCurrentThemeID != this.lobbyView.quickThemeList.iCurrentTheme){
					this.sendSubscribeTheme(this.lobbyView.uCurrentThemeID, this.lobbyView.quickThemeList.iCurrentTheme);
				}else{
					this.sendSubscribeTheme(this.lobbyView.uCurrentThemeID);
				}
				this.lobbyView.quickThemeList.iCurrentTheme = -1;
				
				if(this.m_nowScene){
					this.m_nowScene = null;
				}
				if(this.m_gameTransition){
					this.m_gameTransition.destroy();
					this.m_gameTransition = null;
				}
				
				this.lobbyView.toLobby();
				
				manager.NoticeManager.getInstance().refresh();
				
				// Memory.gc();
				
			});
			
		}
		
		private snapshotGame():egret.BitmapData{
			var bmpd  = util.bitmap.BitmapUtil.snapshot_1(this.lobbyView.spGame);
			if(bmpd){
				return util.bitmap.BitmapUtil.snapshot_3(bmpd,1920,1080,0,578);
			}
			return new egret.BitmapData(null);
		}
		
		public destroyGame(bGC: boolean=true):void {
			if ( this.m_nowScene != null ) {
				
				//激活退出按钮
				manager.LobbyManager.getInstance().lobbyView.toolView.btnExit.enabled = true;
				
				if(this.m_nowScene.parent){
					this.m_nowScene.parent.removeChild(this.m_nowScene);
				}
				this.lobbyView.toolView.cleanGameFun();
				this.m_nowScene.destroy();
				this.m_nowScene = null;
				this.currentTableStruct=null;
				
				if(this.lobbyView.spGame){
					if(this.lobbyView.spGame.parent){
						this.lobbyView.spGame.parent.removeChild(this.lobbyView.spGame);
					}
//					this.lobbyView.spGame.destroy();
				}
				
			}
			
			if(bGC){
				// Memory.gc();
			}
			
		}
		
		/**
		 *销毁预进入的游戏桌（连接、登入失败） 
		 * 
		 */
		public destroyNewGame():void {
			if (this.m_newGame){
				
				//激活退出按钮
				this.lobbyView.toolView.btnExit.enabled = true;
				this.m_newGame.destroy();
				this.m_newGame = null;
			}
		
		}
		
		
		/**
		 *	多桌 
		 * 
		 */	
		/** 登陆状态 **/
		get bLoginMultiTable(): boolean
		{
			return this.m_bLoginMultiTable;
		}
		
		set bLoginMultiTable(value: boolean)
		{
			this.m_bLoginMultiTable = value;
		}
		public showMultiTable():void{
			
			//删除大厅已关闭桌子
			var len : number = lobby.model.LobbyData.getInstance().MaintainTableStruct.length;
			for (var i:number = 0; i < len; i++) 
			{
				var _themeStruct : lobby.model.struct.ThemeStruct = lobby.model.LobbyData.getInstance().lobbyInfo.getThemeStruct(lobby.model.LobbyData.getInstance().MaintainTableStruct[i].ThemeID);
				if(_themeStruct){
					_themeStruct.removeTableStruct(lobby.model.LobbyData.getInstance().MaintainTableStruct[i].TableID);
				}
				this.lobbyView.removeTable(lobby.model.LobbyData.getInstance().MaintainTableStruct[i]);
				lobby.model.LobbyData.getInstance().MaintainTableStruct[i] = null;
			}
			lobby.model.LobbyData.getInstance().removeAllMaintainTableStruct();
			
			if(this.bQuickToMultiTable){
				//快速转桌过来的 ,销毁原游戏
				this.changeGame();
			}
			
			
//			clearSnapshotGame();
			
			/*if(!this.socketParser_multi){
				this.socketParser_multi = new this.socketParser();
				this.socketParser_multi.setCData(define.PacketDefine.GAME);
			}
			
			if(!this.dataPacket_multi){
				this.dataPacket_multi = new DataPacket(this.socketParser_multi);
			}
			
			if(!this.socket_multi){
				if(!this.multiTableSocketSink){
					this.multiTableSocketSink = new MultiTableTCPSink();
					this.multiTableSocketSink.this.socketParser = this.socketParser_multi;
				}
				
				this.socket_multi = new socket.TCPSocket(this.multiTableSocketSink, 0, 0);
			}*/
			
			this.lobbyView.spToolLayer.x = 0;
			this.lobbyView.toolView.toMulti();
			this.lobbyView.toGame();
			//关闭视讯
			this.lobbyView.liveVideo.stop();
			//停放跑马
			this.lobbyView.information.stopMarquee();
			//退出等级
			this.exitLevel = define.Define.EXIT_MULTI_TABLE;
			//屏蔽大厅桌子
			//			this.lobbyView.removeChildTableList();
			//停止广告
			this.lobbyView.advertisement.stop();
			//快速转桌
			this.lobbyView.hideQuickThemeList();
			this.lobbyView.hideQuickTableList(false);
			
			//隐藏紧急公告
//			this.lobbyView.urgentNotice_game.hide();
//			this.lobbyView.urgentNotice.hide();
//			this.lobbyView.urgentNotice.toMultiUrgentNotice();
//			this.lobbyView.urgentNotice.show();
			manager.NoticeManager.getInstance().refresh();
			manager.NoticeManager.getInstance().toMultiUrgentNotice();
			this.bMultiExit=false;
			if(this.multiTableView==null){
				this.multiTableView = new lobby.view.multi.MultiTableView();
				this.multiTableView.x = 960;
				this.multiTableView.y = 540;
				this.lobbyView.spMultiTableLayer.addChild(this.multiTableView);
				this.m_vecLive = [];
				this.m_arrVideoNo=[false,false,false,false];
				this.multiTableView.scaleX = 0.3;
				this.multiTableView.scaleY = 0.3;
				this.multiTableView.alpha = 1;
				
				egret.Tween.get(this.multiTableView).to({scaleX:1, scaleY:1, alpha:1}, define.Define.SPEED).call(function():void{
					if(this.multiTableView){
						this.multiTableView.onInit();
					}
				});
			}else{
				if(this.multiTableView){
					this.multiTableView.onInit();
				}
			}
			
			
			this.setBet(0);
			this.setHaveBet(0);
			
			//激活退出按钮
			LobbyManager.getInstance().lobbyView.toolView.btnExit.enabled = true;
			
			
		}
		
		
		/**
		 *销毁多桌连接 (登入多桌不成功时) 
		 * 
		 */
		public destroyMultiSocket():void{
			this.removeMultiTablePacket();
			if(this.socket_multi){
				this.socket_multi.destroy();
				this.socket_multi = null;
			}
			
			if (this.multiTableSocketSink){
				this.multiTableSocketSink.destroy();
				this.multiTableSocketSink=null;
			}
			this.bMultiExit=true;
		}
		
		
		public exitMultiTable():void{
			TimeManager.getInstance().stopAll();
			TipManager.getInstance().hide();
			this.setBet(0);
			this.setHaveBet(0);
			this.bLoginMultiTable = false;
			this.bQuickToMultiTable = false;
			this.hidePanelChipCustom();
			if (this.multiTableView){
				this.multiTableView.exit();
			}
			
			if (this.multiEnterGame){
				this.multiEnterGame.destroy();
				this.multiEnterGame=null;
			}
			
			lobby.model.LobbyData.getInstance().clearSubscribed();
			
			//			PopupManager.getInstance().fCloseWindowComplete = function():void{
			//				manager.LobbyManager.getInstance().sendSubscribeTheme(manager.LobbyManager.getInstance().iEnterMultitableThemeID);
			//				PopupManager.getInstance().fCloseWindowComplete = null;
			//			}
			//			PopupManager.getInstance().close(this.multiTableView);
			//			if(this.multiTableView){
			//				this.multiTableView = null;
			//			}
			
			this.destroyMultiSocket();
			
			//隐藏个人资讯
			this.hidePersonalinformation();
			
			//退出等级
			this.exitLevel = define.Define.EXIT_LOBBY;
			if (this.multiTableView){
				this.lobbyView.toolView.btnExit.enabled = false;
			}
			//开启视讯
			this.lobbyView.liveVideo.toLobby();
			//开启跑马
			this.lobbyView.information.playMarquee();
			//开启广告
			if(!this.lobbyView.bWheelToTop){
				this.lobbyView.advertisement.start();
			}
			
			//收合個人資訊面板
			this.hidePersonalinformation();
			//收和客服面板
			this.lobbyView.toolView.toolContact.hide();
			//收好路设置面板
			this.hideGoodRoadSetting();
			
			//隐藏紧急公告
//			this.lobbyView.urgentNotice.hide();
//			this.lobbyView.urgentNotice.toLobbyUrgentNotice();
//			this.lobbyView.urgentNotice.show();
			manager.NoticeManager.getInstance().refresh();
			manager.NoticeManager.getInstance().toLobbyUrgentNotice();
			
			this.lobbyView.toLobby();
			SoundManager.getInstance().stopAllSound();
			//需等退出动画结束才变换功能栏
//			this.lobbyView.toolView.toLobby();
			
			//屏蔽大厅桌子
			//			this.lobbyView.addChildTableList();
			
			//			this.lobbyView.themeList.setDefaultThemeButtonSelect();
			
			
		}
		
		public exitMultiComplete():void{
			this.sendSubscribeTheme(this.lobbyView.themeList.currentTheme.struct.ThemeID);
			this.lobbyView.toolView.toLobby();
			this.lobbyView.toolView.btnExit.enabled = true;
			if(this.multiTableView){
				this.multiTableView.destroy();
				this.multiTableView = null;
			}
			TipManager.getInstance().hide();
			// Memory.gc();
		}
		
		/**
		 *退出好路 
		 * 
		 */
		public exitGoodRoad():void{
			lobby.model.LobbyData.getInstance().clearSubscribed();
			var loader = ResourceManager.getInstance().getLoader("GameBaccaratGood.swf");
			if (loader){
				var swf =	loader.content;
				console.log("remove GameBaccaratGood Packet")
				swf.removePacket();
			}else{
				console.log("removeMultiTablePacket 不存在好路百家乐swf")
			}
			//removeMultiTablePacket();
		}
		
		get liveVideoNum():number{
			return this.m_vecLive.length;
		}
		
		private getEmptyVideoIndex():number{
			for (var i:number = 0; i < 4; i++) 
			{
				if(this.m_arrVideoNo[i]==false){
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
			if(this.m_vecLive && this.multiTableView.currentList){
				for (var i:number = 0; i < this.m_vecLive.length; i++) 
				{
					if(this.m_vecLive[i].TableID == _TableID){
						return this.m_vecLive[i].Channel;
					}
				}
				
				var ob : any  = {};
				ob.TableID = _TableID;
				
				if(this.m_vecLive.length<4){
					
					ob.Channel = this.getEmptyVideoIndex();
					this.m_arrVideoNo[ob.Channel]=true;
					this.m_vecLive.push(ob);
				//	console.log("台子：：：："+_TableID+"  使用通道  "+ob.Channel)
					return ob.Channel;
				}else{
					if(this.multiTableView){
						var _multiTableItem = this.multiTableView.currentList.getTableItemByTableID(this.m_vecLive[0].TableID);
						if(_multiTableItem){
							ob.Channel = this.m_vecLive[0].Channel;
							this.m_arrVideoNo[ob.Channel]=true;
						//	console.log("关闭台子"+this.m_vecLive[0].TableID+"  开启台子：：：："+_TableID+"  使用通道  "+ob.Channel)
							_multiTableItem.gameApp.stopVideo();
							_multiTableItem = null;
						}else{
							console.log("多桌视讯数量限制异常...");
							ob.Channel = this.m_vecLive[0].Channel;
							this.m_arrVideoNo[ob.Channel]=true;
						}
						
						this.m_vecLive.push(ob);
						return ob.Channel;
					}
				}
			}
			return -1;
		}
		public removeMultiTableLive(_iTableID:number):void{
		//	console.log("移除多桌视频----"+_iTableID)
			var _len : number = this.m_vecLive.length;
			for (var i:number = 0; i < _len; i++) 
			{
				if(this.m_vecLive){
					if(_iTableID == this.m_vecLive[i].TableID){
						this.m_arrVideoNo[this.m_vecLive[i].Channel]=false;
						this.m_vecLive.splice(i,1);
						break;
					}
				}
			}
			
		}
		public clearMultiTableLive():void{
			while(this.m_vecLive.length>0){
				this.m_vecLive.pop();
			}
			
			for (var i:number = 0; i < 4; i++) 
			{
				this.m_arrVideoNo[i]==false
			}
		}
		/** 多桌下注 **/
		public addBet(_nValue:number):void{
			this.m_nTotalBet += _nValue;
			if(this.multiTableView){
				this.chipPanelLobby.updateBetTotal(this.m_nTotalBet);
			}
		}
		public decreaseBet(_nValue:number):void{
			this.m_nTotalBet -= _nValue;
			if (this.m_nTotalBet<0) {
				this.m_nTotalBet = 0;
			}
			if(this.multiTableView){
				this.chipPanelLobby.updateBetTotal(this.m_nTotalBet);
			}
		}
		
		public resetBet():void{
			this.m_nTotalBet = 0;
			if(this.multiTableView){
				this.chipPanelLobby.updateBetTotal(this.m_nTotalBet);
			}
		}
		public setBet(_nValue:number):void{
			this.m_nTotalBet = _nValue;
			if(this.multiTableView){
				this.chipPanelLobby.updateBetTotal(this.m_nTotalBet);
			}
		}
		public addHaveBet(_nValue:number):void{
			this.m_nTotalHaveBet += _nValue;
			if(this.multiTableView){
				this.chipPanelLobby.updateHaveBetTotal(this.m_nTotalHaveBet);
			}
		}
		public decreaseHaveBet(_nValue:number):void{
			this.m_nTotalHaveBet -= _nValue;
			if (this.m_nTotalHaveBet<0){
				console.log("WARN!!! 多桌已下注额出现负数"+this.m_nTotalHaveBet);
				this.m_nTotalHaveBet=0;
			}
			if(this.multiTableView){
				this.chipPanelLobby.updateHaveBetTotal(this.m_nTotalHaveBet);
			}
		}
		public setHaveBet(_nValue:number):void{
			this.m_nTotalHaveBet = _nValue;
			if(this.multiTableView){
				this.chipPanelLobby.updateHaveBetTotal(this.m_nTotalHaveBet);
			}
		}
		
		public resetHaveBet():void{
			this.m_nTotalHaveBet = 0;
			if(this.multiTableView){
				this.chipPanelLobby.updateHaveBetTotal(this.m_nTotalHaveBet);
			}
		}
		
		/** 下注记录 **/
		public addBetRecord(_vecStruct:lobby.model.struct.RecordBetStruct[]):void{
			if(this.multiTableView){
				this.multiTableView.record.addRecord(_vecStruct);
			}
		}
		
		/** 添加好路多桌协议 **/
		public addMultiTablePacket():void{
			var swf = ResourceManager.getInstance().getLoader("GameBaccaratMulti.swf").content;
			swf.addPacket();
		}
		/** 移除协议 **/
		private removeMultiTablePacket():void{
			var loader = ResourceManager.getInstance().getLoader("GameBaccaratMulti.swf");
			if (loader){
				var swf =	loader.content;
				console.log("removeMultiTablePacket")
				swf.removePacket();
			}else{
				console.log("removeMultiTablePacket 不存在百家乐多桌swf")
			}
		}
		/** 连接多桌 **/
		public connectMultiTable(_struct : lobby.model.struct.TableStruct):void{
			this.multiTableEntryStruct = _struct;
			this.addMultiTablePacket();
			//			var _struct : lobby.model.struct.TableStruct = lobby.model.LobbyData.getInstance().getMultiTableStruct(define.GameDefine.BAC);
			if(_struct){
				console.log(this,"连接游戏...struct.ServerIP:" + (_struct.ServerIP).toString+ "struct.ServerPort:"+(_struct.ServerPort).toString);
				
				console.log("连接游戏...","m_this.socket_multi:", this.socket_multi.getUid(), "struct.ServerIP:", _struct.ServerIP, "struct.ServerPort:", _struct.ServerPort,"###");
				this.socket_multi.connect( _struct.ServerIP, _struct.ServerPort );
			}else{
				console.log("获取多桌入口资料失败...");
				console.log(this,"获取多桌入口资料失败...");
			}
		}
		/** 登陆多桌 **/
		public sendLoginMultiTable():void  {
			//this.bLoginMultiTable = true;
			
			console.log("Login MultiTable");
			if ( this.lobbyAuth != null ) {
				
				//新方法
				var _class  = getDefinitionByName("KeyTest");
				if(_class){
					var data  = new _class();
					
					var byte:egret.ByteArray = data.enterMultiTable(manager.LobbyManager.getInstance().lobbyAuth);
					
					util.Utils.DumpBinary( "", byte, 0, 11);
					this.socket_multi.send( byte, 0,  byte.length);
					
					console.log(this, "登陆好路多桌..." );
				}
				
				//旧方法
//				var _gameLoginPkt : C_Game_Login_Pkt = new C_Game_Login_Pkt();
//				_gameLoginPkt.AuthInfo.AuthToken = this.lobbyAuth.AuthToken; 			//認證碼
//				_gameLoginPkt.AuthInfo.Identity = this.lobbyAuth.Identity;			//身份
//				_gameLoginPkt.AuthInfo.Lang = this.lobbyAuth.Lang;					//語系
//				_gameLoginPkt.AuthInfo.Platform = this.lobbyAuth.Platform;
//				_gameLoginPkt.AuthInfo.GameID = this.multiTableEntryStruct.GameID ;
//				_gameLoginPkt.AuthInfo.TableID = this.multiTableEntryStruct.TableID;
//				_gameLoginPkt.AuthInfo.LobbyServer = model.Player.getInstance().sLobbyServer; 					//連線Server
//				_gameLoginPkt.AuthInfo.JoinTbType = define.GameDefine.MULTIPLE;									//進桌類型
//				_gameLoginPkt.AuthInfo.BetLimitID = this.multiTableEntryStruct.BetLimitID;
//				//				_gameLoginPkt.AuthInfo.BetLimitID = judgeBetLimitId(this.multiTableEntryStruct.joinTableType , this.multiTableEntryStruct );	//限紅
//				_gameLoginPkt.AuthInfo.ProtocolVer = 1;
//				this.multiTableSocketSink.hasKey = false;
//				this.bLoginMultiTable = false;
//				multiTableId=this.multiTableEntryStruct.TableID;
//				
//				TimeManager.getInstance().start(define.PacketDefine.ENTER_TABLE.tostring(16) ,warnConnect);
//				
//				var byte:egret.ByteArray = this.dataPacket_multi.pack( define.PacketDefine.ENTER_TABLE , _gameLoginPkt );
//				console.log("登陆多桌..."+this.multiTableEntryStruct.GameID +"台号"+this.multiTableEntryStruct.TableID);
//				this.socket_multi.send( byte, 0,  byte.length);
				
			} else {
				console.log("打开页面时，没有获取到web数据.");
			}
			
		}
		
		public loginMultiEnterOK():void  {
			var _gameClass = getDefinitionByName(define.GameDefine.BAC_MULTI_NAME);
			this.multiEnterGame = new _gameClass(define.Define.MULTI_TABLE_MODE_0, null, null);
			this.multiEnterGame.tableStruct.TableID=this.multiTableId;
			
			this.sendLoginMultiTableOK();
		}
		
		/** 登陆多桌 **/
		public sendLoginMultiTableOK():void  {
			var _pkt = new packet.game.C_Game_Login_OK_Pkt();
			_pkt.AuthToken = "" + (lobby.model.Player.getInstance().iPlayerID).toString;
			_pkt.Identity  = this.lobbyAuth.Identity;
			
			var byte:egret.ByteArray = this.dataPacket_multi.pack( define.PacketDefine.C_ENTER_TABLE_OK , _pkt );
			console.log("回復 多桌登录成功消息...");
			util.Utils.DumpBinary( "", byte, 0, 11);
			this.socket_multi.send( byte, 0,  byte.length);
		}
		
		
		/**
		 * 判斷用哪種限紅進桌
		 * @param	type
		 * @param	connectObj
		 * @return
		 */
		protected judgeBetLimitId(type:number , connectObj:lobby.model.struct.TableStruct ):number {
			var betLimitId:number = -1;
			//以下進桌類型 要用賭桌限紅ID
			/*if ( type == JoinTableType.CHARTER_OTHER || type == JoinTableType.CHARTER_TABLE_OWNER ||  type == JoinTableType.CHARTER_TABLER
			|| type == JoinTableType.PEEK_OTHER || type == JoinTableType.PEEK_TABLEER || type == JoinTableType.TELBET ||type == JoinTableType.MULTIPLE ) {
			
			
			betLimitId = connectObj.BetLimitID;  //賭桌限紅
			}
			else {//急速,一般 ,手臂 用玩家選擇限紅
			
			betLimitId = model.Player.getInstance().gameSetting.BetLimitId;  //玩家限紅
			}*/
			//玩家沒選限紅(額)
			if ( betLimitId == 0 ) {
				betLimitId = 1;
			}
			
			return betLimitId;
			
			
		}
		/** 订阅多桌 **/
		public sendSubscription(_aData:any[]):void{
			if(this.socket_multi){
				//				_aData.push( 1 ); 	//測試代碼
				var _subscriptionPkt = new packet.lobby.C_Multi_Table_Subscription_Pkt();
				_subscriptionPkt.TableSubscriptionList = _aData;
				
				var byte:egret.ByteArray = this.dataPacket_multi.pack( define.PacketDefine.C_MULTI_TABLE_REQ , _subscriptionPkt );
				
		//		console.log("订阅多桌..."+_aData);
				util.Utils.DumpBinary( "", byte, 0, 11);
				this.socket_multi.send( byte, 0,  byte.length);
				byte.clear();
//可能出现没响应的桌子				TimeManager.getInstance().start(define.PacketDefine.ENTER_TABLE.toString(16) ,warnConnect);
			}
		}
		/** 取消订阅 **/
		public sendUnsubscribe(_aData:any[]):void{
			if(this.socket_multi){
				for (var i:number = 0; i < _aData.length; i++) 
				{
					if(lobby.model.LobbyData.getInstance().isSubscribed(_aData[i])){
						lobby.model.LobbyData.getInstance().removeSubscribeTable(_aData[i]);
					}
				}
				if(_aData.length>0){
					if (_aData[0] == this.multiTableId){
						return;
					}
					
					var _unsubscribePkt  = new packet.lobby.C_Multi_Table_Unsubscribe_Pkt();
					_unsubscribePkt.TableSubscriptionList = _aData;
					
					var byte:egret.ByteArray = this.dataPacket_multi.pack( define.PacketDefine.C_MULTI_TABLE_UNSUBSCRIBE , _unsubscribePkt );
				//	console.log("取消订阅..."+_aData);
					util.Utils.DumpBinary( "", byte, 0, 11);
					this.socket_multi.send( byte, 0,  byte.length);
				}else{
					console.log("取消订阅的桌子未订阅。。。");
				}
				
			}
		}
		/** 订阅多桌 **/
		//		public sendSubscriptionAll(n:number= 16):void{
		//			var arr : any[] = [];
		//			var ad : any[] = lobby.model.LobbyData.getInstance().aGoodRoadMapList;
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
			var _exitPkt = new packet.lobby.C_Multi_Table_Exit_Pkt();
			
			var byte:egret.ByteArray = this.dataPacket_multi.pack( define.PacketDefine.C_EXIT_TABLE , _exitPkt );
			console.log("退出多桌...");
			//判斷是否為NULL
			if( this.socket_multi ){
				this.socket_multi.send( byte, 0,  byte.length);
			}
		}
		
		/** 多桌投注 **/
		public sendBetMultiTable(data):void{
			if (data.TableID != this.multiTableId){
				data.IsCrossServer = true;
				
			}
			var byte:egret.ByteArray = this.dataPacket_multi.pack( define.PacketDefine.C_BET_INFO , data );
			console.log("入口ID:"+this.multiTableId+"多桌投注..."+data.TableID+"是否跨桌"+data.IsCrossServer);
			if( this.socket_multi ){
				this.socket_multi.send( byte, 0,  byte.length);
			}
			
		}
		
		/** 多桌投注 **/
		public complementedRoadMap(data:Object):void{
			
			var byte:egret.ByteArray = this.dataPacket_multi.pack( define.PacketDefine.C_Game_Update_Table_Data , data );
			if( this.socket_multi ){
				this.socket_multi.send( byte, 0,  byte.length);
			}
			
		}
		
		
		
		
		/**
		 *	自订筹码 
		 * 
		 */		
		public showPanelChipCustom(_uMode:number=0):void{
			this.m_uPanelChipCustom = _uMode;
			this.chipPanelLobby.btnSetting.enabled = false;
			this.chipPanelGame_1.btnSetting.enabled = false;
			this.chipPanelGame_2.btnSetting.enabled = false;
			if(this.m_panelChipCustom==null){
				this.m_panelChipCustom = new lobby.view.panel.PanelChipCustom();
				
				if(this.m_nowScene){
					this.m_nowScene.chipSetSprite.addChild(this.m_panelChipCustom);
					this.m_nowScene.chipSetSprite.mask = this.lobbyView.spChipMask;
				}else{
					this.lobbyView.spChimodel.Player.addChild(this.m_panelChipCustom);
					this.lobbyView.spChimodel.Player.mask = this.lobbyView.spChipMask;
				}
				
				
				switch(this.m_uPanelChipCustom){
					case 0:
						this.m_panelChipCustom.x = 1430;//stage.stageWidth * 0.5 + this.uWindowIndex * 50;
						this.m_panelChipCustom.y = 1500;//stage.stageHeight * 0.5 - 50 + this.uWindowIndex * 50;
						
						this.lobbyView.spChipMask.graphics.clear();
						this.lobbyView.spChipMask.graphics.beginFill(0x000000);
						this.lobbyView.spChipMask.graphics.drawRect(0,50,1920,823);
						this.lobbyView.spChipMask.graphics.endFill();
						
						egret.Tween.get(this.m_panelChipCustom).to({y:630}, define.Define.SPEED, egret.Ease.backOut).call(function():void{
							if(this.m_panelChipCustom){
								this.m_panelChipCustom.init();
							}
							this.chipPanelLobby.btnSetting.enabled = true;
							this.chipPanelGame_1.btnSetting.enabled = true;
							this.chipPanelGame_2.btnSetting.enabled = true;
						});
						break;
					
					case 1:
						this.m_panelChipCustom.x = 1430;
						this.m_panelChipCustom.y = 1500;
						
						this.lobbyView.spChipMask.graphics.clear();
						this.lobbyView.spChipMask.graphics.beginFill(0x000000);
						this.lobbyView.spChipMask.graphics.drawRect(0,50,1920,866);
						this.lobbyView.spChipMask.graphics.endFill();
						
						egret.Tween.get(this.m_panelChipCustom).to({y:630}, define.Define.SPEED, egret.Ease.backOut).call(function():void{
							if(this.m_panelChipCustom){
								this.m_panelChipCustom.init();
							}
							this.chipPanelLobby.btnSetting.enabled = true;
							this.chipPanelGame_1.btnSetting.enabled = true;
							this.chipPanelGame_2.btnSetting.enabled = true;
						});
						break;
					
					case 2:
						this.m_panelChipCustom.x = 2500;
						this.m_panelChipCustom.y = 830;
						this.lobbyView.spChipMask.graphics.clear();
						this.lobbyView.spChipMask.graphics.beginFill(0x000000);
						this.lobbyView.spChipMask.graphics.drawRect(0,50,1616,1080);
						this.lobbyView.spChipMask.graphics.endFill();
						
						egret.Tween.get(this.m_panelChipCustom).to({x:1355}, define.Define.SPEED, egret.Ease.backOut).call(function():void{
							if(this.m_panelChipCustom){
								this.m_panelChipCustom.init();
							}
							this.chipPanelLobby.btnSetting.enabled = true;
							this.chipPanelGame_1.btnSetting.enabled = true;
							this.chipPanelGame_2.btnSetting.enabled = true;
						});
						break;
				}
				
				//				PopupManager.getInstance().show( this.m_panelChipCustom, function():void{
				//					this.m_panelChipCustom.init();
				//				} );
				//				this.uWindowIndex++;
				
			}else{
				this.hidePanelChipCustom();
			}
		}
		public hidePanelChipCustom():void{
			if(this.m_panelChipCustom){
				switch(this.m_uPanelChipCustom){
					case 0:
					case 1:
						egret.Tween.get(this.m_panelChipCustom).to({y:1500}, define.Define.SPEED, egret.Ease.backIn).call(function():void{
							if(this.m_panelChipCustom.parent){
								this.m_panelChipCustom.parent.removeChild(this.m_panelChipCustom);
							}
							this.m_panelChipCustom.destroy();
							this.m_panelChipCustom = null;
							
							this.chipPanelLobby.btnSetting.enabled = true;
							this.chipPanelGame_1.btnSetting.enabled = true;
							this.chipPanelGame_2.btnSetting.enabled = true;
						});
						break;
					case 2:
						egret.Tween.get(this.m_panelChipCustom).to({x:2500}, define.Define.SPEED, egret.Ease.backIn).call(function():void{
							if(this.m_panelChipCustom){
								if(this.m_panelChipCustom.parent){
									this.m_panelChipCustom.parent.removeChild(this.m_panelChipCustom);
								}
								this.m_panelChipCustom.destroy();
								this.m_panelChipCustom = null;
							}
							
							this.chipPanelLobby.btnSetting.enabled = true;
							this.chipPanelGame_1.btnSetting.enabled = true;
							this.chipPanelGame_2.btnSetting.enabled = true;
						});
				}
				
				
				//				PopupManager.getInstance().close( this.m_panelChipCustom );
				//				this.uWindowIndex--;
				//				this.m_panelChipCustom = null;
			}
		}
		public setCustomChip(_aCustomChip:any[]):void{
			if(this.chipPanelGame_1){
				this.chipPanelGame_1.clearCustomChip();
				for (var i:number = 0; i < _aCustomChip.length; i++) 
				{
					this.chipPanelGame_1.addCustomChip(i,_aCustomChip[i]);
				}
			}
			if(this.chipPanelGame_2){
				this.chipPanelGame_2.clearCustomChip();
				for (var k:number = 0; k < _aCustomChip.length; k++) 
				{
					this.chipPanelGame_2.addCustomChip(k,_aCustomChip[k]);
				}
			}
			if(this.chipPanelLobby){
				this.chipPanelLobby.clearCustomChip();
				for (var j:number = 0; j < _aCustomChip.length; j++) 
				{
					this.chipPanelLobby.addCustomChip(j,_aCustomChip[j]);
				}
			}
		}
		
		//选择筹码
		public setSelectChip(nValue:number):void{
			var item;
			if(this.chipPanelGame_1){
				this.chipPanelGame_1.unselect();
				item = this.chipPanelGame_1.getChip(nValue);
				if(item){
					this.chipPanelGame_1.setChipSelect(nValue);
					
					if(this.chipPanelGame_1.currentChipItem){
						if(this.chipPanelGame_1.currentChipItem != item){
							this.chipPanelGame_1.currentChipItem = item;
						}
					}else{
						this.chipPanelGame_1.currentChipItem = item;
					}
				}
			}
			
			if(this.chipPanelGame_2){
				this.chipPanelGame_2.unselect();
				item = this.chipPanelGame_2.getChip(nValue);
				if(item){
					this.chipPanelGame_2.setChipSelect(nValue);
					
					if(this.chipPanelGame_2.currentChipItem){
						if(this.chipPanelGame_2.currentChipItem != item){
							this.chipPanelGame_2.currentChipItem = item;
						}
					}else{
						this.chipPanelGame_2.currentChipItem = item;
					}
				}
			}
			
			if(this.chipPanelLobby){
				this.chipPanelLobby.unselect();
				item = this.chipPanelLobby.getChip(nValue);
				if(item){
					this.chipPanelLobby.setChipSelect(nValue);
					
					if(this.chipPanelLobby.currentChipItem){
						if(this.chipPanelLobby.currentChipItem != item){
							this.chipPanelLobby.currentChipItem = item;
						}
					}else{
						this.chipPanelLobby.currentChipItem = item;
					}
				}
			}
		}
		//筹码翻页
		public setChipPage(iValue:number):void{
			if(this.chipPanelGame_1){
				this.chipPanelGame_1.iCurrentPage = iValue;
			}
			if(this.chipPanelGame_2){
				this.chipPanelGame_2.iCurrentPage = iValue;
			}
			if(this.chipPanelLobby){
				this.chipPanelLobby.iCurrentPage = iValue;
			}
		}
		
		/** 筹码面板 **/
		public showChipPanelGame(_chipPanelGame, _x:number, _y:number, _sParent, _fRebet:Function):void{
			this.chipPanelGame = _chipPanelGame;
			_sParent.addChild(this.chipPanelGame);
			this.chipPanelGame.x = _x;
			this.chipPanelGame.y = _y;
			this.chipPanelGame.fReBet = _fRebet;
		}
		
		/**游戏筹码**/
		public currentChipValueGame():number{
			if(this.chipPanelGame && this.chipPanelGame.currentChipItem){
				return this.chipPanelGame.currentChipItem.uValue;
			}
			console.log("获取当前筹码异常...");
			return 10;
		}
		
		/**多桌筹码**/
		public currentChipValueLobby():number{
			if(this.chipPanelLobby && this.chipPanelLobby.currentChipItem){
				return this.chipPanelLobby.currentChipItem.uValue;
			}
			console.log("获取当前筹码异常...");
			return 10;
		}
		
		/**
		 *	大厅 
		 * 
		 */		
		public showLobby( ):void{
			this.exitLevel = define.Define.EXIT_LOBBY;
			
			this.lobbyView.spGameLayer.addChild(this.lobbyView.spGame);
			
			this.lobbyView.spMainLayer.visible = true;
			this.lobbyView.themeListVisible = true;
			
			//			this.lobbyView.themeList.setDefaultThemeButtonSelect();
			this.lobbyView.setNetPosition();
			this.lobbyView.spTableLayer.visible = true;
		}
		
		public exitTelLobby():void{
			this.showLobby();
			this.lobbyView.spTelLobbyLayer.visible = false;
		}
		/**
		 * 更新幣別
		 */
		public updateCurrency():void {
			//好路多桌 退注的消息 都从这里更新金额消息 数额才会比较准确			
			if(this.multiTableView){
				this.chipPanelLobby.updateGold();
			}else{
				this.updateGameCurrency();
			}
			
		}
		
		/**
		 *更新游戏中余额 (好路派彩) 
		 * 
		 */
		public updateGameCurrency():void {
			if( this.m_nowScene ){
//				收到派彩直接更新余额变动 不按状态过滤				
//				if(this.m_nowScene.model.tableStruct.GameStatus==GameStatus.SETTLING&&this.m_nowScene.model.prevStatus!=GameStatus.SETTLING)
//				{
//					return;
//				}
				this.m_nowScene.updateCurrency();
			}
		}
		
		public offlineTable(table:lobby.model.struct.TableStruct):void{
			if(this.multiTableView){
				this.multiTableView.offline(table.TableID);
			}else if( this.m_nowScene ){
				this.m_nowScene.offline(table.TableID);
			}
		}
		
		
		/**
		 *	提示对话 
		 */		
		public showDialog( _sValue:string ,_fOk:Function = null, _fNo:Function=null, _bSingleMode: boolean=false, _autoClose:number=0):lobby.view.panel.PanelDialog{
			this.uDialogCount++;
			var _dialog  = new lobby.view.panel.PanelDialog(false, _fOk, _fNo, _bSingleMode, _autoClose);
			
			console.log(this, "this.uWindowIndex:::" + this.uWindowIndex );
			this.lobbyView.spWarn.addChild(_dialog);
			this.lobbyView.spWarn.graphics.clear();
			this.lobbyView.spWarn.graphics.beginFill(0x000000,0.5);
			this.lobbyView.spWarn.graphics.drawRect(0,0,this.stage.stageWidth,this.stage.stageHeight);
			this.lobbyView.spWarn.graphics.endFill();
			
			_dialog.x = this.stage.stageWidth * 0.5 + this.uWindowIndex * 50;
			_dialog.y = this.stage.stageHeight * 0.5 + this.uWindowIndex * 50;
			_dialog.text( _sValue );
			//			PopupManager.getInstance().show(_dialog);
			_dialog.scaleX = define.Define.SCALE_MIN;
			_dialog.scaleY = define.Define.SCALE_MIN;
			egret.Tween.get(_dialog).to({scaleX:1, scaleY:1}, define.Define.SPEED);
			this.uWindowIndex++;
			return _dialog;
		}
		
		/**
		 *	全屏 
		 */		
		public full():void{
			switch(this.stage.displayState){
				case StageDisplayState.NORMAL:
					this.stage.displayState = StageDisplayState.FULL_SCREEN_INTERACTIVE;
					break;
				
				case StageDisplayState.FULL_SCREEN:
				case StageDisplayState.FULL_SCREEN_INTERACTIVE:
					this.stage.displayState = StageDisplayState.NORMAL;
					break;
			}
		}
		
		/**
		 *	系统设置 
		 */		
		public showsystemSetting():void{
			if(!this.lobbyView ){
				console.log("大厅未初始化，显示异常...");
				return;
			}
			
			if(this.systemSetting==null){
				this.systemSetting = new lobby.view.panel.PanelSystemSetting();
				
				this.lobbyView.spWindowLayer.addChild(this.systemSetting);
				this.lobbyView.spShieldLayer.alpha = 1;
				this.lobbyView.spShieldLayer.graphics.beginFill(0x000000,0.5);
				this.lobbyView.spShieldLayer.graphics.drawRect(0,0,this.stage.stageWidth,this.stage.stageHeight+100);
				this.lobbyView.spShieldLayer.graphics.endFill();
				
				var move_y:number;
				var point = this.lobbyView.toolView.getBtnSettingPoint();
				if(this.exitLevel == define.Define.EXIT_GAME && this.currentTableStruct && this.currentTableStruct.TableType == define.Define.TABLE_TYPE_ROBOT){//金臂百家位置调整
					move_y = 280 + 37;
					this.systemSetting.x = point.x;
				}else{
					move_y = 280;
					this.systemSetting.x = this.stage.stageWidth - this.systemSetting.width/2;
				}
				
				this.systemSetting.y = -300;
				egret.Tween.get(this.systemSetting).to({y:move_y}, define.Define.SPEED);
				//				PopupManager.getInstance().show( this.systemSetting );
				//				this.uWindowIndex++;
			}else{
				this.hideSystemSetting();
			}
		}
		public hideSystemSetting():void{
			if(this.systemSetting){
				
				egret.Tween.get(this.systemSetting).to({y:-400}, define.Define.SPEED, egret.Ease.backIn).call(function():void{
					egret.Tween.get(this.lobbyView.spShieldLayer).to({alpha:0}, define.Define.SPEED).call(function():void{
						this.lobbyView.spShieldLayer.graphics.clear();
					});
					if(this.systemSetting){
						this.lobbyView.spWindowLayer.removeChild(this.systemSetting);
						this.systemSetting.defaultState();
						this.systemSetting.destroy();
						this.systemSetting = null;
					}
				});
				
				//				this.uWindowIndex--;
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
		public showTableSetting(_struct:lobby.model.struct.TableStruct,_fQuickTable:Function=null):void{
			if(!this.lobbyView){
				console.log("大厅未初始化，显示异常...");
				return;
			}
			
			if(this.m_tableSetting==null){
				this.m_tableSetting = new lobby.view.panel.PanelTableSetting(_struct,false,_fQuickTable);
				this.lobbyView.spWindowLayer.addChild(this.m_tableSetting);
				this.lobbyView.spShieldLayer.alpha = 1;
				this.lobbyView.spShieldLayer.graphics.beginFill(0x000000,0.5);
				this.lobbyView.spShieldLayer.graphics.drawRect(0,0,this.stage.stageWidth,this.stage.stageHeight);
				this.lobbyView.spShieldLayer.graphics.endFill();
				this.m_tableSetting.x = this.stage.stageWidth * 0.5 + this.uWindowIndex * 50;
				this.m_tableSetting.y = this.stage.stageHeight * 0.5 - 50 + this.uWindowIndex * 50;
				//				PopupManager.getInstance().show( this.m_tableSetting );
				this.m_tableSetting.scaleX = define.Define.SCALE_MIN;
				this.m_tableSetting.scaleY = define.Define.SCALE_MIN;
				egret.Tween.get(this.m_tableSetting).to({scaleX:1, scaleY:1}, define.Define.SPEED);
				this.uWindowIndex++;
			}
		}
		public hideTableSetting(_bTween: boolean=true):void{
			if(this.m_tableSetting){
				if(_bTween){
					egret.Tween.get(this.m_tableSetting).to({scaleX:define.Define.SCALE_MIN, scaleY:define.Define.SCALE_MIN}, define.Define.SPEED).call(function():void
					{
						egret.Tween.get(this.lobbyView.spShieldLayer).to({alpha:0}, define.Define.SPEED).call(function():void
						{
							this.lobbyView.spShieldLayer.graphics.clear();
						});
						if(this.m_tableSetting)
						{
							if(this.m_tableSetting.parent){
								this.m_tableSetting.parent.removeChild(this.m_tableSetting);
							}
							this.m_tableSetting.destroy();
							this.m_tableSetting = null;
						}
					});
				}else{
					this.lobbyView.spShieldLayer.graphics.clear();
					if(this.m_tableSetting)
					{
						if(this.m_tableSetting.parent){
							this.m_tableSetting.parent.removeChild(this.m_tableSetting);
						}
						this.m_tableSetting.destroy();
						this.m_tableSetting = null;
					}
				}
				this.uWindowIndex--;
			}
		}
		/**
		 *	密码进桌 
		 * @param _struct
		 * 
		 */		
		public showTableEnterPwd(_struct:lobby.model.struct.TableStruct,_fQuickTable:Function=null):void{
			if(!this.lobbyView){
				console.log("大厅未初始化，显示异常...");
				return;
			}
			
			if(this.m_tableEnter==null){
				this.m_tableEnter = new lobby.view.panel.PanelTableEnter(_struct,false,_fQuickTable);
				this.lobbyView.spWindowLayer.addChild(this.m_tableEnter);
				this.lobbyView.spShieldLayer.alpha = 1;
				this.lobbyView.spShieldLayer.graphics.beginFill(0x000000,0.5);
				this.lobbyView.spShieldLayer.graphics.drawRect(0,0,this.stage.stageWidth,this.stage.stageHeight);
				this.lobbyView.spShieldLayer.graphics.endFill();
				this.m_tableEnter.x = this.stage.stageWidth * 0.5 + this.uWindowIndex * 50;
				this.m_tableEnter.y = this.stage.stageHeight * 0.5 - 50 + this.uWindowIndex * 50;
				//				PopupManager.getInstance().show( this.m_tableEnter );
				this.m_tableEnter.scaleX = define.Define.SCALE_MIN;
				this.m_tableEnter.scaleY = define.Define.SCALE_MIN;
				egret.Tween.get(this.m_tableEnter).to({scaleX:1, scaleY:1}, define.Define.SPEED);
				this.uWindowIndex++;
			}
		}
		public hideTableEnterPwd(_bTween: boolean=true):void{
			if(this.m_tableEnter){
				
				if(_bTween){
					//					PopupManager.getInstance().close( this.m_tableEnter );
					egret.Tween.get(this.m_tableEnter).to({scaleX:define.Define.SCALE_MIN, scaleY:define.Define.SCALE_MIN}, define.Define.SPEED).call(function():void{
						egret.Tween.get(this.lobbyView.spShieldLayer).to({alpha:0}, define.Define.SPEED).call(function():void{
							this.lobbyView.spShieldLayer.graphics.clear();
						});
						if(this.m_tableEnter){
							if(this.m_tableEnter.parent){
								this.m_tableEnter.parent.removeChild(this.m_tableEnter);
							}
							this.m_tableEnter.destroy();
							this.m_tableEnter = null;
						}
						
					});
				}else{
					this.lobbyView.spShieldLayer.graphics.clear();
					if(this.m_tableEnter){
						if(this.m_tableEnter.parent){
							this.m_tableEnter.parent.removeChild(this.m_tableEnter);
						}
						this.m_tableEnter.destroy();
						this.m_tableEnter = null;
					}
				}
				
				this.uWindowIndex--;
			}
		}
		/**
		 *	限红选择 
		 * @param _struct
		 * 
		 */		
		public showLimitBet(_struct:lobby.model.struct.TableStruct=null):void{
			if(!this.lobbyView){
				console.log("大厅未初始化，显示异常...");
				return;
			}
			
			if(this.m_limitBet==null){
				this.m_limitBet = new lobby.view.panel.PanelLimitBet(_struct,false);
				this.lobbyView.spWindowLayer.addChild(this.m_limitBet);
				this.lobbyView.spShieldLayer.alpha = 1;
				this.lobbyView.spShieldLayer.graphics.beginFill(0x000000,0.5);
				this.lobbyView.spShieldLayer.graphics.drawRect(0,0,this.stage.stageWidth,this.stage.stageHeight);
				this.lobbyView.spShieldLayer.graphics.endFill();
				this.m_limitBet.x = this.stage.stageWidth * 0.5 + this.uWindowIndex * 50;
				this.m_limitBet.y = this.stage.stageHeight * 0.5 - 50 + this.uWindowIndex * 50;
				//				PopupManager.getInstance().show( this.m_limitBet );
				this.m_limitBet.scaleX = define.Define.SCALE_MIN;
				this.m_limitBet.scaleY = define.Define.SCALE_MIN;
				egret.Tween.get(this.m_limitBet).to({scaleX:1, scaleY:1}, define.Define.SPEED);
				this.uWindowIndex++;
			}
		}
		public hideLimitBet(_bTween: boolean=true):void{
			if(this.m_limitBet){
				
				if(_bTween){
					egret.Tween.get(this.m_limitBet).to({scaleX:define.Define.SCALE_MIN, scaleY:define.Define.SCALE_MIN}, define.Define.SPEED).call(function():void{
						egret.Tween.get(this.lobbyView.spShieldLayer).to({alpha:0}, define.Define.SPEED).call(function():void{
							this.lobbyView.spShieldLayer.graphics.clear();
						});
						if(this.m_limitBet){
							if(this.m_limitBet.parent){
								this.m_limitBet.parent.removeChild(this.m_limitBet);
							}
							this.m_limitBet.destroy();
							this.m_limitBet = null;
						}
						
					})
				}else{
					this.lobbyView.spShieldLayer.graphics.clear();
					if(this.m_limitBet){
						if(this.m_limitBet.parent){
							this.m_limitBet.parent.removeChild(this.m_limitBet);
						}
						this.m_limitBet.destroy();
						this.m_limitBet = null;
					}
					
				}
				
				this.uWindowIndex--;
			}
		}
		
		/**
		 *	好路通知
		 * @param _struct
		 * 
		 */		
		
		public addGoodRoadNotification(_goodroadMapStruct):void{
			if (this.maintainLevel==0){
				if(this.multiTableView && this.bMultiExit==false){
					//	console.log("通知多桌加入好路"+_goodroadMapStruct.TableID)
					this.multiTableView.addGoodRoadStruct(_goodroadMapStruct);
				}
				if(this.m_nowScene && (this.m_nowScene.GameID==define.GameDefine.BAC || this.m_nowScene.GameID==define.GameDefine.MACHINE_BAC)){
					this.m_nowScene.addGoodRoadNotification(_goodroadMapStruct);
				}
			}
			
		}
		
		public removeGoodRoadNotification(_tableID:number):void{
			
			if(this.multiTableView){
				this.multiTableView.removeGoodRoadStruct(_tableID);
			}
			
			
			if(this.m_nowScene && (this.m_nowScene.GameID==define.GameDefine.BAC || this.m_nowScene.GameID==define.GameDefine.MACHINE_BAC)){
				console.log("游戏好路通知移除好路桌TableID:"+_tableID);
				this.m_nowScene.removeGoodRoadNotification(_tableID);
			}
		}
		
		/**
		 *	胜利动画 
		 * @param _type
		 * @param _sn
		 * @param _socket
		 * 
		 */		
		public showAnimationGameWinC(_nValue:number):void{
			if(this.m_animationGameWinC==null){
				this.m_animationGameWinC = new lobby.view.animation.AnimationGameWinC(_nValue);
				
				this.lobbyView.spAnimationLayer.addChild(this.m_animationGameWinC);
				
				this.m_animationGameWinC.x = 570;
				this.m_animationGameWinC.y = 239;
			}
			this.m_animationGameWinC.value = _nValue;
			this.m_animationGameWinC.play();
		}
		public stopAnimationGameWinC():void{
			if(this.m_animationGameWinC){
				this.m_animationGameWinC.stop();
			}
		}
		
		public showAnimationGameWinA(_nValue:number,_uCount:number=1):void{
			if(this.m_animationGameWinA==null){
				this.m_animationGameWinA = new lobby.view.animation.AnimationGameWinA(_nValue,_uCount);
				
				this.lobbyView.spAnimationLayer.addChild(this.m_animationGameWinA);
				
				this.m_animationGameWinA.x = 545;
				this.m_animationGameWinA.y = 490;
			}
			this.m_animationGameWinA.count(_uCount);
			this.m_animationGameWinA.value = _nValue;
			this.m_animationGameWinA.play();
		}
		public stopAnimationGameWinA():void{
			if(this.m_animationGameWinA){
				this.m_animationGameWinA.stop();
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
			if(this.panelGoodRoadType==null){
				this.panelGoodRoadType = new lobby.view.panel.PanelGoodRoadSetting();
				this.lobbyView.spWindowLayer.addChild(this.panelGoodRoadType);
				this.lobbyView.spShieldLayer.alpha = 1;
				this.lobbyView.spShieldLayer.graphics.beginFill(0x000000,0.5);
				this.lobbyView.spShieldLayer.graphics.drawRect(0,0,this.stage.stageWidth,this.stage.stageHeight);
				this.lobbyView.spShieldLayer.graphics.endFill();
				this.panelGoodRoadType.x = this.stage.stageWidth * 0.5 + this.uWindowIndex * 50;
				this.panelGoodRoadType.y = this.stage.stageHeight * 0.5 - 50 + this.uWindowIndex * 50;
				//				PopupManager.getInstance().show( this.panelGoodRoadType );
				this.panelGoodRoadType.scaleX = define.Define.SCALE_MIN;
				this.panelGoodRoadType.scaleY = define.Define.SCALE_MIN;
				egret.Tween.get(this.panelGoodRoadType).to({scaleX:1, scaleY:1}, 0.5);
				this.uWindowIndex++;
			}
		}
		public hideGoodRoadSetting():void{
			if(this.panelGoodRoadType){
				egret.Tween.get(this.panelGoodRoadType).to({scaleX:define.Define.SCALE_MIN, scaleY:define.Define.SCALE_MIN}, define.Define.SPEED).call(function():void{
					egret.Tween.get(this.lobbyView.spShieldLayer).to({alpha:0}, define.Define.SPEED).call(function():void{
						this.lobbyView.spShieldLayer.graphics.clear();
					});
					if(this.panelGoodRoadType){
						if(this.panelGoodRoadType.parent){
							this.panelGoodRoadType.parent.removeChild(this.panelGoodRoadType);
						}
						this.panelGoodRoadType.destroy();
						this.panelGoodRoadType = null;
					}
					
				});
				this.uWindowIndex--;
			}
		}
		
		/**
		 *选定设置好路类型 
		 * 
		 */
		public setGoodRoadSetting():void{
			if(this.multiTableView){
				//清空所有桌
				this.multiTableView.currentList.clearTableList();
				this.multiTableView.currentList.iCurrentPage = 0;
			}
			if( this.m_nowScene && (this.m_nowScene.GameID==define.GameDefine.BAC || this.m_nowScene.GameID==define.GameDefine.MACHINE_BAC)){
				this.m_nowScene.setGoodRoads();
			}
		}
		
		
		/**
		 *	收包回复 
		 */		
		public sendAck(_type:number, _sn:number, _socket:socket.TCPSocket=null):void{
			var _ack  = new packet.C_Ack_Pkt();
			_ack.SN = _sn;
			var byte:egret.ByteArray = this.dataPacket.pack( define.PacketDefine.ACK , _ack );
			util.Utils.DumpBinary( "", byte, 0, 11);
			switch(_type){
				case 0:
					this.m_socket.send( byte, 0,  byte.length);
					break;
				case 1:
					this.m_socket.send( byte, 0,  byte.length);
					break;
				case 2:
					_socket.send( byte, 0,  byte.length);
					break;
			}
		}
		public sendNAck(_type:number, _sn:number, _socket:socket.TCPSocket=null):void{
			var _nack  = new packet.C_NAck_Pkt();
			_nack.SN = _sn;
			var byte:egret.ByteArray = this.dataPacket.pack( define.PacketDefine.N_ACK , _nack );
			util.Utils.DumpBinary( "", byte, 0, 11);
			switch(_type){
				case 0:
					this.m_socket.send( byte, 0,  byte.length);
					break;
				case 1:
					this.m_socket.send( byte, 0,  byte.length);
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
			var _oData : any = {};
			_oData.PlayerID = lobby.model.Player.getInstance().iPlayerID;
			_oData.Identity = lobby.model.Player.getInstance().iIdentity;
			_oData.Reason   = 1;
			
			var _logoutLobbyPkt = new packet.lobby.LobbyLogoutReqPkt();
			_logoutLobbyPkt.LogoutInfo = new lobby.model.struct.LogoutStruct( _oData );
			
			var byte:egret.ByteArray = this.dataPacket.pack( define.PacketDefine.C_LOGIN_OUT , _logoutLobbyPkt );
			console.log("登出大廳...");
			util.Utils.DumpBinary( "", byte, 0, 11);
			this.m_socket.send( byte, 0,  byte.length);
		}
		
		/**
		 *  发送log 
		 * 
		 */		
		public sendLog(sLog:string):void{
			var _encryptData  = new packet.lobby.C_Log_Req_Pkt();
			_encryptData.LogID = lobby.model.LobbyData.LTK;
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
			console.log("游戏超时  已存在重要信息:"+manager.LobbyManager.getInstance().bImportant)
			if (this.bImportant==false){
				var _sMsg:string;
				var _panelDialog;
				this.closeAllDialog();
				_sMsg = this.getLanguageString( language.Language.sNetWork_Abnormal_Game );
				_panelDialog = this.showDialog_2(_sMsg , true , false , this.leaveLobby , this.refreshWeb  );
				<lobby.view.panel.PanelDialog_2>(_panelDialog).fDestroyRun = this.leaveLobby;			//關閉紐 偵聽函式
				LobbyManager.getInstance().aCloseWindowList.push(_panelDialog);
				this.bImportant=true;
			}
			
		}
		
		/**
		 *游戏中收到全站 、代理维护提示 
		 */
		public alertMaintain(key:string):void{
			this.closeAllDialog();
			var _panelDialog = LobbyManager.getInstance().showDialog_2( key , true , true , this.leaveLobby );
			(<lobby.view.panel.PanelDialog_2>(_panelDialog)).fDestroyRun = this.leaveLobby;
			this.aCloseWindowList.push( _panelDialog); 
			this.lobbySocketClose();							//大廳斷線
			this.gameSocketClose();
			this.bImportant=true;
		}
		
		
	
		/**
		 *	视讯音量 
		 */		
		set nLiveVolume(_nValue:number){
			//调整音量
			this.m_nLiveVolume = _nValue;
			if(this.m_bLiveStatus){
				//				this.m_nLiveVolume = _nValue==0?0.6:_nValue;
				//遊戲視訊  音量
				if(this.m_videoMaxBytePerSecond){
					if( this.m_videoMaxBytePerSecond instanceof lobby.view.lives.LiveVideo ){
						this.m_videoMaxBytePerSecond.setVolume( 0 );
					}else{
						this.m_videoMaxBytePerSecond.setVolume( this.m_nLiveVolume );
					}
				}
				
				//全景視訊 音量
				if( this.panelLiveVideo ){
					this.panelLiveVideo.setVolume( this.m_nLiveVolume );
				}
				
				//大廳視訊 音量
//				if( this.lobbyView && this.lobbyView.liveVideo.bIsPlaying ){
//					this.lobbyView.liveVideo.setVolume( this.m_nLiveVolume );
//				}
			}
			
		}
		
		get nLiveVolume():number {
			return this.m_nLiveVolume;
		}
		
		set bLiveStatus(_bValue: boolean){
			this.m_bLiveStatus = _bValue;
			//禁音开关
			
			if( this.m_bLiveStatus ){
				this.nLiveVolume = this.m_nLiveVolume;
			}
			else {
				//遊戲視訊  音量
				if( this.m_videoMaxBytePerSecond ){
					if( this.m_videoMaxBytePerSecond instanceof lobby.view.lives.LiveVideo ){
						this.m_videoMaxBytePerSecond.setVolume( 0 );
					}else{
						this.m_videoMaxBytePerSecond.setVolume( this.m_nLiveVolume );
					}
				}
				
				//全景視訊 音量
				if( this.panelLiveVideo ){
					this.panelLiveVideo.setVolume( this.m_nLiveVolume );
				}
				
				//大廳視訊 音量
//				if( this.lobbyView && this.lobbyView.liveVideo && this.lobbyView.liveVideo.bIsPlaying ){
//					this.lobbyView.liveVideo.setVolume( 0 );
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
			this.js_call(define.Define.JS_Index);
		}
		
		/**
		 * 連結電投大廳
		 */
		public enterTelLobby():void {
			console.log("進入電投 登入頁");
			//			if(ExternalInterface.available){
			//				ExternalInterface.call("TelephoneLobby");
			//			}
			this.js_call(define.Define.JS_JUMP_TELBET);
		}
		/**
		 * 充值
		 */		
		public recharge():void{
			this.js_call(define.Define.JS_Recharge);
		}
		/**
		 * 注册
		 */		
		public regist():void{
			this.js_call(define.Define.JS_Regist);
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
			this.js_call(define.Define.JS_Refresh);
		}
		public js_call(_value:number=-1):void{
			//全屏模式先退出全屏，再打开其他页面
				if(manager.LobbyManager.getInstance().stage.displayState == StageDisplayState.FULL_SCREEN || 
					manager.LobbyManager.getInstance().stage.displayState == StageDisplayState.FULL_SCREEN_INTERACTIVE){
					manager.LobbyManager.getInstance().full();
				}
				
				ExternalInterface.call("RedirectCustomizedUrl",_value);
		}
		
		/**
		 *	另一種 提示对话框 
		 */		
		public showDialog_2( _sValue:string , bShowMask: boolean = false , bSingleMode: boolean = false ,_fOk:Function = null ,_fRetry:Function = null):lobby.view.panel.PanelDialog_2{
			this.uDialogCount++;
			var _dialog  = new lobby.view.panel.PanelDialog_2(false, bShowMask , bSingleMode ,_fOk , _fRetry );
			
			
			this.lobbyView.spWarn.addChild(_dialog);
			this.lobbyView.spWarn.graphics.clear();
			this.lobbyView.spWarn.graphics.beginFill(0x000000,0.5);
			this.lobbyView.spWarn.graphics.drawRect(0,0,this.stage.stageWidth,this.stage.stageHeight);
			this.lobbyView.spWarn.graphics.endFill();
			
			
			
			_dialog.x = this.stage.stageWidth * 0.5 + this.uWindowIndex * 50;
			_dialog.y = this.stage.stageHeight * 0.5 + this.uWindowIndex * 50;
			_dialog.text( _sValue );
			//			PopupManager.getInstance().show(_dialog);
			_dialog.scaleX = define.Define.SCALE_MIN;
			_dialog.scaleY = define.Define.SCALE_MIN;
			egret.Tween.get(_dialog).to({scaleX:1, scaleY:1}, define.Define.SPEED)
			this.uWindowIndex++;
			return _dialog;
		}		
		
		
		
		set gamePoint(_point){
			this.m_gamePoint = _point;
			
			//			console.log("************************************************************ 全局坐标：",m_gamePoint);
			//			this.lobbyView.spGame.x =<number>(m_gamePoint.x);
			//			this.lobbyView.spGame.y =<number>(m_gamePoint.y);
			
			this.lobbyView.spTweenGame.x =<number>(this.m_gamePoint.x);
			this.lobbyView.spTweenGame.y =<number>(this.m_gamePoint.y);
			
			
		}
		get gamePoint():egret.Point{
			return this.m_gamePoint;
		}
		
		/**
		 *	重连视讯 
		 */		
		public liveReplay(tableList:any[] = null):void{
			if(this.m_nowScene && tableList){
				for(var i:number=0; i<tableList.length; i++){
					if(tableList[i] == this.m_nowScene.tableStruct.TableID){
						this.m_nowScene.stopVideo();
						this.m_nowScene.playVideo();
						break;
					}
				}
			}
			
			//多桌重连视讯
			if(this.exitLevel==define.Define.EXIT_MULTI_TABLE){
				if(this.multiTableView && this.multiTableView.currentList){
					this.multiTableView.currentList.PlayAllVideo();
				}
			}
		}
		
		//更新荷官
		public updateDealerInfo(_struct):void{
			if(this.m_nowScene){
				if(this.m_nowScene.tableStruct.ThemeID == _struct.ThemeID  && this.m_nowScene.tableStruct.TableID==_struct.TableID){
					this.m_nowScene.updateDealerInfo(_struct);
				}
			}
		}
		
		public lobbySocketClose():void {
			if( this.m_socket && this.m_socket.isConnected() ) {
				try{
					this.m_socket.m_socket.close();
				}
				catch(e){
					
				}
			}
		}
		public isLobbySocketConnected(): boolean
		{
			if(this.m_socket)return this.m_socket.isConnected();
			return false;
		}
		public gameSocketClose():void{
			TimeManager.getInstance().stopAll();
			if (this.m_nowScene){
				this.m_nowScene.closeGame();
			}else if (this.bLoginMultiTable && this.socket_multi){
				this.destroyMultiSocket();
			}
			
		}
		
		//快速转桌
		public changeGame(bToBac: boolean=false):void{
			if(this.lobbyView.quickThemeList.currentTheme){
				this.lobbyView.quickThemeList.currentTheme.setSelect(false, false);
			}
			//			this.lobbyView.iCurrentQuick = 255;
			//			ActionManager.getInstance().fExitGame = this.m_nowScene.destroy;
			
			this.m_nowScene.changeTable();
			if(!bToBac || this.bQuickToMultiTable){
				this.exitGoodRoad();
				this.m_nowScene.removePacket();
			}
			
			
			if(this.m_animationGameWinC){
				this.m_animationGameWinC.stop();
			}
			if(this.m_animationGameWinA){
				this.m_animationGameWinA.stop();
			}
			
			//隐藏面板
			this.hideChannel();
			this.hidePanelChipCustom();
			
			if(this.m_gameTransition){
				this.m_gameTransition.destroy();
				this.m_gameTransition = null;
			}
			
			//截图
//			if(m_bmpSnapshotGame==null){
//				m_bmpSnapshotGame = new Bitmap(snapshotGame());
//				this.lobbyView.spGameLayer.addChild(m_bmpSnapshotGame);
//				m_bmpSnapshotGame.smoothing = true;
//			}
			this.destroyGame();
		}
		
		public closeAllDialog():void {
			for( var i:number =0 ; i < this.aCloseWindowList.length ; i++ ){
				if(  this.aCloseWindowList[i].parent ){
					this.aCloseWindowList[i].parent.removeChild(this.aCloseWindowList[i]); 
				}
				this.aCloseWindowList[i].destroy();
			}
			this.aCloseWindowList = new Array<lobby.view.panel.PanelWindow>();
		}
		
		public reconnect(): boolean {
			console.log(this, "大廳重連..." );
			if( this.iReTryConnect < 2 ){	//1.5秒重連一次
				this.lobbySocketClose();
				/*var timer:Timer = new Timer( 1500 , 1); 
				timer.addEventListener(TimerEvent.TIMER_COMPLETE , onRetryLogin );
				timer.start();*/
				var timer = timer.JTimer.getTimer(1500,1);
				timer.addTimerCallback(null,this.onRetryLogin);
				timer.start();
				return true;
			}
			else {
				this.lobbySocketClose();
				return false;
			}	
			
		}
		
		protected onRetryLogin(timer):void
		{
			console.log(this , "大廳重連" );
			/*var timer:Timer = event.target as Timer;
			timer.removeEventListener(TimerEvent.TIMER_COMPLETE , onRetryLogin );
			timer =null;*/
			timer.dispose();
			//连接大厅
			this.connect( this.lobbyAuth.serverIP , this.lobbyAuth.serverPort);
			this.iReTryConnect = this.iReTryConnect + 1;
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
			if(this.m_nowScene){
				return this.m_nowScene.bCanExit;
			}
			return true;
		}
		
		public showGameMessage(sValue:string):void{
			if(this.m_nowScene){
				this.m_nowScene.showMessage(sValue);
			}
		}
		
		public getGameID():number{
			if(this.m_nowScene){
				return this.m_nowScene.tableStruct.GameID;
			}
			return 0;
		}
		public getGameTableID():number{
			if(this.m_nowScene){
				return this.m_nowScene.tableStruct.TableID;
			}
			return 0;
		}
		public getGameThemeID():number{
			if(this.m_nowScene){
				return this.m_nowScene.tableStruct.ThemeID;
			}
			return 0;
		}
		public IsInTable(): boolean{
			return this.m_nowScene!=null;
		}
		
		public showGameStatistic():void{
			if(this.m_nowScene){
				this.m_nowScene.showStatistic();
			}
		}
		
		public hideGameStatistic():void{
			if(this.m_nowScene){
				this.m_nowScene.hideStatistic();
			}
		}
		
		public IsLiveConnected(): boolean{
			if(this.m_nowScene){
				return this.m_nowScene.bVideoConnected;
			}
			return false;
		}
		
		/****************************大廳心跳包處裡**************************************/
		
		
		/**
		 *  大廳心跳包
		 */
		public sendHeartPkt():void {
			var _lobbyHeartPkt 	=	new packet.lobby.C_Lobby_Heart_Pkt();
			_lobbyHeartPkt.Identity = this.lobbyAuth.Identity;
			_lobbyHeartPkt.PlayerID = lobby.model.Player.getInstance().iPlayerID;
			var byte:egret.ByteArray = this.dataPacket.pack( define.PacketDefine.C_Heart , _lobbyHeartPkt );
			
			
			util.Utils.DumpBinary( "", byte, 0, 11);
			this.m_socket.send( byte, 0,  byte.length);
			
//			console.log(this, "送出心跳..." );
			
		}	
		/**
		 * 回送服務器傳來心跳包消息
		 */
		public responseHeartPkt():void {
			var _lobbyHeartPkt  	=	new packet.lobby.C_Lobby_Heart_Pkt();
			_lobbyHeartPkt.Identity = this.lobbyAuth.Identity;
			_lobbyHeartPkt.PlayerID = lobby.model.Player.getInstance().iPlayerID;
			var byte:egret.ByteArray = this.dataPacket.pack( define.PacketDefine.S_Heart , _lobbyHeartPkt );
			
			
			util.Utils.DumpBinary( "", byte, 0, 11);
			
			this.m_socket.send( byte, 0,  byte.length);
		}		
		
		//5秒檢測一次
		protected onHeart():void
		{
			//			console.log(this, "檢測大廳心跳..." );
			var _nTime:number = egret.getTimer();
			var _time:number = (_nTime - this.nRevServerTime)/1000;
			var _nDelay:number = (this.nHeartRate*2)/1000;			//延遲時間
			
			if( _time < _nDelay ){
				this.sendHeartPkt();
			}else {
				this.pktException();
			}
			
		}	
		
		/**
		 * 心跳包傳遞異常
		 */
		public pktException():void {
			this.lobbySocketClose();	//關閉大廳連接
			if( this.lobbyAuth ){
				
				if( this.lobbyAuth.Identity != define.Define.iTryAccount ){
					this.lobbyView.showLoading();									//打開laoding
					this.reconnect();												//重連
				}else {			//試玩帳號直接彈跳提示窗
					NetWorkManager.getInstance().checkLobbyNetWork(define.Define.LobbyTryAccountDisConnect);
				}
			}
			else {
				console.log(this, "包傳遞異常 this.lobbyAuth::" + this.lobbyAuth );
			}
			this.nRevServerTime = egret.getTimer();
			this.stopHeart();
		}
		
		/**
		 * 啟動心跳包
		 */
		public runHeart():void {
			TimeManager.getInstance().addFun( this.onHeart , this.nHeartRate);
		}
		
		/**
		 * 停止心跳包
		 */
		public stopHeart():void {
			TimeManager.getInstance().removeFun(this.onHeart);
		}
		
		
		/****************************大廳心跳包處裡END**************************************/
		
		
		
		
		/****************************多桌心跳包處裡**************************************/
		
		/**
		 *  多桌心跳包
		 */
		public sendMultiHeartPkt():void {
			var _pkt = new packet.game.C_Game_Heart_Pkt();
			_pkt.PlayerID = lobby.model.Player.getInstance().iPlayerID;
			_pkt.Identity = this.lobbyAuth.Identity;
			
			var byte:egret.ByteArray = this.dataPacket_multi.pack( define.PacketDefine.C_Heart , _pkt );
			util.Utils.DumpBinary( "", byte, 0, 11);
			
			this.socket_multi.send( byte, 0,  byte.length);
			
			//			console.log(this, "送出心跳..." );
			
		}	
		/**
		 * 回送服務器傳來心跳包消息
		 */
		public responseMultiHeartPkt():void {
			this.nRevServerTimeM = egret.getTimer();
			
			var _pkt = new packet.game.C_Game_Heart_Pkt();
			_pkt.PlayerID = lobby.model.Player.getInstance().iPlayerID;
			_pkt.Identity = this.lobbyAuth.Identity;
			
			var byte:egret.ByteArray = this.dataPacket_multi.pack( define.PacketDefine.S_Heart , _pkt );
			util.Utils.DumpBinary( "", byte, 0, 11);
			
			this.socket_multi.send( byte, 0,  byte.length);
		}		
		
		//5秒檢測一次
		protected onMultiHeart():void
		{
			//			console.log(this, "檢測大廳心跳..." );
			var _nTime:number = egret.getTimer();
			var _time:number = (_nTime - this.nRevServerTimeM)/1000;
			var _nDelay:number = (this.nHeartRate*2)/1000;			//延遲時間
			
			
			this.pktMultiException();
			
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
			
			if( this.socket_multi  &&this.socket_multi.m_socket.connected){
				try {
					this.socket_multi.m_socket.close();
				}catch(e:Error){
					
				}
				
				this.reConnectMulti();
			}
			
			this.nRevServerTimeM = egret.getTimer();
			this.stopMultiHeart();
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
			TimeManager.getInstance().removeFun(this.onMultiHeart);
		}
		
		
		/****************************多桌心跳包處裡END**************************************/
		
		/****************************多桌重连**************************************/
		public reConnectMulti(): boolean {
			if( this.loginNM < 2 ){
				console.log(this,"重新登入多桌..");
				if( this.socket_multi ){
					this.loginNM++			
					/*var timer:Timer = new Timer( 1500 , 1); 
					timer.addEventListener(TimerEvent.TIMER_COMPLETE , onRetryLogin );
					timer.start();*/
					var timer = timer.timer.JTimer.getTimer(1500.1);
					timer.addTimerCallback(null,this.onRetryLogin);
					timer.start();
					
					this.bRetryM = true;
					this.lobbyView.showLoading();
					this.socket_multi.m_socket.close();			//先斷線
				}
				return this.bRetryM;	
			}
			console.log(this,"重新登入多桌失敗..");
			this.lobbyView.hideLoading();
			this.bRetryM = false;
			if( this.socket_multi ){
				this.socket_multi.m_socket.close();
			}
			
			return this.bRetryM;
		}	
		
		protected onRetryLoginM(timer):void{
			/*var timer:Timer = event.target as Timer;
			timer.removeEventListener(TimerEvent.TIMER_COMPLETE , onRetryLogin );
			timer =null;*/
			timer.dispose();
			this.connectMultiTable(this.multiTableEntryStruct);
			
		}	
		
		public hidePanelDetail():void{
			if(this.m_nowScene){
				this.m_nowScene.hidePanelDetail();
			}
		}
		
		public addChildToGame(_view):void{
			if(this.m_nowScene){
				this.m_nowScene.addChild(_view);
			}
		}
		public removeChildToGame(_view):void{
			if(this.m_nowScene){
				this.m_nowScene.addChild(_view);
			}
		}
		
		public hideAllPanel():void{
			this.hideChannel();
			this.hidePanelDetail();
			this.hidePersonalinformation();
			this.lobbyView.toolView.toolContact.hide();
		}
		
		
		public subscripThemeTimeToShowLoading():void{
			TimeManager.getInstance().removeFun(this.subscripThemeTimeToShowLoading);
			
			if(this.bSubscribeTheme){
				this.lobbyView.showLoading();
			}
		}
		public subscripThemeTimeToHint():void{
			TimeManager.getInstance().removeFun(this.subscripThemeTimeToHint);
			
			this.lobbyView.hideLoading();
			NetWorkManager.getInstance().showPannel(language.Language.sNetWork_Abnormal_Lobby , NetWorkManager.getInstance().lobbyConnectCloseed );	
			this.lobbySocketClose();	
			this.gameSocketClose();
		}
		
		/**
		 * 加载游戏 
		 */		
		public loaderGame(_tableType:number):void{
			switch(_tableType){
				case define.Define.TABLE_TYPE_NORMAL:
					break;
				
				case define.Define.TABLE_TYPE_DTF:
					break;
				
				case define.Define.TABLE_TYPE_ROBOT:
					break;
				
				case define.Define.TABLE_TYPE_ROU:
					break;
				
				case define.Define.TABLE_TYPE_SIC:
					break;
			}
		}
		
		/**
		 *缓存结果动画，好路用
		 * win11(红色赢中字） win13(红色赢英文) 
		 * win31(和局中字） win13(和局英文) 
		 */
		private cacheWinMc():void{
			
			var win1=ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_MULTITABLE, "WinRedMc");
			var win3=ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_MULTITABLE, "WinGreenMc");
			if(manager.CacheManager.getInstance().hasCache("win11")==false){
				manager.CacheManager.getInstance().cacheMovieClip("win11",win1);
			}
			if(manager.CacheManager.getInstance().hasCache("win31")==false){
				manager.CacheManager.getInstance().cacheMovieClip("win31",win3);
			}
			
			win1.mc.gotoAndStop(3);
			win3.mc.gotoAndStop(3);
			
			if(manager.CacheManager.getInstance().hasCache("win13")==false){
				manager.CacheManager.getInstance().cacheMovieClip("win13",win1);
			}
			if(manager.CacheManager.getInstance().hasCache("win33")==false){
				manager.CacheManager.getInstance().cacheMovieClip("win33",win3);
			}
			win1=null;
			win3=null;
			
			
		}
		
		protected detectionComplete(event:egret.TimerEvent):void
		{
			// TODO Auto-generated method stub
			if(this.m_uDetection==this.m_uDetectionCount){
				this.showIsChangeRenderModeAsk();
			}
		}
		protected detection(event:egret.TimerEvent):void
		{
			// TODO Auto-generated method stub
			if(this.lobbyView.iCurrentFps<20){
				this.m_uDetection++;
			}
		}
		public startDetection(uCount:number):void{
			if(!this.m_bDetection){
				return;
			}
			if(this.uRenderMode==1){
				this.stopDetection();
				return;
			}
			
			this.m_uDetection = 0;
			this.m_uDetectionCount = uCount;
			if(this.m_detectionTimer){
				if(this.m_detectionTimer.running){
					this.m_detectionTimer.stop();
				}
				this.m_detectionTimer.repeatCount = uCount;
				this.m_detectionTimer.start();
			}
			
		}
		public stopDetection():void{
			if(!this.m_bDetection){
				return;
			}
			if(this.m_detectionTimer){
				if(this.m_detectionTimer.running){
					this.m_detectionTimer.stop();
				}
			}
		}
		public showIsChangeRenderModeAsk():void{
			if(!this.m_bDetection){
				return;
			}
			this.showDialog(this.getLanguageString(language.Language.sIsChangeRenderToLow),this.changeRenderModeToLow,null);
		}
		public changeRenderModeToLow():void{
			if(!this.m_bDetection){
				return;
			}
			this.uRenderMode = 1;
			if(this.multiTableView){
				this.multiTableView.changeModeToLow();
			}
		}


	}
}