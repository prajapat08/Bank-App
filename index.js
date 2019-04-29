 (function() {
   angular
      .module('myApp', ['ui.bootstrap','ngStorage'])
      
      .controller('main', ['$scope','$http','$localStorage',
        function ($scope, $http) { 
          $scope.showrecord = false;
          $scope.showrecord1 = false;
             $scope.getBank = function (location) {
              $scope.showrecord = false;
              $scope.showrecord1 = true;
              $scope.data = '';
              $scope.showdetails = false;
              $scope.arrayresult =[];
              
    
             $http.get('https://vast-shore-74260.herokuapp.com/banks?city=' + location, {cache: true})
             .then (function(response){
                $scope.data = response.data;
                $scope.showrecord = true;
                $scope.showrecord1 = false;

                $scope.viewby = 10;
                $scope.totalItems = $scope.data.length;
                $scope.currentPage = 4;
                $scope.itemsPerPage = $scope.viewby;
                $scope.maxSize = 4; 
                $scope.setPage = function (pageNo) {
                  $scope.currentPage = pageNo;
                };
               
                $scope.pageChanged = function() {
                  console.log('Page changed to: ' + $scope.currentPage);
                };
              
              $scope.setItemsPerPage = function(num) {
                $scope.itemsPerPage = num;
                $scope.currentPage = 1; 
              }

            

             });
            }

            $scope.getDetails = function(ifsc){
              $scope.showdetails = true;
              $scope.result = $scope.data.find( bank => bank.ifsc == ifsc );
               
              console.log($scope.arrayresult)
              for(var j = 0; j<$scope.totalItems; j++){
                $scope.bank_ifsc = $scope.data[j].ifsc;
                $scope.result = $scope.data.find( bank => bank.ifsc == ifsc );
                $scope.arrayresult.push($scope.bank_ifsc);
              }
            }
               $scope.addfavorite = function(ifsc)
               {
                $localStorage.message = ifsc;
                
               }
              // alert("Bank Details \n BANK NAME: " +result.bank_name +" \n IFSC: "+result.ifsc+"\n Bank Id: "+result.bank_id+
              // "\n BRANCH: "+result.branch +"\n CITY: "+result.city +"\n STATE: "+result.state );
            
 
        }
      ]);  
  }());  
