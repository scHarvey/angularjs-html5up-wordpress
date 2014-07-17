(function() {
    var app = angular.module('portfolio', []);

	//controller for general siteinfo
    app.controller('SiteInfo', function($scope, $http){
    	//AJAX call to our wordpress (or other backend) site to retrieve JSON
        var infoResponse = $http.get("http://yourwordpresssite.org/wp-json/");
        siteinfo = this;
        infoResponse.success(function(data, status, headers, config) {
            //console.log('site info: ');
            //console.log(data);
            
            //grab the small bits of data we need for this section
            siteinfo.site_title = data.name;
            siteinfo.slogan = data.description;
        });
        infoResponse.error(function(data, status, headers, config) {
            alert("AJAX failed!");
        });
    });

	//controller for about section
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
            	//cheap way to determine if we actually have an image
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
            
        });
        devResponse.error(function(data, status, headers, config) {
            alert("AJAX failed!");
        });
    });


    app.controller('Resume', function($scope, $sce, $http){
        var aboutResponse = $http.get("http://yourwordpresssite.org/wp-json/pages/resume?v=2");
        resume = this;
        aboutResponse.success(function(data, status, headers, config) {
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
            //console.log(data);
            
            photos.posts = data;       
            
            $scope.renderHtml = function(htmlString){
                    return $sce.trustAsHtml(htmlString);
            };
            
        });
        photosResponse.error(function(data, status, headers, config) {
            alert("AJAX failed!");
        });
    });

    
    
})();