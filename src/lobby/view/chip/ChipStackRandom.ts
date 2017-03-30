module lobby.view.chip {
	export class ChipStackRandom extends ChipStack{
		public constructor() {
			
			this.shadowFilter = new DropShadowFilter();
			this.shadowFilter.angle = 125;
			this.shadowFilter.blurX = 4;
			this.shadowFilter.blurY = 4;
			this.shadowFilter.alpha = 0.8;
			this.shadowFilter.strength = 0.8;
			this.shadowFilter.distance = 4;
			this.shadowFilter.color=0x000000;
			
			
			this.mouseEnabled=this.mouseChildren=false;
			_startPoint= new Point(0,-80);
			chipBox = new Sprite;
		//	chipBox.x=CHIP_X;
			CHIP_Y=0;
			chipBox.y= CHIP_Y;
			addChild(chipBox);
			chipBox2 = new Sprite;
//			chipBox2.x = CHIP_X;
//			chipBox2.y = CHIP_Y;
//			addChild(chipBox2);
			bSelf=true;
			//	bTween = true;
			//addChild(txtMc);
			
			chipBox.filters=[shadowFilter]
			bRandom=true;
		//	txtMc.y=-60;
		}
		
		 set  bSelf(value: boolean)
		{
			m_bSelf = value;
//			if (value){
//				txtMc.txt.textColor=color1;
//				txtMc.back.gotoAndStop(1);
//				txtMc.mc_0.gotoAndStop(1);
//				setTextVisible(true);
//			}else{
//				setTextVisible(false);
//			}
		}
		
		 set  count(value:Number)
		{
			if (_count==value) return;
			var oldCount:number= _count;
			_count = value;
			var clip:DisplayObject ;
			var list:any[] ;
			var j:number=0;
			var chipNum:number;
			if (value==0){
				removeChips();
				return;
			}
			if (bTween){
				var addNumber:Number=value-oldCount;
				if (value==0){
					
				}else if (value>0){
					list= creatChipList(addNumber);
					addChips(list);
				}else if (value<0){
					removeChips();
					 chipNum = list.length
					for (j=0;j < chipNum;j++){
						clip = this.getChipsClip(list[j]);
						setChip(clip);
						this.chipBox.addChild(clip);
					}
				}
				
			}else{
				list= creatChipList(value);
				chipNum = list.length
				for (j=0;j < chipNum;j++){
					clip = this.getChipsClip(list[j]);
					setChip(clip);
					this.chipBox.addChild(clip);
				}
			}
			//			
			//			

		}
		
		 protected getChipsClip(value:number):DisplayObject{
			var chip:Bitmap = new Bitmap(BitmapManager.getInstance().getBmpdGameChip(value),"auto",true);
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
			var addClip:DisplayObject;
			
			var chipNum:number = list.length
			for (var j:number=0;j < chipNum;j++){
				addClip = this.getChipsClip(list[j]);
				setChip(addClip);
				addClip.alpha = 0;
				var Y:Number =addClip.y;
				addClip.y -=100;
				TweenLite.to(addClip, 0.3, {
					delay:0.1 + (j * 0.1),
					alpha:1, y:Y,ease:Bounce.easeOut
					
				});
				//onComplete:addComplete,	onCompleteParams:[addClip]
				this.chipBox.addChild(addClip);
			}
		}
		
		
		
		public moveIn():void{
		//		console.log("聚拢筹码")
			for (var i:number= 0; i < chipBox.numChildren; i++) 
			{
				var chip:DisplayObject = chipBox.getChildAt(i);
				TweenLite.to(chip, 0.4, {
					delay: (i * 0.02),x:0, y:0
				});
			}
			
		}
		
		public moveOut():void{
			
		}
		
		 public setChip(chip:DisplayObject):void{
				chip.x = this.rangeRandom(range.left, range.right-chip.width);
				chip.y = this.rangeRandom(range.y-CHIP_Y, range.y+range.height-CHIP_Y-chip.height);
			
		}
		
		 protected addComplete(clip:DisplayObject):void{
				chipBox.addChild(clip);
		}
		
	}
}