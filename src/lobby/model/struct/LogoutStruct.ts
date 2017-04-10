module lobby.model.struct {
	export class LogoutStruct {
		public PlayerID	:	number;		//玩家 ID
		public Identity	:	number;		//身分識別
		
		/**
		 0: 重複登入
		 1: 玩家/槍手自己登出
		 2: 槍手換班登出
		 3: 試玩帳號超過試玩時間，自動登出
		 4: 取消訂閱多桌登出
		 5: 斷線
		 6: 包桌桌主離線
		 7: 逾時
		 8: 伺服器維護中 
		 */		
		public Reason	:	number;		//登出原因
		
		public constructor(_oData) {
			this.PlayerID	=	_oData.PlayerID;
			this.Identity 	= 	_oData.Identity;
			this.Reason 	= 	_oData.Reason;
		}
	}
}