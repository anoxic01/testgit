module manager {
	export class MusicManager {
		private m_bEnabled				:	 boolean	=	true;			//音乐开关
		private m_sTrack				:	string;						//音乐名称
		private m_resources				:	Object;						//播放记录
		private m_playingSoundChannel	:	SoundChannel;				//当前声道
		private m_oldSound				:	SoundChannel;				//旧声道
		private m_duckingCount			:	Number;						//缓动系数
		private  m_playSound			:	Sound;
		private m_tweenLite				:	TweenLite;
		private m_nVolume				:	Number	=	0.6;			//音乐音量
		private m_transform 			: 	SoundTransform;
		private m_nPausePosition		:	Number = 0;					//當前播放位置
		
		private static _instance		:	MusicManager;
		public constructor() {
			m_resources = {};
			m_duckingCount = 0;
			m_transform = new SoundTransform(m_nVolume);
			return;
		}

		
		public easingVolume( dur:Number, to:Number ) : void
		{
			if (m_playSound&&m_bEnabled){
				fadeVolume( dur, to);
			}
		}
		
		set  nVolume(nV:Number) 
		{
			m_nVolume = nV;
			
			if (m_playingSoundChannel)
			{
				if(m_transform) {
					m_transform = null;
				}
				m_transform = new SoundTransform(nV);
				m_playingSoundChannel.soundTransform = m_transform;
			}
			
		}
		
		get nVolume() : Number
		{
			return m_nVolume;
		}
		
		private fadeVolume(  dur:Number, to:Number) : void{
			if (m_transform){
				TweenLite.to(m_transform, dur, { volume: to, onUpdate: updateChannel } );  
			}
		}
		
		private updateChannel():void {  
			if( m_playingSoundChannel ){
				m_playingSoundChannel.soundTransform = m_transform; 
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
			
			if (m_sTrack && (m_sTrack == songName))
			{
				return;
			}
			
			if (crossfade && m_playingSoundChannel)
			{
				m_oldSound = m_playingSoundChannel;
				var timer:Timer = new Timer(10);
				timer.start();
				timer.addEventListener(TimerEvent.TIMER, function fade():void{
					var _newTransform : SoundTransform = null;
					var _oldTrandform : SoundTransform = null;
					if (m_oldSound.soundTransform.volume <= 0)
					{
						m_oldSound.stop();
						m_oldSound = null;
						_newTransform = new SoundTransform(nVolume);
						m_playingSoundChannel.soundTransform = _newTransform;
						timer.removeEventListener(TimerEvent.TIMER, fade);
						timer.stop();
						timer = null;
						return;
					}else{
						_oldTrandform = new SoundTransform(m_oldSound.soundTransform.volume - 0.02);
						m_oldSound.soundTransform = _oldTrandform;
						_newTransform = new SoundTransform(m_playingSoundChannel.soundTransform.volume + 0.02);
						m_playingSoundChannel.soundTransform = _newTransform;
					}
				});
			} else if (m_playingSoundChannel)
			{
				m_playingSoundChannel.stop();
			}
			
			if (loops == -1)
			{
				loops = int.MAX_VALUE;
			}
			
			if (!m_resources[songName])
			{
				var songClass:Class = ResourceManager.getInstance().getClassByNameFromDomain("sound.swf",songName) as Class;
				if (songClass == null)
				{
					console.log("背景音乐找不到:",songName);
					return;
				}
				var sd:Sound = new songClass() as Sound;
				sd.addEventListener("ioError", function () : void
				{
					console.log("IOERROR IN PLAY");
				});
				m_resources[songName] = sd;
			}
			
			m_sTrack = songName;
			m_playingSoundChannel = (m_resources[songName] as Sound).play(0, loops, new SoundTransform(SharedObjectManager.getMusicVolume()));
			
		}
		
		public stop() : void
		{
			if( m_tweenLite ){
				m_tweenLite.kill( null, m_playSound);
			}
			if (m_playingSoundChannel){
				m_nPausePosition = m_playingSoundChannel.position;
				m_playingSoundChannel.stop();
			}
			
			return;
		}
		
		get enabled() :  boolean
		{
			return m_bEnabled;
		}
		
		set  enabled(value: boolean) 
		{
			m_bEnabled = value;
			if (value)
			{
				if( m_playSound && m_playingSoundChannel ){
					clear();
					m_playingSoundChannel = m_playSound.play( m_nPausePosition );	
					m_playingSoundChannel.addEventListener(Event.SOUND_COMPLETE , soundPlayComplete);
					m_playingSoundChannel.soundTransform = new SoundTransform( nVolume==0?0.6:nVolume );
				}
				
			}
			else
			{
				stop();
			}
			return;
		}
		
		public toggleEnabled() : void
		{
			enabled = !enabled;
			return;
		}
		
		set  track(songName:string) 
		{
			if (m_sTrack != songName)
			{
				play(songName);
			}
			return;
		}
		
		get track() : string
		{
			return m_sTrack;
		}
		
		public static get singleton() : MusicManager
		{
			if (!_instance)
			{
				_instance = new MusicManager;
			}
			return _instance;
		}
		
		public setSoundData( _sound:Sound , _soundChannel:SoundChannel ):void {
			clear();
			m_playSound =  _sound;
			nVolume = m_nVolume;
			m_playingSoundChannel = _soundChannel;
			
			if( m_playingSoundChannel ){
				m_playingSoundChannel.addEventListener(Event.SOUND_COMPLETE , soundPlayComplete);			
				m_playingSoundChannel.soundTransform = new SoundTransform( nVolume );	
				if(m_bEnabled==false)m_playingSoundChannel.stop();
			}

		}
		
		protected soundPlayComplete(event:Event):void{
			m_nPausePosition = 0;
			if( m_bEnabled ){
				if( m_playSound && m_playingSoundChannel ){
					clear();
					m_playingSoundChannel = m_playSound.play( m_nPausePosition );	
					m_playingSoundChannel.addEventListener(Event.SOUND_COMPLETE , soundPlayComplete);
					m_playingSoundChannel.soundTransform = new SoundTransform( nVolume );
				}	
			}
		}	
		
		private clear():void {
			//清除之前的實體
			if( m_playingSoundChannel ){
				m_playingSoundChannel.removeEventListener(Event.SOUND_COMPLETE , soundPlayComplete);
				m_playingSoundChannel.stop();
				m_playingSoundChannel = null;
			}	
		}
		
	}
}