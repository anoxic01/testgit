var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var manager;
(function (manager) {
    var TextManager = (function () {
        function TextManager() {
            this.m_tf = null;
        }
        TextManager.getInstance = function () {
            if (this.instance == null) {
                this.instance = new TextManager();
            }
            return this.instance;
        };
        TextManager.prototype.filter = function (_sValue, tf) {
            return _sValue == null ? "" : this.cutOutText(_sValue, tf);
        };
        TextManager.prototype.cutOutText = function (s, tf) {
            if (this.m_tf == null) {
                this.m_tf = new egret.TextField();
                this.m_tf.wordWrap = false;
                this.m_tf.multiline = false;
                this.m_tf.textAlign = "left";
            }
            if (tf != null) {
                this.m_tf.text = s;
                if (this.m_tf.textWidth > tf.width) {
                    s = s.slice(0, 2) + "..." + s.slice(s.length - 2, s.length);
                }
            }
            return s;
        };
        TextManager.prototype.createText = function () {
            var _tf = new egret.TextField();
            this.formatText(_tf);
            return _tf;
        };
        TextManager.prototype.adjust = function (_txt, _width) {
            var _size = (_txt.size);
            while (_txt.textWidth > _width) {
                _size--;
                _txt.size = _size;
            }
        };
        TextManager.prototype.formatText = function (_tf) {
            _tf.fontFamily = "Arial";
            _tf.size = 14;
        };
        return TextManager;
    }());
    manager.TextManager = TextManager;
    __reflect(TextManager.prototype, "manager.TextManager");
})(manager || (manager = {}));
//# sourceMappingURL=TextManager.js.map