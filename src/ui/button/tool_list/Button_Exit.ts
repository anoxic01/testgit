module ui.button {
	export class Button_Exit extends ui.button.Button_Tool{
		
		public constructor() {
			let arr : string[] = ["exit_default_png","exit_down_png"];
			super(arr);
		}

		protected onclick():void{
			console.log("频道选择 按钮点击了!");
		}
	}
}