module lobby.view.game {
	export class SpGame extends BSprite {

		private m_game		:	Game;				//添加的游戏
		private m_bAdded	:	boolean;			//还能添加一个
		private m_gameBg	;

		public constructor() {
			super();
		}

		
		 public destroy():void{
			if(this.m_game){
				if(this.m_game.parent){
					this.m_game.parent.removeChild(this.m_game);
				}
				this.m_game.destroy();
//				m_game = null;
				this.removeChild(this.m_gameBg);
				this.m_gameBg=null;
			}
		}
		
		public addGame(_game:Game):void{
			if(!this.m_bAdded){
				this.m_game = _game;
				if (this.m_gameBg==null){
				//	drawBg(1920,1080)
				}
				//showBg();
				this.addChild(this.m_game);
			}else{
				console.log("添加游戏异常...");
			}	
		}
		
		
		 public resize(_w:number=0, _h:number=0):void{
			if(this.m_game){
				this.m_game.resize();
			}
		}
		
		private drawBg(w:number ,h:number,alpha:number=1):void{
			this.m_gameBg =new egret.Shape();
			var g = this.m_gameBg.graphics;
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