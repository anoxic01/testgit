module lobby.view {
	export class Pool implements iface.ISprite{
		protected _pool:egret.MovieClip[];
		/**已取出幾個*/
		protected _getLen:number;
		
		public constructor() {
			this._pool = new Array<egret.MovieClip>();
			this._getLen = 0;
		}

		
		public destroy():void{
			if( this._pool != null ) {
				var mc : egret.MovieClip;
				while(this._pool.length>0)
				{
					mc = this._pool.shift();
					if(mc && mc.parent){
						mc.parent.removeChild(mc);
					}
				}
				if(mc){
					mc = null;
				}
				this._pool = null;
			}
			this._getLen = 0;
		}
		
		/**
		 * 要道物件池中的物件
		 */
		public getObject( Cls ):egret.MovieClip {
			
			
			var lackLen:number= this._pool.length - this._getLen;
			var mc:egret.MovieClip;
			//在物件池中有剩下的原件]
			if ( lackLen > 0 ) {
				mc = this._pool[this._getLen];
				this._getLen++;
			}
			else {
				
				//console.log("this.this._pool  LEN::::::::" + this.this._pool.length );
				var classObj:Object = new Cls();
				
				if ( classObj instanceof egret.MovieClip ) {
					//不自动存入对象池
					//this.this._pool.push( classObj );
					//this._getLen++;
					mc = classObj as egret.MovieClip;
					
				}
				else {
					throw Error("funciton getObject():::Cls is not MovieClip");
				}
				
			}
			
			
			return mc;
			
		}
		
		public getPoolLength():number{
			return this._pool.length;
		}
		
		/**
		 * 用完放回物件池
		 * @param	mc
		 */
		public putObject( mc:egret.MovieClip ):void {
			if ( this._getLen > 0 )  {
				this._getLen -= 1;
			}
		}
		
		/**
		 * 全部放回物件池
		 */
		public allPutPool():void {
			this._getLen = 0;
			this.allPutOut();
		}
		
		/**
		 * 全部放回物件池
		 */
		public allPutOut():void {
			this._getLen = 0;
			while(this._pool.length>0)
			{
				 this._pool.shift();
			}
		}
		
		
	}
}