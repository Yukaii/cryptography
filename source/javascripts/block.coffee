$(document).ready ->
  # a = 10
  # console.log parseInt(a.toString(2)).padLeft(8).toString()

  $('input[name="initial-vector"]').val ->
    str = ""
    for i in [0..63]
      if Math.random() > 0.5
        str += "1"
      else
        str += "0"
    return str


  $('#block-form').submit (event) ->
    event.preventDefault()
    imgurl = $("input[name=image-url]").val()
    $("#ori-pic").attr("src", imgurl)
    img = $("#ori-pic").get(0)
    
    imgObj = new Image()
    imgObj.src = imgurl

    imageWidth = 0;
    imageHeight = 0;

    imgObj.onload = ->
      imageWidth = imgObj.width
      imageHeight = imgObj.height


      canvas = $("#proccessed-pic").get(0)      
      # canvas.width = img.width;
      # canvas.height = img.height;

      context = canvas.getContext("2d")

      scaleRatio = parseInt(imageWidth / 150)
      canvas.width = imageWidth / scaleRatio
      canvas.height = imageHeight / scaleRatio

      img.width = canvas.width
      img.height = canvas.height

      imageWidth = img.width
      imageHeight = img.height

      context.scale(1/scaleRatio, 1/scaleRatio)
      context.drawImage(img, 0, 0)

      imgData = context.getImageData(0, 0, canvas.width, canvas.height)
      # # dataURL = canvas.toDataURL("image/png");

      data = imgData.data
      # # start encryption
      key = $('input[name="block-key"]').val()
      iv = $('input[name="initial-vector"]').val()

      pool = new ThreadPool()

      proccessThread = (obj, done) ->

        func = ->
          data = obj[0]
          key = obj[1]
          url = obj[2]
          iv = obj[3]

          xor = (a, b) ->
            xorrrr = ""
            for i in [0..a.length-1]
              xorrrr += (a[i] ^ b[i])
            return xorrrr
          
          importScripts("#{url}/javascripts/lib.js");
          importScripts("#{url}/javascripts/des.min.js");

          for i in [0..data.length - 9] by 8
            block = ""
            for j in [0..7]
              str = parseInt(data[i+j].toString(2))
              block += (Array(8-String(str).length+1).join('0')+str).toString()


            ciphered = DesCipher.encrypt(xor(block, iv), key)
            ciphered = ciphered.replace(/\s/g, "")
            iv = ciphered

            for j in [0..7]
              data[i+j] = parseInt(ciphered.substr(j*8, 8), 2)

            # if i == 0
            #   console.log "#{ciphered}"
            # return false
            if i % 12344 == 0
              console.log "#{i}: #{ciphered}"        

          # console.log "ciphered done, #{data}"
          return data
        
        done(func())

      arr = []
      str = document.URL
      lastIndex = str.lastIndexOf("/")
      url = str.substr(0, lastIndex)      
      arr.push(data)
      arr.push(key)
      arr.push(url)
      arr.push(iv)

      pool.run(proccessThread, arr).done (data)->
        # console.log "ok we receive data, #{data.length}"
        canvas = document.getElementById("proccessed-pic")
        # console.log canvas
        context = canvas.getContext("2d")
        console.log "#{imageWidth}, #{imageHeight}"
        imgData = context.getImageData(0, 0, imageWidth, imageHeight)
        # console.log "imageData = #{imgData}"
        # imgData.data = data
        for i in [0..data.length-1]
          imgData.data[i] = data[i]

        console.log "done!"
        context.putImageData(imgData, 0, 0)