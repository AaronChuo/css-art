'use strict';
//--------------------------------
// Module: Social Network API
// Service: Facebook API
//--------------------------------
//TODO: need to refactor, it's too dirty..orz
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
    //incFbRoot();
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

  //Create fb-root tag
  var incFbRoot = function() {
    var d = document;
    var b = 'body';
    var id = 'fb-root';
    var fbroot, body = d.getElementsByTagName(b);
    if(d.getElementById(id)) {return;}
    fbroot = d.createElement('div');
    fbroot.id = id;
    body.insertBefore(fbroot, body);
  };

  //Get login status
  var getLoginStatus = function() {
    var deferred = $q.defer();

    FB.getLoginStatus(function(response) {
      var status = response.status,
          auth = response.authResponse;

      if(status === 'connected') {
        deferred.resolve(status);
      } else if(status === 'not_authorized') {
        deferred.resolve(status);
      } else {
        deferred.resolve(status);
      }

      //console.log(status);
    });

    return deferred.promise;
  };

  //Facebook Login API
  var fbLogin = function() {
    var scope = 'public_profile, email';
    var deferred = $q.defer();

    FB.login(function(response) {
      if(response.authResponse) {
        deferred.resolve();
      } else {
        deferred.reject('未登入或未授權');
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
      .then(fbLogin)
      .then(getFbMe)
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