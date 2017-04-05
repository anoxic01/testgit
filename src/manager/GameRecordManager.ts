module manager {
	export class GameRecordManager {
		private static m_instance		:	GameRecordManager;
		
		public betRecordPannel			;
		public betResultPannel			;
		public videoPlayPannel			;	
		
		private nSendTime				:	number;
		private nReceiveTime			:	number;
		
		public constructor() {
		}

		public static getInstance() : GameRecordManager
		{
			if (!this.m_instance)
			{
				this.m_instance = new GameRecordManager();
			}
			return this.m_instance;
		}
		
		public initialize():void {
//			Security.loadPolicyFile( UrlManager.getInstance().getRootDomain()+"/crossdomain.xml" );
			
			this.betRecordPannel = new lobby.view.gameRecord.BetRecordUI(ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_BET_CORD,"Link_BetRecord_Asset")  );
			this.betResultPannel = new lobby.view.gameRecord.BetResultUI( ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_BET_CORD,"Link_Bet_Result_Asset")  );
			this.videoPlayPannel = new lobby.view.gameRecord.VideoPlayUI(ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_BET_CORD,"Link_Record_Video_Asset") );
		}
		
		/**
		 * 取得下注紀錄數據
		 */
		public sendGetGameRecord(  _iStartNo:number, _iRequestDataSize:number, _iGameID:number, _sStartDateTime:string, _sEndDateTime:string ):void {
			//新方式
			var _gameRecordApiStruct = new lobby.model.struct.GameRecordApiStruct();
			_gameRecordApiStruct.SearchCondition.GameID = _iGameID;
			_gameRecordApiStruct.SearchCondition.StartDateTime = _sStartDateTime;
			_gameRecordApiStruct.SearchCondition.EndDateTime = _sEndDateTime;
			_gameRecordApiStruct.SearchCondition.RequestDataSize = _iRequestDataSize;
			_gameRecordApiStruct.SearchCondition.StartRowNo = _iStartNo;
			_gameRecordApiStruct.SearchCondition.UserID = lobby.model.Player.getInstance().iPlayerID;
			_gameRecordApiStruct.SearchCondition.Identity = LobbyManager.getInstance().lobbyAuth.Identity;
			var _class  = getDefinitionByName("KeyTest");
			if(_class){
				var data  = new _class();
				data.fGameRecordComplete = this.receiveWebAPIData;
				data.fGameRecordError = this.betRecordPannel.checkBetCord;
				if(LobbyManager.getInstance().lobbyAuth.Identity==2){
					data.getGameRecord(_gameRecordApiStruct,config.TemConfig.getInstance().TryAccountApiUrl+"/Connect/GetGameRecord");
				}else{
					data.getGameRecord(_gameRecordApiStruct, manager.UrlManager.getInstance().webApiUrl()+"/GameApi/GetGameRecord");
				}
				
			}
			
		}
		
		/**
		 * 接收資料
		 */
		public receiveWebAPIData(_oData):void {
			this.nReceiveTime = egret.getTimer()/1000;
			//console.log("收到的時間(秒): " , nReceiveTime );			
			//console.log("花費時間(秒): " , (nReceiveTime - nSendTime) );
			
			var _gameRecordApiStruct = new lobby.model.struct.GameRecordApiStruct();
				_gameRecordApiStruct.init( _oData );
			this.betRecordPannel.updateUI(_gameRecordApiStruct);	

		}
		
		/**
		 * 取得下注紀錄
		 */
		public getBetRecord( _iStartNo:number, _iRequestDataSize:number, _iGameID:number, _sStartDateTime:string, _sEndDateTime:string  ):void {
			console.log(this,"getBetRecord::>>" + (_iStartNo).toString() + "_" + (_iRequestDataSize).toString() + "_" + (_iGameID).toString() + "+" + _sStartDateTime + "_" + _sEndDateTime + "_" + (Player.getInstance().iPlayerID).toString());
			
			this.sendGetGameRecord( _iStartNo, _iRequestDataSize, _iGameID, _sStartDateTime, _sEndDateTime );
			
			this.nSendTime = egret.getTimer() /1000 ;
			this.betRecordPannel.hideClickLight();				
				//console.log("送出去的時間(秒): " , nSendTime );
		}
		
		
		/**
		 * 顯示下注紀錄 面板
		 */
		public showBetRecordPannel():void {
			if(this.betRecordPannel==null){
				this.betRecordPannel = new lobby.view.gameRecord.BetRecordUI(ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_BET_CORD,"Link_BetRecord_Asset")  );
			}
			
			this.betRecordPannel.enabled = true;
			this.betRecordPannel.x = LobbyManager.getInstance().stage.stageWidth * 0.5 + LobbyManager.getInstance().uWindowIndex * 50;
			this.betRecordPannel.y = LobbyManager.getInstance().stage.stageHeight * 0.5 + LobbyManager.getInstance().uWindowIndex * 50;
			
			LobbyManager.getInstance().lobbyView.spShieldLayer.alpha = 1;
			LobbyManager.getInstance().lobbyView.spShieldLayer.graphics.beginFill(0x000000,0.5);
			LobbyManager.getInstance().lobbyView.spShieldLayer.graphics.drawRect(0,0,LobbyManager.getInstance().stage.stageWidth,LobbyManager.getInstance().stage.stageHeight+100);
			LobbyManager.getInstance().lobbyView.spShieldLayer.graphics.endFill();
			LobbyManager.getInstance().lobbyView.spWindowLayer.addChild( this.betRecordPannel );	
//			PopupManager.getInstance().show( _betRecordView );
			this.betRecordPannel.scaleX = define.Define.SCALE_MIN;
			this.betRecordPannel.scaleY = define.Define.SCALE_MIN;
			TweenLite.to(this.betRecordPannel,define.Define.SPEED,{scaleX:1, scaleY:1, onComplete:function():void{
				if(this.betRecordPannel){
					this.betRecordPannel.searchBetGameRecord();	//要下注紀錄
				}
			}});
//			SoundManager.getInstance().play(sound.SoundPackage.sPopupPanel);
			
//			this.betRecordPannel.addKeyBoardListen(LobbyManager.getInstance().lobbyView.spWindowLayer.stage);
		}
		
		/**
		 * 隱藏下注紀錄面板
		 */
		public hideBetRecordPannel(_bTween: boolean=true):void {
			if(this.betRecordPannel==null){
				return;
			}
			
			if(_bTween){
				TweenLite.to(this.betRecordPannel,define.Define.SPEED,{scaleX:define.Define.SCALE_MIN, scaleY:define.Define.SCALE_MIN, onComplete:function():void{
					TweenLite.to(LobbyManager.getInstance().lobbyView.spShieldLayer, define.Define.SPEED, {alpha:0, onComplete:function():void{
						LobbyManager.getInstance().lobbyView.spShieldLayer.graphics.clear();
					}});
					if(this.betRecordPannel){
						if(this.betRecordPannel.parent){
							this.betRecordPannel.parent.removeChild(this.betRecordPannel);
						}
						this.betRecordPannel.destroy();
					}
				}});
			}else{
				LobbyManager.getInstance().lobbyView.spShieldLayer.graphics.clear();
				if(this.betRecordPannel){
					if(this.betRecordPannel.parent){
						this.betRecordPannel.parent.removeChild(this.betRecordPannel);
					}
					this.betRecordPannel.destroy();
				}
			}
			this.hideBetResultPannel(_bTween);
			this.hideVideoPlayPannel(_bTween);
		}
		
		/**
		 * 顯示下注紀錄 子單
		 */
		public showBetResultPannel(_complexGameRecordStruct):void {
			
			if(this.betResultPannel==null){
				this.betResultPannel = new lobby.view.gameRecord.BetResultUI( ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_BET_CORD,"Link_Bet_Result_Asset")  );
			}
			
			this.betResultPannel.x = LobbyManager.getInstance().stage.stageWidth * 0.5 + 3 * 50;
			this.betResultPannel.y = LobbyManager.getInstance().stage.stageHeight * 0.5 + 3 * 50;
			this.betResultPannel.updateUI(_complexGameRecordStruct);
			
			LobbyManager.getInstance().lobbyView.spWindowLayer.addChild( this.betResultPannel );
		
//			PopupManager.getInstance().show( _betResultUI );
			this.betResultPannel.scaleX = define.Define.SCALE_MIN;
			this.betResultPannel.scaleY = define.Define.SCALE_MIN;
			TweenLite.to(this.betResultPannel,define.Define.SPEED,{scaleX:1, scaleY:1, onComplete:function():void{
//				GameRecordManager.getInstance().this.betRecordPannel.searchBetGameRecord();	//要下注紀錄
			}});
			SoundManager.getInstance().play(sound.SoundPackage.sPopupPanel);
		}
		
		/**
		 * 隱藏下注紀錄 子單
		 */
		public hideBetResultPannel(_bTween: boolean=true):void {
			if(this.betResultPannel==null){
				return;
			}
			if(_bTween){
				TweenLite.to(this.betResultPannel,define.Define.SPEED,{scaleX:define.Define.SCALE_MIN, scaleY:define.Define.SCALE_MIN, onComplete:function():void{
					if(this.betResultPannel){
						if(this.betResultPannel.parent){
							this.betResultPannel.parent.removeChild(this.betResultPannel);
						}
						this.betResultPannel.destroy();
					}
				}});
			}else{
				if(this.betResultPannel){
					if(this.betResultPannel.parent){
						this.betResultPannel.parent.removeChild(this.betResultPannel);
						this.betResultPannel.destroy();
					}
					this.betResultPannel = null;
				}
			}
		}		
		
		public showVideoPlayPannel(_complexGameRecordStruct):void {
			if(this.videoPlayPannel==null){
				this.videoPlayPannel = new lobby.view.gameRecord.VideoPlayUI(ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_BET_CORD,"Link_Record_Video_Asset") );
			}
			this.videoPlayPannel.x = LobbyManager.getInstance().stage.stageWidth * 0.5 //+ 4 * 50;
			this.videoPlayPannel.y = LobbyManager.getInstance().stage.stageHeight * 0.5 // + 4 * 50;
			this.videoPlayPannel.reset();
			this.videoPlayPannel.updateUI(_complexGameRecordStruct);
			
			LobbyManager.getInstance().lobbyView.spWindowLayer.addChild( this.videoPlayPannel );

			
//			PopupManager.getInstance().show( _videoPlayUI );
			this.videoPlayPannel.scaleX = define.Define.SCALE_MIN;
			this.videoPlayPannel.scaleY = define.Define.SCALE_MIN;
			TweenLite.to(this.videoPlayPannel,define.Define.SPEED,{scaleX:1, scaleY:1});
			SoundManager.getInstance().play(sound.SoundPackage.sPopupPanel);
		}
		public hideVideoPlayPannel(_bTween: boolean=true):void {
			if(this.videoPlayPannel==null){
				return;
			}
			if(_bTween){
//				PopupManager.getInstance().close( _videoPlayUI );
				TweenLite.to(this.videoPlayPannel,define.Define.SPEED,{scaleX:define.Define.SCALE_MIN, scaleY:define.Define.SCALE_MIN, onComplete:function():void{
					if(this.videoPlayPannel){
						if(this.videoPlayPannel.parent){
							this.videoPlayPannel.parent.removeChild(this.videoPlayPannel);
						}
						this.videoPlayPannel.destroy();
					}
				}});
			}else{
				if(this.videoPlayPannel){
					if(this.videoPlayPannel.parent){
						this.videoPlayPannel.parent.removeChild(this.videoPlayPannel);
					}
					this.videoPlayPannel.destroy();
				}
				
			}
			
		}	
		
		/*public scaleVideoPannel( _bBig: boolean ):void {
			var _videoPlayUI:PanelWindow = GameRecordManager.getInstance().this.videoPlayPannel;
			if(_bBig ){								//放大
				LobbyManager.getInstance().stage.displayState = StageDisplayState.FULL_SCREEN; 
			}else if( !_bBig  ){					//縮小
				LobbyManager.getInstance().stage.displayState = StageDisplayState.NORMAL; 
			}
		}*/
		
		
		public onChangeLanguage():void {
			if( this.betRecordPannel ){
				this.betRecordPannel.onChangeLanguage();
			}
			if( this.betResultPannel ){
				this.betResultPannel.onChangeLanguage();
			}
			if( this.videoPlayPannel ){
				this.videoPlayPannel.onChangeLanguage();
			}
			
		}
	}
}