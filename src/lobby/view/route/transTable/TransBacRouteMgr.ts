module lobby.view.route.transTable {
	export class TransBacRouteMgr extends game.bac.BacRouteMgr{
		public constructor(view) {
			super( view );
			this.m_bigSprite.visible = false;
			this.m_bigEyeSprite.visible = false;
			this.m_smallSprite.visible = false;
			this.m_roachSprite.visible = false;
			
		}
	}
}