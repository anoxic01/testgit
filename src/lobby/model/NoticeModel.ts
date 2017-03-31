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
		public filterMessage(vo:struct.MessageStruct):struct.MessageStruct
		{
			if(vo.bIsMaintain)
			{
				switch(vo.maMaintain.MaintainType)
				{
					case type.SysMaintainType.Maintenance_FullSite:		//全站维护,更新跑马灯通知维护时间
						break;
					case type.SysMaintainType.Maintenance_Theme:		//厅馆维护,更新跑马灯通知维护时间，关闭厅馆
						vo.maMaintain.cloneMaintainData();
						var _gameThemeID : number = manager.LobbyManager.getInstance().getGameThemeID();
						if(_gameThemeID>0){
							
							//当前在赌桌内
							var _gameTableID : number = manager.LobbyManager.getInstance().getGameTableID();
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
					case type.SysMaintainType.Maintenance_Table:		//赌桌维护,更新跑马灯通知维护时间，关闭厅馆
						vo.maMaintain.cloneMaintainData();
						_gameThemeID = manager.LobbyManager.getInstance().lobbyView.uCurrentThemeID;
						if(_gameThemeID>0){
							
							_gameTableID = manager.LobbyManager.getInstance().getGameTableID();
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
								if(this._NotAllowTableIDList&&this._NotAllowTableIDList.length>0)
								{
									for(i = 0;i<vo.maMaintain.MaintainData_game.length;i++){
										if(this._NotAllowTableIDList.indexOf(vo.maMaintain.MaintainData_game[i].TableID) != -1){
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
					case type.SysMaintainType.Maintenance_TopAgent:		//代理维护
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
			var len:number= this.m_msList.length;
			if(len > 0)
			{
				var each:struct.MessageStruct;
				for (var i:number= 0; i < len; i++) 
				{
					each = this.m_msList[i];
					if(each.iStartShowTime + each.iShowTime < now)
					{
						each.bReadyKill = true;
					}
				}
			}
		}
		public addMessage(vo:struct.MessageStruct):void
		{
			vo.iStartShowTime = egret.getTimer();
			this.m_msList.push(vo);
		}
		public removeMessage(vo:Object):struct.MessageStruct
		{
			var index:number= this.getMessageIndex(vo);
			if(index != -1)
			{
				var results = this.m_msList.splice(index,1);
				return results[0];
			}
			return null;
		}
		public removeMeassgeByIndex(index:number):struct.MessageStruct
		{
			if(index>=0 && index<this.m_msList.length)
			{
				var results = this.m_msList.splice(index,1);
				return results[0];
			}
			return null;
		}
		public getMessageByIndex(index:number):struct.MessageStruct
		{
			if(index>=0 && index < this.m_msList.length)
			{
				return this.m_msList[index];
			}
			return null;
		}
		public getMessageIndex(vo:Object):number
		{
			for (var i:number= 0; i < this.m_msList.length; i++) 
			{
				if((vo instanceof struct.MaintainsAnnouncementStruct) && this.m_msList[i].bIsMaintain)
				{
					if(this.m_msList[i].maMaintain.isEqual(vo as struct.MaintainsAnnouncementStruct)==true)
					{
						return i;
					}
				}
				else
				{
					if(this.m_msList[i].oData == vo)
					{
						return i;
					}
				}
			}
			return -1;
		}
	}
}