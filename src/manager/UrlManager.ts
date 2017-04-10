module manager {
	export class UrlManager {
        public aServices;
        public aUrls;
        public dUrls;
		private m_root;
		private m_oData ;
		
        private static m_instance:UrlManager;

		public constructor(single:Singleton) {
            this.aServices = [];
            this.aUrls = [];
		   	this.dUrls = {};
            return;
		}
		
        public dispose() : void
        {
			this.dUrls = {};
           this. aUrls = [];
            this.aServices = [];
           
        }
		
		public initialize(_root):void{
			this.m_root = _root;
			console.log(this,"初始UrlMANAGER............");
			// if(ExternalInterface.available){
				var _parameters  = this.m_root.loaderInfo.parameters;
				var str : string = _parameters.Data;
				console.log(this,"str:"+str);
				if(str){
					this.m_oData = JSON.parse(str);
				}else{
					this.m_oData = config.TemConfig.getInstance().Data;
				}
				
				console.log(this,str);
			// }else{
			// 	this.m_oData = config.TemConfig.getInstance().Data;
			// }
			console.log(this,"结束UrlMANAGER............");
		}
		
		get root():Object{
			return this.m_root;
		}

        public getSwfUrl(sName) : string
        {
			
            if (this.dUrls[sName] == null)
            {
                return sName;
            }
            // if (ExternalInterface.available)
            // {
//                return "Resource/" + dUrls[sName];
//				return  "http://192.168.201.247/GameFrontWeb2/assets/swf/"+ dUrls[sName];
				return  this.getCurrentDomain()+ this.dUrls[sName];
            // }
            // return this.dUrls[sName];
        }
		
		public getImageUrl(sName:string):string{
			// if (ExternalInterface.available)
			// {
				return  this.getCurrentDomain() + "image/" + this.dUrls[sName];
			// }
			// return "image/"+this.dUrls[sName];
		}

        public getADUrl(sName:string) : string
        {
            // if (ExternalInterface.available)
            // {
//                return "Resource/AdImage/" + sName;
//				return "http://192.168.201.247/GameFrontWeb2/assets/swf/"+sName;
				return  this.dUrls[sName];
            // }
            // return sName;
        }

        public static getInstance() : UrlManager
        {
            if (!UrlManager.m_instance)
            {
                UrlManager.m_instance = new UrlManager(new Singleton());
            }
            return UrlManager.m_instance;
        }
		/**
		 * 現在路徑
		 * @return
		 */
		public getCurrentDomain():string {
			if( !this.m_root){
				return "";
			}
			var fullUrl:string = this.m_root.loaderInfo.url;
			
			var urlAr = fullUrl.split("/");
			
			var url:string = "";
			
			for (var i = 0; i < urlAr.length-1; i++) {
				url += urlAr[i] + "/";
			}
			

			return url;
		}	
		
		/**
		 * 得到網域 位址
		 */
		public getRootDomain():string {
			if( !this.m_root){
				return "";
			}
			var fullUrl:string = this.m_root.loaderInfo.url;
			var urlAr = fullUrl.split("/");
			var url:string = "";
			
			url = "http://"+urlAr[2];
			
			return url;
		}
		
		public webApiUrl():string{
			if(this.m_oData && this.m_oData.ApiUrl){
				console.log(this,"webApiUrl::>>>>>>>>>>>>>>"+this.m_oData.ApiUrl+"<<<<<<<<<<<<<<<");
				return this.m_oData.ApiUrl;
			}
			return config.TemConfig.getInstance().ApiUrl;
		}
		

	}

	class Singleton{
		constructor(){

		}
	}
}