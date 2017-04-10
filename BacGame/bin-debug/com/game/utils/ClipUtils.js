var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ClipUtils = (function () {
    function ClipUtils() {
    }
    ClipUtils.getMovieClips = function (resFlag, startIndex, endIndex) {
        var resNumLen = resFlag.indexOf("}") - resFlag.indexOf("{") - 1;
        var resNames = [];
        if (resNumLen > 0) {
            var resName = resFlag.substring(resFlag.indexOf("{"), resFlag.indexOf("}") + 1);
            for (var i = startIndex; i <= endIndex; i++) {
                resNames.push(resFlag.replace(resName, ClipUtils.fixedSerialNumber(resNumLen, i + "")));
            }
        }
        else {
            console.log("错误的角色动作名称标记：" + resFlag);
        }
        return resNames;
    };
    ClipUtils.fixedSerialNumber = function (len, n) {
        while (n.length < len) {
            n = "0" + n;
        }
        return n;
    };
    return ClipUtils;
}());
__reflect(ClipUtils.prototype, "ClipUtils");
//# sourceMappingURL=ClipUtils.js.map