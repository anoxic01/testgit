module lobby.model.game {
	export class DealBase {
		// 是否發牌結誤
        private var isDealEnd :Boolean;
		public constructor() {
		}
		
		public function get IsDealEnd():Boolean 
		{
			return isDealEnd;
		}
		
		public function set IsDealEnd(value:Boolean):void 
		{
			isDealEnd = value;
		}
		
		
	}
}