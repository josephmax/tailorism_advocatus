/**
 * Created by Administrator on 2016/7/26.
 */
myApp.controller('myRecOrderCtrl', ['$scope', '$location', 'dataService', function ($scope, $location, dataService) {
    var orderList = {
        data: [],
        pager: {}
    };
    var storage = window.sessionStorage,
        data = {
            token: storage.getItem('token')
        };
    //掉线处理
    if (!storage.getItem('token')) {
        $location.path("/login");
    }

    $scope.orderList = orderList;
    $scope.user = {
        order: '',
        order_rate: storage.getItem('order_rate')
    };
    dataService.getOrderDetail(data, showOrderList);

    /* 下拉刷新 */
    var loadPage = 2;
    $scope.loadMore = function () {
        dataService.loadMore('recOrder', loadPage, data, successHandler, finallyHander);
        loadPage++;
    };

    function successHandler(res) {
        var tempList = [];
        tempList['data'] = res.data.data;
        tempList['pager'] = res.data.pager;
        var tList = tempList['data'], sum = parseFloat(orderList.profitTot);
        for (var i = 0, len = tList.length; i < len; i++) {
            tList[i]['create_time'] = dataService.parseTimeString(tList[i].create_time);
            tList[i]['profit'] = (parseInt(tList[i].pay_money) * $scope.user.order_rate).toFixed(2);
            sum += parseFloat(tList[i].profit);
            orderList['data'].push(tList[i]);
        }
    }

    function finallyHander() {
        $scope.$broadcast("scroll.infiniteScrollComplete");
    }

    function showOrderList(res) {
        orderList['data'] = res.data.data;
        orderList['pager'] = res.data.pager;
        var list = orderList['data'], sum = 0;
        for (var i = 0, len = list.length; i < len; i++) {
            list[i]['create_time'] = dataService.parseTimeString(list[i].create_time);
            list[i]['profit'] = (parseInt(list[i].pay_money) * $scope.user.order_rate).toFixed(2);
            sum += parseFloat(list[i].profit);
        }
        orderList['order_count'] = list.length;
        orderList['profitTot'] = sum.toFixed(2);
    }
}]);