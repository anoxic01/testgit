var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var JuggleManager = (function () {
    function JuggleManager() {
        this.juggleDict = new Dictionary();
        this.currentJuggleTime = 0;
        this.lastJuggleTime = 0;
        this.isStartJuggle = false;
        this._useEnterFrame = false;
        this.juggles = new Array();
    }
    Object.defineProperty(JuggleManager, "instance", {
        get: function () {
            if (this._instance == null)
                this._instance = new JuggleManager;
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    JuggleManager.prototype.addJuggle = function (juggle) {
        if (this.juggleDict.get(juggle) != null)
            return;
        this.juggleDict.add(juggle, true);
        this.juggles.push(juggle);
        if (this.juggles.length > 0) {
            this.startJuggle();
        }
    };
    JuggleManager.prototype.removeJuggle = function (juggle) {
        if (this.juggleDict.get(juggle) == null)
            return;
        this.juggleDict.delete(juggle);
        var index = this.juggles.indexOf(juggle);
        if (index > -1)
            this.juggles.splice(index, 1);
        if (this.juggles.length <= 0) {
            this.stopJuggle();
        }
    };
    /**
     * 开启
     */
    JuggleManager.prototype.startJuggle = function () {
        if (this.isStartJuggle)
            return;
        this.isStartJuggle = true;
        this.lastJuggleTime = egret.getTimer();
        this.startTimer();
    };
    JuggleManager.prototype.startTimer = function () {
        if (this.useEnterFrame) {
            if (this.juggleTimer == null)
                this.juggleTimer = new egret.Sprite();
            this.juggleTimer.removeEventListener(egret.Event.ENTER_FRAME, this.onJuggle, this);
            this.juggleTimer.addEventListener(egret.Event.ENTER_FRAME, this.onJuggle, this);
        }
        else {
            if (this.juggleTimer == null) {
                this.juggleTimer = new egret.Timer(33);
                this.juggleTimer.addEventListener(egret.TimerEvent.TIMER, this.onJuggle, this);
            }
            this.juggleTimer.start();
        }
    };
    /**
     * 停止
     */
    JuggleManager.prototype.stopJuggle = function () {
        if (this.isStartJuggle == false)
            return;
        this.isStartJuggle = false;
        this.stopTimer();
    };
    JuggleManager.prototype.stopTimer = function () {
        if (this.juggleTimer == null)
            return;
        if (this.useEnterFrame) {
            this.juggleTimer.removeEventListener(egret.Event.ENTER_FRAME, this.onJuggle, this);
        }
        else {
            this.juggleTimer.stop();
        }
    };
    JuggleManager.prototype.onJuggle = function (e) {
        var _this = this;
        var currentTime = egret.getTimer();
        this.currentJuggleTime = currentTime - this.lastJuggleTime;
        if (this.currentJuggleTime > 1000) {
            this.currentJuggleTime = 0;
        }
        this.juggles.forEach(function (element) {
            element.onJuggle(_this.currentJuggleTime);
        });
        this.lastJuggleTime = currentTime;
    };
    Object.defineProperty(JuggleManager.prototype, "useEnterFrame", {
        /**
         *默认使用Enterframe作为计时，如果为false则使用timer
        */
        get: function () {
            return this._useEnterFrame;
        },
        set: function (value) {
            if (this._useEnterFrame == value)
                return;
            this.stopJuggle(); //// 停止原有的计时器
            if (this._useEnterFrame == false && this.juggleTimer != null) {
                this.juggleTimer.removeEventListener(egret.TimerEvent.TIMER, this.onJuggle, this);
            }
            this.juggleTimer = null; ///// 置空原有计时器
            this._useEnterFrame = value;
            if (this.juggles.length > 0) {
                this.startJuggle(); /// 用新的方式重新启动计时器
            }
        },
        enumerable: true,
        configurable: true
    });
    return JuggleManager;
}());
__reflect(JuggleManager.prototype, "JuggleManager");
//# sourceMappingURL=JuggleManager.js.map