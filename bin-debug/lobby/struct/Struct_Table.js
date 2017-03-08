var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var lobby;
(function (lobby) {
    var struct;
    (function (struct) {
        var Struct_Table = (function () {
            function Struct_Table() {
            }
            return Struct_Table;
        }());
        struct.Struct_Table = Struct_Table;
        __reflect(Struct_Table.prototype, "lobby.struct.Struct_Table");
    })(struct = lobby.struct || (lobby.struct = {}));
})(lobby || (lobby = {}));
//# sourceMappingURL=Struct_Table.js.map