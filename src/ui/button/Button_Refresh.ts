module ui.button {
	export class Button_Refresh extends ui.button.Button_Tool{
		
		public constructor() {
			let arr : string[] = ["refresh_default_png","refresh_down_png"];
			super(arr);
		}

		protected onclick():void{
			console.log("频道选择 按钮点击了!");
		}
	}
}