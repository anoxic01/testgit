var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JBitmapClip = (function (_super) {
    __extends(JBitmapClip, _super);
    function JBitmapClip() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JBitmapClip.prototype.initClip = function (clipData) {
        if (clipData === void 0) { clipData = null; }
        this.bitmap = this.addChild(new egret.Bitmap());
        _super.prototype.initClip.call(this, clipData);
    };
    JBitmapClip.prototype.rendererCurrentFrame = function () {
        if (this.bitmap == null || this.clipData == null)
            return false;
        if (this.currentFrame < 1 && this.currentFrame > this.totalFrames)
            return false;
        var index = this.currentFrame - 1;
        this.bitmap.texture = RES.getRes(this.clipData[index]);
        this.bitmap.smoothing = true;
        return true;
    };
    JBitmapClip.prototype.addLabel = function (frameName, startFrame) {
        var frameLabel = new FrameLabel(frameName, startFrame);
        var labels = this.currentLabels;
        if (labels == null)
            labels = [];
        labels.push(frameLabel);
        this.setCurrentLabels(labels);
    };
    return JBitmapClip;
}(JClip));
__reflect(JBitmapClip.prototype, "JBitmapClip");
//# sourceMappingURL=JBitmapClip.js.map