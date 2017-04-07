module lobby.view.route.game.dtf {
	export class DtfBeadPlate extends BeadPlate{
		public constructor(view, _class) {
		
			super(view, _class);
			
		}
		
		 public addRoad(road:string, isAsk: boolean = false):void {
			if (road == "" || road == null || road == "null") {
				return;
			}
			
			this.init();
			
			var roadTips:any[] = road.split(".");
			var length:number= roadTips.length;
			var fix:number= length > this.maxNum ? (Math.ceil(length / 6) - this.maxCol) * 6 : 0;
			var label:string = "";
			var mcChild;
			for (var i:number= 0; i < this.maxNum; i ++) {
				if (roadTips[i + fix] != undefined ) {
					this._beadPlate_vct[i].visible = true;
					
					label = roadTips[i + fix];
					
					this._beadPlate_vct[i].setLabel( label );
					
					this._lastIndex = i;
				}
				else {
					this._beadPlate_vct[i].visible = false;
				}
			}
			
			if (isAsk) {
				this.ask();
			}
		}		
		
	}
}