/**
 * Created by Administrator on 2016/7/26.
 */
myApp.controller('myProfitCtrl',['$scope','$location','dataService',function($scope,$location,dataService){
    var storage=window.sessionStorage;
    //���ߴ���
    if (!storage.getItem('token')){
        $location.path("/login");
    }
    //�ύ����Ĳ���
    var data= {
        member_id: storage.getItem('member_id'),
        token:storage.getItem('token')
    };

    //������ʷ��¼����
    var withdrawHis={
        data:[],
        pager:{}
    };
    function showHis(res){
        withdrawHis=res.data;
        for(var i= 0,len=withdrawHis.data.length;i<len;i++){
            withdrawHis.data[i].create_time=dataService.parseTimeString(withdrawHis.data[i].create_time);
        }
        $scope.withdrawHis=withdrawHis;
    }
    dataService.withdrawHis(data,showHis);

    //������㲿��
    function showProfit(res){
        var recUserProfit=parseInt(res.data.refer)*parseInt(res.data.refer_fee),
            recScanUserProfit=parseInt(res.data.scan_count)*parseInt(res.data.scan_fee),
            orderProfit=parseInt(res.data.total);
        $scope.profit={
            recUserProfit:recUserProfit,
            recScanUserProfit:recScanUserProfit,
            orderProfit:orderProfit,
            totalProfit:recScanUserProfit+recScanUserProfit+orderProfit,
            remaining:parseInt(res.data.remaining)
        };
    }
    dataService.basicInfo(data,showProfit);

}]);