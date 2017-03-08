module ui.button.theme {
	export class Button_Theme_1 extends Button_Theme{

		public constructor() {
			let arr : string[] = [
				"theme_bg_default_png",
				"theme_bg_down_1_png",
				"theme_icon_1_default_png",
				"theme_icon_1_down_png",
				"theme_label_1_cn_default_png",
				"theme_label_1_cn_over_png",
				"theme_label_1_tw_default_png",
				"theme_label_1_tw_over_png"
			];
			super(arr, false);
		}
		
		protected onClick():void{
			console.log("theme_1 按钮点击了!");
		}
	}
}