module lobby.model.struct {
	export class SoundStruct {
		
		public var key:String;
		public var loop:int;
		public var lowerVolume:Boolean = false;
		public var fSoundLoadComplete:Function;
		public var fPlayComplete:Function;

		public constructor() {
		}
	}
}