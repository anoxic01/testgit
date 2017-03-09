var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var lobby;
(function (lobby) {
    var view;
    (function (view) {
        var table;
        (function (table) {
            var TableLogin = (function () {
                function TableLogin() {
                }
                return TableLogin;
            }());
            table.TableLogin = TableLogin;
            __reflect(TableLogin.prototype, "lobby.view.table.TableLogin");
        })(table = view.table || (view.table = {}));
    })(view = lobby.view || (lobby.view = {}));
})(lobby || (lobby = {}));
//# sourceMappingURL=TableLogin.js.map