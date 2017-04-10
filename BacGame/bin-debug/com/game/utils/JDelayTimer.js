var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JDelayTimer = (function (_super) {
    __extends(JDelayTimer, _super);
    function JDelayTimer() {
        var _this = _super.call(this) || this;
        _this.name = "";
        _this.isStarting = false;
        _this.name = "JFrameTicker";
        _this.juggleTick = new JuggleAdvanceTick();
        _this.juggleTick.setTick(_this.onRenderer, _this);
        _this.setDelay(1000);
        return _this;
    }
    JDelayTimer.prototype.start = function () {
        JuggleManager.instance.addJuggle(this);
        this.isStarting = true;
    };
    JDelayTimer.prototype.stop = function () {
        this.isStarting = false;
        JuggleManager.instance.removeJuggle(this);
    };
    JDelayTimer.prototype.onJuggle = function (value) {
        this.juggleTick.onJuggle(value);
    };
    JDelayTimer.prototype.setDelay = function (value) {
        this.juggleTick.juggleInterval = value;
    };
    JDelayTimer.prototype.onRenderer = function () {
        if (this.frameHandler != null) {
            this.frameHandler.apply(this.thisArg);
        }
        this.dispose();
    };
    JDelayTimer.prototype.addTimerCallback = function (tick, thisArg) {
        this.frameHandler = tick;
        this.thisArg = thisArg;
    };
    JDelayTimer.prototype.dispose = function () {
        JDelayTimer.delayTimerDict.delete(this.thisArg);
        this.stop();
        this.thisArg = null;
        this.frameHandler = null;
        if (JDelayTimer.tickerPool.indexOf(this) < 0)
            JDelayTimer.tickerPool.push(this);
    };
    JDelayTimer.delayTime = function (tick, thisArg, delay) {
        if (JDelayTimer.delayTimerDict.get(thisArg) == tick) {
            return;
        }
        var timer = JDelayTimer.getJDelayFramer();
        JDelayTimer.delayTimerDict.add(thisArg, tick);
        timer.addTimerCallback(tick, thisArg);
        timer.setDelay(delay);
        timer.start();
    };
    JDelayTimer.getJDelayFramer = function () {
        var $framer;
        if (JDelayTimer.tickerPool.length > 0) {
            $framer = JDelayTimer.tickerPool.shift();
        }
        else
            $framer = new JDelayTimer();
        return $framer;
    };
    JDelayTimer.prototype.toString = function () {
        return "[Object JFramer name=" + name + "]";
    };
    return JDelayTimer;
}(egret.HashObject));
JDelayTimer.tickerPool = new Array();
JDelayTimer.delayTimerDict = new Dictionary();
__reflect(JDelayTimer.prototype, "JDelayTimer", ["IJuggle"]);
//# sourceMappingURL=JDelayTimer.js.map