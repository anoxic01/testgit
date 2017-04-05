module lobby.view.gameRecord {
	export class Btn  extends ui.button.SingleButtonMC {
		public txtLabel;
		public constructor(mcButton, $fOnClick:Function , sLangLey:string="" ) {
			super(mcButton , $fOnClick );
			this.txtLabel = mcButton.tf_label;
		}

		public onChangeLanguage():void {
			this.txtLabel.gotoAndStop(manager.LobbyManager.getInstance().lobbyAuth.Lang+1);
		}
	}
}