module util.bitmap {
	export class BitmapUtil {
		private static matrix=[0.3086, 0.6094, 0.0820, 0, 0,  
			0.3086, 0.6094, 0.0820, 0, 0,  
			0.3086, 0.6094, 0.0820, 0, 0,  
			0,      0,      0,      1, 0];
		private static myfilter=new egret.ColorMatrixFilter(util.bitmap.BitmapUtil.matrix);
		
		public constructor() {
		}
        public static cutToDictionary(dic, bitmapdata, uCount, aKey) : void
        {
           let _bmpd  = null;
           let _width  = bitmapdata.width / uCount;
           let _height  = bitmapdata.height;
           let _rect  = new egret.Rectangle(0, 0, _width, _height);
           let _point  = new egret.Point();
           let _index  = 0;
            while (_index < uCount)
            {
                
                if (aKey[_index] == null)
                {
                    break;
                }
                _rect.x = _index * _width;
                _bmpd = new egret.BitmapData(bitmapdata);
                _bmpd.copyPixels(bitmapdata, _rect, _point);
                dic[aKey[_index]] = _bmpd;
                _index = _index + 1;
            }
            _rect = null;
            _point = null;
            _bmpd = null;
        }

        public static cutToArray(arr, bitmapdata, uCount) : void
        {
           let _bmpd  = null;
           let _width  = bitmapdata.width / uCount;
           let _height  = bitmapdata.height;
           let _rect  = new egret.Rectangle(0, 0, _width, _height);
           let _point  = new egret.Point();
           let _index  = 0;
            while (_index < uCount)
            {
                
                _rect.x = _index * _width;
                _bmpd = new egret.BitmapData(bitmapdata);
                _bmpd.copyPixels(bitmapdata, _rect, _point);
                arr.push(_bmpd);
                _index = _index + 1;
            }
            _rect = null;
            _point = null;
            _bmpd = null;
        }
		
		/** 注册点在左上角 **/
		public static snapshot(target,_w=0, _h=0):egret.BitmapData
		{
			// DisplayObject.getBounds() is not sufficient; we need the same
			// bounds as those used internally by the player
			var m =target.transform.matrix;
			var bounds =target.getBounds(target);
			var bmData;
			
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
			
			bmData.draw(target, m);
			
			return bmData;
		}
		
		/** 注册点居中 或 任意地方 **/
		public static snapshot_1(target):egret.BitmapData{
			var bounds =target.getBounds(target);
			
			if (bounds.width == 0 || bounds.height == 0){
				return null;
			}
			var bmData = new egret.BitmapData(bounds.width, bounds.height, true, 0);
			
			bmData.draw(target, new egret.Matrix(1,0,0,1,-(Math.floor(bounds.x)),-(Math.floor(bounds.y))));
			
			return bmData;
		}
		
		/** 注册点居中 或 任意地方 **/
		public static snapshot_2(target, _width, _height):egret.BitmapData{
			var bounds =target.getBounds(target);
			
			if (bounds.width == 0 || bounds.height == 0){
				return null;
			}
			var bmData = new egret.BitmapData(_width, _height, true, 0);
			
			bmData.draw(target, new egret.Matrix(1,0,0,1,-(Math.floor(bounds.x)),-(Math.floor(bounds.y))));
			
			return bmData;
		}
		
		public static snapshot_3(_bitmapdata, _width, _height, _x=0, _y=0):egret.BitmapData{
			var bmData = new egret.BitmapData(_width, _height, true, 0);
			var rect  = new egret.Rectangle(0,0, _width, _height);
			rect.x = _x;
			rect.y = _y;
			bmData.copyPixels(_bitmapdata, rect, new egret.Point());
			
			return bmData;
		}
		
		/**
		 *	颜色滤镜 
		 */		
		public static gray(_bmp):egret.BitmapData{
			_bmp.filters = [util.bitmap.BitmapUtil.myfilter];
			var bmpd  = new egret.BitmapData(_bmp.width,_bmp.height);
			bmpd.draw(_bmp);
			return bmpd;
		}
		
		public static changeColorFilter(_bmp, _matrix):egret.BitmapData{
			_bmp.filters = [_matrix];
			var bmpd  = new egret.BitmapData(_bmp.width,_bmp.height);
			bmpd.draw(_bmp);
			return bmpd;
		}
		
		
	}
}