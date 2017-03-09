var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var lobby;
(function (lobby) {
    var view;
    (function (view) {
        var BFrame = (function () {
            function BFrame() {
            }
            return BFrame;
        }());
        view.BFrame = BFrame;
        __reflect(BFrame.prototype, "lobby.view.BFrame");
    })(view = lobby.view || (lobby.view = {}));
})(lobby || (lobby = {}));
//# sourceMappingURL=BFrame.js.map