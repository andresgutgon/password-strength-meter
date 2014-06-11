/* ========================================================================
 * Password Strength Meter
 * ======================================================================== */
!function ($) {

  "use strict"; // jshint ;_;


 /* PASSWORD STRENGTH METER PUBLIC CLASS DEFINITION
  * =============================== */

  var StrengthMeter = function (input, strength_meter, options) {
    this.init(input, strength_meter, options)
  }

  StrengthMeter.prototype = {

    constructor: StrengthMeter

  /**
   * Init plugin with input field and strength meter markup
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

  /**
   * Check if string contains numbers and letters
   *
   * @param  {String} password
   *
   * @return  {Boolean}
   */
  , includeNumbersAndLetters: function (password) {
      return /[a-z]+/i.test(password) && /[0-9]+/.test(password);
    }

    /**
     * Check minimun required requirements
     *
     * @return {Boolean}
     */
  , checkIsValid: function() {
      var password = this.$input.val().trim()
        , valid = true
        , has_spaces = false
        , too_short = false
        , only_letters_or_only_numbers = false
        , is_empty = false;

      if (password === '') {
        is_empty = true;
      } else if (password.match(/\s+/i)) {
        has_spaces = true;
      } else if (password.length < this.options.min_length) {
        too_short = true;
      } else if (!this.includeNumbersAndLetters(password)) {
        only_letters_or_only_numbers = true;
      }

      if (is_empty || has_spaces || too_short || only_letters_or_only_numbers) {
        valid = false;
      }

      this.$input.data('is_valid', valid);
    }
  , check: function() {
      var score = 0
        , password = this.$input.val().trim()
        , app_requirements = this.options.app_requirements
        , $strength_meter_copy = this.$strength_meter.find(this.options.strength_meter_copy_element)
        , $strength_meter_label = this.$strength_meter.find(this.options.strength_meter_label_element);

      $strength_meter_label.hide();

      if (password === '') {
        $strength_meter_label.show();
        $strength_meter_copy.text('');
      } else if (password.match(/\s+/i)) {
        $strength_meter_copy.text(this.options.copy_must_not_contain_spaces);

      } else if (password.length < this.options.min_length) {
        $strength_meter_copy.text(this.options.copy_too_short);

      } else if (!this.includeNumbersAndLetters(password)) {
        $strength_meter_copy.text(this.options.copy_must_contain_number_and_letters);

      } else if (app_requirements && typeof this.options.app_requirements === 'function' && !this.options.app_requirements(password)) {
        $strength_meter_copy.text(this.options.copy_app_requirements);
      } else {
        $strength_meter_label.show();

        if (password.length >= this.options.min_length) { score += 1; }
        if (password.match(/([A-Z])/)) { score += 1; }
        if (password.match(/[!,@,#,$,%,\^,&,*,?,_,~]/)) { score += 1; }
        if (password.length >= this.options.ideal_length) { score += 1; }

        switch(score) {
          case 1:
            $strength_meter_copy.text(this.options.copy_weak);
            break;
          case 2:
            $strength_meter_copy.text(this.options.copy_fair);
            break;
          case 3:
            $strength_meter_copy.text(this.options.copy_good);
            break;
          case 4:
            $strength_meter_copy.text(this.options.copy_strong);
            break;
        }
      }

      this.$strength_meter.attr("data-score", score);
    }

    /**
     * restore strength meter to initial state
     */
  , reset: function() {
      var $strength_meter_copy = this.$strength_meter.find(this.options.strength_meter_copy_element);

      $strength_meter_copy.text('');
      this.$strength_meter.attr("data-score", 0);
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
      strength_meter_label_element: '.js-strength-meter-label'
    , strength_meter_copy_element: '.js-strength-meter-copy'
    , min_length: 8
    , ideal_length: 12
    , copy_too_short: 'Too short'
    , copy_must_not_contain_spaces: 'Can not contain spaces'
    , copy_must_contain_number_and_letters: 'Must contain numbers and letters'
    , copy_app_requirements: 'This password doesn\'t pass app requirements'
    , copy_weak: 'Weak'
    , copy_fair: 'Fair'
    , copy_good: 'Good'
    , copy_strong: 'Strong'
  }

 /* PASSWORD STRENGTH METER NO CONFLICT
  * =================== */

  $.fn.passwordStrengthMeter.noConflict = function() {
    $.fn.passwordStrengthMeter = old
    return this
  }

}(window.jQuery);
