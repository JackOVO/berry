(function() {
  'use strict';

  angular
    .module('platform.core')
    .factory('dataService', dataService);

  dataService.$inject = ['$http', '$cookieStore', '$q', 'coreCF'];
  function dataService($http, $cookieStore, $q, config) {

    var map = config.urlMap;
    return {
      'get': get,
      'post': post,
      'getCookieObj': getCookieObj
    };

    /**
     * 根据配置创建请求地址
     * @param  {String} name key
     * @return {String} 最后得出的请求地址
     */
    function createRepeatUrl(name) {
      var mapObject = map[name];
      if (angular.isString(mapObject)) {
        return config.baseUrl + mapObject;
      } else {
        return mapObject.base + mapObject.action;
      }
    }

    /**
     * 指定action名获取数据
     * @param  {String} name   action映射名称
     * @param  {Object} params 对应参数
     * @return {Promise}       承诺
     */
    function get(name, params) {
      var url = createRepeatUrl(name);
      var options = {'params': params};

      return $http.get(url, options)
        .then(completeCallBack)
        .catch(failedCallBack);
    }

    /**
     * 就是对angularjs的post封装
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

    /**
     * cookies服务封装
     * @param  {String} key
     * @return {String} 存啥出啥
     */
    function getCookieObj(key) {
      return $cookieStore.get(key);
    }

    // 完成后的回调
    function completeCallBack(response) {
console.log(new Date().getTime(), response.data);
      return response.data; // 注意返回
    }

    // 失败后的回调
    function failedCallBack(error) {
      switch (error.status) {
        case 600: // 未登录
          console.warn('请登录后操作, 即将跳转!');
          window.setTimeout(function() {
            window.location.href = config.loginUrl + '?url=' + location.href;
          }, 1000);
        break;
        case 650: // 没权限
          console.warn('你没有权限进行此项操作!');
        break;
        default:
          console.error(error.status);
        break;
      }

      return $q.reject('数据获取异常!'); // 返回前台错误对象?
    }

  }
})();
  
