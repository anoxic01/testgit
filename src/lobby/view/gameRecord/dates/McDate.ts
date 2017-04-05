module lobby.view.gameRecord.dates {
	export class McDate {
		public  mcAsset;
		public  iYear:number;
		public  iMonth:number;
		public  iDay:number;
		public  fClick:Function;
		public  tfSelect;
		public  tfNormal;
		public  tfCanSelect;
		public  bSelect: boolean;

		public constructor(_mcAsset, _tfSelect, _tfNormal ) {
			this.mcAsset = _mcAsset;
			this.mcAsset.tf_label.text = "";
			this.mcAsset.mc_0.visible = false;
			this.mcAsset.buttonMode = true;
			this.mcAsset.mouseChildren =false;
			this.mcAsset.addEventListener(mouse.MouseEvent.MOUSE_OVER , this.mouseHandler, this );
			this.mcAsset.addEventListener(mouse.MouseEvent.MOUSE_OUT , this.mouseHandler, this );
			this.mcAsset.addEventListener(egret.TouchEvent.TOUCH_TAP , this.mouseHandler, this );
	//		this.mcAsset.mc_red.visible = false;
			
			this.tfSelect = _tfSelect;
			this.tfNormal = _tfNormal;
			// this.tfCanSelect = new TextFormat();
			// this.tfCanSelect.color = 0xFF6600;
			// TextField(this.mcAsset.tf_label).defaultTextFormat = tfNormal;
		}

	protected mouseHandler(event:MouseEvent):void {
		
		if( event.type == mouse.MouseEvent.MOUSE_OVER ){
			this.mcAsset.mc_0.visible = true;
			// TextField(this.mcAsset.tf_label).defaultTextFormat = this.tfSelect;
			// TextField(this.mcAsset.tf_label).text = TextField(this.mcAsset.tf_label).text;
		}else if( event.type == mouse.MouseEvent.MOUSE_OUT ){
			this.mcAsset.mc_0.visible = false;
			
			// if( !bSelect ){
			// 	TextField(this.mcAsset.tf_label).defaultTextFormat = tfNormal;
			// }else {
			// 	TextField(this.mcAsset.tf_label).defaultTextFormat = tfCanSelect;
			// }
			// TextField(this.mcAsset.tf_label).text = TextField(this.mcAsset.tf_label).text;	
		}
		else if( event.type == egret.TouchEvent.TOUCH_TAP ) {
			manager.SoundManager.getInstance().play(sound.SoundPackage.sClick_Tools);
			if( this.fClick != null ) {
				this.fClick( [this.iYear , this.iMonth , this.iDay ] );
			}
			
		}
	}

	public destroy():void {
		if( this.mcAsset ){
			this.mcAsset.removeEventListener(mouse.MouseEvent.MOUSE_OVER , this.mouseHandler );
			this.mcAsset.removeEventListener(mouse.MouseEvent.MOUSE_OUT , this.mouseHandler );
			this.mcAsset.removeEventListener(egret.TouchEvent.TOUCH_TAP , this.mouseHandler );	
			this.mcAsset = null;
		}
		
		if( this.fClick != null ){
			this.fClick = null;
		}
		
	}
	
	set enable( _bValue: boolean ) {
		this.mcAsset.mouseEnabled = _bValue;
		this.mcAsset.enabled = _bValue;
		this.mcAsset.buttonMode = _bValue;
	}
	
	set canSelectState (_bValue: boolean) {
//		this.mcAsset.mc_red.visible = _bValue;
		// if( _bValue ){
		// 	TextField(this.mcAsset.tf_label).defaultTextFormat = tfCanSelect;
		// 	TextField(this.mcAsset.tf_label).text = TextField(this.mcAsset.tf_label).text;
		// }
		// else {
		// 	TextField(this.mcAsset.tf_label).defaultTextFormat = tfNormal;
		// 	TextField(this.mcAsset.tf_label).text = TextField(this.mcAsset.tf_label).text;	
		// }
		this.bSelect = _bValue;
	}
	
	public lightState():void {
		this.mcAsset.mouseEnabled = false;
		this.mcAsset.enabled = false;
		this.mcAsset.buttonMode = false;
		this.mcAsset.mc_0.visible = true;
		// TextField(this.mcAsset.tf_label).defaultTextFormat = this.tfSelect;
		// TextField(this.mcAsset.tf_label).text = TextField(this.mcAsset.tf_label).text;
	}
	
	public defaultState():void {
		this.mcAsset.mouseEnabled = true;
		this.mcAsset.enabled = true;
		this.mcAsset.buttonMode = true;
		this.mcAsset.mc_0.visible = false;
		// TextField(this.mcAsset.tf_label).defaultTextFormat = tfNormal;
		// TextField(this.mcAsset.tf_label).text = TextField(this.mcAsset.tf_label).text;
	}
	}
}