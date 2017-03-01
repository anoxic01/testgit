var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 延时到下一帧执行
 */
var JDelayFramer = (function (_super) {
    __extends(JDelayFramer, _super);
    function JDelayFramer() {
        var _this = _super.call(this) || this;
        _this.isStarting = false;
        _this.name = "";
        return _this;
    }
    JDelayFramer.prototype.start = function () {
        JuggleManager.instance.addJuggle(this);
        this.isStarting = true;
    };
    JDelayFramer.prototype.stop = function () {
        this.isStarting = false;
        JuggleManager.instance.removeJuggle(this);
    };
    JDelayFramer.prototype.addFramerCallback = function (tick, thisArg) {
        this.frameHandler = tick;
        this.thisArg = thisArg;
    };
    JDelayFramer.prototype.onJuggle = function (value) {
        if (this.frameHandler != null) {
            this.frameHandler.apply(this.thisArg);
        }
        this.dispose();
    };
    JDelayFramer.prototype.dispose = function () {
        JDelayFramer.delayFramerDict.delete(this.thisArg);
        this.stop();
        this.thisArg = null;
        this.frameHandler = null;
        if (JDelayFramer.framerPool.indexOf(this) < 0)
            JDelayFramer.framerPool.push(this);
    };
    JDelayFramer.getJDelayFramer = function () {
        var $framer;
        if (JDelayFramer.framerPool.length > 0) {
            $framer = JDelayFramer.framerPool.shift();
        }
        else
            $framer = new JDelayFramer();
        return $framer;
    };
    JDelayFramer.prototype.toString = function () {
        return "[Object JFramer name=" + name + "]";
    };
    JDelayFramer.delayFrame = function (tick, thisArg) {
        if (JDelayFramer.delayFramerDict.get(thisArg) == tick) {
            return;
        }
        var framer = JDelayFramer.getJDelayFramer();
        JDelayFramer.delayFramerDict.add(thisArg, tick);
        framer.addFramerCallback(tick, thisArg);
        framer.start();
    };
    return JDelayFramer;
}(egret.HashObject));
JDelayFramer.framerPool = new Array();
JDelayFramer.delayFramerDict = new Dictionary();
__reflect(JDelayFramer.prototype, "JDelayFramer", ["IJuggle"]);
//# sourceMappingURL=JDelayFramer.js.map