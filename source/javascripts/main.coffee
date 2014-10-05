# 65~90 A - Z
# 97~122 a - z


@cipher = -> 
# ---------------------------------------------------------- #
#   CAESAR CIPHER 											                     #
# ---------------------------------------------------------- #
	$('#caesar-form').submit (event) ->
		# handle form only useing jQuery
		event.preventDefault()

		plaintext = $("#caesar-form input[name ='plaintext']").val()
		shift = parseInt($("select[name = 'shift']").find(":selected").val())

		ciphered_text = caesar(plaintext, shift)

		ct = $("#caesar-form .ciphered_text").get(0)
		ct.innerHTML = "#{ciphered_text}"

	caesar = (plaintext = "distributed anonymous", shift = 5) ->
		ciphered_text = ""
		for char in plaintext 
			do (char) ->
				charCode = char.charCodeAt(0)
				if 64 < charCode < 91 or 96 < charCode < 123

					if 64 < charCode < 91
						upper = true
						charCode -= 65

					else if 96 < charCode < 123
						upper = false
						charCode -= 97

					charCode += shift
					if charCode > 25 
						charCode %= 26
					
					if upper 
						charCode += 65
					else 
						charCode += 97

				char = String.fromCharCode(charCode)
				ciphered_text += char

		return ciphered_text
# ----------------------------------------------------------- #
#   Monoalphabetic cipher 									                  #
# ----------------------------------------------------------- #

	$('#mono-form').submit (event) ->	
		event.preventDefault()
		plaintext = $("#mono-form input[name ='plaintext']").val()

		ciphered_text = mono(plaintext)

		ct = $("#mono-form .ciphered_text").get(0)
		ct.innerHTML = "#{ciphered_text}"


	mono = (plaintext = "distributed anonymous")->
		ciphered_text = ""
		# "W","Z","G","R","L","O","U","A","Y","M","T","H","X","C","S","E","P","W","J","B","I","F","Q","V","K","D"
		sub_table = [22,25,6,17,11,14,20,0,24,12,19,7,23,2,18,4,15,22,9,1,8,5,16,21,10,3]

		for char in plaintext 
			do (char) ->
				charCode = char.charCodeAt(0)
				if 64 < charCode < 91 or 96 < charCode < 123
					# gerneralized charactor
					if 64 < charCode < 91
						upper = true
						charCode -= 65

					else if 96 < charCode < 123
						upper = false
						charCode -= 97

					charCode = sub_table[charCode]

					if upper 
						charCode += 65
					else 
						charCode += 97

				char = String.fromCharCode(charCode)
				ciphered_text += char

		return ciphered_text

# ----------------------------------------------------------- #
#   Playfair cipher
# 	reference algorithm: 
#	  http://practicalcryptography.com/ciphers/playfair-cipher/
# ----------------------------------------------------------- #

	$('#playfair-form').submit (event) ->
		event.preventDefault()
		plaintext = $("#playfair-form input[name ='plaintext']").val()	
		key = $("#playfair-form input[name ='key']").val()

		ciphered_text = playfair(plaintext, key)

		ct = $("#playfair-form .ciphered_text").get(0)
		ct.innerHTML = "#{ciphered_text}"


	playfair = (plaintext = "distributed", key = "proclam") ->
		
		# initial table
		key_table = []

		# all use lowercase alphabet
		_key = key.toLowerCase()
		for char in _key
			if !(char in key_table)
				key_table.push(char)

		# letters left, exclude j
		for cCode in [97..122] when cCode isnt 106
			alpha = String.fromCharCode(cCode)
			if !(alpha in key_table)
				key_table.push(alpha)

		# deal with odd letters in plaintext
		if (plaintext.length % 2) == 1
			plaintext = plaintext.concat("x")

		# remove white spaces / special charactor / replace j with i
		plaintext = plaintext.replace(/\s/g, "").replace(/[^a-z]/g, "").replace(/[j]/g, "i")
		
		# split plaintext 2 letter a group
		splitted = []
		for i in [0..plaintext.length/2-1]
			splitted.push(plaintext.slice(i*2, i*2+2))

		console.log splitted
		console.log key_table
		ciphered_text = ""

		for words in splitted
			first = key_table.indexOf(words[0])
			secon = key_table.indexOf(words[1])

			first_x = first % 5
			first_y = parseInt(first / 5)

			secon_x = secon % 5
			secon_y = parseInt(secon / 5)

			console.log "first_x = #{first_x}, first_y = #{first_y}"
			console.log "secon_x = #{secon_x}, secon_y = #{secon_y}"

			# in the same row
			#  * * * * * 
			#  * a c b d
			#  * * * * * 
			#  * * * * * 
			#  * * * * *
			# a,b -> c,d 

			if first_y == secon_y 
        # last column, ciphered letter is first column
        if first_x == 4 
        	first_ciphered = key_table[first_y * 5]
        else 
        	first_ciphered = key_table[first_y * 5 + first_x + 1]

        if secon_x == 4 
        	secon_ciphered = key_table[secon_y * 5]
        else 
        	secon_ciphered = key_table[secon_y * 5 + secon_x + 1]

			# in the same row
			#  * * * * * 
			#  * * a * *
			#  * * b * * 
			#  * * c * * 
			#  * * * * *
			# a,b -> b,c 
      else if first_x == secon_x
        # ciphered to first row if on the last row
        if first_y == 4  
        	first_ciphered = key_table[first_x]
        else 
        	first_ciphered = key_table[(first_y + 1) * 5 + first_x]

        if secon_y == 4 
        	secon_ciphered = key_table[secon_x]
        else 
        	secon_ciphered = key_table[(secon_y + 1) * 5 + secon_x]

			# general
			#  * * * * * 
			#  * a * c *
			#  * * * * * 
			#  * d * b * 
			#  * * * * *
			# a,b -> b,c 	        
			else
        first_ciphered = key_table[first_y * 5 + secon_x]
        secon_ciphered = key_table[secon_y * 5 + first_x]

			ciphered_text += first_ciphered + secon_ciphered
			console.log ciphered_text

		return ciphered_text

# ---------------------------------------------------------- #
#   Vernam Cipher                                            #
# ---------------------------------------------------------- #