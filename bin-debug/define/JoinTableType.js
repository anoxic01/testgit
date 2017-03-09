var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var define;
(function (define) {
    var JoinTableType = (function () {
        function JoinTableType() {
        }
        return JoinTableType;
    }());
    /** 一般進桌不配位*/
    JoinTableType.SINGEL = 0;
    /**一般進桌(配桌配位)*/
    JoinTableType.NORMAL_PAIR_TABLE_SEAT = 1;
    /** 競瞇下注進桌*/
    JoinTableType.PEEK_TABLEER = 2;
    /** 競瞇旁觀下注進桌*/
    JoinTableType.PEEK_OTHER = 3;
    /** 包桌桌主進桌*/
    JoinTableType.CHARTER_TABLE_OWNER = 4;
    /** 包桌進桌下注進桌*/
    JoinTableType.CHARTER_TABLER = 5;
    /**包桌旁觀下注進桌*/
    JoinTableType.CHARTER_OTHER = 6;
    /** 多桌進桌*/
    JoinTableType.MULTIPLE = 7;
    /** 電投進桌*/
    JoinTableType.TELBET = 8;
    /**槍手進桌*/
    JoinTableType.DEPUTY = 9;
    /**电投旁注进桌**/
    JoinTableType.TELBET_SIDE = 10;
    define.JoinTableType = JoinTableType;
    __reflect(JoinTableType.prototype, "define.JoinTableType");
})(define || (define = {}));
//# sourceMappingURL=JoinTableType.js.map