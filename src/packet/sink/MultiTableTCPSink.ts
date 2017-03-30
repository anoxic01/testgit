module packet.sink {
	export class MultiTableTCPSink {
		private vecController	:	ctrl.GameControler[];
		public socketParser		:	packet.SocketParser;
		public  hasKey			:	boolean = false			//已获得接口桌 KEY	
		private pkey			:	String ="";
		public subscibeNum		:	number =16;				//一次订阅数量
		
		public constructor() {
			this.vecController = new Array<ctrl.GameControler>();
		}

		
		public destroy():void {
			while (this.vecController.length>0){
				this.vecController.pop();
			}
			this.vecController=null;
			this.socketParser=null;
		}
		
		public addController(_controller:ctrl.GameControler):void{
			this.vecController.push(_controller);
		}
		
		public removeController(_controller:ctrl.GameControler):void{
			if(_controller){
				var index:number=this.vecController.indexOf(_controller);
				if(index > -1){
					this.vecController.splice(index, 1);
				}
			}
		}
		
		public onCTCPSocketConnecting(_uSocketID:number):void
		{
		}
		
		public onCTCPSocketConnected(_uSocketID:number):void
		{
			console.log("多桌连接成功... _uSocketID:",_uSocketID );
			console.log(this,"多桌连接成功...");
			
			for (var i:number= 0; i < this.vecController.length; i++) {
				this.vecController[i].proxy = this.vecController[i].proxy;
				this.vecController[i].onConnect();
			}
			
//			var struct : TableStruct = LobbyData.getInstance().getMultiTableStruct(define.GameDefine.BAC);
			manager.LobbyManager.getInstance().sendLoginMultiTable();
			manager.NetWorkManager.getInstance().iGameNetWorkStatus = define.Define.GameConnected;
		}
		
		public onCTCPSocketClose(uSocketID:number, cmd:number):void
		{
			console.log(this,"多桌连接关闭...");
			//激活退出按钮
			manager.LobbyManager.getInstance().lobbyView.toolView.btnExit.enabled = true;
			
			for (var i:number= 0; i < this.vecController.length; i++) {
				if( this.vecController[i] ){
					this.vecController[i].onConnectClosed();
				}	
			}

				manager.NetWorkManager.getInstance().checkGameNetWork(define.Define.GameMultiTableDisconnect );	
		}
		
		
		public onCTCPSocketRead(_uSocketID:number, _tagTCPData:socket.ITagTCPData):void
		{
			
			//var len:number= 1
			//var _oData : Object = vecController[0].proxy.socketParser.onPacketData( _tagTCPData );
			var _oData : any = this.socketParser.onPacketData( _tagTCPData );
//			console.log("pkey"+pkey);
			if (_oData==null){
				console.log("MULTI 解析数据为NULL ");
				return;
			}
			//if(_oData.TableID ==32 ||_oData.TableID == manager.LobbyManager.getInstance().multiTableId){
//				console.log("MULTI :"+_uSocketID, _oData.Type+" 收到数据："+_oData.str);
//			
			//}
			
		/*	if (_oData.SN == ClientPacketSN.instance().Login_Game_Check_SN){
				manager.LobbyManager.getInstance().runMultiHeart();
				return;
			}*/
			
			if(_oData.Type == define.PacketDefine.S_Heart){
				manager.LobbyManager.getInstance().nRevServerTimeM = getTimer();
				return;
			}
			
			if(_oData.Type == define.PacketDefine.C_Heart){
				var _heartStruct = new model.struct.HeartStruct();
				_heartStruct.PlayerID = _oData.PlayerID;
				_heartStruct.Identity = _oData.Identity;
				manager.LobbyManager.getInstance().responseMultiHeartPkt();
//				console.log("回传多桌心跳")
				return;
			}
			
			
			
			if (_oData.Type != 0x09){ 

			}
//			else{
//				if (_oData.TableUpdateInfo.GameStatus == GameStatus.SETTLED && _oData.TableUpdateInfo.CountDownTime == 0){
//					console.log("MULTI :"+_uSocketID, _oData.Type+" 收到数据："+_oData.str);
//					console.log("MULTI SINK结束取消订阅"+_oData.TableUpdateInfo.TableID);
//					manager.LobbyManager.getInstance().sendUnsubscribe([_oData.TableUpdateInfo.TableID]);
//				}
//			}
			
			if (_oData.Type == 0x01 && this.hasKey==false){
				manager.TimeManager.getInstance().stop(define.PacketDefine.ENTER_TABLE.toString(16));
				//_oData.Ret=24
				if (_oData.Ret>0){
					console.log("入口桌登入错误"+_oData.Ret)
					this.loginErrHandler(_oData.Ret);
					manager.LobbyManager.getInstance().destroyMultiSocket();
					if (manager.LobbyManager.getInstance().bQuickToMultiTable==false){
						manager.LobbyManager.getInstance().lobbyView.themeList.enable(true);
					}else{
						manager.LobbyManager.getInstance().bQuickToMultiTable=false;
						manager.LobbyManager.getInstance().lobbyView.quickThemeList.currentTheme.setSelect(false);
						manager.LobbyManager.getInstance().lobbyView.quickThemeList.enable(true);
					}
					
					return;
				}
				
//				console.log(this,"MULTI 多桌接口桌登入成功:Table ID::" + String(_oData.TableInfo.TableID));
				//取第一次秘钥,订阅多桌
//				console.log("MULTI 多桌接口桌登入成功:"+_uSocketID, "消息ID:"+_oData.Type+"台号ID:"+_oData.TableInfo.TableID+" 收到数据："+_oData.str);
				this.socketParser.setPData(_oData.PlayerInfo.PrivateKey);
				this.socketParser.setBData(_oData.PlayerInfo.BroadcastKey);
				this.socketParser.setAData(_oData.PlayerInfo.AgentKey);
				this.pkey = _oData.PlayerInfo.PrivateKey;
				var arr:any[] = manager.ActionManager.getInstance().multiTalbes;
				manager.LobbyManager.getInstance().loginMultiEnterOK();
	//			manager.LobbyManager.getInstance().sendUnsubscribe([_oData.TableInfo.TableID]);
				if (arr.length>0){
					manager.ActionManager.getInstance().multiTalbes=[];
				}
				this.hasKey = true;
				manager.LobbyManager.getInstance().bLoginMultiTable = true;
				manager.LobbyManager.getInstance().lobbyView.hideLoading();
				manager.LobbyManager.getInstance().showMultiTable();
				//return;
				
				
			}else if(_oData.Type == 0x01 && _oData.TableInfo){
				manager.TimeManager.getInstance().stop(define.PacketDefine.ENTER_TABLE .toString(16));
				if (_oData.Ret>0){
					console.log(_oData.TableInfo.TableID+"订阅桌错误"+_oData.Ret)
					//return
				}
				//_oData.TableInfo=null 报错
//				console.log(_oData.TableInfo.TableID+"订阅多桌成功："+_oData.str)
//				console.log(this,"MULTI 登入成功:"+String(_uSocketID)+ "消息ID:"+String(_oData.Type)+"台号ID:"+String(_oData.TableInfo.TableID)+" 收到数据："+String(_oData.str));
			}
			
			var Type : number;
			if(_oData.Type!=null){
				Type = _oData.TableType;
			//	console.log("------------------ _oData.TableType --------",_oData.TableType);
			}else{
				if(_oData.TableInfo){
				//	Type = _oData.TableInfo.TableType;
					console.log(this,"------------------ _oData.TableInfo.TableType --------"+String(_oData.TableInfo.TableType));
				}else{
					Type = 0;
					console.log(this,"------------------ 缺少TableType的协议： --------"+String(_oData.Type));
				}
			}
			
			var len:number=this.vecController.length;
			for (var i:number= 0; i < len; i++) 
			{
				
				//var _oData : Object = vecController[i].proxy.socketParser.onPacketData( _tagTCPData );
				
				var protocolClass : iface.IProtocolStruct = manager.PacketManager.getInstance().getProtocolClass( define.PacketDefine.MULTI, _oData.Type, Type);
				if (protocolClass)
				{
					
					protocolClass.initControler( this.vecController[i] );
					protocolClass.execute( _oData );
				}else{
				//	console.log("MULTI 收到的数据，找不到对应处理协议..." + _oData.Type );
				}
			}
		}
		
		public onCTCPSocketError(iFail:number):void
		{
			console.log("游戏连接错误..."+iFail);
			
			//激活退出按钮
			manager.LobbyManager.getInstance().lobbyView.toolView.btnExit.enabled = true;
			
			for (var i:number= 0; i < this.vecController.length; i++) {
				if( this.vecController[i]){
					this.vecController[i].onConnectFailed(iFail);
				}
			}
			//連接失敗
			if( iFail == socket.SocketDefine.CONNECT_FAIL || iFail == socket.SocketDefine.SOCKET_SECURITY_ERROR){
				manager.NetWorkManager.getInstance().checkGameNetWork(	define.Define.GameMultiTableFailed);	
			}
		}
		
		
		private loginErrHandler(ret:number):void{
			//激活退出按钮
			manager.LobbyManager.getInstance().lobbyView.toolView.btnExit.enabled = true;
			var msg:string= "";
			var bOneBtn: boolean = false;
			if( ret == define.GameDefine.ENTER_FAIL) {
				msg=manager.LobbyManager.getInstance().getLanguageString( language.Language.sEnterFail ) ;
				
			}
			else if (  ret == define.GameDefine.ENTER_INVALID ) {
				msg=manager.LobbyManager.getInstance().getLanguageString( language.Language.sEnterInvalid ) ;
			}
			else if ( ret == define.GameDefine.ENTER_NO_AVAILABLE_SEAT ) {
				msg=manager.LobbyManager.getInstance().getLanguageString( language.Language.sNoSeat );
			}
			else if ( ret == define.GameDefine.ENTER_TABLE_OWNER_EXIST ) {
				msg=manager.LobbyManager.getInstance().getLanguageString( language.Language.sTableOwnerExist ) ;
			}		
			else if ( ret == define.GameDefine.ENTER_JOIN_TB_TYPE_NOT_EXIST) {
				msg=manager.LobbyManager.getInstance().getLanguageString( language.Language.sJoinTbTypeFault ) ;
			}	
			else if ( ret == define.GameDefine.ENTER_JOIN_TB_DATA_INCORRECT) {
				msg=manager.LobbyManager.getInstance().getLanguageString( language.Language.sJoinDataError ) ;
			}	
			else if ( ret == define.GameDefine.ENTER_BALANCE_NOT_ENOUGH) {
				msg=manager.LobbyManager.getInstance().getLanguageString( language.Language.sBalanceNoEnough ) ;
			}	
			else if ( ret == define.GameDefine.ENTER_JOIN_TB_PASSWORD_INVAILD) {
				msg=manager.LobbyManager.getInstance().getLanguageString( language.Language.sEnterPwError ) ;
			}
			else if( ret == define.GameDefine.ENTER_OVER_PLAYERS_LIMIT ){
				msg=manager.LobbyManager.getInstance().getLanguageString( language.Language.sTableLimit ) ;
			}				
			else if ( ret == define.GameDefine.ENTER_TABLE_IS_PRIVATE ) {
				msg=manager.LobbyManager.getInstance().getLanguageString( language.Language.sTablePrivate ) ;
			}
			else if ( ret == define.GameDefine.ENTER_CHARTER_TYPE_IS_NOT_CORRECT ) {
				msg=manager.LobbyManager.getInstance().getLanguageString( language.Language.sCharterTypeError ) ;
				
			}
			else if ( ret == define.GameDefine.ENTER_TIMEOUT ) {
				msg=manager.LobbyManager.getInstance().getLanguageString( language.Language.sTimeOut ) ;
			}
			else if ( ret == define.GameDefine.ENTER_PROTOCOL_VER_MISMATCH ) {
				msg=manager.LobbyManager.getInstance().getLanguageString( language.Language.sProtocolError ) ;
			}	
			else if( ret == define.GameDefine.ENTER_TRY_ACCOUNT_PERMISSION_DENY ){
				msg=manager.LobbyManager.getInstance().getLanguageString( language.Language.sTryAccountDeny ) ;
			}
			else if( ret == define.GameDefine.ENTER_PERMISSION_DENY ){
				msg=manager.LobbyManager.getInstance().getLanguageString( language.Language.sPermissionDeny ) ;
			}
			else if( ret == define.GameDefine.ENTER_MASTER_EXIT ){
				msg=manager.LobbyManager.getInstance().getLanguageString( language.Language.sMasterExit ) ;
				bOneBtn= true;
			}
			else if( ret == define.GameDefine.ENTER_NOT_FINISH ){
				msg=manager.LobbyManager.getInstance().getLanguageString( language.Language.sNotFinish ) ;
			}
			else if( ret == define.GameDefine.ENTER_MAINTAIN ){
				msg=manager.LobbyManager.getInstance().getLanguageString( language.Language.sMaintain ) ;
			}else if( ret == define.GameDefine.ROAD_MAP_ERROR ){
				msg=manager.LobbyManager.getInstance().getLanguageString( language.Language.sMaintenance ) ;
			}
			else if( ret == define.GameDefine.ENTER_SERVER_BUSY ){			//服務器忙碌中,重連2次
				
				var _bRes: boolean = false;
				if( this.vecController.length>0 && this.vecController[0] ){
					_bRes = this.vecController[0].reConnect();
				}
				
				if ( !_bRes ){
					msg=manager.LobbyManager.getInstance().getLanguageString( language.Language.sWarn_Server_Busy ) ;
				}
			} else if( ret == define.GameDefine.ENTER_CLOSED ){	
				msg=manager.LobbyManager.getInstance().getLanguageString( language.Language.sTableClosed ) ;
			}else if( ret == define.GameDefine.ENTER_NOSETTLED ){	
				msg=manager.LobbyManager.getInstance().getLanguageString( language.Language.sNoSettled) ;
			}else if (ret==define.GameDefine.ENTER_MAINTAIN_ALL){
				msg=manager.LobbyManager.getInstance().getLanguageString( language.Language.sLogout_Lobby_All_Maintain) ;
			}else if (ret==define.GameDefine.ENTER_MAINTAIN_THEME){
				msg=manager.LobbyManager.getInstance().getLanguageString( language.Language.sLogout_Lobby_Hall_Maintain) ;
			}else if (ret==define.GameDefine.ENTER_MAINTAIN_TABLE){
				msg=manager.LobbyManager.getInstance().getLanguageString( language.Language.sLogout_Lobby_Table_Maintain) ;
			}else if (ret==define.GameDefine.ENTER_MAINTAIN_AGENT){
				msg=manager.LobbyManager.getInstance().getLanguageString( language.Language.sLogout_Lobby_Agent_Maintain) ;
			}
			else if( ret == define.GameDefine.ENTER_DIFFERENT_IP ){	
				msg=manager.LobbyManager.getInstance().getLanguageString( language.Language.sWarn_Account_Limit) ;
			}else if( ret == define.GameDefine.ENTER_PERMISSION_30 ){	
				msg=manager.LobbyManager.getInstance().getLanguageString( language.Language.sWarn_Ret_14) ;
			}
			
			manager.LobbyManager.getInstance().lobbyView.hideLoading();
			
			if( msg != "" ){
				var dialog_2:panel.PanelDialog_2 = manager.LobbyManager.getInstance().showDialog_2( msg, false, true  );
				//dialog_2.fDestroyRun = exit;
			}
			
		}
		
		
	}
}