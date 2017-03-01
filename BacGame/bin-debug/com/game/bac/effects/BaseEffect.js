var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseEffect = (function (_super) {
    __extends(BaseEffect, _super);
    function BaseEffect(target) {
        var _this = _super.call(this) || this;
        _this._running = false;
        _this.target = target;
        return _this;
    }
    Object.defineProperty(BaseEffect.prototype, "running", {
        get: function () {
            return this._running;
        },
        enumerable: true,
        configurable: true
    });
    BaseEffect.prototype.setComplete = function (v, thisArg) {
        this.onComplete = v;
        this.thisArg = thisArg;
    };
    BaseEffect.prototype.complete = function () {
        if (this.onComplete != null) {
            this.onComplete.call(this.thisArg);
        }
        this._running = false;
        this.end();
        this.dispose();
    };
    BaseEffect.prototype.start = function () {
        this._running = true;
    };
    BaseEffect.prototype.stop = function () {
        this._running = false;
    };
    BaseEffect.prototype.end = function () {
        this._running = false;
        this.stop();
    };
    BaseEffect.prototype.dispose = function () {
        this._running = false;
        this.target = null;
        this.onComplete = null;
        this.thisArg = null;
    };
    return BaseEffect;
}(egret.HashObject));
__reflect(BaseEffect.prototype, "BaseEffect");
//# sourceMappingURL=BaseEffect.js.map