var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var lobby;
(function (lobby) {
    var view;
    (function (view) {
        var notice;
        (function (notice) {
            var NoticeManeger = (function () {
                function NoticeManeger() {
                }
                return NoticeManeger;
            }());
            notice.NoticeManeger = NoticeManeger;
            __reflect(NoticeManeger.prototype, "lobby.view.notice.NoticeManeger");
        })(notice = view.notice || (view.notice = {}));
    })(view = lobby.view || (lobby.view = {}));
})(lobby || (lobby = {}));
//# sourceMappingURL=NoticeManeger.js.map