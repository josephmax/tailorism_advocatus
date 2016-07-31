/**
 * Created by Administrator on 2016/7/26.
 */
myApp.controller('myPageCtrl',['$scope','$location','dataService',function($scope,$location,dataService){
    var userInfo={};
    function showInfo(res){
        userInfo['name']=res.data.name;
        userInfo['avatar_url']=res.data.avatar_url;
        userInfo['phone']=res.data.phone;
        userInfo['total']=parseInt(res.data.total)+parseInt(res.data.refer)*parseInt(res.data.refer_fee);
        userInfo['create_time']=dataService.parseTimeString(res.data.create_time);
        userInfo['refer']=res.data.refer;
        userInfo['scan_count']=res.data.scan_count;
        userInfo['order_count']=res.data.order_count;
        window.sessionStorage.setItem('order_rate',res.data.order_rate);
        window.sessionStorage.setItem('profit',res.data.total);
        window.sessionStorage.setItem('order_count',res.data.order_count);
        window.sessionStorage.setItem('refer',res.data.refer);
    }
    $scope.userInfo=userInfo;
    $scope.logOut=function(){
        window.sessionStorage.clear();
        $location.path('/login');
    };
    //初始化页面数据
    var storage=window.sessionStorage;

    //掉线处理
    if (!storage.getItem('token')){
        $location.path("/login");
    } else {
        var data = {
            member_id: storage.getItem('member_id'),
            token: storage.getItem('token')
        };
        dataService.basicInfo(data, showInfo);
    }
}]);