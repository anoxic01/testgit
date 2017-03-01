class ClipUtils 
{
	public static getMovieClips(resFlag:string,startIndex:number,endIndex:number):any[]
	{

		let resNumLen = resFlag.indexOf("}")-resFlag.indexOf("{")-1;
		let resNames = [];
		if(resNumLen>0)
		{
			let resName:string = resFlag.substring(resFlag.indexOf("{"),resFlag.indexOf("}")+1);
			for(let i = startIndex;i<=endIndex;i++)
			{
				resNames.push(resFlag.replace(resName,ClipUtils.fixedSerialNumber(resNumLen,i+"")));
			}
		}else
		{
			console.log("错误的角色动作名称标记："+resFlag);
		}
		return resNames;
	}

	private static fixedSerialNumber(len:number,n:string):string
	{
		while(n.length<len)
		{
			n="0"+n;
		}
		return n;
	}
}