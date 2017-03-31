module manager {
	export class PacketManager {
		
		public injects				:	Dictionary;
		private m_packetMap			:	Dictionary;
		
		private static m_instance	:	PacketManager;
		
		public static getInstance():PacketManager{
			
			if(m_instance == null){
				
				m_instance = new PacketManager(new Singleton());
				
			}
			return m_instance;
		}
		
		public constructor() {
			injects = {};
				m_packetMap = {};
				m_packetMap[PacketDefine.LOBBY] = {};
				
				m_packetMap[PacketDefine.LOBBY][PacketDefine.S_ANNOUNCELIST] = S_Lobby_Announcement_Pkt;
				m_packetMap[PacketDefine.LOBBY][PacketDefine.S_LOGIN_IN] = S_Lobby_Login_Pkt;
				m_packetMap[PacketDefine.LOBBY][PacketDefine.S_LOGIN_OUT] = S_Lobby_Logout_Pkt;
				m_packetMap[PacketDefine.LOBBY][PacketDefine.S_CHANGE_CURRENCY] = S_Lobby_Update_PlayerBalance_Pkt;
				m_packetMap[PacketDefine.LOBBY][PacketDefine.S_UPDATE_TABLE_INFO] = S_Lobby_Update_Table_Pkt;
				m_packetMap[PacketDefine.LOBBY][PacketDefine.S_UPDATE_DEALER_INFO ] = S_Lobby_Update_Dealer_Info_Pkt;
				m_packetMap[PacketDefine.LOBBY][PacketDefine.S_UPDATE_MARQUEE ] = S_Lobby_Update_Marquee_Pkt;
				m_packetMap[PacketDefine.LOBBY][PacketDefine.S_CLEAR_MARQUEE ] = S_Lobby_Clear_Marquee_Pkt;
				m_packetMap[PacketDefine.LOBBY][PacketDefine.S_CAN_ENTER_TABLE_STATUS] = S_Lobby_Can_Enter_Table_Status_Pkt;
				m_packetMap[PacketDefine.LOBBY][PacketDefine.S_LOBBY_INFO] = S_Lobby_Lobby_Info_Pkt;
				m_packetMap[PacketDefine.LOBBY][PacketDefine.S_DEPUTY_LOGIN ] 		= S_Lobby_Gunners_Status_Pkt;
				m_packetMap[PacketDefine.LOBBY][PacketDefine.S_Lobby_Theme_Subscribe ] = S_Lobby_Theme_Subscribe;
//				//this.m_packetMap[PacketDefine.LOBBY][PacketID.S_GET_HOT_TABLE ] = updateHotTable;
//				
				
//				//this.protocolMap[PacketDefine.LOBBY][PacketID.S_BOSS_TRANS_TABLE ] = onBossDeputyTransTable;
//				this.m_packetMap[PacketDefine.LOBBY][PacketDefine.S_BOSS_CANCEL_DEPUTY ] = onBossCancelDeputy;
//				this.m_packetMap[PacketDefine.LOBBY][PacketDefine.S_DEPUTY_LOGIN ] = onDeputyLogin;
				this.m_packetMap[PacketDefine.LOBBY][PacketDefine.S_GOOD_ROAD ] = S_Lobby_GoodRoad_Pkt;
				this.m_packetMap[PacketDefine.LOBBY][PacketDefine.S_UPDATE_LOBBY_INFO ] = S_Lobby_Update_LobbyInfo_Pkt;
//				this.m_packetMap[PacketDefine.LOBBY][PacketDefine.S_GET_CHIPS ] = onGetChips;
				
				m_packetMap[PacketDefine.LOBBY][PacketDefine.S_MultiTable_Entry] = S_MultiTable_Entry_Pkt;
				
				
				m_packetMap[PacketDefine.GAME] = {};
				m_packetMap[PacketDefine.GAME_BAC] = {};
				m_packetMap[PacketDefine.GAME_DTF] = {};
				m_packetMap[PacketDefine.GAME_SIC] = {};
				m_packetMap[PacketDefine.GAME_ROU] = {};
				m_packetMap[Define.TABLE_TYPE_ROBOT] = {};
				m_packetMap[PacketDefine.GAME_BAC_GOOD] = {};
				m_packetMap[PacketDefine.MULTI] = {};
				
//				this.m_packetMap[PacketDefine.GAME][PacketDefine.S_ENTER_TABLE ] = S_Game_Login_Pkt;
//				//this.m_packetMap[DataStructure.GAME][PacketID.S_CHANGE_BET_MODE ] = changeBetMode;
//				//this.m_packetMap[DataStructure.GAME][PacketID.S_LAST_GAME ] = notifyLastGame;
//				this.m_packetMap[PacketDefine.GAME][PacketDefine.S_TABLE_SEAT_UPDATE ] = onTableSeatUpdate;
//				this.m_packetMap[PacketDefine.GAME][PacketDefine.S_SET_TABLE_SEAT ] = onSetTableSeat;
//				this.m_packetMap[PacketDefine.GAME][PacketDefine.S_RESERVED_TABLE ] = onReservedTable;
//				this.m_packetMap[PacketDefine.GAME][PacketDefine.S_RESERVED_TABLE_OPERATION ] = onReservedTableOpeation;
//				//this.m_packetMap[DataStructure.GAME][PacketID.S_MUTLI_TABLE_SET_PAGE ] = onMutliTableSetPage;
//				this.m_packetMap[PacketDefine.GAME][PacketDefine.PEEK_PROGRESS ] = onPeekProgress;
//				this.m_packetMap[PacketDefine.GAME][PacketDefine.MUTLI_TABLE_REQ ] = onSubscriptionMultiTable;
//				
//				
//				
//				this.m_packetMap[PacketDefine.GAME][PacketDefine.S_ERROR_MSG ] = onExceptionError;
//				this.m_packetMap[PacketDefine.GAME][PacketDefine.S_TABLE_PAUSE ] = onTablePause;
//				this.m_packetMap[PacketDefine.GAME][PacketDefine.S_PLAYER_IDLE_INFO ] = playerIdle;
//				
//				this.m_packetMap[PacketDefine.GAME][PacketDefine.S_BET_INFO_AND_DEAL_INFO ] = onBetAndDealInfo;
//				
//				this.m_packetMap[PacketDefine.LOBBY][PacketDefine.S_REAL_TIME_BET_INFO ] = S_Lobby_Real_Time_Bet_Info_Pkt;  //改成接大廳的
//				//this.m_packetMap[PacketDefine.GAME][PacketID.S_REAL_TIME_BET_INFO ] = onRealTimeInfo;
//				
//				this.m_packetMap[PacketDefine.GAME][PacketDefine.S_EXIT_TABLE ] = S_Multi_Table_Exit_Pkt;
//				this.m_packetMap[PacketDefine.GAME][PacketDefine.S_TABLE_STATUS ] = onTableStatus;
//				this.m_packetMap[PacketDefine.GAME][PacketDefine.S_BET_INFO ] = onBetRequest;
//				this.m_packetMap[PacketDefine.GAME][PacketDefine.S_DEAL_INFO ] = onDealInfo;
//				this.m_packetMap[PacketDefine.GAME][PacketDefine.S_WIN_INFO ] = onWinResult;
				this.m_packetMap[PacketDefine.LOBBY][PacketDefine.S_SET_CHIP ] = S_CustomChip_Pkt;
//				this.m_packetMap[PacketDefine.GAME][PacketDefine.S_UPDATE_BET_INFO ] = onUpdateBetInfo;
//				this.m_packetMap[PacketDefine.GAME][PacketDefine.S_GIVE_TIPS ] = onBossGiveTips;
//				
//				this.m_packetMap[PacketDefine.LOBBY][PacketDefine.DISCONNECT] = onDisConnect;
//				this.m_packetMap[PacketDefine.LOBBY][PacketDefine.CONNECTTING] = onConnect;
//				this.m_packetMap[PacketDefine.LOBBY][PacketDefine.IO_ERROR] = onIoError;
//				this.m_packetMap[PacketDefine.LOBBY][PacketDefine.SEC_ERROR] = onSecError;
//				
//				this.m_packetMap[PacketDefine.GAME][PacketDefine.DISCONNECT] = onDisConnect;
//				this.m_packetMap[PacketDefine.GAME][PacketDefine.CONNECTTING] = onConnect;
//				this.m_packetMap[PacketDefine.GAME][PacketDefine.IO_ERROR] = onIoError;
//				this.m_packetMap[PacketDefine.GAME][PacketDefine.SEC_ERROR] = onSecError;
				
				this.m_packetMap[PacketDefine.LOBBY][PacketDefine.S_Lobby_Update_Table_Road ] = S_Lobby_Update_Table_Road_Pkt;
				this.m_packetMap[PacketDefine.LOBBY][PacketDefine.ACK ]  = S_Ack_Pkt;					//
				this.m_packetMap[PacketDefine.LOBBY][PacketDefine.N_ACK ]  = S_NAck_Pkt;
				
				this.m_packetMap[PacketDefine.LOBBY][PacketDefine.S_Heart ]  = S_Lobby_Heart_Pkt;					//
				this.m_packetMap[PacketDefine.LOBBY][PacketDefine.C_Heart ]  = S_Lobby_Heart_Pkt;				//
				
				this.m_packetMap[PacketDefine.LOBBY][PacketDefine.S_Maintenance] = S_Lobby_Maintenance_pkt;
				
				m_packetMap[PacketDefine.PRINTER] = {};
		}

		
		public getProtocolClass( _uModel:number, _uType:number, _uTableType:number=0 ) : IProtocolStruct
		{
			var _class : Class;
			switch(_uTableType){
				case 0:
				case Define.TABLE_TYPE_NORMAL:
				case Define.TABLE_TYPE_SPEEDY:
				case Define.TABLE_TYPE_PEEK:
				case Define.TABLE_TYPE_TELBET:
				case Define.TABLE_TYPE_CHARTER:
				case Define.TABLE_TYPE_GOOD:
					_class= m_packetMap[_uModel][_uType];
					break;
				
				
				case Define.TABLE_TYPE_ROBOT:
					
					_class= m_packetMap[Define.TABLE_TYPE_ROBOT][_uType];
					break;
				
			}
					
			if (_class)
			{
				return new _class as IProtocolStruct;
			}
			return null;
		}
		
		public toString( _uModel:number, _uType:number ) : string
		{
			return getQualifiedClassName(m_packetMap[_uModel][_uType]);
		}
		
		/**
		 *	导入协议 
		 * @param mainId
		 * @param subId
		 * @param handler
		 * @param sType
		 * 
		 */		
		public addProtocol( _uModel:number, _uType:number, _handler:Class) : void
		{
			if (_handler)
			{
				if(m_packetMap[_uModel]==null){
					m_packetMap[_uModel] = {};
				}
				m_packetMap[_uModel][_uType] = _handler;
				
			}
		}
		
		/**
		 *	移除协议 
		 * @param mainId
		 * @param subId
		 * 
		 */		
		public removeProtocol( _uModel:number, _uType:number) : void
		{
			delete m_packetMap[_uModel][_uType];
			
		/*	
			
			switch(_TableType){
				case 0:
					delete m_packetMap[_uModel][_uType];
					break;
				
				case Define.TABLE_TYPE_ROBOT:
					delete m_packetMap[Define.TABLE_TYPE_ROBOT][_uType];
					break;
			}*/
		}
		

		
	}
}