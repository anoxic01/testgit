module lobby.view.other {
	export class OnOff extends BSprite{
		private m_mcAsset	:	*;

		get volumeBar():VolumeBar
		{
			return m_volumeBar;
		}

		set  volumeBar(value:VolumeBar)
		{
			m_volumeBar = value;
			if(m_volumeBar){
				if(bStatus){
					m_volumeBar.enable = true;
				}else{
					m_volumeBar.enable = false;
				}
			}
		}

		private m_fOn		:	Function;
		private m_fOff		:	Function;
		private m_iType		:	number;
		public bStatus		:	 boolean;
		private m_volumeBar	:	VolumeBar;
		private m_nVolume	:	Number;
		
		public constructor(_iType:number) {
			super();
			m_iType = _iType;
			
			m_mcAsset = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_PANEL,"On_off_Asset");
			this.addChild(m_mcAsset);
			
			m_mcAsset.mc_0.gotoAndStop(1);
			m_mcAsset.mc_1.mouseChildren = false;
			
			switch(m_iType){
				case Define.MUSIC:
					m_nVolume = SharedObjectManager.getMusicVolume();
					bStatus = SharedObjectManager.getMusicOnOff();
					break;
				case Define.EFFECT:
					m_nVolume = SharedObjectManager.getEffectVolume();
					bStatus = SharedObjectManager.getEffectOnOff();
					break;
				case Define.LIVE:
					m_nVolume = SharedObjectManager.getLiveVolume();
					bStatus = SharedObjectManager.getLiveOnOff();
					break;
			}

			if(bStatus){
				m_mcAsset.mc_0.x = 38;
				m_mcAsset.mc_1.gotoAndStop(2);
			}else{
				m_mcAsset.mc_0.x = 0;
				m_mcAsset.mc_1.gotoAndStop(1);
			}
			
			this.buttonMode = true;
			this.addEventListener(mouse.MouseEvent.MOUSE_OUT, out);
			this.addEventListener(mouse.MouseEvent.MOUSE_OVER, over);
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, change);
		}
		 public destroy():void{
			this.removeEventListener(mouse.MouseEvent.MOUSE_OUT, out);
			this.removeEventListener(mouse.MouseEvent.MOUSE_OVER, over);
			this.removeEventListener(egret.TouchEvent.TOUCH_TAP, change);
			
			if(m_fOn != null){
				m_fOn = null;
			}
			
			if(m_fOff != null){
				m_fOff = null;
			}
			
			if(m_mcAsset){
				this.removeChild(m_mcAsset);
				m_mcAsset = null;
			}
			
			if(volumeBar){
				volumeBar = null;
			}
		}
		

		
		public on():void{
			if(bStatus){
				return;
			}
			m_mcAsset.mc_0.x = 38;
			m_mcAsset.mc_1.gotoAndStop(2);
			bStatus = true;
			volumeBar.setvolume(m_nVolume==0?0.6:m_nVolume);
			volumeBar.enable = true;
		}
		
		public off():void{
			if(bStatus){
				m_mcAsset.mc_0.x = 0;
				m_mcAsset.mc_1.gotoAndStop(1);
				bStatus = false;
				m_nVolume = volumeBar.nVolume;
				volumeBar.setvolume(0);
				volumeBar.enable = false;
			}
			
		}
		
		public on_off():void{
			if(bStatus){
				off();
			}else{
				on();
			}
			
		}
		
		protected change(event:MouseEvent):void
		{
			SoundManager.getInstance().play(SoundPackage.sClick_Tools);
			
			on_off();
			switch(m_iType){
				case Define.MUSIC:
					MusicManager.singleton.enabled = bStatus;
					break;
				case Define.EFFECT:
					SoundManager.getInstance().soundEffectSwitch = bStatus;
					break;
				case Define.LIVE:
					LobbyManager.getInstance().bLiveStatus = bStatus;
					break;
			}
			onChangeLanguage();
		}
		
		protected out(event:MouseEvent):void
		{
			m_mcAsset.mc_0.gotoAndStop(1);
		}
		
		protected over(event:MouseEvent):void
		{
			m_mcAsset.mc_0.gotoAndStop(2);
		}
		
		 public onChangeLanguage():void{
			m_mcAsset.mc_1.tf_label.text = LobbyManager.getInstance().getLanguageString(bStatus?Language.sOn:Language.sOff);
		}
		
		get volume():Number {
			return m_nVolume;
		}
		set  volume(_nValue:Number) {
			m_nVolume = _nValue;
		}
	}
}