app.filter('customSpecialiteFilter', function() {
    return function(item) {
        if(item.specialites == 'undefined') {
            return null;
        }
        return item.specialites;
    };
});