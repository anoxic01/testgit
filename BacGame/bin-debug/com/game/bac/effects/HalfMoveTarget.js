var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var HalfMoveTarget = (function (_super) {
    __extends(HalfMoveTarget, _super);
    function HalfMoveTarget(target, sp, ep, halfTime) {
        var _this = _super.call(this, target) || this;
        _this.startPoint = sp;
        _this.endPoint = ep;
        _this.halfTime = halfTime;
        _this.framer = JFramer.getFramer();
        _this.framer.addFramerCallback(_this.onFrame, _this);
        return _this;
    }
    HalfMoveTarget.prototype.start = function () {
        this.target.x = this.startPoint.x;
        this.target.y = this.startPoint.y;
        this.framer.start();
        _super.prototype.start.call(this);
    };
    HalfMoveTarget.prototype.onFrame = function () {
        var xx = this.endPoint.x - this.target.x;
        var yy = this.endPoint.y - this.target.y;
        xx /= this.halfTime;
        yy /= this.halfTime;
        this.target.x += xx;
        this.target.y += yy;
        if (Math.abs(xx) < 0.01 && Math.abs(yy) < 0.01) {
            this.complete();
        }
    };
    HalfMoveTarget.prototype.end = function () {
        _super.prototype.end.call(this);
        this.target.x = this.endPoint.x;
        this.target.y = this.endPoint.y;
    };
    HalfMoveTarget.prototype.dispose = function () {
        this.framer.dispose();
        this.framer = null;
        _super.prototype.dispose.call(this);
    };
    return HalfMoveTarget;
}(BaseEffect));
__reflect(HalfMoveTarget.prototype, "HalfMoveTarget");
//# sourceMappingURL=HalfMoveTarget.js.map