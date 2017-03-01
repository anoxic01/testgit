var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JTimer = (function (_super) {
    __extends(JTimer, _super);
    /**
     *
     * @param interval
     * @param timeHandler
     *
     */
    function JTimer(delay, repeatCount) {
        if (repeatCount === void 0) { repeatCount = -1; }
        var _this = _super.call(this) || this;
        _this.name = "";
        _this.timeHandler = null;
        _this.completeHandler = null;
        _this._repeatCount = -1;
        _this.isStarting = false;
        _this.lastSetRepeatCount = -1;
        _this._currentCount = 0;
        _this.name = "JTimer";
        _this.juggleTick = new JuggleAdvanceTick();
        _this.juggleTick.setTick(_this.onRenderer, _this);
        if (delay <= 0)
            delay = Number.MAX_VALUE;
        _this.delay = delay;
        _this.repeatCount = repeatCount;
        return _this;
    }
    JTimer.prototype.addTimerCallback = function (tick, timeComplete, thisArg) {
        if (timeComplete === void 0) { timeComplete = null; }
        this.timeHandler = tick;
        this.completeHandler = timeComplete;
        this.thisArg = thisArg;
    };
    JTimer.prototype.onRenderer = function () {
        if (this.isStarting == false)
            return;
        this._currentCount++;
        if (this.timeHandler != null) {
            if (this.timeHandler.length == 0) {
                this.timeHandler.apply(this.thisArg);
            }
            else {
                this.timeHandler.apply(this.thisArg, this);
            }
        }
        if (this.repeatCount > 0) {
            this._repeatCount--;
            if (this.repeatCount == 0) {
                this.stop();
                if (this.completeHandler != null) {
                    if (this.completeHandler.length == 0) {
                        this.completeHandler.apply(this.thisArg);
                    }
                    else {
                        this.completeHandler.apply(this.thisArg, this);
                    }
                }
            }
        }
    };
    JTimer.prototype.start = function () {
        this.repeatCount = this.lastSetRepeatCount;
        if (this.isStarting)
            return;
        JuggleManager.instance.addJuggle(this);
        this.isStarting = true;
    };
    JTimer.prototype.stop = function () {
        if (!this.isStarting)
            return;
        this.isStarting = false;
        JuggleManager.instance.removeJuggle(this);
    };
    JTimer.prototype.reset = function () {
        this.stop();
        this.juggleTick.clear();
        this.repeatCount = this.lastSetRepeatCount;
    };
    Object.defineProperty(JTimer.prototype, "repeatCount", {
        get: function () { return this._repeatCount; },
        set: function (value) {
            this._repeatCount = value;
            this.lastSetRepeatCount = this._repeatCount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JTimer.prototype, "delay", {
        get: function () { return this.juggleTick.juggleInterval; },
        set: function (value) {
            this.juggleTick.juggleInterval = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JTimer.prototype, "running", {
        get: function () { return this.isStarting; },
        enumerable: true,
        configurable: true
    });
    JTimer.prototype.onJuggle = function (value) {
        this.juggleTick.onJuggle(value);
    };
    Object.defineProperty(JTimer.prototype, "currentCount", {
        get: function () { return this._currentCount; },
        enumerable: true,
        configurable: true
    });
    JTimer.prototype.dispose = function () {
        this.stop();
        this.delay = Number.MAX_VALUE;
        this.repeatCount = -1;
        this.juggleTick.clear();
        this.completeHandler = null;
        this.name = "";
        this._currentCount = 0;
        this.timeHandler = null;
        this.lastSetRepeatCount = -1;
        if (JTimer.timerPool.indexOf(this) < 0) {
            JTimer.timerPool.push(this);
        }
    };
    /**
     * 从对象池内获取一个定时器
     */
    JTimer.getTimer = function (delay, repeatCount) {
        if (repeatCount === void 0) { repeatCount = -1; }
        var $timer;
        if (JTimer.timerPool.length > 0) {
            $timer = JTimer.timerPool.shift();
            $timer.delay = delay;
            $timer.repeatCount = repeatCount;
        }
        else
            $timer = new JTimer(delay, repeatCount);
        return $timer;
    };
    JTimer.prototype.toString = function () {
        return "[Object JTimer name=" + name + " delay=" + this.delay + " repeatCount=" + this.lastSetRepeatCount + " tick=" + this.timeHandler + " tickComplete=" + this.completeHandler + "]";
    };
    return JTimer;
}(egret.HashObject));
JTimer.timerPool = new Array();
__reflect(JTimer.prototype, "JTimer", ["IJuggle"]);
//# sourceMappingURL=JTimer.js.map