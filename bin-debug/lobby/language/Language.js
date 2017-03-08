var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var lobby;
(function (lobby) {
    var language;
    (function (language) {
        var Language = (function () {
            function Language() {
            }
            return Language;
        }());
        Language.sQuickBitmapdataZS = "quick zhuan shi"; //钻石厅
        Language.sQuickBitmapdataBJ = "quick bo jin"; //铂金厅
        Language.sQuickBitmapdataJM = "quick bid"; //竞咪厅、翡翠厅
        Language.sQuickBitmapdataGB = "quick vip"; //贵宾厅、银臂厅
        Language.sQuickBitmapdataJB = "quick jin bi"; //金臂厅
        Language.sQuickBitmapdataDZ = "quick duo zhuo"; //好路多桌
        Language.sQuickBitmapdataDT = "quick dian tou"; //电投厅
        Language.sBitmapdataDZ = "duo zhuo"; //好路多桌
        language.Language = Language;
        __reflect(Language.prototype, "lobby.language.Language");
    })(language = lobby.language || (lobby.language = {}));
})(lobby || (lobby = {}));
//# sourceMappingURL=Language.js.map