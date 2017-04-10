var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameUtils = (function () {
    function GameUtils() {
    }
    GameUtils.fixedAngle = function (angle) {
        if (angle < 0) {
            angle = 360 + angle;
        }
        return angle;
    };
    GameUtils.fixedModelActionDirection = function (direction, oldDirection, newDirection) {
        if (oldDirection == 4 && newDirection == 8) {
            direction += 4;
        }
        else if (oldDirection == 8 && newDirection == 4) {
            direction %= 4;
        }
        return direction;
    };
    /**
     * this.canvas=document.getElementsByTagName("CANVAS")[0];
     * this.canvas.addEventListener('mousemove',this.onMove);
     * private onMove(evt: MouseEvent): void
     * {
     * 	var temp = GameUtils.fixedMousePoint(evt.currentTarget,evt.x,evt.y);
     * }
     */
    GameUtils.fixedMousePoint = function (canvas, x, y) {
        var style = window.getComputedStyle(canvas, null);
        var rect = canvas.getBoundingClientRect();
        return {
            x: (x - rect.left) * (canvas.width / parseFloat(style["width"])),
            y: (y - rect.top) * (canvas.height / parseFloat(style["height"]))
        };
    };
    GameUtils.getDistance = function (px, py, mx, my) {
        var dx = px - mx;
        var dy = py - my;
        if (dx == 0 && dy == 0)
            return 0;
        return Math.sqrt(dx * dx + dy * dy);
    };
    return GameUtils;
}());
__reflect(GameUtils.prototype, "GameUtils");
//# sourceMappingURL=GameUtils.js.map