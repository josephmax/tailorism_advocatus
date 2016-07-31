/**
 * Created by Administrator on 2016/7/26.
 */
myApp.controller('loginCtrl',['$scope','$location','dataService',function($scope,$location,dataService){
    $scope.data={
        'phone':'',
        'password':''
    };
    $scope.login=function(){
        dataService.login($scope.data);
    }

    //缓存登录验证
    var storage=window.sessionStorage;
    if (storage.getItem('token')){
        $location.path('/myPage');
    }
}]);