module lobby.view.windows {
	export class MsgQueue {
		protected   m_vecMsg		:		<MsgData>;
		protected   m_window		:		MessageWindow;
		protected   m_timer			:		JTimer;
		public constructor(_window:MessageWindow) {
		m_vecMsg   = new <MsgData>();
			m_window   = _window;
			m_timer    = JTimer.getTimer(1000);//new Timer(1000);
			m_timer.addTimerCallback(onTimer);
			//m_timer.addEventListener(TimerEvent.TIMER , onTimer );
			m_timer.start();
		}
		
		protected onTimer():void {
			if( m_vecMsg.length > 0 ){
				var _msgData:MsgData = m_vecMsg.shift();
			
					m_window.show( _msgData.sMsg , _msgData.keep );
				
			}
			else if( m_vecMsg.length == 0){
				m_timer.stop();
			}
		}
		
		public show( _sMsg:string , _bKeep: boolean =false  ):void {
			var _msgData:MsgData = new MsgData();
			if( _sMsg != null && _sMsg != '') {
				_msgData.sMsg = _sMsg;
				_msgData.keep = _bKeep;
				m_vecMsg.push( _msgData );
				if( !m_timer.running ){
					m_timer.start();
				}		
			}
		}
		
		public destroy():void{
			m_window=null;
			m_vecMsg=null;
			if(m_timer){
				//m_timer.stop();
				//m_timer.removeEventListener(TimerEvent.TIMER , onTimer );
				m_timer.dispose();
				m_timer= null;
			}
		}
		
		
		
	}

}
class MsgData {
	public sMsg:string;
	public keep: boolean;
	public MsgData():void {
		
	}
	
}