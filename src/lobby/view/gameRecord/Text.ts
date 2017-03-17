module lobby.view.gameRecord {
	export class Text {
		
		public var txtAsset	:	TextField;
		public var sLangKey	:	String;
		
		public constructor( _txtAsset:TextField , sLangLey:String = null) {
			txtAsset = _txtAsset;
			sLangKey = sLangLey;
			
			txtAsset.mouseEnabled = false;
			txtAsset.selectable = false;
		}
		
		public function destroy():void{
			if(txtAsset){
				txtAsset = null;
			}
		}
		
		public function onChangeLanguage():void {
			if( sLangKey ){
				txtAsset.defaultTextFormat =  txtAsset.getTextFormat();
				txtAsset.text = LobbyManager.getInstance().getLanguageString( sLangKey );
			}
		}
		
		public function set text(value:String):void {
			txtAsset.defaultTextFormat =  txtAsset.getTextFormat();
			txtAsset.text = value;
		}
		
		public function set visible(value:Boolean ):void {
			txtAsset.visible = value
		}
		public function get visible( ):Boolean {
			return txtAsset.visible;
		}
		
		public function set mouseEnabled( value:Boolean ):void {
			txtAsset.mouseEnabled = value;
		}
		
		public function get mouseEnabled( ):Boolean {
			return txtAsset.mouseEnabled;
		}
		
		public function set selectable(value:Boolean ):void {
			txtAsset.selectable = value;	
			
		}
		public function get selectable( ):Boolean {
			return txtAsset.selectable;	
		}
	}
}