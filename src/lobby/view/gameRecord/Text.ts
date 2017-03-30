module lobby.view.gameRecord {
	export class Text {
		
		public txtAsset	:	TextField;
		public sLangKey	:	String;
		
		public constructor( _txtAsset:TextField , sLangLey:String = null) {
			txtAsset = _txtAsset;
			sLangKey = sLangLey;
			
			txtAsset.mouseEnabled = false;
			txtAsset.selectable = false;
		}
		
		public destroy():void{
			if(txtAsset){
				txtAsset = null;
			}
		}
		
		public onChangeLanguage():void {
			if( sLangKey ){
				txtAsset.defaultTextFormat =  txtAsset.getTextFormat();
				txtAsset.text = LobbyManager.getInstance().getLanguageString( sLangKey );
			}
		}
		
		set  text(value:String) {
			txtAsset.defaultTextFormat =  txtAsset.getTextFormat();
			txtAsset.text = value;
		}
		
		set  visible(value: boolean ) {
			txtAsset.visible = value
		}
		get visible( ): boolean {
			return txtAsset.visible;
		}
		
		set  mouseEnabled( value: boolean ) {
			txtAsset.mouseEnabled = value;
		}
		
		get mouseEnabled( ): boolean {
			return txtAsset.mouseEnabled;
		}
		
		set  selectable(value: boolean ) {
			txtAsset.selectable = value;	
			
		}
		get selectable( ): boolean {
			return txtAsset.selectable;	
		}
	}
}