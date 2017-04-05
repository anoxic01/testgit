module lobby.view.bet {
	export class BetSelectPanel extends BSprite{
		
		public static  RIGHT:number=1;
		public static  LEFT:number=2;
		public xLeft:number	=130		//原来的视图上组件的x坐标
		public xRight:number	=1733		//原来的视图上组件的x坐标
		public xLeft2:number	= -200	//隐藏时组件的x坐标
		public xRight2:number	= 2000	//隐藏时组件的x坐标
		public yLeft:number	= 400	//
		public yRight:number	= 400	//
		/**显示已确认下注金额**/		
		protected confirmBetView:egret.Bitmap;					//玩家下注金額
		/**显示待确认下注金额**/		
		protected needconfirmBetView:egret.Bitmap;					//投注未提交金额
		/**已确认下注金额**/		
		protected confirmBetNum:number= 0;
		/**待确认下注金额**/		
		protected needConfirmBetNum:number= 0;
		/**展开时的位置**/		
		protected unfoldPoint:egret.Point;
		/**收起时的位置**/		
		protected rollUpPoint:egret.Point;
		protected view;
		/**当前显示的方向**/		
		protected direct:number= -1;
		protected prevDirect:number= -1;
		/**取消按钮**/
		private cancelBtn:BetSelectButton;
		private confirmBtn:BetSelectButton;
		/**
		 *設置下注狀態更改囘調  onBetChange(state:String);
		 */		
		public onBetChange:Function = null;
		private isHiding: boolean = false;
		private playEffectTimeOutID:number= 0;
		/**
		 *是否需要先收缩到边上再从另一边显示 
		 */		
		private isNeedReceiveSide: boolean = false;
		private mParent;
		private tweenDuration:number = 0.28;
		/**
		 * 是否显示并且展开面板
		 */
		private isShowNeedUnfold: boolean = true;
		/**
		 * 当前动画完成后是否强制收起
		 */		
		private isForcerollUp: boolean = false;
		
		
		public constructor(p) {
			super();
			this.view = this.createPanel();
			this.view.cacheAsBitmap=true;
			this.mParent = p;
			this.unfoldPoint = new egret.Point(this.view.content.x,this.view.content.y);
			this.rollUpPoint = new egret.Point(this.unfoldPoint.x,-100);
			this.initView();
		}
		
		protected createPanel():any
		{
			return manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_PANEL,"Bet_Select_Asset");
		}
		private initView():void
		{
			this.confirmBtn = new BetSelectButton(this.view.content.sureBtn, this.onConfirmClick);
			this.cancelBtn = new BetSelectButton(this.view.content.this.cancelBtn, this.onCancelClick);
			this.cancelBtn.clickEffectComplete =  this.onPlayCancelEffectComplete;
			this.confirmBtn.clickEffectComplete =  this.onPlayConfirmEffectComplete;
			this.confirmBetView = new egret.Bitmap();
			this.needconfirmBetView = new egret.Bitmap();
			this.view.mc_1.addChild(this.confirmBetView);
			this.view.content.mc_2.addChild(this.needconfirmBetView);
			this.view.content.mask = this.view.contentMask;
			this.tweenContent(0.2,null,this.rollUpPoint,null,null,false);
			this.onChangeLanguage();
		}
		
		protected onPlayConfirmEffectComplete():void
		{
			//this.confirmBtn.clickable = true;
		}
		
		protected onPlayCancelEffectComplete():void
		{
			//this.cancelBtn.clickable = true;
		}
		
		protected onConfirmClick(evt:MouseEvent):void
		{
			/*this.confirmBtn.clickable = false;*/
			manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
			this.excuteBetChange("SURE_BET");
		}
		protected onCancelClick(evt:MouseEvent):void
		{
			this.cancelBtn.clickable = false;
			this.playCancelEffect();
			this.resetNeedConfirmBet();
			manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
			this.excuteBetChange("CANCEL_BET");
		}
		/**播放确定特效**/
		public playConfirmEffect():void
		{
			////// 
			this.confirmBtn.clickable = false;
			this.clearPlayEffectTimeOut();
			this.playEffectTimeOutID = setTimeout(this.rollUp,500);
//			console.log(this,"------------>playConfirmEffect: "+getTimer());
		}
		/**
		 * 播放取消特效
		 */		
		public playCancelEffect():void
		{
			this.clearPlayEffectTimeOut();
			this.playEffectTimeOutID = setTimeout(this.rollUp,500);
//			console.log(this,"------------>playCancelEffect: "+getTimer());
		}
		private clearPlayEffectTimeOut():void
		{
			if(this.playEffectTimeOutID!=0)
			{
				clearTimeout(this.playEffectTimeOutID);
				this.playEffectTimeOutID = 0;
			}
		}
		/**
		 * 是否正在播放特效
		 */		
		public isPlayingEffect(): boolean
		{
			return this.playEffectTimeOutID!=0;
		}
		
		public show(direct:number,isNeedUnfold: boolean=true):void
		{
			if(!view)return;
			this.isHiding = false;
			this.isShowNeedUnfold = isNeedUnfold;
			this.clearPlayEffectTimeOut();
			let endPoint:egret.Point;
			let startPoint:egret.Point;
			let fromAlpha:number = 1;
			if(this.isShow())
			{
				if(this.isShowNeedUnfold)
				{
					if(!this.isUnfold())this.unfold();
					else this.cancelBtn.clickable = true;
				}
				if(this.direct!=direct)// 需要先收缩
				{
					this.isNeedReceiveSide = true;
					this.hide();// 收缩位置
					this.prevDirect = this.direct;
					this.direct = direct;
					return;
				}
				else 
				{
					this.isNeedReceiveSide = false;
					if(this.direct==BetSelectPanel.RIGHT)endPoint = new egret.Point(this.xRight,this.yRight);
					else endPoint = new egret.Point(this.xLeft,this.yLeft);
				}
			}else
			{
				fromAlpha = 0;
				if(this.view.parent==null)this.mParent.addChild(view);
				if(direct==BetSelectPanel.RIGHT)
				{
					startPoint = new egret.Point(this.xRight2,this.yRight);
					endPoint = new egret.Point(this.xRight,this.yRight);
				}else
				{
					startPoint = new egret.Point(this.xLeft2,this.yLeft);
					endPoint = new egret.Point(this.xLeft,this.yLeft);
				}
			}
			this.prevDirect = this.direct;
			this.direct = direct;
			this.tweenView(this.tweenDuration,startPoint,endPoint,this.onShowTransformComplete,null,true,fromAlpha);
		}
		public hide():void
		{
			if(!view)return;
			if(this.isNeedReceiveSide)
			{
			 let startPoint:egret.Point;
			 let endPoint:egret.Point;
				if(this.direct==BetSelectPanel.RIGHT)
				{
					startPoint = new egret.Point(this.xRight,this.yRight);
					endPoint = new egret.Point(this.xRight2,this.yRight);
				}else
				{
					startPoint = new egret.Point(this.xLeft,this.yLeft);
					endPoint = new egret.Point(this.xLeft2,this.yLeft);
				}
				this.tweenView(this.tweenDuration,startPoint,endPoint,this.onHideEffectComplete,null,true,1,0);
			}else
			{
				if(this.isShow())
				{
					this.isHiding = true;
					this.isForcerollUp = false;
					if(this.isUnfold())this.rollUp();
					else this.onrollUpComplete();
				}
			}
		}
		/**展开**/
		public unfold(isTween: boolean=true):void
		{
			if(!view)return;
			if(this.isForcerollUp)return;/// 处于强制收起状态中展开无效
			this.clearPlayEffectTimeOut();
			this.tweenContent(0.2,null,this.unfoldPoint,this.onUnfoldComplete,null,isTween);
//			console.log(this,"------------>unfold: 展开中。。。");
		}
		/**收起**/
		public rollUp(isTween: boolean=true):void
		{
			if(!view)return;
			this.clearPlayEffectTimeOut();
			if(this.getNeedConfirmBetNum()>0)
			{
				this.cancelBtn.clickable = true;
				this.confirmBtn.clickable = true;
//				console.log(this,"------------>this.rollUp: needConfirmBetNum="+needConfirmBetNum);
				return;
			}
			if(this.view.content.x==this.rollUpPoint.x&&this.view.content.y==this.rollUpPoint.y)
			{
//				console.log(this,"------------>this.rollUp: 已收起");
				return;///// 已经处于关闭状态
			}
//			console.log(this,"------------>this.rollUp: 收起中。。。");
			this.isShowNeedUnfold = false;
			this.cancelBtn.clickable = false;
			this.confirmBtn.clickable = false;
			this.tweenContent(0.2,null,this.rollUpPoint, this.onrollUpComplete, egret.Ease.backIn,isTween);
		}
		public forcerollUp(isTween: boolean=true):void
		{
			if(this.getNeedConfirmBetNum()>0)
				this.resetNeedConfirmBet();
			if(this.view.content.x==this.rollUpPoint.x&&this.view.content.y==this.rollUpPoint.y)return;///// 已经处于关闭状态
			this.isForcerollUp = true;
			this.rollUp(isTween);
		}
		
		private onUnfoldComplete():void
		{
			if(!this.view)return;
			this.cancelBtn.clickable = true;
			this.confirmBtn.clickable = true;
			this.view.content.x=this.unfoldPoint.x;
			this.view.content.y=this.unfoldPoint.y;
		}
		private onrollUpComplete():void
		{
			if(!view)return;
			if(this.isHiding)
			{
				this.view.content.x=this.rollUpPoint.x;
				this.view.content.y=this.rollUpPoint.y;
				this.isHiding = false; 
				let endPoint:egret.Point ;
				if(this.direct==BetSelectPanel.RIGHT)endPoint = new egret.Point(this.xRight2,this.yRight);
				else endPoint = new egret.Point(this.xLeft2,this.yLeft);
				this.tweenView(this.tweenDuration,null,endPoint,this.onHideEffectComplete, egret.Ease.backIn);
				this.isForcerollUp = false;
			}else
			{
				if(this.getNeedConfirmBetNum()>0)this.unfold();
			}
		}
		/**
		 * 
		 */		
		public resetNeedConfirmBet():void
		{
			this.updateTmpBetGold(0);
		}
		private onShowTransformComplete():void
		{
			if(!this.view)return;
			if(this.isForcerollUp)//// 强制收起
			{
				this.rollUp(false);
				this.cancelBtn.clickable = false;
				this.confirmBtn.clickable = false;
				this.isForcerollUp = false;
			}else
			{
				if(this.isShowNeedUnfold)
				{
					if(!this.isUnfold())
					{
						this.unfold();
					}else
					{
						this.cancelBtn.clickable = true;
						this.confirmBtn.clickable = true;
					}
				}else
				{
					this.rollUp(false);
					this.cancelBtn.clickable = false;
					this.confirmBtn.clickable = false;
				}
			}
		}
		private onHideEffectComplete():void
		{
			if(!view)return;
			if(this.view.parent)this.view.parent.removeChild(view);
			this.isHiding = false;
			if(this.isNeedReceiveSide)
			{
				this.isNeedReceiveSide = false;
			 	let tempDirect:number= this.direct;
				this.direct = -1;
				this.show(tempDirect,this.isShowNeedUnfold);
			}else
			{
				this.direct = -1;
				this.isForcerollUp = false;
			}
		}
		
		public setViewX(_x:number):void{
			var tw = egret.Tween.get( this.view );
       		tw.to( {x:_x}, this.tweenDuration );
		}
		
		private tweenView(durtion:number,startPoint:egret.Point,endPoint:egret.Point,onComplete:Function,ease=null,isTween: boolean=true,fromAlpha:number = 1,toAlpha:number = 1):void
		{
			if(!this.view)return;
			let t = this.view;
			if(startPoint)
			{
				t.x = startPoint.x;
				t.y = startPoint.y;
			}
			if(isTween)
			{
				t.alpha = fromAlpha;
				if(ease){
					egret.Tween.get( t ).to( {x:endPoint.x, y:endPoint.y, alpha:toAlpha}, durtion , ease ).call(onComplete);
				}else{
					egret.Tween.get( t ).to( {x:endPoint.x, y:endPoint.y, alpha:toAlpha}, durtion ).call(onComplete);
				}
				
			}else
			{
				t.x = endPoint.x;
				t.y = endPoint.y;
				if(onComplete!=null){}
			}
		}
		private tweenContent(durtion:number,startPoint:egret.Point,endPoint:egret.Point,onComplete:Function,ease=null,isTween: boolean=true):void
		{
		 	let t = this.view.content;
			if(startPoint)
			{
				t.x = startPoint.x;
				t.y = startPoint.y;
			}
			if(isTween)
			{
			 	let args = {x:endPoint.x,y:endPoint.y,onComplete:onComplete};
				if(ease){
					egret.Tween.get(t).to( {x:endPoint.x, y:endPoint.y}, durtion, ease).call(onComplete);
				}else{
					egret.Tween.get(t).to( {x:endPoint.x, y:endPoint.y}, durtion).call(onComplete);
				}
			}else
			{
				t.x = endPoint.x;
				t.y = endPoint.y;
			}
		}
		/**
		 * 切換下注狀態
		 */		
		private excuteBetChange(state:String):void
		{
			if(this.onBetChange!=null)
				this.onBetChange(state);
		}
		/**
		 * 更新总下注金额
		 */		
		public updateTotalBetGold( gold:number):void 
		{
			this.confirmBetNum=gold;
			this.confirmBetView.bitmapData	= manager.BitmapManager.getInstance().numberBetedGCoin.conversion( gold );
		}
		/**
		 * 更新临时下注金额
		 */		
		public updateTmpBetGold(gold:number):void
		{
			this.needConfirmBetNum=gold;
//			console.log(this,"------------>updateTmpBetGold= "+needConfirmBetNum);
			this.needconfirmBetView.bitmapData = manager.BitmapManager.getInstance().numberBetGCoin.conversionSign(gold);
			this.needconfirmBetView.smoothing = true;
			this.needconfirmBetView.x = -this.needconfirmBetView.width/2;
		}
		/**
		 * 變更語系
		 * @param	lang
		 */
		 public onChangeLanguage():void
		{
		 	let lang:number = manager.LobbyManager.getInstance().lobbyAuth.Lang;
			this.view.mc.gotoAndStop(lang+1);
			this.confirmBtn.onChangeLanguage(lang);
			this.cancelBtn.onChangeLanguage(lang);
		}
		
		/**得到临时下注的筹码数**/
		public getNeedConfirmBetNum():number{return this.needConfirmBetNum;}
		/**当前的方向**/		
		public getCurrentDirect():number{return this.direct;}
		/**上一个方向**/		
		public getPrevDirect():number{return this.prevDirect;}
		/**当前是否已经展开**/		
		public isUnfold(): boolean{return this.view.content.x ==this.unfoldPoint.x&&this.view.content.y ==this.unfoldPoint.y ;}
		/**是否是显示状态 **/		
		public isShow(): boolean{return view&&this.view.parent&&this.view.visible;}
		 public destroy():void
		{
			super.destroy();
			this.clearPlayEffectTimeOut();
			if(this.confirmBetView)
			{
				this.confirmBetView.bitmapData = null;
				if(this.confirmBetView.parent)this.confirmBetView.parent.removeChild(this.confirmBetView);
				this.confirmBetView=null;
			}
			if(this.needconfirmBetView)
			{
				this.needconfirmBetView.bitmapData = null;
				if(this.needconfirmBetView.parent)this.needconfirmBetView.parent.removeChild(this.needconfirmBetView);
				this.needconfirmBetView=null;
			}
			if(this.confirmBtn){
				this.confirmBtn.destroy();
				this.confirmBtn=null;
			}
			if(this.cancelBtn){
				this.cancelBtn.destroy();
				this.cancelBtn=null;
			}
			if(this.view.parent)this.view.parent.removeChild(this.view);
			this.view = null;
		}
	}
}