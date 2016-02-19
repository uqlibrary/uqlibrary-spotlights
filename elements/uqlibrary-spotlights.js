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
       * Time each slide is active
       */
      slideDuration: {
        type: Number,
        value: 5000
      },
      /**
       * Duration of the transition animation
       */
      transitionDuration: {
        type: Number,
        value: 1000
      },
      /**
       * The underlying image carousel
       * @private
       */
      _carousel: {
        type: Object
      }
    },
    listeners: {
      "polymer-carousel-link-clicked": "_linkClicked"
    },
    attached: function() {
      var self = this;

      // Setup event listener for Spotlights
      this.$.spotlightsApi.addEventListener('uqlibrary-api-spotlights', function(e) {
        self._setFromAPI(e.detail);
      });

      if (this.autoLoad) {
        this.$.spotlightsApi.get();
      }

      self._carousel = this.$.carousel;
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
     * Fires of a GA event when the polymer carousel was clicked
     * @param e
     * @private
     */
    _linkClicked: function (e) {
      var slideTitle = this._carousel.slides[e.detail.slideNumber - 1].title;
      this.$.ga.addEvent("Spotlight clicked", slideTitle + ". Slide Nr: " + e.detail.slideNumber);
    }
  });
})();