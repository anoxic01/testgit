module lobby.view.notice {
	export class NoticeManeger {
		private m_nmModel				:NoticeModel;
		private m_nmView				:NoticeView;
		private m_bIsInit				: boolean;
		private m_spContainer			:Sprite;
		private m_jTimer				:JTimer;
		private m_bIsShow				: boolean;
		
		private static _instance		:NoticeManeger;
		
		public constructor() {
			if(_instance)
			{
				throw new Error("NoticeManeger is singleton class");
				return;
			}
			m_nmModel = new NoticeModel();
			m_nmView = new NoticeView();
			m_jTimer = JTimer.getTimer(30);
			m_jTimer.addTimerCallback(going);
		}
		public static getInstance():NoticeManeger
		{
			if(_instance==null)
			{
				_instance = new NoticeManeger();
			}
			return _instance;
		}
		public init(container:Sprite):void
		{
			if(m_bIsInit)
				return;
			m_bIsInit = true;
			m_spContainer = container;
		}
		set  NotAllowTableIDList(arr:any[])
		{
			m_nmModel.NotAllowTableIDList = arr;
		}
		public reciveMaintain(data:Object):void
		{
			var vo:MaintainsAnnouncementStruct = new MaintainsAnnouncementStruct(data);
			switch(vo.MaintainStatus){
				case SysMaintainStatus.Remind:
				case SysMaintainStatus.Start:
					addMaintain(vo);
					break;
				case SysMaintainStatus.Stop:
					removeMessage(vo);
					break;
			}
		}
		public setMaintains(datas:any[]):void
		{
			if(datas==null || datas.length==0)
				return;
			var vos:any[] = [];
			var vo:MessageStruct;
			for (var i:number= 0; i < datas.length; i++) 
			{
				vo = new MessageStruct();
				vo.oData = new MaintainsAnnouncementStruct(datas[i]);
				vos.push(vo);
			}
			m_nmModel.setData(vos);
			refresh();
		}
		public refresh():void
		{
			//进入電投大厅，不显示
			if(LobbyManager.getInstance().exitLevel==Define.EXIT_TEL_LOBBY)
			{
				hide();
				return;
			}
			var filtered:<MessageStruct> = m_nmModel.filter();
			m_nmView.setData(filtered);
			if(filtered && filtered.length>0)
			{
				show();
			}
			else
			{
				hide();
			}
		}
		public setUrgents(datas:any[]):void
		{
			if(datas==null || datas.length==0)
				return;
			var vo:MessageStruct;
			for (var i:number= 0; i < datas.length; i++) 
			{
				vo = new MessageStruct();
				vo.oData = datas[i];
				m_nmModel.addMessage(vo);
				m_nmView.addMessage(vo);
			}
			show();
		}
		
		private addMaintain(vo:MaintainsAnnouncementStruct):void
		{
			var message:MessageStruct = new MessageStruct();
			message.oData = vo;
			var index:number= m_nmModel.getMessageIndex(vo);
			if(index != -1)
			{
				var removed:MessageStruct = m_nmModel.removeMeassgeByIndex(index);
				m_nmView.wantToRemove(removed);
				//
			}
			m_nmModel.addMessage(message);
			var pass:MessageStruct = m_nmModel.filterMessage(message);
			if(pass)
			{
				m_nmView.addMessage(pass);
				
				show();
			}
			//正式维护才更改标志(防止继续订阅好路)
			if(vo.MaintainStatus == SysMaintainStatus.Start){
				if (message.maMaintain.MaintainType == SysMaintainType.Maintenance_FullSite || (message.maMaintain.MaintainType == SysMaintainType.Maintenance_TopAgent && Player.getInstance().iAgentID == message.maMaintain.MaintainData))
				{
					LobbyManager.getInstance().maintainLevel = message.maMaintain.MaintainType;
				}
			}
			
		}
		private removeMessage(vo:Object):void
		{
			var removed:MessageStruct = m_nmModel.removeMessage(vo);
			if(removed)
			{
				m_nmView.wantToRemove(removed);
			}
		}
		private going() : void
		{
			var now:number= getTimer();
			m_nmModel.changeTime(now);
			if(m_nmView.showCount>0)
			{
				var removed:MessageStruct = m_nmView.going();
				if(removed && removed.bReadyKill)
				{
					m_nmModel.removeMessage(removed);
					m_nmView.removeMessage(removed);
				}
			}
			else
			{
				hide();
			}
		}
		private show():void{
			if(m_bIsShow)
				return;
			if(LobbyManager.getInstance().exitLevel==Define.EXIT_TEL_LOBBY)
				return;
			m_bIsShow = true;
			m_jTimer.start();
			m_spContainer.addChild(m_nmView);
		}
		public hide():void{
			if(m_bIsShow==false)
				return;
			m_bIsShow = false;
			m_jTimer.stop();
			m_nmView.clear();
			m_spContainer.removeChild(m_nmView);
		}
		public toGamgeUrgentNotice():void{
			m_nmView.toGamgeUrgentNotice();
		}
		public toLobbyUrgentNotice():void{
			m_nmView.toLobbyUrgentNotice();
		}
		public toMultiUrgentNotice():void{
			m_nmView.toMultiUrgentNotice();
		}
		public onChangeLanguage():void{
			m_nmView.onChangeLanguage();
		}
	}
}