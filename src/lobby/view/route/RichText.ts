module lobby.view.route {
	export class RichText extends BSprite{
		private static const PREFIX:String = "#";//#25
		private static const EMPTY:String = "　";
		
		private static const FACE_COUNT:number= 99;
		private static const FACE_SIZE:number= 30;
		
		private _tf:TextField;
		private _box:Sprite;
		
		private _text:String;
		private _width:Number;
		private _convertStr:String;
		
		private _faces:any[];
		
		private _faceIdLen:number;
		private _faceLen:number;
		private _emptyLen:number;
		private _timer:number= -1;

		private _textFormat:TextFormat;
		private _faceFormat:TextFormat;
		
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
		 public destroy():void
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
		public clear():void
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
		 set  width(value:Number)
		{
			_width = value;
			_tf.width = _width;
			super.width = _width;
		}
		get text():String
		{
			return _text;
		}
		set  text(value:String)
		{
			clear();
			
			_text = value;
			_convertStr = convert(value);
			_tf.text = _convertStr;
			changeFaceFormat();
			//setTextFormat之后立即执行getCharBoundaries，得不到正确的矩形
			_timer = setTimeout(onTimer,80);
		}
		private changeFaceFormat():void
		{
			var len:number= _faces.length;
			if(len > 0)
			{
				var vo:FaceVO;
				var rect:Rectangle;
				var face:Face;
				for (var i:number= 0; i < len; i++) 
				{
					vo = _faces[i];
					_tf.setTextFormat(_faceFormat,vo.index,vo.index+1);
				}
			}
		}
		private onTimer():void
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
		private addFace():void
		{
			var len:number= _faces.length;
			if(len > 0)
			{
				var vo:FaceVO;
				var rect:Rectangle;
				var face:Face;
				for (var i:number= 0; i < len; i++) 
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
		private convert(value:String):String
		{
			if(value==null || value.length==0)
			{
				return "";
			}
			var startIndex:number;
			var faceStr:String;
			var faceId:number;
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
						console.log("匹配完了: "+startIndex+","+value.length);
						break;
					}
				}
				else
				{
					console.log("匹配完了");
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
	public faceID:number;
	public index:number;
}
class Face extends Sprite
{
	public Face(size:number):void
	{
		graphics.beginFill(0xff0000,0.6);
		graphics.drawRect(0,0,size,size);
		graphics.endFill();
	}
}