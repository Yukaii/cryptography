# global output string variable
outputString = ""

val_binary_64bits = /^[0-1]{64}$/

$(document).ready ->
  $('#des-form').submit (event) ->
    event.preventDefault()
    

  $("input[tag='encrypt']").click ->
    # reset output log textarea
    clearOutput()

    plaintext = $("#des-form input[name ='plaintext']").val()
    key = $("#des-form input[name ='key']").val()

    if !val_binary_64bits.test(plaintext)
      $("#plain_alert").html("Invalid Input, plaintext must be 64 bits binary code")

    if !val_binary_64bits.test(key)
      $("#key_alert").html("invalid key input")

    else
      ciphered = DesCipher.encrypt(plaintext, key)
      $('#encrypt').html(ciphered)
      $("#output_log").val(outputString)

  $("input[tag='decrypt']").click ->

    clearOutput()

    ciphered = $("#des-form input[name ='ciphertext']").val()
    key = $("#des-form input[name ='key']").val()

    if !val_binary_64bits.test(ciphered)
      $('#cipher_alert').html("Invalid input, must be 64 bits binary code")

    else
      decrypted = DesCipher.decrypt(ciphered, key)
      $("#decrypt").html(decrypted)

# -----------------------------------------------------
# Des Cipher
# -----------------------------------------------------


clearOutput = ->
  $('#encrypt').html("")
  $("#decrypt").html("")
  $("#output_log").val("")
  $("#key_alert").html("")
  $("#cipher_alert").html("")
  outputString = ""

class @DesCipher

  @encrypt: (plaintext, key) ->

    # Initial Permutation
    plaintext = permutate(plaintext, IP)
    # outputString += "Initial Permutation: \n" + plaintext + "\n"

    # Prepare L/R for the first round
    leftBits  = plaintext.substr(0, 32)
    rightBits = plaintext.substr(32, 32)

    key = permutate(key, PC1)
    # outputString += "key PC1 Permutation: \n" + key + "\n\n\n"

    # FOR 16 ROUNDS
    for i in [1..16]
      # SHIFT key
      outputString += "Round #{i}\n"
      key = key.substr(0, 28).rotate(SHIFT[i-1]) + key.substr(28, 28).rotate(SHIFT[i-1])
      # outputString += "C[#{i}]: #{key.substr(0, 28)}\n"
      # outputString += "D[#{i}]: #{key.substr(28,28)}\n"

      tmp = leftBits
      leftBits = rightBits
      rightBits = xor(fFunction(rightBits, permutate(key, PC2)), tmp)
      outputString += "#{beautifyOutput(leftBits+rightBits)}\n\n"

    ciphered = permutate(rightBits+leftBits, FP)
    outputString += "\n\nOutput: \n#{beautifyOutput(ciphered)}"

    return beautifyOutput(ciphered)


  @decrypt: (ciphered, key) ->
    # start about decrypt
    # ----------------------------
    key = $("#des-form input[name ='key']").val()
    key = permutate(key, PC1)

    ciphered = permutate(ciphered, FP.inverse())

    # swap L/R / correct!11
    rightBits = ciphered.substr(0, 32)
    leftBits  = ciphered.substr(32, 32)


    for i in [16..1]
      if i < 16
        # SHIFT key
        key = key.substr(0, 28).rotate(-RSHIFT[16-i]) + key.substr(28, 28).rotate(-RSHIFT[16-i])

      tmp = rightBits
      rightBits = leftBits
      leftBits = xor(fFunction(leftBits, permutate(key, PC2)), tmp)

    decrypted = permutate(leftBits+rightBits, FP)
    # console.log decrypted
    return beautifyOutput(decrypted)


  toBinary = (chars) ->
    # parse 8 ASCII charactor into 64 bits
    bits = ""
    for i in [0..chars.length-1]
      bits += parseInt(chars[i].charCodeAt(0).toString(2)).padLeft(8).toString()
    return bits

  toASCII = (bits) ->
    word = ""
    for i in [0..7]
      word += parseInt(bits.substr(i*8, 8),2).toString(16)
    return word

  beautifyOutput = (bits) ->
    output = ""
    for i in [0..7]
      output += bits.substr(i*8, 8) + " "
    return output

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
    return parseInt(parseInt(sbox[parseInt(x, 2) + parseInt(y, 2) * 16]).toString(2)).padLeft(4).toString()

  fFunction = (rightBits, key) ->

    rightBits = permutate(rightBits, EP)
    rightBits = xor(rightBits, key)
    
    # do SBOX
    tmp = rightBits
    rightBits = ""
    for i in [0..7]
      rightBits += sbox(tmp.substr(6*i, 6), SBOX[i])

    # Permutation again
    rightBits = permutate(rightBits, RP)

    return rightBits