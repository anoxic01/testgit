module ui.button {
	export class Button_Record extends ui.button.Button_Tool{
		
		public constructor() {
			let arr : string[] = ["record_default_png","record_down_png"];
			super(arr);
		}

		protected onclick():void{
			console.log("频道选择 按钮点击了!");
		}
	}
}