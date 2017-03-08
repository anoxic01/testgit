module ui.button {
	export class Button_Other extends ui.button.Button_Tool{
		
		public constructor() {
			let arr : string[] = ["other_default_png","other_down_png"];
			super(arr);
		}

		protected onclick():void{
			console.log("频道选择 按钮点击了!");
		}
	}
}