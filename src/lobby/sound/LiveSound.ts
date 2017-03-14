module lobby.sound {
	export class LiveSound {
		public var sound				:	Sound;
		private var m_fLoadComplete		:	Function;
		private var m_fLoadError		:	Function;
		public var bLoadComplete		:	Boolean;
		private var url:String;
		private var loadStart:Number = 0;
		public constructor(_stream:URLRequest , _context:SoundLoaderContext , _fLoadComplete:Function = null , _fLoadError:Function = null ) { 
			url = _stream.url;
			loadStart = getTimer();
			sound = new Sound( _stream, _context );
			sound.addEventListener(IOErrorEvent.IO_ERROR , onIoError);
			sound.addEventListener( Event.COMPLETE , onSoundComplete);
			m_fLoadComplete = _fLoadComplete;
			m_fLoadError 	= _fLoadError;
		}
		protected function onSoundComplete(event:Event):void{
		//	trace("Load Sound Success");
			
//			Log.getInstance().log(this,"加载声音文件-->"+url+"--耗时-->"+(getTimer()-loadStart));
			sound.removeEventListener(IOErrorEvent.IO_ERROR , onIoError);
			sound.removeEventListener( Event.COMPLETE , onSoundComplete);
			bLoadComplete = true;
			if( m_fLoadComplete != null ){
				m_fLoadComplete(this);
			}
			
		}
		
		protected function onIoError(event:IOErrorEvent):void{
			trace("Load Sound Path Error::" + event.text );
			sound.removeEventListener(IOErrorEvent.IO_ERROR , onIoError);
			sound.removeEventListener( Event.COMPLETE , onSoundComplete);		
			bLoadComplete = false;
			if( m_fLoadError != null ){
				m_fLoadError(sound);
			}			
			
		}
		
		public function destroy():void {
			sound.removeEventListener(IOErrorEvent.IO_ERROR , onIoError);
			sound.removeEventListener( Event.COMPLETE , onSoundComplete);
			sound.close();
			sound = null;
			if( m_fLoadComplete != null ){
				m_fLoadComplete = null;
			}
			if( m_fLoadError != null ){
				m_fLoadError = null;
			}
			bLoadComplete = false;
		}
		
	}
}