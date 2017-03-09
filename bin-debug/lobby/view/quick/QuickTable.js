var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var lobby;
(function (lobby) {
    var view;
    (function (view) {
        var quick;
        (function (quick) {
            var QuickTable = (function () {
                function QuickTable() {
                }
                return QuickTable;
            }());
            quick.QuickTable = QuickTable;
            __reflect(QuickTable.prototype, "lobby.view.quick.QuickTable");
        })(quick = view.quick || (view.quick = {}));
    })(view = lobby.view || (lobby.view = {}));
})(lobby || (lobby = {}));
//# sourceMappingURL=QuickTable.js.map