module lobby.view.gameRecord.lang {
	export class SicBoFindName extends BaseFindName{
		public constructor() {
		}
		override public function getBetAreaName( _sName:String ):String {
			var _sReturnStr:String;
			_sReturnStr = LobbyManager.getInstance().getLanguageString( _sName );
			
			return _sReturnStr;
		}
	}
}