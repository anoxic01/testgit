module lobby.view.chip {
	export class ChipMover {
		public chips				:	any[];
		protected _count			:	number;
		protected CHIP_THICK		:	number = 8;						//籌碼跟籌碼之間的間距
		protected CHIP_X			:	number = -31;
		protected CHIP_Y			:	number = -22;
		public offset				;
		public container			;					//筹码容器
		public _startPoint			;					//待加入筹码初始位置
		private beginCall			:Function = null;
		private beginCallArg		:any[] = null;
		private endCall				:Function = null;
		private endCallArg			:any[] = null;
		public scale				:number=1;
		public constructor(container:egret.Sprite,stack:egret.Sprite=null,scale:number=1,offset:egret.Point=null) {
			this.chips=[];
			this.container=container;
			this.scale=scale;
			this.offset=offset;
			this.addChips(stack);
		}
		
		get count():number
		{
			return this._count;
		}
		
		set  count(value:number)
		{
			if (this._count==value) return;
			this._count = value;
		}
		
		public destroy():void {
			this.beginCall=null;
			this.beginCallArg=null;
			this.endCall=null;
			this.endCallArg=null;
			this.container=null;
			if( this.chips ){
				while(this.chips.length>0){
					var chip=this.chips.shift();
					if(chip.parent){
						chip.parent.removeChild(chip);
					}
				}
				this.chips = null;
			}
		}
		
		public addChips(sp:egret.Sprite):void{
			while(sp.numChildren>0){
				var chip=sp.getChildAt(0)
				var point:egret.Point;
				if(this.offset){
					chip.x=this.offset.x+chip.x;
					chip.y=this.offset.y+chip.y;
				}else{
					point=sp.localToGlobal(chip.x,chip.y);
					chip.x=point.x;
					chip.y=point.y;
				}
				
				chip.scaleX=chip.scaleY=this.scale;
				this.chips.push(chip);
				this.container.addChild(chip);
			}
		}
		
		/**
		 * 筹码依次移动到全局坐标点
		 * @param gpoint 全局坐标点
		 * @param time
		 * 
		 */
		public moveTo(gpoint:egret.Point,time:number=1,delay:number=0,beginCall:Function=null,beginCallArg:any[]=null,endCall:Function=null,endCallArg:any[]=null):number{
			var k:number
			this.beginCall=beginCall;
			this.beginCallArg=beginCallArg;
			this.endCall=endCall;
			this.endCallArg=endCallArg
			var during:number = 0;
			var chip;
			var localPoint:egret.Point;
			localPoint = this.container.globalToLocal(gpoint);
			
			localPoint.x+=this.CHIP_X;
			localPoint.y+=this.CHIP_Y;
			
			
			k = this.chips.length;
			while (k > 0) {
				delay = (delay + 0.1);
				chip = this.chips[k-1];
				if (chip){
					
					TweenLite.to(chip, time, {
						delay:delay ,
						alpha:((k+1)*0.2),
						x:localPoint.x,
						y:localPoint.y,
						ease:Quad.easeOut,
						onComplete:this.moveCompleteHandler,
						onCompleteParams:[chip]
					});
				}
				
				k--;
			};
			during=time+delay;
			return during;
		}
		
		private moveCompleteHandler(obj):void{
			
			if(this.beginCall != null){
				//第一个筹码移动到位置 触发一次
				this.beginCall.apply(null,this.beginCallArg);
				this.beginCall=null;
				this.beginCallArg=null;
			}
			
			if(obj){
				if (obj.parent){
					obj.parent.removeChild(obj)
					var index:number=this.chips.indexOf(obj)
					if(index>-1){
						this.chips.splice(index,1);
					}
				}
			}
			
			if (this.chips && this.chips.length==0){
					destroy();
				
			};
			
		}
		
	}
}