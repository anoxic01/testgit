module manager {
	export class TimeManager {
		
		private static m_instance	:	TimeManager;
		
		private m_dicTimer			:	Dictionary 	=	new Dictionary();
		private m_dicCallBack		:	Dictionary 	=	new Dictionary();
		private m_vecFunc			:	<FStruct> = new <FStruct>;
		private m_timer				:	JTimer;
		private m_interval			:	Number = 1000;
		
		public const  iTimeOutSec		:	int		= 15000;
		
		
		public static getInstance():TimeManager{
			
			if(m_instance == null){
				
				m_instance = new TimeManager(new Singleton());
				
			}
			return m_instance;
		}
		
		public constructor() {
			m_vecFunc = new <FStruct>();
		}
		
		public start(sKey:string, _fun:Function):void{
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
		
		public stop(sKey:string):void{
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
		
		public stopAll():void{
			for (var param:string in m_dicTimer) 
			{
				stop(param);
			}
			
		}
		
		private onComplete(timer:JTimer):void{
			/*var timer : Timer = event.currentTarget as Timer;
			timer.removeEventListener(TimerEvent.TIMER_COMPLETE, onComplete);
			timer.stop();*/
			var skey : string = search(timer);
			if(m_dicCallBack[skey] != null){
				m_dicCallBack[skey]();
			}
			deleteTimer(timer);
			timer.dispose();
			timer = null;
		}
		private search(_timer:JTimer):string{
			for (var sKey:string in m_dicTimer) 
			{
				if(_timer==m_dicTimer[sKey]){
					return sKey;
				}
			}
			console.log("查询不到对应的timer");
			return "";
		}
		private deleteTimer(_timer:JTimer):void{
			for (var sKey:string in m_dicTimer) 
			{
				if(_timer==m_dicTimer[sKey]){
					delete m_dicTimer[sKey];
					break;
				}
			}
			
			console.log("没有找到相关timer...");
		}
		
		//*****************//
		
		public addFun( _func:Function , _interval:Number ):void {
			var _bRes: boolean = false;
			for( var i:number= 0; i < m_vecFunc.length ; i++ ){
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
		
		public removeFun( _func:Function ):void {
			
			var _idx:number= -1;
			for( var i:number= 0; i < m_vecFunc.length ; i++ ){
				if( m_vecFunc[i].func == _func ){
					_idx = i;
					break;
				}
			}
			
			if( _idx != -1 ){
				m_vecFunc.splice( _idx,1 );
			}
		}
		
		public run():void {
			if( !m_timer ){
				/*m_timer = new Timer(m_interval);
				m_timer.addEventListener(TimerEvent.TIMER , onTimer);
				m_timer.start();		*/
				m_timer = JTimer.getTimer(m_interval);
				m_timer.addTimerCallback(onTimer);
				m_timer.start();
			}
			
		}
		
		public stop2():void {
			if( m_timer ){
				m_timer.stop();
			}
		}		
		
		public onTimer():void {
			for( var i:number= 0; i < m_vecFunc.length ; i++ ){
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
	public func				:	Function;
	public interval			:	Number;
	public count			:	int = 0;
	public totalCount		:	int = 0;
	public FStruct():void {
		
	}
}