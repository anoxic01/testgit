module lobby.model.struct {
	export class GameSettingStruct {
		public var BetLimitId		:	int;		//押注模式
        public var UpperBetLimitId	:	int;		//押注上限
        private var m_sCustChips	:	String;		//自订筹码
		public var aCustChips		:	Array;		//自订筹码
		
		public constructor( oPlayerGameSetting:Object=null ) {
			BetLimitId			=	oPlayerGameSetting.BetLimitId;
			UpperBetLimitId		=	oPlayerGameSetting.UpperBetLimitId;
			CustChips			=	oPlayerGameSetting.CustChips;
			
		}
		public function set CustChips(_sValue:String):void{
			m_sCustChips		=	_sValue;
			aCustChips			=	_sValue.split(",");
		}
		public function get CustChips():String{
			return m_sCustChips;
		}
	}
}