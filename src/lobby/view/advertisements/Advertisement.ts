module lobby.view.advertisements {
	export class Advertisement extends egret.DisplayObjectContainer {
		public constructor() {
			super();

			let ad = manager.ResourceManager.getInstance().createBitmapByName("ad_0_jpg");
			this.addChild(ad);

		}
	}
}