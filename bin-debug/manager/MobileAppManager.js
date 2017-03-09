var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var manager;
(function (manager) {
    var MobileAppManager = (function () {
        function MobileAppManager() {
        }
        MobileAppManager.getInstance = function () {
            if (this.instance == null) {
                this.instance = new MobileAppManager();
            }
            return this.instance;
        };
        MobileAppManager.prototype.togglePanel = function () {
            if (this.m_maMainUI && this.m_maMainUI.isShow) {
                this.hidePannel();
            }
            else {
                this.showPannel();
            }
        };
        MobileAppManager.prototype.showPannel = function () {
            if (this.m_bIsLoaded == false) {
            }
            else {
                this.show();
            }
        };
        MobileAppManager.prototype.onLoadComplete = function (event) {
            if (this.m_bIsLoaded == false) {
                // LobbyManager.getInstance().lobbyView.hideLoading();
                manager.BitmapManager.getInstance().initMobileApp();
                // this.m_loader.contentLoaderInfo.removeEventListener(Event.COMPLETE,onLoadComplete);
                // this.m_loader.contentLoaderInfo.removeEventListener(IOErrorEvent.IO_ERROR,onLoadError);
                this.m_bIsLoaded = true;
                this.show();
            }
        };
        MobileAppManager.prototype.show = function () {
            if (this.m_bIsLoaded == false)
                return;
            // this.m_maMainUI = new lobby.view.theme.MobileAppUI(getInstanceByNameFromDomain("Link_Mobile_App"));
            this.m_maMainUI.fOnClose = this.hidePannel;
            if (this.m_maMainUI.isShow)
                return;
            this.m_maMainUI.show();
            this.m_maMainUI.x = manager.LobbyManager.getInstance().stageW * 0.5;
            this.m_maMainUI.y = manager.LobbyManager.getInstance().stageH * 0.5;
            manager.LobbyManager.getInstance().lobbyView.spShieldLayer.alpha = 1;
            manager.LobbyManager.getInstance().lobbyView.spShieldLayer.graphics.beginFill(0x000000, 0.5);
            manager.LobbyManager.getInstance().lobbyView.spShieldLayer.graphics.drawRect(0, 0, manager.LobbyManager.getInstance().stageW, manager.LobbyManager.getInstance().stageH + 100);
            manager.LobbyManager.getInstance().lobbyView.spShieldLayer.graphics.endFill();
            manager.LobbyManager.getInstance().lobbyView.spWindowLayer.addChild(this.m_maMainUI);
            this.m_maMainUI.scaleX = define.Define.SCALE_MIN;
            this.m_maMainUI.scaleY = define.Define.SCALE_MIN;
            // TweenLite.to(this.m_maMainUI,define.Define.SPEED,{scaleX:1, scaleY:1});
            // SoundManager.getInstance().play(SoundPackage.sPopupPanel);
        };
        /**
         * 隱藏下注紀錄面板
         */
        MobileAppManager.prototype.hidePannel = function (_bTween) {
            if (_bTween === void 0) { _bTween = true; }
            if (this.m_maMainUI == null)
                return;
            if (this.m_maMainUI.isShow == false)
                return;
            this.m_maMainUI.hide();
            if (_bTween) {
            }
            else {
                manager.LobbyManager.getInstance().lobbyView.spShieldLayer.graphics.clear();
                if (this.m_maMainUI.parent) {
                    this.m_maMainUI.parent.removeChild(this.m_maMainUI);
                    this.m_maMainUI.destroy();
                    this.m_maMainUI = null;
                }
            }
        };
        MobileAppManager.prototype.onChangeLanguage = function () {
            if (this.m_maMainUI) {
                this.m_maMainUI.onChangeLanguage();
            }
        };
        // private onLoadError(event:IOErrorEvent):void
        // {
        // 	console.log("MobileAppManager.onLoadError: "+event.text);
        // }
        /**
         * 从mobileApp.swf中取
         * @param sClassName
         * @return
         */
        MobileAppManager.prototype.getInstanceByNameFromDomain = function (sClassName) {
            var _class;
            // try
            // {
            // 	_class = this.m_loader.contentLoaderInfo.applicationDomain.getDefinition(sClassName);
            // }
            // catch (error:Error)
            // {
            // 	console.log(sClassName + " 不存在于外部加载的mobileapp.swf文件");
            // }
            return new _class();
        };
        return MobileAppManager;
    }());
    manager.MobileAppManager = MobileAppManager;
    __reflect(MobileAppManager.prototype, "manager.MobileAppManager");
})(manager || (manager = {}));
//# sourceMappingURL=MobileAppManager.js.map