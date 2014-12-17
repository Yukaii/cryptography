
$(document).ready ->
  $('#rsa-form').submit (evejnt) ->
    event.preventDefault()

    message = $('input[name="message-bits"]').val()
    console.log message
    $('#result_text').val RSA.encrypt(message)


class @RSA
  n = bigInt "1230186684530117755130494958384962720772853569595334792197322452151726400507263657518745202199786469389956474942774063845925192557326303453731548268507917026122142913461670429214311602221240479274737794080665351419597459856902143413"
  p = bigInt "33478071698956898786044169848212690817704794983713768568912431388982883793878002287614711652531743087737814467999489"
  q = bigInt "36746043666799590428244633799627952632279158164343087642676032283815739666511279233373417143396810270092798736308917"

  pub_key = bigInt "65537"
  # phi_n = (p-1) * (q-1)

  @encrypt: (message) ->
    message = bigInt message
    e = square_and_multiply(message, pub_key, n)

  multiplicative_inverse_mod_n = (number, n) ->
    square_and_multiply(number, n-2, n)

  square_and_multiply = (x, power, n) ->
    # console.log "power = #{power}"
    bin_pow = power.toString(2)
    y = x

    for digit in bin_pow[1..-1]
      # y = (Math.pow y, 2) % n
      y = y.pow(2).mod(n)
      
      if digit == 1
        # y = (y * x) % n
        y = y.times(x).mod(n)

    return y
