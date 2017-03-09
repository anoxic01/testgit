module manager {
	export class TextManager {

		private m_tf			:	egret.TextField = null;
		private static instance	:	TextManager;

		public static getInstance():TextManager{
            	if(this.instance == null){
                    this.instance = new TextManager();
            	}
            	return this.instance;
     	}
		public constructor() {
		}

		
		public filter(_sValue:string,tf:egret.TextField):string
		{
			return _sValue==null?"":this.cutOutText(_sValue,tf);
		}
		
		
		public cutOutText(s:string, tf:egret.TextField):string
		{
			if(this.m_tf==null)
			{
				this.m_tf = new egret.TextField();
				this.m_tf.wordWrap = false;
				this.m_tf.multiline = false;
				this.m_tf.textAlign = "left";
			}
			if(tf != null)
			{
				this.m_tf.text = s;
				if(this.m_tf.textWidth>tf.width){
					s = s.slice(0,2) + "..." + s.slice(s.length-2,s.length);
				}
			}
			return s;
		}
		
		
		public createText():egret.TextField{
			var _tf : egret.TextField = new egret.TextField();
			this.formatText(_tf);
			return _tf;
		}
		
		public adjust(_txt:egret.TextField, _width:number):void{
			var _size : number = <number>(_txt.size);
			while(_txt.textWidth>_width){
				_size--;
				_txt.size = _size;
			}
		}
		
		private formatText(_tf:egret.TextField):void{
			_tf.fontFamily = "Arial";
			_tf.size = 14;
		}


	}
}