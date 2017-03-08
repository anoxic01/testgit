var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var lobby;
(function (lobby) {
    var struct;
    (function (struct) {
        var Struct_Theme = (function () {
            function Struct_Theme() {
                this.IsTelBet = false; //是否电投
            }
            return Struct_Theme;
        }());
        struct.Struct_Theme = Struct_Theme;
        __reflect(Struct_Theme.prototype, "lobby.struct.Struct_Theme");
    })(struct = lobby.struct || (lobby.struct = {}));
})(lobby || (lobby = {}));
//# sourceMappingURL=Struct_Theme.js.map