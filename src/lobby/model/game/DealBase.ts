module lobby.model.game {
	export class DealBase {
		// 是否發牌結誤
        private isDealEnd : boolean;
		public constructor() {
		}
		
		get IsDealEnd(): boolean 
		{
			return this.isDealEnd;
		}
		
		set  IsDealEnd(value: boolean) 
		{
			this.isDealEnd = value;
		}
		
		
	}
}