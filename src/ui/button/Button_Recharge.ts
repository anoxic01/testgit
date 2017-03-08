module ui.button {
	export class Button_Recharge extends ui.button.Button_Tool{
		
		public constructor() {
			let arr : string[] = ["recharge_default_png","recharge_down_png"];
			super(arr);
		}

		protected onclick():void{
			console.log("频道选择 按钮点击了!");
		}
	}
}