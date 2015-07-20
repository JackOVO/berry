(function() {
  'use strict';
  // 登陆控制器

  angular
    .module('pf.user')
    .controller('LoginCtrl', LoginCtrl);

  LoginCtrl.$inject = ['$scope', 'userService'];
  function LoginCtrl($scope, userService) {
    var that = this;
    that.login = login;
    that.upTamp = upTamp;

    that.msg = ''; // 提示信息
    that.tamp = ''; // 验证码时间戳
    $scope.user = {'name': 'user@dfinder.cn', 'password': '123456'}; // 登陆提交参数

    $scope.$watch('user', function() {
      that.msg = ''; // 防止用户错误认识
    }, true);

    // 登陆
    function login(isSubmit) {
      if (!isSubmit) { return; }

      var name = $scope.user.name;
      var password = $scope.user.password;
      var vercode = $scope.user.vercode;

      userService.login(name, password, vercode)
        .then(function(rp) {
          window.location.reload();
        }, function(rp) {
          that.msg = rp.message;
          upTamp();
        });
    }

    // 変更验证码时间戳
    function upTamp() {
      that.tamp = new Date().getTime();
    }

  }

})();