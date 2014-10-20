@des = ->

	$('#des-form').submit (event) ->
		event.preventDefault()

		plaintext = $("#des-form input[name ='plaintext']").val()
		key = $("#des-form input[name ='key']").val()


		# parse 8 ASCII charactor into 64 bits
		plaintext_bits = []

		for i in [0..plaintext.length-1]
			eachCharString = parseInt(plaintext[i].charCodeAt(0).toString(2)).padLeft(8).toString()
			for eachBit in eachCharString
				plaintext_bits.push(parseInt(eachBit))

		# console.log plaintext_bits


		# Initial Permutation
		# plaintext_bits = initialPunctuation(plaintext_bits)
		plaintext_bits = permutate(plaintext_bits, IP)

		# Prepare L/R for the first round
		leftBits  = plaintext_bits.substr(0, 32)
		rightBits = plaintext_bits.substr(32, 32)

		key = permutate(key, PC1)

		# FOR 16 ROUNDS
		for i in [1..16]
			key = key.rotate(SHIFT[i])
			leftBits = rightBits
			rightBits = xor(fFunction(rightBits, permutate(key, PC2)),
											leftBits )

		ciphered = permutate(leftBits+rightBits, FP)
		# console.log ciphered

	permutate = (bits, pTable) ->
		permutated = ""
		for i in [0..pTable.length-1]
			permutated += (bits[ pTable[i]-1 ]).toString()

		return permutated

	# initialPermutation = (bits)->
	# 	permutated = ""
	# 	for i in [0..63]		
	# 		permutated += (bits[IP[i]-1]).toString()

	# 	return permutated


	# expansionE = (bits) ->
	# 	expanded = ""
	# 	for i in [0..EP.length-1]
	# 		expanded += bits[EP[i]-1]
	# 	return expanded

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

		# console.log expansionE(rightBits)
		# console.log permutate(rightBits, EP)
		rightBits = permutate(rightBits, EP)
		rightBits = xor(rightBits, key)
		
		# do SBOX
		tmp = rightBits
		rightBits = ""
		for i in [0..7]
			# console.log "#{i}th BOX"
			# console.log tmp.substr(6*i, 6)
			rightBits += sbox(tmp.substr(6*i, 6), SBOX[i])

		# Permutation again
		rightBits = permutate(rightBits, RP)

		return rightBits
