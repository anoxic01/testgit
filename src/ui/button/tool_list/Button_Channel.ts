module ui.button {
	export class Button_Channel extends ui.button.Button_Tool{
		
		public constructor() {
			let arr : string[] = ["channel_default_png","channel_down_png"];
			super(arr);
		}

		protected onclick():void{
			console.log("频道选择 按钮点击了!");
		}

	}
}