var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var lobby;
(function (lobby) {
    var data;
    (function (data) {
        var LobbyAuth = (function () {
            function LobbyAuth() {
                this.sAuthToken = ""; //認證碼 - 由Web端取得
                this.iIdentity = 0; //身份 - 0: 玩家, 1: 槍手, 2-试玩
                this.iLang = 0; //語系 0: CN, 1: TW, 2: EN
                this.iPlatform = 0; //遊戲平台 - 0: Web, 1: Mobile
                this.iLoginMode = 0; //登陆模式  0:網投 1:電投
                this.sServerIP = ""; //连接地址
                this.iServerPort = 0; //连接端口
                this.init = false;
                this.init = true;
            }
            return LobbyAuth;
        }());
        data.LobbyAuth = LobbyAuth;
        __reflect(LobbyAuth.prototype, "lobby.data.LobbyAuth");
    })(data = lobby.data || (lobby.data = {}));
})(lobby || (lobby = {}));
//# sourceMappingURL=LobbyAuth.js.map