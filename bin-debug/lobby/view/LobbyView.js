var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var lobby;
(function (lobby) {
    var view;
    (function (view) {
        var LobbyView = (function (_super) {
            __extends(LobbyView, _super);
            function LobbyView() {
                var _this = _super.call(this) || this;
                var lobbyAuth;
                lobbyAuth = new lobby.data.LobbyAuth();
                manager.LobbyManager.getInstance().initialize(lobbyAuth, _this);
                _this.information = new lobby.view.LobbyInformation();
                _this.addChild(_this.information);
                _this.toolList = new lobby.view.LobbyToolList();
                _this.addChild(_this.toolList);
                // console.log(this.toolList.width);
                _this.toolList.x = manager.LobbyManager.getInstance().stageW - 605;
                _this.toolList.y = 15;
                _this.ad = new lobby.view.Advertisement();
                _this.addChild(_this.ad);
                _this.ad.x = 0;
                _this.ad.y = 56;
                _this.panorama = new lobby.view.Panorama();
                _this.addChild(_this.panorama);
                _this.panorama.x = 1496;
                _this.panorama.y = 56;
                _this.themeList = new lobby.view.ThemeList();
                _this.addChild(_this.themeList);
                _this.themeList.x = 0;
                _this.themeList.y = 296;
                return _this;
            }
            return LobbyView;
        }(egret.DisplayObjectContainer));
        view.LobbyView = LobbyView;
        __reflect(LobbyView.prototype, "lobby.view.LobbyView");
    })(view = lobby.view || (lobby.view = {}));
})(lobby || (lobby = {}));
//# sourceMappingURL=LobbyView.js.map