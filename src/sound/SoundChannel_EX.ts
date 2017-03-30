module sound {
	export class SoundChannel_EX {
		public soundChannel			:	SoundChannel;
		public fPlayComplete		:	Function;

		public constructor(_soundChannel:SoundChannel , _fPlayComplete:Function ) {
			soundChannel = _soundChannel;
			fPlayComplete = _fPlayComplete;
		}
		public destroy():void {
			if(soundChannel) {
				soundChannel.stop();
				soundChannel = null;
			}
			if( fPlayComplete != null ){
				fPlayComplete = null;
			}
		}
		
		public end():void {
			if(soundChannel) {
				soundChannel.stop();
			}
			if( fPlayComplete != null ){
				fPlayComplete(soundChannel);
			}
		}
		public stop():void {
			if(soundChannel) {
				soundChannel.stop();
			}
		}
		
	}
}