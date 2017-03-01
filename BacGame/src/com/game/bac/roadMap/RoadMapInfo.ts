/**
 * 绘制格子时的数据信息
 */
class RoadMapInfo 
{
	/**
	 * 一列可以显示多少个格子
	 */
	public columnGridNum:number = 0;
	/**
	 * 设置允许显示的路纸列数
	 */
	public maxColumn:number = 0;
	/**最多显示多少个格子 */
	public maxGridNum:number = 0;
	/**
	 * 路纸要绘制的格子宽度
	 */
	public gridWidth:number = 0;
	/**
	 * 路纸要绘制的格子高度
	 */
	public gridHeight:number = 0;
	/**
	 * 所有格子的偏移X
	 */
	public offsetX:number = 0;
	/**
	 * 所有格子的偏移Y
	 */
	public offsetY:number = 0;

	public matchScale:boolean = false;
	/**
	 * 创建一个info数据
	 * @gw 格子的宽度
	 * @gh 格子的高度
	 * @cgn 一列显示的格子数
	 * @mgn 最多显示的格子数
	 */
	public static creat(gw:number,gh:number,cgn:number,mgn:number,ox:number=0,oy:number=0,ms:boolean=false):RoadMapInfo
	{
		var info:RoadMapInfo = new RoadMapInfo();
		info.maxGridNum = mgn;
		info.maxColumn = mgn/cgn;
		info.columnGridNum = cgn;
		info.gridWidth = gw;
		info.gridHeight = gh;
		info.offsetX = ox;
		info.offsetY = oy;
		info.matchScale = ms;
		return info;
	}
}