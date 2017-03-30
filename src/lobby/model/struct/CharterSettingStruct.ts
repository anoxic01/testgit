module lobby.model.struct {
	export class CharterSettingStruct {

		private m_cType		:	number;		// 包桌模式
        private m_cPwd		:	string;		// 包桌密碼
        private m_ret		:	number;		// 包桌設定結果
		

		public constructor() {
		}
		
		public update(oData:Object):void{
			if(oData==null){
				return;
			}
			this.Ret = oData["Ret"];
			this.CType = oData["CType"];
			this.CPwd = oData["CPwd"];
		}
		
		get CType():number 
		{
			return this.m_cType;
		}
		
		set CType(value:number) 
		{
			this.m_cType = value;
		}
		
		get CPwd():string 
		{
			return this.m_cPwd;
		}
		
		set CPwd(value:string) 
		{
			this.m_cPwd = value;
		}
		
		get Ret():number 
		{
			return this.m_ret;
		}
		
		set Ret(value:number) 
		{
			this.m_ret = value;
		}
	}
}