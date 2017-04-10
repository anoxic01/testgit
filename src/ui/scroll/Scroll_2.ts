module ui.scroll {
	export class Scroll_2  extends egret.Sprite{
		private HANDLE_WIDTH		:	number 	= 	5;			//手柄宽度
		private HANDLE_HEIGHT		:	number 	= 	50;			//手柄高度
		private LOG_TOP_SPACE		:	number 	= 	0;			//顶部间隔
		private LOG_RIGHT_SPACE 	:	number	=	10;			//右边边距
		private LOG_BUTTON_SPACE	:	number	=	5;			//底部间隔
		private FPS_LOG_SPACE		:	number	=	0;			//容器间隔
		
		private  m_spContent		;					//内容容器
		private  m_spMask			;					//遮罩容器
		protected  m_spHandle		;					//拖动手柄
		protected  m_btnHandle		;
		protected  m_spLine			;					//滑动轨迹
		protected  m_scale9GridLine	:	egret.Bitmap;		//滑动轨迹
		protected  m_recPath		;				//滑动轨迹
		private  m_txtLog			;				//内容文本
		public   uLogWidth			:	number;					//
		public   uLogHeight			:	number;					//
		private  m_uHandleWheel		:	number;					//滚动距离
		private  m_bHideBackGround	:	boolean;				//是否隱藏背景
		private  m_bEnableWheel		:	boolean;				//激活状态
		
		public constructor(_bDrag:boolean=true, _btnHandle=null, _bmpdLine=null , _bHideBackGround:boolean = false) {
			super();

			this.m_spContent = new egret.Sprite();
			this.addChild(this.m_spContent);
			
			this.m_spMask = new egret.Sprite();
			this.addChild(this.m_spMask);
			
			this.m_spContent.mask = this.m_spMask;
			
			this.m_spLine = new egret.Sprite();
			this.addChild(this.m_spLine);
			if(_bmpdLine){
				this.m_scale9GridLine = new egret.Bitmap();
				this.m_scale9GridLine.texture = _bmpdLine;
				this.m_scale9GridLine.scale9Grid = new egret.Rectangle(0, 5, _bmpdLine.width-10, _bmpdLine.height-35);
				this.m_spLine.addChild(this.m_scale9GridLine);
			}
			
			
			this.m_spHandle = new egret.Sprite();
			this.m_btnHandle = _btnHandle;
			if(_btnHandle){
				this.m_spHandle.addChild(_btnHandle);
				_btnHandle.x = 2;
			}else{
				this.m_spHandle.graphics.beginFill(0x666666);
				this.m_spHandle.graphics.drawRoundRect(0, 0, this.HANDLE_WIDTH, this.HANDLE_HEIGHT, 10, 10);
				this.m_spHandle.graphics.endFill();
			}
			this.addChild(this.m_spHandle);
			
			this.m_spHandle.buttonMode = true;
			
			var this2:egret.Sprite = this;
			this.m_spHandle.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.down, this);
			this.m_spHandle.addEventListener(egret.TouchEvent.TOUCH_END, this.up, this);
			
			
			this.addEventListener(egret.Event.ADDED_TO_STAGE, function (evt:egret.Event) : void
			{
				if(_bDrag){
					this.addEventListener("mouseDown", function (event:MouseEvent) : void
					{
						this.startDrag();
					}, this);
				}
				
				this.stage.addEventListener("mouseLeave", function () : void
				{
					this.removeEventListener("enterFrame", this.moving, this);
					this.m_spHandle.stopDrag();
				});
				this.stage.addEventListener("mouseUp", function (event:MouseEvent) : void
				{
					this.removeEventListener("enterFrame", this.moving, this);
					this.m_spHandle.stopDrag();
					if(_bDrag){
						this.stopDrag();
					}
				});
			}, this);
			
			this.enableWheel = true;
			
			this.m_bHideBackGround = _bHideBackGround;
		}
		public down(evt:egret.TouchEvent):void{
			this.m_spHandle.startDrag(false, this.m_recPath);
			this.addEventListener("enterFrame", this.moving, this);
			evt.stopImmediatePropagation();
		}
		public up(evt:egret.TouchEvent):void{
				this.removeEventListener("enterFrame", this.moving, this);
				this.m_spHandle.stopDrag();
				event.stopImmediatePropagation();
		}
		
		set enableWheel(_bValue:boolean){
			if(this.m_bEnableWheel==_bValue){
				return;
			}else{
				this.m_bEnableWheel = _bValue;
			}
			// if(this.m_bEnableWheel){
			// 	this.addEventListener(mouse.MouseEvent.MOUSE_WHEEL, this.onMouseWheelHandler, this);
			// }else{
			// 	this.removeEventListener(MouseEvent.MOUSE_WHEEL, this.onMouseWheelHandler, this);
			// }
		}
		get enableWheel():boolean{
			return this.m_bEnableWheel;
		}
		
		public add( _item):void{
			this.m_spContent.addChild( _item );
			
			this.resizeHandler();
			this.resizeRec();
		}
		protected moving(event:Event) : void
		{
			this.m_spContent.y =  (-1*(this.m_spContent.height - this.m_spMask.height) * (this.m_spHandle.y - this.m_recPath.y) / this.m_recPath.height);
			
		}
		public resize(_uWidth, _uHeight) : void{
			this.uLogWidth = _uWidth;
			this.uLogHeight = _uHeight;
			
			this.resizeHandler();
			this.resizeRec();
			this.m_recPath.y = this.LOG_TOP_SPACE;
			this.m_spHandle.x = this.m_recPath.x;
			this.m_spHandle.y = this.LOG_TOP_SPACE;
			this.m_spMask.graphics.clear();
			this.m_spMask.graphics.beginFill(0);
			this.m_spMask.graphics.drawRect(0, 0, this.uLogWidth - this.LOG_RIGHT_SPACE, this.uLogHeight - this.FPS_LOG_SPACE - this.LOG_TOP_SPACE - this.LOG_BUTTON_SPACE);
			this.m_spMask.graphics.endFill();
			
			var alpha:Number = 0.5;
			if( this.m_bHideBackGround ){
				alpha = 0;
			}
			
			this.graphics.clear();
			this.graphics.beginFill(0, this.alpha);
			this.graphics.drawRect(0, 0, this.uLogWidth, _uHeight);
			this.graphics.endFill();
			
			this.m_spLine.x = this.m_recPath.x + this.HANDLE_WIDTH*0.5;
			this.m_spLine.y = this.m_recPath.y;
			if(this.m_scale9GridLine){
				this.m_scale9GridLine.height = this.m_recPath.height + this.m_spHandle.height;
			}else{
				this.m_spLine.graphics.clear();
				this.m_spLine.graphics.lineStyle(1);
				this.m_spLine.graphics.lineTo(0,this.m_recPath.height + this.m_spHandle.height);
			}
			this.m_spHandle.visible = this.m_spContent.height > (this.uLogHeight - this.FPS_LOG_SPACE);
			this.m_spLine.visible = this.m_spHandle.visible;
			
			this.moving(null);
		}
		
		public visibleBar(_bValue:boolean):void{
			this.m_spHandle.visible = _bValue;
			this.m_spLine.visible = _bValue;
		}
		
		/** 截图 **/
		public snapshot():egret.BitmapData{
			this.m_spContent.mask = null;
			
			var rect  = new egret.Rectangle(0,Math.abs(this.m_spContent.y), this.uLogWidth, this.uLogHeight+Math.abs(this.m_spContent.y));
			var bmpd : egret.RenderTexture  = new egret.RenderTexture();//(this.m_spContent,this.uLogWidth, this.uLogHeight+Math.abs(this.m_spContent.y), true, 0);
			bmpd.drawToTexture(this.m_spContent,rect, 1);
			
			this.m_spContent.mask = this.m_spMask;
			return bmpd.bitmapData;
		}
		
		public spContent():egret.Sprite{
			return this.m_spContent;
		}
		
		public initStatus():void{
			if(this.m_spHandle){
				this.m_spHandle.y = 0;
			}
			if(this.m_spContent){
				this.m_spContent.y = (-1*(this.m_spContent.height - this.m_spMask.height) * (this.m_spHandle.y - this.m_recPath.y) / this.m_recPath.height);
			}
		}
		
		protected onMouseWheelHandler(evt:egret.Event):void
		{
			// TODO Auto-generated method stub
//			trace("鼠标滚动-",evt.delta);
			// if(this.m_spHandle.visible){
			// 	if(evt.delta<0){
			// 		this.m_spHandle.y += this.m_uHandleWheel;
			// 		if(this.m_spHandle.y>(this.m_recPath.y+this.m_recPath.height)){
			// 			this.m_spHandle.y = this.m_recPath.y+this.m_recPath.height;
			// 		}
			// 		egret.Tween.get(this.m_spContent).to({y:(-1*(this.m_spContent.height - this.m_spMask.height) * (this.m_spHandle.y - this.m_recPath.y) / this.m_recPath.height)}, 0.75);
			// 	}else if(evt.delta>0){
			// 		this.m_spHandle.y -= this.m_uHandleWheel;
			// 		if(this.m_spHandle.y < this.LOG_TOP_SPACE){
			// 			this.m_spHandle.y = this.LOG_TOP_SPACE;
			// 		}
			// 		egret.Tween.get(this.m_spContent).to({y:(-1*(this.m_spContent.height - this.m_spMask.height) * (this.m_spHandle.y - this.m_recPath.y) / this.m_recPath.height)}, 0.75);
			// 	}
			// }
//			evt.stopPropagation();
		}
		
		private resizeHandler():void{
			if(this.m_btnHandle){
				this.m_btnHandle.setHeight(this.m_spLine.height*this.uLogHeight/this.m_spContent.height);
				if(this.m_btnHandle.height>this.uLogHeight){
					this.m_btnHandle.setHeight(this.uLogHeight);
				}
				if(this.m_btnHandle.height<50){
					this.m_btnHandle.setHeight(50);
				}
			}
			
			this.m_spHandle.visible = this.m_spContent.height > (this.uLogHeight - this.FPS_LOG_SPACE);
			this.m_spLine.visible = this.m_spHandle.visible;
		}
		
		private resizeRec():void{
			var _recHeight  = this.uLogHeight - this.FPS_LOG_SPACE - this.LOG_TOP_SPACE - this.m_spHandle.height;
			this.m_uHandleWheel = (_recHeight - this.LOG_BUTTON_SPACE)*0.2;
			
			this.m_recPath = new egret.Rectangle(0, 0, 0, _recHeight - this.LOG_BUTTON_SPACE);
			if(this.m_scale9GridLine){
				this.m_recPath.x = (this.uLogWidth - this.LOG_RIGHT_SPACE - this.m_scale9GridLine.width*0.5);
			}else{
				this.m_recPath.x = this.uLogWidth - this.LOG_RIGHT_SPACE;
			}
		}
	}
}