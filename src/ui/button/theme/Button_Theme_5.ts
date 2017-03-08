module ui.button.theme {
	export class Button_Theme_5 extends Button_Theme{

		public constructor() {
			let arr : string[] = [
				"theme_bg_default_png",
				"theme_bg_down_5_png",
				"theme_icon_5_default_png",
				"theme_icon_5_down_png",
				"theme_label_5_cn_default_png",
				"theme_label_5_cn_over_png",
				"theme_label_5_tw_default_png",
				"theme_label_5_tw_over_png"
			];
			super(arr, false);
		}
		
		protected onClick():void{
			console.log("theme_5 按钮点击了!");
		}
	}
}