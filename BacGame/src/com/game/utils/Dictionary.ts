class Dictionary
{
	private dict:Object;
	private keys:Array<Object>;
	private index:number = -1;
	private isDispose:boolean = false;
	
	public constructor() 
	{
		this.dict = new Object();
		this.keys = new Array<Object>();
	}	
	/**
	 * 添加键值对
	 */
	public add(key:any,value:any)
	{
		if(!this.isDispose&&key!=null)
		{
			if(this.keys.indexOf(key)<0)
			{
				this.keys.push(key);
			}
			if(typeof key==="string"||typeof key==="number")
			{
				this.dict[key] = value;
			}else
			{
				this.dict["DictionaryKey_"+key.hashCode] = value;
			}
		}
	}
	/**
	 * 获取指定的key的值
	 */
	public get(key:any):any
	{
		if(this.isDispose||key==null)return null;
		else if(typeof key==="string"||typeof key==="number")
		{
			return this.dict[key];
		}else
		{
			return this.dict["DictionaryKey_"+key.hashCode];
		}
	}
	/**
	 * 删除保存的键值对
	 */
	public delete(key:any)
	{
		if(!this.isDispose&&key!=null)
		{
			this.index = this.keys.indexOf(key);
			if(this.index>-1)
			{
				this.keys.splice(this.index,1);
			}
			if(typeof key==="string"||typeof key==="number")
			{
				delete this.dict[key];
			}else
			{
				delete this.dict["DictionaryKey_"+key.hashCode];
			}
		}
	}
	/**
	 * 销毁字典
	 */
	public dispose()
	{
		if(!this.isDispose)
		{
			this.clear();
			this.dict = null;
			this.keys = null;
			this.isDispose = true;
		}
	}
	/**
	 * 清空字典
	 */
	public clear()
	{
		for(let key in this.dict)
		{
			delete this.dict[key];
		}
		while(this.keys.length>0)
		{
			this.keys.shift();
		}
	}
	/**
	 * 用于获取到所有的Key值方便遍历字典
	 */
	public getKeys():any[]
	{
		if(this.isDispose)return null;
		return this.keys.concat();
	}
	/**
	 * 【Debug】查看并打印字典数据
	 */
	public printDictionary()
	{
		for(let i = 0;i<this.keys.length;i++)
		{
			console.log("Dictionary[key = "+this.keys[i]+"] = "+this.get(this.keys[i]));
		}
	}
}