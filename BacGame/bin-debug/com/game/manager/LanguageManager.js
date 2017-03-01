var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 多语言管理类
 */
var LanguageManager = (function () {
    function LanguageManager() {
        this._lang = 0;
    }
    Object.defineProperty(LanguageManager, "instance", {
        get: function () {
            if (this._instance == null)
                this._instance = new LanguageManager;
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LanguageManager.prototype, "currentLang", {
        get: function () {
            return this._lang;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 切换语言
     */
    LanguageManager.prototype.changeLanguage = function (lang) {
    };
    return LanguageManager;
}());
__reflect(LanguageManager.prototype, "LanguageManager");
//# sourceMappingURL=LanguageManager.js.map