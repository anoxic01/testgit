module lobby.view.route {
	export class BeadPlate extends BSprite{
		protected maxNum					:number= 66;
		protected maxCol					:number= 11;
		
		protected _beadPlate_vct		:<BeadItem>; //珠路盤
		protected _lastIndex			:number;
		protected _timer				:JTimer;
		protected m_class				:Class;
		protected m_mcAsset				:MovieClip;
		
		public constructor( _mcAsset:MovieClip, _class:Class=null,col=10) {
		
			super();
			this.m_mcAsset = _mcAsset;
			this.m_class = _class;
			this.maxCol = col;
			this.maxNum = maxCol*6;
		//	_beadPlate_vct = new <BeadItem>(maxNum); //珠路盤
		//	setBeads();
			_timer = JTimer.getTimer(1000,5);
			_timer.addTimerCallback(flash,onAskEnd);
		}
		
		 public destroy():void {
			super.destroy();
			
			clear();
			
			if( this._timer != null ) {
				/*this._timer.stop();
				this._timer.removeEventListener(TimerEvent.TIMER , onAskEnd);*/
				_timer.dispose();
				this._timer = null;	
			}
			if(m_class){
				m_class = null;
			}
			if(m_mcAsset){
				m_mcAsset = null;
			}
		}
		
		
		public init():void {
			if (askCell)
				askCell.visible=true;
			for (var i:number= 0; i < this.maxNum; i++) {
				if (this._beadPlate_vct[i]){
					this._beadPlate_vct[i].visible = false;
				}
				//this._beadPlate_vct[i].gotoAndStop(1);
			}
		}
		
		private clear():void{
			var tmp:BeadItem;
			if(_beadPlate_vct ){
				while(_beadPlate_vct.length>0){
					tmp = _beadPlate_vct.shift();
					if(tmp){
						if(tmp.parent){
							tmp.parent.removeChild(tmp);
						}
						tmp.destroy();
					}
				}
				_beadPlate_vct=null;
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
		public setBeads(offX:Number=0,offY:Number=0,beadW:Number=0,beadH:Number=0):void{
			clear();
			var tmp:BeadItem;
			
			_beadPlate_vct		= new <BeadItem>(maxNum); //珠路盤
			for (var i:number= 0; i < this.maxNum; i++) {
				tmp = new m_class();
				
				m_mcAsset.addChild(tmp);
				tmp.setLabel(BeadItem.A);
				if (beadW==0 || beadH ==0){
					beadW = tmp.width+1;
					beadH = tmp.height;
				}
				tmp.x = offX+int(Math.floor(i/6) * (beadW));
				tmp.y = offY+int((i%6) * (beadH));
				tmp.visible = false;
				
				this._beadPlate_vct[i] = tmp;
			}
		}
		
		
		public addRoad(road:String, isAsk: boolean = false):void {
			
			if (road == "" || road == null || road == "null") {
				return;
			}
			
			this.init();
			
			var roadTips:any[] = road.split(".");
			var length:number= roadTips.length;
			var colNum:number= Math.ceil(length / 6) 
			
			var fix:number= colNum>maxCol ? (colNum-maxCol) * 6:0 ;
			var label:String = "";
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
				ask();
			}
		}
		
		private askCell:DisplayObject;
		public ask():void {
			askCell=this._beadPlate_vct[this._lastIndex]
			this._beadPlate_vct[this._lastIndex].visible = true;
			
		}
		
		public flash():void {
			askCell.visible=!askCell.visible;
		}
		
		private onAskEnd():void {
			console.log("onAskEnd")
			this.dispatchEvent(new RouteEvent(RouteEvent.ASK_Road_END,null) );
		}
		
		 public onChangeLanguage():void{
			for (var i:number= 0; i < _beadPlate_vct.length; i++) 
			{
				if (_beadPlate_vct[i]){
					_beadPlate_vct[i].onChangeLanguage();
				}
			}
			
		}
		
	}
}