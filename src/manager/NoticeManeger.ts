module manager {
	export class NoticeManeger {
		private m_nmModel				:lobby.model.NoticeModel;
		private m_nmView				:lobby.view.notice.NoticeView;
		private m_bIsInit				: boolean;
		private m_spContainer			:egret.Sprite;
		// private m_jTimer				:JTimer;
		private m_bIsShow				: boolean;
		
		private static _instance		:NoticeManeger;
		
		public constructor() {
			if(NoticeManeger._instance)
			{
				throw new Error("NoticeManeger is singleton class");
			}else{
				this.m_nmModel = new lobby.model.NoticeModel();
				this.m_nmView = new lobby.view.notice.NoticeView();
				// this.m_jTimer = JTimer.getTimer(30);
				// this.m_jTimer.addTimerCallback(this.going);
			}
			
		}
		public static getInstance():NoticeManeger
		{
			if(NoticeManeger._instance==null)
			{
				NoticeManeger._instance = new NoticeManeger();
			}
			return NoticeManeger._instance;
		}
		public init(container:egret.Sprite):void
		{
			if(this.m_bIsInit)
				return;
			this.m_bIsInit = true;
			this.m_spContainer = container;
		}
		set  NotAllowTableIDList(arr:any[])
		{
			this.m_nmModel.NotAllowTableIDList = arr;
		}
		public reciveMaintain(data:Object):void
		{
			var vo:lobby.model.struct.MaintainsAnnouncementStruct = new lobby.model.struct.MaintainsAnnouncementStruct(data);
			switch(vo.MaintainStatus){
				case lobby.model.status.SysMaintainStatus.Remind:
				case lobby.model.status.SysMaintainStatus.Start:
					this.addMaintain(vo);
					break;
				case lobby.model.status.SysMaintainStatus.Stop:
					this.removeMessage(vo);
					break;
			}
		}
		public setMaintains(datas:any[]):void
		{
			if(datas==null || datas.length==0)
				return;
			var vos:any[] = [];
			var vo:lobby.model.struct.MessageStruct;
			for (var i:number= 0; i < datas.length; i++) 
			{
				vo = new lobby.model.struct.MessageStruct();
				vo.oData = new lobby.model.struct.MaintainsAnnouncementStruct(datas[i]);
				vos.push(vo);
			}
			this.m_nmModel.setData(vos);
			this.refresh();
		}
		public refresh():void
		{
			//进入電投大厅，不显示
			if(LobbyManager.getInstance().exitLevel==define.Define.EXIT_TEL_LOBBY)
			{
				this.hide();
				return;
			}
			var filtered:lobby.model.struct.MessageStruct[] = this.m_nmModel.filter();
			this.m_nmView.setData(filtered);
			if(filtered && filtered.length>0)
			{
				this.show();
			}
			else
			{
				this.hide();
			}
		}
		public setUrgents(datas:any[]):void
		{
			if(datas==null || datas.length==0)
				return;
			var vo:lobby.model.struct.MessageStruct;
			for (var i:number= 0; i < datas.length; i++) 
			{
				vo = new lobby.model.struct.MessageStruct();
				vo.oData = datas[i];
				this.m_nmModel.addMessage(vo);
				this.m_nmView.addMessage(vo);
			}
			this.show();
		}
		
		private addMaintain(vo:lobby.model.struct.MaintainsAnnouncementStruct):void
		{
			var message:lobby.model.struct.MessageStruct = new lobby.model.struct.MessageStruct();
			message.oData = vo;
			var index:number= this.m_nmModel.getMessageIndex(vo);
			if(index != -1)
			{
				var removed:lobby.model.struct.MessageStruct = this.m_nmModel.removeMeassgeByIndex(index);
				this.m_nmView.wantToRemove(removed);
				//
			}
			this.m_nmModel.addMessage(message);
			var pass:lobby.model.struct.MessageStruct = this.m_nmModel.filterMessage(message);
			if(pass)
			{
				this.m_nmView.addMessage(pass);
				
				this.show();
			}
			//正式维护才更改标志(防止继续订阅好路)
			if(vo.MaintainStatus == lobby.model.status.SysMaintainStatus.Start){
				if (message.maMaintain.MaintainType == lobby.model.type.SysMaintainType.Maintenance_FullSite || (message.maMaintain.MaintainType == lobby.model.type.SysMaintainType.Maintenance_TopAgent && lobby.model.Player.getInstance().iAgentID == message.maMaintain.MaintainData))
				{
					LobbyManager.getInstance().maintainLevel = message.maMaintain.MaintainType;
				}
			}
			
		}
		private removeMessage(vo):void
		{
			var removed:lobby.model.struct.MessageStruct = this.m_nmModel.removeMessage(vo);
			if(removed)
			{
				this.m_nmView.wantToRemove(removed);
			}
		}
		private going() : void
		{
			var now:number= egret.getTimer();
			this.m_nmModel.changeTime(now);
			if(this.m_nmView.showCount>0)
			{
				var removed:lobby.model.struct.MessageStruct = this.m_nmView.going();
				if(removed && removed.bReadyKill)
				{
					this.m_nmModel.removeMessage(removed);
					this.m_nmView.removeMessage(removed);
				}
			}
			else
			{
				this.hide();
			}
		}
		private show():void{
			if(this.m_bIsShow)
				return;
			if(LobbyManager.getInstance().exitLevel==define.Define.EXIT_TEL_LOBBY)
				return;
			this.m_bIsShow = true;
			// this.m_jTimer.start();
			this.m_spContainer.addChild(this.m_nmView);
		}
		public hide():void{
			if(this.m_bIsShow==false)
				return;
			this.m_bIsShow = false;
			// this.m_jTimer.stop();
			this.m_nmView.clear();
			this.m_spContainer.removeChild(this.m_nmView);
		}
		public toGamgeUrgentNotice():void{
			this.m_nmView.toGamgeUrgentNotice();
		}
		public toLobbyUrgentNotice():void{
			this.m_nmView.toLobbyUrgentNotice();
		}
		public toMultiUrgentNotice():void{
			this.m_nmView.toMultiUrgentNotice();
		}
		public onChangeLanguage():void{
			this.m_nmView.onChangeLanguage();
		}
	}
}