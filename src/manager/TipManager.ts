module manager {
	export class TipManager {
		
		public static UP			:	number	=	0;
		public static DOWN			:	number	=	1;
		public static LEFT			:	number	=	2;
		public static RIGHT			:	number	=	3;
		
		private static m_instance	:	TipManager;
		
		private m_aTip				:	any[];
		private m_iCurrent			:	number;
		
		private m_aTip2				:	any[];
		private m_iCurrent2			:	number;
		
		
		public static getInstance():TipManager{
			
			if(this.m_instance == null){
				
				this.m_instance = new TipManager();
				
			}
			return this.m_instance;
		}
		

		public constructor() {
		}
		
		public initialize():void{
			this.init_style_lobby();
			this.init_style_bac();
		}
		
		private init_style_lobby():void{
			this.m_aTip = [ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_LOBBY,"Tip_Up_Asset"), ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_LOBBY,"Tip_Down_Asset") , ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_LOBBY,"Tip_Left_Asset"), ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_LOBBY,"Tip_Right_Asset")];
			for (var i:number= 0; i < 4; i++) 
			{
				this.m_aTip[i].mouseChildren = false;
				this.m_aTip[i].mouseEnabled = false;
				LobbyManager.getInstance().lobbyView.spTextLayer.addChild(this.m_aTip[i]);
				(this.m_aTip[i]).visible = false;
			}
			this.m_iCurrent = -1;
		}
		
		private init_style_bac():void{
			this.m_aTip2 = [ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_LOBBY,"Tip_Down_Asset2"), ResourceManager.getInstance().getInstanceByNameFromDomain(define.Define.SWF_LOBBY,"Tip_Down_Asset2")];
			for (var i:number= 0; i < 2; i++) 
			{
				this.m_aTip2[i].mouseChildren = false;
				this.m_aTip2[i].mouseEnabled = false;
				LobbyManager.getInstance().lobbyView.spTextLayer.addChild(this.m_aTip2[i]);
				(this.m_aTip2[i]).visible = false;
			}
			this.m_iCurrent2 = -1;
		}
		
		
		/**
		 * _mode
		 * 0 默认状态
		 * 1 up
		 * 2 down
		 * 3 left
		 * 4 right
		 */		
		public show(_sValue:string, _iMode:number, _point:egret.Point, _mode:number=0):void{
//			SoundManager.getInstance().play(SoundPackage.sLobbyMouseOver);
			if(this.m_iCurrent!=-1){
				(this.m_aTip[this.m_iCurrent]).visible = false;
			}
			
			this.m_iCurrent = _iMode;
			
			(this.m_aTip[this.m_iCurrent]).tf_label.text = _sValue;
			
			switch(_mode){
				case 1:
				case 2:
					// ((this.m_aTip[this.m_iCurrent] ).tf_label).autoSize = TextFieldAutoSize.LEFT;
					((this.m_aTip[this.m_iCurrent] ).tf_label).x = -<number>(((this.m_aTip[this.m_iCurrent] ).tf_label).width*0.5);
					(this.m_aTip[this.m_iCurrent] ).x = _point.x;
					(this.m_aTip[this.m_iCurrent] ).y = _point.y;
					if((_point.x+<number>(((this.m_aTip[this.m_iCurrent] ).tf_label).width*0.5))>1920){
						(this.m_aTip[this.m_iCurrent] ).x = 1920-<number>(((this.m_aTip[this.m_iCurrent] ).tf_label).width*0.5);
					}
					break;
				case 3:
					(this.m_aTip[this.m_iCurrent] ).x = <number>((this.m_aTip[this.m_iCurrent] ).width*0.5);
					(this.m_aTip[this.m_iCurrent] ).y = _point.y;
					break;
				case 4:
					(this.m_aTip[this.m_iCurrent] ).x = <number>(1920-(this.m_aTip[this.m_iCurrent] ).width*0.5);
					(this.m_aTip[this.m_iCurrent] ).y = _point.y;
					break;
				default:
					(this.m_aTip[this.m_iCurrent] ).x = _point.x;
					(this.m_aTip[this.m_iCurrent] ).y = _point.y;
					break;
			}
			
			(this.m_aTip[this.m_iCurrent] ).visible = true;
		}
		
		public show2(_sValue:string, _iMode:number, _point:egret.Point):void{
			if(this.m_iCurrent2!=-1){
				(this.m_aTip2[this.m_iCurrent2] ).visible = false;
			}
			
			this.m_iCurrent2 = _iMode;
			(this.m_aTip2[this.m_iCurrent2] ).tf_label.text = _sValue;
			(this.m_aTip2[this.m_iCurrent2] ).x = _point.x;
			(this.m_aTip2[this.m_iCurrent2] ).y = _point.y;
			(this.m_aTip2[this.m_iCurrent2] ).visible = true;
		}
		
		public hide():void{
			if(this.m_aTip==null)return;
			if (this.m_aTip[this.m_iCurrent]){
				(this.m_aTip[this.m_iCurrent] ).visible = false;
			}
			if(this.m_aTip2[this.m_iCurrent2]){
				(this.m_aTip2[this.m_iCurrent2] ).visible = false;
			}
			
		}

		
	}
}