module lobby.view {
	export class Panorama extends egret.DisplayObjectContainer {

		private btn_refresh;
		private btn_zoom_in;

		public constructor() {
			super();

			this.btn_refresh = new ui.button.Button_Refresh();
			this.addChild(this.btn_refresh);
			this.btn_refresh.x = 350;
			this.btn_refresh.y = 208;

			this.btn_zoom_in = new ui.button.Button_ZoomIn();
			this.addChild(this.btn_zoom_in);
			this.btn_zoom_in.x = 388;
			this.btn_zoom_in.y = 213;
		}
	}
}