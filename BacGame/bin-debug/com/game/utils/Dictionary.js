var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Dictionary = (function () {
    function Dictionary() {
        this.index = -1;
        this.isDispose = false;
        this.dict = new Object();
        this.keys = new Array();
    }
    /**
     * 添加键值对
     */
    Dictionary.prototype.add = function (key, value) {
        if (!this.isDispose && key != null) {
            if (this.keys.indexOf(key) < 0) {
                this.keys.push(key);
            }
            if (typeof key === "string" || typeof key === "number") {
                this.dict[key] = value;
            }
            else {
                this.dict["DictionaryKey_" + key.hashCode] = value;
            }
        }
    };
    /**
     * 获取指定的key的值
     */
    Dictionary.prototype.get = function (key) {
        if (this.isDispose || key == null)
            return null;
        else if (typeof key === "string" || typeof key === "number") {
            return this.dict[key];
        }
        else {
            return this.dict["DictionaryKey_" + key.hashCode];
        }
    };
    /**
     * 删除保存的键值对
     */
    Dictionary.prototype.delete = function (key) {
        if (!this.isDispose && key != null) {
            this.index = this.keys.indexOf(key);
            if (this.index > -1) {
                this.keys.splice(this.index, 1);
            }
            if (typeof key === "string" || typeof key === "number") {
                delete this.dict[key];
            }
            else {
                delete this.dict["DictionaryKey_" + key.hashCode];
            }
        }
    };
    /**
     * 销毁字典
     */
    Dictionary.prototype.dispose = function () {
        if (!this.isDispose) {
            this.clear();
            this.dict = null;
            this.keys = null;
            this.isDispose = true;
        }
    };
    /**
     * 清空字典
     */
    Dictionary.prototype.clear = function () {
        for (var key in this.dict) {
            delete this.dict[key];
        }
        while (this.keys.length > 0) {
            this.keys.shift();
        }
    };
    /**
     * 用于获取到所有的Key值方便遍历字典
     */
    Dictionary.prototype.getKeys = function () {
        if (this.isDispose)
            return null;
        return this.keys.concat();
    };
    /**
     * 【Debug】查看并打印字典数据
     */
    Dictionary.prototype.printDictionary = function () {
        for (var i = 0; i < this.keys.length; i++) {
            console.log("Dictionary[key = " + this.keys[i] + "] = " + this.get(this.keys[i]));
        }
    };
    return Dictionary;
}());
__reflect(Dictionary.prototype, "Dictionary");
//# sourceMappingURL=Dictionary.js.map