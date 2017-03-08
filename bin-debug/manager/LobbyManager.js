var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var manager;
(function (manager) {
    var LobbyManager = (function () {
        function LobbyManager() {
        }
        LobbyManager.getInstance = function () {
            if (this.instance == null) {
                this.instance = new LobbyManager();
            }
            return this.instance;
        };
        LobbyManager.prototype.initialize = function ($lobbyAuth, $lobbyView) {
            this.lobbyAuth = $lobbyAuth;
            this.lobbyView = $lobbyView;
        };
        return LobbyManager;
    }());
    manager.LobbyManager = LobbyManager;
    __reflect(LobbyManager.prototype, "manager.LobbyManager");
})(manager || (manager = {}));
//# sourceMappingURL=LobbyManager.js.map