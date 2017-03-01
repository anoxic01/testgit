var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TransformTarget = (function (_super) {
    __extends(TransformTarget, _super);
    function TransformTarget(target, sp, ep, speed) {
        var _this = _super.call(this, target) || this;
        _this.startPoint = sp;
        _this.endPoint = ep;
        _this.speed = speed;
        _this.framer = JFramer.getFramer();
        _this.framer.addFramerCallback(_this.onFrame, _this);
        return _this;
    }
    TransformTarget.prototype.start = function () {
        this.target.x = this.startPoint.x;
        this.target.y = this.startPoint.y;
        var xx = this.endPoint.x - this.startPoint.x;
        var yy = this.endPoint.y - this.startPoint.y;
        var len = Math.sqrt(xx * xx + yy * yy);
        this.step = Math.floor(len / this.speed);
        this.speedX = xx / this.step;
        this.speedY = yy / this.step;
        this.framer.start();
        _super.prototype.start.call(this);
    };
    TransformTarget.prototype.onFrame = function () {
        if (this.step > 0) {
            this.step--;
            this.target.x += this.speedX;
            this.target.y += this.speedY;
        }
        else {
            this.complete();
        }
    };
    TransformTarget.prototype.end = function () {
        _super.prototype.end.call(this);
        this.target.x = this.endPoint.x;
        this.target.y = this.endPoint.y;
    };
    TransformTarget.prototype.dispose = function () {
        this.framer.dispose();
        this.framer = null;
        _super.prototype.dispose.call(this);
    };
    return TransformTarget;
}(BaseEffect));
__reflect(TransformTarget.prototype, "TransformTarget");
//# sourceMappingURL=TransformTarget.js.map