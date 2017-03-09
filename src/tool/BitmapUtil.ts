module tool {
	export class BitmapUtil {
		private static matrix:number[]=[0.3086, 0.6094, 0.0820, 0, 0,  
			0.3086, 0.6094, 0.0820, 0, 0,  
			0.3086, 0.6094, 0.0820, 0, 0,  
			0,      0,      0,      1, 0];
		private static myfilter:egret.ColorMatrixFilter = new egret.ColorMatrixFilter(matrix);
		
		public constructor() {
		}

		public static cutToDictionary(dic:Dictionary, bitmapdata:egret.BitmapData, uCount:number, aKey:Array) : void
        {
            var _bmpd : egret.BitmapData = null;
            var _width : Number = bitmapdata.width / uCount;
            var _height : Number = bitmapdata.height;
            var _rect : egret.Rectangle = new egret.Rectangle(0, 0, _width, _height);
            var _point : egret.Point = new egret.Point();
            var _index : int = 0;
            while (_index < uCount)
            {
                
                if (aKey[_index] == null)
                {
                    break;
                }
                _rect.x = _index * _width;
                _bmpd = new egret.BitmapData(_width, _height, true, 0);
                _bmpd.copyPixels(bitmapdata, _rect, _point);
                dic[aKey[_index]] = _bmpd;
                _index = _index + 1;
            }
            _rect = null;
            _point = null;
            _bmpd = null;
        }

        public static cutToArray(arr:Array, bitmapdata:egret.BitmapData, uCount:number) : void
        {
            var _bmpd : egret.BitmapData = null;
            var _width : Number = bitmapdata.width / uCount;
            var _height : Number = bitmapdata.height;
            var _rect : egret.Rectangle = new egret.Rectangle(0, 0, _width, _height);
            var _point : egret.Point = new egret.Point();
            var _index : number = 0;
            while (_index < uCount)
            {
                
                _rect.x = _index * _width;
                _bmpd = new egret.BitmapData(_width, _height, true, 0);
                _bmpd.copyPixels(bitmapdata, _rect, _point);
                arr.push(_bmpd);
                _index = _index + 1;
            }
            _rect = null;
            _point = null;
            _bmpd = null;
        }
		
		/** 注册点在左上角 **/
		public static snapshot(target:egret.DisplayObject,_w:number=0, _h:number=0):egret.BitmapData
		{
			// DisplayObject.getBounds() is not sufficient; we need the same
			// bounds as those used internally by the player
			var m:egret.Matrix =target.transform.matrix;
			var bounds:egret.Rectangle =target.getBounds(target);
			var bmData:egret.BitmapData;
			
			if (bounds.width == 0 || bounds.height == 0){
				return null;
			}
			if (m){
				if(_w>0 && _h>0){
//					m.translate(-(Math.floor(_w)), -(Math.floor(_h)));
					bmData = new egret.BitmapData(_w, _h, true, 0);
				}else{
					m.translate(-(Math.floor(bounds.x)), -(Math.floor(bounds.y)));
					bmData = new egret.BitmapData(bounds.width, bounds.height, true, 0);
				}
			}
			
			bmData.draw(IBitmapDrawable(target), m);
			
			return bmData;
		}
		
		/** 注册点居中 或 任意地方 **/
		public static snapshot_1(target:egret.DisplayObject):egret.BitmapData{
			var bounds:egret.Rectangle =target.getBounds(target);
			
			if (bounds.width == 0 || bounds.height == 0){
				return null;
			}
			var bmData:egret.BitmapData = new egret.BitmapData(bounds.width, bounds.height, true, 0);
			
			bmData.draw(IBitmapDrawable(target), new egret.Matrix(1,0,0,1,-(Math.floor(bounds.x)),-(Math.floor(bounds.y))));
			
			return bmData;
		}
		
		/** 注册点居中 或 任意地方 **/
		public static snapshot_2(target:egret.DisplayObject, _width:number, _height:number):egret.BitmapData{
			var bounds:egret.Rectangle =target.getBounds(target);
			
			if (bounds.width == 0 || bounds.height == 0){
				return null;
			}
			var bmData:egret.BitmapData = new egret.BitmapData(_width, _height, true, 0);
			
			bmData.draw(IBitmapDrawable(target), new egret.Matrix(1,0,0,1,-(Math.floor(bounds.x)),-(Math.floor(bounds.y))));
			
			return bmData;
		}
		
		public static snapshot_3(_bitmapdata:egret.BitmapData, _width:number, _height:number, _x:number=0, _y:number=0):egret.BitmapData{
			var bmData:egret.BitmapData = new egret.BitmapData(_width, _height, true, 0);
			var rect : egret.Rectangle = new egret.Rectangle(0,0, _width, _height);
			rect.x = _x;
			rect.y = _y;
			bmData.copyPixels(_bitmapdata, rect, new egret.Point());
			
			return bmData;
		}
		
		/**
		 *	颜色滤镜 
		 */		
		public static gray(_bmp:egret.Bitmap):egret.BitmapData{
			_bmp.filters = [myfilter];
			var bmpd : egret.BitmapData = new egret.BitmapData(_bmp.width,_bmp.height);
			bmpd.draw(_bmp);
			return bmpd;
		}
		
		public static changeColorFilter(_bmp:egret.Bitmap, _matrix:egret.ColorMatrixFilter):egret.BitmapData{
			_bmp.filters = [_matrix];
			var bmpd : egret.BitmapData = new egret.BitmapData(_bmp.width,_bmp.height);
			bmpd.draw(_bmp);
			return bmpd;
		}


	}
}