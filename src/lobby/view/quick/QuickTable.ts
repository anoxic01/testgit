module lobby.view.quick {
	export class QuickTable extends BSprite {
		
		protected m_mcAsset					;							//房间资源
		protected m_mcTableName				:	any;									//桌子名称
		protected m_bmpTableID				:	egret.Bitmap;								//桌子序号
		protected m_glow					:	egret.MovieClip;							//发光特效
		protected m_bmpTime					:	egret.Bitmap;								//倒计时
		protected m_bmpTableHint			:	egret.Bitmap;								//桌子提示
		protected m_iCountDown				:	number;								//时间记录
		protected m_struct					;						//数据结构
		public playerTableOwnStatusStruct 	;
		protected m_iGameNo					:	number;								//本地局号
		protected m_iShoeNo					:	number;								//本地靴号
		protected m_limitStruct 			;						//限红数据
		protected m_bNotFinished			:	boolean;							//路纸异常
		protected m_bSettled				:	boolean;
		protected m_bMaintance				:	boolean;				
		protected m_sTableName				:	string;								//桌子名称

		public constructor() {
			super();

			this.m_bmpTime = new egret.Bitmap();
			this.addChild(this.m_bmpTime);
			this.m_bmpTime.y = 5;
			
//			this.buttonMode = true;
			this.addEventListener(mouse.MouseEvent.ROLL_OVER, this.bgOver, this);
			this.addEventListener(mouse.MouseEvent.ROLL_OUT, this.bgOut, this);
		}

		
		public destroy():void{
			
			this.removeEventListener(mouse.MouseEvent.ROLL_OVER, this.bgOver, this);
			this.removeEventListener(mouse.MouseEvent.ROLL_OUT, this.bgOut, this);
//			this.removeEventListener(egret.TouchEvent.TOUCH_TAP, click);
			
			if(this.m_struct){
				this.m_struct = null;
			}
			
			if(this.m_mcTableName){
				if(this.m_mcTableName.parent){
					this.m_mcTableName.parent.removeChild(this.m_mcTableName);
				}
				this.m_mcTableName = null;
			}
			
			if(this.m_bmpTableID){
				if(this.m_bmpTableID.parent){
					this.m_bmpTableID.parent.removeChild(this.m_bmpTableID);
				}
				this.m_bmpTableID = null;
			}
			
			
			if(this.m_bmpTime){
				this.removeChild(this.m_bmpTime);
				this.m_bmpTime = null;
			}
			
			if(this.m_bmpTableHint){
				if(this.m_bmpTableHint.parent){
					this.m_bmpTableHint.parent.removeChild(this.m_bmpTableHint);
				}
				this.m_bmpTableHint = null;
			}
			
			if(this.m_mcAsset){
				this.removeChild(this.m_mcAsset);
				this.m_mcAsset = null;
			}
		}
		
		
		
		public setData(_struct):void{
			this.m_struct = _struct;
			this.m_struct.setQuickTable(this);
			this.m_struct.addEventListener(events.TableEvent.CHANGE, this.onChange);
			
			switch(_struct.TableType){
				case define.Define.TABLE_TYPE_PEEK:
				case define.Define.TABLE_TYPE_CHARTER:
					this.m_limitStruct = model.LobbyData.getInstance().getBetLimitByGL(this.m_struct.GameID, _struct.BetLimitID);
					break;
				
				default:
					this.m_limitStruct = model.LobbyData.getInstance().getBetLimitByGL(this.m_struct.GameID, 1);
					break;
			}
			
		}
		
		//更新提示
		public updateHint(_sKey:string):void{
			this.m_bmpTableHint.bitmapData = manager.BitmapManager.getInstance().getBmpdLanguage(manager.LobbyManager.getInstance().lobbyAuth.Lang, _sKey);
			this.m_bmpTableHint.smoothing = true;
			
			if(_sKey == language.Language.sOwnerLeave && manager.LobbyManager.getInstance().lobbyAuth.Lang == 2){
				this.m_bmpTableHint.scaleX = 0.6;
				this.m_bmpTableHint.scaleY = 0.6;
			}else{
				this.m_bmpTableHint.scaleX = 1;
				this.m_bmpTableHint.scaleY = 1;
			}
			
			this.m_mcAsset.mc_hint.x = ((this.m_mcAsset.mc_mask.width - this.m_bmpTableHint.width)*0.5);
			this.m_mcAsset.mc_hint.y = (this.m_mcAsset.mc_mask.y + (this.m_mcAsset.mc_mask.height - this.m_bmpTableHint.height)*0.5);
			
			this.m_mcAsset.mc_hint.visible = true;
			
			if(_sKey == language.Language.sMaintenance && this.m_mcAsset.mc_alone){
				this.m_mcAsset.mc_alone.visible = false;
			}
		}
		
		protected onChange(event:Event):void
		{
			this.update();
		}
		public update(_bInit: boolean=false):void{
			
		}
		
		//更新计时
		protected updateCountDown():void{
			if(this.m_struct.GameStatus == model.status.GameStatus.BETTING){
				if(this.m_iCountDown!= this.m_struct.CountDownTime){
					this.m_iCountDown = this.m_struct.CountDownTime;
					
					if(this.m_iCountDown<6){
						this.m_bmpTime.bitmapData = manager.BitmapManager.getInstance().numberTimeRed.conversion(this.m_iCountDown);
					}else{
						this.m_bmpTime.bitmapData = manager.BitmapManager.getInstance().numberTime.conversion(this.m_iCountDown);
					}
					this.m_bmpTime.smoothing = true;
				}
			}else{
				this.m_bmpTime.bitmapData = null;
			}
		}
		
		//更新路纸
		public updateRoad(_bInit: boolean):void{
			
		}
		
		//更新彩池
		public updateStaticsInfo():void{
			
		}
		
		//更新维护状态
		public updateMaintenanceStatus():void{
			
		}
		
		//更新按钮状态
		public updateStatus():void{
			
		}
		
		/** 维护状态 **/
		public showMaintain(_bMc: boolean=true):void{
			
		}
		public hideMaintain():void{
			
		}
		
		//重绘路纸
		public initRoad(_sRoad:String):void{
			
		}
		
		public onChangeLanguage():void{
			switch(manager.LobbyManager.getInstance().lobbyAuth.Lang)
			{
				case 0:
					this.m_sTableName = this.m_struct.TableName_CN;
					break;
				case 1:
					this.m_sTableName = this.m_struct.TableName_TW;
					break;
				case 2:
					this.m_sTableName = this.m_struct.TableName_EN;
					break;
			}
		}
		
		get struct():model.struct.TableStruct{
			return this.m_struct;
		}
		
		//游戏进行中
		public isGameStart(): boolean{
			// 如果游戏处于下注或者发牌阶段，说明游戏已经开始
			switch(this.m_struct.GameStatus){
				case model.status.GameStatus.BETTING:
				case model.status.GameStatus.DEALING:
				case model.status.GameStatus.SETTLING:
					return true;
			}
			return false;
		}
		
		protected isHaveDealer(): boolean{
			if(this.m_struct.DealerLoginID==null || this.m_struct.DealerLoginID==""){
				return false;
			}
			return true;
		}
		
		protected isNotFinish(): boolean{
			return  <boolean>(this.m_struct.GameStatus==model.status.GameStatus.NOT_FINISHED);
		}
		
				
		protected bgOver(event:MouseEvent):void
		{
			this.m_glow.visible = true;
//			SoundManager.getInstance().play(SoundPackage.sLobbyMouseOver);
		}
		
		protected bgOut(event:MouseEvent):void
		{
			this.m_glow.visible = false;
		}
		
		protected isSelf(): boolean{
			if(manager.LobbyManager.getInstance().currentTableStruct){
				return manager.LobbyManager.getInstance().currentTableStruct.TableID==this.m_struct.TableID;
			}
			return false;
		}
		
		
		protected isSupportTrial(): boolean{
			
			switch(this.m_struct.TableType){
				case define.Define.TABLE_TYPE_NORMAL:
				case define.Define.TABLE_TYPE_SPEEDY:
				case define.Define.TABLE_TYPE_ROBOT:
				case define.Define.TABLE_TYPE_DTF:
				case define.Define.TABLE_TYPE_ROU:
				case define.Define.TABLE_TYPE_SIC:	
				case define.GameDefine.MACHINE_BAC:
					return true;
			}
			
			return false;
		}
		
		
		
		protected IsAllowToLogin(_bAlone: boolean=false): boolean{
			var bAllow :  boolean;
			var _str : string;
			if(this.m_limitStruct){
				var nCoin : Number = model.Player.getInstance().nCoin;
				bAllow = (nCoin >= (this.m_limitStruct.EnterTbLimit))?true:false;
				if(_bAlone){
					_str = manager.LobbyManager.getInstance().getLanguageString(language.Language.sTableLogin_NoMoney) + "(" + String(this.m_limitStruct.EnterTbLimit) + ")" + manager.LobbyManager.getInstance().getLanguageString(language.Language.sCannotCharter);
				}else{
					_str = manager.LobbyManager.getInstance().getLanguageString(language.Language.sTableLogin_NoMoney) + "(" + String(this.m_limitStruct.EnterTbLimit) + ")" + manager.LobbyManager.getInstance().getLanguageString(language.Language.sTableLogin_CAN_NOT_ENTER);
				}
				
				if(!bAllow){
					manager.LobbyManager.getInstance().showDialog(_str,null,null,true);
				}
			}else{
				bAllow = true;
			}
			
			return  bAllow;
		}
		
		protected  changeGame():void{
			switch(this.m_struct.GameID){
				case define.GameDefine.BAC:
				case define.GameDefine.DTF:
					this.m_struct.joinTableType = model.type.JoinTableType.NORMAL_PAIR_TABLE_SEAT;
					break;
				case define.GameDefine.ROU:
				case define.GameDefine.SIC:
					this.m_struct.joinTableType = model.type.JoinTableType.SINGEL;
					break;
			}
			this.enterGame();
		}
		
		protected enterGame():void{
			//屏蔽退出按钮
			manager.LobbyManager.getInstance().lobbyView.toolView.btnExit.enabled = false;
			
			manager.LobbyManager.getInstance().bQuickChangeTable = true;
			manager.NetWorkManager.getInstance().iGameNetWorkStatus = define.Define.GameTransTable;
//			LobbyManager.getInstance().changeGame();
			this.m_struct.BetLimitID = 1;
			manager.LobbyManager.getInstance().enterGame(this.m_struct);
		}
		
		protected needPwd(_struct):void{
			if(_struct.IsNeedPwd){
				manager.LobbyManager.getInstance().showTableEnterPwd(_struct,	this.enterGame);
			}else{
				this.enterGame();
				//				LobbyManager.getInstance().lobbyView.hideQuickTableList();
				//				LobbyManager.getInstance().showGame(_struct);
			}
		}



	}
}