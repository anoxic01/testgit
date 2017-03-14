module manager {
	export class TipManager {
		
		public static const UP			:	int	=	0;
		public static const DOWN		:	int	=	1;
		public static const LEFT		:	int	=	2;
		public static const RIGHT		:	int	=	3;
		
		private static var m_instance	:	TipManager;
		
		private var m_aTip				:	Array;
		private var m_iCurrent			:	int;
		
		private var m_aTip2				:	Array;
		private var m_iCurrent2			:	int;
		
		
		public static function getInstance():TipManager{
			
			if(m_instance == null){
				
				m_instance = new TipManager(new Singleton());
				
			}
			return m_instance;
		}
		

		public constructor() {
		}
		
		public function initialize():void{
			init_style_lobby();
			init_style_bac();
		}
		
		private function init_style_lobby():void{
			m_aTip = [ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_LOBBY,"Tip_Up_Asset"), ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_LOBBY,"Tip_Down_Asset") , ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_LOBBY,"Tip_Left_Asset"), ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_LOBBY,"Tip_Right_Asset")];
			for (var i:int = 0; i < 4; i++) 
			{
				this.m_aTip[i].mouseChildren = false;
				this.m_aTip[i].mouseEnabled = false;
				LobbyManager.getInstance().lobbyView.spTextLayer.addChild(m_aTip[i]);
				(m_aTip[i] as MovieClip).visible = false;
			}
			m_iCurrent = -1;
		}
		
		private function init_style_bac():void{
			m_aTip2 = [ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_LOBBY,"Tip_Down_Asset2"), ResourceManager.getInstance().getInstanceByNameFromDomain(Define.SWF_LOBBY,"Tip_Down_Asset2")];
			for (var i:int = 0; i < 2; i++) 
			{
				this.m_aTip2[i].mouseChildren = false;
				this.m_aTip2[i].mouseEnabled = false;
				LobbyManager.getInstance().lobbyView.spTextLayer.addChild(m_aTip2[i]);
				(m_aTip2[i] as MovieClip).visible = false;
			}
			m_iCurrent2 = -1;
		}
		
		
		/**
		 * _mode
		 * 0 默认状态
		 * 1 up
		 * 2 down
		 * 3 left
		 * 4 right
		 */		
		public function show(_sValue:String, _iMode:int, _point:Point, _mode:int=0):void{
//			SoundManager.getInstance().play(SoundPackage.sLobbyMouseOver);
			if(m_iCurrent!=-1){
				(m_aTip[m_iCurrent] as MovieClip).visible = false;
			}
			
			m_iCurrent = _iMode;
			
			(m_aTip[m_iCurrent] as MovieClip).tf_label.text = _sValue;
			
			switch(_mode){
				case 1:
				case 2:
					((m_aTip[m_iCurrent] as MovieClip).tf_label as TextField).autoSize = TextFieldAutoSize.LEFT;
					((m_aTip[m_iCurrent] as MovieClip).tf_label as TextField).x = -int(((m_aTip[m_iCurrent] as MovieClip).tf_label as TextField).width*0.5);
					(m_aTip[m_iCurrent] as MovieClip).x = _point.x;
					(m_aTip[m_iCurrent] as MovieClip).y = _point.y;
					if((_point.x+int(((m_aTip[m_iCurrent] as MovieClip).tf_label as TextField).width*0.5))>1920){
						(m_aTip[m_iCurrent] as MovieClip).x = 1920-int(((m_aTip[m_iCurrent] as MovieClip).tf_label as TextField).width*0.5);
					}
					break;
				case 3:
					(m_aTip[m_iCurrent] as MovieClip).x = int((m_aTip[m_iCurrent] as MovieClip).width*0.5);
					(m_aTip[m_iCurrent] as MovieClip).y = _point.y;
					break;
				case 4:
					(m_aTip[m_iCurrent] as MovieClip).x = int(1920-(m_aTip[m_iCurrent] as MovieClip).width*0.5);
					(m_aTip[m_iCurrent] as MovieClip).y = _point.y;
					break;
				default:
					(m_aTip[m_iCurrent] as MovieClip).x = _point.x;
					(m_aTip[m_iCurrent] as MovieClip).y = _point.y;
					break;
			}
			
			(m_aTip[m_iCurrent] as MovieClip).visible = true;
		}
		
		public function show2(_sValue:String, _iMode:int, _point:Point):void{
			if(m_iCurrent2!=-1){
				(m_aTip2[m_iCurrent2] as MovieClip).visible = false;
			}
			
			m_iCurrent2 = _iMode;
			(m_aTip2[m_iCurrent2] as MovieClip).tf_label.text = _sValue;
			(m_aTip2[m_iCurrent2] as MovieClip).x = _point.x;
			(m_aTip2[m_iCurrent2] as MovieClip).y = _point.y;
			(m_aTip2[m_iCurrent2] as MovieClip).visible = true;
		}
		
		public function hide():void{
			if(m_aTip==null)return;
			if (m_aTip[m_iCurrent]){
				(m_aTip[m_iCurrent] as MovieClip).visible = false;
			}
			if(m_aTip2[m_iCurrent2]){
				(m_aTip2[m_iCurrent2] as MovieClip).visible = false;
			}
			
		}

		
	}
}