module lobby.view.windows {
	export class MessageWindow extends egret.DisplayObjectContainer {

		public     container			:	egret.Sprite;				//放置弹窗的容器
		protected 	m_textField			:	egret.TextField;			//
//		protected 	m_mcAsset			:	MovieClip;
		protected 	m_subAlpha			:	number = 0.25;
		public 		m_moveDis			:	number = 1;
		public 		m_subX				:	number = 20;
		protected 	m_point				:	egret.Point;
		
		public 		duration			:   number=0.35;
		public 		keepTime			:	number=2;
		public		m_delayHide			:	number = 1000;
		public		lockWindow			:	boolean;
//		protected 	m_bg				:	BitmapScale9Grid;
		protected 	m_bg				:	egret.MovieClip;
		public 		msg					:	string;
		public		iTxtSize			:	number = 38;
		public		uTxtColor			:	number = 0xFFFF99;
		public		sAutoSize			:	string = "left";
		public		iWidth				:	number =0;
		public		iHeight				:	number =0;
		public 		bAutoSize			:	boolean = true;
		public		bKeep				:	boolean;

		public constructor(w:number=700,h:number=200,size:number=38) {
			super();
			this.iWidth = w;
			this.iHeight = h;
			
			this.m_point = new egret.Point();
			this.iTxtSize=size;
			this.initText();
			this.lockWindow = false;
			this.touchEnabled = false;
			this.touchChildren = false;
			this.visible = false;
		}

		public setFontSize(value:number):void{
			this.iTxtSize=value;
			this.m_textField.size=value;
			this.resize();
		}
		
		
		 public destroy():void {
		
			if(this.m_bg){
				if(this.m_bg.parent){
					this.m_bg.parent.removeChild(this.m_bg);
				}
				this.m_bg = null;
			}
			
			
			if( this.m_textField ){
				if(this.m_textField.parent){
					this.m_textField.parent.removeChild(this.m_textField);
				}
				this.m_textField = null;
			}
			
			if( this.m_point ){
				this.m_point = null;
			}
			
			if (this.parent){
				this.parent.removeChild(this);
			}
			this.container=null;
			
		}
		
		private initText():void{
			this.m_textField 			= 	new egret.TextField();
			this.m_textField.textAlign	=	this.sAutoSize;
			this.m_textField.bold		=	true;
			this.m_textField.size		=	this.iTxtSize;
			this.m_textField.textColor	=	this.uTxtColor;
//			m_textField.x					= (m_bg.width - m_textField.width) >> 1;
//			m_textField.y					= (m_bg.height - m_textField.height) >> 1;
			this.m_textField.multiline			= false;	
			this.addChild(this.m_textField);
		}
		
		public clearMsg():void {
			this.m_textField.text = "";
		}
		
		public show(str:string , keep:boolean =false ,time:number=1.5):void{
			if (this.m_textField==null) return;
			this.m_textField.text = str;
			this.bKeep=keep;
			
			this.keepTime=time;
			this.resize();
			
			
			if (this.parent==null && this.container){
				this.container.addChild(this);
			}
			
			this.visible = true;
			if( !keep ) {
				this.alpha = 0;
			}
			let tw = egret.Tween.get( this );
			tw.to({alpha:1},this.duration).call(this.onComplete).wait(this.keepTime)
				.to({alpha:0},this.duration).call(this.tweenOnComplete)
			
		}
		
		private onComplete():void{
			
		}
		
		public resize(_w:number=0, _h:number=0):void {
			if (this.m_bg){
				if( this.m_textField.width>this.m_bg.width){
					manager.TextManager.getInstance().adjust(this.m_textField,this.m_bg.width-20);
				}
				this.m_textField.x					= (this.m_bg.width - this.m_textField.width) >> 1;
				this.m_textField.y					= (this.m_bg.height - this.m_textField.height) >> 1;	
			}else{
				if (this.m_textField.width>=this.iWidth){
					manager.TextManager.getInstance().adjust(this.m_textField,this.iWidth-20);
				}
				
				this.m_textField.x					= (this.iWidth- this.m_textField.width) >> 1;
				this.m_textField.y					= (this.iHeight - this.m_textField.height) >> 1;	
			}
			
		}
		
		protected onFadeIn():void{
			let tw = egret.Tween.get( this );
			tw.to({alpha:1}, this.duration);
			
		}
		
		protected hideMessage():void {
			this.hide();
		}
		
		
		public hide():void{
			this.bKeep=false;
			let tw = egret.Tween.get(this);
			tw.to({alpha:0},this.duration).call(this.tweenOnComplete);
			//容错处理  remove后 自动destroy 可能为null;
		}
		
		private tweenOnComplete():void{
			this.visible=false;
			this.keepTime=1.5;
			if (parent){
				this.parent.removeChild(this);
			}
		}
	}
}