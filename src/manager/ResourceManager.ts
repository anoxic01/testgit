module manager {
	export class ResourceManager {

		/** swf文件 **/
		private m_dicSwfs 	=	new Object(); 
		
		private static instance	:	ResourceManager;

		public static getInstance():ResourceManager{
            if(this.instance == null){
                    this.instance = new ResourceManager();
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
		public getClassByName(sClassName:string) : any
		{
			var _class;
			try
			{
				// _class = this.getDefinitionByName(sClassName);
			}
			catch (err)
			{
			}
			return _class;
		}
		
		public getClassByNameFromDomain(sDomain:string, sClassName:string) : any
		{
			var _class;
			try
			{
				_class = (this.m_dicSwfs[sDomain]).contentLoaderInfo.applicationDomain.getDefinition(sClassName);
			}
			catch (error)
			{
				console.log(sClassName + " 不存在于外部加载的swf文件");
			}
			return _class;
		}
		
		public getInstanceByNameFromDomain(sDomain:string, sClassName:string):any{
			var _class;
			try
			{
				_class = (this.m_dicSwfs[sDomain]).contentLoaderInfo.applicationDomain.getDefinition(sClassName);
			}
			catch (error)
			{
				console.log(sClassName + " 不存在于外部加载的swf文件");
			}
			return new _class();
		}
		
		public addLoader(_sKey:string, loader):void{
			this.m_dicSwfs[_sKey] = loader;
		}
		public getLoader(_sKey:string):any{
			console.log("m_dictionarySwfs[_sKey]::" + this.m_dicSwfs[_sKey] );
			return this.m_dicSwfs[_sKey];
		}
	}
}