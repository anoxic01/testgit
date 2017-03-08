module tool {
	export class BitmapTool {

		private static instance	:	BitmapTool;

		public static getInstance():BitmapTool{
            if(this.instance == null){
                    this.instance = new BitmapTool();
            }
            return this.instance;
     	}
		public constructor() {
		}

		/**
		 * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
		 * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
		 */
		public createBitmapByName(name:string):egret.Bitmap {
			let result = new egret.Bitmap();
			let texture:egret.Texture = RES.getRes(name);
			result.texture = texture;
			return result;
		}
	}
}