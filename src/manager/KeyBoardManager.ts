module manager {
	export class KeyBoardManager {
		private static _instance: KeyBoardManager;  

		private list;  
		private isListening: boolean = false;  

		public constructor() {
			this.list = {};  
		}

		public static get instance(): KeyBoardManager {  
			if(KeyBoardManager._instance == null) {  
				KeyBoardManager._instance = new KeyBoardManager();  
			}  
			return KeyBoardManager._instance;  
		}  
	
		private add(): void {  
			if(this.isListening == false) {  
				this.isListening = true;  
				document.addEventListener("keydown",KeyBoardManager.instance.onKeyDown);  
			}  
		}  
	
		private onKeyDown(evt): void {  
			console.log("evt.keyCode:" + evt.keyCode);  
			var target: any;  
			for(target in KeyBoardManager.instance.list) {  
				var vo = KeyBoardManager.instance.list[target];  
				vo.callback.call(vo.target,evt);
			}  
		}  
	
	
		/**  
		 * 注册监听  
		 * @param callback 回调方法  
		 * @param target   
		 */  
		public addListener(callback: any,target: any): void {  
			var temp: string = egret.getQualifiedClassName(target);  
			if(KeyBoardManager._instance.list[temp] == null) {
				KeyBoardManager._instance.list[temp] = {"name":temp, "garget":target, "callback":callback};  
			}  
			KeyBoardManager._instance.add();  
		}  
	
	
		/**  
		 * 移出监听  
		 */  
		public removeListener(target: any): void {  
			var temp: string = egret.getQualifiedClassName(target);  
			if(KeyBoardManager._instance.list[temp] != null) {  
				delete KeyBoardManager._instance.list[temp];  
			}  
			this.checkCount();  
		}  
	
	
		private checkCount(): void {  
			for(var key in KeyBoardManager._instance.list) {  
				return;
			}  
			document.removeEventListener("keydown",KeyBoardManager.instance.onKeyDown);  
			this.isListening = false;  
		}  
	}
}