module lobby.view.route {
	export class StatisticsUI extends BSprite {
		public static HORIZONTAL:number= 0;
		public static VERTICAL:number= 1;
		//CA0000  013FCB  3BB101
		public static RED:number = 0xCA0000;
		public static BLUE:number = 0x013FCB;
		public static GREEN:number = 0x3BB101;
		public static BLACK:number = 0x0;
		
		private _circleHGap:number= 3;
		private _circleVGap:number= 10;
		private _circleHeight:number= 30;
		
		private _data:any[];
		private _precents:any[];
		private _colors:any[];
		private _types:any[];
		private _direction:number;
		private _margin;
		private _quadHeight:number;
		
		private _bg;
		private _box;
		private _mWidth:number;
		private _mHeight:number;
		private _contentWidth:number;
		private _contentHeight:number;
		private _iconOffsetX:number;
		private _iconOffsetY:number;
		private _isInited: boolean;
		private _isChange: boolean;
		private _isAll0: boolean;//所有值总和为0
		private _isShowBg: boolean;
		
		private _circles:any[];
		private _quads:any[];
		/**
		 * @param w 背景宽
		 * @param h 背景高（如果==0，自动计算宽高）
		 * @param direction (HORIZONTAL,VERTICAL)
		 * @param margin Rectangle (左，上，右，下)；;
		 * @param showBg 是否显示背景
		 * <br>使用方法：
		 * <pre>
		 * setTypes(["大","小"]);(创建显示内容一types为准)
		 * setColor([0xff0000,0x00ff00]);
		 * draw()
		 * 更新(任意一个方法)：
		 * updateValues();
		 * updateValue();
		 * </pre>
		 */		
		public constructor(w:number,h:number,direction:number,margin=null,showBg: boolean=true,quadHeight:number=40) {
			super();
			this._mWidth = w;
			this._mHeight = h;
			this._direction = direction;
			this._margin = margin ? margin : new egret.Rectangle();
			this._isShowBg = showBg;
			this._quadHeight = quadHeight;
			this._contentWidth = this._mWidth - this._margin.x - this._margin.width;
			this._bg = new egret.Shape();
			this.addChild(this._bg);
			this._box = new egret.Sprite();
			this._box.x = this._margin.x;
			this._box.y = this._margin.y;
			this.addChild(this._box);
			this.touchEnabled=this.touchChildren=false;
			this._circles = [];
			this._quads = [];
			this._data = [];
			this._precents=[];
		}
		get margin():egret.Rectangle
		{
			return this._margin;
		}
		set  margin(value)
		{
			this._margin = value;
			this._contentWidth = this._mWidth - this._margin.x - this._margin.width;
		}
		set  mWidth(value:number)
		{
			this._mWidth = value;
			this._contentWidth = this._mWidth - this._margin.x - this._margin.width;
		}
		public setIconOffset(offsetx:number,offsety:number):void
		{
			this._iconOffsetX = offsetx;
			this._iconOffsetY = offsety;
		}
		public setIconHGap(gap:number):void
		{
			this._circleHGap = gap;
		}
		public setIconVGap(gap:number):void
		{
			this._circleVGap = gap;
		}
		set  mHeight(value:number)
		{
			this._mHeight = value;
		}
		get mHeight():number
		{
			return this._mHeight;
		}
		get mWidth():number
		{
			return this._mWidth;
		}
		/**
		 * 设置类型（大小，龙虎和等） 
		 * @param types
		 */		
		public setTypes(types:any[]):void
		{
			this._isChange = true;
			this._types = types;
		}
		/**
		 * 设置颜色
		 * @param colors
		 */		
		public setColor(colors:any[]):void
		{
			this._isChange = true;
			this._colors = colors;
		}
		/**
		 * 更新数据
		 * @param args
		 */		
		public updateValues(...args):void
		{
			if(args==null)
				return;
			var data:any[];
			if(args[0] instanceof Array)
			{
				data = args[0];
			}
			else
			{
				data = args;
			}
			this._data.length = 0;
			this._precents.length=0;
			for (var i:number= 0; i < data.length; i++) 
			{
				this._data[i] = (data[i]);
			}
			var sum:number=0;
			for (i = 0; i < this._data.length; i++) 
			{
				sum += (this._data[i]);
			}
			this._isAll0 = sum == 0;
			for (i = 0; i < this._data.length; i++) 
			{
				if(this._isAll0==false)
				{
					this._precents.push(this._data[i]/sum);
				}
				else
				{
					this._precents.push(1.0/this._types.length);
				}
			}
			var index:number=-1;
			if(this._isAll0==false)
			{
				//最后一个不是0的数字的index
				for (i = this._precents.length - 1; i >=0 ; i--) 
				{
					if(this._precents[i]>0)
					{
						index = i;
						break;
					}
				}
			}
			if(index == -1)
			{
				index = this._precents.length - 1;
			}
			//除了index之外，所有的和
			var exceptIndex:number=0;
			var temp:number;
			var pre:number;
			for (i = 0; i < this._precents.length; i++) 
			{
				if(i != index)
				{
					pre = this._precents[i];
					if(pre!=0)
					{
						temp = Math.round(pre * 100);
						this._precents[i] = temp/100;
						exceptIndex += this._precents[i];
					}
				}
			}
			temp = Math.round((1-exceptIndex) * 100);
			this._precents[index] = temp/100;
			this.changeValues();
		}
		
		/**
		 * 更新某个数据
		 * @param index
		 * @param value
		 */		
		public updateValue(index:number,value:number):void
		{
			if(index>0 && index<this._types.length-1)
			{
				this._data[index] = value;
				this.updateValues(this._data);
			}
		}
		public draw():void
		{
			if(this._isChange==false)
				return;
			this._isChange = false;
			this._isInited = true;
			if(this._box.numChildren>0)
			{
				this._box.removeChildren();
			}
			var circle;
			var quad:Quad;
			var pre:number;
			var lastqx:number=0;
			for (var i:number= 0; i < this._types.length; i++) 
			{
				//圆
				if(i<this._circles.length)
				{
					circle = this._circles[i];
				}
				else
				{
					circle = new Circle();
					this._circles.push(circle);
				}
//				circle.setValue(_data[i]);
				circle.setType(this._types[i]);
				circle.x = this._iconOffsetX + i * (circle.width + this._circleHGap);
				circle.y = this._iconOffsetY;
				this._box.addChild(circle);
				//方块
				if(i<this._quads.length)
				{
					quad = this._quads[i];
				}
				else
				{
					quad = new Quad(this._quadHeight);
					this._quads.push(quad);
				}
				quad.color = this._colors[i];
//				if(i<_precents.length)
//				{
//					pre = _precents[i];
//				}
//				else
//				{
//					pre = 0;
//				}
//				quad.setValue(pre);
//				quad.mWidth = _contentWidth * pre;
				//布局
				if(this._direction==StatisticsUI.HORIZONTAL)
				{
					quad.y = circle.y + this._circleHeight + this._circleVGap;
//					quad.x = lastqx;
//					lastqx += quad.mWidth;
				}
				else if(this._direction==StatisticsUI.VERTICAL)
				{
					quad.x = 0;
					quad.y = circle.y + this._circleHeight + this._circleVGap +i * quad.mHeight;
				}
				else
				{
					throw new Error("StatisticsUI.setLayout 没有设置");
				}
				this._box.addChild(quad);
			}
			//背景
			this._contentHeight = this._box.height;
			if(this._mHeight==0)
			{
				this._mHeight = this._margin.y + this._margin.height +  this._contentHeight + this._iconOffsetY;
			}
			this._bg.graphics.clear();
			if(this._isShowBg)
			{
				this._bg.graphics.beginFill(0x0,0.7);
				this._bg.graphics.drawRect(0,0,this._mWidth,this._mHeight);
				this._bg.graphics.endFill();
			}
		}
		private changeValues():void
		{
			if(this._isInited==false)
				return;
			var circle;
			var quad:Quad;
			var pre:number;
			var value:number;
			var lastqx:number=0;
			for (var i:number= 0; i < this._types.length; i++) 
			{
				circle = this._circles[i];
				quad = this._quads[i];
				if(i<this._data.length)
				{
					value = this._data[i];
					pre = this._precents[i];
				}
				else
				{
					value = 0;
					pre = 0;
				}
				circle.setValue(value);
				if(this._isAll0)
				{
					quad.setValue(0);
				}
				else
				{
					quad.setValue(pre);
				}
				quad.mWidth = this._contentWidth * pre;
				if(this._direction==StatisticsUI.HORIZONTAL)
				{
					quad.x = lastqx;
					lastqx += quad.mWidth;
				}
			}
		}
		 public onChangeLanguage():void
		{
			var circle:Circle;
			for (var i:number= 0; i < this._circles.length; i++) 
			{
				circle = this._circles[i];
				circle.onChangeLanguage();
			}
		}
		 public destroy():void
		{
			this._data = null;
			this._colors = null;
			this._types = null;
			this._margin = null;
			this._precents = null;
			if(this._circles)
			{
				var circle:Circle;
				for (var i:number= 0; i < this._circles.length; i++) 
				{
					circle = this._circles[i];
					this._box.removeChild(circle);
					this._circles[i] = null;
				}
				this._circles = null;
			}
			if(this._quads)
			{
				var quad:Quad;
				for (i = 0; i < this._quads.length; i++) 
				{
					quad = this._quads[i];
					this._box.removeChild(quad);
					this._quads[i] = null;
				}
				this._quads = null;
			}
			super.destroy();
		}
	}
}


class Circle extends lobby.view.BSprite
{
	private static RADIUS:number= 15;
	
//	private _bg:Shape;
//	private _icon:TextField;
	private _bm;
	private _num;
	
//	private _color:number;
	private _langType:string;
//	private _format:TextFormat;
	// private _format2:TextFormat;
	
	
	public constructor()
	{
		super();
//		_bg = new Shape();
//		_bg.x = _bg.y = RADIUS;
//		this.addChild(_bg);
//		this.color = color;
//		_format = new TextFormat();
//		_format.font = "Arial";
//		_format.size = 20;
//		_format.color = 0xffffff;
//		_icon = new egret.TextField();
//		_icon.defaultTextFormat = _format;
//		_icon.text = "大";
//		_icon.width = 30;
//		_icon.autoSize = TextFieldAutoSize.CENTER;
//		_icon.y = 2;
//		this.addChild(_icon);
		// _format2 = new TextFormat();
		// _format2.font = "Arial";
		// _format2.size = 20;
		// _format2.color = 0xffffff;
		// _format2.bold = true;
		this._num = new egret.TextField();
		// this._num.defaultTextFormat = _format2;
		this._num.width = 60;
		this._num.height = 25;
		this._num.text = 10000+"";
		this._num.x = 30;
		this._num.y = 2;
		this.addChild(this._num);
//		_icon.border = true;
//		_num.border = true;
		this._bm = new egret.Bitmap();
		this.addChild(this._bm);
	}
	 public destroy():void
	{
		// _format2 = null;
		this.removeChild(this._bm);
		this._bm = null;
		this.removeChild(this._num);
		this._num = null;
		super.destroy();
	}
//	get color():number
//	{
//		return _color;
//	}
//	set  color(value:number)
//	{
//		_color = value;
//		_bg.graphics.clear();
//		_bg.graphics.beginFill(_color);
//		_bg.graphics.drawCircle(0,0,RADIUS);
//		_bg.graphics.endFill();
//	}
	public setType(type:string):void
	{
		this._langType = type;
		this.onChangeLanguage();
	}
	public setValue(num:number):void
	{
		this._num.text = num.toString();
	} 
	 public onChangeLanguage():void
	{
		this._bm.bitmapData = manager.BitmapManager.getInstance().getBmpdBead(this._langType);
		this._bm.smoothing = true;
	}
}


class Quad extends lobby.view.BSprite
{
	private _bg;
	private _percentTxt;
	// private _format:TextFormat;
	
	private _color:number;
	private _mWidth:number;
	private _mHeight:number;
	private _percent:number;
	public constructor(height:number=40)
	{
		super();
		this._mWidth = 0;
		this._mHeight = height;
		this._bg = new egret.Shape();
		this.addChild(this._bg);
		// _format = new TextFormat();
		// _format.font = "Arial";
		// _format.size = 18;
		// _format.color = 0xffffff;
		// _format.bold = true;
		this._percentTxt = new egret.TextField();
		// _percentTxt.defaultTextFormat = _format;
		this._percentTxt.text = 100+"%";
		// this._percentTxt.autoSize = TextFieldAutoSize.LEFT;
//		_percentTxt.x = 3;
		this._percentTxt.y = (this._mHeight-this._percentTxt.height)*0.5;
		this.addChild(this._percentTxt);
//		_percentTxt.border = true;
	}
	 public destroy():void
	{
		// _format = null;
		this.removeChild(this._bg);
		this._bg = null;
		this.removeChild(this._percentTxt);
		this._percentTxt = null;
		super.destroy();
	}

	get color():number
	{
		return this._color;
	}
	set  color(value:number)
	{
		this._color = value;
		this.draw();
	}
	set  mWidth(value:number)
	{
		this._mWidth = value;
		this.draw();
		this.showPercent();
	}
	private draw():void
	{
		this._bg.graphics.clear();
		this._bg.graphics.beginFill(this._color);
		this._bg.graphics.drawRect(0,0,this._mWidth,this._mHeight);
		this._bg.graphics.endFill();
	}
	get mWidth():number
	{
		return this._mWidth;
	}
	get mHeight():number
	{
		return this._mHeight;
	}
	public setValue(percent:number):void
	{
		this._percent = percent;
		this._percentTxt.text = Math.round(percent*100)+"%";
		this.showPercent();
	}
	/**
	 * 数值>5% && 宽度够
	 */		
	private showPercent():void
	{
//		_percentTxt.visible = _percent>0.05 && _percentTxt.x+_percentTxt.width <= _mWidth;
		this._percentTxt.visible = this._percent>=0.1;
	}
}