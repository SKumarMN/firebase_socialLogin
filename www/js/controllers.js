angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('DashCtrl', function($scope, Auth) {


  $scope.login = function(authMethod) {
    Auth.ref.$authWithOAuthRedirect(authMethod).then(function(authData) {
    }).catch(function(error) {
      if (error.code === 'TRANSPORT_UNAVAILABLE') {
        Auth.ref.$authWithOAuthPopup(authMethod).then(function(authData) {
        });
      } else {
        console.log(error);
      }
    });
  };

  $scope.createUser= function(){

    console.log($scope.email + ' ' + $scope.password )

    if($scope.email && $scope.password){
       Auth.ref.$createUser({
  email: $scope.email,
  password: $scope.password
}).then(function(userData) {
  console.log("User " + userData.uid + " created successfully!");

  return  Auth.ref.$authWithPassword({
    email: $scope.email,
    password: $scope.password
  });
}).then(function(authData) {
  console.log("Logged in as:", authData.uid);
}).catch(function(error) {
  console.error("Error: ", error);
});
    }
  }

  Auth.ref.$onAuth(function(authData) {
    if (authData === null) {
      console.log('Not logged in yet');
    } else {
      console.log('Logged in as', authData.uid);
    }
    $scope.authData = authData; // This will display the user's name in our view
  });
})


