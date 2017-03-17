module lobby.model {
	export class NoticeModel {
		private var m_msList				:Vector.<MessageStruct>;
		
		/**
		 * 如果是進入大廳給的話是要提供Client去過濾維護訊息用的
		 * 玩家A的代理如果不允許進入1,3,5桌
		 * 代表看不到1,3,5桌
		 * 這是提供給Client過濾維護身請單如果有1,3,5桌
		 * 過濾不顯示 
		 */		
		private var _NotAllowTableIDList:Array;
		
		public constructor() {
			m_msList = new Vector.<MessageStruct>();
		}
		public function get NotAllowTableIDList():Array
		{
			return _NotAllowTableIDList;
		}
		public function set NotAllowTableIDList(value:Array):void
		{
			_NotAllowTableIDList = value;
		}
		public function clear():void
		{
			m_msList.length = 0;
		}
		public function setData(arr:Array):void
		{
			clear();
			for (var i:int = 0; i < arr.length; i++) 
			{
				m_msList.push(arr[i]);
			}
		}
		/**
		 * 
		 * @return 
		 */		
		public function filter():Vector.<MessageStruct>
		{
			var vec:Vector.<MessageStruct> = new Vector.<MessageStruct>();
			var message:MessageStruct;
			for (var i:int = 0; i < m_msList.length; i++) 
			{
				message = filterMessage(m_msList[i]);
				if(message)
				{
					vec.push(message);
				}
			}
			return vec;
		}
		public function filterMessage(vo:MessageStruct):MessageStruct
		{
			if(vo.bIsMaintain)
			{
				switch(vo.maMaintain.MaintainType)
				{
					case SysMaintainType.Maintenance_FullSite:		//全站维护,更新跑马灯通知维护时间
						break;
					case SysMaintainType.Maintenance_Theme:		//厅馆维护,更新跑马灯通知维护时间，关闭厅馆
						vo.maMaintain.cloneMaintainData();
						var _gameThemeID : int = LobbyManager.getInstance().getGameThemeID();
						if(_gameThemeID>0){
							
							//当前在赌桌内
							var _gameTableID : int = LobbyManager.getInstance().getGameTableID();
							if(_gameTableID>0)
							{
								if(vo.maMaintain.MaintainData_game.indexOf(_gameThemeID)==-1){
									vo.maMaintain.MaintainData_game.length=0;
								}
							}
						}
						if(vo.maMaintain.MaintainData_game.length==0)
						{
							return null;
						}
						break;
					case SysMaintainType.Maintenance_Table:		//赌桌维护,更新跑马灯通知维护时间，关闭厅馆
						vo.maMaintain.cloneMaintainData();
						_gameThemeID = LobbyManager.getInstance().lobbyView.uCurrentThemeID;
						if(_gameThemeID>0){
							
							_gameTableID = LobbyManager.getInstance().getGameTableID();
							if(_gameTableID>0){
								//当前在赌桌内,不是当前赌桌，删除
								var table:Object;
								for(var i:int = 0;i<vo.maMaintain.MaintainData_game.length;i++){
									if(vo.maMaintain.MaintainData_game[i].TableID == _gameTableID){
										table = vo.maMaintain.MaintainData_game[i];
										break;
									}
								}
								vo.maMaintain.MaintainData_game.length = 0;
								if(table)
								{
									vo.maMaintain.MaintainData_game.push(table);
								}
								//_NotAllowTableIDList 赌桌内怎么办呢？？？
								
							}
							else
							{
								//在大厅，在_NotAllowTableIDList中的删除
								if(_NotAllowTableIDList&&_NotAllowTableIDList.length>0)
								{
									for(i = 0;i<vo.maMaintain.MaintainData_game.length;i++){
										if(_NotAllowTableIDList.indexOf(vo.maMaintain.MaintainData_game[i].TableID) != -1){
											vo.maMaintain.MaintainData_game.splice(i,1);
											i--;
										}
									}
								}
							}
						}
						if(vo.maMaintain.MaintainData_game.length==0)
						{
							return null;
						}
						break;
					case SysMaintainType.Maintenance_TopAgent:		//代理维护
						if(Player.getInstance().iAgentID != vo.maMaintain.MaintainData)
						{
							return null;
						}
						break;
				}
				return vo;
			}
			else
			{
				return vo;
			}
		}
		public function changeTime(now:int):void
		{
			var len:int = m_msList.length;
			if(len > 0)
			{
				var each:MessageStruct;
				for (var i:int = 0; i < len; i++) 
				{
					each = m_msList[i];
					if(each.iStartShowTime + each.iShowTime < now)
					{
						each.bReadyKill = true;
					}
				}
			}
		}
		public function addMessage(vo:MessageStruct):void
		{
			vo.iStartShowTime = getTimer();
			m_msList.push(vo);
		}
		public function removeMessage(vo:Object):MessageStruct
		{
			var index:int = getMessageIndex(vo);
			if(index != -1)
			{
				var results:Vector.<MessageStruct> = m_msList.splice(index,1);
				return results[0];
			}
			return null;
		}
		public function removeMeassgeByIndex(index:int):MessageStruct
		{
			if(index>=0 && index<m_msList.length)
			{
				var results:Vector.<MessageStruct> = m_msList.splice(index,1);
				return results[0];
			}
			return null;
		}
		public function getMessageByIndex(index:int):MessageStruct
		{
			if(index>=0 && index < m_msList.length)
			{
				return m_msList[index];
			}
			return null;
		}
		public function getMessageIndex(vo:Object):int
		{
			for (var i:int = 0; i < m_msList.length; i++) 
			{
				if((vo is MaintainsAnnouncementStruct) && m_msList[i].bIsMaintain)
				{
					if(m_msList[i].maMaintain.isEqual(vo as MaintainsAnnouncementStruct)==true)
					{
						return i;
					}
				}
				else
				{
					if(m_msList[i].oData == vo)
					{
						return i;
					}
				}
			}
			return -1;
		}
	}
}