class RoadMapDrawer 
{
	/**
	 * 默认绘制方法
	 */
	public draw:Function;
	/**
	 * 大眼路，小眼路，蟑螂路通用绘制方法
	 */
	private drawGeneralItems(items:Array<BaseRoadMapItem>,data:any,itemClass:any,info:RoadMapInfo):any
	{
		info = info?info:RoadMapInfo.creat(8.5,8.5,6,30);
		var roads:any = RoadMapUtils.createRoadRenderGrid(data,null,info.columnGridNum);
		var gridRoads:any[] = roads[0];
		var roadLen:number = gridRoads.length;
		var startIndex:number = roadLen>info.maxGridNum?(roadLen-info.maxGridNum):0;
		var allItemLen:number = 0;
		var xData:any[];
		var i:number = 0;
		var j:number = 0;
		var itemIndex:number = 0;
		var item:BaseRoadMapItem;
		for(i = startIndex;i<roadLen;i++)
		{
			for(j = 0;j<gridRoads[i].length;j++)
			{
				if(gridRoads[i][j]!=null)
					allItemLen++;
			}
		}
		RoadMapDrawer.autoCreateItems(items,allItemLen,itemClass);
		for(i = startIndex;i<roadLen;i++)
		{
			xData = gridRoads[i];
			for(j = 0;j<xData.length;j++)
			{
				if(xData[j]!=null)
				{
					item = items[itemIndex];
					item.setData(xData[j]);
					if(info.matchScale)
					{
						if(item.width!=info.gridWidth)
						{
							item.scaleX = info.gridWidth/item.width;
						}
						if(item.height!=info.gridHeight)
						{
							item.scaleY = info.gridHeight/item.height;
						}
					}
					item.x = info.gridWidth*(i-startIndex)+(info.gridWidth-item.width*item.scaleX)*0.5+info.offsetX;
					item.y = info.gridHeight*j+(info.gridHeight-item.height*item.scaleY)*0.5+info.offsetY;					
					itemIndex++;
				}
			}
		}
		return itemIndex;
	}
	/**
	 * 大路绘制方法
	 */
	private drawBigItems(items:Array<BaseRoadMapItem>,data:any,itemClass:any,info:RoadMapInfo):any
	{
		info = info?info:RoadMapInfo.creat(17,17,6,30);
		var roads:any = RoadMapUtils.createBigRoadRenderGrid(data,null,info.columnGridNum);
		var gridRoads:any[] = roads[0];
		var tieRoads:any[] = roads[1];
		var roadLen:number = gridRoads.length;
		var startIndex:number = roadLen>info.maxGridNum?(roadLen-info.maxGridNum):0;
		var allItemLen:number = 0;
		var xData:any[];
		var tData:any[];
		var i:number = 0;
		var j:number = 0;
		var itemIndex:number = 0;
		var tieItemCount:number = 0;
		var item:BaseRoadMapItem;
		for(i = startIndex;i<roadLen;i++)
		{
			for(j = 0;j<gridRoads[i].length;j++)
			{
				if(gridRoads[i][j]!=null)
					allItemLen++;
			}
		}
		RoadMapDrawer.autoCreateItems(items,allItemLen,itemClass);
		for(i=startIndex;i<roadLen;i++)
		{
			xData = gridRoads[i];
			tData = tieRoads[i];
			for(j=0;j<xData.length;j++)
			{
				if(xData[j]&&xData[j]!="null")
				{
					if(tData!=null&&tData[j]!=null)
					{
						tieItemCount = tData[j].length;
					}else
					{
						tieItemCount = 0;
					}
					item = items[itemIndex];
					item.setData(xData[j]+","+tieItemCount);
					if(info.matchScale)
					{
						if(item.width!=info.gridWidth)
						{
							item.scaleX = info.gridWidth/item.width;
						}
						if(item.height!=info.gridHeight)
						{
							item.scaleY = info.gridHeight/item.height;
						}
					}

					item.x = info.gridWidth*(i-startIndex)+(info.gridWidth-item.width*item.scaleX)*0.5+info.offsetX;
					item.y = info.gridHeight*j+(info.gridHeight-item.height*item.scaleY)*0.5+info.offsetY;					
					itemIndex++;
				}
			}
		}
		return itemIndex;
	}
	/**
	 * 主路绘制方法
	 */
	private drawMainItems(items:Array<BaseRoadMapItem>,data:any,itemClass:any,info:RoadMapInfo):any
	{
		info = info?info:RoadMapInfo.creat(34,34,6,66);
		var allRoads:any[] = data.split(".");
		var allColumu:number = Math.ceil(allRoads.length / info.columnGridNum);
		var startIndex:number = 0;
		var len:number = allRoads.length;
		let i:number = 0;
		var item:BaseRoadMapItem;
		if(allColumu>info.maxColumn)
		{
			startIndex = (allColumu-info.maxColumn)*info.columnGridNum;
			len = allRoads.length - startIndex;
		}
		RoadMapDrawer.autoCreateItems(items,len,itemClass);
		for (i = 0;i<len;i++)
		{
			item = items[i];
			item.setData(allRoads[startIndex+i]);
			if(info.matchScale)
			{
				if(item.width!=info.gridWidth)
				{
					item.scaleX = info.gridWidth/item.width;
				}
				if(item.height!=info.gridHeight)
				{
					item.scaleY = info.gridHeight/item.height;
				}
			}
			item.x = Math.floor(i/info.columnGridNum)*info.gridWidth+((info.gridWidth-item.width*item.scaleX)*0.5+info.offsetX);
			item.y = Math.floor(i%info.columnGridNum)*info.gridHeight+((info.gridHeight-item.height*item.scaleY)*0.5+info.offsetY);
		}
		return len;
	}

	public dispose()
	{
		this.draw = null;
	}
	private static roadMapItemPool:Dictionary = new Dictionary();
	/**
	 * 处理路纸元素（从缓存池里取元素和将多余的元素放回缓存池中）
	 */
	private static autoCreateItems(items:Array<BaseRoadMapItem>,len:number,itemClass:any)
	{
		// 将多出来的元素放回缓存池内
		while(items.length>len)
		{
			RoadMapDrawer.pushItem(items.pop(),itemClass);
		}
		var key:string = egret.getQualifiedClassName(itemClass);
		var itemPool:any[] = RoadMapDrawer.roadMapItemPool.get(key);
		while(items.length<len)
		{
			// 从缓存池中取元素
			if(itemPool&&itemPool.length>0)
			{
				items.push(itemPool.shift());
			}else
			{
				items.push(new itemClass());
			}
		}
	}
	/**
	 * 将不需要的的路纸元素放进缓存池内
	 */
	public static pushItemsToPool(items:Array<BaseRoadMapItem>,itemClass:any)
	{
		while(items.length>0)
		{
			RoadMapDrawer.pushItem(items.pop(),itemClass);
		}
	}
	private static pushItem(item:BaseRoadMapItem,itemClass:any)
	{
		if(item==null)return;
		var key:string = egret.getQualifiedClassName(itemClass);
		if(RoadMapDrawer.roadMapItemPool.get(key)==null)RoadMapDrawer.roadMapItemPool.add(key,[]);
		var itemPool:any[] = RoadMapDrawer.roadMapItemPool.get(key);
		item.scaleX = item.scaleY = 1;
		item.visible = true;
		item.removeFromParent();
		itemPool.push(item);
	}
	/**
	 * 主路纸绘制器
	 */
	public static getMainRoadMapDrawer():RoadMapDrawer
	{
		var drawer:RoadMapDrawer = new RoadMapDrawer();
		drawer.draw = drawer.drawMainItems;
		return drawer;
	}
	/**
	 * 大路绘制器
	 */
	public static getBigRoadMapDrawer():RoadMapDrawer
	{
		var drawer:RoadMapDrawer = new RoadMapDrawer();
		drawer.draw = drawer.drawBigItems;
		return drawer;
	}
	/**
	 * 大眼路，小眼路，蟑螂路通用绘制器
	 */
	public static getGeneralRoadMapDrawer():RoadMapDrawer
	{
		var drawer:RoadMapDrawer = new RoadMapDrawer();
		drawer.draw = drawer.drawGeneralItems;
		return drawer;
	}
}