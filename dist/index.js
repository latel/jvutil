var t=function(t,r){var e=0,a=t.toString(),n=r.toString();try{e+=a.split(".")[1].length}catch(t){}try{e+=n.split(".")[1].length}catch(t){}return Number(a.replace(".",""))*Number(n.replace(".",""))/Math.pow(10,e)};exports.math={__proto__:null,add:function(t,r){var e,a,n,l,o=t.toString(),i=r.toString();try{e=o.split(".")[1].length}catch(t){e=0}try{a=i.split(".")[1].length}catch(t){a=0}if(l=Math.abs(e-a),n=Math.pow(10,Math.max(e,a)),l>0){var c=Math.pow(10,l);e>a?(t=Number(o.replace(".","")),r=Number(i.replace(".",""))*c):(t=Number(o.replace(".",""))*c,r=Number(i.replace(".","")))}else t=Number(o.replace(".","")),r=Number(i.replace(".",""));return(t+r)/n},reduce:function(t,r){var e,a,n,l;t=t.toString(),r=r.toString();try{e=t.split(".")[1].length}catch(t){e=0}try{a=r.split(".")[1].length}catch(t){a=0}return l=Math.max(e,a),+((+t*(n=Math.pow(10,l))-+r*n)/n).toFixed(l)},mul:t,div:function(t,r,e){void 0===e&&(e=2);var a,n,l,o=0,i=0;try{o=t.toString().split(".")[1].length}catch(t){}try{i=r.toString().split(".")[1].length}catch(t){}if(l=Math.max(o,i,e),a=Number(t.toString().replace(".","")),0===(n=Number(r.toString().replace(".",""))))throw RangeError("no one can be dived by zero");return+(a/n*Math.pow(10,i-o)).toFixed(l)},modulo:function(r,e){var a=(String(r).split(".")[1]||"").length||0,n=(String(e).split(".")[1]||"").length||0,l=Math.max(a,n);return t(r,Math.pow(10,l))%t(e,Math.pow(10,l))}};
//# sourceMappingURL=index.js.map
