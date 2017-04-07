module lobby.view.route {
	export class RichText extends BSprite{
		private static PREFIX:string = "#";//#25
		private static EMPTY:string = "　";
		
		private static FACE_COUNT:number= 99;
		private static FACE_SIZE:number= 30;
		
		private _tf;
		private _box;
		
		private _text:string;
		private _width:number;
		private _convertStr:string;
		
		private _faces:any[];
		
		private _faceIdLen:number;
		private _faceLen:number;
		private _emptyLen:number;
		private _timer:number= -1;

		// private _textFormat:TextFormat;
		// private _faceFormat:TextFormat;
		
		public constructor() {
		
			super();
			this._faceIdLen = (RichText.FACE_COUNT.toString).length;
			this._faceLen = RichText.PREFIX.length + this._faceIdLen;
			this._emptyLen = RichText.EMPTY.length;
			this._faces = [];
			
			// _textFormat = new TextFormat("Arial",16,0xffffff);
			// _textFormat.letterSpacing = 2;
			// _faceFormat = new TextFormat("Arial",FACE_SIZE,0xffffff);
			// _faceFormat.letterSpacing = 12;
			
			this._tf = new egret.TextField();
			// this._tf.defaultTextFormat = _textFormat;
			// this._tf.autoSize = TextFieldAutoSize.LEFT;
			this._tf.wordWrap = true;
			this._tf.multiline = true;
			this._tf.border = true;
			this.addChild(this._tf);
			this._box = new egret.Sprite();
//			_box.touchEnabled=_box.touchChildren=false;
			this.addChild(this._box);
			
			this.touchEnabled=this.touchChildren=false;
		}
		 public destroy():void
		{
			this._faces = null;
			if(this._box.numChildren>0)
			{
				this._box.removeChildren();
			}
			if(this._timer > -1)
			{
				clearTimeout(this._timer);
				this._timer = -1;
			}
		}
		public clear():void
		{
			this._faces.length = 0;
			if(this._box.numChildren>0)
			{
				this._box.removeChildren();
			}
			if(this._timer > -1)
			{
				clearTimeout(this._timer);
				this._timer = -1;
			}
		}
		 set  width(value:number)
		{
			this._width = value;
			this._tf.width = this._width;
		}
		get text():string
		{
			return this._text;
		}
		set  text(value:string)
		{
			this.clear();
			
			this._text = value;
			this._convertStr = this.convert(value);
			this._tf.text = this._convertStr;
			this.changeFaceFormat();
			//setTextFormat之后立即执行getCharBoundaries，得不到正确的矩形
			this._timer = setTimeout(this.onTimer,80);
		}
		private changeFaceFormat():void
		{
			var len:number= this._faces.length;
			if(len > 0)
			{
				var vo:FaceVO;
				var rect;
				var face:Face;
				for (var i:number= 0; i < len; i++) 
				{
					vo = this._faces[i];
					// _tf.setTextFormat(_faceFormat,vo.index,vo.index+1);
				}
			}
		}
		private onTimer():void
		{
			if(this._timer > -1)
			{
				clearTimeout(this._timer);
				this._timer = -1;
			}
			this.addFace();
		}
		/**
		 * setTextFormat之后立即执行getCharBoundaries，得不到正确的矩形
		 */		
		private addFace():void
		{
			var len:number= this._faces.length;
			if(len > 0)
			{
				var vo:FaceVO;
				var rect;
				var face:Face;
				for (var i:number= 0; i < len; i++) 
				{
					vo = this._faces[i];
					rect = this._tf.getCharBoundaries(vo.index);
					face = new Face(RichText.FACE_SIZE);
					face.x = rect.x + (rect.width-face.width)*0.5;
					face.y = rect.y + rect.height - face.height - 2;
					this._box.addChild(face);
				}
			}
		}
		private convert(value:string):string
		{
			if(value==null || value.length==0)
			{
				return "";
			}
			var startIndex:number;
			var faceStr:string;
			var faceId:number;
			var faceIdStr;
			while(true)
			{
				startIndex = value.indexOf(RichText.PREFIX,startIndex);
				if(startIndex!= -1)
				{
					if(startIndex + this._faceLen <= value.length)
					{
						faceStr = value.substr(startIndex,this._faceLen);
						faceIdStr = value.substr(startIndex+1,this._faceLen-1);
						faceId = <number>faceIdStr;
						if(faceId > 0 && faceId <= RichText.FACE_COUNT)
						{
							//匹配成功
							var vo:FaceVO = new FaceVO();
							vo.faceID = faceId;
							vo.index = startIndex;
							this._faces.push(vo);
							
							value = value.replace(faceStr, RichText.EMPTY);
							startIndex = startIndex + this._emptyLen;
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

class FaceVO
{
	public faceID:number;
	public index:number;
}
class Face extends lobby.view.BSprite
{
	public constructor(size:number)
	{
		super();
		this.graphics.beginFill(0xff0000,0.6);
		this.graphics.drawRect(0,0,size,size);
		this.graphics.endFill();
	}
}