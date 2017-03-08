module ui.button.theme {
	export class Button_Theme_4 extends Button_Theme{

		public constructor() {
			let arr : string[] = [
				"theme_bg_default_png",
				"theme_bg_down_4_png",
				"theme_icon_4_default_png",
				"theme_icon_4_down_png",
				"theme_label_4_cn_default_png",
				"theme_label_4_cn_over_png",
				"theme_label_4_tw_default_png",
				"theme_label_4_tw_over_png"
			];
			super(arr, false);
		}
		
		protected onClick():void{
			console.log("theme_4 按钮点击了!");
		}
	}
}