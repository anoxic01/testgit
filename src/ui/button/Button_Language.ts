/* 位图文字的按钮 */
module ui.button {
	export class Button_Language extends Button {
		
		private m_bg_default	:	egret.Bitmap;
		private m_bg_over		:	egret.Bitmap;
		private m_label_default	:	egret.Bitmap;
		private m_label_over	:	egret.Bitmap;
		
		public constructor($arr:string[], $fClick:Function) {
			super($arr, $fClick);
			
			this.m_bg_default = manager.ResourceManager.getInstance().createBitmapByName(this.arr[0]);
			this.addChild(this.m_bg_default);			
			this.m_bg_over = manager.ResourceManager.getInstance().createBitmapByName(this.arr[1]);
			
			this.m_label_default = manager.ResourceManager.getInstance().createBitmapByName(this.arr[2]);
			this.addChild(this.m_label_default);
			this.m_label_over = manager.ResourceManager.getInstance().createBitmapByName(this.arr[3]);

		}

		public destroy():void{
			super.destroy();

			if(this.m_bg_default){
				if(this.m_bg_default.parent){
					this.removeChild(this.m_bg_default);
				}
				this.m_bg_default = null;
			}
			if(this.m_bg_over){
				if(this.m_bg_over.parent){
					this.removeChild(this.m_bg_over);
				}
				this.m_bg_over = null;
			}
			if(this.m_label_default){
				if(this.m_label_default.parent){
					this.removeChild(this.m_label_default);
				}
				this.m_label_default = null;
			}
			if(this.m_label_over){
				if(this.m_label_over.parent){
					this.removeChild(this.m_label_over);
				}
				this.m_label_over = null;
			}
		}

		public onchangeLanguage():void{
			
		}

		protected over():void{
			if(this.contains(this.m_bg_over)==false){
				this.addChild(this.m_bg_over);
			}
			if(this.contains(this.m_bg_default)){
				this.removeChild(this.m_bg_default);
			}

			if(this.contains(this.m_label_over)==false){
				this.addChild(this.m_label_over);
			}
			if(this.contains(this.m_label_default)){
				this.removeChild(this.m_label_default);
			}
		}
		
		protected out():void{
			if(this.contains(this.m_bg_default)==false){
				this.addChild(this.m_bg_default);
			}
			if(this.contains(this.m_bg_over)){
				this.removeChild(this.m_bg_over);
			}

			if(this.contains(this.m_label_default)==false){
				this.addChild(this.m_label_default);
			}
			if(this.contains(this.m_label_over)){
				this.removeChild(this.m_label_over);
			}
		}

	}
}