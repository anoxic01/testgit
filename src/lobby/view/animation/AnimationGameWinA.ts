module lobby.view.animation {
	export class AnimationGameWinA extends BSprite{
		private var m_mcAsset	:	*;
		
		public constructor(_nValue:Number, _uCount:uint=1) {
			super();
			
			m_mcAsset = ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_WINA,"Game_Win_A_Asset");
			this.addChild(m_mcAsset);
			m_mcAsset.addFrameScript(m_mcAsset.totalFrames-1, stop);
			m_mcAsset.label.tf_label.text = _nValue.toString();
			m_mcAsset.mc_0.gotoAndStop(_uCount);
			
		}
		
		public function count(value:uint):void{
			m_mcAsset.mc_0.gotoAndStop(value);
		}
		
		override public function destroy():void{
			if(m_mcAsset){
				this.removeChild(m_mcAsset);
				m_mcAsset = null;
			}
		}
		public function set value(_nValue:Number):void{
			if(m_mcAsset){
				m_mcAsset.label.tf_label.text = _nValue.toString();
			}
		}
		public function play():void{
			if(m_mcAsset){
				m_mcAsset.visible = true;
				m_mcAsset.gotoAndPlay(1);
			}
		}
		public function stop():void{
			if(m_mcAsset){
				m_mcAsset.gotoAndStop(1);
				m_mcAsset.visible = false;
			}
		}
	}
}