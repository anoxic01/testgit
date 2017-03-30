module lobby.view {
	export class Pool implements ISprite{
		protected _pool:<MovieClip>;
		/**已取出幾個*/
		protected _getLen:number;
		
		public constructor() {
			this._pool = new <MovieClip>();
			this._getLen = 0;
		}

		
		public destroy():void{
			if( _pool != null ) {
				var mc : MovieClip;
				while(_pool.length>0)
				{
					mc = _pool.shift();
					if(mc && mc.parent){
						mc.parent.removeChild(mc);
					}
				}
				if(mc){
					mc = null;
				}
				_pool = null;
			}
			_getLen = 0;
		}
		
		/**
		 * 要道物件池中的物件
		 */
		public getObject( Cls:Class ):MovieClip {
			
			
			var lackLen:number= this._pool.length - this._getLen;
			var mc:MovieClip;
			//在物件池中有剩下的原件]
			if ( lackLen > 0 ) {
				mc = this._pool[this._getLen];
				this._getLen++;
			}
			else {
				
				//console.log("this._pool  LEN::::::::" + this._pool.length );
				var classObj:Object = new Cls();
				
				if ( classObj is MovieClip ) {
					//不自动存入对象池
					//this._pool.push( classObj );
					//this._getLen++;
					mc = classObj as MovieClip;
					
				}
				else {
					throw Error("funciton getObject():::Cls is not MovieClip");
				}
				
			}
			
			
			return mc;
			
		}
		
		public getPoolLength():number{
			return _pool.length;
		}
		
		/**
		 * 用完放回物件池
		 * @param	mc
		 */
		public putObject( mc:MovieClip ):void {
			if ( this._getLen > 0 )  {
				this._getLen -= 1;
			}
		}
		
		/**
		 * 全部放回物件池
		 */
		public allPutPool():void {
			this._getLen = 0;
			allPutOut();
		}
		
		/**
		 * 全部放回物件池
		 */
		public allPutOut():void {
			this._getLen = 0;
			while(_pool.length>0)
			{
				 _pool.shift();
			}
		}
		
		
	}
}