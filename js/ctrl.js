let POPCctrl = angular
  .module("POPCctrl", [])
  .controller("postController", function ($scope, $routeParams, $http, $sce) {
    $scope.postID = $routeParams.id;
    $http.get("json/post.json").then(
      function (res) {
        $scope.articleData = res.data;
        $scope.articleContent = $sce.trustAsHtml($scope.articleData.content);
      },
      function (res) {
        $scope.errMessage = res.statusText;
      }
    );
  });
