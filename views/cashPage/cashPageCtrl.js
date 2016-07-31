/**
 * Created by Administrator on 2016/7/26.
 */
myApp.controller('cashPageCtrl',['$scope','$rootScope','dataService',function($scope,$rootScope,dataService){

    //提交所需的参数
    var storage=window.sessionStorage;
    var data = {
        token: storage.getItem('token'),
        member_id: storage.getItem('member_id')
    };

    //选择取现额度页面逻辑
    $scope.chosen=0;
    $scope.choseCash=function(num){
        $scope.chosen = $scope.chosen!=num? num : 0;
    };

    //页面加载时获取提现额初值
    $scope.remaining=0;
    dataService.basicInfo(data, remainHandler);

    //提现逻辑
    $scope.takeMoney=function(num){
        if (num!=0) {
            if ($scope.remaining>num) {
                //设置提现额并提交参数
                data['amount']= parseFloat(num);
                //执行取现，提交取现额
                dataService.takeMoney(data, successHandler);
            } else {
                alert("您的可提现额度不足"+num+"元");
            }
        } else {
            alert("请选择提现额");
        }
    };
    function successHandler(res){
        alert(res.message);
    }

    function remainHandler(res){
        $scope.remaining=parseFloat(res.data.remaining).toFixed(2);
    }
}]);