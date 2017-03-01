class FrameScript 
{
	private frams:Dictionary;
	private frameArgs:Dictionary;
	public constructor() 
	{
		this.frams=new Dictionary;
		this.frameArgs=new Dictionary;
	}

	public addFrameScript(frame:any,callBack:Function,thisArg:any,args:any[]):void
	{
		if(this.frams.get(frame)==null)this.frams.add(frame,[]);
		var arr:any[]=this.frams.get(frame);
		var index:number=arr.indexOf(callBack);
		if(index<0)arr.push(callBack);
		this.frameArgs.add(callBack,{args:args,thisArg:thisArg});
	}
	public removeFrameScript(frame:any,callBack:Function=null):void
	{
		if(this.frams.get(frame)==null)return;
		var arr:any[]=this.frams.get(frame);
		if(callBack==null)// 清除帧上所有的回调
		{
			while(arr.length>0)
			{
				this.frameArgs.delete(arr.shift());
			}
			this.frams.delete(frame);
		}else
		{
			this.frameArgs.delete(callBack);
			arr.splice(arr.indexOf(callBack),1);
			if(arr.length==0)this.frams.delete(frame);
		}
	}
	public execute(frame:any):void
	{
		var arr:any[]=this.frams.get(frame);
		arr.forEach(f => 
		{
			if(f!=null)
			{
				var data:any = this.frameArgs.get(f);
				f.apply(data.thisArg,data.args);
			}
		});
	}

	public clear()
	{
		this.frams.clear();
		this.frameArgs.clear();
	}

	public dispose():void
	{
		this.frams.dispose();
		this.frameArgs.dispose();
		this.frams = null;
		this.frameArgs = null;
	}
}