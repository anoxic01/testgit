module lobby.view.route.game.rou {
	export class RouBeadRoad {
		public static var _posX:int =  0;
		public static var _posY:int =  0;
		
		
		public constructor() {
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
			var offX:int = 0;
			
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
					offX += 1;
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
		
		
		
		public static function createZoenRowRenderGrid(roadMap:String, skipChars:Array, rowHeight:int = 7):Array {
			
			// 資料格與行列索引、標記用的參數
			var grid:Array = [], x:int = 0, y:int = -1, offsetX:int = 0, currentSymbol:String = null, prevSymbol:String = null;
			var currentSymbol2:String = null;
			//var ignoreChars:Array = skipChars || ["i"];
			var nextY:int;
			
			// 繪製的高度。這會影響珠子轉彎的時機。預設6
			var height:int = rowHeight;
			
			// 簡化來源字串
			var roadMapArray:Array = roadMap.split(".");
			var offX:int = 0;
			var idx:int = -1;
			var zoen:String = '';
			var row:String = '';
			var zrAr:Array;
			//資料格式:0_1.1_2.i
			
			for (var i:int = 0, len:int = roadMapArray.length; i < len; i++) {
				
				// 當前要處理的結果字串樣式
				currentSymbol = roadMapArray[i];
				//trace( "currentSymbol : " + currentSymbol );
	
				
				idx = -1;
				idx = currentSymbol.indexOf("_");
				
				
				if ( idx != -1 ) {
					
					// 動態建立陣列
					grid[x] = grid[x] || [];
					
					zrAr = currentSymbol.split("_");
					zoen = zrAr[0]; //打
					row = zrAr[1]; //列
					
					
					
					grid[x][int(zoen)] = zoen ; //
					grid[x][int(row)] = row; //
					
					
				}
				else {
					
					// 動態建立陣列
					grid[x] = grid[x] || [];
					grid[x][3] = currentSymbol;

				}
				
				x ++;
				

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
		static public function createRoadRenderGrid(roadMap:String, skipChars:Array, rowHeight:int = 6):Array {
			
			// 資料格與行列索引、標記用的參數
			var grid:Array = [], x:int = 0, y:int = -1, offsetX:int = 0, currentSymbol:String = null, prevSymbol:String = null;
			//var ignoreChars:Array = skipChars || ["i"];
			var nextY:int;
			
			// 繪製的高度。這會影響珠子轉彎的時機。預設6
			var height:int = rowHeight;
			
			// 簡化來源字串
			var roadMapArray:Array = roadMap.split(".");
			var offX:int = 0;
			
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
						offX += 1;
						// console.log(i, '└', '將', currentSymbol, '放置在, x:', x + offsetX, ',y:', y, ',offsetX', offsetX);
					}
					
				} 
				// 換行邏輯
				else if (currentSymbol != prevSymbol ) {
					x++;
					offX++;
					while (grid[x] && grid[x][0]) {
						x++;
						offX++;
					}	
					
					offsetX = 0;
					y = 0;
					// console.log(i, '→', '將', currentSymbol, '放置在, x:', x + offsetX, ',y:', y);
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