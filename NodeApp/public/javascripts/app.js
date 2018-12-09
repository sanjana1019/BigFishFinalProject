var app = angular.module('angularjsNodejsTutorial',[]);
app.controller('myController', function($scope, $http) {
        $scope.message="";
        $scope.Submit = function() {
        //console.log('entered with'+ $scope.email);
        var request = $http.get('/data/'+$scope.email);
        request.success(function(data) {
            console.log('got response');
            $scope.data = data;
        });
        request.error(function(data){
            console.log('err');
        });
    
    }; 
});

// To implement "Insert a new record", you need to:
// - Create a new controller here
// - Create a corresponding route handler in routes/index.js
app.controller('insertController', function($scope,$http){
    $scope.message = "";
    $scope.Insert = function(){
        var request = $http.get('/login/'+$scope.login+'/name/'+$scope.name+'/sex/'+$scope.sex+'/RelationshipStatus/'+ $scope.RelationshipStatus + '/Birthyear/'+$scope.Birthyear);
        request.success(function(data) {
            console.log('got response');
            console.log(data + 'got row inserted');
        });
        request.error(function(data){
            console.log('err');
        });

    };    
});

app.controller('friendsController', function($scope,$http){
    $scope.message = "";
    $scope.Show = function(){
        var request = $http.get('/personlogin/'+$scope.login);
        request.success(function(data){
            console.log('got response');
            $scope.data = data;
            console.log(data);
        });
        request.error(function(data){
            console.log('err');
        });

    };

});

function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

// // usage example:
// var a = ['a', 1, 'a', 2, '1'];
// var unique = a.filter( onlyUnique );

app.controller('showfamilyController', function ($scope,$http){
    var familyList = [];
    console.log('aaa');
    // $scope.Parents = "Parent Company";
    // $scope.Children = "Child Company";
    var request = $http.get('/getFamily');
            request.success(function(data){
            console.log('got response');
            var parentList = [];
            //console.log(data);
            for (x =0;x<data.length;x++)
            {
                familyList.push(data[x]);
                parentList.push(data[x].ParentCompany)
            }
            $scope.familymembers = familyList;
            parentUniqueList = parentList.filter(onlyUnique);
            $scope.parentUniqueList = parentUniqueList;

        });
        request.error(function(data){
            console.log('err');
        });

    $scope.Change = function(parentItem){

        childrenList = [];
        console.log("entered");
        //$scope.childrenList = familyList.get(parentItem.x);
        //console.log(parentItem);
        for(x=0;x<familyList.length;x++)
        {
        //console.log(familyList[x].ParentCompany);
        if(familyList[x].ParentCompany === parentItem)
        {
        //console.log(familyList[x].ChildCompany);
        childrenList.push(familyList[x].ChildCompany);
        }
        }    

        $scope.childrenList = childrenList;
        // console.log(familyList.get(parentItem.x));
        // console.log($scope.childrenList);
        //console.log($scope.childrenList);
    };

    $scope.ShowFamily = function(parentCompany,childCompany){
        console.log(parentCompany);
        console.log(childCompany);
        var request = $http.get('/query2/parent/'+parentCompany+'/child/'+childCompany);
        request.success(function(data){
            console.log('got response');
            $scope.data = data;
        });
        request.error(function(data){
            console.log('err');
        });

    };

    $scope.Submit = function(parentCompany,childCompany){
        console.log(parentCompany);
        console.log(childCompany);
        var request = $http.get('/query1_bs/parent/'+parentCompany+'/child/'+childCompany);
        request.success(function(data){
            console.log('got response');
            $scope.data = data;
        });
        request.error(function(data){
            console.log('err');
        });

    };

});


//show family
app.controller('familyDropDownController', function($scope, $http) {
    $scope.message="";
    $scope.selectedLogin = null;
    $scope.logins = [];
    var request = $http.get('/familyData');
    request.success(function(data) {
        $scope.logins = data;
    });
    request.error(function(data){
        console.log('err');
    });
    $scope.selectedLogin = $scope.logins[0];

    $scope.ShowFamily = function() {
        console.log('abcdefgh');
        console.log($scope.selectedLogin);
        var request = $http.get('/family/'+ $scope.selectedLogin.login);
        request.success(function(data) {
            $scope.data = data;
        });
        request.error(function(data){
            console.log('err');
        });
    }; 
});

//show friends
app.controller('friendsController', function($scope, $http) {
        $scope.message="";
        $scope.ShowFriends = function() {
        var request = $http.get('/friends/'+$scope.login);
        request.success(function(data) {
            $scope.data = data;
        });
        request.error(function(data){
            console.log('err');
        });
    
    }; 
});


app.controller('query2_bscontroller', function ($scope,$http){
    var familyList = [];
    console.log('aaa');
    var request = $http.get('/getFamily');
            request.success(function(data){
            console.log('got response');
            var parentList = [];
            //console.log(data);
            for (x =0;x<data.length;x++)
            {
                familyList.push(data[x]);
                parentList.push(data[x].ParentCompany)
            }
            $scope.familymembers = familyList;
            parentUniqueList = parentList.filter(onlyUnique);
            $scope.parentUniqueList = parentUniqueList;

        });
        request.error(function(data){
            console.log('err');
        });

    $scope.Change = function(parentItem){

        childrenList = [];
        console.log("entered");
        childrenList.push('Machine Learning');
        childrenList.push('Natural Language Processing');
        childrenList.push('Data Mining');
        childrenList.push('Computer Vision');
        childrenList.push('Autonomous Driving');
        childrenList.push('Search Engine');
        childrenList.push('Speech Recognition');
        childrenList.push('Operating System');
        childrenList.push('Machine Translation');
        childrenList.push('Predictive Modeling');
        childrenList.push('Recommender System');
        childrenList.push('Data Analysis');
        childrenList.push('Big Data');
        childrenList.push('Data Management');
        childrenList.push('Cloud Computing');
        childrenList.push('Grid Computing');
        childrenList.push('Grid Computing');
        childrenList.push('Parallel Computing');
        childrenList.push('Deep Learning');
        childrenList.push('Reinforcement Learning');
        childrenList.push('Networked System');
        childrenList.push('Linguistic');
        childrenList.push('Robotic');

        // if('Google' === parentItem)
        // {
        //     childrenList.push('Artificial Intelligence');
        //     childrenList.push('Autonomous Driving');
        //     childrenList.push('Search Engine');
        // }
        // else if ('Microsoft' === parentItem) {
        //     childrenList.push('Autonomous Driving');
        //     childrenList.push('Search Engine');
        // } 

        $scope.childrenList = childrenList;
    };

    $scope.Submit = function(parentCompany,childCompany){
        console.log(parentCompany);
        console.log(childCompany);
        var request = $http.get('/query2_bs/parent/'+parentCompany+'/child/'+childCompany);
        request.success(function(data){
            console.log('got response');
            $scope.data = data;
        });
        request.error(function(data){
            console.log('err');
        });

    };

});


app.controller('query4_bscontroller', function ($scope,$http){
    childrenList = [];
    console.log("entered");
    childrenList.push('Machine Learning');
    childrenList.push('Natural Language Processing');
    childrenList.push('Data Mining');
    childrenList.push('Virtual Reality');
    childrenList.push('Computer Vision');
    childrenList.push('Autonomous Driving');
    childrenList.push('Image Processing');
    childrenList.push('Search Engine');
    childrenList.push('Speech Recognition');
    childrenList.push('Operating System');
    childrenList.push('Machine Translation');
    childrenList.push('Predictive Modeling');
    childrenList.push('Recommender System');
    childrenList.push('Data Analysis');
    childrenList.push('Big Data');
    childrenList.push('Data Management');
    childrenList.push('Cloud Computing');
    childrenList.push('Grid Computing');
    childrenList.push('Grid Computing');
    childrenList.push('Parallel Computing');
    childrenList.push('Deep Learning');
    childrenList.push('Reinforcement Learning');
    childrenList.push('Networked System');
    childrenList.push('Linguistic');
    childrenList.push('Robotic');
    childrenList.push('Computer Architecture');
    childrenList.push('Crowd Sourcing');
    childrenList.push('Software Systems');
    childrenList.push('Computational Linguistic');
    childrenList.push('Embedded Systems');
    childrenList.push('Mobile Communication');
    childrenList.push('Information System');
    childrenList.push('Cryptography');
    childrenList.push('Computer Graphics');
    childrenList.push('Business Intelligence');
    childrenList.push('Automata');
    childrenList.push('Animation');

    $scope.childrenList = childrenList;

    $scope.Submit = function(childCompany){
        console.log('Hey HIIII');
        console.log(childCompany);
        var request = $http.get('/query4_bs/child/'+childCompany);
        request.success(function(data){
            console.log('got response');
            $scope.data = data;
        });
        request.error(function(data){
            console.log('err');
        });

    };

});
