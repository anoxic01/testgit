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
            var TableDTF = (function (_super) {
                __extends(TableDTF, _super);
                function TableDTF() {
                    return _super.call(this) || this;
                }
                return TableDTF;
            }(table.Table));
            table.TableDTF = TableDTF;
            __reflect(TableDTF.prototype, "lobby.view.table.TableDTF");
        })(table = view.table || (view.table = {}));
    })(view = lobby.view || (lobby.view = {}));
})(lobby || (lobby = {}));
//# sourceMappingURL=TableDTF.js.map