var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var lobby;
(function (lobby) {
    var view;
    (function (view) {
        var route;
        (function (route) {
            var StatisticsUI = (function () {
                function StatisticsUI() {
                }
                return StatisticsUI;
            }());
            route.StatisticsUI = StatisticsUI;
            __reflect(StatisticsUI.prototype, "lobby.view.route.StatisticsUI");
        })(route = view.route || (view.route = {}));
    })(view = lobby.view || (lobby.view = {}));
})(lobby || (lobby = {}));
//# sourceMappingURL=StatisticsUI.js.map