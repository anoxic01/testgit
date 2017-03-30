module socket {
	export interface ITagTCPData {
		destroy()				:void;
		getContent()			:egret.ByteArray;
		getHeader()				:egret.ByteArray;
		getPacketSerialNumber()	:number;
		getPacketHead()			:number;
		getContentSize()		:number;
		getPacketSize()			:number;
	}
}