module manager {
	export class SoundManager {
		private var m_bSoundEffectSwitch	:	Boolean = true;			//音效开关
		private var m_soundTimer			:	Timer;					//
		private var m_uDelayTime			:	uint = 60;				//音效 與 音效 播放的間隔時間
		private var m_vecSound				:	Vector.<SoundStruct>;

		public var nVolume					:	Number;					//音量
		
		public  var soundPkg				:	SoundPackage;		
		private	var m_bPlaying				:	Boolean = false;
		private var m_dicActiveChannels		:	Dictionary;
        private static var m_instance		:	SoundManager;

		public constructor() {
			nVolume = SharedObjectManager.getEffectVolume();
			soundPkg = new SoundPackage();
			m_soundTimer = new Timer(m_uDelayTime,1);
			m_soundTimer.addEventListener(TimerEvent.TIMER_COMPLETE, onPlayList);
			m_vecSound = new Vector.<SoundStruct>();
			m_dicActiveChannels = new Dictionary();
		}
		
        public function destroy() : void
        {
            
        }

        public function set soundEffectSwitch(bValue:Boolean) : void
        {
            m_bSoundEffectSwitch = bValue;
        }

        public function get soundEffectSwitch() : Boolean
        {
            return m_bSoundEffectSwitch;
        }

        public function play( key:String, loop:int = 0, lowerVolume:Boolean = true, fSoundLoadComplete:Function = null,fPlayComplete:Function = null , bPlayList:Boolean = false ,fSoundError:Function=null) : void
        {
            loop = loop;
            lowerVolume = lowerVolume;
						
            if (m_bSoundEffectSwitch) {
				
				//非連續播放情況下 , 禁止相同音效 , 重複播放 造成音效重疊問題
				if( bPlayList == false ){
					if (m_dicActiveChannels[key]){
						var oldSound:SoundChannel_EX = m_dicActiveChannels[key];
							oldSound.destroy();			
						delete m_dicActiveChannels[key];
					}	
				}

				var channel:SoundChannel;
				soundPkg.getSound(key , function( _snd:LiveSound ):void {
					if( _snd.bLoadComplete  == false ){
						return;
					}
					channel = _snd.sound.play(0,loop);
					var _soundEx:SoundChannel_EX = new SoundChannel_EX(channel ,fPlayComplete );
					m_dicActiveChannels[key] = _soundEx;
					
					if( fSoundLoadComplete != null ){
						fSoundLoadComplete(channel);
					}
					
					if (lowerVolume){  // 背景音樂 自動小聲模式
						var _vol:Number = SharedObjectManager.getMusicVolume();
							_vol = _vol * 0.3;
						MusicManager.singleton.easingVolume( 0.5 , _vol);
					}
					
					if( channel ){
						var trans:SoundTransform = channel.soundTransform;
							trans.volume = nVolume;
						channel.soundTransform = trans;
						
						
						channel.addEventListener(Event.SOUND_COMPLETE , function(evt:Event):void{
							channel.removeEventListener(Event.SOUND_COMPLETE, arguments.callee);
							if( fPlayComplete != null ){
								fPlayComplete(channel);
							}
							//循序播放
							if( bPlayList ) {
								m_soundTimer.start();
							}
							if (lowerVolume){ // 將背景音樂 調整回來原本音量大小
								MusicManager.singleton.easingVolume( 0.5 , MusicManager.singleton.nVolume );
							}
							
							if( m_dicActiveChannels[key] ){
								m_dicActiveChannels[key].destroy();
								delete m_dicActiveChannels[key];	
							}
							
						} );	
						
					}

					
				} ,fSoundError);
				
            }
			else {
			//	trace("音效靜音 ::" + m_bSoundEffectSwitch );
			}
        }

        public function stopSoundByKey(_sKey:String) : void
        {
            if (m_dicActiveChannels[_sKey])
            {
                m_dicActiveChannels[_sKey].destroy();
                delete m_dicActiveChannels[_sKey];
            }
            for(var i:int=0; i < m_vecSound.length ; i++) {
				if( m_vecSound[i].key == _sKey ){
					m_vecSound.splice( 	i , 1);
				}
			}
			MusicManager.singleton.easingVolume( 0.5 , SharedObjectManager.getMusicVolume() );
        }

        public function stopAllSound() : void
        {
            for (var _param:String in m_dicActiveChannels)
            {
                
                m_dicActiveChannels[_param].destroy();
                delete m_dicActiveChannels[_param];
            }
			m_bPlaying = false;
			m_vecSound = null;
			m_vecSound = new Vector.<SoundStruct>();
			MusicManager.singleton.easingVolume( 0.5 , SharedObjectManager.getMusicVolume() );
        }
		
		public function changeLanguage( _iLanguage:int ):void {
			soundPkg.changeLanguage(_iLanguage);
		}
		
		
		public function playList( key:String, loop:int = 0 , lowerVolume:Boolean = true, fSoundLoadComplete:Function = null,fPlayComplete:Function = null ):void {
			if(soundEffectSwitch==false)return;
			var _soundStruct:SoundStruct = new SoundStruct();
				_soundStruct.key = key;
				_soundStruct.loop = loop;
				_soundStruct.lowerVolume = lowerVolume;
				_soundStruct.fSoundLoadComplete = fSoundLoadComplete;
				_soundStruct.fPlayComplete = fPlayComplete;
			
				
				if( m_bPlaying == false ){
					m_bPlaying = true;
					play( _soundStruct.key , _soundStruct.loop , _soundStruct.lowerVolume , _soundStruct.fSoundLoadComplete , _soundStruct.fPlayComplete , true );
				}
				else {
					m_vecSound.push( _soundStruct );
				}
		}
		
		private function onPlayList(event:TimerEvent):void{
			trace("循序播放:::::" )
			if( m_vecSound.length == 0){
				m_bPlaying = false;
			}
			else {
				var _soundStruct:SoundStruct = m_vecSound.shift();
				play( _soundStruct.key , _soundStruct.loop , _soundStruct.lowerVolume , _soundStruct.fSoundLoadComplete , _soundStruct.fPlayComplete , true );
			}
			
		}
		
		
        public static function getInstance() : SoundManager
        {
            if (!m_instance)
            {
                m_instance = new SoundManager(new Singleton());
            }
            return m_instance;
        }


	}
}