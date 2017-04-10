module lobby.model.struct {
	export class AuthInfoStruct {
		public AuthToken	:	string;		//必填		1-認證碼(由Web端取得)	2-配对码(抢手)
		public LoginID		:	string;		//抢手必填	抢手账号
		public Identity		:	number;		//身份		0-玩家, 1-槍手,	2-试玩账号,	3-机器人
		public Lang			:	number;		//語系		0-CN, 1-TW, 2-EN
		public Platform		:	number;		//遊戲平台	0-Web, 1-Mobile,	2-Phone,	3-PC
		public ProtocolVer	:	number;		//大厅通訊版本号	1-不正确，自行断开连接,	2-允许登入
		public ThemeType 	:	number;		//登陆  0:網投 1:電投
		public DefThemeID 	:	number;		//預設廳館ID
		
		public constructor() {
		}
	}
}