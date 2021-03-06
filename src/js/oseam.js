// -------------------------------------------------------------------------------------------------
// OpenSeaMap Water Depth - Web frontend for depth data handling.
//
// Written in 2012 by Dominik Fässler dfa@bezono.org
//
// To the extent possible under law, the author(s) have dedicated all copyright
// and related and neighboring rights to this software to the public domain
// worldwide. This software is distributed without any warranty.
//
// You should have received a copy of the CC0 Public Domain Dedication along
// with this software. If not, see <http://creativecommons.org/publicdomain/zero/1.0/>.
// -------------------------------------------------------------------------------------------------

OSeaM = {
    models: {},
    routers: {},
    views: {},
    utils: {},
    container: null,
    frontend: null,
    router: null,
    apiUrl: 'http://testdepth.openseamap.org/api1',
    autoId: 0,
    init: function() {
        OSeaM.configureBackboneSync();
        this.frontend = new OSeaM.models.Frontend();
        this.frontend.setLanguage('en');
        this.container = $('.oseam-container');
        this.router = new OSeaM.routers.Router();
        Backbone.history.start();
    },
    configureBackboneSync: function() {
        var originalSync = Backbone.sync;
        Backbone.sync = function(method, model, options) {
            options = options || {};
            options.crossDomain = true;
            options.xhrFields   = {
                withCredentials: true
            };
            return originalSync(method, model, options);
        };
    },
    loadTemplate: function(template) {
        return Handlebars.templates[template];
    },
    id: function(prefix) {
        prefix = prefix || 'oseam-';
        this.autoId++;
        return prefix + this.autoId;
    }
};


OSeaM.View = Backbone.View.extend({
    close: function() {
        this.$el.empty();
        this.undelegateEvents();
    }
});
