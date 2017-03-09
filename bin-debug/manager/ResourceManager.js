var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var namager;
(function (namager) {
    var ResourceManager = (function () {
        function ResourceManager() {
        }
        ResourceManager.getInstance = function () {
            if (this.instance == null) {
                this.instance = new ResourceManager();
            }
            return this.instance;
        };
        /**
         * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
         * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
         */
        ResourceManager.prototype.createBitmapByName = function (name) {
            var result = new egret.Bitmap();
            var texture = RES.getRes(name);
            result.texture = texture;
            return result;
        };
        return ResourceManager;
    }());
    namager.ResourceManager = ResourceManager;
    __reflect(ResourceManager.prototype, "namager.ResourceManager");
})(namager || (namager = {}));
//# sourceMappingURL=ResourceManager.js.map