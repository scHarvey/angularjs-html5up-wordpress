(function() {
    var app = angular.module('portfolio', []);


    app.header_image = function(){
        //get header image
    };

    app.controller('SiteInfo', function($scope, $http){
        var infoResponse = $http.get("http://www.clintharvey.net/wp-json/");
        siteinfo = this;
        infoResponse.success(function(data, status, headers, config) {
            //console.log('site info: ');
            //console.log(data);
            siteinfo.site_title = data.name;
            siteinfo.slogan = data.description;
        });
        infoResponse.error(function(data, status, headers, config) {
            alert("AJAX failed!");
        });
    });

    app.controller('About', function($scope, $sce, $http){
        var aboutResponse = $http.get("http://www.clintharvey.net/wp-json/pages/about");
        about = this;
        aboutResponse.success(function(data, status, headers, config) {
            //console.log(data);
            about.title = data.title;
            about.content = data.content;
            
            $scope.renderHtml = function(htmlString){
                    return $sce.trustAsHtml(htmlString);
            };
            
            about.image = data.featured_image.guid;
            
            //console.log(about.image);
            
            if (about.image.length > 10) {
                about.hasImage = true;
            }
            
        });
        aboutResponse.error(function(data, status, headers, config) {
            alert("AJAX failed!");
        });
    });
    
    app.controller('Development', function($scope, $sce, $http){
        var devResponse = $http.get("http://www.clintharvey.net/wp-json/posts?filter[cat]=8");
        dev = this;
        devResponse.success(function(data, status, headers, config) {
            //console.log(data);
            /*dev.title = data.title;
            dev.content = data.content;
            
            dev.thumb = data.featured_image.guid;
            
            console.log(dev.thumb);
            
            if (dev.thumb.length > 10) {
                dev.hasImage = true;
            }*/
            
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
        var aboutResponse = $http.get("http://www.clintharvey.net/wp-json/pages/resume?v=2");
        resume = this;
        aboutResponse.success(function(data, status, headers, config) {
            //console.log(data);
            resume.title = data.title;
            resume.content = data.content;
            
            $scope.renderHtml = function(htmlString){
                    return $sce.trustAsHtml(htmlString);
            };
            
            resume.image = data.featured_image.guid;
            
            //console.log(resume.image);
            
            if (resume.image.length > 10) {
                resume.hasImage = true;
            }
            
        });
        aboutResponse.error(function(data, status, headers, config) {
            alert("AJAX failed!");
        });
    });
    
    
    app.controller('Photography', function($scope, $sce, $http){
        var photoResponse = $http.get("http://www.clintharvey.net/wp-json/pages/photography");
        photo = this;
        photoResponse.success(function(data, status, headers, config) {
            //console.log(data);
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
        var photosResponse = $http.get("http://www.clintharvey.net/wp-json/posts?filter[cat]=5");
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