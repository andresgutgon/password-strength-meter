/* ========================================================================
 * Password Strength Meter: password-strength-meter.js v0.0.1
 * ======================================================================== */

!function ($) {

  "use strict"; // jshint ;_;


 /* TOOLTIP PUBLIC CLASS DEFINITION
  * =============================== */

  var StrengthMeter = function (element, options) {
    this.init(input, strength_meter, options)
  }

  StrengthMeter.prototype = {

    constructor: StrengthMeter

  /**
   * Init plugin with input field and streng meter markup
   * @param  {jQuery} input
   * @param  {jQuery} strength_meter
   * @param  {Object} options
   *    - strength_meter_copys (Object) - Copys to be displayed
   */
  , init: function (input, strength_meter, options) {
      this.$input = $(input);
      this.$strength_meter = $(strength_meter);
      this.options = this.getOptions(options);
    }
  , getOptions: function (options) {
      options = $.extend({}, $.fn.passwordStrengthMeter.defaults, this.$input.data(), options);
      return options;
    }
  , check: function () {

    }
  };

 /* PASSWORD STRENGTH METER PLUGIN DEFINITION
  * ========================= */

  var old = $.fn.passwordStrengthMeter

  $.fn.passwordStrengthMeter = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('passwordStrengthMeter')
        , options = typeof option == 'object' && option
      if (!data) $this.data('passwordStrengthMeter', (data = new StrengthMeter(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.passwordStrengthMeter.Constructor = StrengthMeter

  $.fn.passwordStrengthMeter.defaults = {
    strength_meter_copys: {
      weak: 'Weak'
    , fair: 'Fair'
    , good: 'Good'
    , strong: 'Strong'
    }
  , strength_meter_copys_element: 'js-strength-meter-copy'
  }


 /* PASSWORD STRENGTH METER NO CONFLICT
  * =================== */

  $.fn.passwordStrengthMeter.noConflict = function () {
    $.fn.passwordStrengthMeter = old
    return this
  }

}(window.jQuery);
