(function() {
  Polymer({
    is: 'uqlibrary-carousel',
    properties: {
      /**
       * Holds all slides of this carousel
       */
      slides: {
        type: Array,
        notify: true,
        observer: '_slidesChanged'
      },
      /**
       * The duration each slide is active (in milliseconds)
       */
      slideDuration: {
        type: Number,
        value: 5000
      },
      /**
       * Width to height ratio
       */
      heightRatio: {
        type: Number,
        value: 1.5
      },
      /**
       * How long the transition animation lasts
       */
      transitionDuration: {
        type: Number,
        value: 500
      },
      /**
       * Holds the selected slide index
       */
      selectedSlide: {
        type: Number,
        value: 0
      },
      /**
       * Start auto play on load
       */
      autoPlay: {
        type: Object,
        value: true
      },
      /**
       * Internal list of all slides that have not been pre-loaded.
       */
      _slidesToBeLoaded: {
        type: Array,
        value: []
      },
      /**
       * Interval used for auto play
       */
      _autoPlayInterval: {
        type: Object
      },
      /**
       * Whether the carousel is currently auto playing
       */
      _autoPlaying: {
        type: Boolean,
        value: false
      }
    },
    attached: function () {
      if (this.autoPlay) {
        this._startAutoPlay();
      }
      
      this.$.heightHackImage.style.height = this.$.heightHackImage.offsetWidth / this.heightRatio + 'px';
    },
    /**
     * Transitions to a given slide number
     * @param newSlide Optional
     * @private
     */
    _transitionToSlide: function (newSlide) {
      if (typeof(newSlide) === 'undefined') {
        // Default increment the slide by 1
        newSlide = (this.selectedSlide == (this.slides.length - 1) ? 0 : this.selectedSlide + 1);
      }

      if (this._autoPlaying) {
        this._startAutoPlay();
      }

      this.$.slider.selectIndex(newSlide);
    },
    /**
     * Toggles auto play
     * @private
     */
    _togglePause: function () {
      if (!this._autoPlaying) {
        this.fire("uqlibrary-carousel-resumed");
        this._startAutoPlay();
      } else {
        this._stopAutoPlay();
        this.fire("uqlibrary-carousel-paused");
      }
    },
    /**
     * Starts the auto play interval
     * @private
     */
    _startAutoPlay: function () {
      this._stopAutoPlay();

      var self = this;

      this._autoPlaying = true;
      this._autoPlayInterval = setInterval(function () {
        self._transitionToSlide();
      }, this.slideDuration);
    },
    /**
     * Removes the auto play interval
     * @private
     */
    _stopAutoPlay: function () {
      clearInterval(this._autoPlayInterval);
      this._autoPlaying = false;
    },
    /**
     * Called when the "slides" array has updated
     * @private
     */
    _slidesChanged: function () {
      for (var i = 0; i < this.slides.length; i++) {
        this.slides[i].index = i;
        this.slides[i].loaded = false;
      }

      // Make sure the selected slide is valid
      if (this.selectedSlide >= this.slides.length) this.selectedSlide = 0;

      this._preloadSlides();
    },
    /**
     * Pre-loads all images in the slides
     * @private
     */
    _preloadSlides: function () {
      if (this.slides.length == 0) return;

      this._slidesToBeLoaded = [];
      for (var i = 0; i < this.slides.length; i++) {
        if (this.selectedSlide != i) this._slidesToBeLoaded.push(this.slides[i]);
      }
      // Add the selected slide to the front of the array
      this._slidesToBeLoaded.unshift(this.slides[this.selectedSlide]);

      // Start preloading the first slide
      this._preloadSlide();
    },
    /**
     * Pre-loads a single slide, then calls itself to load the next
     * @private
     */
    _preloadSlide: function () {
      var self = this;
      
      if (this._slidesToBeLoaded.length > 0) {
        var slide = this._slidesToBeLoaded.shift();
        
        var img = new Image();
        img.src = slide.image.href;
        img.onload = function () {
          self.slides[slide.index].loaded = true;
          self.notifyPath('slides.'+slide.index+'.loaded', self.slides[slide.index].loaded);

          // Load next image
          self._preloadSlide();
        };
      } else {
        this.$.heightHackImage.style.height = 'auto';
        this.fire('uqlibrary-carousel-loaded');
      }
    },
    /**
     * Called when a user clicks on a nav dot
     * @param e
     * @private
     */
    _navDotClicked: function (e) {
      this.fire("uqlibrary-carousel-slide-changed", { slideNumber: e.model.item.index + 1 });
      this._transitionToSlide(e.model.item.index);
    },
    /**
     * Returns a CSS class for the given nav dot
     * @param selectedSlide Currently selected slide
     * @param i Index of the dot
     * @private
     */
    _navDotClass: function (selectedSlide, i) {
      return (selectedSlide == i ? "active" : "");
    }
  });
})();