var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 可以设置帧频的
 */
var JFrameTicker = (function (_super) {
    __extends(JFrameTicker, _super);
    function JFrameTicker() {
        var _this = _super.call(this) || this;
        _this.name = "";
        _this.isStarting = false;
        _this.name = "JFrameTicker";
        _this.juggleTick = new JuggleAdvanceTick();
        _this.juggleTick.setTick(_this.onRenderer, _this);
        _this.setFrameRate(30);
        return _this;
    }
    JFrameTicker.prototype.start = function () {
        JuggleManager.instance.addJuggle(this);
        this.isStarting = true;
    };
    JFrameTicker.prototype.stop = function () {
        this.isStarting = false;
        JuggleManager.instance.removeJuggle(this);
    };
    JFrameTicker.prototype.addFramerCallback = function (tick, thisArg) {
        this.frameHandler = tick;
        this.thisArg = thisArg;
    };
    JFrameTicker.prototype.onJuggle = function (value) {
        this.juggleTick.onJuggle(value);
    };
    JFrameTicker.prototype.onRenderer = function () {
        if (this.frameHandler != null) {
            this.frameHandler.apply(this.thisArg);
        }
    };
    JFrameTicker.prototype.setFrameRate = function (value) {
        this.juggleTick.setFrameRate(value);
    };
    JFrameTicker.prototype.dispose = function () {
        this.stop();
        this.thisArg = null;
        this.frameHandler = null;
        this.setFrameRate(30);
        if (JFrameTicker.tickerPool.indexOf(this) < 0)
            JFrameTicker.tickerPool.push(this);
    };
    Object.defineProperty(JFrameTicker.prototype, "running", {
        get: function () { return this.isStarting; },
        enumerable: true,
        configurable: true
    });
    JFrameTicker.prototype.toString = function () {
        return "[Object JFrameTicker name=" + this.name + " frameRate=" + this.juggleTick + "]";
    };
    JFrameTicker.getFrameTicker = function () {
        var $framer;
        if (JFrameTicker.tickerPool.length > 0) {
            $framer = JFrameTicker.tickerPool.shift();
        }
        else
            $framer = new JFrameTicker();
        return $framer;
    };
    return JFrameTicker;
}(egret.HashObject));
JFrameTicker.tickerPool = new Array();
__reflect(JFrameTicker.prototype, "JFrameTicker", ["IJuggle"]);
//# sourceMappingURL=JFrameTicker.js.map