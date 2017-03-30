module lobby.view.route.game.rou {
	export class RouBeadRoad {
		public static var _posX:number=  0;
		public static var _posY:number=  0;
		
		
		public constructor() {
		}
		
		public static function createBeadGrid(roadMap:string, skipChars:any[], rowHeight:number= 6):any[] {
			
			// 資料格與行列索引、標記用的參數
			var grid:any[] = [], x:number= 0, y:number= -1, offsetX:number= 0, currentSymbol:string = null, prevSymbol:string = null;
			//var ignoreChars:any[] = skipChars || ["i"];
			var nextY:number;
			
			// 繪製的高度。這會影響珠子轉彎的時機。預設6
			var height:number= rowHeight;
			
			// 簡化來源字串
			var roadMapArray:any[] = roadMap.split(".");
			var offX:number= 0;
			
			for (var i:number= 0, len:number= roadMapArray.length; i < len; i++) {
				
				// 當前要處理的結果字串樣式
				currentSymbol = roadMapArray[i];
				//console.log( "currentSymbol : " + currentSymbol );
				
				// 直線邏輯
				
				
				// 動態建立陣列
				grid[x] = grid[x] || [];
				
				//console.log("x:" + x + ",grid[x]::" + grid[x] );
				
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
		
		
		
		public static function createZoenRowRenderGrid(roadMap:string, skipChars:any[], rowHeight:number= 7):any[] {
			
			// 資料格與行列索引、標記用的參數
			var grid:any[] = [], x:number= 0, y:number= -1, offsetX:number= 0, currentSymbol:string = null, prevSymbol:string = null;
			var currentSymbol2:string = null;
			//var ignoreChars:any[] = skipChars || ["i"];
			var nextY:number;
			
			// 繪製的高度。這會影響珠子轉彎的時機。預設6
			var height:number= rowHeight;
			
			// 簡化來源字串
			var roadMapArray:any[] = roadMap.split(".");
			var offX:number= 0;
			var idx:number= -1;
			var zoen:string = '';
			var row:string = '';
			var zrAr:any[];
			//資料格式:0_1.1_2.i
			
			for (var i:number= 0, len:number= roadMapArray.length; i < len; i++) {
				
				// 當前要處理的結果字串樣式
				currentSymbol = roadMapArray[i];
				//console.log( "currentSymbol : " + currentSymbol );
	
				
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
		static public function createRoadRenderGrid(roadMap:string, skipChars:any[], rowHeight:number= 6):any[] {
			
			// 資料格與行列索引、標記用的參數
			var grid:any[] = [], x:number= 0, y:number= -1, offsetX:number= 0, currentSymbol:string = null, prevSymbol:string = null;
			//var ignoreChars:any[] = skipChars || ["i"];
			var nextY:number;
			
			// 繪製的高度。這會影響珠子轉彎的時機。預設6
			var height:number= rowHeight;
			
			// 簡化來源字串
			var roadMapArray:any[] = roadMap.split(".");
			var offX:number= 0;
			
			for (var i:number= 0, len:number= roadMapArray.length; i < len; i++) {
				
				// 當前要處理的結果字串樣式
				currentSymbol = roadMapArray[i];
				//console.log( "currentSymbol : " + currentSymbol );
				
				// 直線邏輯
				if (prevSymbol === null || currentSymbol == prevSymbol ) {
					// 動態建立陣列
					grid[x] = grid[x] || [];
					//console.log("x:" + x + ",grid[x]::" + grid[x] );
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