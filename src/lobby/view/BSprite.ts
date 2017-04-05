module lobby.view {
	export class BSprite extends egret.Sprite {

		public sName:string;
        public uID:number;
        public nPosition:egret.Point;
        protected nAssetWidth:number;
        protected nAssetHeight:number;

		public constructor() {
			super();

			this.initialize();
		}

		public initialize():void{

		}

		public destroy():void{
			if(this.nPosition){
				this.nPosition = null;
			}
		}

		public onChangeLanguage():void{

		}
		
		public resize(_w:number=0, _h:number=0):void{
			
		}
		
	}
}