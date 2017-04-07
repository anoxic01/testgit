module lobby.view.route.quick {
	export class QuickBeadPlate extends BSprite{
		protected maxNum				 			=	84;					//珠子数量
		protected maxCol				  			= 	14;					//路纸行数
		protected _beadPlate_vct		:	BeadItem[]; 			//所有珠子
		protected _lastIndex			:	number;						//珠子序号
		protected m_beadClass			;						//珠子资源
		protected m_mcAsset				;					//显示容器
		protected _nowRoad				:	string	=	"";				//路纸数据
		
		public constructor(_mcAsset, _class=null, col:number=14) {
		
			super();
			
			this.m_mcAsset = _mcAsset;
			this.m_beadClass = _class;
			this.maxCol = col;
			this.maxNum = this.maxCol*6;
		}
		 public destroy():void{
			
			if(this._beadPlate_vct){
				var item : BeadItem;
				var _len  = this._beadPlate_vct.length;
				for (var i:number= 0; i < _len; i++) 
				{
					item = this._beadPlate_vct.pop();
					if(item.parent){
						item.parent.removeChild(item);
					}
					item.destroy();
				}
				if(item){
					item = null;
				}
				this._beadPlate_vct = null;
			}
			
			if(this.m_beadClass){
				this.m_beadClass = null;
			}
			if(this.m_mcAsset){
				this.m_mcAsset = null;
			}
			
			super.destroy();
		}
		
		
		public init():void {
			if(this._beadPlate_vct){
				for (var i:number= 0; i < this.maxNum; i++) {
					if (this._beadPlate_vct[i]){
						this._beadPlate_vct[i].visible = false;
					}
				}
			}
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
			var tmp:BeadItem;
			this._beadPlate_vct		= new Array<BeadItem>(); //珠路盤
			for (var i:number= 0; i < this.maxNum; i++) {
				tmp = new this.m_beadClass();
				this.m_mcAsset.addChild(tmp);
				tmp.x = offX+(Math.floor(i/6) * (beadW));
				tmp.y = offY+((i%6) * (beadH));
				tmp.visible = false;
				if (this._beadPlate_vct[i] && this._beadPlate_vct[i].parent){
					this.m_mcAsset.removeChild(this._beadPlate_vct[i]);
				}
				
				this._beadPlate_vct[i] = tmp;
			}
			
			if(tmp){
				tmp = null;
			}
		}
		
		
		public addRoad(road:string):void {
			
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
			
		}
		
		
		 public onChangeLanguage():void{
			if(this._beadPlate_vct){
				for (var i:number= 0; i < this._beadPlate_vct.length; i++) 
				{
					if (this._beadPlate_vct[i]){
						this._beadPlate_vct[i].onChangeLanguage();
					}
				}
				
			}
		}
		
		
	}
}