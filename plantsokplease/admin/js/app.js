let POPAapp = angular.module("POPAapp", [
  "POPActrl",
  "POPAfilters",
  "ngRoute",
  "ngSanitize",
  "ngQuill",
]);

POPAapp.config([
  "$routeProvider",
  "ngQuillConfigProvider",
  function ($routeProvider, ngQuillConfigProvider) {
    ngQuillConfigProvider.set();

    $routeProvider
      .when("/", {
        templateUrl: "./views/about.html",
        controller: "aboutCtrl",
      })
      .when("/categories", {
        templateUrl: "./views/categories.html",
        controller: "categoriesCtrl",
      })
      .when("/articles", {
        templateUrl: "./views/articles.html",
        controller: "articleListCtrl",
      })
      .when("/articles/new", {
        templateUrl: "./views/article-new.html",
        controller: "articleAddCtrl",
      })
      .when("/articles/details/:id", {
        templateUrl: "./views/article-detail.html",
        controller: "articleDetailCtrl",
      })
      .when("/articles/edit/:id", {
        templateUrl: "./views/article-edit.html",
        controller: "articleEditCtrl",
      })
      .otherwise({ templateUrl: "./views/404.html" });
  },
]);

POPAapp.run(function ($rootScope, $http, $location) {
  $http.get("json/about.json").then(function (res) {
    $rootScope.aboutData = res.data;
  });
  $http.get("json/categories.json").then(function (res) {
    $rootScope.categories = res.data;
  });
  $http.get("json/articles.json").then(function (res) {
    $rootScope.articles = res.data;
  });

  $rootScope.$on("$locationChangeSuccess", function () {
    console.log($location.path());
    $rootScope.page = $location.path();
  });
});
