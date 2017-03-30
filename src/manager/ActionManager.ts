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
			
			if(m_instance == null){
				
				m_instance = new ActionManager(new Singleton());
				
			}
			return m_instance;
		}
		
		public constructor() {
		}

		
		public addActionFun(_fFun:Function):void{
			if(m_aAction==null){
				m_aAction = [];
			}
			m_aAction.push(_fFun);
		}
		public getActionFun():Function{
			if(m_aAction.length>0){
				return m_aAction.shift();
			}
			return null;
		}
		public removeActionFun():void{
			if(m_aAction.length>0){
				m_aAction.shift();
			}
		}
	}
}