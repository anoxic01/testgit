module lobby.view.chip {
	export class ChipStack extends BSprite{
		
		public txtMc				;
		public chips				:	any[];
		protected _count			:	number;
		protected CHIP_THICK		:	number = 8;						//籌碼跟籌碼之間的間距
		protected CHIP_X			:	number = -31;
		protected CHIP_Y			:	number = -22;
		//private CHIP_LIST			:any[] = [1, 2, 5, 10, 50, 100, 300, 500];
		public seat					:	number;	//所属座位
		public m_chipNo				:	number = -1;
		public betId				:	number = -1;
		public bFlash				:	boolean ;
		protected m_mcFlash			;
		public chipBox				;					//筹码容器
		protected chipBox2			;					//待播动画筹码
		public bAddText				:	boolean = true;			//是否加入籌碼面額文字框
		public _startPoint			;					//待加入筹码初始位置
		public bTween				:	boolean;				//是否播放投注动画
		protected m_bSelf			:	boolean;				//是否是自己的筹码(影响文本颜色)
		public color1				:	number = 0xFFD66F;		//自己筹码颜色
		public color2				:	number = 0xFFFF99;		//他人筹码颜色
		public color3				:	number = 0x2A1B11;		//他人筹码文本阴影色
		public bRandom				:	boolean;				//是否随机散落
		public range				;				//随机散落范围
		protected shadowFilter		;		//筹码阴影
		protected static shadowFilter2;		//文本阴影
		protected m_bmpGold			;					//金額
		protected shadow			;
		/**
		 *没有阴影 文本  纯动画使用  
		 * 1  有文本，阴影，闪烁 在座位上显示用
		 */
		protected type				:	number				
		private beginCall			:Function = null;
		private beginCallArg		:any[] = null;
		private endCall				:Function = null;
		private endCallArg			:any[] = null;
		
		public constructor(type:number=1) {
			super();
			this.type=type;
			/*
			 改用图片阴影
			this.shadowFilter = new DropShadowFilter();
			this.shadowFilter.angle = 95;
			this.shadowFilter.blurX = 5;
			this.shadowFilter.blurY = 5;
			this.shadowFilter.alpha = 0.8;
			this.shadowFilter.strength = 0.8;
			this.shadowFilter.distance = 5;
			this.shadowFilter.color=0x000000;*/
			if(ChipStack.shadowFilter2==null){
				ChipStack.shadowFilter2 = new DropShadowFilter();
				ChipStack.shadowFilter2.angle = 45;
				ChipStack.shadowFilter2.blurX = 0;
				ChipStack.shadowFilter2.blurY = 0;
				//this.shadowFilter.alpha = 0.85;
				ChipStack.shadowFilter2.strength = 1;
				ChipStack.shadowFilter2.distance = 2;
				ChipStack.shadowFilter2.color=0x2A1B11;
			}
			
			
			// this.mouseEnabled=this.mouseChildren=false;
			
			
			
			//txtMc.x= -txtMc.width/2;
			
			this.shadow = new egret.Bitmap(manager.BitmapManager.getInstance().bmpChipShadow.bitmapData);
			this.shadow.x=this.CHIP_X-5;
			this.shadow.y=this.CHIP_Y+2;
			this.shadow.visible=false;
			this.addChild(this.shadow);
			
			this.m_mcFlash = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_CHIP,"Chip_Flash") ;	
			this.m_mcFlash.y=0;
			this.stopFlash();
			this.addChild(this.m_mcFlash);
			
			
			
			this._startPoint= new egret.Point(0,-80);
			this.chipBox = new egret.Sprite;
			this.chipBox.x=this.CHIP_X;
			this.chipBox.y= this.CHIP_Y;
			this.addChild(this.chipBox);
			this.chipBox2 = new egret.Sprite;
			this.chipBox2.x = this.CHIP_X;
			this.chipBox2.y = this.CHIP_Y;
			this.addChild(this.chipBox2);
			
		//	bTween = true;
			//addChild(txtMc);
			
		//	chipBox.filters=[shadowFilter]
			this.txtMc = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_CHIP,"LinkPlayerTxt");
			this.txtMc.txt.text="0";
			this.txtMc.visible=false;
			this.addChild(this.txtMc);
			
			this.m_bmpGold			= new egret.Bitmap();
			this.m_bmpGold.scaleX = this.m_bmpGold.scaleY= 0.75;
			this.m_bmpGold.smoothing = true;
			this.m_bmpGold.y=-30;
			this.txtMc.addChild(this.m_bmpGold);	
			this.bSelf=true;
			
			this.txtMc.txt.textColor=this.color2;
			this.txtMc.txt.filters=[ChipStack.shadowFilter2];
			
		}
		
		public destroy():void {
			this.beginCall=null;
			this.beginCallArg=null;
			this.endCall=null;
			this.endCallArg=null;
			TweenLite.killDelayedCallsTo(this.stopFlash);
			this.removeChips();
			if( this.m_mcFlash ){
				if( this.contains( this.m_mcFlash )){
					this.m_mcFlash.stop();
					this.removeChild(this.m_mcFlash);
				}	
				this.m_mcFlash = null;
			}
			
			if( this.txtMc ){
				if( this.contains( this.txtMc )){
					this.removeChild(this.txtMc);
				}	
				this.txtMc = null;
			}
			
			if(this.m_bmpGold){
				this.m_bmpGold.parent.removeChild(this.m_bmpGold);
				this.m_bmpGold=null;
			}
			
			
			if( this.chips ){
				this.chips = null;
			}
			if(this.shadow){
				this.removeChild(this.shadow);
				this.shadow.bitmapData=null;
				this.shadow=null;
			}
			
		}
		
		public drawRect():void{
			if (this.range){
				this.graphics.beginFill(0x990000,0.1);
				this.graphics.drawRect(this.range.x,this.range.y,this.range.width,this.range.height)
				this.graphics.endFill();
			}
		}
		
		

		get count():number
		{
			return this._count;
		}
		
		set  count(value:number)
		{
			if (this._count==value) return;
			var oldCount:number= this._count;
			this._count = value;
			
			
			if (this.bTween){
				var userChips:any[] = this.creatChipList(oldCount);
				var addChips:any[] = this.creatChipList(value);
				this.moveAddChips(userChips, addChips);
			}else{
				this.removeChips();
				var arr:any[] = this.creatChipList(value);
				var chipNum:number = arr.length
					chipNum = Math.min(5,chipNum);
				for (var j:number=0;j < chipNum;j++){
					var clip = this.getChipsClip(arr[j]);
					clip.x = 0;
					clip.y = (-(this.CHIP_THICK) *( this.chipBox.numChildren ));
					this.chipBox.addChild(clip);
				}
				if (value>0  && this.shadow.visible==false){
					this.shadow.visible = true;
				}
			}
//			
			
			if(value>0 && this.bAddText){
				
				this.txtMc.txt.text = String(value);
				if (this.bSelf){
					this.txtMc.y=-this.chipBox.numChildren*this.CHIP_THICK-9;
					this.m_bmpGold.bitmapData	= manager.BitmapManager.getInstance().numberBetGCoin.conversion( <number>(value) );
					this.m_bmpGold.x= -this.m_bmpGold.width/2;
					this.m_bmpGold.smoothing = true;
					
				}else{
					this.txtMc.y=-this.chipBox.numChildren*this.CHIP_THICK-6;
					
					this.m_bmpGold.bitmapData=null;
				}
				this.txtMc.visible=true;
				
			}else{
				if( this.bAddText ) {
					this.txtMc.txt.text="0";
					this.m_bmpGold.bitmapData=null;
				}
				this.stopFlash();
			}
			
			if(this._count>0){
				
			}else{
				this.shadow.visible = false;
			}
			
			this.adjustWidth();
		}
		
		get iStackChipHeight():number{
			var stackChipHeight:number=  ((this.CHIP_THICK) *( this.chipBox.numChildren ));
			return stackChipHeight;
		}
		
		public adjustWidth():void{
			//this.txtMc.back.width = Math.max(60,textField.textWidth+20);
			
			this.txtMc.back.width = Math.max(60,this.m_bmpGold.width+20);
		}
		
		get bSelf(): boolean
		{
			return this.m_bSelf;
		}
		
		set  bSelf(value: boolean)
		{
			this.m_bSelf = value;
			if (value){
				//txtMc.txt.textColor=color1;
				this.txtMc.txt.visible = false;
				this.txtMc.back.gotoAndStop(1);
				this.txtMc.mc_0.gotoAndStop(1);
				this.m_bmpGold.visible=true;
				//txtMc.txt.filters=[];
			}else{
				this.m_bmpGold.visible=false;
				this.txtMc.txt.visible = true;
				//txtMc.txt.textColor=this.color2;
				this.txtMc.back.gotoAndStop(2);
				this.txtMc.mc_0.gotoAndStop(2);
				//txtMc.txt.filters=[ChipStack.shadowFilter2];
			}
		}
		
		protected rangeRandom(min:number, max:number):number{
		//	return 0;
			return ((Math.floor((Math.random() * ((max - min) + 1))) + min));
		}
		
		public setChip(chip):void{
				chip.x = 0;
				chip.y = (-(this.CHIP_THICK) * this.chipBox.numChildren);
			
		}
		
		
		protected creatChipList(value:number):any[]{
			var num:number;
			var len:number;
			var list = [];
			var chipsnum:number = value;
			for (var i:number= define.GameDefine.CHIP_LIST.length - 1; i >= 0; i--) 
			{
				num = <number>((chipsnum / define.GameDefine.CHIP_LIST[i]));
				for (var j:number= 0; j < num; j++) 
				{
					list.push(define.GameDefine.CHIP_LIST[i]);
				}
				
				chipsnum = (chipsnum % define.GameDefine.CHIP_LIST[i]);
			}
			if (chipsnum>0 && chipsnum<10){
				list.push(0);
			}
			return list;
		}
		
		protected checkTwoArray(list1:any[], list2:any[]):any[]{
			var num:number;
			var index:number;
			var showList:any[] = [];
			var addList:any[] = [];
			var list:any[] = [];
			while (list2.length > 0) {
				num = list2.shift();
				index = list1.indexOf(num);
				if (index != -1){
					list.push(num);
					list1.splice(index, 1);
				} else {
					addList.push(num);
				};
			};
			addList.concat(list1);
			showList[0] = list;
			showList[1] = addList;
			return showList;
		}
		
		
		
		protected bReplace: boolean;
		
		/**
		 * 
		 * @param list1 原有筹码组
		 * @param list2 现在筹码组
		 * 
		 */
		protected moveAddChips(list1:any[], list2:any[]):void{
			var list:any[];
			var showList:any[];
			var addList:any[];
			var j:number;
			var clip;
			var addClip;
			
			
//			for (var j:number=0;j < chipNum;j++){
//				//				var clip:DisplayObject = this.getChipsClip(arr[j]);
//				//				clip.x = -clip.width/2;
//				//				clip.y = (-(this.this.CHIP_THICK) * this.numChildren)-clip.height/2;
//				//				iStackChipHeight = clip.y+clip.height/2;
//				//				this.addChild(clip);
//							}
			
			
			var i:number;
				list = this.checkTwoArray(list1, list2);
				showList = list[0];
				addList = list[1];
			var baseY:number = 0;
			//var stayNum:number = showList.length;
			this.endTweenChips();
				if(showList.length==0 && list1.length>0 && addList.length==1){
					addClip = this.getChipsClip(addList[0]);
					this.chipBox.addChild(addClip);
					if (this.shadow && this.shadow.visible==false){
						this.shadow.visible = true;
					}
					//保留一个筹码替换
				//	bReplace=true;
				//	this.removeChips(1);
					return;
				}else{
					this.bReplace=false;
				//	this.removeChips(stayNum);
					
				}
				
				for (j=0;j < showList.length;j++){
					
					clip = this.getChipsClip(showList[j]);
					this.setChip(clip);
					this.chipBox.addChild(clip);
				}
				for (j=0;j < addList.length;j++){
					if(this.chipBox.numChildren+this.chipBox2.numChildren>=5){
						break;
					}
					addClip = this.getChipsClip(addList[j]);
					if (this._startPoint){
						addClip.x = this._startPoint.x;
						addClip.y = this._startPoint.y;
						addClip.alpha = 0;
						var Y:number =-(this.CHIP_THICK)*(this.chipBox.numChildren+j)
						if(this.bReplace){
							Y=0
						}else{
							Y=-(this.CHIP_THICK)*(this.chipBox.numChildren+j)
						}
						addClip.y +=Y;
//						if(Y==0){
//							_ease=Bounce.easeOut;
//						}else{
//							_ease = Qnumber.easeOut;
//						}
						
						egret.Tween.get(addClip).to({y:Y, alpha:1, delay:0.1+(j*0.1)}, define.Define.SPEED, egret.Ease.bounceOut)..call(this.addComplete,addClip);

						this.chipBox2.addChild(addClip);
						
					} else {
						this.setChip(clip);
						this.chipBox.addChild(addClip);
					};
					
				}
			
		}
		
		
		protected addComplete(clip):void{
//			if (bReplace){
//				clip.y=0;
//				chipBox.removeChildAt(0);
//				bReplace=false;
//			}else{
				this.setChip(clip);
//			}
			if(clip){
				if(clip.name=="clear" && clip.parent){
					clip.parent.removeChild(clip);
				}else{
					this.chipBox.addChild(clip);
					if(this.shadow){
						if (this.shadow.visible==false){
							this.shadow.visible = true;
						}
					}
				}
			}
			
			if (this.bSelf){
				this.txtMc.y=-this.chipBox.numChildren*this.CHIP_THICK-9;
				
			}else{
				this.txtMc.y=-this.chipBox.numChildren*this.CHIP_THICK-6;
			}
			
		}
		
		protected endTweenChips(stayNum:number=0):void{
//			while (this.chipBox2.numChildren > 0) {
//				var readChip:DisplayObject = this.chipBox2.getChildAt(0);
//				//TweenLite.killTweensOf(readChip, false,{complete:true});
//				TweenLite.killTweensOf(readChip);
//			//	this.chipBox2.removeChildAt(0);
//			};
			
			while (this.chipBox.numChildren > stayNum) {
				this.chipBox.removeChildAt(stayNum);
			};
			
			var stayNum2:number = stayNum-this.chipBox.numChildren;
			
			for (var i:number= 0; i < this.chipBox2.numChildren; i++) 
			{
				var readChip = this.chipBox2.getChildAt(i);
				if (i>=stayNum2){
					readChip.name="clear"
										
				}
					
				//TweenLite.killTweensOf(readChip, false,{complete:true});
			}
			
			
			
			this.setTextVisible(false);
			
			
		}
		
		
		protected removeChips(deep:number=0):void{
			if(this.chipBox){
				while (this.chipBox.numChildren > deep) {
					this.chipBox.removeChildAt(deep);
				};
			}
			if(this.chipBox2){
				while (this.chipBox2.numChildren > 0) {
					var readChip = this.chipBox2.getChildAt(0);
					TweenLite.killTweensOf(readChip);
					this.chipBox2.removeChild(readChip);
				};
			}
			
			this.setTextVisible(false);
			if(this.shadow){
				this.shadow.visible=false;
			}
			
		}
		
		public setTextVisible(value: boolean):void{
			if (this.txtMc){
				this.txtMc.visible = value;
			}
			
		}
		

		protected getChipsClip(value:number):any{
			var chip = new egret.Bitmap(manager.BitmapManager.getInstance().getBmpdGameChip(value));
			chip.name="chip"+value;
			chip.smoothing = true;
			return chip;
		}
		
		
		public flash():void{
			TweenLite.killDelayedCallsTo(this.stopFlash);
			this.bFlash = true;
			this.m_mcFlash.visible=true;
			this.m_mcFlash.play();
			TweenLite.delayedCall(2,this.stopFlash);
		}
		
		
		public stopFlash():void{
			this.bFlash=false;
			if(this.m_mcFlash){
				this.m_mcFlash.gotoAndStop(1);
				this.m_mcFlash.visible=false;
			}
			
			TweenLite.killDelayedCallsTo(this.stopFlash);
		}
		
		/**
		 * 筹码依次移动到全局坐标点
		 * @param gpoint 全局坐标点
		 * @param time
		 * 
		 */
		public moveTo(gpoint,time:number=1,delay:number=0,beginCall:Function=null,beginCallArg:any[]=null,endCall:Function=null,endCallArg:any[]=null):number{
			var k:number
			this.beginCall=this.beginCall;
			this.beginCallArg=this.beginCallArg;
			this.endCall=endCall;
			this.endCallArg=endCallArg
			this.setTextVisible(false);
			if (this.shadow){
				this.shadow.visible = false;
			}
			var during:number = 0;
			var chip;
			var localPoint;
				localPoint = this.chipBox.globalToLocal(gpoint);
				
				localPoint.x+=this.CHIP_X;
				localPoint.y+=this.CHIP_Y;
				
				
				k = (this.chipBox.numChildren - 1);
				while (k >= 0) {
					delay = (delay + 0.1);
					chip = this.chipBox.getChildAt(k);
					if (chip){
						egret.Tween.get(chip).to({x:localPoint.x, y:localPoint.y, alpha:((k+1)*0.2), delay:delay}, time, egret.Ease.quadOut).call(this.moveCompleteHandler, chip);
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
				}
			}
			
			
			if (this.chipBox.numChildren == 0){
				if(this.type==0){
					if (this.parent){
						this.parent.removeChild(this);
					}
					this.destroy();
				}else{
					this.removeChips();
					if (this.endCall != null){
						this.endCall.apply(null,this.endCallArg);
						this.endCall =null;
						this.endCallArg=null;
					};
				}
				
			};
			
		}
		
	}
}