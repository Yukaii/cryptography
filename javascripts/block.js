(function() {
  $(document).ready(function() {
    $('input[name="initial-vector"]').val(function() {
      var i, str, _i;
      str = "";
      for (i = _i = 0; _i <= 63; i = ++_i) {
        if (Math.random() > 0.5) {
          str += "1";
        } else {
          str += "0";
        }
      }
      return str;
    });
    return $('#block-form').submit(function(event) {
      var imageHeight, imageWidth, img, imgObj, imgurl;
      event.preventDefault();
      imgurl = $("input[name=image-url]").val();
      $("#ori-pic").attr("src", imgurl);
      img = $("#ori-pic").get(0);
      imgObj = new Image();
      imgObj.src = imgurl;
      imageWidth = 0;
      imageHeight = 0;
      return imgObj.onload = function() {
        var arr, canvas, context, data, imgData, iv, key, lastIndex, pool, proccessThread, scaleRatio, str, url;
        imageWidth = imgObj.width;
        imageHeight = imgObj.height;
        canvas = $("#proccessed-pic").get(0);
        context = canvas.getContext("2d");
        scaleRatio = parseInt(imageWidth / 150);
        canvas.width = imageWidth / scaleRatio;
        canvas.height = imageHeight / scaleRatio;
        img.width = canvas.width;
        img.height = canvas.height;
        imageWidth = img.width;
        imageHeight = img.height;
        context.scale(1 / scaleRatio, 1 / scaleRatio);
        context.drawImage(img, 0, 0);
        imgData = context.getImageData(0, 0, canvas.width, canvas.height);
        data = imgData.data;
        key = $('input[name="block-key"]').val();
        iv = $('input[name="initial-vector"]').val();
        pool = new ThreadPool();
        proccessThread = function(obj, done) {
          var func;
          func = function() {
            var block, ciphered, i, j, str, url, xor, _i, _j, _k, _ref;
            data = obj[0];
            key = obj[1];
            url = obj[2];
            iv = obj[3];
            xor = function(a, b) {
              var i, xorrrr, _i, _ref;
              xorrrr = "";
              for (i = _i = 0, _ref = a.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
                xorrrr += a[i] ^ b[i];
              }
              return xorrrr;
            };
            importScripts("" + url + "/javascripts/lib.js");
            importScripts("" + url + "/javascripts/des.min.js");
            for (i = _i = 0, _ref = data.length - 9; _i <= _ref; i = _i += 8) {
              block = "";
              for (j = _j = 0; _j <= 7; j = ++_j) {
                str = parseInt(data[i + j].toString(2));
                block += (Array(8 - String(str).length + 1).join('0') + str).toString();
              }
              ciphered = DesCipher.encrypt(xor(block, iv), key);
              ciphered = ciphered.replace(/\s/g, "");
              iv = ciphered;
              for (j = _k = 0; _k <= 7; j = ++_k) {
                data[i + j] = parseInt(ciphered.substr(j * 8, 8), 2);
              }
              if (i % 12344 === 0) {
                console.log("" + i + ": " + ciphered);
              }
            }
            return data;
          };
          return done(func());
        };
        arr = [];
        str = document.URL;
        lastIndex = str.lastIndexOf("/");
        url = str.substr(0, lastIndex);
        arr.push(data);
        arr.push(key);
        arr.push(url);
        arr.push(iv);
        return pool.run(proccessThread, arr).done(function(data) {
          var i, _i, _ref;
          canvas = document.getElementById("proccessed-pic");
          context = canvas.getContext("2d");
          console.log("" + imageWidth + ", " + imageHeight);
          imgData = context.getImageData(0, 0, imageWidth, imageHeight);
          for (i = _i = 0, _ref = data.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
            imgData.data[i] = data[i];
          }
          console.log("done!");
          return context.putImageData(imgData, 0, 0);
        });
      };
    });
  });

}).call(this);
