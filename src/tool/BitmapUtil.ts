module tool {
	export class BitmapUtil {
		private static matrix:number[]=[0.3086, 0.6094, 0.0820, 0, 0,  
			0.3086, 0.6094, 0.0820, 0, 0,  
			0.3086, 0.6094, 0.0820, 0, 0,  
			0,      0,      0,      1, 0];
		private static myfilter:egret.ColorMatrixFilter = new egret.ColorMatrixFilter(BitmapUtil.matrix);
		
		public constructor() {
		}

		public static cutToDictionary(dic:Object, $bitmap:egret.Bitmap, uCount:number, aKey:string[]) : void
        {
            let _bmpd : egret.BitmapData = null;
            let _width : number = $bitmap.width / uCount;
            let _height : number = $bitmap.height;
            let _rect : egret.Rectangle = new egret.Rectangle(0, 0, _width, _height);
            let _point : egret.Point = new egret.Point();
            let _index : number = 0;
			let _tw : egret.RenderTexture; 

            while (_index < uCount)
            {
                
                if (aKey[_index] == null)
                {
                    break;
                }
                _rect.x = _index * _width;
				_tw = new egret.RenderTexture();
				_tw.drawToTexture($bitmap, _rect, 1);
                dic[aKey[_index]] = _bmpd;
                _index = _index + 1;
            }
            _rect = null;
            _point = null;
            _bmpd = null;
        }

		public static cutToArray(arr:egret.Bitmap[], $bitmap:egret.Bitmap, uCount:number) : void
        {
            let _bmp : egret.Bitmap = null;
            let _width : number = $bitmap.width / uCount;
            let _height : number = $bitmap.height;
            let _rect : egret.Rectangle = new egret.Rectangle(0, 0, _width, _height);
            let _point : egret.Point = new egret.Point();
            let _index : number = 0;
			let _tw : egret.RenderTexture;
            while (_index < uCount)
            {
                
                _rect.x = _index * _width;
				_tw = new egret.RenderTexture();
				_tw.drawToTexture($bitmap,_rect, 1);
                _bmp = new egret.Bitmap();
                _bmp.texture = _tw;
                arr.push(_bmp);
                _index = _index + 1;
            }
            _rect = null;
            _point = null;
            _bmp = null;
        }
		
		/** 注册点在左上角 **/
// 		public static snapshot($target:egret.DisplayObject,_w:number=0, _h:number=0):egret.BitmapData
// 		{
// 			// DisplayObject.getBounds() is not sufficient; we need the same
// 			// bounds as those used internally by the player
// 			var m:egret.Matrix =$target.matrix;
// 			var bounds:egret.Rectangle = new egret.Rectangle(0, 0, $target.width, $target.height);
// 			var bmData:egret.BitmapData;
			
// 			if (bounds.width == 0 || bounds.height == 0){
// 				return null;
// 			}
// 			if (m){
// 				if(_w>0 && _h>0){
// //					m.translate(-(Math.floor(_w)), -(Math.floor(_h)));
// 					bmData = new egret.BitmapData(_w, _h, true, 0);
// 				}else{
// 					m.translate(-(Math.floor(bounds.x)), -(Math.floor(bounds.y)));
// 					bmData = new egret.BitmapData(bounds.width, bounds.height, true, 0);
// 				}
// 			}
			
// 			bmData.draw(IBitmapDrawable(target), m);
			
// 			return bmData;
// 		}
		
		/** 注册点居中 或 任意地方 **/
		// public static snapshot_1(target:egret.DisplayObject):egret.BitmapData{
		// 	var bounds:egret.Rectangle =target.getBounds(target);
			
		// 	if (bounds.width == 0 || bounds.height == 0){
		// 		return null;
		// 	}
		// 	var bmData:egret.BitmapData = new egret.BitmapData(bounds.width, bounds.height, true, 0);
			
		// 	bmData.draw(IBitmapDrawable(target), new egret.Matrix(1,0,0,1,-(Math.floor(bounds.x)),-(Math.floor(bounds.y))));
			
		// 	return bmData;
		// }
		
		/** 注册点居中 或 任意地方 **/
		// public static snapshot_2(target:egret.DisplayObject, _width:number, _height:number):egret.BitmapData{
		// 	var bounds:egret.Rectangle =target.getBounds(target);
			
		// 	if (bounds.width == 0 || bounds.height == 0){
		// 		return null;
		// 	}
		// 	var bmData:egret.BitmapData = new egret.BitmapData(_width, _height, true, 0);
			
		// 	bmData.draw(IBitmapDrawable(target), new egret.Matrix(1,0,0,1,-(Math.floor(bounds.x)),-(Math.floor(bounds.y))));
			
		// 	return bmData;
		// }
		
		public static snapshot_3($bitmap:egret.Bitmap, $width:number, $height:number, $x:number=0, $y:number=0):egret.BitmapData{
			let _rect : egret.Rectangle = new egret.Rectangle($x, $y, $width, $height);
			let _tw : egret.RenderTexture = new egret.RenderTexture();
			_tw.drawToTexture($bitmap, _rect, 1);
			
			return _tw.bitmapData;
		}
		
		/**
		 *	颜色滤镜 
		 */		
		public static gray($bmp:egret.Bitmap):egret.BitmapData{
			$bmp.filters = [BitmapUtil.myfilter];
			let _tw : egret.RenderTexture = new egret.RenderTexture();
			_tw.drawToTexture($bmp, new egret.Rectangle(0,0,$bmp.width, $bmp.height), 1);
			return _tw.bitmapData;
		}
		
		public static changeColorFilter($bmp:egret.Bitmap, $matrix:egret.ColorMatrixFilter):egret.BitmapData{
			$bmp.filters = [$matrix];
			let _tw : egret.RenderTexture = new egret.RenderTexture();
			_tw.drawToTexture($bmp, new egret.Rectangle(0,0,$bmp.width,$bmp.height),1);
			return _tw.bitmapData;
		}


	}
}