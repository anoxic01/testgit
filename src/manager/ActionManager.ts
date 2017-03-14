module manager {
	

	export class ActionManager {

		/** 快速转桌 **/
		public var fInitQuickTable			:	Function;			//初始列表
		public var fQuickTable				:	Function;			//快速转桌回调（含多桌、电投）
		private var m_aAction				:	Array;
		public var multiTalbes				:	Array =[];			//待订阅多桌
		
		public var fExitGame				:	Function;	

		private static var m_instance		:	ActionManager;

		public static function getInstance():ActionManager{
			
			if(m_instance == null){
				
				m_instance = new ActionManager(new Singleton());
				
			}
			return m_instance;
		}
		
		public constructor() {
		}

		
		public function addActionFun(_fFun:Function):void{
			if(m_aAction==null){
				m_aAction = [];
			}
			m_aAction.push(_fFun);
		}
		public function getActionFun():Function{
			if(m_aAction.length>0){
				return m_aAction.shift();
			}
			return null;
		}
		public function removeActionFun():void{
			if(m_aAction.length>0){
				m_aAction.shift();
			}
		}
	}
}