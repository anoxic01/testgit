module lobby.view.gameRecord {
	export class Text {
		
		public txtAsset	;
		public sLangKey	:	string;
		
		public constructor( _txtAsset , sLangLey:string = null) {
			this.txtAsset = _txtAsset;
			this.sLangKey = sLangLey;
			
			this.txtAsset.touchEnabled = false;
			// this.txtAsset.selectable = false;
		}
		
		public destroy():void{
			if(this.txtAsset){
				this.txtAsset = null;
			}
		}
		
		public onChangeLanguage():void {
			if( this.sLangKey ){
				// this.txtAsset.defaultTextFormat =  this.txtAsset.getTextFormat();
				this.txtAsset.text = manager.LobbyManager.getInstance().getLanguageString( this.sLangKey );
			}
		}
		
		set  text(value:string) {
			// this.txtAsset.defaultTextFormat =  this.txtAsset.getTextFormat();
			this.txtAsset.text = value;
		}
		get text():string{
			return this.txtAsset.text;
		}
		
		set  visible(value: boolean ) {
			this.txtAsset.visible = value
		}
		get visible( ): boolean {
			return this.txtAsset.visible;
		}
		
		set  mouseEnabled( value: boolean ) {
			this.txtAsset.touchEnabled = value;
		}
		
		get mouseEnabled( ): boolean {
			return this.txtAsset.touchEnabled;
		}
		
		set  selectable(value: boolean ) {
			this.txtAsset.touchEnabled = value;	
			
		}
		get selectable( ): boolean {
			return this.txtAsset.touchEnabled;	
		}
	}
}