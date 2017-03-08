module ui.button {
	export class Button_PersonInfo extends ui.button.Button_Tool{
		
		public constructor() {
			let arr : string[] = ["person_info_default_png","person_info_down_png"];
			super(arr);
		}

		protected onclick():void{
			console.log("频道选择 按钮点击了!");
		}
	}
}