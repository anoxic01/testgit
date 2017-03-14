module packet.sink {
	export class GoodGameTCPSink implements ITCPSocketSink {
		private var vecController	:	Vector.<GameControler>;
		public var socketParser		:	SocketParser
		public  var hasKey			:	Boolean = false		//已获得接口桌 KEY	
		private var pkey			:	String ="";
		public var subscibeNum		:	int =5;				//一次订阅数量
		public var myTableType		:	int;
		public var bShowDialog		:	Boolean = false;
		public var enterTableId		:	int;
		private var bConnectFail	:   Boolean = false;

		public constructor() {
			socketParser = new SocketParser();
			socketParser.setCData(PacketDefine.GAME);
			vecController = new Vector.<GameControler>;
		}

		
		public function  destroy():void{
			clear();
			if (vecController){
				while(vecController.length>0){
					vecController.shift();
				}
				vecController=null;
			}
			if(socketParser){
				socketParser=null;
			}
			
			
			LobbyManager.getInstance().bEnterGame=false;
		}
		
		public function addController(_controller:GameControler):void{
			vecController.push(_controller);
		}
		
		public function removeController(_controller:GameControler):void{
			if(_controller){
				var index:int =vecController.indexOf(_controller);
				if(index > -1){
					vecController.splice(index, 1);
				}
			}
		}
		
		public function onCTCPSocketConnecting(_uSocketID:int):void
		{
		}
		
		public function onCTCPSocketConnected(_uSocketID:int):void
		{
			trace("好路连接成功... _uSocketID:",_uSocketID );
			
			for (var i:int = 0; i < vecController.length; i++) {
			//	vecController[i].proxy = vecController[i].proxy;
				vecController[i].onConnect();
			}
			
			NetWorkManager.getInstance().iGameNetWorkStatus = Define.GameConnected;
		}
		
		public function onCTCPSocketClose(uSocketID:int, cmd:int):void
		{
			trace("好路百家连接关闭...");
			//重連機制 ,廢棄不用
			/*for (var i:int = 0; i < vecController.length; i++) {
				if( vecController[i] ){
					vecController[i].onConnectClosed();
				}	
			}*/
			
			var _controler:GameControler;
			if( vecController.length > 0 && vecController[0] ){
				_controler = vecController[0];
			}
			NetWorkManager.getInstance().checkGameNetWork(	Define.GameDisconnect,  _controler );
//			PanelWindowManager.getInstance().showPannel(Language.sNetWork_Abnormal_Game , gameClosed );
		
		}
		
		public function onCTCPSocketError(iFail:int):void
		{
			
					
			var _controler:GameControler;
			if( vecController.length > 0 && vecController[0] ){
				_controler = vecController[0];
			}
			if( iFail == SocketDefine.CONNECT_FAIL || iFail == SocketDefine.SOCKET_SECURITY_ERROR ) {
				Log.getInstance().log(this,"游戏连接错误..."+iFail);
				trace("游戏连接错误..."+iFail);
				NetWorkManager.getInstance().checkGameNetWork(	Define.GameConnectFailed,  _controler );
				bConnectFail=true;
			}
//			NetWorkManager.getInstance().checkGameNetWork(	Define.GameConnectFailed,  _controler );
			
		}
		
		public function onCTCPSocketRead(_uSocketID:int, _tagTCPData:ITagTCPData):void
		{
			var len:int =vecController.length
			//var len:int = 1
			//var _oData : Object = vecController[0].proxy.socketParser.onPacketData( _tagTCPData );
			var _oData : Object = socketParser.onPacketData( _tagTCPData );
//			trace("pkey"+pkey);
			if (_oData==null){
				trace("GOOD SINK 解析数据为NULL ")
				return;
			}
			
	//	trace("好路返回::::----------------"+_oData.str)
		
			
			//if (_oData.Type == 0x0F){ 
			//		trace("百家+好路消息 :"+_uSocketID, _oData.Type+" 收到数据："+_oData.str);
			//}
			if (_oData.Type == 0x01 && hasKey==false){
				TimeManager.getInstance().stop(PacketDefine.ENTER_TABLE.toString(16));
				if (_oData.Ret>0){
					loginErrHandler(_oData.Ret);
					LobbyManager.getInstance().destroyNewGame();
//					if (vecController[0]){
//						vecController[0].root.destroy();
//					}
					return;
				}
				
				
				//取第一次秘钥,订阅多桌
				trace(_uSocketID+"好路接口桌登入成功:", "消息ID:"+_oData.Type+"台号ID:"+_oData.TableInfo.TableID+" 收到数据："+_oData.str);
				socketParser.setPData(_oData.PlayerInfo.PrivateKey);
				socketParser.setBData(_oData.PlayerInfo.BroadcastKey);
				socketParser.setAData(_oData.PlayerInfo.AgentKey);
				pkey = _oData.PlayerInfo.PrivateKey;
				enterTableId = _oData.TableInfo.TableID;
				myTableType = _oData.TableInfo.TableType

				trace("好路多桌::::KEY: "+pkey)
				var arr:Array = ActionManager.getInstance().multiTalbes;
				var myIndex:int =arr.indexOf(enterTableId );
				if (myIndex>-1){
					arr.splice(myIndex,1);
				}
//				if (arr.length>0){
//					LobbyManager.getInstance().sendSubscription(arr);
//					ActionManager.getInstance().multiTalbes=[];
//				}
//				LobbyManager.getInstance().sendSubscriptionAll(subscibeNum);	//取消一次订阅所有好路
				hasKey = true;
	//			LobbyManager.getInstance().bLoginMultiTable = true
				//return;
				
				
			}else if(_oData.Type == 0x01){
				TimeManager.getInstance().stop(PacketDefine.ENTER_TABLE.toString(16));
				if(_oData.Ret>0){
					return ;
				}
				trace("GOOD SOCKET 登入成功:台号ID:"+_oData.TableInfo.TableID+" 收到数据："+_oData.str);
			}

			for (var i:int = 0; i < len; i++) 
			{
				//var _oData : Object = vecController[i].proxy.socketParser.onPacketData( _tagTCPData );
				var bSelf:Boolean = isMyTable(_oData);
				var protocolClass : IProtocolStruct = getProtocol(_oData,bSelf);
				if (protocolClass)
				{
					protocolClass.initControler( vecController[i] );
					protocolClass.execute( _oData );
					if(bSelf)break; //本桌在0号位Ctrl ,只执行一次
				}else{
				//	trace("MULTI 收到的数据，找不到对应处理协议..." + _oData.Type );
				}
			}
		}
		
		/**
		 *是否本桌消息 
		 * @return 
		 * 
		 */
		private function isMyTable(_oData):Boolean{
			var bSelf:Boolean;
			var _tableId:int = 0;
			
				switch(_oData.Type)
				{
					case PacketDefine.S_ENTER_TABLE:
						//0x01
						_tableId = _oData.TableInfo.TableID;
						break;
					case PacketDefine.S_TABLE_STATUS:
						//状态0x09
						_tableId = _oData.TableUpdateInfo.TableID
						break;
					case PacketDefine.S_REAL_TIME_BET_INFO:
						//彩池 统计0x0A
						_tableId = _oData.StaticsInfo.TableID
						break;
					default:
						if (_oData.hasOwnProperty("TableID")){
							
							_tableId = _oData.TableID;
						}
						break;
				}
			
			
			if (_tableId==enterTableId  || _tableId==0){
				
				return true;
			}
			
			return false;
		}
		private function getProtocol(_oData:*,bSelf:Boolean):IProtocolStruct{
			 var protocolClass : IProtocolStruct;
			 
			 if (bSelf){
				protocolClass  = PacketManager.getInstance().getProtocolClass( PacketDefine.GAME_BAC, _oData.Type,myTableType)
			 }else{
				 protocolClass  = PacketManager.getInstance().getProtocolClass(PacketDefine.GAME_BAC_GOOD,_oData.Type)
			 }
			 return protocolClass;
		}
		
		
		
		public function clear():void
		{
			hasKey = false;
			socketParser = null;
			while (vecController.length>0){
				vecController.pop();
			}
			
		}
		
		private function loginErrHandler(ret:int):void{
			var msg:String= "";
			var bOneBtn:Boolean = false;
			if( ret == GameDefine.ENTER_FAIL) {
				msg=LobbyManager.getInstance().getLanguageString( Language.sEnterFail ) ;
				
			}
			else if (  ret == GameDefine.ENTER_INVALID ) {
				msg=LobbyManager.getInstance().getLanguageString( Language.sEnterInvalid ) ;
			}
			else if ( ret == GameDefine.ENTER_NO_AVAILABLE_SEAT ) {
				msg=LobbyManager.getInstance().getLanguageString( Language.sNoSeat );
			}
			else if ( ret == GameDefine.ENTER_TABLE_OWNER_EXIST ) {
				msg=LobbyManager.getInstance().getLanguageString( Language.sTableOwnerExist ) ;
			}		
			else if ( ret == GameDefine.ENTER_JOIN_TB_TYPE_NOT_EXIST) {
				msg=LobbyManager.getInstance().getLanguageString( Language.sJoinTbTypeFault ) ;
			}	
			else if ( ret == GameDefine.ENTER_JOIN_TB_DATA_INCORRECT) {
				msg=LobbyManager.getInstance().getLanguageString( Language.sJoinDataError ) ;
			}	
			else if ( ret == GameDefine.ENTER_BALANCE_NOT_ENOUGH) {
				msg=LobbyManager.getInstance().getLanguageString( Language.sBalanceNoEnough ) ;
			}	
			else if ( ret == GameDefine.ENTER_JOIN_TB_PASSWORD_INVAILD) {
				msg=LobbyManager.getInstance().getLanguageString( Language.sEnterPwError ) ;
			}
			else if( ret == GameDefine.ENTER_OVER_PLAYERS_LIMIT ){
				msg=LobbyManager.getInstance().getLanguageString( Language.sTableLimit ) ;
			}				
			else if ( ret == GameDefine.ENTER_TABLE_IS_PRIVATE ) {
				msg=LobbyManager.getInstance().getLanguageString( Language.sTablePrivate ) ;
			}
			else if ( ret == GameDefine.ENTER_CHARTER_TYPE_IS_NOT_CORRECT ) {
				msg=LobbyManager.getInstance().getLanguageString( Language.sCharterTypeError ) ;
				
			}
			else if ( ret == GameDefine.ENTER_TIMEOUT ) {
				msg=LobbyManager.getInstance().getLanguageString( Language.sTimeOut ) ;
			}
			else if ( ret == GameDefine.ENTER_PROTOCOL_VER_MISMATCH ) {
				msg=LobbyManager.getInstance().getLanguageString( Language.sProtocolError ) ;
			}	
			else if( ret == GameDefine.ENTER_TRY_ACCOUNT_PERMISSION_DENY ){
				msg=LobbyManager.getInstance().getLanguageString( Language.sTryAccountDeny ) ;
			}
			else if( ret == GameDefine.ENTER_PERMISSION_DENY ){
				msg=LobbyManager.getInstance().getLanguageString( Language.sPermissionDeny ) ;
			}
			else if( ret == GameDefine.ENTER_MASTER_EXIT ){
				msg=LobbyManager.getInstance().getLanguageString( Language.sMasterExit ) ;
				bOneBtn= true;
			}
			else if( ret == GameDefine.ENTER_NOT_FINISH ){
				msg=LobbyManager.getInstance().getLanguageString( Language.sNotFinish ) ;
			}
			else if( ret == GameDefine.ENTER_MAINTAIN ){
				msg=LobbyManager.getInstance().getLanguageString( Language.sMaintain ) ;
			}else if( ret == GameDefine.ROAD_MAP_ERROR ){
				msg=LobbyManager.getInstance().getLanguageString( Language.sMaintenance ) ;
			}
			else if( ret == GameDefine.ENTER_SERVER_BUSY ){			//服務器忙碌中,重連
				
				var _bRes:Boolean = false;
				if( vecController.length>0 && vecController[0] ){
					_bRes = vecController[0].reConnect();
				}
						
				if ( !_bRes ){
					msg=LobbyManager.getInstance().getLanguageString( Language.sWarn_Server_Busy ) ;
				}
			} else if( ret == GameDefine.ENTER_CLOSED ){	
				msg=LobbyManager.getInstance().getLanguageString( Language.sTableClosed ) ;
			}else if( ret == GameDefine.ENTER_NOSETTLED ){	
				msg=LobbyManager.getInstance().getLanguageString( Language.sNoSettled) ;
			}else if (ret==GameDefine.ENTER_MAINTAIN_ALL){
				msg=LobbyManager.getInstance().getLanguageString( Language.sLogout_Lobby_All_Maintain) ;
			}else if (ret==GameDefine.ENTER_MAINTAIN_THEME){
				msg=LobbyManager.getInstance().getLanguageString( Language.sLogout_Lobby_Hall_Maintain) ;
			}else if (ret==GameDefine.ENTER_MAINTAIN_TABLE){
				msg=LobbyManager.getInstance().getLanguageString( Language.sLogout_Lobby_Table_Maintain) ;
			}else if (ret==GameDefine.ENTER_MAINTAIN_AGENT){
				msg=LobbyManager.getInstance().getLanguageString( Language.sLogout_Lobby_Agent_Maintain) ;
			}else if( ret == GameDefine.ENTER_DIFFERENT_IP ){	
				msg=LobbyManager.getInstance().getLanguageString( Language.sWarn_Account_Limit) ;
			}else if( ret == GameDefine.ENTER_SEAT_FAIL ){	
				msg=LobbyManager.getInstance().getLanguageString( Language.sEnterSeatFail) ;
			}else if( ret == GameDefine.ENTER_PERMISSION_30 ){	
				msg=LobbyManager.getInstance().getLanguageString( Language.sWarn_Ret_14) ;
			}
			
			LobbyManager.getInstance().lobbyView.hideLoading();
			
			if( msg != "" ){
				var dialog_2:PanelDialog_2 = LobbyManager.getInstance().showDialog_2( msg, false, true , exit );
				dialog_2.fDestroyRun = exit;
			}

		}
		
		public function exit():void {
			if(LobbyManager.getInstance().bQuickChangeTable){
				LobbyManager.getInstance().bQuickChangeTable = false;
				LobbyManager.getInstance().lobbyView.enableQuick(true);
				
			}else{
				if(LobbyManager.getInstance().lobbyView.toolView.fExitGame!=null)
				{
					LobbyManager.getInstance().lobbyView.toolView.fExitGame();
				}
			}
		}
		
		
	}
}