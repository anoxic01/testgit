module manager {
	export class MobileAppManager {

		private m_maMainUI						:	lobby.view.theme.MobileAppUI;
		// private m_loader						:	Loader;
		private m_bIsLoaded						:	 boolean;

		private static instance	:	MobileAppManager;

		public static getInstance():MobileAppManager{
            	if(this.instance == null){
                    this.instance = new MobileAppManager();
            	}
            	return this.instance;
     	}
		
		public constructor() {
		}

		public togglePanel():void
		{
			if(this.m_maMainUI&&this.m_maMainUI.isShow)
			{
				this.hidePannel();
			}
			else
			{
				this.showPannel();
			}
		}
		public showPannel():void {
			if(this.m_bIsLoaded==false)
			{
				// if(this.m_loader==null)
				// {
				// 	this.m_loader = new Loader();
				// 	this.m_loader.contentLoaderInfo.addEventListener(Event.COMPLETE, onLoadComplete);
				// 	this.m_loader.contentLoaderInfo.addEventListener(IOErrorEvent.IO_ERROR, onLoadError);
				// }
				// this.m_loader.load(new URLRequest(UrlManager.getInstance().getSwfUrl(Define.SWF_MOBILE_APP)), new LoaderContext(false, ApplicationDomain.currentDomain));
				// manager.LobbyManager.getInstance().lobbyView.showLoading();
			}
			else
			{
				this.show();
			}
		}
		private onLoadComplete(event:Event):void
		{
			if(this.m_bIsLoaded==false)
			{
				// LobbyManager.getInstance().lobbyView.hideLoading();
				BitmapManager.getInstance().initMobileApp();
				// this.m_loader.contentLoaderInfo.removeEventListener(Event.COMPLETE,onLoadComplete);
				// this.m_loader.contentLoaderInfo.removeEventListener(IOErrorEvent.IO_ERROR,onLoadError);
				this.m_bIsLoaded = true;
				this.show();
			}
		}
		private show():void
		{
			if(this.m_bIsLoaded==false)
				return;
			// this.m_maMainUI = new lobby.view.theme.MobileAppUI(getInstanceByNameFromDomain("Link_Mobile_App"));
			this.m_maMainUI.fOnClose = this.hidePannel;
			if(this.m_maMainUI.isShow)
				return;
			this.m_maMainUI.show();
			this.m_maMainUI.x = LobbyManager.getInstance().stageW * 0.5;
			this.m_maMainUI.y = LobbyManager.getInstance().stageH * 0.5;
			LobbyManager.getInstance().lobbyView.spShieldLayer.alpha = 1;
			LobbyManager.getInstance().lobbyView.spShieldLayer.graphics.beginFill(0x000000,0.5);
			LobbyManager.getInstance().lobbyView.spShieldLayer.graphics.drawRect(0,0,LobbyManager.getInstance().stageW,LobbyManager.getInstance().stageH+100);
			LobbyManager.getInstance().lobbyView.spShieldLayer.graphics.endFill();
			LobbyManager.getInstance().lobbyView.spWindowLayer.addChild( this.m_maMainUI );
			this.m_maMainUI.scaleX = define.Define.SCALE_MIN;
			this.m_maMainUI.scaleY = define.Define.SCALE_MIN;
			// TweenLite.to(this.m_maMainUI,define.Define.SPEED,{scaleX:1, scaleY:1});
			// SoundManager.getInstance().play(SoundPackage.sPopupPanel);
		}
		/**
		 * 隱藏下注紀錄面板
		 */
		public hidePannel(_bTween: boolean=true):void 
		{
			if(this.m_maMainUI==null)
				return;
			if(this.m_maMainUI.isShow==false)
				return;
			this.m_maMainUI.hide();
			if(_bTween){
				// TweenLite.to(this.m_maMainUI,define.Define.SPEED,{scaleX:define.Define.SCALE_MIN, scaleY:define.Define.SCALE_MIN, onComplete:function():void{
				// 	TweenLite.to(LobbyManager.getInstance().lobbyView.spShieldLayer, define.Define.SPEED, {alpha:0, onComplete:function():void{
				// 		LobbyManager.getInstance().lobbyView.spShieldLayer.graphics.clear();
				// 	}});
				// 	if(this.m_maMainUI){
				// 		this.m_maMainUI.parent.removeChild(this.m_maMainUI);
				// 	}
				// 	this.m_maMainUI.destroy();
				// 	this.m_maMainUI = null;
				// }});
			}else{
				LobbyManager.getInstance().lobbyView.spShieldLayer.graphics.clear();
				if(this.m_maMainUI.parent){
					this.m_maMainUI.parent.removeChild(this.m_maMainUI);
					this.m_maMainUI.destroy();
					this.m_maMainUI = null;
				}
			}
		}
		public onChangeLanguage():void 
		{
			if(this.m_maMainUI)
			{
				this.m_maMainUI.onChangeLanguage();
			}
		}
		// private onLoadError(event:IOErrorEvent):void
		// {
		// 	console.log("MobileAppManager.onLoadError: "+event.text);
		// }
		/**
		 * 从mobileApp.swf中取
		 * @param sClassName
		 * @return 
		 */		
		public getInstanceByNameFromDomain(sClassName:string):any{
			let _class;
			// try
			// {
			// 	_class = this.m_loader.contentLoaderInfo.applicationDomain.getDefinition(sClassName);
			// }
			// catch (error:Error)
			// {
			// 	console.log(sClassName + " 不存在于外部加载的mobileapp.swf文件");
			// }
			return new _class();
		}


	}
}