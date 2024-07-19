let POPActrl = angular.module("POPActrl", []);

POPActrl.controller("aboutCtrl", function ($scope, $rootScope) {
  $scope.about = $rootScope.aboutData.about;
})
  .controller("categoriesCtrl", function ($scope, $rootScope) {
    $scope.orderByField = "title";
    $scope.reverseOrder = false;
    $scope.customOrderBy = (field) => {
      $scope.orderByField = field;
      $scope.reverseOrder = !$scope.reverseOrder;
    };
    $scope.searchType = "title";
    $scope.searchText = "";

    $scope.newCategory = {};
    $scope.addNewCategory = () => {
      // just temporary ID
      $scope.newCategory.id =
        Math.max.apply(
          Math,
          $rootScope.categories.map(function (category) {
            return category.id;
          })
        ) + 1;
      $scope.newCategory.published = Date.now();
      // API call for add
      // success function
      $rootScope.categories.push($scope.newCategory);
      $scope.newCategory = {};
    };

    $scope.selectedCategory = {};
    $scope.selectCategory = (id) => {
      let category = $rootScope.categories.find((category) => {
        return category.id == id;
      });
      $scope.selectedCategory.id = category.id;
      $scope.selectedCategory.title = category.title;
      $scope.selectedCategory.published = category.published;
    };

    $scope.updateCategory = () => {
      let index = $rootScope.categories.findIndex((category) => {
        return category.id == $scope.selectedCategory.id;
      });
      // API call
      $rootScope.categories.splice(index, 1, $scope.selectedCategory);
      $scope.selectedCategory = {};
    };

    $scope.deleteCategory = () => {
      let index = $rootScope.categories.findIndex((category) => {
        return category.id == $scope.selectedCategory.id;
      });
      $rootScope.categories.splice(index, 1);
      $scope.selectedCategory = {};
    };
  })
  .controller("articleListCtrl", function ($scope, $rootScope) {
    $scope.orderByField = "title";
    $scope.reverseOrder = false;
    $scope.customOrderBy = (field) => {
      $scope.orderByField = field;
      $scope.reverseOrder = !$scope.reverseOrder;
    };
    $scope.searchType = "title";
    $scope.searchText = "";

    $scope.selectedArticle = {};
    $scope.selectArticle = (id) => {
      let article = $rootScope.articles.find((article) => {
        return article.id == id;
      });
      $scope.selectedArticle.id = article.id;
      $scope.selectedArticle.title = article.title;
    };

    $scope.deleteArticle = () => {
      let index = $rootScope.articles.findIndex((article) => {
        return article.id == $scope.selectedArticle.id;
      });
      $rootScope.articles.splice(index, 1);
      $scope.selectedArticle = {};
    };
  })
  .controller(
    "articleDetailCtrl",
    function ($scope, $rootScope, $routeParams, $http, $location) {
      $scope.articleId = $routeParams.id;
      $http.get("json/post.json").then(function (res) {
        $scope.postData = res.data;
      });
      // $scope.contact = $rootScope.contacts.find((person) => {
      //   return person.id == personId;
      // });
      // $scope.deleteContact = (personId) => {
      //   // API call for delete a contact
      //   // success function
      //   let index = $rootScope.contacts.findIndex((person) => {
      //     return person.id == personId;
      //   });
      //   $rootScope.contacts.splice(index, 1);
      //   $location.path("/");
      // };
    }
  )
  .controller("articleAddCtrl", function ($scope, $rootScope, $location) {
    // $scope.newCategory = {};
    // $scope.addNewCategory = () => {
    //   // just temporary ID
    //   $scope.newCategory.id =
    //     Math.max.apply(
    //       Math,
    //       $rootScope.categories.map(function (category) {
    //         return category.id;
    //       })
    //     ) + 1;
    //   $scope.newCategory.published = Date.now();
    //   // API call for add
    //   // success function
    //   $rootScope.categories.push($scope.newCategory);
    // };
  })
  .controller(
    "articleEditCtrl",
    function ($scope, $rootScope, $routeParams, $http, $location) {
      $scope.articleId = $routeParams.id;
      $http.get("json/post.json").then(function (res) {
        $scope.postData = res.data;
      });

      // let personId = $routeParams.id;
      // $scope.contact = $rootScope.contacts.find((person) => {
      //   return person.id == personId;
      // });
      // // get backup of original data to reset in case of API failure or discard
      // $scope.updateContact = function () {
      //   // API call for update contact
      //   // success function
      //   $location.path("/");
      //   // error function
      //   // reset object
      // };
      // $scope.discardUpdate = () => {
      //   // reset object
      //   $location.path("/");
      // };
    }
  );
