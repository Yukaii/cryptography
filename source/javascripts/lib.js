// http://stackoverflow.com/questions/5366849/convert-1-to-0001-in-javascript
Number.prototype.padLeft = function (n,str){
    return Array(n-String(this).length+1).join(str||'0')+this;
}


String.prototype.rotate = function (n) {
	n = parseInt(n);
	n %= this.length
	// rotate left
	if (n > 0)
		return this.slice(n) + this.slice(0, n);
	// rotate right
	else if (n < 0) {
		n *= -1;
		return this.substr(this.length-n) + this.slice(0, this.length-n);
	}
	else return this.toString()
}

Array.prototype.inverse = function (){
	inversed = new Array(this.max());
	for (i = 0; i < inversed.length; i ++) {
		inversed[i] = this.indexOf(i+1) + 1;
	}
	return inversed;
};

// http://stackoverflow.com/questions/1669190/javascript-min-max-array-values
Array.prototype.max = function() {
  return Math.max.apply(null, this);
};

Array.prototype.min = function() {
  return Math.min.apply(null, this);
};

