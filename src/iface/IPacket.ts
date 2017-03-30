module iface {
	export interface IPacket {
		pack( type:number , sendData:Object ):egret.ByteArray;
	}
}