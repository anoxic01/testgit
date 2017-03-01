var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JClip = (function (_super) {
    __extends(JClip, _super);
    function JClip(clipData, frameRate, isAutoPlay) {
        if (clipData === void 0) { clipData = null; }
        if (frameRate === void 0) { frameRate = null; }
        if (isAutoPlay === void 0) { isAutoPlay = true; }
        var _this = _super.call(this) || this;
        /**非帧标签播放**/
        _this.NOT_LABEL_PLAY = -1; /// 
        /**帧循环**/
        _this.LABEL_PLAY_LOOP = 0;
        /**停止在帧标签的开始帧 **/
        _this.LABEL_STOP_START_FRAME = 1;
        /**停止在帧标签的最后帧 **/
        _this.LABEL_STOP_END_FRAME = 2;
        _this._totalFrames = 0;
        _this._frameRate = 24;
        _this._isPlaying = false;
        _this._currentFrame = 0;
        _this._currentLabel = null;
        _this._currentLabels = null;
        _this.isAutoPlay = true;
        /** 帧标签播放类型**/
        _this.labelPlayType = 0;
        /**帧标签播放时开始帧 **/
        _this.labelStartFrame = 0;
        /**帧标签播放时停止帧**/
        _this.labelEndFrame = 0;
        /**是否需要延时渲染**/
        _this.isDelayRenderder = false;
        /**是否需要更新帧**/
        _this.isNeedUpdateFrame = false;
        _this.isAutoPlay = isAutoPlay;
        if (frameRate == null)
            frameRate = 24;
        _this._frameRate = frameRate;
        _this.initClip(clipData);
        return _this;
    }
    JClip.prototype.initClip = function (clipData) {
        if (clipData === void 0) { clipData = null; }
        this.juggler = new JuggleAdvanceTick();
        this.juggler.setTick(this.onFrameRenderer, this);
        this.frameRate = this.frameRate;
        this.setClipData(clipData);
    };
    //////////////////////////////// 渲染相关
    //////////////////////////////////////////////////////////////////////////////
    /**
     * 播放帧 onFrameRenderer->onInvalidateCurrentFrame->rendererCurrentFrame
     */
    JClip.prototype.onFrameRenderer = function () {
        if (this.isCanRendererFrame() == false)
            return;
        this.isNeedUpdateFrame = false;
        this.onInvalidateCurrentFrame();
        if (this.currentLabel != null) {
            if (this.labelPlayType == this.LABEL_STOP_START_FRAME) {
                this.stop();
            }
            else {
                this.setCurrentFrame(this.currentFrame + 1);
                if (this.currentFrame > this.labelEndFrame) {
                    if (this.labelPlayType == this.LABEL_PLAY_LOOP) {
                        this.setCurrentFrame(this.labelStartFrame);
                    }
                    else if (this.labelPlayType == this.LABEL_STOP_END_FRAME) {
                        this.stop();
                    }
                }
            }
        }
        else {
            if (this.isDelayRenderder) {
                this.isDelayRenderder = false;
                this.stop();
            }
            else {
                this.setCurrentFrame(this.currentFrame + 1);
                if (this.currentFrame > this.totalFrames)
                    this.setCurrentFrame(1);
            }
        }
    };
    JClip.prototype.onInvalidateCurrentFrame = function () {
        this.rendererCurrentFrame();
        if (this.frameScripts != null)
            this.frameScripts.execute(this.currentFrame);
    };
    /**
     * 渲染当前帧,需要子类重写实现方式
     * @return 是否渲染成功
     */
    JClip.prototype.rendererCurrentFrame = function () {
        return true;
    };
    /////////////////////////// 实现接口方法
    ////////////////////////////////////////////////////////////////////////
    JClip.prototype.setClipData = function (value) {
        this.clear();
        if (value == null || this.clipData == value)
            return;
        this.clipData = value;
        this.setCurrentFrame(1);
        if (value.hasOwnProperty("length"))
            this.setTotalFrame(value.length);
        else {
            console.warn("获取Clip的totalFrames异常！");
        }
        if (this.clipData != null && this.isAutoPlay == true)
            this.play();
    };
    JClip.prototype.play = function () {
        this.strartJuggler();
        if (this.isDelayRenderder)
            this.isDelayRenderder = false;
        if (this.currentLabel != null) {
            if (this.labelPlayType != this.LABEL_PLAY_LOOP)
                this.labelPlayType = this.LABEL_PLAY_LOOP;
        }
    };
    JClip.prototype.stop = function () {
        this.stopJuggler();
        if (this.isNeedUpdateFrame) {
            this.onInvalidateCurrentFrame();
            this.isNeedUpdateFrame = false;
        }
    };
    /**
     * 停止到指定帧或者指定标签
     * @param frame
     * @param isStopLableFrameEnd 当frame为帧标签时，isStopLableFrameEnd可设定是否停止在标签的最后一帧
     */
    JClip.prototype.gotoAndStop = function (frame, isStopLableFrameEnd) {
        if (isStopLableFrameEnd === void 0) { isStopLableFrameEnd = false; }
        this.gotoFrame(frame, isStopLableFrameEnd ? this.LABEL_STOP_END_FRAME : this.LABEL_STOP_START_FRAME);
    };
    JClip.prototype.gotoAndPlay = function (frame) {
        this.gotoFrame(frame, this.LABEL_PLAY_LOOP);
    };
    JClip.prototype.addFrameScript = function (frame, callBack, thisArg) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        if (this.frameScripts == null)
            this.frameScripts = new FrameScript();
        this.frameScripts.addFrameScript(frame, callBack, thisArg, args);
    };
    JClip.prototype.onJuggle = function (value) {
        this.juggler.onJuggle(value);
    };
    JClip.prototype.dispose = function () {
        this.clear();
        this.isNeedUpdateFrame = false;
        this.isDelayRenderder = false;
        this.frameScripts && this.frameScripts.dispose();
        this.juggler && this.juggler.dispose();
        this.labelsDict && this.labelsDict.dispose();
        this.frameScripts = null;
        this.juggler = null;
        this.clipData = null;
        this._currentLabel = null;
        this._currentLabels = null;
        this.labelsDict = null;
        this.removeFromParent();
    };
    ///////////////////////////////////////////////////////////////////////
    /**
     * 跳帧播放
     * @param frame
     * @param playType
     */
    JClip.prototype.gotoFrame = function (frame, playType) {
        this.isNeedUpdateFrame = true;
        if (typeof (frame) === "string") {
            var frameData = this.labelsDict.get(frame);
            if (frameData != null) {
                this._currentLabel = frame;
                this.labelStartFrame = frameData.frame;
                this.labelEndFrame = frameData.endFrame;
                this.setCurrentFrame(this.labelStartFrame);
                if (this.labelStartFrame == this.labelEndFrame)
                    this.labelPlayType = this.LABEL_STOP_START_FRAME;
                else
                    this.labelPlayType = playType;
                this.strartJuggler();
            }
            else
                throw new Error("未找到需要播放的帧标签:" + frame);
        }
        else {
            this._currentLabel = null;
            this.labelPlayType = this.NOT_LABEL_PLAY;
            this.labelStartFrame = 0;
            this.labelEndFrame = 0;
            this.setCurrentFrame(frame);
            if (playType != this.LABEL_PLAY_LOOP) {
                this.isDelayRenderder = true;
            }
            this.strartJuggler();
        }
    };
    JClip.prototype.strartJuggler = function () {
        if (this.isPlaying == true)
            return;
        this._isPlaying = true;
        JuggleManager.instance.addJuggle(this);
    };
    JClip.prototype.stopJuggler = function () {
        if (this.isPlaying == false)
            return;
        this._isPlaying = false;
        JuggleManager.instance.removeJuggle(this);
    };
    /**是否允许渲染帧 */
    JClip.prototype.isCanRendererFrame = function () {
        return this.isPlaying && this.stage != null;
    };
    /**
     * 获取指定的label开始的帧
     */
    JClip.prototype.getLabelStartFrame = function (label) {
        if (this.labelsDict != null) {
            var frameData = this.labelsDict.get(label);
            if (frameData != null)
                return frameData.frame;
        }
        return -1;
    };
    /**
     * 获取指定的label结束的帧
     */
    JClip.prototype.getLabelEndFrame = function (label) {
        if (this.labelsDict != null) {
            var frameData = this.labelsDict.get(label);
            if (frameData != null)
                return frameData.endFrame;
        }
        return -1;
    };
    /**
     * 清除掉当前的所有数据
     */
    JClip.prototype.clear = function () {
        this.stopJuggler();
        this.frameScripts && this.frameScripts.clear();
    };
    Object.defineProperty(JClip.prototype, "totalFrames", {
        //////////////////////////////////////////////////////////////////////
        get: function () { return this._totalFrames; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JClip.prototype, "currentFrame", {
        get: function () { return this._currentFrame; },
        ////////////////////////////////////////////////////////////////////////
        set: function (value) {
            this.setCurrentFrame(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JClip.prototype, "frameRate", {
        get: function () { return this._frameRate; },
        set: function (value) {
            if (value < 1)
                value = 1;
            this._frameRate = value;
            this.juggler.setFrameRate(this._frameRate);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JClip.prototype, "isPlaying", {
        get: function () { return this._isPlaying; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JClip.prototype, "currentLabels", {
        get: function () { return this._currentLabels; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JClip.prototype, "currentLabel", {
        get: function () { return this._currentLabel; },
        enumerable: true,
        configurable: true
    });
    ////////////////////////////////////////////////////////////////////////
    /**
     * 设置总帧数
     */
    JClip.prototype.setTotalFrame = function (value) { this._totalFrames = value; };
    /**
     * 设置当前帧
     */
    JClip.prototype.setCurrentFrame = function (value) { this._currentFrame = value; };
    /**
     *必须在setTotalFrame后面调用
    */
    JClip.prototype.setCurrentLabels = function (value) {
        this._currentLabels = value;
        if (this.labelsDict == null)
            this.labelsDict = new Dictionary();
        this.labelsDict.clear();
        if (value != null) {
            var frame;
            var nextFrame;
            var len = value.length;
            for (var i = 0; i < len; i++) {
                frame = value[i];
                if (i < len - 1)
                    nextFrame = value[i + 1];
                else
                    nextFrame = null;
                this.labelsDict.add(frame.name, { name: frame.name, frame: frame.frame, endFrame: nextFrame ? nextFrame.frame - 1 : this.totalFrames });
            }
        }
    };
    JClip.prototype.removeFromParent = function () {
        if (this.parent)
            this.parent.removeChild(this);
    };
    return JClip;
}(egret.Sprite));
__reflect(JClip.prototype, "JClip", ["IClip", "IJuggle"]);
//# sourceMappingURL=JClip.js.map