
@cipher = (form) -> 
	ct = document.getElementById('ciphered_text')
	ct.innerHTML = "#{form.firstChild.firstChild.value}"