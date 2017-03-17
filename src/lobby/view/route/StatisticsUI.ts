module lobby.view.route {
	export class StatisticsUI extends BSprite {
		public static const HORIZONTAL:int = 0;
		public static const VERTICAL:int = 1;
		//CA0000  013FCB  3BB101
		public static const RED:uint = 0xCA0000;
		public static const BLUE:uint = 0x013FCB;
		public static const GREEN:uint = 0x3BB101;
		public static const BLACK:uint = 0x0;
		
		private var _circleHGap:int = 3;
		private var _circleVGap:int = 10;
		private var _circleHeight:int = 30;
		
		private var _data:Array;
		private var _precents:Array;
		private var _colors:Array;
		private var _types:Array;
		private var _direction:int;
		private var _margin:Rectangle;
		private var _quadHeight:int;
		
		private var _bg:Shape;
		private var _box:Sprite;
		private var _mWidth:int;
		private var _mHeight:int;
		private var _contentWidth:int;
		private var _contentHeight:int;
		private var _iconOffsetX:int;
		private var _iconOffsetY:int;
		private var _isInited:Boolean;
		private var _isChange:Boolean;
		private var _isAll0:Boolean;//所有值总和为0
		private var _isShowBg:Boolean;
		
		private var _circles:Array;
		private var _quads:Array;
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
		public constructor(w:int,h:int,direction:int,margin:Rectangle=null,showBg:Boolean=true,quadHeight:int=40) {
			super();
		_mWidth = w;
			_mHeight = h;
			_direction = direction;
			_margin = margin ? margin : new Rectangle();
			_isShowBg = showBg;
			_quadHeight = quadHeight;
			_contentWidth = _mWidth - _margin.x - _margin.width;
			_bg = new Shape();
			this.addChild(_bg);
			_box = new Sprite();
			_box.x = _margin.x;
			_box.y = _margin.y;
			this.addChild(_box);
			this.mouseEnabled=this.mouseChildren=false;
			_circles = [];
			_quads = [];
			_data = [];
			_precents=[];
		}
		public function get margin():Rectangle
		{
			return _margin;
		}
		public function set margin(value:Rectangle):void
		{
			_margin = value;
			_contentWidth = _mWidth - _margin.x - _margin.width;
		}
		public function set mWidth(value:int):void
		{
			_mWidth = value;
			_contentWidth = _mWidth - _margin.x - _margin.width;
		}
		public function setIconOffset(offsetx:int,offsety:int):void
		{
			_iconOffsetX = offsetx;
			_iconOffsetY = offsety;
		}
		public function setIconHGap(gap:int):void
		{
			_circleHGap = gap;
		}
		public function setIconVGap(gap:int):void
		{
			_circleVGap = gap;
		}
		public function set mHeight(value:int):void
		{
			_mHeight = value;
		}
		public function get mHeight():int
		{
			return _mHeight;
		}
		public function get mWidth():int
		{
			return _mWidth;
		}
		/**
		 * 设置类型（大小，龙虎和等） 
		 * @param types
		 */		
		public function setTypes(types:Array):void
		{
			_isChange = true;
			_types = types;
		}
		/**
		 * 设置颜色
		 * @param colors
		 */		
		public function setColor(colors:Array):void
		{
			_isChange = true;
			_colors = colors;
		}
		/**
		 * 更新数据
		 * @param args
		 */		
		public function updateValues(...args):void
		{
			if(args==null)
				return;
			var data:Array;
			if(args[0] is Array)
			{
				data = args[0];
			}
			else
			{
				data = args;
			}
			_data.length = 0;
			_precents.length=0;
			for (var i:int = 0; i < data.length; i++) 
			{
				_data[i] = int(data[i]);
			}
			var sum:Number=0;
			for (i = 0; i < _data.length; i++) 
			{
				sum += int(_data[i]);
			}
			_isAll0 = sum == 0;
			for (i = 0; i < _data.length; i++) 
			{
				if(_isAll0==false)
				{
					_precents.push(_data[i]/sum);
				}
				else
				{
					_precents.push(1.0/_types.length);
				}
			}
			var index:int=-1;
			if(_isAll0==false)
			{
				//最后一个不是0的数字的index
				for (i = _precents.length - 1; i >=0 ; i--) 
				{
					if(_precents[i]>0)
					{
						index = i;
						break;
					}
				}
			}
			if(index == -1)
			{
				index = _precents.length - 1;
			}
			//除了index之外，所有的和
			var exceptIndex:Number=0;
			var temp:int;
			var pre:Number;
			for (i = 0; i < _precents.length; i++) 
			{
				if(i != index)
				{
					pre = _precents[i];
					if(pre!=0)
					{
						temp = Math.round(pre * 100);
						_precents[i] = temp/100;
						exceptIndex += _precents[i];
					}
				}
			}
			temp = Math.round((1-exceptIndex) * 100);
			_precents[index] = temp/100;
			changeValues();
		}
		
		/**
		 * 更新某个数据
		 * @param index
		 * @param value
		 */		
		public function updateValue(index:int,value:Number):void
		{
			if(index>0 && index<_types.length-1)
			{
				_data[index] = value;
				updateValues(_data);
			}
		}
		public function draw():void
		{
			if(_isChange==false)
				return;
			_isChange = false;
			_isInited = true;
			if(_box.numChildren>0)
			{
				_box.removeChildren();
			}
			var circle:Circle;
			var quad:Quad;
			var pre:Number;
			var lastqx:Number=0;
			for (var i:int = 0; i < _types.length; i++) 
			{
				//圆
				if(i<_circles.length)
				{
					circle = _circles[i];
				}
				else
				{
					circle = new Circle();
					_circles.push(circle);
				}
//				circle.setValue(_data[i]);
				circle.setType(_types[i]);
				circle.x = _iconOffsetX + i * (circle.width + _circleHGap);
				circle.y = _iconOffsetY;
				_box.addChild(circle);
				//方块
				if(i<_quads.length)
				{
					quad = _quads[i];
				}
				else
				{
					quad = new Quad(_quadHeight);
					_quads.push(quad);
				}
				quad.color = _colors[i];
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
				if(_direction==HORIZONTAL)
				{
					quad.y = circle.y + _circleHeight + _circleVGap;
//					quad.x = lastqx;
//					lastqx += quad.mWidth;
				}
				else if(_direction==VERTICAL)
				{
					quad.x = 0;
					quad.y = circle.y + _circleHeight + _circleVGap +i * quad.mHeight;
				}
				else
				{
					throw new Error("StatisticsUI.setLayout 没有设置");
				}
				_box.addChild(quad);
			}
			//背景
			_contentHeight = _box.height;
			if(_mHeight==0)
			{
				_mHeight = _margin.y + _margin.height +  _contentHeight + _iconOffsetY;
			}
			_bg.graphics.clear();
			if(_isShowBg)
			{
				_bg.graphics.beginFill(0x0,0.7);
				_bg.graphics.drawRect(0,0,_mWidth,_mHeight);
				_bg.graphics.endFill();
			}
		}
		private function changeValues():void
		{
			if(_isInited==false)
				return;
			var circle:Circle;
			var quad:Quad;
			var pre:Number;
			var value:int;
			var lastqx:Number=0;
			for (var i:int = 0; i < _types.length; i++) 
			{
				circle = _circles[i];
				quad = _quads[i];
				if(i<_data.length)
				{
					value = _data[i];
					pre = _precents[i];
				}
				else
				{
					value = 0;
					pre = 0;
				}
				circle.setValue(value);
				if(_isAll0)
				{
					quad.setValue(0);
				}
				else
				{
					quad.setValue(pre);
				}
				quad.mWidth = _contentWidth * pre;
				if(_direction==HORIZONTAL)
				{
					quad.x = lastqx;
					lastqx += quad.mWidth;
				}
			}
		}
		override public function onChangeLanguage():void
		{
			var circle:Circle;
			for (var i:int = 0; i < _circles.length; i++) 
			{
				circle = _circles[i];
				circle.onChangeLanguage();
			}
		}
		override public function destroy():void
		{
			_data = null;
			_colors = null;
			_types = null;
			_margin = null;
			_precents = null;
			if(_circles)
			{
				var circle:Circle;
				for (var i:int = 0; i < _circles.length; i++) 
				{
					circle = _circles[i];
					_box.removeChild(circle);
					_circles[i] = null;
				}
				_circles = null;
			}
			if(_quads)
			{
				var quad:Quad;
				for (i = 0; i < _quads.length; i++) 
				{
					quad = _quads[i];
					_box.removeChild(quad);
					_quads[i] = null;
				}
				_quads = null;
			}
			super.destroy();
		}
	}
}


import flash.display.Bitmap;
import flash.display.Shape;
import flash.text.TextField;
import flash.text.TextFieldAutoSize;
import flash.text.TextFormat;

import manager.BitmapManager;

import views.BSprite;

class Circle extends BSprite
{
	private static const RADIUS:int = 15;
	
//	private var _bg:Shape;
//	private var _icon:TextField;
	private var _bm:Bitmap;
	private var _num:TextField;
	
//	private var _color:uint;
	private var _langType:String;
//	private var _format:TextFormat;
	private var _format2:TextFormat;
	
	
	public function Circle()
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
//		_icon = new TextField();
//		_icon.defaultTextFormat = _format;
//		_icon.text = "大";
//		_icon.width = 30;
//		_icon.autoSize = TextFieldAutoSize.CENTER;
//		_icon.y = 2;
//		this.addChild(_icon);
		_format2 = new TextFormat();
		_format2.font = "Arial";
		_format2.size = 20;
		_format2.color = 0xffffff;
		_format2.bold = true;
		_num = new TextField();
		_num.defaultTextFormat = _format2;
		_num.width = 60;
		_num.height = 25;
		_num.text = 10000+"";
		_num.x = 30;
		_num.y = 2;
		this.addChild(_num);
//		_icon.border = true;
//		_num.border = true;
		_bm = new Bitmap();
		this.addChild(_bm);
	}
	override public function destroy():void
	{
		_format2 = null;
		this.removeChild(_bm);
		_bm = null;
		this.removeChild(_num);
		_num = null;
		super.destroy();
	}
//	public function get color():uint
//	{
//		return _color;
//	}
//	public function set color(value:uint):void
//	{
//		_color = value;
//		_bg.graphics.clear();
//		_bg.graphics.beginFill(_color);
//		_bg.graphics.drawCircle(0,0,RADIUS);
//		_bg.graphics.endFill();
//	}
	public function setType(type:String):void
	{
		_langType = type;
		onChangeLanguage();
	}
	public function setValue(num:int):void
	{
		_num.text = num.toString();
	} 
	override public function onChangeLanguage():void
	{
		_bm.bitmapData = BitmapManager.getInstance().getBmpdBead(_langType);
		_bm.smoothing = true;
	}
}


class Quad extends BSprite
{
	private var _bg:Shape;
	private var _percentTxt:TextField;
	private var _format:TextFormat;
	
	private var _color:uint;
	private var _mWidth:Number;
	private var _mHeight:Number;
	private var _percent:Number;
	public function Quad(height:int=40)
	{
		super();
		_mWidth = 0;
		_mHeight = height;
		_bg = new Shape();
		this.addChild(_bg);
		_format = new TextFormat();
		_format.font = "Arial";
		_format.size = 18;
		_format.color = 0xffffff;
		_format.bold = true;
		_percentTxt = new TextField();
		_percentTxt.defaultTextFormat = _format;
		_percentTxt.text = 100+"%";
		_percentTxt.autoSize = TextFieldAutoSize.LEFT;
//		_percentTxt.x = 3;
		_percentTxt.y = (_mHeight-_percentTxt.height)*0.5;
		this.addChild(_percentTxt);
//		_percentTxt.border = true;
	}
	override public function destroy():void
	{
		_format = null;
		this.removeChild(_bg);
		_bg = null;
		this.removeChild(_percentTxt);
		_percentTxt = null;
		super.destroy();
	}

	public function get color():uint
	{
		return _color;
	}
	public function set color(value:uint):void
	{
		_color = value;
		draw();
	}
	public function set mWidth(value:Number):void
	{
		_mWidth = value;
		draw();
		showPercent();
	}
	private function draw():void
	{
		_bg.graphics.clear();
		_bg.graphics.beginFill(_color);
		_bg.graphics.drawRect(0,0,_mWidth,_mHeight);
		_bg.graphics.endFill();
	}
	public function get mWidth():Number
	{
		return _mWidth;
	}
	public function get mHeight():Number
	{
		return _mHeight;
	}
	public function setValue(percent:Number):void
	{
		_percent = percent;
		_percentTxt.text = Math.round(percent*100)+"%";
		showPercent();
	}
	/**
	 * 数值>5% && 宽度够
	 */		
	private function showPercent():void
	{
//		_percentTxt.visible = _percent>0.05 && _percentTxt.x+_percentTxt.width <= _mWidth;
		_percentTxt.visible = _percent>=0.1;
	}
}