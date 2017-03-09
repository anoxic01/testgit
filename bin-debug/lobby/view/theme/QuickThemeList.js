var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var lobby;
(function (lobby) {
    var view;
    (function (view) {
        var theme;
        (function (theme) {
            var QuickThemeList = (function () {
                function QuickThemeList() {
                }
                return QuickThemeList;
            }());
            theme.QuickThemeList = QuickThemeList;
            __reflect(QuickThemeList.prototype, "lobby.view.theme.QuickThemeList");
        })(theme = view.theme || (view.theme = {}));
    })(view = lobby.view || (lobby.view = {}));
})(lobby || (lobby = {}));
//# sourceMappingURL=QuickThemeList.js.map