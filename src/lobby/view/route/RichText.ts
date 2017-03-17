module lobby.view.route {
	export class RichText extends BSprite{
		private static const PREFIX:String = "#";//#25
		private static const EMPTY:String = "　";
		
		private static const FACE_COUNT:int = 99;
		private static const FACE_SIZE:int = 30;
		
		private var _tf:TextField;
		private var _box:Sprite;
		
		private var _text:String;
		private var _width:Number;
		private var _convertStr:String;
		
		private var _faces:Array;
		
		private var _faceIdLen:int;
		private var _faceLen:int;
		private var _emptyLen:int;
		private var _timer:int = -1;

		private var _textFormat:TextFormat;
		private var _faceFormat:TextFormat;
		
		public constructor() {
		
			super();
			_faceIdLen = String(FACE_COUNT).length;
			_faceLen = PREFIX.length + _faceIdLen;
			_emptyLen = EMPTY.length;
			_faces = [];
			
			_textFormat = new TextFormat("Arial",16,0xffffff);
			_textFormat.letterSpacing = 2;
			_faceFormat = new TextFormat("Arial",FACE_SIZE,0xffffff);
			_faceFormat.letterSpacing = 12;
			
			_tf = new TextField();
			_tf.defaultTextFormat = _textFormat;
			_tf.autoSize = TextFieldAutoSize.LEFT;
			_tf.wordWrap = true;
			_tf.multiline = true;
			_tf.border = true;
			this.addChild(_tf);
			_box = new Sprite();
//			_box.mouseEnabled=_box.mouseChildren=false;
			this.addChild(_box);
			
			this.mouseEnabled=this.mouseChildren=false;
		}
		override public function destroy():void
		{
			_faces = null;
			if(_box.numChildren>0)
			{
				_box.removeChildren();
			}
			if(_timer > -1)
			{
				clearTimeout(_timer);
				_timer = -1;
			}
		}
		public function clear():void
		{
			_faces.length = 0;
			if(_box.numChildren>0)
			{
				_box.removeChildren();
			}
			if(_timer > -1)
			{
				clearTimeout(_timer);
				_timer = -1;
			}
		}
		override public function set width(value:Number):void
		{
			_width = value;
			_tf.width = _width;
			super.width = _width;
		}
		public function get text():String
		{
			return _text;
		}
		public function set text(value:String):void
		{
			clear();
			
			_text = value;
			_convertStr = convert(value);
			_tf.text = _convertStr;
			changeFaceFormat();
			//setTextFormat之后立即执行getCharBoundaries，得不到正确的矩形
			_timer = setTimeout(onTimer,80);
		}
		private function changeFaceFormat():void
		{
			var len:int = _faces.length;
			if(len > 0)
			{
				var vo:FaceVO;
				var rect:Rectangle;
				var face:Face;
				for (var i:int = 0; i < len; i++) 
				{
					vo = _faces[i];
					_tf.setTextFormat(_faceFormat,vo.index,vo.index+1);
				}
			}
		}
		private function onTimer():void
		{
			if(_timer > -1)
			{
				clearTimeout(_timer);
				_timer = -1;
			}
			addFace();
		}
		/**
		 * setTextFormat之后立即执行getCharBoundaries，得不到正确的矩形
		 */		
		private function addFace():void
		{
			var len:int = _faces.length;
			if(len > 0)
			{
				var vo:FaceVO;
				var rect:Rectangle;
				var face:Face;
				for (var i:int = 0; i < len; i++) 
				{
					vo = _faces[i];
					rect = _tf.getCharBoundaries(vo.index);
					face = new Face(FACE_SIZE);
					face.x = rect.x + (rect.width-face.width)*0.5;
					face.y = rect.y + rect.height - face.height - 2;
					_box.addChild(face);
				}
			}
		}
		private function convert(value:String):String
		{
			if(value==null || value.length==0)
			{
				return "";
			}
			var startIndex:int;
			var faceStr:String;
			var faceId:int;
			var faceIdStr:String;
			while(true)
			{
				startIndex = value.indexOf(PREFIX,startIndex);
				if(startIndex!= -1)
				{
					if(startIndex + _faceLen <= value.length)
					{
						faceStr = value.substr(startIndex,_faceLen);
						faceIdStr = value.substr(startIndex+1,_faceLen-1);
						faceId = int(faceIdStr);
						if(faceId > 0 && faceId <= FACE_COUNT)
						{
							//匹配成功
							var vo:FaceVO = new FaceVO();
							vo.faceID = faceId;
							vo.index = startIndex;
							_faces.push(vo);
							
							value = value.replace(faceStr,EMPTY);
							startIndex = startIndex + _emptyLen;
						}
						else
						{
							startIndex++;
						}
					}
					else
					{
						trace("匹配完了: "+startIndex+","+value.length);
						break;
					}
				}
				else
				{
					trace("匹配完了");
					break;
				}
			}
			return value;
		}
	}
}

import flash.display.Sprite;

class FaceVO
{
	public var faceID:int;
	public var index:int;
}
class Face extends Sprite
{
	public function Face(size:int):void
	{
		graphics.beginFill(0xff0000,0.6);
		graphics.drawRect(0,0,size,size);
		graphics.endFill();
	}
}