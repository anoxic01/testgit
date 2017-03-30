module lobby.view.bet {
	export class BetSelectPanel extends BSprite{
		
		public static const RIGHT:number=1;
		public static const LEFT:number=2;
		public 	var xLeft:Number	=130		//原来的视图上组件的x坐标
		public 	var xRight:Number	=1733		//原来的视图上组件的x坐标
		public 	var xLeft2:Number	= -200	//隐藏时组件的x坐标
		public 	var xRight2:Number	= 2000	//隐藏时组件的x坐标
		public 	var yLeft:Number	= 400	//
		public 	var yRight:Number	= 400	//
		/**显示已确认下注金额**/		
		protected	var confirmBetView:Bitmap;					//玩家下注金額
		/**显示待确认下注金额**/		
		protected	var needConfirmBetView:Bitmap;					//投注未提交金额
		/**已确认下注金额**/		
		protected confirmBetNum:number= 0;
		/**待确认下注金额**/		
		protected needConfirmBetNum:number= 0;
		/**展开时的位置**/		
		protected unfoldPoint:Ponumber;
		/**收起时的位置**/		
		protected rollUpPoint:Ponumber;
		protected view:MovieClip;
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
		private mParent:Sprite;
		private tweenDuration:Number = 0.28;
		/**
		 * 是否显示并且展开面板
		 */
		private isShowNeedUnfold: boolean = true;
		/**
		 * 当前动画完成后是否强制收起
		 */		
		private isForceRollup: boolean = false;
		
		
		public constructor(p:Sprite) {
			this.view = createPanel();
			this.view.cacheAsBitmap=true;
			mParent = p;
			unfoldPoint = new Point(view.content.x,view.content.y);
			rollUpPoint = new Point(unfoldPoint.x,-100);
			initView();
		}
		
		protected createPanel():MovieClip
		{
			return ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_PANEL,"Bet_Select_Asset");
		}
		private initView():void
		{
			confirmBtn = new BetSelectButton(view.content.sureBtn,onConfirmClick);
			cancelBtn = new BetSelectButton(view.content.cancelBtn,onCancelClick);
			cancelBtn.clickEffectComplete = onPlayCancelEffectComplete;
			confirmBtn.clickEffectComplete = onPlayConfirmEffectComplete;
			confirmBetView = new Bitmap();
			needConfirmBetView = new Bitmap();
			view.mc_1.addChild(confirmBetView);
			view.content.mc_2.addChild(needConfirmBetView);
			view.content.mask = view.contentMask;
			tweenContent(0.2,null,rollUpPoint,null,null,false);
			onChangeLanguage();
		}
		
		protected onPlayConfirmEffectComplete():void
		{
			//confirmBtn.clickable = true;
		}
		
		protected onPlayCancelEffectComplete():void
		{
			//cancelBtn.clickable = true;
		}
		
		protected onConfirmClick(evt:MouseEvent):void
		{
			/*confirmBtn.clickable = false;*/
			SoundManager.getInstance().play(SoundPackage.sClick_Tools);
			excuteBetChange("SURE_BET");
		}
		protected onCancelClick(evt:MouseEvent):void
		{
			cancelBtn.clickable = false;
			playCancelEffect();
			resetNeedConfirmBet();
			SoundManager.getInstance().play(SoundPackage.sClick_Tools);
			excuteBetChange("CANCEL_BET");
		}
		/**播放确定特效**/
		public playConfirmEffect():void
		{
			////// 
			confirmBtn.clickable = false;
			clearPlayEffectTimeOut();
			playEffectTimeOutID = setTimeout(rollUp,500);
//			Log.getInstance().log(this,"------------>playConfirmEffect: "+getTimer());
		}
		/**
		 * 播放取消特效
		 */		
		public playCancelEffect():void
		{
			clearPlayEffectTimeOut();
			playEffectTimeOutID = setTimeout(rollUp,500);
//			Log.getInstance().log(this,"------------>playCancelEffect: "+getTimer());
		}
		private clearPlayEffectTimeOut():void
		{
			if(playEffectTimeOutID!=0)
			{
				clearTimeout(playEffectTimeOutID);
				playEffectTimeOutID = 0;
			}
		}
		/**
		 * 是否正在播放特效
		 */		
		public isPlayingEffect(): boolean
		{
			return playEffectTimeOutID!=0;
		}
		
		public show(direct:number,isNeedUnfold: boolean=true):void
		{
			if(!view)return;
			isHiding = false;
			isShowNeedUnfold = isNeedUnfold;
			clearPlayEffectTimeOut();
			var endPoint:Ponumber;
			var startPoint:Ponumber;
			var fromAlpha:Number = 1;
			if(isShow())
			{
				if(isShowNeedUnfold)
				{
					if(!isUnfold())unfold();
					else cancelBtn.clickable = true;
				}
				if(this.direct!=direct)// 需要先收缩
				{
					isNeedReceiveSide = true;
					hide();// 收缩位置
					this.prevDirect = this.direct;
					this.direct = direct;
					return;
				}
				else 
				{
					isNeedReceiveSide = false;
					if(this.direct==RIGHT)endPoint = new Point(xRight,yRight);
					else endPoint = new Point(xLeft,yLeft);
				}
			}else
			{
				fromAlpha = 0;
				if(view.parent==null)mParent.addChild(view);
				if(direct==RIGHT)
				{
					startPoint = new Point(xRight2,yRight);
					endPoint = new Point(xRight,yRight);
				}else
				{
					startPoint = new Point(xLeft2,yLeft);
					endPoint = new Point(xLeft,yLeft);
				}
			}
			this.prevDirect = this.direct;
			this.direct = direct;
			tweenView(tweenDuration,startPoint,endPoint,onShowTransformComplete,null,true,fromAlpha);
		}
		public hide():void
		{
			if(!view)return;
			if(isNeedReceiveSide)
			{
				var startPoint:Ponumber;
				var endPoint:Ponumber;
				if(this.direct==RIGHT)
				{
					startPoint = new Point(xRight,yRight);
					endPoint = new Point(xRight2,yRight);
				}else
				{
					startPoint = new Point(xLeft,yLeft);
					endPoint = new Point(xLeft2,yLeft);
				}
				tweenView(tweenDuration,startPoint,endPoint,onHideEffectComplete,null,true,1,0);
			}else
			{
				if(isShow())
				{
					isHiding = true;
					isForceRollup = false;
					if(isUnfold())rollUp();
					else onRollUpComplete();
				}
			}
		}
		/**展开**/
		public unfold(isTween: boolean=true):void
		{
			if(!view)return;
			if(isForceRollup)return;/// 处于强制收起状态中展开无效
			clearPlayEffectTimeOut();
			tweenContent(0.2,null,unfoldPoint,onUnfoldComplete,null,isTween);
//			Log.getInstance().log(this,"------------>unfold: 展开中。。。");
		}
		/**收起**/
		public rollUp(isTween: boolean=true):void
		{
			if(!view)return;
			clearPlayEffectTimeOut();
			if(getNeedConfirmBetNum()>0)
			{
				cancelBtn.clickable = true;
				confirmBtn.clickable = true;
//				Log.getInstance().log(this,"------------>rollUp: needConfirmBetNum="+needConfirmBetNum);
				return;
			}
			if(view.content.x==rollUpPoint.x&&view.content.y==rollUpPoint.y)
			{
//				Log.getInstance().log(this,"------------>rollUp: 已收起");
				return;///// 已经处于关闭状态
			}
//			Log.getInstance().log(this,"------------>rollUp: 收起中。。。");
			isShowNeedUnfold = false;
			cancelBtn.clickable = false;
			confirmBtn.clickable = false;
			tweenContent(0.2,null,rollUpPoint,onRollUpComplete,Back.easeIn,isTween);
		}
		public forceRollUp(isTween: boolean=true):void
		{
			if(getNeedConfirmBetNum()>0)
				resetNeedConfirmBet();
			if(view.content.x==rollUpPoint.x&&view.content.y==rollUpPoint.y)return;///// 已经处于关闭状态
			isForceRollup = true;
			rollUp(isTween);
		}
		
		private onUnfoldComplete():void
		{
			if(!view)return;
			cancelBtn.clickable = true;
			confirmBtn.clickable = true;
			view.content.x=unfoldPoint.x;
			view.content.y=unfoldPoint.y;
		}
		private onRollUpComplete():void
		{
			if(!view)return;
			if(isHiding)
			{
				view.content.x=rollUpPoint.x;
				view.content.y=rollUpPoint.y;
				isHiding = false; 
				var endPoint:Point ;
				if(direct==RIGHT)endPoint = new Point(xRight2,yRight);
				else endPoint = new Point(xLeft2,yLeft);
				tweenView(tweenDuration,null,endPoint,onHideEffectComplete,Back.easeIn);
				isForceRollup = false;
			}else
			{
				if(getNeedConfirmBetNum()>0)unfold();
			}
		}
		/**
		 * 
		 */		
		public resetNeedConfirmBet():void
		{
			updateTmpBetGold(0);
		}
		private onShowTransformComplete():void
		{
			if(!view)return;
			if(isForceRollup)//// 强制收起
			{
				rollUp(false);
				cancelBtn.clickable = false;
				confirmBtn.clickable = false;
				isForceRollup = false;
			}else
			{
				if(isShowNeedUnfold)
				{
					if(!isUnfold())
					{
						unfold();
					}else
					{
						cancelBtn.clickable = true;
						confirmBtn.clickable = true;
					}
				}else
				{
					rollUp(false);
					cancelBtn.clickable = false;
					confirmBtn.clickable = false;
				}
			}
		}
		private onHideEffectComplete():void
		{
			if(!view)return;
			if(view.parent)view.parent.removeChild(view);
			isHiding = false;
			if(isNeedReceiveSide)
			{
				isNeedReceiveSide = false;
				var tempDirect:number= direct;
				direct = -1;
				show(tempDirect,isShowNeedUnfold);
			}else
			{
				direct = -1;
				isForceRollup = false;
			}
		}
		
		public setViewX(_x:number):void{
			TweenLite.to(view,tweenDuration,{x:_x});
		}
		
		private tweenView(durtion:Number,startPoint:Point,endPoint:Point,onComplete:Function,ease:Object=null,isTween: boolean=true,fromAlpha:Number = 1,toAlpha:Number = 1):void
		{
			if(!view)return;
			var t:MovieClip = view;
			TweenLite.killTweensOf(t,true);
			if(startPoint)
			{
				t.x = startPoint.x;
				t.y = startPoint.y;
			}
			if(isTween)
			{
				t.alpha = fromAlpha;
				var args:Object = {x:endPoint.x,y:endPoint.y,onComplete:onComplete,alpha:toAlpha};
				if(ease)args.ease = ease;
				TweenLite.to(t,durtion,args);
			}else
			{
				t.x = endPoint.x;
				t.y = endPoint.y;
				if(onComplete!=null){}
			}
		}
		private tweenContent(durtion:Number,startPoint:Point,endPoint:Point,onComplete:Function,ease:Object=null,isTween: boolean=true):void
		{
			var t:DisplayObject = view.content;
			TweenLite.killTweensOf(t,true);
			if(startPoint)
			{
				t.x = startPoint.x;
				t.y = startPoint.y;
			}
			if(isTween)
			{
				var args:Object = {x:endPoint.x,y:endPoint.y,onComplete:onComplete};
				if(ease)args.ease = ease;
				TweenLite.to(t,durtion,args);
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
			if(onBetChange!=null)
				onBetChange(state);
		}
		/**
		 * 更新总下注金额
		 */		
		public updateTotalBetGold( gold:number):void 
		{
			confirmBetNum=gold;
			confirmBetView.bitmapData	= BitmapManager.getInstance().numberBetedGCoin.conversion( gold );
		}
		/**
		 * 更新临时下注金额
		 */		
		public updateTmpBetGold(gold:number):void
		{
			needConfirmBetNum=gold;
//			Log.getInstance().log(this,"------------>updateTmpBetGold= "+needConfirmBetNum);
			needConfirmBetView.bitmapData = BitmapManager.getInstance().numberBetGCoin.conversionSign(gold);
			needConfirmBetView.smoothing = true;
			needConfirmBetView.x = -needConfirmBetView.width/2;
		}
		/**
		 * 變更語系
		 * @param	lang
		 */
		 public onChangeLanguage():void
		{
			var lang:number=LobbyManager.getInstance().lobbyAuth.Lang;
			view.mc.gotoAndStop(lang+1);
			confirmBtn.onChangeLanguage(lang);
			cancelBtn.onChangeLanguage(lang);
		}
		
		/**得到临时下注的筹码数**/
		public getNeedConfirmBetNum():number{return needConfirmBetNum;}
		/**当前的方向**/		
		public getCurrentDirect():number{return direct;}
		/**上一个方向**/		
		public getPrevDirect():number{return prevDirect;}
		/**当前是否已经展开**/		
		public isUnfold(): boolean{return view.content.x ==unfoldPoint.x&&view.content.y ==unfoldPoint.y ;}
		/**是否是显示状态 **/		
		public isShow(): boolean{return view&&view.parent&&view.visible;}
		 public destroy():void
		{
			super.destroy();
			clearPlayEffectTimeOut();
			TweenLite.killTweensOf(view,true);
			TweenLite.killTweensOf(view.content,true);
			if(confirmBetView)
			{
				confirmBetView.bitmapData = null;
				if(confirmBetView.parent)confirmBetView.parent.removeChild(confirmBetView);
				confirmBetView=null;
			}
			if(needConfirmBetView)
			{
				needConfirmBetView.bitmapData = null;
				if(needConfirmBetView.parent)needConfirmBetView.parent.removeChild(needConfirmBetView);
				needConfirmBetView=null;
			}
			if(confirmBtn){
				confirmBtn.destroy();
				confirmBtn=null;
			}
			if(cancelBtn){
				cancelBtn.destroy();
				cancelBtn=null;
			}
			if(view.parent)view.parent.removeChild(view);
			view = null;
		}
	}
}