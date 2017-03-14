module lobby.model.struct {
	export class SimpleDeputyStruct {
		public var AgentID			:	int;						//老板最高代理ID
		public var BossID			:	int;						//老板playerID
		public var BossNickName		:	String;						//老板昵称
		public var BossBetLimitID	:	int;						//老板押注限红ID
		public var BossBalance		:	BalanceStruct;				//老板目前余额
		public var LobbyServer		:	String;						//抢手在哪个大厅认证
		public var PrivateKey		:	String;						//槍手私密金鑰
		public var BroadcastKey		:	String;						//槍手公開金鑰
		public var AgentKey			:	String;						//槍手代理金鑰
		public var Identity			:	int;						//身份	0-玩家,	1-抢手,	2-试玩账号,	3-机器人
		public var BossAccountType	:	String;						//账户种类	c-现金，	m-信用
		public var IsLogin			:	Boolean;					//是否認證成功
		public var DeputyFirstName	:	String;						//抢手姓
		public var DeputyLastName	:	String;						//槍手名
		
		public constructor() {
		}
	}
}