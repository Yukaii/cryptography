(function() {
  var clearOutput, outputString, val_binary_64bits;

  outputString = "";

  val_binary_64bits = /^[0-1]{64}$/;

  $(document).ready(function() {
    $('#des-form').submit(function(event) {
      return event.preventDefault();
    });
    $("input[tag='encrypt']").click(function() {
      var ciphered, key, plaintext;
      clearOutput();
      plaintext = $("#des-form input[name ='plaintext']").val();
      key = $("#des-form input[name ='key']").val();
      if (!val_binary_64bits.test(plaintext)) {
        $("#plain_alert").html("Invalid Input, plaintext must be 64 bits binary code");
      }
      if (!val_binary_64bits.test(key)) {
        return $("#key_alert").html("invalid key input");
      } else {
        ciphered = DesCipher.encrypt(plaintext, key);
        $('#encrypt').html(ciphered);
        return $("#output_log").val(outputString);
      }
    });
    return $("input[tag='decrypt']").click(function() {
      var ciphered, decrypted, key;
      clearOutput();
      ciphered = $("#des-form input[name ='ciphertext']").val();
      key = $("#des-form input[name ='key']").val();
      if (!val_binary_64bits.test(ciphered)) {
        return $('#cipher_alert').html("Invalid input, must be 64 bits binary code");
      } else {
        decrypted = DesCipher.decrypt(ciphered, key);
        return $("#decrypt").html(decrypted);
      }
    });
  });

  clearOutput = function() {
    $('#encrypt').html("");
    $("#decrypt").html("");
    $("#output_log").val("");
    $("#key_alert").html("");
    $("#cipher_alert").html("");
    return outputString = "";
  };

  this.DesCipher = (function() {
    var beautifyOutput, fFunction, permutate, sbox, toASCII, toBinary, xor;

    function DesCipher() {}

    DesCipher.encrypt = function(plaintext, key) {
      var ciphered, i, leftBits, rightBits, tmp, _i;
      plaintext = permutate(plaintext, IP);
      leftBits = plaintext.substr(0, 32);
      rightBits = plaintext.substr(32, 32);
      key = permutate(key, PC1);
      for (i = _i = 1; _i <= 16; i = ++_i) {
        outputString += "Round " + i + "\n";
        key = key.substr(0, 28).rotate(SHIFT[i - 1]) + key.substr(28, 28).rotate(SHIFT[i - 1]);
        tmp = leftBits;
        leftBits = rightBits;
        rightBits = xor(fFunction(rightBits, permutate(key, PC2)), tmp);
        outputString += "" + (beautifyOutput(leftBits + rightBits)) + "\n\n";
      }
      ciphered = permutate(rightBits + leftBits, FP);
      outputString += "\n\nOutput: \n" + (beautifyOutput(ciphered));
      return beautifyOutput(ciphered);
    };

    DesCipher.decrypt = function(ciphered, key) {
      var decrypted, i, leftBits, rightBits, tmp, _i;
      key = $("#des-form input[name ='key']").val();
      key = permutate(key, PC1);
      ciphered = permutate(ciphered, FP.inverse());
      rightBits = ciphered.substr(0, 32);
      leftBits = ciphered.substr(32, 32);
      for (i = _i = 16; _i >= 1; i = --_i) {
        if (i < 16) {
          key = key.substr(0, 28).rotate(-RSHIFT[16 - i]) + key.substr(28, 28).rotate(-RSHIFT[16 - i]);
        }
        tmp = rightBits;
        rightBits = leftBits;
        leftBits = xor(fFunction(leftBits, permutate(key, PC2)), tmp);
      }
      decrypted = permutate(leftBits + rightBits, FP);
      return beautifyOutput(decrypted);
    };

    toBinary = function(chars) {
      var bits, i, _i, _ref;
      bits = "";
      for (i = _i = 0, _ref = chars.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        bits += parseInt(chars[i].charCodeAt(0).toString(2)).padLeft(8).toString();
      }
      return bits;
    };

    toASCII = function(bits) {
      var i, word, _i;
      word = "";
      for (i = _i = 0; _i <= 7; i = ++_i) {
        word += parseInt(bits.substr(i * 8, 8), 2).toString(16);
      }
      return word;
    };

    beautifyOutput = function(bits) {
      var i, output, _i;
      output = "";
      for (i = _i = 0; _i <= 7; i = ++_i) {
        output += bits.substr(i * 8, 8) + " ";
      }
      return output;
    };

    permutate = function(bits, pTable) {
      var i, permutated, _i, _ref;
      permutated = "";
      for (i = _i = 0, _ref = pTable.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        permutated += bits[pTable[i] - 1].toString();
      }
      return permutated;
    };

    xor = function(a, b) {
      var i, xorrrr, _i, _ref;
      xorrrr = "";
      for (i = _i = 0, _ref = a.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        xorrrr += a[i] ^ b[i];
      }
      return xorrrr;
    };

    sbox = function(bits, sbox) {
      var x, y;
      x = bits.substr(1, 4);
      y = bits[0] + bits[5];
      return parseInt(parseInt(sbox[parseInt(x, 2) + parseInt(y, 2) * 16]).toString(2)).padLeft(4).toString();
    };

    fFunction = function(rightBits, key) {
      var i, tmp, _i;
      rightBits = permutate(rightBits, EP);
      rightBits = xor(rightBits, key);
      tmp = rightBits;
      rightBits = "";
      for (i = _i = 0; _i <= 7; i = ++_i) {
        rightBits += sbox(tmp.substr(6 * i, 6), SBOX[i]);
      }
      rightBits = permutate(rightBits, RP);
      return rightBits;
    };

    return DesCipher;

  })();

}).call(this);
