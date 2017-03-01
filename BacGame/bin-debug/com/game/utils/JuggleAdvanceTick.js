var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JuggleAdvanceTick = (function (_super) {
    __extends(JuggleAdvanceTick, _super);
    function JuggleAdvanceTick() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         *每次执行的间隔
        */
        _this.juggleInterval = 0;
        _this.time = 0;
        return _this;
    }
    JuggleAdvanceTick.prototype.onJuggle = function (value) {
        this.time += value;
        while (this.time >= this.juggleInterval) {
            this.time -= this.juggleInterval;
            if (this.onTick != null) {
                this.onTick.apply(this.thisArg);
            }
        }
    };
    JuggleAdvanceTick.prototype.setTick = function (tick, thisArg) {
        this.onTick = tick;
        this.thisArg = thisArg;
    };
    JuggleAdvanceTick.prototype.setFrameRate = function (frameRate) {
        if (frameRate <= 0)
            return;
        this.juggleInterval = 1000 / frameRate;
    };
    /**
     * 清除time
     */
    JuggleAdvanceTick.prototype.clear = function () {
        this.time = 0;
    };
    JuggleAdvanceTick.prototype.dispose = function () {
        this.time = 0;
        this.juggleInterval = 0;
        this.onTick = null;
    };
    return JuggleAdvanceTick;
}(egret.HashObject));
__reflect(JuggleAdvanceTick.prototype, "JuggleAdvanceTick");
//# sourceMappingURL=JuggleAdvanceTick.js.map