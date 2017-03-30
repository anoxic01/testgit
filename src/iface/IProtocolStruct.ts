module iface {
	export interface IProtocolStruct {
		initControler(controler:ctrl.GameControler):void;
		execute( oData:Object ):void;
	}
}