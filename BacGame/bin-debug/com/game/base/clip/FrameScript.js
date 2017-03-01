var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var FrameScript = (function () {
    function FrameScript() {
        this.frams = new Dictionary;
        this.frameArgs = new Dictionary;
    }
    FrameScript.prototype.addFrameScript = function (frame, callBack, thisArg, args) {
        if (this.frams.get(frame) == null)
            this.frams.add(frame, []);
        var arr = this.frams.get(frame);
        var index = arr.indexOf(callBack);
        if (index < 0)
            arr.push(callBack);
        this.frameArgs.add(callBack, { args: args, thisArg: thisArg });
    };
    FrameScript.prototype.removeFrameScript = function (frame, callBack) {
        if (callBack === void 0) { callBack = null; }
        if (this.frams.get(frame) == null)
            return;
        var arr = this.frams.get(frame);
        if (callBack == null) {
            while (arr.length > 0) {
                this.frameArgs.delete(arr.shift());
            }
            this.frams.delete(frame);
        }
        else {
            this.frameArgs.delete(callBack);
            arr.splice(arr.indexOf(callBack), 1);
            if (arr.length == 0)
                this.frams.delete(frame);
        }
    };
    FrameScript.prototype.execute = function (frame) {
        var _this = this;
        var arr = this.frams.get(frame);
        arr.forEach(function (f) {
            if (f != null) {
                var data = _this.frameArgs.get(f);
                f.apply(data.thisArg, data.args);
            }
        });
    };
    FrameScript.prototype.clear = function () {
        this.frams.clear();
        this.frameArgs.clear();
    };
    FrameScript.prototype.dispose = function () {
        this.frams.dispose();
        this.frameArgs.dispose();
        this.frams = null;
        this.frameArgs = null;
    };
    return FrameScript;
}());
__reflect(FrameScript.prototype, "FrameScript");
//# sourceMappingURL=FrameScript.js.map