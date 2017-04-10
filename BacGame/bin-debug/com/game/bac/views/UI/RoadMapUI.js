var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RoadMapUI = (function (_super) {
    __extends(RoadMapUI, _super);
    function RoadMapUI() {
        return _super.call(this) || this;
    }
    RoadMapUI.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    RoadMapUI.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        var roadStr = "a.a.a.a.a.a.a.e.c.b.a.e.i.i.a.e.c.a.a.e.e.e.a.e.i.a.b.e.j.e.a.a.i.a.g.a.i.a.a.a.a.f.e.a.a.a.e.e.i.e.a.a.i.e.e.a.a.e.e.i.a.e.i.a.b.e.e.i.a.e.a.e.e.e.e.e";
        this.mainRoadMap = this.addChild(new RoadMap(RoadMapMainItem));
        ////////////////////////// 创建路纸并绘制路纸格子背景和设置路纸位置
        this.bigRoadMap = this.addChild(RoadMapUtils.drawRoadMapGrid(42, 6, 17, 17, 378, 2, new RoadMap(RoadMapBigRoadItem)));
        this.bigEyeRoadMap = this.addChild(RoadMapUtils.drawRoadMapGrid(21, 3, 17, 17, 378, 104, new RoadMap(RoadMapBigEyeRoadItem)));
        this.smallEyeRoadMap = this.addChild(RoadMapUtils.drawRoadMapGrid(21, 3, 17, 17, 735.5, 104, new RoadMap(RoadMapSmallRoadItem)));
        this.roachRoadMap = this.addChild(RoadMapUtils.drawRoadMapGrid(21, 3, 17, 17, 378, 155, new RoadMap(RoadMapRoachRoadItem)));
        ///////////////////////// 设置路纸的绘制器
        this.mainRoadMap.setDrawer(RoadMapDrawer.getMainRoadMapDrawer());
        this.bigRoadMap.setDrawer(RoadMapDrawer.getBigRoadMapDrawer());
        this.bigEyeRoadMap.setDrawer(RoadMapDrawer.getGeneralRoadMapDrawer());
        this.smallEyeRoadMap.setDrawer(RoadMapDrawer.getGeneralRoadMapDrawer());
        this.roachRoadMap.setDrawer(RoadMapDrawer.getGeneralRoadMapDrawer());
        ///////////////////////// 设置路纸绘制时的相关参数
        this.mainRoadMap.setRoadMapInfo(RoadMapInfo.creat(34, 34, 6, 66, 1.5, 1.5, false));
        this.bigRoadMap.setRoadMapInfo(RoadMapInfo.creat(17, 17, 6, 30, 0, 0, true));
        this.bigEyeRoadMap.setRoadMapInfo(RoadMapInfo.creat(8.5, 8.5, 6, 30, 0, 0, true));
        this.smallEyeRoadMap.setRoadMapInfo(RoadMapInfo.creat(8.5, 8.5, 6, 30, 0, 0, true));
        this.roachRoadMap.setRoadMapInfo(RoadMapInfo.creat(8.5, 8.5, 6, 30, 0, 0, true));
        /////////////////////////
        this.setData(roadStr);
        this.bankerAskBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAskRoadMap, this);
        this.playerAskBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAskRoadMap, this);
        this.staBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShowStatis, this);
    };
    RoadMapUI.prototype.onShowStatis = function (evt) {
        this.setData("");
    };
    /**
     * 设置路纸数据，当正处于问路时需要等问路结束后才会显示最新的数据
     */
    RoadMapUI.prototype.setData = function (v) {
        if (this.data == v)
            return;
        this.data = v;
        if (this.sharkTimer && this.sharkTimer.running)
            return; //// 当前正处于问路中
        this.drawRoadMaps(this.data);
    };
    /**
     * 绘制所有的路纸
     */
    RoadMapUI.prototype.drawRoadMaps = function (v) {
        var roadObj = RoadMapUtils.createRoadReanderString(v);
        this.mainRoadMap.setData(v);
        this.bigRoadMap.setData(roadObj.bigRoad);
        this.bigEyeRoadMap.setData(roadObj.bigEyeRoad);
        this.smallEyeRoadMap.setData(roadObj.smallRoad);
        this.roachRoadMap.setData(roadObj.roachRoad);
    };
    /**
     * 点击问路按钮，开始问路
     */
    RoadMapUI.prototype.onAskRoadMap = function (evt) {
        var s = "";
        if (evt.currentTarget == this.bankerAskBtn) {
            s = "a";
        }
        else {
            s = "e";
        }
        if (this.data.length > 0)
            s = "." + s;
        this.drawRoadMaps(this.data + s);
        if (this.sharkTimer == null) {
            this.sharkTimer = JTimer.getTimer(200);
            this.sharkTimer.addTimerCallback(this.onAskSharkRoadItems, this.onAskSharkRoadComplete, this);
        }
        this.sharkTimer.reset();
        this.sharkTimer.repeatCount = 7;
        this.sharkTimer.start();
    };
    /**
     * 问路处理
     */
    RoadMapUI.prototype.onAskSharkRoadItems = function () {
        var vis = this.sharkTimer.currentCount % 2 == 0;
        this.mainRoadMap.sharkLastItem(vis);
        this.bigRoadMap.sharkLastItem(vis);
        this.bigEyeRoadMap.sharkLastItem(vis);
        this.smallEyeRoadMap.sharkLastItem(vis);
        this.roachRoadMap.sharkLastItem(vis);
    };
    /**
     * 问路结束，更新当前的路纸数据
     */
    RoadMapUI.prototype.onAskSharkRoadComplete = function () {
        this.drawRoadMaps(this.data);
    };
    return RoadMapUI;
}(BaseComponent));
__reflect(RoadMapUI.prototype, "RoadMapUI", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=RoadMapUI.js.map