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
            var TableSic = (function (_super) {
                __extends(TableSic, _super);
                function TableSic() {
                    return _super.call(this) || this;
                }
                return TableSic;
            }(table.Table));
            table.TableSic = TableSic;
            __reflect(TableSic.prototype, "lobby.view.table.TableSic");
        })(table = view.table || (view.table = {}));
    })(view = lobby.view || (lobby.view = {}));
})(lobby || (lobby = {}));
//# sourceMappingURL=TableSic.js.map