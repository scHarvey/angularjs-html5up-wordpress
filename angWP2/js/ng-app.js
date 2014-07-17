(function() {
    var app = angular.module('portfolio', []);

	//custom filter to break down an array into "rows" of X length used like | partition:X
    app.filter('partition', function() {
      var cache = {};
      var filter = function(arr, size) {
        if (!arr) { return; }
        var newArr = [];
        for (var i=0; i<arr.length; i+=size) {
          newArr.push(arr.slice(i, i+size));
        }
        var arrString = JSON.stringify(arr);
        var fromCache = cache[arrString+size];
        if (JSON.stringify(fromCache) === JSON.stringify(newArr)) {
          return fromCache;
        }
        cache[arrString+size] = newArr;
        return newArr;
      };
      return filter;
    });

    app.controller('SiteInfo', function($scope, $http){
    	//AJAX call to our wordpress (or other backend) site to retrieve JSON
        var infoResponse = $http.get("http://yourwordpresssite.org/wp-json/");
        siteinfo = this;
        infoResponse.success(function(data, status, headers, config) {
            siteinfo.site_title = data.name;
            siteinfo.slogan = data.description;
        });
        infoResponse.error(function(data, status, headers, config) {
            alert("AJAX failed!");
        });
        
        
        var aboutResponse = $http.get("http://yourwordpresssite.org/wp-json/pages/about");
        aboutResponse.success(function(data, status, headers, config) {
            siteinfo.image = data.featured_image.guid;
            
            if (siteinfo.image.length > 10) {
                siteinfo.hasImage = true;
            }
            
        });
        aboutResponse.error(function(data, status, headers, config) {
            alert("AJAX failed!");
        });
    });

    app.controller('About', function($scope, $sce, $http){
        var aboutResponse = $http.get("http://yourwordpresssite.org/wp-json/pages/about");
        about = this;
        aboutResponse.success(function(data, status, headers, config) {
            about.title = data.title;
            about.content = data.content;
            
            $scope.renderHtml = function(htmlString){
                    return $sce.trustAsHtml(htmlString);
            };
            
            about.image = data.featured_image.guid;
            
            if (about.image.length > 10) {
                about.hasImage = true;
            }
            
        });
        aboutResponse.error(function(data, status, headers, config) {
            alert("AJAX failed!");
        });
    });
    
    app.controller('Development', function($scope, $sce, $http){
        var devResponse = $http.get("http://yourwordpresssite.org/wp-json/posts?filter[cat]=8");
        dev = this;
        devResponse.success(function(data, status, headers, config) {
            
            dev.posts = data;
            
            
            $scope.renderHtml = function(htmlString){
                return $sce.trustAsHtml(htmlString);
            };
            
            //function to calculate limitTo filter so that we don't have orphaned posts
            $scope.calcedLimitDev = dev.posts.length - (dev.posts.length % 3);
        });
        devResponse.error(function(data, status, headers, config) {
            alert("AJAX failed!");
        });
    });


    app.controller('Resume', function($scope, $sce, $http){
        var aboutResponse = $http.get("http://yourwordpresssite.org/wp-json/pages/resume?v=2");
        resume = this;
        aboutResponse.success(function(data, status, headers, config) {
            //console.log(data);
            resume.title = data.title;
            resume.content = data.content;
            
            $scope.renderHtml = function(htmlString){
                    return $sce.trustAsHtml(htmlString);
            };
            
            resume.image = data.featured_image.guid;
            
            if (resume.image.length > 10) {
                resume.hasImage = true;
            }
            
        });
        aboutResponse.error(function(data, status, headers, config) {
            alert("AJAX failed!");
        });
    });
    
    
    app.controller('Photography', function($scope, $sce, $http){
        var photoResponse = $http.get("http://yourwordpresssite.org/wp-json/pages/photography");
        photo = this;
        photoResponse.success(function(data, status, headers, config) {
            photo.title = data.title;
            photo.content = data.content;
            
            $scope.renderHtml = function(htmlString){
                    return $sce.trustAsHtml(htmlString);
            };
                 
        });
        photoResponse.error(function(data, status, headers, config) {
            alert("AJAX failed!");
        });
    });    
    
    app.controller('Portfolio', function($scope, $sce, $http){
        var photosResponse = $http.get("http://yourwordpresssite.org/wp-json/posts?filter[cat]=5");
        photos = this;
        photosResponse.success(function(data, status, headers, config) {
            photos.posts = data;       
            
            $scope.renderHtml = function(htmlString){
                return $sce.trustAsHtml(htmlString);
            };
            
            $scope.calcedLimitPhotos = photos.posts.length - (photos.posts.length % 2);
            console.log(photos.posts.length - (photos.posts.length % 2));
            
        });
        photosResponse.error(function(data, status, headers, config) {
            alert("AJAX failed!");
        });
    }); 
})();