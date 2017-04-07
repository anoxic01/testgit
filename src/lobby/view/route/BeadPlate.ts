module lobby.view.route {
	export class BeadPlate extends BSprite{
		protected maxNum					:number= 66;
		protected maxCol					:number= 11;
		
		protected _beadPlate_vct		:BeadItem[]; //珠路盤
		protected _lastIndex			:number;
		protected _timer				;
		protected m_class				;
		protected m_mcAsset				;
		
		public constructor( _mcAsset, _class=null,col=10) {
		
			super();
			this.m_mcAsset = _mcAsset;
			this.m_class = _class;
			this.maxCol = col;
			this.maxNum = this.maxCol*6;
		//	_beadPlate_vct = new <BeadItem>(maxNum); //珠路盤
		//	setBeads();
			this._timer = timers.JTimer.getTimer(1000,5);
			this._timer.addTimerCallback(flash,this.onAskEnd);
		}
		
		 public destroy():void {
			super.destroy();
			
			this.clear();
			
			if( this._timer != null ) {
				/*this._timer.stop();
				this._timer.removeEventListener(TimerEvent.TIMER , onAskEnd);*/
				this._timer.dispose();
				this._timer = null;	
			}
			if(this.m_class){
				this.m_class = null;
			}
			if(this.m_mcAsset){
				this.m_mcAsset = null;
			}
		}
		
		
		public init():void {
			if (this.askCell)
				this.askCell.visible=true;
			for (var i:number= 0; i < this.maxNum; i++) {
				if (this._beadPlate_vct[i]){
					this._beadPlate_vct[i].visible = false;
				}
				//this._beadPlate_vct[i].gotoAndStop(1);
			}
		}
		
		private clear():void{
			var tmp:BeadItem;
			if(this._beadPlate_vct ){
				while(this._beadPlate_vct.length>0){
					tmp = this._beadPlate_vct.shift();
					if(tmp){
						if(tmp.parent){
							tmp.parent.removeChild(tmp);
						}
						tmp.destroy();
					}
				}
				this._beadPlate_vct=null;
			}
			tmp=null;
		}
		
		/**
		 * 
		 * @param offX
		 * @param offY
		 * @param beadW
		 * @param beadH
		 * 
		 */
		public setBeads(offX:number=0,offY:number=0,beadW:number=0,beadH:number=0):void{
			this.clear();
			var tmp:BeadItem;
			
			this._beadPlate_vct		= new Array<BeadItem>(); //珠路盤
			for (var i:number= 0; i < this.maxNum; i++) {
				tmp = new this.m_class();
				
				this.m_mcAsset.addChild(tmp);
				tmp.setLabel(BeadItem.A);
				if (beadW==0 || beadH ==0){
					beadW = tmp.width+1;
					beadH = tmp.height;
				}
				tmp.x = offX+(Math.floor(i/6) * (beadW));
				tmp.y = offY+((i%6) * (beadH));
				tmp.visible = false;
				
				this._beadPlate_vct[i] = tmp;
			}
		}
		
		
		public addRoad(road:string, isAsk: boolean = false):void {
			
			if (road == "" || road == null || road == "null") {
				return;
			}
			
			this.init();
			
			var roadTips:any[] = road.split(".");
			var length:number= roadTips.length;
			var colNum:number= Math.ceil(length / 6) 
			
			var fix:number= colNum>this.maxCol ? (colNum-this.maxCol) * 6:0 ;
			var label:string = "";
			for (var i:number= 0; i < this.maxNum; i ++) {
				if (roadTips[i + fix] != undefined ) {
					this._beadPlate_vct[i].visible = true;
					
					label = roadTips[i + fix];
					
					this._beadPlate_vct[i].setLabel( label );
					this._lastIndex = i;
					
				}else {
					this._beadPlate_vct[i].visible = false;
				}
			}
			
			if (isAsk) {
				this.ask();
			}
		}
		
		private askCell;
		public ask():void {
			this.askCell=this._beadPlate_vct[this._lastIndex]
			this._beadPlate_vct[this._lastIndex].visible = true;
			
		}
		
		public flash():void {
			this.askCell.visible=!this.askCell.visible;
		}
		
		private onAskEnd():void {
			console.log("onAskEnd")
			this.dispatchEvent(new events.RouteEvent(events.RouteEvent.ASK_Road_END,null) );
		}
		
		 public onChangeLanguage():void{
			for (var i:number= 0; i < this._beadPlate_vct.length; i++) 
			{
				if (this._beadPlate_vct[i]){
					this._beadPlate_vct[i].onChangeLanguage();
				}
			}
			
		}
		
	}
}