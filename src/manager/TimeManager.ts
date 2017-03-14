module manager {
	export class TimeManager {
		
		private static var m_instance	:	TimeManager;
		
		private var m_dicTimer			:	Dictionary 	=	new Dictionary();
		private var m_dicCallBack		:	Dictionary 	=	new Dictionary();
		private var m_vecFunc			:	Vector.<FStruct> = new Vector.<FStruct>;
		private var m_timer				:	JTimer;
		private var m_interval			:	Number = 1000;
		
		public const  iTimeOutSec		:	int		= 15000;
		
		
		public static function getInstance():TimeManager{
			
			if(m_instance == null){
				
				m_instance = new TimeManager(new Singleton());
				
			}
			return m_instance;
		}
		
		public constructor() {
			m_vecFunc = new Vector.<FStruct>();
		}
		
		public function start(sKey:String, _fun:Function):void{
			/*var timer : Timer = new Timer(iTimeOutSec,1);
			timer.addEventListener(TimerEvent.TIMER_COMPLETE,onComplete);
			timer.start();*/
			if(m_dicTimer[sKey]==null){
				var timer:JTimer = JTimer.getTimer(iTimeOutSec,1);
				timer.addTimerCallback(null,onComplete);
				timer.start();
				m_dicTimer[sKey] = timer;
			}
			if(m_dicCallBack[sKey]==null){
				m_dicCallBack[sKey] = _fun;
			}
		}
		
		public function stop(sKey:String):void{
			var timer : JTimer = m_dicTimer[sKey];
			if (timer){
				/*timer.removeEventListener(TimerEvent.TIMER_COMPLETE, onComplete);
				timer.stop();
				timer = null;*/
				timer.dispose();
				delete m_dicTimer[sKey];
				delete m_dicCallBack[sKey];
			}
			
		}
		
		public function stopAll():void{
			for (var param:String in m_dicTimer) 
			{
				stop(param);
			}
			
		}
		
		private function onComplete(timer:JTimer):void{
			/*var timer : Timer = event.currentTarget as Timer;
			timer.removeEventListener(TimerEvent.TIMER_COMPLETE, onComplete);
			timer.stop();*/
			var skey : String = search(timer);
			if(m_dicCallBack[skey] != null){
				m_dicCallBack[skey]();
			}
			deleteTimer(timer);
			timer.dispose();
			timer = null;
		}
		private function search(_timer:JTimer):String{
			for (var sKey:String in m_dicTimer) 
			{
				if(_timer==m_dicTimer[sKey]){
					return sKey;
				}
			}
			trace("查询不到对应的timer");
			return "";
		}
		private function deleteTimer(_timer:JTimer):void{
			for (var sKey:String in m_dicTimer) 
			{
				if(_timer==m_dicTimer[sKey]){
					delete m_dicTimer[sKey];
					break;
				}
			}
			
			trace("没有找到相关timer...");
		}
		
		//*****************//
		
		public function addFun( _func:Function , _interval:Number ):void {
			var _bRes:Boolean = false;
			for( var i:int = 0; i < m_vecFunc.length ; i++ ){
				if( m_vecFunc[i].func == _func ){
					m_vecFunc[i].func = _func;
					m_vecFunc[i].interval = _interval;
					m_vecFunc[i].totalCount = _interval / m_interval;
					_bRes = true;
				}
			}
			if( !_bRes ){
				var _fStruct:FStruct = new FStruct();
				_fStruct.func = _func;
				_fStruct.interval = _interval;
				_fStruct.totalCount = _interval / m_interval;
				m_vecFunc.push( _fStruct );
			}
			if(m_vecFunc.length>0){
				run();
			}
		}
		
		public function removeFun( _func:Function ):void {
			
			var _idx:int = -1;
			for( var i:int = 0; i < m_vecFunc.length ; i++ ){
				if( m_vecFunc[i].func == _func ){
					_idx = i;
					break;
				}
			}
			
			if( _idx != -1 ){
				m_vecFunc.splice( _idx,1 );
			}
		}
		
		public function run():void {
			if( !m_timer ){
				/*m_timer = new Timer(m_interval);
				m_timer.addEventListener(TimerEvent.TIMER , onTimer);
				m_timer.start();		*/
				m_timer = JTimer.getTimer(m_interval);
				m_timer.addTimerCallback(onTimer);
				m_timer.start();
			}
			
		}
		
		public function stop2():void {
			if( m_timer ){
				m_timer.stop();
			}
		}		
		
		public function onTimer():void {
			for( var i:int = 0; i < m_vecFunc.length ; i++ ){
				m_vecFunc[i].count +=1;
				if( m_vecFunc[i].count >= m_vecFunc[i].totalCount ){
					m_vecFunc[i].count = 0;
					m_vecFunc[i].func();
				}	
			}
			if(m_vecFunc.length==0){
				/*m_timer.stop();
				m_timer.removeEventListener(TimerEvent.TIMER , onTimer);
				m_timer = null;*/
				m_timer.dispose();
				m_timer = null;
			}
		}		
		
	}
}
class FStruct {
	public var func				:	Function;
	public var interval			:	Number;
	public var count			:	int = 0;
	public var totalCount		:	int = 0;
	public function FStruct():void {
		
	}
}