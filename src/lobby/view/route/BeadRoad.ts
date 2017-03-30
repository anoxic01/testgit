module lobby.view.route {
	export class BeadRoad {
		public constructor() {
		}
	public static _posX:number=  0;
		public static _posY:number=  0;
		
		
	
		/**
		 * 
		 * @param	roadMap
		 * @param	skipChars
		 * @param	rowHeight
		 * @return
		 */
		static public createRoadRenderGrid(roadMap:String, skipChars:any[], rowHeight:number= 6):any[] {
			
			// 資料格與行列索引、標記用的參數
			var grid:any[] = [], x:number= 0, y:number= -1, offsetX:number= 0, currentSymbol:String = null, prevSymbol:String = null;
			var ignoreChars:any[] = skipChars || ["i"];
			var nextY:number;
			
			// 繪製的高度。這會影響珠子轉彎的時機。預設6
			var height:number= rowHeight;
			
			// 簡化來源字串
			var roadMapArray:any[] = roadMap.split("");
			var offX:number= 0;
			
			for (var i:number= 0, len:number= roadMapArray.length; i < len; i++) {
				
				// 當前要處理的結果字串樣式
				currentSymbol = roadMapArray[i];
				//console.log( "currentSymbol : " + currentSymbol );
				
				// 直線邏輯
				if (prevSymbol === null || currentSymbol == prevSymbol || ignoreChars.indexOf(currentSymbol) > -1) {
					
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
		static public createBigRoadRenderGrid(roadMap:String, skipChars:any[], rowHeight:number= 6):any[] {
			
			// 資料格與行列索引、標記用的參數
			var grid:any[] = [], x:number= 0, y:number= -1, offsetX:number= 0, currentSymbol:String = null, prevSymbol:String = null;
			var ignoreChars:any[] = skipChars || ["i"];
			var nextY:number;
			
			// 繪製的高度。這會影響珠子轉彎的時機。預設6
			var height:number= rowHeight;
			
			// 簡化來源字串
			var roadMapArray:any[] = roadMap.split(".");
			
			var roadValue:String = '';
			var iGrid:any[] = [];  //和的資料格
			
			var offX:number= 0;
			
			//obj = {"0":[i,i,i,i,i], "1":[i,i,i]};
			
			//console.log("roadMapArray::" + roadMapArray );
			//iaaaaiiiiaaeeeeee
			for (var i:number= 0, len:number= roadMapArray.length; i < len; i++) {
				// 當前要處理的結果字串樣式
				currentSymbol = roadMapArray[i];
				//console.log( "currentSymbol : " + currentSymbol );
				
				// 直線邏輯
				if ( ( prevSymbol === null || currentSymbol == prevSymbol )  && ignoreChars.indexOf(currentSymbol) == -1 ) {
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
				else if ( ignoreChars.indexOf(currentSymbol) > -1 ) {  //找到i
					
					var x2:number= offsetX + x;
					//console.log("x2::" + x2 );
					
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
				
				//console.log("offsetX::" + offsetX) ;
				
			}
			var lastPoint:Point=new Point((x + offsetX),_posY)
			//console.log("offX::" + offX );
						
			return [grid, iGrid , offX,lastPoint];  //一個是沒有和的grid  , 一個是有和的grid
		}
		
		/**
		 * 建立大路的資料格。主要是用來給其他下路參考的大眼路，小路、蟑螂路
		 * @radMapString {String} 要分析的資料字串，會自動簡化剩下莊(a)閒(e)和(i)再分析
		 * @returns {Array} 轉換過的"大路"資料格
		 */
		static public createRoadReanderString(roadMap:String):RoadStringObject {
			// 資料格與行列索引、標記用的參數
			var grid:any[] = [], x:number= 0, y:number= -1, currentSymbol:String = null, prevSymbol:String = null, mark:any[] = [], result:RoadStringObject = new RoadStringObject();
			// 簡化來源字串
			result.bigRoad = roadMap.replace(/[abcd]/gi, 'a').replace(/[efgh]/gi, 'e').replace(/[ijkl]/gi, 'i');
			
			var roadMapArray:any[] = result.bigRoad.split('.');
			
			for (var index:number= 0; index < roadMapArray.length; index++) {
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
			
			for (var i:number= 0; i < grid.length; i++) {
				for (var j:number= 0; j < grid[i].length; j++) {
					
					if(grid[0][0] == "i"){
						grid[0][0]="a" //第一局和局 特殊处理
					}else if (i === 0 || grid[i][j] == "i") {
						continue;
					}
					
					//k = 大陸1 , 小路2 , 蟑螂露3
					for (var k:number= 1; k <= 3; k++) {
						if (i > (k - 1) && !(i === k && j === 0)) {
							var matchCol:any[] = grid[i - k].join('').replace(/[i]/gi, '').split('');
							var qLen:number= grid[i].join("").match(/[i]/g).length;
							var iLength:number= qLen ? qLen : 0;
							mark[k - 1] = matchCol[j-iLength] || (!matchCol[j] && !matchCol[j - 1-iLength]) ? 'a' : 'e';
							
							if (j === 0) {
								var qALen:number= grid[i - 1].join("").match(/[ae]/g).length;
								var aLength:number= qALen ? qALen : 0;
								var qBLen:number= grid[i - (k + 1)].join("").match(/[ae]/g).length;
								var bLength:number= qBLen ? qBLen : 0;
								mark[k - 1] = grid[i - (k + 1)] && aLength == bLength ? "a" : "e";
							}
						}
					}
					result.bigEyeRoad += mark[0] ? mark[0] : "";
					result.smallRoad += mark[1] ? mark[1] : "";
					result.roachRoad += mark[2] ? mark[2] : "";
					//console.log(result.bigEyeRoad)
				}
			}
			
			return result;
		}
		
		static public drawReaderDataGrid(readerDataGrid:any[], ballClass:Class, width:number, height:number, isAsk: boolean = false):RoadCanvas {
			var symbol:String;
			var gridWidth:number= width || 14;
			var gridHeight:number= height || 6;
			var startX:number= readerDataGrid.length <= 14 ? 0 : readerDataGrid.length - gridWidth;
			
			var canvas:RoadCanvas = new RoadCanvas;
			var ball:MovieClip;
			
			for (var x:number= 0, colIndex:number= 0, cols:number= readerDataGrid.length; x < cols; x++) {
				for (var y:number= 0, rows:number= readerDataGrid[x].length; y < rows; y++) {
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