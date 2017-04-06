module lobby.view.chip {
	export class ChipStackRandom extends ChipStack{
		public constructor() {
			super();

			this.shadowFilter = new DropShadowFilter();
			this.shadowFilter.angle = 125;
			this.shadowFilter.blurX = 4;
			this.shadowFilter.blurY = 4;
			this.shadowFilter.alpha = 0.8;
			this.shadowFilter.strength = 0.8;
			this.shadowFilter.distance = 4;
			this.shadowFilter.color=0x000000;
			
			
			// this.mouseEnabled=this.mouseChildren=false;

			this._startPoint= new egret.Point(0,-80);
			this.chipBox = new egret.Sprite;
		//	this.chipBox.x=CHIP_X;
			this.CHIP_Y=0;
			this.chipBox.y= this.CHIP_Y;
			this.addChild(this.chipBox);
			this.chipBox2 = new egret.Sprite;
//			this.chipBox2.x = CHIP_X;
//			this.chipBox2.y = this.CHIP_Y;
//			addChild(this.chipBox2);
			this.bSelf=true;
			//	bTween = true;
			//addChild(txtMc);
			
			this.chipBox.filters=[this.shadowFilter]
			this.bRandom=true;
		//	txtMc.y=-60;
		}
		
		 set  bSelf(value: boolean)
		{
			this.m_bSelf = value;
//			if (value){
//				txtMc.txt.textColor=color1;
//				txtMc.back.gotoAndStop(1);
//				txtMc.mc_0.gotoAndStop(1);
//				setTextVisible(true);
//			}else{
//				setTextVisible(false);
//			}
		}
		
		 set  count(value:number)
		{
			if (this._count==value) return;
			var oldCount:number= this._count;
			this._count = value;
			var clip ;
			var list:any[] ;
			var j:number=0;
			var chipNum:number;
			if (value==0){
				this.removeChips();
				return;
			}
			if (this.bTween){
				var addNumber:number=value-oldCount;
				if (value==0){
					
				}else if (value>0){
					list= this.creatChipList(addNumber);
					this.addChips(list);
				}else if (value<0){
					this.removeChips();
					 chipNum = list.length
					for (j=0;j < chipNum;j++){
						clip = this.getChipsClip(list[j]);
						this.setChip(clip);
						this.chipBox.addChild(clip);
					}
				}
				
			}else{
				list= this.creatChipList(value);
				chipNum = list.length
				for (j=0;j < chipNum;j++){
					clip = this.getChipsClip(list[j]);
					this.setChip(clip);
					this.chipBox.addChild(clip);
				}
			}
			//			
			//			

		}
		
		 protected getChipsClip(value:number):any{
			var chip = new egret.Bitmap(manager.BitmapManager.getInstance().getBmpdGameChip(value));
			chip.name="chip"+value;
			chip.scaleX=chip.scaleY=0.80;
			chip.smoothing = true;
			return chip;
		}
		
		
		/**
		 * 
		 * @param list1 原有筹码组
		 * @param list2 现在筹码组
		 * 
		 */
		protected addChips(list:any[]):void{
			var addClip;
			
			var chipNum:number = list.length
			for (var j:number=0;j < chipNum;j++){
				addClip = this.getChipsClip(list[j]);
				this.setChip(addClip);
				addClip.alpha = 0;
				var Y:number =addClip.y;
				addClip.y -=100;
				
				egret.Tween.get(addClip).to({y:Y, alpha:1, delay:0.1+(j*0.1)}, define.Define.SPEED, egret.Ease.bounceOut);
				//onComplete:addComplete,	onCompleteParams:[addClip]
				this.chipBox.addChild(addClip);
			}
		}
		
		
		
		public moveIn():void{
		//		console.log("聚拢筹码")
			for (var i:number= 0; i < this.chipBox.numChildren; i++) 
			{
				var chip = this.chipBox.getChildAt(i);
				egret.Tween.get(chip).to({x:0, y:0, delay:(i*0.02)}, 0.4);
			}
			
		}
		
		public moveOut():void{
			
		}
		
		 public setChip(chip):void{
				chip.x = this.rangeRandom(this.range.left, this.range.right-chip.width);
				chip.y = this.rangeRandom(this.range.y-this.CHIP_Y, this.range.y+this.range.height-this.CHIP_Y-chip.height);
			
		}
		
		 protected addComplete(clip):void{
				this.chipBox.addChild(clip);
		}
		
	}
}