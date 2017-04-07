module lobby.view.other {
	export class OnOff extends BSprite{
		private m_mcAsset;

		get volumeBar():VolumeBar
		{
			return this.m_volumeBar;
		}

		set  volumeBar(value:VolumeBar)
		{
			this.m_volumeBar = value;
			if(this.m_volumeBar){
				if(this.bStatus){
					this.m_volumeBar.enable = true;
				}else{
					this.m_volumeBar.enable = false;
				}
			}
		}

		private m_fOn		:	Function;
		private m_fOff		:	Function;
		private m_iType		:	number;
		public bStatus		:	boolean;
		private m_volumeBar	:	VolumeBar;
		private m_nVolume	:	number;
		
		public constructor(_iType:number) {
			super();
			this.m_iType = _iType;
			
			this.m_mcAsset = manager.ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_PANEL,"On_off_Asset");
			this.addChild(this.m_mcAsset);
			
			this.m_mcAsset.mc_0.gotoAndStop(1);
			this.m_mcAsset.mc_1.touchChildren = false;
			
			switch(this.m_iType){
				case define.Define.MUSIC:
					this.m_nVolume = manager.SharedObjectManager.getMusicVolume();
					this.bStatus = manager.SharedObjectManager.getMusicOnOff();
					break;
				case define.Define.EFFECT:
					this.m_nVolume = manager.SharedObjectManager.getEffectVolume();
					this.bStatus = manager.SharedObjectManager.getEffectOnOff();
					break;
				case define.Define.LIVE:
					this.m_nVolume = manager.SharedObjectManager.getLiveVolume();
					this.bStatus = manager.SharedObjectManager.getLiveOnOff();
					break;
			}

			if(this.bStatus){
				this.m_mcAsset.mc_0.x = 38;
				this.m_mcAsset.mc_1.gotoAndStop(2);
			}else{
				this.m_mcAsset.mc_0.x = 0;
				this.m_mcAsset.mc_1.gotoAndStop(1);
			}
			
			this.touchEnabled = true;
			this.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.out, this);
			this.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.over, this);
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.change, this);
		}
		 public destroy():void{
			this.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.out, this);
			this.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.over, this);
			this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.change, this);
			
			if(this.m_fOn != null){
				this.m_fOn = null;
			}
			
			if(this.m_fOff != null){
				this.m_fOff = null;
			}
			
			if(this.m_mcAsset){
				this.removeChild(this.m_mcAsset);
				this.m_mcAsset = null;
			}
			
			if(this.volumeBar){
				this.volumeBar = null;
			}
		}
		

		
		public on():void{
			if(this.bStatus){
				return;
			}
			this.m_mcAsset.mc_0.x = 38;
			this.m_mcAsset.mc_1.gotoAndStop(2);
			this.bStatus = true;
			this.volumeBar.setvolume(this.m_nVolume==0?0.6:this.m_nVolume);
			this.volumeBar.enable = true;
		}
		
		public off():void{
			if(this.bStatus){
				this.m_mcAsset.mc_0.x = 0;
				this.m_mcAsset.mc_1.gotoAndStop(1);
				this.bStatus = false;
				this.m_nVolume = this.volumeBar.nVolume;
				this.volumeBar.setvolume(0);
				this.volumeBar.enable = false;
			}
			
		}
		
		public on_off():void{
			if(this.bStatus){
				this.off();
			}else{
				this.on();
			}
			
		}
		
		protected change(event:MouseEvent):void
		{
			manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
			
			this.on_off();
			switch(this.m_iType){
				case define.Define.MUSIC:
					manager.MusicManager.singleton.enabled = this.bStatus;
					break;
				case define.Define.EFFECT:
					manager.SoundManager.getInstance().soundEffectSwitch = this.bStatus;
					break;
				case define.Define.LIVE:
					manager.LobbyManager.getInstance().bLiveStatus = this.bStatus;
					break;
			}
			this.onChangeLanguage();
		}
		
		protected out(event:MouseEvent):void
		{
			this.m_mcAsset.mc_0.gotoAndStop(1);
		}
		
		protected over(event:MouseEvent):void
		{
			this.m_mcAsset.mc_0.gotoAndStop(2);
		}
		
		 public onChangeLanguage():void{
			this.m_mcAsset.mc_1.tf_label.text = manager.LobbyManager.getInstance().getLanguageString(this.bStatus?language.Language.sOn:language.Language.sOff);
		}
		
		get volume():number {
			return this.m_nVolume;
		}
		set  volume(_nValue:number) {
			this.m_nVolume = _nValue;
		}
	}
}