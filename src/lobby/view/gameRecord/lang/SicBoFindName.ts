module lobby.view.gameRecord.lang {
	export class SicBoFindName extends BaseFindName{
		public constructor() {
			super();
		}
		 public getBetAreaName( _sName:string ):string {
			var _sReturnStr:string;
			_sReturnStr = manager.LobbyManager.getInstance().getLanguageString( _sName );
			
			return _sReturnStr;
		}
	}
}