var deletefile, fs, path;

fs = require('fs-extra');
path = require('path');

module.exports = deletefile = (function() {

    function deletefile(config) {
        if(typeof config.plugins.deletefile == 'object') {
            this.params = extend(this.params, config.plugins.deletefile, { paths: config.paths });
        }
    }

    deletefile.prototype.brunchPlugin = true;

    deletefile.prototype.params = {
        files: []
    };

    var extend = function(target) {
        var sources = [].slice.call(arguments, 1);
        sources.forEach(function(source) {
            for(var prop in source) {
                target[prop] = source[prop];
            }
        });
        return target;
    };

    deletefile.prototype.onCompile = function(generatedFiles) {
        this.delete();
    };
    deletefile.prototype.delete = function() {
        var params = this.params;
        if (params.files && params.files.length > 0) {
          for (var i = 0; i < params.files.length; i++){
              var file = params.files[i];
              var f = path.join(params.paths.root, file);
              console.log(f);
              fs.removeSync(f);
          }
        }
    };

    return deletefile;
})();
