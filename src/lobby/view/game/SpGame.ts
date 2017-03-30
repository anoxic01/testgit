module lobby.view.game {
	export class SpGame extends BSprite {

		private m_game		:	Game;				//添加的游戏
		private m_bAdded	:	 boolean;			//还能添加一个
		private m_gameBg	:	Shape;

		public constructor() {
			super();
		}

		
		 public destroy():void{
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
		
		public addGame(_game:Game):void{
			if(!m_bAdded){
				m_game = _game;
				if (m_gameBg==null){
				//	drawBg(1920,1080)
				}
				//showBg();
				this.addChild(m_game);
			}else{
				console.log("添加游戏异常...");
			}	
		}
		
		
		 public resize(_w:number=0, _h:number=0):void{
			if(m_game){
				m_game.resize();
			}
		}
		
		private drawBg(w:Number ,h:Number,alpha:Number=1):void{
			m_gameBg=new Shape();
			var g:Graphics=m_gameBg.graphics;
			g.beginFill(0x000000);
			g.drawRect(-960,-540,w,h);
			g.endFill();
			
			//this.addChildAt(m_gameBg,0);
		}
		
		/*public showBg():void{
			m_gameBg.visible = true;
			
		}
		
		public hideBg():void{
			m_gameBg.visible = false;
		}*/
	}
}