!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t=t||self).jvUtilMath={})}(this,function(t){var e=function(t,e){var r=0,n=t.toString(),a=e.toString();try{r+=n.split(".")[1].length}catch(t){}try{r+=a.split(".")[1].length}catch(t){}return Number(n.replace(".",""))*Number(a.replace(".",""))/Math.pow(10,r)};t.add=function(t,e){var r,n,a,i,o=t.toString(),c=e.toString();try{r=o.split(".")[1].length}catch(t){r=0}try{n=c.split(".")[1].length}catch(t){n=0}if(i=Math.abs(r-n),a=Math.pow(10,Math.max(r,n)),i>0){var l=Math.pow(10,i);r>n?(t=Number(o.replace(".","")),e=Number(c.replace(".",""))*l):(t=Number(o.replace(".",""))*l,e=Number(c.replace(".","")))}else t=Number(o.replace(".","")),e=Number(c.replace(".",""));return(t+e)/a},t.div=function(t,e,r){void 0===r&&(r=2);var n,a,i,o=0,c=0;try{o=t.toString().split(".")[1].length}catch(t){}try{c=e.toString().split(".")[1].length}catch(t){}if(i=Math.max(o,c,r),n=Number(t.toString().replace(".","")),0===(a=Number(e.toString().replace(".",""))))throw RangeError("no one can be dived by zero");return+(n/a*Math.pow(10,c-o)).toFixed(i)},t.modulo=function(t,r){var n=(String(t).split(".")[1]||"").length||0,a=(String(r).split(".")[1]||"").length||0,i=Math.max(n,a);return e(t,Math.pow(10,i))%e(r,Math.pow(10,i))},t.mul=e,t.reduce=function(t,e){var r,n,a,i;t=t.toString(),e=e.toString();try{r=t.split(".")[1].length}catch(t){r=0}try{n=e.split(".")[1].length}catch(t){n=0}return i=Math.max(r,n),+((+t*(a=Math.pow(10,i))-+e*a)/a).toFixed(i)}});
//# sourceMappingURL=index.umd.js.map