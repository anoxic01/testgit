module tool {
	export class BitmapNumberUtil {

		private  m_data					:	egret.Bitmap[];
        private  m_nWidth				:	number;
        private  m_nHeight				:	number;
		
		public static SLASH				:	number = 10;
		public static COMMA				:	number = 11;
		public static DECIMAL_POINT		:	number = 12;
		public static ADD				:	number = 13;
		public static SUB				:	number = 14;
		public static PERCENT			:	number = 15;
		

		public constructor(_bitmap:egret.Bitmap, uCount:number) {
            let _bmp : egret.Bitmap;
            let _iIndex : number = 0;
			
            this.m_nWidth = _bitmap.width / uCount;
            this.m_nHeight = _bitmap.height;
            this.m_data = [];
			
            while (_iIndex < uCount)
            {
                let drawTexture : egret.RenderTexture = new egret.RenderTexture();
				drawTexture.drawToTexture(_bitmap, new egret.Rectangle(_iIndex * this.m_nWidth, 0, this.m_nWidth, this.m_nHeight), 1);
				_bmp = new egret.Bitmap();
				_bmp.texture = drawTexture;
				_bmp.smoothing = true;

                this.m_data.push(_bmp) ;
                _iIndex++;
            }
            _bitmap.texture.dispose();
			_bitmap = null;
		}

		
        public destroy() : void
        {
            if (this.m_data)
            {
				let len = this.m_data.length;
                for (let i:number;i<len;i++)
                {
                    this.m_data[i].texture.dispose();
                }
                this.m_data = null;
            }
            
        }
		
		/**
		 *	位图数字
		 * @param num
		 * @return 
		 * 
		 */		
        public conversion(num:number) : egret.BitmapData
        {
            let _iIndex : number = 0;
            let _bmp : egret.Bitmap;
            let _sp : egret.Sprite = new egret.Sprite();
            let _sNum : String = num.toString();
            
            while (_iIndex < _sNum.length)
            {
                _bmp = this.m_data[_sNum.charAt(_iIndex)];
                _sp.addChild(_bmp);
                _bmp.x = Math.round(_iIndex * _bmp.width);
                _iIndex++;
            }
			
			let drawTexture : egret.RenderTexture = new egret.RenderTexture();
			drawTexture.drawToTexture(_sp, new egret.Rectangle(0, 0, _sp.width, _sp.height), 1);
			
			while(_sp.numChildren>0){
				_sp.removeChildAt(0);
			}
			_sp = null;
			_bmp = null;
			
            return drawTexture.bitmapData;
        }

		/**
		 *	百分数字
		 * @param num
		 * @return 
		 * 
		 */		
        public conversionPercent(num:number) : egret.BitmapData
        {
            let _iIndex : number;
            let _bmp : egret.Bitmap;
            let _sp : egret.Sprite = new egret.Sprite();
            let _sNum : String = num.toString();
            
            while (_iIndex < _sNum.length)
            {
                _bmp = this.m_data[_sNum.charAt(_iIndex)];
                _sp.addChild(_bmp);
                _bmp.x = Math.round(_iIndex * _bmp.width);
                _iIndex++;
            }

            let _bmpPercent : egret.Bitmap = this.m_data[BitmapNumberUtil.PERCENT];
            _sp.addChild(_bmpPercent);
            _bmpPercent.x = Math.round(_sNum.length * _bmpPercent.width);

			let drawTexture : egret.RenderTexture = new egret.RenderTexture();
			drawTexture.drawToTexture(_sp, new egret.Rectangle(0, 0, _sp.width, _sp.height), 1);
			
			while(_sp.numChildren>0){
				_sp.removeChildAt(0);
			}
			_sp = null;
			
            return drawTexture.bitmapData;
        }

		/**
		 *	带符号数字 
		 * @param num
		 * @return 
		 * 
		 */		
        public conversionSign(num:number) : egret.BitmapData
        {
            let _bmpSign : egret.Bitmap;
            let _iIndex : number;
            let _bmp : egret.Bitmap = null;
            let _sp: egret.Sprite = new egret.Sprite();
            let _sNum : String = num.toString();
			
            if (num.toString().indexOf("-") != -1)
            {
                _sNum = _sNum.slice((_sNum.indexOf("-") + 1));
            }
            if (num > 0)
            {
                _bmpSign = this.m_data[BitmapNumberUtil.ADD];
                _sp.addChild(_bmpSign);
            }
            else if (num < 0)
            {
                _bmpSign = this.m_data[BitmapNumberUtil.SUB];
                _sp.addChild(_bmpSign);
            }
            
            while (_iIndex < _sNum.length)
            {
                
                _bmp = this.m_data[_sNum.charAt(_iIndex)];
                _sp.addChild(_bmp);
                _bmp.x = Math.round((_iIndex + 1) * this.m_nWidth);
                _iIndex++;
            }
			
			let drawTexture : egret.RenderTexture = new egret.RenderTexture();
			drawTexture.drawToTexture(_sp, new egret.Rectangle(0, 0, _sp.width, _sp.height), 1);
			
			while(_sp.numChildren>0){
				_sp.removeChildAt(0);
			}
			_sp = null;
			
            return drawTexture.bitmapData;
        }
		
		/**
		 *	单个数据 
		 * @param uIndex
		 * @return 
		 * 
		 */		
        public conversionToIndex(uIndex:number) : egret.BitmapData
        {
            return this.m_data[uIndex].bitmapData;
        }
		
		
		/**
		 *	斜线分隔的两个数字 
		 */		
		public conversionSlash(uFront:number, uLast:number) : egret.BitmapData{
			let _bmpSign : egret.Bitmap;
			let _iFrontIndex : number;
			let _iLastIndex : number;
			let _bmp : egret.Bitmap = null;
			let _sp: egret.Sprite = new egret.Sprite();
			let _sFront : String = uFront.toString();
			let _sLast	: String = uLast.toString();
			
			while (_iFrontIndex < _sFront.length)
			{
				_bmp = this.m_data[_sFront.charAt(_iFrontIndex)];
				_sp.addChild(_bmp);
				_bmp.x = Math.round(_iFrontIndex * this.m_nWidth);
				_iFrontIndex++;
			}
			
			_bmpSign = this.m_data[BitmapNumberUtil.SLASH];
			_sp.addChild(_bmpSign);
			_bmpSign.x = Math.round(_iFrontIndex * this.m_nWidth);
			_iFrontIndex++;
			
			while (_iLastIndex < _sLast.length)
			{
				_bmp = this.m_data[_sLast.charAt(_iLastIndex)];
				_sp.addChild(_bmp);
				_bmp.x = Math.round(_iFrontIndex * this.m_nWidth);
				_iFrontIndex++;
				_iLastIndex++;
			}
			
			let drawTexture : egret.RenderTexture = new egret.RenderTexture();
			drawTexture.drawToTexture(_sp, new egret.Rectangle(0, 0, _sp.width, _sp.height), 1);
			
			while(_sp.numChildren>0){
				_sp.removeChildAt(0);
			}
			_sp = null;
			
			return drawTexture.bitmapData;
		}


		/**
		 *	-分隔的两个数字 
		 */		
		public conversionMinus(uFront:number, uLast:number) : egret.BitmapData{
			let _bmpSign : egret.Bitmap;
			let _iFrontIndex : number;
			let _iLastIndex : number;
			let _bmp : egret.Bitmap = null;
			let _sp: egret.Sprite = new egret.Sprite();
			let _sFront : String = uFront.toString();
			let _sLast	: String = uLast.toString();
			
			while (_iFrontIndex < _sFront.length)
			{
				_bmp = this.m_data[_sFront.charAt(_iFrontIndex)];
				_sp.addChild(_bmp);
				_bmp.x = Math.round(_iFrontIndex * this.m_nWidth);
				_iFrontIndex++;
			}
			
			_bmpSign = this.m_data[BitmapNumberUtil.SUB];
			_sp.addChild(_bmpSign);
			_bmpSign.x = Math.round(_iFrontIndex * this.m_nWidth);
			_iFrontIndex++;
			
			while (_iLastIndex < _sLast.length)
			{
				_bmp = this.m_data[_sLast.charAt(_iLastIndex)];
				_sp.addChild(_bmp);
				_bmp.x = Math.round(_iFrontIndex * this.m_nWidth);
				_iFrontIndex++;
				_iLastIndex++;
			}
			
			let drawTexture : egret.RenderTexture = new egret.RenderTexture();
			drawTexture.drawToTexture(_sp, new egret.Rectangle(0, 0, _sp.width, _sp.height), 1);
			
			while(_sp.numChildren>0){
				_sp.removeChildAt(0);
			}
			_sp = null;
			
			return drawTexture.bitmapData;
		}
		
		/**
		 * 轉換為帶小數點的數字位圖 
		 */
		public conversionDecimalPoint( num:number ):egret.BitmapData {
			
			let _bmpd : egret.BitmapData;
			let _iIndex : number;
			let _bmp : egret.Bitmap;
			let _sp : egret.Sprite = new egret.Sprite();
			let _aTmp:any[] = String(num).split('.');
			let _sNum : String = _aTmp[0].toString();
			let _iFrontIndex : number;
			let _iLastIndex : number;
			
			if(num<0){
				_bmp = this.m_data[BitmapNumberUtil.SUB];
				_sp.addChild(_bmp);
				_bmp.x = Math.round(_iFrontIndex * _bmp.width);
				_iFrontIndex++;
			}
			while (_iFrontIndex < _sNum.length){
				_bmp =  this.m_data[_sNum.charAt(_iFrontIndex)];
				_sp.addChild(_bmp);
				_bmp.x = Math.round(_iFrontIndex * _bmp.width);
				_iFrontIndex++;
			}

			//有小數點
			if( _aTmp[1] ){
				
				var _bmpSign:egret.Bitmap = this.m_data[BitmapNumberUtil.DECIMAL_POINT];
				_sp.addChild(_bmpSign);
				_bmpSign.x = Math.round(_iFrontIndex * this.m_nWidth);
				_iFrontIndex++;				
				
				var _sNum2 : String = _aTmp[1];
				while (_iLastIndex < _sNum2.length)
				{
					_bmp = this.m_data[_sNum2.charAt(_iLastIndex)];
					_sp.addChild(_bmp);
					_bmp.x = Math.round(_iFrontIndex * _bmp.width);
					_iFrontIndex++;
					_iLastIndex++;
				}
			}
			
			let drawTexture : egret.RenderTexture = new egret.RenderTexture();
			drawTexture.drawToTexture(_sp, new egret.Rectangle(0, 0, _sp.width, _sp.height), 1);
			
			while(_sp.numChildren>0){
				_sp.removeChildAt(0);
			}
			_sp = null;
			
			return drawTexture.bitmapData;
		}

		
	}
}