module ui.button {
	export class Button_Setting extends ui.button.Button_Tool{
		
		public constructor() {
			let arr : string[] = ["setting_default_png","setting_down_png"];
			super(arr);
		}

		protected onclick():void{
			console.log("频道选择 按钮点击了!");
		}
	}
}