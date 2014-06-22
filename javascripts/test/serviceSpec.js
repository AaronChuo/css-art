describe('Social Network API', function() {
  beforeEach(module('socialNetworkApi'));

  it('should initial facebook API', inject(function(facebookApi) {

    var appId = '329424167209772';

    facebookApi.initFbApi(appId);

    expect(APP).toBe();
  }));
});