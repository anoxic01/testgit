module manager {
	export class SoundManager {
		private m_bSoundEffectSwitch	:	 boolean = true;			//音效开关
		private m_soundTimer			:	egret.Timer;					//
		private m_uDelayTime			:	number = 60;				//音效 與 音效 播放的間隔時間
		private m_vecSound				:	lobby.model.struct.SoundStruct[];

		public nVolume					:	number;					//音量
		
		public  soundPkg				;		
		private	m_bPlaying				:	 boolean = false;
		private m_dicActiveChannels		;
        private static m_instance		:	SoundManager;

		public constructor(sing:Singleton) {
			this.nVolume = SharedObjectManager.getEffectVolume();
			this.soundPkg = new sound.SoundPackage();
			this.m_soundTimer = new egret.Timer(this.m_uDelayTime,1);
			this.m_soundTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onPlayList, this);
			this.m_vecSound = new Array<lobby.model.struct.SoundStruct>();
			this.m_dicActiveChannels = {};
		}
		
        public destroy() : void
        {
            
        }

        set  soundEffectSwitch(bValue: boolean) 
        {
            this.m_bSoundEffectSwitch = bValue;
        }

        get soundEffectSwitch() :  boolean
        {
            return this.m_bSoundEffectSwitch;
        }

        public play( key:string, loop:number= 0, lowerVolume: boolean = true, fSoundLoadComplete:Function = null,fPlayComplete:Function = null , bPlayList: boolean = false ,fSoundError:Function=null) : void
        {
            loop = loop;
            lowerVolume = lowerVolume;
						
            if (this.m_bSoundEffectSwitch) {
				
				//非連續播放情況下 , 禁止相同音效 , 重複播放 造成音效重疊問題
				if( bPlayList == false ){
					if (this.m_dicActiveChannels[key]){
						var oldSound = this.m_dicActiveChannels[key];
							oldSound.destroy();			
						delete this.m_dicActiveChannels[key];
					}	
				}

				var channel;
				this.soundPkg.getSound(key , function( _snd ):void {
					if( _snd.bLoadComplete  == false ){
						return;
					}
					channel = _snd.sound.play(0,loop);
					var _soundEx = new sound.SoundChannel_EX(channel ,fPlayComplete );
					this.m_dicActiveChannels[key] = _soundEx;
					
					if( fSoundLoadComplete != null ){
						fSoundLoadComplete(channel);
					}
					
					if (lowerVolume){  // 背景音樂 自動小聲模式
						var _vol:number = SharedObjectManager.getMusicVolume();
							_vol = _vol * 0.3;
						MusicManager.singleton.easingVolume( 0.5 , _vol);
					}
					
					if( channel ){
						var trans = channel.soundTransform;
							trans.volume = this.nVolume;
						channel.soundTransform = trans;
						
						
						channel.addEventListener(egret.Event.SOUND_COMPLETE , function(evt:Event):void{
							channel.removeEventListener(egret.Event.SOUND_COMPLETE, arguments.callee);
							if( fPlayComplete != null ){
								fPlayComplete(channel);
							}
							//循序播放
							if( bPlayList ) {
								this.m_soundTimer.start();
							}
							if (lowerVolume){ // 將背景音樂 調整回來原本音量大小
								MusicManager.singleton.easingVolume( 0.5 , MusicManager.singleton.nVolume );
							}
							
							if( this.m_dicActiveChannels[key] ){
								this.m_dicActiveChannels[key].destroy();
								delete this.m_dicActiveChannels[key];	
							}
							
						} );	
						
					}

					
				} ,fSoundError);
				
            }
			else {
			//	console.log("音效靜音 ::" + this.m_bSoundEffectSwitch );
			}
        }

        public stopSoundByKey(_sKey:string) : void
        {
            if (this.m_dicActiveChannels[_sKey])
            {
                this.m_dicActiveChannels[_sKey].destroy();
                delete this.m_dicActiveChannels[_sKey];
            }
            for(var i:number=0; i < this.m_vecSound.length ; i++) {
				if( this.m_vecSound[i].key == _sKey ){
					this.m_vecSound.splice( 	i , 1);
				}
			}
			MusicManager.singleton.easingVolume( 0.5 , SharedObjectManager.getMusicVolume() );
        }

        public stopAllSound() : void
        {
            for (var _param in this.m_dicActiveChannels)
            {
                
                this.m_dicActiveChannels[_param].destroy();
                delete this.m_dicActiveChannels[_param];
            }
			this.m_bPlaying = false;
			this.m_vecSound = null;
			this.m_vecSound = new Array<lobby.model.struct.SoundStruct>();
			MusicManager.singleton.easingVolume( 0.5 , SharedObjectManager.getMusicVolume() );
        }
		
		public changeLanguage( _iLanguage:number):void {
			this.soundPkg.changeLanguage(_iLanguage);
		}
		
		
		public playList( key:string, loop:number= 0 , lowerVolume: boolean = true, fSoundLoadComplete:Function = null,fPlayComplete:Function = null ):void {
			if(this.soundEffectSwitch==false)return;
				let _soundStruct = new lobby.model.struct.SoundStruct();
				_soundStruct.key = key;
				_soundStruct.loop = loop;
				_soundStruct.lowerVolume = lowerVolume;
				_soundStruct.fSoundLoadComplete = fSoundLoadComplete;
				_soundStruct.fPlayComplete = fPlayComplete;
			
				
				if( this.m_bPlaying == false ){
					this.m_bPlaying = true;
					this.play( _soundStruct.key , _soundStruct.loop , _soundStruct.lowerVolume , _soundStruct.fSoundLoadComplete , _soundStruct.fPlayComplete , true );
				}
				else {
					this.m_vecSound.push( _soundStruct );
				}
		}
		
		private onPlayList(event:egret.TimerEvent):void{
			console.log("循序播放:::::" )
			if( this.m_vecSound.length == 0){
				this.m_bPlaying = false;
			}
			else {
				var _soundStruct = this.m_vecSound.shift();
				this.play( _soundStruct.key , _soundStruct.loop , _soundStruct.lowerVolume , _soundStruct.fSoundLoadComplete , _soundStruct.fPlayComplete , true );
			}
			
		}
		
		
        public static getInstance() : SoundManager
        {
            if (!this.m_instance)
            {
                this.m_instance = new SoundManager(new Singleton());
            }
            return this.m_instance;
        }


	}
}
export class Singleton{}