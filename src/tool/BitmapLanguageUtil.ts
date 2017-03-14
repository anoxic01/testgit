module tool {
	export class BitmapLanguageUtil {

		public constructor() {
		}
		
		public static cut(_bitmapdata:egret.Bitmap, uCount:number):egret.BitmapData[]{
			var arr : egret.BitmapData[] = [];
			var _nWidth	: number = _bitmapdata.width / uCount;
			var _nHeight :	number = _bitmapdata.height;
			var _rectangle : egret.Rectangle;
			var _iIndex : number;
			let _tw : egret.RenderTexture;
			while (_iIndex < uCount)
			{
				_rectangle = new egret.Rectangle(_iIndex * _nWidth, 0, _nWidth, _nHeight);
				_tw = new egret.RenderTexture();
				_tw.drawToTexture(_bitmapdata, _rectangle,1)
				arr[_iIndex] = _tw.bitmapData;
				_iIndex++;
			}
			_rectangle = null;
			
			return arr;
		}
	}
}