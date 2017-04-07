module lobby.model.struct {
	export class GameSettingStruct {
		public BetLimitId		:	number;		//押注模式
        public UpperBetLimitId	:	number;		//押注上限
        private m_sCustChips	:	String;		//自订筹码
		public aCustChips		:	any[];		//自订筹码
		
		public constructor( oPlayerGameSetting=null ) {
			this.BetLimitId			=	oPlayerGameSetting.BetLimitId;
			this.UpperBetLimitId		=	oPlayerGameSetting.UpperBetLimitId;
			this.CustChips			=	oPlayerGameSetting.CustChips;
			
		}
		set  CustChips(_sValue:string){
			this.m_sCustChips		=	_sValue;
			this.aCustChips			=	_sValue.split(",");
		}
		get CustChips():string{
			return this.m_sCustChips;
		}
	}
}