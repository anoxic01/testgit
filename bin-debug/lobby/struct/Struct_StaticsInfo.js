var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var lobby;
(function (lobby) {
    var struct;
    (function (struct) {
        var Struct_StaticsInfo = (function () {
            function Struct_StaticsInfo() {
            }
            return Struct_StaticsInfo;
        }());
        struct.Struct_StaticsInfo = Struct_StaticsInfo;
        __reflect(Struct_StaticsInfo.prototype, "lobby.struct.Struct_StaticsInfo");
    })(struct = lobby.struct || (lobby.struct = {}));
})(lobby || (lobby = {}));
//# sourceMappingURL=Struct_StaticsInfo.js.map