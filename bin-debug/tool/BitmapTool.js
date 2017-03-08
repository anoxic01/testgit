var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var tool;
(function (tool) {
    var BitmapTool = (function () {
        function BitmapTool() {
        }
        BitmapTool.getInstance = function () {
            if (this.instance == null) {
                this.instance = new BitmapTool();
            }
            return this.instance;
        };
        /**
         * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
         * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
         */
        BitmapTool.prototype.createBitmapByName = function (name) {
            var result = new egret.Bitmap();
            var texture = RES.getRes(name);
            result.texture = texture;
            return result;
        };
        return BitmapTool;
    }());
    tool.BitmapTool = BitmapTool;
    __reflect(BitmapTool.prototype, "tool.BitmapTool");
})(tool || (tool = {}));
//# sourceMappingURL=BitmapTool.js.map