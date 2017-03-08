module ui.button.theme {
	export class Button_Theme_3 extends Button_Theme{

		public constructor() {
			let arr : string[] = [
				"theme_bg_default_png",
				"theme_bg_down_3_png",
				"theme_icon_3_default_png",
				"theme_icon_3_down_png",
				"theme_label_3_cn_default_png",
				"theme_label_3_cn_over_png",
				"theme_label_3_tw_default_png",
				"theme_label_3_tw_over_png"
			];
			super(arr, false);
		}
		
		protected onClick():void{
			console.log("theme_3 按钮点击了!");
		}
	}
}