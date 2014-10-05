# 65~90 A - Z
# 97~122 a - z


@cipher = -> 
	$('#form').submit (event) ->
		event.preventDefault()
		plaintext = $("input[name ='plaintext']").val()
		ciphered_text = caesar(plaintext, 5)

		ct = $("#ciphered_text").get(0)
		ct.innerHTML = "#{ciphered_text}"
	# ct.innerHTML = "#{form.firstChild.firstChild.value}"

	caesar = (plaintext = "hello world", shift = 5) ->
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

		