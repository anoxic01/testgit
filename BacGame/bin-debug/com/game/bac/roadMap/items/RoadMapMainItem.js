var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 百家路纸显示的主路item
 */
var RoadMapMainItem = (function (_super) {
    __extends(RoadMapMainItem, _super);
    function RoadMapMainItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RoadMapMainItem.prototype.applyData = function (v, currentLang) {
        if (v != null) {
            if (v == RoadMap.A || v == RoadMap.B || v == RoadMap.C || v == RoadMap.D) {
                this.bitmap.texture = RES.getRes("main_roadMap_banker_png");
            }
            else if (v == RoadMap.E || v == RoadMap.F || v == RoadMap.G || v == RoadMap.H) {
                this.bitmap.texture = RES.getRes("main_roadMap_player_png");
            }
            else if (v == RoadMap.I || v == RoadMap.J || v == RoadMap.K || v == RoadMap.L) {
                this.bitmap.texture = RES.getRes("main_roadMap_tie_png");
            }
            if (v == RoadMap.B || v == RoadMap.F || v == RoadMap.J) {
                this.setBankerPair();
                this.bankerPair.texture = RES.getRes("main_roadMap_bankerPair_png");
            }
            else if (v == RoadMap.C || v == RoadMap.G || v == RoadMap.K) {
                this.setPlayerPair();
                this.playerPair.texture = RES.getRes("main_roadMap_playerPair_png");
            }
            else if (v == RoadMap.D || v == RoadMap.H || v == RoadMap.L) {
                this.setBankerPair();
                this.bankerPair.texture = RES.getRes("main_roadMap_bankerPair_png");
                this.setPlayerPair();
                this.playerPair.texture = RES.getRes("main_roadMap_playerPair_png");
            }
        }
        else {
            if (this.bitmap)
                this.bitmap.texture = null;
            if (this.bankerPair)
                this.bankerPair.texture = null;
            if (this.playerPair)
                this.playerPair.texture = null;
        }
    };
    RoadMapMainItem.prototype.setBankerPair = function () {
        if (this.bankerPair == null) {
            this.bankerPair = new egret.Bitmap();
            this.addChild(this.bankerPair);
            this.bankerPair.x = 0;
            this.bankerPair.y = 0;
        }
    };
    RoadMapMainItem.prototype.setPlayerPair = function () {
        if (this.playerPair == null) {
            this.playerPair = new egret.Bitmap();
            this.addChild(this.playerPair);
            this.playerPair.x = 19;
            this.playerPair.y = 19;
        }
    };
    return RoadMapMainItem;
}(BaseRoadMapItem));
__reflect(RoadMapMainItem.prototype, "RoadMapMainItem");
//# sourceMappingURL=RoadMapMainItem.js.map