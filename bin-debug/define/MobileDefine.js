var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var define;
(function (define) {
    var MobileDefine = (function () {
        function MobileDefine() {
        }
        return MobileDefine;
    }());
    MobileDefine.IOS = 0;
    MobileDefine.ANDROID = 1;
    MobileDefine.DETAIL = 2;
    MobileDefine.GRID = 0;
    MobileDefine.HORIZONTAL = 1;
    MobileDefine.IOS_COUNT = 11; //BGios01,Num01
    MobileDefine.AND_COUNT = 10; //BGAndroid_01,Num01
    MobileDefine.LINK_IOS = "BGios";
    MobileDefine.LINK_AND = "BGAndroid_";
    MobileDefine.LINK_NUM = "Num";
    MobileDefine.CARD_W = 243;
    MobileDefine.CARD_H = 429;
    MobileDefine.DETAIL_COUNT = 5;
    MobileDefine.LANG_IOS = "ios";
    MobileDefine.LANG_AND = "and";
    define.MobileDefine = MobileDefine;
    __reflect(MobileDefine.prototype, "define.MobileDefine");
})(define || (define = {}));
//# sourceMappingURL=MobileDefine.js.map