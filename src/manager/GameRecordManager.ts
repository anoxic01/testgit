module manager {
	export class GameRecordManager {
		private static m_instance		:	GameRecordManager;
		
		public betRecordPannel			:	BetRecordUI;
		public betResultPannel			:	BetResultUI;
		public videoPlayPannel			:	VideoPlayUI;	
		
		private nSendTime				:	Number;
		private nReceiveTime			:	Number;
		
		public constructor() {
		}

		public static getInstance() : GameRecordManager
		{
			if (!m_instance)
			{
				m_instance = new GameRecordManager(new Singleton());
			}
			return m_instance;
		}
		
		public initialize():void {
//			Security.loadPolicyFile( UrlManager.getInstance().getRootDomain()+"/crossdomain.xml" );
			
			betRecordPannel = new BetRecordUI(ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_BET_CORD,"Link_BetRecord_Asset")  );
			betResultPannel = new BetResultUI( ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_BET_CORD,"Link_Bet_Result_Asset")  );
			videoPlayPannel = new VideoPlayUI(ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_BET_CORD,"Link_Record_Video_Asset") );
		}
		
		/**
		 * 取得下注紀錄數據
		 */
		public sendGetGameRecord(  _iStartNo:number, _iRequestDataSize:number, _iGameID:number, _sStartDateTime:string, _sEndDateTime:string ):void {
			//新方式
			var _gameRecordApiStruct:GameRecordApiStruct = new GameRecordApiStruct();
			_gameRecordApiStruct.SearchCondition.GameID = _iGameID;
			_gameRecordApiStruct.SearchCondition.StartDateTime = _sStartDateTime;
			_gameRecordApiStruct.SearchCondition.EndDateTime = _sEndDateTime;
			_gameRecordApiStruct.SearchCondition.RequestDataSize = _iRequestDataSize;
			_gameRecordApiStruct.SearchCondition.StartRowNo = _iStartNo;
			_gameRecordApiStruct.SearchCondition.UserID = Player.getInstance().iPlayerID;
			_gameRecordApiStruct.SearchCondition.Identity = LobbyManager.getInstance().lobbyAuth.Identity;
			var _class : Class = getDefinitionByName("KeyTest") as Class;
			if(_class){
				var data : * = new _class();
				data.fGameRecordComplete = receiveWebAPIData;
				data.fGameRecordError = betRecordPannel.checkBetCord;
				if(LobbyManager.getInstance().lobbyAuth.Identity==2){
					data.getGameRecord(_gameRecordApiStruct,TemConfig.getInstance().TryAccountApiUrl+"/Connect/GetGameRecord");
				}else{
					data.getGameRecord(_gameRecordApiStruct,UrlManager.getInstance().webApiUrl()+"/GameApi/GetGameRecord");
				}
				
			}
			
		}
		
		/**
		 * 接收資料
		 */
		public receiveWebAPIData(_oData:Object):void {
			nReceiveTime = getTimer()/1000;
			//console.log("收到的時間(秒): " , nReceiveTime );			
			//console.log("花費時間(秒): " , (nReceiveTime - nSendTime) );
			
			var _gameRecordApiStruct:GameRecordApiStruct = new GameRecordApiStruct();
				_gameRecordApiStruct.init( _oData );
			betRecordPannel.updateUI(_gameRecordApiStruct);	

		}
		
		/**
		 * 取得下注紀錄
		 */
		public getBetRecord( _iStartNo:number, _iRequestDataSize:number, _iGameID:number, _sStartDateTime:string, _sEndDateTime:string  ):void {
			Log.getInstance().log(this,"getBetRecord::>>" + string(_iStartNo) + "_" + string(_iRequestDataSize) + "_" + string(_iGameID) + "+" + _sStartDateTime + "_" + _sEndDateTime + "_" + string(Player.getInstance().iPlayerID));
			
			sendGetGameRecord( _iStartNo, _iRequestDataSize, _iGameID, _sStartDateTime, _sEndDateTime );
			
			nSendTime = getTimer() /1000 ;
			betRecordPannel.hideClickLight();				
				//console.log("送出去的時間(秒): " , nSendTime );
		}
		
		
		/**
		 * 顯示下注紀錄 面板
		 */
		public showBetRecordPannel():void {
			if(betRecordPannel==null){
				betRecordPannel = new BetRecordUI(ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_BET_CORD,"Link_BetRecord_Asset")  );
			}
			
			betRecordPannel.enabled = true;
			betRecordPannel.x = LobbyManager.getInstance().stage.stageWidth * 0.5 + LobbyManager.getInstance().uWindowIndex * 50;
			betRecordPannel.y = LobbyManager.getInstance().stage.stageHeight * 0.5 + LobbyManager.getInstance().uWindowIndex * 50;
			
			LobbyManager.getInstance().lobbyView.spShieldLayer.alpha = 1;
			LobbyManager.getInstance().lobbyView.spShieldLayer.graphics.beginFill(0x000000,0.5);
			LobbyManager.getInstance().lobbyView.spShieldLayer.graphics.drawRect(0,0,LobbyManager.getInstance().stage.stageWidth,LobbyManager.getInstance().stage.stageHeight+100);
			LobbyManager.getInstance().lobbyView.spShieldLayer.graphics.endFill();
			LobbyManager.getInstance().lobbyView.spWindowLayer.addChild( betRecordPannel );	
//			PopupManager.getInstance().show( _betRecordView );
			betRecordPannel.scaleX = Define.SCALE_MIN;
			betRecordPannel.scaleY = Define.SCALE_MIN;
			TweenLite.to(betRecordPannel,Define.SPEED,{scaleX:1, scaleY:1, onComplete:function():void{
				if(betRecordPannel){
					betRecordPannel.searchBetGameRecord();	//要下注紀錄
				}
			}});
//			SoundManager.getInstance().play(SoundPackage.sPopupPanel);
			
//			betRecordPannel.addKeyBoardListen(LobbyManager.getInstance().lobbyView.spWindowLayer.stage);
		}
		
		/**
		 * 隱藏下注紀錄面板
		 */
		public hideBetRecordPannel(_bTween: boolean=true):void {
			if(betRecordPannel==null){
				return;
			}
			
			if(_bTween){
				TweenLite.to(betRecordPannel,Define.SPEED,{scaleX:Define.SCALE_MIN, scaleY:Define.SCALE_MIN, onComplete:function():void{
					TweenLite.to(LobbyManager.getInstance().lobbyView.spShieldLayer, Define.SPEED, {alpha:0, onComplete:function():void{
						LobbyManager.getInstance().lobbyView.spShieldLayer.graphics.clear();
					}});
					if(betRecordPannel){
						if(betRecordPannel.parent){
							betRecordPannel.parent.removeChild(betRecordPannel);
						}
						betRecordPannel.destroy();
					}
				}});
			}else{
				LobbyManager.getInstance().lobbyView.spShieldLayer.graphics.clear();
				if(betRecordPannel){
					if(betRecordPannel.parent){
						betRecordPannel.parent.removeChild(betRecordPannel);
					}
					betRecordPannel.destroy();
				}
			}
			hideBetResultPannel(_bTween);
			hideVideoPlayPannel(_bTween);
		}
		
		/**
		 * 顯示下注紀錄 子單
		 */
		public showBetResultPannel(_complexGameRecordStruct: ComplexGameRecordStruct):void {
			
			if(betResultPannel==null){
				betResultPannel = new BetResultUI( ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_BET_CORD,"Link_Bet_Result_Asset")  );
			}
			
			betResultPannel.x = LobbyManager.getInstance().stage.stageWidth * 0.5 + 3 * 50;
			betResultPannel.y = LobbyManager.getInstance().stage.stageHeight * 0.5 + 3 * 50;
			betResultPannel.updateUI(_complexGameRecordStruct);
			
			LobbyManager.getInstance().lobbyView.spWindowLayer.addChild( betResultPannel );
		
//			PopupManager.getInstance().show( _betResultUI );
			betResultPannel.scaleX = Define.SCALE_MIN;
			betResultPannel.scaleY = Define.SCALE_MIN;
			TweenLite.to(betResultPannel,Define.SPEED,{scaleX:1, scaleY:1, onComplete:function():void{
//				GameRecordManager.getInstance().betRecordPannel.searchBetGameRecord();	//要下注紀錄
			}});
			SoundManager.getInstance().play(SoundPackage.sPopupPanel);
		}
		
		/**
		 * 隱藏下注紀錄 子單
		 */
		public hideBetResultPannel(_bTween: boolean=true):void {
			if(betResultPannel==null){
				return;
			}
			if(_bTween){
				TweenLite.to(betResultPannel,Define.SPEED,{scaleX:Define.SCALE_MIN, scaleY:Define.SCALE_MIN, onComplete:function():void{
					if(betResultPannel){
						if(betResultPannel.parent){
							betResultPannel.parent.removeChild(betResultPannel);
						}
						betResultPannel.destroy();
					}
				}});
			}else{
				if(betResultPannel){
					if(betResultPannel.parent){
						betResultPannel.parent.removeChild(betResultPannel);
						betResultPannel.destroy();
					}
					betResultPannel = null;
				}
			}
		}		
		
		public showVideoPlayPannel(_complexGameRecordStruct: ComplexGameRecordStruct):void {
			if(videoPlayPannel==null){
				videoPlayPannel = new VideoPlayUI(ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_BET_CORD,"Link_Record_Video_Asset") );
			}
			videoPlayPannel.x = LobbyManager.getInstance().stage.stageWidth * 0.5 //+ 4 * 50;
			videoPlayPannel.y = LobbyManager.getInstance().stage.stageHeight * 0.5 // + 4 * 50;
			videoPlayPannel.reset();
			videoPlayPannel.updateUI(_complexGameRecordStruct);
			
			LobbyManager.getInstance().lobbyView.spWindowLayer.addChild( videoPlayPannel );

			
//			PopupManager.getInstance().show( _videoPlayUI );
			videoPlayPannel.scaleX = Define.SCALE_MIN;
			videoPlayPannel.scaleY = Define.SCALE_MIN;
			TweenLite.to(videoPlayPannel,Define.SPEED,{scaleX:1, scaleY:1});
			SoundManager.getInstance().play(SoundPackage.sPopupPanel);
		}
		public hideVideoPlayPannel(_bTween: boolean=true):void {
			if(videoPlayPannel==null){
				return;
			}
			if(_bTween){
//				PopupManager.getInstance().close( _videoPlayUI );
				TweenLite.to(videoPlayPannel,Define.SPEED,{scaleX:Define.SCALE_MIN, scaleY:Define.SCALE_MIN, onComplete:function():void{
					if(videoPlayPannel){
						if(videoPlayPannel.parent){
							videoPlayPannel.parent.removeChild(videoPlayPannel);
						}
						videoPlayPannel.destroy();
					}
				}});
			}else{
				if(videoPlayPannel){
					if(videoPlayPannel.parent){
						videoPlayPannel.parent.removeChild(videoPlayPannel);
					}
					videoPlayPannel.destroy();
				}
				
			}
			
		}	
		
		/*public scaleVideoPannel( _bBig: boolean ):void {
			var _videoPlayUI:PanelWindow = GameRecordManager.getInstance().videoPlayPannel;
			if(_bBig ){								//放大
				LobbyManager.getInstance().stage.displayState = StageDisplayState.FULL_SCREEN; 
			}else if( !_bBig  ){					//縮小
				LobbyManager.getInstance().stage.displayState = StageDisplayState.NORMAL; 
			}
		}*/
		
		
		public onChangeLanguage():void {
			if( betRecordPannel ){
				betRecordPannel.onChangeLanguage();
			}
			if( betResultPannel ){
				betResultPannel.onChangeLanguage();
			}
			if( videoPlayPannel ){
				videoPlayPannel.onChangeLanguage();
			}
			
		}
	}
}