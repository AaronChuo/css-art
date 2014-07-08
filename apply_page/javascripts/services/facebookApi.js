'use strict';
//--------------------------------
// Module: Social Network API
// Service: Facebook API
//--------------------------------
//TODO: need to refactor
angular.module('socialNetworkApi', [])
.factory('facebookApi', ['$window', '$q', function($window, $q) {

  //Facebook app config
  var APP_ID = '',
      COOKIES = true,
      XFBML = true,
      VERSION = 'v2.0';

  //Facebook app initialized
  var initialized = false;

  //Facebook login and authorized of app
  var connected = false;

  //Facebook access token
  var accessToken = '';

  //Facebook data
  var fbData = {};

  //Facebook asynchronous initial
  var fbAsyncInit = function() {
    incFbSdk();
    $window.fbAsyncInit = function() {
      FB.init({
        appId: APP_ID,
        cookies: COOKIES,
        xfbml: XFBML,
        version: VERSION
      });
    };
  };

  //Include facebook sdk
  var incFbSdk = function() {
    var d = document;
    var s = 'script';
    var id = 'facebook-jssdk';
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  };

  //Get login status
  var getLoginStatus = function() {

    FB.getLoginStatus(function(response) {
      var status = response.status,
          auth = response.authResponse;
      var deferred = $q.defer();

      if(status === 'connected') {
        deferred.resolve(status);

        console.log(status);
      } else if(status === 'not_authorized') {
        deferred.resolve(status);

        console.log(status);
      } else {
        deferred.reject(status);

        console.log(status);
      }
    });

    return deferred.promise;
  };

  //Facebook Login API
  var fbLogin = function() {
    var scope = 'public_profile, email';
    var deferred = $q.defer();
    var promise = deferred.promise;

    FB.login(function(response) {
      if(response.authResponse) {
        deferred.resolve('login success');
      } else {
        deferred.reject('not login');
      }
    }, {scope: scope});

    return deferred.promise;
    //FB.login(fbApi, {scope: scope});
  };

  //Facebook Me API
  var getFbMe = function() {
    var deferred = $q.defer();

    FB.api('/me', function(response) {
      if(!response.error) {
        deferred.resolve(response);
      } else {
        deferred.reject(response.error);
      }
    });

    return deferred.promise;
  };

  // //Facebook Me API Callback
  // var callback = function(res) {
  //   this.getFbData();
  // };

  //Public
  return {

    initFbApi: function(appId, cookies, xfbml) {
      APP_ID = appId || '';
      COOKIES = cookies || true;
      XFBML = xfbml || true;
      try {
        fbAsyncInit();
        initialized = true;
      } catch(err) {
        initialized = false;
      }
    },

    getMe: function() {
      if(!initialized) return;
      getLoginStatus();
    },

    getFbData: function() {
      var deferred = $q.defer();

      getLoginStatus()
      .then(getFbMe, fbLogin)
      .then(function(res) {
        deferred.resolve(res);
      },
      function(err) {
        deferred.reject(err);
      });

      return deferred.promise;
    }

  };

}]);