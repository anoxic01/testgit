module manager {
	export class GameSceneTransformer {
		private topArea = new Array<egret.DisplayObject>();
		private buttomArea = new Array<egret.DisplayObject>();
		private leftArea = new Array<egret.DisplayObject>();
		private rightArea = new Array<egret.DisplayObject>();
		/**
		 *需要移动到的位置 
		 */		
		private endTransformerPositionDict = {};
		/**
		 *当前移动到的位置 
		 */		
		private currentTransformerPositionDict = {};
		/**
		 *开始的位置 
		 */		
		private startTransformerPositionDict = {};
		/**
		 *所有需要移动的对象物体 
		 */		
		private needTransformViews = new Array<egret.DisplayObject>();
		
		private defaultTransformPositionDict = {};
		
		/**  手动设置的移动距离  **/
		private leftDistance = null;
		private rightDistance = null;
		private topDistance = null;
		private buttomDistance = null;
		
		private starting: boolean = false;
		/**
		 * 用于控制移动速度的向量，值越小移动速度越快
		 */		
		public effectDuration:number = 0.75;
		/**使用TweenList时使用**/
		public ease = egret.Ease.backInOut;
		/**
		 * 播放完成时调用
		 */		
		public onPlayComplete:Function;
		/**
		 * 飞入（出）转场
		 */		
		private isFlyIn: boolean = false;
		
		private width:number;
		private height:number;
		private enterFrameTarget = new egret.Sprite();
		/**
		 *需要重新计算位置数据 
		 */		
		private isNeedCalculateLeftPoints: boolean = false;
		private isNeedCalculateRightPoints: boolean = false;
		private isNeedCalculateTopPoints: boolean = false;
		private isNeedCalculateButtomPoints: boolean = false;
		
		public constructor(screenWidth:number,screenHeight:number,flyIn: boolean=true) {
			this.width = screenWidth;
			this.height = screenHeight;
			this.isFlyIn = flyIn;
		}

		/**
		 *设置移动距离 
		 * @param left
		 * @param right
		 * @param top
		 * @param buttom
		 * @return 
		 */		
		public setTransformDistance(left:Object,right:Object,top:Object,buttom:Object):GameSceneTransformer
		{
			if(left)
			{
				this.leftDistance = left;
				this.isNeedCalculateLeftPoints = true;
			}
			if(right)
			{
				this.rightDistance = right;
				this.isNeedCalculateRightPoints = true;
			}
			if(top)
			{
				this.topDistance = top;
				this.isNeedCalculateTopPoints = true;
			}
			if(buttom)
			{
				this.buttomDistance = buttom;
				this.isNeedCalculateButtomPoints = true;
			}
			return this;
		}
		/**
		 * 启动
		 */		
		public start():void
		{
			if(this.isRunning())return;
			this.starting = true;
			if(this.isNeedCalculateButtomPoints)this.calculateButtomPoints();
			if(this.isNeedCalculateLeftPoints)this.calculateLeftPoints();
			if(this.isNeedCalculateRightPoints)this.calculateRightPoints();
			if(this.isNeedCalculateTopPoints)this.calculateTopPoints();
			this.startTransform();
		}
		/**
		 * 倒回播放
		 */		
		public reverse():void
		{
			if(this.isRunning())this.stop();
			
			this.isFlyIn=!this.isFlyIn;
			var startPoint;
			var endPoint;
			var view;
			this.needTransformViews.length = 0;
			this.addViewsToNeedTransforms(this.topArea);
			this.addViewsToNeedTransforms(this.buttomArea);
			this.addViewsToNeedTransforms(this.leftArea);
			this.addViewsToNeedTransforms(this.rightArea);
			for (var i:number= 0; i < this.needTransformViews.length; i++) 
			{
				view = this.needTransformViews[i];
				startPoint = this.startTransformerPositionDict[view];
				endPoint = this.endTransformerPositionDict[view];
				this.startTransformerPositionDict[view] = endPoint;
				this.endTransformerPositionDict[view] = startPoint;
			}
			this.start();
		}
		private addViewsToNeedTransforms(views):void
		{
			for (var i:number= 0; i < views.length; i++) 
			{
				if(this.needTransformViews.indexOf(views[i])<0)
				{
					this.needTransformViews.push(views[i]);
				}
			}
		}
		/**
		 * 停止
		 */		
		public stop():void
		{
			if(this.isRunning())
			{
				var view;
				var startPoint;
				var endPoint;
				for (var i:number= 0; i < this.needTransformViews.length; i++) 
				{
					view = this.needTransformViews[i];
					startPoint = this.startTransformerPositionDict[view];
					endPoint = this.endTransformerPositionDict[view];
					view.x = endPoint.x;
					view.y = endPoint.y;
					/////// TweenLite
					// TweenLite.killTweensOf(view,true);
				}
				this.needTransformViews.length = 0;
				/*enterFrameTarget.removeEventListener(Event.ENTER_FRAME,onFrame);*/
			}
		}
		/**
		 *销毁 
		 * 
		 */		
		public destroy():void
		{
			// 还原本身位置
			for (var view in this.defaultTransformPositionDict) 
			{
				view.x = this.defaultTransformPositionDict[view].x;
				view.y = this.defaultTransformPositionDict[view].y;
			}
			if(this.isRunning())this.stop();
			this.needTransformViews.length = 0;
			this.topArea.length = 0;
			this.buttomArea.length = 0;
			this.leftArea.length = 0;
			this.rightArea.length = 0;
			this.onPlayComplete = null;
			this.startTransformerPositionDict = null;
			this.endTransformerPositionDict = null;
			this.currentTransformerPositionDict = null;
			this.defaultTransformPositionDict = null;
			this.needTransformViews = null;
			this.enterFrameTarget = null;
		}
		
		/**
		 * 启动移动
		 */		
		private startTransform():void
		{
			var view;
			var startPoint;
			var currentPoint;
			var endPoint;
			for (var i:number= 0; i < this.needTransformViews.length; i++) 
			{
				view = this.needTransformViews[i];
				startPoint = this.startTransformerPositionDict[view];
				currentPoint = this.currentTransformerPositionDict[view];
				currentPoint.setTo(startPoint.x,startPoint.y);
				///////// TweenLite
				endPoint = this.endTransformerPositionDict[view];
				view.x = currentPoint.x;
				view.y = currentPoint.y;
				egret.Tween.get(view).to({x:endPoint.x, y:endPoint.y}, this.effectDuration, this.ease).call(this.onOneViewEffectComplete,view);
			}
			/*enterFrameTarget.removeEventListener(Event.ENTER_FRAME,onFrame);
			enterFrameTarget.addEventListener(Event.ENTER_FRAME,onFrame);*/
		}
		/**
		 * 单个特效完成
		 */		
		private onOneViewEffectComplete(view):void
		{
			if(this.needTransformViews!=null && this.endTransformerPositionDict!=null){
				
			}
			var index:number= this.needTransformViews.indexOf(view);
			if(index>=0){
				this.needTransformViews.splice(index,1);
			}
			var endPoint = this.endTransformerPositionDict[view];
			view.x = endPoint.x;
			view.y = endPoint.y;
			if(this.needTransformViews.length<=0){
				this.onEffectPlayComplete();
			}
		}
		////////////////使用enterFram时使用
		/*private onFrame(e:Event):void
		{
			var view:DisplayObject;
			var currentPoint:egret.Point;
			var endPoint:egret.Point;
			var startPoint:egret.Point;
			if(effectDuration<=0)effectDuration=1;
			for each (view in needTransformViews) 
			{
				currentPoint = currentTransformerPositionDict[view];
				endPoint = endTransformerPositionDict[view];
				startPoint = startTransformerPositionDict[view];
				if(!currentPoint.equals(endPoint))
				{
					var xx:number= currentPoint.x-endPoint.x;
					var yy:number= currentPoint.y-endPoint.y;
					var moveX:number = xx/effectDuration;
					var moveY:number = yy/effectDuration;
					if(moveX==0)currentPoint.x = endPoint.x;
					else currentPoint.x-=moveX;
					if(moveY==0)currentPoint.y =endPoint.y;
					else currentPoint.y-=moveY;
					view.x = currentPoint.x;
					view.y = currentPoint.y;
				}else 
				{
					onOneViewEffectComplete(view);
				}
			}
		}*/
		/**
		 * 计算左边的位置点
		 */		
		private calculateLeftPoints():void
		{
			this.isNeedCalculateLeftPoints = false;
			var leftWidth:number= 0;
			if(this.leftDistance!=null)
			{
				leftWidth = (this.leftDistance);
			}else
			{
				var viewDis:number= 0;
				for (var i:number= 0; i < this.leftArea.length; i++) 
				{
					viewDis = this.getViewGlobePosition(this.leftArea[i]).x+this.leftArea[i].width;
					if(viewDis>leftWidth)
						leftWidth = viewDis;
				}
			}
			for (var j:number= 0; j < this.leftArea.length; j++)
			{
				this.setViewTransformData(this.leftArea[j],new egret.Point(this.leftArea[j].x-leftWidth,this.leftArea[j].y),new egret.Point(this.leftArea[j].x,this.leftArea[j].y));
			}
		}
		/**
		 * 计算右边的位置点
		 */		
		private calculateRightPoints():void
		{
			this.isNeedCalculateRightPoints = false;
			var rightWidth:number= define.Define.MAX_VALUE;
			if(this.rightDistance!=null)
			{
				rightWidth = (this.rightDistance);
			}else
			{
				var viewDis:number= 0;
				for (var i:number= 0; i < this.rightArea.length; i++) 
				{
					viewDis = this.getViewGlobePosition(this.rightArea[i]).x;
					if(viewDis<rightWidth)
						rightWidth = viewDis;
				}
				if(this.rightArea.length>0)rightWidth = this.width-rightWidth;
			}
			for (var j:number= 0; j < this.rightArea.length; j++) 
			{
				this.setViewTransformData(this.rightArea[j],new egret.Point(this.rightArea[j].x+rightWidth,this.rightArea[j].y),new egret.Point(this.rightArea[j].x,this.rightArea[j].y));
			}
		}
		/**
		 * 计算上边的位置点
		 */		
		private calculateTopPoints():void
		{
			this.isNeedCalculateTopPoints = false;
			var topHeight:number= 0;
			if(this.topDistance!=null)
			{
				topHeight = (this.topDistance);
			}else
			{
				var viewDis:number= 0;
				for (var i:number= 0; i < this.topArea.length; i++) 
				{
					viewDis = this.getViewGlobePosition(this.topArea[i]).y+this.topArea[i].height;
					if(viewDis>topHeight)
						topHeight = viewDis;
				}
			}
			for (var j:number= 0; j < this.topArea.length; j++) 
			{
				this.setViewTransformData(this.topArea[j],new egret.Point(this.topArea[j].x,this.topArea[j].y-topHeight),new egret.Point(this.topArea[j].x,this.topArea[j].y));
			}
		}
		/**
		 * 计算底部位置点
		 */		
		private calculateButtomPoints():void
		{
			this.isNeedCalculateButtomPoints = false;
			var buttomHeight:number= define.Define.MAX_VALUE;
			if(this.buttomDistance!=null)
			{
				buttomHeight = (this.buttomDistance);
			}else
			{
				var viewDis:number= 0;
				for (var i:number= 0; i < this.buttomArea.length; i++) 
				{
					viewDis = this.getViewGlobePosition(this.buttomArea[i]).y;
					if(viewDis<buttomHeight)
						buttomHeight = viewDis;
				}
				if(this.buttomArea.length>0)buttomHeight = this.height-buttomHeight;
			}
			for (var j:number= 0; j < this.buttomArea.length; j++) 
			{
				this.setViewTransformData(this.buttomArea[j],new egret.Point(this.buttomArea[j].x,this.buttomArea[j].y+buttomHeight),new egret.Point(this.buttomArea[j].x,this.buttomArea[j].y));
			}
		}
		/**
		 * 将指定视图的本地坐标转换成全局坐标，方便计算距离位置点
		 */		
		private getViewGlobePosition(view):egret.Point
		{
			if(view.root!=null)
			{
				var rect = view.getBounds(view.root);
				return new egret.Point(rect.x,rect.y);
			}else
			{
				return view.localToGlobal(new egret.Point());
			}
		}
		/**
		 * 根据移动方向设置相应的位置点
		 * @param view
		 * @param p1
		 * @param p2
		 */		
		private setViewTransformData(view,p1:egret.Point,p2:egret.Point):void
		{
			this.startTransformerPositionDict[view] = this.isFlyIn?p1:p2;
			this.endTransformerPositionDict[view] = this.isFlyIn?p2:p1;
			this.currentTransformerPositionDict[view] = new egret.Point();
			if(this.needTransformViews.indexOf(view)<0)
			{
				this.needTransformViews.push(view);
			}
		}
		private addAreaObjects(objects,area):GameSceneTransformer
		{
			area.length = 0;
			for (var i:number= 0; i < objects.length; i++) 
			{
				if(objects[i] instanceof egret.DisplayObject)
				{
					area.push(objects[i]);
					// 缓存displayObject
//					(objects[i] as DisplayObject).cacheAsBitmap = true;
					this.defaultTransformPositionDict[objects[i]] = new egret.Point(objects[i].x,objects[i].y);
				}
			}
			return this;
		}
		/**
		 * 播放完成
		 */		
		private onEffectPlayComplete():void
		{
			this.starting = false;
			/*enterFrameTarget.removeEventListener(Event.ENTER_FRAME,onFrame);*/
			if(this.onPlayComplete!=null)
			{
				this.onPlayComplete.apply();
			}
		}
		/**
		 * 是否正在运行
		 */		
		public isRunning(): boolean{return this.starting;}
		/**
		 * 添加上部的移动视图
		 */		
		public addTopAreaObject(objects):GameSceneTransformer
		{
			this.addAreaObjects(objects,this.topArea);
			this.isNeedCalculateTopPoints = true;
			return this;
		}
		/**
		 * 添加底部的移动视图
		 */		
		public addButtomAreaObject(objects):GameSceneTransformer
		{
			this.addAreaObjects(objects,this.buttomArea);
			this.isNeedCalculateButtomPoints = true;
			return this;
		}
		/**
		 * 添加左边的移动视图
		 */		
		public addLeftAreaObject(objects):GameSceneTransformer
		{
			this.addAreaObjects(objects,this.leftArea);
			this.isNeedCalculateLeftPoints = true;
			return this;
		}
		/**
		 * 添加右边的移动视图
		 */		
		public addRightAreaObject(objects):GameSceneTransformer
		{
			this.addAreaObjects(objects,this.rightArea);
			this.isNeedCalculateRightPoints = true;
			return this;
		}
	}
}