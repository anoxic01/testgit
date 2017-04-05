module lobby.view.gameRecord.lang {
	export class RouletteFindName extends BaseFindName{
		public dic;	

		//押注號碼組合
		private T:any[] = [ [ 0, 1, 2 ],
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

		private D:any[] = [ [ 0, 1 ],
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
		private Q:any[] = [ [ 0, 1, 2, 3 ],
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
		
		private H:any[] = [ [ 1, 2, 3, 4, 5, 6 ],
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


		private W:any[] = [ [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ],
			[ 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24 ],
			[ 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36 ],
			[ 1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34 ],
			[ 2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35 ],
			[ 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36 ] ];

		private E:any[] = [ [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18 ],
			[ 2, 4, 8, 6, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36 ],
			[ 1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36 ],
			[ 2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35 ],
			[ 1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35 ],
			[ 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36 ] ];
		
		private S:any[] = [[[0]] , [[1]], [[2]], [[3]], [[4]], [[5]], [[6]], [[7]], [[8]], [[9]], [[10]], [[11]], [[12]], [[13]], [[14]], [[15]], [[16]], [[17]], [[18]], 
			[[19]], [[20]], [[21]], [[22]], [[23]], [[24]], [[25]], [[26]], [[27]], [[28]], [[29]], [[30]], [[31]], [[32]], [[33]], [[34]], [[35]], [[36]]];
		
		
		public constructor() {
			super();
			
			this.dic = {};
			for( var i:number= 0 ; i < 60; i++ ){
				this.dic["D"+ i] = this.D[i].join(',');  
			}
			
			this.dic["E0"] = language.Language.sSmall;
			this.dic["E1"] = language.Language.sEven;
			this.dic["E2"] = language.Language.sRed;
			this.dic["E3"] = language.Language.sBlack;
			this.dic["E4"] = language.Language.sOdd;
			this.dic["E5"] = language.Language.sBig;

			for( i = 0 ; i < 11; i++ ){
				this.dic["H"+ i] = this.H[i].join(',');    
			}
			
			for( i = 0 ; i < 23; i++ ){
				this.dic["Q"+ i] = this.Q[i].join(',');    
			}
			
			for( i = 0 ; i < 37; i++ ){
				this.dic["S"+ i] = this.S[i].join(',');    
			}
			
			for( i = 0 ; i < 14; i++ ){
				this.dic["T"+ i] = this.T[i].join(',');    
			}
			
			this.dic["W0"] = language.Language.sBetType_Dozen_1;
			this.dic["W1"] = language.Language.sBetType_Dozen_2;
			this.dic["W2"] = language.Language.sBetType_Dozen_3;
			this.dic["W3"] = language.Language.sBetType_Col_1;
			this.dic["W4"] = language.Language.sBetType_Col_2;
			this.dic["W5"] = language.Language.sBetType_Col_3;
			
		}
		
		 public getBetAreaName( _sName:string ):string {
			var _str:string = _sName.substr(0,1);
			var _sReturnStr:string = "";
			if( _str == "D" ){
				_sReturnStr = manager.LobbyManager.getInstance().getLanguageString(language.Language.sBetType_2 ) +" " +this.dic[_sName]; 
			}
			else if( _str == "E" ){
				_sReturnStr = manager.LobbyManager.getInstance().getLanguageString(this.dic[_sName] ) 
				
			}
			else if( _str == "H" ){
				_sReturnStr = manager.LobbyManager.getInstance().getLanguageString(language.Language.sBetType_5 ) + " " + this.dic[_sName];
			}
			else if( _str == "Q" ){
				if( _sName != "Q0" ){
					_sReturnStr = manager.LobbyManager.getInstance().getLanguageString(language.Language.sBetType_4 ) + " " + this.dic[_sName];
				}
				else {
					_sReturnStr = manager.LobbyManager.getInstance().getLanguageString(language.Language.sFourNumber ) + " " + this.dic[_sName];
				}
				
			}
			else if( _str == "S" ){
				
				_sReturnStr = manager.LobbyManager.getInstance().getLanguageString(language.Language.sBetType_1 ) + " " + this.dic[_sName];

			}
			else if( _str == "T" ){
				if( _sName != "T0" && _sName != "T1"  ){
					_sReturnStr = manager.LobbyManager.getInstance().getLanguageString(language.Language.sBetType_3 ) + " " + this.dic[_sName];
				}
				else if ( _sName == "T0" || _sName == "T1"   ){
					_sReturnStr = manager.LobbyManager.getInstance().getLanguageString(language.Language.sBetType_3N ) + " " + this.dic[_sName];
				}
				
			}
			else if( _str == "W" ){
				_sReturnStr = manager.LobbyManager.getInstance().getLanguageString(this.dic[_sName] );
				
			}
			
			
			return _sReturnStr;
		}
		

	}
}