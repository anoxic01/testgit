module ui.button {
	export class Button_Detail extends ui.button.Button_Tool{
		
		public constructor() {
			let arr : string[] = ["detail_default_png","detail_down_png"];
			super(arr);
		}

		protected onclick():void{
			console.log("频道选择 按钮点击了!");
		}
	}
}