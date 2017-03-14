module lobby.sound {
	export class SoundChannel_EX {
		public var soundChannel			:	SoundChannel;
		public var fPlayComplete		:	Function;

		public constructor(_soundChannel:SoundChannel , _fPlayComplete:Function ) {
			soundChannel = _soundChannel;
			fPlayComplete = _fPlayComplete;
		}
		public function destroy():void {
			if(soundChannel) {
				soundChannel.stop();
				soundChannel = null;
			}
			if( fPlayComplete != null ){
				fPlayComplete = null;
			}
		}
		
		public function end():void {
			if(soundChannel) {
				soundChannel.stop();
			}
			if( fPlayComplete != null ){
				fPlayComplete(soundChannel);
			}
		}
		public function stop():void {
			if(soundChannel) {
				soundChannel.stop();
			}
		}
		
	}
}