var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BetAreaUI = (function (_super) {
    __extends(BetAreaUI, _super);
    function BetAreaUI() {
        return _super.call(this) || this;
    }
    BetAreaUI.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    BetAreaUI.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.getChildAt(0).visible = false;
        this.createItem(0, 24, -4, "betArea_1", "betArea_title_big"); // 大
        this.createItem(0, 415, -4, "betArea_2", "betArea_title_playerPair"); // 闲对
        this.createItem(0, 844, -4, "betArea_2", "betArea_title_bankerPair", -1); // 庄对
        this.createItem(0, 1250, -4, "betArea_1", "betArea_title_small", -1); // 小
        this.createItem(0, -1, 76, "betArea_3", "betArea_title_player"); // 闲
        this.createItem(0, 539, 76, "betArea_4", "betArea_title_tie"); // 和
        this.createItem(0, 1131, 76, "betArea_5", "betArea_title_banker"); // 庄
        this.createSeat(1, 2, 198, "betArea_seat_1", "betArea_seat_title_1");
        this.createSeat(2, 166, 198, "betArea_seat_2", "betArea_seat_title_2");
        this.createSeat(3, 438, 198, "betArea_seat_3", "betArea_seat_title_3");
        this.createSeat(5, 709, 198, "betArea_seat_4", "betArea_seat_title_5");
        this.createSeat(6, 970, 198, "betArea_seat_3", "betArea_seat_title_6", -1);
        this.createSeat(7, 1225, 198, "betArea_seat_2", "betArea_seat_title_7", -1);
        this.createSeat(8, 1480, 198, "betArea_seat_1", "betArea_seat_title_8", -1);
        var mc = new JBitmapClip(ClipUtils.getMovieClips("seat_win_effect{0000}_png", 1, 20));
        this.addChild(mc);
    };
    BetAreaUI.prototype.createItem = function (id, xx, yy, res, titleRes, sx) {
        if (sx === void 0) { sx = 1; }
        var item = new BetAreaItem(id, res, titleRes, sx == -1);
        item.setCanBet(true);
        this.addChild(item);
        item.x = xx;
        item.y = yy;
        return item;
    };
    BetAreaUI.prototype.createSeat = function (id, xx, yy, res, titleRes, sx) {
        if (sx === void 0) { sx = 1; }
        var item = new BetAreaSeatItem(id, res, titleRes, sx == -1);
        this.addChild(item);
        //item.setSeatData(new Object());
        item.x = xx;
        item.y = yy;
        return item;
    };
    return BetAreaUI;
}(BaseComponent));
__reflect(BetAreaUI.prototype, "BetAreaUI", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=BetAreaUI.js.map