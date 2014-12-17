(function() {
  $(document).ready(function() {
    return $('#rsa-form').submit(function(evejnt) {
      var message;
      event.preventDefault();
      message = $('input[name="message-bits"]').val();
      console.log(message);
      return $('#result_text').val(RSA.encrypt(message));
    });
  });

  this.RSA = (function() {
    var multiplicative_inverse_mod_n, n, p, pub_key, q, square_and_multiply;

    function RSA() {}

    n = bigInt("1230186684530117755130494958384962720772853569595334792197322452151726400507263657518745202199786469389956474942774063845925192557326303453731548268507917026122142913461670429214311602221240479274737794080665351419597459856902143413");

    p = bigInt("33478071698956898786044169848212690817704794983713768568912431388982883793878002287614711652531743087737814467999489");

    q = bigInt("36746043666799590428244633799627952632279158164343087642676032283815739666511279233373417143396810270092798736308917");

    pub_key = bigInt("65537");

    RSA.encrypt = function(message) {
      var e;
      message = bigInt(message);
      return e = square_and_multiply(message, pub_key, n);
    };

    multiplicative_inverse_mod_n = function(number, n) {
      return square_and_multiply(number, n - 2, n);
    };

    square_and_multiply = function(x, power, n) {
      var bin_pow, digit, y, _i, _len, _ref;
      bin_pow = power.toString(2);
      y = x;
      _ref = bin_pow.slice(1);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        digit = _ref[_i];
        y = y.pow(2).mod(n);
        if (digit === 1) {
          y = y.times(x).mod(n);
        }
      }
      return y;
    };

    return RSA;

  })();

}).call(this);
