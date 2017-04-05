module manager {
	export class MusicManager {
		private m_bEnabled				:	 boolean	=	true;			//音乐开关
		private m_sTrack				:	string;						//音乐名称
		private m_resources				:	Object;						//播放记录
		private m_playingSoundChannel	;				//当前声道
		private m_oldSound				;				//旧声道
		private m_duckingCount			:	number;						//缓动系数
		private m_playSound			;
		private m_tweenLite				;
		private m_nVolume				:	number	=	0.6;			//音乐音量
		private m_transform 			;
		private m_nPausePosition		:	number = 0;					//當前播放位置
		
		private static _instance		:	MusicManager;
		public constructor() {
			this.m_resources = {};
			this.m_duckingCount = 0;
			this.m_transform = new SoundTransform(this.m_nVolume);
			return;
		}

		
		public easingVolume( dur:number, to:number ) : void
		{
			if (this.m_playSound&&this.m_bEnabled){
				this.fadeVolume( dur, to);
			}
		}
		
		set  nVolume(nV:number) 
		{
			this.m_nVolume = nV;
			
			if (this.m_playingSoundChannel)
			{
				if(this.m_transform) {
					this.m_transform = null;
				}
				this.m_transform = new SoundTransform(nV);
				this.m_playingSoundChannel.soundTransform = this.m_transform;
			}
			
		}
		
		get nVolume() : number
		{
			return this.m_nVolume;
		}
		
		private fadeVolume(  dur:number, to:number) : void{
			if (this.m_transform){
				egret.Tween.get(this.m_transform).to({volume:to, onUpdate:this.updateChannel});
			}
		}
		
		private updateChannel():void {  
			if( this.m_playingSoundChannel ){
				this.m_playingSoundChannel.soundTransform = this.m_transform; 
			}	 
		} 		
		
		/**
		 * 
		 * @param songName		
		 * @param loops			-1 - 循环播放
		 * @param crossfade		是否过渡
		 * 
		 */		
		protected play(songName:string, loops:number= -1, crossfade: boolean = false) : void
		{
			if (songName == null)
			{
				return;
			}
			
			if (this.m_sTrack && (this.m_sTrack == songName))
			{
				return;
			}
			
			if (crossfade && this.m_playingSoundChannel)
			{
				this.m_oldSound = this.m_playingSoundChannel;
				var timer = new egret.Timer(10);
				timer.start();
				timer.addEventListener(egret.TimerEvent.TIMER, function fade():void{
					var _newTransform : SoundTransform = null;
					var _oldTrandform : SoundTransform = null;
					if (this.m_oldSound.soundTransform.volume <= 0)
					{
						this.m_oldSound.stop();
						this.m_oldSound = null;
						_newTransform = new SoundTransform(this.nVolume);
						this.m_playingSoundChannel.soundTransform = _newTransform;
						timer.removeEventListener(egret.TimerEvent.TIMER, fade, this);
						timer.stop();
						timer = null;
						return;
					}else{
						_oldTrandform = new SoundTransform(this.m_oldSound.soundTransform.volume - 0.02);
						this.m_oldSound.soundTransform = _oldTrandform;
						_newTransform = new SoundTransform(this.m_playingSoundChannel.soundTransform.volume + 0.02);
						this.m_playingSoundChannel.soundTransform = _newTransform;
					}
				}, this);
			} else if (this.m_playingSoundChannel)
			{
				this.m_playingSoundChannel.stop();
			}
			
			if (loops == -1)
			{
				loops = int.MAX_VALUE;
			}
			
			if (!this.m_resources[songName])
			{
				var songClass = ResourceManager.getInstance().getClassByNameFromDomain("sound.swf",songName);
				if (songClass == null)
				{
					console.log("背景音乐找不到:",songName);
					return;
				}
				var sd = new songClass();
				sd.addEventListener("ioError", function () : void
				{
					console.log("IOERROR IN PLAY");
				});
				this.m_resources[songName] = sd;
			}
			
			this.m_sTrack = songName;
			this.m_playingSoundChannel = (this.m_resources[songName]).play(0, loops, new SoundTransform(SharedObjectManager.getMusicVolume()));
			
		}
		
		public stop() : void
		{
			if( this.m_tweenLite ){
				this.m_tweenLite.kill( null, this.m_playSound);
			}
			if (this.m_playingSoundChannel){
				this.m_nPausePosition = this.m_playingSoundChannel.position;
				this.m_playingSoundChannel.stop();
			}
			
			return;
		}
		
		get enabled() :  boolean
		{
			return this.m_bEnabled;
		}
		
		set  enabled(value: boolean) 
		{
			this.m_bEnabled = value;
			if (value)
			{
				if( this.m_playSound && this.m_playingSoundChannel ){
					this.clear();
					this.m_playingSoundChannel = this.m_playSound.play( this.m_nPausePosition );	
					this.m_playingSoundChannel.addEventListener(egret.Event.SOUND_COMPLETE , this.soundPlayComplete);
					this.m_playingSoundChannel.soundTransform = new SoundTransform( this.nVolume==0?0.6:this.nVolume );
				}
				
			}
			else
			{
				this.stop();
			}
			return;
		}
		
		public toggleEnabled() : void
		{
			this.enabled = !this.enabled;
			return;
		}
		
		set  track(songName:string) 
		{
			if (this.m_sTrack != songName)
			{
				this.play(songName);
			}
			return;
		}
		
		get track() : string
		{
			return this.m_sTrack;
		}
		
		public static get singleton() : MusicManager
		{
			if (!this._instance)
			{
				this._instance = new MusicManager;
			}
			return this._instance;
		}
		
		public setSoundData( _sound , _soundChannel ):void {
			this.clear();
			this.m_playSound =  _sound;
			this.nVolume = this.m_nVolume;
			this.m_playingSoundChannel = _soundChannel;
			
			if( this.m_playingSoundChannel ){
				this.m_playingSoundChannel.addEventListener(egret.Event.SOUND_COMPLETE , this.soundPlayComplete);			
				this.m_playingSoundChannel.soundTransform = new SoundTransform( this.nVolume );	
				if(this.m_bEnabled==false)this.m_playingSoundChannel.stop();
			}

		}
		
		protected soundPlayComplete(event:Event):void{
			this.m_nPausePosition = 0;
			if( this.m_bEnabled ){
				if( this.m_playSound && this.m_playingSoundChannel ){
					this.clear();
					this.m_playingSoundChannel = this.m_playSound.play( this.m_nPausePosition );	
					this.m_playingSoundChannel.addEventListener(egret.Event.SOUND_COMPLETE , this.soundPlayComplete);
					this.m_playingSoundChannel.soundTransform = new SoundTransform( this.nVolume );
				}	
			}
		}	
		
		private clear():void {
			//清除之前的實體
			if( this.m_playingSoundChannel ){
				this.m_playingSoundChannel.removeEventListener(egret.Event.SOUND_COMPLETE , this.soundPlayComplete);
				this.m_playingSoundChannel.stop();
				this.m_playingSoundChannel = null;
			}	
		}
		
	}
}