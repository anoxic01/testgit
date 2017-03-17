module lobby.view.route.quick {
	export class QuickBeadPlateSic extends BSprite{
		protected var maxNum				:	int	=	84;					//珠子数量
		protected var maxCol				:	int = 	14;					//路纸行数
		protected var _beadPlate_vct		:	Vector.<BeadItem>; 			//所有珠子
		protected var _lastIndex			:	int;						//珠子序号
		protected var m_beadClass			:	Class;						//珠子资源
		protected var m_mcAsset				:	MovieClip;					//显示容器
		protected var _nowRoad				:	String	=	"";				//路纸数据
		
		public constructor( _mcAsset:MovieClip, _class:Class=null, col:int=14 ) {
		
			super();
			
			this.m_mcAsset = _mcAsset;
			this.m_beadClass = _class;
			this.maxCol = col;
			this.maxNum = maxCol*6;
			
			setBeads();
		}
		
		
		override public function destroy():void {
			super.destroy();
			
			
			if(_beadPlate_vct){
				var item : BeadItem;
				var _len : int = _beadPlate_vct.length;
				for (var i:int = 0; i < _len; i++) 
				{
					item = _beadPlate_vct.pop();
					if(item.parent){
						item.parent.removeChild(item);
					}
					item.destroy();
				}
				if(item){
					item = null;
				}
				_beadPlate_vct = null;
			}
			
			if(m_beadClass){
				m_beadClass = null;
			}
			if(m_mcAsset){
				m_mcAsset = null;
			}
		}
		
		
		public function init():void {
			for (var i:int = 0; i < this.maxNum; i++) {
				if (this._beadPlate_vct[i]){
					this._beadPlate_vct[i].visible = false;
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
		public function setBeads(offX:Number=0,offY:Number=0,beadW:Number=0,beadH:Number=0):void{
			var tmp:BeadItem;
			_beadPlate_vct		= new Vector.<BeadItem>(maxNum); //珠路盤
			for (var i:int = 0; i < this.maxNum; i++) {
				tmp = new m_beadClass();
				m_mcAsset.addChild(tmp);
//				tmp.setLabel(BeadItem.F);
				if (beadW==0 || beadH ==0){
					beadW = 21;//tmp.width+1;
					beadH = 21;//tmp.height;
				}
				tmp.x = offX+int(Math.floor(i/6) * (beadW));
				tmp.y = offY+int((i%6) * (beadH));
				tmp.visible = false;
				if (_beadPlate_vct[i] && _beadPlate_vct[i].parent){
					m_mcAsset.removeChild(_beadPlate_vct[i]);
				}
				
				this._beadPlate_vct[i] = tmp;
			}
			if(tmp){
				tmp = null;
			}
		}
		
		
		public function addRoad(road:String):void {
			
			if (road == "" || road == null || road == "null") {
				return;
			}
			
			this.init();
			
			var roadTips:Array = road.split(".");
			var length:int = roadTips.length;
			var colNum:int = Math.ceil(length / 6) 
			
			var fix:int = colNum>maxCol ? (colNum-maxCol) * 6:0 ;
			var label:String = "";
			for (var i:int = 0; i < this.maxNum; i ++) {
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
		
		override public function onChangeLanguage():void{
			if(_beadPlate_vct){
				for (var i:int = 0; i < _beadPlate_vct.length; i++) 
				{
					if (_beadPlate_vct[i]){
						_beadPlate_vct[i].onChangeLanguage();
					}
				}
				
			}
		}
		
		
	}
}