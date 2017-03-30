module lobby.view.panel {
	export class PanelWindow extends BSprite{

		protected m_mcAsset		:	egret.MovieClip;
        protected m_mcHot		:	egret.MovieClip;
        protected m_rectangle	:	egret.Rectangle;
        // protected m_btnClose	:	SingleButtonMC;
		
        private m_bMove			:	 boolean;
        private m_bShake		:	 boolean;
        public iTopSpace		:	number;
        public iBottomSpace		:	number;
        public iLeftSpace		:	number;	

		public constructor($bShake: boolean = false) {
			super();
			this.m_bShake = $bShake;
		}

		public initilize() : void
        {
            this.addEventListener("addedToStage", this.addStage, this);
//            m_mcHot = m_mcAsset.getChildByName("mc_hot") as MovieClip;
        }

        public destroy() : void
        {
            this.removeEventListener("click", this.toTop, true);
            if (this.m_mcHot)
            {
                this.m_mcHot.removeEventListener("mouseDown", this.onDown, this);
               this. m_mcHot = null;
            }
            if (this.m_rectangle)
            {
                this.m_rectangle = null;
            }
            // if (this.m_btnClose)
            // {
            //     this.m_btnClose.destroy();
            //     this.m_btnClose = null;
            // }
            if (this.m_mcAsset)
            {
                if (this.m_mcAsset.parent)
                {
                   this.m_mcAsset.parent.removeChild(this.m_mcAsset);
                }
               	this.m_mcAsset = null;
            }
            if (this.parent)
            {
                this.parent.removeChild(this);
            }
			
            if (manager.LobbyManager.getInstance().lobbyView)
            {
                if (manager.LobbyManager.getInstance().lobbyView.spWindowLayer.numChildren <= 0)
                {
                    manager.LobbyManager.getInstance().lobbyView.spTableLayer.touchChildren = true;
					manager.LobbyManager.getInstance().lobbyView.spGameLayer.touchChildren = true;
                }
            }
			
        }

        public removeEvent() : void
        {
            if (this.stage.hasEventListener("mouseUp"))
            {
                this.stage.removeEventListener("mouseUp", this.onUp, this);
            }
//            if (stage.hasEventListener("click"))
//            {
//                stage.removeEventListener("click", onClick, true);
//            }
           
        }

        public resize(_w:number=0, _h:number=0) : void
        {
            var _iX : number = this.nAssetWidth * 0.5 + this.iLeftSpace;
            var _iY : number = this.nAssetHeight * 0.5 + this.iTopSpace + 46;
            var _iW : number = manager.LobbyManager.getInstance().stageW - this.nAssetWidth - this.iLeftSpace * 2;
            var _iH : number = manager.LobbyManager.getInstance().stageH - this.nAssetHeight - this.iBottomSpace - 46;
            this.m_rectangle = new egret.Rectangle(0, 0, _iW, _iH);
            this.m_rectangle.x = _iX;
            this.m_rectangle.y = _iY;
            if (this.x < _iX)
            {
                this.x = _iX;
            }
            else if (this.x > _iX + _iW)
            {
                this.x = _iX + _iW;
            }
            if (this.y < _iY)
            {
                this.y = _iY;
            }
            else if (this.y > _iY + _iH)
            {
                this.y = _iY + _iH;
            }
            
        }

        protected addStage(event:Event) : void
        {
            this.removeEventListener("addedToStage", this.addStage, this);
            this.resize();
            this.addEvent();
            
        }

        protected addEvent() : void
        {
            this.addEventListener("click", this.toTop, this);
            if (!this.m_mcHot.hasEventListener("mouseDown"))
            {
                this.m_mcHot.addEventListener("mouseDown", this.onDown, this);
            }
//            if (m_bShake)
//            {
//                stage.addEventListener("click", onClick, true);
//            }
			// this.m_mcHot.buttonMode = true;
            
        }

        set bShake(bValue: boolean){
            if (this.m_bShake != bValue)
            {
                this.m_bShake = bValue;
//                if (m_bShake)
//                {
//                    stage.addEventListener("click", onClick, true);
//                }
//                else
//                {
//                    stage.removeEventListener("click", onClick, true);
//                }
            }
        }
		
        protected toTop(event:MouseEvent) : void
        {
            if(this.parent){
				this.parent.setChildIndex(this,this.parent.numChildren-1);
			}
        }

        protected onDown(e:MouseEvent) : void
        {
            this.stage.addEventListener("mouseUp", this.onUp, this);
			
			if(this.parent){
				this.parent.setChildIndex(this,this.parent.numChildren-1);
			}
			
            // this.startDrag(false, this.m_rectangle);
			
            e.stopImmediatePropagation();
            
        }

        protected onUp(e:MouseEvent) : void
        {
            // this.nPosition.x = this.x / this.parent.stage.stageWidth;
            // this.nPosition.y = this.y / this.parent.stage.stageHeight;
			// this.stopDrag();
           	this.stage.removeEventListener("mouseUp", this.onUp, this);
            e.stopImmediatePropagation();
            
        }

        protected activate() : void
        {
            
        }

//        protected onClick(e:MouseEvent) : void
//        {
////            if (this.sName != "Dialog")
////            {
////                if (LobbyManager.getInstance().spLobbyView.spWarn.numChildren > 0)
////                {
////                    return;
////                }
////            }
//            if (e.target == m_mcAsset || e.target.parent == m_mcAsset || e.target.parent.parent == m_mcAsset || e.target.parent.parent.parent == m_mcAsset || e.target.parent.parent.parent.parent == m_mcAsset)
//            {
//                return;
//            }
//            if (m_timer && !m_timer.running)
//            {
//                m_bMove = false;
//                m_timer.reset();
//                m_timer.start();
//            }
//			
//        }
//
//        protected onTimer() : void
//        {
//            if (m_bMove)
//            {
//                this.scaleX = 1.01;
//                this.scaleY = 1.01;
//            }
//            else
//            {
//                this.scaleX = 1;
//                this.scaleY = 1;
//            }
//            m_bMove = !m_bMove;
//            
//        }
//
//        protected onComplete() : void
//        {
//            m_timer.stop();
//            this.scaleX = 1;
//            this.scaleY = 1;
//            
//        }
		
		public updateDealerName(dis:egret.TextField,str:string,width:number):void{
			dis.text = str;
			if(dis.textWidth>width){
				str = str.slice(0,2) + "..." + str.slice(str.length-2,str.length);
				dis.text = str;
			}
		}


	}
}