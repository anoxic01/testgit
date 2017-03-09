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
            var Table = (function (_super) {
                __extends(Table, _super);
                function Table() {
                    var _this = _super.call(this) || this;
                    _this.m_sFaceUrl = ""; //头像路径
                    _this.m_bmpBg = tool.BitmapTool.getInstance().createBitmapByName("table_bg_lobby_default_png");
                    _this.addChild(_this.m_bmpBg);
                    _this.m_bmpBgOver = tool.BitmapTool.getInstance().createBitmapByName("table_bg_lobby_over.png");
                    return _this;
                }
                return Table;
            }(egret.DisplayObjectContainer));
            table.Table = Table;
            __reflect(Table.prototype, "lobby.view.table.Table");
        })(table = view.table || (view.table = {}));
    })(view = lobby.view || (lobby.view = {}));
})(lobby || (lobby = {}));
//# sourceMappingURL=Table.js.map