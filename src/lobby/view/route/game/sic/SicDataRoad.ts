module lobby.view.route.game.sic {
	export class SicDataRoad {
		public static var _posX:int =  0;
		public static var _posY:int =  0;
		
		public constructor() {
			throw Error("禁止建立物件");
		}
		
		
		public static function createBeadGrid(roadMap:String, skipChars:Array, rowHeight:int = 6):Array {
			
			// 資料格與行列索引、標記用的參數
			var grid:Array = [], x:int = 0, y:int = -1, offsetX:int = 0, currentSymbol:String = null, prevSymbol:String = null;
			//var ignoreChars:Array = skipChars || ["i"];
			var nextY:int;
			
			// 繪製的高度。這會影響珠子轉彎的時機。預設6
			var height:int = rowHeight;
			
			// 簡化來源字串
			var roadMapArray:Array = roadMap.split(".");
			
			for (var i:int = 0, len:int = roadMapArray.length; i < len; i++) {
				
				// 當前要處理的結果字串樣式
				currentSymbol = roadMapArray[i];
				//trace( "currentSymbol : " + currentSymbol );
				
				// 直線邏輯
				
				
				// 動態建立陣列
				grid[x] = grid[x] || [];
				
				//trace("x:" + x + ",grid[x]::" + grid[x] );
				
				nextY = y + 1;
				// 假如該grid[x][y + 1]尚未被建立，表示路可以向下，y索引值+1
				if (nextY < height && grid[x][nextY] === undefined) {
					y++;
				} 
					// 否則表示路已被中斷往右增加一個offseeX索引值+1
				else {
					x++;
					y = 0;
					// console.log(i, '└', '將', currentSymbol, '放置在, x:', x + offsetX, ',y:', y, ',offsetX', offsetX);
				}
				
				
				
				// 資料格戳記
				grid[x + offsetX] = grid[x + offsetX] || [];
				grid[x + offsetX][y] = currentSymbol;
				
				_posX = x;
				_posY = y;
				
				prevSymbol = currentSymbol;
				
			}
			
			
			return grid;
			
		}
		
		
		
		
		/**
		 * 
		 * @param	roadMap
		 * @param	skipChars
		 * @param	rowHeight
		 * @return
		 */
		public static function createRoadRenderGrid(roadMap:String, skipChars:Array, rowHeight:int = 6):Array {
			
			// 資料格與行列索引、標記用的參數
			var grid:Array = [], x:int = 0, y:int = -1, offsetX:int = 0, currentSymbol:String = null, prevSymbol:String = null;
			//var ignoreChars:Array = skipChars || ["i"];
			var nextY:int;
			
			// 繪製的高度。這會影響珠子轉彎的時機。預設6
			var height:int = rowHeight;
			
			// 簡化來源字串
			var roadMapArray:Array = roadMap.split(".");
			
			
			for (var i:int = 0, len:int = roadMapArray.length; i < len; i++) {
				
				// 當前要處理的結果字串樣式
				currentSymbol = roadMapArray[i];
				//trace( "currentSymbol : " + currentSymbol );
				
				// 直線邏輯
				if (prevSymbol === null || currentSymbol == prevSymbol ) {
					
					// 動態建立陣列
					grid[x] = grid[x] || [];
					
					//trace("x:" + x + ",grid[x]::" + grid[x] );
					
					nextY = y + 1;
					// 假如該grid[x][y + 1]尚未被建立，表示路可以向下，y索引值+1
					if (nextY < height && grid[x][nextY] === undefined) {
						y++;
					} 
						// 否則表示路已被中斷往右增加一個offseeX索引值+1
					else {
						offsetX++;
					}
					
				} 
					// 換行邏輯
				else if (currentSymbol != prevSymbol ) {
					x++;
					
					//更改的換行邏輯, 之後需要時,可以打開,把底下while 注釋掉
					/*for( var k:int = 0; k < height ; k++ ){
						if (grid[x] ) {
							if( grid[x][k] ) {
								x++;
								k = 0;
							}
						}
					}*/
					
					while (grid[x] && grid[x][0] ) {
						x++;
					}
					
					
					y = 0;
					offsetX = 0;
					
				}
				
				// 資料格戳記
				grid[x + offsetX] = grid[x + offsetX] || [];
				grid[x + offsetX][y] = currentSymbol;
				
				_posX = x;
				_posY = y;
				
				prevSymbol = currentSymbol;
				
			}
			
			
			return grid;
		}
		
		
	}
}