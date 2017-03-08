module ui.button {
	export class Button_SD extends ui.button.Button_Tool{
		
		public constructor() {
			let arr : string[] = ["sd_default_png","sd_down_png"];
			super(arr);
		}

		protected onclick():void{
			console.log("频道选择 按钮点击了!");
		}
	}
}