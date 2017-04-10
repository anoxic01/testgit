module lobby.view.windows {
	export class MsgQueue {
		protected   m_vecMsg		:		MsgData[];
		protected   m_window		:		MessageWindow;
		protected   m_timer			:		timers.JTimer;
		public constructor(_window:MessageWindow) {
			this.m_vecMsg   = new Array<MsgData>();
			this.m_window   = _window;
			this.m_timer    = timers.JTimer.getTimer(1000);//new Timer(1000);
			this.m_timer.addTimerCallback(this.onTimer);
			//m_timer.addEventListener(TimerEvent.TIMER , onTimer );
			this.m_timer.start();
		}
		
		protected onTimer():void {
			if( this.m_vecMsg.length > 0 ){
				var _msgData:MsgData = this.m_vecMsg.shift();
			
					this.m_window.show( _msgData.sMsg , _msgData.keep );
				
			}
			else if( this.m_vecMsg.length == 0){
				this.m_timer.stop();
			}
		}
		
		public show( _sMsg:string , _bKeep: boolean =false  ):void {
			var _msgData:MsgData = new MsgData();
			if( _sMsg != null && _sMsg != '') {
				_msgData.sMsg = _sMsg;
				_msgData.keep = _bKeep;
				this.m_vecMsg.push( _msgData );
				if( !this.m_timer.running ){
					this.m_timer.start();
				}		
			}
		}
		
		public destroy():void{
			this.m_window=null;
			this.m_vecMsg=null;
			if(this.m_timer){
				//m_timer.stop();
				//m_timer.removeEventListener(TimerEvent.TIMER , onTimer );
				this.m_timer.dispose();
				this.m_timer= null;
			}
		}
		
		
		
	}

	export class MsgData {
		public sMsg:string;
		public keep: boolean;
		public MsgData():void {
			
		}
		
	}
}
