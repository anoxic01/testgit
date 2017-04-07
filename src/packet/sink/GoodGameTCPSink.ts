module packet.sink {
	export class GoodGameTCPSink implements socket.ITCPSocketSink {
		private vecController	:	ctrl.GameControler[];
		public socketParser		:	SocketParser
		public  hasKey			:	 boolean = false		//已获得接口桌 KEY	
		private pkey			:	string ="";
		public subscibeNum		:	number =5;				//一次订阅数量
		public myTableType		:	number;
		public bShowDialog		:	 boolean = false;
		public enterTableId		:	number;
		private bConnectFail	:    boolean = false;

		public constructor() {
			this.socketParser = new SocketParser();
			this.socketParser.setCData(define.PacketDefine.GAME);
			this.vecController = new Array<ctrl.GameControler>();
		}

		
		public  destroy():void{
			this.clear();
			if (this.vecController){
				while(this.vecController.length>0){
					this.vecController.shift();
				}
				this.vecController=null;
			}
			if(this.socketParser){
				this.socketParser=null;
			}
			
			
			manager.LobbyManager.getInstance().bEnterGame=false;
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
			console.log("好路连接成功... _uSocketID:",_uSocketID );
			
			for (var i:number= 0; i < this.vecController.length; i++) {
			//	vecController[i].proxy = vecController[i].proxy;
				this.vecController[i].onConnect();
			}
			
			manager.NetWorkManager.getInstance().iGameNetWorkStatus = define.Define.GameConnected;
		}
		
		public onCTCPSocketClose(uSocketID:number, cmd:number):void
		{
			console.log("好路百家连接关闭...");
			//重連機制 ,廢棄不用
			/*for (var i:number= 0; i < vecController.length; i++) {
				if( vecController[i] ){
					vecController[i].onConnectClosed();
				}	
			}*/
			
			var _controler:ctrl.GameControler;
			if( this.vecController.length > 0 && this.vecController[0] ){
				_controler = this.vecController[0];
			}
			manager.NetWorkManager.getInstance().checkGameNetWork(	define.Define.GameDisconnect,  _controler );
//			PanelWindowManager.getInstance().showPannel(Language.sNetWork_Abnormal_Game , gameClosed );
		
		}
		
		public onCTCPSocketError(iFail:number):void
		{
			
					
			var _controler:ctrl.GameControler;
			if( this.vecController.length > 0 && this.vecController[0] ){
				_controler = this.vecController[0];
			}
			if( iFail == socket.SocketDefine.CONNECT_FAIL || iFail == socket.SocketDefine.SOCKET_SECURITY_ERROR ) {
				console.log(this,"游戏连接错误..."+iFail);
				console.log("游戏连接错误..."+iFail);
				manager.NetWorkManager.getInstance().checkGameNetWork(	define.Define.GameConnectFailed,  _controler );
				this.bConnectFail=true;
			}
//			NetWorkManager.getInstance().checkGameNetWork(	Define.GameConnectFailed,  _controler );
			
		}
		
		public onCTCPSocketRead(_uSocketID:number, _tagTCPData:socket.ITagTCPData):void
		{
			var len:number=this.vecController.length
			//var len:number= 1
			//var _oData : Object = vecController[0].proxy.socketParser.onPacketData( _tagTCPData );
			var _oData = this.socketParser.onPacketData( _tagTCPData );
//			console.log("pkey"+pkey);
			if (_oData==null){
				console.log("GOOD SINK 解析数据为NULL ")
				return;
			}
			
	//	console.log("好路返回::::----------------"+_oData.str)
		
			
			//if (_oData.Type == 0x0F){ 
			//		console.log("百家+好路消息 :"+_uSocketID, _oData.Type+" 收到数据："+_oData.str);
			//}
			if (_oData.Type == 0x01 && this.hasKey==false){
				manager.TimeManager.getInstance().stop(define.PacketDefine.ENTER_TABLE.toString(16));
				if (_oData.Ret>0){
					this.loginErrHandler(_oData.Ret);
					manager.LobbyManager.getInstance().destroyNewGame();
//					if (vecController[0]){
//						vecController[0].root.destroy();
//					}
					return;
				}
				
				
				//取第一次秘钥,订阅多桌
				console.log(_uSocketID+"好路接口桌登入成功:", "消息ID:"+_oData.Type+"台号ID:"+_oData.TableInfo.TableID+" 收到数据："+_oData.str);
				this.socketParser.setPData(_oData.PlayerInfo.PrivateKey);
				this.socketParser.setBData(_oData.PlayerInfo.BroadcastKey);
				this.socketParser.setAData(_oData.PlayerInfo.AgentKey);
				this.pkey = _oData.PlayerInfo.PrivateKey;
				this.enterTableId = _oData.TableInfo.TableID;
				this.myTableType = _oData.TableInfo.TableType

				console.log("好路多桌::::KEY: "+this.pkey)
				var arr:any[] = manager.ActionManager.getInstance().multiTalbes;
				var myIndex:number=arr.indexOf(this.enterTableId );
				if (myIndex>-1){
					arr.splice(myIndex,1);
				}
//				if (arr.length>0){
//					manager.LobbyManager.getInstance().sendSubscription(arr);
//					ActionManager.getInstance().multiTalbes=[];
//				}
//				manager.LobbyManager.getInstance().sendSubscriptionAll(subscibeNum);	//取消一次订阅所有好路
				this.hasKey = true;
	//			manager.LobbyManager.getInstance().bLoginMultiTable = true
				//return;
				
				
			}else if(_oData.Type == 0x01){
				manager.TimeManager.getInstance().stop(define.PacketDefine.ENTER_TABLE.toString(16));
				if(_oData.Ret>0){
					return ;
				}
				console.log("GOOD SOCKET 登入成功:台号ID:"+_oData.TableInfo.TableID+" 收到数据："+_oData.str);
			}

			for (var i:number= 0; i < len; i++) 
			{
				//var _oData : Object = vecController[i].proxy.socketParser.onPacketData( _tagTCPData );
				var bSelf: boolean = this.isMyTable(_oData);
				var protocolClass : iface.IProtocolStruct = this.getProtocol(_oData,bSelf);
				if (protocolClass)
				{
					protocolClass.initControler( this.vecController[i] );
					protocolClass.execute( _oData );
					if(bSelf)break; //本桌在0号位Ctrl ,只执行一次
				}else{
				//	console.log("MULTI 收到的数据，找不到对应处理协议..." + _oData.Type );
				}
			}
		}
		
		/**
		 *是否本桌消息 
		 * @return 
		 * 
		 */
		private isMyTable(_oData): boolean{
			var bSelf: boolean;
			var _tableId:number= 0;
			
				switch(_oData.Type)
				{
					case define.PacketDefine.S_ENTER_TABLE:
						//0x01
						_tableId = _oData.TableInfo.TableID;
						break;
					case define.PacketDefine.S_TABLE_STATUS:
						//状态0x09
						_tableId = _oData.TableUpdateInfo.TableID
						break;
					case define.PacketDefine.S_REAL_TIME_BET_INFO:
						//彩池 统计0x0A
						_tableId = _oData.StaticsInfo.TableID
						break;
					default:
						if (_oData.hasOwnProperty("TableID")){
							
							_tableId = _oData.TableID;
						}
						break;
				}
			
			
			if (_tableId==this.enterTableId  || _tableId==0){
				
				return true;
			}
			
			return false;
		}
		private getProtocol(_oData,bSelf: boolean):iface.IProtocolStruct{
			 let protocolClass : iface.IProtocolStruct;
			 
			 if (bSelf){
				protocolClass  = manager.PacketManager.getInstance().getProtocolClass( define.PacketDefine.GAME_BAC, _oData.Type,myTableType)
			 }else{
				 protocolClass  = manager.PacketManager.getInstance().getProtocolClass(define.PacketDefine.GAME_BAC_GOOD,_oData.Type)
			 }
			 return protocolClass;
		}
		
		
		
		public clear():void
		{
			this.hasKey = false;
			this.socketParser = null;
			while (this.vecController.length>0){
				this.vecController.pop();
			}
			
		}
		
		private loginErrHandler(ret:number):void{
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
			else if( ret == define.GameDefine.ENTER_SERVER_BUSY ){			//服務器忙碌中,重連
				
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
			}else if( ret == define.GameDefine.ENTER_DIFFERENT_IP ){	
				msg=manager.LobbyManager.getInstance().getLanguageString( language.Language.sWarn_Account_Limit) ;
			}else if( ret == define.GameDefine.ENTER_SEAT_FAIL ){	
				msg=manager.LobbyManager.getInstance().getLanguageString( language.Language.sEnterSeatFail) ;
			}else if( ret == define.GameDefine.ENTER_PERMISSION_30 ){	
				msg=manager.LobbyManager.getInstance().getLanguageString( language.Language.sWarn_Ret_14) ;
			}
			
			manager.LobbyManager.getInstance().lobbyView.hideLoading();
			
			if( msg != "" ){
				var dialog_2:PanelDialog_2 = manager.LobbyManager.getInstance().showDialog_2( msg, false, true , exit );
				dialog_2.fDestroyRun = exit;
			}

		}
		
		public exit():void {
			if(manager.LobbyManager.getInstance().bQuickChangeTable){
				manager.LobbyManager.getInstance().bQuickChangeTable = false;
				manager.LobbyManager.getInstance().lobbyView.enableQuick(true);
				
			}else{
				if(manager.LobbyManager.getInstance().lobbyView.toolView.fExitGame!=null)
				{
					manager.LobbyManager.getInstance().lobbyView.toolView.fExitGame();
				}
			}
		}
		
		
	}
}