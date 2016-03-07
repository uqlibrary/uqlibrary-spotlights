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
      },
			/**
       * Prefix for the google analytics category name. For example: "Home page"
       */
      gaCategoryPrefix: {
        type: String,
        value: '',
        observer: '_gaCategoryPrefixChanged'
      },
			/**
       * Holds the Google Analytics app name of this component
       */
      _gaAppName: {
        type: String,
        value: ''
      }
    },
    listeners: {
      "polymer-carousel-link-clicked": "_carouselLinkClicked",
      "polymer-carousel-resumed": "_carouselResumed",
      "polymer-carousel-paused": "_carouselPaused",
      "polymer-carousel-slide-changed": "_carouselSlideChanged"
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
     * Sets the Google Analytics app name
     * @private
     */
    _gaCategoryPrefixChanged: function () {
      this._gaAppName = this.gaCategoryPrefix + ' Spotlights';
    },
    /**
     * Fires of a GA event when the polymer carousel was clicked
     * @param e
     * @private
     */
    _carouselLinkClicked: function (e) {
      var slide = this._carousel.slides[e.detail.slideNumber - 1];
      if (slide.link !== '') {
        this.$.ga.addEvent("Click", slide.link + " ("+slide.index+")");
      }
    },
		/**
     * Fires of a GA event when the polymer carousel is manually paused
     * @private
     */
    _carouselPaused: function () {
      this.$.ga.addEvent("Navigate", "Pause");
    },
    /**
     * Fires of a GA event when the polymer carousel is manually resumed
     * @private
     */
    _carouselResumed: function () {
      this.$.ga.addEvent("Navigate", "Play");
    },
		/**
     * Fires of a GA event when the user (manually) navigates through the slides
     * @param e
     * @private
     */
    _carouselSlideChanged: function (e) {
      this.$.ga.addEvent("Navigate", "Pager bullet" + e.detail.slideNumber);
    }
  });
})();