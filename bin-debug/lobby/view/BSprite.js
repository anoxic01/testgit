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
        var BSprite = (function (_super) {
            __extends(BSprite, _super);
            function BSprite() {
                return _super.call(this) || this;
            }
            return BSprite;
        }(egret.Sprite));
        view.BSprite = BSprite;
        __reflect(BSprite.prototype, "lobby.view.BSprite");
    })(view = lobby.view || (lobby.view = {}));
})(lobby || (lobby = {}));
//# sourceMappingURL=BSprite.js.map