// http://stackoverflow.com/questions/5366849/convert-1-to-0001-in-javascript
Number.prototype.padLeft = function (n,str){
    return Array(n-String(this).length+1).join(str||'0')+this;
}

Number.prototype.toBinary = function () {
	return parseInt(this.toString(2)).padLeft(8).toString()
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

function xor(a, b) {
  var i, xorrrr, _i, _ref;
  xorrrr = "";
  for (i = _i = 0, _ref = a.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
    xorrrr += a[i] ^ b[i];
  }
  return xorrrr;
};

/*big.js v3.0.0 https://github.com/MikeMcl/big.js/LICENCE*/(function(n){"use strict";function c(){function n(t){var i=this;if(!(i instanceof n))return t===void 0?c():new n(t);t instanceof n?(i.s=t.s,i.e=t.e,i.c=t.c.slice()):y(i,t);i.constructor=n}return n.prototype=t,n.DP=l,n.RM=a,n}function s(n,t,i){var e=n.constructor,r=t-(n=new e(n)).e,f=n.c;for(f.length>++t&&o(n,r,e.RM),f[0]?i?r=t:(f=n.c,r=n.e+r+1):++r;f.length<r;f.push(0));return r=n.e,i===1||i&&(t<=r||r<=u)?(n.s<0&&f[0]?"-":"")+(f.length>1?f[0]+"."+f.join("").slice(1):f[0])+(r<0?"e":"e+")+r:n.toString()}function y(n,t){var u,r,f;for(t===0&&1/t<0?t="-0":v.test(t+="")||i(NaN),n.s=t.charAt(0)=="-"?(t=t.slice(1),-1):1,(u=t.indexOf("."))>-1&&(t=t.replace(".","")),(r=t.search(/e/i))>0?(u<0&&(u=r),u+=+t.slice(r+1),t=t.substring(0,r)):u<0&&(u=t.length),r=0;t.charAt(r)=="0";r++);if(r==(f=t.length))n.c=[n.e=0];else{for(;t.charAt(--f)=="0";);for(n.e=u-r-1,n.c=[],u=0;r<=f;n.c[u++]=+t.charAt(r++));}return n}function o(n,t,r,u){var o,e=n.c,f=n.e+t+1;if(r===1?u=e[f]>=5:r===2?u=e[f]>5||e[f]==5&&(u||f<0||e[f+1]!==o||e[f-1]&1):r===3?u=u||e[f]!==o||f<0:(u=!1,r!==0&&i("!Big.RM!")),f<1||!e[0])u?(n.e=-t,n.c=[1]):n.c=[n.e=0];else{if(e.length=f--,u)for(;++e[f]>9;)e[f]=0,f--||(++n.e,e.unshift(1));for(f=e.length;!e[--f];e.pop());}return n}function i(n){var t=new Error(n);t.name="BigError";throw t;}var l=20,a=1,r=1e6,h=1e6,u=-7,f=21,t={},v=/^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,e;t.abs=function(){var n=new this.constructor(this);return n.s=1,n};t.cmp=function(n){var e,o=this,u=o.c,f=(n=new o.constructor(n)).c,t=o.s,s=n.s,i=o.e,r=n.e;if(!u[0]||!f[0])return u[0]?t:f[0]?-s:0;if(t!=s)return t;if(e=t<0,i!=r)return i>r^e?1:-1;for(t=-1,s=(i=u.length)<(r=f.length)?i:r;++t<s;)if(u[t]!=f[t])return u[t]>f[t]^e?1:-1;return i==r?0:i>r^e?1:-1};t.div=function(n){var p=this,w=p.constructor,h=p.c,e=(n=new w(n)).c,v=p.s==n.s?1:-1,c=w.DP;if((c!==~~c||c<0||c>r)&&i("!Big.DP!"),!h[0]||!e[0])return h[0]==e[0]&&i(NaN),e[0]||i(v/0),new w(v*0);var s,b,y,l,f,tt,it=e.slice(),k=s=e.length,rt=h.length,t=h.slice(0,s),u=t.length,a=n,d=a.c=[],g=0,nt=c+(a.e=p.e-n.e)+1;for(a.s=v,v=nt<0?0:nt,it.unshift(0);u++<s;t.push(0));do{for(y=0;y<10;y++){if(s!=(u=t.length))l=s>u?1:-1;else for(f=-1,l=0;++f<s;)if(e[f]!=t[f]){l=e[f]>t[f]?1:-1;break}if(l<0){for(b=u==s?e:it;u;){if(t[--u]<b[u]){for(f=u;f&&!t[--f];t[f]=9);--t[f];t[u]+=10}t[u]-=b[u]}for(;!t[0];t.shift());}else break}d[g++]=l?y:++y;t[0]&&l?t[u]=h[k]||0:t=[h[k]]}while((k++<rt||t[0]!==tt)&&v--);return d[0]||g==1||(d.shift(),a.e--),g>nt&&o(a,c,w.RM,t[0]!==tt),a};t.eq=function(n){return!this.cmp(n)};t.gt=function(n){return this.cmp(n)>0};t.gte=function(n){return this.cmp(n)>-1};t.lt=function(n){return this.cmp(n)<0};t.lte=function(n){return this.cmp(n)<1};t.minus=function(n){var f,u,o,c,s=this,l=s.constructor,e=s.s,i=(n=new l(n)).s;if(e!=i)return n.s=-i,s.plus(n);var t=s.c.slice(),a=s.e,r=n.c,h=n.e;if(!t[0]||!r[0])return r[0]?(n.s=-i,n):new l(t[0]?s:0);if(e=a-h){for((c=e<0)?(e=-e,o=t):(h=a,o=r),o.reverse(),i=e;i--;o.push(0));o.reverse()}else for(u=((c=t.length<r.length)?t:r).length,e=i=0;i<u;i++)if(t[i]!=r[i]){c=t[i]<r[i];break}if(c&&(o=t,t=r,r=o,n.s=-n.s),(i=(u=r.length)-(f=t.length))>0)for(;i--;t[f++]=0);for(i=f;u>e;){if(t[--u]<r[u]){for(f=u;f&&!t[--f];t[f]=9);--t[f];t[u]+=10}t[u]-=r[u]}for(;t[--i]==0;t.pop());for(;t[0]==0;)t.shift(),--h;return t[0]||(n.s=1,t=[h=0]),n.c=t,n.e=h,n};t.mod=function(n){var e,t=this,r=t.constructor,u=t.s,f=(n=new r(n)).s;return(n.c[0]||i(NaN),t.s=n.s=1,e=n.cmp(t)==1,t.s=u,n.s=f,e)?new r(t):(u=r.DP,f=r.RM,r.DP=r.RM=0,t=t.div(n),r.DP=u,r.RM=f,this.minus(t.times(n)))};t.plus=function(n){var u,e=this,s=e.constructor,i=e.s,f=(n=new s(n)).s;if(i!=f)return n.s=-f,e.minus(n);var h=e.e,t=e.c,o=n.e,r=n.c;if(!t[0]||!r[0])return r[0]?n:new s(t[0]?e:i*0);if(t=t.slice(),i=h-o){for(i>0?(o=h,u=r):(i=-i,u=t),u.reverse();i--;u.push(0));u.reverse()}for(t.length-r.length<0&&(u=r,r=t,t=u),i=r.length,f=0;i;)f=(t[--i]=t[i]+r[i]+f)/10|0,t[i]%=10;for(f&&(t.unshift(f),++o),i=t.length;t[--i]==0;t.pop());return n.c=t,n.e=o,n};t.pow=function(n){var t=this,u=new t.constructor(1),r=u,f=n<0;for((n!==~~n||n<-h||n>h)&&i("!pow!"),n=f?-n:n;;){if(n&1&&(r=r.times(t)),n>>=1,!n)break;t=t.times(t)}return f?u.div(r):r};t.round=function(n,t){var u=this,f=u.constructor;return n==null?n=0:(n!==~~n||n<0||n>r)&&i("!round!"),o(u=new f(u),n,t==null?f.RM:t),u};t.sqrt=function(){var f,n,e,r=this,u=r.constructor,h=r.c,t=r.s,s=r.e,c=new u("0.5");if(!h[0])return new u(r);t<0&&i(NaN);t=Math.sqrt(r.toString());t==0||t==1/0?(f=h.join(""),f.length+s&1||(f+="0"),n=new u(Math.sqrt(f).toString()),n.e=((s+1)/2|0)-(s<0||s&1)):n=new u(t.toString());t=n.e+(u.DP+=4);do e=n,n=c.times(e.plus(r.div(e)));while(e.c.slice(0,t).join("")!==n.c.slice(0,t).join(""));return o(n,u.DP-=4,u.RM),n};t.times=function(n){var t,s=this,h=s.constructor,f=s.c,e=(n=new h(n)).c,o=f.length,i=e.length,u=s.e,r=n.e;if(n.s=s.s==n.s?1:-1,!f[0]||!e[0])return new h(n.s*0);for(n.e=u+r,o<i&&(t=f,f=e,e=t,r=o,o=i,i=r),t=new Array(r=o+i);r--;t[r]=0);for(u=i;u--;){for(i=0,r=o+u;r>u;)i=t[r]+e[u]*f[r-u-1]+i,t[r--]=i%10,i=i/10|0;t[r]=(t[r]+i)%10}for(i&&++n.e,t[0]||t.shift(),u=t.length;!t[--u];t.pop());return n.c=t,n};t.toString=t.valueOf=t.toJSON=function(){var r=this,t=r.e,n=r.c.join(""),i=n.length;if(t<=u||t>=f)n=n.charAt(0)+(i>1?"."+n.slice(1):"")+(t<0?"e":"e+")+t;else if(t<0){for(;++t;n="0"+n);n="0."+n}else if(t>0)if(++t>i)for(t-=i;t--;n+="0");else t<i&&(n=n.slice(0,t)+"."+n.slice(t));else i>1&&(n=n.charAt(0)+"."+n.slice(1));return r.s<0&&r.c[0]?"-"+n:n};t.toExponential=function(n){return n==null?n=this.c.length-1:(n!==~~n||n<0||n>r)&&i("!toExp!"),s(this,n,1)};t.toFixed=function(n){var t,e=this,o=u,h=f;return u=-(f=1/0),n==null?t=e.toString():n===~~n&&n>=0&&n<=r&&(t=s(e,e.e+n),e.s<0&&e.c[0]&&t.indexOf("-")<0&&(t="-"+t)),u=o,f=h,t||i("!toFix!"),t};t.toPrecision=function(n){return n==null?this.toString():((n!==~~n||n<1||n>r)&&i("!toPre!"),s(this,n-1,2))};e=c();typeof define=="function"&&define.amd?define(function(){return e}):typeof module!="undefined"&&module.exports?module.exports=e:n.Big=e})(this)
"use strict";var bigInt=function(){function e(e,t){this.value=e,this.sign=t}function t(e){var t=e.length-1;while(e[t]===0&&t>0)t--;return e.slice(0,t+1)}function n(t,n){var i=n<0;if(t.sign!==i)return i?r(t.abs(),-n):r(t.abs(),n).negate();i&&(n=-n);var s=t.value,o=[],u=0;for(var a=0;a<s.length||u>0;a++){var f=(s[a]||0)+(a>0?0:n)+u;u=f>=m?1:0,o.push(f%m)}return new e(o,t.sign)}function r(t,r){if(t.sign!==r<0)return n(t,-r);var i=!1;t.sign&&(i=!0);var s=t.value;if(s.length===1&&s[0]<r)return new e([r-s[0]],!i);i&&(r=-r);var o=[],u=0;for(var a=0;a<s.length;a++){var f=s[a]-u-(a>0?0:r);u=f<0?1:0,o.push(u*m+f)}return new e(o,i)}function i(t,n){var r=t.value,i=n<0,s=[],o=0;i&&(n=-n);for(var u=0;u<r.length||o>0;u++){var a=(r[u]||0)*n+o;o=a/m|0,s.push(a%m)}return new e(s,i?!t.sign:t.sign)}function s(n,r){if(r===0)throw new Error("Cannot divide by zero.");var i=n.value,s=r<0,o=[],u=0;s&&(r=-r);for(var a=i.length-1;a>=0;a--){var f=u*m+i[a];u=f%r,o.push(f/r|0)}return{quotient:new e(t(o.reverse()),s?!n.sign:n.sign),remainder:new e([u],n.sign)}}function o(t){return(typeof t=="number"||typeof t=="string")&&+t<=m||t instanceof e&&t.value.length<=1}function u(e,t){return e=p(e).abs(),t=p(t).abs(),e.equals(t)?e:e.equals(x)?t:t.equals(x)?e:e.isEven()?t.isOdd()?u(e.divide(2),t):u(e.divide(2),t.divide(2)).multiply(2):t.isEven()?u(e,t.divide(2)):e.greater(t)?u(e.subtract(t).divide(2),t):u(t.subtract(e).divide(2),e)}function a(e,t){return e=p(e).abs(),t=p(t).abs(),e.multiply(t).divide(u(e,t))}function f(e,t){return e=p(e),t=p(t),e.greater(t)?e:t}function l(e,t){return e=p(e),t=p(t),e.lesser(t)?e:t}function c(t,n){t=p(t),n=p(n);var r=l(t,n),i=f(t,n),s=i.subtract(r),o=s.value.length-1,u=[],a=!0;for(var c=o;c>=0;c--){var h=a?s.value[c]:m,d=Math.floor(Math.random()*h);u.unshift(d),d<h&&(a=!1)}return r.add(new e(u,!1))}function h(e,t,n){var r=x,s=f(e.abs(),t.abs()),o=0,u=T;while(u.lesserOrEquals(s)){var a,l;a=e.over(u).isEven()?0:1,l=t.over(u).isEven()?0:1,r=r.add(u.times(n(a,l))),u=i(u,2)}return r}function p(t){if(t instanceof e)return t;if(Math.abs(+t)<m&&+t===(+t|0)){var n=+t;return new e([Math.abs(n)],n<0||1/n===-Infinity)}t+="";var r=y.positive,n=[];t[0]==="-"&&(r=y.negative,t=t.slice(1));var t=t.split(/e/i);if(t.length>2)throw new Error("Invalid integer: "+t.join("e"));if(t[1]){var i=t[1];i[0]==="+"&&(i=i.slice(1)),i=p(i);if(i.lesser(0))throw new Error("Cannot include negative exponent part for integers");while(i.notEquals(0))t[0]+="0",i=i.prev()}t=t[0],t==="-0"&&(t="0");var s=/^([0-9][0-9]*)$/.test(t);if(!s)throw new Error("Invalid integer: "+t);while(t.length){var o=t.length>g?t.length-g:0;n.push(+t.slice(o)),t=t.slice(0,o)}return new e(n,r)}function d(e){var t=e.value;return t.length===1&&t[0]<=36?"0123456789abcdefghijklmnopqrstuvwxyz".charAt(t[0]):"<"+t+">"}function v(e,t){t=bigInt(t);if(t.equals(0)){if(e.equals(0))return"0";throw new Error("Cannot convert nonzero numbers to base 0.")}if(t.equals(-1))return e.equals(0)?"0":e.lesser(0)?Array(1-e).join("10"):"1"+Array(+e).join("01");var n="";e.isNegative()&&t.isPositive()&&(n="-",e=e.abs());if(t.equals(1))return e.equals(0)?"0":n+Array(+e+1).join(1);var r=[],i=e,s;while(i.lesser(0)||i.compareAbs(t)>=0){s=i.divmod(t),i=s.quotient;var o=s.remainder;o.lesser(0)&&(o=t.minus(o).abs(),i=i.next()),r.push(d(o))}return r.push(d(i)),n+r.reverse().join("")}var m=1e7,g=7,y={positive:!1,negative:!0};e.prototype.negate=function(){return new e(this.value,!this.sign)},e.prototype.abs=function(){return new e(this.value,y.positive)},e.prototype.add=function(r){if(o(r))return n(this,+r);r=p(r);if(this.sign!==r.sign)return this.sign===y.positive?this.abs().subtract(r.abs()):r.abs().subtract(this.abs());var i=this.value,s=r.value,u=[],a=0,f=Math.max(i.length,s.length);for(var l=0;l<f||a>0;l++){var c=(i[l]||0)+(s[l]||0)+a;a=c>=m?1:0,u.push(c%m)}return new e(t(u),this.sign)},e.prototype.plus=function(e){return this.add(e)},e.prototype.subtract=function(n){if(o(n))return r(this,+n);n=p(n);if(this.sign!==n.sign)return this.add(n.negate());if(this.sign===y.negative)return n.negate().subtract(this.negate());if(this.compare(n)<0)return n.subtract(this).negate();var i=this.value,s=n.value,u=[],a=0,f=Math.max(i.length,s.length);for(var l=0;l<f;l++){var c=i[l]||0,h=s[l]||0,d=c-a;a=d<h?1:0,u.push(a*m+d-h)}return new e(t(u),y.positive)},e.prototype.minus=function(e){return this.subtract(e)},e.prototype.multiply=function(n){if(o(n))return i(this,+n);n=p(n);var r=this.sign!==n.sign,s=this.value,u=n.value,a=Math.max(s.length,u.length),f=[];for(var l=0;l<a;l++){f[l]=[];var c=l;while(c--)f[l].push(0)}var h=0;for(var l=0;l<s.length;l++){var d=s[l];for(var c=0;c<u.length||h>0;c++){var v=u[c],g=v?d*v+h:h;h=Math.floor(g/m),f[l].push(g%m)}}var y=-1;for(var l=0;l<f.length;l++){var b=f[l].length;b>y&&(y=b)}var w=[],h=0;for(var l=0;l<y||h>0;l++){var E=h;for(var c=0;c<f.length;c++)E+=f[c][l]||0;h=E>m?Math.floor(E/m):0,E-=h*m,w.push(E)}return new e(t(w),r)},e.prototype.times=function(e){return this.multiply(e)},e.prototype.divmod=function(n){if(o(n))return s(this,+n);n=p(n);var r=this.sign!==n.sign;if(this.equals(0))return{quotient:new e([0],y.positive),remainder:new e([0],y.positive)};if(n.equals(0))throw new Error("Cannot divide by zero");var i=this.value,u=n.value,a=[],f=[];for(var l=i.length-1;l>=0;l--){var c=[i[l]].concat(f),h=S(u,c);a.push(h.result),f=h.remainder}return a.reverse(),{quotient:new e(t(a),r),remainder:new e(t(f),this.sign)}},e.prototype.divide=function(e){return this.divmod(e).quotient},e.prototype.over=function(e){return this.divide(e)},e.prototype.mod=function(e){return this.divmod(e).remainder},e.prototype.remainder=function(e){return this.mod(e)},e.prototype.pow=function(e){e=p(e);var t=this,n=e,r=T;if(n.equals(x))return r;if(t.equals(x)||n.lesser(x))return x;for(;;){n.isOdd()&&(r=r.times(t)),n=n.divide(2);if(n.equals(x))break;t=t.times(t)}return r},e.prototype.modPow=function(e,t){e=p(e),t=p(t);if(t.equals(x))throw new Error("Cannot take modPow with modulus 0");var n=T,r=this.mod(t);if(r.equals(x))return x;while(e.greater(0))e.isOdd()&&(n=n.multiply(r).mod(t)),e=e.divide(2),r=r.square().mod(t);return n},e.prototype.square=function(){return this.multiply(this)},e.prototype.next=function(){return n(this,1)},e.prototype.prev=function(){return r(this,1)},e.prototype.compare=function(e){var t=this,n=p(e);if(t.value.length===1&&n.value.length===1&&t.value[0]===0&&n.value[0]===0)return 0;if(n.sign!==t.sign)return t.sign===y.positive?1:-1;var r=t.sign===y.positive?1:-1,i=t.value,s=n.value,o=Math.max(i.length,s.length)-1;for(var u=o;u>=0;u--){var a=i[u]||0,f=s[u]||0;if(a>f)return 1*r;if(f>a)return-1*r}return 0},e.prototype.compareTo=function(e){return this.compare(e)},e.prototype.compareAbs=function(e){return this.abs().compare(e.abs())},e.prototype.equals=function(e){return this.compare(e)===0},e.prototype.notEquals=function(e){return!this.equals(e)},e.prototype.lesser=function(e){return this.compare(e)<0},e.prototype.greater=function(e){return this.compare(e)>0},e.prototype.greaterOrEquals=function(e){return this.compare(e)>=0},e.prototype.lesserOrEquals=function(e){return this.compare(e)<=0},e.prototype.lt=e.prototype.lesser,e.prototype.leq=e.prototype.lesserOrEquals,e.prototype.gt=e.prototype.greater,e.prototype.geq=e.prototype.greaterOrEquals,e.prototype.eq=e.prototype.equals,e.prototype.neq=e.prototype.notEquals,e.prototype.isPositive=function(){return this.sign===y.positive},e.prototype.isNegative=function(){return this.sign===y.negative},e.prototype.isEven=function(){return this.value[0]%2===0},e.prototype.isOdd=function(){return this.value[0]%2===1},e.prototype.isUnit=function(){return this.value.length===1&&this.value[0]===1},e.prototype.isDivisibleBy=function(e){return this.mod(e).equals(x)},e.prototype.isPrime=function(){var e=this.abs(),t=e.prev();if(e.isUnit())return!1;if(e.equals(2)||e.equals(3)||e.equals(5))return!0;if(e.isEven()||e.isDivisibleBy(3)||e.isDivisibleBy(5))return!1;if(e.lesser(25))return!0;var n=[2,3,5,7,11,13,17,19],r=t,i,s,o,u;while(r.isEven())r=r.divide(2);for(o=0;o<n.length;o++){u=bigInt(n[o]).modPow(r,e);if(u.equals(T)||u.equals(t))continue;for(s=!0,i=r;s&&i.lesser(t);i=i.multiply(2))u=u.square().mod(e),u.equals(t)&&(s=!1);if(s)return!1}return!0};var b=[1];while(b[b.length-1]<=m)b.push(2*b[b.length-1]);var w=b.length,E=b[w-1];e.prototype.shiftLeft=function(e){if(!o(e))return e.isNegative()?this.shiftRight(e.abs()):this.times(bigInt(2).pow(e));e=+e;if(e<0)return this.shiftRight(-e);var t=this;while(e>=w)t=i(t,E),e-=w-1;return i(t,b[e])},e.prototype.shiftRight=function(e){if(!o(e))return e.isNegative()?this.shiftLeft(e.abs()):this.over(bigInt(2).pow(e));e=+e;if(e<0)return this.shiftLeft(-e);var t=this;while(e>=w){if(t.equals(x))return t;t=s(t,E).quotient,e-=w-1}return s(t,b[e]).quotient},e.prototype.not=function(){var e=h(this,this,function(e){return(e+1)%2});return this.sign?e:e.negate()},e.prototype.and=function(e){e=p(e);var t=h(this,e,function(e,t){return e*t});return this.sign&&e.sign?t.negate():t},e.prototype.or=function(e){e=p(e);var t=h(this,e,function(e,t){return(e+t+e*t)%2});return this.sign||e.sign?t.negate():t},e.prototype.xor=function(e){e=p(e);var t=h(this,e,function(e,t){return(e+t)%2});return this.sign^e.sign?t.negate():t},e.prototype.toString=function(e){e===undefined&&(e=10);if(e!==10)return v(this,e);var t=this,n="",r=t.value.length;if(r===0)return"0";while(r--)t.value[r].toString().length===8?n+=t.value[r]:n+=(m.toString()+t.value[r]).slice(-g);while(n[0]==="0")n=n.slice(1);n.length||(n="0");if(n==="0")return n;var i=t.sign===y.positive?"":"-";return i+n},e.prototype.toJSNumber=function(){return this.valueOf()},e.prototype.valueOf=function(){return this.value.length===1?this.sign?-this.value[0]:this.value[0]:+this.toString()};var S=function(t,n){var t=new e(t,y.positive),n=new e(n,y.positive);if(t.equals(0))throw new Error("Cannot divide by 0");var r=0;do{var i=1,s=t,o=s.times(10);while(o.lesser(n))s=o,i*=10,o=o.times(10);while(s.lesserOrEquals(n))n=n.minus(s),r+=i}while(t.lesserOrEquals(n));return{remainder:n.value,result:r}},x=new e([0],y.positive),T=new e([1],y.positive),N=new e([1],y.negative),C=function(e,t){function n(e){var t=e[s].toLowerCase();if(s===0&&e[s]==="-"){o=!0;return}if(/[0-9]/.test(t))i.push(p(t));else if(/[a-z]/.test(t))i.push(p(t.charCodeAt(0)-87));else{if(t!=="<")throw new Error(t+" is not a valid character");var n=s;do s++;while(e[s]!==">");i.push(p(e.slice(n+1,s)))}}t=p(t);var r=x,i=[],s,o=!1;for(s=0;s<e.length;s++)n(e);i.reverse();for(s=0;s<i.length;s++)r=r.add(i[s].times(t.pow(s)));return o?r.negate():r},k=function(e,t){return typeof e=="undefined"?x:typeof t!="undefined"?C(e,t):p(e)};return k.zero=x,k.one=T,k.minusOne=N,k.randBetween=c,k.min=l,k.max=f,k.gcd=u,k.lcm=a,k}();typeof module!="undefined"&&(module.exports=bigInt)
function BigInteger(e,t,n){if(e!=null)if("number"==typeof e)this.fromNumber(e,t,n);else if(t==null&&"string"!=typeof e)this.fromString(e,256);else this.fromString(e,t)}function nbi(){return new BigInteger(null)}function am1(e,t,n,r,i,s){while(--s>=0){var o=t*this[e++]+n[r]+i;i=Math.floor(o/67108864);n[r++]=o&67108863}return i}function am2(e,t,n,r,i,s){var o=t&32767,u=t>>15;while(--s>=0){var a=this[e]&32767;var f=this[e++]>>15;var l=u*a+f*o;a=o*a+((l&32767)<<15)+n[r]+(i&1073741823);i=(a>>>30)+(l>>>15)+u*f+(i>>>30);n[r++]=a&1073741823}return i}function am3(e,t,n,r,i,s){var o=t&16383,u=t>>14;while(--s>=0){var a=this[e]&16383;var f=this[e++]>>14;var l=u*a+f*o;a=o*a+((l&16383)<<14)+n[r]+i;i=(a>>28)+(l>>14)+u*f;n[r++]=a&268435455}return i}function int2char(e){return BI_RM.charAt(e)}function intAt(e,t){var n=BI_RC[e.charCodeAt(t)];return n==null?-1:n}function bnpCopyTo(e){for(var t=this.t-1;t>=0;--t)e[t]=this[t];e.t=this.t;e.s=this.s}function bnpFromInt(e){this.t=1;this.s=e<0?-1:0;if(e>0)this[0]=e;else if(e<-1)this[0]=e+this.DV;else this.t=0}function nbv(e){var t=nbi();t.fromInt(e);return t}function bnpFromString(e,t){var n;if(t==16)n=4;else if(t==8)n=3;else if(t==256)n=8;else if(t==2)n=1;else if(t==32)n=5;else if(t==4)n=2;else{this.fromRadix(e,t);return}this.t=0;this.s=0;var r=e.length,i=false,s=0;while(--r>=0){var o=n==8?e[r]&255:intAt(e,r);if(o<0){if(e.charAt(r)=="-")i=true;continue}i=false;if(s==0)this[this.t++]=o;else if(s+n>this.DB){this[this.t-1]|=(o&(1<<this.DB-s)-1)<<s;this[this.t++]=o>>this.DB-s}else this[this.t-1]|=o<<s;s+=n;if(s>=this.DB)s-=this.DB}if(n==8&&(e[0]&128)!=0){this.s=-1;if(s>0)this[this.t-1]|=(1<<this.DB-s)-1<<s}this.clamp();if(i)BigInteger.ZERO.subTo(this,this)}function bnpClamp(){var e=this.s&this.DM;while(this.t>0&&this[this.t-1]==e)--this.t}function bnToString(e){if(this.s<0)return"-"+this.negate().toString(e);var t;if(e==16)t=4;else if(e==8)t=3;else if(e==2)t=1;else if(e==32)t=5;else if(e==4)t=2;else return this.toRadix(e);var n=(1<<t)-1,r,i=false,s="",o=this.t;var u=this.DB-o*this.DB%t;if(o-->0){if(u<this.DB&&(r=this[o]>>u)>0){i=true;s=int2char(r)}while(o>=0){if(u<t){r=(this[o]&(1<<u)-1)<<t-u;r|=this[--o]>>(u+=this.DB-t)}else{r=this[o]>>(u-=t)&n;if(u<=0){u+=this.DB;--o}}if(r>0)i=true;if(i)s+=int2char(r)}}return i?s:"0"}function bnNegate(){var e=nbi();BigInteger.ZERO.subTo(this,e);return e}function bnAbs(){return this.s<0?this.negate():this}function bnCompareTo(e){var t=this.s-e.s;if(t!=0)return t;var n=this.t;t=n-e.t;if(t!=0)return this.s<0?-t:t;while(--n>=0)if((t=this[n]-e[n])!=0)return t;return 0}function nbits(e){var t=1,n;if((n=e>>>16)!=0){e=n;t+=16}if((n=e>>8)!=0){e=n;t+=8}if((n=e>>4)!=0){e=n;t+=4}if((n=e>>2)!=0){e=n;t+=2}if((n=e>>1)!=0){e=n;t+=1}return t}function bnBitLength(){if(this.t<=0)return 0;return this.DB*(this.t-1)+nbits(this[this.t-1]^this.s&this.DM)}function bnpDLShiftTo(e,t){var n;for(n=this.t-1;n>=0;--n)t[n+e]=this[n];for(n=e-1;n>=0;--n)t[n]=0;t.t=this.t+e;t.s=this.s}function bnpDRShiftTo(e,t){for(var n=e;n<this.t;++n)t[n-e]=this[n];t.t=Math.max(this.t-e,0);t.s=this.s}function bnpLShiftTo(e,t){var n=e%this.DB;var r=this.DB-n;var i=(1<<r)-1;var s=Math.floor(e/this.DB),o=this.s<<n&this.DM,u;for(u=this.t-1;u>=0;--u){t[u+s+1]=this[u]>>r|o;o=(this[u]&i)<<n}for(u=s-1;u>=0;--u)t[u]=0;t[s]=o;t.t=this.t+s+1;t.s=this.s;t.clamp()}function bnpRShiftTo(e,t){t.s=this.s;var n=Math.floor(e/this.DB);if(n>=this.t){t.t=0;return}var r=e%this.DB;var i=this.DB-r;var s=(1<<r)-1;t[0]=this[n]>>r;for(var o=n+1;o<this.t;++o){t[o-n-1]|=(this[o]&s)<<i;t[o-n]=this[o]>>r}if(r>0)t[this.t-n-1]|=(this.s&s)<<i;t.t=this.t-n;t.clamp()}function bnpSubTo(e,t){var n=0,r=0,i=Math.min(e.t,this.t);while(n<i){r+=this[n]-e[n];t[n++]=r&this.DM;r>>=this.DB}if(e.t<this.t){r-=e.s;while(n<this.t){r+=this[n];t[n++]=r&this.DM;r>>=this.DB}r+=this.s}else{r+=this.s;while(n<e.t){r-=e[n];t[n++]=r&this.DM;r>>=this.DB}r-=e.s}t.s=r<0?-1:0;if(r<-1)t[n++]=this.DV+r;else if(r>0)t[n++]=r;t.t=n;t.clamp()}function bnpMultiplyTo(e,t){var n=this.abs(),r=e.abs();var i=n.t;t.t=i+r.t;while(--i>=0)t[i]=0;for(i=0;i<r.t;++i)t[i+n.t]=n.am(0,r[i],t,i,0,n.t);t.s=0;t.clamp();if(this.s!=e.s)BigInteger.ZERO.subTo(t,t)}function bnpSquareTo(e){var t=this.abs();var n=e.t=2*t.t;while(--n>=0)e[n]=0;for(n=0;n<t.t-1;++n){var r=t.am(n,t[n],e,2*n,0,1);if((e[n+t.t]+=t.am(n+1,2*t[n],e,2*n+1,r,t.t-n-1))>=t.DV){e[n+t.t]-=t.DV;e[n+t.t+1]=1}}if(e.t>0)e[e.t-1]+=t.am(n,t[n],e,2*n,0,1);e.s=0;e.clamp()}function bnpDivRemTo(e,t,n){var r=e.abs();if(r.t<=0)return;var i=this.abs();if(i.t<r.t){if(t!=null)t.fromInt(0);if(n!=null)this.copyTo(n);return}if(n==null)n=nbi();var s=nbi(),o=this.s,u=e.s;var a=this.DB-nbits(r[r.t-1]);if(a>0){r.lShiftTo(a,s);i.lShiftTo(a,n)}else{r.copyTo(s);i.copyTo(n)}var f=s.t;var l=s[f-1];if(l==0)return;var c=l*(1<<this.F1)+(f>1?s[f-2]>>this.F2:0);var h=this.FV/c,p=(1<<this.F1)/c,d=1<<this.F2;var v=n.t,m=v-f,g=t==null?nbi():t;s.dlShiftTo(m,g);if(n.compareTo(g)>=0){n[n.t++]=1;n.subTo(g,n)}BigInteger.ONE.dlShiftTo(f,g);g.subTo(s,s);while(s.t<f)s[s.t++]=0;while(--m>=0){var y=n[--v]==l?this.DM:Math.floor(n[v]*h+(n[v-1]+d)*p);if((n[v]+=s.am(0,y,n,m,0,f))<y){s.dlShiftTo(m,g);n.subTo(g,n);while(n[v]<--y)n.subTo(g,n)}}if(t!=null){n.drShiftTo(f,t);if(o!=u)BigInteger.ZERO.subTo(t,t)}n.t=f;n.clamp();if(a>0)n.rShiftTo(a,n);if(o<0)BigInteger.ZERO.subTo(n,n)}function bnMod(e){var t=nbi();this.abs().divRemTo(e,null,t);if(this.s<0&&t.compareTo(BigInteger.ZERO)>0)e.subTo(t,t);return t}function Classic(e){this.m=e}function cConvert(e){if(e.s<0||e.compareTo(this.m)>=0)return e.mod(this.m);else return e}function cRevert(e){return e}function cReduce(e){e.divRemTo(this.m,null,e)}function cMulTo(e,t,n){e.multiplyTo(t,n);this.reduce(n)}function cSqrTo(e,t){e.squareTo(t);this.reduce(t)}function bnpInvDigit(){if(this.t<1)return 0;var e=this[0];if((e&1)==0)return 0;var t=e&3;t=t*(2-(e&15)*t)&15;t=t*(2-(e&255)*t)&255;t=t*(2-((e&65535)*t&65535))&65535;t=t*(2-e*t%this.DV)%this.DV;return t>0?this.DV-t:-t}function Montgomery(e){this.m=e;this.mp=e.invDigit();this.mpl=this.mp&32767;this.mph=this.mp>>15;this.um=(1<<e.DB-15)-1;this.mt2=2*e.t}function montConvert(e){var t=nbi();e.abs().dlShiftTo(this.m.t,t);t.divRemTo(this.m,null,t);if(e.s<0&&t.compareTo(BigInteger.ZERO)>0)this.m.subTo(t,t);return t}function montRevert(e){var t=nbi();e.copyTo(t);this.reduce(t);return t}function montReduce(e){while(e.t<=this.mt2)e[e.t++]=0;for(var t=0;t<this.m.t;++t){var n=e[t]&32767;var r=n*this.mpl+((n*this.mph+(e[t]>>15)*this.mpl&this.um)<<15)&e.DM;n=t+this.m.t;e[n]+=this.m.am(0,r,e,t,0,this.m.t);while(e[n]>=e.DV){e[n]-=e.DV;e[++n]++}}e.clamp();e.drShiftTo(this.m.t,e);if(e.compareTo(this.m)>=0)e.subTo(this.m,e)}function montSqrTo(e,t){e.squareTo(t);this.reduce(t)}function montMulTo(e,t,n){e.multiplyTo(t,n);this.reduce(n)}function bnpIsEven(){return(this.t>0?this[0]&1:this.s)==0}function bnpExp(e,t){if(e>4294967295||e<1)return BigInteger.ONE;var n=nbi(),r=nbi(),i=t.convert(this),s=nbits(e)-1;i.copyTo(n);while(--s>=0){t.sqrTo(n,r);if((e&1<<s)>0)t.mulTo(r,i,n);else{var o=n;n=r;r=o}}return t.revert(n)}function bnModPowInt(e,t){var n;if(e<256||t.isEven())n=new Classic(t);else n=new Montgomery(t);return this.exp(e,n)}var dbits;var canary=0xdeadbeefcafe;var j_lm=(canary&16777215)==15715070;if(j_lm&&navigator.appName=="Microsoft Internet Explorer"){BigInteger.prototype.am=am2;dbits=30}else if(j_lm&&navigator.appName!="Netscape"){BigInteger.prototype.am=am1;dbits=26}else{BigInteger.prototype.am=am3;dbits=28}BigInteger.prototype.DB=dbits;BigInteger.prototype.DM=(1<<dbits)-1;BigInteger.prototype.DV=1<<dbits;var BI_FP=52;BigInteger.prototype.FV=Math.pow(2,BI_FP);BigInteger.prototype.F1=BI_FP-dbits;BigInteger.prototype.F2=2*dbits-BI_FP;var BI_RM="0123456789abcdefghijklmnopqrstuvwxyz";var BI_RC=new Array;var rr,vv;rr="0".charCodeAt(0);for(vv=0;vv<=9;++vv)BI_RC[rr++]=vv;rr="a".charCodeAt(0);for(vv=10;vv<36;++vv)BI_RC[rr++]=vv;rr="A".charCodeAt(0);for(vv=10;vv<36;++vv)BI_RC[rr++]=vv;Classic.prototype.convert=cConvert;Classic.prototype.revert=cRevert;Classic.prototype.reduce=cReduce;Classic.prototype.mulTo=cMulTo;Classic.prototype.sqrTo=cSqrTo;Montgomery.prototype.convert=montConvert;Montgomery.prototype.revert=montRevert;Montgomery.prototype.reduce=montReduce;Montgomery.prototype.mulTo=montMulTo;Montgomery.prototype.sqrTo=montSqrTo;BigInteger.prototype.copyTo=bnpCopyTo;BigInteger.prototype.fromInt=bnpFromInt;BigInteger.prototype.fromString=bnpFromString;BigInteger.prototype.clamp=bnpClamp;BigInteger.prototype.dlShiftTo=bnpDLShiftTo;BigInteger.prototype.drShiftTo=bnpDRShiftTo;BigInteger.prototype.lShiftTo=bnpLShiftTo;BigInteger.prototype.rShiftTo=bnpRShiftTo;BigInteger.prototype.subTo=bnpSubTo;BigInteger.prototype.multiplyTo=bnpMultiplyTo;BigInteger.prototype.squareTo=bnpSquareTo;BigInteger.prototype.divRemTo=bnpDivRemTo;BigInteger.prototype.invDigit=bnpInvDigit;BigInteger.prototype.isEven=bnpIsEven;BigInteger.prototype.exp=bnpExp;BigInteger.prototype.toString=bnToString;BigInteger.prototype.negate=bnNegate;BigInteger.prototype.abs=bnAbs;BigInteger.prototype.compareTo=bnCompareTo;BigInteger.prototype.bitLength=bnBitLength;BigInteger.prototype.mod=bnMod;BigInteger.prototype.modPowInt=bnModPowInt;BigInteger.ZERO=nbv(0);BigInteger.ONE=nbv(1)
;
