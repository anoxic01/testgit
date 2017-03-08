module lobby.view {
	export class Advertisement extends egret.DisplayObjectContainer {
		public constructor() {
			super();

			let ad = tool.BitmapTool.getInstance().createBitmapByName("ad_0_jpg");
			this.addChild(ad);

		}
	}
}