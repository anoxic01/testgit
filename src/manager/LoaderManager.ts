module manager {
	export class LoaderManager {
        public aLoaders;
        public currentGameLoader;
        private m_uLoderCounts;
        private m_uCurrentLoading;
        private m_fOnComplete:Function;
        private m_aUrls;
        private m_bDisplayPercent;
        private static m_instance:LoaderManager;

		private aGameSwf	;
		
		public constructor() {
			this.aLoaders = {};
			
			this.aGameSwf = [];
            return;
		}
        public load(aUrls, fOnComplete = null, bDisplayPercent = false, bGame = false) : void
        {
            m_bDisplayPercent = bDisplayPercent;
            m_uCurrentLoading = 0;
            m_uLoderCounts = aUrls.length;
            m_fOnComplete = fOnComplete;
            m_aUrls = aUrls;
            loadNext(bGame);
            return;
        }
		
		public loadGame(_sGameName:String, fOnComplete:Function):void{
			if(aGameSwf.indexOf(_sGameName)==-1){
				aGameSwf.push(_sGameName);
			}else{
				if(fOnComplete!=null){
					fOnComplete();
				}
				return;
			}
			var loader : Loader = new Loader();
			loader.contentLoaderInfo.addEventListener(ProgressEvent.PROGRESS, loading);
			loader.contentLoaderInfo.addEventListener(Event.COMPLETE, onLoadComplete(evt:Event):void{
				ResourceManager.getInstance().addLoader(_sGameName, (evt.target as LoaderInfo).loader);
				if(fOnComplete!=null){
					fOnComplete();
				}
			});
			
//			if(m_iLoginMode==0){
//				//网投大厅
//				switch(m_lang){
//					case 0:
//						m_loadingAsset.tf_label.text = " 正在加载 " + m_aLanguage_cn[m_uCurrentLoaderCount] + ",请稍等。。。";
//						break;
//					case 1:
//						m_loadingAsset.tf_label.text = " 正在加載 " + m_aLanguage_tw[m_uCurrentLoaderCount] + ",请稍等。。。";
//						break;
//					case 2:
//						m_loadingAsset.tf_label.text = " Loading " + m_aLanguage_en[m_uCurrentLoaderCount] +", please wait...";
//						break;
//				}
//			}else{
//				//电投大厅
//				switch(m_lang){
//					case 0:
//						m_loadingAsset.tf_label.text = " 正在加载 " + m_aLanguage_Tel_cn[m_uCurrentLoaderCount] + ",请稍等。。。";
//						break;
//					case 1:
//						m_loadingAsset.tf_label.text = " 正在加載 " + m_aLanguage_Tel_tw[m_uCurrentLoaderCount] + ",请稍等。。。";
//						break;
//					case 2:
//						m_loadingAsset.tf_label.text = " Loading " + m_aLanguage_Tel_en[m_uCurrentLoaderCount] +", please wait...";
//						break;
//				}
//			}
			
			
			loader.load(new URLRequest(UrlManager.getInstance().getSwfUrl(_sGameName+".swf")), new LoaderContext(false, ApplicationDomain.currentDomain));
		}
		
		
		private loading(e:ProgressEvent) : void
		{
//			var _iPercent_0 : int = m_uCurrentLoaderCount * 100 / m_aSwfCurrent.length;
//			var _iPercent_1 : int = e.bytesLoaded * 100 / (e.bytesTotal * m_aSwfCurrent.length);
//			
//			currentPercent = _iPercent_0 + _iPercent_1;
//			if(currentPercent<10){
//				m_loadingAsset.mc_0.gotoAndStop(0);
//				m_loadingAsset.mc_1.gotoAndStop(_iPercent_1);
//			}else{
//				var str : String = String(currentPercent);
//				var arr : Array = str.split("");
//				m_loadingAsset.mc_0.gotoAndStop(arr[0]);
//				m_loadingAsset.mc_1.gotoAndStop(arr[1]);
//			}
//			
//			//			m_mcLoader.gotoAndStop(currentPercent);
//			//			m_bmPercent.bitmapData = m_numUtil.conversionPercent(currentPercent);
//			//			switch(m_lobbyAuth.Lang){
//			//				case 0:
//			//					m_loadingAsset.tf_pecent.text = "加载进度 " + String(currentPercent) + "%";
//			//					break;
//			//				case 1:
//			//					m_loadingAsset.tf_pecent.text = "加載進度" + String(currentPercent) + "%";
//			//					break;
//			//				case 2:
//			//					m_loadingAsset.tf_pecent.text = String(currentPercent) + "%";
//			//					break;
//			//			}
//			m_loadingAsset.mc_bar.x = 136 + (currentPercent*1592*0.01);
//			//			trace("加载进度:",currentPercent);
//			if(currentPercent>=99){
//				
//				switch(m_lang){
//					case 0:
//						m_loadingAsset.tf_label.text = " 正在初始化界面，请稍等。。。";
//						break;
//					case 1:
//						m_loadingAsset.tf_label.text = " 正在初始化介面，請稍等。。。";
//						break;
//					case 2:
//						m_loadingAsset.tf_label.text = " Initializing interface, please wait...";
//						break;
//				}
//			}
		}
		
		//是否加载过该游戏
		public IsLoaded(_sGameName:String):Boolean{
			return aGameSwf.indexOf(_sGameName)==-1;
		}

        private loadNext(bGame:Boolean = false) : void
        {
            bGame = bGame;
            (m_uCurrentLoading + 1);
            loader:* = new SWFLoader();
            if (m_uCurrentLoading == m_uLoderCounts)
            {
                loader.fOnComplete = m_fOnComplete;
            }
            else
            {
                loader.fOnComplete = loadNext;
            }
            if (m_bDisplayPercent)
            {
                if (m_uLoderCounts == 1)
                {
                    loader.fOnLoading = (event:ProgressEvent) : void
            {
                _loc_2:* = event.bytesLoaded * 100 / event.bytesTotal;
                LoadingManager.getInstance().percent = _loc_2;
                return;
            }// end function
            ;
                }
                else
                {
                    value:* = Math.round(100 / m_aUrls.length);
                    LoadingManager.getInstance().currentPercent = LoadingManager.getInstance().currentPercent + value;
                    loader.fOnLoading = (event:ProgressEvent) : void
            {
                _loc_2:* = event.bytesLoaded * 100 / event.bytesTotal * (value * 0.01);
                LoadingManager.getInstance().percent = _loc_2;
                return;
            }// end function
            ;
                }
            }
            loader.load(m_aUrls[(m_uCurrentLoading - 1)], bGame);
            aLoaders[m_aUrls[(m_uCurrentLoading - 1)]] = loader;
            if (bGame)
            {
                currentGameLoader = loader;
            }
            return;
        }// end function

        public get currentLoading() : uint
        {
            return m_uCurrentLoading;
        }// end function

        public set currentLoading(value:uint) : void
        {
            m_uCurrentLoading = value;
            return;
        }// end function

        public static getInstance() : LoaderManager
        {
            if (!m_instance)
            {
                m_instance = new LoaderManager(new Singleton());
            }
            return m_instance;
        }// end function

	}
}