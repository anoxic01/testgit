var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 帧刷新器
 */
var JFramer = (function (_super) {
    __extends(JFramer, _super);
    function JFramer() {
        var _this = _super.call(this) || this;
        _this.isStarting = false;
        _this.name = "";
        _this.name = "JFramer";
        return _this;
    }
    JFramer.prototype.start = function () {
        JuggleManager.instance.addJuggle(this);
        this.isStarting = true;
    };
    JFramer.prototype.stop = function () {
        this.isStarting = false;
        JuggleManager.instance.removeJuggle(this);
    };
    JFramer.prototype.addFramerCallback = function (tick, thisArg) {
        this.frameHandler = tick;
        this.thisArg = thisArg;
    };
    JFramer.prototype.onJuggle = function (value) {
        if (this.frameHandler != null) {
            this.frameHandler.apply(this.thisArg);
        }
    };
    JFramer.prototype.dispose = function () {
        this.stop();
        this.thisArg = null;
        this.frameHandler = null;
        if (JFramer.framerPool.indexOf(this) < 0)
            JFramer.framerPool.push(this);
    };
    JFramer.getFramer = function () {
        var $framer;
        if (JFramer.framerPool.length > 0) {
            $framer = JFramer.framerPool.shift();
        }
        else
            $framer = new JFramer();
        return $framer;
    };
    Object.defineProperty(JFramer.prototype, "running", {
        get: function () { return this.isStarting; },
        enumerable: true,
        configurable: true
    });
    JFramer.prototype.toString = function () {
        return "[Object JFramer name=" + name + "]";
    };
    return JFramer;
}(egret.HashObject));
JFramer.framerPool = new Array();
__reflect(JFramer.prototype, "JFramer", ["IJuggle"]);
//# sourceMappingURL=JFramer.js.map