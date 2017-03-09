module lobby.view {
	export class BSprite extends egret.Sprite {

		public sName:string;
        public uID:number;
        public nPosition:egret.Point;
        protected nAssetWidth:number;
        protected nAssetHeight:number;

		public constructor() {
			super();
		}
	}
}