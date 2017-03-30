module lobby.model.struct {
	export class SimpleDeputyStruct {
		public AgentID			:	number;						//老板最高代理ID
		public BossID			:	number;						//老板playerID
		public BossNickName		:	String;						//老板昵称
		public BossBetLimitID	:	number;						//老板押注限红ID
		public BossBalance		:	BalanceStruct;				//老板目前余额
		public LobbyServer		:	String;						//抢手在哪个大厅认证
		public PrivateKey		:	String;						//槍手私密金鑰
		public BroadcastKey		:	String;						//槍手公開金鑰
		public AgentKey			:	String;						//槍手代理金鑰
		public Identity			:	number;						//身份	0-玩家,	1-抢手,	2-试玩账号,	3-机器人
		public BossAccountType	:	String;						//账户种类	c-现金，	m-信用
		public IsLogin			:	 boolean;					//是否認證成功
		public DeputyFirstName	:	String;						//抢手姓
		public DeputyLastName	:	String;						//槍手名
		
		public constructor() {
		}
	}
}