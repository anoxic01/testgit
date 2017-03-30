module lobby.view.other {
	export class VolumeBar extends BSprite{
		private m_mcAsset			:	*;
		private m_bar				:	MovieClip;
		private m_rec				:	Rectangle;
		private m_bDown				:	 boolean;
		private m_nVolume			:	Number;
		private m_iType				:	number;
		private m_on_off			:	OnOff;
		
		public constructor(_iType:number) {
			super();
			m_iType = _iType;
			
			m_mcAsset = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_PANEL,"VolumeLineAsset");
			this.addChild(m_mcAsset);
			
			m_rec = new Rectangle(0,5,105, 0);
			
			m_bar = m_mcAsset.mc_bar;
			m_bar.gotoAndStop(1);
			
			m_mcAsset.mc_value.mask = m_bar.mc_mask;
			
			m_bar.buttonMode = true;
			
			
			switch(m_iType){
				case Define.MUSIC:
					setvolume(SharedObjectManager.getMusicVolume());
					break;
				case Define.EFFECT:
					setvolume(SharedObjectManager.getEffectVolume());
					break;
				case Define.LIVE:
					setvolume(SharedObjectManager.getLiveVolume());				
					break;
			}
			
			m_bar.addEventListener(MouseEvent.MOUSE_OVER, over);
			m_bar.addEventListener(MouseEvent.MOUSE_OUT, out);
			m_bar.addEventListener(MouseEvent.MOUSE_DOWN, down);
			LobbyManager.getInstance().stage.addEventListener(MouseEvent.MOUSE_UP, up);
		}
		get nVolume():Number
		{
			return m_nVolume;
		}

		set  nVolume(value:Number)
		{
			m_nVolume = value;
		}

		 public destroy():void{
			m_bar.removeEventListener(MouseEvent.MOUSE_OVER, over);
			m_bar.removeEventListener(MouseEvent.MOUSE_OUT, out);
			m_bar.removeEventListener(MouseEvent.MOUSE_DOWN, down);
			LobbyManager.getInstance().stage.removeEventListener(MouseEvent.MOUSE_UP, up);
			
			if(m_mcAsset){
				this.removeChild(m_mcAsset);
				m_mcAsset = null;
			}
		}
		
		public setvolume(_nValue:Number ):void{
			nVolume = _nValue;	
			var _nX:Number = (_nValue*105);
			
			if( _nX > 105 ){
				_nX = 105;
			}
			else if( _nX < 0 ){
				_nX = 0;
			}
			
			m_bar.x = _nX;
			
			switch(m_iType){
				case Define.MUSIC:
					MusicManager.singleton.nVolume = nVolume;
					break;
				case Define.EFFECT:
					SoundManager.getInstance().nVolume = nVolume;
					break;
				case Define.LIVE:
					LobbyManager.getInstance().nLiveVolume = nVolume;
					break;
			}			
		}		
		
		
		protected over(event:MouseEvent):void
		{
			m_bar.gotoAndStop(2);
		}
		
		protected out(event:MouseEvent):void
		{
			if(m_bDown){
				return;
			}
			m_bar.gotoAndStop(1);
		}
		
		protected down(event:MouseEvent):void
		{
			m_bDown = true;
			m_bar.gotoAndStop(3);
			m_bar.startDrag(false, m_rec);
		}
		
		protected up(event:MouseEvent):void
		{
			if(m_bDown){
				m_bDown = false;
				m_bar.gotoAndStop(1);
				m_bar.stopDrag();
				
				switch(m_iType){
					case Define.MUSIC:
						setvolume(m_bar.x/m_rec.width);
						break;
					case Define.EFFECT:
						setvolume(m_bar.x/m_rec.width);
						break;
					case Define.LIVE:
						setvolume(m_bar.x/m_rec.width);
						break;
				}
			}
		}
		
		set  on_off( _on_off:OnOff ) {
			m_on_off = _on_off;
			
			switch(m_iType){
				case Define.MUSIC:
					if( SoundData.getInstance().nMusicVolume != -1 )
						m_on_off.volume = SoundData.getInstance().nMusicVolume;
					break;
				case Define.EFFECT:
					if( SoundData.getInstance().nSoundVolume != -1 )
						m_on_off.volume = SoundData.getInstance().nSoundVolume;
					break;
				case Define.LIVE:
					if( SoundData.getInstance().nLiveVolume != -1 )
						m_on_off.volume = SoundData.getInstance().nLiveVolume;
					break;
			}	
		}
		
		set  enable(_bValue: boolean){
			m_bar.mouseEnabled = _bValue;
			m_bar.mouseChildren = _bValue;
		}

	}
}