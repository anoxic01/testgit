var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 绘制格子时的数据信息
 */
var RoadMapInfo = (function () {
    function RoadMapInfo() {
        /**
         * 一列可以显示多少个格子
         */
        this.columnGridNum = 0;
        /**
         * 设置允许显示的路纸列数
         */
        this.maxColumn = 0;
        /**最多显示多少个格子 */
        this.maxGridNum = 0;
        /**
         * 路纸要绘制的格子宽度
         */
        this.gridWidth = 0;
        /**
         * 路纸要绘制的格子高度
         */
        this.gridHeight = 0;
        /**
         * 所有格子的偏移X
         */
        this.offsetX = 0;
        /**
         * 所有格子的偏移Y
         */
        this.offsetY = 0;
        this.matchScale = false;
    }
    /**
     * 创建一个info数据
     * @gw 格子的宽度
     * @gh 格子的高度
     * @cgn 一列显示的格子数
     * @mgn 最多显示的格子数
     */
    RoadMapInfo.creat = function (gw, gh, cgn, mgn, ox, oy, ms) {
        if (ox === void 0) { ox = 0; }
        if (oy === void 0) { oy = 0; }
        if (ms === void 0) { ms = false; }
        var info = new RoadMapInfo();
        info.maxGridNum = mgn;
        info.maxColumn = mgn / cgn;
        info.columnGridNum = cgn;
        info.gridWidth = gw;
        info.gridHeight = gh;
        info.offsetX = ox;
        info.offsetY = oy;
        info.matchScale = ms;
        return info;
    };
    return RoadMapInfo;
}());
__reflect(RoadMapInfo.prototype, "RoadMapInfo");
//# sourceMappingURL=RoadMapInfo.js.map