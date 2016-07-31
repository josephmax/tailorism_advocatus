/**
 * Created by Administrator on 2016/7/29.
 */
myApp.service('dataService',['$http','$location','$q',function($http,$location,$q){
    var remote_url=new config();
    return {
        login: function (data) {
            $http({
                url: remote_url.URL + '/user/login',
                method: "GET",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                params: data
            }).success(function (res) {
                if (res.status == 0 ){
                    var storage = window.sessionStorage;
                    storage['token'] = res.token;
                    storage['member_id'] = res.data.id;
                    storage['name'] = res.data.name;
                    storage['phone'] = res.data.phone;
                    $location.path('/myPage');
                } else {
                    alert(res.message);
                }
                }).finally(function(res){

            });
        },
        basicInfo: function (data, fn) {
            $http({
                url: remote_url.URL + '/advocatus/details',
                method: "GET",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                params: data
            }).success(function (res) {
                fn(res);
            })
        },
        parseTimeString: function (timeStamp) {
            return new Date(parseInt(timeStamp) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
        },
        getOrderDetail: function (data,fn) {
            $http({
                url: remote_url.URL + "/advocatus/orderList",
                method: "GET",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                params:data
            }).success(function(res){
                fn(res)
            })
        },
        getRecUserDetail:function(data,fn){
            $http({
                url: remote_url.URL + "/advocatus/referList",
                method: "GET",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                params:data
            }).success(function(res){
                fn(res)
            })
        },
        withdrawHis:function(data,fn){
            $http({
                url: remote_url.URL + "/advocatus/withdrawHistory",
                method: "GET",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                params:data
            }).success(function(res){
                fn(res);
            })
        },
        loadMore:function(method,page,data,successHandler,finallyHander){
            methodRouter={
                recUser:remote_url.URL + "/advocatus/referList",
                recOrder:remote_url.URL + "/advocatus/orderList"
            };
            $http({
                url: methodRouter[method],
                method: "GET",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                params:data
            }).success(function(res){
                successHandler(res);
            }).then(function(res){
                finallyHander(res);
            })
        },
        takeMoney:function(data,successHandler){
            $http({
                url: remote_url.URL+'/advocatus/withdraw',
                method: "GET",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                params:data
            }).success(function(res){
                successHandler(res);
            })
        }
    }
}]);