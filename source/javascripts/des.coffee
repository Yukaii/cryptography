@des = ->

  $('#des-form').submit (event) ->
    event.preventDefault()

    plaintext = $("#des-form input[name ='plaintext']").val()
    key = $("#des-form input[name ='key']").val()

    # parse 8 ASCII charactor into 64 bits
    plaintext_bits = ""

    for i in [0..plaintext.length-1]
      plaintext_bits += parseInt(plaintext[i].charCodeAt(0).toString(2)).padLeft(8).toString()

    # console.log "input Bits: #{plaintext_bits}"
    # console.log "key bits: #{key}"

    # Initial Permutation
    plaintext_bits = permutate(plaintext_bits, IP)

    # Prepare L/R for the first round
    leftBits  = plaintext_bits.substr(0, 32)
    rightBits = plaintext_bits.substr(32, 32)

    # console.log "L[0]: #{leftBits}"
    # console.log "R[0]: #{rightBits}"

    key = permutate(key, PC1)
    # console.log "CD[0]: #{key}"

    # FOR 16 ROUNDS
    for i in [1..16]
      # SHIFT key
      key = key.substr(0, 28).rotate(SHIFT[i-1]) + key.substr(28, 28).rotate(SHIFT[i-1])

      # console.log "CD[#{i}]: #{key}"
      # console.log "KS[#{i}]: #{permutate(key, PC2)}"

      tmp = leftBits
      leftBits = rightBits
      rightBits = xor(fFunction(rightBits, permutate(key, PC2)), tmp)
      # console.log "L[#{i}]: #{leftBits}"
      # console.log "R[#{i}]: #{rightBits}"

    ciphered = permutate(rightBits + leftBits, FP)
    # console.log "output: #{ciphered}"

    word = ""
    for i in [0..7]
      word += parseInt(ciphered.substr(i*8, 8),2).toString(16)

    answer = $('#des_answer').get(0)
    answer.innerHTML = ciphered + "<br><br>" + word

  permutate = (bits, pTable) ->
    permutated = ""
    for i in [0..pTable.length-1]
      permutated += (bits[ pTable[i]-1 ]).toString()

    return permutated

  xor = (a, b) ->
    xorrrr = ""
    for i in [0..a.length-1]
      xorrrr += (a[i] ^ b[i])
    return xorrrr

  sbox = (bits, sbox) ->
    x = bits.substr(1, 4)
    y = bits[0] + bits[5]
    # console.log "x: #{x} = #{parseInt(x, 2)}, y: #{y} = #{parseInt(y, 2)}, #{parseInt(x, 2) + parseInt(y, 2) * 16}"
    # console.log sbox[parseInt(x, 2) + parseInt(y, 2) * 16]
    return parseInt(parseInt(sbox[parseInt(x, 2) + parseInt(y, 2) * 16]).toString(2)).padLeft(4).toString()

  fFunction = (rightBits, key) ->

    rightBits = permutate(rightBits, EP)
    # console.log "E: #{rightBits}"
    rightBits = xor(rightBits, key)
    # console.log "xor: #{rightBits}"
    
    # do SBOX
    tmp = rightBits
    rightBits = ""
    for i in [0..7]
      # console.log "#{i}th BOX"
      # console.log tmp.substr(6*i, 6)
      rightBits += sbox(tmp.substr(6*i, 6), SBOX[i])

    # console.log "sbox: #{rightBits}"
    # Permutation again
    rightBits = permutate(rightBits, RP)
    # console.log "P: #{rightBits}"

    return rightBits
    