/**
 * This code is copyright (c) 2014 Topcoder Corporation
 *
 * Changes in version 1.1 (Enhanced Member Profile Bugs Fixing):
 * - Updated getOverview to enable caching.
 *
 * author: shubhendus, TCSASSEMBLER
 * version 1.1
 */
'use strict';

/**
 * The overview controller function.
 * @param UsersService the service used to retrieve recent wins stats.
 * @param ImageService the service used to load image asynchrous.
 */
var OverviewCtrl = function (UsersService, ImageService, $scope, CoderbitsService) {

  CoderbitsService.getOverview(user, $scope.track, $scope.baseCtrl.cache).then(function(overview){

    $scope.baseCtrl.cache[$scope.track] = overview;

    var allTraits = overview
      .filter(function(p) { return p.data !== undefined && p.data.length > 0 })
      .sort(function(a,b) { return b.data.length - a.data.length });
    
    $scope.traitPages = [];
    while (allTraits.length > 0)
      $scope.traitPages.push(allTraits.splice(0, 4));

    $scope.page = 0;
    
    $scope.nextPage = function(){
      if ($scope.page < $scope.traitPages.length) $scope.page++;
    }

    $scope.prevPage = function(){
      if ($scope.page > 0) $scope.page--;
    }

  });

  var overviewCtrl = this;

  overviewCtrl.init();
};

/**
 * set loading flags to uncompleted before data is loaded.
 */
OverviewCtrl.prototype.init = function () {
  this.dataLoaded = false;
  this.fullImagesLoaded = false;
  this.previewLoaded = false;
  this.carouselRendered = false;
};

tc.controller('OverviewCtrl', ['UsersService', 'ImageService', '$scope', 'CoderbitsService', OverviewCtrl]);