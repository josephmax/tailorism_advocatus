/**
 * Created by Administrator on 2016/7/31.
 */
myApp.controller('myQrcodeCtrl',['$scope','$location','dataService',function($scope,$location,dataService){
    var storage=window.sessionStorage,
        picPath,
        data={
            member_id: storage.getItem('member_id'),
            token:storage.getItem('token')
        };
    //掉线处理
    if (!data.token){
        $location.path("/login");
    }
    //处理图片
    function showPic(res){
        $scope.picPath="http://www.shliangyi.net/qrimg/"+res.data.qrcode_url;
    }
    dataService.basicInfo(data, showPic);
}]);