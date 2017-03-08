module ui.button.theme {
	export class Button_Theme_6 extends Button_Theme{

		public constructor() {
			let arr : string[] = [
				"theme_bg_default_png",
				"theme_bg_down_6_png",
				"theme_icon_6_default_png",
				"theme_icon_6_down_png",
				"theme_label_6_cn_default_png",
				"theme_label_6_cn_over_png",
				"theme_label_6_tw_default_png",
				"theme_label_6_tw_over_png"
			];
			super(arr, false);
		}
		
		protected onClick():void{
			console.log("theme_6 按钮点击了!");
		}
	}
}