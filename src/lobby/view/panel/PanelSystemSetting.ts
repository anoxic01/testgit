module lobby.view.panel {
	export class PanelSystemSetting extends PanelWindow{
//		private var m_bg							:	BitmapScale9Grid;
//		private var m_bg							:	Sprite;
		
		private var m_btnOk							:	SingleButtonMC;
		private var m_btnNo							:	SingleButtonMC;
		private var m_btnClose						:	SingleButtonMC;
		
		public var volumeMusicGame					:	VolumeBar;					//音乐音量
		public var volumeEffect						:	VolumeBar;					//音效音量
		public var volumeSoundLive					:	VolumeBar;					//现场音量
		
		public var comboboxLanguage					:	Combobox;					//语言选择
		public var comboboxMusic					:	Combobox;					//背景音乐
//		public var comboboxSound					:	Combobox;					//声音选择
		
//		public var onoffMusicLobby					:	OnOff;						//大厅音乐
		public var onoffMusicGame					:	OnOff;						//游戏音乐
		public var onoffEffect						:	OnOff;						//游戏音效
		public var onoffSoundLive					:	OnOff;						//现场声音
		
		private var m_fOk							:	Function;
		
		private var m_aMusicKey:Array;
		private var musicSelectIndex:int = 0;
		
		public constructor($bShake:Boolean=false, _fOk:Function=null) {
		
			super($bShake);
			
			m_fOk = _fOk;
			
			m_mcAsset = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_PANEL,"Setting_Asset");
			this.addChild(m_mcAsset);
			
//			m_bg = new BitmapScale9Grid(new Window_Bg_Asset(), 1, 12, 24, 12, 30);
//			m_mcAsset.addChildAt(m_bg,0);
//			m_bg.setSize(342, 390);
//			m_bg.x = -171;
//			m_bg.y = -191;
//			m_bg = new Sprite();
//			m_bg.graphics.beginFill(0x000000,0.5);
//			m_bg.graphics.drawRect(0,0,330,300);
//			m_bg.graphics.endFill();
//			m_mcAsset.mc_0.addChild(m_bg);
			
			m_mcHot = m_mcAsset.mc_hot;
			
//			m_mcAsset.mc_ok.y = 352;
//			m_mcAsset.mc_no.y = 352;
			
			nAssetWidth = 342;
			nAssetHeight = 426;
			
//			m_mcAsset.x = -int(m_mcAsset.width*0.5);
//			m_mcAsset.y = -int(m_mcAsset.height*0.5);
			
//			onoffMusicLobby = new OnOff();
//			m_mcAsset.addChild(onoffMusicLobby);
//			onoffMusicLobby.x = m_mcAsset.tf_1.x + m_mcAsset.tf_1.width + 20;
//			onoffMusicLobby.y = m_mcAsset.tf_1.y;
			
			onoffMusicGame = new OnOff(Define.MUSIC);
			m_mcAsset.addChild(onoffMusicGame);
			onoffMusicGame.x = -49;
			onoffMusicGame.y = -71;
			
			onoffEffect = new OnOff(Define.EFFECT);
			m_mcAsset.addChild(onoffEffect);
			onoffEffect.x = -49;
			onoffEffect.y = 28;
			
			onoffSoundLive = new OnOff(Define.LIVE);
			m_mcAsset.addChild(onoffSoundLive);
			onoffSoundLive.x = -49;
			onoffSoundLive.y = 104;
			
			volumeMusicGame = new VolumeBar(Define.MUSIC);
			m_mcAsset.addChild(volumeMusicGame);
			volumeMusicGame.x = 23;
			volumeMusicGame.y = -65;
			volumeMusicGame.setvolume(onoffMusicGame.bStatus?SharedObjectManager.getMusicVolume():0);
			onoffMusicGame.volumeBar = volumeMusicGame;
			volumeMusicGame.on_off = onoffMusicGame;
			
			volumeEffect = new VolumeBar(Define.EFFECT);
			m_mcAsset.addChild(volumeEffect);
			volumeEffect.x = 23;
			volumeEffect.y = 36;
			volumeEffect.setvolume(onoffEffect.bStatus?SharedObjectManager.getEffectVolume():0);
			onoffEffect.volumeBar = volumeEffect;
			volumeEffect.on_off	  = onoffEffect;
			
			volumeSoundLive = new VolumeBar(Define.LIVE);
			m_mcAsset.addChild(volumeSoundLive);
			volumeSoundLive.x = 23;
			volumeSoundLive.y = 110;
			volumeSoundLive.setvolume(onoffSoundLive.bStatus?SharedObjectManager.getLiveVolume():0);
			onoffSoundLive.volumeBar = volumeSoundLive;
			volumeSoundLive.on_off   = onoffSoundLive;
			
			musicSelectIndex = SharedObjectManager.getMusicSelectIndex();
			
			var _class : Class = ResourceManager.getInstance().getClassByNameFromDomain(Define.SWF_LOBBY,"ScrollHandlerAsset");
			if(_class==null){
				Log.getInstance().log(this,"ScrollHandlerAsset初始化异常...");
				return;
			}
			var _class2 : Class = ResourceManager.getInstance().getClassByNameFromDomain(Define.SWF_LOBBY,"Scroll_Line_Asset");
			if(_class2==null){
				Log.getInstance().log(this,"Scroll_Line_Asset初始化异常...");
				return;
			}
			var _class3 : Class = ResourceManager.getInstance().getClassByNameFromDomain(Define.SWF_PANEL,"ComboboxItemAsset_SystemSetting");
			if(_class3==null){
				Log.getInstance().log(this,"Scroll_Line_Asset初始化异常...");
				return;
			} 
			var _class4 : Class = ResourceManager.getInstance().getClassByNameFromDomain(Define.SWF_PANEL,"ComboboxAsset_SystemSetting");
			if(_class4==null){
				Log.getInstance().log(this,"Scroll_Line_Asset初始化异常...");
				return;
			} 
//			comboboxSound = new Combobox(_class4, _class, _class2, _class3);
//			m_mcAsset.addChild(comboboxSound);
//			comboboxSound.x = -65;
//			comboboxSound.y = 40;
//			comboboxSound.setData([Language.sSound_Chinese, Language.sSound_English]);
//			comboboxSound.setCurrentItem(comboboxSound.vecList[SharedObjectManager.getLanguageSound()]);
			
		
			//背景音樂 名稱
			var _aMusicName:Array = [Language.sBackground_Music_1,
									 Language.sBackground_Music_2,
									 Language.sBackground_Music_3];
			//背景音樂 key
			m_aMusicKey = [SoundPackage.sBackGround_Music_1,
							SoundPackage.sBackGround_Music_2,
							SoundPackage.sBackGround_Music_3];
								
			comboboxMusic = new Combobox(_class4, _class, _class2, _class3);
			m_mcAsset.addChild(comboboxMusic);
			comboboxMusic.x = -65;
			comboboxMusic.y = -37;
			comboboxMusic.setData(_aMusicName,m_aMusicKey);
			
			comboboxMusic.setCurrentItem(comboboxMusic.vecList[musicSelectIndex]);
			
			comboboxMusic.fSelectItem = function( _sKey:String ):void {
				musicSelectIndex = m_aMusicKey.indexOf(_sKey);
				if(musicSelectIndex==-1)musicSelectIndex=0;
				
				SoundManager.getInstance().soundPkg.getBackgroundMusic( _sKey , function( _snd:LiveSound ):void { 
					MusicManager.singleton.stop();
					if( _snd.bLoadComplete ){
						var _soundChannel:SoundChannel = _snd.sound.play(0,99999);
						MusicManager.singleton.setSoundData( _snd.sound , _soundChannel );
					}
				} );
			}
			
			comboboxLanguage = new Combobox(_class4, _class, _class2, _class3);
			m_mcAsset.addChild(comboboxLanguage);
			comboboxLanguage.x = -65;
			comboboxLanguage.y = -130;
			comboboxLanguage.setData([Language.sLanguage_CN, Language.sLanguage_TW, Language.sLanguage_EN]);
			comboboxLanguage.setCurrentItem(comboboxLanguage.vecList[LobbyManager.getInstance().lobbyAuth.Lang]);
			
			
			m_btnOk = new SingleButtonMC(m_mcAsset.mc_ok, function(event:MouseEvent):void{
				SoundManager.getInstance().play(SoundPackage.sClick_Tools);
				
				if(m_fOk!=null){
					m_fOk();
				}
				
//				SharedObjectManager.setLanguageSound(comboboxSound.currentItem.uIndex);
				
				SharedObjectManager.setMusicOnOff(onoffMusicGame.bStatus);
				SharedObjectManager.setEffectOnOff(onoffEffect.bStatus);
				SharedObjectManager.setLiveOnOff(onoffSoundLive.bStatus);
				
				SharedObjectManager.setMusicVolume(volumeMusicGame.nVolume);			
				SharedObjectManager.setEffectVolume(volumeEffect.nVolume);
				SharedObjectManager.setLiveVolume(volumeSoundLive.nVolume);
				SharedObjectManager.setMusicSelectIndex(musicSelectIndex);
				
				SharedObjectManager.flush();
				if(LobbyManager.getInstance().lobbyAuth.Lang!=comboboxLanguage.currentItem.uIndex){
					LobbyManager.getInstance().lobbyAuth.Lang = comboboxLanguage.currentItem.uIndex;
					LobbyManager.getInstance().changeLanguage(LobbyManager.getInstance().lobbyAuth.Lang);
				}
				if( LobbyManager.getInstance().videoMaxBytePerSecond ){
					LobbyManager.getInstance().videoMaxBytePerSecond.setVolume( volumeSoundLive.nVolume );
				}
				SoundData.getInstance().nLiveVolume = onoffSoundLive.volume;
				SoundData.getInstance().nMusicVolume = onoffMusicGame.volume;
				SoundData.getInstance().nSoundVolume = onoffEffect.volume;
				
				LobbyManager.getInstance().hideSystemSetting();
			});
			
			m_btnNo = new SingleButtonMC(m_mcAsset.mc_no, function(event:MouseEvent):void{
				SoundManager.getInstance().play(SoundPackage.sClick_Tools);
				LobbyManager.getInstance().hideSystemSetting();
			});
			m_btnClose = new SingleButtonMC(m_mcAsset.mc_close, function(event:MouseEvent):void{
				SoundManager.getInstance().play(SoundPackage.sClick_Tools);
				LobbyManager.getInstance().hideSystemSetting();
			});
			m_btnClose.enabled = false;
			
			onChangeLanguage();
			
			this.addEventListener(MouseEvent.CLICK,onclick);
		}
		
		protected function onclick(event:MouseEvent):void
		{
			// TODO Auto-generated method stub
			event.stopImmediatePropagation();
		}
		
		override public function destroy():void{
			
//			if(m_bg){
//				if(m_bg.parent){
//					m_bg.parent.removeChild(m_bg);
//				}
//				m_bg.dispose();
//				m_bg = null;
//			}
			
			this.removeEventListener(MouseEvent.CLICK,onclick);
			
			if(m_fOk != null){
				m_fOk = null;
			}
			
//			if(m_bg){
//				if(m_bg.parent){
//					m_bg.parent.removeChild(m_bg);
//				}
//				m_bg = null;
//			}
			
			if(volumeMusicGame){
				if(volumeMusicGame.parent){
					volumeMusicGame.parent.removeChild(volumeMusicGame);
				}
				volumeMusicGame.destroy();
				volumeMusicGame = null;
			}
			if(volumeEffect){
				if(volumeEffect.parent){
					volumeEffect.parent.removeChild(volumeEffect);
				}
				volumeEffect.destroy();
				volumeEffect = null;
			}
			if(volumeSoundLive){
				if(volumeSoundLive.parent){
					volumeSoundLive.parent.removeChild(volumeSoundLive);
				}
				volumeSoundLive.destroy();
				volumeSoundLive = null;
			}
			
			if(comboboxLanguage){
				if(comboboxLanguage.parent){
					comboboxLanguage.parent.removeChild(comboboxLanguage);
				}
				comboboxLanguage.destroy();
				comboboxLanguage = null;
			}
//			if(comboboxSound){
//				if(comboboxSound.parent){
//					comboboxSound.parent.removeChild(comboboxSound);
//				}
//				comboboxSound.destroy();
//				comboboxSound = null;
//			}
			if(comboboxMusic){
				if(comboboxMusic.parent){
					comboboxMusic.parent.removeChild(comboboxMusic);
				}
				comboboxMusic.destroy();
				comboboxMusic = null;
			}
//			if(onoffMusicLobby){
//				if(onoffMusicLobby.parent){
//					onoffMusicLobby.parent.removeChild(onoffMusicLobby);
//				}
//				onoffMusicLobby.destroy();
//				onoffMusicLobby = null;
//			}
			if(onoffMusicGame){
				if(onoffMusicGame.parent){
					onoffMusicGame.parent.removeChild(onoffMusicGame);
				}
				onoffMusicGame.destroy();
				onoffMusicGame = null;
			}
			if(onoffEffect){
				if(onoffEffect.parent){
					onoffEffect.parent.removeChild(onoffEffect);
				}
				onoffEffect.destroy();
				onoffEffect = null;
			}
			if(onoffSoundLive){
				if(onoffSoundLive.parent){
					onoffSoundLive.parent.removeChild(onoffSoundLive);
				}
				onoffSoundLive.destroy();
				onoffSoundLive = null;
			}
			
			
			if(m_btnOk){
				m_btnOk.destroy();
				m_btnOk = null;
			}
			if(m_btnNo){
				m_btnNo.destroy();
				m_btnNo = null;
			}
			
			if(m_mcAsset){
				this.removeChild(m_mcAsset);
				m_mcAsset = null;
			}
			
			super.destroy();
			
		}
		
		
		override public function onChangeLanguage():void{
//			(m_mcAsset.tf_label as TextField).text = LobbyManager.getInstance().getLanguageString(Language.sSystem_Setting);
			
			(m_mcAsset.mc_ok.mc_label as MovieClip).gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			(m_mcAsset.mc_no.mc_label as MovieClip).gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
			
			m_mcAsset.gotoAndStop(LobbyManager.getInstance().lobbyAuth.Lang+1);
//			(m_mcAsset.tf_0 as TextField).text = LobbyManager.getInstance().getLanguageString(Language.sLanguage_setting);
//			(m_mcAsset.tf_1 as TextField).text = LobbyManager.getInstance().getLanguageString(Language.sMusic_BG);
//			(m_mcAsset.tf_2 as TextField).text = LobbyManager.getInstance().getLanguageString(Language.sSound_Effect);
//			(m_mcAsset.tf_3 as TextField).text = LobbyManager.getInstance().getLanguageString(Language.sSound_Effect);
//			(m_mcAsset.tf_4 as TextField).text = LobbyManager.getInstance().getLanguageString(Language.sSound_Live);
			
			onoffMusicGame.onChangeLanguage();
			onoffEffect.onChangeLanguage();
			onoffSoundLive.onChangeLanguage();
			
			comboboxLanguage.onChangeLanguage();
//			comboboxSound.onChangeLanguage();
			comboboxMusic.onChangeLanguage();
		}
		
		public function defaultState():void{
			if(MusicManager.singleton.enabled != SharedObjectManager.getMusicOnOff()){
				MusicManager.singleton.enabled = SharedObjectManager.getMusicOnOff();
			}
			
			SoundManager.getInstance().soundEffectSwitch = SharedObjectManager.getEffectOnOff();
			LobbyManager.getInstance().bLiveStatus = SharedObjectManager.getLiveOnOff();
			
			MusicManager.singleton.nVolume = SharedObjectManager.getMusicVolume();
			SoundManager.getInstance().nVolume = SharedObjectManager.getEffectVolume();
			LobbyManager.getInstance().nLiveVolume = SharedObjectManager.getLiveVolume();
			
			var defaultMusicSelectIndex:int = SharedObjectManager.getMusicSelectIndex();
			if(defaultMusicSelectIndex!=musicSelectIndex)
			{
				SoundManager.getInstance().soundPkg.getBackgroundMusic( m_aMusicKey[defaultMusicSelectIndex] , function( _snd:LiveSound ):void 
				{ 
					MusicManager.singleton.stop();
					if( _snd.bLoadComplete ){
						var _soundChannel:SoundChannel = _snd.sound.play(0,99999);
						MusicManager.singleton.setSoundData( _snd.sound , _soundChannel );
					}
				} );
			}
		}
	}
}