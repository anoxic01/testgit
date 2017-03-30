module socket {
	export class SocketDefine {
		
		public static CONNECT_SUCCESS		: 	number 	= 	 0;											//连接成功
		public static GATEWAY_DISCONNECT	: 	number 	= 	-1;											//网络断开
		public static CONNECT_FAIL			: 	number 	= 	-2;											//连接失败
		public static SEND_FAIL				: 	number	= 	-3;											//发送失败
		public static RECV_FAIL				: 	number	= 	-4;											//接收失败
		public static SOCKET_SECURITY_ERROR	: 	number	= 	-5;											//沙箱错误
		
		
		public constructor() {
		}
	}
}