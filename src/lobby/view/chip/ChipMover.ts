module lobby.view.chip {
	export class ChipMover {
		public var chips				:	Array;
		protected var _count			:	Number;
		protected var CHIP_THICK		:	Number = 8;						//籌碼跟籌碼之間的間距
		protected var CHIP_X			:	Number = -31;
		protected var CHIP_Y			:	Number = -22;
		public var offset				:Point;
		public var container			:	Sprite;					//筹码容器
		public var _startPoint			:	Point;					//待加入筹码初始位置
		private var beginCall			:Function = null;
		private var beginCallArg		:Array = null;
		private var endCall				:Function = null;
		private var endCallArg			:Array = null;
		public var scale				:Number=1;
		public constructor(container:Sprite,stack:Sprite=null,scale:Number=1,offset:Point=null) {
			chips=[];
			this.container=container;
			this.scale=scale;
			this.offset=offset;
			addChips(stack);
		}
		
		public function get count():Number
		{
			return _count;
		}
		
		public function set count(value:Number):void
		{
			if (_count==value) return;
			_count = value;
		}
		
		public function destroy():void {
			this.beginCall=null;
			this.beginCallArg=null;
			this.endCall=null;
			this.endCallArg=null;
			container=null;
			if( chips ){
				while(chips.length>0){
					var chip:DisplayObject=chips.shift();
					if(chip.parent){
						chip.parent.removeChild(chip);
					}
				}
				chips = null;
			}
		}
		
		public function addChips(sp:Sprite):void{
			while(sp.numChildren>0){
				var chip:DisplayObject=sp.getChildAt(0)
				var point:Point;
				if(offset){
					chip.x=offset.x+chip.x;
					chip.y=offset.y+chip.y;
				}else{
					point=sp.localToGlobal(new Point(chip.x,chip.y));
					chip.x=point.x;
					chip.y=point.y;
				}
				
				chip.scaleX=chip.scaleY=scale;
				chips.push(chip);
				this.container.addChild(chip);
			}
		}
		
		/**
		 * 筹码依次移动到全局坐标点
		 * @param gpoint 全局坐标点
		 * @param time
		 * 
		 */
		public function moveTo(gpoint:Point,time:Number=1,delay:Number=0,beginCall:Function=null,beginCallArg:Array=null,endCall:Function=null,endCallArg:Array=null):Number{
			var k:int
			this.beginCall=beginCall;
			this.beginCallArg=beginCallArg;
			this.endCall=endCall;
			this.endCallArg=endCallArg
			var during:Number = 0;
			var chip:DisplayObject;
			var localPoint:Point;
			localPoint = this.container.globalToLocal(gpoint);
			
			localPoint.x+=CHIP_X;
			localPoint.y+=CHIP_Y;
			
			
			k = chips.length;
			while (k > 0) {
				delay = (delay + 0.1);
				chip = chips[k-1];
				if (chip){
					
					TweenLite.to(chip, time, {
						delay:delay ,
						alpha:((k+1)*0.2),
						x:localPoint.x,
						y:localPoint.y,
						ease:Quad.easeOut,
						onComplete:moveCompleteHandler,
						onCompleteParams:[chip]
					});
				}
				
				k--;
			};
			during=time+delay;
			return during;
		}
		
		private function moveCompleteHandler(obj:DisplayObject):void{
			
			if(beginCall != null){
				//第一个筹码移动到位置 触发一次
				this.beginCall.apply(null,this.beginCallArg);
				beginCall=null;
				this.beginCallArg=null;
			}
			
			if(obj){
				if (obj.parent){
					obj.parent.removeChild(obj)
					var index:int=chips.indexOf(obj)
					if(index>-1){
						chips.splice(index,1);
					}
				}
			}
			
			if (chips && chips.length==0){
					destroy();
				
			};
			
		}
		
	}
}