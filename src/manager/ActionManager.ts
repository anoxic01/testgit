module manager {
	

	export class ActionManager {

		/** 快速转桌 **/
		public fInitQuickTable			:	Function;			//初始列表
		public fQuickTable				:	Function;			//快速转桌回调（含多桌、电投）
		private m_aAction				:	any[];
		public multiTalbes				:	any[] =[];			//待订阅多桌
		
		public fExitGame				:	Function;	

		private static m_instance		:	ActionManager;

		public static getInstance():ActionManager{
			
			if(this.m_instance == null){
				
				this.m_instance = new ActionManager(new Singleton());
				
			}
			return this.m_instance;
		}
		
		public constructor(sing:Singleton) {
		}

		
		public addActionFun(_fFun:Function):void{
			if(this.m_aAction==null){
				this.m_aAction = [];
			}
			this.m_aAction.push(_fFun);
		}
		public getActionFun():Function{
			if(this.m_aAction.length>0){
				return this.m_aAction.shift();
			}
			return null;
		}
		public removeActionFun():void{
			if(this.m_aAction.length>0){
				this.m_aAction.shift();
			}
		}
	}
}
export class Singleton{}