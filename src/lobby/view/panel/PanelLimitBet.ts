module lobby.view.panel {
	export class PanelLimitBet  extends PanelWindow{
//		private m_bg				:	BitmapScale9Grid;
		private m_btnOk				:	ui.button.SingleButtonMC;
		private m_btnNo				:	ui.button.SingleButtonMC;
		
		private m_current			:	ui.button.SingleButtonMC;
		private m_currentID			:	number;
		private m_struct			;
		private m_sName				:	string;
		private m_items 			: 	ui.button.SingleButtonMC[];
		
		private m_sTableName		:	string;
		
		private m_listStruct 		;
		
		public constructor(_struct,$bShake: boolean=false) {
		
			super($bShake);
			this.m_struct = 	_struct;
			
			this.m_mcAsset = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_PANEL,"Limit_Bet_Panel_Asset");
			this.addChild(this.m_mcAsset);
			
//			m_bg = new BitmapScale9Grid(new Window_Bg_Asset(),1,12,30,12,30);
//			this.m_mcAsset.addChildAt(m_bg,0);
//			m_bg.setSize(1162,600);
//			m_bg.x = -582;
//			m_bg.y = -294;
			
//			this.m_mcAsset.x = -int(1162*0.5);
//			this.m_mcAsset.y = -int(588*0.5);
			
			this.m_items = new Array<ui.button.SingleButtonMC>();
			this.m_listStruct = model.LobbyData.getInstance().getBetLimitByGameID(this.m_struct.GameID);
			
			var bmp ;
			var _len  = this.m_listStruct.vecBetLimitList.length>6?6:this.m_listStruct.vecBetLimitList.length;
			
			this.m_mcAsset.gotoAndStop(_len);
			this.m_mcHot = this.m_mcAsset.mc.mc_hot;
			this.nAssetWidth = this.m_mcAsset.width;
			this.nAssetHeight = this.m_mcAsset.height;
			var _item : ui.button.SingleButtonMC;
			for (var i:number= 0; i < _len; i++) 
			{
				bmp = new egret.Bitmap();
				_item =  new ui.button.SingleButtonMC(this.m_mcAsset.mc.getChildByName("mc_"+String(i)), function(event:MouseEvent):void{
					this.select(this.m_items[event.currentTarget.ID]);
				});
				this.m_items.push(_item);
				_item.mcAsset.ID = i;
				_item.mcAsset.mc_label.mc_pos.addChild(bmp);
				_item.ID = this.m_listStruct.vecBetLimitList[i].ID;
				bmp.filters = [];
				bmp.bitmapData = manager.BitmapManager.getInstance().numberChip.conversionMinus(this.m_listStruct.vecBetLimitList[i].MinLimit, this.m_listStruct.vecBetLimitList[i].MaxLimit);
				bmp.smoothing = true;
				
				if(_struct.BetLimitID_Panel>0){
					if(this.m_items[i].ID == _struct.BetLimitID_Panel){
						this.m_current = this.m_items[i];
						this.m_current.setSelectedStatus(true);
						this.m_currentID = this.m_items[i].ID;
					}
				}else{
					if(this.m_items[i].ID == _struct.BetLimitID){
						this.m_current = this.m_items[i];
						this.m_current.setSelectedStatus(true);
						this.m_currentID = this.m_items[i].ID;
					}
				}
				
			}
			
			if(this.m_current==null){
				this.m_current = this.m_items[0];
				this.m_current.setSelectedStatus(true);
				this.m_currentID = this.m_items[0].ID;
			}
			
			
			this.m_btnOk = new ui.button.SingleButtonMC(this.m_mcAsset.mc.mc_ok, function(event:MouseEvent):void{
//				manager.LobbyManager.getInstance().lobbyView.hideQuickTableList();
				_struct.BetLimitID = this.m_current.ID;
				_struct.BetLimitID_Panel = this.m_current.ID;
				
				manager.LobbyManager.getInstance().hideLimitBet(false);
				
				if(manager.LobbyManager.getInstance().exitLevel == define.Define.EXIT_GAME){
					if(manager.LobbyManager.getInstance().IsCanChangeTable()){
						if(this.isSelf()){
							manager.LobbyManager.getInstance().showDialog(manager.LobbyManager.getInstance().getLanguageString(language.Language.sHaveIn)+ this.m_sTableName + "!");
						}else{
							this.changeGame();
						}
					}
				}else{
					if(this.IsAllowToLogin()){
						manager.LobbyManager.getInstance().enterGame(_struct);
					}
				}
				
				manager.SoundManager.getInstance().play(sound.SoundPackage.sEnterGame);
				
//				if(manager.LobbyManager.getInstance().lobbyView.quickThemeList.currentTheme){
//					manager.LobbyManager.getInstance().lobbyView.quickThemeList.currentTheme.setSelect(false);
//				}
			});
			
			this.m_btnNo = new ui.button.SingleButtonMC(this.m_mcAsset.mc.mc_no, function(event:MouseEvent):void{
				manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
				manager.LobbyManager.getInstance().hideLimitBet();
			});
			this.m_btnClose = new ui.button.SingleButtonMC(this.m_mcAsset.mc.mc_close, function(event:MouseEvent):void{
				manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
				manager.LobbyManager.getInstance().hideLimitBet();
			});
			
			switch(this.m_struct.GameID){
				case define.GameDefine.BAC:
					if(this.m_struct.TableType==define.Define.TABLE_TYPE_ROBOT){
						this.m_sName = language.Language.sGame_Name_Bac_Rebot;
					}else{
						this.m_sName = language.Language.sGame_Name_Bac;
					}
					break;
				case define.GameDefine.SIC:
					this.m_sName = language.Language.sGame_Name_Sic;
					break;
				case define.GameDefine.ROU:
					this.m_sName = language.Language.sGame_Name_Rou;
					break;
				case define.GameDefine.DTF:
					this.m_sName = language.Language.sGame_Name_DTF;
					break;
			}
			
			this.onChangeLanguage();
		}
		
		 public destroy():void{
			 super.destroy();

			if(this.m_current){
				this.m_current = null;
			}
//			if(m_bg){
//				if(m_bg.parent){
//					m_bg.parent.removeChild(m_bg);
//				}
//				m_bg.dispose();
//				m_bg = null;
//			}
			if(this.m_btnOk){
				this.m_btnOk.destroy();
				this.m_btnOk = null;
			}
			if(this.m_btnNo){
				this.m_btnNo.destroy();
				this.m_btnNo = null;
			}
			
			var _len  = this.m_items.length;
			var _item : ui.button.SingleButtonMC;
			for (var i:number= 0; i < _len; i++) 
			{
				_item = this.m_items.pop() as ui.button.SingleButtonMC;
				_item.destroy();
				
			}
			if(_item){
				_item = null;
			}
			this.m_items = null;
		}
		
		private exitGame():void{
//			PopupManager.getInstance().fCloseWindowComplete = showGame;
			
			if(manager.LobbyManager.getInstance().lobbyView.toolView.fExitGame != null){
				manager.LobbyManager.getInstance().lobbyView.toolView.fExitGame();
			}	
	


		}
		
		private select(_item:ui.button.SingleButtonMC):void{
			manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
			if(this.m_current != _item){
				this.m_current.setSelectedStatus(false);
				this.m_current = _item;
				this.m_current.setSelectedStatus(true);
				this.m_currentID = _item.ID;
			}
		}
		
		 public onChangeLanguage():void{
			for (var i:number= 0; i < this.m_items.length; i++) 
			{
				this.m_items[i].mcAsset.mc_label.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			}
			
//			var _listStruct : BetLimitListStruct = LobbyData.getInstance().getBetLimitByGameID(this.m_struct.GameID);
//			for (var i:number= 0; i < 5; i++) 
//			{
//				if(_listStruct.vecBetLimitList.length>i){
//					this.m_items[i].mcAsset.tf_label.text = manager.LobbyManager.getInstance().getLanguageString(this.m_sName) + " " + this.m_struct.TableID ;//+ manager.LobbyManager.getInstance().getLanguageString(language.Language.sTable);
//				}
//			}
			
			this.m_mcAsset.mc.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);// manager.LobbyManager.getInstance().getLanguageString(language.Language.sLimitSelect);
			(this.m_mcAsset.mc.mc_ok.mc_label ).gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			(this.m_mcAsset.mc.mc_no.mc_label ).gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			
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
		
		protected isSelf(): boolean{
			if(manager.LobbyManager.getInstance().currentTableStruct){
				return manager.LobbyManager.getInstance().currentTableStruct.TableID==this.m_struct.TableID;
			}
			return false;
		}
		private changeGame():void{
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
			
			manager.LobbyManager.getInstance().bQuickChangeTable = true;
			manager.NetWorkManager.getInstance().iGameNetWorkStatus = define.Define.GameTransTable;
//			manager.LobbyManager.getInstance().changeGame();
			manager.LobbyManager.getInstance().enterGame(this.m_struct);
		}
		
		protected IsAllowToLogin(): boolean{
			var len  = this.m_listStruct.vecBetLimitList.length>6?6:this.m_listStruct.vecBetLimitList.length;
			var limitStruct;
			var bAllow :  boolean
			var str : string;
			
			for(var i:number= 0 ; i < len ; i++){
				if(this.m_listStruct.vecBetLimitList[i].ID == this.m_currentID){
					limitStruct = this.m_listStruct.vecBetLimitList[i];
					
					bAllow = (model.Player.getInstance().nCoin >= (limitStruct.EnterTbLimit))?true:false;
					str = manager.LobbyManager.getInstance().getLanguageString(language.Language.sTableLogin_NoMoney) + "(" + String(limitStruct.EnterTbLimit) + ")" + manager.LobbyManager.getInstance().getLanguageString(language.Language.sTableLogin_CAN_NOT_ENTER);
					
					if(!bAllow){
						manager.LobbyManager.getInstance().showDialog(str,null,null,true);
					}
					
					return  bAllow;
				}
			}
			
			return  true;
		}
		
	}
}