var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameManager = (function () {
    function GameManager() {
    }
    Object.defineProperty(GameManager, "instance", {
        get: function () {
            if (this._instance == null)
                this._instance = new GameManager;
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    return GameManager;
}());
__reflect(GameManager.prototype, "GameManager");
//# sourceMappingURL=GameManager.js.map