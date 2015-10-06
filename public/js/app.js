var sliderApp=angular.module('sliderApp',['ngAnimate']);

sliderApp.controller('SliderController', function($scope, $http) {
  console.log("controller fired");
  $scope.images = [];
  $http.get('/api/images/list').success(function(data) {
    data.forEach(function(image){
      $scope.images.push({src:image.upload_name, title: image.timestamp});
      console.log($scope.images);
    })

  })
});

sliderApp.directive('slider', function ($timeout) {
  return {
    restrict: 'AE',
  replace: true,
  scope:{
    images: '='
  },
    link: function (scope, elem, attrs) {

    scope.currentIndex=0;

    scope.next=function(){
      scope.currentIndex<scope.images.length-1?scope.currentIndex++:scope.currentIndex=0;
    };

    scope.prev=function(){
      scope.currentIndex>0?scope.currentIndex--:scope.currentIndex=scope.images.length-1;
    };

    scope.$watch('currentIndex+images',function(){
      scope.images.forEach(function(image){
        // console.log(image);
        image.visible=false;
      });
      console.log(scope.currentIndex, scope.images);
      scope.images[scope.currentIndex].visible=true;
    });

    /* Start: For Automatic slideshow*/

    var timer;

    var sliderFunc=function(){
      timer=$timeout(function(){
        scope.next();
        timer=$timeout(sliderFunc,10000);
      },10000);
    };

    sliderFunc();

    scope.$on('$destroy',function(){
      $timeout.cancel(timer);
    });

    /* End : For Automatic slideshow*/

    },
  templateUrl:'templates/slider.html'
  }
});