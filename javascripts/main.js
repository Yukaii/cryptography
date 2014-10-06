(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  this.cipher = function() {
    var caesar, mono, playfair, product, row, vernam;
    $('#caesar-form').submit(function(event) {
      var ciphered_text, ct, plaintext, shift;
      event.preventDefault();
      plaintext = $("#caesar-form input[name ='plaintext']").val();
      shift = parseInt($("select[name = 'shift']").find(":selected").val());
      ciphered_text = caesar(plaintext, shift);
      ct = $("#caesar-form .ciphered_text").get(0);
      return ct.innerHTML = "" + ciphered_text;
    });
    caesar = function(plaintext, shift) {
      var char, charCode, ciphered_text, upper, _i, _len;
      if (plaintext == null) {
        plaintext = "distributed anonymous";
      }
      if (shift == null) {
        shift = 5;
      }
      ciphered_text = "";
      for (_i = 0, _len = plaintext.length; _i < _len; _i++) {
        char = plaintext[_i];
        charCode = char.charCodeAt(0);
        if ((64 < charCode && charCode < 91) || (96 < charCode && charCode < 123)) {
          if ((64 < charCode && charCode < 91)) {
            upper = true;
            charCode -= 65;
          } else if ((96 < charCode && charCode < 123)) {
            upper = false;
            charCode -= 97;
          }
          charCode += shift;
          if (charCode > 25) {
            charCode %= 26;
          }
          if (upper) {
            charCode += 65;
          } else {
            charCode += 97;
          }
        }
        char = String.fromCharCode(charCode);
        ciphered_text += char;
      }
      return ciphered_text;
    };
    $('#mono-form').submit(function(event) {
      var ciphered_text, ct, plaintext;
      event.preventDefault();
      plaintext = $("#mono-form input[name ='plaintext']").val();
      ciphered_text = mono(plaintext);
      ct = $("#mono-form .ciphered_text").get(0);
      return ct.innerHTML = "" + ciphered_text;
    });
    mono = function(plaintext) {
      var char, charCode, ciphered_text, sub_table, upper, _i, _len;
      if (plaintext == null) {
        plaintext = "distributed anonymous";
      }
      ciphered_text = "";
      sub_table = [22, 25, 6, 17, 11, 14, 20, 0, 24, 12, 19, 7, 23, 2, 18, 4, 15, 22, 9, 1, 8, 5, 16, 21, 10, 3];
      for (_i = 0, _len = plaintext.length; _i < _len; _i++) {
        char = plaintext[_i];
        charCode = char.charCodeAt(0);
        if ((64 < charCode && charCode < 91) || (96 < charCode && charCode < 123)) {
          if ((64 < charCode && charCode < 91)) {
            upper = true;
            charCode -= 65;
          } else if ((96 < charCode && charCode < 123)) {
            upper = false;
            charCode -= 97;
          }
          charCode = sub_table[charCode];
          if (upper) {
            charCode += 65;
          } else {
            charCode += 97;
          }
        }
        char = String.fromCharCode(charCode);
        ciphered_text += char;
      }
      return ciphered_text;
    };
    $('#playfair-form').submit(function(event) {
      var ciphered_text, ct, key, plaintext;
      event.preventDefault();
      plaintext = $("#playfair-form input[name ='plaintext']").val();
      key = $("#playfair-form input[name ='key']").val();
      ciphered_text = playfair(plaintext, key);
      ct = $("#playfair-form .ciphered_text").get(0);
      return ct.innerHTML = "" + ciphered_text;
    });
    playfair = function(plaintext, key) {
      var alpha, cCode, char, ciphered_text, first, first_ciphered, first_x, first_y, i, key_table, secon, secon_ciphered, secon_x, secon_y, splitted, words, _i, _j, _k, _l, _len, _len1, _ref;
      if (plaintext == null) {
        plaintext = "distributed";
      }
      if (key == null) {
        key = "proclam";
      }
      key_table = [];
      key = key.toLowerCase();
      for (_i = 0, _len = key.length; _i < _len; _i++) {
        char = key[_i];
        if (!(__indexOf.call(key_table, char) >= 0)) {
          key_table.push(char);
        }
      }
      for (cCode = _j = 97; _j <= 122; cCode = ++_j) {
        if (!(cCode !== 106)) {
          continue;
        }
        alpha = String.fromCharCode(cCode);
        if (!(__indexOf.call(key_table, alpha) >= 0)) {
          key_table.push(alpha);
        }
      }
      if ((plaintext.length % 2) === 1) {
        plaintext = plaintext.concat("x");
      }
      plaintext = plaintext.replace(/\s/g, "").replace(/[^a-z]/g, "").replace(/[j]/g, "i");
      splitted = [];
      for (i = _k = 0, _ref = plaintext.length / 2 - 1; 0 <= _ref ? _k <= _ref : _k >= _ref; i = 0 <= _ref ? ++_k : --_k) {
        splitted.push(plaintext.slice(i * 2, i * 2 + 2));
      }
      ciphered_text = "";
      for (_l = 0, _len1 = splitted.length; _l < _len1; _l++) {
        words = splitted[_l];
        first = key_table.indexOf(words[0]);
        secon = key_table.indexOf(words[1]);
        first_x = first % 5;
        first_y = parseInt(first / 5);
        secon_x = secon % 5;
        secon_y = parseInt(secon / 5);
        if (first_y === secon_y) {
          if (first_x === 4) {
            first_ciphered = key_table[first_y * 5];
          } else {
            first_ciphered = key_table[first_y * 5 + first_x + 1];
          }
          if (secon_x === 4) {
            secon_ciphered = key_table[secon_y * 5];
          } else {
            secon_ciphered = key_table[secon_y * 5 + secon_x + 1];
          }
        } else if (first_x === secon_x) {
          if (first_y === 4) {
            first_ciphered = key_table[first_x];
          } else {
            first_ciphered = key_table[(first_y + 1) * 5 + first_x];
          }
          if (secon_y === 4) {
            secon_ciphered = key_table[secon_x];
          } else {
            secon_ciphered = key_table[(secon_y + 1) * 5 + secon_x];
          }
        } else {
          first_ciphered = key_table[first_y * 5 + secon_x];
          secon_ciphered = key_table[secon_y * 5 + first_x];
        }
        ciphered_text += first_ciphered + secon_ciphered;
      }
      return ciphered_text;
    };
    $('#vernam-form').submit(function(event) {
      var ciphered_text, ct, key, plaintext;
      event.preventDefault();
      plaintext = $("#vernam-form input[name ='plaintext']").val();
      key = $("#vernam-form input[name ='key']").val();
      ciphered_text = vernam(plaintext, key);
      ct = $("#vernam-form .ciphered_text").get(0);
      return ct.innerHTML = "" + ciphered_text;
    });
    vernam = function(plaintext, key) {
      var autokey, ciphered_code_string, ciphered_text, i, j, key_code, left, text_code, _i, _j, _k, _ref, _ref1, _ref2;
      if (plaintext == null) {
        plaintext = "this";
      }
      if (key == null) {
        key = "pro";
      }
      plaintext = plaintext.replace(/\s/g, "").replace(/[^a-z]/g, "").replace(/[j]/g, "i");
      autokey = "";
      autokey += key;
      left = plaintext.length - key.length;
      for (i = _i = 0, _ref = left - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        autokey += plaintext[i];
      }
      ciphered_text = "";
      for (i = _j = 0, _ref1 = plaintext.length - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
        text_code = (plaintext.charCodeAt(i) - 97).toString(2);
        key_code = (autokey.charCodeAt(i) - 97).toString(2);
        ciphered_code_string = "";
        for (j = _k = 0, _ref2 = text_code.length - 1; 0 <= _ref2 ? _k <= _ref2 : _k >= _ref2; j = 0 <= _ref2 ? ++_k : --_k) {
          ciphered_code_string += parseInt(text_code[j]) ^ parseInt(key_code[j]);
        }
        ciphered_text += String.fromCharCode(parseInt(ciphered_code_string, 2) + 97);
      }
      return ciphered_text;
    };
    $('#row-form').submit(function(event) {
      var ciphered_text, ct, key, plaintext;
      event.preventDefault();
      plaintext = $("#row-form input[name ='plaintext']").val();
      key = $("#row-form input[name ='key']").val();
      ciphered_text = row(plaintext, key);
      ct = $("#row-form .ciphered_text").get(0);
      return ct.innerHTML = "" + ciphered_text;
    });
    row = function(plaintext, key) {
      var ciphered_text, i, index, j, key_length, order, _i, _j, _k, _len, _ref, _ref1;
      if (plaintext == null) {
        plaintext = "distributed anonymous";
      }
      if (key == null) {
        key = "85167234";
      }
      key_length = key.length;
      order = [];
      for (_i = 0, _len = key.length; _i < _len; _i++) {
        i = key[_i];
        order.push(parseInt(i));
      }
      plaintext = plaintext.replace(/\s/g, "").replace(/[^a-z]/g, "").replace(/[j]/g, "i");
      ciphered_text = "";
      for (i = _j = 1, _ref = order.length; 1 <= _ref ? _j <= _ref : _j >= _ref; i = 1 <= _ref ? ++_j : --_j) {
        index = order.indexOf(i);
        for (j = _k = index, _ref1 = plaintext.length - 1; _k <= _ref1; j = _k += 8) {
          ciphered_text += plaintext[j];
        }
      }
      return ciphered_text;
    };
    $('#product-form').submit(function(event) {
      var ciphered_text, ct, key, plaintext;
      event.preventDefault();
      plaintext = $("#product-form input[name ='plaintext']").val();
      key = $("#product-form input[name ='key']").val();
      ciphered_text = product(plaintext, key);
      ct = $("#product-form .ciphered_text").get(0);
      return ct.innerHTML = "" + ciphered_text;
    });
    return product = function(plaintext) {
      var ciphered_text, i, index, order, _i, _ref;
      if (plaintext == null) {
        plaintext = "distributed anonymous";
      }
      order = [15, 11, 19, 18, 16, 3, 7, 14, 2, 20, 4, 12, 9, 6, 1, 5, 17, 13, 10, 8];
      plaintext = plaintext.replace(/\s/g, "").replace(/[^a-z]/g, "").replace(/[j]/g, "i");
      ciphered_text = "";
      for (i = _i = 1, _ref = order.length; 1 <= _ref ? _i <= _ref : _i >= _ref; i = 1 <= _ref ? ++_i : --_i) {
        index = order.indexOf(i);
        ciphered_text += plaintext[index];
      }
      return ciphered_text;
    };
  };

}).call(this);
