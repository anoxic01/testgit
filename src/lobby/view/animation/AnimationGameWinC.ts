module lobby.view.animation {
	export class AnimationGameWinC extends BSprite{
		private m_mcAsset	:	*;
		
		public constructor() {
			super();
			
			m_mcAsset = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_WIN,"Game_Win_Asset");
			this.addChild(m_mcAsset);
			m_mcAsset.addFrameScript(m_mcAsset.totalFrames-1, stop);
			m_mcAsset.mc_label.tf_label.text = _nValue.toString();
			
		}
		
		 public destroy():void{
			if(m_mcAsset){
				this.removeChild(m_mcAsset);
				m_mcAsset = null;
			}
		}
		set  value(_nValue:Number){
			if(m_mcAsset){
				m_mcAsset.mc_label.tf_label.text = _nValue.toString();
			}
		}
		public play():void{
			if(m_mcAsset){
				m_mcAsset.visible = true;
				m_mcAsset.gotoAndPlay(1);
			}
		}
		public stop():void{
			if(m_mcAsset){
				m_mcAsset.gotoAndStop(1);
				m_mcAsset.visible = false;
			}
		}	
	}
}