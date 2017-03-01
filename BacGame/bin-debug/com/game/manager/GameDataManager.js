var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameDataManager = (function () {
    function GameDataManager() {
    }
    Object.defineProperty(GameDataManager, "instance", {
        get: function () {
            if (this._instance == null)
                this._instance = new GameDataManager;
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    return GameDataManager;
}());
__reflect(GameDataManager.prototype, "GameDataManager");
//# sourceMappingURL=GameDataManager.js.map