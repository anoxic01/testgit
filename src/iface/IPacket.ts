module iface {
	export interface IPacket {
		pack( type:uint , sendData:Object ):ByteArray;
	}
}