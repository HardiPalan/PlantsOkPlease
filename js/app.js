let POPCpages = angular.module("POPCpages", ["ngRoute", "POPCctrl"]);

POPCpages.config([
  "$routeProvider",
  function ($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "views/home.html",
      })
      .when("/about", {
        templateUrl: "views/about.html",
      })
      .when("/blog", {
        templateUrl: "views/blog.html",
      })
      .when("/contact", {
        templateUrl: "views/contact.html",
      })
      .when("/post/:id", {
        templateUrl: "views/post.html",
        controller: "postController",
      })
      .otherwise({
        templateUrl: "views/404.html",
      });
  },
]);

POPCpages.directive("subscribe", function () {
  return {
    restrict: "EAC",
    templateUrl: "directives/subscribe.html",
  };
});

POPCpages.run(function ($rootScope, $http, $location) {
  $rootScope.articles = [];
  $rootScope.errMessage = "";
  $http.get("json/articles.json").then(
    function (res) {
      $rootScope.articles = res.data;
    },
    function (res) {
      $rootScope.errMessage = "";
    }
  );

  $rootScope.$on("$locationChangeSuccess", function () {
    // console.log($location.path());
    $rootScope.page = $location.path();
  });
});
