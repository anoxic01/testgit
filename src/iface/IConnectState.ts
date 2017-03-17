module iface {
	export interface IConnectState {
		onConnectFailed():void;
		onConnectClosed():void;
		onConnect():void;
	}
}