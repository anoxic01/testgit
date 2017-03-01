interface IClip 
{
	/**播放**/		
	play():void;
	/**停止 **/		
	stop():void;
	/**
	 * 添加帧回调函数
	 */
	addFrameScript(frame:number,callBack:Function,thisArg:any,...args):void;
	/**
	 * 设置播放的资源或者受控制的MC
	 */
	setClipData(value:any):void;
	/**总帧数**/
	totalFrames:number;
	/**当前的播放帧频速率 */
	frameRate:number;
	/**当前的播放帧 从1开始* */
	currentFrame:number;
	/**是否正在播放中 **/
	isPlaying:boolean;
	/**所有的标签**/
	currentLabels:any[];
	/**当前正在播放的帧标签**/
	currentLabel:any;
	
	gotoAndStop(frame:any,isStopLableFrameEnd?:boolean):void;
		
	gotoAndPlay(frame:any):void;
	



	/**
	 * 销毁
	 */	
	dispose():void;
}