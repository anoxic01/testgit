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
        var table;
        (function (table) {
            var TableRoulette = (function (_super) {
                __extends(TableRoulette, _super);
                function TableRoulette() {
                    return _super.call(this) || this;
                }
                return TableRoulette;
            }(table.Table));
            table.TableRoulette = TableRoulette;
            __reflect(TableRoulette.prototype, "lobby.view.table.TableRoulette");
        })(table = view.table || (view.table = {}));
    })(view = lobby.view || (lobby.view = {}));
})(lobby || (lobby = {}));
//# sourceMappingURL=TableRoulette.js.map