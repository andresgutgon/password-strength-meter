
var Example = {};

Example._checkStrength = function () {
  $(this).passwordStrengthMeter('check');
}

Example.checkStrength = _.debounce(Example._checkStrength, 300);

$(function() {
  var $strength_meter = $('.js-strength-meter');


  /**
   * You can pass a function to check again your custom values
   *
   * @param  {String} password
   * @return {Boolean} valid
   */
  function app_requirements(password) {
    var username = 'andresgutgon'
      , name = 'Andrés'
      , lastname = 'Gutiérrez'
      , email = 'foo@bar.com';

    if (password === username || password === name || password === lastname || password === email) {
      return false;
    }

    return true
  }

  // Plugin initialization
  $('.js-password-input').passwordStrengthMeter({
    strength_meter: $strength_meter
  , options: {
    app_requirements: app_requirements
  }
  });

  $(document).on('keydown', '.js-password-input', Example.checkStrength);
});
