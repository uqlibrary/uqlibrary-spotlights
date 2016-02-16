(function () {
  Polymer({
    is: 'uqlibrary-spotlights',
    properties: {
      spotlights: {
        type: Array,
        observer: "_spotlightsChanged"
      },
      autoLoad: {
        type: Object,
        value: true
      },
      _carousel: {
        type: Object
      }
    },
    ready: function() {
      var self = this;
      self._carousel = this.$.carousel;

      // Setup event listener for Spotlights
      this.$.spotlightsApi.addEventListener('uqlibrary-api-spotlights', function(e) {
        self._setFromAPI(e.detail);
      });

      if (this.autoLoad) {
        this.$.spotlightsApi.get();
      }
    },
    /**
     * @description Formats the given API response to carousel-ready objects and sets the spotlights
     * @param spotlights
     * @private
     */
    _setFromAPI: function (spotlights) {
      var s = [];

      for (var i = 0; i < spotlights.length; i++) {
        s.push({
          title: spotlights[i].title,
          link: spotlights[i].url,
          image: {
            href: spotlights[i].img_url,
            description: spotlights[i].img_alt
          }
        });
      }

      this.spotlights = s;
    },
    _spotlightsChanged: function () {
      this._carousel.slides = this.spotlights;
      this.fire('uqlibrary-spotlights-loaded');
    }
  });
})();