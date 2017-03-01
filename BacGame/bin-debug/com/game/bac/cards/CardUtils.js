var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CardUtils = (function () {
    function CardUtils() {
    }
    CardUtils.getCardRes = function (cardValue) {
        return "card_js_png";
    };
    return CardUtils;
}());
__reflect(CardUtils.prototype, "CardUtils");
//# sourceMappingURL=CardUtils.js.map