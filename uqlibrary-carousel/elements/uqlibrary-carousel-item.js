(function() {
  Polymer({
    is: 'uqlibrary-carousel-item',
    behaviors: [
      Polymer.NeonAnimatableBehavior
    ],
    properties: {
      /**
       * Slide object
       */
      slide: {
        type: Object,
        notify: true
      },
      transitionDuration: {
        type: Number,
        value: 2000
      },
      /**
       * Width to height ratio
       */
      heightRatio: {
        type: Number
      },
      animationConfig: {
        value: function() {
          return {
            'entry': {
              name: 'fade-in-animation',
              node: this,
              timing: {
                duration: 2000
              }
            },
            'exit': {
              name: 'fade-out-animation',
              node: this,
              timing: {
                duration: 2000
              }
            }
          }
        }
      }
    },
    attached: function () {
      this.animationConfig['entry'].timing.duration = this.transitionDuration;
      this.animationConfig['exit'].timing.duration = this.transitionDuration;

      this.async(function () {
        this.$$('.loader').style.height = this.$$('.loader').offsetWidth / this.heightRatio + 'px';
      });
    },
    /**
     * Fires an event
     * @private
     */
    _linkClicked: function () {
      this.fire("uqlibrary-carousel-link-clicked", { "slideNumber": this.slide.index + 1 });
    }
  });
})();