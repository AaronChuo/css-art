'use strict';
/*-------------------------------
  Module: Social Network API
  Service: Facebook API
--------------------------------*/
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
      return response.status;
    });
  };

  //

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

    fbLogin: function() {
      if(!initialized) return;

      var status = getLoginStatus();
      console.log(status);
      switch(status) {
        case 'connected':
          //TODO: login success
          break;
        case 'not_authorized':
          //TODO: login success but need to authorize
          break;
        default:
          //TODO: need to login
          break;
      }
    },

    getFbProfile: function() {
      if(!connected) return;

    }

  };

}]);