(function() {
  'use strict';
  // 数据服务, 提供本地后台数据交互

  angular
    .module('pf.core')
    .factory('dataService', dataService);

  dataService.$inject = ['$http', '$q', 'errorService', 'coreCF'];
  function dataService($http, $q, errorService, config) {
    var _urlMap = config.urlMap; // 请求地址映射
    var service = {
      'get': get,
      'post': post,
      'getItem': getItem,
      'setItem': setItem,
      'removeCookie': removeCookie,
      'getCookieObj': getCookieObj,
      'putCookieObj': putCookieObj
    };
    return service;

    /**
     * 指定action名获取数据
     * @param  {String} name action映射名称
     * @param  {Object} params 对应参数
     * @return {Promise} 承诺
     */
    function get(name, params) {
      var url = createRepeatUrl(name);
      var options = {'params': params};

      return $http.get(url, options)
        .then(completeCallBack)
        .catch(failedCallBack);
    }

    /**
     * 同get, 对angular的post封装
     * @param  {String} name   action映射名称
     * @param  {Object} params 对应参数
     * @return {Promise}       承诺
     */
    function post(name, params) {
      var url = createRepeatUrl(name);

      return $http.post(url, params)
        .then(completeCallBack)
        .catch(failedCallBack);
    }

    //jquery-cookie封装
    function getCookieObj(key, options) {
      return $.cookie(key);
    }

    function putCookieObj(key, value, options) {
      return $.cookie(key, value, options);
    }

    function removeCookie(key, options) {
      return $.removeCookie(key, options);
    }
    //jquery-cookie封装
    
    // html5本地储存封装
    function setItem(key, value) {
      if (!angular.isString(value)) {
        value = angular.toJson(value);
      }
      return window.localStorage.setItem(key, value);
    }

    function getItem(key) {
      var value = {};
      var string = window.localStorage.getItem(key);
      if (string) { value = angular.fromJson(string); }
      return value;
    }
    // html5本地储存封装
    
    // 正确完成后回调
    function completeCallBack(response) {
      var data = response.data;
console.info('DaTa', new Date().getTime(), data);
      // 错误信息拦截
      return errorService.interception(data); // 注意返回
    }

    // 失败后的回调
    function failedCallBack(error) {
      switch (error.status) {
        case 600: // 未登录
          errorService.swallow(errorService.NotLoggedIn);
        break;
        case 650: // 无权限
          errorService.swallow(errorService.NoPermission);
        break;
        default:
          console.error(error.status);
        break;
      }

      return $q.reject('酷, 这是什么鬼(╯‵□′)╯︵┻━┻!'); // 返回前台错误对象?
    }

    /**
     * 根据配置创建请求地址
     * @param  {String} name key
     * @return {String} 返回实际请求地址
     */
    function createRepeatUrl(name) {
      var mapObject = _urlMap[name];
      if (angular.isString(mapObject)) { // 拼接规则
        return config.baseUrl + mapObject;
      } else {
        return mapObject.base + mapObject.action;
      }
    }
  }

})();