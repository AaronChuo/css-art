'use strict';
//--------------------------------
// Module: Social Network API
// Service: Facebook API
//--------------------------------
angular.module('socialNetworkApi', [])
.factory('facebookApi', ['$window', function($window) {

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

        fbLogin(getFbMe);

        return fbData;
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
    FB.api('/me', function(response) {
      fbData = response;
      //console.log(response);
    });
  };

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
        console.log(err.name + ': ' + err.message);
      }
    },

    getMe: function() {
      if(!initialized) return;
      getLoginStatus();
    },

    getFbData: function() {
      if(!initialized) return;
      console.log(fbData);
    }

  };

}]);