module lobby.model {
	export class NoticeModel {
		private m_msList				:struct.MessageStruct[];
		
		/**
		 * 如果是進入大廳給的話是要提供Client去過濾維護訊息用的
		 * 玩家A的代理如果不允許進入1,3,5桌
		 * 代表看不到1,3,5桌
		 * 這是提供給Client過濾維護身請單如果有1,3,5桌
		 * 過濾不顯示 
		 */		
		private _NotAllowTableIDList:any[];
		
		public constructor() {
			this.m_msList = new Array<struct.MessageStruct>();
		}
		get NotAllowTableIDList():any[]
		{
			return this._NotAllowTableIDList;
		}
		set  NotAllowTableIDList(value:any[])
		{
			this._NotAllowTableIDList = value;
		}
		public clear():void
		{
			this.m_msList.length = 0;
		}
		public setData(arr:any[]):void
		{
			this.clear();
			for (var i:number= 0; i < arr.length; i++) 
			{
				this.m_msList.push(arr[i]);
			}
		}
		/**
		 * 
		 * @return 
		 */		
		public filter():struct.MessageStruct[]
		{
			var vec  = new Array<struct.MessageStruct>();
			var message:struct.MessageStruct;
			for (var i:number= 0; i < this.m_msList.length; i++) 
			{
				message = this.filterMessage(this.m_msList[i]);
				if(message)
				{
					vec.push(message);
				}
			}
			return vec;
		}
		public filterMessage(vo:MessageStruct):MessageStruct
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
								for(var i:number= 0;i<vo.maMaintain.MaintainData_game.length;i++){
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
		public changeTime(now:number):void
		{
			var len:number= m_msList.length;
			if(len > 0)
			{
				var each:MessageStruct;
				for (var i:number= 0; i < len; i++) 
				{
					each = m_msList[i];
					if(each.iStartShowTime + each.iShowTime < now)
					{
						each.bReadyKill = true;
					}
				}
			}
		}
		public addMessage(vo:MessageStruct):void
		{
			vo.iStartShowTime = getTimer();
			m_msList.push(vo);
		}
		public removeMessage(vo:Object):MessageStruct
		{
			var index:number= getMessageIndex(vo);
			if(index != -1)
			{
				var results:<MessageStruct> = m_msList.splice(index,1);
				return results[0];
			}
			return null;
		}
		public removeMeassgeByIndex(index:number):MessageStruct
		{
			if(index>=0 && index<m_msList.length)
			{
				var results:<MessageStruct> = m_msList.splice(index,1);
				return results[0];
			}
			return null;
		}
		public getMessageByIndex(index:number):MessageStruct
		{
			if(index>=0 && index < m_msList.length)
			{
				return m_msList[index];
			}
			return null;
		}
		public getMessageIndex(vo:Object):number
		{
			for (var i:number= 0; i < m_msList.length; i++) 
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