module lobby.view.game {
	export class SpGame extends BSprite {

		private var m_game		:	Game;				//添加的游戏
		private var m_bAdded	:	Boolean;			//还能添加一个
		private var m_gameBg	:	Shape;

		public constructor() {
			super();
		}

		
		override public function destroy():void{
			if(m_game){
				if(m_game.parent){
					m_game.parent.removeChild(m_game);
				}
				m_game.destroy();
//				m_game = null;
				this.removeChild(m_gameBg);
				m_gameBg=null;
			}
		}
		
		public function addGame(_game:Game):void{
			if(!m_bAdded){
				m_game = _game;
				if (m_gameBg==null){
				//	drawBg(1920,1080)
				}
				//showBg();
				this.addChild(m_game);
			}else{
				trace("添加游戏异常...");
			}	
		}
		
		
		override public function resize(_w:int=0, _h:int=0):void{
			if(m_game){
				m_game.resize();
			}
		}
		
		private function drawBg(w:Number ,h:Number,alpha:Number=1):void{
			m_gameBg=new Shape();
			var g:Graphics=m_gameBg.graphics;
			g.beginFill(0x000000);
			g.drawRect(-960,-540,w,h);
			g.endFill();
			
			//this.addChildAt(m_gameBg,0);
		}
		
		/*public function showBg():void{
			m_gameBg.visible = true;
			
		}
		
		public function hideBg():void{
			m_gameBg.visible = false;
		}*/
	}
}