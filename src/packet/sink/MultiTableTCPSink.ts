module lobby.sink {
	export class MultiTableTCPSink {
		private var vecController	:	Vector.<GameControler>;
		public var socketParser		:	SocketParser
		public  var hasKey			:	Boolean = false			//已获得接口桌 KEY	
		private var pkey			:	String ="";
		public var subscibeNum		:	int =16;				//一次订阅数量
		
		public constructor() {
			vecController = new Vector.<GameControler>;
		}

		
		public function destroy():void {
			while (vecController.length>0){
				vecController.pop();
			}
			vecController=null;
			socketParser=null;
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
			trace("多桌连接成功... _uSocketID:",_uSocketID );
			Log.getInstance().log(this,"多桌连接成功...");
			
			for (var i:int = 0; i < vecController.length; i++) {
				vecController[i].proxy = vecController[i].proxy;
				vecController[i].onConnect();
			}
			
//			var struct : TableStruct = LobbyData.getInstance().getMultiTableStruct(GameDefine.BAC);
			LobbyManager.getInstance().sendLoginMultiTable();
			NetWorkManager.getInstance().iGameNetWorkStatus = Define.GameConnected;
		}
		
		public function onCTCPSocketClose(uSocketID:int, cmd:int):void
		{
			Log.getInstance().log(this,"多桌连接关闭...");
			//激活退出按钮
			LobbyManager.getInstance().lobbyView.toolView.btnExit.enabled = true;
			
			for (var i:int = 0; i < vecController.length; i++) {
				if( vecController[i] ){
					vecController[i].onConnectClosed();
				}	
			}

				NetWorkManager.getInstance().checkGameNetWork(Define.GameMultiTableDisconnect );	
		}
		
		
		public function onCTCPSocketRead(_uSocketID:int, _tagTCPData:ITagTCPData):void
		{
			
			//var len:int = 1
			//var _oData : Object = vecController[0].proxy.socketParser.onPacketData( _tagTCPData );
			var _oData : Object = socketParser.onPacketData( _tagTCPData );
//			trace("pkey"+pkey);
			if (_oData==null){
				trace("MULTI 解析数据为NULL ");
				return;
			}
			//if(_oData.TableID ==32 ||_oData.TableID == LobbyManager.getInstance().multiTableId){
//				trace("MULTI :"+_uSocketID, _oData.Type+" 收到数据："+_oData.str);
//			
			//}
			
		/*	if (_oData.SN == ClientPacketSN.instance().Login_Game_Check_SN){
				LobbyManager.getInstance().runMultiHeart();
				return;
			}*/
			
			if(_oData.Type == PacketDefine.S_Heart){
				LobbyManager.getInstance().nRevServerTimeM = getTimer();
				return;
			}
			
			if(_oData.Type == PacketDefine.C_Heart){
				var _heartStruct:HeartStruct = new HeartStruct();
				_heartStruct.PlayerID = _oData.PlayerID;
				_heartStruct.Identity = _oData.Identity;
				LobbyManager.getInstance().responseMultiHeartPkt();
//				trace("回传多桌心跳")
				return;
			}
			
			
			
			if (_oData.Type != 0x09){ 

			}
//			else{
//				if (_oData.TableUpdateInfo.GameStatus == GameStatus.SETTLED && _oData.TableUpdateInfo.CountDownTime == 0){
//					trace("MULTI :"+_uSocketID, _oData.Type+" 收到数据："+_oData.str);
//					trace("MULTI SINK结束取消订阅"+_oData.TableUpdateInfo.TableID);
//					LobbyManager.getInstance().sendUnsubscribe([_oData.TableUpdateInfo.TableID]);
//				}
//			}
			
			if (_oData.Type == 0x01 && hasKey==false){
				TimeManager.getInstance().stop(PacketDefine.ENTER_TABLE.toString(16));
				//_oData.Ret=24
				if (_oData.Ret>0){
					trace("入口桌登入错误"+_oData.Ret)
					loginErrHandler(_oData.Ret);
					LobbyManager.getInstance().destroyMultiSocket();
					if (LobbyManager.getInstance().bQuickToMultiTable==false){
						LobbyManager.getInstance().lobbyView.themeList.enable(true);
					}else{
						LobbyManager.getInstance().bQuickToMultiTable=false;
						LobbyManager.getInstance().lobbyView.quickThemeList.currentTheme.setSelect(false);
						LobbyManager.getInstance().lobbyView.quickThemeList.enable(true);
					}
					
					return;
				}
				
//				Log.getInstance().log(this,"MULTI 多桌接口桌登入成功:Table ID::" + String(_oData.TableInfo.TableID));
				//取第一次秘钥,订阅多桌
//				trace("MULTI 多桌接口桌登入成功:"+_uSocketID, "消息ID:"+_oData.Type+"台号ID:"+_oData.TableInfo.TableID+" 收到数据："+_oData.str);
				socketParser.setPData(_oData.PlayerInfo.PrivateKey);
				socketParser.setBData(_oData.PlayerInfo.BroadcastKey);
				socketParser.setAData(_oData.PlayerInfo.AgentKey);
				pkey = _oData.PlayerInfo.PrivateKey;
				var arr:Array = ActionManager.getInstance().multiTalbes;
				LobbyManager.getInstance().loginMultiEnterOK();
	//			LobbyManager.getInstance().sendUnsubscribe([_oData.TableInfo.TableID]);
				if (arr.length>0){
					ActionManager.getInstance().multiTalbes=[];
				}
				hasKey = true;
				LobbyManager.getInstance().bLoginMultiTable = true;
				LobbyManager.getInstance().lobbyView.hideLoading();
				LobbyManager.getInstance().showMultiTable();
				//return;
				
				
			}else if(_oData.Type == 0x01 && _oData.TableInfo){
				TimeManager.getInstance().stop(PacketDefine.ENTER_TABLE .toString(16));
				if (_oData.Ret>0){
					trace(_oData.TableInfo.TableID+"订阅桌错误"+_oData.Ret)
					//return
				}
				//_oData.TableInfo=null 报错
//				trace(_oData.TableInfo.TableID+"订阅多桌成功："+_oData.str)
//				Log.getInstance().log(this,"MULTI 登入成功:"+String(_uSocketID)+ "消息ID:"+String(_oData.Type)+"台号ID:"+String(_oData.TableInfo.TableID)+" 收到数据："+String(_oData.str));
			}
			
			var Type : int;
			if(_oData.Type!=null){
				Type = _oData.TableType;
			//	trace("------------------ _oData.TableType --------",_oData.TableType);
			}else{
				if(_oData.TableInfo){
				//	Type = _oData.TableInfo.TableType;
					Log.getInstance().log(this,"------------------ _oData.TableInfo.TableType --------"+String(_oData.TableInfo.TableType));
				}else{
					Type = 0;
					Log.getInstance().log(this,"------------------ 缺少TableType的协议： --------"+String(_oData.Type));
				}
			}
			
			var len:int =vecController.length;
			for (var i:int = 0; i < len; i++) 
			{
				
				//var _oData : Object = vecController[i].proxy.socketParser.onPacketData( _tagTCPData );
				
				var protocolClass : IProtocolStruct = PacketManager.getInstance().getProtocolClass( PacketDefine.MULTI, _oData.Type, Type);
				if (protocolClass)
				{
					
					protocolClass.initControler( vecController[i] );
					protocolClass.execute( _oData );
				}else{
				//	trace("MULTI 收到的数据，找不到对应处理协议..." + _oData.Type );
				}
			}
		}
		
		public function onCTCPSocketError(iFail:int):void
		{
			trace("游戏连接错误..."+iFail);
			
			//激活退出按钮
			LobbyManager.getInstance().lobbyView.toolView.btnExit.enabled = true;
			
			for (var i:int = 0; i < vecController.length; i++) {
				if( vecController[i]){
					vecController[i].onConnectFailed(iFail);
				}
			}
			//連接失敗
			if( iFail == SocketDefine.CONNECT_FAIL || iFail == SocketDefine.SOCKET_SECURITY_ERROR){
				NetWorkManager.getInstance().checkGameNetWork(	Define.GameMultiTableFailed);	
			}
		}
		
		
		private function loginErrHandler(ret:int):void{
			//激活退出按钮
			LobbyManager.getInstance().lobbyView.toolView.btnExit.enabled = true;
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
			else if( ret == GameDefine.ENTER_SERVER_BUSY ){			//服務器忙碌中,重連2次
				
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
			}
			else if( ret == GameDefine.ENTER_DIFFERENT_IP ){	
				msg=LobbyManager.getInstance().getLanguageString( Language.sWarn_Account_Limit) ;
			}else if( ret == GameDefine.ENTER_PERMISSION_30 ){	
				msg=LobbyManager.getInstance().getLanguageString( Language.sWarn_Ret_14) ;
			}
			
			LobbyManager.getInstance().lobbyView.hideLoading();
			
			if( msg != "" ){
				var dialog_2:PanelDialog_2 = LobbyManager.getInstance().showDialog_2( msg, false, true  );
				//dialog_2.fDestroyRun = exit;
			}
			
		}
		
		
	}
}