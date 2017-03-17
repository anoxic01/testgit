module ui {
	export class LobbyScrollBar extends Scroll_Bar{
		
		private var mWidth:int;
		private var mHeight:int;
		private var currentStatue:String;
		private var isRollOver:Boolean = false;
		private var isDown:Boolean = false;
		
		public constructor(mcButton:MovieClip, $fOnClick:Function) {
			super(mcButton,$fOnClick);
		}
		
		override protected function initBarView():void
		{
			if(mcAsset)
			{
				setWidth(mcAsset.width);
				setHeight(mcAsset.height);
				mcAsset.stop();
				if(mcAsset.parent)mcAsset.parent.removeChild(mcAsset);
				mcAsset = null;
			}
			addEvent();
			if(stage)onAddToStage();
			else addEventListener(Event.ADDED_TO_STAGE,onAddToStage);
		}
		override protected function addEvent():void
		{
			super.addEvent();
		}
		private function onAddToStage(e:Event=null):void
		{
			this.removeEventListener(Event.ADDED_TO_STAGE,onAddToStage);
			this.stage.addEventListener(MouseEvent.MOUSE_UP,up);
		}
		override protected function removeEvent():void
		{
			super.removeEvent();
			///////////////////
			this.removeEventListener(Event.ADDED_TO_STAGE,onAddToStage);
			if(this.stage)this.stage.removeEventListener(MouseEvent.MOUSE_UP,up);
		}
		public override function setWidth(uValue:uint) : void
		{
			mWidth = uValue;
			invalidate();
		}
		public override function setHeight(uValue:uint) : void
		{
			mHeight = uValue;
			invalidate();
		}
		protected override function setCurrent(sFrame:String):void
		{
			invalidate();
		}
		protected function invalidate():void
		{
			onScrollBarStyleChange();
		}
		protected function onScrollBarStyleChange():void
		{
			if(mWidth==0||mHeight==0)return;
			if(m_bEnable==false)
			{
				if(isRollOver==true)
				{
					if(isDown==true)currentStatue = "HDOWN";
					else currentStatue = "HOVER";
				}else 
				{
					currentStatue = "DEFAULT";
				}
			}else 
			{
				currentStatue = "DISABLE";
			}
			
			var colors:Array = [0xFF0000, 0x0000FF];
			var alphas:Array = [1, 1];
			var ratios:Array = [0x00, 0xFF];
			if(currentStatue=="HOVER")
			{
				colors = [0xF9E600, 0xFF9B0A];
				ratios = [0x00, 0xFF];
				alphas = [1, 1];
			}else if(currentStatue=="HDOWN")
			{
				colors = [0x2d2d2d, 0x222222];
				ratios = [0x00, 0xFF];
				alphas = [1, 1];
			}else if(currentStatue=="DISABLE")
			{
				colors = [0x1F1F1F, 0x1F1F1F];
				ratios = [0x00, 0xFF];
				alphas = [1, 1];
			}else if(currentStatue=="DEFAULT")
			{
				colors = [0x545454, 0x272727,0x161616];
				ratios = [0, 125,255];
				alphas = [1, 1,1];
			}
			var spreadMethod:String = SpreadMethod.PAD;
			var fillType:String = GradientType.LINEAR;
			var matr:Matrix = new Matrix();
			matr.createGradientBox(mWidth, mHeight, 0, 0, 0);
			this.graphics.clear();
			this.graphics.beginGradientFill(fillType, colors, alphas, ratios, matr, spreadMethod);
			this.graphics.drawRect(0,0,mWidth,mHeight); 
			this.graphics.endFill();
		}
		override protected function down(event:MouseEvent):void
		{
			isDown = true;
			invalidate();
		}
		override protected function out(event:MouseEvent):void
		{
			isRollOver = false;
			if(fOnOut!=null)fOnOut();
			invalidate();
		}
		override protected function over(event:MouseEvent):void
		{
			isRollOver = true;
			if(fOnOver!=null)fOnOver();
			invalidate();
		}
		override protected function up(event:MouseEvent):void
		{
			isDown = false;
			invalidate();
		}
	}
}