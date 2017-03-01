class JClip extends egret.Sprite implements IClip,IJuggle
{
	/**非帧标签播放**/		
	protected NOT_LABEL_PLAY:number = -1;/// 
	/**帧循环**/		
	protected LABEL_PLAY_LOOP:number = 0;
	/**停止在帧标签的开始帧 **/		
	protected LABEL_STOP_START_FRAME:number = 1;
	/**停止在帧标签的最后帧 **/		
	protected LABEL_STOP_END_FRAME:number = 2;


	private _totalFrames : number = 0;
	private _frameRate : number = 24;
	private _isPlaying : boolean = false;
	private _currentFrame : number = 0;
	private _currentLabel:any = null;
	private _currentLabels:any[] = null;

	protected labelsDict:Dictionary;
	protected juggler:JuggleAdvanceTick;
	protected frameScripts:FrameScript;
	protected clipData:any;
	protected isAutoPlay:boolean = true;
	/** 帧标签播放类型**/		
	protected labelPlayType:number = 0;
	/**帧标签播放时开始帧 **/		
	protected labelStartFrame:number = 0;
	/**帧标签播放时停止帧**/		
	protected labelEndFrame:number = 0;
	/**是否需要延时渲染**/		
	protected isDelayRenderder:boolean = false;
	/**是否需要更新帧**/		
	protected isNeedUpdateFrame:boolean = false;

	public constructor(clipData:any=null,frameRate:any=null,isAutoPlay:boolean=true) 
	{
		super();
		this.isAutoPlay = isAutoPlay;
		if(frameRate==null)frameRate=24;
		this._frameRate = frameRate;
		this.initClip(clipData);
	}

	protected initClip(clipData:any=null)
	{
		this.juggler = new JuggleAdvanceTick();
		this.juggler.setTick(this.onFrameRenderer,this);
		this.frameRate = this.frameRate;
		this.setClipData(clipData);
	}
	
	//////////////////////////////// 渲染相关
	//////////////////////////////////////////////////////////////////////////////
	/**
	 * 播放帧 onFrameRenderer->onInvalidateCurrentFrame->rendererCurrentFrame
	 */	
	protected onFrameRenderer():void
	{
		if(this.isCanRendererFrame()==false)return;
		this.isNeedUpdateFrame = false;
		this.onInvalidateCurrentFrame();
		if(this.currentLabel!=null)// 播放帧标签
		{
			if(this.labelPlayType==this.LABEL_STOP_START_FRAME)
			{
				this.stop();
			}else
			{
				this.setCurrentFrame(this.currentFrame+1);
				if(this.currentFrame>this.labelEndFrame)
				{
					if(this.labelPlayType==this.LABEL_PLAY_LOOP)// 循环播放
					{
						this.setCurrentFrame(this.labelStartFrame);
					}else if(this.labelPlayType==this.LABEL_STOP_END_FRAME)
					{
						this.stop();
					}
				}
			}
		}else
		{
			if(this.isDelayRenderder)
			{
				this.isDelayRenderder = false;
				this.stop();
			}else
			{
				this.setCurrentFrame(this.currentFrame+1);
				if(this.currentFrame>this.totalFrames)this.setCurrentFrame(1);
			}
		}
	}
	protected onInvalidateCurrentFrame():void
	{
		this.rendererCurrentFrame();
		if(this.frameScripts!=null)
			this.frameScripts.execute(this.currentFrame);
	}
	/**
	 * 渲染当前帧,需要子类重写实现方式
	 * @return 是否渲染成功
	 */		
	protected rendererCurrentFrame():boolean
	{
		return true;
	}

	/////////////////////////// 实现接口方法
	////////////////////////////////////////////////////////////////////////
	public setClipData(value:any):void
	{
		this.clear();
		if(value==null||this.clipData==value)return;
		this.clipData = value;
		this.setCurrentFrame(1);
		if(value.hasOwnProperty("length"))this.setTotalFrame(value.length);
		else 
		{
			console.warn("获取Clip的totalFrames异常！");
		}
		if(this.clipData!=null&&this.isAutoPlay==true)this.play();
	}
	public play():void
	{
		this.strartJuggler();
		if(this.isDelayRenderder)
			this.isDelayRenderder = false;
		if(this.currentLabel!=null)
		{
			if(this.labelPlayType!=this.LABEL_PLAY_LOOP)
				this.labelPlayType = this.LABEL_PLAY_LOOP;
		}
	}
	public stop():void
	{
		this.stopJuggler();
		if(this.isNeedUpdateFrame)
		{
			this.onInvalidateCurrentFrame();
			this.isNeedUpdateFrame = false;
		}
	}
	/**
	 * 停止到指定帧或者指定标签
	 * @param frame
	 * @param isStopLableFrameEnd 当frame为帧标签时，isStopLableFrameEnd可设定是否停止在标签的最后一帧
	 */		
	public gotoAndStop(frame:any, isStopLableFrameEnd:Boolean=false):void
	{
		this.gotoFrame(frame,isStopLableFrameEnd?this.LABEL_STOP_END_FRAME:this.LABEL_STOP_START_FRAME);
	}
	public gotoAndPlay(frame:any):void
	{
		this.gotoFrame(frame,this.LABEL_PLAY_LOOP);
	}
	public addFrameScript(frame:number,callBack:Function,thisArg:any,...args):void
	{
		if(this.frameScripts==null)this.frameScripts = new FrameScript();
		this.frameScripts.addFrameScript(frame,callBack,thisArg,args);
	}
	public onJuggle(value:number):void
	{
		this.juggler.onJuggle(value);
	}

	public dispose():void
	{
		this.clear();
		this.isNeedUpdateFrame = false;
		this.isDelayRenderder = false;
		this.frameScripts&&this.frameScripts.dispose();
		this.juggler&&this.juggler.dispose();
		this.labelsDict&&this.labelsDict.dispose();
		this.frameScripts = null;
		this.juggler = null;
		this.clipData = null;
		this._currentLabel = null;
		this._currentLabels = null;
		this.labelsDict = null;
		this.removeFromParent();
	}
	///////////////////////////////////////////////////////////////////////

	/**
	 * 跳帧播放
	 * @param frame
	 * @param playType
	 */		
	protected gotoFrame(frame:any,playType:number):void
	{
		this.isNeedUpdateFrame = true;
		if(typeof(frame)==="string")// 播放帧标签
		{
			var frameData:any = this.labelsDict.get(frame);
			if(frameData!=null)
			{
				this._currentLabel = frame;
				this.labelStartFrame = frameData.frame;
				this.labelEndFrame = frameData.endFrame;
				this.setCurrentFrame(this.labelStartFrame);
				if(this.labelStartFrame==this.labelEndFrame)this.labelPlayType = this.LABEL_STOP_START_FRAME;
				else this.labelPlayType = playType;
				this.strartJuggler();
			}else throw new Error("未找到需要播放的帧标签:"+frame);
		}else // 播放指定帧
		{
			this._currentLabel = null;
			this.labelPlayType = this.NOT_LABEL_PLAY;
			this.labelStartFrame = 0;
			this.labelEndFrame = 0;
			this.setCurrentFrame(frame);
			if(playType!=this.LABEL_PLAY_LOOP)/// 如果不是循环播放，则启用延时渲染
			{
				this.isDelayRenderder = true;
			}
			this.strartJuggler();
		}
	}	
	protected strartJuggler():void
	{
		if(this.isPlaying==true)return;
		this._isPlaying = true;
		JuggleManager.instance.addJuggle(this);
	}
	protected stopJuggler():void
	{
		if(this.isPlaying==false)return;
		this._isPlaying = false;
		JuggleManager.instance.removeJuggle(this);
	}
	/**是否允许渲染帧 */
	protected isCanRendererFrame():boolean
	{
		return this.isPlaying&&this.stage!=null;
	}

	/**
	 * 获取指定的label开始的帧
	 */		
	public getLabelStartFrame(label:any):number
	{
		if(this.labelsDict!=null)
		{
			var frameData:any = this.labelsDict.get(label);
			if(frameData!=null)return frameData.frame;
		}
		return -1;
	}
	/**
	 * 获取指定的label结束的帧
	 */		
	public getLabelEndFrame(label:any):number
	{
		if(this.labelsDict!=null)
		{
			var frameData:any = this.labelsDict.get(label);
			if(frameData!=null)return frameData.endFrame;
		}
		return -1;
	}
	/**
	 * 清除掉当前的所有数据
	 */		
	protected clear():void
	{
		this.stopJuggler();
		this.frameScripts&&this.frameScripts.clear();
	}
	//////////////////////////////////////////////////////////////////////
	public get totalFrames():number{return this._totalFrames;}
	public get currentFrame():number{return this._currentFrame;}
	public get frameRate():number{return this._frameRate;}
	public get isPlaying():boolean{return this._isPlaying;}
	public get currentLabels():any[]{return this._currentLabels;}
	public get currentLabel():any{return this._currentLabel;}

	////////////////////////////////////////////////////////////////////////
	public set currentFrame(value:number)
	{
		this.setCurrentFrame(value);
	}
	public set frameRate(value:number)
	{
		if(value<1)value = 1;
		this._frameRate = value;
		this.juggler.setFrameRate(this._frameRate);
	}
	////////////////////////////////////////////////////////////////////////
	/**
	 * 设置总帧数
	 */		
	protected setTotalFrame(value:number):void{this._totalFrames = value;}
	/**
	 * 设置当前帧
	 */		
	protected setCurrentFrame(value:number):void{this._currentFrame = value;}
	/**
	 *必须在setTotalFrame后面调用
	*/		
	protected setCurrentLabels(value:any[]):void
	{
		this._currentLabels = value;
		if(this.labelsDict==null)this.labelsDict = new Dictionary();
		this.labelsDict.clear();
		if(value!=null)
		{
			var frame:FrameLabel;
			var nextFrame:FrameLabel;
			var len:number = value.length;
			for (var i:number = 0; i < len; i++)
			{
				frame = value[i];
				if(i<len-1)nextFrame = value[i+1];
				else nextFrame = null;
				this.labelsDict.add(frame.name,{name:frame.name,frame:frame.frame,endFrame:nextFrame?nextFrame.frame-1:this.totalFrames});
			}
		}
	}
	public removeFromParent():void
	{
		if(this.parent)
			this.parent.removeChild(this);
	}
}