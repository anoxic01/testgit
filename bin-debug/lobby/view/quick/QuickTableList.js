var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var lobby;
(function (lobby) {
    var view;
    (function (view) {
        var quick;
        (function (quick) {
            var QuickTableList = (function () {
                function QuickTableList() {
                }
                return QuickTableList;
            }());
            quick.QuickTableList = QuickTableList;
            __reflect(QuickTableList.prototype, "lobby.view.quick.QuickTableList");
        })(quick = view.quick || (view.quick = {}));
    })(view = lobby.view || (lobby.view = {}));
})(lobby || (lobby = {}));
//# sourceMappingURL=QuickTableList.js.map