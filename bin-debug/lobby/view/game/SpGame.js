var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var lobby;
(function (lobby) {
    var view;
    (function (view) {
        var game;
        (function (game) {
            var SpGame = (function () {
                function SpGame() {
                }
                return SpGame;
            }());
            game.SpGame = SpGame;
            __reflect(SpGame.prototype, "lobby.view.game.SpGame");
        })(game = view.game || (view.game = {}));
    })(view = lobby.view || (lobby.view = {}));
})(lobby || (lobby = {}));
//# sourceMappingURL=SpGame.js.map