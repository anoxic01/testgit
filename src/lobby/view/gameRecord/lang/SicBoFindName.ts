module lobby.view.gameRecord.lang {
	export class SicBoFindName extends BaseFindName{
		public constructor() {
		}
		 public function getBetAreaName( _sName:string ):string {
			var _sReturnStr:string;
			_sReturnStr = LobbyManager.getInstance().getLanguageString( _sName );
			
			return _sReturnStr;
		}
	}
}