var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RoadMap = (function (_super) {
    __extends(RoadMap, _super);
    function RoadMap(itemClass) {
        var _this = _super.call(this) || this;
        _this.itemClass = itemClass;
        _this.initView();
        return _this;
    }
    /**
     * 初始化路纸界面
     */
    RoadMap.prototype.initView = function () {
        this.items = new Array();
        this.drawFramer = JFramer.getFramer();
        this.drawFramer.addFramerCallback(this.onDelayDrawRoadMap, this);
    };
    /**
     * 设置路纸数据
     */
    RoadMap.prototype.setData = function (value) {
        if (this.data == value)
            return;
        this.data = value;
        this.drawFramer.start();
    };
    /**
     * 设置路纸绘制器
     */
    RoadMap.prototype.setDrawer = function (value) {
        this.itemDrawer = value;
    };
    /**
     * 设置路纸绘制器参数信息
     */
    RoadMap.prototype.setRoadMapInfo = function (value) {
        this.roadMapInfo = value;
    };
    /**
     * 延时绘制
     */
    RoadMap.prototype.onDelayDrawRoadMap = function () {
        if (this.data != null && this.data != "") {
            if (this.itemDrawer != null) {
                if (this.itemDrawer.draw != null) {
                    var len = this.itemDrawer.draw.call(this, this.items, this.data, this.itemClass, this.roadMapInfo);
                    for (var i = 0; i < len; i++) {
                        this.items[i].visible = true;
                        if (this.items[i].parent == null)
                            this.addChild(this.items[i]);
                    }
                }
            }
            else {
                console.warn("[RoadMap] 需要先调用setDrawer()方法设置绘制器！！！");
            }
        }
        else {
            this.clearItems();
        }
        this.drawFramer.stop();
    };
    /**
     * 对最后一个路纸进行闪烁（用于问路）
     */
    RoadMap.prototype.sharkLastItem = function (v) {
        var item = null;
        if (this.items.length > 0) {
            item = this.items[this.items.length - 1];
            item.visible = v;
        }
    };
    RoadMap.prototype.dispose = function () {
        // 先将所有的路纸元素放进缓存池中留待下次使用
        this.clearItems();
        _super.prototype.dispose.call(this);
        this.drawFramer && this.drawFramer.dispose();
        this.itemDrawer && this.itemDrawer.dispose();
        this.drawFramer = null;
        this.itemClass = null;
        this.itemDrawer = null;
    };
    /**
     * 清除所有的元素
     */
    RoadMap.prototype.clearItems = function () {
        if (this.itemClass && this.items) {
            RoadMapDrawer.pushItemsToPool(this.items, this.itemClass);
        }
    };
    return RoadMap;
}(BaseView));
RoadMap.A = "a";
RoadMap.B = "b";
RoadMap.C = "c";
RoadMap.D = "d";
RoadMap.E = "e";
RoadMap.F = "f";
RoadMap.G = "g";
RoadMap.H = "h";
RoadMap.I = "i";
RoadMap.J = "j";
RoadMap.K = "k";
RoadMap.L = "l";
__reflect(RoadMap.prototype, "RoadMap");
//# sourceMappingURL=RoadMap.js.map