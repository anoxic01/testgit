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
            var TableBaccarat = (function (_super) {
                __extends(TableBaccarat, _super);
                function TableBaccarat() {
                    return _super.call(this) || this;
                }
                return TableBaccarat;
            }(table.Table));
            table.TableBaccarat = TableBaccarat;
            __reflect(TableBaccarat.prototype, "lobby.view.table.TableBaccarat");
        })(table = view.table || (view.table = {}));
    })(view = lobby.view || (lobby.view = {}));
})(lobby || (lobby = {}));
//# sourceMappingURL=TableBaccarat.js.map