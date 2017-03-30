module lobby.view.panel {
	export class PanelLimitBet  extends PanelWindow{
//		private m_bg				:	BitmapScale9Grid;
		private m_btnOk				:	SingleButtonMC;
		private m_btnNo				:	SingleButtonMC;
		private m_btnClose			:	SingleButtonMC;
		
		private m_current			:	SingleButtonMC;
		private m_currentID			:	number;
		private m_struct			:	TableStruct;
		private m_sName				:	String;
		private m_items 			: 	<SingleButtonMC>;
		
		private m_sTableName		:	String;
		
		private m_listStruct 		:	 BetLimitListStruct;
		
		public constructor(_struct:TableStruct,$bShake: boolean=false) {
		
			super($bShake);
			m_struct = 	_struct;
			
			m_mcAsset = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_PANEL,"Limit_Bet_Panel_Asset");
			this.addChild(m_mcAsset);
			
//			m_bg = new BitmapScale9Grid(new Window_Bg_Asset(),1,12,30,12,30);
//			m_mcAsset.addChildAt(m_bg,0);
//			m_bg.setSize(1162,600);
//			m_bg.x = -582;
//			m_bg.y = -294;
			
//			m_mcAsset.x = -int(1162*0.5);
//			m_mcAsset.y = -int(588*0.5);
			
			m_items = new <SingleButtonMC>();
			m_listStruct = LobbyData.getInstance().getBetLimitByGameID(m_struct.GameID);
			
			var bmp : Bitmap;
			var _len : int = m_listStruct.vecBetLimitList.length>6?6:m_listStruct.vecBetLimitList.length;
			
			m_mcAsset.gotoAndStop(_len);
			m_mcHot = m_mcAsset.mc.mc_hot;
			nAssetWidth = m_mcAsset.width;
			nAssetHeight = m_mcAsset.height;
			var _item : SingleButtonMC;
			for (var i:number= 0; i < _len; i++) 
			{
				bmp = new Bitmap();
				_item =  new SingleButtonMC(m_mcAsset.mc.getChildByName("mc_"+String(i)) as MovieClip, function(event:MouseEvent):void{
					select(m_items[event.currentTarget.ID]);
				});
				m_items.push(_item);
				_item.mcAsset.ID = i;
				_item.mcAsset.mc_label.mc_pos.addChild(bmp);
				_item.ID = m_listStruct.vecBetLimitList[i].ID;
				bmp.filters = [];
				bmp.bitmapData = BitmapManager.getInstance().numberChip.conversionMinus(m_listStruct.vecBetLimitList[i].MinLimit, m_listStruct.vecBetLimitList[i].MaxLimit);
				bmp.smoothing = true;
				
				if(_struct.BetLimitID_Panel>0){
					if(m_items[i].ID == _struct.BetLimitID_Panel){
						m_current = m_items[i];
						m_current.setSelectedStatus(true);
						m_currentID = m_items[i].ID;
					}
				}else{
					if(m_items[i].ID == _struct.BetLimitID){
						m_current = m_items[i];
						m_current.setSelectedStatus(true);
						m_currentID = m_items[i].ID;
					}
				}
				
			}
			
			if(m_current==null){
				m_current = m_items[0];
				m_current.setSelectedStatus(true);
				m_currentID = m_items[0].ID;
			}
			
			
			m_btnOk = new SingleButtonMC(m_mcAsset.mc.mc_ok, function(event:MouseEvent):void{
//				LobbyManager.getInstance().lobbyView.hideQuickTableList();
				_struct.BetLimitID = m_current.ID;
				_struct.BetLimitID_Panel = m_current.ID;
				
				LobbyManager.getInstance().hideLimitBet(false);
				
				if(LobbyManager.getInstance().exitLevel == Define.EXIT_GAME){
					if(LobbyManager.getInstance().IsCanChangeTable()){
						if(isSelf()){
							LobbyManager.getInstance().showDialog(LobbyManager.getInstance().getLanguageString(Language.sHaveIn)+ m_sTableName + "!");
						}else{
							changeGame();
						}
					}
				}else{
					if(IsAllowToLogin()){
						LobbyManager.getInstance().enterGame(_struct);
					}
				}
				
				SoundManager.getInstance().play(SoundPackage.sEnterGame);
				
//				if(LobbyManager.getInstance().lobbyView.quickThemeList.currentTheme){
//					LobbyManager.getInstance().lobbyView.quickThemeList.currentTheme.setSelect(false);
//				}
			});
			
			m_btnNo = new SingleButtonMC(m_mcAsset.mc.mc_no, function(event:MouseEvent):void{
				SoundManager.getInstance().play(SoundPackage.sClick_Tools);
				LobbyManager.getInstance().hideLimitBet();
			});
			m_btnClose = new SingleButtonMC(m_mcAsset.mc.mc_close, function(event:MouseEvent):void{
				SoundManager.getInstance().play(SoundPackage.sClick_Tools);
				LobbyManager.getInstance().hideLimitBet();
			});
			
			switch(m_struct.GameID){
				case GameDefine.BAC:
					if(m_struct.TableType==Define.TABLE_TYPE_ROBOT){
						m_sName = Language.sGame_Name_Bac_Rebot;
					}else{
						m_sName = Language.sGame_Name_Bac;
					}
					break;
				case GameDefine.SIC:
					m_sName = Language.sGame_Name_Sic;
					break;
				case GameDefine.ROU:
					m_sName = Language.sGame_Name_Rou;
					break;
				case GameDefine.DTF:
					m_sName = Language.sGame_Name_DTF;
					break;
			}
			
			onChangeLanguage();
		}
		
		 public destroy():void{
			if(m_current){
				m_current = null;
			}
//			if(m_bg){
//				if(m_bg.parent){
//					m_bg.parent.removeChild(m_bg);
//				}
//				m_bg.dispose();
//				m_bg = null;
//			}
			if(m_btnOk){
				m_btnOk.destroy();
				m_btnOk = null;
			}
			if(m_btnNo){
				m_btnNo.destroy();
				m_btnNo = null;
			}
			if(m_btnClose){
				m_btnClose.destroy();
				m_btnClose = null;
			}
			
			var _len : int = m_items.length;
			var _item : SingleButtonMC;
			for (var i:number= 0; i < _len; i++) 
			{
				_item = m_items.pop() as SingleButtonMC;
				_item.destroy();
				
			}
			if(_item){
				_item = null;
			}
			m_items = null;
		}
		
		private exitGame():void{
//			PopupManager.getInstance().fCloseWindowComplete = showGame;
			
			if(LobbyManager.getInstance().lobbyView.toolView.fExitGame != null){
				LobbyManager.getInstance().lobbyView.toolView.fExitGame();
			}	
	


		}
		
		private select(_item:SingleButtonMC):void{
			SoundManager.getInstance().play(SoundPackage.sClick_Tools);
			if(m_current != _item){
				m_current.setSelectedStatus(false);
				m_current = _item;
				m_current.setSelectedStatus(true);
				m_currentID = _item.ID;
			}
		}
		
		 public onChangeLanguage():void{
			for (var i:number= 0; i < m_items.length; i++) 
			{
				m_items[i].mcAsset.mc_label.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			}
			
//			var _listStruct : BetLimitListStruct = LobbyData.getInstance().getBetLimitByGameID(m_struct.GameID);
//			for (var i:number= 0; i < 5; i++) 
//			{
//				if(_listStruct.vecBetLimitList.length>i){
//					m_items[i].mcAsset.tf_label.text = LobbyManager.getInstance().getLanguageString(m_sName) + " " + m_struct.TableID ;//+ LobbyManager.getInstance().getLanguageString(Language.sTable);
//				}
//			}
			
			m_mcAsset.mc.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);// LobbyManager.getInstance().getLanguageString(Language.sLimitSelect);
			(m_mcAsset.mc.mc_ok.mc_label as MovieClip).gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			(m_mcAsset.mc.mc_no.mc_label as MovieClip).gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			
			switch(LobbyManager.getInstance().lobbyAuth.Lang)
			{
				case 0:
					m_sTableName = m_struct.TableName_CN;
					break;
				case 1:
					m_sTableName = m_struct.TableName_TW;
					break;
				case 2:
					m_sTableName = m_struct.TableName_EN;
					break;
			}
			
		}
		
		protected isSelf(): boolean{
			if(LobbyManager.getInstance().currentTableStruct){
				return LobbyManager.getInstance().currentTableStruct.TableID==m_struct.TableID;
			}
			return false;
		}
		private changeGame():void{
			switch(m_struct.GameID){
				case GameDefine.BAC:
				case GameDefine.DTF:
					m_struct.joinTableType = JoinTableType.NORMAL_PAIR_TABLE_SEAT;
					break;
				case GameDefine.ROU:
				case GameDefine.SIC:
					m_struct.joinTableType = JoinTableType.SINGEL;
					break;
			}
			
			LobbyManager.getInstance().bQuickChangeTable = true;
			NetWorkManager.getInstance().iGameNetWorkStatus = Define.GameTransTable;
//			LobbyManager.getInstance().changeGame();
			LobbyManager.getInstance().enterGame(m_struct);
		}
		
		protected IsAllowToLogin(): boolean{
			var len : int = m_listStruct.vecBetLimitList.length>6?6:m_listStruct.vecBetLimitList.length;
			var limitStruct:BetLimitStruct;
			var bAllow :  boolean
			var str : String;
			
			for(var i:number= 0 ; i < len ; i++){
				if(m_listStruct.vecBetLimitList[i].ID == m_currentID){
					limitStruct = m_listStruct.vecBetLimitList[i];
					
					bAllow = (Player.getInstance().nCoin >= (limitStruct.EnterTbLimit))?true:false;
					str = LobbyManager.getInstance().getLanguageString(Language.sTableLogin_NoMoney) + "(" + String(limitStruct.EnterTbLimit) + ")" + LobbyManager.getInstance().getLanguageString(Language.sTableLogin_CAN_NOT_ENTER);
					
					if(!bAllow){
						LobbyManager.getInstance().showDialog(str,null,null,true);
					}
					
					return  bAllow;
				}
			}
			
			return  true;
		}
		
	}
}