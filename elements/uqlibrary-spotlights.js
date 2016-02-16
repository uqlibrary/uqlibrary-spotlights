(function () {
  Polymer({
    is: 'uqlibrary-spotlights',
    properties: {
      /**
       * Array of spotlights to show
       * @type Array
       */
      spotlights: {
        type: Array,
        observer: "_spotlightsChanged"
      },
      /**
       * Whether the Spotlights component should auto load spotlights from the API
       * @type Boolean
       */
      autoLoad: {
        type: Object,
        value: true
      },
      /**
       * Whether the Spotlights image carousel should auto play
       * @type Boolean
       */
      autoPlay: {
        type: Object,
        value: true
      },
      /**
       * The underlying image carousel
       * @private
       */
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
     * Formats the given API response to carousel-ready objects and sets the spotlights
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
    /**
     * Fired when the spotlights change. Updates the underlying carousel
     * @private
     */
    _spotlightsChanged: function () {
      this._carousel.slides = this.spotlights;
      this.fire('uqlibrary-spotlights-loaded');
    },
    /**
     * Returns
     * @returns {string}
     * @private
     */
    _autoPlay: function () {
      return (this.autoPlay ? 'true' : 'false');
    }
  });
})();