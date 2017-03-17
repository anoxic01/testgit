module lobby.view.chip {
	export class ChipStack extends MovieClip{
		
		public var txtMc				:	MovieClip;
		public var chips				:	Array;
		protected var _count			:	Number;
		protected var CHIP_THICK		:	Number = 8;						//籌碼跟籌碼之間的間距
		protected var CHIP_X			:	Number = -31;
		protected var CHIP_Y			:	Number = -22;
		//private var CHIP_LIST			:Array = [1, 2, 5, 10, 50, 100, 300, 500];
		public var seat					:	int;	//所属座位
		public var m_chipNo				:	int = -1;
		public var betId				:	int = -1;
		public var bFlash				:	Boolean ;
		protected var m_mcFlash			:	MovieClip;
		public var chipBox				:	Sprite;					//筹码容器
		protected var chipBox2			:   Sprite;					//待播动画筹码
		public var bAddText				:	Boolean = true;			//是否加入籌碼面額文字框
		public var _startPoint			:	Point;					//待加入筹码初始位置
		public var bTween				:	Boolean;				//是否播放投注动画
		protected var m_bSelf			:	Boolean;				//是否是自己的筹码(影响文本颜色)
		public var color1				:	uint = 0xFFD66F;		//自己筹码颜色
		public var color2				:	uint = 0xFFFF99;		//他人筹码颜色
		public var color3				:	uint = 0x2A1B11;		//他人筹码文本阴影色
		public var bRandom				:	Boolean;				//是否随机散落
		public var range				:	Rectangle;				//随机散落范围
		protected var shadowFilter		:	DropShadowFilter;		//筹码阴影
		protected static var shadowFilter2		:	DropShadowFilter;		//文本阴影
		protected var m_bmpGold			:	Bitmap;					//金額
		protected var shadow			:	Bitmap;
		/**
		 *没有阴影 文本  纯动画使用  
		 * 1  有文本，阴影，闪烁 在座位上显示用
		 */
		protected var type				:	uint				
		private var beginCall			:Function = null;
		private var beginCallArg		:Array = null;
		private var endCall				:Function = null;
		private var endCallArg			:Array = null;
		
		public constructor(type:uint=1) {
			
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
			if(shadowFilter2==null){
				shadowFilter2 = new DropShadowFilter();
				shadowFilter2.angle = 45;
				shadowFilter2.blurX = 0;
				shadowFilter2.blurY = 0;
				//this.shadowFilter.alpha = 0.85;
				shadowFilter2.strength = 1;
				shadowFilter2.distance = 2;
				shadowFilter2.color=0x2A1B11;
			}
			
			
			this.mouseEnabled=this.mouseChildren=false;
			
			
			
			//txtMc.x= -txtMc.width/2;
			
			shadow = new Bitmap(BitmapManager.getInstance().bmpChipShadow,"auto",true);
			shadow.x=CHIP_X-5;
			shadow.y=CHIP_Y+2;
			shadow.visible=false;
			addChild(shadow);
			
			m_mcFlash = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_CHIP,"Chip_Flash") ;	
			m_mcFlash.y=0;
			stopFlash();
			addChild(m_mcFlash);
			
			
			
			_startPoint= new Point(0,-80);
			chipBox = new Sprite;
			chipBox.x=CHIP_X;
			chipBox.y= CHIP_Y;
			addChild(chipBox);
			chipBox2 = new Sprite;
			chipBox2.x = CHIP_X;
			chipBox2.y = CHIP_Y;
			addChild(chipBox2);
			
		//	bTween = true;
			//addChild(txtMc);
			
		//	chipBox.filters=[shadowFilter]
			txtMc = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_CHIP,"LinkPlayerTxt");
			txtMc.txt.text="0";
			txtMc.visible=false;
			addChild(txtMc);
			
			m_bmpGold			= new Bitmap();
			m_bmpGold.scaleX = m_bmpGold.scaleY= 0.75;
			m_bmpGold.smoothing = true;
			m_bmpGold.y=-30;
			txtMc.addChild(m_bmpGold);	
			bSelf=true;
			
			txtMc.txt.textColor=color2;
			txtMc.txt.filters=[shadowFilter2];
			
		}
		
		public function destroy():void {
			this.beginCall=null;
			this.beginCallArg=null;
			this.endCall=null;
			this.endCallArg=null;
			TweenLite.killDelayedCallsTo(stopFlash);
			removeChips();
			if( m_mcFlash ){
				if( this.contains( m_mcFlash )){
					m_mcFlash.stop();
					removeChild(m_mcFlash);
				}	
				m_mcFlash = null;
			}
			
			if( txtMc ){
				if( this.contains( txtMc )){
					removeChild(txtMc);
				}	
				txtMc = null;
			}
			
			if(m_bmpGold){
				m_bmpGold.parent.removeChild(m_bmpGold);
				m_bmpGold=null;
			}
			
			
			if( chips ){
				chips = null;
			}
			if(shadow){
				removeChild(shadow);
				shadow.bitmapData=null;
				shadow=null;
			}
			
		}
		
		public function drawRect():void{
			if (range){
				this.graphics.beginFill(0x990000,0.1);
				this.graphics.drawRect(range.x,range.y,range.width,range.height)
				this.graphics.endFill();
			}
		}
		
		

		public function get count():Number
		{
			return _count;
		}
		
		public function set count(value:Number):void
		{
			if (_count==value) return;
			var oldCount:int = _count;
			_count = value;
			
			
			if (bTween){
				var userChips:Array = this.creatChipList(oldCount);
				var addChips:Array = this.creatChipList(value);
				this.moveAddChips(userChips, addChips);
			}else{
				removeChips();
				var arr:Array = creatChipList(value);
				var chipNum:uint = arr.length
					chipNum = Math.min(5,chipNum);
				for (var j:int=0;j < chipNum;j++){
					var clip:DisplayObject = this.getChipsClip(arr[j]);
					clip.x = 0;
					clip.y = (-(this.CHIP_THICK) *( this.chipBox.numChildren ));
					this.chipBox.addChild(clip);
				}
				if (value>0  && shadow.visible==false){
					shadow.visible = true;
				}
			}
//			
			
			if(value>0 && bAddText){
				
				txtMc.txt.text = String(value);
				if (bSelf){
					txtMc.y=-this.chipBox.numChildren*CHIP_THICK-9;
					m_bmpGold.bitmapData	= BitmapManager.getInstance().numberBetGCoin.conversion( int(value) );
					m_bmpGold.x= -m_bmpGold.width/2;
					m_bmpGold.smoothing = true;
					
				}else{
					txtMc.y=-this.chipBox.numChildren*CHIP_THICK-6;
					
					m_bmpGold.bitmapData=null;
				}
				txtMc.visible=true;
				
			}else{
				if( bAddText ) {
					txtMc.txt.text="0";
					m_bmpGold.bitmapData=null;
				}
				stopFlash();
			}
			
			if(_count>0){
				
			}else{
				shadow.visible = false;
			}
			
			adjustWidth();
		}
		
		public function get iStackChipHeight():int {
			var stackChipHeight:int =  ((this.CHIP_THICK) *( this.chipBox.numChildren ));
			return stackChipHeight;
		}
		
		public function adjustWidth():void{
			//this.txtMc.back.width = Math.max(60,textField.textWidth+20);
			
			this.txtMc.back.width = Math.max(60,m_bmpGold.width+20);
		}
		
		public function get bSelf():Boolean
		{
			return m_bSelf;
		}
		
		public function set bSelf(value:Boolean):void
		{
			m_bSelf = value;
			if (value){
				//txtMc.txt.textColor=color1;
				txtMc.txt.visible = false;
				txtMc.back.gotoAndStop(1);
				txtMc.mc_0.gotoAndStop(1);
				m_bmpGold.visible=true;
				//txtMc.txt.filters=[];
			}else{
				m_bmpGold.visible=false;
				txtMc.txt.visible = true;
				//txtMc.txt.textColor=color2;
				txtMc.back.gotoAndStop(2);
				txtMc.mc_0.gotoAndStop(2);
				//txtMc.txt.filters=[shadowFilter2];
			}
		}
		
		protected function rangeRandom(min:int, max:int):int{
		//	return 0;
			return ((Math.floor((Math.random() * ((max - min) + 1))) + min));
		}
		
		public function setChip(chip:DisplayObject):void{
				chip.x = 0;
				chip.y = (-(this.CHIP_THICK) * chipBox.numChildren);
			
		}
		
		
		protected function creatChipList(value:Number):Array{
			var num:int;
			var len:int;
			var list:Array = new Array();
			var chipsnum:Number = value;
			for (var i:int = GameDefine.CHIP_LIST.length - 1; i >= 0; i--) 
			{
				num = int((chipsnum / GameDefine.CHIP_LIST[i]));
				for (var j:int = 0; j < num; j++) 
				{
					list.push(GameDefine.CHIP_LIST[i]);
				}
				
				chipsnum = (chipsnum % GameDefine.CHIP_LIST[i]);
			}
			if (chipsnum>0 && chipsnum<10){
				list.push(0);
			}
			return list;
		}
		
		protected function checkTwoArray(list1:Array, list2:Array):Array{
			var num:int;
			var index:int;
			var showList:Array = [];
			var addList:Array = [];
			var list:Array = [];
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
		
		
		
		protected var bReplace:Boolean;
		
		/**
		 * 
		 * @param list1 原有筹码组
		 * @param list2 现在筹码组
		 * 
		 */
		protected function moveAddChips(list1:Array, list2:Array):void{
			var list:Array;
			var showList:Array;
			var addList:Array;
			var j:int;
			var clip:DisplayObject;
			var addClip:DisplayObject;
			
			
//			for (var j:int=0;j < chipNum;j++){
//				//				var clip:DisplayObject = this.getChipsClip(arr[j]);
//				//				clip.x = -clip.width/2;
//				//				clip.y = (-(this.CHIP_THICK) * this.numChildren)-clip.height/2;
//				//				iStackChipHeight = clip.y+clip.height/2;
//				//				this.addChild(clip);
//							}
			
			
			var i:int;
				list = this.checkTwoArray(list1, list2);
				showList = list[0];
				addList = list[1];
			var baseY:Number = 0;
			//var stayNum:uint = showList.length;
			endTweenChips();
				if(showList.length==0 && list1.length>0 && addList.length==1){
					addClip = this.getChipsClip(addList[0]);
					this.chipBox.addChild(addClip);
					if (shadow && shadow.visible==false){
						shadow.visible = true;
					}
					//保留一个筹码替换
				//	bReplace=true;
				//	this.removeChips(1);
					return;
				}else{
					bReplace=false;
				//	this.removeChips(stayNum);
					
				}
				
				for (j=0;j < showList.length;j++){
					
					clip = this.getChipsClip(showList[j]);
					setChip(clip);
					chipBox.addChild(clip);
				}
				var _ease:*;
				for (j=0;j < addList.length;j++){
					if(chipBox.numChildren+chipBox2.numChildren>=5){
						break;
					}
					addClip = this.getChipsClip(addList[j]);
					if (this._startPoint){
						addClip.x = this._startPoint.x;
						addClip.y = this._startPoint.y;
						addClip.alpha = 0;
						var Y:Number =-(this.CHIP_THICK)*(chipBox.numChildren+j)
						if(bReplace){
							Y=0
						}else{
							Y=-(this.CHIP_THICK)*(chipBox.numChildren+j)
						}
						addClip.y +=Y;
//						if(Y==0){
//							_ease=Bounce.easeOut;
//						}else{
//							_ease = Quint.easeOut;
//						}
						_ease=Bounce.easeOut;
						TweenLite.to(addClip, 0.3, {
							delay:0.1 + (j * 0.1),
							alpha:1, y:Y,ease:_ease,
							onComplete:addComplete,	onCompleteParams:[addClip]
						});
						chipBox2.addChild(addClip);
						
					} else {
						setChip(clip);
						chipBox.addChild(addClip);
					};
					
				}
			
		}
		
		
		protected function addComplete(clip:DisplayObject):void{
//			if (bReplace){
//				clip.y=0;
//				chipBox.removeChildAt(0);
//				bReplace=false;
//			}else{
				setChip(clip);
//			}
			if(clip){
				if(clip.name=="clear" && clip.parent){
					clip.parent.removeChild(clip);
				}else{
					chipBox.addChild(clip);
					if(shadow){
						if (shadow.visible==false){
							shadow.visible = true;
						}
					}
				}
			}
			
			if (bSelf){
				txtMc.y=-this.chipBox.numChildren*CHIP_THICK-9;
				
			}else{
				txtMc.y=-this.chipBox.numChildren*CHIP_THICK-6;
			}
			
		}
		
		protected function endTweenChips(stayNum:uint=0):void{
//			while (chipBox2.numChildren > 0) {
//				var readChip:DisplayObject = chipBox2.getChildAt(0);
//				//TweenLite.killTweensOf(readChip, false,{complete:true});
//				TweenLite.killTweensOf(readChip);
//			//	chipBox2.removeChildAt(0);
//			};
			
			while (chipBox.numChildren > stayNum) {
				chipBox.removeChildAt(stayNum);
			};
			
			var stayNum2:uint = stayNum-chipBox.numChildren;
			
			for (var i:int = 0; i < chipBox2.numChildren; i++) 
			{
				var readChip:DisplayObject = chipBox2.getChildAt(i);
				if (i>=stayNum2){
					readChip.name="clear"
										
				}
					
				//TweenLite.killTweensOf(readChip, false,{complete:true});
			}
			
			
			
			setTextVisible(false);
			
			
		}
		
		
		protected function removeChips(deep:int=0):void{
			if(chipBox){
				while (chipBox.numChildren > deep) {
					chipBox.removeChildAt(deep);
				};
			}
			if(chipBox2){
				while (chipBox2.numChildren > 0) {
					var readChip:DisplayObject = chipBox2.getChildAt(0);
					TweenLite.killTweensOf(readChip);
					chipBox2.removeChild(readChip);
				};
			}
			
			setTextVisible(false);
			if(shadow){
				shadow.visible=false;
			}
			
		}
		
		public function setTextVisible(value:Boolean):void{
			if (txtMc){
				txtMc.visible = value;
			}
			
		}
		

		protected function getChipsClip(value:int):DisplayObject{
			var chip:Bitmap = new Bitmap(BitmapManager.getInstance().getBmpdGameChip(value),"auto",true);
			chip.name="chip"+value;
			chip.smoothing = true;
			return chip;
		}
		
		
		public function flash():void{
			TweenLite.killDelayedCallsTo(stopFlash);
			bFlash = true;
			m_mcFlash.visible=true;
			m_mcFlash.play();
			TweenLite.delayedCall(2,stopFlash);
		}
		
		
		public function stopFlash():void{
			bFlash=false;
			if(m_mcFlash){
				m_mcFlash.gotoAndStop(1);
				m_mcFlash.visible=false;
			}
			
			TweenLite.killDelayedCallsTo(stopFlash);
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
			setTextVisible(false);
			if (shadow){
				shadow.visible = false;
			}
			var during:Number = 0;
			var chip:DisplayObject;
			var localPoint:Point;
				localPoint = this.chipBox.globalToLocal(gpoint);
				
				localPoint.x+=CHIP_X;
				localPoint.y+=CHIP_Y;
				
				
				k = (this.chipBox.numChildren - 1);
				while (k >= 0) {
					delay = (delay + 0.1);
					chip = chipBox.getChildAt(k) as DisplayObject;
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
				}
			}
			
			
			if (this.chipBox.numChildren == 0){
				if(type==0){
					if (this.parent){
						this.parent.removeChild(this);
					}
					destroy();
				}else{
					removeChips();
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