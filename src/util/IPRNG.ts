module util {
	export interface IPRNG {
		getPoolSize():number;
		init(key:egret.ByteArray):void;
		next():number;
		dispose():void;
		toString():string;
	}
}