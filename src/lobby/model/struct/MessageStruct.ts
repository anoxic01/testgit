module lobby.model.struct {
	export class MessageStruct {
		public static const Minute_5				:int = 	5*60*1000;
		
		private static var m_iUid					:int;
		private var m_iId							:int;
		
		private var m_oData							:Object;
		
		private var m_bIsMaintain					:Boolean;
		
		public var maMaintain						:MaintainsAnnouncementStruct;
		
		public var iStartShowTime					:int;
		public var iShowTime						:int;
		
		/**
		 * 时间到了，跑完删除 
		 */		
		public var bReadyKill						:Boolean;
		
		public constructor() {
			m_iUid++;
			m_iId = m_iUid;
		}
		public function get iId():int
		{
			return m_iId;
		}
		public function get oData():Object
		{
			return m_oData;
		}
		public function set oData(value:Object):void
		{
			m_oData = value;
			m_bIsMaintain = m_oData is MaintainsAnnouncementStruct;
			if(m_bIsMaintain)
			{
				maMaintain = m_oData as MaintainsAnnouncementStruct;
				iShowTime = Minute_5;
			}
			else
			{
				iShowTime = Minute_5;
			}
		}
		/**
		 * true：
		 * false：5分钟自动消失 
		 */
		public function get bIsMaintain():Boolean
		{
			return m_bIsMaintain;
		}
		public function toString():String
		{
			var str:String = "";
			if(m_oData)
			{
				if(m_bIsMaintain)
				{
					//维护
					str = (m_oData as MaintainsAnnouncementStruct).toString();
				}
				else
				{
					if(m_oData is String)
					{
						//sun_question
						str = String(m_oData);
					}
					else
					{
						//緊急公告的簡短訊息
						str = m_oData[LobbyManager.getInstance().lobbyAuth.Lang].Msg;
					}
				}
			}
			return str;
		}
	}
}