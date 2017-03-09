var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var tool;
(function (tool) {
    var BitmapNumberUtil = (function () {
        function BitmapNumberUtil(_bitmap, uCount) {
            var _bmp;
            var _iIndex = 0;
            this.m_nWidth = _bitmap.width / uCount;
            this.m_nHeight = _bitmap.height;
            this.m_data = [];
            while (_iIndex < uCount) {
                var drawTexture = new egret.RenderTexture();
                drawTexture.drawToTexture(_bitmap, new egret.Rectangle(_iIndex * this.m_nWidth, 0, this.m_nWidth, this.m_nHeight), 1);
                _bmp = new egret.Bitmap();
                _bmp.texture = drawTexture;
                _bmp.smoothing = true;
                this.m_data.push(_bmp);
                _iIndex++;
            }
            _bitmap.texture.dispose();
            _bitmap = null;
        }
        BitmapNumberUtil.prototype.destroy = function () {
            if (this.m_data) {
                var len = this.m_data.length;
                for (var i = void 0; i < len; i++) {
                    this.m_data[i].texture.dispose();
                }
                this.m_data = null;
            }
        };
        /**
         *	位图数字
         * @param num
         * @return
         *
         */
        BitmapNumberUtil.prototype.conversion = function (num) {
            var _iIndex = 0;
            var _bmp;
            var _sp = new egret.Sprite();
            var _sNum = num.toString();
            while (_iIndex < _sNum.length) {
                _bmp = this.m_data[_sNum.charAt(_iIndex)];
                _sp.addChild(_bmp);
                _bmp.x = Math.round(_iIndex * _bmp.width);
                _iIndex++;
            }
            var drawTexture = new egret.RenderTexture();
            drawTexture.drawToTexture(_sp, new egret.Rectangle(0, 0, _sp.width, _sp.height), 1);
            while (_sp.numChildren > 0) {
                _sp.removeChildAt(0);
            }
            _sp = null;
            _bmp = null;
            return drawTexture.bitmapData;
        };
        /**
         *	百分数字
         * @param num
         * @return
         *
         */
        BitmapNumberUtil.prototype.conversionPercent = function (num) {
            var _iIndex;
            var _bmp;
            var _sp = new egret.Sprite();
            var _sNum = num.toString();
            while (_iIndex < _sNum.length) {
                _bmp = this.m_data[_sNum.charAt(_iIndex)];
                _sp.addChild(_bmp);
                _bmp.x = Math.round(_iIndex * _bmp.width);
                _iIndex++;
            }
            var _bmpPercent = this.m_data[BitmapNumberUtil.PERCENT];
            _sp.addChild(_bmpPercent);
            _bmpPercent.x = Math.round(_sNum.length * _bmpPercent.width);
            var drawTexture = new egret.RenderTexture();
            drawTexture.drawToTexture(_sp, new egret.Rectangle(0, 0, _sp.width, _sp.height), 1);
            while (_sp.numChildren > 0) {
                _sp.removeChildAt(0);
            }
            _sp = null;
            return drawTexture.bitmapData;
        };
        /**
         *	带符号数字
         * @param num
         * @return
         *
         */
        BitmapNumberUtil.prototype.conversionSign = function (num) {
            var _bmpSign;
            var _iIndex;
            var _bmp = null;
            var _sp = new egret.Sprite();
            var _sNum = num.toString();
            if (num.toString().indexOf("-") != -1) {
                _sNum = _sNum.slice((_sNum.indexOf("-") + 1));
            }
            if (num > 0) {
                _bmpSign = this.m_data[BitmapNumberUtil.ADD];
                _sp.addChild(_bmpSign);
            }
            else if (num < 0) {
                _bmpSign = this.m_data[BitmapNumberUtil.SUB];
                _sp.addChild(_bmpSign);
            }
            while (_iIndex < _sNum.length) {
                _bmp = this.m_data[_sNum.charAt(_iIndex)];
                _sp.addChild(_bmp);
                _bmp.x = Math.round((_iIndex + 1) * this.m_nWidth);
                _iIndex++;
            }
            var drawTexture = new egret.RenderTexture();
            drawTexture.drawToTexture(_sp, new egret.Rectangle(0, 0, _sp.width, _sp.height), 1);
            while (_sp.numChildren > 0) {
                _sp.removeChildAt(0);
            }
            _sp = null;
            return drawTexture.bitmapData;
        };
        /**
         *	单个数据
         * @param uIndex
         * @return
         *
         */
        BitmapNumberUtil.prototype.conversionToIndex = function (uIndex) {
            return this.m_data[uIndex].bitmapData;
        };
        /**
         *	斜线分隔的两个数字
         */
        BitmapNumberUtil.prototype.conversionSlash = function (uFront, uLast) {
            var _bmpSign;
            var _iFrontIndex;
            var _iLastIndex;
            var _bmp = null;
            var _sp = new egret.Sprite();
            var _sFront = uFront.toString();
            var _sLast = uLast.toString();
            while (_iFrontIndex < _sFront.length) {
                _bmp = this.m_data[_sFront.charAt(_iFrontIndex)];
                _sp.addChild(_bmp);
                _bmp.x = Math.round(_iFrontIndex * this.m_nWidth);
                _iFrontIndex++;
            }
            _bmpSign = this.m_data[BitmapNumberUtil.SLASH];
            _sp.addChild(_bmpSign);
            _bmpSign.x = Math.round(_iFrontIndex * this.m_nWidth);
            _iFrontIndex++;
            while (_iLastIndex < _sLast.length) {
                _bmp = this.m_data[_sLast.charAt(_iLastIndex)];
                _sp.addChild(_bmp);
                _bmp.x = Math.round(_iFrontIndex * this.m_nWidth);
                _iFrontIndex++;
                _iLastIndex++;
            }
            var drawTexture = new egret.RenderTexture();
            drawTexture.drawToTexture(_sp, new egret.Rectangle(0, 0, _sp.width, _sp.height), 1);
            while (_sp.numChildren > 0) {
                _sp.removeChildAt(0);
            }
            _sp = null;
            return drawTexture.bitmapData;
        };
        /**
         *	-分隔的两个数字
         */
        BitmapNumberUtil.prototype.conversionMinus = function (uFront, uLast) {
            var _bmpSign;
            var _iFrontIndex;
            var _iLastIndex;
            var _bmp = null;
            var _sp = new egret.Sprite();
            var _sFront = uFront.toString();
            var _sLast = uLast.toString();
            while (_iFrontIndex < _sFront.length) {
                _bmp = this.m_data[_sFront.charAt(_iFrontIndex)];
                _sp.addChild(_bmp);
                _bmp.x = Math.round(_iFrontIndex * this.m_nWidth);
                _iFrontIndex++;
            }
            _bmpSign = this.m_data[BitmapNumberUtil.SUB];
            _sp.addChild(_bmpSign);
            _bmpSign.x = Math.round(_iFrontIndex * this.m_nWidth);
            _iFrontIndex++;
            while (_iLastIndex < _sLast.length) {
                _bmp = this.m_data[_sLast.charAt(_iLastIndex)];
                _sp.addChild(_bmp);
                _bmp.x = Math.round(_iFrontIndex * this.m_nWidth);
                _iFrontIndex++;
                _iLastIndex++;
            }
            var drawTexture = new egret.RenderTexture();
            drawTexture.drawToTexture(_sp, new egret.Rectangle(0, 0, _sp.width, _sp.height), 1);
            while (_sp.numChildren > 0) {
                _sp.removeChildAt(0);
            }
            _sp = null;
            return drawTexture.bitmapData;
        };
        /**
         * 轉換為帶小數點的數字位圖
         */
        BitmapNumberUtil.prototype.conversionDecimalPoint = function (num) {
            var _bmpd;
            var _iIndex;
            var _bmp;
            var _sp = new egret.Sprite();
            var _aTmp = String(num).split('.');
            var _sNum = _aTmp[0].toString();
            var _iFrontIndex;
            var _iLastIndex;
            if (num < 0) {
                _bmp = this.m_data[BitmapNumberUtil.SUB];
                _sp.addChild(_bmp);
                _bmp.x = Math.round(_iFrontIndex * _bmp.width);
                _iFrontIndex++;
            }
            while (_iFrontIndex < _sNum.length) {
                _bmp = this.m_data[_sNum.charAt(_iFrontIndex)];
                _sp.addChild(_bmp);
                _bmp.x = Math.round(_iFrontIndex * _bmp.width);
                _iFrontIndex++;
            }
            //有小數點
            if (_aTmp[1]) {
                var _bmpSign = this.m_data[BitmapNumberUtil.DECIMAL_POINT];
                _sp.addChild(_bmpSign);
                _bmpSign.x = Math.round(_iFrontIndex * this.m_nWidth);
                _iFrontIndex++;
                var _sNum2 = _aTmp[1];
                while (_iLastIndex < _sNum2.length) {
                    _bmp = this.m_data[_sNum2.charAt(_iLastIndex)];
                    _sp.addChild(_bmp);
                    _bmp.x = Math.round(_iFrontIndex * _bmp.width);
                    _iFrontIndex++;
                    _iLastIndex++;
                }
            }
            var drawTexture = new egret.RenderTexture();
            drawTexture.drawToTexture(_sp, new egret.Rectangle(0, 0, _sp.width, _sp.height), 1);
            while (_sp.numChildren > 0) {
                _sp.removeChildAt(0);
            }
            _sp = null;
            return drawTexture.bitmapData;
        };
        return BitmapNumberUtil;
    }());
    BitmapNumberUtil.SLASH = 10;
    BitmapNumberUtil.COMMA = 11;
    BitmapNumberUtil.DECIMAL_POINT = 12;
    BitmapNumberUtil.ADD = 13;
    BitmapNumberUtil.SUB = 14;
    BitmapNumberUtil.PERCENT = 15;
    tool.BitmapNumberUtil = BitmapNumberUtil;
    __reflect(BitmapNumberUtil.prototype, "tool.BitmapNumberUtil");
})(tool || (tool = {}));
//# sourceMappingURL=BitmapNumberUtil.js.map