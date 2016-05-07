Object.defineProperty(Object.prototype, 'ShallowCopy', {
    value: function (obj) {
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                this[prop] = obj[prop];
            }
        }
    }, enumerable: false
});