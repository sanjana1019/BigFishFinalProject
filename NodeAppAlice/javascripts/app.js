/*************************************************************************/
/*                                                                       */
/*  AUTHOR: Alice Chao  (akchao)                                         */
/*  ANGULAR JS - communicates with client side (aka. html)               */
/*                                                                       */
/*************************************************************************/

var app = angular.module('angularjsNodejsTutorial',[]);



/* Controller for "query3" page */
app.controller('query3', function($scope, $http) {
    $scope.message="";

    // populating drop down menu
    var request = $http.get('/parentCo');

    request.success(function(data) {
        $scope.data = data;
        console.log("$scope.data is "+JSON.stringify($scope.data));
    });

    request.error(function(data){
        console.log('err');
    });

    // submit button functionality
    $scope.Submit = function() {    

        yearList = [];
        categoryList = [];
        categValue = [];
        allData = [];
        var request = $http.get('/parentCo/'+$scope.selectedCo);
        console.log("selectedCompany is: " + $scope.selectedCo);

        request.success(function(answer) {
            $scope.answer = answer;

            for(i=0;i<answer.length;i++) {
                yearList.push(answer[i].year);
                categoryList.push(answer[i].id);
            }                            

            $scope.yearList = yearList.filter(onlyUnique);
            categoryList = categoryList.filter(onlyUnique);
            
            for (i=0; i<categoryList.length; i++) {
                for (j=0; j<answer.length; j++) {
                    if (categoryList[i] == answer[j].id) {

                    }
                }
                categValue.push(answer[i].count);
            }

            $scope.categoryList = categoryList;
            $scope.categValue = categValue;
            console.log(yearList);
            console.log(categoryList);
            console.log(categValue);

                var xData = yearList.filter(onlyUnique);

                // for (i=0; i<categoryList.length; i++) {
                //     var trace = {
                //         x: xData,
                //         // y: 
                //     };
                // }
                var trace1 = {  // category 
                  x: xData,
                  y: categValue,
                  name: categoryList,
                  type: 'bar'
                };

                // var trace2 = {
                //   x: xData,
                //   y: [12, 18, 29, 20, 25],
                //   name: 'G06K',
                //   type: 'bar'
                // };

                // var trace3 = {
                //   x: xData,
                //   y: [40, 50, 60, 77, 66, 55],
                //   name: 'G06Q',
                //   type: 'bar'
                // };
                // var data = [trace1, trace2, trace3];
                
                var data = [trace1];
                var layout = {barmode: 'stack'};

                Plotly.newPlot('myDiv2', data, layout);


        });
        request.error(function(answer){
            console.log('err');
        });
    };

});

/*  ORIGINAL
    // submit button functionality
    $scope.Submit = function() {    

        var request = $http.get('/parentCo/'+$scope.selectedCo);
        console.log("selectedCompany is: " + $scope.selectedCo);

        request.success(function(answer) {
            $scope.answer = answer;
        });

        request.error(function(answer){
            console.log('err');
        });
    };
*/

/* Controller for "query4" page */
app.controller('query4', function($scope, $http) {
    $scope.message="";

    // populating drop down menu
    var request = $http.get('/q4/parentCo');

    request.success(function(data) {
        $scope.data = data;
        console.log("$scope.data is "+JSON.stringify($scope.data));
    });

    request.error(function(data){
        console.log('err');
    });

    // submit button functionality
    $scope.Submit = function() {    

        orgListPar = [];
        latListPar = [];
        lonListPar = [];
        orgListChild = [];
        latListChild = [];
        lonListChild = [];

        var request = $http.get('/q4/parentCo/'+$scope.selectedCo);
        console.log("selectedCompany is: " + $scope.selectedCo);

        request.success(function(answer) {
            $scope.answer = answer;
            var parent = answer[0].org;

            for(i=0;i<answer.length;i++) {
                if (answer[i].org != parent) {
                    console.log(answer[i].org+" vs. "+parent);
                    orgListChild.push(answer[i].org);
                    latListChild.push(answer[i].lat);
                    lonListChild.push(answer[i].lon);
                } else {
                    orgListPar.push(answer[i].org);
                    latListPar.push(answer[i].lat);
                    lonListPar.push(answer[i].lon);
                }
            }                    

            console.log(orgListPar);
            console.log(latListPar); 
            console.log(orgListChild);       

            var data = [{
                type: 'scattergeo',
                mode: 'markers',
                text: orgListPar,
                lon: lonListPar,
                lat: latListPar,
                marker: {
                    opacity:0.5,
                    size: 10,
                    color: '#bebada',
                    line: {
                        width: 0
                    }
                },
                name: parent,
                textposition: 'bottom'
                // textposition: [
                //     'top right', 'top left', 'top center', 'bottom right', 'top right',
                //     'top left', 'bottom right', 'bottom left', 'top right', 'top right'
                // ],
            },{
               type: 'scattergeo',
                mode: 'markers',
                text: orgListChild,
                lon: lonListChild,
                lat: latListChild,
                
                marker: {
                    opacity:0.5,
                    size: 5,
                    color: '#fdb462',   // orange
                    line: {
                        width: 1,
                        color: '#777777'
                    }
                },
                name: 'Acquisitions',
                textposition: 'bottom' 
            }];

            var layout = {
                font: {
                    family: 'Arial',
                    size: 12
                },
                geo: {
                    autosize: true,
                    // width: 1000,
                    // height: 800,
                    plot_bgcolor: '',
                    paper_bgcolor: '',
                    scope: 'usa',
                    resolution: 50,
                    showrivers: false,
                    rivercolor: '#fff',
                    showlakes: true,
                    lakecolor: '#fff',
                    showland: true,
                    landcolor: '#D4EBE5',
                    countrycolor: '#d3d3d3',
                    countrywidth: 10,
                    subunitcolor: '#d3d3d3'
                }
                
            };

            Plotly.newPlot('myDiv', data, layout);
        // }

        });
        request.error(function(answer){
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

});




















/* Controller to handle email input on "Your Work" page */
app.controller('myController', function($scope, $http) {
    $scope.message="";
    $scope.Submit = function() {
        var request = $http.get('/data/'+$scope.email);

        request.success(function(data) {
            $scope.data = data;
        });
        request.error(function(data){
            console.log('err');
        });
    
    }; 

});




/* Controller to obtain list of friends + family friends */
app.controller('familyfriendsController', function($scope, $http) {
    $scope.message="";
    $scope.Submit = function() {
        var request = $http.get('/familyfriends/'+$scope.email);

        request.success(function(data) {
            $scope.data = data;
        });
        request.error(function(data){
            console.log('err');
        });
    
    }; 
});



/* Controller for "Show Family" page */
app.controller('showFamilyMenuController', function($scope, $http) {
    $scope.message="";

    // populating drop down menu
    $scope.Menu = function() {
        var request = $http.get('/family/');

        request.success(function(data) {
            $scope.data = data;
            console.log("$scope.data is "+JSON.stringify($scope.data));
        });

        request.error(function(data){
            console.log('err');
        });
    
    }; 

    // call the function to load the data on pageload
    $scope.Menu();
    console.log("populated list");


    // submit button functionality
    $scope.Submit = function() {    

        var request = $http.get('/family/'+$scope.selectedPerson);
        console.log("selectedPerson is: " + $scope.selectedPerson);

        request.success(function(datas) {
            $scope.datas = datas;
        });
        request.error(function(datas){
            console.log('err');
        });
    };

});



