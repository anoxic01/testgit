module lobby.view.route {
	export class BeadRoad {
		public constructor() {
		}
	public static var _posX:int =  0;
		public static var _posY:int =  0;
		
		
	
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
			var ignoreChars:Array = skipChars || ["i"];
			var nextY:int;
			
			// 繪製的高度。這會影響珠子轉彎的時機。預設6
			var height:int = rowHeight;
			
			// 簡化來源字串
			var roadMapArray:Array = roadMap.split("");
			var offX:int = 0;
			
			for (var i:int = 0, len:int = roadMapArray.length; i < len; i++) {
				
				// 當前要處理的結果字串樣式
				currentSymbol = roadMapArray[i];
				//trace( "currentSymbol : " + currentSymbol );
				
				// 直線邏輯
				if (prevSymbol === null || currentSymbol == prevSymbol || ignoreChars.indexOf(currentSymbol) > -1) {
					
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
				else if (currentSymbol != prevSymbol && ignoreChars.indexOf(currentSymbol) == -1) {
					x++;
					offX++;
					while (grid[x] && grid[x][0]) {
						x++;
						offX++;
					}					
					y = 0;
					offsetX = 0;
					// console.log(i, '→', '將', currentSymbol, '放置在, x:', x + offsetX, ',y:', y);
				}
				
				// 資料格戳記
				grid[x + offsetX] = grid[x + offsetX] || [];
				grid[x + offsetX][y] = currentSymbol;
				
				_posX = x;
				_posY = y;
				if (ignoreChars.indexOf(currentSymbol) == -1) {
					prevSymbol = currentSymbol;
				}
			}
			
			var lastPoint:Point=new Point((x + offsetX),_posY)
				
			return [grid,offX,lastPoint];
		}
		
		/**
		 * 加入大路的陣列  grid ->閒庄陣列  iGrid ->和陣列
		 * 
		 * @param	roadMap
		 * @param	skipChars
		 * @param	rowHeight
		 * @return
		 */
		static public function createBigRoadRenderGrid(roadMap:String, skipChars:Array, rowHeight:int = 6):Array {
			
			// 資料格與行列索引、標記用的參數
			var grid:Array = [], x:int = 0, y:int = -1, offsetX:int = 0, currentSymbol:String = null, prevSymbol:String = null;
			var ignoreChars:Array = skipChars || ["i"];
			var nextY:int;
			
			// 繪製的高度。這會影響珠子轉彎的時機。預設6
			var height:int = rowHeight;
			
			// 簡化來源字串
			var roadMapArray:Array = roadMap.split(".");
			
			var roadValue:String = '';
			var iGrid:Array = [];  //和的資料格
			
			var offX:int = 0;
			
			//obj = {"0":[i,i,i,i,i], "1":[i,i,i]};
			
			//trace("roadMapArray::" + roadMapArray );
			//iaaaaiiiiaaeeeeee
			for (var i:int = 0, len:int = roadMapArray.length; i < len; i++) {
				// 當前要處理的結果字串樣式
				currentSymbol = roadMapArray[i];
				//trace( "currentSymbol : " + currentSymbol );
				
				// 直線邏輯
				if ( ( prevSymbol === null || currentSymbol == prevSymbol )  && ignoreChars.indexOf(currentSymbol) == -1 ) {
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
				else if ( ignoreChars.indexOf(currentSymbol) > -1 ) {  //找到i
					
					var x2:int = offsetX + x;
					//trace("x2::" + x2 );
					
					nextY = y;
					if ( nextY == -1 ) 
						 nextY = 0;
						 
					// 動態建立陣列
					iGrid[x2] = iGrid[x2] || [];					
					iGrid[x2][nextY] = iGrid[x2][nextY] || [];
					iGrid[x2][nextY].push( currentSymbol );
					
					if(i==0 && currentSymbol=="i"){
						prevSymbol = currentSymbol;
						// 資料格戳記
						grid[0] = [];
						grid[0][0] = "";
						
					}
				}
				// 換行邏輯
				else if (currentSymbol != prevSymbol  && ignoreChars.indexOf(currentSymbol) == -1) {
					x++;
					offX++;
					while (grid[x] && grid[x][0]) {
						x++;
						offX++;
					}
					y = 0;
					offsetX = 0;
					// console.log(i, '→', '將', currentSymbol, '放置在, x:', x + offsetX, ',y:', y);
				}
				
			
				
				//不是i 不要加入
				if (ignoreChars.indexOf(currentSymbol) == -1 ) {
					
					prevSymbol = currentSymbol;
					// 資料格戳記
					grid[x + offsetX] = grid[x + offsetX] || [];
					grid[x + offsetX][y] = currentSymbol;
					
					_posX = x;
					_posY = y;					
					
				}
				
				//trace("offsetX::" + offsetX) ;
				
			}
			var lastPoint:Point=new Point((x + offsetX),_posY)
			//trace("offX::" + offX );
						
			return [grid, iGrid , offX,lastPoint];  //一個是沒有和的grid  , 一個是有和的grid
		}
		
		/**
		 * 建立大路的資料格。主要是用來給其他下路參考的大眼路，小路、蟑螂路
		 * @radMapString {String} 要分析的資料字串，會自動簡化剩下莊(a)閒(e)和(i)再分析
		 * @returns {Array} 轉換過的"大路"資料格
		 */
		static public function createRoadReanderString(roadMap:String):RoadStringObject {
			// 資料格與行列索引、標記用的參數
			var grid:Array = [], x:int = 0, y:int = -1, currentSymbol:String = null, prevSymbol:String = null, mark:Array = [], result:RoadStringObject = new RoadStringObject();
			// 簡化來源字串
			result.bigRoad = roadMap.replace(/[abcd]/gi, 'a').replace(/[efgh]/gi, 'e').replace(/[ijkl]/gi, 'i');
			
			var roadMapArray:Array = result.bigRoad.split('.');
			
			for (var index:int = 0; index < roadMapArray.length; index++) {
				// 當前要處理的結果字串樣式
				
				currentSymbol = roadMapArray[index];
				
				if(index==0 && currentSymbol=="i"){
					prevSymbol = currentSymbol;
					// 資料格戳記 第一局开和 , 记录 
					
				}else if (currentSymbol== "i" ) {
					continue;
				}
				
				if (prevSymbol === null || currentSymbol == prevSymbol || currentSymbol == 'i') {
					y++;
				} else if (currentSymbol != prevSymbol && currentSymbol != 'i') {
					y = 0;
					x++;
				}
				
				// 動態建立陣列
				grid[x] = grid[x] || [];
				grid[x][y] = currentSymbol;
				
				if (currentSymbol != "i") {
					prevSymbol = currentSymbol;
				}
			}
			
			for (var i:int = 0; i < grid.length; i++) {
				for (var j:int = 0; j < grid[i].length; j++) {
					
					if(grid[0][0] == "i"){
						grid[0][0]="a" //第一局和局 特殊处理
					}else if (i === 0 || grid[i][j] == "i") {
						continue;
					}
					
					//k = 大陸1 , 小路2 , 蟑螂露3
					for (var k:int = 1; k <= 3; k++) {
						if (i > (k - 1) && !(i === k && j === 0)) {
							var matchCol:Array = grid[i - k].join('').replace(/[i]/gi, '').split('');
							var qLen:int = grid[i].join("").match(/[i]/g).length;
							var iLength:int = qLen ? qLen : 0;
							mark[k - 1] = matchCol[j-iLength] || (!matchCol[j] && !matchCol[j - 1-iLength]) ? 'a' : 'e';
							
							if (j === 0) {
								var qALen:int = grid[i - 1].join("").match(/[ae]/g).length;
								var aLength:int = qALen ? qALen : 0;
								var qBLen:int = grid[i - (k + 1)].join("").match(/[ae]/g).length;
								var bLength:int = qBLen ? qBLen : 0;
								mark[k - 1] = grid[i - (k + 1)] && aLength == bLength ? "a" : "e";
							}
						}
					}
					result.bigEyeRoad += mark[0] ? mark[0] : "";
					result.smallRoad += mark[1] ? mark[1] : "";
					result.roachRoad += mark[2] ? mark[2] : "";
					//trace(result.bigEyeRoad)
				}
			}
			
			return result;
		}
		
		static public function drawReaderDataGrid(readerDataGrid:Array, ballClass:Class, width:int, height:int, isAsk:Boolean = false):RoadCanvas {
			var symbol:String;
			var gridWidth:int = width || 14;
			var gridHeight:int = height || 6;
			var startX:int = readerDataGrid.length <= 14 ? 0 : readerDataGrid.length - gridWidth;
			
			var canvas:RoadCanvas = new RoadCanvas;
			var ball:MovieClip;
			
			for (var x:int = 0, colIndex:int = 0, cols:int = readerDataGrid.length; x < cols; x++) {
				for (var y:int = 0, rows:int = readerDataGrid[x].length; y < rows; y++) {
					symbol = readerDataGrid[x][y];
					if (x >= startX && symbol) {
						ball = new ballClass();
						canvas.put(ball, symbol, ball.width * colIndex, ball.height * y);
					}
				}
				if (x >= startX) {
					colIndex++;
				}
			}
			
			//canvas.show(isAsk);
			return canvas;
		}
	}

}