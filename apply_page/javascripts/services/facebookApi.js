'use strict';
//--------------------------------
// Module: Social Network API
// Service: Facebook API
//--------------------------------
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

      if(status === 'connected') {
        accessToken = auth.accessToken;

        getFbMe.then(function(res) {
          fbData = res.id;
          console.log(fbData);
        },
        function(error) {
          console.log(error);
        });

        console.log(status);
      } else if(status === 'not_authorized') {
        fbLogin(getFbMe);
        console.log(status);
      } else {
        fbLogin(getFbMe);
        console.log(status);
      }
    });
  };

  //Facebook Login API
  var fbLogin = function(fbApi, scope) {
    var scope = scope || 'public_profile, email';
    FB.login(fbApi, {scope: scope});
  };

  //Facebook Me API
  var getFbMe = function() {
    var deferred = $q.defer();
    var promise = deferred.promise;

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
      return true;
    },

    getFbData: function() {
      return fbData;
    }

  };

}]);