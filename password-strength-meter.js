/* ========================================================================
 * Password Strength Meter: password-strength-meter.js v0.0.1
 * ======================================================================== */

!function ($) {

  "use strict"; // jshint ;_;


 /* TOOLTIP PUBLIC CLASS DEFINITION
  * =============================== */

  var StrengthMeter = function (input, strength_meter, options) {
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
  , init: function(input, strength_meter, options) {
      this.$input = $(input);
      this.$strength_meter = $(strength_meter);
      this.options = this.getOptions(options);
    }
  , getOptions: function(options) {
      options = $.extend({}, $.fn.passwordStrengthMeter.defaults, this.$input.data(), options);
      return options;
    }
  , check: function() {
      var score = 0
        , password = this.$input.val().trim()
        , app_requirements = this.options.app_requirements
        , $strength_meter_copy = this.$strength_meter.find(this.options.strength_meter_copy)
        , $strength_meter_label = this.$strength_meter.find(this.options.strength_meter_label);

      $strength_meter_label.hide();

      if (password === '' || password.length < this.options.min_length) {
        $strength_meter_copy.text(this.options.strength_meter_copys.too_short);

      } else if (app_requirements && typeof this.options.app_requirements === 'function' && !this.options.app_requirements(password)) {
        $strength_meter_copy.text(this.options.strength_meter_copys.app_requirements_copy);
      } else {
        $strength_meter_label.show();

        if (password.match(/[!,@,#,$,%,\^,&,*,?,_,~]/)) { score += 1; }
        if (password.match(/([a-z])/)) { score += 1; }
        if (password.match(/([A-Z])/)) { score += 1; }
        if (password.match(/([0-9])/)) { score += 1; }
        if (password.length >= this.options.min_length) { score += 2; }
        if (password.length >= this.options.good_length) { score += 2; }
        if (password.length >= this.options.ideal_length) { score += 1; }

        if (1 < score && score < 4) {
          $strength_meter_copy.text(this.options.strength_meter_copys.weak);

        } else if (4 <= score && score < 6) {
          $strength_meter_copy.text(this.options.strength_meter_copys.fair);

        } else if (6 <= score && score < 8) {
          $strength_meter_copy.text(this.options.strength_meter_copys.good);

        } else if (8 <= score) {
          $strength_meter_copy.text(this.options.strength_meter_copys.strong);
        }
      }

      this.$strength_meter.attr("data-score", score);
    }
  };

 /* PASSWORD STRENGTH METER PLUGIN DEFINITION
  * ========================= */

  var old = $.fn.passwordStrengthMeter

  /**
   * Initialize plugin and execute methods. If param is a string we try to execute as method.
   *
   * @param  {Object || String} param
   */
  $.fn.passwordStrengthMeter = function(param) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('passwordStrengthMeter')
        , options = typeof param == 'object' && param.options
        , $strength_meter = typeof param == 'object' && param.strength_meter
      if (!data) $this.data('passwordStrengthMeter', (data = new StrengthMeter(this, $strength_meter, options)))
      if (typeof param == 'string') data[param]()
    })
  }

  $.fn.passwordStrengthMeter.Constructor = StrengthMeter

  $.fn.passwordStrengthMeter.defaults = {
      strength_meter_label: '.js-strength-meter-label'
    , strength_meter_copy: '.js-strength-meter-copy'
    , min_length: 8
    , good_length: 10
    , ideal_length: 12
    , strength_meter_copys: {
        too_short: 'Too short'
      , app_requirements_copy: 'This password doesn\'t pass app requirements'
      , weak: 'Weak'
      , fair: 'Fair'
      , good: 'Good'
      , strong: 'Strong'
      }
  }

 /* PASSWORD STRENGTH METER NO CONFLICT
  * =================== */

  $.fn.passwordStrengthMeter.noConflict = function() {
    $.fn.passwordStrengthMeter = old
    return this
  }

}(window.jQuery);
