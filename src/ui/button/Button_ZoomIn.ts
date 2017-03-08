module ui.button {
	export class Button_ZoomIn extends ui.button.Button_Tool{
		
		public constructor() {
			let arr : string[] = ["zoom_in_default_png","zoom_in_down_png"];
			super(arr);
		}

		protected onclick():void{
			console.log("频道选择 按钮点击了!");
		}
	}
}