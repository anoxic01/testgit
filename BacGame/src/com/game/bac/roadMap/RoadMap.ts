class RoadMap extends BaseView
{
	public static A	:	string	=	"a";
	public static B	:	string	=	"b";
	public static C	:	string	=	"c";
	public static D	:	string	=	"d";
	public static E	:	string	=	"e";
	public static F	:	string	=	"f";
	public static G	:	string	=	"g";
	public static H	:	string	=	"h";
	public static I	:	string	=	"i";
	public static J	:	string	=	"j";
	public static K	:	string	=	"k";
	public static L	:	string	=	"l";
	/**用于实例路纸子元素的Class */
	protected itemClass:any;
	/**路纸绘制器，专门用于绘制路纸 */
	protected itemDrawer:RoadMapDrawer;
	/**保存的所有的路纸子元素 */
	protected items:Array<BaseRoadMapItem>;
	protected drawFramer:JFramer;
	protected data:any;
	protected roadMapInfo:RoadMapInfo;
	public constructor(itemClass:any)
	{
		super();
		this.itemClass = itemClass;
		this.initView();
	}
	/**
	 * 初始化路纸界面
	 */
	protected initView()
	{
		this.items = new Array<BaseRoadMapItem>();
		this.drawFramer = JFramer.getFramer();
		this.drawFramer.addFramerCallback(this.onDelayDrawRoadMap,this);
	}
	/**
	 * 设置路纸数据
	 */
	public setData(value:any)
	{
		if(this.data==value)return;
		this.data = value;
		this.drawFramer.start();
	}
	/**
	 * 设置路纸绘制器
	 */
	public setDrawer(value:RoadMapDrawer)
	{
		this.itemDrawer = value;
	}
	/**
	 * 设置路纸绘制器参数信息
	 */
	public setRoadMapInfo(value:RoadMapInfo)
	{
		this.roadMapInfo = value;
	}
	/**
	 * 延时绘制
	 */
	protected onDelayDrawRoadMap()
	{
		if(this.data!=null&&this.data!="")// 绘制路纸
		{
			if(this.itemDrawer!=null)
			{
				if(this.itemDrawer.draw!=null)
				{
					var len:number = this.itemDrawer.draw.call(this,this.items,this.data,this.itemClass,this.roadMapInfo);
					for(let i:number = 0;i<len;i++)
					{
						this.items[i].visible = true;
						if(this.items[i].parent==null)
							this.addChild(this.items[i]);
					}
				}
			}else// 需要设置绘制器
			{
				console.warn("[RoadMap] 需要先调用setDrawer()方法设置绘制器！！！");
			}
		}else// 清除当前所有的路纸
		{
			this.clearItems();
		}
		this.drawFramer.stop();
	}
	/**
	 * 对最后一个路纸进行闪烁（用于问路）
	 */
	public sharkLastItem(v:boolean)
	{
		var item:BaseRoadMapItem = null;
		if(this.items.length>0)
		{
			item = this.items[this.items.length-1];
			item.visible = v;
		}	
	}
	public dispose():void
	{
		// 先将所有的路纸元素放进缓存池中留待下次使用
		this.clearItems();
		super.dispose();
		this.drawFramer&&this.drawFramer.dispose();
		this.itemDrawer&&this.itemDrawer.dispose();
		this.drawFramer = null;
		this.itemClass = null;
		this.itemDrawer = null;
	}
	/**
	 * 清除所有的元素
	 */
	protected clearItems()
	{
		if(this.itemClass&&this.items)
		{
			RoadMapDrawer.pushItemsToPool(this.items,this.itemClass);
		}
	}
}