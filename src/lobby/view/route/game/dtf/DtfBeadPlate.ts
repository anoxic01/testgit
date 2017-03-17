module lobby.view.route.game.dtf {
	export class DtfBeadPlate extends BeadPlate{
		public constructor(view:MovieClip, _class:Class) {
		
			super(view, _class);
			
		}
		
		override public function addRoad(road:String, isAsk:Boolean = false):void {
			if (road == "" || road == null || road == "null") {
				return;
			}
			
			this.init();
			
			var roadTips:Array = road.split(".");
			var length:int = roadTips.length;
			var fix:int = length > this.maxNum ? (Math.ceil(length / 6) - this.maxCol) * 6 : 0;
			var label:String = "";
			var mcChild:MovieClip;
			for (var i:int = 0; i < this.maxNum; i ++) {
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
				ask();
			}
		}		
		
	}
}