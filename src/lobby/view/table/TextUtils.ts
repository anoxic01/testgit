module lobby.view.table {
	export class TextUtils {
		public constructor() {
		}
		public static setEmbedFont(tf,font:string = "微软雅黑"):void
		{
			if(tf.embedFonts==true&&tf.defaultTextFormat.font==font)return;
			var fonts = Font.enumerateFonts();
			for (var i = 0; i < fonts.length; i++) 
			{
				if(fonts[i].fontName==font)
				{
					tf.embedFonts = true;
					// var dft = tf.defaultTextFormat;
					// dft.font = font;
					// tf.defaultTextFormat = dft;
					tf.text = tf.text;
					tf.y-=(tf.defaultTextFormat.size)*0.6;
					return;
				}
			}
		}
	}
}