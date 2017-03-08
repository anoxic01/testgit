module ui.button {
	export class Button_FullScreen extends ui.button.Button_Tool{
		
		public constructor() {
			let arr : string[] = ["full_default_png","full_down_png"];
			super(arr);
		}

		protected onclick():void{
			console.log("频道选择 按钮点击了!");
		}
	}
}