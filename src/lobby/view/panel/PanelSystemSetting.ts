module lobby.view.panel {
	export class PanelSystemSetting extends PanelWindow{
//		private m_bg							:	BitmapScale9Grid;
//		private m_bg							:	Sprite;
		
		private m_btnOk							:	ui.button.SingleButtonMC;
		private m_btnNo							:	ui.button.SingleButtonMC;
		
		public volumeMusicGame					;					//音乐音量
		public volumeEffect						;					//音效音量
		public volumeSoundLive					;					//现场音量
		
		public comboboxLanguage					;					//语言选择
		public comboboxMusic					;					//背景音乐
//		public comboboxSound					:	Combobox;					//声音选择
		
//		public onoffMusicLobby					:	OnOff;						//大厅音乐
		public onoffMusicGame					;						//游戏音乐
		public onoffEffect						;						//游戏音效
		public onoffSoundLive					;						//现场声音
		
		private m_fOk							:	Function;
		
		private m_aMusicKey:any[];
		private musicSelectIndex:number= 0;
		
		public constructor($bShake: boolean=false, _fOk:Function=null) {
		
			super($bShake);
			
			this.m_fOk = _fOk;
			
			this.m_mcAsset = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_PANEL,"Setting_Asset");
			this.addChild(this.m_mcAsset);
			
//			m_bg = new BitmapScale9Grid(new Window_Bg_Asset(), 1, 12, 24, 12, 30);
//			this.m_mcAsset.addChildAt(m_bg,0);
//			m_bg.setSize(342, 390);
//			m_bg.x = -171;
//			m_bg.y = -191;
//			m_bg = new Sprite();
//			m_bg.graphics.beginFill(0x000000,0.5);
//			m_bg.graphics.drawRect(0,0,330,300);
//			m_bg.graphics.endFill();
//			this.m_mcAsset.mc_0.addChild(m_bg);
			
			this.m_mcHot = this.m_mcAsset.mc_hot;
			
//			this.m_mcAsset.mc_ok.y = 352;
//			this.m_mcAsset.mc_no.y = 352;
			
			this.nAssetWidth = 342;
			this.nAssetHeight = 426;
			
//			this.m_mcAsset.x = -int(this.m_mcAsset.width*0.5);
//			this.m_mcAsset.y = -int(this.m_mcAsset.height*0.5);
			
//			onoffMusicLobby = new OnOff();
//			this.m_mcAsset.addChild(onoffMusicLobby);
//			onoffMusicLobby.x = this.m_mcAsset.tf_1.x + this.m_mcAsset.tf_1.width + 20;
//			onoffMusicLobby.y = this.m_mcAsset.tf_1.y;
			
			this.onoffMusicGame = new other.OnOff(define.Define.MUSIC);
			this.m_mcAsset.addChild(this.onoffMusicGame);
			this.onoffMusicGame.x = -49;
			this.onoffMusicGame.y = -71;
			
			this.onoffEffect = new other.OnOff(define.Define.EFFECT);
			this.m_mcAsset.addChild(this.onoffEffect);
			this.onoffEffect.x = -49;
			this.onoffEffect.y = 28;
			
			this.onoffSoundLive = new other.OnOff(define.Define.LIVE);
			this.m_mcAsset.addChild(this.onoffSoundLive);
			this.onoffSoundLive.x = -49;
			this.onoffSoundLive.y = 104;
			
			this.volumeMusicGame = new other.VolumeBar(define.Define.MUSIC);
			this.m_mcAsset.addChild(this.volumeMusicGame);
			this.volumeMusicGame.x = 23;
			this.volumeMusicGame.y = -65;
			this.volumeMusicGame.setvolume(this.onoffMusicGame.bStatus?manager.SharedObjectManager.getMusicVolume():0);
			this.onoffMusicGame.volumeBar = this.volumeMusicGame;
			this.volumeMusicGame.on_off = this.onoffMusicGame;
			
			this.volumeEffect = new other.VolumeBar(define.Define.EFFECT);
			this.m_mcAsset.addChild(this.volumeEffect);
			this.volumeEffect.x = 23;
			this.volumeEffect.y = 36;
			this.volumeEffect.setvolume(this.onoffEffect.bStatus?manager.SharedObjectManager.getEffectVolume():0);
			this.onoffEffect.volumeBar = this.volumeEffect;
			this.volumeEffect.on_off	  = this.onoffEffect;
			
			this.volumeSoundLive = new other.VolumeBar(define.Define.LIVE);
			this.m_mcAsset.addChild(this.volumeSoundLive);
			this.volumeSoundLive.x = 23;
			this.volumeSoundLive.y = 110;
			this.volumeSoundLive.setvolume(this.onoffSoundLive.bStatus?manager.SharedObjectManager.getLiveVolume():0);
			this.onoffSoundLive.volumeBar = this.volumeSoundLive;
			this.volumeSoundLive.on_off   = this.onoffSoundLive;
			
			this.musicSelectIndex = manager.SharedObjectManager.getMusicSelectIndex();
			
			var _class  = manager.ResourceManager.getInstance().getClassByNameFromDomain(define.Define.SWF_LOBBY,"ScrollHandlerAsset");
			if(_class==null){
				console.log(this,"ScrollHandlerAsset初始化异常...");
				return;
			}
			var _class2  = manager.ResourceManager.getInstance().getClassByNameFromDomain(define.Define.SWF_LOBBY,"Scroll_Line_Asset");
			if(_class2==null){
				console.log(this,"Scroll_Line_Asset初始化异常...");
				return;
			}
			var _class3  = manager.ResourceManager.getInstance().getClassByNameFromDomain(define.Define.SWF_PANEL,"ComboboxItemAsset_SystemSetting");
			if(_class3==null){
				console.log(this,"Scroll_Line_Asset初始化异常...");
				return;
			} 
			var _class4  = manager.ResourceManager.getInstance().getClassByNameFromDomain(define.Define.SWF_PANEL,"ComboboxAsset_SystemSetting");
			if(_class4==null){
				console.log(this,"Scroll_Line_Asset初始化异常...");
				return;
			} 
//			comboboxSound = new Combobox(_class4, _class, _class2, _class3);
//			this.m_mcAsset.addChild(comboboxSound);
//			comboboxSound.x = -65;
//			comboboxSound.y = 40;
//			comboboxSound.setData([language.Language.sSound_Chinese, language.Language.sSound_English]);
//			comboboxSound.setCurrentItem(comboboxSound.vecList[manager.SharedObjectManager.getLanguageSound()]);
			
		
			//背景音樂 名稱
			var _aMusicName:any[] = [language.Language.sBackground_Music_1,
									 language.Language.sBackground_Music_2,
									 language.Language.sBackground_Music_3];
			//背景音樂 key
			this.m_aMusicKey = [sound.SoundPackage.sBackGround_Music_1,
							sound.SoundPackage.sBackGround_Music_2,
							sound.SoundPackage.sBackGround_Music_3];
								
			this.comboboxMusic = new ui.Combobox(_class4, _class, _class2, _class3);
			this.m_mcAsset.addChild(this.comboboxMusic);
			this.comboboxMusic.x = -65;
			this.comboboxMusic.y = -37;
			this.comboboxMusic.setData(_aMusicName,this.m_aMusicKey);
			
			this.comboboxMusic.setCurrentItem(this.comboboxMusic.vecList[this.musicSelectIndex]);
			
			this.comboboxMusic.fSelectItem = function( _sKey:String ):void {
				this.musicSelectIndex = this.m_aMusicKey.indexOf(_sKey);
				if(this.musicSelectIndex==-1)this.musicSelectIndex=0;
				
				manager.SoundManager.getInstance().soundPkg.getBackgroundMusic( _sKey , function( _snd ):void { 
					manager.MusicManager.singleton.stop();
					if( _snd.bLoadComplete ){
						var _soundChannel = _snd.sound.play(0,99999);
						manager.MusicManager.singleton.setSoundData( _snd.sound , _soundChannel );
					}
				} );
			}
			
			this.comboboxLanguage = new ui.Combobox(_class4, _class, _class2, _class3);
			this.m_mcAsset.addChild(this.comboboxLanguage);
			this.comboboxLanguage.x = -65;
			this.comboboxLanguage.y = -130;
			this.comboboxLanguage.setData([language.Language.sLanguage_CN, language.Language.sLanguage_TW, language.Language.sLanguage_EN]);
			this.comboboxLanguage.setCurrentItem(this.comboboxLanguage.vecList[manager.LobbyManager.getInstance().lobbyAuth.Lang]);
			
			
			this.m_btnOk = new ui.button.SingleButtonMC(this.m_mcAsset.mc_ok, function(event:MouseEvent):void{
				manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
				
				if(this.m_fOk!=null){
					this.m_fOk();
				}
				
//				manager.SharedObjectManager.setLanguageSound(comboboxSound.currentItem.uIndex);
				
				manager.SharedObjectManager.setMusicOnOff(this.onoffMusicGame.bStatus);
				manager.SharedObjectManager.setEffectOnOff(this.onoffEffect.bStatus);
				manager.SharedObjectManager.setLiveOnOff(this.onoffSoundLive.bStatus);
				
				manager.SharedObjectManager.setMusicVolume(this.volumeMusicGame.nVolume);			
				manager.SharedObjectManager.setEffectVolume(this.volumeEffect.nVolume);
				manager.SharedObjectManager.setLiveVolume(this.volumeSoundLive.nVolume);
				manager.SharedObjectManager.setMusicSelectIndex(this.musicSelectIndex);
				
				manager.SharedObjectManager.flush();
				if(manager.LobbyManager.getInstance().lobbyAuth.Lang!=this.comboboxLanguage.currentItem.uIndex){
					manager.LobbyManager.getInstance().lobbyAuth.Lang = this.comboboxLanguage.currentItem.uIndex;
					manager.LobbyManager.getInstance().changeLanguage(manager.LobbyManager.getInstance().lobbyAuth.Lang);
				}
				if( manager.LobbyManager.getInstance().videoMaxBytePerSecond ){
					manager.LobbyManager.getInstance().videoMaxBytePerSecond.setVolume( this.volumeSoundLive.nVolume );
				}
				sound.SoundData.getInstance().nLiveVolume = this.onoffSoundLive.volume;
				sound.SoundData.getInstance().nMusicVolume = this.onoffMusicGame.volume;
				sound.SoundData.getInstance().nSoundVolume = this.onoffEffect.volume;
				
				manager.LobbyManager.getInstance().hideSystemSetting();
			});
			
			this.m_btnNo = new ui.button.SingleButtonMC(this.m_mcAsset.mc_no, function(event:MouseEvent):void{
				manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
				manager.LobbyManager.getInstance().hideSystemSetting();
			});
			this.m_btnClose = new ui.button.SingleButtonMC(this.m_mcAsset.mc_close, function(event:MouseEvent):void{
				manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
				manager.LobbyManager.getInstance().hideSystemSetting();
			});
			this.m_btnClose.enabled = false;
			
			this.onChangeLanguage();
			
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick, this);
		}
		
		protected onclick(event:MouseEvent):void
		{
			// TODO Auto-generated method stub
			event.stopImmediatePropagation();
		}
		
		 public destroy():void{
			
//			if(m_bg){
//				if(m_bg.parent){
//					m_bg.parent.removeChild(m_bg);
//				}
//				m_bg.dispose();
//				m_bg = null;
//			}
			
			this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick, this);
			
			if(this.m_fOk != null){
				this.m_fOk = null;
			}
			
//			if(m_bg){
//				if(m_bg.parent){
//					m_bg.parent.removeChild(m_bg);
//				}
//				m_bg = null;
//			}
			
			if(this.volumeMusicGame){
				if(this.volumeMusicGame.parent){
					this.volumeMusicGame.parent.removeChild(this.volumeMusicGame);
				}
				this.volumeMusicGame.destroy();
				this.volumeMusicGame = null;
			}
			if(this.volumeEffect){
				if(this.volumeEffect.parent){
					this.volumeEffect.parent.removeChild(this.volumeEffect);
				}
				this.volumeEffect.destroy();
				this.volumeEffect = null;
			}
			if(this.volumeSoundLive){
				if(this.volumeSoundLive.parent){
					this.volumeSoundLive.parent.removeChild(this.volumeSoundLive);
				}
				this.volumeSoundLive.destroy();
				this.volumeSoundLive = null;
			}
			
			if(this.comboboxLanguage){
				if(this.comboboxLanguage.parent){
					this.comboboxLanguage.parent.removeChild(this.comboboxLanguage);
				}
				this.comboboxLanguage.destroy();
				this.comboboxLanguage = null;
			}
//			if(comboboxSound){
//				if(comboboxSound.parent){
//					comboboxSound.parent.removeChild(comboboxSound);
//				}
//				comboboxSound.destroy();
//				comboboxSound = null;
//			}
			if(this.comboboxMusic){
				if(this.comboboxMusic.parent){
					this.comboboxMusic.parent.removeChild(this.comboboxMusic);
				}
				this.comboboxMusic.destroy();
				this.comboboxMusic = null;
			}
//			if(onoffMusicLobby){
//				if(onoffMusicLobby.parent){
//					onoffMusicLobby.parent.removeChild(onoffMusicLobby);
//				}
//				onoffMusicLobby.destroy();
//				onoffMusicLobby = null;
//			}
			if(this.onoffMusicGame){
				if(this.onoffMusicGame.parent){
					this.onoffMusicGame.parent.removeChild(this.onoffMusicGame);
				}
				this.onoffMusicGame.destroy();
				this.onoffMusicGame = null;
			}
			if(this.onoffEffect){
				if(this.onoffEffect.parent){
					this.onoffEffect.parent.removeChild(this.onoffEffect);
				}
				this.onoffEffect.destroy();
				this.onoffEffect = null;
			}
			if(this.onoffSoundLive){
				if(this.onoffSoundLive.parent){
					this.onoffSoundLive.parent.removeChild(this.onoffSoundLive);
				}
				this.onoffSoundLive.destroy();
				this.onoffSoundLive = null;
			}
			
			
			if(this.m_btnOk){
				this.m_btnOk.destroy();
				this.m_btnOk = null;
			}
			if(this.m_btnNo){
				this.m_btnNo.destroy();
				this.m_btnNo = null;
			}
			
			if(this.m_mcAsset){
				this.removeChild(this.m_mcAsset);
				this.m_mcAsset = null;
			}
			
			super.destroy();
			
		}
		
		
		 public onChangeLanguage():void{
//			(this.m_mcAsset.tf_label as TextField).text = manager.LobbyManager.getInstance().getLanguageString(language.Language.sSystem_Setting);
			
			(this.m_mcAsset.mc_ok.mc_label ).gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			(this.m_mcAsset.mc_no.mc_label ).gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
			
			this.m_mcAsset.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
//			(this.m_mcAsset.tf_0 as TextField).text = manager.LobbyManager.getInstance().getLanguageString(language.Language.sLanguage_setting);
//			(this.m_mcAsset.tf_1 as TextField).text = manager.LobbyManager.getInstance().getLanguageString(language.Language.sMusic_BG);
//			(this.m_mcAsset.tf_2 as TextField).text = manager.LobbyManager.getInstance().getLanguageString(language.Language.sSound_Effect);
//			(this.m_mcAsset.tf_3 as TextField).text = manager.LobbyManager.getInstance().getLanguageString(language.Language.sSound_Effect);
//			(this.m_mcAsset.tf_4 as TextField).text = manager.LobbyManager.getInstance().getLanguageString(language.Language.sSound_Live);
			
			this.onoffMusicGame.onChangeLanguage();
			this.onoffEffect.onChangeLanguage();
			this.onoffSoundLive.onChangeLanguage();
			
			this.comboboxLanguage.onChangeLanguage();
//			comboboxSound.onChangeLanguage();
			this.comboboxMusic.onChangeLanguage();
		}
		
		public defaultState():void{
			if(manager.MusicManager.singleton.enabled != manager.SharedObjectManager.getMusicOnOff()){
				manager.MusicManager.singleton.enabled = manager.SharedObjectManager.getMusicOnOff();
			}
			
			manager.SoundManager.getInstance().soundEffectSwitch = manager.SharedObjectManager.getEffectOnOff();
			manager.LobbyManager.getInstance().bLiveStatus = manager.SharedObjectManager.getLiveOnOff();
			
			manager.MusicManager.singleton.nVolume = manager.SharedObjectManager.getMusicVolume();
			manager.SoundManager.getInstance().nVolume = manager.SharedObjectManager.getEffectVolume();
			manager.LobbyManager.getInstance().nLiveVolume = manager.SharedObjectManager.getLiveVolume();
			
			var defaultMusicSelectIndex:number= manager.SharedObjectManager.getMusicSelectIndex();
			if(defaultMusicSelectIndex!=this.musicSelectIndex)
			{
				manager.SoundManager.getInstance().soundPkg.getBackgroundMusic( this.m_aMusicKey[defaultMusicSelectIndex] , function( _snd ):void 
				{ 
					manager.MusicManager.singleton.stop();
					if( _snd.bLoadComplete ){
						var _soundChannel = _snd.sound.play(0,99999);
						manager.MusicManager.singleton.setSoundData( _snd.sound , _soundChannel );
					}
				} );
			}
		}
	}
}