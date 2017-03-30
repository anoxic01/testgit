module lobby.view.gameRecord.lang {
	export class RouletteFindName extends BaseFindName{
		public var dic:Dictionary;	

		//押注號碼組合
		private var T:any[] = [ [ 0, 1, 2 ],
			[ 0, 2, 3 ],
			[ 1, 2, 3 ],
			[ 4, 5, 6 ],
			[ 7, 8, 9 ],
			[ 10, 11, 12 ],
			[ 13, 14, 15 ],
			[ 16, 17, 18 ],
			[ 19, 20, 21 ],
			[ 22, 23, 24 ],
			[ 25, 26, 27 ],
			[ 28, 29, 30 ],
			[ 31, 32, 33 ],
			[ 34, 35, 36 ] ];

		private var D:any[] = [ [ 0, 1 ],
			[ 0, 2 ],
			[ 0, 3 ],
			[ 1, 2 ],
			[ 2, 3 ],
			[ 1, 4 ],
			[ 2, 5 ],
			[ 3, 6 ],
			[ 4, 5 ],
			[ 5, 6 ],
			[ 4, 7 ],
			[ 5, 8 ],
			[ 6, 9 ],
			[ 7, 8 ],
			[ 8, 9 ],
			[ 7, 10 ],
			[ 8, 11 ],
			[ 9, 12 ],
			[ 10, 11 ],
			[ 11, 12 ],
			[ 10, 13 ],
			[ 11, 14 ],
			[ 12, 15 ],
			[ 13, 14 ],
			[ 14, 15 ],
			[ 13, 16 ],
			[ 14, 17 ],
			[ 15, 18 ],
			[ 16, 17 ],
			[ 17, 18 ],
			[ 16, 19 ],
			[ 17, 20 ],
			[ 18, 21 ],
			[ 19, 20 ],
			[ 20, 21 ],
			[ 19, 22 ],
			[ 20, 23 ],
			[ 21, 24 ],
			[ 22, 23 ],
			[ 23, 24 ],
			[ 22, 25 ],
			[ 23, 26 ],
			[ 24, 27 ],
			[ 25, 26 ],
			[ 26, 27 ],
			[ 25, 28 ],
			[ 26, 29 ],
			[ 27, 30 ],
			[ 28, 29 ],
			[ 29, 30 ],
			[ 28, 31 ],
			[ 29, 32 ],
			[ 30, 33 ],
			[ 31, 32 ],
			[ 32, 33 ],
			[ 31, 34 ],
			[ 32, 35 ],
			[ 33, 36 ],
			[ 34, 35 ],
			[ 35, 36 ] ];
		private var Q:any[] = [ [ 0, 1, 2, 3 ],
			[ 1, 2, 4, 5 ],
			[ 2, 3, 5, 6 ],
			[ 4, 5, 7, 8 ],
			[ 5, 6, 8, 9 ],
			[ 7, 18, 10, 11 ],
			[ 8, 9, 11, 12 ],
			[ 10, 11, 13, 14 ],
			[ 11, 12, 14, 15 ],
			[ 13, 14, 16, 17 ],
			[ 14, 15, 17, 18 ], 
			[ 16, 17, 19, 20 ],
			[ 17, 18, 20, 21 ],
			[ 19, 20, 22, 23 ],
			[ 20, 21, 23, 24 ],
			[ 22, 23, 25, 26 ],
			[ 23, 24, 26, 27 ],
			[ 25, 26, 28, 29 ],
			[ 26, 27, 29, 30 ],
			[ 28, 29, 31, 32 ],
			[ 29, 30, 32, 33 ], 
			[ 31, 32, 34, 35 ],
			[ 32, 33, 35, 36 ] ];
		
		private var H:any[] = [ [ 1, 2, 3, 4, 5, 6 ],
			[ 4, 5, 6, 7, 8, 9 ],
			[ 7, 8, 9, 10, 11, 12 ],
			[ 10, 11, 12, 13, 14, 15 ],
			[ 13, 14, 15, 16, 17, 18 ],
			[ 16, 17, 18, 19, 20, 21 ],
			[ 19, 20, 21, 22, 23, 24 ],
			[ 22, 23, 24, 25, 26, 27 ],
			[ 25, 26, 27, 28, 29, 30 ],
			[ 28, 29, 30, 31, 32, 33 ],
			[ 31, 32, 33, 34, 35, 36 ] ];


		private var W:any[] = [ [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ],
			[ 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24 ],
			[ 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36 ],
			[ 1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34 ],
			[ 2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35 ],
			[ 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36 ] ];

		private var E:any[] = [ [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18 ],
			[ 2, 4, 8, 6, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36 ],
			[ 1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36 ],
			[ 2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35 ],
			[ 1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35 ],
			[ 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36 ] ];
		
		private var S:any[] = [[[0]] , [[1]], [[2]], [[3]], [[4]], [[5]], [[6]], [[7]], [[8]], [[9]], [[10]], [[11]], [[12]], [[13]], [[14]], [[15]], [[16]], [[17]], [[18]], 
			[[19]], [[20]], [[21]], [[22]], [[23]], [[24]], [[25]], [[26]], [[27]], [[28]], [[29]], [[30]], [[31]], [[32]], [[33]], [[34]], [[35]], [[36]]];
		
		
		public constructor() {

			dic = new Dictionary();
			for( var i:number= 0 ; i < 60; i++ ){
				dic["D"+ i] = D[i].join(',');  
			}
			
			dic["E0"] = Language.sSmall;
			dic["E1"] = Language.sEven;
			dic["E2"] = Language.sRed;
			dic["E3"] = Language.sBlack;
			dic["E4"] = Language.sOdd;
			dic["E5"] = Language.sBig;

			for( i = 0 ; i < 11; i++ ){
				dic["H"+ i] = H[i].join(',');    
			}
			
			for( i = 0 ; i < 23; i++ ){
				dic["Q"+ i] = Q[i].join(',');    
			}
			
			for( i = 0 ; i < 37; i++ ){
				dic["S"+ i] = S[i].join(',');    
			}
			
			for( i = 0 ; i < 14; i++ ){
				dic["T"+ i] = T[i].join(',');    
			}
			
			dic["W0"] = Language.sBetType_Dozen_1;
			dic["W1"] = Language.sBetType_Dozen_2;
			dic["W2"] = Language.sBetType_Dozen_3;
			dic["W3"] = Language.sBetType_Col_1;
			dic["W4"] = Language.sBetType_Col_2;
			dic["W5"] = Language.sBetType_Col_3;
			
		}
		
		 public function getBetAreaName( _sName:string ):string {
			var _str:string = _sName.substr(0,1);
			var _sReturnStr:string = "";
			if( _str == "D" ){
				_sReturnStr = LobbyManager.getInstance().getLanguageString(Language.sBetType_2 ) +" " +dic[_sName]; 
			}
			else if( _str == "E" ){
				_sReturnStr = LobbyManager.getInstance().getLanguageString(dic[_sName] ) 
				
			}
			else if( _str == "H" ){
				_sReturnStr = LobbyManager.getInstance().getLanguageString(Language.sBetType_5 ) + " " + dic[_sName];
			}
			else if( _str == "Q" ){
				if( _sName != "Q0" ){
					_sReturnStr = LobbyManager.getInstance().getLanguageString(Language.sBetType_4 ) + " " + dic[_sName];
				}
				else {
					_sReturnStr = LobbyManager.getInstance().getLanguageString(Language.sFourNumber ) + " " + dic[_sName];
				}
				
			}
			else if( _str == "S" ){
				
				_sReturnStr = LobbyManager.getInstance().getLanguageString(Language.sBetType_1 ) + " " + dic[_sName];

			}
			else if( _str == "T" ){
				if( _sName != "T0" && _sName != "T1"  ){
					_sReturnStr = LobbyManager.getInstance().getLanguageString(Language.sBetType_3 ) + " " + dic[_sName];
				}
				else if ( _sName == "T0" || _sName == "T1"   ){
					_sReturnStr = LobbyManager.getInstance().getLanguageString(Language.sBetType_3N ) + " " + dic[_sName];
				}
				
			}
			else if( _str == "W" ){
				_sReturnStr = LobbyManager.getInstance().getLanguageString(dic[_sName] );
				
			}
			
			
			return _sReturnStr;
		}
		

	}
}