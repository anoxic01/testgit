var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var data;
(function (data) {
    var LobbyData = (function () {
        function LobbyData() {
        }
        LobbyData.getInstance = function () {
            if (this.instance == null) {
                this.instance = new LobbyData();
            }
            return this.instance;
        };
        return LobbyData;
    }());
    data.LobbyData = LobbyData;
    __reflect(LobbyData.prototype, "data.LobbyData");
})(data || (data = {}));
//# sourceMappingURL=LobbyData.js.map