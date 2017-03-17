module iface {
	export interface IProtocolStruct {
		initControler(controler:GameControler):void;
		execute( oData:Object ):void;
	}
}