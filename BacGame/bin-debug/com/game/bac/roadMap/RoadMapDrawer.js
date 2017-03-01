var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var RoadMapDrawer = (function () {
    function RoadMapDrawer() {
    }
    /**
     * 大眼路，小眼路，蟑螂路通用绘制方法
     */
    RoadMapDrawer.prototype.drawGeneralItems = function (items, data, itemClass, info) {
        info = info ? info : RoadMapInfo.creat(8.5, 8.5, 6, 30);
        var roads = RoadMapUtils.createRoadRenderGrid(data, null, info.columnGridNum);
        var gridRoads = roads[0];
        var roadLen = gridRoads.length;
        var startIndex = roadLen > info.maxGridNum ? (roadLen - info.maxGridNum) : 0;
        var allItemLen = 0;
        var xData;
        var i = 0;
        var j = 0;
        var itemIndex = 0;
        var item;
        for (i = startIndex; i < roadLen; i++) {
            for (j = 0; j < gridRoads[i].length; j++) {
                if (gridRoads[i][j] != null)
                    allItemLen++;
            }
        }
        RoadMapDrawer.autoCreateItems(items, allItemLen, itemClass);
        for (i = startIndex; i < roadLen; i++) {
            xData = gridRoads[i];
            for (j = 0; j < xData.length; j++) {
                if (xData[j] != null) {
                    item = items[itemIndex];
                    item.setData(xData[j]);
                    if (info.matchScale) {
                        if (item.width != info.gridWidth) {
                            item.scaleX = info.gridWidth / item.width;
                        }
                        if (item.height != info.gridHeight) {
                            item.scaleY = info.gridHeight / item.height;
                        }
                    }
                    item.x = info.gridWidth * (i - startIndex) + (info.gridWidth - item.width * item.scaleX) * 0.5 + info.offsetX;
                    item.y = info.gridHeight * j + (info.gridHeight - item.height * item.scaleY) * 0.5 + info.offsetY;
                    itemIndex++;
                }
            }
        }
        return itemIndex;
    };
    /**
     * 大路绘制方法
     */
    RoadMapDrawer.prototype.drawBigItems = function (items, data, itemClass, info) {
        info = info ? info : RoadMapInfo.creat(17, 17, 6, 30);
        var roads = RoadMapUtils.createBigRoadRenderGrid(data, null, info.columnGridNum);
        var gridRoads = roads[0];
        var tieRoads = roads[1];
        var roadLen = gridRoads.length;
        var startIndex = roadLen > info.maxGridNum ? (roadLen - info.maxGridNum) : 0;
        var allItemLen = 0;
        var xData;
        var tData;
        var i = 0;
        var j = 0;
        var itemIndex = 0;
        var tieItemCount = 0;
        var item;
        for (i = startIndex; i < roadLen; i++) {
            for (j = 0; j < gridRoads[i].length; j++) {
                if (gridRoads[i][j] != null)
                    allItemLen++;
            }
        }
        RoadMapDrawer.autoCreateItems(items, allItemLen, itemClass);
        for (i = startIndex; i < roadLen; i++) {
            xData = gridRoads[i];
            tData = tieRoads[i];
            for (j = 0; j < xData.length; j++) {
                if (xData[j] && xData[j] != "null") {
                    if (tData != null && tData[j] != null) {
                        tieItemCount = tData[j].length;
                    }
                    else {
                        tieItemCount = 0;
                    }
                    item = items[itemIndex];
                    item.setData(xData[j] + "," + tieItemCount);
                    if (info.matchScale) {
                        if (item.width != info.gridWidth) {
                            item.scaleX = info.gridWidth / item.width;
                        }
                        if (item.height != info.gridHeight) {
                            item.scaleY = info.gridHeight / item.height;
                        }
                    }
                    item.x = info.gridWidth * (i - startIndex) + (info.gridWidth - item.width * item.scaleX) * 0.5 + info.offsetX;
                    item.y = info.gridHeight * j + (info.gridHeight - item.height * item.scaleY) * 0.5 + info.offsetY;
                    itemIndex++;
                }
            }
        }
        return itemIndex;
    };
    /**
     * 主路绘制方法
     */
    RoadMapDrawer.prototype.drawMainItems = function (items, data, itemClass, info) {
        info = info ? info : RoadMapInfo.creat(34, 34, 6, 66);
        var allRoads = data.split(".");
        var allColumu = Math.ceil(allRoads.length / info.columnGridNum);
        var startIndex = 0;
        var len = allRoads.length;
        var i = 0;
        var item;
        if (allColumu > info.maxColumn) {
            startIndex = (allColumu - info.maxColumn) * info.columnGridNum;
            len = allRoads.length - startIndex;
        }
        RoadMapDrawer.autoCreateItems(items, len, itemClass);
        for (i = 0; i < len; i++) {
            item = items[i];
            item.setData(allRoads[startIndex + i]);
            if (info.matchScale) {
                if (item.width != info.gridWidth) {
                    item.scaleX = info.gridWidth / item.width;
                }
                if (item.height != info.gridHeight) {
                    item.scaleY = info.gridHeight / item.height;
                }
            }
            item.x = Math.floor(i / info.columnGridNum) * info.gridWidth + ((info.gridWidth - item.width * item.scaleX) * 0.5 + info.offsetX);
            item.y = Math.floor(i % info.columnGridNum) * info.gridHeight + ((info.gridHeight - item.height * item.scaleY) * 0.5 + info.offsetY);
        }
        return len;
    };
    RoadMapDrawer.prototype.dispose = function () {
        this.draw = null;
    };
    /**
     * 处理路纸元素（从缓存池里取元素和将多余的元素放回缓存池中）
     */
    RoadMapDrawer.autoCreateItems = function (items, len, itemClass) {
        // 将多出来的元素放回缓存池内
        while (items.length > len) {
            RoadMapDrawer.pushItem(items.pop(), itemClass);
        }
        var key = egret.getQualifiedClassName(itemClass);
        var itemPool = RoadMapDrawer.roadMapItemPool.get(key);
        while (items.length < len) {
            // 从缓存池中取元素
            if (itemPool && itemPool.length > 0) {
                items.push(itemPool.shift());
            }
            else {
                items.push(new itemClass());
            }
        }
    };
    /**
     * 将不需要的的路纸元素放进缓存池内
     */
    RoadMapDrawer.pushItemsToPool = function (items, itemClass) {
        while (items.length > 0) {
            RoadMapDrawer.pushItem(items.pop(), itemClass);
        }
    };
    RoadMapDrawer.pushItem = function (item, itemClass) {
        if (item == null)
            return;
        var key = egret.getQualifiedClassName(itemClass);
        if (RoadMapDrawer.roadMapItemPool.get(key) == null)
            RoadMapDrawer.roadMapItemPool.add(key, []);
        var itemPool = RoadMapDrawer.roadMapItemPool.get(key);
        item.scaleX = item.scaleY = 1;
        item.visible = true;
        item.removeFromParent();
        itemPool.push(item);
    };
    /**
     * 主路纸绘制器
     */
    RoadMapDrawer.getMainRoadMapDrawer = function () {
        var drawer = new RoadMapDrawer();
        drawer.draw = drawer.drawMainItems;
        return drawer;
    };
    /**
     * 大路绘制器
     */
    RoadMapDrawer.getBigRoadMapDrawer = function () {
        var drawer = new RoadMapDrawer();
        drawer.draw = drawer.drawBigItems;
        return drawer;
    };
    /**
     * 大眼路，小眼路，蟑螂路通用绘制器
     */
    RoadMapDrawer.getGeneralRoadMapDrawer = function () {
        var drawer = new RoadMapDrawer();
        drawer.draw = drawer.drawGeneralItems;
        return drawer;
    };
    return RoadMapDrawer;
}());
RoadMapDrawer.roadMapItemPool = new Dictionary();
__reflect(RoadMapDrawer.prototype, "RoadMapDrawer");
//# sourceMappingURL=RoadMapDrawer.js.map