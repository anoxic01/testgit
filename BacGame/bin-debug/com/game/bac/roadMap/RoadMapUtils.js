var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var RoadMapUtils = (function () {
    function RoadMapUtils() {
    }
    /**
     *
     * @param	roadMap
     * @param	skipChars
     * @param	columnGridNum
     * @return
     */
    RoadMapUtils.createRoadRenderGrid = function (roadMap, skipChars, columnGridNum) {
        if (columnGridNum === void 0) { columnGridNum = 6; }
        var _posX = 0;
        var _posY = 0;
        // 資料格與行列索引、標記用的參數
        var grid = [], x = 0, y = -1, offsetX = 0, currentSymbol = null, prevSymbol = null;
        var ignoreChars = skipChars || ["i"];
        var nextY;
        // 繪製的高度。這會影響珠子轉彎的時機。預設6
        columnGridNum = columnGridNum;
        // 簡化來源字串
        var roadMapArray = roadMap.split("");
        var offX = 0;
        for (var i = 0, len = roadMapArray.length; i < len; i++) {
            // 當前要處理的結果字串樣式
            currentSymbol = roadMapArray[i];
            // 直線邏輯
            if (prevSymbol === null || currentSymbol == prevSymbol || ignoreChars.indexOf(currentSymbol) > -1) {
                // 動態建立陣列
                grid[x] = grid[x] || [];
                nextY = y + 1;
                // 假如該grid[x][y + 1]尚未被建立，表示路可以向下，y索引值+1
                if (nextY < columnGridNum && grid[x][nextY] === undefined) {
                    y++;
                }
                else {
                    offsetX++;
                    offX += 1;
                }
            }
            else if (currentSymbol != prevSymbol && ignoreChars.indexOf(currentSymbol) == -1) {
                x++;
                offX++;
                while (grid[x] && grid[x][0]) {
                    x++;
                    offX++;
                }
                y = 0;
                offsetX = 0;
            }
            // 資料格戳記
            grid[x + offsetX] = grid[x + offsetX] || [];
            grid[x + offsetX][y] = currentSymbol;
            _posX = x;
            _posY = y;
            if (ignoreChars.indexOf(currentSymbol) == -1) {
                prevSymbol = currentSymbol;
            }
        }
        var lastPoint = new egret.Point((x + offsetX), _posY);
        return [grid, offX, lastPoint];
    };
    /**
     * 加入大路的陣列  grid ->閒庄陣列  iGrid ->和陣列
     * @param	roadMap
     * @param	skipChars
     * @param	columnNum 绘制一列有多少个格子
     * @return
     */
    RoadMapUtils.createBigRoadRenderGrid = function (roadMap, skipChars, columnGridNum) {
        if (columnGridNum === void 0) { columnGridNum = 6; }
        var _posX = 0;
        var _posY = 0;
        // 資料格與行列索引、標記用的參數
        var grid = [], x = 0, y = -1, offsetX = 0, currentSymbol = null, prevSymbol = null;
        var ignoreChars = skipChars || ["i"];
        var nextY;
        // 繪製的高度。這會影響珠子轉彎的時機。預設6
        //columnGridNum = columnGridNum;
        // 簡化來源字串
        var roadMapArray = roadMap.split(".");
        var roadValue = '';
        var iGrid = []; //和的資料格
        var offX = 0;
        for (var i = 0, len = roadMapArray.length; i < len; i++) {
            // 當前要處理的結果字串樣式
            currentSymbol = roadMapArray[i];
            // 直線邏輯
            if ((prevSymbol === null || currentSymbol == prevSymbol) && ignoreChars.indexOf(currentSymbol) == -1) {
                // 動態建立陣列
                grid[x] = grid[x] || [];
                nextY = y + 1;
                // 假如該grid[x][y + 1]尚未被建立，表示路可以向下，y索引值+1
                if (nextY < columnGridNum && grid[x][nextY] === undefined) {
                    y++;
                }
                else {
                    offsetX++;
                    offX += 1;
                }
            }
            else if (ignoreChars.indexOf(currentSymbol) > -1) {
                var x2 = offsetX + x;
                nextY = y;
                if (nextY == -1)
                    nextY = 0;
                // 動態建立陣列
                iGrid[x2] = iGrid[x2] || [];
                iGrid[x2][nextY] = iGrid[x2][nextY] || [];
                iGrid[x2][nextY].push(currentSymbol);
                if (i == 0 && currentSymbol == "i") {
                    prevSymbol = currentSymbol;
                    // 資料格戳記
                    grid[0] = [];
                    grid[0][0] = "";
                }
            }
            else if (currentSymbol != prevSymbol && ignoreChars.indexOf(currentSymbol) == -1) {
                x++;
                offX++;
                while (grid[x] && grid[x][0]) {
                    x++;
                    offX++;
                }
                y = 0;
                offsetX = 0;
            }
            //不是i 不要加入
            if (ignoreChars.indexOf(currentSymbol) == -1) {
                prevSymbol = currentSymbol;
                // 資料格戳記
                grid[x + offsetX] = grid[x + offsetX] || [];
                grid[x + offsetX][y] = currentSymbol;
                _posX = x;
                _posY = y;
            }
        }
        var lastPoint = new egret.Point((x + offsetX), _posY);
        return [grid, iGrid, offX, lastPoint]; //一個是沒有和的grid  , 一個是有和的grid
    };
    RoadMapUtils.createRoadReanderString = function (roadMap) {
        // 資料格與行列索引、標記用的參數
        var grid = [], x = 0, y = -1, currentSymbol = null, prevSymbol = null, mark = [];
        var result = new RoadStringObject();
        // 簡化來源字串
        result.bigRoad = roadMap.replace(/[abcd]/gi, 'a').replace(/[efgh]/gi, 'e').replace(/[ijkl]/gi, 'i');
        var roadMapArray = result.bigRoad.split('.');
        for (var index = 0; index < roadMapArray.length; index++) {
            // 當前要處理的結果字串樣式
            currentSymbol = roadMapArray[index];
            if (index == 0 && currentSymbol == "i") {
                prevSymbol = currentSymbol;
            }
            else if (currentSymbol == "i") {
                continue;
            }
            if (prevSymbol === null || currentSymbol == prevSymbol || currentSymbol == 'i') {
                y++;
            }
            else if (currentSymbol != prevSymbol && currentSymbol != 'i') {
                y = 0;
                x++;
            }
            // 動態建立陣列
            grid[x] = grid[x] || [];
            grid[x][y] = currentSymbol;
            if (currentSymbol != "i") {
                prevSymbol = currentSymbol;
            }
        }
        for (var i = 0; i < grid.length; i++) {
            for (var j = 0; j < grid[i].length; j++) {
                if (grid[0][0] == "i") {
                    grid[0][0] = "a"; //第一局和局 特殊处理
                }
                else if (i === 0 || grid[i][j] == "i") {
                    continue;
                }
                //k = 大陸1 , 小路2 , 蟑螂露3
                for (var k = 1; k <= 3; k++) {
                    if (i > (k - 1) && !(i === k && j === 0)) {
                        var matchCol = grid[i - k].join('').replace(/[i]/gi, '').split('');
                        var qCol = grid[i].join("").match(/[i]/g);
                        var qLen = qCol ? qCol.length : 0;
                        var iLength = qLen ? qLen : 0;
                        mark[k - 1] = matchCol[j - iLength] || (!matchCol[j] && !matchCol[j - 1 - iLength]) ? 'a' : 'e';
                        if (j === 0) {
                            var qALen = grid[i - 1].join("").match(/[ae]/g).length;
                            var aLength = qALen ? qALen : 0;
                            var qBLen = grid[i - (k + 1)].join("").match(/[ae]/g).length;
                            var bLength = qBLen ? qBLen : 0;
                            mark[k - 1] = grid[i - (k + 1)] && aLength == bLength ? "a" : "e";
                        }
                    }
                }
                result.bigEyeRoad += mark[0] ? mark[0] : "";
                result.smallRoad += mark[1] ? mark[1] : "";
                result.roachRoad += mark[2] ? mark[2] : "";
            }
        }
        return result;
    };
    RoadMapUtils.drawRoadMapGrid = function (column, row, gridWidth, gridHeight, xx, yy, t) {
        if (t === void 0) { t = null; }
        t = t ? t : (new egret.Shape());
        var g = t.graphics;
        var w = column * gridWidth;
        var h = row * gridHeight;
        g.beginFill(0xf3f3f3);
        g.drawRect(0, 0, w - 0.2, h);
        g.endFill();
        g.lineStyle(1, 0xBBBBBB, 0.75, false, "normal", "none");
        for (var i = 1; i <= column; i++) {
            if (i == 0 || i == column) {
                g.lineStyle(1.5, 0, 0.75, false, "normal", "none");
            }
            else {
                g.lineStyle(1, 0xBBBBBB, 0.75, false, "normal", "none");
            }
            g.moveTo(i * gridWidth, 0);
            g.lineTo(i * gridWidth, h);
        }
        for (var j = 1; j <= row; j++) {
            if (j == row) {
                g.lineStyle(1.5, 0, 0.75, false, "normal", "square");
            }
            else {
                g.lineStyle(1, 0xBBBBBB, 0.75, false, "normal", "none");
            }
            g.moveTo(0.4, j * gridHeight);
            g.lineTo(w - 0.4, j * gridHeight);
        }
        g.endFill();
        t.x = xx;
        t.y = yy;
        return t;
    };
    return RoadMapUtils;
}());
__reflect(RoadMapUtils.prototype, "RoadMapUtils");
//# sourceMappingURL=RoadMapUtils.js.map