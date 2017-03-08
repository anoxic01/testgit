var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var config;
(function (config) {
    var TemConfig = (function () {
        function TemConfig() {
            this.ServerIp = "127.0.0.1:2001";
            this.PhoneBetID = 5;
            this.ThemeList = [];
        }
        TemConfig.getInstance = function () {
            if (this.instance == null) {
                this.instance = new TemConfig();
            }
            return this.instance;
        };
        return TemConfig;
    }());
    TemConfig.VERSION = "V1_1_23_22";
    config.TemConfig = TemConfig;
    __reflect(TemConfig.prototype, "config.TemConfig");
})(config || (config = {}));
//# sourceMappingURL=TemConfig.js.map