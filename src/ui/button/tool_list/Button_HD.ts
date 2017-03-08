module ui.button {
	export class Button_HD extends ui.button.Button_Tool{
		
		public constructor() {
			let arr : string[] = ["hd_default_png","hd_down_png"];
			super(arr);
		}

		protected onclick():void{
			console.log("频道选择 按钮点击了!");
		}
	}
}