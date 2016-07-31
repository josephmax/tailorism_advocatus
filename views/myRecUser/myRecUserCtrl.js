/**
 * Created by Administrator on 2016/7/26.
 */
myApp.controller('myRecUserCtrl',['$scope','$location','dataService',function($scope,$location,dataService){
    var userList={
        data:[],
        pager:{}
    };
    var storage=window.sessionStorage,data={
        token:storage.getItem('token')
    },profitpp= 5;
    var profitTot;
    //掉线处理
    if (!storage.getItem('token')){
        $location.path("/login");
    }

    $scope.recUserList=userList;
    $scope.user={
        user:'',
        user_profit:'',
        profitpp:profitpp
    };

    dataService.getRecUserDetail(data,showUserList);

    function showUserList(res){
        userList['data']=res.data.data;
        userList['pager']=res.data.pager;
        var list=userList['data'];
        for(var i = 0, len=list.length;i<len;i++){
            list[i]['create_time']=dataService.parseTimeString(list[i].create_time);
        }
        userList['user_count']=list.length;
        console.log(userList.user_count);
        profitTot=profitpp*parseInt(userList.user_count);
        $scope.user.user_profit=profitTot;
    }

    /* 下拉刷新 */
    var loadPage=2;
    $scope.loadMore = function () {
        dataService.loadMore('recUser',loadPage,data,successHandler,finallyHander);
        loadPage++;
    };
    function successHandler(res){
        var tempList=[];
        tempList['data']=res.data.data;
        tempList['pager']=res.data.pager;
        var tList=tempList['data'];
        for(var i = 0, len=tList.length;i<len;i++){
            tList[i]['create_time']=dataService.parseTimeString(tList[i].create_time);
            userList.data.push(tList[i]);
        }
        tempList['user_count']=tList.length;

    }
    function finallyHander(){
        $scope.$broadcast("scroll.infiniteScrollComplete");
    }
}]);