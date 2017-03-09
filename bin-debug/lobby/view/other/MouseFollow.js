var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var lobby;
(function (lobby) {
    var view;
    (function (view) {
        var other;
        (function (other) {
            var MouseFollow = (function () {
                function MouseFollow() {
                }
                return MouseFollow;
            }());
            other.MouseFollow = MouseFollow;
            __reflect(MouseFollow.prototype, "lobby.view.other.MouseFollow");
        })(other = view.other || (view.other = {}));
    })(view = lobby.view || (lobby.view = {}));
})(lobby || (lobby = {}));
//# sourceMappingURL=MouseFollow.js.map