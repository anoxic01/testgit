module ui.button.theme {
	export class Button_Theme_2 extends Button_Theme{

		public constructor() {
			let arr : string[] = [
				"theme_bg_default_png",
				"theme_bg_down_2_png",
				"theme_icon_2_default_png",
				"theme_icon_2_down_png",
				"theme_label_2_cn_default_png",
				"theme_label_2_cn_over_png",
				"theme_label_2_tw_default_png",
				"theme_label_2_tw_over_png"
			];
			super(arr, false);
		}
		
		protected onClick():void{
			console.log("theme_2 按钮点击了!");
		}
	}
}