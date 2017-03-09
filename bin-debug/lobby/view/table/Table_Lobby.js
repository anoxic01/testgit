var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var lobby;
(function (lobby) {
    var view;
    (function (view) {
        var table;
        (function (table) {
            var Table_Lobby = (function () {
                function Table_Lobby() {
                }
                return Table_Lobby;
            }());
            table.Table_Lobby = Table_Lobby;
            __reflect(Table_Lobby.prototype, "lobby.view.table.Table_Lobby");
        })(table = view.table || (view.table = {}));
    })(view = lobby.view || (lobby.view = {}));
})(lobby || (lobby = {}));
//# sourceMappingURL=Table_Lobby.js.map