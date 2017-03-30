module lobby.model.struct {
	export class MessageStruct {
		public static Minute_5				:number= 	5*60*1000;
		
		public static m_iUid					:number;
		private m_iId							:number;
		
		private m_oData							:Object;
		
		private m_bIsMaintain					: boolean;
		
		public maMaintain						:MaintainsAnnouncementStruct;
		
		public iStartShowTime					:number;
		public iShowTime						:number;
		
		/**
		 * 时间到了，跑完删除 
		 */		
		public bReadyKill						: boolean;
		
		public constructor() {
			MessageStruct.m_iUid++;
			this.m_iId = MessageStruct.m_iUid;
		}
		get iId():number
		{
			return this.m_iId;
		}
		get oData():Object
		{
			return this.m_oData;
		}
		set  oData(value)
		{
			this.m_oData = value;
			this.m_bIsMaintain = this.m_oData instanceof MaintainsAnnouncementStruct;
			if(this.m_bIsMaintain)
			{
				this.maMaintain = this.m_oData as MaintainsAnnouncementStruct;
				this.iShowTime = MessageStruct.Minute_5;
			}
			else
			{
				this.iShowTime = MessageStruct.Minute_5;
			}
		}
		/**
		 * true：
		 * false：5分钟自动消失 
		 */
		get bIsMaintain(): boolean
		{
			return this.m_bIsMaintain;
		}
		public toString():string
		{
			var str:string = "";
			if(this.m_oData)
			{
				if(this.m_bIsMaintain)
				{
					//维护
					str = (this.m_oData as MaintainsAnnouncementStruct).toString();
				}
				else
				{
					if(<string>this.m_oData)
					{
						//sun_question
						str = String(this.m_oData);
					}
					else
					{
						//緊急公告的簡短訊息
						str = this.m_oData[manager.LobbyManager.getInstance().lobbyAuth.Lang].Msg;
					}
				}
			}
			return str;
		}
	}
}