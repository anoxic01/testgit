module manager {
	export class GameSceneTransformer {
		private var topArea:Vector.<DisplayObject> = new Vector.<DisplayObject>;
		private var buttomArea:Vector.<DisplayObject> = new Vector.<DisplayObject>;
		private var leftArea:Vector.<DisplayObject> = new Vector.<DisplayObject>;
		private var rightArea:Vector.<DisplayObject> = new Vector.<DisplayObject>;
		/**
		 *需要移动到的位置 
		 */		
		private var endTransformerPositionDict:Dictionary = new Dictionary();
		/**
		 *当前移动到的位置 
		 */		
		private var currentTransformerPositionDict:Dictionary = new Dictionary();
		/**
		 *开始的位置 
		 */		
		private var startTransformerPositionDict:Dictionary = new Dictionary();
		/**
		 *所有需要移动的对象物体 
		 */		
		private var needTransformViews:Vector.<DisplayObject> = new Vector.<DisplayObject>();
		
		private var defaultTransformPositionDict:Dictionary = new Dictionary();
		
		/**  手动设置的移动距离  **/
		private var leftDistance:Object = null;
		private var rightDistance:Object = null;
		private var topDistance:Object = null;
		private var buttomDistance:Object = null;
		
		private var starting:Boolean = false;
		/**
		 * 用于控制移动速度的向量，值越小移动速度越快
		 */		
		public var effectDuration:Number = 0.75;
		/**使用TweenList时使用**/
		public var ease:* = Back.easeInOut;
		/**
		 * 播放完成时调用
		 */		
		public var onPlayComplete:Function;
		/**
		 * 飞入（出）转场
		 */		
		private var isFlyIn:Boolean = false;
		
		private var width:int;
		private var height:int;
		private var enterFrameTarget:Sprite = new Sprite();
		/**
		 *需要重新计算位置数据 
		 */		
		private var isNeedCalculateLeftPoints:Boolean = false;
		private var isNeedCalculateRightPoints:Boolean = false;
		private var isNeedCalculateTopPoints:Boolean = false;
		private var isNeedCalculateButtomPoints:Boolean = false;
		
		public constructor(screenWidth:int,screenHeight:int,flyIn:Boolean=true) {
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
		public function setTransformDistance(left:Object,right:Object,top:Object,buttom:Object):GameSceneTransformer
		{
			if(left)
			{
				this.leftDistance = left;
				isNeedCalculateLeftPoints = true;
			}
			if(right)
			{
				this.rightDistance = right;
				isNeedCalculateRightPoints = true;
			}
			if(top)
			{
				this.topDistance = top;
				isNeedCalculateTopPoints = true;
			}
			if(buttom)
			{
				this.buttomDistance = buttom;
				isNeedCalculateButtomPoints = true;
			}
			return this;
		}
		/**
		 * 启动
		 */		
		public function start():void
		{
			if(isRunning())return;
			starting = true;
			if(isNeedCalculateButtomPoints)calculateButtomPoints();
			if(isNeedCalculateLeftPoints)calculateLeftPoints();
			if(isNeedCalculateRightPoints)calculateRightPoints();
			if(isNeedCalculateTopPoints)calculateTopPoints();
			startTransform();
		}
		/**
		 * 倒回播放
		 */		
		public function reverse():void
		{
			if(isRunning())stop();
			
			isFlyIn=!isFlyIn;
			var startPoint:Point;
			var endPoint:Point;
			var view:DisplayObject;
			needTransformViews.length = 0;
			addViewsToNeedTransforms(topArea);
			addViewsToNeedTransforms(buttomArea);
			addViewsToNeedTransforms(leftArea);
			addViewsToNeedTransforms(rightArea);
			for (var i:int = 0; i < needTransformViews.length; i++) 
			{
				view = needTransformViews[i];
				startPoint = startTransformerPositionDict[view];
				endPoint = endTransformerPositionDict[view];
				startTransformerPositionDict[view] = endPoint;
				endTransformerPositionDict[view] = startPoint;
			}
			start();
		}
		private function addViewsToNeedTransforms(views:Vector.<DisplayObject>):void
		{
			for (var i:int = 0; i < views.length; i++) 
			{
				if(needTransformViews.indexOf(views[i])<0)
				{
					needTransformViews.push(views[i]);
				}
			}
		}
		/**
		 * 停止
		 */		
		public function stop():void
		{
			if(isRunning())
			{
				var view:DisplayObject;
				var startPoint:Point;
				var endPoint:Point;
				for (var i:int = 0; i < needTransformViews.length; i++) 
				{
					view = needTransformViews[i];
					startPoint = startTransformerPositionDict[view];
					endPoint = endTransformerPositionDict[view];
					view.x = endPoint.x;
					view.y = endPoint.y;
					/////// TweenLite
					TweenLite.killTweensOf(view,true);
				}
				needTransformViews.length = 0;
				/*enterFrameTarget.removeEventListener(Event.ENTER_FRAME,onFrame);*/
			}
		}
		/**
		 *销毁 
		 * 
		 */		
		public function destroy():void
		{
			// 还原本身位置
			for (var view:DisplayObject in defaultTransformPositionDict) 
			{
				view.x = defaultTransformPositionDict[view].x;
				view.y = defaultTransformPositionDict[view].y;
			}
			if(isRunning())stop();
			needTransformViews.length = 0;
			topArea.length = 0;
			buttomArea.length = 0;
			leftArea.length = 0;
			rightArea.length = 0;
			onPlayComplete = null;
			startTransformerPositionDict = null;
			endTransformerPositionDict = null;
			currentTransformerPositionDict = null;
			defaultTransformPositionDict = null;
			needTransformViews = null;
			enterFrameTarget = null;
		}
		
		/**
		 * 启动移动
		 */		
		private function startTransform():void
		{
			var view:DisplayObject;
			var startPoint:Point;
			var currentPoint:Point;
			var endPoint:Point;
			for (var i:int = 0; i < needTransformViews.length; i++) 
			{
				view = needTransformViews[i];
				startPoint = startTransformerPositionDict[view];
				currentPoint = currentTransformerPositionDict[view];
				currentPoint.setTo(startPoint.x,startPoint.y);
				///////// TweenLite
				endPoint = endTransformerPositionDict[view];
				view.x = currentPoint.x;
				view.y = currentPoint.y;
				TweenLite.killTweensOf(view,true);
				TweenLite.to(view,effectDuration,{x:endPoint.x,y:endPoint.y,onComplete:onOneViewEffectComplete,onCompleteParams:[view],ease:ease});
			}
			/*enterFrameTarget.removeEventListener(Event.ENTER_FRAME,onFrame);
			enterFrameTarget.addEventListener(Event.ENTER_FRAME,onFrame);*/
		}
		/**
		 * 单个特效完成
		 */		
		private function onOneViewEffectComplete(view:DisplayObject):void
		{
			if(needTransformViews!=null && endTransformerPositionDict!=null){
				
			}
			var index:int = needTransformViews.indexOf(view);
			if(index>=0){
				needTransformViews.splice(index,1);
			}
			var endPoint:Point = endTransformerPositionDict[view];
			view.x = endPoint.x;
			view.y = endPoint.y;
			if(needTransformViews.length<=0){
				onEffectPlayComplete();
			}
		}
		////////////////使用enterFram时使用
		/*private function onFrame(e:Event):void
		{
			var view:DisplayObject;
			var currentPoint:Point;
			var endPoint:Point;
			var startPoint:Point;
			if(effectDuration<=0)effectDuration=1;
			for each (view in needTransformViews) 
			{
				currentPoint = currentTransformerPositionDict[view];
				endPoint = endTransformerPositionDict[view];
				startPoint = startTransformerPositionDict[view];
				if(!currentPoint.equals(endPoint))
				{
					var xx:int = currentPoint.x-endPoint.x;
					var yy:int = currentPoint.y-endPoint.y;
					var moveX:Number = xx/effectDuration;
					var moveY:Number = yy/effectDuration;
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
		private function calculateLeftPoints():void
		{
			isNeedCalculateLeftPoints = false;
			var leftWidth:int = 0;
			if(leftDistance!=null)
			{
				leftWidth = int(leftDistance);
			}else
			{
				var viewDis:int = 0;
				for (var i:int = 0; i < leftArea.length; i++) 
				{
					viewDis = getViewGlobePosition(leftArea[i]).x+leftArea[i].width;
					if(viewDis>leftWidth)
						leftWidth = viewDis;
				}
			}
			for (var j:int = 0; j < leftArea.length; j++)
			{
				setViewTransformData(leftArea[j],new Point(leftArea[j].x-leftWidth,leftArea[j].y),new Point(leftArea[j].x,leftArea[j].y));
			}
		}
		/**
		 * 计算右边的位置点
		 */		
		private function calculateRightPoints():void
		{
			isNeedCalculateRightPoints = false;
			var rightWidth:int = int.MAX_VALUE;
			if(rightDistance!=null)
			{
				rightWidth = int(rightDistance);
			}else
			{
				var viewDis:int = 0;
				for (var i:int = 0; i < rightArea.length; i++) 
				{
					viewDis = getViewGlobePosition(rightArea[i]).x;
					if(viewDis<rightWidth)
						rightWidth = viewDis;
				}
				if(rightArea.length>0)rightWidth = width-rightWidth;
			}
			for (var j:int = 0; j < rightArea.length; j++) 
			{
				setViewTransformData(rightArea[j],new Point(rightArea[j].x+rightWidth,rightArea[j].y),new Point(rightArea[j].x,rightArea[j].y));
			}
		}
		/**
		 * 计算上边的位置点
		 */		
		private function calculateTopPoints():void
		{
			isNeedCalculateTopPoints = false;
			var topHeight:int = 0;
			if(topDistance!=null)
			{
				topHeight = int(topDistance);
			}else
			{
				var viewDis:int = 0;
				for (var i:int = 0; i < topArea.length; i++) 
				{
					viewDis = getViewGlobePosition(topArea[i]).y+topArea[i].height;
					if(viewDis>topHeight)
						topHeight = viewDis;
				}
			}
			for (var j:int = 0; j < topArea.length; j++) 
			{
				setViewTransformData(topArea[j],new Point(topArea[j].x,topArea[j].y-topHeight),new Point(topArea[j].x,topArea[j].y));
			}
		}
		/**
		 * 计算底部位置点
		 */		
		private function calculateButtomPoints():void
		{
			isNeedCalculateButtomPoints = false;
			var buttomHeight:int = int.MAX_VALUE;
			if(buttomDistance!=null)
			{
				buttomHeight = int(buttomDistance);
			}else
			{
				var viewDis:int = 0;
				for (var i:int = 0; i < buttomArea.length; i++) 
				{
					viewDis = getViewGlobePosition(buttomArea[i]).y;
					if(viewDis<buttomHeight)
						buttomHeight = viewDis;
				}
				if(buttomArea.length>0)buttomHeight = height-buttomHeight;
			}
			for (var j:int = 0; j < buttomArea.length; j++) 
			{
				setViewTransformData(buttomArea[j],new Point(buttomArea[j].x,buttomArea[j].y+buttomHeight),new Point(buttomArea[j].x,buttomArea[j].y));
			}
		}
		/**
		 * 将指定视图的本地坐标转换成全局坐标，方便计算距离位置点
		 */		
		private function getViewGlobePosition(view:DisplayObject):Point
		{
			if(view.root!=null)
			{
				var rect:Rectangle = view.getBounds(view.root);
				return new Point(rect.x,rect.y);
			}else
			{
				return view.localToGlobal(new Point());
			}
		}
		/**
		 * 根据移动方向设置相应的位置点
		 * @param view
		 * @param p1
		 * @param p2
		 */		
		private function setViewTransformData(view:DisplayObject,p1:Point,p2:Point):void
		{
			startTransformerPositionDict[view] = isFlyIn?p1:p2;
			endTransformerPositionDict[view] = isFlyIn?p2:p1;
			currentTransformerPositionDict[view] = new Point();
			if(needTransformViews.indexOf(view)<0)
			{
				needTransformViews.push(view);
			}
		}
		private function addAreaObjects(objects:Array,area:Vector.<DisplayObject>):GameSceneTransformer
		{
			area.length = 0;
			for (var i:int = 0; i < objects.length; i++) 
			{
				if(objects[i] is DisplayObject)
				{
					area.push(objects[i]);
					// 缓存displayObject
//					(objects[i] as DisplayObject).cacheAsBitmap = true;
					defaultTransformPositionDict[objects[i]] = new Point(objects[i].x,objects[i].y);
				}
			}
			return this;
		}
		/**
		 * 播放完成
		 */		
		private function onEffectPlayComplete():void
		{
			starting = false;
			/*enterFrameTarget.removeEventListener(Event.ENTER_FRAME,onFrame);*/
			if(onPlayComplete!=null)
			{
				onPlayComplete.apply();
			}
		}
		/**
		 * 是否正在运行
		 */		
		public function isRunning():Boolean{return starting;}
		/**
		 * 添加上部的移动视图
		 */		
		public function addTopAreaObject(objects:Array):GameSceneTransformer
		{
			addAreaObjects(objects,topArea);
			isNeedCalculateTopPoints = true;
			return this;
		}
		/**
		 * 添加底部的移动视图
		 */		
		public function addButtomAreaObject(objects:Array):GameSceneTransformer
		{
			addAreaObjects(objects,buttomArea);
			isNeedCalculateButtomPoints = true;
			return this;
		}
		/**
		 * 添加左边的移动视图
		 */		
		public function addLeftAreaObject(objects:Array):GameSceneTransformer
		{
			addAreaObjects(objects,leftArea);
			isNeedCalculateLeftPoints = true;
			return this;
		}
		/**
		 * 添加右边的移动视图
		 */		
		public function addRightAreaObject(objects:Array):GameSceneTransformer
		{
			addAreaObjects(objects,rightArea);
			isNeedCalculateRightPoints = true;
			return this;
		}
	}
}