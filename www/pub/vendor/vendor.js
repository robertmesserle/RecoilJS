/**
 * CoffeeScript Compiler v1.6.2
 * http://coffeescript.org
 *
 * Copyright 2011, Jeremy Ashkenas
 * Released under the MIT License
 */
(function(root){var CoffeeScript=function(){function require(e){return require[e]}return require["./helpers"]=new function(){var e=this;(function(){var t,n,i,r,s,a;e.starts=function(e,t,n){return t===e.substr(n,t.length)},e.ends=function(e,t,n){var i;return i=t.length,t===e.substr(e.length-i-(n||0),i)},e.repeat=s=function(e,t){var n;for(n="";t>0;)1&t&&(n+=e),t>>>=1,e+=e;return n},e.compact=function(e){var t,n,i,r;for(r=[],n=0,i=e.length;i>n;n++)t=e[n],t&&r.push(t);return r},e.count=function(e,t){var n,i;if(n=i=0,!t.length)return 1/0;for(;i=1+e.indexOf(t,i);)n++;return n},e.merge=function(e,t){return n(n({},e),t)},n=e.extend=function(e,t){var n,i;for(n in t)i=t[n],e[n]=i;return e},e.flatten=i=function(e){var t,n,r,s;for(n=[],r=0,s=e.length;s>r;r++)t=e[r],t instanceof Array?n=n.concat(i(t)):n.push(t);return n},e.del=function(e,t){var n;return n=e[t],delete e[t],n},e.last=r=function(e,t){return e[e.length-(t||0)-1]},e.some=null!=(a=Array.prototype.some)?a:function(e){var t,n,i;for(n=0,i=this.length;i>n;n++)if(t=this[n],e(t))return!0;return!1},e.invertLiterate=function(e){var t,n,i;return i=!0,n=function(){var n,r,s,a;for(s=e.split("\n"),a=[],n=0,r=s.length;r>n;n++)t=s[n],i&&/^([ ]{4}|[ ]{0,3}\t)/.test(t)?a.push(t):(i=/^\s*$/.test(t))?a.push(t):a.push("# "+t);return a}(),n.join("\n")},t=function(e,t){return t?{first_line:e.first_line,first_column:e.first_column,last_line:t.last_line,last_column:t.last_column}:e},e.addLocationDataFn=function(e,n){return function(i){return"object"==typeof i&&i.updateLocationDataIfMissing&&i.updateLocationDataIfMissing(t(e,n)),i}},e.locationDataToString=function(e){var t;return"2"in e&&"first_line"in e[2]?t=e[2]:"first_line"in e&&(t=e),t?""+(t.first_line+1)+":"+(t.first_column+1)+"-"+(""+(t.last_line+1)+":"+(t.last_column+1)):"No location data"},e.baseFileName=function(e,t,n){var i;return null==t&&(t=!1),null==n&&(n="/"),i=e.split(n),e=i[i.length-1],t?(i=e.split("."),i.pop(),"coffee"===i[i.length-1]&&i.length>1&&i.pop(),i.join(".")):e},e.isCoffee=function(e){return/\.((lit)?coffee|coffee\.md)$/.test(e)},e.isLiterate=function(e){return/\.(litcoffee|coffee\.md)$/.test(e)},e.throwSyntaxError=function(e,t){var n,i,r;throw null==(i=t.last_line)&&(t.last_line=t.first_line),null==(r=t.last_column)&&(t.last_column=t.first_column),n=new SyntaxError(e),n.location=t,n},e.prettyErrorMessage=function(e,t,n,i){var r,a,o,c,h,l,u,p,d,f,m;return e.location?(m=e.location,h=m.first_line,c=m.first_column,u=m.last_line,l=m.last_column,r=n.split("\n")[h],f=c,o=h===u?l+1:r.length,p=s(" ",f)+s("^",o-f),i&&(a=function(e){return"[1;31m"+e+"[0m"},r=r.slice(0,f)+a(r.slice(f,o))+r.slice(o),p=a(p)),d=""+t+":"+(h+1)+":"+(c+1)+": error: "+e.message+"\n"+r+"\n"+p):e.stack||""+e}}).call(this)},require["./rewriter"]=new function(){var e=this;(function(){var t,n,i,r,s,a,o,c,h,l,u,p,d,f,m,g,b,k,v,y=[].indexOf||function(e){for(var t=0,n=this.length;n>t;t++)if(t in this&&this[t]===e)return t;return-1},w=[].slice;for(f=function(e,t){var n;return n=[e,t],n.generated=!0,n},e.Rewriter=function(){function e(){}return e.prototype.rewrite=function(e){return this.tokens=e,this.removeLeadingNewlines(),this.removeMidExpressionNewlines(),this.closeOpenCalls(),this.closeOpenIndexes(),this.addImplicitIndentation(),this.tagPostfixConditionals(),this.addImplicitBracesAndParens(),this.addLocationDataToGeneratedTokens(),this.tokens},e.prototype.scanTokens=function(e){var t,n,i;for(i=this.tokens,t=0;n=i[t];)t+=e.call(this,n,t,i);return!0},e.prototype.detectEnd=function(e,t,n){var s,a,o,c,h;for(o=this.tokens,s=0;a=o[e];){if(0===s&&t.call(this,a,e))return n.call(this,a,e);if(!a||0>s)return n.call(this,a,e-1);c=a[0],y.call(r,c)>=0?s+=1:(h=a[0],y.call(i,h)>=0&&(s-=1)),e+=1}return e-1},e.prototype.removeLeadingNewlines=function(){var e,t,n,i,r;for(r=this.tokens,e=n=0,i=r.length;i>n&&(t=r[e][0],"TERMINATOR"===t);e=++n);return e?this.tokens.splice(0,e):void 0},e.prototype.removeMidExpressionNewlines=function(){return this.scanTokens(function(e,t,i){var r;return"TERMINATOR"===e[0]&&(r=this.tag(t+1),y.call(n,r)>=0)?(i.splice(t,1),0):1})},e.prototype.closeOpenCalls=function(){var e,t;return t=function(e,t){var n;return")"===(n=e[0])||"CALL_END"===n||"OUTDENT"===e[0]&&")"===this.tag(t-1)},e=function(e,t){return this.tokens["OUTDENT"===e[0]?t-1:t][0]="CALL_END"},this.scanTokens(function(n,i){return"CALL_START"===n[0]&&this.detectEnd(i+1,t,e),1})},e.prototype.closeOpenIndexes=function(){var e,t;return t=function(e){var t;return"]"===(t=e[0])||"INDEX_END"===t},e=function(e){return e[0]="INDEX_END"},this.scanTokens(function(n,i){return"INDEX_START"===n[0]&&this.detectEnd(i+1,t,e),1})},e.prototype.matchTags=function(){var e,t,n,i,r,s,a;for(t=arguments[0],i=arguments.length>=2?w.call(arguments,1):[],e=0,n=r=0,s=i.length;s>=0?s>r:r>s;n=s>=0?++r:--r){for(;"HERECOMMENT"===this.tag(t+n+e);)e+=2;if(null!=i[n]&&("string"==typeof i[n]&&(i[n]=[i[n]]),a=this.tag(t+n+e),0>y.call(i[n],a)))return!1}return!0},e.prototype.looksObjectish=function(e){return this.matchTags(e,"@",null,":")||this.matchTags(e,null,":")},e.prototype.findTagsBackwards=function(e,t){var n,s,a,o,c,h,l;for(n=[];e>=0&&(n.length||(o=this.tag(e),0>y.call(t,o)&&(c=this.tag(e),0>y.call(r,c)||this.tokens[e].generated)&&(h=this.tag(e),0>y.call(u,h))));)s=this.tag(e),y.call(i,s)>=0&&n.push(this.tag(e)),a=this.tag(e),y.call(r,a)>=0&&n.length&&n.pop(),e-=1;return l=this.tag(e),y.call(t,l)>=0},e.prototype.addImplicitBracesAndParens=function(){var e;return e=[],this.scanTokens(function(t,n,s){var l,p,d,m,g,b,k,v,w,T,C,F,L,N,E,D,x,S,A,R,_,I,$,O,M,j;if(R=t[0],T=(n>0?s[n-1]:[])[0],v=(s.length-1>n?s[n+1]:[])[0],E=function(){return e[e.length-1]},D=n,d=function(e){return n-D+e},m=function(){var e,t;return null!=(e=E())?null!=(t=e[2])?t.ours:void 0:void 0},g=function(){var e;return m()&&"("===(null!=(e=E())?e[0]:void 0)},k=function(){var e;return m()&&"{"===(null!=(e=E())?e[0]:void 0)},b=function(){var e;return m&&"CONTROL"===(null!=(e=E())?e[0]:void 0)},x=function(t){var i;return i=null!=t?t:n,e.push(["(",i,{ours:!0}]),s.splice(i,0,f("CALL_START","(")),null==t?n+=1:void 0},l=function(){return e.pop(),s.splice(n,0,f("CALL_END",")")),n+=1},S=function(t,i){var r;return null==i&&(i=!0),r=null!=t?t:n,e.push(["{",r,{sameLine:!0,startsLine:i,ours:!0}]),s.splice(r,0,f("{",f(new String("{")))),null==t?n+=1:void 0},p=function(t){return t=null!=t?t:n,e.pop(),s.splice(t,0,f("}","}")),n+=1},g()&&("IF"===R||"TRY"===R||"FINALLY"===R||"CATCH"===R||"CLASS"===R||"SWITCH"===R))return e.push(["CONTROL",n,{ours:!0}]),d(1);if("INDENT"===R&&m()){if("=>"!==T&&"->"!==T&&"["!==T&&"("!==T&&","!==T&&"{"!==T&&"TRY"!==T&&"ELSE"!==T&&"="!==T)for(;g();)l();return b()&&e.pop(),e.push([R,n]),d(1)}if(y.call(r,R)>=0)return e.push([R,n]),d(1);if(y.call(i,R)>=0){for(;m();)g()?l():k()?p():e.pop();e.pop()}if((y.call(c,R)>=0&&t.spaced&&!t.stringEnd||"?"===R&&n>0&&!s[n-1].spaced)&&(y.call(a,v)>=0||y.call(h,v)>=0&&!(null!=(_=s[n+1])?_.spaced:void 0)&&!(null!=(I=s[n+1])?I.newLine:void 0)))return"?"===R&&(R=t[0]="FUNC_EXIST"),x(n+1),d(2);if(this.matchTags(n,c,"INDENT",null,":")&&!this.findTagsBackwards(n,["CLASS","EXTENDS","IF","CATCH","SWITCH","LEADING_WHEN","FOR","WHILE","UNTIL"]))return x(n+1),e.push(["INDENT",n+2]),d(3);if(":"===R){for(C="@"===this.tag(n-2)?n-2:n-1;"HERECOMMENT"===this.tag(C-2);)C-=2;return A=0===C||($=this.tag(C-1),y.call(u,$)>=0)||s[C-1].newLine,E()&&(O=E(),N=O[0],L=O[1],("{"===N||"INDENT"===N&&"{"===this.tag(L-1))&&(A||","===this.tag(C-1)||"{"===this.tag(C-1)))?d(1):(S(C,!!A),d(2))}if("OUTDENT"===T&&g()&&("."===R||"?."===R||"::"===R||"?::"===R))return l(),d(1);if(k()&&y.call(u,R)>=0&&(E()[2].sameLine=!1),y.call(o,R)>=0)for(;m();)if(M=E(),N=M[0],L=M[1],j=M[2],F=j.sameLine,A=j.startsLine,g()&&","!==T)l();else if(k()&&F&&!A)p();else{if(!k()||"TERMINATOR"!==R||","===T||A&&this.looksObjectish(n+1))break;p()}if(","===R&&!this.looksObjectish(n+1)&&k()&&("TERMINATOR"!==v||!this.looksObjectish(n+2)))for(w="OUTDENT"===v?1:0;k();)p(n+w);return d(1)})},e.prototype.addLocationDataToGeneratedTokens=function(){return this.scanTokens(function(e,t,n){var i,r,s,a,o,c;return e[2]?1:e.generated||e.explicit?("{"===e[0]&&(s=null!=(o=n[t+1])?o[2]:void 0)?(r=s.first_line,i=s.first_column):(a=null!=(c=n[t-1])?c[2]:void 0)?(r=a.last_line,i=a.last_column):r=i=0,e[2]={first_line:r,first_column:i,last_line:r,last_column:i},1):1})},e.prototype.addImplicitIndentation=function(){var e,t,n,i,r;return r=n=i=null,t=function(e){var t;return";"!==e[1]&&(t=e[0],y.call(p,t)>=0)&&!("ELSE"===e[0]&&"IF"!==r&&"THEN"!==r)},e=function(e,t){return this.tokens.splice(","===this.tag(t-1)?t-1:t,0,i)},this.scanTokens(function(s,a,o){var c,h,l;return c=s[0],"TERMINATOR"===c&&"THEN"===this.tag(a+1)?(o.splice(a,1),0):"ELSE"===c&&"OUTDENT"!==this.tag(a-1)?(o.splice.apply(o,[a,0].concat(w.call(this.indentation()))),2):"CATCH"!==c||"OUTDENT"!==(h=this.tag(a+2))&&"TERMINATOR"!==h&&"FINALLY"!==h?y.call(d,c)>=0&&"INDENT"!==this.tag(a+1)&&("ELSE"!==c||"IF"!==this.tag(a+1))?(r=c,l=this.indentation(!0),n=l[0],i=l[1],"THEN"===r&&(n.fromThen=!0),o.splice(a+1,0,n),this.detectEnd(a+2,t,e),"THEN"===c&&o.splice(a,1),1):1:(o.splice.apply(o,[a+2,0].concat(w.call(this.indentation()))),4)})},e.prototype.tagPostfixConditionals=function(){var e,t,n;return n=null,t=function(e,t){var n,i;return i=e[0],n=this.tokens[t-1][0],"TERMINATOR"===i||"INDENT"===i&&0>y.call(d,n)},e=function(e){return"INDENT"!==e[0]||e.generated&&!e.fromThen?n[0]="POST_"+n[0]:void 0},this.scanTokens(function(i,r){return"IF"!==i[0]?1:(n=i,this.detectEnd(r+1,t,e),1)})},e.prototype.indentation=function(e){var t,n;return null==e&&(e=!1),t=["INDENT",2],n=["OUTDENT",2],e&&(t.generated=n.generated=!0),e||(t.explicit=n.explicit=!0),[t,n]},e.prototype.generate=f,e.prototype.tag=function(e){var t;return null!=(t=this.tokens[e])?t[0]:void 0},e}(),t=[["(",")"],["[","]"],["{","}"],["INDENT","OUTDENT"],["CALL_START","CALL_END"],["PARAM_START","PARAM_END"],["INDEX_START","INDEX_END"]],e.INVERSES=l={},r=[],i=[],b=0,k=t.length;k>b;b++)v=t[b],m=v[0],g=v[1],r.push(l[g]=m),i.push(l[m]=g);n=["CATCH","WHEN","ELSE","FINALLY"].concat(i),c=["IDENTIFIER","SUPER",")","CALL_END","]","INDEX_END","@","THIS"],a=["IDENTIFIER","NUMBER","STRING","JS","REGEX","NEW","PARAM_START","CLASS","IF","TRY","SWITCH","THIS","BOOL","NULL","UNDEFINED","UNARY","SUPER","THROW","@","->","=>","[","(","{","--","++"],h=["+","-"],s=["->","=>","{","[",","],o=["POST_IF","FOR","WHILE","UNTIL","WHEN","BY","LOOP","TERMINATOR"],d=["ELSE","->","=>","TRY","FINALLY","THEN"],p=["TERMINATOR","CATCH","FINALLY","ELSE","OUTDENT","LEADING_WHEN"],u=["TERMINATOR","INDENT","OUTDENT"]}).call(this)},require["./lexer"]=new function(){var e=this;(function(){var t,n,i,r,s,a,o,c,h,l,u,p,d,f,m,g,b,k,v,y,w,T,C,F,L,N,E,D,x,S,A,R,_,I,$,O,M,j,V,B,P,U,q,H,G,W,X,Y,K,z,J,Z,Q=[].indexOf||function(e){for(var t=0,n=this.length;n>t;t++)if(t in this&&this[t]===e)return t;return-1};J=require("./rewriter"),O=J.Rewriter,k=J.INVERSES,Z=require("./helpers"),H=Z.count,K=Z.starts,q=Z.compact,X=Z.last,G=Z.invertLiterate,Y=Z.locationDataToString,z=Z.throwSyntaxError,e.Lexer=L=function(){function e(){}return e.prototype.tokenize=function(e,t){var n,i,r,s;for(null==t&&(t={}),this.literate=t.literate,this.indent=0,this.indebt=0,this.outdebt=0,this.indents=[],this.ends=[],this.tokens=[],this.chunkLine=t.line||0,this.chunkColumn=t.column||0,e=this.clean(e),i=0;this.chunk=e.slice(i);)n=this.identifierToken()||this.commentToken()||this.whitespaceToken()||this.lineToken()||this.heredocToken()||this.stringToken()||this.numberToken()||this.regexToken()||this.jsToken()||this.literalToken(),s=this.getLineAndColumnFromChunk(n),this.chunkLine=s[0],this.chunkColumn=s[1],i+=n;return this.closeIndentation(),(r=this.ends.pop())&&this.error("missing "+r),t.rewrite===!1?this.tokens:(new O).rewrite(this.tokens)},e.prototype.clean=function(e){return e.charCodeAt(0)===t&&(e=e.slice(1)),e=e.replace(/\r/g,"").replace(B,""),U.test(e)&&(e="\n"+e,this.chunkLine--),this.literate&&(e=G(e)),e},e.prototype.identifierToken=function(){var e,t,n,i,r,c,h,l,u,p,d,f,m,b;return(h=g.exec(this.chunk))?(c=h[0],i=h[1],e=h[2],r=i.length,l=void 0,"own"===i&&"FOR"===this.tag()?(this.token("OWN",i),i.length):(n=e||(u=X(this.tokens))&&("."===(f=u[0])||"?."===f||"::"===f||"?::"===f||!u.spaced&&"@"===u[0]),p="IDENTIFIER",!n&&(Q.call(w,i)>=0||Q.call(o,i)>=0)&&(p=i.toUpperCase(),"WHEN"===p&&(m=this.tag(),Q.call(T,m)>=0)?p="LEADING_WHEN":"FOR"===p?this.seenFor=!0:"UNLESS"===p?p="IF":Q.call(P,p)>=0?p="UNARY":Q.call(I,p)>=0&&("INSTANCEOF"!==p&&this.seenFor?(p="FOR"+p,this.seenFor=!1):(p="RELATION","!"===this.value()&&(l=this.tokens.pop(),i="!"+i)))),Q.call(y,i)>=0&&(n?(p="IDENTIFIER",i=new String(i),i.reserved=!0):Q.call($,i)>=0&&this.error('reserved word "'+i+'"')),n||(Q.call(s,i)>=0&&(i=a[i]),p=function(){switch(i){case"!":return"UNARY";case"==":case"!=":return"COMPARE";case"&&":case"||":return"LOGIC";case"true":case"false":return"BOOL";case"break":case"continue":return"STATEMENT";default:return p}}()),d=this.token(p,i,0,r),l&&(b=[l[2].first_line,l[2].first_column],d[2].first_line=b[0],d[2].first_column=b[1]),e&&(t=c.lastIndexOf(":"),this.token(":",":",t,e.length)),c.length)):0},e.prototype.numberToken=function(){var e,t,n,i,r;return(n=A.exec(this.chunk))?(i=n[0],/^0[BOX]/.test(i)?this.error("radix prefix '"+i+"' must be lowercase"):/E/.test(i)&&!/^0x/.test(i)?this.error("exponential notation '"+i+"' must be indicated with a lowercase 'e'"):/^0\d*[89]/.test(i)?this.error("decimal literal '"+i+"' must not be prefixed with '0'"):/^0\d+/.test(i)&&this.error("octal literal '"+i+"' must be prefixed with '0o'"),t=i.length,(r=/^0o([0-7]+)/.exec(i))&&(i="0x"+parseInt(r[1],8).toString(16)),(e=/^0b([01]+)/.exec(i))&&(i="0x"+parseInt(e[1],2).toString(16)),this.token("NUMBER",i,0,t),t):0},e.prototype.stringToken=function(){var e,t,n;switch(this.chunk.charAt(0)){case"'":if(!(e=j.exec(this.chunk)))return 0;n=e[0],this.token("STRING",n.replace(E,"\\\n"),0,n.length);break;case'"':if(!(n=this.balancedString(this.chunk,'"')))return 0;n.indexOf("#{",1)>0?this.interpolateString(n.slice(1,-1),{strOffset:1,lexedLength:n.length}):this.token("STRING",this.escapeLines(n,0,n.length));break;default:return 0}return(t=/^(?:\\.|[^\\])*\\(?:0[0-7]|[1-7])/.test(n))&&this.error("octal escape sequences "+n+" are not allowed"),n.length},e.prototype.heredocToken=function(){var e,t,n,i;return(n=u.exec(this.chunk))?(t=n[0],i=t.charAt(0),e=this.sanitizeHeredoc(n[2],{quote:i,indent:null}),'"'===i&&e.indexOf("#{")>=0?this.interpolateString(e,{heredoc:!0,strOffset:3,lexedLength:t.length}):this.token("STRING",this.makeString(e,i,!0),0,t.length),t.length):0},e.prototype.commentToken=function(){var e,t,n;return(n=this.chunk.match(c))?(e=n[0],t=n[1],t&&this.token("HERECOMMENT",this.sanitizeHeredoc(t,{herecomment:!0,indent:Array(this.indent+1).join(" ")}),0,e.length),e.length):0},e.prototype.jsToken=function(){var e,t;return"`"===this.chunk.charAt(0)&&(e=v.exec(this.chunk))?(this.token("JS",(t=e[0]).slice(1,-1),0,t.length),t.length):0},e.prototype.regexToken=function(){var e,t,n,i,r,s,a;return"/"!==this.chunk.charAt(0)?0:(n=f.exec(this.chunk))?t=this.heregexToken(n):(i=X(this.tokens),i&&(s=i[0],Q.call(i.spaced?x:S,s)>=0)?0:(n=_.exec(this.chunk))?(a=n,n=a[0],r=a[1],e=a[2],"/*"===r.slice(0,2)&&this.error("regular expressions cannot begin with `*`"),"//"===r&&(r="/(?:)/"),this.token("REGEX",""+r+e,0,n.length),n.length):0)},e.prototype.heregexToken=function(e){var t,n,i,r,s,a,o,c,h,l,u,p,d,f,g,b;if(r=e[0],t=e[1],n=e[2],0>t.indexOf("#{"))return o=t.replace(m,"").replace(/\//g,"\\/"),o.match(/^\*/)&&this.error("regular expressions cannot begin with `*`"),this.token("REGEX","/"+(o||"(?:)")+"/"+n,0,r.length),r.length;for(this.token("IDENTIFIER","RegExp",0,0),this.token("CALL_START","(",0,0),l=[],f=this.interpolateString(t,{regex:!0}),p=0,d=f.length;d>p;p++){if(h=f[p],c=h[0],u=h[1],"TOKENS"===c)l.push.apply(l,u);else if("NEOSTRING"===c){if(!(u=u.replace(m,"")))continue;u=u.replace(/\\/g,"\\\\"),h[0]="STRING",h[1]=this.makeString(u,'"',!0),l.push(h)}else this.error("Unexpected "+c);a=X(this.tokens),s=["+","+"],s[2]=a[2],l.push(s)}return l.pop(),"STRING"!==(null!=(g=l[0])?g[0]:void 0)&&(this.token("STRING",'""',0,0),this.token("+","+",0,0)),(b=this.tokens).push.apply(b,l),n&&(i=r.lastIndexOf(n),this.token(",",",",i,0),this.token("STRING",'"'+n+'"',i,n.length)),this.token(")",")",r.length-1,0),r.length},e.prototype.lineToken=function(){var e,t,n,i,r;if(!(n=D.exec(this.chunk)))return 0;if(t=n[0],this.seenFor=!1,r=t.length-1-t.lastIndexOf("\n"),i=this.unfinished(),r-this.indebt===this.indent)return i?this.suppressNewlines():this.newlineToken(0),t.length;if(r>this.indent){if(i)return this.indebt=r-this.indent,this.suppressNewlines(),t.length;e=r-this.indent+this.outdebt,this.token("INDENT",e,t.length-r,r),this.indents.push(e),this.ends.push("OUTDENT"),this.outdebt=this.indebt=0}else this.indebt=0,this.outdentToken(this.indent-r,i,t.length);return this.indent=r,t.length},e.prototype.outdentToken=function(e,t,n){for(var i,r;e>0;)r=this.indents.length-1,void 0===this.indents[r]?e=0:this.indents[r]===this.outdebt?(e-=this.outdebt,this.outdebt=0):this.indents[r]<this.outdebt?(this.outdebt-=this.indents[r],e-=this.indents[r]):(i=this.indents.pop()+this.outdebt,e-=i,this.outdebt=0,this.pair("OUTDENT"),this.token("OUTDENT",i,0,n));for(i&&(this.outdebt-=e);";"===this.value();)this.tokens.pop();return"TERMINATOR"===this.tag()||t||this.token("TERMINATOR","\n",n,0),this},e.prototype.whitespaceToken=function(){var e,t,n;return(e=U.exec(this.chunk))||(t="\n"===this.chunk.charAt(0))?(n=X(this.tokens),n&&(n[e?"spaced":"newLine"]=!0),e?e[0].length:0):0},e.prototype.newlineToken=function(e){for(;";"===this.value();)this.tokens.pop();return"TERMINATOR"!==this.tag()&&this.token("TERMINATOR","\n",e,0),this},e.prototype.suppressNewlines=function(){return"\\"===this.value()&&this.tokens.pop(),this},e.prototype.literalToken=function(){var e,t,n,s,a,o,c,u;if((e=R.exec(this.chunk))?(s=e[0],r.test(s)&&this.tagParameters()):s=this.chunk.charAt(0),n=s,t=X(this.tokens),"="===s&&t&&(!t[1].reserved&&(a=t[1],Q.call(y,a)>=0)&&this.error('reserved word "'+this.value()+"\" can't be assigned"),"||"===(o=t[1])||"&&"===o))return t[0]="COMPOUND_ASSIGN",t[1]+="=",s.length;if(";"===s)this.seenFor=!1,n="TERMINATOR";else if(Q.call(N,s)>=0)n="MATH";else if(Q.call(h,s)>=0)n="COMPARE";else if(Q.call(l,s)>=0)n="COMPOUND_ASSIGN";else if(Q.call(P,s)>=0)n="UNARY";else if(Q.call(M,s)>=0)n="SHIFT";else if(Q.call(F,s)>=0||"?"===s&&(null!=t?t.spaced:void 0))n="LOGIC";else if(t&&!t.spaced)if("("===s&&(c=t[0],Q.call(i,c)>=0))"?"===t[0]&&(t[0]="FUNC_EXIST"),n="CALL_START";else if("["===s&&(u=t[0],Q.call(b,u)>=0))switch(n="INDEX_START",t[0]){case"?":t[0]="INDEX_SOAK"}switch(s){case"(":case"{":case"[":this.ends.push(k[s]);break;case")":case"}":case"]":this.pair(s)}return this.token(n,s),s.length},e.prototype.sanitizeHeredoc=function(e,t){var n,i,r,s,a;if(r=t.indent,i=t.herecomment){if(p.test(e)&&this.error('block comment cannot contain "*/", starting'),0>e.indexOf("\n"))return e}else for(;s=d.exec(e);)n=s[1],(null===r||(a=n.length)>0&&r.length>a)&&(r=n);return r&&(e=e.replace(RegExp("\\n"+r,"g"),"\n")),i||(e=e.replace(/^\n/,"")),e},e.prototype.tagParameters=function(){var e,t,n,i;if(")"!==this.tag())return this;for(t=[],i=this.tokens,e=i.length,i[--e][0]="PARAM_END";n=i[--e];)switch(n[0]){case")":t.push(n);break;case"(":case"CALL_START":if(!t.length)return"("===n[0]?(n[0]="PARAM_START",this):this;t.pop()}return this},e.prototype.closeIndentation=function(){return this.outdentToken(this.indent)},e.prototype.balancedString=function(e,t){var n,i,r,s,a,o,c,h;for(n=0,o=[t],i=c=1,h=e.length;h>=1?h>c:c>h;i=h>=1?++c:--c)if(n)--n;else{switch(r=e.charAt(i)){case"\\":++n;continue;case t:if(o.pop(),!o.length)return e.slice(0,+i+1||9e9);t=o[o.length-1];continue}"}"!==t||'"'!==r&&"'"!==r?"}"===t&&"/"===r&&(s=f.exec(e.slice(i))||_.exec(e.slice(i)))?n+=s[0].length-1:"}"===t&&"{"===r?o.push(t="}"):'"'===t&&"#"===a&&"{"===r&&o.push(t="}"):o.push(t=r),a=r}return this.error("missing "+o.pop()+", starting")},e.prototype.interpolateString=function(t,n){var i,r,s,a,o,c,h,l,u,p,d,f,m,g,b,k,v,y,w,T,C,F,L,N,E,D,x,S;for(null==n&&(n={}),s=n.heredoc,v=n.regex,m=n.offsetInChunk,w=n.strOffset,u=n.lexedLength,m=m||0,w=w||0,u=u||t.length,s&&t.length>0&&"\n"===t[0]&&(t=t.slice(1),w++),F=[],g=0,a=-1;l=t.charAt(a+=1);)"\\"!==l?"#"===l&&"{"===t.charAt(a+1)&&(r=this.balancedString(t.slice(a+1),"}"))&&(a>g&&F.push(this.makeToken("NEOSTRING",t.slice(g,a),w+g)),o=r.slice(1,-1),o.length&&(D=this.getLineAndColumnFromChunk(w+a+1),p=D[0],i=D[1],f=(new e).tokenize(o,{line:p,column:i,rewrite:!1}),k=f.pop(),"TERMINATOR"===(null!=(x=f[0])?x[0]:void 0)&&(k=f.shift()),(h=f.length)&&(h>1&&(f.unshift(this.makeToken("(","(",w+a+1,0)),f.push(this.makeToken(")",")",w+a+1+o.length,0))),F.push(["TOKENS",f]))),a+=r.length,g=a+1):a+=1;if(a>g&&t.length>g&&F.push(this.makeToken("NEOSTRING",t.slice(g),w+g)),v)return F;if(!F.length)return this.token("STRING",'""',m,u);for("NEOSTRING"!==F[0][0]&&F.unshift(this.makeToken("NEOSTRING","",m)),(c=F.length>1)&&this.token("(","(",m,0),a=N=0,E=F.length;E>N;a=++N)C=F[a],T=C[0],L=C[1],a&&(a&&(b=this.token("+","+")),d="TOKENS"===T?L[0]:C,b[2]={first_line:d[2].first_line,first_column:d[2].first_column,last_line:d[2].first_line,last_column:d[2].first_column}),"TOKENS"===T?(S=this.tokens).push.apply(S,L):"NEOSTRING"===T?(C[0]="STRING",C[1]=this.makeString(L,'"',s),this.tokens.push(C)):this.error("Unexpected "+T);return c&&(y=this.makeToken(")",")",m+u,0),y.stringEnd=!0,this.tokens.push(y)),F},e.prototype.pair=function(e){var t,n;return e!==(n=X(this.ends))?("OUTDENT"!==n&&this.error("unmatched "+e),this.indent-=t=X(this.indents),this.outdentToken(t,!0),this.pair(e)):this.ends.pop()},e.prototype.getLineAndColumnFromChunk=function(e){var t,n,i,r;return 0===e?[this.chunkLine,this.chunkColumn]:(r=e>=this.chunk.length?this.chunk:this.chunk.slice(0,+(e-1)+1||9e9),n=H(r,"\n"),t=this.chunkColumn,n>0?(i=r.split("\n"),t=X(i).length):t+=r.length,[this.chunkLine+n,t])},e.prototype.makeToken=function(e,t,n,i){var r,s,a,o,c;return null==n&&(n=0),null==i&&(i=t.length),s={},o=this.getLineAndColumnFromChunk(n),s.first_line=o[0],s.first_column=o[1],r=Math.max(0,i-1),c=this.getLineAndColumnFromChunk(n+r),s.last_line=c[0],s.last_column=c[1],a=[e,t,s]},e.prototype.token=function(e,t,n,i){var r;return r=this.makeToken(e,t,n,i),this.tokens.push(r),r},e.prototype.tag=function(e,t){var n;return(n=X(this.tokens,e))&&(t?n[0]=t:n[0])},e.prototype.value=function(e,t){var n;return(n=X(this.tokens,e))&&(t?n[1]=t:n[1])},e.prototype.unfinished=function(){var e;return C.test(this.chunk)||"\\"===(e=this.tag())||"."===e||"?."===e||"?::"===e||"UNARY"===e||"MATH"===e||"+"===e||"-"===e||"SHIFT"===e||"RELATION"===e||"COMPARE"===e||"LOGIC"===e||"THROW"===e||"EXTENDS"===e},e.prototype.escapeLines=function(e,t){return e.replace(E,t?"\\n":"")},e.prototype.makeString=function(e,t,n){return e?(e=e.replace(/\\([\s\S])/g,function(e,n){return"\n"===n||n===t?n:e}),e=e.replace(RegExp(""+t,"g"),"\\$&"),t+this.escapeLines(e,n)+t):t+t},e.prototype.error=function(e){return z(e,{first_line:this.chunkLine,first_column:this.chunkColumn})},e}(),w=["true","false","null","this","new","delete","typeof","in","instanceof","return","throw","break","continue","debugger","if","else","switch","for","while","do","try","catch","finally","class","extends","super"],o=["undefined","then","unless","until","loop","of","by","when"],a={and:"&&",or:"||",is:"==",isnt:"!=",not:"!",yes:"true",no:"false",on:"true",off:"false"},s=function(){var e;e=[];for(W in a)e.push(W);return e}(),o=o.concat(s),$=["case","default","function","var","void","with","const","let","enum","export","import","native","__hasProp","__extends","__slice","__bind","__indexOf","implements","interface","package","private","protected","public","static","yield"],V=["arguments","eval"],y=w.concat($).concat(V),e.RESERVED=$.concat(w).concat(o).concat(V),e.STRICT_PROSCRIBED=V,t=65279,g=/^([$A-Za-z_\x7f-\uffff][$\w\x7f-\uffff]*)([^\n\S]*:(?!:))?/,A=/^0b[01]+|^0o[0-7]+|^0x[\da-f]+|^\d*\.?\d+(?:e[+-]?\d+)?/i,u=/^("""|''')([\s\S]*?)(?:\n[^\n\S]*)?\1/,R=/^(?:[-=]>|[-+*\/%<>&|^!?=]=|>>>=?|([-+:])\1|([&|<>])\2=?|\?(\.|::)|\.{2,3})/,U=/^[^\n\S]+/,c=/^###([^#][\s\S]*?)(?:###[^\n\S]*|(?:###)$)|^(?:\s*#(?!##[^#]).*)+/,r=/^[-=]>/,D=/^(?:\n[^\n\S]*)+/,j=/^'[^\\']*(?:\\.[^\\']*)*'/,v=/^`[^\\`]*(?:\\.[^\\`]*)*`/,_=/^(\/(?![\s=])[^[\/\n\\]*(?:(?:\\[\s\S]|\[[^\]\n\\]*(?:\\[\s\S][^\]\n\\]*)*])[^[\/\n\\]*)*\/)([imgy]{0,4})(?!\w)/,f=/^\/{3}([\s\S]+?)\/{3}([imgy]{0,4})(?!\w)/,m=/\s+(?:#.*)?/g,E=/\n/g,d=/\n+([^\n\S]*)/g,p=/\*\//,C=/^\s*(?:,|\??\.(?![.\d])|::)/,B=/\s+$/,l=["-=","+=","/=","*=","%=","||=","&&=","?=","<<=",">>=",">>>=","&=","^=","|="],P=["!","~","NEW","TYPEOF","DELETE","DO"],F=["&&","||","&","|","^"],M=["<<",">>",">>>"],h=["==","!=","<",">","<=",">="],N=["*","/","%"],I=["IN","OF","INSTANCEOF"],n=["TRUE","FALSE"],x=["NUMBER","REGEX","BOOL","NULL","UNDEFINED","++","--","]"],S=x.concat(")","}","THIS","IDENTIFIER","STRING"),i=["IDENTIFIER","STRING","REGEX",")","]","}","?","::","@","THIS","SUPER"],b=i.concat("NUMBER","BOOL","NULL","UNDEFINED"),T=["INDENT","OUTDENT","TERMINATOR"]}).call(this)},require["./parser"]=new function(){var e=this,t=function(){function e(){this.yy={}}var t={trace:function(){},yy:{},symbols_:{error:2,Root:3,Body:4,Block:5,TERMINATOR:6,Line:7,Expression:8,Statement:9,Return:10,Comment:11,STATEMENT:12,Value:13,Invocation:14,Code:15,Operation:16,Assign:17,If:18,Try:19,While:20,For:21,Switch:22,Class:23,Throw:24,INDENT:25,OUTDENT:26,Identifier:27,IDENTIFIER:28,AlphaNumeric:29,NUMBER:30,STRING:31,Literal:32,JS:33,REGEX:34,DEBUGGER:35,UNDEFINED:36,NULL:37,BOOL:38,Assignable:39,"=":40,AssignObj:41,ObjAssignable:42,":":43,ThisProperty:44,RETURN:45,HERECOMMENT:46,PARAM_START:47,ParamList:48,PARAM_END:49,FuncGlyph:50,"->":51,"=>":52,OptComma:53,",":54,Param:55,ParamVar:56,"...":57,Array:58,Object:59,Splat:60,SimpleAssignable:61,Accessor:62,Parenthetical:63,Range:64,This:65,".":66,"?.":67,"::":68,"?::":69,Index:70,INDEX_START:71,IndexValue:72,INDEX_END:73,INDEX_SOAK:74,Slice:75,"{":76,AssignList:77,"}":78,CLASS:79,EXTENDS:80,OptFuncExist:81,Arguments:82,SUPER:83,FUNC_EXIST:84,CALL_START:85,CALL_END:86,ArgList:87,THIS:88,"@":89,"[":90,"]":91,RangeDots:92,"..":93,Arg:94,SimpleArgs:95,TRY:96,Catch:97,FINALLY:98,CATCH:99,THROW:100,"(":101,")":102,WhileSource:103,WHILE:104,WHEN:105,UNTIL:106,Loop:107,LOOP:108,ForBody:109,FOR:110,ForStart:111,ForSource:112,ForVariables:113,OWN:114,ForValue:115,FORIN:116,FOROF:117,BY:118,SWITCH:119,Whens:120,ELSE:121,When:122,LEADING_WHEN:123,IfBlock:124,IF:125,POST_IF:126,UNARY:127,"-":128,"+":129,"--":130,"++":131,"?":132,MATH:133,SHIFT:134,COMPARE:135,LOGIC:136,RELATION:137,COMPOUND_ASSIGN:138,$accept:0,$end:1},terminals_:{2:"error",6:"TERMINATOR",12:"STATEMENT",25:"INDENT",26:"OUTDENT",28:"IDENTIFIER",30:"NUMBER",31:"STRING",33:"JS",34:"REGEX",35:"DEBUGGER",36:"UNDEFINED",37:"NULL",38:"BOOL",40:"=",43:":",45:"RETURN",46:"HERECOMMENT",47:"PARAM_START",49:"PARAM_END",51:"->",52:"=>",54:",",57:"...",66:".",67:"?.",68:"::",69:"?::",71:"INDEX_START",73:"INDEX_END",74:"INDEX_SOAK",76:"{",78:"}",79:"CLASS",80:"EXTENDS",83:"SUPER",84:"FUNC_EXIST",85:"CALL_START",86:"CALL_END",88:"THIS",89:"@",90:"[",91:"]",93:"..",96:"TRY",98:"FINALLY",99:"CATCH",100:"THROW",101:"(",102:")",104:"WHILE",105:"WHEN",106:"UNTIL",108:"LOOP",110:"FOR",114:"OWN",116:"FORIN",117:"FOROF",118:"BY",119:"SWITCH",121:"ELSE",123:"LEADING_WHEN",125:"IF",126:"POST_IF",127:"UNARY",128:"-",129:"+",130:"--",131:"++",132:"?",133:"MATH",134:"SHIFT",135:"COMPARE",136:"LOGIC",137:"RELATION",138:"COMPOUND_ASSIGN"},productions_:[0,[3,0],[3,1],[3,2],[4,1],[4,3],[4,2],[7,1],[7,1],[9,1],[9,1],[9,1],[8,1],[8,1],[8,1],[8,1],[8,1],[8,1],[8,1],[8,1],[8,1],[8,1],[8,1],[8,1],[5,2],[5,3],[27,1],[29,1],[29,1],[32,1],[32,1],[32,1],[32,1],[32,1],[32,1],[32,1],[17,3],[17,4],[17,5],[41,1],[41,3],[41,5],[41,1],[42,1],[42,1],[42,1],[10,2],[10,1],[11,1],[15,5],[15,2],[50,1],[50,1],[53,0],[53,1],[48,0],[48,1],[48,3],[48,4],[48,6],[55,1],[55,2],[55,3],[56,1],[56,1],[56,1],[56,1],[60,2],[61,1],[61,2],[61,2],[61,1],[39,1],[39,1],[39,1],[13,1],[13,1],[13,1],[13,1],[13,1],[62,2],[62,2],[62,2],[62,2],[62,1],[62,1],[70,3],[70,2],[72,1],[72,1],[59,4],[77,0],[77,1],[77,3],[77,4],[77,6],[23,1],[23,2],[23,3],[23,4],[23,2],[23,3],[23,4],[23,5],[14,3],[14,3],[14,1],[14,2],[81,0],[81,1],[82,2],[82,4],[65,1],[65,1],[44,2],[58,2],[58,4],[92,1],[92,1],[64,5],[75,3],[75,2],[75,2],[75,1],[87,1],[87,3],[87,4],[87,4],[87,6],[94,1],[94,1],[95,1],[95,3],[19,2],[19,3],[19,4],[19,5],[97,3],[97,3],[24,2],[63,3],[63,5],[103,2],[103,4],[103,2],[103,4],[20,2],[20,2],[20,2],[20,1],[107,2],[107,2],[21,2],[21,2],[21,2],[109,2],[109,2],[111,2],[111,3],[115,1],[115,1],[115,1],[115,1],[113,1],[113,3],[112,2],[112,2],[112,4],[112,4],[112,4],[112,6],[112,6],[22,5],[22,7],[22,4],[22,6],[120,1],[120,2],[122,3],[122,4],[124,3],[124,5],[18,1],[18,3],[18,3],[18,3],[16,2],[16,2],[16,2],[16,2],[16,2],[16,2],[16,2],[16,2],[16,3],[16,3],[16,3],[16,3],[16,3],[16,3],[16,3],[16,3],[16,5],[16,4],[16,3]],performAction:function(e,t,n,i,r,s,a){var o=s.length-1;switch(r){case 1:return this.$=i.addLocationDataFn(a[o],a[o])(new i.Block);case 2:return this.$=s[o];case 3:return this.$=s[o-1];case 4:this.$=i.addLocationDataFn(a[o],a[o])(i.Block.wrap([s[o]]));break;case 5:this.$=i.addLocationDataFn(a[o-2],a[o])(s[o-2].push(s[o]));break;case 6:this.$=s[o-1];break;case 7:this.$=s[o];break;case 8:this.$=s[o];break;case 9:this.$=s[o];break;case 10:this.$=s[o];break;case 11:this.$=i.addLocationDataFn(a[o],a[o])(new i.Literal(s[o]));break;case 12:this.$=s[o];break;case 13:this.$=s[o];break;case 14:this.$=s[o];break;case 15:this.$=s[o];break;case 16:this.$=s[o];break;case 17:this.$=s[o];break;case 18:this.$=s[o];break;case 19:this.$=s[o];break;case 20:this.$=s[o];break;case 21:this.$=s[o];break;case 22:this.$=s[o];break;case 23:this.$=s[o];break;case 24:this.$=i.addLocationDataFn(a[o-1],a[o])(new i.Block);break;case 25:this.$=i.addLocationDataFn(a[o-2],a[o])(s[o-1]);break;case 26:this.$=i.addLocationDataFn(a[o],a[o])(new i.Literal(s[o]));break;case 27:this.$=i.addLocationDataFn(a[o],a[o])(new i.Literal(s[o]));break;case 28:this.$=i.addLocationDataFn(a[o],a[o])(new i.Literal(s[o]));break;case 29:this.$=s[o];break;case 30:this.$=i.addLocationDataFn(a[o],a[o])(new i.Literal(s[o]));break;case 31:this.$=i.addLocationDataFn(a[o],a[o])(new i.Literal(s[o]));break;case 32:this.$=i.addLocationDataFn(a[o],a[o])(new i.Literal(s[o]));break;case 33:this.$=i.addLocationDataFn(a[o],a[o])(new i.Undefined);break;case 34:this.$=i.addLocationDataFn(a[o],a[o])(new i.Null);break;case 35:this.$=i.addLocationDataFn(a[o],a[o])(new i.Bool(s[o]));break;case 36:this.$=i.addLocationDataFn(a[o-2],a[o])(new i.Assign(s[o-2],s[o]));break;case 37:this.$=i.addLocationDataFn(a[o-3],a[o])(new i.Assign(s[o-3],s[o]));break;case 38:this.$=i.addLocationDataFn(a[o-4],a[o])(new i.Assign(s[o-4],s[o-1]));break;case 39:this.$=i.addLocationDataFn(a[o],a[o])(new i.Value(s[o]));break;case 40:this.$=i.addLocationDataFn(a[o-2],a[o])(new i.Assign(i.addLocationDataFn(a[o-2])(new i.Value(s[o-2])),s[o],"object"));break;case 41:this.$=i.addLocationDataFn(a[o-4],a[o])(new i.Assign(i.addLocationDataFn(a[o-4])(new i.Value(s[o-4])),s[o-1],"object"));break;case 42:this.$=s[o];break;case 43:this.$=s[o];break;case 44:this.$=s[o];break;case 45:this.$=s[o];break;case 46:this.$=i.addLocationDataFn(a[o-1],a[o])(new i.Return(s[o]));break;case 47:this.$=i.addLocationDataFn(a[o],a[o])(new i.Return);break;case 48:this.$=i.addLocationDataFn(a[o],a[o])(new i.Comment(s[o]));break;case 49:this.$=i.addLocationDataFn(a[o-4],a[o])(new i.Code(s[o-3],s[o],s[o-1]));break;case 50:this.$=i.addLocationDataFn(a[o-1],a[o])(new i.Code([],s[o],s[o-1]));break;case 51:this.$=i.addLocationDataFn(a[o],a[o])("func");break;case 52:this.$=i.addLocationDataFn(a[o],a[o])("boundfunc");break;case 53:this.$=s[o];break;case 54:this.$=s[o];
break;case 55:this.$=i.addLocationDataFn(a[o],a[o])([]);break;case 56:this.$=i.addLocationDataFn(a[o],a[o])([s[o]]);break;case 57:this.$=i.addLocationDataFn(a[o-2],a[o])(s[o-2].concat(s[o]));break;case 58:this.$=i.addLocationDataFn(a[o-3],a[o])(s[o-3].concat(s[o]));break;case 59:this.$=i.addLocationDataFn(a[o-5],a[o])(s[o-5].concat(s[o-2]));break;case 60:this.$=i.addLocationDataFn(a[o],a[o])(new i.Param(s[o]));break;case 61:this.$=i.addLocationDataFn(a[o-1],a[o])(new i.Param(s[o-1],null,!0));break;case 62:this.$=i.addLocationDataFn(a[o-2],a[o])(new i.Param(s[o-2],s[o]));break;case 63:this.$=s[o];break;case 64:this.$=s[o];break;case 65:this.$=s[o];break;case 66:this.$=s[o];break;case 67:this.$=i.addLocationDataFn(a[o-1],a[o])(new i.Splat(s[o-1]));break;case 68:this.$=i.addLocationDataFn(a[o],a[o])(new i.Value(s[o]));break;case 69:this.$=i.addLocationDataFn(a[o-1],a[o])(s[o-1].add(s[o]));break;case 70:this.$=i.addLocationDataFn(a[o-1],a[o])(new i.Value(s[o-1],[].concat(s[o])));break;case 71:this.$=s[o];break;case 72:this.$=s[o];break;case 73:this.$=i.addLocationDataFn(a[o],a[o])(new i.Value(s[o]));break;case 74:this.$=i.addLocationDataFn(a[o],a[o])(new i.Value(s[o]));break;case 75:this.$=s[o];break;case 76:this.$=i.addLocationDataFn(a[o],a[o])(new i.Value(s[o]));break;case 77:this.$=i.addLocationDataFn(a[o],a[o])(new i.Value(s[o]));break;case 78:this.$=i.addLocationDataFn(a[o],a[o])(new i.Value(s[o]));break;case 79:this.$=s[o];break;case 80:this.$=i.addLocationDataFn(a[o-1],a[o])(new i.Access(s[o]));break;case 81:this.$=i.addLocationDataFn(a[o-1],a[o])(new i.Access(s[o],"soak"));break;case 82:this.$=i.addLocationDataFn(a[o-1],a[o])([i.addLocationDataFn(a[o-1])(new i.Access(new i.Literal("prototype"))),i.addLocationDataFn(a[o])(new i.Access(s[o]))]);break;case 83:this.$=i.addLocationDataFn(a[o-1],a[o])([i.addLocationDataFn(a[o-1])(new i.Access(new i.Literal("prototype"),"soak")),i.addLocationDataFn(a[o])(new i.Access(s[o]))]);break;case 84:this.$=i.addLocationDataFn(a[o],a[o])(new i.Access(new i.Literal("prototype")));break;case 85:this.$=s[o];break;case 86:this.$=i.addLocationDataFn(a[o-2],a[o])(s[o-1]);break;case 87:this.$=i.addLocationDataFn(a[o-1],a[o])(i.extend(s[o],{soak:!0}));break;case 88:this.$=i.addLocationDataFn(a[o],a[o])(new i.Index(s[o]));break;case 89:this.$=i.addLocationDataFn(a[o],a[o])(new i.Slice(s[o]));break;case 90:this.$=i.addLocationDataFn(a[o-3],a[o])(new i.Obj(s[o-2],s[o-3].generated));break;case 91:this.$=i.addLocationDataFn(a[o],a[o])([]);break;case 92:this.$=i.addLocationDataFn(a[o],a[o])([s[o]]);break;case 93:this.$=i.addLocationDataFn(a[o-2],a[o])(s[o-2].concat(s[o]));break;case 94:this.$=i.addLocationDataFn(a[o-3],a[o])(s[o-3].concat(s[o]));break;case 95:this.$=i.addLocationDataFn(a[o-5],a[o])(s[o-5].concat(s[o-2]));break;case 96:this.$=i.addLocationDataFn(a[o],a[o])(new i.Class);break;case 97:this.$=i.addLocationDataFn(a[o-1],a[o])(new i.Class(null,null,s[o]));break;case 98:this.$=i.addLocationDataFn(a[o-2],a[o])(new i.Class(null,s[o]));break;case 99:this.$=i.addLocationDataFn(a[o-3],a[o])(new i.Class(null,s[o-1],s[o]));break;case 100:this.$=i.addLocationDataFn(a[o-1],a[o])(new i.Class(s[o]));break;case 101:this.$=i.addLocationDataFn(a[o-2],a[o])(new i.Class(s[o-1],null,s[o]));break;case 102:this.$=i.addLocationDataFn(a[o-3],a[o])(new i.Class(s[o-2],s[o]));break;case 103:this.$=i.addLocationDataFn(a[o-4],a[o])(new i.Class(s[o-3],s[o-1],s[o]));break;case 104:this.$=i.addLocationDataFn(a[o-2],a[o])(new i.Call(s[o-2],s[o],s[o-1]));break;case 105:this.$=i.addLocationDataFn(a[o-2],a[o])(new i.Call(s[o-2],s[o],s[o-1]));break;case 106:this.$=i.addLocationDataFn(a[o],a[o])(new i.Call("super",[new i.Splat(new i.Literal("arguments"))]));break;case 107:this.$=i.addLocationDataFn(a[o-1],a[o])(new i.Call("super",s[o]));break;case 108:this.$=i.addLocationDataFn(a[o],a[o])(!1);break;case 109:this.$=i.addLocationDataFn(a[o],a[o])(!0);break;case 110:this.$=i.addLocationDataFn(a[o-1],a[o])([]);break;case 111:this.$=i.addLocationDataFn(a[o-3],a[o])(s[o-2]);break;case 112:this.$=i.addLocationDataFn(a[o],a[o])(new i.Value(new i.Literal("this")));break;case 113:this.$=i.addLocationDataFn(a[o],a[o])(new i.Value(new i.Literal("this")));break;case 114:this.$=i.addLocationDataFn(a[o-1],a[o])(new i.Value(i.addLocationDataFn(a[o-1])(new i.Literal("this")),[i.addLocationDataFn(a[o])(new i.Access(s[o]))],"this"));break;case 115:this.$=i.addLocationDataFn(a[o-1],a[o])(new i.Arr([]));break;case 116:this.$=i.addLocationDataFn(a[o-3],a[o])(new i.Arr(s[o-2]));break;case 117:this.$=i.addLocationDataFn(a[o],a[o])("inclusive");break;case 118:this.$=i.addLocationDataFn(a[o],a[o])("exclusive");break;case 119:this.$=i.addLocationDataFn(a[o-4],a[o])(new i.Range(s[o-3],s[o-1],s[o-2]));break;case 120:this.$=i.addLocationDataFn(a[o-2],a[o])(new i.Range(s[o-2],s[o],s[o-1]));break;case 121:this.$=i.addLocationDataFn(a[o-1],a[o])(new i.Range(s[o-1],null,s[o]));break;case 122:this.$=i.addLocationDataFn(a[o-1],a[o])(new i.Range(null,s[o],s[o-1]));break;case 123:this.$=i.addLocationDataFn(a[o],a[o])(new i.Range(null,null,s[o]));break;case 124:this.$=i.addLocationDataFn(a[o],a[o])([s[o]]);break;case 125:this.$=i.addLocationDataFn(a[o-2],a[o])(s[o-2].concat(s[o]));break;case 126:this.$=i.addLocationDataFn(a[o-3],a[o])(s[o-3].concat(s[o]));break;case 127:this.$=i.addLocationDataFn(a[o-3],a[o])(s[o-2]);break;case 128:this.$=i.addLocationDataFn(a[o-5],a[o])(s[o-5].concat(s[o-2]));break;case 129:this.$=s[o];break;case 130:this.$=s[o];break;case 131:this.$=s[o];break;case 132:this.$=i.addLocationDataFn(a[o-2],a[o])([].concat(s[o-2],s[o]));break;case 133:this.$=i.addLocationDataFn(a[o-1],a[o])(new i.Try(s[o]));break;case 134:this.$=i.addLocationDataFn(a[o-2],a[o])(new i.Try(s[o-1],s[o][0],s[o][1]));break;case 135:this.$=i.addLocationDataFn(a[o-3],a[o])(new i.Try(s[o-2],null,null,s[o]));break;case 136:this.$=i.addLocationDataFn(a[o-4],a[o])(new i.Try(s[o-3],s[o-2][0],s[o-2][1],s[o]));break;case 137:this.$=i.addLocationDataFn(a[o-2],a[o])([s[o-1],s[o]]);break;case 138:this.$=i.addLocationDataFn(a[o-2],a[o])([i.addLocationDataFn(a[o-1])(new i.Value(s[o-1])),s[o]]);break;case 139:this.$=i.addLocationDataFn(a[o-1],a[o])(new i.Throw(s[o]));break;case 140:this.$=i.addLocationDataFn(a[o-2],a[o])(new i.Parens(s[o-1]));break;case 141:this.$=i.addLocationDataFn(a[o-4],a[o])(new i.Parens(s[o-2]));break;case 142:this.$=i.addLocationDataFn(a[o-1],a[o])(new i.While(s[o]));break;case 143:this.$=i.addLocationDataFn(a[o-3],a[o])(new i.While(s[o-2],{guard:s[o]}));break;case 144:this.$=i.addLocationDataFn(a[o-1],a[o])(new i.While(s[o],{invert:!0}));break;case 145:this.$=i.addLocationDataFn(a[o-3],a[o])(new i.While(s[o-2],{invert:!0,guard:s[o]}));break;case 146:this.$=i.addLocationDataFn(a[o-1],a[o])(s[o-1].addBody(s[o]));break;case 147:this.$=i.addLocationDataFn(a[o-1],a[o])(s[o].addBody(i.addLocationDataFn(a[o-1])(i.Block.wrap([s[o-1]]))));break;case 148:this.$=i.addLocationDataFn(a[o-1],a[o])(s[o].addBody(i.addLocationDataFn(a[o-1])(i.Block.wrap([s[o-1]]))));break;case 149:this.$=i.addLocationDataFn(a[o],a[o])(s[o]);break;case 150:this.$=i.addLocationDataFn(a[o-1],a[o])(new i.While(i.addLocationDataFn(a[o-1])(new i.Literal("true"))).addBody(s[o]));break;case 151:this.$=i.addLocationDataFn(a[o-1],a[o])(new i.While(i.addLocationDataFn(a[o-1])(new i.Literal("true"))).addBody(i.addLocationDataFn(a[o])(i.Block.wrap([s[o]]))));break;case 152:this.$=i.addLocationDataFn(a[o-1],a[o])(new i.For(s[o-1],s[o]));break;case 153:this.$=i.addLocationDataFn(a[o-1],a[o])(new i.For(s[o-1],s[o]));break;case 154:this.$=i.addLocationDataFn(a[o-1],a[o])(new i.For(s[o],s[o-1]));break;case 155:this.$=i.addLocationDataFn(a[o-1],a[o])({source:i.addLocationDataFn(a[o])(new i.Value(s[o]))});break;case 156:this.$=i.addLocationDataFn(a[o-1],a[o])(function(){return s[o].own=s[o-1].own,s[o].name=s[o-1][0],s[o].index=s[o-1][1],s[o]}());break;case 157:this.$=i.addLocationDataFn(a[o-1],a[o])(s[o]);break;case 158:this.$=i.addLocationDataFn(a[o-2],a[o])(function(){return s[o].own=!0,s[o]}());break;case 159:this.$=s[o];break;case 160:this.$=s[o];break;case 161:this.$=i.addLocationDataFn(a[o],a[o])(new i.Value(s[o]));break;case 162:this.$=i.addLocationDataFn(a[o],a[o])(new i.Value(s[o]));break;case 163:this.$=i.addLocationDataFn(a[o],a[o])([s[o]]);break;case 164:this.$=i.addLocationDataFn(a[o-2],a[o])([s[o-2],s[o]]);break;case 165:this.$=i.addLocationDataFn(a[o-1],a[o])({source:s[o]});break;case 166:this.$=i.addLocationDataFn(a[o-1],a[o])({source:s[o],object:!0});break;case 167:this.$=i.addLocationDataFn(a[o-3],a[o])({source:s[o-2],guard:s[o]});break;case 168:this.$=i.addLocationDataFn(a[o-3],a[o])({source:s[o-2],guard:s[o],object:!0});break;case 169:this.$=i.addLocationDataFn(a[o-3],a[o])({source:s[o-2],step:s[o]});break;case 170:this.$=i.addLocationDataFn(a[o-5],a[o])({source:s[o-4],guard:s[o-2],step:s[o]});break;case 171:this.$=i.addLocationDataFn(a[o-5],a[o])({source:s[o-4],step:s[o-2],guard:s[o]});break;case 172:this.$=i.addLocationDataFn(a[o-4],a[o])(new i.Switch(s[o-3],s[o-1]));break;case 173:this.$=i.addLocationDataFn(a[o-6],a[o])(new i.Switch(s[o-5],s[o-3],s[o-1]));break;case 174:this.$=i.addLocationDataFn(a[o-3],a[o])(new i.Switch(null,s[o-1]));break;case 175:this.$=i.addLocationDataFn(a[o-5],a[o])(new i.Switch(null,s[o-3],s[o-1]));break;case 176:this.$=s[o];break;case 177:this.$=i.addLocationDataFn(a[o-1],a[o])(s[o-1].concat(s[o]));break;case 178:this.$=i.addLocationDataFn(a[o-2],a[o])([[s[o-1],s[o]]]);break;case 179:this.$=i.addLocationDataFn(a[o-3],a[o])([[s[o-2],s[o-1]]]);break;case 180:this.$=i.addLocationDataFn(a[o-2],a[o])(new i.If(s[o-1],s[o],{type:s[o-2]}));break;case 181:this.$=i.addLocationDataFn(a[o-4],a[o])(s[o-4].addElse(new i.If(s[o-1],s[o],{type:s[o-2]})));break;case 182:this.$=s[o];break;case 183:this.$=i.addLocationDataFn(a[o-2],a[o])(s[o-2].addElse(s[o]));break;case 184:this.$=i.addLocationDataFn(a[o-2],a[o])(new i.If(s[o],i.addLocationDataFn(a[o-2])(i.Block.wrap([s[o-2]])),{type:s[o-1],statement:!0}));break;case 185:this.$=i.addLocationDataFn(a[o-2],a[o])(new i.If(s[o],i.addLocationDataFn(a[o-2])(i.Block.wrap([s[o-2]])),{type:s[o-1],statement:!0}));break;case 186:this.$=i.addLocationDataFn(a[o-1],a[o])(new i.Op(s[o-1],s[o]));break;case 187:this.$=i.addLocationDataFn(a[o-1],a[o])(new i.Op("-",s[o]));break;case 188:this.$=i.addLocationDataFn(a[o-1],a[o])(new i.Op("+",s[o]));break;case 189:this.$=i.addLocationDataFn(a[o-1],a[o])(new i.Op("--",s[o]));break;case 190:this.$=i.addLocationDataFn(a[o-1],a[o])(new i.Op("++",s[o]));break;case 191:this.$=i.addLocationDataFn(a[o-1],a[o])(new i.Op("--",s[o-1],null,!0));break;case 192:this.$=i.addLocationDataFn(a[o-1],a[o])(new i.Op("++",s[o-1],null,!0));break;case 193:this.$=i.addLocationDataFn(a[o-1],a[o])(new i.Existence(s[o-1]));break;case 194:this.$=i.addLocationDataFn(a[o-2],a[o])(new i.Op("+",s[o-2],s[o]));break;case 195:this.$=i.addLocationDataFn(a[o-2],a[o])(new i.Op("-",s[o-2],s[o]));break;case 196:this.$=i.addLocationDataFn(a[o-2],a[o])(new i.Op(s[o-1],s[o-2],s[o]));break;case 197:this.$=i.addLocationDataFn(a[o-2],a[o])(new i.Op(s[o-1],s[o-2],s[o]));break;case 198:this.$=i.addLocationDataFn(a[o-2],a[o])(new i.Op(s[o-1],s[o-2],s[o]));break;case 199:this.$=i.addLocationDataFn(a[o-2],a[o])(new i.Op(s[o-1],s[o-2],s[o]));break;case 200:this.$=i.addLocationDataFn(a[o-2],a[o])(function(){return"!"===s[o-1].charAt(0)?new i.Op(s[o-1].slice(1),s[o-2],s[o]).invert():new i.Op(s[o-1],s[o-2],s[o])}());break;case 201:this.$=i.addLocationDataFn(a[o-2],a[o])(new i.Assign(s[o-2],s[o],s[o-1]));break;case 202:this.$=i.addLocationDataFn(a[o-4],a[o])(new i.Assign(s[o-4],s[o-1],s[o-3]));break;case 203:this.$=i.addLocationDataFn(a[o-3],a[o])(new i.Assign(s[o-3],s[o],s[o-2]));break;case 204:this.$=i.addLocationDataFn(a[o-2],a[o])(new i.Extends(s[o-2],s[o]))}},table:[{1:[2,1],3:1,4:2,5:3,7:4,8:6,9:7,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,25:[1,5],27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{1:[3]},{1:[2,2],6:[1,74]},{6:[1,75]},{1:[2,4],6:[2,4],26:[2,4],102:[2,4]},{4:77,7:4,8:6,9:7,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,26:[1,76],27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{1:[2,7],6:[2,7],26:[2,7],102:[2,7],103:87,104:[1,65],106:[1,66],109:88,110:[1,68],111:69,126:[1,86],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[1,84],137:[1,85]},{1:[2,8],6:[2,8],26:[2,8],102:[2,8],103:90,104:[1,65],106:[1,66],109:91,110:[1,68],111:69,126:[1,89]},{1:[2,12],6:[2,12],25:[2,12],26:[2,12],49:[2,12],54:[2,12],57:[2,12],62:93,66:[1,95],67:[1,96],68:[1,97],69:[1,98],70:99,71:[1,100],73:[2,12],74:[1,101],78:[2,12],81:92,84:[1,94],85:[2,108],86:[2,12],91:[2,12],93:[2,12],102:[2,12],104:[2,12],105:[2,12],106:[2,12],110:[2,12],118:[2,12],126:[2,12],128:[2,12],129:[2,12],132:[2,12],133:[2,12],134:[2,12],135:[2,12],136:[2,12],137:[2,12]},{1:[2,13],6:[2,13],25:[2,13],26:[2,13],49:[2,13],54:[2,13],57:[2,13],62:103,66:[1,95],67:[1,96],68:[1,97],69:[1,98],70:99,71:[1,100],73:[2,13],74:[1,101],78:[2,13],81:102,84:[1,94],85:[2,108],86:[2,13],91:[2,13],93:[2,13],102:[2,13],104:[2,13],105:[2,13],106:[2,13],110:[2,13],118:[2,13],126:[2,13],128:[2,13],129:[2,13],132:[2,13],133:[2,13],134:[2,13],135:[2,13],136:[2,13],137:[2,13]},{1:[2,14],6:[2,14],25:[2,14],26:[2,14],49:[2,14],54:[2,14],57:[2,14],73:[2,14],78:[2,14],86:[2,14],91:[2,14],93:[2,14],102:[2,14],104:[2,14],105:[2,14],106:[2,14],110:[2,14],118:[2,14],126:[2,14],128:[2,14],129:[2,14],132:[2,14],133:[2,14],134:[2,14],135:[2,14],136:[2,14],137:[2,14]},{1:[2,15],6:[2,15],25:[2,15],26:[2,15],49:[2,15],54:[2,15],57:[2,15],73:[2,15],78:[2,15],86:[2,15],91:[2,15],93:[2,15],102:[2,15],104:[2,15],105:[2,15],106:[2,15],110:[2,15],118:[2,15],126:[2,15],128:[2,15],129:[2,15],132:[2,15],133:[2,15],134:[2,15],135:[2,15],136:[2,15],137:[2,15]},{1:[2,16],6:[2,16],25:[2,16],26:[2,16],49:[2,16],54:[2,16],57:[2,16],73:[2,16],78:[2,16],86:[2,16],91:[2,16],93:[2,16],102:[2,16],104:[2,16],105:[2,16],106:[2,16],110:[2,16],118:[2,16],126:[2,16],128:[2,16],129:[2,16],132:[2,16],133:[2,16],134:[2,16],135:[2,16],136:[2,16],137:[2,16]},{1:[2,17],6:[2,17],25:[2,17],26:[2,17],49:[2,17],54:[2,17],57:[2,17],73:[2,17],78:[2,17],86:[2,17],91:[2,17],93:[2,17],102:[2,17],104:[2,17],105:[2,17],106:[2,17],110:[2,17],118:[2,17],126:[2,17],128:[2,17],129:[2,17],132:[2,17],133:[2,17],134:[2,17],135:[2,17],136:[2,17],137:[2,17]},{1:[2,18],6:[2,18],25:[2,18],26:[2,18],49:[2,18],54:[2,18],57:[2,18],73:[2,18],78:[2,18],86:[2,18],91:[2,18],93:[2,18],102:[2,18],104:[2,18],105:[2,18],106:[2,18],110:[2,18],118:[2,18],126:[2,18],128:[2,18],129:[2,18],132:[2,18],133:[2,18],134:[2,18],135:[2,18],136:[2,18],137:[2,18]},{1:[2,19],6:[2,19],25:[2,19],26:[2,19],49:[2,19],54:[2,19],57:[2,19],73:[2,19],78:[2,19],86:[2,19],91:[2,19],93:[2,19],102:[2,19],104:[2,19],105:[2,19],106:[2,19],110:[2,19],118:[2,19],126:[2,19],128:[2,19],129:[2,19],132:[2,19],133:[2,19],134:[2,19],135:[2,19],136:[2,19],137:[2,19]},{1:[2,20],6:[2,20],25:[2,20],26:[2,20],49:[2,20],54:[2,20],57:[2,20],73:[2,20],78:[2,20],86:[2,20],91:[2,20],93:[2,20],102:[2,20],104:[2,20],105:[2,20],106:[2,20],110:[2,20],118:[2,20],126:[2,20],128:[2,20],129:[2,20],132:[2,20],133:[2,20],134:[2,20],135:[2,20],136:[2,20],137:[2,20]},{1:[2,21],6:[2,21],25:[2,21],26:[2,21],49:[2,21],54:[2,21],57:[2,21],73:[2,21],78:[2,21],86:[2,21],91:[2,21],93:[2,21],102:[2,21],104:[2,21],105:[2,21],106:[2,21],110:[2,21],118:[2,21],126:[2,21],128:[2,21],129:[2,21],132:[2,21],133:[2,21],134:[2,21],135:[2,21],136:[2,21],137:[2,21]},{1:[2,22],6:[2,22],25:[2,22],26:[2,22],49:[2,22],54:[2,22],57:[2,22],73:[2,22],78:[2,22],86:[2,22],91:[2,22],93:[2,22],102:[2,22],104:[2,22],105:[2,22],106:[2,22],110:[2,22],118:[2,22],126:[2,22],128:[2,22],129:[2,22],132:[2,22],133:[2,22],134:[2,22],135:[2,22],136:[2,22],137:[2,22]},{1:[2,23],6:[2,23],25:[2,23],26:[2,23],49:[2,23],54:[2,23],57:[2,23],73:[2,23],78:[2,23],86:[2,23],91:[2,23],93:[2,23],102:[2,23],104:[2,23],105:[2,23],106:[2,23],110:[2,23],118:[2,23],126:[2,23],128:[2,23],129:[2,23],132:[2,23],133:[2,23],134:[2,23],135:[2,23],136:[2,23],137:[2,23]},{1:[2,9],6:[2,9],26:[2,9],102:[2,9],104:[2,9],106:[2,9],110:[2,9],126:[2,9]},{1:[2,10],6:[2,10],26:[2,10],102:[2,10],104:[2,10],106:[2,10],110:[2,10],126:[2,10]},{1:[2,11],6:[2,11],26:[2,11],102:[2,11],104:[2,11],106:[2,11],110:[2,11],126:[2,11]},{1:[2,75],6:[2,75],25:[2,75],26:[2,75],40:[1,104],49:[2,75],54:[2,75],57:[2,75],66:[2,75],67:[2,75],68:[2,75],69:[2,75],71:[2,75],73:[2,75],74:[2,75],78:[2,75],84:[2,75],85:[2,75],86:[2,75],91:[2,75],93:[2,75],102:[2,75],104:[2,75],105:[2,75],106:[2,75],110:[2,75],118:[2,75],126:[2,75],128:[2,75],129:[2,75],132:[2,75],133:[2,75],134:[2,75],135:[2,75],136:[2,75],137:[2,75]},{1:[2,76],6:[2,76],25:[2,76],26:[2,76],49:[2,76],54:[2,76],57:[2,76],66:[2,76],67:[2,76],68:[2,76],69:[2,76],71:[2,76],73:[2,76],74:[2,76],78:[2,76],84:[2,76],85:[2,76],86:[2,76],91:[2,76],93:[2,76],102:[2,76],104:[2,76],105:[2,76],106:[2,76],110:[2,76],118:[2,76],126:[2,76],128:[2,76],129:[2,76],132:[2,76],133:[2,76],134:[2,76],135:[2,76],136:[2,76],137:[2,76]},{1:[2,77],6:[2,77],25:[2,77],26:[2,77],49:[2,77],54:[2,77],57:[2,77],66:[2,77],67:[2,77],68:[2,77],69:[2,77],71:[2,77],73:[2,77],74:[2,77],78:[2,77],84:[2,77],85:[2,77],86:[2,77],91:[2,77],93:[2,77],102:[2,77],104:[2,77],105:[2,77],106:[2,77],110:[2,77],118:[2,77],126:[2,77],128:[2,77],129:[2,77],132:[2,77],133:[2,77],134:[2,77],135:[2,77],136:[2,77],137:[2,77]},{1:[2,78],6:[2,78],25:[2,78],26:[2,78],49:[2,78],54:[2,78],57:[2,78],66:[2,78],67:[2,78],68:[2,78],69:[2,78],71:[2,78],73:[2,78],74:[2,78],78:[2,78],84:[2,78],85:[2,78],86:[2,78],91:[2,78],93:[2,78],102:[2,78],104:[2,78],105:[2,78],106:[2,78],110:[2,78],118:[2,78],126:[2,78],128:[2,78],129:[2,78],132:[2,78],133:[2,78],134:[2,78],135:[2,78],136:[2,78],137:[2,78]},{1:[2,79],6:[2,79],25:[2,79],26:[2,79],49:[2,79],54:[2,79],57:[2,79],66:[2,79],67:[2,79],68:[2,79],69:[2,79],71:[2,79],73:[2,79],74:[2,79],78:[2,79],84:[2,79],85:[2,79],86:[2,79],91:[2,79],93:[2,79],102:[2,79],104:[2,79],105:[2,79],106:[2,79],110:[2,79],118:[2,79],126:[2,79],128:[2,79],129:[2,79],132:[2,79],133:[2,79],134:[2,79],135:[2,79],136:[2,79],137:[2,79]},{1:[2,106],6:[2,106],25:[2,106],26:[2,106],49:[2,106],54:[2,106],57:[2,106],66:[2,106],67:[2,106],68:[2,106],69:[2,106],71:[2,106],73:[2,106],74:[2,106],78:[2,106],82:105,84:[2,106],85:[1,106],86:[2,106],91:[2,106],93:[2,106],102:[2,106],104:[2,106],105:[2,106],106:[2,106],110:[2,106],118:[2,106],126:[2,106],128:[2,106],129:[2,106],132:[2,106],133:[2,106],134:[2,106],135:[2,106],136:[2,106],137:[2,106]},{6:[2,55],25:[2,55],27:110,28:[1,73],44:111,48:107,49:[2,55],54:[2,55],55:108,56:109,58:112,59:113,76:[1,70],89:[1,114],90:[1,115]},{5:116,25:[1,5]},{8:117,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{8:119,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{8:120,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{13:122,14:123,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:124,44:63,58:47,59:48,61:121,63:25,64:26,65:27,76:[1,70],83:[1,28],88:[1,58],89:[1,59],90:[1,57],101:[1,56]},{13:122,14:123,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:124,44:63,58:47,59:48,61:125,63:25,64:26,65:27,76:[1,70],83:[1,28],88:[1,58],89:[1,59],90:[1,57],101:[1,56]},{1:[2,72],6:[2,72],25:[2,72],26:[2,72],40:[2,72],49:[2,72],54:[2,72],57:[2,72],66:[2,72],67:[2,72],68:[2,72],69:[2,72],71:[2,72],73:[2,72],74:[2,72],78:[2,72],80:[1,129],84:[2,72],85:[2,72],86:[2,72],91:[2,72],93:[2,72],102:[2,72],104:[2,72],105:[2,72],106:[2,72],110:[2,72],118:[2,72],126:[2,72],128:[2,72],129:[2,72],130:[1,126],131:[1,127],132:[2,72],133:[2,72],134:[2,72],135:[2,72],136:[2,72],137:[2,72],138:[1,128]},{1:[2,182],6:[2,182],25:[2,182],26:[2,182],49:[2,182],54:[2,182],57:[2,182],73:[2,182],78:[2,182],86:[2,182],91:[2,182],93:[2,182],102:[2,182],104:[2,182],105:[2,182],106:[2,182],110:[2,182],118:[2,182],121:[1,130],126:[2,182],128:[2,182],129:[2,182],132:[2,182],133:[2,182],134:[2,182],135:[2,182],136:[2,182],137:[2,182]},{5:131,25:[1,5]},{5:132,25:[1,5]},{1:[2,149],6:[2,149],25:[2,149],26:[2,149],49:[2,149],54:[2,149],57:[2,149],73:[2,149],78:[2,149],86:[2,149],91:[2,149],93:[2,149],102:[2,149],104:[2,149],105:[2,149],106:[2,149],110:[2,149],118:[2,149],126:[2,149],128:[2,149],129:[2,149],132:[2,149],133:[2,149],134:[2,149],135:[2,149],136:[2,149],137:[2,149]},{5:133,25:[1,5]},{8:134,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,25:[1,135],27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{1:[2,96],5:136,6:[2,96],13:122,14:123,25:[1,5],26:[2,96],27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:124,44:63,49:[2,96],54:[2,96],57:[2,96],58:47,59:48,61:138,63:25,64:26,65:27,73:[2,96],76:[1,70],78:[2,96],80:[1,137],83:[1,28],86:[2,96],88:[1,58],89:[1,59],90:[1,57],91:[2,96],93:[2,96],101:[1,56],102:[2,96],104:[2,96],105:[2,96],106:[2,96],110:[2,96],118:[2,96],126:[2,96],128:[2,96],129:[2,96],132:[2,96],133:[2,96],134:[2,96],135:[2,96],136:[2,96],137:[2,96]},{8:139,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{1:[2,47],6:[2,47],8:140,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,26:[2,47],27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],102:[2,47],103:39,104:[2,47],106:[2,47],107:40,108:[1,67],109:41,110:[2,47],111:69,119:[1,42],124:37,125:[1,64],126:[2,47],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{1:[2,48],6:[2,48],25:[2,48],26:[2,48],54:[2,48],78:[2,48],102:[2,48],104:[2,48],106:[2,48],110:[2,48],126:[2,48]},{1:[2,73],6:[2,73],25:[2,73],26:[2,73],40:[2,73],49:[2,73],54:[2,73],57:[2,73],66:[2,73],67:[2,73],68:[2,73],69:[2,73],71:[2,73],73:[2,73],74:[2,73],78:[2,73],84:[2,73],85:[2,73],86:[2,73],91:[2,73],93:[2,73],102:[2,73],104:[2,73],105:[2,73],106:[2,73],110:[2,73],118:[2,73],126:[2,73],128:[2,73],129:[2,73],132:[2,73],133:[2,73],134:[2,73],135:[2,73],136:[2,73],137:[2,73]},{1:[2,74],6:[2,74],25:[2,74],26:[2,74],40:[2,74],49:[2,74],54:[2,74],57:[2,74],66:[2,74],67:[2,74],68:[2,74],69:[2,74],71:[2,74],73:[2,74],74:[2,74],78:[2,74],84:[2,74],85:[2,74],86:[2,74],91:[2,74],93:[2,74],102:[2,74],104:[2,74],105:[2,74],106:[2,74],110:[2,74],118:[2,74],126:[2,74],128:[2,74],129:[2,74],132:[2,74],133:[2,74],134:[2,74],135:[2,74],136:[2,74],137:[2,74]},{1:[2,29],6:[2,29],25:[2,29],26:[2,29],49:[2,29],54:[2,29],57:[2,29],66:[2,29],67:[2,29],68:[2,29],69:[2,29],71:[2,29],73:[2,29],74:[2,29],78:[2,29],84:[2,29],85:[2,29],86:[2,29],91:[2,29],93:[2,29],102:[2,29],104:[2,29],105:[2,29],106:[2,29],110:[2,29],118:[2,29],126:[2,29],128:[2,29],129:[2,29],132:[2,29],133:[2,29],134:[2,29],135:[2,29],136:[2,29],137:[2,29]},{1:[2,30],6:[2,30],25:[2,30],26:[2,30],49:[2,30],54:[2,30],57:[2,30],66:[2,30],67:[2,30],68:[2,30],69:[2,30],71:[2,30],73:[2,30],74:[2,30],78:[2,30],84:[2,30],85:[2,30],86:[2,30],91:[2,30],93:[2,30],102:[2,30],104:[2,30],105:[2,30],106:[2,30],110:[2,30],118:[2,30],126:[2,30],128:[2,30],129:[2,30],132:[2,30],133:[2,30],134:[2,30],135:[2,30],136:[2,30],137:[2,30]},{1:[2,31],6:[2,31],25:[2,31],26:[2,31],49:[2,31],54:[2,31],57:[2,31],66:[2,31],67:[2,31],68:[2,31],69:[2,31],71:[2,31],73:[2,31],74:[2,31],78:[2,31],84:[2,31],85:[2,31],86:[2,31],91:[2,31],93:[2,31],102:[2,31],104:[2,31],105:[2,31],106:[2,31],110:[2,31],118:[2,31],126:[2,31],128:[2,31],129:[2,31],132:[2,31],133:[2,31],134:[2,31],135:[2,31],136:[2,31],137:[2,31]},{1:[2,32],6:[2,32],25:[2,32],26:[2,32],49:[2,32],54:[2,32],57:[2,32],66:[2,32],67:[2,32],68:[2,32],69:[2,32],71:[2,32],73:[2,32],74:[2,32],78:[2,32],84:[2,32],85:[2,32],86:[2,32],91:[2,32],93:[2,32],102:[2,32],104:[2,32],105:[2,32],106:[2,32],110:[2,32],118:[2,32],126:[2,32],128:[2,32],129:[2,32],132:[2,32],133:[2,32],134:[2,32],135:[2,32],136:[2,32],137:[2,32]},{1:[2,33],6:[2,33],25:[2,33],26:[2,33],49:[2,33],54:[2,33],57:[2,33],66:[2,33],67:[2,33],68:[2,33],69:[2,33],71:[2,33],73:[2,33],74:[2,33],78:[2,33],84:[2,33],85:[2,33],86:[2,33],91:[2,33],93:[2,33],102:[2,33],104:[2,33],105:[2,33],106:[2,33],110:[2,33],118:[2,33],126:[2,33],128:[2,33],129:[2,33],132:[2,33],133:[2,33],134:[2,33],135:[2,33],136:[2,33],137:[2,33]},{1:[2,34],6:[2,34],25:[2,34],26:[2,34],49:[2,34],54:[2,34],57:[2,34],66:[2,34],67:[2,34],68:[2,34],69:[2,34],71:[2,34],73:[2,34],74:[2,34],78:[2,34],84:[2,34],85:[2,34],86:[2,34],91:[2,34],93:[2,34],102:[2,34],104:[2,34],105:[2,34],106:[2,34],110:[2,34],118:[2,34],126:[2,34],128:[2,34],129:[2,34],132:[2,34],133:[2,34],134:[2,34],135:[2,34],136:[2,34],137:[2,34]},{1:[2,35],6:[2,35],25:[2,35],26:[2,35],49:[2,35],54:[2,35],57:[2,35],66:[2,35],67:[2,35],68:[2,35],69:[2,35],71:[2,35],73:[2,35],74:[2,35],78:[2,35],84:[2,35],85:[2,35],86:[2,35],91:[2,35],93:[2,35],102:[2,35],104:[2,35],105:[2,35],106:[2,35],110:[2,35],118:[2,35],126:[2,35],128:[2,35],129:[2,35],132:[2,35],133:[2,35],134:[2,35],135:[2,35],136:[2,35],137:[2,35]},{4:141,7:4,8:6,9:7,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,25:[1,142],27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{8:143,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,25:[1,147],27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,60:148,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],87:145,88:[1,58],89:[1,59],90:[1,57],91:[1,144],94:146,96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{1:[2,112],6:[2,112],25:[2,112],26:[2,112],49:[2,112],54:[2,112],57:[2,112],66:[2,112],67:[2,112],68:[2,112],69:[2,112],71:[2,112],73:[2,112],74:[2,112],78:[2,112],84:[2,112],85:[2,112],86:[2,112],91:[2,112],93:[2,112],102:[2,112],104:[2,112],105:[2,112],106:[2,112],110:[2,112],118:[2,112],126:[2,112],128:[2,112],129:[2,112],132:[2,112],133:[2,112],134:[2,112],135:[2,112],136:[2,112],137:[2,112]},{1:[2,113],6:[2,113],25:[2,113],26:[2,113],27:149,28:[1,73],49:[2,113],54:[2,113],57:[2,113],66:[2,113],67:[2,113],68:[2,113],69:[2,113],71:[2,113],73:[2,113],74:[2,113],78:[2,113],84:[2,113],85:[2,113],86:[2,113],91:[2,113],93:[2,113],102:[2,113],104:[2,113],105:[2,113],106:[2,113],110:[2,113],118:[2,113],126:[2,113],128:[2,113],129:[2,113],132:[2,113],133:[2,113],134:[2,113],135:[2,113],136:[2,113],137:[2,113]},{25:[2,51]},{25:[2,52]},{1:[2,68],6:[2,68],25:[2,68],26:[2,68],40:[2,68],49:[2,68],54:[2,68],57:[2,68],66:[2,68],67:[2,68],68:[2,68],69:[2,68],71:[2,68],73:[2,68],74:[2,68],78:[2,68],80:[2,68],84:[2,68],85:[2,68],86:[2,68],91:[2,68],93:[2,68],102:[2,68],104:[2,68],105:[2,68],106:[2,68],110:[2,68],118:[2,68],126:[2,68],128:[2,68],129:[2,68],130:[2,68],131:[2,68],132:[2,68],133:[2,68],134:[2,68],135:[2,68],136:[2,68],137:[2,68],138:[2,68]},{1:[2,71],6:[2,71],25:[2,71],26:[2,71],40:[2,71],49:[2,71],54:[2,71],57:[2,71],66:[2,71],67:[2,71],68:[2,71],69:[2,71],71:[2,71],73:[2,71],74:[2,71],78:[2,71],80:[2,71],84:[2,71],85:[2,71],86:[2,71],91:[2,71],93:[2,71],102:[2,71],104:[2,71],105:[2,71],106:[2,71],110:[2,71],118:[2,71],126:[2,71],128:[2,71],129:[2,71],130:[2,71],131:[2,71],132:[2,71],133:[2,71],134:[2,71],135:[2,71],136:[2,71],137:[2,71],138:[2,71]},{8:150,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{8:151,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{8:152,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{5:153,8:154,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,25:[1,5],27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{27:159,28:[1,73],44:160,58:161,59:162,64:155,76:[1,70],89:[1,114],90:[1,57],113:156,114:[1,157],115:158},{112:163,116:[1,164],117:[1,165]},{6:[2,91],11:169,25:[2,91],27:170,28:[1,73],29:171,30:[1,71],31:[1,72],41:167,42:168,44:172,46:[1,46],54:[2,91],77:166,78:[2,91],89:[1,114]},{1:[2,27],6:[2,27],25:[2,27],26:[2,27],43:[2,27],49:[2,27],54:[2,27],57:[2,27],66:[2,27],67:[2,27],68:[2,27],69:[2,27],71:[2,27],73:[2,27],74:[2,27],78:[2,27],84:[2,27],85:[2,27],86:[2,27],91:[2,27],93:[2,27],102:[2,27],104:[2,27],105:[2,27],106:[2,27],110:[2,27],118:[2,27],126:[2,27],128:[2,27],129:[2,27],132:[2,27],133:[2,27],134:[2,27],135:[2,27],136:[2,27],137:[2,27]},{1:[2,28],6:[2,28],25:[2,28],26:[2,28],43:[2,28],49:[2,28],54:[2,28],57:[2,28],66:[2,28],67:[2,28],68:[2,28],69:[2,28],71:[2,28],73:[2,28],74:[2,28],78:[2,28],84:[2,28],85:[2,28],86:[2,28],91:[2,28],93:[2,28],102:[2,28],104:[2,28],105:[2,28],106:[2,28],110:[2,28],118:[2,28],126:[2,28],128:[2,28],129:[2,28],132:[2,28],133:[2,28],134:[2,28],135:[2,28],136:[2,28],137:[2,28]},{1:[2,26],6:[2,26],25:[2,26],26:[2,26],40:[2,26],43:[2,26],49:[2,26],54:[2,26],57:[2,26],66:[2,26],67:[2,26],68:[2,26],69:[2,26],71:[2,26],73:[2,26],74:[2,26],78:[2,26],80:[2,26],84:[2,26],85:[2,26],86:[2,26],91:[2,26],93:[2,26],102:[2,26],104:[2,26],105:[2,26],106:[2,26],110:[2,26],116:[2,26],117:[2,26],118:[2,26],126:[2,26],128:[2,26],129:[2,26],130:[2,26],131:[2,26],132:[2,26],133:[2,26],134:[2,26],135:[2,26],136:[2,26],137:[2,26],138:[2,26]},{1:[2,6],6:[2,6],7:173,8:6,9:7,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,26:[2,6],27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],102:[2,6],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{1:[2,3]},{1:[2,24],6:[2,24],25:[2,24],26:[2,24],49:[2,24],54:[2,24],57:[2,24],73:[2,24],78:[2,24],86:[2,24],91:[2,24],93:[2,24],98:[2,24],99:[2,24],102:[2,24],104:[2,24],105:[2,24],106:[2,24],110:[2,24],118:[2,24],121:[2,24],123:[2,24],126:[2,24],128:[2,24],129:[2,24],132:[2,24],133:[2,24],134:[2,24],135:[2,24],136:[2,24],137:[2,24]},{6:[1,74],26:[1,174]},{1:[2,193],6:[2,193],25:[2,193],26:[2,193],49:[2,193],54:[2,193],57:[2,193],73:[2,193],78:[2,193],86:[2,193],91:[2,193],93:[2,193],102:[2,193],104:[2,193],105:[2,193],106:[2,193],110:[2,193],118:[2,193],126:[2,193],128:[2,193],129:[2,193],132:[2,193],133:[2,193],134:[2,193],135:[2,193],136:[2,193],137:[2,193]},{8:175,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{8:176,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{8:177,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{8:178,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{8:179,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{8:180,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{8:181,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{8:182,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{1:[2,148],6:[2,148],25:[2,148],26:[2,148],49:[2,148],54:[2,148],57:[2,148],73:[2,148],78:[2,148],86:[2,148],91:[2,148],93:[2,148],102:[2,148],104:[2,148],105:[2,148],106:[2,148],110:[2,148],118:[2,148],126:[2,148],128:[2,148],129:[2,148],132:[2,148],133:[2,148],134:[2,148],135:[2,148],136:[2,148],137:[2,148]},{1:[2,153],6:[2,153],25:[2,153],26:[2,153],49:[2,153],54:[2,153],57:[2,153],73:[2,153],78:[2,153],86:[2,153],91:[2,153],93:[2,153],102:[2,153],104:[2,153],105:[2,153],106:[2,153],110:[2,153],118:[2,153],126:[2,153],128:[2,153],129:[2,153],132:[2,153],133:[2,153],134:[2,153],135:[2,153],136:[2,153],137:[2,153]},{8:183,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{1:[2,147],6:[2,147],25:[2,147],26:[2,147],49:[2,147],54:[2,147],57:[2,147],73:[2,147],78:[2,147],86:[2,147],91:[2,147],93:[2,147],102:[2,147],104:[2,147],105:[2,147],106:[2,147],110:[2,147],118:[2,147],126:[2,147],128:[2,147],129:[2,147],132:[2,147],133:[2,147],134:[2,147],135:[2,147],136:[2,147],137:[2,147]},{1:[2,152],6:[2,152],25:[2,152],26:[2,152],49:[2,152],54:[2,152],57:[2,152],73:[2,152],78:[2,152],86:[2,152],91:[2,152],93:[2,152],102:[2,152],104:[2,152],105:[2,152],106:[2,152],110:[2,152],118:[2,152],126:[2,152],128:[2,152],129:[2,152],132:[2,152],133:[2,152],134:[2,152],135:[2,152],136:[2,152],137:[2,152]},{82:184,85:[1,106]},{1:[2,69],6:[2,69],25:[2,69],26:[2,69],40:[2,69],49:[2,69],54:[2,69],57:[2,69],66:[2,69],67:[2,69],68:[2,69],69:[2,69],71:[2,69],73:[2,69],74:[2,69],78:[2,69],80:[2,69],84:[2,69],85:[2,69],86:[2,69],91:[2,69],93:[2,69],102:[2,69],104:[2,69],105:[2,69],106:[2,69],110:[2,69],118:[2,69],126:[2,69],128:[2,69],129:[2,69],130:[2,69],131:[2,69],132:[2,69],133:[2,69],134:[2,69],135:[2,69],136:[2,69],137:[2,69],138:[2,69]},{85:[2,109]},{27:185,28:[1,73]},{27:186,28:[1,73]},{1:[2,84],6:[2,84],25:[2,84],26:[2,84],27:187,28:[1,73],40:[2,84],49:[2,84],54:[2,84],57:[2,84],66:[2,84],67:[2,84],68:[2,84],69:[2,84],71:[2,84],73:[2,84],74:[2,84],78:[2,84],80:[2,84],84:[2,84],85:[2,84],86:[2,84],91:[2,84],93:[2,84],102:[2,84],104:[2,84],105:[2,84],106:[2,84],110:[2,84],118:[2,84],126:[2,84],128:[2,84],129:[2,84],130:[2,84],131:[2,84],132:[2,84],133:[2,84],134:[2,84],135:[2,84],136:[2,84],137:[2,84],138:[2,84]},{27:188,28:[1,73]},{1:[2,85],6:[2,85],25:[2,85],26:[2,85],40:[2,85],49:[2,85],54:[2,85],57:[2,85],66:[2,85],67:[2,85],68:[2,85],69:[2,85],71:[2,85],73:[2,85],74:[2,85],78:[2,85],80:[2,85],84:[2,85],85:[2,85],86:[2,85],91:[2,85],93:[2,85],102:[2,85],104:[2,85],105:[2,85],106:[2,85],110:[2,85],118:[2,85],126:[2,85],128:[2,85],129:[2,85],130:[2,85],131:[2,85],132:[2,85],133:[2,85],134:[2,85],135:[2,85],136:[2,85],137:[2,85],138:[2,85]},{8:190,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],57:[1,194],58:47,59:48,61:36,63:25,64:26,65:27,72:189,75:191,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],92:192,93:[1,193],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{70:195,71:[1,100],74:[1,101]},{82:196,85:[1,106]},{1:[2,70],6:[2,70],25:[2,70],26:[2,70],40:[2,70],49:[2,70],54:[2,70],57:[2,70],66:[2,70],67:[2,70],68:[2,70],69:[2,70],71:[2,70],73:[2,70],74:[2,70],78:[2,70],80:[2,70],84:[2,70],85:[2,70],86:[2,70],91:[2,70],93:[2,70],102:[2,70],104:[2,70],105:[2,70],106:[2,70],110:[2,70],118:[2,70],126:[2,70],128:[2,70],129:[2,70],130:[2,70],131:[2,70],132:[2,70],133:[2,70],134:[2,70],135:[2,70],136:[2,70],137:[2,70],138:[2,70]},{6:[1,198],8:197,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,25:[1,199],27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{1:[2,107],6:[2,107],25:[2,107],26:[2,107],49:[2,107],54:[2,107],57:[2,107],66:[2,107],67:[2,107],68:[2,107],69:[2,107],71:[2,107],73:[2,107],74:[2,107],78:[2,107],84:[2,107],85:[2,107],86:[2,107],91:[2,107],93:[2,107],102:[2,107],104:[2,107],105:[2,107],106:[2,107],110:[2,107],118:[2,107],126:[2,107],128:[2,107],129:[2,107],132:[2,107],133:[2,107],134:[2,107],135:[2,107],136:[2,107],137:[2,107]},{8:202,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,25:[1,147],27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,60:148,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],86:[1,200],87:201,88:[1,58],89:[1,59],90:[1,57],94:146,96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{6:[2,53],25:[2,53],49:[1,203],53:205,54:[1,204]},{6:[2,56],25:[2,56],26:[2,56],49:[2,56],54:[2,56]},{6:[2,60],25:[2,60],26:[2,60],40:[1,207],49:[2,60],54:[2,60],57:[1,206]},{6:[2,63],25:[2,63],26:[2,63],40:[2,63],49:[2,63],54:[2,63],57:[2,63]},{6:[2,64],25:[2,64],26:[2,64],40:[2,64],49:[2,64],54:[2,64],57:[2,64]},{6:[2,65],25:[2,65],26:[2,65],40:[2,65],49:[2,65],54:[2,65],57:[2,65]},{6:[2,66],25:[2,66],26:[2,66],40:[2,66],49:[2,66],54:[2,66],57:[2,66]},{27:149,28:[1,73]},{8:202,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,25:[1,147],27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,60:148,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],87:145,88:[1,58],89:[1,59],90:[1,57],91:[1,144],94:146,96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{1:[2,50],6:[2,50],25:[2,50],26:[2,50],49:[2,50],54:[2,50],57:[2,50],73:[2,50],78:[2,50],86:[2,50],91:[2,50],93:[2,50],102:[2,50],104:[2,50],105:[2,50],106:[2,50],110:[2,50],118:[2,50],126:[2,50],128:[2,50],129:[2,50],132:[2,50],133:[2,50],134:[2,50],135:[2,50],136:[2,50],137:[2,50]},{1:[2,186],6:[2,186],25:[2,186],26:[2,186],49:[2,186],54:[2,186],57:[2,186],73:[2,186],78:[2,186],86:[2,186],91:[2,186],93:[2,186],102:[2,186],103:87,104:[2,186],105:[2,186],106:[2,186],109:88,110:[2,186],111:69,118:[2,186],126:[2,186],128:[2,186],129:[2,186],132:[1,78],133:[2,186],134:[2,186],135:[2,186],136:[2,186],137:[2,186]},{103:90,104:[1,65],106:[1,66],109:91,110:[1,68],111:69,126:[1,89]},{1:[2,187],6:[2,187],25:[2,187],26:[2,187],49:[2,187],54:[2,187],57:[2,187],73:[2,187],78:[2,187],86:[2,187],91:[2,187],93:[2,187],102:[2,187],103:87,104:[2,187],105:[2,187],106:[2,187],109:88,110:[2,187],111:69,118:[2,187],126:[2,187],128:[2,187],129:[2,187],132:[1,78],133:[2,187],134:[2,187],135:[2,187],136:[2,187],137:[2,187]},{1:[2,188],6:[2,188],25:[2,188],26:[2,188],49:[2,188],54:[2,188],57:[2,188],73:[2,188],78:[2,188],86:[2,188],91:[2,188],93:[2,188],102:[2,188],103:87,104:[2,188],105:[2,188],106:[2,188],109:88,110:[2,188],111:69,118:[2,188],126:[2,188],128:[2,188],129:[2,188],132:[1,78],133:[2,188],134:[2,188],135:[2,188],136:[2,188],137:[2,188]},{1:[2,189],6:[2,189],25:[2,189],26:[2,189],49:[2,189],54:[2,189],57:[2,189],66:[2,72],67:[2,72],68:[2,72],69:[2,72],71:[2,72],73:[2,189],74:[2,72],78:[2,189],84:[2,72],85:[2,72],86:[2,189],91:[2,189],93:[2,189],102:[2,189],104:[2,189],105:[2,189],106:[2,189],110:[2,189],118:[2,189],126:[2,189],128:[2,189],129:[2,189],132:[2,189],133:[2,189],134:[2,189],135:[2,189],136:[2,189],137:[2,189]},{62:93,66:[1,95],67:[1,96],68:[1,97],69:[1,98],70:99,71:[1,100],74:[1,101],81:92,84:[1,94],85:[2,108]},{62:103,66:[1,95],67:[1,96],68:[1,97],69:[1,98],70:99,71:[1,100],74:[1,101],81:102,84:[1,94],85:[2,108]},{66:[2,75],67:[2,75],68:[2,75],69:[2,75],71:[2,75],74:[2,75],84:[2,75],85:[2,75]},{1:[2,190],6:[2,190],25:[2,190],26:[2,190],49:[2,190],54:[2,190],57:[2,190],66:[2,72],67:[2,72],68:[2,72],69:[2,72],71:[2,72],73:[2,190],74:[2,72],78:[2,190],84:[2,72],85:[2,72],86:[2,190],91:[2,190],93:[2,190],102:[2,190],104:[2,190],105:[2,190],106:[2,190],110:[2,190],118:[2,190],126:[2,190],128:[2,190],129:[2,190],132:[2,190],133:[2,190],134:[2,190],135:[2,190],136:[2,190],137:[2,190]},{1:[2,191],6:[2,191],25:[2,191],26:[2,191],49:[2,191],54:[2,191],57:[2,191],73:[2,191],78:[2,191],86:[2,191],91:[2,191],93:[2,191],102:[2,191],104:[2,191],105:[2,191],106:[2,191],110:[2,191],118:[2,191],126:[2,191],128:[2,191],129:[2,191],132:[2,191],133:[2,191],134:[2,191],135:[2,191],136:[2,191],137:[2,191]},{1:[2,192],6:[2,192],25:[2,192],26:[2,192],49:[2,192],54:[2,192],57:[2,192],73:[2,192],78:[2,192],86:[2,192],91:[2,192],93:[2,192],102:[2,192],104:[2,192],105:[2,192],106:[2,192],110:[2,192],118:[2,192],126:[2,192],128:[2,192],129:[2,192],132:[2,192],133:[2,192],134:[2,192],135:[2,192],136:[2,192],137:[2,192]},{6:[1,210],8:208,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,25:[1,209],27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{8:211,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{5:212,25:[1,5],125:[1,213]},{1:[2,133],6:[2,133],25:[2,133],26:[2,133],49:[2,133],54:[2,133],57:[2,133],73:[2,133],78:[2,133],86:[2,133],91:[2,133],93:[2,133],97:214,98:[1,215],99:[1,216],102:[2,133],104:[2,133],105:[2,133],106:[2,133],110:[2,133],118:[2,133],126:[2,133],128:[2,133],129:[2,133],132:[2,133],133:[2,133],134:[2,133],135:[2,133],136:[2,133],137:[2,133]},{1:[2,146],6:[2,146],25:[2,146],26:[2,146],49:[2,146],54:[2,146],57:[2,146],73:[2,146],78:[2,146],86:[2,146],91:[2,146],93:[2,146],102:[2,146],104:[2,146],105:[2,146],106:[2,146],110:[2,146],118:[2,146],126:[2,146],128:[2,146],129:[2,146],132:[2,146],133:[2,146],134:[2,146],135:[2,146],136:[2,146],137:[2,146]},{1:[2,154],6:[2,154],25:[2,154],26:[2,154],49:[2,154],54:[2,154],57:[2,154],73:[2,154],78:[2,154],86:[2,154],91:[2,154],93:[2,154],102:[2,154],104:[2,154],105:[2,154],106:[2,154],110:[2,154],118:[2,154],126:[2,154],128:[2,154],129:[2,154],132:[2,154],133:[2,154],134:[2,154],135:[2,154],136:[2,154],137:[2,154]},{25:[1,217],103:87,104:[1,65],106:[1,66],109:88,110:[1,68],111:69,126:[1,86],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[1,84],137:[1,85]},{120:218,122:219,123:[1,220]},{1:[2,97],6:[2,97],25:[2,97],26:[2,97],49:[2,97],54:[2,97],57:[2,97],73:[2,97],78:[2,97],86:[2,97],91:[2,97],93:[2,97],102:[2,97],104:[2,97],105:[2,97],106:[2,97],110:[2,97],118:[2,97],126:[2,97],128:[2,97],129:[2,97],132:[2,97],133:[2,97],134:[2,97],135:[2,97],136:[2,97],137:[2,97]},{8:221,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{1:[2,100],5:222,6:[2,100],25:[1,5],26:[2,100],49:[2,100],54:[2,100],57:[2,100],66:[2,72],67:[2,72],68:[2,72],69:[2,72],71:[2,72],73:[2,100],74:[2,72],78:[2,100],80:[1,223],84:[2,72],85:[2,72],86:[2,100],91:[2,100],93:[2,100],102:[2,100],104:[2,100],105:[2,100],106:[2,100],110:[2,100],118:[2,100],126:[2,100],128:[2,100],129:[2,100],132:[2,100],133:[2,100],134:[2,100],135:[2,100],136:[2,100],137:[2,100]},{1:[2,139],6:[2,139],25:[2,139],26:[2,139],49:[2,139],54:[2,139],57:[2,139],73:[2,139],78:[2,139],86:[2,139],91:[2,139],93:[2,139],102:[2,139],103:87,104:[2,139],105:[2,139],106:[2,139],109:88,110:[2,139],111:69,118:[2,139],126:[2,139],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[1,84],137:[1,85]},{1:[2,46],6:[2,46],26:[2,46],102:[2,46],103:87,104:[2,46],106:[2,46],109:88,110:[2,46],111:69,126:[2,46],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[1,84],137:[1,85]},{6:[1,74],102:[1,224]},{4:225,7:4,8:6,9:7,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{6:[2,129],25:[2,129],54:[2,129],57:[1,227],91:[2,129],92:226,93:[1,193],103:87,104:[1,65],106:[1,66],109:88,110:[1,68],111:69,126:[1,86],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[1,84],137:[1,85]},{1:[2,115],6:[2,115],25:[2,115],26:[2,115],40:[2,115],49:[2,115],54:[2,115],57:[2,115],66:[2,115],67:[2,115],68:[2,115],69:[2,115],71:[2,115],73:[2,115],74:[2,115],78:[2,115],84:[2,115],85:[2,115],86:[2,115],91:[2,115],93:[2,115],102:[2,115],104:[2,115],105:[2,115],106:[2,115],110:[2,115],116:[2,115],117:[2,115],118:[2,115],126:[2,115],128:[2,115],129:[2,115],132:[2,115],133:[2,115],134:[2,115],135:[2,115],136:[2,115],137:[2,115]},{6:[2,53],25:[2,53],53:228,54:[1,229],91:[2,53]},{6:[2,124],25:[2,124],26:[2,124],54:[2,124],86:[2,124],91:[2,124]},{8:202,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,25:[1,147],27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,60:148,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],87:230,88:[1,58],89:[1,59],90:[1,57],94:146,96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{6:[2,130],25:[2,130],26:[2,130],54:[2,130],86:[2,130],91:[2,130]},{1:[2,114],6:[2,114],25:[2,114],26:[2,114],40:[2,114],43:[2,114],49:[2,114],54:[2,114],57:[2,114],66:[2,114],67:[2,114],68:[2,114],69:[2,114],71:[2,114],73:[2,114],74:[2,114],78:[2,114],80:[2,114],84:[2,114],85:[2,114],86:[2,114],91:[2,114],93:[2,114],102:[2,114],104:[2,114],105:[2,114],106:[2,114],110:[2,114],116:[2,114],117:[2,114],118:[2,114],126:[2,114],128:[2,114],129:[2,114],130:[2,114],131:[2,114],132:[2,114],133:[2,114],134:[2,114],135:[2,114],136:[2,114],137:[2,114],138:[2,114]},{5:231,25:[1,5],103:87,104:[1,65],106:[1,66],109:88,110:[1,68],111:69,126:[1,86],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[1,84],137:[1,85]},{1:[2,142],6:[2,142],25:[2,142],26:[2,142],49:[2,142],54:[2,142],57:[2,142],73:[2,142],78:[2,142],86:[2,142],91:[2,142],93:[2,142],102:[2,142],103:87,104:[1,65],105:[1,232],106:[1,66],109:88,110:[1,68],111:69,118:[2,142],126:[2,142],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[1,84],137:[1,85]},{1:[2,144],6:[2,144],25:[2,144],26:[2,144],49:[2,144],54:[2,144],57:[2,144],73:[2,144],78:[2,144],86:[2,144],91:[2,144],93:[2,144],102:[2,144],103:87,104:[1,65],105:[1,233],106:[1,66],109:88,110:[1,68],111:69,118:[2,144],126:[2,144],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[1,84],137:[1,85]},{1:[2,150],6:[2,150],25:[2,150],26:[2,150],49:[2,150],54:[2,150],57:[2,150],73:[2,150],78:[2,150],86:[2,150],91:[2,150],93:[2,150],102:[2,150],104:[2,150],105:[2,150],106:[2,150],110:[2,150],118:[2,150],126:[2,150],128:[2,150],129:[2,150],132:[2,150],133:[2,150],134:[2,150],135:[2,150],136:[2,150],137:[2,150]},{1:[2,151],6:[2,151],25:[2,151],26:[2,151],49:[2,151],54:[2,151],57:[2,151],73:[2,151],78:[2,151],86:[2,151],91:[2,151],93:[2,151],102:[2,151],103:87,104:[1,65],105:[2,151],106:[1,66],109:88,110:[1,68],111:69,118:[2,151],126:[2,151],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[1,84],137:[1,85]},{1:[2,155],6:[2,155],25:[2,155],26:[2,155],49:[2,155],54:[2,155],57:[2,155],73:[2,155],78:[2,155],86:[2,155],91:[2,155],93:[2,155],102:[2,155],104:[2,155],105:[2,155],106:[2,155],110:[2,155],118:[2,155],126:[2,155],128:[2,155],129:[2,155],132:[2,155],133:[2,155],134:[2,155],135:[2,155],136:[2,155],137:[2,155]},{116:[2,157],117:[2,157]},{27:159,28:[1,73],44:160,58:161,59:162,76:[1,70],89:[1,114],90:[1,115],113:234,115:158},{54:[1,235],116:[2,163],117:[2,163]},{54:[2,159],116:[2,159],117:[2,159]},{54:[2,160],116:[2,160],117:[2,160]},{54:[2,161],116:[2,161],117:[2,161]},{54:[2,162],116:[2,162],117:[2,162]},{1:[2,156],6:[2,156],25:[2,156],26:[2,156],49:[2,156],54:[2,156],57:[2,156],73:[2,156],78:[2,156],86:[2,156],91:[2,156],93:[2,156],102:[2,156],104:[2,156],105:[2,156],106:[2,156],110:[2,156],118:[2,156],126:[2,156],128:[2,156],129:[2,156],132:[2,156],133:[2,156],134:[2,156],135:[2,156],136:[2,156],137:[2,156]},{8:236,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{8:237,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{6:[2,53],25:[2,53],53:238,54:[1,239],78:[2,53]},{6:[2,92],25:[2,92],26:[2,92],54:[2,92],78:[2,92]},{6:[2,39],25:[2,39],26:[2,39],43:[1,240],54:[2,39],78:[2,39]},{6:[2,42],25:[2,42],26:[2,42],54:[2,42],78:[2,42]},{6:[2,43],25:[2,43],26:[2,43],43:[2,43],54:[2,43],78:[2,43]},{6:[2,44],25:[2,44],26:[2,44],43:[2,44],54:[2,44],78:[2,44]},{6:[2,45],25:[2,45],26:[2,45],43:[2,45],54:[2,45],78:[2,45]},{1:[2,5],6:[2,5],26:[2,5],102:[2,5]},{1:[2,25],6:[2,25],25:[2,25],26:[2,25],49:[2,25],54:[2,25],57:[2,25],73:[2,25],78:[2,25],86:[2,25],91:[2,25],93:[2,25],98:[2,25],99:[2,25],102:[2,25],104:[2,25],105:[2,25],106:[2,25],110:[2,25],118:[2,25],121:[2,25],123:[2,25],126:[2,25],128:[2,25],129:[2,25],132:[2,25],133:[2,25],134:[2,25],135:[2,25],136:[2,25],137:[2,25]},{1:[2,194],6:[2,194],25:[2,194],26:[2,194],49:[2,194],54:[2,194],57:[2,194],73:[2,194],78:[2,194],86:[2,194],91:[2,194],93:[2,194],102:[2,194],103:87,104:[2,194],105:[2,194],106:[2,194],109:88,110:[2,194],111:69,118:[2,194],126:[2,194],128:[2,194],129:[2,194],132:[1,78],133:[1,81],134:[2,194],135:[2,194],136:[2,194],137:[2,194]},{1:[2,195],6:[2,195],25:[2,195],26:[2,195],49:[2,195],54:[2,195],57:[2,195],73:[2,195],78:[2,195],86:[2,195],91:[2,195],93:[2,195],102:[2,195],103:87,104:[2,195],105:[2,195],106:[2,195],109:88,110:[2,195],111:69,118:[2,195],126:[2,195],128:[2,195],129:[2,195],132:[1,78],133:[1,81],134:[2,195],135:[2,195],136:[2,195],137:[2,195]},{1:[2,196],6:[2,196],25:[2,196],26:[2,196],49:[2,196],54:[2,196],57:[2,196],73:[2,196],78:[2,196],86:[2,196],91:[2,196],93:[2,196],102:[2,196],103:87,104:[2,196],105:[2,196],106:[2,196],109:88,110:[2,196],111:69,118:[2,196],126:[2,196],128:[2,196],129:[2,196],132:[1,78],133:[2,196],134:[2,196],135:[2,196],136:[2,196],137:[2,196]},{1:[2,197],6:[2,197],25:[2,197],26:[2,197],49:[2,197],54:[2,197],57:[2,197],73:[2,197],78:[2,197],86:[2,197],91:[2,197],93:[2,197],102:[2,197],103:87,104:[2,197],105:[2,197],106:[2,197],109:88,110:[2,197],111:69,118:[2,197],126:[2,197],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[2,197],135:[2,197],136:[2,197],137:[2,197]},{1:[2,198],6:[2,198],25:[2,198],26:[2,198],49:[2,198],54:[2,198],57:[2,198],73:[2,198],78:[2,198],86:[2,198],91:[2,198],93:[2,198],102:[2,198],103:87,104:[2,198],105:[2,198],106:[2,198],109:88,110:[2,198],111:69,118:[2,198],126:[2,198],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[2,198],136:[2,198],137:[1,85]},{1:[2,199],6:[2,199],25:[2,199],26:[2,199],49:[2,199],54:[2,199],57:[2,199],73:[2,199],78:[2,199],86:[2,199],91:[2,199],93:[2,199],102:[2,199],103:87,104:[2,199],105:[2,199],106:[2,199],109:88,110:[2,199],111:69,118:[2,199],126:[2,199],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[2,199],137:[1,85]},{1:[2,200],6:[2,200],25:[2,200],26:[2,200],49:[2,200],54:[2,200],57:[2,200],73:[2,200],78:[2,200],86:[2,200],91:[2,200],93:[2,200],102:[2,200],103:87,104:[2,200],105:[2,200],106:[2,200],109:88,110:[2,200],111:69,118:[2,200],126:[2,200],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[2,200],136:[2,200],137:[2,200]},{1:[2,185],6:[2,185],25:[2,185],26:[2,185],49:[2,185],54:[2,185],57:[2,185],73:[2,185],78:[2,185],86:[2,185],91:[2,185],93:[2,185],102:[2,185],103:87,104:[1,65],105:[2,185],106:[1,66],109:88,110:[1,68],111:69,118:[2,185],126:[1,86],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[1,84],137:[1,85]},{1:[2,184],6:[2,184],25:[2,184],26:[2,184],49:[2,184],54:[2,184],57:[2,184],73:[2,184],78:[2,184],86:[2,184],91:[2,184],93:[2,184],102:[2,184],103:87,104:[1,65],105:[2,184],106:[1,66],109:88,110:[1,68],111:69,118:[2,184],126:[1,86],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[1,84],137:[1,85]},{1:[2,104],6:[2,104],25:[2,104],26:[2,104],49:[2,104],54:[2,104],57:[2,104],66:[2,104],67:[2,104],68:[2,104],69:[2,104],71:[2,104],73:[2,104],74:[2,104],78:[2,104],84:[2,104],85:[2,104],86:[2,104],91:[2,104],93:[2,104],102:[2,104],104:[2,104],105:[2,104],106:[2,104],110:[2,104],118:[2,104],126:[2,104],128:[2,104],129:[2,104],132:[2,104],133:[2,104],134:[2,104],135:[2,104],136:[2,104],137:[2,104]},{1:[2,80],6:[2,80],25:[2,80],26:[2,80],40:[2,80],49:[2,80],54:[2,80],57:[2,80],66:[2,80],67:[2,80],68:[2,80],69:[2,80],71:[2,80],73:[2,80],74:[2,80],78:[2,80],80:[2,80],84:[2,80],85:[2,80],86:[2,80],91:[2,80],93:[2,80],102:[2,80],104:[2,80],105:[2,80],106:[2,80],110:[2,80],118:[2,80],126:[2,80],128:[2,80],129:[2,80],130:[2,80],131:[2,80],132:[2,80],133:[2,80],134:[2,80],135:[2,80],136:[2,80],137:[2,80],138:[2,80]},{1:[2,81],6:[2,81],25:[2,81],26:[2,81],40:[2,81],49:[2,81],54:[2,81],57:[2,81],66:[2,81],67:[2,81],68:[2,81],69:[2,81],71:[2,81],73:[2,81],74:[2,81],78:[2,81],80:[2,81],84:[2,81],85:[2,81],86:[2,81],91:[2,81],93:[2,81],102:[2,81],104:[2,81],105:[2,81],106:[2,81],110:[2,81],118:[2,81],126:[2,81],128:[2,81],129:[2,81],130:[2,81],131:[2,81],132:[2,81],133:[2,81],134:[2,81],135:[2,81],136:[2,81],137:[2,81],138:[2,81]},{1:[2,82],6:[2,82],25:[2,82],26:[2,82],40:[2,82],49:[2,82],54:[2,82],57:[2,82],66:[2,82],67:[2,82],68:[2,82],69:[2,82],71:[2,82],73:[2,82],74:[2,82],78:[2,82],80:[2,82],84:[2,82],85:[2,82],86:[2,82],91:[2,82],93:[2,82],102:[2,82],104:[2,82],105:[2,82],106:[2,82],110:[2,82],118:[2,82],126:[2,82],128:[2,82],129:[2,82],130:[2,82],131:[2,82],132:[2,82],133:[2,82],134:[2,82],135:[2,82],136:[2,82],137:[2,82],138:[2,82]},{1:[2,83],6:[2,83],25:[2,83],26:[2,83],40:[2,83],49:[2,83],54:[2,83],57:[2,83],66:[2,83],67:[2,83],68:[2,83],69:[2,83],71:[2,83],73:[2,83],74:[2,83],78:[2,83],80:[2,83],84:[2,83],85:[2,83],86:[2,83],91:[2,83],93:[2,83],102:[2,83],104:[2,83],105:[2,83],106:[2,83],110:[2,83],118:[2,83],126:[2,83],128:[2,83],129:[2,83],130:[2,83],131:[2,83],132:[2,83],133:[2,83],134:[2,83],135:[2,83],136:[2,83],137:[2,83],138:[2,83]},{73:[1,241]},{57:[1,194],73:[2,88],92:242,93:[1,193],103:87,104:[1,65],106:[1,66],109:88,110:[1,68],111:69,126:[1,86],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[1,84],137:[1,85]},{73:[2,89]},{8:243,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,73:[2,123],76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{12:[2,117],28:[2,117],30:[2,117],31:[2,117],33:[2,117],34:[2,117],35:[2,117],36:[2,117],37:[2,117],38:[2,117],45:[2,117],46:[2,117],47:[2,117],51:[2,117],52:[2,117],73:[2,117],76:[2,117],79:[2,117],83:[2,117],88:[2,117],89:[2,117],90:[2,117],96:[2,117],100:[2,117],101:[2,117],104:[2,117],106:[2,117],108:[2,117],110:[2,117],119:[2,117],125:[2,117],127:[2,117],128:[2,117],129:[2,117],130:[2,117],131:[2,117]},{12:[2,118],28:[2,118],30:[2,118],31:[2,118],33:[2,118],34:[2,118],35:[2,118],36:[2,118],37:[2,118],38:[2,118],45:[2,118],46:[2,118],47:[2,118],51:[2,118],52:[2,118],73:[2,118],76:[2,118],79:[2,118],83:[2,118],88:[2,118],89:[2,118],90:[2,118],96:[2,118],100:[2,118],101:[2,118],104:[2,118],106:[2,118],108:[2,118],110:[2,118],119:[2,118],125:[2,118],127:[2,118],128:[2,118],129:[2,118],130:[2,118],131:[2,118]},{1:[2,87],6:[2,87],25:[2,87],26:[2,87],40:[2,87],49:[2,87],54:[2,87],57:[2,87],66:[2,87],67:[2,87],68:[2,87],69:[2,87],71:[2,87],73:[2,87],74:[2,87],78:[2,87],80:[2,87],84:[2,87],85:[2,87],86:[2,87],91:[2,87],93:[2,87],102:[2,87],104:[2,87],105:[2,87],106:[2,87],110:[2,87],118:[2,87],126:[2,87],128:[2,87],129:[2,87],130:[2,87],131:[2,87],132:[2,87],133:[2,87],134:[2,87],135:[2,87],136:[2,87],137:[2,87],138:[2,87]},{1:[2,105],6:[2,105],25:[2,105],26:[2,105],49:[2,105],54:[2,105],57:[2,105],66:[2,105],67:[2,105],68:[2,105],69:[2,105],71:[2,105],73:[2,105],74:[2,105],78:[2,105],84:[2,105],85:[2,105],86:[2,105],91:[2,105],93:[2,105],102:[2,105],104:[2,105],105:[2,105],106:[2,105],110:[2,105],118:[2,105],126:[2,105],128:[2,105],129:[2,105],132:[2,105],133:[2,105],134:[2,105],135:[2,105],136:[2,105],137:[2,105]},{1:[2,36],6:[2,36],25:[2,36],26:[2,36],49:[2,36],54:[2,36],57:[2,36],73:[2,36],78:[2,36],86:[2,36],91:[2,36],93:[2,36],102:[2,36],103:87,104:[2,36],105:[2,36],106:[2,36],109:88,110:[2,36],111:69,118:[2,36],126:[2,36],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[1,84],137:[1,85]},{8:244,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{8:245,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{1:[2,110],6:[2,110],25:[2,110],26:[2,110],49:[2,110],54:[2,110],57:[2,110],66:[2,110],67:[2,110],68:[2,110],69:[2,110],71:[2,110],73:[2,110],74:[2,110],78:[2,110],84:[2,110],85:[2,110],86:[2,110],91:[2,110],93:[2,110],102:[2,110],104:[2,110],105:[2,110],106:[2,110],110:[2,110],118:[2,110],126:[2,110],128:[2,110],129:[2,110],132:[2,110],133:[2,110],134:[2,110],135:[2,110],136:[2,110],137:[2,110]},{6:[2,53],25:[2,53],53:246,54:[1,229],86:[2,53]},{6:[2,129],25:[2,129],26:[2,129],54:[2,129],57:[1,247],86:[2,129],91:[2,129],103:87,104:[1,65],106:[1,66],109:88,110:[1,68],111:69,126:[1,86],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[1,84],137:[1,85]},{50:248,51:[1,60],52:[1,61]},{6:[2,54],25:[2,54],26:[2,54],27:110,28:[1,73],44:111,55:249,56:109,58:112,59:113,76:[1,70],89:[1,114],90:[1,115]},{6:[1,250],25:[1,251]},{6:[2,61],25:[2,61],26:[2,61],49:[2,61],54:[2,61]},{8:252,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{1:[2,201],6:[2,201],25:[2,201],26:[2,201],49:[2,201],54:[2,201],57:[2,201],73:[2,201],78:[2,201],86:[2,201],91:[2,201],93:[2,201],102:[2,201],103:87,104:[2,201],105:[2,201],106:[2,201],109:88,110:[2,201],111:69,118:[2,201],126:[2,201],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[1,84],137:[1,85]},{8:253,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{8:254,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{1:[2,204],6:[2,204],25:[2,204],26:[2,204],49:[2,204],54:[2,204],57:[2,204],73:[2,204],78:[2,204],86:[2,204],91:[2,204],93:[2,204],102:[2,204],103:87,104:[2,204],105:[2,204],106:[2,204],109:88,110:[2,204],111:69,118:[2,204],126:[2,204],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[1,84],137:[1,85]},{1:[2,183],6:[2,183],25:[2,183],26:[2,183],49:[2,183],54:[2,183],57:[2,183],73:[2,183],78:[2,183],86:[2,183],91:[2,183],93:[2,183],102:[2,183],104:[2,183],105:[2,183],106:[2,183],110:[2,183],118:[2,183],126:[2,183],128:[2,183],129:[2,183],132:[2,183],133:[2,183],134:[2,183],135:[2,183],136:[2,183],137:[2,183]},{8:255,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{1:[2,134],6:[2,134],25:[2,134],26:[2,134],49:[2,134],54:[2,134],57:[2,134],73:[2,134],78:[2,134],86:[2,134],91:[2,134],93:[2,134],98:[1,256],102:[2,134],104:[2,134],105:[2,134],106:[2,134],110:[2,134],118:[2,134],126:[2,134],128:[2,134],129:[2,134],132:[2,134],133:[2,134],134:[2,134],135:[2,134],136:[2,134],137:[2,134]},{5:257,25:[1,5]},{27:258,28:[1,73],59:259,76:[1,70]},{120:260,122:219,123:[1,220]},{26:[1,261],121:[1,262],122:263,123:[1,220]},{26:[2,176],121:[2,176],123:[2,176]},{8:265,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],95:264,96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{1:[2,98],5:266,6:[2,98],25:[1,5],26:[2,98],49:[2,98],54:[2,98],57:[2,98],73:[2,98],78:[2,98],86:[2,98],91:[2,98],93:[2,98],102:[2,98],103:87,104:[1,65],105:[2,98],106:[1,66],109:88,110:[1,68],111:69,118:[2,98],126:[2,98],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[1,84],137:[1,85]},{1:[2,101],6:[2,101],25:[2,101],26:[2,101],49:[2,101],54:[2,101],57:[2,101],73:[2,101],78:[2,101],86:[2,101],91:[2,101],93:[2,101],102:[2,101],104:[2,101],105:[2,101],106:[2,101],110:[2,101],118:[2,101],126:[2,101],128:[2,101],129:[2,101],132:[2,101],133:[2,101],134:[2,101],135:[2,101],136:[2,101],137:[2,101]},{8:267,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{1:[2,140],6:[2,140],25:[2,140],26:[2,140],49:[2,140],54:[2,140],57:[2,140],66:[2,140],67:[2,140],68:[2,140],69:[2,140],71:[2,140],73:[2,140],74:[2,140],78:[2,140],84:[2,140],85:[2,140],86:[2,140],91:[2,140],93:[2,140],102:[2,140],104:[2,140],105:[2,140],106:[2,140],110:[2,140],118:[2,140],126:[2,140],128:[2,140],129:[2,140],132:[2,140],133:[2,140],134:[2,140],135:[2,140],136:[2,140],137:[2,140]},{6:[1,74],26:[1,268]},{8:269,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{6:[2,67],12:[2,118],25:[2,67],28:[2,118],30:[2,118],31:[2,118],33:[2,118],34:[2,118],35:[2,118],36:[2,118],37:[2,118],38:[2,118],45:[2,118],46:[2,118],47:[2,118],51:[2,118],52:[2,118],54:[2,67],76:[2,118],79:[2,118],83:[2,118],88:[2,118],89:[2,118],90:[2,118],91:[2,67],96:[2,118],100:[2,118],101:[2,118],104:[2,118],106:[2,118],108:[2,118],110:[2,118],119:[2,118],125:[2,118],127:[2,118],128:[2,118],129:[2,118],130:[2,118],131:[2,118]},{6:[1,271],25:[1,272],91:[1,270]},{6:[2,54],8:202,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,25:[2,54],26:[2,54],27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,60:148,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],86:[2,54],88:[1,58],89:[1,59],90:[1,57],91:[2,54],94:273,96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{6:[2,53],25:[2,53],26:[2,53],53:274,54:[1,229]},{1:[2,180],6:[2,180],25:[2,180],26:[2,180],49:[2,180],54:[2,180],57:[2,180],73:[2,180],78:[2,180],86:[2,180],91:[2,180],93:[2,180],102:[2,180],104:[2,180],105:[2,180],106:[2,180],110:[2,180],118:[2,180],121:[2,180],126:[2,180],128:[2,180],129:[2,180],132:[2,180],133:[2,180],134:[2,180],135:[2,180],136:[2,180],137:[2,180]},{8:275,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{8:276,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{116:[2,158],117:[2,158]},{27:159,28:[1,73],44:160,58:161,59:162,76:[1,70],89:[1,114],90:[1,115],115:277},{1:[2,165],6:[2,165],25:[2,165],26:[2,165],49:[2,165],54:[2,165],57:[2,165],73:[2,165],78:[2,165],86:[2,165],91:[2,165],93:[2,165],102:[2,165],103:87,104:[2,165],105:[1,278],106:[2,165],109:88,110:[2,165],111:69,118:[1,279],126:[2,165],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[1,84],137:[1,85]},{1:[2,166],6:[2,166],25:[2,166],26:[2,166],49:[2,166],54:[2,166],57:[2,166],73:[2,166],78:[2,166],86:[2,166],91:[2,166],93:[2,166],102:[2,166],103:87,104:[2,166],105:[1,280],106:[2,166],109:88,110:[2,166],111:69,118:[2,166],126:[2,166],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[1,84],137:[1,85]},{6:[1,282],25:[1,283],78:[1,281]},{6:[2,54],11:169,25:[2,54],26:[2,54],27:170,28:[1,73],29:171,30:[1,71],31:[1,72],41:284,42:168,44:172,46:[1,46],78:[2,54],89:[1,114]},{8:285,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,25:[1,286],27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{1:[2,86],6:[2,86],25:[2,86],26:[2,86],40:[2,86],49:[2,86],54:[2,86],57:[2,86],66:[2,86],67:[2,86],68:[2,86],69:[2,86],71:[2,86],73:[2,86],74:[2,86],78:[2,86],80:[2,86],84:[2,86],85:[2,86],86:[2,86],91:[2,86],93:[2,86],102:[2,86],104:[2,86],105:[2,86],106:[2,86],110:[2,86],118:[2,86],126:[2,86],128:[2,86],129:[2,86],130:[2,86],131:[2,86],132:[2,86],133:[2,86],134:[2,86],135:[2,86],136:[2,86],137:[2,86],138:[2,86]},{8:287,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,73:[2,121],76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{73:[2,122],103:87,104:[1,65],106:[1,66],109:88,110:[1,68],111:69,126:[1,86],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[1,84],137:[1,85]},{1:[2,37],6:[2,37],25:[2,37],26:[2,37],49:[2,37],54:[2,37],57:[2,37],73:[2,37],78:[2,37],86:[2,37],91:[2,37],93:[2,37],102:[2,37],103:87,104:[2,37],105:[2,37],106:[2,37],109:88,110:[2,37],111:69,118:[2,37],126:[2,37],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[1,84],137:[1,85]},{26:[1,288],103:87,104:[1,65],106:[1,66],109:88,110:[1,68],111:69,126:[1,86],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[1,84],137:[1,85]},{6:[1,271],25:[1,272],86:[1,289]},{6:[2,67],25:[2,67],26:[2,67],54:[2,67],86:[2,67],91:[2,67]},{5:290,25:[1,5]},{6:[2,57],25:[2,57],26:[2,57],49:[2,57],54:[2,57]},{27:110,28:[1,73],44:111,55:291,56:109,58:112,59:113,76:[1,70],89:[1,114],90:[1,115]},{6:[2,55],25:[2,55],26:[2,55],27:110,28:[1,73],44:111,48:292,54:[2,55],55:108,56:109,58:112,59:113,76:[1,70],89:[1,114],90:[1,115]},{6:[2,62],25:[2,62],26:[2,62],49:[2,62],54:[2,62],103:87,104:[1,65],106:[1,66],109:88,110:[1,68],111:69,126:[1,86],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[1,84],137:[1,85]},{26:[1,293],103:87,104:[1,65],106:[1,66],109:88,110:[1,68],111:69,126:[1,86],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[1,84],137:[1,85]},{1:[2,203],6:[2,203],25:[2,203],26:[2,203],49:[2,203],54:[2,203],57:[2,203],73:[2,203],78:[2,203],86:[2,203],91:[2,203],93:[2,203],102:[2,203],103:87,104:[2,203],105:[2,203],106:[2,203],109:88,110:[2,203],111:69,118:[2,203],126:[2,203],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[1,84],137:[1,85]},{5:294,25:[1,5],103:87,104:[1,65],106:[1,66],109:88,110:[1,68],111:69,126:[1,86],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[1,84],137:[1,85]},{5:295,25:[1,5]},{1:[2,135],6:[2,135],25:[2,135],26:[2,135],49:[2,135],54:[2,135],57:[2,135],73:[2,135],78:[2,135],86:[2,135],91:[2,135],93:[2,135],102:[2,135],104:[2,135],105:[2,135],106:[2,135],110:[2,135],118:[2,135],126:[2,135],128:[2,135],129:[2,135],132:[2,135],133:[2,135],134:[2,135],135:[2,135],136:[2,135],137:[2,135]},{5:296,25:[1,5]},{5:297,25:[1,5]},{26:[1,298],121:[1,299],122:263,123:[1,220]},{1:[2,174],6:[2,174],25:[2,174],26:[2,174],49:[2,174],54:[2,174],57:[2,174],73:[2,174],78:[2,174],86:[2,174],91:[2,174],93:[2,174],102:[2,174],104:[2,174],105:[2,174],106:[2,174],110:[2,174],118:[2,174],126:[2,174],128:[2,174],129:[2,174],132:[2,174],133:[2,174],134:[2,174],135:[2,174],136:[2,174],137:[2,174]},{5:300,25:[1,5]},{26:[2,177],121:[2,177],123:[2,177]},{5:301,25:[1,5],54:[1,302]},{25:[2,131],54:[2,131],103:87,104:[1,65],106:[1,66],109:88,110:[1,68],111:69,126:[1,86],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[1,84],137:[1,85]},{1:[2,99],6:[2,99],25:[2,99],26:[2,99],49:[2,99],54:[2,99],57:[2,99],73:[2,99],78:[2,99],86:[2,99],91:[2,99],93:[2,99],102:[2,99],104:[2,99],105:[2,99],106:[2,99],110:[2,99],118:[2,99],126:[2,99],128:[2,99],129:[2,99],132:[2,99],133:[2,99],134:[2,99],135:[2,99],136:[2,99],137:[2,99]},{1:[2,102],5:303,6:[2,102],25:[1,5],26:[2,102],49:[2,102],54:[2,102],57:[2,102],73:[2,102],78:[2,102],86:[2,102],91:[2,102],93:[2,102],102:[2,102],103:87,104:[1,65],105:[2,102],106:[1,66],109:88,110:[1,68],111:69,118:[2,102],126:[2,102],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[1,84],137:[1,85]},{102:[1,304]},{91:[1,305],103:87,104:[1,65],106:[1,66],109:88,110:[1,68],111:69,126:[1,86],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[1,84],137:[1,85]},{1:[2,116],6:[2,116],25:[2,116],26:[2,116],40:[2,116],49:[2,116],54:[2,116],57:[2,116],66:[2,116],67:[2,116],68:[2,116],69:[2,116],71:[2,116],73:[2,116],74:[2,116],78:[2,116],84:[2,116],85:[2,116],86:[2,116],91:[2,116],93:[2,116],102:[2,116],104:[2,116],105:[2,116],106:[2,116],110:[2,116],116:[2,116],117:[2,116],118:[2,116],126:[2,116],128:[2,116],129:[2,116],132:[2,116],133:[2,116],134:[2,116],135:[2,116],136:[2,116],137:[2,116]},{8:202,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,60:148,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],94:306,96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{8:202,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,25:[1,147],27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,60:148,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],87:307,88:[1,58],89:[1,59],90:[1,57],94:146,96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{6:[2,125],25:[2,125],26:[2,125],54:[2,125],86:[2,125],91:[2,125]},{6:[1,271],25:[1,272],26:[1,308]},{1:[2,143],6:[2,143],25:[2,143],26:[2,143],49:[2,143],54:[2,143],57:[2,143],73:[2,143],78:[2,143],86:[2,143],91:[2,143],93:[2,143],102:[2,143],103:87,104:[1,65],105:[2,143],106:[1,66],109:88,110:[1,68],111:69,118:[2,143],126:[2,143],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[1,84],137:[1,85]},{1:[2,145],6:[2,145],25:[2,145],26:[2,145],49:[2,145],54:[2,145],57:[2,145],73:[2,145],78:[2,145],86:[2,145],91:[2,145],93:[2,145],102:[2,145],103:87,104:[1,65],105:[2,145],106:[1,66],109:88,110:[1,68],111:69,118:[2,145],126:[2,145],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[1,84],137:[1,85]},{116:[2,164],117:[2,164]},{8:309,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{8:310,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{8:311,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{1:[2,90],6:[2,90],25:[2,90],26:[2,90],40:[2,90],49:[2,90],54:[2,90],57:[2,90],66:[2,90],67:[2,90],68:[2,90],69:[2,90],71:[2,90],73:[2,90],74:[2,90],78:[2,90],84:[2,90],85:[2,90],86:[2,90],91:[2,90],93:[2,90],102:[2,90],104:[2,90],105:[2,90],106:[2,90],110:[2,90],116:[2,90],117:[2,90],118:[2,90],126:[2,90],128:[2,90],129:[2,90],132:[2,90],133:[2,90],134:[2,90],135:[2,90],136:[2,90],137:[2,90]},{11:169,27:170,28:[1,73],29:171,30:[1,71],31:[1,72],41:312,42:168,44:172,46:[1,46],89:[1,114]},{6:[2,91],11:169,25:[2,91],26:[2,91],27:170,28:[1,73],29:171,30:[1,71],31:[1,72],41:167,42:168,44:172,46:[1,46],54:[2,91],77:313,89:[1,114]},{6:[2,93],25:[2,93],26:[2,93],54:[2,93],78:[2,93]},{6:[2,40],25:[2,40],26:[2,40],54:[2,40],78:[2,40],103:87,104:[1,65],106:[1,66],109:88,110:[1,68],111:69,126:[1,86],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[1,84],137:[1,85]},{8:314,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{73:[2,120],103:87,104:[1,65],106:[1,66],109:88,110:[1,68],111:69,126:[1,86],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[1,84],137:[1,85]},{1:[2,38],6:[2,38],25:[2,38],26:[2,38],49:[2,38],54:[2,38],57:[2,38],73:[2,38],78:[2,38],86:[2,38],91:[2,38],93:[2,38],102:[2,38],104:[2,38],105:[2,38],106:[2,38],110:[2,38],118:[2,38],126:[2,38],128:[2,38],129:[2,38],132:[2,38],133:[2,38],134:[2,38],135:[2,38],136:[2,38],137:[2,38]},{1:[2,111],6:[2,111],25:[2,111],26:[2,111],49:[2,111],54:[2,111],57:[2,111],66:[2,111],67:[2,111],68:[2,111],69:[2,111],71:[2,111],73:[2,111],74:[2,111],78:[2,111],84:[2,111],85:[2,111],86:[2,111],91:[2,111],93:[2,111],102:[2,111],104:[2,111],105:[2,111],106:[2,111],110:[2,111],118:[2,111],126:[2,111],128:[2,111],129:[2,111],132:[2,111],133:[2,111],134:[2,111],135:[2,111],136:[2,111],137:[2,111]},{1:[2,49],6:[2,49],25:[2,49],26:[2,49],49:[2,49],54:[2,49],57:[2,49],73:[2,49],78:[2,49],86:[2,49],91:[2,49],93:[2,49],102:[2,49],104:[2,49],105:[2,49],106:[2,49],110:[2,49],118:[2,49],126:[2,49],128:[2,49],129:[2,49],132:[2,49],133:[2,49],134:[2,49],135:[2,49],136:[2,49],137:[2,49]},{6:[2,58],25:[2,58],26:[2,58],49:[2,58],54:[2,58]},{6:[2,53],25:[2,53],26:[2,53],53:315,54:[1,204]},{1:[2,202],6:[2,202],25:[2,202],26:[2,202],49:[2,202],54:[2,202],57:[2,202],73:[2,202],78:[2,202],86:[2,202],91:[2,202],93:[2,202],102:[2,202],104:[2,202],105:[2,202],106:[2,202],110:[2,202],118:[2,202],126:[2,202],128:[2,202],129:[2,202],132:[2,202],133:[2,202],134:[2,202],135:[2,202],136:[2,202],137:[2,202]},{1:[2,181],6:[2,181],25:[2,181],26:[2,181],49:[2,181],54:[2,181],57:[2,181],73:[2,181],78:[2,181],86:[2,181],91:[2,181],93:[2,181],102:[2,181],104:[2,181],105:[2,181],106:[2,181],110:[2,181],118:[2,181],121:[2,181],126:[2,181],128:[2,181],129:[2,181],132:[2,181],133:[2,181],134:[2,181],135:[2,181],136:[2,181],137:[2,181]},{1:[2,136],6:[2,136],25:[2,136],26:[2,136],49:[2,136],54:[2,136],57:[2,136],73:[2,136],78:[2,136],86:[2,136],91:[2,136],93:[2,136],102:[2,136],104:[2,136],105:[2,136],106:[2,136],110:[2,136],118:[2,136],126:[2,136],128:[2,136],129:[2,136],132:[2,136],133:[2,136],134:[2,136],135:[2,136],136:[2,136],137:[2,136]},{1:[2,137],6:[2,137],25:[2,137],26:[2,137],49:[2,137],54:[2,137],57:[2,137],73:[2,137],78:[2,137],86:[2,137],91:[2,137],93:[2,137],98:[2,137],102:[2,137],104:[2,137],105:[2,137],106:[2,137],110:[2,137],118:[2,137],126:[2,137],128:[2,137],129:[2,137],132:[2,137],133:[2,137],134:[2,137],135:[2,137],136:[2,137],137:[2,137]},{1:[2,138],6:[2,138],25:[2,138],26:[2,138],49:[2,138],54:[2,138],57:[2,138],73:[2,138],78:[2,138],86:[2,138],91:[2,138],93:[2,138],98:[2,138],102:[2,138],104:[2,138],105:[2,138],106:[2,138],110:[2,138],118:[2,138],126:[2,138],128:[2,138],129:[2,138],132:[2,138],133:[2,138],134:[2,138],135:[2,138],136:[2,138],137:[2,138]},{1:[2,172],6:[2,172],25:[2,172],26:[2,172],49:[2,172],54:[2,172],57:[2,172],73:[2,172],78:[2,172],86:[2,172],91:[2,172],93:[2,172],102:[2,172],104:[2,172],105:[2,172],106:[2,172],110:[2,172],118:[2,172],126:[2,172],128:[2,172],129:[2,172],132:[2,172],133:[2,172],134:[2,172],135:[2,172],136:[2,172],137:[2,172]},{5:316,25:[1,5]},{26:[1,317]},{6:[1,318],26:[2,178],121:[2,178],123:[2,178]},{8:319,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{1:[2,103],6:[2,103],25:[2,103],26:[2,103],49:[2,103],54:[2,103],57:[2,103],73:[2,103],78:[2,103],86:[2,103],91:[2,103],93:[2,103],102:[2,103],104:[2,103],105:[2,103],106:[2,103],110:[2,103],118:[2,103],126:[2,103],128:[2,103],129:[2,103],132:[2,103],133:[2,103],134:[2,103],135:[2,103],136:[2,103],137:[2,103]},{1:[2,141],6:[2,141],25:[2,141],26:[2,141],49:[2,141],54:[2,141],57:[2,141],66:[2,141],67:[2,141],68:[2,141],69:[2,141],71:[2,141],73:[2,141],74:[2,141],78:[2,141],84:[2,141],85:[2,141],86:[2,141],91:[2,141],93:[2,141],102:[2,141],104:[2,141],105:[2,141],106:[2,141],110:[2,141],118:[2,141],126:[2,141],128:[2,141],129:[2,141],132:[2,141],133:[2,141],134:[2,141],135:[2,141],136:[2,141],137:[2,141]},{1:[2,119],6:[2,119],25:[2,119],26:[2,119],49:[2,119],54:[2,119],57:[2,119],66:[2,119],67:[2,119],68:[2,119],69:[2,119],71:[2,119],73:[2,119],74:[2,119],78:[2,119],84:[2,119],85:[2,119],86:[2,119],91:[2,119],93:[2,119],102:[2,119],104:[2,119],105:[2,119],106:[2,119],110:[2,119],118:[2,119],126:[2,119],128:[2,119],129:[2,119],132:[2,119],133:[2,119],134:[2,119],135:[2,119],136:[2,119],137:[2,119]},{6:[2,126],25:[2,126],26:[2,126],54:[2,126],86:[2,126],91:[2,126]},{6:[2,53],25:[2,53],26:[2,53],53:320,54:[1,229]},{6:[2,127],25:[2,127],26:[2,127],54:[2,127],86:[2,127],91:[2,127]},{1:[2,167],6:[2,167],25:[2,167],26:[2,167],49:[2,167],54:[2,167],57:[2,167],73:[2,167],78:[2,167],86:[2,167],91:[2,167],93:[2,167],102:[2,167],103:87,104:[2,167],105:[2,167],106:[2,167],109:88,110:[2,167],111:69,118:[1,321],126:[2,167],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[1,84],137:[1,85]},{1:[2,169],6:[2,169],25:[2,169],26:[2,169],49:[2,169],54:[2,169],57:[2,169],73:[2,169],78:[2,169],86:[2,169],91:[2,169],93:[2,169],102:[2,169],103:87,104:[2,169],105:[1,322],106:[2,169],109:88,110:[2,169],111:69,118:[2,169],126:[2,169],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[1,84],137:[1,85]},{1:[2,168],6:[2,168],25:[2,168],26:[2,168],49:[2,168],54:[2,168],57:[2,168],73:[2,168],78:[2,168],86:[2,168],91:[2,168],93:[2,168],102:[2,168],103:87,104:[2,168],105:[2,168],106:[2,168],109:88,110:[2,168],111:69,118:[2,168],126:[2,168],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[1,84],137:[1,85]},{6:[2,94],25:[2,94],26:[2,94],54:[2,94],78:[2,94]},{6:[2,53],25:[2,53],26:[2,53],53:323,54:[1,239]},{26:[1,324],103:87,104:[1,65],106:[1,66],109:88,110:[1,68],111:69,126:[1,86],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[1,84],137:[1,85]},{6:[1,250],25:[1,251],26:[1,325]},{26:[1,326]},{1:[2,175],6:[2,175],25:[2,175],26:[2,175],49:[2,175],54:[2,175],57:[2,175],73:[2,175],78:[2,175],86:[2,175],91:[2,175],93:[2,175],102:[2,175],104:[2,175],105:[2,175],106:[2,175],110:[2,175],118:[2,175],126:[2,175],128:[2,175],129:[2,175],132:[2,175],133:[2,175],134:[2,175],135:[2,175],136:[2,175],137:[2,175]},{26:[2,179],121:[2,179],123:[2,179]},{25:[2,132],54:[2,132],103:87,104:[1,65],106:[1,66],109:88,110:[1,68],111:69,126:[1,86],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[1,84],137:[1,85]},{6:[1,271],25:[1,272],26:[1,327]},{8:328,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{8:329,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{6:[1,282],25:[1,283],26:[1,330]},{6:[2,41],25:[2,41],26:[2,41],54:[2,41],78:[2,41]},{6:[2,59],25:[2,59],26:[2,59],49:[2,59],54:[2,59]},{1:[2,173],6:[2,173],25:[2,173],26:[2,173],49:[2,173],54:[2,173],57:[2,173],73:[2,173],78:[2,173],86:[2,173],91:[2,173],93:[2,173],102:[2,173],104:[2,173],105:[2,173],106:[2,173],110:[2,173],118:[2,173],126:[2,173],128:[2,173],129:[2,173],132:[2,173],133:[2,173],134:[2,173],135:[2,173],136:[2,173],137:[2,173]},{6:[2,128],25:[2,128],26:[2,128],54:[2,128],86:[2,128],91:[2,128]},{1:[2,170],6:[2,170],25:[2,170],26:[2,170],49:[2,170],54:[2,170],57:[2,170],73:[2,170],78:[2,170],86:[2,170],91:[2,170],93:[2,170],102:[2,170],103:87,104:[2,170],105:[2,170],106:[2,170],109:88,110:[2,170],111:69,118:[2,170],126:[2,170],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[1,84],137:[1,85]},{1:[2,171],6:[2,171],25:[2,171],26:[2,171],49:[2,171],54:[2,171],57:[2,171],73:[2,171],78:[2,171],86:[2,171],91:[2,171],93:[2,171],102:[2,171],103:87,104:[2,171],105:[2,171],106:[2,171],109:88,110:[2,171],111:69,118:[2,171],126:[2,171],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[1,84],137:[1,85]},{6:[2,95],25:[2,95],26:[2,95],54:[2,95],78:[2,95]}],defaultActions:{60:[2,51],61:[2,52],75:[2,3],94:[2,109],191:[2,89]},parseError:function(e){throw Error(e)
},parse:function(e){function t(){var e;return e=n.lexer.lex()||1,"number"!=typeof e&&(e=n.symbols_[e]||e),e}var n=this,i=[0],r=[null],s=[],a=this.table,o="",c=0,h=0,l=0;this.lexer.setInput(e),this.lexer.yy=this.yy,this.yy.lexer=this.lexer,this.yy.parser=this,this.lexer.yylloc===void 0&&(this.lexer.yylloc={});var u=this.lexer.yylloc;s.push(u);var p=this.lexer.options&&this.lexer.options.ranges;"function"==typeof this.yy.parseError&&(this.parseError=this.yy.parseError);for(var d,f,m,g,b,k,v,y,w,T={};;){if(m=i[i.length-1],this.defaultActions[m]?g=this.defaultActions[m]:((null===d||d===void 0)&&(d=t()),g=a[m]&&a[m][d]),g===void 0||!g.length||!g[0]){var C="";if(!l){w=[];for(k in a[m])this.terminals_[k]&&k>2&&w.push("'"+this.terminals_[k]+"'");C=this.lexer.showPosition?"Parse error on line "+(c+1)+":\n"+this.lexer.showPosition()+"\nExpecting "+w.join(", ")+", got '"+(this.terminals_[d]||d)+"'":"Parse error on line "+(c+1)+": Unexpected "+(1==d?"end of input":"'"+(this.terminals_[d]||d)+"'"),this.parseError(C,{text:this.lexer.match,token:this.terminals_[d]||d,line:this.lexer.yylineno,loc:u,expected:w})}}if(g[0]instanceof Array&&g.length>1)throw Error("Parse Error: multiple actions possible at state: "+m+", token: "+d);switch(g[0]){case 1:i.push(d),r.push(this.lexer.yytext),s.push(this.lexer.yylloc),i.push(g[1]),d=null,f?(d=f,f=null):(h=this.lexer.yyleng,o=this.lexer.yytext,c=this.lexer.yylineno,u=this.lexer.yylloc,l>0&&l--);break;case 2:if(v=this.productions_[g[1]][1],T.$=r[r.length-v],T._$={first_line:s[s.length-(v||1)].first_line,last_line:s[s.length-1].last_line,first_column:s[s.length-(v||1)].first_column,last_column:s[s.length-1].last_column},p&&(T._$.range=[s[s.length-(v||1)].range[0],s[s.length-1].range[1]]),b=this.performAction.call(T,o,h,c,this.yy,g[1],r,s),b!==void 0)return b;v&&(i=i.slice(0,2*-1*v),r=r.slice(0,-1*v),s=s.slice(0,-1*v)),i.push(this.productions_[g[1]][0]),r.push(T.$),s.push(T._$),y=a[i[i.length-2]][i[i.length-1]],i.push(y);break;case 3:return!0}}return!0}};return e.prototype=t,t.Parser=e,new e}();require!==void 0&&e!==void 0&&(e.parser=t,e.Parser=t.Parser,e.parse=function(){return t.parse.apply(t,arguments)},e.main=function(t){t[1]||(console.log("Usage: "+t[0]+" FILE"),process.exit(1));var n=require("fs").readFileSync(require("path").normalize(t[1]),"utf8");return e.parser.parse(n)},"undefined"!=typeof module&&require.main===module&&e.main(process.argv.slice(1)))},require["./scope"]=new function(){var e=this;(function(){var t,n,i,r;r=require("./helpers"),n=r.extend,i=r.last,e.Scope=t=function(){function e(t,n,i){this.parent=t,this.expressions=n,this.method=i,this.variables=[{name:"arguments",type:"arguments"}],this.positions={},this.parent||(e.root=this)}return e.root=null,e.prototype.add=function(e,t,n){return this.shared&&!n?this.parent.add(e,t,n):Object.prototype.hasOwnProperty.call(this.positions,e)?this.variables[this.positions[e]].type=t:this.positions[e]=this.variables.push({name:e,type:t})-1},e.prototype.namedMethod=function(){var e;return(null!=(e=this.method)?e.name:void 0)||!this.parent?this.method:this.parent.namedMethod()},e.prototype.find=function(e){return this.check(e)?!0:(this.add(e,"var"),!1)},e.prototype.parameter=function(e){return this.shared&&this.parent.check(e,!0)?void 0:this.add(e,"param")},e.prototype.check=function(e){var t;return!!(this.type(e)||(null!=(t=this.parent)?t.check(e):void 0))},e.prototype.temporary=function(e,t){return e.length>1?"_"+e+(t>1?t-1:""):"_"+(t+parseInt(e,36)).toString(36).replace(/\d/g,"a")},e.prototype.type=function(e){var t,n,i,r;for(r=this.variables,n=0,i=r.length;i>n;n++)if(t=r[n],t.name===e)return t.type;return null},e.prototype.freeVariable=function(e,t){var n,i;for(null==t&&(t=!0),n=0;this.check(i=this.temporary(e,n));)n++;return t&&this.add(i,"var",!0),i},e.prototype.assign=function(e,t){return this.add(e,{value:t,assigned:!0},!0),this.hasAssignments=!0},e.prototype.hasDeclarations=function(){return!!this.declaredVariables().length},e.prototype.declaredVariables=function(){var e,t,n,i,r,s;for(e=[],t=[],s=this.variables,i=0,r=s.length;r>i;i++)n=s[i],"var"===n.type&&("_"===n.name.charAt(0)?t:e).push(n.name);return e.sort().concat(t.sort())},e.prototype.assignedVariables=function(){var e,t,n,i,r;for(i=this.variables,r=[],t=0,n=i.length;n>t;t++)e=i[t],e.type.assigned&&r.push(""+e.name+" = "+e.type.value);return r},e}()}).call(this)},require["./nodes"]=new function(){var e=this;(function(){var t,n,i,r,s,a,o,c,h,l,u,p,d,f,m,g,b,k,v,y,w,T,C,F,L,N,E,D,x,S,A,R,_,I,$,O,M,j,V,B,P,U,q,H,G,W,X,Y,K,z,J,Z,Q,et,tt,nt,it,rt,st,at,ot,ct,ht,lt,ut,pt,dt,ft,mt,gt,bt,kt={}.hasOwnProperty,vt=function(e,t){function n(){this.constructor=e}for(var i in t)kt.call(t,i)&&(e[i]=t[i]);return n.prototype=t.prototype,e.prototype=new n,e.__super__=t.prototype,e},yt=[].indexOf||function(e){for(var t=0,n=this.length;n>t;t++)if(t in this&&this[t]===e)return t;return-1},wt=[].slice;Error.stackTraceLimit=1/0,B=require("./scope").Scope,ft=require("./lexer"),$=ft.RESERVED,V=ft.STRICT_PROSCRIBED,mt=require("./helpers"),Q=mt.compact,it=mt.flatten,nt=mt.extend,ot=mt.merge,et=mt.del,lt=mt.starts,tt=mt.ends,st=mt.last,ht=mt.some,Z=mt.addLocationDataFn,at=mt.locationDataToString,ut=mt.throwSyntaxError,e.extend=nt,e.addLocationDataFn=Z,J=function(){return!0},S=function(){return!1},G=function(){return this},x=function(){return this.negated=!this.negated,this},e.CodeFragment=l=function(){function e(e,t){var n;this.code=""+t,this.locationData=null!=e?e.locationData:void 0,this.type=(null!=e?null!=(n=e.constructor)?n.name:void 0:void 0)||"unknown"}return e.prototype.toString=function(){return""+this.code+[this.locationData?": "+at(this.locationData):void 0]},e}(),rt=function(e){var t;return function(){var n,i,r;for(r=[],n=0,i=e.length;i>n;n++)t=e[n],r.push(t.code);return r}().join("")},e.Base=r=function(){function e(){}return e.prototype.compile=function(e,t){return rt(this.compileToFragments(e,t))},e.prototype.compileToFragments=function(e,t){var n;return e=nt({},e),t&&(e.level=t),n=this.unfoldSoak(e)||this,n.tab=e.indent,e.level!==N&&n.isStatement(e)?n.compileClosure(e):n.compileNode(e)},e.prototype.compileClosure=function(e){var t;return(t=this.jumps())&&t.error("cannot use a pure statement in an expression"),e.sharedScope=!0,c.wrap(this).compileNode(e)},e.prototype.cache=function(e,t,n){var r,s;return this.isComplex()?(r=new E(n||e.scope.freeVariable("ref")),s=new i(r,this),t?[s.compileToFragments(e,t),[this.makeCode(r.value)]]:[s,r]):(r=t?this.compileToFragments(e,t):this,[r,r])},e.prototype.cacheToCodeFragments=function(e){return[rt(e[0]),rt(e[1])]},e.prototype.makeReturn=function(e){var t;return t=this.unwrapAll(),e?new a(new E(""+e+".push"),[t]):new M(t)},e.prototype.contains=function(e){var t;return t=void 0,this.traverseChildren(!1,function(n){return e(n)?(t=n,!1):void 0}),t},e.prototype.lastNonComment=function(e){var t;for(t=e.length;t--;)if(!(e[t]instanceof u))return e[t];return null},e.prototype.toString=function(e,t){var n;return null==e&&(e=""),null==t&&(t=this.constructor.name),n="\n"+e+t,this.soak&&(n+="?"),this.eachChild(function(t){return n+=t.toString(e+H)}),n},e.prototype.eachChild=function(e){var t,n,i,r,s,a,o,c;if(!this.children)return this;for(o=this.children,i=0,s=o.length;s>i;i++)if(t=o[i],this[t])for(c=it([this[t]]),r=0,a=c.length;a>r;r++)if(n=c[r],e(n)===!1)return this;return this},e.prototype.traverseChildren=function(e,t){return this.eachChild(function(n){return t(n)===!1?!1:n.traverseChildren(e,t)})},e.prototype.invert=function(){return new R("!",this)},e.prototype.unwrapAll=function(){var e;for(e=this;e!==(e=e.unwrap()););return e},e.prototype.children=[],e.prototype.isStatement=S,e.prototype.jumps=S,e.prototype.isComplex=J,e.prototype.isChainable=S,e.prototype.isAssignable=S,e.prototype.unwrap=G,e.prototype.unfoldSoak=S,e.prototype.assigns=S,e.prototype.updateLocationDataIfMissing=function(e){return this.locationData||(this.locationData=e),this.eachChild(function(t){return t.updateLocationDataIfMissing(e)})},e.prototype.error=function(e){return ut(e,this.locationData)},e.prototype.makeCode=function(e){return new l(this,e)},e.prototype.wrapInBraces=function(e){return[].concat(this.makeCode("("),e,this.makeCode(")"))},e.prototype.joinFragmentArrays=function(e,t){var n,i,r,s,a;for(n=[],r=s=0,a=e.length;a>s;r=++s)i=e[r],r&&n.push(this.makeCode(t)),n=n.concat(i);return n},e}(),e.Block=s=function(e){function t(e){this.expressions=Q(it(e||[]))}return vt(t,e),t.prototype.children=["expressions"],t.prototype.push=function(e){return this.expressions.push(e),this},t.prototype.pop=function(){return this.expressions.pop()},t.prototype.unshift=function(e){return this.expressions.unshift(e),this},t.prototype.unwrap=function(){return 1===this.expressions.length?this.expressions[0]:this},t.prototype.isEmpty=function(){return!this.expressions.length},t.prototype.isStatement=function(e){var t,n,i,r;for(r=this.expressions,n=0,i=r.length;i>n;n++)if(t=r[n],t.isStatement(e))return!0;return!1},t.prototype.jumps=function(e){var t,n,i,r;for(r=this.expressions,n=0,i=r.length;i>n;n++)if(t=r[n],t.jumps(e))return t},t.prototype.makeReturn=function(e){var t,n;for(n=this.expressions.length;n--;)if(t=this.expressions[n],!(t instanceof u)){this.expressions[n]=t.makeReturn(e),t instanceof M&&!t.expression&&this.expressions.splice(n,1);break}return this},t.prototype.compileToFragments=function(e,n){return null==e&&(e={}),e.scope?t.__super__.compileToFragments.call(this,e,n):this.compileRoot(e)},t.prototype.compileNode=function(e){var n,i,r,s,a,o,c,h,l;for(this.tab=e.indent,o=e.level===N,i=[],l=this.expressions,s=c=0,h=l.length;h>c;s=++c)a=l[s],a=a.unwrapAll(),a=a.unfoldSoak(e)||a,a instanceof t?i.push(a.compileNode(e)):o?(a.front=!0,r=a.compileToFragments(e),a.isStatement(e)||(r.unshift(this.makeCode(""+this.tab)),r.push(this.makeCode(";"))),i.push(r)):i.push(a.compileToFragments(e,C));return o?this.spaced?[].concat(this.joinFragmentArrays(i,"\n\n"),this.makeCode("\n")):this.joinFragmentArrays(i,"\n"):(n=i.length?this.joinFragmentArrays(i,", "):[this.makeCode("void 0")],i.length>1&&e.level>=C?this.wrapInBraces(n):n)},t.prototype.compileRoot=function(e){var t,n,i,r,s,a,o,c,h,l;for(e.indent=e.bare?"":H,e.level=N,this.spaced=!0,e.scope=new B(null,this,null),l=e.locals||[],c=0,h=l.length;h>c;c++)r=l[c],e.scope.parameter(r);return s=[],e.bare||(a=function(){var e,n,r,s;for(r=this.expressions,s=[],i=e=0,n=r.length;n>e&&(t=r[i],t.unwrap()instanceof u);i=++e)s.push(t);return s}.call(this),o=this.expressions.slice(a.length),this.expressions=a,a.length&&(s=this.compileNode(ot(e,{indent:""})),s.push(this.makeCode("\n"))),this.expressions=o),n=this.compileWithDeclarations(e),e.bare?n:[].concat(s,this.makeCode("(function() {\n"),n,this.makeCode("\n}).call(this);\n"))},t.prototype.compileWithDeclarations=function(e){var t,n,i,r,s,a,o,c,h,l,p,d,f,m;for(r=[],a=[],d=this.expressions,s=l=0,p=d.length;p>l&&(i=d[s],i=i.unwrap(),i instanceof u||i instanceof E);s=++l);return e=ot(e,{level:N}),s&&(o=this.expressions.splice(s,9e9),f=[this.spaced,!1],h=f[0],this.spaced=f[1],m=[this.compileNode(e),h],r=m[0],this.spaced=m[1],this.expressions=o),a=this.compileNode(e),c=e.scope,c.expressions===this&&(n=e.scope.hasDeclarations(),t=c.hasAssignments,(n||t)&&(s&&r.push(this.makeCode("\n")),r.push(this.makeCode(""+this.tab+"var ")),n&&r.push(this.makeCode(c.declaredVariables().join(", "))),t&&(n&&r.push(this.makeCode(",\n"+(this.tab+H))),r.push(this.makeCode(c.assignedVariables().join(",\n"+(this.tab+H))))),r.push(this.makeCode(";\n\n")))),r.concat(a)},t.wrap=function(e){return 1===e.length&&e[0]instanceof t?e[0]:new t(e)},t}(r),e.Literal=E=function(e){function t(e){this.value=e}return vt(t,e),t.prototype.makeReturn=function(){return this.isStatement()?this:t.__super__.makeReturn.apply(this,arguments)},t.prototype.isAssignable=function(){return m.test(this.value)},t.prototype.isStatement=function(){var e;return"break"===(e=this.value)||"continue"===e||"debugger"===e},t.prototype.isComplex=S,t.prototype.assigns=function(e){return e===this.value},t.prototype.jumps=function(e){return"break"!==this.value||(null!=e?e.loop:void 0)||(null!=e?e.block:void 0)?"continue"!==this.value||(null!=e?e.loop:void 0)?void 0:this:this},t.prototype.compileNode=function(e){var t,n,i;return n="this"===this.value?(null!=(i=e.scope.method)?i.bound:void 0)?e.scope.method.context:this.value:this.value.reserved?'"'+this.value+'"':this.value,t=this.isStatement()?""+this.tab+n+";":n,[this.makeCode(t)]},t.prototype.toString=function(){return' "'+this.value+'"'},t}(r),e.Undefined=function(e){function t(){return gt=t.__super__.constructor.apply(this,arguments)}return vt(t,e),t.prototype.isAssignable=S,t.prototype.isComplex=S,t.prototype.compileNode=function(e){return[this.makeCode(e.level>=w?"(void 0)":"void 0")]},t}(r),e.Null=function(e){function t(){return bt=t.__super__.constructor.apply(this,arguments)}return vt(t,e),t.prototype.isAssignable=S,t.prototype.isComplex=S,t.prototype.compileNode=function(){return[this.makeCode("null")]},t}(r),e.Bool=function(e){function t(e){this.val=e}return vt(t,e),t.prototype.isAssignable=S,t.prototype.isComplex=S,t.prototype.compileNode=function(){return[this.makeCode(this.val)]},t}(r),e.Return=M=function(e){function t(e){e&&!e.unwrap().isUndefined&&(this.expression=e)}return vt(t,e),t.prototype.children=["expression"],t.prototype.isStatement=J,t.prototype.makeReturn=G,t.prototype.jumps=G,t.prototype.compileToFragments=function(e,n){var i,r;return i=null!=(r=this.expression)?r.makeReturn():void 0,!i||i instanceof t?t.__super__.compileToFragments.call(this,e,n):i.compileToFragments(e,n)},t.prototype.compileNode=function(e){var t;return t=[],t.push(this.makeCode(this.tab+("return"+[this.expression?" ":void 0]))),this.expression&&(t=t.concat(this.expression.compileToFragments(e,L))),t.push(this.makeCode(";")),t},t}(r),e.Value=K=function(e){function t(e,n,i){return!n&&e instanceof t?e:(this.base=e,this.properties=n||[],i&&(this[i]=!0),this)}return vt(t,e),t.prototype.children=["base","properties"],t.prototype.add=function(e){return this.properties=this.properties.concat(e),this},t.prototype.hasProperties=function(){return!!this.properties.length},t.prototype.isArray=function(){return!this.properties.length&&this.base instanceof n},t.prototype.isComplex=function(){return this.hasProperties()||this.base.isComplex()},t.prototype.isAssignable=function(){return this.hasProperties()||this.base.isAssignable()},t.prototype.isSimpleNumber=function(){return this.base instanceof E&&j.test(this.base.value)},t.prototype.isString=function(){return this.base instanceof E&&b.test(this.base.value)},t.prototype.isAtomic=function(){var e,t,n,i;for(i=this.properties.concat(this.base),t=0,n=i.length;n>t;t++)if(e=i[t],e.soak||e instanceof a)return!1;return!0},t.prototype.isStatement=function(e){return!this.properties.length&&this.base.isStatement(e)},t.prototype.assigns=function(e){return!this.properties.length&&this.base.assigns(e)},t.prototype.jumps=function(e){return!this.properties.length&&this.base.jumps(e)},t.prototype.isObject=function(e){return this.properties.length?!1:this.base instanceof A&&(!e||this.base.generated)},t.prototype.isSplice=function(){return st(this.properties)instanceof P},t.prototype.unwrap=function(){return this.properties.length?this:this.base},t.prototype.cacheReference=function(e){var n,r,s,a;return s=st(this.properties),2>this.properties.length&&!this.base.isComplex()&&!(null!=s?s.isComplex():void 0)?[this,this]:(n=new t(this.base,this.properties.slice(0,-1)),n.isComplex()&&(r=new E(e.scope.freeVariable("base")),n=new t(new I(new i(r,n)))),s?(s.isComplex()&&(a=new E(e.scope.freeVariable("name")),s=new y(new i(a,s.index)),a=new y(a)),[n.add(s),new t(r||n.base,[a||s])]):[n,r])},t.prototype.compileNode=function(e){var t,n,i,r,s;for(this.base.front=this.front,i=this.properties,t=this.base.compileToFragments(e,i.length?w:null),(this.base instanceof I||i.length)&&j.test(rt(t))&&t.push(this.makeCode(".")),r=0,s=i.length;s>r;r++)n=i[r],t.push.apply(t,n.compileToFragments(e));return t},t.prototype.unfoldSoak=function(e){var n,r=this;return null!=(n=this.unfoldedSoak)?n:this.unfoldedSoak=function(){var n,s,a,o,c,h,l,u,d,f;if(a=r.base.unfoldSoak(e))return(d=a.body.properties).push.apply(d,r.properties),a;for(f=r.properties,s=l=0,u=f.length;u>l;s=++l)if(o=f[s],o.soak)return o.soak=!1,n=new t(r.base,r.properties.slice(0,s)),h=new t(r.base,r.properties.slice(s)),n.isComplex()&&(c=new E(e.scope.freeVariable("ref")),n=new I(new i(c,n)),h.base=c),new k(new p(n),h,{soak:!0});return!1}()},t}(r),e.Comment=u=function(e){function t(e){this.comment=e}return vt(t,e),t.prototype.isStatement=J,t.prototype.makeReturn=G,t.prototype.compileNode=function(e,t){var n;return n="/*"+ct(this.comment,this.tab)+("\n"+this.tab+"*/\n"),(t||e.level)===N&&(n=e.indent+n),[this.makeCode(n)]},t}(r),e.Call=a=function(e){function n(e,t,n){this.args=null!=t?t:[],this.soak=n,this.isNew=!1,this.isSuper="super"===e,this.variable=this.isSuper?null:e}return vt(n,e),n.prototype.children=["variable","args"],n.prototype.newInstance=function(){var e,t;return e=(null!=(t=this.variable)?t.base:void 0)||this.variable,e instanceof n&&!e.isNew?e.newInstance():this.isNew=!0,this},n.prototype.superReference=function(e){var n,i;return i=e.scope.namedMethod(),(null!=i?i.klass:void 0)?(n=[new t(new E("__super__"))],i["static"]&&n.push(new t(new E("constructor"))),n.push(new t(new E(i.name))),new K(new E(i.klass),n).compile(e)):(null!=i?i.ctor:void 0)?""+i.name+".__super__.constructor":this.error("cannot call super outside of an instance method.")},n.prototype.superThis=function(e){var t;return t=e.scope.method,t&&!t.klass&&t.context||"this"},n.prototype.unfoldSoak=function(e){var t,i,r,s,a,o,c,h,l;if(this.soak){if(this.variable){if(i=pt(e,this,"variable"))return i;h=new K(this.variable).cacheReference(e),r=h[0],a=h[1]}else r=new E(this.superReference(e)),a=new K(r);return a=new n(a,this.args),a.isNew=this.isNew,r=new E("typeof "+r.compile(e)+' === "function"'),new k(r,new K(a),{soak:!0})}for(t=this,s=[];;)if(t.variable instanceof n)s.push(t),t=t.variable;else{if(!(t.variable instanceof K))break;if(s.push(t),!((t=t.variable.base)instanceof n))break}for(l=s.reverse(),o=0,c=l.length;c>o;o++)t=l[o],i&&(t.variable instanceof n?t.variable=i:t.variable.base=i),i=pt(e,t,"variable");return i},n.prototype.compileNode=function(e){var t,n,i,r,s,a,o,c,h,l;if(null!=(h=this.variable)&&(h.front=this.front),r=U.compileSplattedArray(e,this.args,!0),r.length)return this.compileSplat(e,r);for(i=[],l=this.args,n=o=0,c=l.length;c>o;n=++o)t=l[n],n&&i.push(this.makeCode(", ")),i.push.apply(i,t.compileToFragments(e,C));return s=[],this.isSuper?(a=this.superReference(e)+(".call("+this.superThis(e)),i.length&&(a+=", "),s.push(this.makeCode(a))):(this.isNew&&s.push(this.makeCode("new ")),s.push.apply(s,this.variable.compileToFragments(e,w)),s.push(this.makeCode("("))),s.push.apply(s,i),s.push(this.makeCode(")")),s},n.prototype.compileSplat=function(e,t){var n,i,r,s,a,o;return this.isSuper?[].concat(this.makeCode(""+this.superReference(e)+".apply("+this.superThis(e)+", "),t,this.makeCode(")")):this.isNew?(s=this.tab+H,[].concat(this.makeCode("(function(func, args, ctor) {\n"+s+"ctor.prototype = func.prototype;\n"+s+"var child = new ctor, result = func.apply(child, args);\n"+s+"return Object(result) === result ? result : child;\n"+this.tab+"})("),this.variable.compileToFragments(e,C),this.makeCode(", "),t,this.makeCode(", function(){})"))):(n=[],i=new K(this.variable),(a=i.properties.pop())&&i.isComplex()?(o=e.scope.freeVariable("ref"),n=n.concat(this.makeCode("("+o+" = "),i.compileToFragments(e,C),this.makeCode(")"),a.compileToFragments(e))):(r=i.compileToFragments(e,w),j.test(rt(r))&&(r=this.wrapInBraces(r)),a?(o=rt(r),r.push.apply(r,a.compileToFragments(e))):o="null",n=n.concat(r)),n=n.concat(this.makeCode(".apply("+o+", "),t,this.makeCode(")")))},n}(r),e.Extends=d=function(e){function t(e,t){this.child=e,this.parent=t}return vt(t,e),t.prototype.children=["child","parent"],t.prototype.compileToFragments=function(e){return new a(new K(new E(dt("extends"))),[this.child,this.parent]).compileToFragments(e)},t}(r),e.Access=t=function(e){function t(e,t){this.name=e,this.name.asKey=!0,this.soak="soak"===t}return vt(t,e),t.prototype.children=["name"],t.prototype.compileToFragments=function(e){var t;return t=this.name.compileToFragments(e),m.test(rt(t))?t.unshift(this.makeCode(".")):(t.unshift(this.makeCode("[")),t.push(this.makeCode("]"))),t},t.prototype.isComplex=S,t}(r),e.Index=y=function(e){function t(e){this.index=e}return vt(t,e),t.prototype.children=["index"],t.prototype.compileToFragments=function(e){return[].concat(this.makeCode("["),this.index.compileToFragments(e,L),this.makeCode("]"))},t.prototype.isComplex=function(){return this.index.isComplex()},t}(r),e.Range=O=function(e){function t(e,t,n){this.from=e,this.to=t,this.exclusive="exclusive"===n,this.equals=this.exclusive?"":"="}return vt(t,e),t.prototype.children=["from","to"],t.prototype.compileVariables=function(e){var t,n,i,r,s;return e=ot(e,{top:!0}),n=this.cacheToCodeFragments(this.from.cache(e,C)),this.fromC=n[0],this.fromVar=n[1],i=this.cacheToCodeFragments(this.to.cache(e,C)),this.toC=i[0],this.toVar=i[1],(t=et(e,"step"))&&(r=this.cacheToCodeFragments(t.cache(e,C)),this.step=r[0],this.stepVar=r[1]),s=[this.fromVar.match(j),this.toVar.match(j)],this.fromNum=s[0],this.toNum=s[1],this.stepVar?this.stepNum=this.stepVar.match(j):void 0},t.prototype.compileNode=function(e){var t,n,i,r,s,a,o,c,h,l,u,p,d,f;return this.fromVar||this.compileVariables(e),e.index?(o=this.fromNum&&this.toNum,s=et(e,"index"),a=et(e,"name"),h=a&&a!==s,p=""+s+" = "+this.fromC,this.toC!==this.toVar&&(p+=", "+this.toC),this.step!==this.stepVar&&(p+=", "+this.step),d=[""+s+" <"+this.equals,""+s+" >"+this.equals],c=d[0],r=d[1],n=this.stepNum?+this.stepNum>0?""+c+" "+this.toVar:""+r+" "+this.toVar:o?(f=[+this.fromNum,+this.toNum],i=f[0],u=f[1],f,u>=i?""+c+" "+u:""+r+" "+u):(t=this.stepVar?""+this.stepVar+" > 0":""+this.fromVar+" <= "+this.toVar,""+t+" ? "+c+" "+this.toVar+" : "+r+" "+this.toVar),l=this.stepVar?""+s+" += "+this.stepVar:o?h?u>=i?"++"+s:"--"+s:u>=i?""+s+"++":""+s+"--":h?""+t+" ? ++"+s+" : --"+s:""+t+" ? "+s+"++ : "+s+"--",h&&(p=""+a+" = "+p),h&&(l=""+a+" = "+l),[this.makeCode(""+p+"; "+n+"; "+l)]):this.compileArray(e)},t.prototype.compileArray=function(e){var t,n,i,r,s,a,o,c,h,l,u,p,d;return this.fromNum&&this.toNum&&20>=Math.abs(this.fromNum-this.toNum)?(h=function(){d=[];for(var e=p=+this.fromNum,t=+this.toNum;t>=p?t>=e:e>=t;t>=p?e++:e--)d.push(e);return d}.apply(this),this.exclusive&&h.pop(),[this.makeCode("["+h.join(", ")+"]")]):(a=this.tab+H,s=e.scope.freeVariable("i"),l=e.scope.freeVariable("results"),c="\n"+a+l+" = [];",this.fromNum&&this.toNum?(e.index=s,n=rt(this.compileNode(e))):(u=""+s+" = "+this.fromC+(this.toC!==this.toVar?", "+this.toC:""),i=""+this.fromVar+" <= "+this.toVar,n="var "+u+"; "+i+" ? "+s+" <"+this.equals+" "+this.toVar+" : "+s+" >"+this.equals+" "+this.toVar+"; "+i+" ? "+s+"++ : "+s+"--"),o="{ "+l+".push("+s+"); }\n"+a+"return "+l+";\n"+e.indent,r=function(e){return null!=e?e.contains(function(e){return e instanceof E&&"arguments"===e.value&&!e.asKey}):void 0},(r(this.from)||r(this.to))&&(t=", arguments"),[this.makeCode("(function() {"+c+"\n"+a+"for ("+n+")"+o+"}).apply(this"+(null!=t?t:"")+")")])},t}(r),e.Slice=P=function(e){function t(e){this.range=e,t.__super__.constructor.call(this)}return vt(t,e),t.prototype.children=["range"],t.prototype.compileNode=function(e){var t,n,i,r,s,a,o;return o=this.range,s=o.to,i=o.from,r=i&&i.compileToFragments(e,L)||[this.makeCode("0")],s&&(t=s.compileToFragments(e,L),n=rt(t),(this.range.exclusive||-1!==+n)&&(a=", "+(this.range.exclusive?n:j.test(n)?""+(+n+1):(t=s.compileToFragments(e,w),"+"+rt(t)+" + 1 || 9e9")))),[this.makeCode(".slice("+rt(r)+(a||"")+")")]},t}(r),e.Obj=A=function(e){function t(e,t){this.generated=null!=t?t:!1,this.objects=this.properties=e||[]}return vt(t,e),t.prototype.children=["properties"],t.prototype.compileNode=function(e){var t,n,r,s,a,o,c,h,l,p,d,f,m;if(l=this.properties,!l.length)return[this.makeCode(this.front?"({})":"{}")];if(this.generated)for(p=0,f=l.length;f>p;p++)c=l[p],c instanceof K&&c.error("cannot have an implicit value in an implicit object");for(r=e.indent+=H,o=this.lastNonComment(this.properties),t=[],n=d=0,m=l.length;m>d;n=++d){if(h=l[n],a=n===l.length-1?"":h===o||h instanceof u?"\n":",\n",s=h instanceof u?"":r,h instanceof i&&h.variable instanceof K&&h.variable.hasProperties())throw new SyntaxError("Invalid object key");h instanceof K&&h["this"]&&(h=new i(h.properties[0].name,h,"object")),h instanceof u||(h instanceof i||(h=new i(h,h,"object")),(h.variable.base||h.variable).asKey=!0),s&&t.push(this.makeCode(s)),t.push.apply(t,h.compileToFragments(e,N)),a&&t.push(this.makeCode(a))}return t.unshift(this.makeCode("{"+(l.length&&"\n"))),t.push(this.makeCode(""+(l.length&&"\n"+this.tab)+"}")),this.front?this.wrapInBraces(t):t},t.prototype.assigns=function(e){var t,n,i,r;for(r=this.properties,n=0,i=r.length;i>n;n++)if(t=r[n],t.assigns(e))return!0;return!1},t}(r),e.Arr=n=function(e){function t(e){this.objects=e||[]}return vt(t,e),t.prototype.children=["objects"],t.prototype.compileNode=function(e){var t,n,i,r,s,a,o;if(!this.objects.length)return[this.makeCode("[]")];if(e.indent+=H,t=U.compileSplattedArray(e,this.objects),t.length)return t;for(t=[],n=function(){var t,n,i,r;for(i=this.objects,r=[],t=0,n=i.length;n>t;t++)s=i[t],r.push(s.compileToFragments(e,C));return r}.call(this),r=a=0,o=n.length;o>a;r=++a)i=n[r],r&&t.push(this.makeCode(", ")),t.push.apply(t,i);return rt(t).indexOf("\n")>=0?(t.unshift(this.makeCode("[\n"+e.indent)),t.push(this.makeCode("\n"+this.tab+"]"))):(t.unshift(this.makeCode("[")),t.push(this.makeCode("]"))),t},t.prototype.assigns=function(e){var t,n,i,r;for(r=this.objects,n=0,i=r.length;i>n;n++)if(t=r[n],t.assigns(e))return!0;return!1},t}(r),e.Class=o=function(e){function n(e,t,n){this.variable=e,this.parent=t,this.body=null!=n?n:new s,this.boundFuncs=[],this.body.classBody=!0}return vt(n,e),n.prototype.children=["variable","parent","body"],n.prototype.determineName=function(){var e,n;return this.variable?(e=(n=st(this.variable.properties))?n instanceof t&&n.name.value:this.variable.base.value,yt.call(V,e)>=0&&this.variable.error("class variable name may not be "+e),e&&(e=m.test(e)&&e)):null},n.prototype.setContext=function(e){return this.body.traverseChildren(!1,function(t){return t.classBody?!1:t instanceof E&&"this"===t.value?t.value=e:t instanceof h&&(t.klass=e,t.bound)?t.context=e:void 0})},n.prototype.addBoundFunctions=function(e){var n,i,r,s,a;for(a=this.boundFuncs,r=0,s=a.length;s>r;r++)n=a[r],i=new K(new E("this"),[new t(n)]).compile(e),this.ctor.body.unshift(new E(""+i+" = "+dt("bind")+"("+i+", this)"))},n.prototype.addProperties=function(e,n,r){var s,a,o,c,l;return l=e.base.properties.slice(0),o=function(){var e;for(e=[];s=l.shift();)s instanceof i&&(a=s.variable.base,delete s.context,c=s.value,"constructor"===a.value?(this.ctor&&s.error("cannot define more than one constructor in a class"),c.bound&&s.error("cannot define a constructor as a bound function"),c instanceof h?s=this.ctor=c:(this.externalCtor=r.scope.freeVariable("class"),s=new i(new E(this.externalCtor),c))):s.variable["this"]?(c["static"]=!0,c.bound&&(c.context=n)):(s.variable=new K(new E(n),[new t(new E("prototype")),new t(a)]),c instanceof h&&c.bound&&(this.boundFuncs.push(a),c.bound=!1))),e.push(s);return e}.call(this),Q(o)},n.prototype.walkBody=function(e,t){var i=this;return this.traverseChildren(!1,function(r){var a,o,c,h,l,u,p;if(a=!0,r instanceof n)return!1;if(r instanceof s){for(p=o=r.expressions,c=l=0,u=p.length;u>l;c=++l)h=p[c],h instanceof K&&h.isObject(!0)&&(a=!1,o[c]=i.addProperties(h,e,t));r.expressions=o=it(o)}return a&&!(r instanceof n)})},n.prototype.hoistDirectivePrologue=function(){var e,t,n;for(t=0,e=this.body.expressions;(n=e[t])&&n instanceof u||n instanceof K&&n.isString();)++t;return this.directives=e.splice(0,t)},n.prototype.ensureConstructor=function(e,t){var n,r,s;return n=!this.ctor,this.ctor||(this.ctor=new h),this.ctor.ctor=this.ctor.name=e,this.ctor.klass=null,this.ctor.noReturn=!0,n?(this.parent&&(s=new E(""+e+".__super__.constructor.apply(this, arguments)")),this.externalCtor&&(s=new E(""+this.externalCtor+".apply(this, arguments)")),s&&(r=new E(t.scope.freeVariable("ref")),this.ctor.body.unshift(new i(r,s))),this.addBoundFunctions(t),s&&(this.ctor.body.push(r),this.ctor.body.makeReturn()),this.body.expressions.unshift(this.ctor)):this.addBoundFunctions(t)},n.prototype.compileNode=function(e){var t,n,r,s,a,o,l;return n=this.determineName(),a=n||"_Class",a.reserved&&(a="_"+a),s=new E(a),this.hoistDirectivePrologue(),this.setContext(a),this.walkBody(a,e),this.ensureConstructor(a,e),this.body.spaced=!0,this.ctor instanceof h||this.body.expressions.unshift(this.ctor),this.body.expressions.push(s),(l=this.body.expressions).unshift.apply(l,this.directives),t=c.wrap(this.body),this.parent&&(this.superClass=new E(e.scope.freeVariable("super",!1)),this.body.expressions.unshift(new d(s,this.superClass)),t.args.push(this.parent),o=t.variable.params||t.variable.base.params,o.push(new _(this.superClass))),r=new I(t,!0),this.variable&&(r=new i(this.variable,r)),r.compileToFragments(e)},n}(r),e.Assign=i=function(e){function n(e,t,n,i){var r,s,a;this.variable=e,this.value=t,this.context=n,this.param=i&&i.param,this.subpattern=i&&i.subpattern,a=s=this.variable.unwrapAll().value,r=yt.call(V,a)>=0,r&&"object"!==this.context&&this.variable.error('variable name may not be "'+s+'"')}return vt(n,e),n.prototype.children=["variable","value"],n.prototype.isStatement=function(e){return(null!=e?e.level:void 0)===N&&null!=this.context&&yt.call(this.context,"?")>=0},n.prototype.assigns=function(e){return this["object"===this.context?"value":"variable"].assigns(e)},n.prototype.unfoldSoak=function(e){return pt(e,this,"variable")},n.prototype.compileNode=function(e){var t,n,i,r,s,a,o,c,l,u,p;if(i=this.variable instanceof K){if(this.variable.isArray()||this.variable.isObject())return this.compilePatternMatch(e);if(this.variable.isSplice())return this.compileSplice(e);if("||="===(c=this.context)||"&&="===c||"?="===c)return this.compileConditional(e)}return n=this.variable.compileToFragments(e,C),s=rt(n),this.context||(o=this.variable.unwrapAll(),o.isAssignable()||this.variable.error('"'+this.variable.compile(e)+'" cannot be assigned'),("function"==typeof o.hasProperties?o.hasProperties():void 0)||(this.param?e.scope.add(s,"var"):e.scope.find(s))),this.value instanceof h&&(r=D.exec(s))&&(r[1]&&(this.value.klass=r[1]),this.value.name=null!=(l=null!=(u=null!=(p=r[2])?p:r[3])?u:r[4])?l:r[5]),a=this.value.compileToFragments(e,C),"object"===this.context?n.concat(this.makeCode(": "),a):(t=n.concat(this.makeCode(" "+(this.context||"=")+" "),a),C>=e.level?t:this.wrapInBraces(t))},n.prototype.compilePatternMatch=function(e){var i,r,s,a,o,c,h,l,u,p,d,f,g,b,k,v,w,T,L,D,x,S,A,R,_,O,M,j;if(v=e.level===N,T=this.value,d=this.variable.base.objects,!(f=d.length))return s=T.compileToFragments(e),e.level>=F?this.wrapInBraces(s):s;if(h=this.variable.isObject(),v&&1===f&&!((p=d[0])instanceof U))return p instanceof n?(A=p,R=A.variable,c=R.base,p=A.value):c=h?p["this"]?p.properties[0].name:p:new E(0),i=m.test(c.unwrap().value||0),T=new K(T),T.properties.push(new(i?t:y)(c)),_=p.unwrap().value,yt.call($,_)>=0&&p.error("assignment to a reserved word: "+p.compile(e)),new n(p,T,null,{param:this.param}).compileToFragments(e,N);for(L=T.compileToFragments(e,C),D=rt(L),r=[],k=!1,(!m.test(D)||this.variable.assigns(D))&&(r.push([this.makeCode(""+(g=e.scope.freeVariable("ref"))+" = ")].concat(wt.call(L))),L=[this.makeCode(g)],D=g),o=x=0,S=d.length;S>x;o=++x)p=d[o],c=o,h&&(p instanceof n?(O=p,M=O.variable,c=M.base,p=O.value):p.base instanceof I?(j=new K(p.unwrapAll()).cacheReference(e),p=j[0],c=j[1]):c=p["this"]?p.properties[0].name:p),!k&&p instanceof U?(u=p.name.unwrap().value,p=p.unwrap(),w=""+f+" <= "+D+".length ? "+dt("slice")+".call("+D+", "+o,(b=f-o-1)?(l=e.scope.freeVariable("i"),w+=", "+l+" = "+D+".length - "+b+") : ("+l+" = "+o+", [])"):w+=") : []",w=new E(w),k=""+l+"++"):(u=p.unwrap().value,p instanceof U&&p.error("multiple splats are disallowed in an assignment"),"number"==typeof c?(c=new E(k||c),i=!1):i=h&&m.test(c.unwrap().value||0),w=new K(new E(D),[new(i?t:y)(c)])),null!=u&&yt.call($,u)>=0&&p.error("assignment to a reserved word: "+p.compile(e)),r.push(new n(p,w,null,{param:this.param,subpattern:!0}).compileToFragments(e,C));
return v||this.subpattern||r.push(L),a=this.joinFragmentArrays(r,", "),C>e.level?a:this.wrapInBraces(a)},n.prototype.compileConditional=function(e){var t,i,r;return r=this.variable.cacheReference(e),t=r[0],i=r[1],!t.properties.length&&t.base instanceof E&&"this"!==t.base.value&&!e.scope.check(t.base.value)&&this.variable.error('the variable "'+t.base.value+"\" can't be assigned with "+this.context+" because it has not been declared before"),yt.call(this.context,"?")>=0&&(e.isExistentialEquals=!0),new R(this.context.slice(0,-1),t,new n(i,this.value,"=")).compileToFragments(e)},n.prototype.compileSplice=function(e){var t,n,i,r,s,a,o,c,h,l,u,p;return l=this.variable.properties.pop().range,i=l.from,o=l.to,n=l.exclusive,a=this.variable.compile(e),i?(u=this.cacheToCodeFragments(i.cache(e,F)),r=u[0],s=u[1]):r=s="0",o?(null!=i?i.isSimpleNumber():void 0)&&o.isSimpleNumber()?(o=+o.compile(e)-+s,n||(o+=1)):(o=o.compile(e,w)+" - "+s,n||(o+=" + 1")):o="9e9",p=this.value.cache(e,C),c=p[0],h=p[1],t=[].concat(this.makeCode("[].splice.apply("+a+", ["+r+", "+o+"].concat("),c,this.makeCode(")), "),h),e.level>N?this.wrapInBraces(t):t},n}(r),e.Code=h=function(e){function t(e,t,n){this.params=e||[],this.body=t||new s,this.bound="boundfunc"===n,this.bound&&(this.context="_this")}return vt(t,e),t.prototype.children=["params","body"],t.prototype.isStatement=function(){return!!this.ctor},t.prototype.jumps=S,t.prototype.compileNode=function(e){var t,r,s,a,o,c,h,l,u,p,d,f,m,g,b,v,y,T,C,F,L,N,D,x,S,A,_,I,$;for(e.scope=new B(e.scope,this.body,this),e.scope.shared=et(e,"sharedScope"),e.indent+=H,delete e.bare,delete e.isExistentialEquals,u=[],s=[],this.eachParamName(function(t){return e.scope.check(t)?void 0:e.scope.parameter(t)}),S=this.params,b=0,C=S.length;C>b;b++)if(l=S[b],l.splat){for(A=this.params,v=0,F=A.length;F>v;v++)h=A[v].name,h["this"]&&(h=h.properties[0].name),h.value&&e.scope.add(h.value,"var",!0);d=new i(new K(new n(function(){var t,n,i,r;for(i=this.params,r=[],t=0,n=i.length;n>t;t++)h=i[t],r.push(h.asReference(e));return r}.call(this))),new K(new E("arguments")));break}for(_=this.params,y=0,L=_.length;L>y;y++)l=_[y],l.isComplex()?(m=p=l.asReference(e),l.value&&(m=new R("?",p,l.value)),s.push(new i(new K(l.name),m,"=",{param:!0}))):(p=l,l.value&&(c=new E(p.name.value+" == null"),m=new i(new K(l.name),l.value,"="),s.push(new k(c,m)))),d||u.push(p);for(g=this.body.isEmpty(),d&&s.unshift(d),s.length&&(I=this.body.expressions).unshift.apply(I,s),a=T=0,N=u.length;N>T;a=++T)h=u[a],u[a]=h.compileToFragments(e),e.scope.parameter(rt(u[a]));for(f=[],this.eachParamName(function(e,t){return yt.call(f,e)>=0&&t.error("multiple parameters named '"+e+"'"),f.push(e)}),g||this.noReturn||this.body.makeReturn(),this.bound&&((null!=($=e.scope.parent.method)?$.bound:void 0)?this.bound=this.context=e.scope.parent.method.context:this["static"]||e.scope.parent.assign("_this","this")),o=e.indent,r="function",this.ctor&&(r+=" "+this.name),r+="(",t=[this.makeCode(r)],a=x=0,D=u.length;D>x;a=++x)h=u[a],a&&t.push(this.makeCode(", ")),t.push.apply(t,h);return t.push(this.makeCode(") {")),this.body.isEmpty()||(t=t.concat(this.makeCode("\n"),this.body.compileWithDeclarations(e),this.makeCode("\n"+this.tab))),t.push(this.makeCode("}")),this.ctor?[this.makeCode(this.tab)].concat(wt.call(t)):this.front||e.level>=w?this.wrapInBraces(t):t},t.prototype.eachParamName=function(e){var t,n,i,r,s;for(r=this.params,s=[],n=0,i=r.length;i>n;n++)t=r[n],s.push(t.eachName(e));return s},t.prototype.traverseChildren=function(e,n){return e?t.__super__.traverseChildren.call(this,e,n):void 0},t}(r),e.Param=_=function(e){function t(e,t,n){var i;this.name=e,this.value=t,this.splat=n,i=e=this.name.unwrapAll().value,yt.call(V,i)>=0&&this.name.error('parameter name "'+e+'" is not allowed')}return vt(t,e),t.prototype.children=["name","value"],t.prototype.compileToFragments=function(e){return this.name.compileToFragments(e,C)},t.prototype.asReference=function(e){var t;return this.reference?this.reference:(t=this.name,t["this"]?(t=t.properties[0].name,t.value.reserved&&(t=new E(e.scope.freeVariable(t.value)))):t.isComplex()&&(t=new E(e.scope.freeVariable("arg"))),t=new K(t),this.splat&&(t=new U(t)),this.reference=t)},t.prototype.isComplex=function(){return this.name.isComplex()},t.prototype.eachName=function(e,t){var n,r,s,a,o,c;if(null==t&&(t=this.name),n=function(t){var n;return n=t.properties[0].name,n.value.reserved?void 0:e(n.value,n)},t instanceof E)return e(t.value,t);if(t instanceof K)return n(t);for(c=t.objects,a=0,o=c.length;o>a;a++)s=c[a],s instanceof i?this.eachName(e,s.value.unwrap()):s instanceof U?(r=s.name.unwrap(),e(r.value,r)):s instanceof K?s.isArray()||s.isObject()?this.eachName(e,s.base):s["this"]?n(s):e(s.base.value,s.base):s.error("illegal parameter "+s.compile())},t}(r),e.Splat=U=function(e){function t(e){this.name=e.compile?e:new E(e)}return vt(t,e),t.prototype.children=["name"],t.prototype.isAssignable=J,t.prototype.assigns=function(e){return this.name.assigns(e)},t.prototype.compileToFragments=function(e){return this.name.compileToFragments(e)},t.prototype.unwrap=function(){return this.name},t.compileSplattedArray=function(e,n,i){var r,s,a,o,c,h,l,u,p,d;for(l=-1;(u=n[++l])&&!(u instanceof t););if(l>=n.length)return[];if(1===n.length)return u=n[0],c=u.compileToFragments(e,C),i?c:[].concat(u.makeCode(""+dt("slice")+".call("),c,u.makeCode(")"));for(r=n.slice(l),h=p=0,d=r.length;d>p;h=++p)u=r[h],a=u.compileToFragments(e,C),r[h]=u instanceof t?[].concat(u.makeCode(""+dt("slice")+".call("),a,u.makeCode(")")):[].concat(u.makeCode("["),a,u.makeCode("]"));return 0===l?(u=n[0],o=u.joinFragmentArrays(r.slice(1),", "),r[0].concat(u.makeCode(".concat("),o,u.makeCode(")"))):(s=function(){var t,i,r,s;for(r=n.slice(0,l),s=[],t=0,i=r.length;i>t;t++)u=r[t],s.push(u.compileToFragments(e,C));return s}(),s=n[0].joinFragmentArrays(s,", "),o=n[l].joinFragmentArrays(r,", "),[].concat(n[0].makeCode("["),s,n[l].makeCode("].concat("),o,st(n).makeCode(")")))},t}(r),e.While=z=function(e){function t(e,t){this.condition=(null!=t?t.invert:void 0)?e.invert():e,this.guard=null!=t?t.guard:void 0}return vt(t,e),t.prototype.children=["condition","guard","body"],t.prototype.isStatement=J,t.prototype.makeReturn=function(e){return e?t.__super__.makeReturn.apply(this,arguments):(this.returns=!this.jumps({loop:!0}),this)},t.prototype.addBody=function(e){return this.body=e,this},t.prototype.jumps=function(){var e,t,n,i;if(e=this.body.expressions,!e.length)return!1;for(n=0,i=e.length;i>n;n++)if(t=e[n],t.jumps({loop:!0}))return t;return!1},t.prototype.compileNode=function(e){var t,n,i,r;return e.indent+=H,r="",n=this.body,n.isEmpty()?n="":(this.returns&&(n.makeReturn(i=e.scope.freeVariable("results")),r=""+this.tab+i+" = [];\n"),this.guard&&(n.expressions.length>1?n.expressions.unshift(new k(new I(this.guard).invert(),new E("continue"))):this.guard&&(n=s.wrap([new k(this.guard,n)]))),n=[].concat(this.makeCode("\n"),n.compileToFragments(e,N),this.makeCode("\n"+this.tab))),t=[].concat(this.makeCode(r+this.tab+"while ("),this.condition.compileToFragments(e,L),this.makeCode(") {"),n,this.makeCode("}")),this.returns&&t.push(this.makeCode("\n"+this.tab+"return "+i+";")),t},t}(r),e.Op=R=function(e){function t(e,t,i,r){if("in"===e)return new v(t,i);if("do"===e)return this.generateDo(t);if("new"===e){if(t instanceof a&&!t["do"]&&!t.isNew)return t.newInstance();(t instanceof h&&t.bound||t["do"])&&(t=new I(t))}return this.operator=n[e]||e,this.first=t,this.second=i,this.flip=!!r,this}var n,r;return vt(t,e),n={"==":"===","!=":"!==",of:"in"},r={"!==":"===","===":"!=="},t.prototype.children=["first","second"],t.prototype.isSimpleNumber=S,t.prototype.isUnary=function(){return!this.second},t.prototype.isComplex=function(){var e;return!(this.isUnary()&&("+"===(e=this.operator)||"-"===e))||this.first.isComplex()},t.prototype.isChainable=function(){var e;return"<"===(e=this.operator)||">"===e||">="===e||"<="===e||"==="===e||"!=="===e},t.prototype.invert=function(){var e,n,i,s,a;if(this.isChainable()&&this.first.isChainable()){for(e=!0,n=this;n&&n.operator;)e&&(e=n.operator in r),n=n.first;if(!e)return new I(this).invert();for(n=this;n&&n.operator;)n.invert=!n.invert,n.operator=r[n.operator],n=n.first;return this}return(s=r[this.operator])?(this.operator=s,this.first.unwrap()instanceof t&&this.first.invert(),this):this.second?new I(this).invert():"!"===this.operator&&(i=this.first.unwrap())instanceof t&&("!"===(a=i.operator)||"in"===a||"instanceof"===a)?i:new t("!",this)},t.prototype.unfoldSoak=function(e){var t;return("++"===(t=this.operator)||"--"===t||"delete"===t)&&pt(e,this,"first")},t.prototype.generateDo=function(e){var t,n,r,s,o,c,l,u;for(s=[],n=e instanceof i&&(o=e.value.unwrap())instanceof h?o:e,u=n.params||[],c=0,l=u.length;l>c;c++)r=u[c],r.value?(s.push(r.value),delete r.value):s.push(r);return t=new a(e,s),t["do"]=!0,t},t.prototype.compileNode=function(e){var t,n,i,r;return n=this.isChainable()&&this.first.isChainable(),n||(this.first.front=this.front),"delete"===this.operator&&e.scope.check(this.first.unwrapAll().value)&&this.error("delete operand may not be argument or var"),("--"===(i=this.operator)||"++"===i)&&(r=this.first.unwrapAll().value,yt.call(V,r)>=0)&&this.error('cannot increment/decrement "'+this.first.unwrapAll().value+'"'),this.isUnary()?this.compileUnary(e):n?this.compileChain(e):"?"===this.operator?this.compileExistence(e):(t=[].concat(this.first.compileToFragments(e,F),this.makeCode(" "+this.operator+" "),this.second.compileToFragments(e,F)),F>=e.level?t:this.wrapInBraces(t))},t.prototype.compileChain=function(e){var t,n,i,r;return r=this.first.second.cache(e),this.first.second=r[0],i=r[1],n=this.first.compileToFragments(e,F),t=n.concat(this.makeCode(" "+(this.invert?"&&":"||")+" "),i.compileToFragments(e),this.makeCode(" "+this.operator+" "),this.second.compileToFragments(e,F)),this.wrapInBraces(t)},t.prototype.compileExistence=function(e){var t,n;return this.first.isComplex()?(n=new E(e.scope.freeVariable("ref")),t=new I(new i(n,this.first))):(t=this.first,n=t),new k(new p(t),n,{type:"if"}).addElse(this.second).compileToFragments(e)},t.prototype.compileUnary=function(e){var n,i,r;return i=[],n=this.operator,i.push([this.makeCode(n)]),"!"===n&&this.first instanceof p?(this.first.negated=!this.first.negated,this.first.compileToFragments(e)):e.level>=w?new I(this).compileToFragments(e):(r="+"===n||"-"===n,("new"===n||"typeof"===n||"delete"===n||r&&this.first instanceof t&&this.first.operator===n)&&i.push([this.makeCode(" ")]),(r&&this.first instanceof t||"new"===n&&this.first.isStatement(e))&&(this.first=new I(this.first)),i.push(this.first.compileToFragments(e,F)),this.flip&&i.reverse(),this.joinFragmentArrays(i,""))},t.prototype.toString=function(e){return t.__super__.toString.call(this,e,this.constructor.name+" "+this.operator)},t}(r),e.In=v=function(e){function t(e,t){this.object=e,this.array=t}return vt(t,e),t.prototype.children=["object","array"],t.prototype.invert=x,t.prototype.compileNode=function(e){var t,n,i,r,s;if(this.array instanceof K&&this.array.isArray()){for(s=this.array.base.objects,i=0,r=s.length;r>i;i++)if(n=s[i],n instanceof U){t=!0;break}if(!t)return this.compileOrTest(e)}return this.compileLoopTest(e)},t.prototype.compileOrTest=function(e){var t,n,i,r,s,a,o,c,h,l,u,p;if(0===this.array.base.objects.length)return[this.makeCode(""+!!this.negated)];for(l=this.object.cache(e,F),a=l[0],s=l[1],u=this.negated?[" !== "," && "]:[" === "," || "],t=u[0],n=u[1],o=[],p=this.array.base.objects,i=c=0,h=p.length;h>c;i=++c)r=p[i],i&&o.push(this.makeCode(n)),o=o.concat(i?s:a,this.makeCode(t),r.compileToFragments(e,w));return F>e.level?o:this.wrapInBraces(o)},t.prototype.compileLoopTest=function(e){var t,n,i,r;return r=this.object.cache(e,C),i=r[0],n=r[1],t=[].concat(this.makeCode(dt("indexOf")+".call("),this.array.compileToFragments(e,C),this.makeCode(", "),n,this.makeCode(") "+(this.negated?"< 0":">= 0"))),rt(i)===rt(n)?t:(t=i.concat(this.makeCode(", "),t),C>e.level?t:this.wrapInBraces(t))},t.prototype.toString=function(e){return t.__super__.toString.call(this,e,this.constructor.name+(this.negated?"!":""))},t}(r),e.Try=X=function(e){function t(e,t,n,i){this.attempt=e,this.errorVariable=t,this.recovery=n,this.ensure=i}return vt(t,e),t.prototype.children=["attempt","recovery","ensure"],t.prototype.isStatement=J,t.prototype.jumps=function(e){var t;return this.attempt.jumps(e)||(null!=(t=this.recovery)?t.jumps(e):void 0)},t.prototype.makeReturn=function(e){return this.attempt&&(this.attempt=this.attempt.makeReturn(e)),this.recovery&&(this.recovery=this.recovery.makeReturn(e)),this},t.prototype.compileNode=function(e){var t,n,r,s,a;return e.indent+=H,s=this.attempt.compileToFragments(e,N),t=this.recovery?(r=new E("_error"),this.recovery.unshift(new i(this.errorVariable,r)),this.errorVariable=r,a=this.errorVariable.value,yt.call(V,a)>=0?this.errorVariable.error('catch variable may not be "'+this.errorVariable.value+'"'):void 0,[].concat(this.makeCode(" catch ("),this.errorVariable.compileToFragments(e),this.makeCode(") {\n"),this.recovery.compileToFragments(e,N),this.makeCode("\n"+this.tab+"}"))):this.ensure||this.recovery?[]:[this.makeCode(" catch (_error) {}")],n=this.ensure?[].concat(this.makeCode(" finally {\n"),this.ensure.compileToFragments(e,N),this.makeCode("\n"+this.tab+"}")):[],[].concat(this.makeCode(""+this.tab+"try {\n"),s,this.makeCode("\n"+this.tab+"}"),t,n)},t}(r),e.Throw=W=function(e){function t(e){this.expression=e}return vt(t,e),t.prototype.children=["expression"],t.prototype.isStatement=J,t.prototype.jumps=S,t.prototype.makeReturn=G,t.prototype.compileNode=function(e){return[].concat(this.makeCode(this.tab+"throw "),this.expression.compileToFragments(e),this.makeCode(";"))},t}(r),e.Existence=p=function(e){function t(e){this.expression=e}return vt(t,e),t.prototype.children=["expression"],t.prototype.invert=x,t.prototype.compileNode=function(e){var t,n,i,r;return this.expression.front=this.front,i=this.expression.compile(e,F),m.test(i)&&!e.scope.check(i)?(r=this.negated?["===","||"]:["!==","&&"],t=r[0],n=r[1],i="typeof "+i+" "+t+' "undefined" '+n+" "+i+" "+t+" null"):i=""+i+" "+(this.negated?"==":"!=")+" null",[this.makeCode(T>=e.level?i:"("+i+")")]},t}(r),e.Parens=I=function(e){function t(e){this.body=e}return vt(t,e),t.prototype.children=["body"],t.prototype.unwrap=function(){return this.body},t.prototype.isComplex=function(){return this.body.isComplex()},t.prototype.compileNode=function(e){var t,n,i;return n=this.body.unwrap(),n instanceof K&&n.isAtomic()?(n.front=this.front,n.compileToFragments(e)):(i=n.compileToFragments(e,L),t=F>e.level&&(n instanceof R||n instanceof a||n instanceof f&&n.returns),t?i:this.wrapInBraces(i))},t}(r),e.For=f=function(e){function t(e,t){var n;this.source=t.source,this.guard=t.guard,this.step=t.step,this.name=t.name,this.index=t.index,this.body=s.wrap([e]),this.own=!!t.own,this.object=!!t.object,this.object&&(n=[this.index,this.name],this.name=n[0],this.index=n[1]),this.index instanceof K&&this.index.error("index cannot be a pattern matching expression"),this.range=this.source instanceof K&&this.source.base instanceof O&&!this.source.properties.length,this.pattern=this.name instanceof K,this.range&&this.index&&this.index.error("indexes do not apply to range loops"),this.range&&this.pattern&&this.name.error("cannot pattern match over range loops"),this.returns=!1}return vt(t,e),t.prototype.children=["body","source","guard","step"],t.prototype.compileNode=function(e){var t,n,r,a,o,c,h,l,u,p,d,f,g,b,v,y,w,T,F,L,D,x,S,A,R,_,$,O,V,B,P,U,q,G;return t=s.wrap([this.body]),T=null!=(q=st(t.expressions))?q.jumps():void 0,T&&T instanceof M&&(this.returns=!1),$=this.range?this.source.base:this.source,_=e.scope,L=this.name&&this.name.compile(e,C),b=this.index&&this.index.compile(e,C),L&&!this.pattern&&_.find(L),b&&_.find(b),this.returns&&(R=_.freeVariable("results")),v=this.object&&b||_.freeVariable("i"),y=this.range&&L||b||v,w=y!==v?""+y+" = ":"",this.step&&!this.range&&(G=this.cacheToCodeFragments(this.step.cache(e,C)),O=G[0],B=G[1],V=B.match(j)),this.pattern&&(L=v),U="",d="",h="",f=this.tab+H,this.range?p=$.compileToFragments(ot(e,{index:v,name:L,step:this.step})):(P=this.source.compile(e,C),!L&&!this.own||m.test(P)||(h+=""+this.tab+(x=_.freeVariable("ref"))+" = "+P+";\n",P=x),L&&!this.pattern&&(D=""+L+" = "+P+"["+y+"]"),this.object||(O!==B&&(h+=""+this.tab+O+";\n"),this.step&&V&&(u=0>+V)||(F=_.freeVariable("len")),o=""+w+v+" = 0, "+F+" = "+P+".length",c=""+w+v+" = "+P+".length - 1",r=""+v+" < "+F,a=""+v+" >= 0",this.step?(V?u&&(r=a,o=c):(r=""+B+" > 0 ? "+r+" : "+a,o="("+B+" > 0 ? ("+o+") : "+c+")"),g=""+v+" += "+B):g=""+(y!==v?"++"+v:""+v+"++"),p=[this.makeCode(""+o+"; "+r+"; "+w+g)])),this.returns&&(S=""+this.tab+R+" = [];\n",A="\n"+this.tab+"return "+R+";",t.makeReturn(R)),this.guard&&(t.expressions.length>1?t.expressions.unshift(new k(new I(this.guard).invert(),new E("continue"))):this.guard&&(t=s.wrap([new k(this.guard,t)]))),this.pattern&&t.expressions.unshift(new i(this.name,new E(""+P+"["+y+"]"))),l=[].concat(this.makeCode(h),this.pluckDirectCall(e,t)),D&&(U="\n"+f+D+";"),this.object&&(p=[this.makeCode(""+y+" in "+P)],this.own&&(d="\n"+f+"if (!"+dt("hasProp")+".call("+P+", "+y+")) continue;")),n=t.compileToFragments(ot(e,{indent:f}),N),n&&n.length>0&&(n=[].concat(this.makeCode("\n"),n,this.makeCode("\n"))),[].concat(l,this.makeCode(""+(S||"")+this.tab+"for ("),p,this.makeCode(") {"+d+U),n,this.makeCode(""+this.tab+"}"+(A||"")))},t.prototype.pluckDirectCall=function(e,t){var n,r,s,o,c,l,u,p,d,f,m,g,b,k,v;for(r=[],f=t.expressions,c=p=0,d=f.length;d>p;c=++p)s=f[c],s=s.unwrapAll(),s instanceof a&&(u=s.variable.unwrapAll(),(u instanceof h||u instanceof K&&(null!=(m=u.base)?m.unwrapAll():void 0)instanceof h&&1===u.properties.length&&("call"===(g=null!=(b=u.properties[0].name)?b.value:void 0)||"apply"===g))&&(o=(null!=(k=u.base)?k.unwrapAll():void 0)||u,l=new E(e.scope.freeVariable("fn")),n=new K(l),u.base&&(v=[n,u],u.base=v[0],n=v[1]),t.expressions[c]=new a(n,s.args),r=r.concat(this.makeCode(this.tab),new i(l,o).compileToFragments(e,N),this.makeCode(";\n"))));return r},t}(z),e.Switch=q=function(e){function t(e,t,n){this.subject=e,this.cases=t,this.otherwise=n}return vt(t,e),t.prototype.children=["subject","cases","otherwise"],t.prototype.isStatement=J,t.prototype.jumps=function(e){var t,n,i,r,s,a,o;for(null==e&&(e={block:!0}),s=this.cases,i=0,r=s.length;r>i;i++)if(a=s[i],n=a[0],t=a[1],t.jumps(e))return t;return null!=(o=this.otherwise)?o.jumps(e):void 0},t.prototype.makeReturn=function(e){var t,n,i,r,a;for(r=this.cases,n=0,i=r.length;i>n;n++)t=r[n],t[1].makeReturn(e);return e&&(this.otherwise||(this.otherwise=new s([new E("void 0")]))),null!=(a=this.otherwise)&&a.makeReturn(e),this},t.prototype.compileNode=function(e){var t,n,i,r,s,a,o,c,h,l,u,p,d,f,m,g;for(c=e.indent+H,h=e.indent=c+H,a=[].concat(this.makeCode(this.tab+"switch ("),this.subject?this.subject.compileToFragments(e,L):this.makeCode("false"),this.makeCode(") {\n")),f=this.cases,o=l=0,p=f.length;p>l;o=++l){for(m=f[o],r=m[0],t=m[1],g=it([r]),u=0,d=g.length;d>u;u++)i=g[u],this.subject||(i=i.invert()),a=a.concat(this.makeCode(c+"case "),i.compileToFragments(e,L),this.makeCode(":\n"));if((n=t.compileToFragments(e,N)).length>0&&(a=a.concat(n,this.makeCode("\n"))),o===this.cases.length-1&&!this.otherwise)break;s=this.lastNonComment(t.expressions),s instanceof M||s instanceof E&&s.jumps()&&"debugger"!==s.value||a.push(i.makeCode(h+"break;\n"))}return this.otherwise&&this.otherwise.expressions.length&&a.push.apply(a,[this.makeCode(c+"default:\n")].concat(wt.call(this.otherwise.compileToFragments(e,N)),[this.makeCode("\n")])),a.push(this.makeCode(this.tab+"}")),a},t}(r),e.If=k=function(e){function t(e,t,n){this.body=t,null==n&&(n={}),this.condition="unless"===n.type?e.invert():e,this.elseBody=null,this.isChain=!1,this.soak=n.soak}return vt(t,e),t.prototype.children=["condition","body","elseBody"],t.prototype.bodyNode=function(){var e;return null!=(e=this.body)?e.unwrap():void 0},t.prototype.elseBodyNode=function(){var e;return null!=(e=this.elseBody)?e.unwrap():void 0},t.prototype.addElse=function(e){return this.isChain?this.elseBodyNode().addElse(e):(this.isChain=e instanceof t,this.elseBody=this.ensureBlock(e)),this},t.prototype.isStatement=function(e){var t;return(null!=e?e.level:void 0)===N||this.bodyNode().isStatement(e)||(null!=(t=this.elseBodyNode())?t.isStatement(e):void 0)},t.prototype.jumps=function(e){var t;return this.body.jumps(e)||(null!=(t=this.elseBody)?t.jumps(e):void 0)},t.prototype.compileNode=function(e){return this.isStatement(e)?this.compileStatement(e):this.compileExpression(e)},t.prototype.makeReturn=function(e){return e&&(this.elseBody||(this.elseBody=new s([new E("void 0")]))),this.body&&(this.body=new s([this.body.makeReturn(e)])),this.elseBody&&(this.elseBody=new s([this.elseBody.makeReturn(e)])),this},t.prototype.ensureBlock=function(e){return e instanceof s?e:new s([e])},t.prototype.compileStatement=function(e){var n,i,r,s,a,o,c;return r=et(e,"chainChild"),(a=et(e,"isExistentialEquals"))?new t(this.condition.invert(),this.elseBodyNode(),{type:"if"}).compileToFragments(e):(c=e.indent+H,s=this.condition.compileToFragments(e,L),i=this.ensureBlock(this.body).compileToFragments(ot(e,{indent:c})),o=[].concat(this.makeCode("if ("),s,this.makeCode(") {\n"),i,this.makeCode("\n"+this.tab+"}")),r||o.unshift(this.makeCode(this.tab)),this.elseBody?(n=o.concat(this.makeCode(" else ")),this.isChain?(e.chainChild=!0,n=n.concat(this.elseBody.unwrap().compileToFragments(e,N))):n=n.concat(this.makeCode("{\n"),this.elseBody.compileToFragments(ot(e,{indent:c}),N),this.makeCode("\n"+this.tab+"}")),n):o)},t.prototype.compileExpression=function(e){var t,n,i,r;return i=this.condition.compileToFragments(e,T),n=this.bodyNode().compileToFragments(e,C),t=this.elseBodyNode()?this.elseBodyNode().compileToFragments(e,C):[this.makeCode("void 0")],r=i.concat(this.makeCode(" ? "),n,this.makeCode(" : "),t),e.level>=T?this.wrapInBraces(r):r},t.prototype.unfoldSoak=function(){return this.soak&&this},t}(r),c={wrap:function(e,n,i){var r,o,c,l,u;return e.jumps()?e:(l=new h([],s.wrap([e])),r=[],o=e.contains(this.isLiteralArguments),o&&e.classBody&&o.error("Class bodies shouldn't reference arguments"),(o||e.contains(this.isLiteralThis))&&(u=new E(o?"apply":"call"),r=[new E("this")],o&&r.push(new E("arguments")),l=new K(l,[new t(u)])),l.noReturn=i,c=new a(l,r),n?s.wrap([c]):c)},isLiteralArguments:function(e){return e instanceof E&&"arguments"===e.value&&!e.asKey},isLiteralThis:function(e){return e instanceof E&&"this"===e.value&&!e.asKey||e instanceof h&&e.bound||e instanceof a&&e.isSuper}},pt=function(e,t,n){var i;if(i=t[n].unfoldSoak(e))return t[n]=i.body,i.body=new K(t),i},Y={"extends":function(){return"function(child, parent) { for (var key in parent) { if ("+dt("hasProp")+".call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; }"},bind:function(){return"function(fn, me){ return function(){ return fn.apply(me, arguments); }; }"},indexOf:function(){return"[].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; }"},hasProp:function(){return"{}.hasOwnProperty"},slice:function(){return"[].slice"}},N=1,L=2,C=3,T=4,F=5,w=6,H="  ",g="[$A-Za-z_\\x7f-\\uffff][$\\w\\x7f-\\uffff]*",m=RegExp("^"+g+"$"),j=/^[+-]?\d+$/,D=RegExp("^(?:("+g+")\\.prototype(?:\\.("+g+")|\\[(\"(?:[^\\\\\"\\r\\n]|\\\\.)*\"|'(?:[^\\\\'\\r\\n]|\\\\.)*')\\]|\\[(0x[\\da-fA-F]+|\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\]))|("+g+")$"),b=/^['"]/,dt=function(e){var t;return t="__"+e,B.root.assign(t,Y[e]()),t},ct=function(e,t){return e=e.replace(/\n/g,"$&"+t),e.replace(/\s+$/,"")}}).call(this)},require["./sourcemap"]=new function(){var e=this;(function(){var t,n,i,r,s,a,o,c;n=function(){function e(e){this.generatedLine=e,this.columnMap={},this.columnMappings=[]}return e.prototype.addMapping=function(e,t,n){var i,r;return r=t[0],i=t[1],null==n&&(n={}),this.columnMap[e]&&n.noReplace?void 0:(this.columnMap[e]={generatedLine:this.generatedLine,generatedColumn:e,sourceLine:r,sourceColumn:i},this.columnMappings.push(this.columnMap[e]),this.columnMappings.sort(function(e,t){return e.generatedColumn-t.generatedColumn}))},e.prototype.getSourcePosition=function(e){var t,n,i,r,s,a;for(t=null,i=null,a=this.columnMappings,r=0,s=a.length;s>r&&(n=a[r],!(n.generatedColumn>e));r++)i=n;return i?t=[i.sourceLine,i.sourceColumn]:void 0},e}(),e.SourceMap=function(){function e(){this.generatedLines=[]}return e.prototype.addMapping=function(e,t,i){var r,s,a;return null==i&&(i={}),s=t[0],r=t[1],a=this.generatedLines[s],a||(a=this.generatedLines[s]=new n(s)),a.addMapping(r,e,i)},e.prototype.getSourcePosition=function(e){var t,n,i,r;return i=e[0],n=e[1],t=null,r=this.generatedLines[i],r&&(t=r.getSourcePosition(n)),t},e.prototype.forEachMapping=function(e){var t,n,i,r,s,a,o;for(a=this.generatedLines,o=[],n=r=0,s=a.length;s>r;n=++r)i=a[n],i?o.push(function(){var n,r,s,a;for(s=i.columnMappings,a=[],n=0,r=s.length;r>n;n++)t=s[n],a.push(e(t));return a}()):o.push(void 0);return o},e}(),e.generateV3SourceMap=function(t,n,i){var r,s,a,o,c,h,l,u,p,d;return null==n&&(n={}),p=n.sourceRoot||"",u=n.sourceFiles||[""],s=n.generatedFile||"",d=0,a=0,c=0,o=0,l=!1,h="",t.forEachMapping(function(t){for(;t.generatedLine>d;)a=0,l=!1,h+=";",d++;return l&&(h+=",",l=!1),h+=e.vlqEncodeValue(t.generatedColumn-a),a=t.generatedColumn,h+=e.vlqEncodeValue(0),h+=e.vlqEncodeValue(t.sourceLine-c),c=t.sourceLine,h+=e.vlqEncodeValue(t.sourceColumn-o),o=t.sourceColumn,l=!0}),r={version:3,file:s,sourceRoot:p,sources:u,names:[],mappings:h},n.inline&&(r.sourcesContent=[i]),JSON.stringify(r,null,2)},e.loadV3SourceMap=function(){return todo()},t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",i=t.length-1,c=function(e){if(e>i)throw Error("Cannot encode value "+e+" > "+i);if(0>e)throw Error("Cannot encode value "+e+" < 0");return t[e]},o=function(e){var n;if(n=t.indexOf(e),-1===n)throw Error("Invalid Base 64 character: "+e);return n},s=5,r=1<<s,a=r-1,e.vlqEncodeValue=function(e){var t,n,i,o;for(i=0>e?1:0,o=(Math.abs(e)<<1)+i,t="";o||!t;)n=o&a,o>>=s,o&&(n|=r),t+=c(n);return t},e.vlqDecodeValue=function(e,t){var n,i,c,h,l,u,p,d;for(null==t&&(t=0),u=t,c=!1,d=0,i=0;!c;)l=o(e[u]),u+=1,h=l&a,d+=h<<i,l&r||(c=!0),i+=s;return n=u-t,p=1&d,d>>=1,p&&(d=-d),[d,n]}}).call(this)},require["./coffee-script"]=new function(){var e=this;(function(){var t,n,i,r,s,a,o,c,h,l,u,p,d,f,m,g,b,k,v,y={}.hasOwnProperty;if(o=require("fs"),g=require("vm"),f=require("path"),n=require("child_process"),t=require("./lexer").Lexer,u=require("./parser").parser,c=require("./helpers"),m=require("./sourcemap"),e.VERSION="1.6.2",e.helpers=c,e.compile=i=function(t,n){var i,r,s,a,o,l,p,d,f,g,b,k;for(null==n&&(n={}),d=e.helpers.merge,n.sourceMap&&(g=new m.SourceMap),o=u.parse(h.tokenize(t,n)).compileToFragments(n),s=0,(n.header||n.inline)&&(s+=1),r=0,p="",b=0,k=o.length;k>b;b++)a=o[b],g&&(a.locationData&&g.addMapping([a.locationData.first_line,a.locationData.first_column],[s,r],{noReplace:!0}),f=c.count(a.code,"\n"),s+=f,r=a.code.length-(f?a.code.lastIndexOf("\n"):0)),p+=a.code;return n.header&&(l="Generated by CoffeeScript "+this.VERSION,p="// "+l+"\n"+p),n.sourceMap?(i={js:p},g&&(i.sourceMap=g,i.v3SourceMap=m.generateV3SourceMap(g,n,t)),i):p},e.tokens=function(e,t){return h.tokenize(e,t)},e.nodes=function(e,t){return"string"==typeof e?u.parse(h.tokenize(e,t)):u.parse(e)},e.run=function(e,t){var n,r,s;return null==t&&(t={}),r=require.main,null==(s=t.sourceMap)&&(t.sourceMap=!0),r.filename=process.argv[1]=t.filename?o.realpathSync(t.filename):".",r.moduleCache&&(r.moduleCache={}),r.paths=require("module")._nodeModulePaths(f.dirname(o.realpathSync(t.filename||"."))),!c.isCoffee(r.filename)||require.extensions?(n=i(e,t),p(),r._sourceMaps[r.filename]=n.sourceMap,r._compile(n.js,r.filename)):r._compile(e,r.filename)},e.eval=function(e,t){var n,r,s,a,o,c,h,l,u,p,d,m,b,k;if(null==t&&(t={}),e=e.trim()){if(r=g.Script){if(null!=t.sandbox){if(t.sandbox instanceof r.createContext().constructor)h=t.sandbox;else{h=r.createContext(),m=t.sandbox;for(a in m)y.call(m,a)&&(l=m[a],h[a]=l)}h.global=h.root=h.GLOBAL=h}else h=global;if(h.__filename=t.filename||"eval",h.__dirname=f.dirname(h.__filename),h===global&&!h.module&&!h.require){for(n=require("module"),h.module=d=new n(t.modulename||"eval"),h.require=k=function(e){return n._load(e,d,!0)},d.filename=h.__filename,b=Object.getOwnPropertyNames(require),u=0,p=b.length;p>u;u++)c=b[u],"paths"!==c&&(k[c]=require[c]);k.paths=d.paths=n._nodeModulePaths(process.cwd()),k.resolve=function(e){return n._resolveFilename(e,d)}}}o={};for(a in t)y.call(t,a)&&(l=t[a],o[a]=l);return o.bare=!0,s=i(e,o),h===global?g.runInThisContext(s):g.runInContext(s,h)}},l=function(e,t){var n,r;return n=o.readFileSync(t,"utf8"),r=65279===n.charCodeAt(0)?n.substring(1):n,e._compile(i(r,{filename:t,literate:c.isLiterate(t)}),t)},require.extensions)for(v=[".coffee",".litcoffee",".coffee.md"],b=0,k=v.length;k>b;b++)r=v[b],require.extensions[r]=l;n&&(s=n.fork,n.fork=function(e,t,n){var i;return null==t&&(t=[]),null==n&&(n={}),i=c.isCoffee(e)?"coffee":null,Array.isArray(t)||(t=[],n=t||{}),n.execPath||(n.execPath=i),s(e,t,n)}),h=new t,u.lexer={lex:function(){var e,t;return t=this.tokens[this.pos++],t?(e=t[0],this.yytext=t[1],this.yylloc=t[2],this.yylineno=this.yylloc.first_line):e="",e},setInput:function(e){return this.tokens=e,this.pos=0},upcomingInput:function(){return""}},u.yy=require("./nodes"),u.yy.parseError=function(e,t){var n;return n=t.token,e="unexpected "+(1===n?"end of input":n),c.throwSyntaxError(e,u.lexer.yylloc)},d=!1,p=function(){var t;if(!d)return d=!0,t=require.main,t._sourceMaps={},Error.prepareStackTrace=function(n,i){var r,s,o,c,h;return c={},o=function(e,n,i){var r,s;return s=t._sourceMaps[e],s&&(r=s.getSourcePosition([n-1,i-1])),r?[r[0]+1,r[1]+1]:null},s=function(){var t,n,s;for(s=[],t=0,n=i.length;n>t&&(r=i[t],r.getFunction()!==e.run);t++)s.push("  at "+a(r,o));return s}(),""+n.name+": "+(null!=(h=n.message)?h:"")+"\n"+s.join("\n")+"\n"}},a=function(e,t){var n,i,r,s,a,o,c,h,l,u,p,d;return s=void 0,r="",e.isNative()?r="native":(e.isEval()?(s=e.getScriptNameOrSourceURL(),s||(r=""+e.getEvalOrigin()+", ")):s=e.getFileName(),s||(s="<anonymous>"),h=e.getLineNumber(),i=e.getColumnNumber(),u=t(s,h,i),r=u?""+s+":"+u[0]+":"+u[1]+", <js>:"+h+":"+i:""+s+":"+h+":"+i),a=e.getFunctionName(),o=e.isConstructor(),c=!(e.isToplevel()||o),c?(l=e.getMethodName(),d=e.getTypeName(),a?(p=n="",d&&a.indexOf(d)&&(p=""+d+"."),l&&a.indexOf("."+l)!==a.length-l.length-1&&(n=" [as "+l+"]"),""+p+a+n+" ("+r+")"):""+d+"."+(l||"<anonymous>")+" ("+r+")"):o?"new "+(a||"<anonymous>")+" ("+r+")":a?""+a+" ("+r+")":r}}).call(this)},require["./browser"]=new function(){var exports=this;(function(){var CoffeeScript,compile,runScripts,__indexOf=[].indexOf||function(e){for(var t=0,n=this.length;n>t;t++)if(t in this&&this[t]===e)return t;return-1};CoffeeScript=require("./coffee-script"),CoffeeScript.require=require,compile=CoffeeScript.compile,CoffeeScript.eval=function(code,options){var _ref;return null==options&&(options={}),null==(_ref=options.bare)&&(options.bare=!0),eval(compile(code,options))},CoffeeScript.run=function(e,t){return null==t&&(t={}),t.bare=!0,Function(compile(e,t))()},"undefined"!=typeof window&&null!==window&&("undefined"!=typeof btoa&&null!==btoa&&"undefined"!=typeof JSON&&null!==JSON&&(compile=function(e,t){var n,i,r;return null==t&&(t={}),t.sourceMap=!0,t.inline=!0,r=CoffeeScript.compile(e,t),n=r.js,i=r.v3SourceMap,""+n+"\n//@ sourceMappingURL=data:application/json;base64,"+btoa(i)+"\n//@ sourceURL=coffeescript"}),CoffeeScript.load=function(e,t,n){var i;return null==n&&(n={}),n.sourceFiles=[e],i=window.ActiveXObject?new window.ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest,i.open("GET",e,!0),"overrideMimeType"in i&&i.overrideMimeType("text/plain"),i.onreadystatechange=function(){var r;
if(4===i.readyState){if(0!==(r=i.status)&&200!==r)throw Error("Could not load "+e);if(CoffeeScript.run(i.responseText,n),t)return t()}},i.send(null)},runScripts=function(){var e,t,n,i,r,s,a;return a=document.getElementsByTagName("script"),t=["text/coffeescript","text/literate-coffeescript"],e=function(){var e,n,i,r;for(r=[],e=0,n=a.length;n>e;e++)s=a[e],i=s.type,__indexOf.call(t,i)>=0&&r.push(s);return r}(),i=0,r=e.length,(n=function(){var r,s,a;return a=e[i++],r=null!=a?a.type:void 0,__indexOf.call(t,r)>=0?(s={literate:"text/literate-coffeescript"===r},a.src?CoffeeScript.load(a.src,n,s):(s.sourceFiles=["embedded"],CoffeeScript.run(a.innerHTML,s),n())):void 0})(),null},window.addEventListener?addEventListener("DOMContentLoaded",runScripts,!1):attachEvent("onload",runScripts))}).call(this)},require["./coffee-script"]}();"function"==typeof define&&define.amd?define(function(){return CoffeeScript}):root.CoffeeScript=CoffeeScript})(this);
/*!
 * jQuery JavaScript Library v1.7.2
 * http://jquery.com/
 *
 * Copyright 2011, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2011, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Date: Wed Mar 21 12:46:34 2012 -0700
 */
(function( window, undefined ) {

// Use the correct document accordingly with window argument (sandbox)
  var document = window.document,
      navigator = window.navigator,
      location = window.location;
  var jQuery = (function() {

// Define a local copy of jQuery
    var jQuery = function( selector, context ) {
          // The jQuery object is actually just the init constructor 'enhanced'
          return new jQuery.fn.init( selector, context, rootjQuery );
        },

    // Map over jQuery in case of overwrite
        _jQuery = window.jQuery,

    // Map over the $ in case of overwrite
        _$ = window.$,

    // A central reference to the root jQuery(document)
        rootjQuery,

    // A simple way to check for HTML strings or ID strings
    // Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
        quickExpr = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,

    // Check if a string has a non-whitespace character in it
        rnotwhite = /\S/,

    // Used for trimming whitespace
        trimLeft = /^\s+/,
        trimRight = /\s+$/,

    // Match a standalone tag
        rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,

    // JSON RegExp
        rvalidchars = /^[\],:{}\s]*$/,
        rvalidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
        rvalidtokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
        rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,

    // Useragent RegExp
        rwebkit = /(webkit)[ \/]([\w.]+)/,
        ropera = /(opera)(?:.*version)?[ \/]([\w.]+)/,
        rmsie = /(msie) ([\w.]+)/,
        rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/,

    // Matches dashed string for camelizing
        rdashAlpha = /-([a-z]|[0-9])/ig,
        rmsPrefix = /^-ms-/,

    // Used by jQuery.camelCase as callback to replace()
        fcamelCase = function( all, letter ) {
          return ( letter + "" ).toUpperCase();
        },

    // Keep a UserAgent string for use with jQuery.browser
        userAgent = navigator.userAgent,

    // For matching the engine and version of the browser
        browserMatch,

    // The deferred used on DOM ready
        readyList,

    // The ready event handler
        DOMContentLoaded,

    // Save a reference to some core methods
        toString = Object.prototype.toString,
        hasOwn = Object.prototype.hasOwnProperty,
        push = Array.prototype.push,
        slice = Array.prototype.slice,
        trim = String.prototype.trim,
        indexOf = Array.prototype.indexOf,

    // [[Class]] -> type pairs
        class2type = {};

    jQuery.fn = jQuery.prototype = {
      constructor: jQuery,
      init: function( selector, context, rootjQuery ) {
        var match, elem, ret, doc;

        // Handle $(""), $(null), or $(undefined)
        if ( !selector ) {
          return this;
        }

        // Handle $(DOMElement)
        if ( selector.nodeType ) {
          this.context = this[0] = selector;
          this.length = 1;
          return this;
        }

        // The body element only exists once, optimize finding it
        if ( selector === "body" && !context && document.body ) {
          this.context = document;
          this[0] = document.body;
          this.selector = selector;
          this.length = 1;
          return this;
        }

        // Handle HTML strings
        if ( typeof selector === "string" ) {
          // Are we dealing with HTML string or an ID?
          if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
            // Assume that strings that start and end with <> are HTML and skip the regex check
            match = [ null, selector, null ];

          } else {
            match = quickExpr.exec( selector );
          }

          // Verify a match, and that no context was specified for #id
          if ( match && (match[1] || !context) ) {

            // HANDLE: $(html) -> $(array)
            if ( match[1] ) {
              context = context instanceof jQuery ? context[0] : context;
              doc = ( context ? context.ownerDocument || context : document );

              // If a single string is passed in and it's a single tag
              // just do a createElement and skip the rest
              ret = rsingleTag.exec( selector );

              if ( ret ) {
                if ( jQuery.isPlainObject( context ) ) {
                  selector = [ document.createElement( ret[1] ) ];
                  jQuery.fn.attr.call( selector, context, true );

                } else {
                  selector = [ doc.createElement( ret[1] ) ];
                }

              } else {
                ret = jQuery.buildFragment( [ match[1] ], [ doc ] );
                selector = ( ret.cacheable ? jQuery.clone(ret.fragment) : ret.fragment ).childNodes;
              }

              return jQuery.merge( this, selector );

              // HANDLE: $("#id")
            } else {
              elem = document.getElementById( match[2] );

              // Check parentNode to catch when Blackberry 4.6 returns
              // nodes that are no longer in the document #6963
              if ( elem && elem.parentNode ) {
                // Handle the case where IE and Opera return items
                // by name instead of ID
                if ( elem.id !== match[2] ) {
                  return rootjQuery.find( selector );
                }

                // Otherwise, we inject the element directly into the jQuery object
                this.length = 1;
                this[0] = elem;
              }

              this.context = document;
              this.selector = selector;
              return this;
            }

            // HANDLE: $(expr, $(...))
          } else if ( !context || context.jquery ) {
            return ( context || rootjQuery ).find( selector );

            // HANDLE: $(expr, context)
            // (which is just equivalent to: $(context).find(expr)
          } else {
            return this.constructor( context ).find( selector );
          }

          // HANDLE: $(function)
          // Shortcut for document ready
        } else if ( jQuery.isFunction( selector ) ) {
          return rootjQuery.ready( selector );
        }

        if ( selector.selector !== undefined ) {
          this.selector = selector.selector;
          this.context = selector.context;
        }

        return jQuery.makeArray( selector, this );
      },

      // Start with an empty selector
      selector: "",

      // The current version of jQuery being used
      jquery: "1.7.2",

      // The default length of a jQuery object is 0
      length: 0,

      // The number of elements contained in the matched element set
      size: function() {
        return this.length;
      },

      toArray: function() {
        return slice.call( this, 0 );
      },

      // Get the Nth element in the matched element set OR
      // Get the whole matched element set as a clean array
      get: function( num ) {
        return num == null ?

          // Return a 'clean' array
            this.toArray() :

          // Return just the object
            ( num < 0 ? this[ this.length + num ] : this[ num ] );
      },

      // Take an array of elements and push it onto the stack
      // (returning the new matched element set)
      pushStack: function( elems, name, selector ) {
        // Build a new jQuery matched element set
        var ret = this.constructor();

        if ( jQuery.isArray( elems ) ) {
          push.apply( ret, elems );

        } else {
          jQuery.merge( ret, elems );
        }

        // Add the old object onto the stack (as a reference)
        ret.prevObject = this;

        ret.context = this.context;

        if ( name === "find" ) {
          ret.selector = this.selector + ( this.selector ? " " : "" ) + selector;
        } else if ( name ) {
          ret.selector = this.selector + "." + name + "(" + selector + ")";
        }

        // Return the newly-formed element set
        return ret;
      },

      // Execute a callback for every element in the matched set.
      // (You can seed the arguments with an array of args, but this is
      // only used internally.)
      each: function( callback, args ) {
        return jQuery.each( this, callback, args );
      },

      ready: function( fn ) {
        // Attach the listeners
        jQuery.bindReady();

        // Add the callback
        readyList.add( fn );

        return this;
      },

      eq: function( i ) {
        i = +i;
        return i === -1 ?
            this.slice( i ) :
            this.slice( i, i + 1 );
      },

      first: function() {
        return this.eq( 0 );
      },

      last: function() {
        return this.eq( -1 );
      },

      slice: function() {
        return this.pushStack( slice.apply( this, arguments ),
            "slice", slice.call(arguments).join(",") );
      },

      map: function( callback ) {
        return this.pushStack( jQuery.map(this, function( elem, i ) {
          return callback.call( elem, i, elem );
        }));
      },

      end: function() {
        return this.prevObject || this.constructor(null);
      },

      // For internal use only.
      // Behaves like an Array's method, not like a jQuery method.
      push: push,
      sort: [].sort,
      splice: [].splice
    };

// Give the init function the jQuery prototype for later instantiation
    jQuery.fn.init.prototype = jQuery.fn;

    jQuery.extend = jQuery.fn.extend = function() {
      var options, name, src, copy, copyIsArray, clone,
          target = arguments[0] || {},
          i = 1,
          length = arguments.length,
          deep = false;

      // Handle a deep copy situation
      if ( typeof target === "boolean" ) {
        deep = target;
        target = arguments[1] || {};
        // skip the boolean and the target
        i = 2;
      }

      // Handle case when target is a string or something (possible in deep copy)
      if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
        target = {};
      }

      // extend jQuery itself if only one argument is passed
      if ( length === i ) {
        target = this;
        --i;
      }

      for ( ; i < length; i++ ) {
        // Only deal with non-null/undefined values
        if ( (options = arguments[ i ]) != null ) {
          // Extend the base object
          for ( name in options ) {
            src = target[ name ];
            copy = options[ name ];

            // Prevent never-ending loop
            if ( target === copy ) {
              continue;
            }

            // Recurse if we're merging plain objects or arrays
            if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
              if ( copyIsArray ) {
                copyIsArray = false;
                clone = src && jQuery.isArray(src) ? src : [];

              } else {
                clone = src && jQuery.isPlainObject(src) ? src : {};
              }

              // Never move original objects, clone them
              target[ name ] = jQuery.extend( deep, clone, copy );

              // Don't bring in undefined values
            } else if ( copy !== undefined ) {
              target[ name ] = copy;
            }
          }
        }
      }

      // Return the modified object
      return target;
    };

    jQuery.extend({
      noConflict: function( deep ) {
        if ( window.$ === jQuery ) {
          window.$ = _$;
        }

        if ( deep && window.jQuery === jQuery ) {
          window.jQuery = _jQuery;
        }

        return jQuery;
      },

      // Is the DOM ready to be used? Set to true once it occurs.
      isReady: false,

      // A counter to track how many items to wait for before
      // the ready event fires. See #6781
      readyWait: 1,

      // Hold (or release) the ready event
      holdReady: function( hold ) {
        if ( hold ) {
          jQuery.readyWait++;
        } else {
          jQuery.ready( true );
        }
      },

      // Handle when the DOM is ready
      ready: function( wait ) {
        // Either a released hold or an DOMready/load event and not yet ready
        if ( (wait === true && !--jQuery.readyWait) || (wait !== true && !jQuery.isReady) ) {
          // Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
          if ( !document.body ) {
            return setTimeout( jQuery.ready, 1 );
          }

          // Remember that the DOM is ready
          jQuery.isReady = true;

          // If a normal DOM Ready event fired, decrement, and wait if need be
          if ( wait !== true && --jQuery.readyWait > 0 ) {
            return;
          }

          // If there are functions bound, to execute
          readyList.fireWith( document, [ jQuery ] );

          // Trigger any bound ready events
          if ( jQuery.fn.trigger ) {
            jQuery( document ).trigger( "ready" ).off( "ready" );
          }
        }
      },

      bindReady: function() {
        if ( readyList ) {
          return;
        }

        readyList = jQuery.Callbacks( "once memory" );

        // Catch cases where $(document).ready() is called after the
        // browser event has already occurred.
        if ( document.readyState === "complete" ) {
          // Handle it asynchronously to allow scripts the opportunity to delay ready
          return setTimeout( jQuery.ready, 1 );
        }

        // Mozilla, Opera and webkit nightlies currently support this event
        if ( document.addEventListener ) {
          // Use the handy event callback
          document.addEventListener( "DOMContentLoaded", DOMContentLoaded, false );

          // A fallback to window.onload, that will always work
          window.addEventListener( "load", jQuery.ready, false );

          // If IE event model is used
        } else if ( document.attachEvent ) {
          // ensure firing before onload,
          // maybe late but safe also for iframes
          document.attachEvent( "onreadystatechange", DOMContentLoaded );

          // A fallback to window.onload, that will always work
          window.attachEvent( "onload", jQuery.ready );

          // If IE and not a frame
          // continually check to see if the document is ready
          var toplevel = false;

          try {
            toplevel = window.frameElement == null;
          } catch(e) {}

          if ( document.documentElement.doScroll && toplevel ) {
            doScrollCheck();
          }
        }
      },

      // See test/unit/core.js for details concerning isFunction.
      // Since version 1.3, DOM methods and functions like alert
      // aren't supported. They return false on IE (#2968).
      isFunction: function( obj ) {
        return jQuery.type(obj) === "function";
      },

      isArray: Array.isArray || function( obj ) {
        return jQuery.type(obj) === "array";
      },

      isWindow: function( obj ) {
        return obj != null && obj == obj.window;
      },

      isNumeric: function( obj ) {
        return !isNaN( parseFloat(obj) ) && isFinite( obj );
      },

      type: function( obj ) {
        return obj == null ?
            String( obj ) :
            class2type[ toString.call(obj) ] || "object";
      },

      isPlainObject: function( obj ) {
        // Must be an Object.
        // Because of IE, we also have to check the presence of the constructor property.
        // Make sure that DOM nodes and window objects don't pass through, as well
        if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
          return false;
        }

        try {
          // Not own constructor property must be Object
          if ( obj.constructor &&
              !hasOwn.call(obj, "constructor") &&
              !hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
            return false;
          }
        } catch ( e ) {
          // IE8,9 Will throw exceptions on certain host objects #9897
          return false;
        }

        // Own properties are enumerated firstly, so to speed up,
        // if last one is own, then all properties are own.

        var key;
        for ( key in obj ) {}

        return key === undefined || hasOwn.call( obj, key );
      },

      isEmptyObject: function( obj ) {
        for ( var name in obj ) {
          return false;
        }
        return true;
      },

      error: function( msg ) {
        throw new Error( msg );
      },

      parseJSON: function( data ) {
        if ( typeof data !== "string" || !data ) {
          return null;
        }

        // Make sure leading/trailing whitespace is removed (IE can't handle it)
        data = jQuery.trim( data );

        // Attempt to parse using the native JSON parser first
        if ( window.JSON && window.JSON.parse ) {
          return window.JSON.parse( data );
        }

        // Make sure the incoming data is actual JSON
        // Logic borrowed from http://json.org/json2.js
        if ( rvalidchars.test( data.replace( rvalidescape, "@" )
            .replace( rvalidtokens, "]" )
            .replace( rvalidbraces, "")) ) {

          return ( new Function( "return " + data ) )();

        }
        jQuery.error( "Invalid JSON: " + data );
      },

      // Cross-browser xml parsing
      parseXML: function( data ) {
        if ( typeof data !== "string" || !data ) {
          return null;
        }
        var xml, tmp;
        try {
          if ( window.DOMParser ) { // Standard
            tmp = new DOMParser();
            xml = tmp.parseFromString( data , "text/xml" );
          } else { // IE
            xml = new ActiveXObject( "Microsoft.XMLDOM" );
            xml.async = "false";
            xml.loadXML( data );
          }
        } catch( e ) {
          xml = undefined;
        }
        if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
          jQuery.error( "Invalid XML: " + data );
        }
        return xml;
      },

      noop: function() {},

      // Evaluates a script in a global context
      // Workarounds based on findings by Jim Driscoll
      // http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
      globalEval: function( data ) {
        if ( data && rnotwhite.test( data ) ) {
          // We use execScript on Internet Explorer
          // We use an anonymous function so that context is window
          // rather than jQuery in Firefox
          ( window.execScript || function( data ) {
            window[ "eval" ].call( window, data );
          } )( data );
        }
      },

      // Convert dashed to camelCase; used by the css and data modules
      // Microsoft forgot to hump their vendor prefix (#9572)
      camelCase: function( string ) {
        return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
      },

      nodeName: function( elem, name ) {
        return elem.nodeName && elem.nodeName.toUpperCase() === name.toUpperCase();
      },

      // args is for internal usage only
      each: function( object, callback, args ) {
        var name, i = 0,
            length = object.length,
            isObj = length === undefined || jQuery.isFunction( object );

        if ( args ) {
          if ( isObj ) {
            for ( name in object ) {
              if ( callback.apply( object[ name ], args ) === false ) {
                break;
              }
            }
          } else {
            for ( ; i < length; ) {
              if ( callback.apply( object[ i++ ], args ) === false ) {
                break;
              }
            }
          }

          // A special, fast, case for the most common use of each
        } else {
          if ( isObj ) {
            for ( name in object ) {
              if ( callback.call( object[ name ], name, object[ name ] ) === false ) {
                break;
              }
            }
          } else {
            for ( ; i < length; ) {
              if ( callback.call( object[ i ], i, object[ i++ ] ) === false ) {
                break;
              }
            }
          }
        }

        return object;
      },

      // Use native String.trim function wherever possible
      trim: trim ?
          function( text ) {
            return text == null ?
                "" :
                trim.call( text );
          } :

        // Otherwise use our own trimming functionality
          function( text ) {
            return text == null ?
                "" :
                text.toString().replace( trimLeft, "" ).replace( trimRight, "" );
          },

      // results is for internal usage only
      makeArray: function( array, results ) {
        var ret = results || [];

        if ( array != null ) {
          // The window, strings (and functions) also have 'length'
          // Tweaked logic slightly to handle Blackberry 4.7 RegExp issues #6930
          var type = jQuery.type( array );

          if ( array.length == null || type === "string" || type === "function" || type === "regexp" || jQuery.isWindow( array ) ) {
            push.call( ret, array );
          } else {
            jQuery.merge( ret, array );
          }
        }

        return ret;
      },

      inArray: function( elem, array, i ) {
        var len;

        if ( array ) {
          if ( indexOf ) {
            return indexOf.call( array, elem, i );
          }

          len = array.length;
          i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

          for ( ; i < len; i++ ) {
            // Skip accessing in sparse arrays
            if ( i in array && array[ i ] === elem ) {
              return i;
            }
          }
        }

        return -1;
      },

      merge: function( first, second ) {
        var i = first.length,
            j = 0;

        if ( typeof second.length === "number" ) {
          for ( var l = second.length; j < l; j++ ) {
            first[ i++ ] = second[ j ];
          }

        } else {
          while ( second[j] !== undefined ) {
            first[ i++ ] = second[ j++ ];
          }
        }

        first.length = i;

        return first;
      },

      grep: function( elems, callback, inv ) {
        var ret = [], retVal;
        inv = !!inv;

        // Go through the array, only saving the items
        // that pass the validator function
        for ( var i = 0, length = elems.length; i < length; i++ ) {
          retVal = !!callback( elems[ i ], i );
          if ( inv !== retVal ) {
            ret.push( elems[ i ] );
          }
        }

        return ret;
      },

      // arg is for internal usage only
      map: function( elems, callback, arg ) {
        var value, key, ret = [],
            i = 0,
            length = elems.length,
        // jquery objects are treated as arrays
            isArray = elems instanceof jQuery || length !== undefined && typeof length === "number" && ( ( length > 0 && elems[ 0 ] && elems[ length -1 ] ) || length === 0 || jQuery.isArray( elems ) ) ;

        // Go through the array, translating each of the items to their
        if ( isArray ) {
          for ( ; i < length; i++ ) {
            value = callback( elems[ i ], i, arg );

            if ( value != null ) {
              ret[ ret.length ] = value;
            }
          }

          // Go through every key on the object,
        } else {
          for ( key in elems ) {
            value = callback( elems[ key ], key, arg );

            if ( value != null ) {
              ret[ ret.length ] = value;
            }
          }
        }

        // Flatten any nested arrays
        return ret.concat.apply( [], ret );
      },

      // A global GUID counter for objects
      guid: 1,

      // Bind a function to a context, optionally partially applying any
      // arguments.
      proxy: function( fn, context ) {
        if ( typeof context === "string" ) {
          var tmp = fn[ context ];
          context = fn;
          fn = tmp;
        }

        // Quick check to determine if target is callable, in the spec
        // this throws a TypeError, but we will just return undefined.
        if ( !jQuery.isFunction( fn ) ) {
          return undefined;
        }

        // Simulated bind
        var args = slice.call( arguments, 2 ),
            proxy = function() {
              return fn.apply( context, args.concat( slice.call( arguments ) ) );
            };

        // Set the guid of unique handler to the same of original handler, so it can be removed
        proxy.guid = fn.guid = fn.guid || proxy.guid || jQuery.guid++;

        return proxy;
      },

      // Mutifunctional method to get and set values to a collection
      // The value/s can optionally be executed if it's a function
      access: function( elems, fn, key, value, chainable, emptyGet, pass ) {
        var exec,
            bulk = key == null,
            i = 0,
            length = elems.length;

        // Sets many values
        if ( key && typeof key === "object" ) {
          for ( i in key ) {
            jQuery.access( elems, fn, i, key[i], 1, emptyGet, value );
          }
          chainable = 1;

          // Sets one value
        } else if ( value !== undefined ) {
          // Optionally, function values get executed if exec is true
          exec = pass === undefined && jQuery.isFunction( value );

          if ( bulk ) {
            // Bulk operations only iterate when executing function values
            if ( exec ) {
              exec = fn;
              fn = function( elem, key, value ) {
                return exec.call( jQuery( elem ), value );
              };

              // Otherwise they run against the entire set
            } else {
              fn.call( elems, value );
              fn = null;
            }
          }

          if ( fn ) {
            for (; i < length; i++ ) {
              fn( elems[i], key, exec ? value.call( elems[i], i, fn( elems[i], key ) ) : value, pass );
            }
          }

          chainable = 1;
        }

        return chainable ?
            elems :

          // Gets
            bulk ?
                fn.call( elems ) :
                length ? fn( elems[0], key ) : emptyGet;
      },

      now: function() {
        return ( new Date() ).getTime();
      },

      // Use of jQuery.browser is frowned upon.
      // More details: http://docs.jquery.com/Utilities/jQuery.browser
      uaMatch: function( ua ) {
        ua = ua.toLowerCase();

        var match = rwebkit.exec( ua ) ||
            ropera.exec( ua ) ||
            rmsie.exec( ua ) ||
            ua.indexOf("compatible") < 0 && rmozilla.exec( ua ) ||
            [];

        return { browser: match[1] || "", version: match[2] || "0" };
      },

      sub: function() {
        function jQuerySub( selector, context ) {
          return new jQuerySub.fn.init( selector, context );
        }
        jQuery.extend( true, jQuerySub, this );
        jQuerySub.superclass = this;
        jQuerySub.fn = jQuerySub.prototype = this();
        jQuerySub.fn.constructor = jQuerySub;
        jQuerySub.sub = this.sub;
        jQuerySub.fn.init = function init( selector, context ) {
          if ( context && context instanceof jQuery && !(context instanceof jQuerySub) ) {
            context = jQuerySub( context );
          }

          return jQuery.fn.init.call( this, selector, context, rootjQuerySub );
        };
        jQuerySub.fn.init.prototype = jQuerySub.fn;
        var rootjQuerySub = jQuerySub(document);
        return jQuerySub;
      },

      browser: {}
    });

// Populate the class2type map
    jQuery.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(i, name) {
      class2type[ "[object " + name + "]" ] = name.toLowerCase();
    });

    browserMatch = jQuery.uaMatch( userAgent );
    if ( browserMatch.browser ) {
      jQuery.browser[ browserMatch.browser ] = true;
      jQuery.browser.version = browserMatch.version;
    }

// Deprecated, use jQuery.browser.webkit instead
    if ( jQuery.browser.webkit ) {
      jQuery.browser.safari = true;
    }

// IE doesn't match non-breaking spaces with \s
    if ( rnotwhite.test( "\xA0" ) ) {
      trimLeft = /^[\s\xA0]+/;
      trimRight = /[\s\xA0]+$/;
    }

// All jQuery objects should point back to these
    rootjQuery = jQuery(document);

// Cleanup functions for the document ready method
    if ( document.addEventListener ) {
      DOMContentLoaded = function() {
        document.removeEventListener( "DOMContentLoaded", DOMContentLoaded, false );
        jQuery.ready();
      };

    } else if ( document.attachEvent ) {
      DOMContentLoaded = function() {
        // Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
        if ( document.readyState === "complete" ) {
          document.detachEvent( "onreadystatechange", DOMContentLoaded );
          jQuery.ready();
        }
      };
    }

// The DOM ready check for Internet Explorer
    function doScrollCheck() {
      if ( jQuery.isReady ) {
        return;
      }

      try {
        // If IE is used, use the trick by Diego Perini
        // http://javascript.nwbox.com/IEContentLoaded/
        document.documentElement.doScroll("left");
      } catch(e) {
        setTimeout( doScrollCheck, 1 );
        return;
      }

      // and execute any waiting functions
      jQuery.ready();
    }

    return jQuery;

  })();


// String to Object flags format cache
  var flagsCache = {};

// Convert String-formatted flags into Object-formatted ones and store in cache
  function createFlags( flags ) {
    var object = flagsCache[ flags ] = {},
        i, length;
    flags = flags.split( /\s+/ );
    for ( i = 0, length = flags.length; i < length; i++ ) {
      object[ flags[i] ] = true;
    }
    return object;
  }

  /*
   * Create a callback list using the following parameters:
   *
   *	flags:	an optional list of space-separated flags that will change how
   *			the callback list behaves
   *
   * By default a callback list will act like an event callback list and can be
   * "fired" multiple times.
   *
   * Possible flags:
   *
   *	once:			will ensure the callback list can only be fired once (like a Deferred)
   *
   *	memory:			will keep track of previous values and will call any callback added
   *					after the list has been fired right away with the latest "memorized"
   *					values (like a Deferred)
   *
   *	unique:			will ensure a callback can only be added once (no duplicate in the list)
   *
   *	stopOnFalse:	interrupt callings when a callback returns false
   *
   */
  jQuery.Callbacks = function( flags ) {

    // Convert flags from String-formatted to Object-formatted
    // (we check in cache first)
    flags = flags ? ( flagsCache[ flags ] || createFlags( flags ) ) : {};

    var // Actual callback list
        list = [],
    // Stack of fire calls for repeatable lists
        stack = [],
    // Last fire value (for non-forgettable lists)
        memory,
    // Flag to know if list was already fired
        fired,
    // Flag to know if list is currently firing
        firing,
    // First callback to fire (used internally by add and fireWith)
        firingStart,
    // End of the loop when firing
        firingLength,
    // Index of currently firing callback (modified by remove if needed)
        firingIndex,
    // Add one or several callbacks to the list
        add = function( args ) {
          var i,
              length,
              elem,
              type,
              actual;
          for ( i = 0, length = args.length; i < length; i++ ) {
            elem = args[ i ];
            type = jQuery.type( elem );
            if ( type === "array" ) {
              // Inspect recursively
              add( elem );
            } else if ( type === "function" ) {
              // Add if not in unique mode and callback is not in
              if ( !flags.unique || !self.has( elem ) ) {
                list.push( elem );
              }
            }
          }
        },
    // Fire callbacks
        fire = function( context, args ) {
          args = args || [];
          memory = !flags.memory || [ context, args ];
          fired = true;
          firing = true;
          firingIndex = firingStart || 0;
          firingStart = 0;
          firingLength = list.length;
          for ( ; list && firingIndex < firingLength; firingIndex++ ) {
            if ( list[ firingIndex ].apply( context, args ) === false && flags.stopOnFalse ) {
              memory = true; // Mark as halted
              break;
            }
          }
          firing = false;
          if ( list ) {
            if ( !flags.once ) {
              if ( stack && stack.length ) {
                memory = stack.shift();
                self.fireWith( memory[ 0 ], memory[ 1 ] );
              }
            } else if ( memory === true ) {
              self.disable();
            } else {
              list = [];
            }
          }
        },
    // Actual Callbacks object
        self = {
          // Add a callback or a collection of callbacks to the list
          add: function() {
            if ( list ) {
              var length = list.length;
              add( arguments );
              // Do we need to add the callbacks to the
              // current firing batch?
              if ( firing ) {
                firingLength = list.length;
                // With memory, if we're not firing then
                // we should call right away, unless previous
                // firing was halted (stopOnFalse)
              } else if ( memory && memory !== true ) {
                firingStart = length;
                fire( memory[ 0 ], memory[ 1 ] );
              }
            }
            return this;
          },
          // Remove a callback from the list
          remove: function() {
            if ( list ) {
              var args = arguments,
                  argIndex = 0,
                  argLength = args.length;
              for ( ; argIndex < argLength ; argIndex++ ) {
                for ( var i = 0; i < list.length; i++ ) {
                  if ( args[ argIndex ] === list[ i ] ) {
                    // Handle firingIndex and firingLength
                    if ( firing ) {
                      if ( i <= firingLength ) {
                        firingLength--;
                        if ( i <= firingIndex ) {
                          firingIndex--;
                        }
                      }
                    }
                    // Remove the element
                    list.splice( i--, 1 );
                    // If we have some unicity property then
                    // we only need to do this once
                    if ( flags.unique ) {
                      break;
                    }
                  }
                }
              }
            }
            return this;
          },
          // Control if a given callback is in the list
          has: function( fn ) {
            if ( list ) {
              var i = 0,
                  length = list.length;
              for ( ; i < length; i++ ) {
                if ( fn === list[ i ] ) {
                  return true;
                }
              }
            }
            return false;
          },
          // Remove all callbacks from the list
          empty: function() {
            list = [];
            return this;
          },
          // Have the list do nothing anymore
          disable: function() {
            list = stack = memory = undefined;
            return this;
          },
          // Is it disabled?
          disabled: function() {
            return !list;
          },
          // Lock the list in its current state
          lock: function() {
            stack = undefined;
            if ( !memory || memory === true ) {
              self.disable();
            }
            return this;
          },
          // Is it locked?
          locked: function() {
            return !stack;
          },
          // Call all callbacks with the given context and arguments
          fireWith: function( context, args ) {
            if ( stack ) {
              if ( firing ) {
                if ( !flags.once ) {
                  stack.push( [ context, args ] );
                }
              } else if ( !( flags.once && memory ) ) {
                fire( context, args );
              }
            }
            return this;
          },
          // Call all the callbacks with the given arguments
          fire: function() {
            self.fireWith( this, arguments );
            return this;
          },
          // To know if the callbacks have already been called at least once
          fired: function() {
            return !!fired;
          }
        };

    return self;
  };




  var // Static reference to slice
      sliceDeferred = [].slice;

  jQuery.extend({

    Deferred: function( func ) {
      var doneList = jQuery.Callbacks( "once memory" ),
          failList = jQuery.Callbacks( "once memory" ),
          progressList = jQuery.Callbacks( "memory" ),
          state = "pending",
          lists = {
            resolve: doneList,
            reject: failList,
            notify: progressList
          },
          promise = {
            done: doneList.add,
            fail: failList.add,
            progress: progressList.add,

            state: function() {
              return state;
            },

            // Deprecated
            isResolved: doneList.fired,
            isRejected: failList.fired,

            then: function( doneCallbacks, failCallbacks, progressCallbacks ) {
              deferred.done( doneCallbacks ).fail( failCallbacks ).progress( progressCallbacks );
              return this;
            },
            always: function() {
              deferred.done.apply( deferred, arguments ).fail.apply( deferred, arguments );
              return this;
            },
            pipe: function( fnDone, fnFail, fnProgress ) {
              return jQuery.Deferred(function( newDefer ) {
                jQuery.each( {
                  done: [ fnDone, "resolve" ],
                  fail: [ fnFail, "reject" ],
                  progress: [ fnProgress, "notify" ]
                }, function( handler, data ) {
                  var fn = data[ 0 ],
                      action = data[ 1 ],
                      returned;
                  if ( jQuery.isFunction( fn ) ) {
                    deferred[ handler ](function() {
                      returned = fn.apply( this, arguments );
                      if ( returned && jQuery.isFunction( returned.promise ) ) {
                        returned.promise().then( newDefer.resolve, newDefer.reject, newDefer.notify );
                      } else {
                        newDefer[ action + "With" ]( this === deferred ? newDefer : this, [ returned ] );
                      }
                    });
                  } else {
                    deferred[ handler ]( newDefer[ action ] );
                  }
                });
              }).promise();
            },
            // Get a promise for this deferred
            // If obj is provided, the promise aspect is added to the object
            promise: function( obj ) {
              if ( obj == null ) {
                obj = promise;
              } else {
                for ( var key in promise ) {
                  obj[ key ] = promise[ key ];
                }
              }
              return obj;
            }
          },
          deferred = promise.promise({}),
          key;

      for ( key in lists ) {
        deferred[ key ] = lists[ key ].fire;
        deferred[ key + "With" ] = lists[ key ].fireWith;
      }

      // Handle state
      deferred.done( function() {
        state = "resolved";
      }, failList.disable, progressList.lock ).fail( function() {
            state = "rejected";
          }, doneList.disable, progressList.lock );

      // Call given func if any
      if ( func ) {
        func.call( deferred, deferred );
      }

      // All done!
      return deferred;
    },

    // Deferred helper
    when: function( firstParam ) {
      var args = sliceDeferred.call( arguments, 0 ),
          i = 0,
          length = args.length,
          pValues = new Array( length ),
          count = length,
          pCount = length,
          deferred = length <= 1 && firstParam && jQuery.isFunction( firstParam.promise ) ?
              firstParam :
              jQuery.Deferred(),
          promise = deferred.promise();
      function resolveFunc( i ) {
        return function( value ) {
          args[ i ] = arguments.length > 1 ? sliceDeferred.call( arguments, 0 ) : value;
          if ( !( --count ) ) {
            deferred.resolveWith( deferred, args );
          }
        };
      }
      function progressFunc( i ) {
        return function( value ) {
          pValues[ i ] = arguments.length > 1 ? sliceDeferred.call( arguments, 0 ) : value;
          deferred.notifyWith( promise, pValues );
        };
      }
      if ( length > 1 ) {
        for ( ; i < length; i++ ) {
          if ( args[ i ] && args[ i ].promise && jQuery.isFunction( args[ i ].promise ) ) {
            args[ i ].promise().then( resolveFunc(i), deferred.reject, progressFunc(i) );
          } else {
            --count;
          }
        }
        if ( !count ) {
          deferred.resolveWith( deferred, args );
        }
      } else if ( deferred !== firstParam ) {
        deferred.resolveWith( deferred, length ? [ firstParam ] : [] );
      }
      return promise;
    }
  });




  jQuery.support = (function() {

    var support,
        all,
        a,
        select,
        opt,
        input,
        fragment,
        tds,
        events,
        eventName,
        i,
        isSupported,
        div = document.createElement( "div" ),
        documentElement = document.documentElement;

    // Preliminary tests
    div.setAttribute("className", "t");
    div.innerHTML = "   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>";

    all = div.getElementsByTagName( "*" );
    a = div.getElementsByTagName( "a" )[ 0 ];

    // Can't get basic test support
    if ( !all || !all.length || !a ) {
      return {};
    }

    // First batch of supports tests
    select = document.createElement( "select" );
    opt = select.appendChild( document.createElement("option") );
    input = div.getElementsByTagName( "input" )[ 0 ];

    support = {
      // IE strips leading whitespace when .innerHTML is used
      leadingWhitespace: ( div.firstChild.nodeType === 3 ),

      // Make sure that tbody elements aren't automatically inserted
      // IE will insert them into empty tables
      tbody: !div.getElementsByTagName("tbody").length,

      // Make sure that link elements get serialized correctly by innerHTML
      // This requires a wrapper element in IE
      htmlSerialize: !!div.getElementsByTagName("link").length,

      // Get the style information from getAttribute
      // (IE uses .cssText instead)
      style: /top/.test( a.getAttribute("style") ),

      // Make sure that URLs aren't manipulated
      // (IE normalizes it by default)
      hrefNormalized: ( a.getAttribute("href") === "/a" ),

      // Make sure that element opacity exists
      // (IE uses filter instead)
      // Use a regex to work around a WebKit issue. See #5145
      opacity: /^0.55/.test( a.style.opacity ),

      // Verify style float existence
      // (IE uses styleFloat instead of cssFloat)
      cssFloat: !!a.style.cssFloat,

      // Make sure that if no value is specified for a checkbox
      // that it defaults to "on".
      // (WebKit defaults to "" instead)
      checkOn: ( input.value === "on" ),

      // Make sure that a selected-by-default option has a working selected property.
      // (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
      optSelected: opt.selected,

      // Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
      getSetAttribute: div.className !== "t",

      // Tests for enctype support on a form(#6743)
      enctype: !!document.createElement("form").enctype,

      // Makes sure cloning an html5 element does not cause problems
      // Where outerHTML is undefined, this still works
      html5Clone: document.createElement("nav").cloneNode( true ).outerHTML !== "<:nav></:nav>",

      // Will be defined later
      submitBubbles: true,
      changeBubbles: true,
      focusinBubbles: false,
      deleteExpando: true,
      noCloneEvent: true,
      inlineBlockNeedsLayout: false,
      shrinkWrapBlocks: false,
      reliableMarginRight: true,
      pixelMargin: true
    };

    // jQuery.boxModel DEPRECATED in 1.3, use jQuery.support.boxModel instead
    jQuery.boxModel = support.boxModel = (document.compatMode === "CSS1Compat");

    // Make sure checked status is properly cloned
    input.checked = true;
    support.noCloneChecked = input.cloneNode( true ).checked;

    // Make sure that the options inside disabled selects aren't marked as disabled
    // (WebKit marks them as disabled)
    select.disabled = true;
    support.optDisabled = !opt.disabled;

    // Test to see if it's possible to delete an expando from an element
    // Fails in Internet Explorer
    try {
      delete div.test;
    } catch( e ) {
      support.deleteExpando = false;
    }

    if ( !div.addEventListener && div.attachEvent && div.fireEvent ) {
      div.attachEvent( "onclick", function() {
        // Cloning a node shouldn't copy over any
        // bound event handlers (IE does this)
        support.noCloneEvent = false;
      });
      div.cloneNode( true ).fireEvent( "onclick" );
    }

    // Check if a radio maintains its value
    // after being appended to the DOM
    input = document.createElement("input");
    input.value = "t";
    input.setAttribute("type", "radio");
    support.radioValue = input.value === "t";

    input.setAttribute("checked", "checked");

    // #11217 - WebKit loses check when the name is after the checked attribute
    input.setAttribute( "name", "t" );

    div.appendChild( input );
    fragment = document.createDocumentFragment();
    fragment.appendChild( div.lastChild );

    // WebKit doesn't clone checked state correctly in fragments
    support.checkClone = fragment.cloneNode( true ).cloneNode( true ).lastChild.checked;

    // Check if a disconnected checkbox will retain its checked
    // value of true after appended to the DOM (IE6/7)
    support.appendChecked = input.checked;

    fragment.removeChild( input );
    fragment.appendChild( div );

    // Technique from Juriy Zaytsev
    // http://perfectionkills.com/detecting-event-support-without-browser-sniffing/
    // We only care about the case where non-standard event systems
    // are used, namely in IE. Short-circuiting here helps us to
    // avoid an eval call (in setAttribute) which can cause CSP
    // to go haywire. See: https://developer.mozilla.org/en/Security/CSP
    if ( div.attachEvent ) {
      for ( i in {
        submit: 1,
        change: 1,
        focusin: 1
      }) {
        eventName = "on" + i;
        isSupported = ( eventName in div );
        if ( !isSupported ) {
          div.setAttribute( eventName, "return;" );
          isSupported = ( typeof div[ eventName ] === "function" );
        }
        support[ i + "Bubbles" ] = isSupported;
      }
    }

    fragment.removeChild( div );

    // Null elements to avoid leaks in IE
    fragment = select = opt = div = input = null;

    // Run tests that need a body at doc ready
    jQuery(function() {
      var container, outer, inner, table, td, offsetSupport,
          marginDiv, conMarginTop, style, html, positionTopLeftWidthHeight,
          paddingMarginBorderVisibility, paddingMarginBorder,
          body = document.getElementsByTagName("body")[0];

      if ( !body ) {
        // Return for frameset docs that don't have a body
        return;
      }

      conMarginTop = 1;
      paddingMarginBorder = "padding:0;margin:0;border:";
      positionTopLeftWidthHeight = "position:absolute;top:0;left:0;width:1px;height:1px;";
      paddingMarginBorderVisibility = paddingMarginBorder + "0;visibility:hidden;";
      style = "style='" + positionTopLeftWidthHeight + paddingMarginBorder + "5px solid #000;";
      html = "<div " + style + "display:block;'><div style='" + paddingMarginBorder + "0;display:block;overflow:hidden;'></div></div>" +
          "<table " + style + "' cellpadding='0' cellspacing='0'>" +
          "<tr><td></td></tr></table>";

      container = document.createElement("div");
      container.style.cssText = paddingMarginBorderVisibility + "width:0;height:0;position:static;top:0;margin-top:" + conMarginTop + "px";
      body.insertBefore( container, body.firstChild );

      // Construct the test element
      div = document.createElement("div");
      container.appendChild( div );

      // Check if table cells still have offsetWidth/Height when they are set
      // to display:none and there are still other visible table cells in a
      // table row; if so, offsetWidth/Height are not reliable for use when
      // determining if an element has been hidden directly using
      // display:none (it is still safe to use offsets if a parent element is
      // hidden; don safety goggles and see bug #4512 for more information).
      // (only IE 8 fails this test)
      div.innerHTML = "<table><tr><td style='" + paddingMarginBorder + "0;display:none'></td><td>t</td></tr></table>";
      tds = div.getElementsByTagName( "td" );
      isSupported = ( tds[ 0 ].offsetHeight === 0 );

      tds[ 0 ].style.display = "";
      tds[ 1 ].style.display = "none";

      // Check if empty table cells still have offsetWidth/Height
      // (IE <= 8 fail this test)
      support.reliableHiddenOffsets = isSupported && ( tds[ 0 ].offsetHeight === 0 );

      // Check if div with explicit width and no margin-right incorrectly
      // gets computed margin-right based on width of container. For more
      // info see bug #3333
      // Fails in WebKit before Feb 2011 nightlies
      // WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
      if ( window.getComputedStyle ) {
        div.innerHTML = "";
        marginDiv = document.createElement( "div" );
        marginDiv.style.width = "0";
        marginDiv.style.marginRight = "0";
        div.style.width = "2px";
        div.appendChild( marginDiv );
        support.reliableMarginRight =
            ( parseInt( ( window.getComputedStyle( marginDiv, null ) || { marginRight: 0 } ).marginRight, 10 ) || 0 ) === 0;
      }

      if ( typeof div.style.zoom !== "undefined" ) {
        // Check if natively block-level elements act like inline-block
        // elements when setting their display to 'inline' and giving
        // them layout
        // (IE < 8 does this)
        div.innerHTML = "";
        div.style.width = div.style.padding = "1px";
        div.style.border = 0;
        div.style.overflow = "hidden";
        div.style.display = "inline";
        div.style.zoom = 1;
        support.inlineBlockNeedsLayout = ( div.offsetWidth === 3 );

        // Check if elements with layout shrink-wrap their children
        // (IE 6 does this)
        div.style.display = "block";
        div.style.overflow = "visible";
        div.innerHTML = "<div style='width:5px;'></div>";
        support.shrinkWrapBlocks = ( div.offsetWidth !== 3 );
      }

      div.style.cssText = positionTopLeftWidthHeight + paddingMarginBorderVisibility;
      div.innerHTML = html;

      outer = div.firstChild;
      inner = outer.firstChild;
      td = outer.nextSibling.firstChild.firstChild;

      offsetSupport = {
        doesNotAddBorder: ( inner.offsetTop !== 5 ),
        doesAddBorderForTableAndCells: ( td.offsetTop === 5 )
      };

      inner.style.position = "fixed";
      inner.style.top = "20px";

      // safari subtracts parent border width here which is 5px
      offsetSupport.fixedPosition = ( inner.offsetTop === 20 || inner.offsetTop === 15 );
      inner.style.position = inner.style.top = "";

      outer.style.overflow = "hidden";
      outer.style.position = "relative";

      offsetSupport.subtractsBorderForOverflowNotVisible = ( inner.offsetTop === -5 );
      offsetSupport.doesNotIncludeMarginInBodyOffset = ( body.offsetTop !== conMarginTop );

      if ( window.getComputedStyle ) {
        div.style.marginTop = "1%";
        support.pixelMargin = ( window.getComputedStyle( div, null ) || { marginTop: 0 } ).marginTop !== "1%";
      }

      if ( typeof container.style.zoom !== "undefined" ) {
        container.style.zoom = 1;
      }

      body.removeChild( container );
      marginDiv = div = container = null;

      jQuery.extend( support, offsetSupport );
    });

    return support;
  })();




  var rbrace = /^(?:\{.*\}|\[.*\])$/,
      rmultiDash = /([A-Z])/g;

  jQuery.extend({
    cache: {},

    // Please use with caution
    uuid: 0,

    // Unique for each copy of jQuery on the page
    // Non-digits removed to match rinlinejQuery
    expando: "jQuery" + ( jQuery.fn.jquery + Math.random() ).replace( /\D/g, "" ),

    // The following elements throw uncatchable exceptions if you
    // attempt to add expando properties to them.
    noData: {
      "embed": true,
      // Ban all objects except for Flash (which handle expandos)
      "object": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
      "applet": true
    },

    hasData: function( elem ) {
      elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
      return !!elem && !isEmptyDataObject( elem );
    },

    data: function( elem, name, data, pvt /* Internal Use Only */ ) {
      if ( !jQuery.acceptData( elem ) ) {
        return;
      }

      var privateCache, thisCache, ret,
          internalKey = jQuery.expando,
          getByName = typeof name === "string",

      // We have to handle DOM nodes and JS objects differently because IE6-7
      // can't GC object references properly across the DOM-JS boundary
          isNode = elem.nodeType,

      // Only DOM nodes need the global jQuery cache; JS object data is
      // attached directly to the object so GC can occur automatically
          cache = isNode ? jQuery.cache : elem,

      // Only defining an ID for JS objects if its cache already exists allows
      // the code to shortcut on the same path as a DOM node with no cache
          id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey,
          isEvents = name === "events";

      // Avoid doing any more work than we need to when trying to get data on an
      // object that has no data at all
      if ( (!id || !cache[id] || (!isEvents && !pvt && !cache[id].data)) && getByName && data === undefined ) {
        return;
      }

      if ( !id ) {
        // Only DOM nodes need a new unique ID for each element since their data
        // ends up in the global cache
        if ( isNode ) {
          elem[ internalKey ] = id = ++jQuery.uuid;
        } else {
          id = internalKey;
        }
      }

      if ( !cache[ id ] ) {
        cache[ id ] = {};

        // Avoids exposing jQuery metadata on plain JS objects when the object
        // is serialized using JSON.stringify
        if ( !isNode ) {
          cache[ id ].toJSON = jQuery.noop;
        }
      }

      // An object can be passed to jQuery.data instead of a key/value pair; this gets
      // shallow copied over onto the existing cache
      if ( typeof name === "object" || typeof name === "function" ) {
        if ( pvt ) {
          cache[ id ] = jQuery.extend( cache[ id ], name );
        } else {
          cache[ id ].data = jQuery.extend( cache[ id ].data, name );
        }
      }

      privateCache = thisCache = cache[ id ];

      // jQuery data() is stored in a separate object inside the object's internal data
      // cache in order to avoid key collisions between internal data and user-defined
      // data.
      if ( !pvt ) {
        if ( !thisCache.data ) {
          thisCache.data = {};
        }

        thisCache = thisCache.data;
      }

      if ( data !== undefined ) {
        thisCache[ jQuery.camelCase( name ) ] = data;
      }

      // Users should not attempt to inspect the internal events object using jQuery.data,
      // it is undocumented and subject to change. But does anyone listen? No.
      if ( isEvents && !thisCache[ name ] ) {
        return privateCache.events;
      }

      // Check for both converted-to-camel and non-converted data property names
      // If a data property was specified
      if ( getByName ) {

        // First Try to find as-is property data
        ret = thisCache[ name ];

        // Test for null|undefined property data
        if ( ret == null ) {

          // Try to find the camelCased property
          ret = thisCache[ jQuery.camelCase( name ) ];
        }
      } else {
        ret = thisCache;
      }

      return ret;
    },

    removeData: function( elem, name, pvt /* Internal Use Only */ ) {
      if ( !jQuery.acceptData( elem ) ) {
        return;
      }

      var thisCache, i, l,

      // Reference to internal data cache key
          internalKey = jQuery.expando,

          isNode = elem.nodeType,

      // See jQuery.data for more information
          cache = isNode ? jQuery.cache : elem,

      // See jQuery.data for more information
          id = isNode ? elem[ internalKey ] : internalKey;

      // If there is already no cache entry for this object, there is no
      // purpose in continuing
      if ( !cache[ id ] ) {
        return;
      }

      if ( name ) {

        thisCache = pvt ? cache[ id ] : cache[ id ].data;

        if ( thisCache ) {

          // Support array or space separated string names for data keys
          if ( !jQuery.isArray( name ) ) {

            // try the string as a key before any manipulation
            if ( name in thisCache ) {
              name = [ name ];
            } else {

              // split the camel cased version by spaces unless a key with the spaces exists
              name = jQuery.camelCase( name );
              if ( name in thisCache ) {
                name = [ name ];
              } else {
                name = name.split( " " );
              }
            }
          }

          for ( i = 0, l = name.length; i < l; i++ ) {
            delete thisCache[ name[i] ];
          }

          // If there is no data left in the cache, we want to continue
          // and let the cache object itself get destroyed
          if ( !( pvt ? isEmptyDataObject : jQuery.isEmptyObject )( thisCache ) ) {
            return;
          }
        }
      }

      // See jQuery.data for more information
      if ( !pvt ) {
        delete cache[ id ].data;

        // Don't destroy the parent cache unless the internal data object
        // had been the only thing left in it
        if ( !isEmptyDataObject(cache[ id ]) ) {
          return;
        }
      }

      // Browsers that fail expando deletion also refuse to delete expandos on
      // the window, but it will allow it on all other JS objects; other browsers
      // don't care
      // Ensure that `cache` is not a window object #10080
      if ( jQuery.support.deleteExpando || !cache.setInterval ) {
        delete cache[ id ];
      } else {
        cache[ id ] = null;
      }

      // We destroyed the cache and need to eliminate the expando on the node to avoid
      // false lookups in the cache for entries that no longer exist
      if ( isNode ) {
        // IE does not allow us to delete expando properties from nodes,
        // nor does it have a removeAttribute function on Document nodes;
        // we must handle all of these cases
        if ( jQuery.support.deleteExpando ) {
          delete elem[ internalKey ];
        } else if ( elem.removeAttribute ) {
          elem.removeAttribute( internalKey );
        } else {
          elem[ internalKey ] = null;
        }
      }
    },

    // For internal use only.
    _data: function( elem, name, data ) {
      return jQuery.data( elem, name, data, true );
    },

    // A method for determining if a DOM node can handle the data expando
    acceptData: function( elem ) {
      if ( elem.nodeName ) {
        var match = jQuery.noData[ elem.nodeName.toLowerCase() ];

        if ( match ) {
          return !(match === true || elem.getAttribute("classid") !== match);
        }
      }

      return true;
    }
  });

  jQuery.fn.extend({
    data: function( key, value ) {
      var parts, part, attr, name, l,
          elem = this[0],
          i = 0,
          data = null;

      // Gets all values
      if ( key === undefined ) {
        if ( this.length ) {
          data = jQuery.data( elem );

          if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
            attr = elem.attributes;
            for ( l = attr.length; i < l; i++ ) {
              name = attr[i].name;

              if ( name.indexOf( "data-" ) === 0 ) {
                name = jQuery.camelCase( name.substring(5) );

                dataAttr( elem, name, data[ name ] );
              }
            }
            jQuery._data( elem, "parsedAttrs", true );
          }
        }

        return data;
      }

      // Sets multiple values
      if ( typeof key === "object" ) {
        return this.each(function() {
          jQuery.data( this, key );
        });
      }

      parts = key.split( ".", 2 );
      parts[1] = parts[1] ? "." + parts[1] : "";
      part = parts[1] + "!";

      return jQuery.access( this, function( value ) {

        if ( value === undefined ) {
          data = this.triggerHandler( "getData" + part, [ parts[0] ] );

          // Try to fetch any internally stored data first
          if ( data === undefined && elem ) {
            data = jQuery.data( elem, key );
            data = dataAttr( elem, key, data );
          }

          return data === undefined && parts[1] ?
              this.data( parts[0] ) :
              data;
        }

        parts[1] = value;
        this.each(function() {
          var self = jQuery( this );

          self.triggerHandler( "setData" + part, parts );
          jQuery.data( this, key, value );
          self.triggerHandler( "changeData" + part, parts );
        });
      }, null, value, arguments.length > 1, null, false );
    },

    removeData: function( key ) {
      return this.each(function() {
        jQuery.removeData( this, key );
      });
    }
  });

  function dataAttr( elem, key, data ) {
    // If nothing was found internally, try to fetch any
    // data from the HTML5 data-* attribute
    if ( data === undefined && elem.nodeType === 1 ) {

      var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

      data = elem.getAttribute( name );

      if ( typeof data === "string" ) {
        try {
          data = data === "true" ? true :
              data === "false" ? false :
                  data === "null" ? null :
                      jQuery.isNumeric( data ) ? +data :
                          rbrace.test( data ) ? jQuery.parseJSON( data ) :
                              data;
        } catch( e ) {}

        // Make sure we set the data so it isn't changed later
        jQuery.data( elem, key, data );

      } else {
        data = undefined;
      }
    }

    return data;
  }

// checks a cache object for emptiness
  function isEmptyDataObject( obj ) {
    for ( var name in obj ) {

      // if the public data object is empty, the private is still empty
      if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
        continue;
      }
      if ( name !== "toJSON" ) {
        return false;
      }
    }

    return true;
  }




  function handleQueueMarkDefer( elem, type, src ) {
    var deferDataKey = type + "defer",
        queueDataKey = type + "queue",
        markDataKey = type + "mark",
        defer = jQuery._data( elem, deferDataKey );
    if ( defer &&
        ( src === "queue" || !jQuery._data(elem, queueDataKey) ) &&
        ( src === "mark" || !jQuery._data(elem, markDataKey) ) ) {
      // Give room for hard-coded callbacks to fire first
      // and eventually mark/queue something else on the element
      setTimeout( function() {
        if ( !jQuery._data( elem, queueDataKey ) &&
            !jQuery._data( elem, markDataKey ) ) {
          jQuery.removeData( elem, deferDataKey, true );
          defer.fire();
        }
      }, 0 );
    }
  }

  jQuery.extend({

    _mark: function( elem, type ) {
      if ( elem ) {
        type = ( type || "fx" ) + "mark";
        jQuery._data( elem, type, (jQuery._data( elem, type ) || 0) + 1 );
      }
    },

    _unmark: function( force, elem, type ) {
      if ( force !== true ) {
        type = elem;
        elem = force;
        force = false;
      }
      if ( elem ) {
        type = type || "fx";
        var key = type + "mark",
            count = force ? 0 : ( (jQuery._data( elem, key ) || 1) - 1 );
        if ( count ) {
          jQuery._data( elem, key, count );
        } else {
          jQuery.removeData( elem, key, true );
          handleQueueMarkDefer( elem, type, "mark" );
        }
      }
    },

    queue: function( elem, type, data ) {
      var q;
      if ( elem ) {
        type = ( type || "fx" ) + "queue";
        q = jQuery._data( elem, type );

        // Speed up dequeue by getting out quickly if this is just a lookup
        if ( data ) {
          if ( !q || jQuery.isArray(data) ) {
            q = jQuery._data( elem, type, jQuery.makeArray(data) );
          } else {
            q.push( data );
          }
        }
        return q || [];
      }
    },

    dequeue: function( elem, type ) {
      type = type || "fx";

      var queue = jQuery.queue( elem, type ),
          fn = queue.shift(),
          hooks = {};

      // If the fx queue is dequeued, always remove the progress sentinel
      if ( fn === "inprogress" ) {
        fn = queue.shift();
      }

      if ( fn ) {
        // Add a progress sentinel to prevent the fx queue from being
        // automatically dequeued
        if ( type === "fx" ) {
          queue.unshift( "inprogress" );
        }

        jQuery._data( elem, type + ".run", hooks );
        fn.call( elem, function() {
          jQuery.dequeue( elem, type );
        }, hooks );
      }

      if ( !queue.length ) {
        jQuery.removeData( elem, type + "queue " + type + ".run", true );
        handleQueueMarkDefer( elem, type, "queue" );
      }
    }
  });

  jQuery.fn.extend({
    queue: function( type, data ) {
      var setter = 2;

      if ( typeof type !== "string" ) {
        data = type;
        type = "fx";
        setter--;
      }

      if ( arguments.length < setter ) {
        return jQuery.queue( this[0], type );
      }

      return data === undefined ?
          this :
          this.each(function() {
            var queue = jQuery.queue( this, type, data );

            if ( type === "fx" && queue[0] !== "inprogress" ) {
              jQuery.dequeue( this, type );
            }
          });
    },
    dequeue: function( type ) {
      return this.each(function() {
        jQuery.dequeue( this, type );
      });
    },
    // Based off of the plugin by Clint Helfers, with permission.
    // http://blindsignals.com/index.php/2009/07/jquery-delay/
    delay: function( time, type ) {
      time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
      type = type || "fx";

      return this.queue( type, function( next, hooks ) {
        var timeout = setTimeout( next, time );
        hooks.stop = function() {
          clearTimeout( timeout );
        };
      });
    },
    clearQueue: function( type ) {
      return this.queue( type || "fx", [] );
    },
    // Get a promise resolved when queues of a certain type
    // are emptied (fx is the type by default)
    promise: function( type, object ) {
      if ( typeof type !== "string" ) {
        object = type;
        type = undefined;
      }
      type = type || "fx";
      var defer = jQuery.Deferred(),
          elements = this,
          i = elements.length,
          count = 1,
          deferDataKey = type + "defer",
          queueDataKey = type + "queue",
          markDataKey = type + "mark",
          tmp;
      function resolve() {
        if ( !( --count ) ) {
          defer.resolveWith( elements, [ elements ] );
        }
      }
      while( i-- ) {
        if (( tmp = jQuery.data( elements[ i ], deferDataKey, undefined, true ) ||
            ( jQuery.data( elements[ i ], queueDataKey, undefined, true ) ||
                jQuery.data( elements[ i ], markDataKey, undefined, true ) ) &&
                jQuery.data( elements[ i ], deferDataKey, jQuery.Callbacks( "once memory" ), true ) )) {
          count++;
          tmp.add( resolve );
        }
      }
      resolve();
      return defer.promise( object );
    }
  });




  var rclass = /[\n\t\r]/g,
      rspace = /\s+/,
      rreturn = /\r/g,
      rtype = /^(?:button|input)$/i,
      rfocusable = /^(?:button|input|object|select|textarea)$/i,
      rclickable = /^a(?:rea)?$/i,
      rboolean = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
      getSetAttribute = jQuery.support.getSetAttribute,
      nodeHook, boolHook, fixSpecified;

  jQuery.fn.extend({
    attr: function( name, value ) {
      return jQuery.access( this, jQuery.attr, name, value, arguments.length > 1 );
    },

    removeAttr: function( name ) {
      return this.each(function() {
        jQuery.removeAttr( this, name );
      });
    },

    prop: function( name, value ) {
      return jQuery.access( this, jQuery.prop, name, value, arguments.length > 1 );
    },

    removeProp: function( name ) {
      name = jQuery.propFix[ name ] || name;
      return this.each(function() {
        // try/catch handles cases where IE balks (such as removing a property on window)
        try {
          this[ name ] = undefined;
          delete this[ name ];
        } catch( e ) {}
      });
    },

    addClass: function( value ) {
      var classNames, i, l, elem,
          setClass, c, cl;

      if ( jQuery.isFunction( value ) ) {
        return this.each(function( j ) {
          jQuery( this ).addClass( value.call(this, j, this.className) );
        });
      }

      if ( value && typeof value === "string" ) {
        classNames = value.split( rspace );

        for ( i = 0, l = this.length; i < l; i++ ) {
          elem = this[ i ];

          if ( elem.nodeType === 1 ) {
            if ( !elem.className && classNames.length === 1 ) {
              elem.className = value;

            } else {
              setClass = " " + elem.className + " ";

              for ( c = 0, cl = classNames.length; c < cl; c++ ) {
                if ( !~setClass.indexOf( " " + classNames[ c ] + " " ) ) {
                  setClass += classNames[ c ] + " ";
                }
              }
              elem.className = jQuery.trim( setClass );
            }
          }
        }
      }

      return this;
    },

    removeClass: function( value ) {
      var classNames, i, l, elem, className, c, cl;

      if ( jQuery.isFunction( value ) ) {
        return this.each(function( j ) {
          jQuery( this ).removeClass( value.call(this, j, this.className) );
        });
      }

      if ( (value && typeof value === "string") || value === undefined ) {
        classNames = ( value || "" ).split( rspace );

        for ( i = 0, l = this.length; i < l; i++ ) {
          elem = this[ i ];

          if ( elem.nodeType === 1 && elem.className ) {
            if ( value ) {
              className = (" " + elem.className + " ").replace( rclass, " " );
              for ( c = 0, cl = classNames.length; c < cl; c++ ) {
                className = className.replace(" " + classNames[ c ] + " ", " ");
              }
              elem.className = jQuery.trim( className );

            } else {
              elem.className = "";
            }
          }
        }
      }

      return this;
    },

    toggleClass: function( value, stateVal ) {
      var type = typeof value,
          isBool = typeof stateVal === "boolean";

      if ( jQuery.isFunction( value ) ) {
        return this.each(function( i ) {
          jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
        });
      }

      return this.each(function() {
        if ( type === "string" ) {
          // toggle individual class names
          var className,
              i = 0,
              self = jQuery( this ),
              state = stateVal,
              classNames = value.split( rspace );

          while ( (className = classNames[ i++ ]) ) {
            // check each className given, space seperated list
            state = isBool ? state : !self.hasClass( className );
            self[ state ? "addClass" : "removeClass" ]( className );
          }

        } else if ( type === "undefined" || type === "boolean" ) {
          if ( this.className ) {
            // store className if set
            jQuery._data( this, "__className__", this.className );
          }

          // toggle whole className
          this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
        }
      });
    },

    hasClass: function( selector ) {
      var className = " " + selector + " ",
          i = 0,
          l = this.length;
      for ( ; i < l; i++ ) {
        if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) > -1 ) {
          return true;
        }
      }

      return false;
    },

    val: function( value ) {
      var hooks, ret, isFunction,
          elem = this[0];

      if ( !arguments.length ) {
        if ( elem ) {
          hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

          if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
            return ret;
          }

          ret = elem.value;

          return typeof ret === "string" ?
            // handle most common string cases
              ret.replace(rreturn, "") :
            // handle cases where value is null/undef or number
              ret == null ? "" : ret;
        }

        return;
      }

      isFunction = jQuery.isFunction( value );

      return this.each(function( i ) {
        var self = jQuery(this), val;

        if ( this.nodeType !== 1 ) {
          return;
        }

        if ( isFunction ) {
          val = value.call( this, i, self.val() );
        } else {
          val = value;
        }

        // Treat null/undefined as ""; convert numbers to string
        if ( val == null ) {
          val = "";
        } else if ( typeof val === "number" ) {
          val += "";
        } else if ( jQuery.isArray( val ) ) {
          val = jQuery.map(val, function ( value ) {
            return value == null ? "" : value + "";
          });
        }

        hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

        // If set returns undefined, fall back to normal setting
        if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
          this.value = val;
        }
      });
    }
  });

  jQuery.extend({
    valHooks: {
      option: {
        get: function( elem ) {
          // attributes.value is undefined in Blackberry 4.7 but
          // uses .value. See #6932
          var val = elem.attributes.value;
          return !val || val.specified ? elem.value : elem.text;
        }
      },
      select: {
        get: function( elem ) {
          var value, i, max, option,
              index = elem.selectedIndex,
              values = [],
              options = elem.options,
              one = elem.type === "select-one";

          // Nothing was selected
          if ( index < 0 ) {
            return null;
          }

          // Loop through all the selected options
          i = one ? index : 0;
          max = one ? index + 1 : options.length;
          for ( ; i < max; i++ ) {
            option = options[ i ];

            // Don't return options that are disabled or in a disabled optgroup
            if ( option.selected && (jQuery.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) &&
                (!option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" )) ) {

              // Get the specific value for the option
              value = jQuery( option ).val();

              // We don't need an array for one selects
              if ( one ) {
                return value;
              }

              // Multi-Selects return an array
              values.push( value );
            }
          }

          // Fixes Bug #2551 -- select.val() broken in IE after form.reset()
          if ( one && !values.length && options.length ) {
            return jQuery( options[ index ] ).val();
          }

          return values;
        },

        set: function( elem, value ) {
          var values = jQuery.makeArray( value );

          jQuery(elem).find("option").each(function() {
            this.selected = jQuery.inArray( jQuery(this).val(), values ) >= 0;
          });

          if ( !values.length ) {
            elem.selectedIndex = -1;
          }
          return values;
        }
      }
    },

    attrFn: {
      val: true,
      css: true,
      html: true,
      text: true,
      data: true,
      width: true,
      height: true,
      offset: true
    },

    attr: function( elem, name, value, pass ) {
      var ret, hooks, notxml,
          nType = elem.nodeType;

      // don't get/set attributes on text, comment and attribute nodes
      if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
        return;
      }

      if ( pass && name in jQuery.attrFn ) {
        return jQuery( elem )[ name ]( value );
      }

      // Fallback to prop when attributes are not supported
      if ( typeof elem.getAttribute === "undefined" ) {
        return jQuery.prop( elem, name, value );
      }

      notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

      // All attributes are lowercase
      // Grab necessary hook if one is defined
      if ( notxml ) {
        name = name.toLowerCase();
        hooks = jQuery.attrHooks[ name ] || ( rboolean.test( name ) ? boolHook : nodeHook );
      }

      if ( value !== undefined ) {

        if ( value === null ) {
          jQuery.removeAttr( elem, name );
          return;

        } else if ( hooks && "set" in hooks && notxml && (ret = hooks.set( elem, value, name )) !== undefined ) {
          return ret;

        } else {
          elem.setAttribute( name, "" + value );
          return value;
        }

      } else if ( hooks && "get" in hooks && notxml && (ret = hooks.get( elem, name )) !== null ) {
        return ret;

      } else {

        ret = elem.getAttribute( name );

        // Non-existent attributes return null, we normalize to undefined
        return ret === null ?
            undefined :
            ret;
      }
    },

    removeAttr: function( elem, value ) {
      var propName, attrNames, name, l, isBool,
          i = 0;

      if ( value && elem.nodeType === 1 ) {
        attrNames = value.toLowerCase().split( rspace );
        l = attrNames.length;

        for ( ; i < l; i++ ) {
          name = attrNames[ i ];

          if ( name ) {
            propName = jQuery.propFix[ name ] || name;
            isBool = rboolean.test( name );

            // See #9699 for explanation of this approach (setting first, then removal)
            // Do not do this for boolean attributes (see #10870)
            if ( !isBool ) {
              jQuery.attr( elem, name, "" );
            }
            elem.removeAttribute( getSetAttribute ? name : propName );

            // Set corresponding property to false for boolean attributes
            if ( isBool && propName in elem ) {
              elem[ propName ] = false;
            }
          }
        }
      }
    },

    attrHooks: {
      type: {
        set: function( elem, value ) {
          // We can't allow the type property to be changed (since it causes problems in IE)
          if ( rtype.test( elem.nodeName ) && elem.parentNode ) {
            jQuery.error( "type property can't be changed" );
          } else if ( !jQuery.support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
            // Setting the type on a radio button after the value resets the value in IE6-9
            // Reset value to it's default in case type is set after value
            // This is for element creation
            var val = elem.value;
            elem.setAttribute( "type", value );
            if ( val ) {
              elem.value = val;
            }
            return value;
          }
        }
      },
      // Use the value property for back compat
      // Use the nodeHook for button elements in IE6/7 (#1954)
      value: {
        get: function( elem, name ) {
          if ( nodeHook && jQuery.nodeName( elem, "button" ) ) {
            return nodeHook.get( elem, name );
          }
          return name in elem ?
              elem.value :
              null;
        },
        set: function( elem, value, name ) {
          if ( nodeHook && jQuery.nodeName( elem, "button" ) ) {
            return nodeHook.set( elem, value, name );
          }
          // Does not return so that setAttribute is also used
          elem.value = value;
        }
      }
    },

    propFix: {
      tabindex: "tabIndex",
      readonly: "readOnly",
      "for": "htmlFor",
      "class": "className",
      maxlength: "maxLength",
      cellspacing: "cellSpacing",
      cellpadding: "cellPadding",
      rowspan: "rowSpan",
      colspan: "colSpan",
      usemap: "useMap",
      frameborder: "frameBorder",
      contenteditable: "contentEditable"
    },

    prop: function( elem, name, value ) {
      var ret, hooks, notxml,
          nType = elem.nodeType;

      // don't get/set properties on text, comment and attribute nodes
      if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
        return;
      }

      notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

      if ( notxml ) {
        // Fix name and attach hooks
        name = jQuery.propFix[ name ] || name;
        hooks = jQuery.propHooks[ name ];
      }

      if ( value !== undefined ) {
        if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
          return ret;

        } else {
          return ( elem[ name ] = value );
        }

      } else {
        if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
          return ret;

        } else {
          return elem[ name ];
        }
      }
    },

    propHooks: {
      tabIndex: {
        get: function( elem ) {
          // elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
          // http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
          var attributeNode = elem.getAttributeNode("tabindex");

          return attributeNode && attributeNode.specified ?
              parseInt( attributeNode.value, 10 ) :
              rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
                  0 :
                  undefined;
        }
      }
    }
  });

// Add the tabIndex propHook to attrHooks for back-compat (different case is intentional)
  jQuery.attrHooks.tabindex = jQuery.propHooks.tabIndex;

// Hook for boolean attributes
  boolHook = {
    get: function( elem, name ) {
      // Align boolean attributes with corresponding properties
      // Fall back to attribute presence where some booleans are not supported
      var attrNode,
          property = jQuery.prop( elem, name );
      return property === true || typeof property !== "boolean" && ( attrNode = elem.getAttributeNode(name) ) && attrNode.nodeValue !== false ?
          name.toLowerCase() :
          undefined;
    },
    set: function( elem, value, name ) {
      var propName;
      if ( value === false ) {
        // Remove boolean attributes when set to false
        jQuery.removeAttr( elem, name );
      } else {
        // value is true since we know at this point it's type boolean and not false
        // Set boolean attributes to the same name and set the DOM property
        propName = jQuery.propFix[ name ] || name;
        if ( propName in elem ) {
          // Only set the IDL specifically if it already exists on the element
          elem[ propName ] = true;
        }

        elem.setAttribute( name, name.toLowerCase() );
      }
      return name;
    }
  };

// IE6/7 do not support getting/setting some attributes with get/setAttribute
  if ( !getSetAttribute ) {

    fixSpecified = {
      name: true,
      id: true,
      coords: true
    };

    // Use this for any attribute in IE6/7
    // This fixes almost every IE6/7 issue
    nodeHook = jQuery.valHooks.button = {
      get: function( elem, name ) {
        var ret;
        ret = elem.getAttributeNode( name );
        return ret && ( fixSpecified[ name ] ? ret.nodeValue !== "" : ret.specified ) ?
            ret.nodeValue :
            undefined;
      },
      set: function( elem, value, name ) {
        // Set the existing or create a new attribute node
        var ret = elem.getAttributeNode( name );
        if ( !ret ) {
          ret = document.createAttribute( name );
          elem.setAttributeNode( ret );
        }
        return ( ret.nodeValue = value + "" );
      }
    };

    // Apply the nodeHook to tabindex
    jQuery.attrHooks.tabindex.set = nodeHook.set;

    // Set width and height to auto instead of 0 on empty string( Bug #8150 )
    // This is for removals
    jQuery.each([ "width", "height" ], function( i, name ) {
      jQuery.attrHooks[ name ] = jQuery.extend( jQuery.attrHooks[ name ], {
        set: function( elem, value ) {
          if ( value === "" ) {
            elem.setAttribute( name, "auto" );
            return value;
          }
        }
      });
    });

    // Set contenteditable to false on removals(#10429)
    // Setting to empty string throws an error as an invalid value
    jQuery.attrHooks.contenteditable = {
      get: nodeHook.get,
      set: function( elem, value, name ) {
        if ( value === "" ) {
          value = "false";
        }
        nodeHook.set( elem, value, name );
      }
    };
  }


// Some attributes require a special call on IE
  if ( !jQuery.support.hrefNormalized ) {
    jQuery.each([ "href", "src", "width", "height" ], function( i, name ) {
      jQuery.attrHooks[ name ] = jQuery.extend( jQuery.attrHooks[ name ], {
        get: function( elem ) {
          var ret = elem.getAttribute( name, 2 );
          return ret === null ? undefined : ret;
        }
      });
    });
  }

  if ( !jQuery.support.style ) {
    jQuery.attrHooks.style = {
      get: function( elem ) {
        // Return undefined in the case of empty string
        // Normalize to lowercase since IE uppercases css property names
        return elem.style.cssText.toLowerCase() || undefined;
      },
      set: function( elem, value ) {
        return ( elem.style.cssText = "" + value );
      }
    };
  }

// Safari mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
  if ( !jQuery.support.optSelected ) {
    jQuery.propHooks.selected = jQuery.extend( jQuery.propHooks.selected, {
      get: function( elem ) {
        var parent = elem.parentNode;

        if ( parent ) {
          parent.selectedIndex;

          // Make sure that it also works with optgroups, see #5701
          if ( parent.parentNode ) {
            parent.parentNode.selectedIndex;
          }
        }
        return null;
      }
    });
  }

// IE6/7 call enctype encoding
  if ( !jQuery.support.enctype ) {
    jQuery.propFix.enctype = "encoding";
  }

// Radios and checkboxes getter/setter
  if ( !jQuery.support.checkOn ) {
    jQuery.each([ "radio", "checkbox" ], function() {
      jQuery.valHooks[ this ] = {
        get: function( elem ) {
          // Handle the case where in Webkit "" is returned instead of "on" if a value isn't specified
          return elem.getAttribute("value") === null ? "on" : elem.value;
        }
      };
    });
  }
  jQuery.each([ "radio", "checkbox" ], function() {
    jQuery.valHooks[ this ] = jQuery.extend( jQuery.valHooks[ this ], {
      set: function( elem, value ) {
        if ( jQuery.isArray( value ) ) {
          return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
        }
      }
    });
  });




  var rformElems = /^(?:textarea|input|select)$/i,
      rtypenamespace = /^([^\.]*)?(?:\.(.+))?$/,
      rhoverHack = /(?:^|\s)hover(\.\S+)?\b/,
      rkeyEvent = /^key/,
      rmouseEvent = /^(?:mouse|contextmenu)|click/,
      rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
      rquickIs = /^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,
      quickParse = function( selector ) {
        var quick = rquickIs.exec( selector );
        if ( quick ) {
          //   0  1    2   3
          // [ _, tag, id, class ]
          quick[1] = ( quick[1] || "" ).toLowerCase();
          quick[3] = quick[3] && new RegExp( "(?:^|\\s)" + quick[3] + "(?:\\s|$)" );
        }
        return quick;
      },
      quickIs = function( elem, m ) {
        var attrs = elem.attributes || {};
        return (
            (!m[1] || elem.nodeName.toLowerCase() === m[1]) &&
                (!m[2] || (attrs.id || {}).value === m[2]) &&
                (!m[3] || m[3].test( (attrs[ "class" ] || {}).value ))
            );
      },
      hoverHack = function( events ) {
        return jQuery.event.special.hover ? events : events.replace( rhoverHack, "mouseenter$1 mouseleave$1" );
      };

  /*
   * Helper functions for managing events -- not part of the public interface.
   * Props to Dean Edwards' addEvent library for many of the ideas.
   */
  jQuery.event = {

    add: function( elem, types, handler, data, selector ) {

      var elemData, eventHandle, events,
          t, tns, type, namespaces, handleObj,
          handleObjIn, quick, handlers, special;

      // Don't attach events to noData or text/comment nodes (allow plain objects tho)
      if ( elem.nodeType === 3 || elem.nodeType === 8 || !types || !handler || !(elemData = jQuery._data( elem )) ) {
        return;
      }

      // Caller can pass in an object of custom data in lieu of the handler
      if ( handler.handler ) {
        handleObjIn = handler;
        handler = handleObjIn.handler;
        selector = handleObjIn.selector;
      }

      // Make sure that the handler has a unique ID, used to find/remove it later
      if ( !handler.guid ) {
        handler.guid = jQuery.guid++;
      }

      // Init the element's event structure and main handler, if this is the first
      events = elemData.events;
      if ( !events ) {
        elemData.events = events = {};
      }
      eventHandle = elemData.handle;
      if ( !eventHandle ) {
        elemData.handle = eventHandle = function( e ) {
          // Discard the second event of a jQuery.event.trigger() and
          // when an event is called after a page has unloaded
          return typeof jQuery !== "undefined" && (!e || jQuery.event.triggered !== e.type) ?
              jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
              undefined;
        };
        // Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
        eventHandle.elem = elem;
      }

      // Handle multiple events separated by a space
      // jQuery(...).bind("mouseover mouseout", fn);
      types = jQuery.trim( hoverHack(types) ).split( " " );
      for ( t = 0; t < types.length; t++ ) {

        tns = rtypenamespace.exec( types[t] ) || [];
        type = tns[1];
        namespaces = ( tns[2] || "" ).split( "." ).sort();

        // If event changes its type, use the special event handlers for the changed type
        special = jQuery.event.special[ type ] || {};

        // If selector defined, determine special event api type, otherwise given type
        type = ( selector ? special.delegateType : special.bindType ) || type;

        // Update special based on newly reset type
        special = jQuery.event.special[ type ] || {};

        // handleObj is passed to all event handlers
        handleObj = jQuery.extend({
          type: type,
          origType: tns[1],
          data: data,
          handler: handler,
          guid: handler.guid,
          selector: selector,
          quick: selector && quickParse( selector ),
          namespace: namespaces.join(".")
        }, handleObjIn );

        // Init the event handler queue if we're the first
        handlers = events[ type ];
        if ( !handlers ) {
          handlers = events[ type ] = [];
          handlers.delegateCount = 0;

          // Only use addEventListener/attachEvent if the special events handler returns false
          if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
            // Bind the global event handler to the element
            if ( elem.addEventListener ) {
              elem.addEventListener( type, eventHandle, false );

            } else if ( elem.attachEvent ) {
              elem.attachEvent( "on" + type, eventHandle );
            }
          }
        }

        if ( special.add ) {
          special.add.call( elem, handleObj );

          if ( !handleObj.handler.guid ) {
            handleObj.handler.guid = handler.guid;
          }
        }

        // Add to the element's handler list, delegates in front
        if ( selector ) {
          handlers.splice( handlers.delegateCount++, 0, handleObj );
        } else {
          handlers.push( handleObj );
        }

        // Keep track of which events have ever been used, for event optimization
        jQuery.event.global[ type ] = true;
      }

      // Nullify elem to prevent memory leaks in IE
      elem = null;
    },

    global: {},

    // Detach an event or set of events from an element
    remove: function( elem, types, handler, selector, mappedTypes ) {

      var elemData = jQuery.hasData( elem ) && jQuery._data( elem ),
          t, tns, type, origType, namespaces, origCount,
          j, events, special, handle, eventType, handleObj;

      if ( !elemData || !(events = elemData.events) ) {
        return;
      }

      // Once for each type.namespace in types; type may be omitted
      types = jQuery.trim( hoverHack( types || "" ) ).split(" ");
      for ( t = 0; t < types.length; t++ ) {
        tns = rtypenamespace.exec( types[t] ) || [];
        type = origType = tns[1];
        namespaces = tns[2];

        // Unbind all events (on this namespace, if provided) for the element
        if ( !type ) {
          for ( type in events ) {
            jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
          }
          continue;
        }

        special = jQuery.event.special[ type ] || {};
        type = ( selector? special.delegateType : special.bindType ) || type;
        eventType = events[ type ] || [];
        origCount = eventType.length;
        namespaces = namespaces ? new RegExp("(^|\\.)" + namespaces.split(".").sort().join("\\.(?:.*\\.)?") + "(\\.|$)") : null;

        // Remove matching events
        for ( j = 0; j < eventType.length; j++ ) {
          handleObj = eventType[ j ];

          if ( ( mappedTypes || origType === handleObj.origType ) &&
              ( !handler || handler.guid === handleObj.guid ) &&
              ( !namespaces || namespaces.test( handleObj.namespace ) ) &&
              ( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
            eventType.splice( j--, 1 );

            if ( handleObj.selector ) {
              eventType.delegateCount--;
            }
            if ( special.remove ) {
              special.remove.call( elem, handleObj );
            }
          }
        }

        // Remove generic event handler if we removed something and no more handlers exist
        // (avoids potential for endless recursion during removal of special event handlers)
        if ( eventType.length === 0 && origCount !== eventType.length ) {
          if ( !special.teardown || special.teardown.call( elem, namespaces ) === false ) {
            jQuery.removeEvent( elem, type, elemData.handle );
          }

          delete events[ type ];
        }
      }

      // Remove the expando if it's no longer used
      if ( jQuery.isEmptyObject( events ) ) {
        handle = elemData.handle;
        if ( handle ) {
          handle.elem = null;
        }

        // removeData also checks for emptiness and clears the expando if empty
        // so use it instead of delete
        jQuery.removeData( elem, [ "events", "handle" ], true );
      }
    },

    // Events that are safe to short-circuit if no handlers are attached.
    // Native DOM events should not be added, they may have inline handlers.
    customEvent: {
      "getData": true,
      "setData": true,
      "changeData": true
    },

    trigger: function( event, data, elem, onlyHandlers ) {
      // Don't do events on text and comment nodes
      if ( elem && (elem.nodeType === 3 || elem.nodeType === 8) ) {
        return;
      }

      // Event object or event type
      var type = event.type || event,
          namespaces = [],
          cache, exclusive, i, cur, old, ontype, special, handle, eventPath, bubbleType;

      // focus/blur morphs to focusin/out; ensure we're not firing them right now
      if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
        return;
      }

      if ( type.indexOf( "!" ) >= 0 ) {
        // Exclusive events trigger only for the exact event (no namespaces)
        type = type.slice(0, -1);
        exclusive = true;
      }

      if ( type.indexOf( "." ) >= 0 ) {
        // Namespaced trigger; create a regexp to match event type in handle()
        namespaces = type.split(".");
        type = namespaces.shift();
        namespaces.sort();
      }

      if ( (!elem || jQuery.event.customEvent[ type ]) && !jQuery.event.global[ type ] ) {
        // No jQuery handlers for this event type, and it can't have inline handlers
        return;
      }

      // Caller can pass in an Event, Object, or just an event type string
      event = typeof event === "object" ?
        // jQuery.Event object
          event[ jQuery.expando ] ? event :
            // Object literal
              new jQuery.Event( type, event ) :
        // Just the event type (string)
          new jQuery.Event( type );

      event.type = type;
      event.isTrigger = true;
      event.exclusive = exclusive;
      event.namespace = namespaces.join( "." );
      event.namespace_re = event.namespace? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.)?") + "(\\.|$)") : null;
      ontype = type.indexOf( ":" ) < 0 ? "on" + type : "";

      // Handle a global trigger
      if ( !elem ) {

        // TODO: Stop taunting the data cache; remove global events and always attach to document
        cache = jQuery.cache;
        for ( i in cache ) {
          if ( cache[ i ].events && cache[ i ].events[ type ] ) {
            jQuery.event.trigger( event, data, cache[ i ].handle.elem, true );
          }
        }
        return;
      }

      // Clean up the event in case it is being reused
      event.result = undefined;
      if ( !event.target ) {
        event.target = elem;
      }

      // Clone any incoming data and prepend the event, creating the handler arg list
      data = data != null ? jQuery.makeArray( data ) : [];
      data.unshift( event );

      // Allow special events to draw outside the lines
      special = jQuery.event.special[ type ] || {};
      if ( special.trigger && special.trigger.apply( elem, data ) === false ) {
        return;
      }

      // Determine event propagation path in advance, per W3C events spec (#9951)
      // Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
      eventPath = [[ elem, special.bindType || type ]];
      if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

        bubbleType = special.delegateType || type;
        cur = rfocusMorph.test( bubbleType + type ) ? elem : elem.parentNode;
        old = null;
        for ( ; cur; cur = cur.parentNode ) {
          eventPath.push([ cur, bubbleType ]);
          old = cur;
        }

        // Only add window if we got to document (e.g., not plain obj or detached DOM)
        if ( old && old === elem.ownerDocument ) {
          eventPath.push([ old.defaultView || old.parentWindow || window, bubbleType ]);
        }
      }

      // Fire handlers on the event path
      for ( i = 0; i < eventPath.length && !event.isPropagationStopped(); i++ ) {

        cur = eventPath[i][0];
        event.type = eventPath[i][1];

        handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
        if ( handle ) {
          handle.apply( cur, data );
        }
        // Note that this is a bare JS function and not a jQuery handler
        handle = ontype && cur[ ontype ];
        if ( handle && jQuery.acceptData( cur ) && handle.apply( cur, data ) === false ) {
          event.preventDefault();
        }
      }
      event.type = type;

      // If nobody prevented the default action, do it now
      if ( !onlyHandlers && !event.isDefaultPrevented() ) {

        if ( (!special._default || special._default.apply( elem.ownerDocument, data ) === false) &&
            !(type === "click" && jQuery.nodeName( elem, "a" )) && jQuery.acceptData( elem ) ) {

          // Call a native DOM method on the target with the same name name as the event.
          // Can't use an .isFunction() check here because IE6/7 fails that test.
          // Don't do default actions on window, that's where global variables be (#6170)
          // IE<9 dies on focus/blur to hidden element (#1486)
          if ( ontype && elem[ type ] && ((type !== "focus" && type !== "blur") || event.target.offsetWidth !== 0) && !jQuery.isWindow( elem ) ) {

            // Don't re-trigger an onFOO event when we call its FOO() method
            old = elem[ ontype ];

            if ( old ) {
              elem[ ontype ] = null;
            }

            // Prevent re-triggering of the same event, since we already bubbled it above
            jQuery.event.triggered = type;
            elem[ type ]();
            jQuery.event.triggered = undefined;

            if ( old ) {
              elem[ ontype ] = old;
            }
          }
        }
      }

      return event.result;
    },

    dispatch: function( event ) {

      // Make a writable jQuery.Event from the native event object
      event = jQuery.event.fix( event || window.event );

      var handlers = ( (jQuery._data( this, "events" ) || {} )[ event.type ] || []),
          delegateCount = handlers.delegateCount,
          args = [].slice.call( arguments, 0 ),
          run_all = !event.exclusive && !event.namespace,
          special = jQuery.event.special[ event.type ] || {},
          handlerQueue = [],
          i, j, cur, jqcur, ret, selMatch, matched, matches, handleObj, sel, related;

      // Use the fix-ed jQuery.Event rather than the (read-only) native event
      args[0] = event;
      event.delegateTarget = this;

      // Call the preDispatch hook for the mapped type, and let it bail if desired
      if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
        return;
      }

      // Determine handlers that should run if there are delegated events
      // Avoid non-left-click bubbling in Firefox (#3861)
      if ( delegateCount && !(event.button && event.type === "click") ) {

        // Pregenerate a single jQuery object for reuse with .is()
        jqcur = jQuery(this);
        jqcur.context = this.ownerDocument || this;

        for ( cur = event.target; cur != this; cur = cur.parentNode || this ) {

          // Don't process events on disabled elements (#6911, #8165)
          if ( cur.disabled !== true ) {
            selMatch = {};
            matches = [];
            jqcur[0] = cur;
            for ( i = 0; i < delegateCount; i++ ) {
              handleObj = handlers[ i ];
              sel = handleObj.selector;

              if ( selMatch[ sel ] === undefined ) {
                selMatch[ sel ] = (
                    handleObj.quick ? quickIs( cur, handleObj.quick ) : jqcur.is( sel )
                    );
              }
              if ( selMatch[ sel ] ) {
                matches.push( handleObj );
              }
            }
            if ( matches.length ) {
              handlerQueue.push({ elem: cur, matches: matches });
            }
          }
        }
      }

      // Add the remaining (directly-bound) handlers
      if ( handlers.length > delegateCount ) {
        handlerQueue.push({ elem: this, matches: handlers.slice( delegateCount ) });
      }

      // Run delegates first; they may want to stop propagation beneath us
      for ( i = 0; i < handlerQueue.length && !event.isPropagationStopped(); i++ ) {
        matched = handlerQueue[ i ];
        event.currentTarget = matched.elem;

        for ( j = 0; j < matched.matches.length && !event.isImmediatePropagationStopped(); j++ ) {
          handleObj = matched.matches[ j ];

          // Triggered event must either 1) be non-exclusive and have no namespace, or
          // 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
          if ( run_all || (!event.namespace && !handleObj.namespace) || event.namespace_re && event.namespace_re.test( handleObj.namespace ) ) {

            event.data = handleObj.data;
            event.handleObj = handleObj;

            ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
                .apply( matched.elem, args );

            if ( ret !== undefined ) {
              event.result = ret;
              if ( ret === false ) {
                event.preventDefault();
                event.stopPropagation();
              }
            }
          }
        }
      }

      // Call the postDispatch hook for the mapped type
      if ( special.postDispatch ) {
        special.postDispatch.call( this, event );
      }

      return event.result;
    },

    // Includes some event props shared by KeyEvent and MouseEvent
    // *** attrChange attrName relatedNode srcElement  are not normalized, non-W3C, deprecated, will be removed in 1.8 ***
    props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

    fixHooks: {},

    keyHooks: {
      props: "char charCode key keyCode".split(" "),
      filter: function( event, original ) {

        // Add which for key events
        if ( event.which == null ) {
          event.which = original.charCode != null ? original.charCode : original.keyCode;
        }

        return event;
      }
    },

    mouseHooks: {
      props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
      filter: function( event, original ) {
        var eventDoc, doc, body,
            button = original.button,
            fromElement = original.fromElement;

        // Calculate pageX/Y if missing and clientX/Y available
        if ( event.pageX == null && original.clientX != null ) {
          eventDoc = event.target.ownerDocument || document;
          doc = eventDoc.documentElement;
          body = eventDoc.body;

          event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
          event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
        }

        // Add relatedTarget, if necessary
        if ( !event.relatedTarget && fromElement ) {
          event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
        }

        // Add which for click: 1 === left; 2 === middle; 3 === right
        // Note: button is not normalized, so don't use it
        if ( !event.which && button !== undefined ) {
          event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
        }

        return event;
      }
    },

    fix: function( event ) {
      if ( event[ jQuery.expando ] ) {
        return event;
      }

      // Create a writable copy of the event object and normalize some properties
      var i, prop,
          originalEvent = event,
          fixHook = jQuery.event.fixHooks[ event.type ] || {},
          copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

      event = jQuery.Event( originalEvent );

      for ( i = copy.length; i; ) {
        prop = copy[ --i ];
        event[ prop ] = originalEvent[ prop ];
      }

      // Fix target property, if necessary (#1925, IE 6/7/8 & Safari2)
      if ( !event.target ) {
        event.target = originalEvent.srcElement || document;
      }

      // Target should not be a text node (#504, Safari)
      if ( event.target.nodeType === 3 ) {
        event.target = event.target.parentNode;
      }

      // For mouse/key events; add metaKey if it's not there (#3368, IE6/7/8)
      if ( event.metaKey === undefined ) {
        event.metaKey = event.ctrlKey;
      }

      return fixHook.filter? fixHook.filter( event, originalEvent ) : event;
    },

    special: {
      ready: {
        // Make sure the ready event is setup
        setup: jQuery.bindReady
      },

      load: {
        // Prevent triggered image.load events from bubbling to window.load
        noBubble: true
      },

      focus: {
        delegateType: "focusin"
      },
      blur: {
        delegateType: "focusout"
      },

      beforeunload: {
        setup: function( data, namespaces, eventHandle ) {
          // We only want to do this special case on windows
          if ( jQuery.isWindow( this ) ) {
            this.onbeforeunload = eventHandle;
          }
        },

        teardown: function( namespaces, eventHandle ) {
          if ( this.onbeforeunload === eventHandle ) {
            this.onbeforeunload = null;
          }
        }
      }
    },

    simulate: function( type, elem, event, bubble ) {
      // Piggyback on a donor event to simulate a different one.
      // Fake originalEvent to avoid donor's stopPropagation, but if the
      // simulated event prevents default then we do the same on the donor.
      var e = jQuery.extend(
          new jQuery.Event(),
          event,
          { type: type,
            isSimulated: true,
            originalEvent: {}
          }
      );
      if ( bubble ) {
        jQuery.event.trigger( e, null, elem );
      } else {
        jQuery.event.dispatch.call( elem, e );
      }
      if ( e.isDefaultPrevented() ) {
        event.preventDefault();
      }
    }
  };

// Some plugins are using, but it's undocumented/deprecated and will be removed.
// The 1.7 special event interface should provide all the hooks needed now.
  jQuery.event.handle = jQuery.event.dispatch;

  jQuery.removeEvent = document.removeEventListener ?
      function( elem, type, handle ) {
        if ( elem.removeEventListener ) {
          elem.removeEventListener( type, handle, false );
        }
      } :
      function( elem, type, handle ) {
        if ( elem.detachEvent ) {
          elem.detachEvent( "on" + type, handle );
        }
      };

  jQuery.Event = function( src, props ) {
    // Allow instantiation without the 'new' keyword
    if ( !(this instanceof jQuery.Event) ) {
      return new jQuery.Event( src, props );
    }

    // Event object
    if ( src && src.type ) {
      this.originalEvent = src;
      this.type = src.type;

      // Events bubbling up the document may have been marked as prevented
      // by a handler lower down the tree; reflect the correct value.
      this.isDefaultPrevented = ( src.defaultPrevented || src.returnValue === false ||
          src.getPreventDefault && src.getPreventDefault() ) ? returnTrue : returnFalse;

      // Event type
    } else {
      this.type = src;
    }

    // Put explicitly provided properties onto the event object
    if ( props ) {
      jQuery.extend( this, props );
    }

    // Create a timestamp if incoming event doesn't have one
    this.timeStamp = src && src.timeStamp || jQuery.now();

    // Mark it as fixed
    this[ jQuery.expando ] = true;
  };

  function returnFalse() {
    return false;
  }
  function returnTrue() {
    return true;
  }

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
  jQuery.Event.prototype = {
    preventDefault: function() {
      this.isDefaultPrevented = returnTrue;

      var e = this.originalEvent;
      if ( !e ) {
        return;
      }

      // if preventDefault exists run it on the original event
      if ( e.preventDefault ) {
        e.preventDefault();

        // otherwise set the returnValue property of the original event to false (IE)
      } else {
        e.returnValue = false;
      }
    },
    stopPropagation: function() {
      this.isPropagationStopped = returnTrue;

      var e = this.originalEvent;
      if ( !e ) {
        return;
      }
      // if stopPropagation exists run it on the original event
      if ( e.stopPropagation ) {
        e.stopPropagation();
      }
      // otherwise set the cancelBubble property of the original event to true (IE)
      e.cancelBubble = true;
    },
    stopImmediatePropagation: function() {
      this.isImmediatePropagationStopped = returnTrue;
      this.stopPropagation();
    },
    isDefaultPrevented: returnFalse,
    isPropagationStopped: returnFalse,
    isImmediatePropagationStopped: returnFalse
  };

// Create mouseenter/leave events using mouseover/out and event-time checks
  jQuery.each({
    mouseenter: "mouseover",
    mouseleave: "mouseout"
  }, function( orig, fix ) {
    jQuery.event.special[ orig ] = {
      delegateType: fix,
      bindType: fix,

      handle: function( event ) {
        var target = this,
            related = event.relatedTarget,
            handleObj = event.handleObj,
            selector = handleObj.selector,
            ret;

        // For mousenter/leave call the handler if related is outside the target.
        // NB: No relatedTarget if the mouse left/entered the browser window
        if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
          event.type = handleObj.origType;
          ret = handleObj.handler.apply( this, arguments );
          event.type = fix;
        }
        return ret;
      }
    };
  });

// IE submit delegation
  if ( !jQuery.support.submitBubbles ) {

    jQuery.event.special.submit = {
      setup: function() {
        // Only need this for delegated form submit events
        if ( jQuery.nodeName( this, "form" ) ) {
          return false;
        }

        // Lazy-add a submit handler when a descendant form may potentially be submitted
        jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
          // Node name check avoids a VML-related crash in IE (#9807)
          var elem = e.target,
              form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
          if ( form && !form._submit_attached ) {
            jQuery.event.add( form, "submit._submit", function( event ) {
              event._submit_bubble = true;
            });
            form._submit_attached = true;
          }
        });
        // return undefined since we don't need an event listener
      },

      postDispatch: function( event ) {
        // If form was submitted by the user, bubble the event up the tree
        if ( event._submit_bubble ) {
          delete event._submit_bubble;
          if ( this.parentNode && !event.isTrigger ) {
            jQuery.event.simulate( "submit", this.parentNode, event, true );
          }
        }
      },

      teardown: function() {
        // Only need this for delegated form submit events
        if ( jQuery.nodeName( this, "form" ) ) {
          return false;
        }

        // Remove delegated handlers; cleanData eventually reaps submit handlers attached above
        jQuery.event.remove( this, "._submit" );
      }
    };
  }

// IE change delegation and checkbox/radio fix
  if ( !jQuery.support.changeBubbles ) {

    jQuery.event.special.change = {

      setup: function() {

        if ( rformElems.test( this.nodeName ) ) {
          // IE doesn't fire change on a check/radio until blur; trigger it on click
          // after a propertychange. Eat the blur-change in special.change.handle.
          // This still fires onchange a second time for check/radio after blur.
          if ( this.type === "checkbox" || this.type === "radio" ) {
            jQuery.event.add( this, "propertychange._change", function( event ) {
              if ( event.originalEvent.propertyName === "checked" ) {
                this._just_changed = true;
              }
            });
            jQuery.event.add( this, "click._change", function( event ) {
              if ( this._just_changed && !event.isTrigger ) {
                this._just_changed = false;
                jQuery.event.simulate( "change", this, event, true );
              }
            });
          }
          return false;
        }
        // Delegated event; lazy-add a change handler on descendant inputs
        jQuery.event.add( this, "beforeactivate._change", function( e ) {
          var elem = e.target;

          if ( rformElems.test( elem.nodeName ) && !elem._change_attached ) {
            jQuery.event.add( elem, "change._change", function( event ) {
              if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
                jQuery.event.simulate( "change", this.parentNode, event, true );
              }
            });
            elem._change_attached = true;
          }
        });
      },

      handle: function( event ) {
        var elem = event.target;

        // Swallow native change events from checkbox/radio, we already triggered them above
        if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
          return event.handleObj.handler.apply( this, arguments );
        }
      },

      teardown: function() {
        jQuery.event.remove( this, "._change" );

        return rformElems.test( this.nodeName );
      }
    };
  }

// Create "bubbling" focus and blur events
  if ( !jQuery.support.focusinBubbles ) {
    jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

      // Attach a single capturing handler while someone wants focusin/focusout
      var attaches = 0,
          handler = function( event ) {
            jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
          };

      jQuery.event.special[ fix ] = {
        setup: function() {
          if ( attaches++ === 0 ) {
            document.addEventListener( orig, handler, true );
          }
        },
        teardown: function() {
          if ( --attaches === 0 ) {
            document.removeEventListener( orig, handler, true );
          }
        }
      };
    });
  }

  jQuery.fn.extend({

    on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
      var origFn, type;

      // Types can be a map of types/handlers
      if ( typeof types === "object" ) {
        // ( types-Object, selector, data )
        if ( typeof selector !== "string" ) { // && selector != null
          // ( types-Object, data )
          data = data || selector;
          selector = undefined;
        }
        for ( type in types ) {
          this.on( type, selector, data, types[ type ], one );
        }
        return this;
      }

      if ( data == null && fn == null ) {
        // ( types, fn )
        fn = selector;
        data = selector = undefined;
      } else if ( fn == null ) {
        if ( typeof selector === "string" ) {
          // ( types, selector, fn )
          fn = data;
          data = undefined;
        } else {
          // ( types, data, fn )
          fn = data;
          data = selector;
          selector = undefined;
        }
      }
      if ( fn === false ) {
        fn = returnFalse;
      } else if ( !fn ) {
        return this;
      }

      if ( one === 1 ) {
        origFn = fn;
        fn = function( event ) {
          // Can use an empty set, since event contains the info
          jQuery().off( event );
          return origFn.apply( this, arguments );
        };
        // Use same guid so caller can remove using origFn
        fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
      }
      return this.each( function() {
        jQuery.event.add( this, types, fn, data, selector );
      });
    },
    one: function( types, selector, data, fn ) {
      return this.on( types, selector, data, fn, 1 );
    },
    off: function( types, selector, fn ) {
      if ( types && types.preventDefault && types.handleObj ) {
        // ( event )  dispatched jQuery.Event
        var handleObj = types.handleObj;
        jQuery( types.delegateTarget ).off(
            handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
            handleObj.selector,
            handleObj.handler
        );
        return this;
      }
      if ( typeof types === "object" ) {
        // ( types-object [, selector] )
        for ( var type in types ) {
          this.off( type, selector, types[ type ] );
        }
        return this;
      }
      if ( selector === false || typeof selector === "function" ) {
        // ( types [, fn] )
        fn = selector;
        selector = undefined;
      }
      if ( fn === false ) {
        fn = returnFalse;
      }
      return this.each(function() {
        jQuery.event.remove( this, types, fn, selector );
      });
    },

    bind: function( types, data, fn ) {
      return this.on( types, null, data, fn );
    },
    unbind: function( types, fn ) {
      return this.off( types, null, fn );
    },

    live: function( types, data, fn ) {
      jQuery( this.context ).on( types, this.selector, data, fn );
      return this;
    },
    die: function( types, fn ) {
      jQuery( this.context ).off( types, this.selector || "**", fn );
      return this;
    },

    delegate: function( selector, types, data, fn ) {
      return this.on( types, selector, data, fn );
    },
    undelegate: function( selector, types, fn ) {
      // ( namespace ) or ( selector, types [, fn] )
      return arguments.length == 1? this.off( selector, "**" ) : this.off( types, selector, fn );
    },

    trigger: function( type, data ) {
      return this.each(function() {
        jQuery.event.trigger( type, data, this );
      });
    },
    triggerHandler: function( type, data ) {
      if ( this[0] ) {
        return jQuery.event.trigger( type, data, this[0], true );
      }
    },

    toggle: function( fn ) {
      // Save reference to arguments for access in closure
      var args = arguments,
          guid = fn.guid || jQuery.guid++,
          i = 0,
          toggler = function( event ) {
            // Figure out which function to execute
            var lastToggle = ( jQuery._data( this, "lastToggle" + fn.guid ) || 0 ) % i;
            jQuery._data( this, "lastToggle" + fn.guid, lastToggle + 1 );

            // Make sure that clicks stop
            event.preventDefault();

            // and execute the function
            return args[ lastToggle ].apply( this, arguments ) || false;
          };

      // link all the functions, so any of them can unbind this click handler
      toggler.guid = guid;
      while ( i < args.length ) {
        args[ i++ ].guid = guid;
      }

      return this.click( toggler );
    },

    hover: function( fnOver, fnOut ) {
      return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
    }
  });

  jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
      "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
      "change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

    // Handle event binding
    jQuery.fn[ name ] = function( data, fn ) {
      if ( fn == null ) {
        fn = data;
        data = null;
      }

      return arguments.length > 0 ?
          this.on( name, null, data, fn ) :
          this.trigger( name );
    };

    if ( jQuery.attrFn ) {
      jQuery.attrFn[ name ] = true;
    }

    if ( rkeyEvent.test( name ) ) {
      jQuery.event.fixHooks[ name ] = jQuery.event.keyHooks;
    }

    if ( rmouseEvent.test( name ) ) {
      jQuery.event.fixHooks[ name ] = jQuery.event.mouseHooks;
    }
  });



  /*!
   * Sizzle CSS Selector Engine
   *  Copyright 2011, The Dojo Foundation
   *  Released under the MIT, BSD, and GPL Licenses.
   *  More information: http://sizzlejs.com/
   */
  (function(){

    var chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
        expando = "sizcache" + (Math.random() + '').replace('.', ''),
        done = 0,
        toString = Object.prototype.toString,
        hasDuplicate = false,
        baseHasDuplicate = true,
        rBackslash = /\\/g,
        rReturn = /\r\n/g,
        rNonWord = /\W/;

// Here we check if the JavaScript engine is using some sort of
// optimization where it does not always call our comparision
// function. If that is the case, discard the hasDuplicate value.
//   Thus far that includes Google Chrome.
    [0, 0].sort(function() {
      baseHasDuplicate = false;
      return 0;
    });

    var Sizzle = function( selector, context, results, seed ) {
      results = results || [];
      context = context || document;

      var origContext = context;

      if ( context.nodeType !== 1 && context.nodeType !== 9 ) {
        return [];
      }

      if ( !selector || typeof selector !== "string" ) {
        return results;
      }

      var m, set, checkSet, extra, ret, cur, pop, i,
          prune = true,
          contextXML = Sizzle.isXML( context ),
          parts = [],
          soFar = selector;

      // Reset the position of the chunker regexp (start from head)
      do {
        chunker.exec( "" );
        m = chunker.exec( soFar );

        if ( m ) {
          soFar = m[3];

          parts.push( m[1] );

          if ( m[2] ) {
            extra = m[3];
            break;
          }
        }
      } while ( m );

      if ( parts.length > 1 && origPOS.exec( selector ) ) {

        if ( parts.length === 2 && Expr.relative[ parts[0] ] ) {
          set = posProcess( parts[0] + parts[1], context, seed );

        } else {
          set = Expr.relative[ parts[0] ] ?
              [ context ] :
              Sizzle( parts.shift(), context );

          while ( parts.length ) {
            selector = parts.shift();

            if ( Expr.relative[ selector ] ) {
              selector += parts.shift();
            }

            set = posProcess( selector, set, seed );
          }
        }

      } else {
        // Take a shortcut and set the context if the root selector is an ID
        // (but not if it'll be faster if the inner selector is an ID)
        if ( !seed && parts.length > 1 && context.nodeType === 9 && !contextXML &&
            Expr.match.ID.test(parts[0]) && !Expr.match.ID.test(parts[parts.length - 1]) ) {

          ret = Sizzle.find( parts.shift(), context, contextXML );
          context = ret.expr ?
              Sizzle.filter( ret.expr, ret.set )[0] :
              ret.set[0];
        }

        if ( context ) {
          ret = seed ?
          { expr: parts.pop(), set: makeArray(seed) } :
              Sizzle.find( parts.pop(), parts.length === 1 && (parts[0] === "~" || parts[0] === "+") && context.parentNode ? context.parentNode : context, contextXML );

          set = ret.expr ?
              Sizzle.filter( ret.expr, ret.set ) :
              ret.set;

          if ( parts.length > 0 ) {
            checkSet = makeArray( set );

          } else {
            prune = false;
          }

          while ( parts.length ) {
            cur = parts.pop();
            pop = cur;

            if ( !Expr.relative[ cur ] ) {
              cur = "";
            } else {
              pop = parts.pop();
            }

            if ( pop == null ) {
              pop = context;
            }

            Expr.relative[ cur ]( checkSet, pop, contextXML );
          }

        } else {
          checkSet = parts = [];
        }
      }

      if ( !checkSet ) {
        checkSet = set;
      }

      if ( !checkSet ) {
        Sizzle.error( cur || selector );
      }

      if ( toString.call(checkSet) === "[object Array]" ) {
        if ( !prune ) {
          results.push.apply( results, checkSet );

        } else if ( context && context.nodeType === 1 ) {
          for ( i = 0; checkSet[i] != null; i++ ) {
            if ( checkSet[i] && (checkSet[i] === true || checkSet[i].nodeType === 1 && Sizzle.contains(context, checkSet[i])) ) {
              results.push( set[i] );
            }
          }

        } else {
          for ( i = 0; checkSet[i] != null; i++ ) {
            if ( checkSet[i] && checkSet[i].nodeType === 1 ) {
              results.push( set[i] );
            }
          }
        }

      } else {
        makeArray( checkSet, results );
      }

      if ( extra ) {
        Sizzle( extra, origContext, results, seed );
        Sizzle.uniqueSort( results );
      }

      return results;
    };

    Sizzle.uniqueSort = function( results ) {
      if ( sortOrder ) {
        hasDuplicate = baseHasDuplicate;
        results.sort( sortOrder );

        if ( hasDuplicate ) {
          for ( var i = 1; i < results.length; i++ ) {
            if ( results[i] === results[ i - 1 ] ) {
              results.splice( i--, 1 );
            }
          }
        }
      }

      return results;
    };

    Sizzle.matches = function( expr, set ) {
      return Sizzle( expr, null, null, set );
    };

    Sizzle.matchesSelector = function( node, expr ) {
      return Sizzle( expr, null, null, [node] ).length > 0;
    };

    Sizzle.find = function( expr, context, isXML ) {
      var set, i, len, match, type, left;

      if ( !expr ) {
        return [];
      }

      for ( i = 0, len = Expr.order.length; i < len; i++ ) {
        type = Expr.order[i];

        if ( (match = Expr.leftMatch[ type ].exec( expr )) ) {
          left = match[1];
          match.splice( 1, 1 );

          if ( left.substr( left.length - 1 ) !== "\\" ) {
            match[1] = (match[1] || "").replace( rBackslash, "" );
            set = Expr.find[ type ]( match, context, isXML );

            if ( set != null ) {
              expr = expr.replace( Expr.match[ type ], "" );
              break;
            }
          }
        }
      }

      if ( !set ) {
        set = typeof context.getElementsByTagName !== "undefined" ?
            context.getElementsByTagName( "*" ) :
            [];
      }

      return { set: set, expr: expr };
    };

    Sizzle.filter = function( expr, set, inplace, not ) {
      var match, anyFound,
          type, found, item, filter, left,
          i, pass,
          old = expr,
          result = [],
          curLoop = set,
          isXMLFilter = set && set[0] && Sizzle.isXML( set[0] );

      while ( expr && set.length ) {
        for ( type in Expr.filter ) {
          if ( (match = Expr.leftMatch[ type ].exec( expr )) != null && match[2] ) {
            filter = Expr.filter[ type ];
            left = match[1];

            anyFound = false;

            match.splice(1,1);

            if ( left.substr( left.length - 1 ) === "\\" ) {
              continue;
            }

            if ( curLoop === result ) {
              result = [];
            }

            if ( Expr.preFilter[ type ] ) {
              match = Expr.preFilter[ type ]( match, curLoop, inplace, result, not, isXMLFilter );

              if ( !match ) {
                anyFound = found = true;

              } else if ( match === true ) {
                continue;
              }
            }

            if ( match ) {
              for ( i = 0; (item = curLoop[i]) != null; i++ ) {
                if ( item ) {
                  found = filter( item, match, i, curLoop );
                  pass = not ^ found;

                  if ( inplace && found != null ) {
                    if ( pass ) {
                      anyFound = true;

                    } else {
                      curLoop[i] = false;
                    }

                  } else if ( pass ) {
                    result.push( item );
                    anyFound = true;
                  }
                }
              }
            }

            if ( found !== undefined ) {
              if ( !inplace ) {
                curLoop = result;
              }

              expr = expr.replace( Expr.match[ type ], "" );

              if ( !anyFound ) {
                return [];
              }

              break;
            }
          }
        }

        // Improper expression
        if ( expr === old ) {
          if ( anyFound == null ) {
            Sizzle.error( expr );

          } else {
            break;
          }
        }

        old = expr;
      }

      return curLoop;
    };

    Sizzle.error = function( msg ) {
      throw new Error( "Syntax error, unrecognized expression: " + msg );
    };

    /**
     * Utility function for retreiving the text value of an array of DOM nodes
     * @param {Array|Element} elem
     */
    var getText = Sizzle.getText = function( elem ) {
      var i, node,
          nodeType = elem.nodeType,
          ret = "";

      if ( nodeType ) {
        if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
          // Use textContent || innerText for elements
          if ( typeof elem.textContent === 'string' ) {
            return elem.textContent;
          } else if ( typeof elem.innerText === 'string' ) {
            // Replace IE's carriage returns
            return elem.innerText.replace( rReturn, '' );
          } else {
            // Traverse it's children
            for ( elem = elem.firstChild; elem; elem = elem.nextSibling) {
              ret += getText( elem );
            }
          }
        } else if ( nodeType === 3 || nodeType === 4 ) {
          return elem.nodeValue;
        }
      } else {

        // If no nodeType, this is expected to be an array
        for ( i = 0; (node = elem[i]); i++ ) {
          // Do not traverse comment nodes
          if ( node.nodeType !== 8 ) {
            ret += getText( node );
          }
        }
      }
      return ret;
    };

    var Expr = Sizzle.selectors = {
      order: [ "ID", "NAME", "TAG" ],

      match: {
        ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
        CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
        NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
        ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
        TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
        CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
        POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
        PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
      },

      leftMatch: {},

      attrMap: {
        "class": "className",
        "for": "htmlFor"
      },

      attrHandle: {
        href: function( elem ) {
          return elem.getAttribute( "href" );
        },
        type: function( elem ) {
          return elem.getAttribute( "type" );
        }
      },

      relative: {
        "+": function(checkSet, part){
          var isPartStr = typeof part === "string",
              isTag = isPartStr && !rNonWord.test( part ),
              isPartStrNotTag = isPartStr && !isTag;

          if ( isTag ) {
            part = part.toLowerCase();
          }

          for ( var i = 0, l = checkSet.length, elem; i < l; i++ ) {
            if ( (elem = checkSet[i]) ) {
              while ( (elem = elem.previousSibling) && elem.nodeType !== 1 ) {}

              checkSet[i] = isPartStrNotTag || elem && elem.nodeName.toLowerCase() === part ?
                  elem || false :
                  elem === part;
            }
          }

          if ( isPartStrNotTag ) {
            Sizzle.filter( part, checkSet, true );
          }
        },

        ">": function( checkSet, part ) {
          var elem,
              isPartStr = typeof part === "string",
              i = 0,
              l = checkSet.length;

          if ( isPartStr && !rNonWord.test( part ) ) {
            part = part.toLowerCase();

            for ( ; i < l; i++ ) {
              elem = checkSet[i];

              if ( elem ) {
                var parent = elem.parentNode;
                checkSet[i] = parent.nodeName.toLowerCase() === part ? parent : false;
              }
            }

          } else {
            for ( ; i < l; i++ ) {
              elem = checkSet[i];

              if ( elem ) {
                checkSet[i] = isPartStr ?
                    elem.parentNode :
                    elem.parentNode === part;
              }
            }

            if ( isPartStr ) {
              Sizzle.filter( part, checkSet, true );
            }
          }
        },

        "": function(checkSet, part, isXML){
          var nodeCheck,
              doneName = done++,
              checkFn = dirCheck;

          if ( typeof part === "string" && !rNonWord.test( part ) ) {
            part = part.toLowerCase();
            nodeCheck = part;
            checkFn = dirNodeCheck;
          }

          checkFn( "parentNode", part, doneName, checkSet, nodeCheck, isXML );
        },

        "~": function( checkSet, part, isXML ) {
          var nodeCheck,
              doneName = done++,
              checkFn = dirCheck;

          if ( typeof part === "string" && !rNonWord.test( part ) ) {
            part = part.toLowerCase();
            nodeCheck = part;
            checkFn = dirNodeCheck;
          }

          checkFn( "previousSibling", part, doneName, checkSet, nodeCheck, isXML );
        }
      },

      find: {
        ID: function( match, context, isXML ) {
          if ( typeof context.getElementById !== "undefined" && !isXML ) {
            var m = context.getElementById(match[1]);
            // Check parentNode to catch when Blackberry 4.6 returns
            // nodes that are no longer in the document #6963
            return m && m.parentNode ? [m] : [];
          }
        },

        NAME: function( match, context ) {
          if ( typeof context.getElementsByName !== "undefined" ) {
            var ret = [],
                results = context.getElementsByName( match[1] );

            for ( var i = 0, l = results.length; i < l; i++ ) {
              if ( results[i].getAttribute("name") === match[1] ) {
                ret.push( results[i] );
              }
            }

            return ret.length === 0 ? null : ret;
          }
        },

        TAG: function( match, context ) {
          if ( typeof context.getElementsByTagName !== "undefined" ) {
            return context.getElementsByTagName( match[1] );
          }
        }
      },
      preFilter: {
        CLASS: function( match, curLoop, inplace, result, not, isXML ) {
          match = " " + match[1].replace( rBackslash, "" ) + " ";

          if ( isXML ) {
            return match;
          }

          for ( var i = 0, elem; (elem = curLoop[i]) != null; i++ ) {
            if ( elem ) {
              if ( not ^ (elem.className && (" " + elem.className + " ").replace(/[\t\n\r]/g, " ").indexOf(match) >= 0) ) {
                if ( !inplace ) {
                  result.push( elem );
                }

              } else if ( inplace ) {
                curLoop[i] = false;
              }
            }
          }

          return false;
        },

        ID: function( match ) {
          return match[1].replace( rBackslash, "" );
        },

        TAG: function( match, curLoop ) {
          return match[1].replace( rBackslash, "" ).toLowerCase();
        },

        CHILD: function( match ) {
          if ( match[1] === "nth" ) {
            if ( !match[2] ) {
              Sizzle.error( match[0] );
            }

            match[2] = match[2].replace(/^\+|\s*/g, '');

            // parse equations like 'even', 'odd', '5', '2n', '3n+2', '4n-1', '-n+6'
            var test = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(
                match[2] === "even" && "2n" || match[2] === "odd" && "2n+1" ||
                    !/\D/.test( match[2] ) && "0n+" + match[2] || match[2]);

            // calculate the numbers (first)n+(last) including if they are negative
            match[2] = (test[1] + (test[2] || 1)) - 0;
            match[3] = test[3] - 0;
          }
          else if ( match[2] ) {
            Sizzle.error( match[0] );
          }

          // TODO: Move to normal caching system
          match[0] = done++;

          return match;
        },

        ATTR: function( match, curLoop, inplace, result, not, isXML ) {
          var name = match[1] = match[1].replace( rBackslash, "" );

          if ( !isXML && Expr.attrMap[name] ) {
            match[1] = Expr.attrMap[name];
          }

          // Handle if an un-quoted value was used
          match[4] = ( match[4] || match[5] || "" ).replace( rBackslash, "" );

          if ( match[2] === "~=" ) {
            match[4] = " " + match[4] + " ";
          }

          return match;
        },

        PSEUDO: function( match, curLoop, inplace, result, not ) {
          if ( match[1] === "not" ) {
            // If we're dealing with a complex expression, or a simple one
            if ( ( chunker.exec(match[3]) || "" ).length > 1 || /^\w/.test(match[3]) ) {
              match[3] = Sizzle(match[3], null, null, curLoop);

            } else {
              var ret = Sizzle.filter(match[3], curLoop, inplace, true ^ not);

              if ( !inplace ) {
                result.push.apply( result, ret );
              }

              return false;
            }

          } else if ( Expr.match.POS.test( match[0] ) || Expr.match.CHILD.test( match[0] ) ) {
            return true;
          }

          return match;
        },

        POS: function( match ) {
          match.unshift( true );

          return match;
        }
      },

      filters: {
        enabled: function( elem ) {
          return elem.disabled === false && elem.type !== "hidden";
        },

        disabled: function( elem ) {
          return elem.disabled === true;
        },

        checked: function( elem ) {
          return elem.checked === true;
        },

        selected: function( elem ) {
          // Accessing this property makes selected-by-default
          // options in Safari work properly
          if ( elem.parentNode ) {
            elem.parentNode.selectedIndex;
          }

          return elem.selected === true;
        },

        parent: function( elem ) {
          return !!elem.firstChild;
        },

        empty: function( elem ) {
          return !elem.firstChild;
        },

        has: function( elem, i, match ) {
          return !!Sizzle( match[3], elem ).length;
        },

        header: function( elem ) {
          return (/h\d/i).test( elem.nodeName );
        },

        text: function( elem ) {
          var attr = elem.getAttribute( "type" ), type = elem.type;
          // IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc)
          // use getAttribute instead to test this case
          return elem.nodeName.toLowerCase() === "input" && "text" === type && ( attr === type || attr === null );
        },

        radio: function( elem ) {
          return elem.nodeName.toLowerCase() === "input" && "radio" === elem.type;
        },

        checkbox: function( elem ) {
          return elem.nodeName.toLowerCase() === "input" && "checkbox" === elem.type;
        },

        file: function( elem ) {
          return elem.nodeName.toLowerCase() === "input" && "file" === elem.type;
        },

        password: function( elem ) {
          return elem.nodeName.toLowerCase() === "input" && "password" === elem.type;
        },

        submit: function( elem ) {
          var name = elem.nodeName.toLowerCase();
          return (name === "input" || name === "button") && "submit" === elem.type;
        },

        image: function( elem ) {
          return elem.nodeName.toLowerCase() === "input" && "image" === elem.type;
        },

        reset: function( elem ) {
          var name = elem.nodeName.toLowerCase();
          return (name === "input" || name === "button") && "reset" === elem.type;
        },

        button: function( elem ) {
          var name = elem.nodeName.toLowerCase();
          return name === "input" && "button" === elem.type || name === "button";
        },

        input: function( elem ) {
          return (/input|select|textarea|button/i).test( elem.nodeName );
        },

        focus: function( elem ) {
          return elem === elem.ownerDocument.activeElement;
        }
      },
      setFilters: {
        first: function( elem, i ) {
          return i === 0;
        },

        last: function( elem, i, match, array ) {
          return i === array.length - 1;
        },

        even: function( elem, i ) {
          return i % 2 === 0;
        },

        odd: function( elem, i ) {
          return i % 2 === 1;
        },

        lt: function( elem, i, match ) {
          return i < match[3] - 0;
        },

        gt: function( elem, i, match ) {
          return i > match[3] - 0;
        },

        nth: function( elem, i, match ) {
          return match[3] - 0 === i;
        },

        eq: function( elem, i, match ) {
          return match[3] - 0 === i;
        }
      },
      filter: {
        PSEUDO: function( elem, match, i, array ) {
          var name = match[1],
              filter = Expr.filters[ name ];

          if ( filter ) {
            return filter( elem, i, match, array );

          } else if ( name === "contains" ) {
            return (elem.textContent || elem.innerText || getText([ elem ]) || "").indexOf(match[3]) >= 0;

          } else if ( name === "not" ) {
            var not = match[3];

            for ( var j = 0, l = not.length; j < l; j++ ) {
              if ( not[j] === elem ) {
                return false;
              }
            }

            return true;

          } else {
            Sizzle.error( name );
          }
        },

        CHILD: function( elem, match ) {
          var first, last,
              doneName, parent, cache,
              count, diff,
              type = match[1],
              node = elem;

          switch ( type ) {
            case "only":
            case "first":
              while ( (node = node.previousSibling) ) {
                if ( node.nodeType === 1 ) {
                  return false;
                }
              }

              if ( type === "first" ) {
                return true;
              }

              node = elem;

            /* falls through */
            case "last":
              while ( (node = node.nextSibling) ) {
                if ( node.nodeType === 1 ) {
                  return false;
                }
              }

              return true;

            case "nth":
              first = match[2];
              last = match[3];

              if ( first === 1 && last === 0 ) {
                return true;
              }

              doneName = match[0];
              parent = elem.parentNode;

              if ( parent && (parent[ expando ] !== doneName || !elem.nodeIndex) ) {
                count = 0;

                for ( node = parent.firstChild; node; node = node.nextSibling ) {
                  if ( node.nodeType === 1 ) {
                    node.nodeIndex = ++count;
                  }
                }

                parent[ expando ] = doneName;
              }

              diff = elem.nodeIndex - last;

              if ( first === 0 ) {
                return diff === 0;

              } else {
                return ( diff % first === 0 && diff / first >= 0 );
              }
          }
        },

        ID: function( elem, match ) {
          return elem.nodeType === 1 && elem.getAttribute("id") === match;
        },

        TAG: function( elem, match ) {
          return (match === "*" && elem.nodeType === 1) || !!elem.nodeName && elem.nodeName.toLowerCase() === match;
        },

        CLASS: function( elem, match ) {
          return (" " + (elem.className || elem.getAttribute("class")) + " ")
              .indexOf( match ) > -1;
        },

        ATTR: function( elem, match ) {
          var name = match[1],
              result = Sizzle.attr ?
                  Sizzle.attr( elem, name ) :
                  Expr.attrHandle[ name ] ?
                      Expr.attrHandle[ name ]( elem ) :
                      elem[ name ] != null ?
                          elem[ name ] :
                          elem.getAttribute( name ),
              value = result + "",
              type = match[2],
              check = match[4];

          return result == null ?
              type === "!=" :
              !type && Sizzle.attr ?
                  result != null :
                  type === "=" ?
                      value === check :
                      type === "*=" ?
                          value.indexOf(check) >= 0 :
                          type === "~=" ?
                              (" " + value + " ").indexOf(check) >= 0 :
                              !check ?
                                  value && result !== false :
                                  type === "!=" ?
                                      value !== check :
                                      type === "^=" ?
                                          value.indexOf(check) === 0 :
                                          type === "$=" ?
                                              value.substr(value.length - check.length) === check :
                                              type === "|=" ?
                                                  value === check || value.substr(0, check.length + 1) === check + "-" :
                                                  false;
        },

        POS: function( elem, match, i, array ) {
          var name = match[2],
              filter = Expr.setFilters[ name ];

          if ( filter ) {
            return filter( elem, i, match, array );
          }
        }
      }
    };

    var origPOS = Expr.match.POS,
        fescape = function(all, num){
          return "\\" + (num - 0 + 1);
        };

    for ( var type in Expr.match ) {
      Expr.match[ type ] = new RegExp( Expr.match[ type ].source + (/(?![^\[]*\])(?![^\(]*\))/.source) );
      Expr.leftMatch[ type ] = new RegExp( /(^(?:.|\r|\n)*?)/.source + Expr.match[ type ].source.replace(/\\(\d+)/g, fescape) );
    }
// Expose origPOS
// "global" as in regardless of relation to brackets/parens
    Expr.match.globalPOS = origPOS;

    var makeArray = function( array, results ) {
      array = Array.prototype.slice.call( array, 0 );

      if ( results ) {
        results.push.apply( results, array );
        return results;
      }

      return array;
    };

// Perform a simple check to determine if the browser is capable of
// converting a NodeList to an array using builtin methods.
// Also verifies that the returned array holds DOM nodes
// (which is not the case in the Blackberry browser)
    try {
      Array.prototype.slice.call( document.documentElement.childNodes, 0 )[0].nodeType;

// Provide a fallback method if it does not work
    } catch( e ) {
      makeArray = function( array, results ) {
        var i = 0,
            ret = results || [];

        if ( toString.call(array) === "[object Array]" ) {
          Array.prototype.push.apply( ret, array );

        } else {
          if ( typeof array.length === "number" ) {
            for ( var l = array.length; i < l; i++ ) {
              ret.push( array[i] );
            }

          } else {
            for ( ; array[i]; i++ ) {
              ret.push( array[i] );
            }
          }
        }

        return ret;
      };
    }

    var sortOrder, siblingCheck;

    if ( document.documentElement.compareDocumentPosition ) {
      sortOrder = function( a, b ) {
        if ( a === b ) {
          hasDuplicate = true;
          return 0;
        }

        if ( !a.compareDocumentPosition || !b.compareDocumentPosition ) {
          return a.compareDocumentPosition ? -1 : 1;
        }

        return a.compareDocumentPosition(b) & 4 ? -1 : 1;
      };

    } else {
      sortOrder = function( a, b ) {
        // The nodes are identical, we can exit early
        if ( a === b ) {
          hasDuplicate = true;
          return 0;

          // Fallback to using sourceIndex (in IE) if it's available on both nodes
        } else if ( a.sourceIndex && b.sourceIndex ) {
          return a.sourceIndex - b.sourceIndex;
        }

        var al, bl,
            ap = [],
            bp = [],
            aup = a.parentNode,
            bup = b.parentNode,
            cur = aup;

        // If the nodes are siblings (or identical) we can do a quick check
        if ( aup === bup ) {
          return siblingCheck( a, b );

          // If no parents were found then the nodes are disconnected
        } else if ( !aup ) {
          return -1;

        } else if ( !bup ) {
          return 1;
        }

        // Otherwise they're somewhere else in the tree so we need
        // to build up a full list of the parentNodes for comparison
        while ( cur ) {
          ap.unshift( cur );
          cur = cur.parentNode;
        }

        cur = bup;

        while ( cur ) {
          bp.unshift( cur );
          cur = cur.parentNode;
        }

        al = ap.length;
        bl = bp.length;

        // Start walking down the tree looking for a discrepancy
        for ( var i = 0; i < al && i < bl; i++ ) {
          if ( ap[i] !== bp[i] ) {
            return siblingCheck( ap[i], bp[i] );
          }
        }

        // We ended someplace up the tree so do a sibling check
        return i === al ?
            siblingCheck( a, bp[i], -1 ) :
            siblingCheck( ap[i], b, 1 );
      };

      siblingCheck = function( a, b, ret ) {
        if ( a === b ) {
          return ret;
        }

        var cur = a.nextSibling;

        while ( cur ) {
          if ( cur === b ) {
            return -1;
          }

          cur = cur.nextSibling;
        }

        return 1;
      };
    }

// Check to see if the browser returns elements by name when
// querying by getElementById (and provide a workaround)
    (function(){
      // We're going to inject a fake input element with a specified name
      var form = document.createElement("div"),
          id = "script" + (new Date()).getTime(),
          root = document.documentElement;

      form.innerHTML = "<a name='" + id + "'/>";

      // Inject it into the root element, check its status, and remove it quickly
      root.insertBefore( form, root.firstChild );

      // The workaround has to do additional checks after a getElementById
      // Which slows things down for other browsers (hence the branching)
      if ( document.getElementById( id ) ) {
        Expr.find.ID = function( match, context, isXML ) {
          if ( typeof context.getElementById !== "undefined" && !isXML ) {
            var m = context.getElementById(match[1]);

            return m ?
                m.id === match[1] || typeof m.getAttributeNode !== "undefined" && m.getAttributeNode("id").nodeValue === match[1] ?
                    [m] :
                    undefined :
                [];
          }
        };

        Expr.filter.ID = function( elem, match ) {
          var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");

          return elem.nodeType === 1 && node && node.nodeValue === match;
        };
      }

      root.removeChild( form );

      // release memory in IE
      root = form = null;
    })();

    (function(){
      // Check to see if the browser returns only elements
      // when doing getElementsByTagName("*")

      // Create a fake element
      var div = document.createElement("div");
      div.appendChild( document.createComment("") );

      // Make sure no comments are found
      if ( div.getElementsByTagName("*").length > 0 ) {
        Expr.find.TAG = function( match, context ) {
          var results = context.getElementsByTagName( match[1] );

          // Filter out possible comments
          if ( match[1] === "*" ) {
            var tmp = [];

            for ( var i = 0; results[i]; i++ ) {
              if ( results[i].nodeType === 1 ) {
                tmp.push( results[i] );
              }
            }

            results = tmp;
          }

          return results;
        };
      }

      // Check to see if an attribute returns normalized href attributes
      div.innerHTML = "<a href='#'></a>";

      if ( div.firstChild && typeof div.firstChild.getAttribute !== "undefined" &&
          div.firstChild.getAttribute("href") !== "#" ) {

        Expr.attrHandle.href = function( elem ) {
          return elem.getAttribute( "href", 2 );
        };
      }

      // release memory in IE
      div = null;
    })();

    if ( document.querySelectorAll ) {
      (function(){
        var oldSizzle = Sizzle,
            div = document.createElement("div"),
            id = "__sizzle__";

        div.innerHTML = "<p class='TEST'></p>";

        // Safari can't handle uppercase or unicode characters when
        // in quirks mode.
        if ( div.querySelectorAll && div.querySelectorAll(".TEST").length === 0 ) {
          return;
        }

        Sizzle = function( query, context, extra, seed ) {
          context = context || document;

          // Only use querySelectorAll on non-XML documents
          // (ID selectors don't work in non-HTML documents)
          if ( !seed && !Sizzle.isXML(context) ) {
            // See if we find a selector to speed up
            var match = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec( query );

            if ( match && (context.nodeType === 1 || context.nodeType === 9) ) {
              // Speed-up: Sizzle("TAG")
              if ( match[1] ) {
                return makeArray( context.getElementsByTagName( query ), extra );

                // Speed-up: Sizzle(".CLASS")
              } else if ( match[2] && Expr.find.CLASS && context.getElementsByClassName ) {
                return makeArray( context.getElementsByClassName( match[2] ), extra );
              }
            }

            if ( context.nodeType === 9 ) {
              // Speed-up: Sizzle("body")
              // The body element only exists once, optimize finding it
              if ( query === "body" && context.body ) {
                return makeArray( [ context.body ], extra );

                // Speed-up: Sizzle("#ID")
              } else if ( match && match[3] ) {
                var elem = context.getElementById( match[3] );

                // Check parentNode to catch when Blackberry 4.6 returns
                // nodes that are no longer in the document #6963
                if ( elem && elem.parentNode ) {
                  // Handle the case where IE and Opera return items
                  // by name instead of ID
                  if ( elem.id === match[3] ) {
                    return makeArray( [ elem ], extra );
                  }

                } else {
                  return makeArray( [], extra );
                }
              }

              try {
                return makeArray( context.querySelectorAll(query), extra );
              } catch(qsaError) {}

              // qSA works strangely on Element-rooted queries
              // We can work around this by specifying an extra ID on the root
              // and working up from there (Thanks to Andrew Dupont for the technique)
              // IE 8 doesn't work on object elements
            } else if ( context.nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
              var oldContext = context,
                  old = context.getAttribute( "id" ),
                  nid = old || id,
                  hasParent = context.parentNode,
                  relativeHierarchySelector = /^\s*[+~]/.test( query );

              if ( !old ) {
                context.setAttribute( "id", nid );
              } else {
                nid = nid.replace( /'/g, "\\$&" );
              }
              if ( relativeHierarchySelector && hasParent ) {
                context = context.parentNode;
              }

              try {
                if ( !relativeHierarchySelector || hasParent ) {
                  return makeArray( context.querySelectorAll( "[id='" + nid + "'] " + query ), extra );
                }

              } catch(pseudoError) {
              } finally {
                if ( !old ) {
                  oldContext.removeAttribute( "id" );
                }
              }
            }
          }

          return oldSizzle(query, context, extra, seed);
        };

        for ( var prop in oldSizzle ) {
          Sizzle[ prop ] = oldSizzle[ prop ];
        }

        // release memory in IE
        div = null;
      })();
    }

    (function(){
      var html = document.documentElement,
          matches = html.matchesSelector || html.mozMatchesSelector || html.webkitMatchesSelector || html.msMatchesSelector;

      if ( matches ) {
        // Check to see if it's possible to do matchesSelector
        // on a disconnected node (IE 9 fails this)
        var disconnectedMatch = !matches.call( document.createElement( "div" ), "div" ),
            pseudoWorks = false;

        try {
          // This should fail with an exception
          // Gecko does not error, returns false instead
          matches.call( document.documentElement, "[test!='']:sizzle" );

        } catch( pseudoError ) {
          pseudoWorks = true;
        }

        Sizzle.matchesSelector = function( node, expr ) {
          // Make sure that attribute selectors are quoted
          expr = expr.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");

          if ( !Sizzle.isXML( node ) ) {
            try {
              if ( pseudoWorks || !Expr.match.PSEUDO.test( expr ) && !/!=/.test( expr ) ) {
                var ret = matches.call( node, expr );

                // IE 9's matchesSelector returns false on disconnected nodes
                if ( ret || !disconnectedMatch ||
                  // As well, disconnected nodes are said to be in a document
                  // fragment in IE 9, so check for that
                    node.document && node.document.nodeType !== 11 ) {
                  return ret;
                }
              }
            } catch(e) {}
          }

          return Sizzle(expr, null, null, [node]).length > 0;
        };
      }
    })();

    (function(){
      var div = document.createElement("div");

      div.innerHTML = "<div class='test e'></div><div class='test'></div>";

      // Opera can't find a second classname (in 9.6)
      // Also, make sure that getElementsByClassName actually exists
      if ( !div.getElementsByClassName || div.getElementsByClassName("e").length === 0 ) {
        return;
      }

      // Safari caches class attributes, doesn't catch changes (in 3.2)
      div.lastChild.className = "e";

      if ( div.getElementsByClassName("e").length === 1 ) {
        return;
      }

      Expr.order.splice(1, 0, "CLASS");
      Expr.find.CLASS = function( match, context, isXML ) {
        if ( typeof context.getElementsByClassName !== "undefined" && !isXML ) {
          return context.getElementsByClassName(match[1]);
        }
      };

      // release memory in IE
      div = null;
    })();

    function dirNodeCheck( dir, cur, doneName, checkSet, nodeCheck, isXML ) {
      for ( var i = 0, l = checkSet.length; i < l; i++ ) {
        var elem = checkSet[i];

        if ( elem ) {
          var match = false;

          elem = elem[dir];

          while ( elem ) {
            if ( elem[ expando ] === doneName ) {
              match = checkSet[elem.sizset];
              break;
            }

            if ( elem.nodeType === 1 && !isXML ){
              elem[ expando ] = doneName;
              elem.sizset = i;
            }

            if ( elem.nodeName.toLowerCase() === cur ) {
              match = elem;
              break;
            }

            elem = elem[dir];
          }

          checkSet[i] = match;
        }
      }
    }

    function dirCheck( dir, cur, doneName, checkSet, nodeCheck, isXML ) {
      for ( var i = 0, l = checkSet.length; i < l; i++ ) {
        var elem = checkSet[i];

        if ( elem ) {
          var match = false;

          elem = elem[dir];

          while ( elem ) {
            if ( elem[ expando ] === doneName ) {
              match = checkSet[elem.sizset];
              break;
            }

            if ( elem.nodeType === 1 ) {
              if ( !isXML ) {
                elem[ expando ] = doneName;
                elem.sizset = i;
              }

              if ( typeof cur !== "string" ) {
                if ( elem === cur ) {
                  match = true;
                  break;
                }

              } else if ( Sizzle.filter( cur, [elem] ).length > 0 ) {
                match = elem;
                break;
              }
            }

            elem = elem[dir];
          }

          checkSet[i] = match;
        }
      }
    }

    if ( document.documentElement.contains ) {
      Sizzle.contains = function( a, b ) {
        return a !== b && (a.contains ? a.contains(b) : true);
      };

    } else if ( document.documentElement.compareDocumentPosition ) {
      Sizzle.contains = function( a, b ) {
        return !!(a.compareDocumentPosition(b) & 16);
      };

    } else {
      Sizzle.contains = function() {
        return false;
      };
    }

    Sizzle.isXML = function( elem ) {
      // documentElement is verified for cases where it doesn't yet exist
      // (such as loading iframes in IE - #4833)
      var documentElement = (elem ? elem.ownerDocument || elem : 0).documentElement;

      return documentElement ? documentElement.nodeName !== "HTML" : false;
    };

    var posProcess = function( selector, context, seed ) {
      var match,
          tmpSet = [],
          later = "",
          root = context.nodeType ? [context] : context;

      // Position selectors must be done after the filter
      // And so must :not(positional) so we move all PSEUDOs to the end
      while ( (match = Expr.match.PSEUDO.exec( selector )) ) {
        later += match[0];
        selector = selector.replace( Expr.match.PSEUDO, "" );
      }

      selector = Expr.relative[selector] ? selector + "*" : selector;

      for ( var i = 0, l = root.length; i < l; i++ ) {
        Sizzle( selector, root[i], tmpSet, seed );
      }

      return Sizzle.filter( later, tmpSet );
    };

// EXPOSE
// Override sizzle attribute retrieval
    Sizzle.attr = jQuery.attr;
    Sizzle.selectors.attrMap = {};
    jQuery.find = Sizzle;
    jQuery.expr = Sizzle.selectors;
    jQuery.expr[":"] = jQuery.expr.filters;
    jQuery.unique = Sizzle.uniqueSort;
    jQuery.text = Sizzle.getText;
    jQuery.isXMLDoc = Sizzle.isXML;
    jQuery.contains = Sizzle.contains;


  })();


  var runtil = /Until$/,
      rparentsprev = /^(?:parents|prevUntil|prevAll)/,
  // Note: This RegExp should be improved, or likely pulled from Sizzle
      rmultiselector = /,/,
      isSimple = /^.[^:#\[\.,]*$/,
      slice = Array.prototype.slice,
      POS = jQuery.expr.match.globalPOS,
  // methods guaranteed to produce a unique set when starting from a unique set
      guaranteedUnique = {
        children: true,
        contents: true,
        next: true,
        prev: true
      };

  jQuery.fn.extend({
    find: function( selector ) {
      var self = this,
          i, l;

      if ( typeof selector !== "string" ) {
        return jQuery( selector ).filter(function() {
          for ( i = 0, l = self.length; i < l; i++ ) {
            if ( jQuery.contains( self[ i ], this ) ) {
              return true;
            }
          }
        });
      }

      var ret = this.pushStack( "", "find", selector ),
          length, n, r;

      for ( i = 0, l = this.length; i < l; i++ ) {
        length = ret.length;
        jQuery.find( selector, this[i], ret );

        if ( i > 0 ) {
          // Make sure that the results are unique
          for ( n = length; n < ret.length; n++ ) {
            for ( r = 0; r < length; r++ ) {
              if ( ret[r] === ret[n] ) {
                ret.splice(n--, 1);
                break;
              }
            }
          }
        }
      }

      return ret;
    },

    has: function( target ) {
      var targets = jQuery( target );
      return this.filter(function() {
        for ( var i = 0, l = targets.length; i < l; i++ ) {
          if ( jQuery.contains( this, targets[i] ) ) {
            return true;
          }
        }
      });
    },

    not: function( selector ) {
      return this.pushStack( winnow(this, selector, false), "not", selector);
    },

    filter: function( selector ) {
      return this.pushStack( winnow(this, selector, true), "filter", selector );
    },

    is: function( selector ) {
      return !!selector && (
          typeof selector === "string" ?
            // If this is a positional selector, check membership in the returned set
            // so $("p:first").is("p:last") won't return true for a doc with two "p".
              POS.test( selector ) ?
                  jQuery( selector, this.context ).index( this[0] ) >= 0 :
                  jQuery.filter( selector, this ).length > 0 :
              this.filter( selector ).length > 0 );
    },

    closest: function( selectors, context ) {
      var ret = [], i, l, cur = this[0];

      // Array (deprecated as of jQuery 1.7)
      if ( jQuery.isArray( selectors ) ) {
        var level = 1;

        while ( cur && cur.ownerDocument && cur !== context ) {
          for ( i = 0; i < selectors.length; i++ ) {

            if ( jQuery( cur ).is( selectors[ i ] ) ) {
              ret.push({ selector: selectors[ i ], elem: cur, level: level });
            }
          }

          cur = cur.parentNode;
          level++;
        }

        return ret;
      }

      // String
      var pos = POS.test( selectors ) || typeof selectors !== "string" ?
          jQuery( selectors, context || this.context ) :
          0;

      for ( i = 0, l = this.length; i < l; i++ ) {
        cur = this[i];

        while ( cur ) {
          if ( pos ? pos.index(cur) > -1 : jQuery.find.matchesSelector(cur, selectors) ) {
            ret.push( cur );
            break;

          } else {
            cur = cur.parentNode;
            if ( !cur || !cur.ownerDocument || cur === context || cur.nodeType === 11 ) {
              break;
            }
          }
        }
      }

      ret = ret.length > 1 ? jQuery.unique( ret ) : ret;

      return this.pushStack( ret, "closest", selectors );
    },

    // Determine the position of an element within
    // the matched set of elements
    index: function( elem ) {

      // No argument, return index in parent
      if ( !elem ) {
        return ( this[0] && this[0].parentNode ) ? this.prevAll().length : -1;
      }

      // index in selector
      if ( typeof elem === "string" ) {
        return jQuery.inArray( this[0], jQuery( elem ) );
      }

      // Locate the position of the desired element
      return jQuery.inArray(
          // If it receives a jQuery object, the first element is used
          elem.jquery ? elem[0] : elem, this );
    },

    add: function( selector, context ) {
      var set = typeof selector === "string" ?
              jQuery( selector, context ) :
              jQuery.makeArray( selector && selector.nodeType ? [ selector ] : selector ),
          all = jQuery.merge( this.get(), set );

      return this.pushStack( isDisconnected( set[0] ) || isDisconnected( all[0] ) ?
          all :
          jQuery.unique( all ) );
    },

    andSelf: function() {
      return this.add( this.prevObject );
    }
  });

// A painfully simple check to see if an element is disconnected
// from a document (should be improved, where feasible).
  function isDisconnected( node ) {
    return !node || !node.parentNode || node.parentNode.nodeType === 11;
  }

  jQuery.each({
    parent: function( elem ) {
      var parent = elem.parentNode;
      return parent && parent.nodeType !== 11 ? parent : null;
    },
    parents: function( elem ) {
      return jQuery.dir( elem, "parentNode" );
    },
    parentsUntil: function( elem, i, until ) {
      return jQuery.dir( elem, "parentNode", until );
    },
    next: function( elem ) {
      return jQuery.nth( elem, 2, "nextSibling" );
    },
    prev: function( elem ) {
      return jQuery.nth( elem, 2, "previousSibling" );
    },
    nextAll: function( elem ) {
      return jQuery.dir( elem, "nextSibling" );
    },
    prevAll: function( elem ) {
      return jQuery.dir( elem, "previousSibling" );
    },
    nextUntil: function( elem, i, until ) {
      return jQuery.dir( elem, "nextSibling", until );
    },
    prevUntil: function( elem, i, until ) {
      return jQuery.dir( elem, "previousSibling", until );
    },
    siblings: function( elem ) {
      return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
    },
    children: function( elem ) {
      return jQuery.sibling( elem.firstChild );
    },
    contents: function( elem ) {
      return jQuery.nodeName( elem, "iframe" ) ?
          elem.contentDocument || elem.contentWindow.document :
          jQuery.makeArray( elem.childNodes );
    }
  }, function( name, fn ) {
    jQuery.fn[ name ] = function( until, selector ) {
      var ret = jQuery.map( this, fn, until );

      if ( !runtil.test( name ) ) {
        selector = until;
      }

      if ( selector && typeof selector === "string" ) {
        ret = jQuery.filter( selector, ret );
      }

      ret = this.length > 1 && !guaranteedUnique[ name ] ? jQuery.unique( ret ) : ret;

      if ( (this.length > 1 || rmultiselector.test( selector )) && rparentsprev.test( name ) ) {
        ret = ret.reverse();
      }

      return this.pushStack( ret, name, slice.call( arguments ).join(",") );
    };
  });

  jQuery.extend({
    filter: function( expr, elems, not ) {
      if ( not ) {
        expr = ":not(" + expr + ")";
      }

      return elems.length === 1 ?
          jQuery.find.matchesSelector(elems[0], expr) ? [ elems[0] ] : [] :
          jQuery.find.matches(expr, elems);
    },

    dir: function( elem, dir, until ) {
      var matched = [],
          cur = elem[ dir ];

      while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
        if ( cur.nodeType === 1 ) {
          matched.push( cur );
        }
        cur = cur[dir];
      }
      return matched;
    },

    nth: function( cur, result, dir, elem ) {
      result = result || 1;
      var num = 0;

      for ( ; cur; cur = cur[dir] ) {
        if ( cur.nodeType === 1 && ++num === result ) {
          break;
        }
      }

      return cur;
    },

    sibling: function( n, elem ) {
      var r = [];

      for ( ; n; n = n.nextSibling ) {
        if ( n.nodeType === 1 && n !== elem ) {
          r.push( n );
        }
      }

      return r;
    }
  });

// Implement the identical functionality for filter and not
  function winnow( elements, qualifier, keep ) {

    // Can't pass null or undefined to indexOf in Firefox 4
    // Set to 0 to skip string check
    qualifier = qualifier || 0;

    if ( jQuery.isFunction( qualifier ) ) {
      return jQuery.grep(elements, function( elem, i ) {
        var retVal = !!qualifier.call( elem, i, elem );
        return retVal === keep;
      });

    } else if ( qualifier.nodeType ) {
      return jQuery.grep(elements, function( elem, i ) {
        return ( elem === qualifier ) === keep;
      });

    } else if ( typeof qualifier === "string" ) {
      var filtered = jQuery.grep(elements, function( elem ) {
        return elem.nodeType === 1;
      });

      if ( isSimple.test( qualifier ) ) {
        return jQuery.filter(qualifier, filtered, !keep);
      } else {
        qualifier = jQuery.filter( qualifier, filtered );
      }
    }

    return jQuery.grep(elements, function( elem, i ) {
      return ( jQuery.inArray( elem, qualifier ) >= 0 ) === keep;
    });
  }




  function createSafeFragment( document ) {
    var list = nodeNames.split( "|" ),
        safeFrag = document.createDocumentFragment();

    if ( safeFrag.createElement ) {
      while ( list.length ) {
        safeFrag.createElement(
            list.pop()
        );
      }
    }
    return safeFrag;
  }

  var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
          "header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
      rinlinejQuery = / jQuery\d+="(?:\d+|null)"/g,
      rleadingWhitespace = /^\s+/,
      rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
      rtagName = /<([\w:]+)/,
      rtbody = /<tbody/i,
      rhtml = /<|&#?\w+;/,
      rnoInnerhtml = /<(?:script|style)/i,
      rnocache = /<(?:script|object|embed|option|style)/i,
      rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
  // checked="checked" or checked
      rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
      rscriptType = /\/(java|ecma)script/i,
      rcleanScript = /^\s*<!(?:\[CDATA\[|\-\-)/,
      wrapMap = {
        option: [ 1, "<select multiple='multiple'>", "</select>" ],
        legend: [ 1, "<fieldset>", "</fieldset>" ],
        thead: [ 1, "<table>", "</table>" ],
        tr: [ 2, "<table><tbody>", "</tbody></table>" ],
        td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
        col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
        area: [ 1, "<map>", "</map>" ],
        _default: [ 0, "", "" ]
      },
      safeFragment = createSafeFragment( document );

  wrapMap.optgroup = wrapMap.option;
  wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
  wrapMap.th = wrapMap.td;

// IE can't serialize <link> and <script> tags normally
  if ( !jQuery.support.htmlSerialize ) {
    wrapMap._default = [ 1, "div<div>", "</div>" ];
  }

  jQuery.fn.extend({
    text: function( value ) {
      return jQuery.access( this, function( value ) {
        return value === undefined ?
            jQuery.text( this ) :
            this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
      }, null, value, arguments.length );
    },

    wrapAll: function( html ) {
      if ( jQuery.isFunction( html ) ) {
        return this.each(function(i) {
          jQuery(this).wrapAll( html.call(this, i) );
        });
      }

      if ( this[0] ) {
        // The elements to wrap the target around
        var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

        if ( this[0].parentNode ) {
          wrap.insertBefore( this[0] );
        }

        wrap.map(function() {
          var elem = this;

          while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
            elem = elem.firstChild;
          }

          return elem;
        }).append( this );
      }

      return this;
    },

    wrapInner: function( html ) {
      if ( jQuery.isFunction( html ) ) {
        return this.each(function(i) {
          jQuery(this).wrapInner( html.call(this, i) );
        });
      }

      return this.each(function() {
        var self = jQuery( this ),
            contents = self.contents();

        if ( contents.length ) {
          contents.wrapAll( html );

        } else {
          self.append( html );
        }
      });
    },

    wrap: function( html ) {
      var isFunction = jQuery.isFunction( html );

      return this.each(function(i) {
        jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
      });
    },

    unwrap: function() {
      return this.parent().each(function() {
        if ( !jQuery.nodeName( this, "body" ) ) {
          jQuery( this ).replaceWith( this.childNodes );
        }
      }).end();
    },

    append: function() {
      return this.domManip(arguments, true, function( elem ) {
        if ( this.nodeType === 1 ) {
          this.appendChild( elem );
        }
      });
    },

    prepend: function() {
      return this.domManip(arguments, true, function( elem ) {
        if ( this.nodeType === 1 ) {
          this.insertBefore( elem, this.firstChild );
        }
      });
    },

    before: function() {
      if ( this[0] && this[0].parentNode ) {
        return this.domManip(arguments, false, function( elem ) {
          this.parentNode.insertBefore( elem, this );
        });
      } else if ( arguments.length ) {
        var set = jQuery.clean( arguments );
        set.push.apply( set, this.toArray() );
        return this.pushStack( set, "before", arguments );
      }
    },

    after: function() {
      if ( this[0] && this[0].parentNode ) {
        return this.domManip(arguments, false, function( elem ) {
          this.parentNode.insertBefore( elem, this.nextSibling );
        });
      } else if ( arguments.length ) {
        var set = this.pushStack( this, "after", arguments );
        set.push.apply( set, jQuery.clean(arguments) );
        return set;
      }
    },

    // keepData is for internal use only--do not document
    remove: function( selector, keepData ) {
      for ( var i = 0, elem; (elem = this[i]) != null; i++ ) {
        if ( !selector || jQuery.filter( selector, [ elem ] ).length ) {
          if ( !keepData && elem.nodeType === 1 ) {
            jQuery.cleanData( elem.getElementsByTagName("*") );
            jQuery.cleanData( [ elem ] );
          }

          if ( elem.parentNode ) {
            elem.parentNode.removeChild( elem );
          }
        }
      }

      return this;
    },

    empty: function() {
      for ( var i = 0, elem; (elem = this[i]) != null; i++ ) {
        // Remove element nodes and prevent memory leaks
        if ( elem.nodeType === 1 ) {
          jQuery.cleanData( elem.getElementsByTagName("*") );
        }

        // Remove any remaining nodes
        while ( elem.firstChild ) {
          elem.removeChild( elem.firstChild );
        }
      }

      return this;
    },

    clone: function( dataAndEvents, deepDataAndEvents ) {
      dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
      deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

      return this.map( function () {
        return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
      });
    },

    html: function( value ) {
      return jQuery.access( this, function( value ) {
        var elem = this[0] || {},
            i = 0,
            l = this.length;

        if ( value === undefined ) {
          return elem.nodeType === 1 ?
              elem.innerHTML.replace( rinlinejQuery, "" ) :
              null;
        }


        if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
            ( jQuery.support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
            !wrapMap[ ( rtagName.exec( value ) || ["", ""] )[1].toLowerCase() ] ) {

          value = value.replace( rxhtmlTag, "<$1></$2>" );

          try {
            for (; i < l; i++ ) {
              // Remove element nodes and prevent memory leaks
              elem = this[i] || {};
              if ( elem.nodeType === 1 ) {
                jQuery.cleanData( elem.getElementsByTagName( "*" ) );
                elem.innerHTML = value;
              }
            }

            elem = 0;

            // If using innerHTML throws an exception, use the fallback method
          } catch(e) {}
        }

        if ( elem ) {
          this.empty().append( value );
        }
      }, null, value, arguments.length );
    },

    replaceWith: function( value ) {
      if ( this[0] && this[0].parentNode ) {
        // Make sure that the elements are removed from the DOM before they are inserted
        // this can help fix replacing a parent with child elements
        if ( jQuery.isFunction( value ) ) {
          return this.each(function(i) {
            var self = jQuery(this), old = self.html();
            self.replaceWith( value.call( this, i, old ) );
          });
        }

        if ( typeof value !== "string" ) {
          value = jQuery( value ).detach();
        }

        return this.each(function() {
          var next = this.nextSibling,
              parent = this.parentNode;

          jQuery( this ).remove();

          if ( next ) {
            jQuery(next).before( value );
          } else {
            jQuery(parent).append( value );
          }
        });
      } else {
        return this.length ?
            this.pushStack( jQuery(jQuery.isFunction(value) ? value() : value), "replaceWith", value ) :
            this;
      }
    },

    detach: function( selector ) {
      return this.remove( selector, true );
    },

    domManip: function( args, table, callback ) {
      var results, first, fragment, parent,
          value = args[0],
          scripts = [];

      // We can't cloneNode fragments that contain checked, in WebKit
      if ( !jQuery.support.checkClone && arguments.length === 3 && typeof value === "string" && rchecked.test( value ) ) {
        return this.each(function() {
          jQuery(this).domManip( args, table, callback, true );
        });
      }

      if ( jQuery.isFunction(value) ) {
        return this.each(function(i) {
          var self = jQuery(this);
          args[0] = value.call(this, i, table ? self.html() : undefined);
          self.domManip( args, table, callback );
        });
      }

      if ( this[0] ) {
        parent = value && value.parentNode;

        // If we're in a fragment, just use that instead of building a new one
        if ( jQuery.support.parentNode && parent && parent.nodeType === 11 && parent.childNodes.length === this.length ) {
          results = { fragment: parent };

        } else {
          results = jQuery.buildFragment( args, this, scripts );
        }

        fragment = results.fragment;

        if ( fragment.childNodes.length === 1 ) {
          first = fragment = fragment.firstChild;
        } else {
          first = fragment.firstChild;
        }

        if ( first ) {
          table = table && jQuery.nodeName( first, "tr" );

          for ( var i = 0, l = this.length, lastIndex = l - 1; i < l; i++ ) {
            callback.call(
                table ?
                    root(this[i], first) :
                    this[i],
                // Make sure that we do not leak memory by inadvertently discarding
                // the original fragment (which might have attached data) instead of
                // using it; in addition, use the original fragment object for the last
                // item instead of first because it can end up being emptied incorrectly
                // in certain situations (Bug #8070).
                // Fragments from the fragment cache must always be cloned and never used
                // in place.
                results.cacheable || ( l > 1 && i < lastIndex ) ?
                    jQuery.clone( fragment, true, true ) :
                    fragment
            );
          }
        }

        if ( scripts.length ) {
          jQuery.each( scripts, function( i, elem ) {
            if ( elem.src ) {
              jQuery.ajax({
                type: "GET",
                global: false,
                url: elem.src,
                async: false,
                dataType: "script"
              });
            } else {
              jQuery.globalEval( ( elem.text || elem.textContent || elem.innerHTML || "" ).replace( rcleanScript, "/*$0*/" ) );
            }

            if ( elem.parentNode ) {
              elem.parentNode.removeChild( elem );
            }
          });
        }
      }

      return this;
    }
  });

  function root( elem, cur ) {
    return jQuery.nodeName(elem, "table") ?
        (elem.getElementsByTagName("tbody")[0] ||
            elem.appendChild(elem.ownerDocument.createElement("tbody"))) :
        elem;
  }

  function cloneCopyEvent( src, dest ) {

    if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
      return;
    }

    var type, i, l,
        oldData = jQuery._data( src ),
        curData = jQuery._data( dest, oldData ),
        events = oldData.events;

    if ( events ) {
      delete curData.handle;
      curData.events = {};

      for ( type in events ) {
        for ( i = 0, l = events[ type ].length; i < l; i++ ) {
          jQuery.event.add( dest, type, events[ type ][ i ] );
        }
      }
    }

    // make the cloned public data object a copy from the original
    if ( curData.data ) {
      curData.data = jQuery.extend( {}, curData.data );
    }
  }

  function cloneFixAttributes( src, dest ) {
    var nodeName;

    // We do not need to do anything for non-Elements
    if ( dest.nodeType !== 1 ) {
      return;
    }

    // clearAttributes removes the attributes, which we don't want,
    // but also removes the attachEvent events, which we *do* want
    if ( dest.clearAttributes ) {
      dest.clearAttributes();
    }

    // mergeAttributes, in contrast, only merges back on the
    // original attributes, not the events
    if ( dest.mergeAttributes ) {
      dest.mergeAttributes( src );
    }

    nodeName = dest.nodeName.toLowerCase();

    // IE6-8 fail to clone children inside object elements that use
    // the proprietary classid attribute value (rather than the type
    // attribute) to identify the type of content to display
    if ( nodeName === "object" ) {
      dest.outerHTML = src.outerHTML;

    } else if ( nodeName === "input" && (src.type === "checkbox" || src.type === "radio") ) {
      // IE6-8 fails to persist the checked state of a cloned checkbox
      // or radio button. Worse, IE6-7 fail to give the cloned element
      // a checked appearance if the defaultChecked value isn't also set
      if ( src.checked ) {
        dest.defaultChecked = dest.checked = src.checked;
      }

      // IE6-7 get confused and end up setting the value of a cloned
      // checkbox/radio button to an empty string instead of "on"
      if ( dest.value !== src.value ) {
        dest.value = src.value;
      }

      // IE6-8 fails to return the selected option to the default selected
      // state when cloning options
    } else if ( nodeName === "option" ) {
      dest.selected = src.defaultSelected;

      // IE6-8 fails to set the defaultValue to the correct value when
      // cloning other types of input fields
    } else if ( nodeName === "input" || nodeName === "textarea" ) {
      dest.defaultValue = src.defaultValue;

      // IE blanks contents when cloning scripts
    } else if ( nodeName === "script" && dest.text !== src.text ) {
      dest.text = src.text;
    }

    // Event data gets referenced instead of copied if the expando
    // gets copied too
    dest.removeAttribute( jQuery.expando );

    // Clear flags for bubbling special change/submit events, they must
    // be reattached when the newly cloned events are first activated
    dest.removeAttribute( "_submit_attached" );
    dest.removeAttribute( "_change_attached" );
  }

  jQuery.buildFragment = function( args, nodes, scripts ) {
    var fragment, cacheable, cacheresults, doc,
        first = args[ 0 ];

    // nodes may contain either an explicit document object,
    // a jQuery collection or context object.
    // If nodes[0] contains a valid object to assign to doc
    if ( nodes && nodes[0] ) {
      doc = nodes[0].ownerDocument || nodes[0];
    }

    // Ensure that an attr object doesn't incorrectly stand in as a document object
    // Chrome and Firefox seem to allow this to occur and will throw exception
    // Fixes #8950
    if ( !doc.createDocumentFragment ) {
      doc = document;
    }

    // Only cache "small" (1/2 KB) HTML strings that are associated with the main document
    // Cloning options loses the selected state, so don't cache them
    // IE 6 doesn't like it when you put <object> or <embed> elements in a fragment
    // Also, WebKit does not clone 'checked' attributes on cloneNode, so don't cache
    // Lastly, IE6,7,8 will not correctly reuse cached fragments that were created from unknown elems #10501
    if ( args.length === 1 && typeof first === "string" && first.length < 512 && doc === document &&
        first.charAt(0) === "<" && !rnocache.test( first ) &&
        (jQuery.support.checkClone || !rchecked.test( first )) &&
        (jQuery.support.html5Clone || !rnoshimcache.test( first )) ) {

      cacheable = true;

      cacheresults = jQuery.fragments[ first ];
      if ( cacheresults && cacheresults !== 1 ) {
        fragment = cacheresults;
      }
    }

    if ( !fragment ) {
      fragment = doc.createDocumentFragment();
      jQuery.clean( args, doc, fragment, scripts );
    }

    if ( cacheable ) {
      jQuery.fragments[ first ] = cacheresults ? fragment : 1;
    }

    return { fragment: fragment, cacheable: cacheable };
  };

  jQuery.fragments = {};

  jQuery.each({
    appendTo: "append",
    prependTo: "prepend",
    insertBefore: "before",
    insertAfter: "after",
    replaceAll: "replaceWith"
  }, function( name, original ) {
    jQuery.fn[ name ] = function( selector ) {
      var ret = [],
          insert = jQuery( selector ),
          parent = this.length === 1 && this[0].parentNode;

      if ( parent && parent.nodeType === 11 && parent.childNodes.length === 1 && insert.length === 1 ) {
        insert[ original ]( this[0] );
        return this;

      } else {
        for ( var i = 0, l = insert.length; i < l; i++ ) {
          var elems = ( i > 0 ? this.clone(true) : this ).get();
          jQuery( insert[i] )[ original ]( elems );
          ret = ret.concat( elems );
        }

        return this.pushStack( ret, name, insert.selector );
      }
    };
  });

  function getAll( elem ) {
    if ( typeof elem.getElementsByTagName !== "undefined" ) {
      return elem.getElementsByTagName( "*" );

    } else if ( typeof elem.querySelectorAll !== "undefined" ) {
      return elem.querySelectorAll( "*" );

    } else {
      return [];
    }
  }

// Used in clean, fixes the defaultChecked property
  function fixDefaultChecked( elem ) {
    if ( elem.type === "checkbox" || elem.type === "radio" ) {
      elem.defaultChecked = elem.checked;
    }
  }
// Finds all inputs and passes them to fixDefaultChecked
  function findInputs( elem ) {
    var nodeName = ( elem.nodeName || "" ).toLowerCase();
    if ( nodeName === "input" ) {
      fixDefaultChecked( elem );
      // Skip scripts, get other children
    } else if ( nodeName !== "script" && typeof elem.getElementsByTagName !== "undefined" ) {
      jQuery.grep( elem.getElementsByTagName("input"), fixDefaultChecked );
    }
  }

// Derived From: http://www.iecss.com/shimprove/javascript/shimprove.1-0-1.js
  function shimCloneNode( elem ) {
    var div = document.createElement( "div" );
    safeFragment.appendChild( div );

    div.innerHTML = elem.outerHTML;
    return div.firstChild;
  }

  jQuery.extend({
    clone: function( elem, dataAndEvents, deepDataAndEvents ) {
      var srcElements,
          destElements,
          i,
      // IE<=8 does not properly clone detached, unknown element nodes
          clone = jQuery.support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ?
              elem.cloneNode( true ) :
              shimCloneNode( elem );

      if ( (!jQuery.support.noCloneEvent || !jQuery.support.noCloneChecked) &&
          (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {
        // IE copies events bound via attachEvent when using cloneNode.
        // Calling detachEvent on the clone will also remove the events
        // from the original. In order to get around this, we use some
        // proprietary methods to clear the events. Thanks to MooTools
        // guys for this hotness.

        cloneFixAttributes( elem, clone );

        // Using Sizzle here is crazy slow, so we use getElementsByTagName instead
        srcElements = getAll( elem );
        destElements = getAll( clone );

        // Weird iteration because IE will replace the length property
        // with an element if you are cloning the body and one of the
        // elements on the page has a name or id of "length"
        for ( i = 0; srcElements[i]; ++i ) {
          // Ensure that the destination node is not null; Fixes #9587
          if ( destElements[i] ) {
            cloneFixAttributes( srcElements[i], destElements[i] );
          }
        }
      }

      // Copy the events from the original to the clone
      if ( dataAndEvents ) {
        cloneCopyEvent( elem, clone );

        if ( deepDataAndEvents ) {
          srcElements = getAll( elem );
          destElements = getAll( clone );

          for ( i = 0; srcElements[i]; ++i ) {
            cloneCopyEvent( srcElements[i], destElements[i] );
          }
        }
      }

      srcElements = destElements = null;

      // Return the cloned set
      return clone;
    },

    clean: function( elems, context, fragment, scripts ) {
      var checkScriptType, script, j,
          ret = [];

      context = context || document;

      // !context.createElement fails in IE with an error but returns typeof 'object'
      if ( typeof context.createElement === "undefined" ) {
        context = context.ownerDocument || context[0] && context[0].ownerDocument || document;
      }

      for ( var i = 0, elem; (elem = elems[i]) != null; i++ ) {
        if ( typeof elem === "number" ) {
          elem += "";
        }

        if ( !elem ) {
          continue;
        }

        // Convert html string into DOM nodes
        if ( typeof elem === "string" ) {
          if ( !rhtml.test( elem ) ) {
            elem = context.createTextNode( elem );
          } else {
            // Fix "XHTML"-style tags in all browsers
            elem = elem.replace(rxhtmlTag, "<$1></$2>");

            // Trim whitespace, otherwise indexOf won't work as expected
            var tag = ( rtagName.exec( elem ) || ["", ""] )[1].toLowerCase(),
                wrap = wrapMap[ tag ] || wrapMap._default,
                depth = wrap[0],
                div = context.createElement("div"),
                safeChildNodes = safeFragment.childNodes,
                remove;

            // Append wrapper element to unknown element safe doc fragment
            if ( context === document ) {
              // Use the fragment we've already created for this document
              safeFragment.appendChild( div );
            } else {
              // Use a fragment created with the owner document
              createSafeFragment( context ).appendChild( div );
            }

            // Go to html and back, then peel off extra wrappers
            div.innerHTML = wrap[1] + elem + wrap[2];

            // Move to the right depth
            while ( depth-- ) {
              div = div.lastChild;
            }

            // Remove IE's autoinserted <tbody> from table fragments
            if ( !jQuery.support.tbody ) {

              // String was a <table>, *may* have spurious <tbody>
              var hasBody = rtbody.test(elem),
                  tbody = tag === "table" && !hasBody ?
                      div.firstChild && div.firstChild.childNodes :

                    // String was a bare <thead> or <tfoot>
                      wrap[1] === "<table>" && !hasBody ?
                          div.childNodes :
                          [];

              for ( j = tbody.length - 1; j >= 0 ; --j ) {
                if ( jQuery.nodeName( tbody[ j ], "tbody" ) && !tbody[ j ].childNodes.length ) {
                  tbody[ j ].parentNode.removeChild( tbody[ j ] );
                }
              }
            }

            // IE completely kills leading whitespace when innerHTML is used
            if ( !jQuery.support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
              div.insertBefore( context.createTextNode( rleadingWhitespace.exec(elem)[0] ), div.firstChild );
            }

            elem = div.childNodes;

            // Clear elements from DocumentFragment (safeFragment or otherwise)
            // to avoid hoarding elements. Fixes #11356
            if ( div ) {
              div.parentNode.removeChild( div );

              // Guard against -1 index exceptions in FF3.6
              if ( safeChildNodes.length > 0 ) {
                remove = safeChildNodes[ safeChildNodes.length - 1 ];

                if ( remove && remove.parentNode ) {
                  remove.parentNode.removeChild( remove );
                }
              }
            }
          }
        }

        // Resets defaultChecked for any radios and checkboxes
        // about to be appended to the DOM in IE 6/7 (#8060)
        var len;
        if ( !jQuery.support.appendChecked ) {
          if ( elem[0] && typeof (len = elem.length) === "number" ) {
            for ( j = 0; j < len; j++ ) {
              findInputs( elem[j] );
            }
          } else {
            findInputs( elem );
          }
        }

        if ( elem.nodeType ) {
          ret.push( elem );
        } else {
          ret = jQuery.merge( ret, elem );
        }
      }

      if ( fragment ) {
        checkScriptType = function( elem ) {
          return !elem.type || rscriptType.test( elem.type );
        };
        for ( i = 0; ret[i]; i++ ) {
          script = ret[i];
          if ( scripts && jQuery.nodeName( script, "script" ) && (!script.type || rscriptType.test( script.type )) ) {
            scripts.push( script.parentNode ? script.parentNode.removeChild( script ) : script );

          } else {
            if ( script.nodeType === 1 ) {
              var jsTags = jQuery.grep( script.getElementsByTagName( "script" ), checkScriptType );

              ret.splice.apply( ret, [i + 1, 0].concat( jsTags ) );
            }
            fragment.appendChild( script );
          }
        }
      }

      return ret;
    },

    cleanData: function( elems ) {
      var data, id,
          cache = jQuery.cache,
          special = jQuery.event.special,
          deleteExpando = jQuery.support.deleteExpando;

      for ( var i = 0, elem; (elem = elems[i]) != null; i++ ) {
        if ( elem.nodeName && jQuery.noData[elem.nodeName.toLowerCase()] ) {
          continue;
        }

        id = elem[ jQuery.expando ];

        if ( id ) {
          data = cache[ id ];

          if ( data && data.events ) {
            for ( var type in data.events ) {
              if ( special[ type ] ) {
                jQuery.event.remove( elem, type );

                // This is a shortcut to avoid jQuery.event.remove's overhead
              } else {
                jQuery.removeEvent( elem, type, data.handle );
              }
            }

            // Null the DOM reference to avoid IE6/7/8 leak (#7054)
            if ( data.handle ) {
              data.handle.elem = null;
            }
          }

          if ( deleteExpando ) {
            delete elem[ jQuery.expando ];

          } else if ( elem.removeAttribute ) {
            elem.removeAttribute( jQuery.expando );
          }

          delete cache[ id ];
        }
      }
    }
  });




  var ralpha = /alpha\([^)]*\)/i,
      ropacity = /opacity=([^)]*)/,
  // fixed for IE9, see #8346
      rupper = /([A-Z]|^ms)/g,
      rnum = /^[\-+]?(?:\d*\.)?\d+$/i,
      rnumnonpx = /^-?(?:\d*\.)?\d+(?!px)[^\d\s]+$/i,
      rrelNum = /^([\-+])=([\-+.\de]+)/,
      rmargin = /^margin/,

      cssShow = { position: "absolute", visibility: "hidden", display: "block" },

  // order is important!
      cssExpand = [ "Top", "Right", "Bottom", "Left" ],

      curCSS,

      getComputedStyle,
      currentStyle;

  jQuery.fn.css = function( name, value ) {
    return jQuery.access( this, function( elem, name, value ) {
      return value !== undefined ?
          jQuery.style( elem, name, value ) :
          jQuery.css( elem, name );
    }, name, value, arguments.length > 1 );
  };

  jQuery.extend({
    // Add in style property hooks for overriding the default
    // behavior of getting and setting a style property
    cssHooks: {
      opacity: {
        get: function( elem, computed ) {
          if ( computed ) {
            // We should always get a number back from opacity
            var ret = curCSS( elem, "opacity" );
            return ret === "" ? "1" : ret;

          } else {
            return elem.style.opacity;
          }
        }
      }
    },

    // Exclude the following css properties to add px
    cssNumber: {
      "fillOpacity": true,
      "fontWeight": true,
      "lineHeight": true,
      "opacity": true,
      "orphans": true,
      "widows": true,
      "zIndex": true,
      "zoom": true
    },

    // Add in properties whose names you wish to fix before
    // setting or getting the value
    cssProps: {
      // normalize float css property
      "float": jQuery.support.cssFloat ? "cssFloat" : "styleFloat"
    },

    // Get and set the style property on a DOM Node
    style: function( elem, name, value, extra ) {
      // Don't set styles on text and comment nodes
      if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
        return;
      }

      // Make sure that we're working with the right name
      var ret, type, origName = jQuery.camelCase( name ),
          style = elem.style, hooks = jQuery.cssHooks[ origName ];

      name = jQuery.cssProps[ origName ] || origName;

      // Check if we're setting a value
      if ( value !== undefined ) {
        type = typeof value;

        // convert relative number strings (+= or -=) to relative numbers. #7345
        if ( type === "string" && (ret = rrelNum.exec( value )) ) {
          value = ( +( ret[1] + 1) * +ret[2] ) + parseFloat( jQuery.css( elem, name ) );
          // Fixes bug #9237
          type = "number";
        }

        // Make sure that NaN and null values aren't set. See: #7116
        if ( value == null || type === "number" && isNaN( value ) ) {
          return;
        }

        // If a number was passed in, add 'px' to the (except for certain CSS properties)
        if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
          value += "px";
        }

        // If a hook was provided, use that value, otherwise just set the specified value
        if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value )) !== undefined ) {
          // Wrapped to prevent IE from throwing errors when 'invalid' values are provided
          // Fixes bug #5509
          try {
            style[ name ] = value;
          } catch(e) {}
        }

      } else {
        // If a hook was provided get the non-computed value from there
        if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
          return ret;
        }

        // Otherwise just get the value from the style object
        return style[ name ];
      }
    },

    css: function( elem, name, extra ) {
      var ret, hooks;

      // Make sure that we're working with the right name
      name = jQuery.camelCase( name );
      hooks = jQuery.cssHooks[ name ];
      name = jQuery.cssProps[ name ] || name;

      // cssFloat needs a special treatment
      if ( name === "cssFloat" ) {
        name = "float";
      }

      // If a hook was provided get the computed value from there
      if ( hooks && "get" in hooks && (ret = hooks.get( elem, true, extra )) !== undefined ) {
        return ret;

        // Otherwise, if a way to get the computed value exists, use that
      } else if ( curCSS ) {
        return curCSS( elem, name );
      }
    },

    // A method for quickly swapping in/out CSS properties to get correct calculations
    swap: function( elem, options, callback ) {
      var old = {},
          ret, name;

      // Remember the old values, and insert the new ones
      for ( name in options ) {
        old[ name ] = elem.style[ name ];
        elem.style[ name ] = options[ name ];
      }

      ret = callback.call( elem );

      // Revert the old values
      for ( name in options ) {
        elem.style[ name ] = old[ name ];
      }

      return ret;
    }
  });

// DEPRECATED in 1.3, Use jQuery.css() instead
  jQuery.curCSS = jQuery.css;

  if ( document.defaultView && document.defaultView.getComputedStyle ) {
    getComputedStyle = function( elem, name ) {
      var ret, defaultView, computedStyle, width,
          style = elem.style;

      name = name.replace( rupper, "-$1" ).toLowerCase();

      if ( (defaultView = elem.ownerDocument.defaultView) &&
          (computedStyle = defaultView.getComputedStyle( elem, null )) ) {

        ret = computedStyle.getPropertyValue( name );
        if ( ret === "" && !jQuery.contains( elem.ownerDocument.documentElement, elem ) ) {
          ret = jQuery.style( elem, name );
        }
      }

      // A tribute to the "awesome hack by Dean Edwards"
      // WebKit uses "computed value (percentage if specified)" instead of "used value" for margins
      // which is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
      if ( !jQuery.support.pixelMargin && computedStyle && rmargin.test( name ) && rnumnonpx.test( ret ) ) {
        width = style.width;
        style.width = ret;
        ret = computedStyle.width;
        style.width = width;
      }

      return ret;
    };
  }

  if ( document.documentElement.currentStyle ) {
    currentStyle = function( elem, name ) {
      var left, rsLeft, uncomputed,
          ret = elem.currentStyle && elem.currentStyle[ name ],
          style = elem.style;

      // Avoid setting ret to empty string here
      // so we don't default to auto
      if ( ret == null && style && (uncomputed = style[ name ]) ) {
        ret = uncomputed;
      }

      // From the awesome hack by Dean Edwards
      // http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

      // If we're not dealing with a regular pixel number
      // but a number that has a weird ending, we need to convert it to pixels
      if ( rnumnonpx.test( ret ) ) {

        // Remember the original values
        left = style.left;
        rsLeft = elem.runtimeStyle && elem.runtimeStyle.left;

        // Put in the new values to get a computed value out
        if ( rsLeft ) {
          elem.runtimeStyle.left = elem.currentStyle.left;
        }
        style.left = name === "fontSize" ? "1em" : ret;
        ret = style.pixelLeft + "px";

        // Revert the changed values
        style.left = left;
        if ( rsLeft ) {
          elem.runtimeStyle.left = rsLeft;
        }
      }

      return ret === "" ? "auto" : ret;
    };
  }

  curCSS = getComputedStyle || currentStyle;

  function getWidthOrHeight( elem, name, extra ) {

    // Start with offset property
    var val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
        i = name === "width" ? 1 : 0,
        len = 4;

    if ( val > 0 ) {
      if ( extra !== "border" ) {
        for ( ; i < len; i += 2 ) {
          if ( !extra ) {
            val -= parseFloat( jQuery.css( elem, "padding" + cssExpand[ i ] ) ) || 0;
          }
          if ( extra === "margin" ) {
            val += parseFloat( jQuery.css( elem, extra + cssExpand[ i ] ) ) || 0;
          } else {
            val -= parseFloat( jQuery.css( elem, "border" + cssExpand[ i ] + "Width" ) ) || 0;
          }
        }
      }

      return val + "px";
    }

    // Fall back to computed then uncomputed css if necessary
    val = curCSS( elem, name );
    if ( val < 0 || val == null ) {
      val = elem.style[ name ];
    }

    // Computed unit is not pixels. Stop here and return.
    if ( rnumnonpx.test(val) ) {
      return val;
    }

    // Normalize "", auto, and prepare for extra
    val = parseFloat( val ) || 0;

    // Add padding, border, margin
    if ( extra ) {
      for ( ; i < len; i += 2 ) {
        val += parseFloat( jQuery.css( elem, "padding" + cssExpand[ i ] ) ) || 0;
        if ( extra !== "padding" ) {
          val += parseFloat( jQuery.css( elem, "border" + cssExpand[ i ] + "Width" ) ) || 0;
        }
        if ( extra === "margin" ) {
          val += parseFloat( jQuery.css( elem, extra + cssExpand[ i ]) ) || 0;
        }
      }
    }

    return val + "px";
  }

  jQuery.each([ "height", "width" ], function( i, name ) {
    jQuery.cssHooks[ name ] = {
      get: function( elem, computed, extra ) {
        if ( computed ) {
          if ( elem.offsetWidth !== 0 ) {
            return getWidthOrHeight( elem, name, extra );
          } else {
            return jQuery.swap( elem, cssShow, function() {
              return getWidthOrHeight( elem, name, extra );
            });
          }
        }
      },

      set: function( elem, value ) {
        return rnum.test( value ) ?
            value + "px" :
            value;
      }
    };
  });

  if ( !jQuery.support.opacity ) {
    jQuery.cssHooks.opacity = {
      get: function( elem, computed ) {
        // IE uses filters for opacity
        return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
            ( parseFloat( RegExp.$1 ) / 100 ) + "" :
            computed ? "1" : "";
      },

      set: function( elem, value ) {
        var style = elem.style,
            currentStyle = elem.currentStyle,
            opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
            filter = currentStyle && currentStyle.filter || style.filter || "";

        // IE has trouble with opacity if it does not have layout
        // Force it by setting the zoom level
        style.zoom = 1;

        // if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
        if ( value >= 1 && jQuery.trim( filter.replace( ralpha, "" ) ) === "" ) {

          // Setting style.filter to null, "" & " " still leave "filter:" in the cssText
          // if "filter:" is present at all, clearType is disabled, we want to avoid this
          // style.removeAttribute is IE Only, but so apparently is this code path...
          style.removeAttribute( "filter" );

          // if there there is no filter style applied in a css rule, we are done
          if ( currentStyle && !currentStyle.filter ) {
            return;
          }
        }

        // otherwise, set new filter values
        style.filter = ralpha.test( filter ) ?
            filter.replace( ralpha, opacity ) :
            filter + " " + opacity;
      }
    };
  }

  jQuery(function() {
    // This hook cannot be added until DOM ready because the support test
    // for it is not run until after DOM ready
    if ( !jQuery.support.reliableMarginRight ) {
      jQuery.cssHooks.marginRight = {
        get: function( elem, computed ) {
          // WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
          // Work around by temporarily setting element display to inline-block
          return jQuery.swap( elem, { "display": "inline-block" }, function() {
            if ( computed ) {
              return curCSS( elem, "margin-right" );
            } else {
              return elem.style.marginRight;
            }
          });
        }
      };
    }
  });

  if ( jQuery.expr && jQuery.expr.filters ) {
    jQuery.expr.filters.hidden = function( elem ) {
      var width = elem.offsetWidth,
          height = elem.offsetHeight;

      return ( width === 0 && height === 0 ) || (!jQuery.support.reliableHiddenOffsets && ((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
    };

    jQuery.expr.filters.visible = function( elem ) {
      return !jQuery.expr.filters.hidden( elem );
    };
  }

// These hooks are used by animate to expand properties
  jQuery.each({
    margin: "",
    padding: "",
    border: "Width"
  }, function( prefix, suffix ) {

    jQuery.cssHooks[ prefix + suffix ] = {
      expand: function( value ) {
        var i,

        // assumes a single number if not a string
            parts = typeof value === "string" ? value.split(" ") : [ value ],
            expanded = {};

        for ( i = 0; i < 4; i++ ) {
          expanded[ prefix + cssExpand[ i ] + suffix ] =
              parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
        }

        return expanded;
      }
    };
  });




  var r20 = /%20/g,
      rbracket = /\[\]$/,
      rCRLF = /\r?\n/g,
      rhash = /#.*$/,
      rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
      rinput = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
  // #7653, #8125, #8152: local protocol detection
      rlocalProtocol = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
      rnoContent = /^(?:GET|HEAD)$/,
      rprotocol = /^\/\//,
      rquery = /\?/,
      rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      rselectTextarea = /^(?:select|textarea)/i,
      rspacesAjax = /\s+/,
      rts = /([?&])_=[^&]*/,
      rurl = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,

  // Keep a copy of the old load method
      _load = jQuery.fn.load,

  /* Prefilters
   * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
   * 2) These are called:
   *    - BEFORE asking for a transport
   *    - AFTER param serialization (s.data is a string if s.processData is true)
   * 3) key is the dataType
   * 4) the catchall symbol "*" can be used
   * 5) execution will start with transport dataType and THEN continue down to "*" if needed
   */
      prefilters = {},

  /* Transports bindings
   * 1) key is the dataType
   * 2) the catchall symbol "*" can be used
   * 3) selection will start with transport dataType and THEN go to "*" if needed
   */
      transports = {},

  // Document location
      ajaxLocation,

  // Document location segments
      ajaxLocParts,

  // Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
      allTypes = ["*/"] + ["*"];

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
  try {
    ajaxLocation = location.href;
  } catch( e ) {
    // Use the href attribute of an A element
    // since IE will modify it given document.location
    ajaxLocation = document.createElement( "a" );
    ajaxLocation.href = "";
    ajaxLocation = ajaxLocation.href;
  }

// Segment location into parts
  ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
  function addToPrefiltersOrTransports( structure ) {

    // dataTypeExpression is optional and defaults to "*"
    return function( dataTypeExpression, func ) {

      if ( typeof dataTypeExpression !== "string" ) {
        func = dataTypeExpression;
        dataTypeExpression = "*";
      }

      if ( jQuery.isFunction( func ) ) {
        var dataTypes = dataTypeExpression.toLowerCase().split( rspacesAjax ),
            i = 0,
            length = dataTypes.length,
            dataType,
            list,
            placeBefore;

        // For each dataType in the dataTypeExpression
        for ( ; i < length; i++ ) {
          dataType = dataTypes[ i ];
          // We control if we're asked to add before
          // any existing element
          placeBefore = /^\+/.test( dataType );
          if ( placeBefore ) {
            dataType = dataType.substr( 1 ) || "*";
          }
          list = structure[ dataType ] = structure[ dataType ] || [];
          // then we add to the structure accordingly
          list[ placeBefore ? "unshift" : "push" ]( func );
        }
      }
    };
  }

// Base inspection function for prefilters and transports
  function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR,
                                          dataType /* internal */, inspected /* internal */ ) {

    dataType = dataType || options.dataTypes[ 0 ];
    inspected = inspected || {};

    inspected[ dataType ] = true;

    var list = structure[ dataType ],
        i = 0,
        length = list ? list.length : 0,
        executeOnly = ( structure === prefilters ),
        selection;

    for ( ; i < length && ( executeOnly || !selection ); i++ ) {
      selection = list[ i ]( options, originalOptions, jqXHR );
      // If we got redirected to another dataType
      // we try there if executing only and not done already
      if ( typeof selection === "string" ) {
        if ( !executeOnly || inspected[ selection ] ) {
          selection = undefined;
        } else {
          options.dataTypes.unshift( selection );
          selection = inspectPrefiltersOrTransports(
              structure, options, originalOptions, jqXHR, selection, inspected );
        }
      }
    }
    // If we're only executing or nothing was selected
    // we try the catchall dataType if not done already
    if ( ( executeOnly || !selection ) && !inspected[ "*" ] ) {
      selection = inspectPrefiltersOrTransports(
          structure, options, originalOptions, jqXHR, "*", inspected );
    }
    // unnecessary when only executing (prefilters)
    // but it'll be ignored by the caller in that case
    return selection;
  }

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
  function ajaxExtend( target, src ) {
    var key, deep,
        flatOptions = jQuery.ajaxSettings.flatOptions || {};
    for ( key in src ) {
      if ( src[ key ] !== undefined ) {
        ( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
      }
    }
    if ( deep ) {
      jQuery.extend( true, target, deep );
    }
  }

  jQuery.fn.extend({
    load: function( url, params, callback ) {
      if ( typeof url !== "string" && _load ) {
        return _load.apply( this, arguments );

        // Don't do a request if no elements are being requested
      } else if ( !this.length ) {
        return this;
      }

      var off = url.indexOf( " " );
      if ( off >= 0 ) {
        var selector = url.slice( off, url.length );
        url = url.slice( 0, off );
      }

      // Default to a GET request
      var type = "GET";

      // If the second parameter was provided
      if ( params ) {
        // If it's a function
        if ( jQuery.isFunction( params ) ) {
          // We assume that it's the callback
          callback = params;
          params = undefined;

          // Otherwise, build a param string
        } else if ( typeof params === "object" ) {
          params = jQuery.param( params, jQuery.ajaxSettings.traditional );
          type = "POST";
        }
      }

      var self = this;

      // Request the remote document
      jQuery.ajax({
        url: url,
        type: type,
        dataType: "html",
        data: params,
        // Complete callback (responseText is used internally)
        complete: function( jqXHR, status, responseText ) {
          // Store the response as specified by the jqXHR object
          responseText = jqXHR.responseText;
          // If successful, inject the HTML into all the matched elements
          if ( jqXHR.isResolved() ) {
            // #4825: Get the actual response in case
            // a dataFilter is present in ajaxSettings
            jqXHR.done(function( r ) {
              responseText = r;
            });
            // See if a selector was specified
            self.html( selector ?
              // Create a dummy div to hold the results
                jQuery("<div>")
                  // inject the contents of the document in, removing the scripts
                  // to avoid any 'Permission Denied' errors in IE
                    .append(responseText.replace(rscript, ""))

                  // Locate the specified elements
                    .find(selector) :

              // If not, just inject the full result
                responseText );
          }

          if ( callback ) {
            self.each( callback, [ responseText, status, jqXHR ] );
          }
        }
      });

      return this;
    },

    serialize: function() {
      return jQuery.param( this.serializeArray() );
    },

    serializeArray: function() {
      return this.map(function(){
        return this.elements ? jQuery.makeArray( this.elements ) : this;
      })
          .filter(function(){
            return this.name && !this.disabled &&
                ( this.checked || rselectTextarea.test( this.nodeName ) ||
                    rinput.test( this.type ) );
          })
          .map(function( i, elem ){
            var val = jQuery( this ).val();

            return val == null ?
                null :
                jQuery.isArray( val ) ?
                    jQuery.map( val, function( val, i ){
                      return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
                    }) :
                { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
          }).get();
    }
  });

// Attach a bunch of functions for handling common AJAX events
  jQuery.each( "ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split( " " ), function( i, o ){
    jQuery.fn[ o ] = function( f ){
      return this.on( o, f );
    };
  });

  jQuery.each( [ "get", "post" ], function( i, method ) {
    jQuery[ method ] = function( url, data, callback, type ) {
      // shift arguments if data argument was omitted
      if ( jQuery.isFunction( data ) ) {
        type = type || callback;
        callback = data;
        data = undefined;
      }

      return jQuery.ajax({
        type: method,
        url: url,
        data: data,
        success: callback,
        dataType: type
      });
    };
  });

  jQuery.extend({

    getScript: function( url, callback ) {
      return jQuery.get( url, undefined, callback, "script" );
    },

    getJSON: function( url, data, callback ) {
      return jQuery.get( url, data, callback, "json" );
    },

    // Creates a full fledged settings object into target
    // with both ajaxSettings and settings fields.
    // If target is omitted, writes into ajaxSettings.
    ajaxSetup: function( target, settings ) {
      if ( settings ) {
        // Building a settings object
        ajaxExtend( target, jQuery.ajaxSettings );
      } else {
        // Extending ajaxSettings
        settings = target;
        target = jQuery.ajaxSettings;
      }
      ajaxExtend( target, settings );
      return target;
    },

    ajaxSettings: {
      url: ajaxLocation,
      isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
      global: true,
      type: "GET",
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      processData: true,
      async: true,
      /*
       timeout: 0,
       data: null,
       dataType: null,
       username: null,
       password: null,
       cache: null,
       traditional: false,
       headers: {},
       */

      accepts: {
        xml: "application/xml, text/xml",
        html: "text/html",
        text: "text/plain",
        json: "application/json, text/javascript",
        "*": allTypes
      },

      contents: {
        xml: /xml/,
        html: /html/,
        json: /json/
      },

      responseFields: {
        xml: "responseXML",
        text: "responseText"
      },

      // List of data converters
      // 1) key format is "source_type destination_type" (a single space in-between)
      // 2) the catchall symbol "*" can be used for source_type
      converters: {

        // Convert anything to text
        "* text": window.String,

        // Text to html (true = no transformation)
        "text html": true,

        // Evaluate text as a json expression
        "text json": jQuery.parseJSON,

        // Parse text as xml
        "text xml": jQuery.parseXML
      },

      // For options that shouldn't be deep extended:
      // you can add your own custom options here if
      // and when you create one that shouldn't be
      // deep extended (see ajaxExtend)
      flatOptions: {
        context: true,
        url: true
      }
    },

    ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
    ajaxTransport: addToPrefiltersOrTransports( transports ),

    // Main method
    ajax: function( url, options ) {

      // If url is an object, simulate pre-1.5 signature
      if ( typeof url === "object" ) {
        options = url;
        url = undefined;
      }

      // Force options to be an object
      options = options || {};

      var // Create the final options object
          s = jQuery.ajaxSetup( {}, options ),
      // Callbacks context
          callbackContext = s.context || s,
      // Context for global events
      // It's the callbackContext if one was provided in the options
      // and if it's a DOM node or a jQuery collection
          globalEventContext = callbackContext !== s &&
              ( callbackContext.nodeType || callbackContext instanceof jQuery ) ?
              jQuery( callbackContext ) : jQuery.event,
      // Deferreds
          deferred = jQuery.Deferred(),
          completeDeferred = jQuery.Callbacks( "once memory" ),
      // Status-dependent callbacks
          statusCode = s.statusCode || {},
      // ifModified key
          ifModifiedKey,
      // Headers (they are sent all at once)
          requestHeaders = {},
          requestHeadersNames = {},
      // Response headers
          responseHeadersString,
          responseHeaders,
      // transport
          transport,
      // timeout handle
          timeoutTimer,
      // Cross-domain detection vars
          parts,
      // The jqXHR state
          state = 0,
      // To know if global events are to be dispatched
          fireGlobals,
      // Loop variable
          i,
      // Fake xhr
          jqXHR = {

            readyState: 0,

            // Caches the header
            setRequestHeader: function( name, value ) {
              if ( !state ) {
                var lname = name.toLowerCase();
                name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
                requestHeaders[ name ] = value;
              }
              return this;
            },

            // Raw string
            getAllResponseHeaders: function() {
              return state === 2 ? responseHeadersString : null;
            },

            // Builds headers hashtable if needed
            getResponseHeader: function( key ) {
              var match;
              if ( state === 2 ) {
                if ( !responseHeaders ) {
                  responseHeaders = {};
                  while( ( match = rheaders.exec( responseHeadersString ) ) ) {
                    responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
                  }
                }
                match = responseHeaders[ key.toLowerCase() ];
              }
              return match === undefined ? null : match;
            },

            // Overrides response content-type header
            overrideMimeType: function( type ) {
              if ( !state ) {
                s.mimeType = type;
              }
              return this;
            },

            // Cancel the request
            abort: function( statusText ) {
              statusText = statusText || "abort";
              if ( transport ) {
                transport.abort( statusText );
              }
              done( 0, statusText );
              return this;
            }
          };

      // Callback for when everything is done
      // It is defined here because jslint complains if it is declared
      // at the end of the function (which would be more logical and readable)
      function done( status, nativeStatusText, responses, headers ) {

        // Called once
        if ( state === 2 ) {
          return;
        }

        // State is "done" now
        state = 2;

        // Clear timeout if it exists
        if ( timeoutTimer ) {
          clearTimeout( timeoutTimer );
        }

        // Dereference transport for early garbage collection
        // (no matter how long the jqXHR object will be used)
        transport = undefined;

        // Cache response headers
        responseHeadersString = headers || "";

        // Set readyState
        jqXHR.readyState = status > 0 ? 4 : 0;

        var isSuccess,
            success,
            error,
            statusText = nativeStatusText,
            response = responses ? ajaxHandleResponses( s, jqXHR, responses ) : undefined,
            lastModified,
            etag;

        // If successful, handle type chaining
        if ( status >= 200 && status < 300 || status === 304 ) {

          // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
          if ( s.ifModified ) {

            if ( ( lastModified = jqXHR.getResponseHeader( "Last-Modified" ) ) ) {
              jQuery.lastModified[ ifModifiedKey ] = lastModified;
            }
            if ( ( etag = jqXHR.getResponseHeader( "Etag" ) ) ) {
              jQuery.etag[ ifModifiedKey ] = etag;
            }
          }

          // If not modified
          if ( status === 304 ) {

            statusText = "notmodified";
            isSuccess = true;

            // If we have data
          } else {

            try {
              success = ajaxConvert( s, response );
              statusText = "success";
              isSuccess = true;
            } catch(e) {
              // We have a parsererror
              statusText = "parsererror";
              error = e;
            }
          }
        } else {
          // We extract error from statusText
          // then normalize statusText and status for non-aborts
          error = statusText;
          if ( !statusText || status ) {
            statusText = "error";
            if ( status < 0 ) {
              status = 0;
            }
          }
        }

        // Set data for the fake xhr object
        jqXHR.status = status;
        jqXHR.statusText = "" + ( nativeStatusText || statusText );

        // Success/Error
        if ( isSuccess ) {
          deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
        } else {
          deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
        }

        // Status-dependent callbacks
        jqXHR.statusCode( statusCode );
        statusCode = undefined;

        if ( fireGlobals ) {
          globalEventContext.trigger( "ajax" + ( isSuccess ? "Success" : "Error" ),
              [ jqXHR, s, isSuccess ? success : error ] );
        }

        // Complete
        completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

        if ( fireGlobals ) {
          globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
          // Handle the global AJAX counter
          if ( !( --jQuery.active ) ) {
            jQuery.event.trigger( "ajaxStop" );
          }
        }
      }

      // Attach deferreds
      deferred.promise( jqXHR );
      jqXHR.success = jqXHR.done;
      jqXHR.error = jqXHR.fail;
      jqXHR.complete = completeDeferred.add;

      // Status-dependent callbacks
      jqXHR.statusCode = function( map ) {
        if ( map ) {
          var tmp;
          if ( state < 2 ) {
            for ( tmp in map ) {
              statusCode[ tmp ] = [ statusCode[tmp], map[tmp] ];
            }
          } else {
            tmp = map[ jqXHR.status ];
            jqXHR.then( tmp, tmp );
          }
        }
        return this;
      };

      // Remove hash character (#7531: and string promotion)
      // Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
      // We also use the url parameter if available
      s.url = ( ( url || s.url ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

      // Extract dataTypes list
      s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().split( rspacesAjax );

      // Determine if a cross-domain request is in order
      if ( s.crossDomain == null ) {
        parts = rurl.exec( s.url.toLowerCase() );
        s.crossDomain = !!( parts &&
            ( parts[ 1 ] != ajaxLocParts[ 1 ] || parts[ 2 ] != ajaxLocParts[ 2 ] ||
                ( parts[ 3 ] || ( parts[ 1 ] === "http:" ? 80 : 443 ) ) !=
                    ( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? 80 : 443 ) ) )
            );
      }

      // Convert data if not already a string
      if ( s.data && s.processData && typeof s.data !== "string" ) {
        s.data = jQuery.param( s.data, s.traditional );
      }

      // Apply prefilters
      inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

      // If request was aborted inside a prefilter, stop there
      if ( state === 2 ) {
        return false;
      }

      // We can fire global events as of now if asked to
      fireGlobals = s.global;

      // Uppercase the type
      s.type = s.type.toUpperCase();

      // Determine if request has content
      s.hasContent = !rnoContent.test( s.type );

      // Watch for a new set of requests
      if ( fireGlobals && jQuery.active++ === 0 ) {
        jQuery.event.trigger( "ajaxStart" );
      }

      // More options handling for requests with no content
      if ( !s.hasContent ) {

        // If data is available, append data to url
        if ( s.data ) {
          s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.data;
          // #9682: remove data so that it's not used in an eventual retry
          delete s.data;
        }

        // Get ifModifiedKey before adding the anti-cache parameter
        ifModifiedKey = s.url;

        // Add anti-cache in url if needed
        if ( s.cache === false ) {

          var ts = jQuery.now(),
          // try replacing _= if it is there
              ret = s.url.replace( rts, "$1_=" + ts );

          // if nothing was replaced, add timestamp to the end
          s.url = ret + ( ( ret === s.url ) ? ( rquery.test( s.url ) ? "&" : "?" ) + "_=" + ts : "" );
        }
      }

      // Set the correct header, if data is being sent
      if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
        jqXHR.setRequestHeader( "Content-Type", s.contentType );
      }

      // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
      if ( s.ifModified ) {
        ifModifiedKey = ifModifiedKey || s.url;
        if ( jQuery.lastModified[ ifModifiedKey ] ) {
          jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ ifModifiedKey ] );
        }
        if ( jQuery.etag[ ifModifiedKey ] ) {
          jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ ifModifiedKey ] );
        }
      }

      // Set the Accepts header for the server, depending on the dataType
      jqXHR.setRequestHeader(
          "Accept",
          s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
              s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
              s.accepts[ "*" ]
      );

      // Check for headers option
      for ( i in s.headers ) {
        jqXHR.setRequestHeader( i, s.headers[ i ] );
      }

      // Allow custom headers/mimetypes and early abort
      if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
        // Abort if not done already
        jqXHR.abort();
        return false;

      }

      // Install callbacks on deferreds
      for ( i in { success: 1, error: 1, complete: 1 } ) {
        jqXHR[ i ]( s[ i ] );
      }

      // Get transport
      transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

      // If no transport, we auto-abort
      if ( !transport ) {
        done( -1, "No Transport" );
      } else {
        jqXHR.readyState = 1;
        // Send global event
        if ( fireGlobals ) {
          globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
        }
        // Timeout
        if ( s.async && s.timeout > 0 ) {
          timeoutTimer = setTimeout( function(){
            jqXHR.abort( "timeout" );
          }, s.timeout );
        }

        try {
          state = 1;
          transport.send( requestHeaders, done );
        } catch (e) {
          // Propagate exception as error if not done
          if ( state < 2 ) {
            done( -1, e );
            // Simply rethrow otherwise
          } else {
            throw e;
          }
        }
      }

      return jqXHR;
    },

    // Serialize an array of form elements or a set of
    // key/values into a query string
    param: function( a, traditional ) {
      var s = [],
          add = function( key, value ) {
            // If value is a function, invoke it and return its value
            value = jQuery.isFunction( value ) ? value() : value;
            s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
          };

      // Set traditional to true for jQuery <= 1.3.2 behavior.
      if ( traditional === undefined ) {
        traditional = jQuery.ajaxSettings.traditional;
      }

      // If an array was passed in, assume that it is an array of form elements.
      if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
        // Serialize the form elements
        jQuery.each( a, function() {
          add( this.name, this.value );
        });

      } else {
        // If traditional, encode the "old" way (the way 1.3.2 or older
        // did it), otherwise encode params recursively.
        for ( var prefix in a ) {
          buildParams( prefix, a[ prefix ], traditional, add );
        }
      }

      // Return the resulting serialization
      return s.join( "&" ).replace( r20, "+" );
    }
  });

  function buildParams( prefix, obj, traditional, add ) {
    if ( jQuery.isArray( obj ) ) {
      // Serialize array item.
      jQuery.each( obj, function( i, v ) {
        if ( traditional || rbracket.test( prefix ) ) {
          // Treat each array item as a scalar.
          add( prefix, v );

        } else {
          // If array item is non-scalar (array or object), encode its
          // numeric index to resolve deserialization ambiguity issues.
          // Note that rack (as of 1.0.0) can't currently deserialize
          // nested arrays properly, and attempting to do so may cause
          // a server error. Possible fixes are to modify rack's
          // deserialization algorithm or to provide an option or flag
          // to force array serialization to be shallow.
          buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
        }
      });

    } else if ( !traditional && jQuery.type( obj ) === "object" ) {
      // Serialize object item.
      for ( var name in obj ) {
        buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
      }

    } else {
      // Serialize scalar item.
      add( prefix, obj );
    }
  }

// This is still on the jQuery object... for now
// Want to move this to jQuery.ajax some day
  jQuery.extend({

    // Counter for holding the number of active queries
    active: 0,

    // Last-Modified header cache for next request
    lastModified: {},
    etag: {}

  });

  /* Handles responses to an ajax request:
   * - sets all responseXXX fields accordingly
   * - finds the right dataType (mediates between content-type and expected dataType)
   * - returns the corresponding response
   */
  function ajaxHandleResponses( s, jqXHR, responses ) {

    var contents = s.contents,
        dataTypes = s.dataTypes,
        responseFields = s.responseFields,
        ct,
        type,
        finalDataType,
        firstDataType;

    // Fill responseXXX fields
    for ( type in responseFields ) {
      if ( type in responses ) {
        jqXHR[ responseFields[type] ] = responses[ type ];
      }
    }

    // Remove auto dataType and get content-type in the process
    while( dataTypes[ 0 ] === "*" ) {
      dataTypes.shift();
      if ( ct === undefined ) {
        ct = s.mimeType || jqXHR.getResponseHeader( "content-type" );
      }
    }

    // Check if we're dealing with a known content-type
    if ( ct ) {
      for ( type in contents ) {
        if ( contents[ type ] && contents[ type ].test( ct ) ) {
          dataTypes.unshift( type );
          break;
        }
      }
    }

    // Check to see if we have a response for the expected dataType
    if ( dataTypes[ 0 ] in responses ) {
      finalDataType = dataTypes[ 0 ];
    } else {
      // Try convertible dataTypes
      for ( type in responses ) {
        if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
          finalDataType = type;
          break;
        }
        if ( !firstDataType ) {
          firstDataType = type;
        }
      }
      // Or just use first one
      finalDataType = finalDataType || firstDataType;
    }

    // If we found a dataType
    // We add the dataType to the list if needed
    // and return the corresponding response
    if ( finalDataType ) {
      if ( finalDataType !== dataTypes[ 0 ] ) {
        dataTypes.unshift( finalDataType );
      }
      return responses[ finalDataType ];
    }
  }

// Chain conversions given the request and the original response
  function ajaxConvert( s, response ) {

    // Apply the dataFilter if provided
    if ( s.dataFilter ) {
      response = s.dataFilter( response, s.dataType );
    }

    var dataTypes = s.dataTypes,
        converters = {},
        i,
        key,
        length = dataTypes.length,
        tmp,
    // Current and previous dataTypes
        current = dataTypes[ 0 ],
        prev,
    // Conversion expression
        conversion,
    // Conversion function
        conv,
    // Conversion functions (transitive conversion)
        conv1,
        conv2;

    // For each dataType in the chain
    for ( i = 1; i < length; i++ ) {

      // Create converters map
      // with lowercased keys
      if ( i === 1 ) {
        for ( key in s.converters ) {
          if ( typeof key === "string" ) {
            converters[ key.toLowerCase() ] = s.converters[ key ];
          }
        }
      }

      // Get the dataTypes
      prev = current;
      current = dataTypes[ i ];

      // If current is auto dataType, update it to prev
      if ( current === "*" ) {
        current = prev;
        // If no auto and dataTypes are actually different
      } else if ( prev !== "*" && prev !== current ) {

        // Get the converter
        conversion = prev + " " + current;
        conv = converters[ conversion ] || converters[ "* " + current ];

        // If there is no direct converter, search transitively
        if ( !conv ) {
          conv2 = undefined;
          for ( conv1 in converters ) {
            tmp = conv1.split( " " );
            if ( tmp[ 0 ] === prev || tmp[ 0 ] === "*" ) {
              conv2 = converters[ tmp[1] + " " + current ];
              if ( conv2 ) {
                conv1 = converters[ conv1 ];
                if ( conv1 === true ) {
                  conv = conv2;
                } else if ( conv2 === true ) {
                  conv = conv1;
                }
                break;
              }
            }
          }
        }
        // If we found no converter, dispatch an error
        if ( !( conv || conv2 ) ) {
          jQuery.error( "No conversion from " + conversion.replace(" "," to ") );
        }
        // If found converter is not an equivalence
        if ( conv !== true ) {
          // Convert with 1 or 2 converters accordingly
          response = conv ? conv( response ) : conv2( conv1(response) );
        }
      }
    }
    return response;
  }




  var jsc = jQuery.now(),
      jsre = /(\=)\?(&|$)|\?\?/i;

// Default jsonp settings
  jQuery.ajaxSetup({
    jsonp: "callback",
    jsonpCallback: function() {
      return jQuery.expando + "_" + ( jsc++ );
    }
  });

// Detect, normalize options and install callbacks for jsonp requests
  jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

    var inspectData = ( typeof s.data === "string" ) && /^application\/x\-www\-form\-urlencoded/.test( s.contentType );

    if ( s.dataTypes[ 0 ] === "jsonp" ||
        s.jsonp !== false && ( jsre.test( s.url ) ||
            inspectData && jsre.test( s.data ) ) ) {

      var responseContainer,
          jsonpCallback = s.jsonpCallback =
              jQuery.isFunction( s.jsonpCallback ) ? s.jsonpCallback() : s.jsonpCallback,
          previous = window[ jsonpCallback ],
          url = s.url,
          data = s.data,
          replace = "$1" + jsonpCallback + "$2";

      if ( s.jsonp !== false ) {
        url = url.replace( jsre, replace );
        if ( s.url === url ) {
          if ( inspectData ) {
            data = data.replace( jsre, replace );
          }
          if ( s.data === data ) {
            // Add callback manually
            url += (/\?/.test( url ) ? "&" : "?") + s.jsonp + "=" + jsonpCallback;
          }
        }
      }

      s.url = url;
      s.data = data;

      // Install callback
      window[ jsonpCallback ] = function( response ) {
        responseContainer = [ response ];
      };

      // Clean-up function
      jqXHR.always(function() {
        // Set callback back to previous value
        window[ jsonpCallback ] = previous;
        // Call if it was a function and we have a response
        if ( responseContainer && jQuery.isFunction( previous ) ) {
          window[ jsonpCallback ]( responseContainer[ 0 ] );
        }
      });

      // Use data converter to retrieve json after script execution
      s.converters["script json"] = function() {
        if ( !responseContainer ) {
          jQuery.error( jsonpCallback + " was not called" );
        }
        return responseContainer[ 0 ];
      };

      // force json dataType
      s.dataTypes[ 0 ] = "json";

      // Delegate to script
      return "script";
    }
  });




// Install script dataType
  jQuery.ajaxSetup({
    accepts: {
      script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
    },
    contents: {
      script: /javascript|ecmascript/
    },
    converters: {
      "text script": function( text ) {
        jQuery.globalEval( text );
        return text;
      }
    }
  });

// Handle cache's special case and global
  jQuery.ajaxPrefilter( "script", function( s ) {
    if ( s.cache === undefined ) {
      s.cache = false;
    }
    if ( s.crossDomain ) {
      s.type = "GET";
      s.global = false;
    }
  });

// Bind script tag hack transport
  jQuery.ajaxTransport( "script", function(s) {

    // This transport only deals with cross domain requests
    if ( s.crossDomain ) {

      var script,
          head = document.head || document.getElementsByTagName( "head" )[0] || document.documentElement;

      return {

        send: function( _, callback ) {

          script = document.createElement( "script" );

          script.async = "async";

          if ( s.scriptCharset ) {
            script.charset = s.scriptCharset;
          }

          script.src = s.url;

          // Attach handlers for all browsers
          script.onload = script.onreadystatechange = function( _, isAbort ) {

            if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

              // Handle memory leak in IE
              script.onload = script.onreadystatechange = null;

              // Remove the script
              if ( head && script.parentNode ) {
                head.removeChild( script );
              }

              // Dereference the script
              script = undefined;

              // Callback if not abort
              if ( !isAbort ) {
                callback( 200, "success" );
              }
            }
          };
          // Use insertBefore instead of appendChild  to circumvent an IE6 bug.
          // This arises when a base node is used (#2709 and #4378).
          head.insertBefore( script, head.firstChild );
        },

        abort: function() {
          if ( script ) {
            script.onload( 0, 1 );
          }
        }
      };
    }
  });




  var // #5280: Internet Explorer will keep connections alive if we don't abort on unload
      xhrOnUnloadAbort = window.ActiveXObject ? function() {
        // Abort all pending requests
        for ( var key in xhrCallbacks ) {
          xhrCallbacks[ key ]( 0, 1 );
        }
      } : false,
      xhrId = 0,
      xhrCallbacks;

// Functions to create xhrs
  function createStandardXHR() {
    try {
      return new window.XMLHttpRequest();
    } catch( e ) {}
  }

  function createActiveXHR() {
    try {
      return new window.ActiveXObject( "Microsoft.XMLHTTP" );
    } catch( e ) {}
  }

// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
  jQuery.ajaxSettings.xhr = window.ActiveXObject ?
    /* Microsoft failed to properly
     * implement the XMLHttpRequest in IE7 (can't request local files),
     * so we use the ActiveXObject when it is available
     * Additionally XMLHttpRequest can be disabled in IE7/IE8 so
     * we need a fallback.
     */
      function() {
        return !this.isLocal && createStandardXHR() || createActiveXHR();
      } :
    // For all other browsers, use the standard XMLHttpRequest object
      createStandardXHR;

// Determine support properties
  (function( xhr ) {
    jQuery.extend( jQuery.support, {
      ajax: !!xhr,
      cors: !!xhr && ( "withCredentials" in xhr )
    });
  })( jQuery.ajaxSettings.xhr() );

// Create transport if the browser can provide an xhr
  if ( jQuery.support.ajax ) {

    jQuery.ajaxTransport(function( s ) {
      // Cross domain only allowed if supported through XMLHttpRequest
      if ( !s.crossDomain || jQuery.support.cors ) {

        var callback;

        return {
          send: function( headers, complete ) {

            // Get a new xhr
            var xhr = s.xhr(),
                handle,
                i;

            // Open the socket
            // Passing null username, generates a login popup on Opera (#2865)
            if ( s.username ) {
              xhr.open( s.type, s.url, s.async, s.username, s.password );
            } else {
              xhr.open( s.type, s.url, s.async );
            }

            // Apply custom fields if provided
            if ( s.xhrFields ) {
              for ( i in s.xhrFields ) {
                xhr[ i ] = s.xhrFields[ i ];
              }
            }

            // Override mime type if needed
            if ( s.mimeType && xhr.overrideMimeType ) {
              xhr.overrideMimeType( s.mimeType );
            }

            // X-Requested-With header
            // For cross-domain requests, seeing as conditions for a preflight are
            // akin to a jigsaw puzzle, we simply never set it to be sure.
            // (it can always be set on a per-request basis or even using ajaxSetup)
            // For same-domain requests, won't change header if already provided.
            if ( !s.crossDomain && !headers["X-Requested-With"] ) {
              headers[ "X-Requested-With" ] = "XMLHttpRequest";
            }

            // Need an extra try/catch for cross domain requests in Firefox 3
            try {
              for ( i in headers ) {
                xhr.setRequestHeader( i, headers[ i ] );
              }
            } catch( _ ) {}

            // Do send the request
            // This may raise an exception which is actually
            // handled in jQuery.ajax (so no try/catch here)
            xhr.send( ( s.hasContent && s.data ) || null );

            // Listener
            callback = function( _, isAbort ) {

              var status,
                  statusText,
                  responseHeaders,
                  responses,
                  xml;

              // Firefox throws exceptions when accessing properties
              // of an xhr when a network error occured
              // http://helpful.knobs-dials.com/index.php/Component_returned_failure_code:_0x80040111_(NS_ERROR_NOT_AVAILABLE)
              try {

                // Was never called and is aborted or complete
                if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

                  // Only called once
                  callback = undefined;

                  // Do not keep as active anymore
                  if ( handle ) {
                    xhr.onreadystatechange = jQuery.noop;
                    if ( xhrOnUnloadAbort ) {
                      delete xhrCallbacks[ handle ];
                    }
                  }

                  // If it's an abort
                  if ( isAbort ) {
                    // Abort it manually if needed
                    if ( xhr.readyState !== 4 ) {
                      xhr.abort();
                    }
                  } else {
                    status = xhr.status;
                    responseHeaders = xhr.getAllResponseHeaders();
                    responses = {};
                    xml = xhr.responseXML;

                    // Construct response list
                    if ( xml && xml.documentElement /* #4958 */ ) {
                      responses.xml = xml;
                    }

                    // When requesting binary data, IE6-9 will throw an exception
                    // on any attempt to access responseText (#11426)
                    try {
                      responses.text = xhr.responseText;
                    } catch( _ ) {
                    }

                    // Firefox throws an exception when accessing
                    // statusText for faulty cross-domain requests
                    try {
                      statusText = xhr.statusText;
                    } catch( e ) {
                      // We normalize with Webkit giving an empty statusText
                      statusText = "";
                    }

                    // Filter status for non standard behaviors

                    // If the request is local and we have data: assume a success
                    // (success with no data won't get notified, that's the best we
                    // can do given current implementations)
                    if ( !status && s.isLocal && !s.crossDomain ) {
                      status = responses.text ? 200 : 404;
                      // IE - #1450: sometimes returns 1223 when it should be 204
                    } else if ( status === 1223 ) {
                      status = 204;
                    }
                  }
                }
              } catch( firefoxAccessException ) {
                if ( !isAbort ) {
                  complete( -1, firefoxAccessException );
                }
              }

              // Call complete if needed
              if ( responses ) {
                complete( status, statusText, responses, responseHeaders );
              }
            };

            // if we're in sync mode or it's in cache
            // and has been retrieved directly (IE6 & IE7)
            // we need to manually fire the callback
            if ( !s.async || xhr.readyState === 4 ) {
              callback();
            } else {
              handle = ++xhrId;
              if ( xhrOnUnloadAbort ) {
                // Create the active xhrs callbacks list if needed
                // and attach the unload handler
                if ( !xhrCallbacks ) {
                  xhrCallbacks = {};
                  jQuery( window ).unload( xhrOnUnloadAbort );
                }
                // Add to list of active xhrs callbacks
                xhrCallbacks[ handle ] = callback;
              }
              xhr.onreadystatechange = callback;
            }
          },

          abort: function() {
            if ( callback ) {
              callback(0,1);
            }
          }
        };
      }
    });
  }




  var elemdisplay = {},
      iframe, iframeDoc,
      rfxtypes = /^(?:toggle|show|hide)$/,
      rfxnum = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,
      timerId,
      fxAttrs = [
        // height animations
        [ "height", "marginTop", "marginBottom", "paddingTop", "paddingBottom" ],
        // width animations
        [ "width", "marginLeft", "marginRight", "paddingLeft", "paddingRight" ],
        // opacity animations
        [ "opacity" ]
      ],
      fxNow;

  jQuery.fn.extend({
    show: function( speed, easing, callback ) {
      var elem, display;

      if ( speed || speed === 0 ) {
        return this.animate( genFx("show", 3), speed, easing, callback );

      } else {
        for ( var i = 0, j = this.length; i < j; i++ ) {
          elem = this[ i ];

          if ( elem.style ) {
            display = elem.style.display;

            // Reset the inline display of this element to learn if it is
            // being hidden by cascaded rules or not
            if ( !jQuery._data(elem, "olddisplay") && display === "none" ) {
              display = elem.style.display = "";
            }

            // Set elements which have been overridden with display: none
            // in a stylesheet to whatever the default browser style is
            // for such an element
            if ( (display === "" && jQuery.css(elem, "display") === "none") ||
                !jQuery.contains( elem.ownerDocument.documentElement, elem ) ) {
              jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
            }
          }
        }

        // Set the display of most of the elements in a second loop
        // to avoid the constant reflow
        for ( i = 0; i < j; i++ ) {
          elem = this[ i ];

          if ( elem.style ) {
            display = elem.style.display;

            if ( display === "" || display === "none" ) {
              elem.style.display = jQuery._data( elem, "olddisplay" ) || "";
            }
          }
        }

        return this;
      }
    },

    hide: function( speed, easing, callback ) {
      if ( speed || speed === 0 ) {
        return this.animate( genFx("hide", 3), speed, easing, callback);

      } else {
        var elem, display,
            i = 0,
            j = this.length;

        for ( ; i < j; i++ ) {
          elem = this[i];
          if ( elem.style ) {
            display = jQuery.css( elem, "display" );

            if ( display !== "none" && !jQuery._data( elem, "olddisplay" ) ) {
              jQuery._data( elem, "olddisplay", display );
            }
          }
        }

        // Set the display of the elements in a second loop
        // to avoid the constant reflow
        for ( i = 0; i < j; i++ ) {
          if ( this[i].style ) {
            this[i].style.display = "none";
          }
        }

        return this;
      }
    },

    // Save the old toggle function
    _toggle: jQuery.fn.toggle,

    toggle: function( fn, fn2, callback ) {
      var bool = typeof fn === "boolean";

      if ( jQuery.isFunction(fn) && jQuery.isFunction(fn2) ) {
        this._toggle.apply( this, arguments );

      } else if ( fn == null || bool ) {
        this.each(function() {
          var state = bool ? fn : jQuery(this).is(":hidden");
          jQuery(this)[ state ? "show" : "hide" ]();
        });

      } else {
        this.animate(genFx("toggle", 3), fn, fn2, callback);
      }

      return this;
    },

    fadeTo: function( speed, to, easing, callback ) {
      return this.filter(":hidden").css("opacity", 0).show().end()
          .animate({opacity: to}, speed, easing, callback);
    },

    animate: function( prop, speed, easing, callback ) {
      var optall = jQuery.speed( speed, easing, callback );

      if ( jQuery.isEmptyObject( prop ) ) {
        return this.each( optall.complete, [ false ] );
      }

      // Do not change referenced properties as per-property easing will be lost
      prop = jQuery.extend( {}, prop );

      function doAnimation() {
        // XXX 'this' does not always have a nodeName when running the
        // test suite

        if ( optall.queue === false ) {
          jQuery._mark( this );
        }

        var opt = jQuery.extend( {}, optall ),
            isElement = this.nodeType === 1,
            hidden = isElement && jQuery(this).is(":hidden"),
            name, val, p, e, hooks, replace,
            parts, start, end, unit,
            method;

        // will store per property easing and be used to determine when an animation is complete
        opt.animatedProperties = {};

        // first pass over propertys to expand / normalize
        for ( p in prop ) {
          name = jQuery.camelCase( p );
          if ( p !== name ) {
            prop[ name ] = prop[ p ];
            delete prop[ p ];
          }

          if ( ( hooks = jQuery.cssHooks[ name ] ) && "expand" in hooks ) {
            replace = hooks.expand( prop[ name ] );
            delete prop[ name ];

            // not quite $.extend, this wont overwrite keys already present.
            // also - reusing 'p' from above because we have the correct "name"
            for ( p in replace ) {
              if ( ! ( p in prop ) ) {
                prop[ p ] = replace[ p ];
              }
            }
          }
        }

        for ( name in prop ) {
          val = prop[ name ];
          // easing resolution: per property > opt.specialEasing > opt.easing > 'swing' (default)
          if ( jQuery.isArray( val ) ) {
            opt.animatedProperties[ name ] = val[ 1 ];
            val = prop[ name ] = val[ 0 ];
          } else {
            opt.animatedProperties[ name ] = opt.specialEasing && opt.specialEasing[ name ] || opt.easing || 'swing';
          }

          if ( val === "hide" && hidden || val === "show" && !hidden ) {
            return opt.complete.call( this );
          }

          if ( isElement && ( name === "height" || name === "width" ) ) {
            // Make sure that nothing sneaks out
            // Record all 3 overflow attributes because IE does not
            // change the overflow attribute when overflowX and
            // overflowY are set to the same value
            opt.overflow = [ this.style.overflow, this.style.overflowX, this.style.overflowY ];

            // Set display property to inline-block for height/width
            // animations on inline elements that are having width/height animated
            if ( jQuery.css( this, "display" ) === "inline" &&
                jQuery.css( this, "float" ) === "none" ) {

              // inline-level elements accept inline-block;
              // block-level elements need to be inline with layout
              if ( !jQuery.support.inlineBlockNeedsLayout || defaultDisplay( this.nodeName ) === "inline" ) {
                this.style.display = "inline-block";

              } else {
                this.style.zoom = 1;
              }
            }
          }
        }

        if ( opt.overflow != null ) {
          this.style.overflow = "hidden";
        }

        for ( p in prop ) {
          e = new jQuery.fx( this, opt, p );
          val = prop[ p ];

          if ( rfxtypes.test( val ) ) {

            // Tracks whether to show or hide based on private
            // data attached to the element
            method = jQuery._data( this, "toggle" + p ) || ( val === "toggle" ? hidden ? "show" : "hide" : 0 );
            if ( method ) {
              jQuery._data( this, "toggle" + p, method === "show" ? "hide" : "show" );
              e[ method ]();
            } else {
              e[ val ]();
            }

          } else {
            parts = rfxnum.exec( val );
            start = e.cur();

            if ( parts ) {
              end = parseFloat( parts[2] );
              unit = parts[3] || ( jQuery.cssNumber[ p ] ? "" : "px" );

              // We need to compute starting value
              if ( unit !== "px" ) {
                jQuery.style( this, p, (end || 1) + unit);
                start = ( (end || 1) / e.cur() ) * start;
                jQuery.style( this, p, start + unit);
              }

              // If a +=/-= token was provided, we're doing a relative animation
              if ( parts[1] ) {
                end = ( (parts[ 1 ] === "-=" ? -1 : 1) * end ) + start;
              }

              e.custom( start, end, unit );

            } else {
              e.custom( start, val, "" );
            }
          }
        }

        // For JS strict compliance
        return true;
      }

      return optall.queue === false ?
          this.each( doAnimation ) :
          this.queue( optall.queue, doAnimation );
    },

    stop: function( type, clearQueue, gotoEnd ) {
      if ( typeof type !== "string" ) {
        gotoEnd = clearQueue;
        clearQueue = type;
        type = undefined;
      }
      if ( clearQueue && type !== false ) {
        this.queue( type || "fx", [] );
      }

      return this.each(function() {
        var index,
            hadTimers = false,
            timers = jQuery.timers,
            data = jQuery._data( this );

        // clear marker counters if we know they won't be
        if ( !gotoEnd ) {
          jQuery._unmark( true, this );
        }

        function stopQueue( elem, data, index ) {
          var hooks = data[ index ];
          jQuery.removeData( elem, index, true );
          hooks.stop( gotoEnd );
        }

        if ( type == null ) {
          for ( index in data ) {
            if ( data[ index ] && data[ index ].stop && index.indexOf(".run") === index.length - 4 ) {
              stopQueue( this, data, index );
            }
          }
        } else if ( data[ index = type + ".run" ] && data[ index ].stop ){
          stopQueue( this, data, index );
        }

        for ( index = timers.length; index--; ) {
          if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
            if ( gotoEnd ) {

              // force the next step to be the last
              timers[ index ]( true );
            } else {
              timers[ index ].saveState();
            }
            hadTimers = true;
            timers.splice( index, 1 );
          }
        }

        // start the next in the queue if the last step wasn't forced
        // timers currently will call their complete callbacks, which will dequeue
        // but only if they were gotoEnd
        if ( !( gotoEnd && hadTimers ) ) {
          jQuery.dequeue( this, type );
        }
      });
    }

  });

// Animations created synchronously will run synchronously
  function createFxNow() {
    setTimeout( clearFxNow, 0 );
    return ( fxNow = jQuery.now() );
  }

  function clearFxNow() {
    fxNow = undefined;
  }

// Generate parameters to create a standard animation
  function genFx( type, num ) {
    var obj = {};

    jQuery.each( fxAttrs.concat.apply([], fxAttrs.slice( 0, num )), function() {
      obj[ this ] = type;
    });

    return obj;
  }

// Generate shortcuts for custom animations
  jQuery.each({
    slideDown: genFx( "show", 1 ),
    slideUp: genFx( "hide", 1 ),
    slideToggle: genFx( "toggle", 1 ),
    fadeIn: { opacity: "show" },
    fadeOut: { opacity: "hide" },
    fadeToggle: { opacity: "toggle" }
  }, function( name, props ) {
    jQuery.fn[ name ] = function( speed, easing, callback ) {
      return this.animate( props, speed, easing, callback );
    };
  });

  jQuery.extend({
    speed: function( speed, easing, fn ) {
      var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
        complete: fn || !fn && easing ||
            jQuery.isFunction( speed ) && speed,
        duration: speed,
        easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
      };

      opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
          opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

      // normalize opt.queue - true/undefined/null -> "fx"
      if ( opt.queue == null || opt.queue === true ) {
        opt.queue = "fx";
      }

      // Queueing
      opt.old = opt.complete;

      opt.complete = function( noUnmark ) {
        if ( jQuery.isFunction( opt.old ) ) {
          opt.old.call( this );
        }

        if ( opt.queue ) {
          jQuery.dequeue( this, opt.queue );
        } else if ( noUnmark !== false ) {
          jQuery._unmark( this );
        }
      };

      return opt;
    },

    easing: {
      linear: function( p ) {
        return p;
      },
      swing: function( p ) {
        return ( -Math.cos( p*Math.PI ) / 2 ) + 0.5;
      }
    },

    timers: [],

    fx: function( elem, options, prop ) {
      this.options = options;
      this.elem = elem;
      this.prop = prop;

      options.orig = options.orig || {};
    }

  });

  jQuery.fx.prototype = {
    // Simple function for setting a style value
    update: function() {
      if ( this.options.step ) {
        this.options.step.call( this.elem, this.now, this );
      }

      ( jQuery.fx.step[ this.prop ] || jQuery.fx.step._default )( this );
    },

    // Get the current size
    cur: function() {
      if ( this.elem[ this.prop ] != null && (!this.elem.style || this.elem.style[ this.prop ] == null) ) {
        return this.elem[ this.prop ];
      }

      var parsed,
          r = jQuery.css( this.elem, this.prop );
      // Empty strings, null, undefined and "auto" are converted to 0,
      // complex values such as "rotate(1rad)" are returned as is,
      // simple values such as "10px" are parsed to Float.
      return isNaN( parsed = parseFloat( r ) ) ? !r || r === "auto" ? 0 : r : parsed;
    },

    // Start an animation from one number to another
    custom: function( from, to, unit ) {
      var self = this,
          fx = jQuery.fx;

      this.startTime = fxNow || createFxNow();
      this.end = to;
      this.now = this.start = from;
      this.pos = this.state = 0;
      this.unit = unit || this.unit || ( jQuery.cssNumber[ this.prop ] ? "" : "px" );

      function t( gotoEnd ) {
        return self.step( gotoEnd );
      }

      t.queue = this.options.queue;
      t.elem = this.elem;
      t.saveState = function() {
        if ( jQuery._data( self.elem, "fxshow" + self.prop ) === undefined ) {
          if ( self.options.hide ) {
            jQuery._data( self.elem, "fxshow" + self.prop, self.start );
          } else if ( self.options.show ) {
            jQuery._data( self.elem, "fxshow" + self.prop, self.end );
          }
        }
      };

      if ( t() && jQuery.timers.push(t) && !timerId ) {
        timerId = setInterval( fx.tick, fx.interval );
      }
    },

    // Simple 'show' function
    show: function() {
      var dataShow = jQuery._data( this.elem, "fxshow" + this.prop );

      // Remember where we started, so that we can go back to it later
      this.options.orig[ this.prop ] = dataShow || jQuery.style( this.elem, this.prop );
      this.options.show = true;

      // Begin the animation
      // Make sure that we start at a small width/height to avoid any flash of content
      if ( dataShow !== undefined ) {
        // This show is picking up where a previous hide or show left off
        this.custom( this.cur(), dataShow );
      } else {
        this.custom( this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur() );
      }

      // Start by showing the element
      jQuery( this.elem ).show();
    },

    // Simple 'hide' function
    hide: function() {
      // Remember where we started, so that we can go back to it later
      this.options.orig[ this.prop ] = jQuery._data( this.elem, "fxshow" + this.prop ) || jQuery.style( this.elem, this.prop );
      this.options.hide = true;

      // Begin the animation
      this.custom( this.cur(), 0 );
    },

    // Each step of an animation
    step: function( gotoEnd ) {
      var p, n, complete,
          t = fxNow || createFxNow(),
          done = true,
          elem = this.elem,
          options = this.options;

      if ( gotoEnd || t >= options.duration + this.startTime ) {
        this.now = this.end;
        this.pos = this.state = 1;
        this.update();

        options.animatedProperties[ this.prop ] = true;

        for ( p in options.animatedProperties ) {
          if ( options.animatedProperties[ p ] !== true ) {
            done = false;
          }
        }

        if ( done ) {
          // Reset the overflow
          if ( options.overflow != null && !jQuery.support.shrinkWrapBlocks ) {

            jQuery.each( [ "", "X", "Y" ], function( index, value ) {
              elem.style[ "overflow" + value ] = options.overflow[ index ];
            });
          }

          // Hide the element if the "hide" operation was done
          if ( options.hide ) {
            jQuery( elem ).hide();
          }

          // Reset the properties, if the item has been hidden or shown
          if ( options.hide || options.show ) {
            for ( p in options.animatedProperties ) {
              jQuery.style( elem, p, options.orig[ p ] );
              jQuery.removeData( elem, "fxshow" + p, true );
              // Toggle data is no longer needed
              jQuery.removeData( elem, "toggle" + p, true );
            }
          }

          // Execute the complete function
          // in the event that the complete function throws an exception
          // we must ensure it won't be called twice. #5684

          complete = options.complete;
          if ( complete ) {

            options.complete = false;
            complete.call( elem );
          }
        }

        return false;

      } else {
        // classical easing cannot be used with an Infinity duration
        if ( options.duration == Infinity ) {
          this.now = t;
        } else {
          n = t - this.startTime;
          this.state = n / options.duration;

          // Perform the easing function, defaults to swing
          this.pos = jQuery.easing[ options.animatedProperties[this.prop] ]( this.state, n, 0, 1, options.duration );
          this.now = this.start + ( (this.end - this.start) * this.pos );
        }
        // Perform the next step of the animation
        this.update();
      }

      return true;
    }
  };

  jQuery.extend( jQuery.fx, {
    tick: function() {
      var timer,
          timers = jQuery.timers,
          i = 0;

      for ( ; i < timers.length; i++ ) {
        timer = timers[ i ];
        // Checks the timer has not already been removed
        if ( !timer() && timers[ i ] === timer ) {
          timers.splice( i--, 1 );
        }
      }

      if ( !timers.length ) {
        jQuery.fx.stop();
      }
    },

    interval: 13,

    stop: function() {
      clearInterval( timerId );
      timerId = null;
    },

    speeds: {
      slow: 600,
      fast: 200,
      // Default speed
      _default: 400
    },

    step: {
      opacity: function( fx ) {
        jQuery.style( fx.elem, "opacity", fx.now );
      },

      _default: function( fx ) {
        if ( fx.elem.style && fx.elem.style[ fx.prop ] != null ) {
          fx.elem.style[ fx.prop ] = fx.now + fx.unit;
        } else {
          fx.elem[ fx.prop ] = fx.now;
        }
      }
    }
  });

// Ensure props that can't be negative don't go there on undershoot easing
  jQuery.each( fxAttrs.concat.apply( [], fxAttrs ), function( i, prop ) {
    // exclude marginTop, marginLeft, marginBottom and marginRight from this list
    if ( prop.indexOf( "margin" ) ) {
      jQuery.fx.step[ prop ] = function( fx ) {
        jQuery.style( fx.elem, prop, Math.max(0, fx.now) + fx.unit );
      };
    }
  });

  if ( jQuery.expr && jQuery.expr.filters ) {
    jQuery.expr.filters.animated = function( elem ) {
      return jQuery.grep(jQuery.timers, function( fn ) {
        return elem === fn.elem;
      }).length;
    };
  }

// Try to restore the default display value of an element
  function defaultDisplay( nodeName ) {

    if ( !elemdisplay[ nodeName ] ) {

      var body = document.body,
          elem = jQuery( "<" + nodeName + ">" ).appendTo( body ),
          display = elem.css( "display" );
      elem.remove();

      // If the simple way fails,
      // get element's real default display by attaching it to a temp iframe
      if ( display === "none" || display === "" ) {
        // No iframe to use yet, so create it
        if ( !iframe ) {
          iframe = document.createElement( "iframe" );
          iframe.frameBorder = iframe.width = iframe.height = 0;
        }

        body.appendChild( iframe );

        // Create a cacheable copy of the iframe document on first call.
        // IE and Opera will allow us to reuse the iframeDoc without re-writing the fake HTML
        // document to it; WebKit & Firefox won't allow reusing the iframe document.
        if ( !iframeDoc || !iframe.createElement ) {
          iframeDoc = ( iframe.contentWindow || iframe.contentDocument ).document;
          iframeDoc.write( ( jQuery.support.boxModel ? "<!doctype html>" : "" ) + "<html><body>" );
          iframeDoc.close();
        }

        elem = iframeDoc.createElement( nodeName );

        iframeDoc.body.appendChild( elem );

        display = jQuery.css( elem, "display" );
        body.removeChild( iframe );
      }

      // Store the correct default display
      elemdisplay[ nodeName ] = display;
    }

    return elemdisplay[ nodeName ];
  }




  var getOffset,
      rtable = /^t(?:able|d|h)$/i,
      rroot = /^(?:body|html)$/i;

  if ( "getBoundingClientRect" in document.documentElement ) {
    getOffset = function( elem, doc, docElem, box ) {
      try {
        box = elem.getBoundingClientRect();
      } catch(e) {}

      // Make sure we're not dealing with a disconnected DOM node
      if ( !box || !jQuery.contains( docElem, elem ) ) {
        return box ? { top: box.top, left: box.left } : { top: 0, left: 0 };
      }

      var body = doc.body,
          win = getWindow( doc ),
          clientTop  = docElem.clientTop  || body.clientTop  || 0,
          clientLeft = docElem.clientLeft || body.clientLeft || 0,
          scrollTop  = win.pageYOffset || jQuery.support.boxModel && docElem.scrollTop  || body.scrollTop,
          scrollLeft = win.pageXOffset || jQuery.support.boxModel && docElem.scrollLeft || body.scrollLeft,
          top  = box.top  + scrollTop  - clientTop,
          left = box.left + scrollLeft - clientLeft;

      return { top: top, left: left };
    };

  } else {
    getOffset = function( elem, doc, docElem ) {
      var computedStyle,
          offsetParent = elem.offsetParent,
          prevOffsetParent = elem,
          body = doc.body,
          defaultView = doc.defaultView,
          prevComputedStyle = defaultView ? defaultView.getComputedStyle( elem, null ) : elem.currentStyle,
          top = elem.offsetTop,
          left = elem.offsetLeft;

      while ( (elem = elem.parentNode) && elem !== body && elem !== docElem ) {
        if ( jQuery.support.fixedPosition && prevComputedStyle.position === "fixed" ) {
          break;
        }

        computedStyle = defaultView ? defaultView.getComputedStyle(elem, null) : elem.currentStyle;
        top  -= elem.scrollTop;
        left -= elem.scrollLeft;

        if ( elem === offsetParent ) {
          top  += elem.offsetTop;
          left += elem.offsetLeft;

          if ( jQuery.support.doesNotAddBorder && !(jQuery.support.doesAddBorderForTableAndCells && rtable.test(elem.nodeName)) ) {
            top  += parseFloat( computedStyle.borderTopWidth  ) || 0;
            left += parseFloat( computedStyle.borderLeftWidth ) || 0;
          }

          prevOffsetParent = offsetParent;
          offsetParent = elem.offsetParent;
        }

        if ( jQuery.support.subtractsBorderForOverflowNotVisible && computedStyle.overflow !== "visible" ) {
          top  += parseFloat( computedStyle.borderTopWidth  ) || 0;
          left += parseFloat( computedStyle.borderLeftWidth ) || 0;
        }

        prevComputedStyle = computedStyle;
      }

      if ( prevComputedStyle.position === "relative" || prevComputedStyle.position === "static" ) {
        top  += body.offsetTop;
        left += body.offsetLeft;
      }

      if ( jQuery.support.fixedPosition && prevComputedStyle.position === "fixed" ) {
        top  += Math.max( docElem.scrollTop, body.scrollTop );
        left += Math.max( docElem.scrollLeft, body.scrollLeft );
      }

      return { top: top, left: left };
    };
  }

  jQuery.fn.offset = function( options ) {
    if ( arguments.length ) {
      return options === undefined ?
          this :
          this.each(function( i ) {
            jQuery.offset.setOffset( this, options, i );
          });
    }

    var elem = this[0],
        doc = elem && elem.ownerDocument;

    if ( !doc ) {
      return null;
    }

    if ( elem === doc.body ) {
      return jQuery.offset.bodyOffset( elem );
    }

    return getOffset( elem, doc, doc.documentElement );
  };

  jQuery.offset = {

    bodyOffset: function( body ) {
      var top = body.offsetTop,
          left = body.offsetLeft;

      if ( jQuery.support.doesNotIncludeMarginInBodyOffset ) {
        top  += parseFloat( jQuery.css(body, "marginTop") ) || 0;
        left += parseFloat( jQuery.css(body, "marginLeft") ) || 0;
      }

      return { top: top, left: left };
    },

    setOffset: function( elem, options, i ) {
      var position = jQuery.css( elem, "position" );

      // set position first, in-case top/left are set even on static elem
      if ( position === "static" ) {
        elem.style.position = "relative";
      }

      var curElem = jQuery( elem ),
          curOffset = curElem.offset(),
          curCSSTop = jQuery.css( elem, "top" ),
          curCSSLeft = jQuery.css( elem, "left" ),
          calculatePosition = ( position === "absolute" || position === "fixed" ) && jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1,
          props = {}, curPosition = {}, curTop, curLeft;

      // need to be able to calculate position if either top or left is auto and position is either absolute or fixed
      if ( calculatePosition ) {
        curPosition = curElem.position();
        curTop = curPosition.top;
        curLeft = curPosition.left;
      } else {
        curTop = parseFloat( curCSSTop ) || 0;
        curLeft = parseFloat( curCSSLeft ) || 0;
      }

      if ( jQuery.isFunction( options ) ) {
        options = options.call( elem, i, curOffset );
      }

      if ( options.top != null ) {
        props.top = ( options.top - curOffset.top ) + curTop;
      }
      if ( options.left != null ) {
        props.left = ( options.left - curOffset.left ) + curLeft;
      }

      if ( "using" in options ) {
        options.using.call( elem, props );
      } else {
        curElem.css( props );
      }
    }
  };


  jQuery.fn.extend({

    position: function() {
      if ( !this[0] ) {
        return null;
      }

      var elem = this[0],

      // Get *real* offsetParent
          offsetParent = this.offsetParent(),

      // Get correct offsets
          offset       = this.offset(),
          parentOffset = rroot.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset();

      // Subtract element margins
      // note: when an element has margin: auto the offsetLeft and marginLeft
      // are the same in Safari causing offset.left to incorrectly be 0
      offset.top  -= parseFloat( jQuery.css(elem, "marginTop") ) || 0;
      offset.left -= parseFloat( jQuery.css(elem, "marginLeft") ) || 0;

      // Add offsetParent borders
      parentOffset.top  += parseFloat( jQuery.css(offsetParent[0], "borderTopWidth") ) || 0;
      parentOffset.left += parseFloat( jQuery.css(offsetParent[0], "borderLeftWidth") ) || 0;

      // Subtract the two offsets
      return {
        top:  offset.top  - parentOffset.top,
        left: offset.left - parentOffset.left
      };
    },

    offsetParent: function() {
      return this.map(function() {
        var offsetParent = this.offsetParent || document.body;
        while ( offsetParent && (!rroot.test(offsetParent.nodeName) && jQuery.css(offsetParent, "position") === "static") ) {
          offsetParent = offsetParent.offsetParent;
        }
        return offsetParent;
      });
    }
  });


// Create scrollLeft and scrollTop methods
  jQuery.each( {scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function( method, prop ) {
    var top = /Y/.test( prop );

    jQuery.fn[ method ] = function( val ) {
      return jQuery.access( this, function( elem, method, val ) {
        var win = getWindow( elem );

        if ( val === undefined ) {
          return win ? (prop in win) ? win[ prop ] :
              jQuery.support.boxModel && win.document.documentElement[ method ] ||
                  win.document.body[ method ] :
              elem[ method ];
        }

        if ( win ) {
          win.scrollTo(
              !top ? val : jQuery( win ).scrollLeft(),
              top ? val : jQuery( win ).scrollTop()
          );

        } else {
          elem[ method ] = val;
        }
      }, method, val, arguments.length, null );
    };
  });

  function getWindow( elem ) {
    return jQuery.isWindow( elem ) ?
        elem :
        elem.nodeType === 9 ?
            elem.defaultView || elem.parentWindow :
            false;
  }




// Create width, height, innerHeight, innerWidth, outerHeight and outerWidth methods
  jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
    var clientProp = "client" + name,
        scrollProp = "scroll" + name,
        offsetProp = "offset" + name;

    // innerHeight and innerWidth
    jQuery.fn[ "inner" + name ] = function() {
      var elem = this[0];
      return elem ?
          elem.style ?
              parseFloat( jQuery.css( elem, type, "padding" ) ) :
              this[ type ]() :
          null;
    };

    // outerHeight and outerWidth
    jQuery.fn[ "outer" + name ] = function( margin ) {
      var elem = this[0];
      return elem ?
          elem.style ?
              parseFloat( jQuery.css( elem, type, margin ? "margin" : "border" ) ) :
              this[ type ]() :
          null;
    };

    jQuery.fn[ type ] = function( value ) {
      return jQuery.access( this, function( elem, type, value ) {
        var doc, docElemProp, orig, ret;

        if ( jQuery.isWindow( elem ) ) {
          // 3rd condition allows Nokia support, as it supports the docElem prop but not CSS1Compat
          doc = elem.document;
          docElemProp = doc.documentElement[ clientProp ];
          return jQuery.support.boxModel && docElemProp ||
              doc.body && doc.body[ clientProp ] || docElemProp;
        }

        // Get document width or height
        if ( elem.nodeType === 9 ) {
          // Either scroll[Width/Height] or offset[Width/Height], whichever is greater
          doc = elem.documentElement;

          // when a window > document, IE6 reports a offset[Width/Height] > client[Width/Height]
          // so we can't use max, as it'll choose the incorrect offset[Width/Height]
          // instead we use the correct client[Width/Height]
          // support:IE6
          if ( doc[ clientProp ] >= doc[ scrollProp ] ) {
            return doc[ clientProp ];
          }

          return Math.max(
              elem.body[ scrollProp ], doc[ scrollProp ],
              elem.body[ offsetProp ], doc[ offsetProp ]
          );
        }

        // Get width or height on the element
        if ( value === undefined ) {
          orig = jQuery.css( elem, type );
          ret = parseFloat( orig );
          return jQuery.isNumeric( ret ) ? ret : orig;
        }

        // Set the width or height on the element
        jQuery( elem ).css( type, value );
      }, type, value, arguments.length, null );
    };
  });




// Expose jQuery to the global object
  window.jQuery = window.$ = jQuery;

// Expose jQuery as an AMD module, but only for AMD loaders that
// understand the issues with loading multiple versions of jQuery
// in a page that all might call define(). The loader will indicate
// they have special allowances for multiple jQuery versions by
// specifying define.amd.jQuery = true. Register as a named module,
// since jQuery can be concatenated with other files that may use define,
// but not use a proper concatenation script that understands anonymous
// AMD modules. A named AMD is safest and most robust way to register.
// Lowercase jquery is used because AMD module names are derived from
// file names, and jQuery is normally delivered in a lowercase file name.
// Do this after creating the global so that if an AMD module wants to call
// noConflict to hide this version of jQuery, it will work.
  if ( typeof define === "function" && define.amd && define.amd.jQuery ) {
    define( "jquery", [], function () { return jQuery; } );
  }



})( window );

/*!
 * jQuery Transit - CSS3 transitions and transformations
 * (c) 2011-2012 Rico Sta. Cruz <rico@ricostacruz.com>
 * MIT Licensed.
 *
 * http://ricostacruz.com/jquery.transit
 * http://github.com/rstacruz/jquery.transit
 */
(function(k){k.transit={version:"0.9.9",propertyMap:{marginLeft:"margin",marginRight:"margin",marginBottom:"margin",marginTop:"margin",paddingLeft:"padding",paddingRight:"padding",paddingBottom:"padding",paddingTop:"padding"},enabled:true,useTransitionEnd:false};var d=document.createElement("div");var q={};function b(v){if(v in d.style){return v}var u=["Moz","Webkit","O","ms"];var r=v.charAt(0).toUpperCase()+v.substr(1);if(v in d.style){return v}for(var t=0;t<u.length;++t){var s=u[t]+r;if(s in d.style){return s}}}function e(){d.style[q.transform]="";d.style[q.transform]="rotateY(90deg)";return d.style[q.transform]!==""}var a=navigator.userAgent.toLowerCase().indexOf("chrome")>-1;q.transition=b("transition");q.transitionDelay=b("transitionDelay");q.transform=b("transform");q.transformOrigin=b("transformOrigin");q.transform3d=e();var i={transition:"transitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",WebkitTransition:"webkitTransitionEnd",msTransition:"MSTransitionEnd"};var f=q.transitionEnd=i[q.transition]||null;for(var p in q){if(q.hasOwnProperty(p)&&typeof k.support[p]==="undefined"){k.support[p]=q[p]}}d=null;k.cssEase={_default:"ease","in":"ease-in",out:"ease-out","in-out":"ease-in-out",snap:"cubic-bezier(0,1,.5,1)",easeOutCubic:"cubic-bezier(.215,.61,.355,1)",easeInOutCubic:"cubic-bezier(.645,.045,.355,1)",easeInCirc:"cubic-bezier(.6,.04,.98,.335)",easeOutCirc:"cubic-bezier(.075,.82,.165,1)",easeInOutCirc:"cubic-bezier(.785,.135,.15,.86)",easeInExpo:"cubic-bezier(.95,.05,.795,.035)",easeOutExpo:"cubic-bezier(.19,1,.22,1)",easeInOutExpo:"cubic-bezier(1,0,0,1)",easeInQuad:"cubic-bezier(.55,.085,.68,.53)",easeOutQuad:"cubic-bezier(.25,.46,.45,.94)",easeInOutQuad:"cubic-bezier(.455,.03,.515,.955)",easeInQuart:"cubic-bezier(.895,.03,.685,.22)",easeOutQuart:"cubic-bezier(.165,.84,.44,1)",easeInOutQuart:"cubic-bezier(.77,0,.175,1)",easeInQuint:"cubic-bezier(.755,.05,.855,.06)",easeOutQuint:"cubic-bezier(.23,1,.32,1)",easeInOutQuint:"cubic-bezier(.86,0,.07,1)",easeInSine:"cubic-bezier(.47,0,.745,.715)",easeOutSine:"cubic-bezier(.39,.575,.565,1)",easeInOutSine:"cubic-bezier(.445,.05,.55,.95)",easeInBack:"cubic-bezier(.6,-.28,.735,.045)",easeOutBack:"cubic-bezier(.175, .885,.32,1.275)",easeInOutBack:"cubic-bezier(.68,-.55,.265,1.55)"};k.cssHooks["transit:transform"]={get:function(r){return k(r).data("transform")||new j()},set:function(s,r){var t=r;if(!(t instanceof j)){t=new j(t)}if(q.transform==="WebkitTransform"&&!a){s.style[q.transform]=t.toString(true)}else{s.style[q.transform]=t.toString()}k(s).data("transform",t)}};k.cssHooks.transform={set:k.cssHooks["transit:transform"].set};if(k.fn.jquery<"1.8"){k.cssHooks.transformOrigin={get:function(r){return r.style[q.transformOrigin]},set:function(r,s){r.style[q.transformOrigin]=s}};k.cssHooks.transition={get:function(r){return r.style[q.transition]},set:function(r,s){r.style[q.transition]=s}}}n("scale");n("translate");n("rotate");n("rotateX");n("rotateY");n("rotate3d");n("perspective");n("skewX");n("skewY");n("x",true);n("y",true);function j(r){if(typeof r==="string"){this.parse(r)}return this}j.prototype={setFromString:function(t,s){var r=(typeof s==="string")?s.split(","):(s.constructor===Array)?s:[s];r.unshift(t);j.prototype.set.apply(this,r)},set:function(s){var r=Array.prototype.slice.apply(arguments,[1]);if(this.setter[s]){this.setter[s].apply(this,r)}else{this[s]=r.join(",")}},get:function(r){if(this.getter[r]){return this.getter[r].apply(this)}else{return this[r]||0}},setter:{rotate:function(r){this.rotate=o(r,"deg")},rotateX:function(r){this.rotateX=o(r,"deg")},rotateY:function(r){this.rotateY=o(r,"deg")},scale:function(r,s){if(s===undefined){s=r}this.scale=r+","+s},skewX:function(r){this.skewX=o(r,"deg")},skewY:function(r){this.skewY=o(r,"deg")},perspective:function(r){this.perspective=o(r,"px")},x:function(r){this.set("translate",r,null)},y:function(r){this.set("translate",null,r)},translate:function(r,s){if(this._translateX===undefined){this._translateX=0}if(this._translateY===undefined){this._translateY=0}if(r!==null&&r!==undefined){this._translateX=o(r,"px")}if(s!==null&&s!==undefined){this._translateY=o(s,"px")}this.translate=this._translateX+","+this._translateY}},getter:{x:function(){return this._translateX||0},y:function(){return this._translateY||0},scale:function(){var r=(this.scale||"1,1").split(",");if(r[0]){r[0]=parseFloat(r[0])}if(r[1]){r[1]=parseFloat(r[1])}return(r[0]===r[1])?r[0]:r},rotate3d:function(){var t=(this.rotate3d||"0,0,0,0deg").split(",");for(var r=0;r<=3;++r){if(t[r]){t[r]=parseFloat(t[r])}}if(t[3]){t[3]=o(t[3],"deg")}return t}},parse:function(s){var r=this;s.replace(/([a-zA-Z0-9]+)\((.*?)\)/g,function(t,v,u){r.setFromString(v,u)})},toString:function(t){var s=[];for(var r in this){if(this.hasOwnProperty(r)){if((!q.transform3d)&&((r==="rotateX")||(r==="rotateY")||(r==="perspective")||(r==="transformOrigin"))){continue}if(r[0]!=="_"){if(t&&(r==="scale")){s.push(r+"3d("+this[r]+",1)")}else{if(t&&(r==="translate")){s.push(r+"3d("+this[r]+",0)")}else{s.push(r+"("+this[r]+")")}}}}}return s.join(" ")}};function m(s,r,t){if(r===true){s.queue(t)}else{if(r){s.queue(r,t)}else{t()}}}function h(s){var r=[];k.each(s,function(t){t=k.camelCase(t);t=k.transit.propertyMap[t]||k.cssProps[t]||t;t=c(t);if(k.inArray(t,r)===-1){r.push(t)}});return r}function g(s,v,x,r){var t=h(s);if(k.cssEase[x]){x=k.cssEase[x]}var w=""+l(v)+" "+x;if(parseInt(r,10)>0){w+=" "+l(r)}var u=[];k.each(t,function(z,y){u.push(y+" "+w)});return u.join(", ")}k.fn.transition=k.fn.transit=function(z,s,y,C){var D=this;var u=0;var w=true;if(typeof s==="function"){C=s;s=undefined}if(typeof y==="function"){C=y;y=undefined}if(typeof z.easing!=="undefined"){y=z.easing;delete z.easing}if(typeof z.duration!=="undefined"){s=z.duration;delete z.duration}if(typeof z.complete!=="undefined"){C=z.complete;delete z.complete}if(typeof z.queue!=="undefined"){w=z.queue;delete z.queue}if(typeof z.delay!=="undefined"){u=z.delay;delete z.delay}if(typeof s==="undefined"){s=k.fx.speeds._default}if(typeof y==="undefined"){y=k.cssEase._default}s=l(s);var E=g(z,s,y,u);var B=k.transit.enabled&&q.transition;var t=B?(parseInt(s,10)+parseInt(u,10)):0;if(t===0){var A=function(F){D.css(z);if(C){C.apply(D)}if(F){F()}};m(D,w,A);return D}var x={};var r=function(H){var G=false;var F=function(){if(G){D.unbind(f,F)}if(t>0){D.each(function(){this.style[q.transition]=(x[this]||null)})}if(typeof C==="function"){C.apply(D)}if(typeof H==="function"){H()}};if((t>0)&&(f)&&(k.transit.useTransitionEnd)){G=true;D.bind(f,F)}else{window.setTimeout(F,t)}D.each(function(){if(t>0){this.style[q.transition]=E}k(this).css(z)})};var v=function(F){this.offsetWidth;r(F)};m(D,w,v);return this};function n(s,r){if(!r){k.cssNumber[s]=true}k.transit.propertyMap[s]=q.transform;k.cssHooks[s]={get:function(v){var u=k(v).css("transit:transform");return u.get(s)},set:function(v,w){var u=k(v).css("transit:transform");u.setFromString(s,w);k(v).css({"transit:transform":u})}}}function c(r){return r.replace(/([A-Z])/g,function(s){return"-"+s.toLowerCase()})}function o(s,r){if((typeof s==="string")&&(!s.match(/^[\-0-9\.]+$/))){return s}else{return""+s+r}}function l(s){var r=s;if(k.fx.speeds[r]){r=k.fx.speeds[r]}return o(r,"ms")}k.transit.getTransitionValue=g})(jQuery);

/*
 *  Sugar Library vedge
 *
 *  Freely distributable and licensed under the MIT-style license.
 *  Copyright (c) 2013 Andrew Plummer
 *  http://sugarjs.com/
 *
 * ---------------------------- */
(function(){
  /***
   * @package Core
   * @description Internal utility and common methods.
   ***/


  // A few optimizations for Google Closure Compiler will save us a couple kb in the release script.
  var object = Object, array = Array, regexp = RegExp, date = Date, string = String, number = Number, math = Math, Undefined;

  // Internal toString
  var internalToString = object.prototype.toString;

  // The global context
  var globalContext = typeof global !== 'undefined' ? global : this;

  // Type check methods need a way to be accessed dynamically outside global context.
  var typeChecks = {};

  // defineProperty exists in IE8 but will error when trying to define a property on
  // native objects. IE8 does not have defineProperies, however, so this check saves a try/catch block.
  var definePropertySupport = object.defineProperty && object.defineProperties;


  // Class initializers and class helpers

  var ClassNames = 'Array,Boolean,Date,Function,Number,String,RegExp'.split(',');

  var isArray    = buildClassCheck(ClassNames[0]);
  var isBoolean  = buildClassCheck(ClassNames[1]);
  var isDate     = buildClassCheck(ClassNames[2]);
  var isFunction = buildClassCheck(ClassNames[3]);
  var isNumber   = buildClassCheck(ClassNames[4]);
  var isString   = buildClassCheck(ClassNames[5]);
  var isRegExp   = buildClassCheck(ClassNames[6]);

  function buildClassCheck(name) {
    var type, fn;
    if(/String|Number|Boolean/.test(name)) {
      type = name.toLowerCase();
    }
    fn = (name === 'Array' && array.isArray) || function(obj) {
      if(type && typeof obj === type) {
        return true;
      }
      return className(obj) === '[object '+name+']';
    }
    typeChecks[name] = fn;
    return fn;
  }

  function className(obj) {
    return internalToString.call(obj);
  }

  function initializeClasses() {
    initializeClass(object);
    iterateOverObject(ClassNames, function(i,name) {
      initializeClass(globalContext[name]);
    });
  }

  function initializeClass(klass) {
    if(klass['SugarMethods']) return;
    defineProperty(klass, 'SugarMethods', {});
    extend(klass, false, false, {
      'extend': function(methods, override, instance) {
        extend(klass, instance !== false, override, methods);
      },
      'sugarRestore': function() {
        return batchMethodExecute(klass, arguments, function(target, name, m) {
          defineProperty(target, name, m.method);
        });
      },
      'sugarRevert': function() {
        return batchMethodExecute(klass, arguments, function(target, name, m) {
          if(m.existed) {
            defineProperty(target, name, m.original);
          } else {
            delete target[name];
          }
        });
      }
    });
  }

  // Class extending methods

  function extend(klass, instance, override, methods) {
    var extendee = instance ? klass.prototype : klass;
    initializeClass(klass);
    iterateOverObject(methods, function(name, method) {
      var original = extendee[name];
      var existed  = hasOwnProperty(extendee, name);
      if(typeof override === 'function') {
        method = wrapNative(extendee[name], method, override);
      }
      if(override !== false || !extendee[name]) {
        defineProperty(extendee, name, method);
      }
      // If the method is internal to Sugar, then store a reference so it can be restored later.
      klass['SugarMethods'][name] = { instance: instance, method: method, original: original, existed: existed };
    });
  }

  function extendSimilar(klass, instance, override, set, fn) {
    var methods = {};
    set = isString(set) ? set.split(',') : set;
    set.forEach(function(name, i) {
      fn(methods, name, i);
    });
    extend(klass, instance, override, methods);
  }

  function batchMethodExecute(klass, args, fn) {
    var all = args.length === 0, methods = multiArgs(args), changed = false;
    iterateOverObject(klass['SugarMethods'], function(name, m) {
      if(all || methods.indexOf(name) !== -1) {
        changed = true;
        fn(m.instance ? klass.prototype : klass, name, m);
      }
    });
    return changed;
  }

  function wrapNative(nativeFn, extendedFn, condition) {
    return function() {
      var fn;
      if(nativeFn && (condition === true || !condition.apply(this, arguments))) {
        fn = nativeFn;
      } else {
        fn = extendedFn;
      }
      return fn.apply(this, arguments);
    }
  }

  function defineProperty(target, name, method) {
    if(definePropertySupport) {
      object.defineProperty(target, name, { 'value': method, 'configurable': true, 'enumerable': false, 'writable': true });
    } else {
      target[name] = method;
    }
  }


  // Argument helpers

  function multiArgs(args, fn) {
    var result = [], i, len;
    for(i = 0, len = args.length; i < len; i++) {
      result.push(args[i]);
      if(fn) fn.call(args, args[i], i);
    }
    return result;
  }

  function flattenedArgs(obj, fn, from) {
    multiArgs(array.prototype.concat.apply([], array.prototype.slice.call(obj, from || 0)), fn);
  }

  function checkCallback(fn) {
    if(!fn || !fn.call) {
      throw new TypeError('Callback is not callable');
    }
  }


  // General helpers

  function isDefined(o) {
    return o !== Undefined;
  }

  function isUndefined(o) {
    return o === Undefined;
  }


  // Object helpers

  function isObjectPrimitive(obj) {
    // Check for null
    return obj && typeof obj === 'object';
  }

  function isObject(obj) {
    // === on the constructor is not safe across iframes
    // 'hasOwnProperty' ensures that the object also inherits
    // from Object, which is false for DOMElements in IE.
    return !!obj && className(obj) === '[object Object]' && 'hasOwnProperty' in obj;
  }

  function hasOwnProperty(obj, key) {
    return object['hasOwnProperty'].call(obj, key);
  }

  function iterateOverObject(obj, fn) {
    var key;
    for(key in obj) {
      if(!hasOwnProperty(obj, key)) continue;
      if(fn.call(obj, key, obj[key], obj) === false) break;
    }
  }

  function simpleMerge(target, source) {
    iterateOverObject(source, function(key) {
      target[key] = source[key];
    });
    return target;
  }

  // Hash definition

  function Hash(obj) {
    simpleMerge(this, obj);
  };

  Hash.prototype.constructor = object;

  // Number helpers

  function getRange(start, stop, fn, step) {
    var arr = [], i = parseInt(start), down = step < 0;
    while((!down && i <= stop) || (down && i >= stop)) {
      arr.push(i);
      if(fn) fn.call(this, i);
      i += step || 1;
    }
    return arr;
  }

  function round(val, precision, method) {
    var fn = math[method || 'round'];
    var multiplier = math.pow(10, math.abs(precision || 0));
    if(precision < 0) multiplier = 1 / multiplier;
    return fn(val * multiplier) / multiplier;
  }

  function ceil(val, precision) {
    return round(val, precision, 'ceil');
  }

  function floor(val, precision) {
    return round(val, precision, 'floor');
  }

  // Used by Number and Date

  function padNumber(num, place, sign, base) {
    var str = math.abs(num).toString(base || 10);
    str = repeatString(place - str.replace(/\.\d+/, '').length, '0') + str;
    if(sign || num < 0) {
      str = (num < 0 ? '-' : '+') + str;
    }
    return str;
  }

  function getOrdinalizedSuffix(num) {
    if(num >= 11 && num <= 13) {
      return 'th';
    } else {
      switch(num % 10) {
        case 1:  return 'st';
        case 2:  return 'nd';
        case 3:  return 'rd';
        default: return 'th';
      }
    }
  }


  // String helpers

  // WhiteSpace/LineTerminator as defined in ES5.1 plus Unicode characters in the Space, Separator category.
  function getTrimmableCharacters() {
    return '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u2028\u2029\u3000\uFEFF';
  }

  function repeatString(times, str) {
    return array(math.max(0, isDefined(times) ? times : 1) + 1).join(str || '');
  }


  // RegExp helpers

  function getRegExpFlags(reg, add) {
    var flags = reg.toString().match(/[^/]*$/)[0];
    if(add) {
      flags = (flags + add).split('').sort().join('').replace(/([gimy])\1+/g, '$1');
    }
    return flags;
  }

  function escapeRegExp(str) {
    if(!isString(str)) str = string(str);
    return str.replace(/([\\/'*+?|()\[\]{}.^$])/g,'\\$1');
  }


  // Specialized helpers


  // Used by Array#unique and Object.equal

  function stringify(thing, stack) {
    var type = typeof thing,
        thingIsObject,
        thingIsArray,
        klass, value,
        arr, key, i, len;

    // Return quickly if string to save cycles
    if(type === 'string') return thing;

    klass         = internalToString.call(thing)
    thingIsObject = isObject(thing);
    thingIsArray  = klass === '[object Array]';

    if(thing != null && thingIsObject || thingIsArray) {
      // This method for checking for cyclic structures was egregiously stolen from
      // the ingenious method by @kitcambridge from the Underscore script:
      // https://github.com/documentcloud/underscore/issues/240
      if(!stack) stack = [];
      // Allowing a step into the structure before triggering this
      // script to save cycles on standard JSON structures and also to
      // try as hard as possible to catch basic properties that may have
      // been modified.
      if(stack.length > 1) {
        i = stack.length;
        while (i--) {
          if (stack[i] === thing) {
            return 'CYC';
          }
        }
      }
      stack.push(thing);
      value = string(thing.constructor);
      arr = thingIsArray ? thing : object.keys(thing).sort();
      for(i = 0, len = arr.length; i < len; i++) {
        key = thingIsArray ? i : arr[i];
        value += key + stringify(thing[key], stack);
      }
      stack.pop();
    } else if(1 / thing === -Infinity) {
      value = '-0';
    } else {
      value = string(thing && thing.valueOf ? thing.valueOf() : thing);
    }
    return type + klass + value;
  }

  function isEqual(a, b) {
    if(objectIsMatchedByValue(a) && objectIsMatchedByValue(b)) {
      return stringify(a) === stringify(b);
    } else {
      return a === b;
    }
  }

  function objectIsMatchedByValue(obj) {
    var klass = className(obj);
    return /^\[object Date|Array|String|Number|RegExp|Boolean|Arguments\]$/.test(klass) ||
           isObject(obj);
  }


  // Used by Array#at and String#at

  function entryAtIndex(arr, args, str) {
    var result = [], length = arr.length, loop = args[args.length - 1] !== false, r;
    multiArgs(args, function(index) {
      if(isBoolean(index)) return false;
      if(loop) {
        index = index % length;
        if(index < 0) index = length + index;
      }
      r = str ? arr.charAt(index) || '' : arr[index];
      result.push(r);
    });
    return result.length < 2 ? result[0] : result;
  }


  // Object class methods implemented as instance methods

  function buildObjectInstanceMethods(set, target) {
    extendSimilar(target, true, false, set, function(methods, name) {
      methods[name + (name === 'equal' ? 's' : '')] = function() {
        return object[name].apply(null, [this].concat(multiArgs(arguments)));
      }
    });
  }

  initializeClasses();



  /***
   * @package ES5
   * @description Shim methods that provide ES5 compatible functionality. This package can be excluded if you do not require legacy browser support (IE8 and below).
   *
   ***/


  /***
   * Object module
   *
   ***/

  extend(object, false, false, {

    'keys': function(obj) {
      var keys = [];
      if(!isObjectPrimitive(obj) && !isRegExp(obj) && !isFunction(obj)) {
        throw new TypeError('Object required');
      }
      iterateOverObject(obj, function(key, value) {
        keys.push(key);
      });
      return keys;
    }

  });


  /***
   * Array module
   *
   ***/

  // ECMA5 methods

  function arrayIndexOf(arr, search, fromIndex, increment) {
    var length = arr.length,
        fromRight = increment == -1,
        start = fromRight ? length - 1 : 0,
        index = toIntegerWithDefault(fromIndex, start);
    if(index < 0) {
      index = length + index;
    }
    if((!fromRight && index < 0) || (fromRight && index >= length)) {
      index = start;
    }
    while((fromRight && index >= 0) || (!fromRight && index < length)) {
      if(arr[index] === search) {
        return index;
      }
      index += increment;
    }
    return -1;
  }

  function arrayReduce(arr, fn, initialValue, fromRight) {
    var length = arr.length, count = 0, defined = isDefined(initialValue), result, index;
    checkCallback(fn);
    if(length == 0 && !defined) {
      throw new TypeError('Reduce called on empty array with no initial value');
    } else if(defined) {
      result = initialValue;
    } else {
      result = arr[fromRight ? length - 1 : count];
      count++;
    }
    while(count < length) {
      index = fromRight ? length - count - 1 : count;
      if(index in arr) {
        result = fn(result, arr[index], index, arr);
      }
      count++;
    }
    return result;
  }

  function toIntegerWithDefault(i, d) {
    if(isNaN(i)) {
      return d;
    } else {
      return parseInt(i >> 0);
    }
  }

  function checkFirstArgumentExists(args) {
    if(args.length === 0) {
      throw new TypeError('First argument must be defined');
    }
  }




  extend(array, false, false, {

    /***
     *
     * @method Array.isArray(<obj>)
     * @returns Boolean
     * @short Returns true if <obj> is an Array.
     * @extra This method is provided for browsers that don't support it internally.
     * @example
     *
     *   Array.isArray(3)        -> false
     *   Array.isArray(true)     -> false
     *   Array.isArray('wasabi') -> false
     *   Array.isArray([1,2,3])  -> true
     *
     ***/
    'isArray': function(obj) {
      return isArray(obj);
    }

  });


  extend(array, true, false, {

    /***
     * @method every(<f>, [scope])
     * @returns Boolean
     * @short Returns true if all elements in the array match <f>.
     * @extra [scope] is the %this% object. %all% is provided an alias. In addition to providing this method for browsers that don't support it natively, this method also implements @array_matching.
     * @example
     *
     +   ['a','a','a'].every(function(n) {
     *     return n == 'a';
     *   });
     *   ['a','a','a'].every('a')   -> true
     *   [{a:2},{a:2}].every({a:2}) -> true
     ***/
    'every': function(fn, scope) {
      var length = this.length, index = 0;
      checkFirstArgumentExists(arguments);
      while(index < length) {
        if(index in this && !fn.call(scope, this[index], index, this)) {
          return false;
        }
        index++;
      }
      return true;
    },

    /***
     * @method some(<f>, [scope])
     * @returns Boolean
     * @short Returns true if any element in the array matches <f>.
     * @extra [scope] is the %this% object. %any% is provided as an alias. In addition to providing this method for browsers that don't support it natively, this method also implements @array_matching.
     * @example
     *
     +   ['a','b','c'].some(function(n) {
     *     return n == 'a';
     *   });
     +   ['a','b','c'].some(function(n) {
     *     return n == 'd';
     *   });
     *   ['a','b','c'].some('a')   -> true
     *   [{a:2},{b:5}].some({a:2}) -> true
     ***/
    'some': function(fn, scope) {
      var length = this.length, index = 0;
      checkFirstArgumentExists(arguments);
      while(index < length) {
        if(index in this && fn.call(scope, this[index], index, this)) {
          return true;
        }
        index++;
      }
      return false;
    },

    /***
     * @method map(<map>, [scope])
     * @returns Array
     * @short Maps the array to another array containing the values that are the result of calling <map> on each element.
     * @extra [scope] is the %this% object. In addition to providing this method for browsers that don't support it natively, this enhanced method also directly accepts a string, which is a shortcut for a function that gets that property (or invokes a function) on each element.
     * @example
     *
     +   [1,2,3].map(function(n) {
     *     return n * 3;
     *   });                                  -> [3,6,9]
     *   ['one','two','three'].map(function(n) {
     *     return n.length;
     *   });                                  -> [3,3,5]
     *   ['one','two','three'].map('length')  -> [3,3,5]
     ***/
    'map': function(fn, scope) {
      var length = this.length, index = 0, result = new Array(length);
      checkFirstArgumentExists(arguments);
      while(index < length) {
        if(index in this) {
          result[index] = fn.call(scope, this[index], index, this);
        }
        index++;
      }
      return result;
    },

    /***
     * @method filter(<f>, [scope])
     * @returns Array
     * @short Returns any elements in the array that match <f>.
     * @extra [scope] is the %this% object. In addition to providing this method for browsers that don't support it natively, this method also implements @array_matching.
     * @example
     *
     +   [1,2,3].filter(function(n) {
     *     return n > 1;
     *   });
     *   [1,2,2,4].filter(2) -> 2
     *
     ***/
    'filter': function(fn, scope) {
      var length = this.length, index = 0, result = [];
      checkFirstArgumentExists(arguments);
      while(index < length) {
        if(index in this && fn.call(scope, this[index], index, this)) {
          result.push(this[index]);
        }
        index++;
      }
      return result;
    },

    /***
     * @method indexOf(<search>, [fromIndex])
     * @returns Number
     * @short Searches the array and returns the first index where <search> occurs, or -1 if the element is not found.
     * @extra [fromIndex] is the index from which to begin the search. This method performs a simple strict equality comparison on <search>. It does not support enhanced functionality such as searching the contents against a regex, callback, or deep comparison of objects. For such functionality, use the %findIndex% method instead.
     * @example
     *
     *   [1,2,3].indexOf(3)           -> 1
     *   [1,2,3].indexOf(7)           -> -1
     *
     ***/
    'indexOf': function(search, fromIndex) {
      if(isString(this)) return this.indexOf(search, fromIndex);
      return arrayIndexOf(this, search, fromIndex, 1);
    },

    /***
     * @method lastIndexOf(<search>, [fromIndex])
     * @returns Number
     * @short Searches the array and returns the last index where <search> occurs, or -1 if the element is not found.
     * @extra [fromIndex] is the index from which to begin the search. This method performs a simple strict equality comparison on <search>.
     * @example
     *
     *   [1,2,1].lastIndexOf(1)                 -> 2
     *   [1,2,1].lastIndexOf(7)                 -> -1
     *
     ***/
    'lastIndexOf': function(search, fromIndex) {
      if(isString(this)) return this.lastIndexOf(search, fromIndex);
      return arrayIndexOf(this, search, fromIndex, -1);
    },

    /***
     * @method forEach([fn], [scope])
     * @returns Nothing
     * @short Iterates over the array, calling [fn] on each loop.
     * @extra This method is only provided for those browsers that do not support it natively. [scope] becomes the %this% object.
     * @example
     *
     *   ['a','b','c'].forEach(function(a) {
     *     // Called 3 times: 'a','b','c'
     *   });
     *
     ***/
    'forEach': function(fn, scope) {
      var length = this.length, index = 0;
      checkCallback(fn);
      while(index < length) {
        if(index in this) {
          fn.call(scope, this[index], index, this);
        }
        index++;
      }
    },

    /***
     * @method reduce(<fn>, [init])
     * @returns Mixed
     * @short Reduces the array to a single result.
     * @extra If [init] is passed as a starting value, that value will be passed as the first argument to the callback. The second argument will be the first element in the array. From that point, the result of the callback will then be used as the first argument of the next iteration. This is often refered to as "accumulation", and [init] is often called an "accumulator". If [init] is not passed, then <fn> will be called n - 1 times, where n is the length of the array. In this case, on the first iteration only, the first argument will be the first element of the array, and the second argument will be the second. After that callbacks work as normal, using the result of the previous callback as the first argument of the next. This method is only provided for those browsers that do not support it natively.
     *
     * @example
     *
     +   [1,2,3,4].reduce(function(a, b) {
     *     return a - b;
     *   });
     +   [1,2,3,4].reduce(function(a, b) {
     *     return a - b;
     *   }, 100);
     *
     ***/
    'reduce': function(fn, init) {
      return arrayReduce(this, fn, init);
    },

    /***
     * @method reduceRight([fn], [init])
     * @returns Mixed
     * @short Identical to %Array#reduce%, but operates on the elements in reverse order.
     * @extra This method is only provided for those browsers that do not support it natively.
     *
     *
     *
     *
     * @example
     *
     +   [1,2,3,4].reduceRight(function(a, b) {
     *     return a - b;
     *   });
     *
     ***/
    'reduceRight': function(fn, init) {
      return arrayReduce(this, fn, init, true);
    }


  });




  /***
   * String module
   *
   ***/


  function buildTrim() {
    var support = getTrimmableCharacters().match(/^\s+$/);
    try { string.prototype.trim.call([1]); } catch(e) { support = false; }
    extend(string, true, !support, {

      /***
       * @method trim[Side]()
       * @returns String
       * @short Removes leading and/or trailing whitespace from the string.
       * @extra Whitespace is defined as line breaks, tabs, and any character in the "Space, Separator" Unicode category, conforming to the the ES5 spec. The standard %trim% method is only added when not fully supported natively.
       *
       * @set
       *   trim
       *   trimLeft
       *   trimRight
       *
       * @example
       *
       *   '   wasabi   '.trim()      -> 'wasabi'
       *   '   wasabi   '.trimLeft()  -> 'wasabi   '
       *   '   wasabi   '.trimRight() -> '   wasabi'
       *
       ***/
      'trim': function() {
        return this.toString().trimLeft().trimRight();
      },

      'trimLeft': function() {
        return this.replace(regexp('^['+getTrimmableCharacters()+']+'), '');
      },

      'trimRight': function() {
        return this.replace(regexp('['+getTrimmableCharacters()+']+$'), '');
      }
    });
  }



  /***
   * Function module
   *
   ***/


  extend(Function, true, false, {

     /***
     * @method bind(<scope>, [arg1], ...)
     * @returns Function
     * @short Binds <scope> as the %this% object for the function when it is called. Also allows currying an unlimited number of parameters.
     * @extra "currying" means setting parameters ([arg1], [arg2], etc.) ahead of time so that they are passed when the function is called later. If you pass additional parameters when the function is actually called, they will be added will be added to the end of the curried parameters. This method is provided for browsers that don't support it internally.
     * @example
     *
     +   (function() {
     *     return this;
     *   }).bind('woof')(); -> returns 'woof'; function is bound with 'woof' as the this object.
     *   (function(a) {
     *     return a;
     *   }).bind(1, 2)();   -> returns 2; function is bound with 1 as the this object and 2 curried as the first parameter
     *   (function(a, b) {
     *     return a + b;
     *   }).bind(1, 2)(3);  -> returns 5; function is bound with 1 as the this object, 2 curied as the first parameter and 3 passed as the second when calling the function
     *
     ***/
    'bind': function(scope) {
      var fn = this, args = multiArgs(arguments).slice(1), bound;
      if(!isFunction(this)) {
        throw new TypeError('Function.prototype.bind called on a non-function');
      }
      bound = function() {
        return fn.apply(fn.prototype && this instanceof fn ? this : scope, args.concat(multiArgs(arguments)));
      }
      bound.prototype = this.prototype;
      return bound;
    }

  });

  /***
   * Date module
   *
   ***/

   /***
   * @method toISOString()
   * @returns String
   * @short Formats the string to ISO8601 format.
   * @extra This will always format as UTC time. Provided for browsers that do not support this method.
   * @example
   *
   *   Date.create().toISOString() -> ex. 2011-07-05 12:24:55.528Z
   *
   ***
   * @method toJSON()
   * @returns String
   * @short Returns a JSON representation of the date.
   * @extra This is effectively an alias for %toISOString%. Will always return the date in UTC time. Provided for browsers that do not support this method.
   * @example
   *
   *   Date.create().toJSON() -> ex. 2011-07-05 12:24:55.528Z
   *
   ***/

  extend(date, false, false, {

     /***
     * @method Date.now()
     * @returns String
     * @short Returns the number of milliseconds since January 1st, 1970 00:00:00 (UTC time).
     * @extra Provided for browsers that do not support this method.
     * @example
     *
     *   Date.now() -> ex. 1311938296231
     *
     ***/
    'now': function() {
      return new date().getTime();
    }

  });

   function buildISOString() {
    var d = new date(date.UTC(1999, 11, 31)), target = '1999-12-31T00:00:00.000Z';
    var support = d.toISOString && d.toISOString() === target;
    extendSimilar(date, true, !support, 'toISOString,toJSON', function(methods, name) {
      methods[name] = function() {
        return padNumber(this.getUTCFullYear(), 4) + '-' +
               padNumber(this.getUTCMonth() + 1, 2) + '-' +
               padNumber(this.getUTCDate(), 2) + 'T' +
               padNumber(this.getUTCHours(), 2) + ':' +
               padNumber(this.getUTCMinutes(), 2) + ':' +
               padNumber(this.getUTCSeconds(), 2) + '.' +
               padNumber(this.getUTCMilliseconds(), 3) + 'Z';
      }
    });
   }

  // Initialize
  buildTrim();
  buildISOString();



  /***
   * @package Array
   * @dependency core
   * @description Array manipulation and traversal, "fuzzy matching" against elements, alphanumeric sorting and collation, enumerable methods on Object.
   *
   ***/


  function multiMatch(el, match, scope, params) {
    var result = true;
    if(el === match) {
      // Match strictly equal values up front.
      return true;
    } else if(isRegExp(match) && isString(el)) {
      // Match against a regexp
      return regexp(match).test(el);
    } else if(isFunction(match)) {
      // Match against a filtering function
      return match.apply(scope, params);
    } else if(isObject(match) && isObjectPrimitive(el)) {
      // Match against a hash or array.
      iterateOverObject(match, function(key, value) {
        if(!multiMatch(el[key], match[key], scope, [el[key], el])) {
          result = false;
        }
      });
      return result;
    } else {
      return isEqual(el, match);
    }
  }

  function transformArgument(el, map, context, mapArgs) {
    if(isUndefined(map)) {
      return el;
    } else if(isFunction(map)) {
      return map.apply(context, mapArgs || []);
    } else if(isFunction(el[map])) {
      return el[map].call(el);
    } else {
      return el[map];
    }
  }

  // Basic array internal methods

  function arrayEach(arr, fn, startIndex, loop) {
    var length, index, i;
    if(startIndex < 0) startIndex = arr.length + startIndex;
    i = isNaN(startIndex) ? 0 : startIndex;
    length = loop === true ? arr.length + i : arr.length;
    while(i < length) {
      index = i % arr.length;
      if(!(index in arr)) {
        return iterateOverSparseArray(arr, fn, i, loop);
      } else if(fn.call(arr, arr[index], index, arr) === false) {
        break;
      }
      i++;
    }
  }

  function iterateOverSparseArray(arr, fn, fromIndex, loop) {
    var indexes = [], i;
    for(i in arr) {
      if(isArrayIndex(arr, i) && i >= fromIndex) {
        indexes.push(parseInt(i));
      }
    }
    indexes.sort().each(function(index) {
      return fn.call(arr, arr[index], index, arr);
    });
    return arr;
  }

  function isArrayIndex(arr, i) {
    return i in arr && toUInt32(i) == i && i != 0xffffffff;
  }

  function toUInt32(i) {
    return i >>> 0;
  }

  function arrayFind(arr, f, startIndex, loop, returnIndex) {
    var result, index;
    arrayEach(arr, function(el, i, arr) {
      if(multiMatch(el, f, arr, [el, i, arr])) {
        result = el;
        index = i;
        return false;
      }
    }, startIndex, loop);
    return returnIndex ? index : result;
  }

  function arrayUnique(arr, map) {
    var result = [], o = {}, transformed;
    arrayEach(arr, function(el, i) {
      transformed = map ? transformArgument(el, map, arr, [el, i, arr]) : el;
      if(!checkForElementInHashAndSet(o, transformed)) {
        result.push(el);
      }
    })
    return result;
  }

  function arrayIntersect(arr1, arr2, subtract) {
    var result = [], o = {};
    arr2.each(function(el) {
      checkForElementInHashAndSet(o, el);
    });
    arr1.each(function(el) {
      var stringified = stringify(el),
          isReference = !objectIsMatchedByValue(el);
      // Add the result to the array if:
      // 1. We're subtracting intersections or it doesn't already exist in the result and
      // 2. It exists in the compared array and we're adding, or it doesn't exist and we're removing.
      if(elementExistsInHash(o, stringified, el, isReference) != subtract) {
        discardElementFromHash(o, stringified, el, isReference);
        result.push(el);
      }
    });
    return result;
  }

  function arrayFlatten(arr, level, current) {
    level = level || Infinity;
    current = current || 0;
    var result = [];
    arrayEach(arr, function(el) {
      if(isArray(el) && current < level) {
        result = result.concat(arrayFlatten(el, level, current + 1));
      } else {
        result.push(el);
      }
    });
    return result;
  }

  function flatArguments(args) {
    var result = [];
    multiArgs(args, function(arg) {
      result = result.concat(arg);
    });
    return result;
  }

  function elementExistsInHash(hash, key, element, isReference) {
    var exists = key in hash;
    if(isReference) {
      if(!hash[key]) {
        hash[key] = [];
      }
      exists = hash[key].indexOf(element) !== -1;
    }
    return exists;
  }

  function checkForElementInHashAndSet(hash, element) {
    var stringified = stringify(element),
        isReference = !objectIsMatchedByValue(element),
        exists = elementExistsInHash(hash, stringified, element, isReference);
    if(isReference) {
      hash[stringified].push(element);
    } else {
      hash[stringified] = element;
    }
    return exists;
  }

  function discardElementFromHash(hash, key, element, isReference) {
    var arr, i = 0;
    if(isReference) {
      arr = hash[key];
      while(i < arr.length) {
        if(arr[i] === element) {
          arr.splice(i, 1);
        } else {
          i += 1;
        }
      }
    } else {
      delete hash[key];
    }
  }

  // Support methods

  function getMinOrMax(obj, map, which, all) {
    var edge,
        result = [],
        max = which === 'max',
        min = which === 'min',
        isArray = Array.isArray(obj);
    iterateOverObject(obj, function(key) {
      var el   = obj[key],
          test = transformArgument(el, map, obj, isArray ? [el, parseInt(key), obj] : []);
      if(isUndefined(test)) {
        throw new TypeError('Cannot compare with undefined');
      }
      if(test === edge) {
        result.push(el);
      } else if(isUndefined(edge) || (max && test > edge) || (min && test < edge)) {
        result = [el];
        edge = test;
      }
    });
    if(!isArray) result = arrayFlatten(result, 1);
    return all ? result : result[0];
  }


  // Alphanumeric collation helpers

  function collateStrings(a, b) {
    var aValue, bValue, aChar, bChar, aEquiv, bEquiv, index = 0, tiebreaker = 0;
    a = getCollationReadyString(a);
    b = getCollationReadyString(b);
    do {
      aChar  = getCollationCharacter(a, index);
      bChar  = getCollationCharacter(b, index);
      aValue = getCollationValue(aChar);
      bValue = getCollationValue(bChar);
      if(aValue === -1 || bValue === -1) {
        aValue = a.charCodeAt(index) || null;
        bValue = b.charCodeAt(index) || null;
      }
      aEquiv = aChar !== a.charAt(index);
      bEquiv = bChar !== b.charAt(index);
      if(aEquiv !== bEquiv && tiebreaker === 0) {
        tiebreaker = aEquiv - bEquiv;
      }
      index += 1;
    } while(aValue != null && bValue != null && aValue === bValue);
    if(aValue === bValue) return tiebreaker;
    return aValue < bValue ? -1 : 1;
  }

  function getCollationReadyString(str) {
    if(array[AlphanumericSortIgnoreCase]) {
      str = str.toLowerCase();
    }
    return str.replace(array[AlphanumericSortIgnore], '');
  }

  function getCollationCharacter(str, index) {
    var chr = str.charAt(index), eq = array[AlphanumericSortEquivalents] || {};
    return eq[chr] || chr;
  }

  function getCollationValue(chr) {
    var order = array[AlphanumericSortOrder];
    if(!chr) {
      return null;
    } else {
      return order.indexOf(chr);
    }
  }

  var AlphanumericSortOrder       = 'AlphanumericSortOrder';
  var AlphanumericSortIgnore      = 'AlphanumericSortIgnore';
  var AlphanumericSortIgnoreCase  = 'AlphanumericSortIgnoreCase';
  var AlphanumericSortEquivalents = 'AlphanumericSortEquivalents';



  function buildEnhancements() {
    var callbackCheck = function() { var a = arguments; return a.length > 0 && !isFunction(a[0]); };
    extendSimilar(array, true, callbackCheck, 'map,every,all,some,any,none,filter', function(methods, name) {
      methods[name] = function(f) {
        return this[name](function(el, index) {
          if(name === 'map') {
            return transformArgument(el, f, this, [el, index, this]);
          } else {
            return multiMatch(el, f, this, [el, index, this]);
          }
        });
      }
    });
  }

  function buildAlphanumericSort() {
    var order = 'AÁÀÂÃĄBCĆČÇDĎÐEÉÈĚÊËĘFGĞHıIÍÌİÎÏJKLŁMNŃŇÑOÓÒÔPQRŘSŚŠŞTŤUÚÙŮÛÜVWXYÝZŹŻŽÞÆŒØÕÅÄÖ';
    var equiv = 'AÁÀÂÃÄ,CÇ,EÉÈÊË,IÍÌİÎÏ,OÓÒÔÕÖ,Sß,UÚÙÛÜ';
    array[AlphanumericSortOrder] = order.split('').map(function(str) {
      return str + str.toLowerCase();
    }).join('');
    var equivalents = {};
    arrayEach(equiv.split(','), function(set) {
      var equivalent = set.charAt(0);
      arrayEach(set.slice(1).split(''), function(chr) {
        equivalents[chr] = equivalent;
        equivalents[chr.toLowerCase()] = equivalent.toLowerCase();
      });
    });
    array[AlphanumericSortIgnoreCase] = true;
    array[AlphanumericSortEquivalents] = equivalents;
  }

  extend(array, false, false, {

    /***
     *
     * @method Array.create(<obj1>, <obj2>, ...)
     * @returns Array
     * @short Alternate array constructor.
     * @extra This method will create a single array by calling %concat% on all arguments passed. In addition to ensuring that an unknown variable is in a single, flat array (the standard constructor will create nested arrays, this one will not), it is also a useful shorthand to convert a function's arguments object into a standard array.
     * @example
     *
     *   Array.create('one', true, 3)   -> ['one', true, 3]
     *   Array.create(['one', true, 3]) -> ['one', true, 3]
     +   Array.create(function(n) {
     *     return arguments;
     *   }('howdy', 'doody'));
     *
     ***/
    'create': function() {
      var result = [], tmp;
      multiArgs(arguments, function(a) {
        if(isObjectPrimitive(a)) {
          try {
            tmp = array.prototype.slice.call(a, 0);
            if(tmp.length > 0) {
              a = tmp;
            }
          } catch(e) {};
        }
        result = result.concat(a);
      });
      return result;
    }

  });

  extend(array, true, false, {

    /***
     * @method find(<f>, [index] = 0, [loop] = false)
     * @returns Mixed
     * @short Returns the first element that matches <f>.
     * @extra <f> will match a string, number, array, object, or alternately test against a function or regex. Starts at [index], and will continue once from index = 0 if [loop] is true. This method implements @array_matching.
     * @example
     *
     +   [{a:1,b:2},{a:1,b:3},{a:1,b:4}].find(function(n) {
     *     return n['a'] == 1;
     *   });                                     -> {a:1,b:3}
     *   ['cuba','japan','canada'].find(/^c/, 2) -> 'canada'
     *
     ***/
    'find': function(f, index, loop) {
      return arrayFind(this, f, index, loop);
    },

    /***
     * @method findAll(<f>, [index] = 0, [loop] = false)
     * @returns Array
     * @short Returns all elements that match <f>.
     * @extra <f> will match a string, number, array, object, or alternately test against a function or regex. Starts at [index], and will continue once from index = 0 if [loop] is true. This method implements @array_matching.
     * @example
     *
     +   [{a:1,b:2},{a:1,b:3},{a:2,b:4}].findAll(function(n) {
     *     return n['a'] == 1;
     *   });                                        -> [{a:1,b:3},{a:1,b:4}]
     *   ['cuba','japan','canada'].findAll(/^c/)    -> 'cuba','canada'
     *   ['cuba','japan','canada'].findAll(/^c/, 2) -> 'canada'
     *
     ***/
    'findAll': function(f, index, loop) {
      var result = [];
      arrayEach(this, function(el, i, arr) {
        if(multiMatch(el, f, arr, [el, i, arr])) {
          result.push(el);
        }
      }, index, loop);
      return result;
    },

    /***
     * @method findIndex(<f>, [startIndex] = 0, [loop] = false)
     * @returns Number
     * @short Returns the index of the first element that matches <f> or -1 if not found.
     * @extra This method has a few notable differences to native %indexOf%. Although <f> will similarly match a primitive such as a string or number, it will also match deep objects and arrays that are not equal by reference (%===%). Additionally, if a function is passed it will be run as a matching function (similar to the behavior of %Array#filter%) rather than attempting to find that function itself by reference in the array. Starts at [index], and will continue once from index = 0 if [loop] is true. This method implements @array_matching.
     * @example
     *
     +   [1,2,3,4].findIndex(3);  -> 2
     +   [1,2,3,4].findIndex(function(n) {
     *     return n % 2 == 0;
     *   }); -> 1
     +   ['one','two','three'].findIndex(/th/); -> 2
     *
     ***/
    'findIndex': function(f, startIndex, loop) {
      var index = arrayFind(this, f, startIndex, loop, true);
      return isUndefined(index) ? -1 : index;
    },

    /***
     * @method count(<f>)
     * @returns Number
     * @short Counts all elements in the array that match <f>.
     * @extra <f> will match a string, number, array, object, or alternately test against a function or regex. This method implements @array_matching.
     * @example
     *
     *   [1,2,3,1].count(1)       -> 2
     *   ['a','b','c'].count(/b/) -> 1
     +   [{a:1},{b:2}].count(function(n) {
     *     return n['a'] > 1;
     *   });                      -> 0
     *
     ***/
    'count': function(f) {
      if(isUndefined(f)) return this.length;
      return this.findAll(f).length;
    },

    /***
     * @method removeAt(<start>, [end])
     * @returns Array
     * @short Removes element at <start>. If [end] is specified, removes the range between <start> and [end]. This method will change the array! If you don't intend the array to be changed use %clone% first.
     * @example
     *
     *   ['a','b','c'].removeAt(0) -> ['b','c']
     *   [1,2,3,4].removeAt(1, 3)  -> [1]
     *
     ***/
    'removeAt': function(start, end) {
      var i, len;
      if(isUndefined(start)) return this;
      if(isUndefined(end)) end = start;
      for(i = 0, len = end - start; i <= len; i++) {
        this.splice(start, 1);
      }
      return this;
    },

    /***
     * @method include(<el>, [index])
     * @returns Array
     * @short Adds <el> to the array.
     * @extra This is a non-destructive alias for %add%. It will not change the original array.
     * @example
     *
     *   [1,2,3,4].include(5)       -> [1,2,3,4,5]
     *   [1,2,3,4].include(8, 1)    -> [1,8,2,3,4]
     *   [1,2,3,4].include([5,6,7]) -> [1,2,3,4,5,6,7]
     *
     ***/
    'include': function(el, index) {
      return this.clone().add(el, index);
    },

    /***
     * @method exclude([f1], [f2], ...)
     * @returns Array
     * @short Removes any element in the array that matches [f1], [f2], etc.
     * @extra This is a non-destructive alias for %remove%. It will not change the original array. This method implements @array_matching.
     * @example
     *
     *   [1,2,3].exclude(3)         -> [1,2]
     *   ['a','b','c'].exclude(/b/) -> ['a','c']
     +   [{a:1},{b:2}].exclude(function(n) {
     *     return n['a'] == 1;
     *   });                       -> [{b:2}]
     *
     ***/
    'exclude': function() {
      return array.prototype.remove.apply(this.clone(), arguments);
    },

    /***
     * @method clone()
     * @returns Array
     * @short Makes a shallow clone of the array.
     * @example
     *
     *   [1,2,3].clone() -> [1,2,3]
     *
     ***/
    'clone': function() {
      return simpleMerge([], this);
    },

    /***
     * @method unique([map] = null)
     * @returns Array
     * @short Removes all duplicate elements in the array.
     * @extra [map] may be a function mapping the value to be uniqued on or a string acting as a shortcut. This is most commonly used when you have a key that ensures the object's uniqueness, and don't need to check all fields. This method will also correctly operate on arrays of objects.
     * @example
     *
     *   [1,2,2,3].unique()                 -> [1,2,3]
     *   [{foo:'bar'},{foo:'bar'}].unique() -> [{foo:'bar'}]
     +   [{foo:'bar'},{foo:'bar'}].unique(function(obj){
     *     return obj.foo;
     *   }); -> [{foo:'bar'}]
     *   [{foo:'bar'},{foo:'bar'}].unique('foo') -> [{foo:'bar'}]
     *
     ***/
    'unique': function(map) {
      return arrayUnique(this, map);
    },

    /***
     * @method flatten([limit] = Infinity)
     * @returns Array
     * @short Returns a flattened, one-dimensional copy of the array.
     * @extra You can optionally specify a [limit], which will only flatten that depth.
     * @example
     *
     *   [[1], 2, [3]].flatten()      -> [1,2,3]
     *   [['a'],[],'b','c'].flatten() -> ['a','b','c']
     *
     ***/
    'flatten': function(limit) {
      return arrayFlatten(this, limit);
    },

    /***
     * @method union([a1], [a2], ...)
     * @returns Array
     * @short Returns an array containing all elements in all arrays with duplicates removed.
     * @extra This method will also correctly operate on arrays of objects.
     * @example
     *
     *   [1,3,5].union([5,7,9])     -> [1,3,5,7,9]
     *   ['a','b'].union(['b','c']) -> ['a','b','c']
     *
     ***/
    'union': function() {
      return arrayUnique(this.concat(flatArguments(arguments)));
    },

    /***
     * @method intersect([a1], [a2], ...)
     * @returns Array
     * @short Returns an array containing the elements all arrays have in common.
     * @extra This method will also correctly operate on arrays of objects.
     * @example
     *
     *   [1,3,5].intersect([5,7,9])   -> [5]
     *   ['a','b'].intersect('b','c') -> ['b']
     *
     ***/
    'intersect': function() {
      return arrayIntersect(this, flatArguments(arguments), false);
    },

    /***
     * @method subtract([a1], [a2], ...)
     * @returns Array
     * @short Subtracts from the array all elements in [a1], [a2], etc.
     * @extra This method will also correctly operate on arrays of objects.
     * @example
     *
     *   [1,3,5].subtract([5,7,9])   -> [1,3]
     *   [1,3,5].subtract([3],[5])   -> [1]
     *   ['a','b'].subtract('b','c') -> ['a']
     *
     ***/
    'subtract': function(a) {
      return arrayIntersect(this, flatArguments(arguments), true);
    },

    /***
     * @method at(<index>, [loop] = true)
     * @returns Mixed
     * @short Gets the element(s) at a given index.
     * @extra When [loop] is true, overshooting the end of the array (or the beginning) will begin counting from the other end. As an alternate syntax, passing multiple indexes will get the elements at those indexes.
     * @example
     *
     *   [1,2,3].at(0)        -> 1
     *   [1,2,3].at(2)        -> 3
     *   [1,2,3].at(4)        -> 2
     *   [1,2,3].at(4, false) -> null
     *   [1,2,3].at(-1)       -> 3
     *   [1,2,3].at(0,1)      -> [1,2]
     *
     ***/
    'at': function() {
      return entryAtIndex(this, arguments);
    },

    /***
     * @method first([num] = 1)
     * @returns Mixed
     * @short Returns the first element(s) in the array.
     * @extra When <num> is passed, returns the first <num> elements in the array.
     * @example
     *
     *   [1,2,3].first()        -> 1
     *   [1,2,3].first(2)       -> [1,2]
     *
     ***/
    'first': function(num) {
      if(isUndefined(num)) return this[0];
      if(num < 0) num = 0;
      return this.slice(0, num);
    },

    /***
     * @method last([num] = 1)
     * @returns Mixed
     * @short Returns the last element(s) in the array.
     * @extra When <num> is passed, returns the last <num> elements in the array.
     * @example
     *
     *   [1,2,3].last()        -> 3
     *   [1,2,3].last(2)       -> [2,3]
     *
     ***/
    'last': function(num) {
      if(isUndefined(num)) return this[this.length - 1];
      var start = this.length - num < 0 ? 0 : this.length - num;
      return this.slice(start);
    },

    /***
     * @method from(<index>)
     * @returns Array
     * @short Returns a slice of the array from <index>.
     * @example
     *
     *   [1,2,3].from(1)  -> [2,3]
     *   [1,2,3].from(2)  -> [3]
     *
     ***/
    'from': function(num) {
      return this.slice(num);
    },

    /***
     * @method to(<index>)
     * @returns Array
     * @short Returns a slice of the array up to <index>.
     * @example
     *
     *   [1,2,3].to(1)  -> [1]
     *   [1,2,3].to(2)  -> [1,2]
     *
     ***/
    'to': function(num) {
      if(isUndefined(num)) num = this.length;
      return this.slice(0, num);
    },

    /***
     * @method min([map], [all] = false)
     * @returns Mixed
     * @short Returns the element in the array with the lowest value.
     * @extra [map] may be a function mapping the value to be checked or a string acting as a shortcut. If [all] is true, will return all min values in an array.
     * @example
     *
     *   [1,2,3].min()                          -> 1
     *   ['fee','fo','fum'].min('length')       -> 'fo'
     *   ['fee','fo','fum'].min('length', true) -> ['fo']
     +   ['fee','fo','fum'].min(function(n) {
     *     return n.length;
     *   });                              -> ['fo']
     +   [{a:3,a:2}].min(function(n) {
     *     return n['a'];
     *   });                              -> [{a:2}]
     *
     ***/
    'min': function(map, all) {
      return getMinOrMax(this, map, 'min', all);
    },

    /***
     * @method max([map], [all] = false)
     * @returns Mixed
     * @short Returns the element in the array with the greatest value.
     * @extra [map] may be a function mapping the value to be checked or a string acting as a shortcut. If [all] is true, will return all max values in an array.
     * @example
     *
     *   [1,2,3].max()                          -> 3
     *   ['fee','fo','fum'].max('length')       -> 'fee'
     *   ['fee','fo','fum'].max('length', true) -> ['fee']
     +   [{a:3,a:2}].max(function(n) {
     *     return n['a'];
     *   });                              -> {a:3}
     *
     ***/
    'max': function(map, all) {
      return getMinOrMax(this, map, 'max', all);
    },

    /***
     * @method least([map])
     * @returns Array
     * @short Returns the elements in the array with the least commonly occuring value.
     * @extra [map] may be a function mapping the value to be checked or a string acting as a shortcut.
     * @example
     *
     *   [3,2,2].least()                   -> [3]
     *   ['fe','fo','fum'].least('length') -> ['fum']
     +   [{age:35,name:'ken'},{age:12,name:'bob'},{age:12,name:'ted'}].least(function(n) {
     *     return n.age;
     *   });                               -> [{age:35,name:'ken'}]
     *
     ***/
    'least': function(map, all) {
      return getMinOrMax(this.groupBy.apply(this, [map]), 'length', 'min', all);
    },

    /***
     * @method most([map])
     * @returns Array
     * @short Returns the elements in the array with the most commonly occuring value.
     * @extra [map] may be a function mapping the value to be checked or a string acting as a shortcut.
     * @example
     *
     *   [3,2,2].most()                   -> [2]
     *   ['fe','fo','fum'].most('length') -> ['fe','fo']
     +   [{age:35,name:'ken'},{age:12,name:'bob'},{age:12,name:'ted'}].most(function(n) {
     *     return n.age;
     *   });                              -> [{age:12,name:'bob'},{age:12,name:'ted'}]
     *
     ***/
    'most': function(map, all) {
      return getMinOrMax(this.groupBy.apply(this, [map]), 'length', 'max', all);
    },

    /***
     * @method sum([map])
     * @returns Number
     * @short Sums all values in the array.
     * @extra [map] may be a function mapping the value to be summed or a string acting as a shortcut.
     * @example
     *
     *   [1,2,2].sum()                           -> 5
     +   [{age:35},{age:12},{age:12}].sum(function(n) {
     *     return n.age;
     *   });                                     -> 59
     *   [{age:35},{age:12},{age:12}].sum('age') -> 59
     *
     ***/
    'sum': function(map) {
      var arr = map ? this.map(map) : this;
      return arr.length > 0 ? arr.reduce(function(a,b) { return a + b; }) : 0;
    },

    /***
     * @method average([map])
     * @returns Number
     * @short Averages all values in the array.
     * @extra [map] may be a function mapping the value to be averaged or a string acting as a shortcut.
     * @example
     *
     *   [1,2,3].average()                           -> 2
     +   [{age:35},{age:11},{age:11}].average(function(n) {
     *     return n.age;
     *   });                                         -> 19
     *   [{age:35},{age:11},{age:11}].average('age') -> 19
     *
     ***/
    'average': function(map) {
      var arr = map ? this.map(map) : this;
      return arr.length > 0 ? arr.sum() / arr.length : 0;
    },

    /***
     * @method inGroups(<num>, [padding])
     * @returns Array
     * @short Groups the array into <num> arrays.
     * @extra [padding] specifies a value with which to pad the last array so that they are all equal length.
     * @example
     *
     *   [1,2,3,4,5,6,7].inGroups(3)         -> [ [1,2,3], [4,5,6], [7] ]
     *   [1,2,3,4,5,6,7].inGroups(3, 'none') -> [ [1,2,3], [4,5,6], [7,'none','none'] ]
     *
     ***/
    'inGroups': function(num, padding) {
      var pad = arguments.length > 1;
      var arr = this;
      var result = [];
      var divisor = ceil(this.length / num);
      getRange(0, num - 1, function(i) {
        var index = i * divisor;
        var group = arr.slice(index, index + divisor);
        if(pad && group.length < divisor) {
          getRange(1, divisor - group.length, function() {
            group = group.add(padding);
          });
        }
        result.push(group);
      });
      return result;
    },

    /***
     * @method inGroupsOf(<num>, [padding] = null)
     * @returns Array
     * @short Groups the array into arrays of <num> elements each.
     * @extra [padding] specifies a value with which to pad the last array so that they are all equal length.
     * @example
     *
     *   [1,2,3,4,5,6,7].inGroupsOf(4)         -> [ [1,2,3,4], [5,6,7] ]
     *   [1,2,3,4,5,6,7].inGroupsOf(4, 'none') -> [ [1,2,3,4], [5,6,7,'none'] ]
     *
     ***/
    'inGroupsOf': function(num, padding) {
      var result = [], len = this.length, arr = this, group;
      if(len === 0 || num === 0) return arr;
      if(isUndefined(num)) num = 1;
      if(isUndefined(padding)) padding = null;
      getRange(0, ceil(len / num) - 1, function(i) {
        group = arr.slice(num * i, num * i + num);
        while(group.length < num) {
          group.push(padding);
        }
        result.push(group);
      });
      return result;
    },

    /***
     * @method isEmpty()
     * @returns Boolean
     * @short Returns true if the array is empty.
     * @extra This is true if the array has a length of zero, or contains only %undefined%, %null%, or %NaN%.
     * @example
     *
     *   [].isEmpty()               -> true
     *   [null,undefined].isEmpty() -> true
     *
     ***/
    'isEmpty': function() {
      return this.compact().length == 0;
    },

    /***
     * @method sortBy(<map>, [desc] = false)
     * @returns Array
     * @short Sorts the array by <map>.
     * @extra <map> may be a function, a string acting as a shortcut, or blank (direct comparison of array values). [desc] will sort the array in descending order. When the field being sorted on is a string, the resulting order will be determined by an internal collation algorithm that is optimized for major Western languages, but can be customized. For more information see @array_sorting.
     * @example
     *
     *   ['world','a','new'].sortBy('length')       -> ['a','new','world']
     *   ['world','a','new'].sortBy('length', true) -> ['world','new','a']
     +   [{age:72},{age:13},{age:18}].sortBy(function(n) {
     *     return n.age;
     *   });                                        -> [{age:13},{age:18},{age:72}]
     *
     ***/
    'sortBy': function(map, desc) {
      var arr = this.clone();
      arr.sort(function(a, b) {
        var aProperty, bProperty, comp;
        aProperty = transformArgument(a, map, arr, [a]);
        bProperty = transformArgument(b, map, arr, [b]);
        if(isString(aProperty) && isString(bProperty)) {
          comp = collateStrings(aProperty, bProperty);
        } else if(aProperty < bProperty) {
          comp = -1;
        } else if(aProperty > bProperty) {
          comp = 1;
        } else {
          comp = 0;
        }
        return comp * (desc ? -1 : 1);
      });
      return arr;
    },

    /***
     * @method randomize()
     * @returns Array
     * @short Returns a copy of the array with the elements randomized.
     * @extra Uses Fisher-Yates algorithm.
     * @example
     *
     *   [1,2,3,4].randomize()  -> [?,?,?,?]
     *
     ***/
    'randomize': function() {
      var arr = this.concat(), i = arr.length, j, x;
      while(i) {
        j = (math.random() * i) | 0;
        x = arr[--i];
        arr[i] = arr[j];
        arr[j] = x;
      }
      return arr;
    },

    /***
     * @method zip([arr1], [arr2], ...)
     * @returns Array
     * @short Merges multiple arrays together.
     * @extra This method "zips up" smaller arrays into one large whose elements are "all elements at index 0", "all elements at index 1", etc. Useful when you have associated data that is split over separated arrays. If the arrays passed have more elements than the original array, they will be discarded. If they have fewer elements, the missing elements will filled with %null%.
     * @example
     *
     *   [1,2,3].zip([4,5,6])                                       -> [[1,2], [3,4], [5,6]]
     *   ['Martin','John'].zip(['Luther','F.'], ['King','Kennedy']) -> [['Martin','Luther','King'], ['John','F.','Kennedy']]
     *
     ***/
    'zip': function() {
      var args = multiArgs(arguments);
      return this.map(function(el, i) {
        return [el].concat(args.map(function(k) {
          return (i in k) ? k[i] : null;
        }));
      });
    },

    /***
     * @method sample([num])
     * @returns Mixed
     * @short Returns a random element from the array.
     * @extra If [num] is passed, will return [num] samples from the array.
     * @example
     *
     *   [1,2,3,4,5].sample()  -> // Random element
     *   [1,2,3,4,5].sample(3) -> // Array of 3 random elements
     *
     ***/
    'sample': function(num) {
      var arr = this.randomize();
      return arguments.length > 0 ? arr.slice(0, num) : arr[0];
    },

    /***
     * @method each(<fn>, [index] = 0, [loop] = false)
     * @returns Array
     * @short Runs <fn> against each element in the array. Enhanced version of %Array#forEach%.
     * @extra Parameters passed to <fn> are identical to %forEach%, ie. the first parameter is the current element, second parameter is the current index, and third parameter is the array itself. If <fn> returns %false% at any time it will break out of the loop. Once %each% finishes, it will return the array. If [index] is passed, <fn> will begin at that index and work its way to the end. If [loop] is true, it will then start over from the beginning of the array and continue until it reaches [index] - 1.
     * @example
     *
     *   [1,2,3,4].each(function(n) {
     *     // Called 4 times: 1, 2, 3, 4
     *   });
     *   [1,2,3,4].each(function(n) {
     *     // Called 4 times: 3, 4, 1, 2
     *   }, 2, true);
     *
     ***/
    'each': function(fn, index, loop) {
      arrayEach(this, fn, index, loop);
      return this;
    },

    /***
     * @method add(<el>, [index])
     * @returns Array
     * @short Adds <el> to the array.
     * @extra If [index] is specified, it will add at [index], otherwise adds to the end of the array. %add% behaves like %concat% in that if <el> is an array it will be joined, not inserted. This method will change the array! Use %include% for a non-destructive alias. Also, %insert% is provided as an alias that reads better when using an index.
     * @example
     *
     *   [1,2,3,4].add(5)       -> [1,2,3,4,5]
     *   [1,2,3,4].add([5,6,7]) -> [1,2,3,4,5,6,7]
     *   [1,2,3,4].insert(8, 1) -> [1,8,2,3,4]
     *
     ***/
    'add': function(el, index) {
      if(!isNumber(number(index)) || isNaN(index)) index = this.length;
      array.prototype.splice.apply(this, [index, 0].concat(el));
      return this;
    },

    /***
     * @method remove([f1], [f2], ...)
     * @returns Array
     * @short Removes any element in the array that matches [f1], [f2], etc.
     * @extra Will match a string, number, array, object, or alternately test against a function or regex. This method will change the array! Use %exclude% for a non-destructive alias. This method implements @array_matching.
     * @example
     *
     *   [1,2,3].remove(3)         -> [1,2]
     *   ['a','b','c'].remove(/b/) -> ['a','c']
     +   [{a:1},{b:2}].remove(function(n) {
     *     return n['a'] == 1;
     *   });                       -> [{b:2}]
     *
     ***/
    'remove': function() {
      var i, arr = this;
      multiArgs(arguments, function(f) {
        i = 0;
        while(i < arr.length) {
          if(multiMatch(arr[i], f, arr, [arr[i], i, arr])) {
            arr.splice(i, 1);
          } else {
            i++;
          }
        }
      });
      return arr;
    },

    /***
     * @method compact([all] = false)
     * @returns Array
     * @short Removes all instances of %undefined%, %null%, and %NaN% from the array.
     * @extra If [all] is %true%, all "falsy" elements will be removed. This includes empty strings, 0, and false.
     * @example
     *
     *   [1,null,2,undefined,3].compact() -> [1,2,3]
     *   [1,'',2,false,3].compact()       -> [1,'',2,false,3]
     *   [1,'',2,false,3].compact(true)   -> [1,2,3]
     *
     ***/
    'compact': function(all) {
      var result = [];
      arrayEach(this, function(el, i) {
        if(isArray(el)) {
          result.push(el.compact());
        } else if(all && el) {
          result.push(el);
        } else if(!all && el != null && el.valueOf() === el.valueOf()) {
          result.push(el);
        }
      });
      return result;
    },

    /***
     * @method groupBy(<map>, [fn])
     * @returns Object
     * @short Groups the array by <map>.
     * @extra Will return an object with keys equal to the grouped values. <map> may be a mapping function, or a string acting as a shortcut. Optionally calls [fn] for each group.
     * @example
     *
     *   ['fee','fi','fum'].groupBy('length') -> { 2: ['fi'], 3: ['fee','fum'] }
     +   [{age:35,name:'ken'},{age:15,name:'bob'}].groupBy(function(n) {
     *     return n.age;
     *   });                                  -> { 35: [{age:35,name:'ken'}], 15: [{age:15,name:'bob'}] }
     *
     ***/
    'groupBy': function(map, fn) {
      var arr = this, result = {}, key;
      arrayEach(arr, function(el, index) {
        key = transformArgument(el, map, arr, [el, index, arr]);
        if(!result[key]) result[key] = [];
        result[key].push(el);
      });
      if(fn) {
        iterateOverObject(result, fn);
      }
      return result;
    },

    /***
     * @method none(<f>)
     * @returns Boolean
     * @short Returns true if none of the elements in the array match <f>.
     * @extra <f> will match a string, number, array, object, or alternately test against a function or regex. This method implements @array_matching.
     * @example
     *
     *   [1,2,3].none(5)         -> true
     *   ['a','b','c'].none(/b/) -> false
     +   [{a:1},{b:2}].none(function(n) {
     *     return n['a'] > 1;
     *   });                     -> true
     *
     ***/
    'none': function() {
      return !this.any.apply(this, arguments);
    }


  });

  // Aliases
  extend(array, true, false, {

    /***
     * @method all()
     * @alias every
     *
     ***/
    'all': array.prototype.every,

    /*** @method any()
     * @alias some
     *
     ***/
    'any': array.prototype.some,

    /***
     * @method insert()
     * @alias add
     *
     ***/
    'insert': array.prototype.add

  });


  /***
   * Object module
   * Enumerable methods on objects
   *
   ***/

   function keysWithCoercion(obj) {
     if(obj && obj.valueOf) {
       obj = obj.valueOf();
     }
     return object.keys(obj);
   }

  /***
   * @method [enumerable](<obj>)
   * @returns Boolean
   * @short Enumerable methods in the Array package are also available to the Object class. They will perform their normal operations for every property in <obj>.
   * @extra In cases where a callback is used, instead of %element, index%, the callback will instead be passed %key, value%. Enumerable methods are also available to extended objects as instance methods.
   *
   * @set
   *   each
   *   map
   *   any
   *   all
   *   none
   *   count
   *   find
   *   findAll
   *   reduce
   *   isEmpty
   *   sum
   *   average
   *   min
   *   max
   *   least
   *   most
   *
   * @example
   *
   *   Object.any({foo:'bar'}, 'bar')            -> true
   *   Object.extended({foo:'bar'}).any('bar')   -> true
   *   Object.isEmpty({})                        -> true
   +   Object.map({ fred: { age: 52 } }, 'age'); -> { fred: 52 }
   *
   ***/

  function buildEnumerableMethods(names, mapping) {
    extendSimilar(object, false, false, names, function(methods, name) {
      methods[name] = function(obj, arg1, arg2) {
        var result, coerced = keysWithCoercion(obj);
        result = array.prototype[name].call(coerced, function(key) {
          if(mapping) {
            return transformArgument(obj[key], arg1, obj, [key, obj[key], obj]);
          } else {
            return multiMatch(obj[key], arg1, obj, [key, obj[key], obj]);
          }
        }, arg2);
        if(isArray(result)) {
          // The method has returned an array of keys so use this array
          // to build up the resulting object in the form we want it in.
          result = result.reduce(function(o, key, i) {
            o[key] = obj[key];
            return o;
          }, {});
        }
        return result;
      };
    });
    buildObjectInstanceMethods(names, Hash);
  }

  extend(object, false, false, {

    'map': function(obj, map) {
      return keysWithCoercion(obj).reduce(function(result, key) {
        result[key] = transformArgument(obj[key], map, obj, [key, obj[key], obj]);
        return result;
      }, {});
    },

    'reduce': function(obj) {
      var values = keysWithCoercion(obj).map(function(key) {
        return obj[key];
      });
      return values.reduce.apply(values, multiArgs(arguments).slice(1));
    },

    'each': function(obj, fn) {
      checkCallback(fn);
      iterateOverObject(obj, fn);
      return obj;
    },

    /***
     * @method size(<obj>)
     * @returns Number
     * @short Returns the number of properties in <obj>.
     * @extra %size% is available as an instance method on extended objects.
     * @example
     *
     *   Object.size({ foo: 'bar' }) -> 1
     *
     ***/
    'size': function (obj) {
      return keysWithCoercion(obj).length;
    }

  });

  var EnumerableFindingMethods = 'any,all,none,count,find,findAll,isEmpty'.split(',');
  var EnumerableMappingMethods = 'sum,average,min,max,least,most'.split(',');
  var EnumerableOtherMethods   = 'map,reduce,size'.split(',');
  var EnumerableMethods        = EnumerableFindingMethods.concat(EnumerableMappingMethods).concat(EnumerableOtherMethods);

  buildEnhancements();
  buildAlphanumericSort();
  buildEnumerableMethods(EnumerableFindingMethods);
  buildEnumerableMethods(EnumerableMappingMethods, true);
  buildObjectInstanceMethods(EnumerableOtherMethods, Hash);


  /***
   * @package Date
   * @dependency core
   * @description Date parsing and formatting, relative formats like "1 minute ago", Number methods like "daysAgo", localization support with default English locale definition.
   *
   ***/

  var English;
  var CurrentLocalization;

  var TimeFormat = ['ampm','hour','minute','second','ampm','utc','offset_sign','offset_hours','offset_minutes','ampm']
  var DecimalReg = '(?:[,.]\\d+)?';
  var HoursReg   = '\\d{1,2}' + DecimalReg;
  var SixtyReg   = '[0-5]\\d' + DecimalReg;
  var RequiredTime = '({t})?\\s*('+HoursReg+')(?:{h}('+SixtyReg+')?{m}(?::?('+SixtyReg+'){s})?\\s*(?:({t})|(Z)|(?:([+-])(\\d{2,2})(?::?(\\d{2,2}))?)?)?|\\s*({t}))';

  var KanjiDigits     = '〇一二三四五六七八九十百千万';
  var FullWidthDigits = '０１２３４５６７８９';
  var AsianDigitMap = {};
  var AsianDigitReg;

  var DateArgumentUnits;
  var DateUnitsReversed;
  var CoreDateFormats = [];

  var DateOutputFormats = [
    {
      token: 'f{1,4}|ms|milliseconds',
      format: function(d) {
        return callDateGet(d, 'Milliseconds');
      }
    },
    {
      token: 'ss?|seconds',
      format: function(d, len) {
        return callDateGet(d, 'Seconds');
      }
    },
    {
      token: 'mm?|minutes',
      format: function(d, len) {
        return callDateGet(d, 'Minutes');
      }
    },
    {
      token: 'hh?|hours|12hr',
      format: function(d) {
        return getShortHour(d);
      }
    },
    {
      token: 'HH?|24hr',
      format: function(d) {
        return callDateGet(d, 'Hours');
      }
    },
    {
      token: 'dd?|date|day',
      format: function(d) {
        return callDateGet(d, 'Date');
      }
    },
    {
      token: 'dow|weekday',
      word: true,
      format: function(d, loc, n, t) {
        var dow = callDateGet(d, 'Day');
        return loc['weekdays'][dow + (n - 1) * 7];
      }
    },
    {
      token: 'MM?',
      format: function(d) {
        return callDateGet(d, 'Month') + 1;
      }
    },
    {
      token: 'mon|month',
      word: true,
      format: function(d, loc, n, len) {
        var month = callDateGet(d, 'Month');
        return loc['months'][month + (n - 1) * 12];
      }
    },
    {
      token: 'y{2,4}|year',
      format: function(d) {
        return callDateGet(d, 'FullYear');
      }
    },
    {
      token: '[Tt]{1,2}',
      format: function(d, loc, n, format) {
        if(loc['ampm'].length == 0) return '';
        var hours = callDateGet(d, 'Hours');
        var str = loc['ampm'][floor(hours / 12)];
        if(format.length === 1) str = str.slice(0,1);
        if(format.slice(0,1) === 'T') str = str.toUpperCase();
        return str;
      }
    },
    {
      token: 'z{1,4}|tz|timezone',
      text: true,
      format: function(d, loc, n, format) {
        var tz = d.getUTCOffset();
        if(format == 'z' || format == 'zz') {
          tz = tz.replace(/(\d{2})(\d{2})/, function(f,h,m) {
            return padNumber(h, format.length);
          });
        }
        return tz;
      }
    },
    {
      token: 'iso(tz|timezone)',
      format: function(d) {
        return d.getUTCOffset(true);
      }
    },
    {
      token: 'ord',
      format: function(d) {
        var date = callDateGet(d, 'Date');
        return date + getOrdinalizedSuffix(date);
      }
    }
  ];

  var DateUnits = [
    {
      unit: 'year',
      method: 'FullYear',
      ambiguous: true,
      multiplier: function(d) {
        var adjust = d ? (d.isLeapYear() ? 1 : 0) : 0.25;
        return (365 + adjust) * 24 * 60 * 60 * 1000;
      }
    },
    {
      unit: 'month',
      error: 0.919, // Feb 1-28 over 1 month
      method: 'Month',
      ambiguous: true,
      multiplier: function(d, ms) {
        var days = 30.4375, inMonth;
        if(d) {
          inMonth = d.daysInMonth();
          if(ms <= inMonth.days()) {
            days = inMonth;
          }
        }
        return days * 24 * 60 * 60 * 1000;
      }
    },
    {
      unit: 'week',
      method: 'ISOWeek',
      multiplier: function() {
        return 7 * 24 * 60 * 60 * 1000;
      }
    },
    {
      unit: 'day',
      error: 0.958, // DST traversal over 1 day
      method: 'Date',
      ambiguous: true,
      multiplier: function() {
        return 24 * 60 * 60 * 1000;
      }
    },
    {
      unit: 'hour',
      method: 'Hours',
      multiplier: function() {
        return 60 * 60 * 1000;
      }
    },
    {
      unit: 'minute',
      method: 'Minutes',
      multiplier: function() {
        return 60 * 1000;
      }
    },
    {
      unit: 'second',
      method: 'Seconds',
      multiplier: function() {
        return 1000;
      }
    },
    {
      unit: 'millisecond',
      method: 'Milliseconds',
      multiplier: function() {
        return 1;
      }
    }
  ];




  // Date Localization

  var Localizations = {};

  // Localization object

  function Localization(l) {
    simpleMerge(this, l);
    this.compiledFormats = CoreDateFormats.concat();
  }

  Localization.prototype = {

    getMonth: function(n) {
      if(isNumber(n)) {
        return n - 1;
      } else {
        return this['months'].indexOf(n) % 12;
      }
    },

    getWeekday: function(n) {
      return this['weekdays'].indexOf(n) % 7;
    },

    getNumber: function(n) {
      var i;
      if(isNumber(n)) {
        return n;
      } else if(n && (i = this['numbers'].indexOf(n)) !== -1) {
        return (i + 1) % 10;
      } else {
        return 1;
      }
    },

    getNumericDate: function(n) {
      var self = this;
      return n.replace(regexp(this['num'], 'g'), function(d) {
        var num = self.getNumber(d);
        return num || '';
      });
    },

    getEnglishUnit: function(n) {
      return English['units'][this['units'].indexOf(n) % 8];
    },

    getRelativeFormat: function(adu) {
      return this.convertAdjustedToFormat(adu, adu[2] > 0 ? 'future' : 'past');
    },

    getDuration: function(ms) {
      return this.convertAdjustedToFormat(getAdjustedUnit(ms), 'duration');
    },

    hasVariant: function(code) {
      code = code || this.code;
      return code === 'en' || code === 'en-US' ? true : this['variant'];
    },

    matchAM: function(str) {
      return str === this['ampm'][0];
    },

    matchPM: function(str) {
      return str && str === this['ampm'][1];
    },

    convertAdjustedToFormat: function(adu, mode) {
      var sign, unit, mult,
          num    = adu[0],
          u      = adu[1],
          ms     = adu[2],
          format = this[mode] || this['relative'];
      if(isFunction(format)) {
        return format.call(this, num, u, ms, mode);
      }
      mult = this['plural'] && num > 1 ? 1 : 0;
      unit = this['units'][mult * 8 + u] || this['units'][u];
      if(this['capitalizeUnit']) unit = simpleCapitalize(unit);
      sign = this['modifiers'].filter(function(m) { return m.name == 'sign' && m.value == (ms > 0 ? 1 : -1); })[0];
      return format.replace(/\{(.*?)\}/g, function(full, match) {
        switch(match) {
          case 'num': return num;
          case 'unit': return unit;
          case 'sign': return sign.src;
        }
      });
    },

    getFormats: function() {
      return this.cachedFormat ? [this.cachedFormat].concat(this.compiledFormats) : this.compiledFormats;
    },

    addFormat: function(src, allowsTime, match, variant, iso) {
      var to = match || [], loc = this, time, timeMarkers, lastIsNumeral;

      src = src.replace(/\s+/g, '[-,. ]*');
      src = src.replace(/\{([^,]+?)\}/g, function(all, k) {
        var value, arr, result,
            opt   = k.match(/\?$/),
            nc    = k.match(/^(\d+)\??$/),
            slice = k.match(/(\d)(?:-(\d))?/),
            key   = k.replace(/[^a-z]+$/, '');
        if(nc) {
          value = loc['tokens'][nc[1]];
        } else if(loc[key]) {
          value = loc[key];
        } else if(loc[key + 's']) {
          value = loc[key + 's'];
          if(slice) {
            // Can't use filter here as Prototype hijacks the method and doesn't
            // pass an index, so use a simple loop instead!
            arr = [];
            value.forEach(function(m, i) {
              var mod = i % (loc['units'] ? 8 : value.length);
              if(mod >= slice[1] && mod <= (slice[2] || slice[1])) {
                arr.push(m);
              }
            });
            value = arr;
          }
          value = arrayToAlternates(value);
        }
        if(nc) {
          result = '(?:' + value + ')';
        } else {
          if(!match) {
            to.push(key);
          }
          result = '(' + value + ')';
        }
        if(opt) {
          result += '?';
        }
        return result;
      });
      if(allowsTime) {
        time = prepareTime(RequiredTime, loc, iso);
        timeMarkers = ['t','[\\s\\u3000]'].concat(loc['timeMarker']);
        lastIsNumeral = src.match(/\\d\{\d,\d\}\)+\??$/);
        addDateInputFormat(loc, '(?:' + time + ')[,\\s\\u3000]+?' + src, TimeFormat.concat(to), variant);
        addDateInputFormat(loc, src + '(?:[,\\s]*(?:' + timeMarkers.join('|') + (lastIsNumeral ? '+' : '*') +')' + time + ')?', to.concat(TimeFormat), variant);
      } else {
        addDateInputFormat(loc, src, to, variant);
      }
    }

  };


  // Localization helpers

  function getLocalization(localeCode, fallback) {
    var loc;
    if(!isString(localeCode)) localeCode = '';
    loc = Localizations[localeCode] || Localizations[localeCode.slice(0,2)];
    if(fallback === false && !loc) {
      throw new Error('Invalid locale.');
    }
    return loc || CurrentLocalization;
  }

  function setLocalization(localeCode, set) {
    var loc, canAbbreviate;

    function initializeField(name) {
      var val = loc[name];
      if(isString(val)) {
        loc[name] = val.split(',');
      } else if(!val) {
        loc[name] = [];
      }
    }

    function eachAlternate(str, fn) {
      str = str.split('+').map(function(split) {
        return split.replace(/(.+):(.+)$/, function(full, base, suffixes) {
          return suffixes.split('|').map(function(suffix) {
            return base + suffix;
          }).join('|');
        });
      }).join('|');
      return str.split('|').forEach(fn);
    }

    function setArray(name, abbreviate, multiple) {
      var arr = [];
      loc[name].forEach(function(full, i) {
        if(abbreviate) {
          full += '+' + full.slice(0,3);
        }
        eachAlternate(full, function(day, j) {
          arr[j * multiple + i] = day.toLowerCase();
        });
      });
      loc[name] = arr;
    }

    function getDigit(start, stop, allowNumbers) {
      var str = '\\d{' + start + ',' + stop + '}';
      if(allowNumbers) str += '|(?:' + arrayToAlternates(loc['numbers']) + ')+';
      return str;
    }

    function getNum() {
      var arr = ['\\d+'].concat(loc['articles']);
      if(loc['numbers']) arr = arr.concat(loc['numbers']);
      return arrayToAlternates(arr);
    }

    function setDefault(name, value) {
      loc[name] = loc[name] || value;
    }

    function setModifiers() {
      var arr = [];
      loc.modifiersByName = {};
      loc['modifiers'].push({ 'name': 'day', 'src': 'yesterday', 'value': -1 });
      loc['modifiers'].push({ 'name': 'day', 'src': 'today', 'value': 0 });
      loc['modifiers'].push({ 'name': 'day', 'src': 'tomorrow', 'value': 1 });
      loc['modifiers'].forEach(function(modifier) {
        var name = modifier.name;
        eachAlternate(modifier.src, function(t) {
          var locEntry = loc[name];
          loc.modifiersByName[t] = modifier;
          arr.push({ name: name, src: t, value: modifier.value });
          loc[name] = locEntry ? locEntry + '|' + t : t;
        });
      });
      loc['day'] += '|' + arrayToAlternates(loc['weekdays']);
      loc['modifiers'] = arr;
    }

    // Initialize the locale
    loc = new Localization(set);
    initializeField('modifiers');
    'months,weekdays,units,numbers,articles,tokens,timeMarker,ampm,timeSuffixes,dateParse,timeParse'.split(',').forEach(initializeField);

    canAbbreviate = !loc['monthSuffix'];

    setArray('months',   canAbbreviate, 12);
    setArray('weekdays', canAbbreviate, 7);
    setArray('units', false, 8);
    setArray('numbers', false, 10);

    setDefault('code', localeCode);
    setDefault('date', getDigit(1,2, loc['digitDate']));
    setDefault('year', "'\\d{2}|" + getDigit(4,4));
    setDefault('num', getNum());

    setModifiers();

    if(loc['monthSuffix']) {
      loc['month'] = getDigit(1,2);
      loc['months'] = getRange(1, 12).map(function(n) { return n + loc['monthSuffix']; });
    }
    loc['full_month'] = getDigit(1,2) + '|' + arrayToAlternates(loc['months']);

    // The order of these formats is very important. Order is reversed so formats that come
    // later will take precedence over formats that come before. This generally means that
    // more specific formats should come later, however, the {year} format should come before
    // {day}, as 2011 needs to be parsed as a year (2011) and not date (20) + hours (11)

    // If the locale has time suffixes then add a time only format for that locale
    // that is separate from the core English-based one.
    if(loc['timeSuffixes'].length > 0) {
      loc.addFormat(prepareTime(RequiredTime, loc), false, TimeFormat)
    }

    loc.addFormat('{day}', true);
    loc.addFormat('{month}' + (loc['monthSuffix'] || ''));
    loc.addFormat('{year}' + (loc['yearSuffix'] || ''));

    loc['timeParse'].forEach(function(src) {
      loc.addFormat(src, true);
    });

    loc['dateParse'].forEach(function(src) {
      loc.addFormat(src);
    });

    return Localizations[localeCode] = loc;
  }


  // General helpers

  function addDateInputFormat(locale, format, match, variant) {
    locale.compiledFormats.unshift({
      variant: variant,
      locale: locale,
      reg: regexp('^' + format + '$', 'i'),
      to: match
    });
  }

  function simpleCapitalize(str) {
    return str.slice(0,1).toUpperCase() + str.slice(1);
  }

  function arrayToAlternates(arr) {
    return arr.filter(function(el) {
      return !!el;
    }).join('|');
  }

  // Date argument helpers

  function collectDateArguments(args, allowDuration) {
    var obj, arr;
    if(isObject(args[0])) {
      return args;
    } else if (isNumber(args[0]) && !isNumber(args[1])) {
      return [args[0]];
    } else if (isString(args[0]) && allowDuration) {
      return [getDateParamsFromString(args[0]), args[1]];
    }
    obj = {};
    DateArgumentUnits.forEach(function(u,i) {
      obj[u.unit] = args[i];
    });
    return [obj];
  }

  function getDateParamsFromString(str, num) {
    var params = {};
    match = str.match(/^(\d+)?\s?(\w+?)s?$/i);
    if(match) {
      if(isUndefined(num)) {
        num = parseInt(match[1]) || 1;
      }
      params[match[2].toLowerCase()] = num;
    }
    return params;
  }

  // Date parsing helpers

  function getFormatMatch(match, arr) {
    var obj = {}, value, num;
    arr.forEach(function(key, i) {
      value = match[i + 1];
      if(isUndefined(value) || value === '') return;
      if(key === 'year') {
        obj.yearAsString = value.replace(/'/, '');
      }
      num = parseFloat(value.replace(/'/, '').replace(/,/, '.'));
      obj[key] = !isNaN(num) ? num : value.toLowerCase();
    });
    return obj;
  }

  function cleanDateInput(str) {
    str = str.trim().replace(/^just (?=now)|\.+$/i, '');
    return convertAsianDigits(str);
  }

  function convertAsianDigits(str) {
    return str.replace(AsianDigitReg, function(full, disallowed, match) {
      var sum = 0, place = 1, lastWasHolder, lastHolder;
      if(disallowed) return full;
      match.split('').reverse().forEach(function(letter) {
        var value = AsianDigitMap[letter], holder = value > 9;
        if(holder) {
          if(lastWasHolder) sum += place;
          place *= value / (lastHolder || 1);
          lastHolder = value;
        } else {
          if(lastWasHolder === false) {
            place *= 10;
          }
          sum += place * value;
        }
        lastWasHolder = holder;
      });
      if(lastWasHolder) sum += place;
      return sum;
    });
  }

  function getExtendedDate(f, localeCode, prefer, forceUTC) {
    var d = new date(), relative = false, baseLocalization, loc, format, set, unit, weekday, num, tmp, after;

    d.utc(forceUTC);

    if(isDate(f)) {
      // If the source here is already a date object, then the operation
      // is the same as cloning the date, which preserves the UTC flag.
      d.utc(f.isUTC()).setTime(f.getTime());
    } else if(isNumber(f)) {
      d.setTime(f);
    } else if(isObject(f)) {
      d.set(f, true);
      set = f;
    } else if(isString(f)) {

      // The act of getting the localization will pre-initialize
      // if it is missing and add the required formats.
      baseLocalization = getLocalization(localeCode);

      // Clean the input and convert Kanji based numerals if they exist.
      f = cleanDateInput(f);

      if(baseLocalization) {
        iterateOverObject(baseLocalization.getFormats(), function(i, dif) {
          var match = f.match(dif.reg);
          if(match) {
            format = dif;
            loc = format.locale;
            set = getFormatMatch(match, format.to, loc);

            if(set['utc']) {
              d.utc();
            }

            loc.cachedFormat = format;

            if(set.timestamp) {
              set = set.timestamp;
              return false;
            }

            // If there's a variant (crazy Endian American format), swap the month and day.
            if(format.variant && !isString(set['month']) && (isString(set['date']) || baseLocalization.hasVariant(localeCode))) {
              tmp = set['month'];
              set['month'] = set['date'];
              set['date']  = tmp;
            }

            // If the year is 2 digits then get the implied century.
            if(set['year'] && set.yearAsString.length === 2) {
              set['year'] = getYearFromAbbreviation(set['year']);
            }

            // Set the month which may be localized.
            if(set['month']) {
              set['month'] = loc.getMonth(set['month']);
              if(set['shift'] && !set['unit']) set['unit'] = loc['units'][7];
            }

            // If there is both a weekday and a date, the date takes precedence.
            if(set['weekday'] && set['date']) {
              delete set['weekday'];
            // Otherwise set a localized weekday.
            } else if(set['weekday']) {
              set['weekday'] = loc.getWeekday(set['weekday']);
              if(set['shift'] && !set['unit']) set['unit'] = loc['units'][5];
            }

            // Relative day localizations such as "today" and "tomorrow".
            if(set['day'] && (tmp = loc.modifiersByName[set['day']])) {
              set['day'] = tmp.value;
              d.reset();
              relative = true;
            // If the day is a weekday, then set that instead.
            } else if(set['day'] && (weekday = loc.getWeekday(set['day'])) > -1) {
              delete set['day'];
              if(set['num'] && set['month']) {
                // If we have "the 2nd tuesday of June", set the day to the beginning of the month, then
                // look ahead to set the weekday after all other properties have been set. The weekday needs
                // to be set after the actual set because it requires overriding the "prefer" argument which
                // could unintentionally send the year into the future, past, etc.
                after = function() {
                  var w = d.getWeekday();
                  d.setWeekday((7 * (set['num'] - 1)) + (w > weekday ? weekday + 7 : weekday));
                }
                set['day'] = 1;
              } else {
                set['weekday'] = weekday;
              }
            }

            if(set['date'] && !isNumber(set['date'])) {
              set['date'] = loc.getNumericDate(set['date']);
            }

            // If the time is 1pm-11pm advance the time by 12 hours.
            if(loc.matchPM(set['ampm']) && set['hour'] < 12) {
              set['hour'] += 12;
            } else if(loc.matchAM(set['ampm']) && set['hour'] === 12) {
              set['hour'] = 0;
            }

            // Adjust for timezone offset
            if('offset_hours' in set || 'offset_minutes' in set) {
              d.utc();
              set['offset_minutes'] = set['offset_minutes'] || 0;
              set['offset_minutes'] += set['offset_hours'] * 60;
              if(set['offset_sign'] === '-') {
                set['offset_minutes'] *= -1;
              }
              set['minute'] -= set['offset_minutes'];
            }

            // Date has a unit like "days", "months", etc. are all relative to the current date.
            if(set['unit']) {
              relative = true;
              num = loc.getNumber(set['num']);
              unit = loc.getEnglishUnit(set['unit']);

              // Shift and unit, ie "next month", "last week", etc.
              if(set['shift'] || set['edge']) {
                num *= (tmp = loc.modifiersByName[set['shift']]) ? tmp.value : 0;

                // Relative month and static date: "the 15th of last month"
                if(unit === 'month' && isDefined(set['date'])) {
                  d.set({ 'day': set['date'] }, true);
                  delete set['date'];
                }

                // Relative year and static month/date: "June 15th of last year"
                if(unit === 'year' && isDefined(set['month'])) {
                  d.set({ 'month': set['month'], 'day': set['date'] }, true);
                  delete set['month'];
                  delete set['date'];
                }
              }
              // Unit and sign, ie "months ago", "weeks from now", etc.
              if(set['sign'] && (tmp = loc.modifiersByName[set['sign']])) {
                num *= tmp.value;
              }

              // Units can be with non-relative dates, set here. ie "the day after monday"
              if(isDefined(set['weekday'])) {
                d.set({'weekday': set['weekday'] }, true);
                delete set['weekday'];
              }

              // Finally shift the unit.
              set[unit] = (set[unit] || 0) + num;
            }

            if(set['year_sign'] === '-') {
              set['year'] *= -1;
            }

            DateUnitsReversed.slice(1,4).forEach(function(u, i) {
              var value = set[u.unit], fraction = value % 1;
              if(fraction) {
                set[DateUnitsReversed[i].unit] = round(fraction * (u.unit === 'second' ? 1000 : 60));
                set[u.unit] = floor(value);
              }
            });
            return false;
          }
        });
      }
      if(!format) {
        // The Date constructor does something tricky like checking the number
        // of arguments so simply passing in undefined won't work.
        if(f !== 'now') {
          d = new date(f);
        }
        if(forceUTC) {
          // Falling back to system date here which cannot be parsed as UTC,
          // so if we're forcing UTC then simply add the offset.
          d.addMinutes(-d.getTimezoneOffset());
        }
      } else if(relative) {
        d.advance(set);
      } else {
        if(d._utc) {
          // UTC times can traverse into other days or even months,
          // so preemtively reset the time here to prevent this.
          d.reset();
        }
        updateDate(d, set, true, false, prefer);
      }

      // If there is an "edge" it needs to be set after the
      // other fields are set. ie "the end of February"
      if(set && set['edge']) {
        tmp = loc.modifiersByName[set['edge']];
        iterateOverObject(DateUnitsReversed.slice(4), function(i, u) {
          if(isDefined(set[u.unit])) {
            unit = u.unit;
            return false;
          }
        });
        if(unit === 'year') set.specificity = 'month';
        else if(unit === 'month' || unit === 'week') set.specificity = 'day';
        d[(tmp.value < 0 ? 'endOf' : 'beginningOf') + simpleCapitalize(unit)]();
        // This value of -2 is arbitrary but it's a nice clean way to hook into this system.
        if(tmp.value === -2) d.reset();
      }
      if(after) {
        after();
      }
      // A date created by parsing a string presumes that the format *itself* is UTC, but
      // not that the date, once created, should be manipulated as such. In other words,
      // if you are creating a date object from a server time "2012-11-15T12:00:00Z",
      // in the majority of cases you are using it to create a date that will, after creation,
      // be manipulated as local, so reset the utc flag here.
      d.utc(false);
    }
    return {
      date: d,
      set: set
    }
  }

  // If the year is two digits, add the most appropriate century prefix.
  function getYearFromAbbreviation(year) {
    return round(callDateGet(new date(), 'FullYear') / 100) * 100 - round(year / 100) * 100 + year;
  }

  function getShortHour(d) {
    var hours = callDateGet(d, 'Hours');
    return hours === 0 ? 12 : hours - (floor(hours / 13) * 12);
  }

  // weeksSince won't work here as the result needs to be floored, not rounded.
  function getWeekNumber(date) {
    date = date.clone();
    var dow = callDateGet(date, 'Day') || 7;
    date.addDays(4 - dow).reset();
    return 1 + floor(date.daysSince(date.clone().beginningOfYear()) / 7);
  }

  function getAdjustedUnit(ms) {
    var next, ams = math.abs(ms), value = ams, unit = 0;
    DateUnitsReversed.slice(1).forEach(function(u, i) {
      next = floor(round(ams / u.multiplier() * 10) / 10);
      if(next >= 1) {
        value = next;
        unit = i + 1;
      }
    });
    return [value, unit, ms];
  }

  function getRelativeWithMonthFallback(date) {
    var adu = getAdjustedUnit(date.millisecondsFromNow());
    if(allowMonthFallback(date, adu)) {
      // If the adjusted unit is in months, then better to use
      // the "monthsfromNow" which applies a special error margin
      // for edge cases such as Jan-09 - Mar-09 being less than
      // 2 months apart (when using a strict numeric definition).
      // The third "ms" element in the array will handle the sign
      // (past or future), so simply take the absolute value here.
      adu[0] = math.abs(date.monthsFromNow());
      adu[1] = 6;
    }
    return adu;
  }

  function allowMonthFallback(date, adu) {
    // Allow falling back to monthsFromNow if the unit is in months...
    return adu[1] === 6 ||
    // ...or if it's === 4 weeks and there are more days than in the given month
    (adu[1] === 5 && adu[0] === 4 && date.daysFromNow() >= new Date().daysInMonth());
  }


  // Date formatting helpers

  function formatDate(date, format, relative, localeCode) {
    var adu, loc = getLocalization(localeCode), caps = regexp(/^[A-Z]/), value, shortcut;
    if(!date.isValid()) {
      return 'Invalid Date';
    } else if(Date[format]) {
      format = Date[format];
    } else if(isFunction(format)) {
      adu = getRelativeWithMonthFallback(date);
      format = format.apply(date, adu.concat(loc));
    }
    if(!format && relative) {
      adu = adu || getRelativeWithMonthFallback(date);
      // Adjust up if time is in ms, as this doesn't
      // look very good for a standard relative date.
      if(adu[1] === 0) {
        adu[1] = 1;
        adu[0] = 1;
      }
      return loc.getRelativeFormat(adu);
    }

    format = format || 'long';
    format = loc[format] || format;

    DateOutputFormats.forEach(function(dof) {
      format = format.replace(regexp('\\{('+dof.token+')(\\d)?\\}', dof.word ? 'i' : ''), function(m,t,d) {
        var val = dof.format(date, loc, d || 1, t), l = t.length, one = t.match(/^(.)\1+$/);
        if(dof.word) {
          if(l === 3) val = val.slice(0,3);
          if(one || t.match(caps)) val = simpleCapitalize(val);
        } else if(one && !dof.text) {
          val = (isNumber(val) ? padNumber(val, l) : val.toString()).slice(-l);
        }
        return val;
      });
    });
    return format;
  }

  // Date comparison helpers

  function compareDate(d, find, buffer, forceUTC) {
    var p, t, min, max, minOffset, maxOffset, override, capitalized, accuracy = 0, loBuffer = 0, hiBuffer = 0;
    p = getExtendedDate(find, null, null, forceUTC);
    if(buffer > 0) {
      loBuffer = hiBuffer = buffer;
      override = true;
    }
    if(!p.date.isValid()) return false;
    if(p.set && p.set.specificity) {
      DateUnits.forEach(function(u, i) {
        if(u.unit === p.set.specificity) {
          accuracy = u.multiplier(p.date, d - p.date) - 1;
        }
      });
      capitalized = simpleCapitalize(p.set.specificity);
      if(p.set['edge'] || p.set['shift']) {
        p.date['beginningOf' + capitalized]();
      }
      if(p.set.specificity === 'month') {
        max = p.date.clone()['endOf' + capitalized]().getTime();
      }
      if(!override && p.set['sign'] && p.set.specificity != 'millisecond') {
        // If the time is relative, there can occasionally be an disparity between the relative date
        // and "now", which it is being compared to, so set an extra buffer to account for this.
        loBuffer = 50;
        hiBuffer = -50;
      }
    }
    t   = d.getTime();
    min = p.date.getTime();
    max = max || (min + accuracy);
    max = compensateForTimezoneTraversal(d, min, max);
    return t >= (min - loBuffer) && t <= (max + hiBuffer);
  }

  function compensateForTimezoneTraversal(d, min, max) {
    var dMin, dMax, minOffset, maxOffset;
    dMin = new Date(min);
    dMax = new Date(max).utc(d.isUTC());
    if(callDateGet(dMax, 'Hours') !== 23) {
      minOffset = dMin.getTimezoneOffset();
      maxOffset = dMax.getTimezoneOffset();
      if(minOffset !== maxOffset) {
        max += (maxOffset - minOffset).minutes();
      }
    }
    return max;
  }

  function updateDate(d, params, reset, advance, prefer) {
    var weekday, specificityIndex;

    function getParam(key) {
      return isDefined(params[key]) ? params[key] : params[key + 's'];
    }

    function paramExists(key) {
      return isDefined(getParam(key));
    }

    function uniqueParamExists(key, isDay) {
      return paramExists(key) || (isDay && paramExists('weekday'));
    }

    function canDisambiguate() {
      var now = new date;
      return (prefer === -1 && d > now) || (prefer === 1 && d < now);
    }

    if(isNumber(params) && advance) {
      // If param is a number and we're advancing, the number is presumed to be milliseconds.
      params = { 'milliseconds': params };
    } else if(isNumber(params)) {
      // Otherwise just set the timestamp and return.
      d.setTime(params);
      return d;
    }

    // "date" can also be passed for the day
    if(isDefined(params['date'])) {
      params['day'] = params['date'];
    }

    // Reset any unit lower than the least specific unit set. Do not do this for weeks
    // or for years. This needs to be performed before the acutal setting of the date
    // because the order needs to be reversed in order to get the lowest specificity,
    // also because higher order units can be overwritten by lower order units, such
    // as setting hour: 3, minute: 345, etc.
    iterateOverObject(DateUnitsReversed, function(i,u) {
      var isDay = u.unit === 'day';
      if(uniqueParamExists(u.unit, isDay)) {
        params.specificity = u.unit;
        specificityIndex = +i;
        return false;
      } else if(reset && u.unit !== 'week' && (!isDay || !paramExists('week'))) {
        // Days are relative to months, not weeks, so don't reset if a week exists.
        callDateSet(d, u.method, (isDay ? 1 : 0));
      }
    });


    // Now actually set or advance the date in order, higher units first.
    DateUnits.forEach(function(u,i) {
      var unit = u.unit, method = u.method, higherUnit = DateUnits[i - 1], value;
      value = getParam(unit)
      if(isUndefined(value)) return;
      if(advance) {
        if(unit === 'week') {
          value  = (params['day'] || 0) + (value * 7);
          method = 'Date';
        }
        value = (value * advance) + callDateGet(d, method);
      } else if(unit === 'month' && paramExists('day')) {
        // When setting the month, there is a chance that we will traverse into a new month.
        // This happens in DST shifts, for example June 1st DST jumping to January 1st
        // (non-DST) will have a shift of -1:00 which will traverse into the previous year.
        // Prevent this by proactively setting the day when we know it will be set again anyway.
        // It can also happen when there are not enough days in the target month. This second
        // situation is identical to checkMonthTraversal below, however when we are advancing
        // we want to reset the date to "the last date in the target month". In the case of
        // DST shifts, however, we want to avoid the "edges" of months as that is where this
        // unintended traversal can happen. This is the reason for the different handling of
        // two similar but slightly different situations.
        //
        // TL;DR This method avoids the edges of a month IF not advancing and the date is going
        // to be set anyway, while checkMonthTraversal resets the date to the last day if advancing.
        //
        callDateSet(d, 'Date', 15);
      }
      callDateSet(d, method, value);
      if(advance && unit === 'month') {
        checkMonthTraversal(d, value);
      }
    });


    // If a weekday is included in the params, set it ahead of time and set the params
    // to reflect the updated date so that resetting works properly.
    if(!advance && !paramExists('day') && paramExists('weekday')) {
      var weekday = getParam('weekday'), isAhead, futurePreferred;
      d.setWeekday(weekday);
    }

    if(canDisambiguate()) {
      iterateOverObject(DateUnitsReversed.slice(specificityIndex + 1), function(i,u) {
        var ambiguous = u.ambiguous || (u.unit === 'week' && paramExists('weekday'));
        if(ambiguous && !uniqueParamExists(u.unit, u.unit === 'day')) {
          d[u.addMethod](prefer);
          return false;
        }
      });
    }
    return d;
  }

  function callDateGet(d, method) {
    return d['get' + (d._utc ? 'UTC' : '') + method]();
  }

  function callDateSet(d, method, value) {
    return d['set' + (d._utc && method != 'ISOWeek' ? 'UTC' : '') + method](value);
  }

  // The ISO format allows times strung together without a demarcating ":", so make sure
  // that these markers are now optional.
  function prepareTime(format, loc, iso) {
    var timeSuffixMapping = {'h':0,'m':1,'s':2}, add;
    loc = loc || English;
    return format.replace(/{([a-z])}/g, function(full, token) {
      var separators = [],
          isHours = token === 'h',
          tokenIsRequired = isHours && !iso;
      if(token === 't') {
        return loc['ampm'].join('|');
      } else {
        if(isHours) {
          separators.push(':');
        }
        if(add = loc['timeSuffixes'][timeSuffixMapping[token]]) {
          separators.push(add + '\\s*');
        }
        return separators.length === 0 ? '' : '(?:' + separators.join('|') + ')' + (tokenIsRequired ? '' : '?');
      }
    });
  }


  // If the month is being set, then we don't want to accidentally
  // traverse into a new month just because the target month doesn't have enough
  // days. In other words, "5 months ago" from July 30th is still February, even
  // though there is no February 30th, so it will of necessity be February 28th
  // (or 29th in the case of a leap year).

  function checkMonthTraversal(date, targetMonth) {
    if(targetMonth < 0) {
      targetMonth = targetMonth % 12 + 12;
    }
    if(targetMonth % 12 != callDateGet(date, 'Month')) {
      callDateSet(date, 'Date', 0);
    }
  }

  function createDate(args, prefer, forceUTC) {
    var f, localeCode;
    if(isNumber(args[1])) {
      // If the second argument is a number, then we have an enumerated constructor type as in "new Date(2003, 2, 12);"
      f = collectDateArguments(args)[0];
    } else {
      f          = args[0];
      localeCode = args[1];
    }
    return getExtendedDate(f, localeCode, prefer, forceUTC).date;
  }

  function buildDateUnits() {
    DateUnitsReversed = DateUnits.concat().reverse();
    DateArgumentUnits = DateUnits.concat();
    DateArgumentUnits.splice(2,1);
  }


  /***
   * @method [units]Since([d], [locale] = currentLocale)
   * @returns Number
   * @short Returns the time since [d] in the appropriate unit.
   * @extra [d] will accept a date object, timestamp, or text format. If not specified, [d] is assumed to be now. [locale] can be passed to specify the locale that the date is in. %[unit]Ago% is provided as an alias to make this more readable when [d] is assumed to be the current date. For more see @date_format.
   *
   * @set
   *   millisecondsSince
   *   secondsSince
   *   minutesSince
   *   hoursSince
   *   daysSince
   *   weeksSince
   *   monthsSince
   *   yearsSince
   *
   * @example
   *
   *   Date.create().millisecondsSince('1 hour ago') -> 3,600,000
   *   Date.create().daysSince('1 week ago')         -> 7
   *   Date.create().yearsSince('15 years ago')      -> 15
   *   Date.create('15 years ago').yearsAgo()        -> 15
   *
   ***
   * @method [units]Ago()
   * @returns Number
   * @short Returns the time ago in the appropriate unit.
   *
   * @set
   *   millisecondsAgo
   *   secondsAgo
   *   minutesAgo
   *   hoursAgo
   *   daysAgo
   *   weeksAgo
   *   monthsAgo
   *   yearsAgo
   *
   * @example
   *
   *   Date.create('last year').millisecondsAgo() -> 3,600,000
   *   Date.create('last year').daysAgo()         -> 7
   *   Date.create('last year').yearsAgo()        -> 15
   *
   ***
   * @method [units]Until([d], [locale] = currentLocale)
   * @returns Number
   * @short Returns the time until [d] in the appropriate unit.
   * @extra [d] will accept a date object, timestamp, or text format. If not specified, [d] is assumed to be now. [locale] can be passed to specify the locale that the date is in. %[unit]FromNow% is provided as an alias to make this more readable when [d] is assumed to be the current date. For more see @date_format.
   *
   * @set
   *   millisecondsUntil
   *   secondsUntil
   *   minutesUntil
   *   hoursUntil
   *   daysUntil
   *   weeksUntil
   *   monthsUntil
   *   yearsUntil
   *
   * @example
   *
   *   Date.create().millisecondsUntil('1 hour from now') -> 3,600,000
   *   Date.create().daysUntil('1 week from now')         -> 7
   *   Date.create().yearsUntil('15 years from now')      -> 15
   *   Date.create('15 years from now').yearsFromNow()    -> 15
   *
   ***
   * @method [units]FromNow()
   * @returns Number
   * @short Returns the time from now in the appropriate unit.
   *
   * @set
   *   millisecondsFromNow
   *   secondsFromNow
   *   minutesFromNow
   *   hoursFromNow
   *   daysFromNow
   *   weeksFromNow
   *   monthsFromNow
   *   yearsFromNow
   *
   * @example
   *
   *   Date.create('next year').millisecondsFromNow() -> 3,600,000
   *   Date.create('next year').daysFromNow()         -> 7
   *   Date.create('next year').yearsFromNow()        -> 15
   *
   ***
   * @method add[Units](<num>, [reset] = false)
   * @returns Date
   * @short Adds <num> of the unit to the date. If [reset] is true, all lower units will be reset.
   * @extra Note that "months" is ambiguous as a unit of time. If the target date falls on a day that does not exist (ie. August 31 -> February 31), the date will be shifted to the last day of the month. Don't use %addMonths% if you need precision.
   *
   * @set
   *   addMilliseconds
   *   addSeconds
   *   addMinutes
   *   addHours
   *   addDays
   *   addWeeks
   *   addMonths
   *   addYears
   *
   * @example
   *
   *   Date.create().addMilliseconds(5) -> current time + 5 milliseconds
   *   Date.create().addDays(5)         -> current time + 5 days
   *   Date.create().addYears(5)        -> current time + 5 years
   *
   ***
   * @method isLast[Unit]()
   * @returns Boolean
   * @short Returns true if the date is last week/month/year.
   *
   * @set
   *   isLastWeek
   *   isLastMonth
   *   isLastYear
   *
   * @example
   *
   *   Date.create('yesterday').isLastWeek()  -> true or false?
   *   Date.create('yesterday').isLastMonth() -> probably not...
   *   Date.create('yesterday').isLastYear()  -> even less likely...
   *
   ***
   * @method isThis[Unit]()
   * @returns Boolean
   * @short Returns true if the date is this week/month/year.
   *
   * @set
   *   isThisWeek
   *   isThisMonth
   *   isThisYear
   *
   * @example
   *
   *   Date.create('tomorrow').isThisWeek()  -> true or false?
   *   Date.create('tomorrow').isThisMonth() -> probably...
   *   Date.create('tomorrow').isThisYear()  -> signs point to yes...
   *
   ***
   * @method isNext[Unit]()
   * @returns Boolean
   * @short Returns true if the date is next week/month/year.
   *
   * @set
   *   isNextWeek
   *   isNextMonth
   *   isNextYear
   *
   * @example
   *
   *   Date.create('tomorrow').isNextWeek()  -> true or false?
   *   Date.create('tomorrow').isNextMonth() -> probably not...
   *   Date.create('tomorrow').isNextYear()  -> even less likely...
   *
   ***
   * @method beginningOf[Unit]()
   * @returns Date
   * @short Sets the date to the beginning of the appropriate unit.
   *
   * @set
   *   beginningOfDay
   *   beginningOfWeek
   *   beginningOfMonth
   *   beginningOfYear
   *
   * @example
   *
   *   Date.create().beginningOfDay()   -> the beginning of today (resets the time)
   *   Date.create().beginningOfWeek()  -> the beginning of the week
   *   Date.create().beginningOfMonth() -> the beginning of the month
   *   Date.create().beginningOfYear()  -> the beginning of the year
   *
   ***
   * @method endOf[Unit]()
   * @returns Date
   * @short Sets the date to the end of the appropriate unit.
   *
   * @set
   *   endOfDay
   *   endOfWeek
   *   endOfMonth
   *   endOfYear
   *
   * @example
   *
   *   Date.create().endOfDay()   -> the end of today (sets the time to 23:59:59.999)
   *   Date.create().endOfWeek()  -> the end of the week
   *   Date.create().endOfMonth() -> the end of the month
   *   Date.create().endOfYear()  -> the end of the year
   *
   ***/

  function buildDateMethods() {
    extendSimilar(date, true, false, DateUnits, function(methods, u, i) {
      var unit = u.unit, caps = simpleCapitalize(unit), multiplier = u.multiplier(), since, until;
      u.addMethod = 'add' + caps + 's';
      // "since/until now" only count "past" an integer, i.e. "2 days ago" is
      // anything between 2 - 2.999 days. The default margin of error is 0.999,
      // but "months" have an inherently larger margin, as the number of days
      // in a given month may be significantly less than the number of days in
      // the average month, so for example "30 days" before March 15 may in fact
      // be 1 month ago. Years also have a margin of error due to leap years,
      // but this is roughly 0.999 anyway (365 / 365.25). Other units do not
      // technically need the error margin applied to them but this accounts
      // for discrepancies like (15).hoursAgo() which technically creates the
      // current date first, then creates a date 15 hours before and compares
      // them, the discrepancy between the creation of the 2 dates means that
      // they may actually be 15.0001 hours apart. Milliseconds don't have
      // fractions, so they won't be subject to this error margin.
      function applyErrorMargin(ms) {
        var num      = ms / multiplier,
            fraction = num % 1,
            error    = u.error || 0.999;
        if(fraction && math.abs(fraction % 1) > error) {
          num = round(num);
        }
        return num < 0 ? ceil(num) : floor(num);
      }
      since = function(f, localeCode) {
        return applyErrorMargin(this.getTime() - date.create(f, localeCode).getTime());
      };
      until = function(f, localeCode) {
        return applyErrorMargin(date.create(f, localeCode).getTime() - this.getTime());
      };
      methods[unit+'sAgo']     = until;
      methods[unit+'sUntil']   = until;
      methods[unit+'sSince']   = since;
      methods[unit+'sFromNow'] = since;
      methods[u.addMethod] = function(num, reset) {
        var set = {};
        set[unit] = num;
        return this.advance(set, reset);
      };
      buildNumberToDateAlias(u, multiplier);
      if(i < 3) {
        ['Last','This','Next'].forEach(function(shift) {
          methods['is' + shift + caps] = function() {
            return this.is(shift + ' ' + unit);
          };
        });
      }
      if(i < 4) {
        methods['beginningOf' + caps] = function() {
          var set = {};
          switch(unit) {
            case 'year':  set['year']    = callDateGet(this, 'FullYear'); break;
            case 'month': set['month']   = callDateGet(this, 'Month');    break;
            case 'day':   set['day']     = callDateGet(this, 'Date');     break;
            case 'week':  set['weekday'] = 0; break;
          }
          return this.set(set, true);
        };
        methods['endOf' + caps] = function() {
          var set = { 'hours': 23, 'minutes': 59, 'seconds': 59, 'milliseconds': 999 };
          switch(unit) {
            case 'year':  set['month']   = 11; set['day'] = 31; break;
            case 'month': set['day']     = this.daysInMonth();  break;
            case 'week':  set['weekday'] = 6;                   break;
          }
          return this.set(set, true);
        };
      }
    });
  }

  function buildCoreInputFormats() {
    English.addFormat('([+-])?(\\d{4,4})[-.]?{full_month}[-.]?(\\d{1,2})?', true, ['year_sign','year','month','date'], false, true);
    English.addFormat('(\\d{1,2})[-.\\/]{full_month}(?:[-.\\/](\\d{2,4}))?', true, ['date','month','year'], true);
    English.addFormat('{full_month}[-.](\\d{4,4})', false, ['month','year']);
    English.addFormat('\\/Date\\((\\d+(?:\\+\\d{4,4})?)\\)\\/', false, ['timestamp'])
    English.addFormat(prepareTime(RequiredTime, English), false, TimeFormat)

    // When a new locale is initialized it will have the CoreDateFormats initialized by default.
    // From there, adding new formats will push them in front of the previous ones, so the core
    // formats will be the last to be reached. However, the core formats themselves have English
    // months in them, which means that English needs to first be initialized and creates a race
    // condition. I'm getting around this here by adding these generalized formats in the order
    // specific -> general, which will mean they will be added to the English localization in
    // general -> specific order, then chopping them off the front and reversing to get the correct
    // order. Note that there are 7 formats as 2 have times which adds a front and a back format.
    CoreDateFormats = English.compiledFormats.slice(0,7).reverse();
    English.compiledFormats = English.compiledFormats.slice(7).concat(CoreDateFormats);
  }

  function buildDateOutputShortcuts() {
    extendSimilar(date, true, false, 'short,long,full', function(methods, name) {
      methods[name] = function(localeCode) {
        return formatDate(this, name, false, localeCode);
      }
    });
  }

  function buildAsianDigits() {
    KanjiDigits.split('').forEach(function(digit, value) {
      var holder;
      if(value > 9) {
        value = math.pow(10, value - 9);
      }
      AsianDigitMap[digit] = value;
    });
    FullWidthDigits.split('').forEach(function(digit, value) {
      AsianDigitMap[digit] = value;
    });
    // Kanji numerals may also be included in phrases which are text-based rather
    // than actual numbers such as Chinese weekdays (上周三), and "the day before
    // yesterday" (一昨日) in Japanese, so don't match these.
    AsianDigitReg = regexp('([期週周])?([' + KanjiDigits + FullWidthDigits + ']+)(?!昨)', 'g');
  }

   /***
   * @method is[Day]()
   * @returns Boolean
   * @short Returns true if the date falls on that day.
   * @extra Also available: %isYesterday%, %isToday%, %isTomorrow%, %isWeekday%, and %isWeekend%.
   *
   * @set
   *   isToday
   *   isYesterday
   *   isTomorrow
   *   isWeekday
   *   isWeekend
   *   isSunday
   *   isMonday
   *   isTuesday
   *   isWednesday
   *   isThursday
   *   isFriday
   *   isSaturday
   *
   * @example
   *
   *   Date.create('tomorrow').isToday() -> false
   *   Date.create('thursday').isTomorrow() -> ?
   *   Date.create('yesterday').isWednesday() -> ?
   *   Date.create('today').isWeekend() -> ?
   *
   ***
   * @method isFuture()
   * @returns Boolean
   * @short Returns true if the date is in the future.
   * @example
   *
   *   Date.create('next week').isFuture() -> true
   *   Date.create('last week').isFuture() -> false
   *
   ***
   * @method isPast()
   * @returns Boolean
   * @short Returns true if the date is in the past.
   * @example
   *
   *   Date.create('last week').isPast() -> true
   *   Date.create('next week').isPast() -> false
   *
   ***/
  function buildRelativeAliases() {
    var special  = 'today,yesterday,tomorrow,weekday,weekend,future,past'.split(',');
    var weekdays = English['weekdays'].slice(0,7);
    var months   = English['months'].slice(0,12);
    extendSimilar(date, true, false, special.concat(weekdays).concat(months), function(methods, name) {
      methods['is'+ simpleCapitalize(name)] = function(utc) {
       return this.is(name, 0, utc);
      };
    });
  }

  function buildUTCAliases() {
    date.extend({
      'utc': {

        'create': function() {
          return createDate(arguments, 0, true);
        },

        'past': function() {
          return createDate(arguments, -1, true);
        },

        'future': function() {
          return createDate(arguments, 1, true);
        }

      }
    }, false, false);
  }

  function setDateProperties() {
    date.extend({
      'RFC1123': '{Dow}, {dd} {Mon} {yyyy} {HH}:{mm}:{ss} {tz}',
      'RFC1036': '{Weekday}, {dd}-{Mon}-{yy} {HH}:{mm}:{ss} {tz}',
      'ISO8601_DATE': '{yyyy}-{MM}-{dd}',
      'ISO8601_DATETIME': '{yyyy}-{MM}-{dd}T{HH}:{mm}:{ss}.{fff}{isotz}'
    }, false, false);
  }


  date.extend({

     /***
     * @method Date.create(<d>, [locale] = currentLocale)
     * @returns Date
     * @short Alternate Date constructor which understands many different text formats, a timestamp, or another date.
     * @extra If no argument is given, date is assumed to be now. %Date.create% additionally can accept enumerated parameters as with the standard date constructor. [locale] can be passed to specify the locale that the date is in. When unspecified, the current locale (default is English) is assumed. UTC-based dates can be created through the %utc% object. For more see @date_format.
     * @set
     *   Date.utc.create
     *
     * @example
     *
     *   Date.create('July')          -> July of this year
     *   Date.create('1776')          -> 1776
     *   Date.create('today')         -> today
     *   Date.create('wednesday')     -> This wednesday
     *   Date.create('next friday')   -> Next friday
     *   Date.create('July 4, 1776')  -> July 4, 1776
     *   Date.create(-446806800000)   -> November 5, 1955
     *   Date.create(1776, 6, 4)      -> July 4, 1776
     *   Date.create('1776年07月04日', 'ja') -> July 4, 1776
     *   Date.utc.create('July 4, 1776', 'en')  -> July 4, 1776
     *
     ***/
    'create': function() {
      return createDate(arguments);
    },

     /***
     * @method Date.past(<d>, [locale] = currentLocale)
     * @returns Date
     * @short Alternate form of %Date.create% with any ambiguity assumed to be the past.
     * @extra For example %"Sunday"% can be either "the Sunday coming up" or "the Sunday last" depending on context. Note that dates explicitly in the future ("next Sunday") will remain in the future. This method simply provides a hint when ambiguity exists. UTC-based dates can be created through the %utc% object. For more, see @date_format.
     * @set
     *   Date.utc.past
     * @example
     *
     *   Date.past('July')          -> July of this year or last depending on the current month
     *   Date.past('Wednesday')     -> This wednesday or last depending on the current weekday
     *
     ***/
    'past': function() {
      return createDate(arguments, -1);
    },

     /***
     * @method Date.future(<d>, [locale] = currentLocale)
     * @returns Date
     * @short Alternate form of %Date.create% with any ambiguity assumed to be the future.
     * @extra For example %"Sunday"% can be either "the Sunday coming up" or "the Sunday last" depending on context. Note that dates explicitly in the past ("last Sunday") will remain in the past. This method simply provides a hint when ambiguity exists. UTC-based dates can be created through the %utc% object. For more, see @date_format.
     * @set
     *   Date.utc.future
     *
     * @example
     *
     *   Date.future('July')          -> July of this year or next depending on the current month
     *   Date.future('Wednesday')     -> This wednesday or next depending on the current weekday
     *
     ***/
    'future': function() {
      return createDate(arguments, 1);
    },

     /***
     * @method Date.addLocale(<code>, <set>)
     * @returns Locale
     * @short Adds a locale <set> to the locales understood by Sugar.
     * @extra For more see @date_format.
     *
     ***/
    'addLocale': function(localeCode, set) {
      return setLocalization(localeCode, set);
    },

     /***
     * @method Date.setLocale(<code>)
     * @returns Locale
     * @short Sets the current locale to be used with dates.
     * @extra Sugar has support for 13 locales that are available through the "Date Locales" package. In addition you can define a new locale with %Date.addLocale%. For more see @date_format.
     *
     ***/
    'setLocale': function(localeCode, set) {
      var loc = getLocalization(localeCode, false);
      CurrentLocalization = loc;
      // The code is allowed to be more specific than the codes which are required:
      // i.e. zh-CN or en-US. Currently this only affects US date variants such as 8/10/2000.
      if(localeCode && localeCode != loc['code']) {
        loc['code'] = localeCode;
      }
      return loc;
    },

     /***
     * @method Date.getLocale([code] = current)
     * @returns Locale
     * @short Gets the locale for the given code, or the current locale.
     * @extra The resulting locale object can be manipulated to provide more control over date localizations. For more about locales, see @date_format.
     *
     ***/
    'getLocale': function(localeCode) {
      return !localeCode ? CurrentLocalization : getLocalization(localeCode, false);
    },

     /**
     * @method Date.addFormat(<format>, <match>, [code] = null)
     * @returns Nothing
     * @short Manually adds a new date input format.
     * @extra This method allows fine grained control for alternate formats. <format> is a string that can have regex tokens inside. <match> is an array of the tokens that each regex capturing group will map to, for example %year%, %date%, etc. For more, see @date_format.
     *
     **/
    'addFormat': function(format, match, localeCode) {
      addDateInputFormat(getLocalization(localeCode), format, match);
    }

  }, false, false);

  date.extend({

     /***
     * @method set(<set>, [reset] = false)
     * @returns Date
     * @short Sets the date object.
     * @extra This method can accept multiple formats including a single number as a timestamp, an object, or enumerated parameters (as with the Date constructor). If [reset] is %true%, any units more specific than those passed will be reset.
     *
     * @example
     *
     *   new Date().set({ year: 2011, month: 11, day: 31 }) -> December 31, 2011
     *   new Date().set(2011, 11, 31)                       -> December 31, 2011
     *   new Date().set(86400000)                           -> 1 day after Jan 1, 1970
     *   new Date().set({ year: 2004, month: 6 }, true)     -> June 1, 2004, 00:00:00.000
     *
     ***/
    'set': function() {
      var args = collectDateArguments(arguments);
      return updateDate(this, args[0], args[1])
    },

     /***
     * @method setWeekday()
     * @returns Nothing
     * @short Sets the weekday of the date.
     * @extra In order to maintain a parallel with %getWeekday% (which itself is an alias for Javascript native %getDay%), Sunday is considered day %0%. This contrasts with ISO-8601 standard (used in %getISOWeek% and %setISOWeek%) which places Sunday at the end of the week (day 7). This effectively means that passing %0% to this method while in the middle of a week will rewind the date, where passing %7% will advance it.
     *
     * @example
     *
     *   d = new Date(); d.setWeekday(1); d; -> Monday of this week
     *   d = new Date(); d.setWeekday(6); d; -> Saturday of this week
     *
     ***/
    'setWeekday': function(dow) {
      if(isUndefined(dow)) return;
      return callDateSet(this, 'Date', callDateGet(this, 'Date') + dow - callDateGet(this, 'Day'));
    },

     /***
     * @method setISOWeek()
     * @returns Nothing
     * @short Sets the week (of the year) as defined by the ISO-8601 standard.
     * @extra Note that this standard places Sunday at the end of the week (day 7).
     *
     * @example
     *
     *   d = new Date(); d.setISOWeek(15); d; -> 15th week of the year
     *
     ***/
    'setISOWeek': function(week) {
      var weekday = callDateGet(this, 'Day') || 7;
      if(isUndefined(week)) return;
      this.set({ 'month': 0, 'date': 4 });
      this.set({ 'weekday': 1 });
      if(week > 1) {
        this.addWeeks(week - 1);
      }
      if(weekday !== 1) {
        this.advance({ 'days': weekday - 1 });
      }
      return this.getTime();
    },

     /***
     * @method getISOWeek()
     * @returns Number
     * @short Gets the date's week (of the year) as defined by the ISO-8601 standard.
     * @extra Note that this standard places Sunday at the end of the week (day 7). If %utc% is set on the date, the week will be according to UTC time.
     *
     * @example
     *
     *   new Date().getISOWeek()    -> today's week of the year
     *
     ***/
    'getISOWeek': function() {
      return getWeekNumber(this);
    },

     /***
     * @method getUTCOffset([iso])
     * @returns String
     * @short Returns a string representation of the offset from UTC time. If [iso] is true the offset will be in ISO8601 format.
     * @example
     *
     *   new Date().getUTCOffset()     -> "+0900"
     *   new Date().getUTCOffset(true) -> "+09:00"
     *
     ***/
    'getUTCOffset': function(iso) {
      var offset = this._utc ? 0 : this.getTimezoneOffset();
      var colon  = iso === true ? ':' : '';
      if(!offset && iso) return 'Z';
      return padNumber(floor(-offset / 60), 2, true) + colon + padNumber(math.abs(offset % 60), 2);
    },

     /***
     * @method utc([on] = true)
     * @returns Date
     * @short Sets the internal utc flag for the date. When on, UTC-based methods will be called internally.
     * @extra For more see @date_format.
     * @example
     *
     *   new Date().utc(true)
     *   new Date().utc(false)
     *
     ***/
    'utc': function(set) {
      defineProperty(this, '_utc', set === true || arguments.length === 0);
      return this;
    },

     /***
     * @method isUTC()
     * @returns Boolean
     * @short Returns true if the date has no timezone offset.
     * @extra This will also return true for utc-based dates (dates that have the %utc% method set true). Note that even if the utc flag is set, %getTimezoneOffset% will always report the same thing as Javascript always reports that based on the environment's locale.
     * @example
     *
     *   new Date().isUTC()           -> true or false?
     *   new Date().utc(true).isUTC() -> true
     *
     ***/
    'isUTC': function() {
      return !!this._utc || this.getTimezoneOffset() === 0;
    },

     /***
     * @method advance(<set>, [reset] = false)
     * @returns Date
     * @short Sets the date forward.
     * @extra This method can accept multiple formats including an object, a string in the format %3 days%, a single number as milliseconds, or enumerated parameters (as with the Date constructor). If [reset] is %true%, any units more specific than those passed will be reset. For more see @date_format.
     * @example
     *
     *   new Date().advance({ year: 2 }) -> 2 years in the future
     *   new Date().advance('2 days')    -> 2 days in the future
     *   new Date().advance(0, 2, 3)     -> 2 months 3 days in the future
     *   new Date().advance(86400000)    -> 1 day in the future
     *
     ***/
    'advance': function() {
      var args = collectDateArguments(arguments, true);
      return updateDate(this, args[0], args[1], 1);
    },

     /***
     * @method rewind(<set>, [reset] = false)
     * @returns Date
     * @short Sets the date back.
     * @extra This method can accept multiple formats including a single number as a timestamp, an object, or enumerated parameters (as with the Date constructor). If [reset] is %true%, any units more specific than those passed will be reset. For more see @date_format.
     * @example
     *
     *   new Date().rewind({ year: 2 }) -> 2 years in the past
     *   new Date().rewind(0, 2, 3)     -> 2 months 3 days in the past
     *   new Date().rewind(86400000)    -> 1 day in the past
     *
     ***/
    'rewind': function() {
      var args = collectDateArguments(arguments, true);
      return updateDate(this, args[0], args[1], -1);
    },

     /***
     * @method isValid()
     * @returns Boolean
     * @short Returns true if the date is valid.
     * @example
     *
     *   new Date().isValid()         -> true
     *   new Date('flexor').isValid() -> false
     *
     ***/
    'isValid': function() {
      return !isNaN(this.getTime());
    },

     /***
     * @method isAfter(<d>, [margin] = 0)
     * @returns Boolean
     * @short Returns true if the date is after the <d>.
     * @extra [margin] is to allow extra margin of error (in ms). <d> will accept a date object, timestamp, or text format. If not specified, <d> is assumed to be now. See @date_format for more.
     * @example
     *
     *   new Date().isAfter('tomorrow')  -> false
     *   new Date().isAfter('yesterday') -> true
     *
     ***/
    'isAfter': function(d, margin, utc) {
      return this.getTime() > date.create(d).getTime() - (margin || 0);
    },

     /***
     * @method isBefore(<d>, [margin] = 0)
     * @returns Boolean
     * @short Returns true if the date is before <d>.
     * @extra [margin] is to allow extra margin of error (in ms). <d> will accept a date object, timestamp, or text format. If not specified, <d> is assumed to be now. See @date_format for more.
     * @example
     *
     *   new Date().isBefore('tomorrow')  -> true
     *   new Date().isBefore('yesterday') -> false
     *
     ***/
    'isBefore': function(d, margin) {
      return this.getTime() < date.create(d).getTime() + (margin || 0);
    },

     /***
     * @method isBetween(<d1>, <d2>, [margin] = 0)
     * @returns Boolean
     * @short Returns true if the date falls between <d1> and <d2>.
     * @extra [margin] is to allow extra margin of error (in ms). <d1> and <d2> will accept a date object, timestamp, or text format. If not specified, they are assumed to be now. See @date_format for more.
     * @example
     *
     *   new Date().isBetween('yesterday', 'tomorrow')    -> true
     *   new Date().isBetween('last year', '2 years ago') -> false
     *
     ***/
    'isBetween': function(d1, d2, margin) {
      var t  = this.getTime();
      var t1 = date.create(d1).getTime();
      var t2 = date.create(d2).getTime();
      var lo = math.min(t1, t2);
      var hi = math.max(t1, t2);
      margin = margin || 0;
      return (lo - margin < t) && (hi + margin > t);
    },

     /***
     * @method isLeapYear()
     * @returns Boolean
     * @short Returns true if the date is a leap year.
     * @example
     *
     *   Date.create('2000').isLeapYear() -> true
     *
     ***/
    'isLeapYear': function() {
      var year = callDateGet(this, 'FullYear');
      return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    },

     /***
     * @method daysInMonth()
     * @returns Number
     * @short Returns the number of days in the date's month.
     * @example
     *
     *   Date.create('May').daysInMonth()            -> 31
     *   Date.create('February, 2000').daysInMonth() -> 29
     *
     ***/
    'daysInMonth': function() {
      return 32 - callDateGet(new date(callDateGet(this, 'FullYear'), callDateGet(this, 'Month'), 32), 'Date');
    },

     /***
     * @method format(<format>, [locale] = currentLocale)
     * @returns String
     * @short Formats and outputs the date.
     * @extra <format> can be a number of pre-determined formats or a string of tokens. Locale-specific formats are %short%, %long%, and %full% which have their own aliases and can be called with %date.short()%, etc. If <format> is not specified the %long% format is assumed. [locale] specifies a locale code to use (if not specified the current locale is used). See @date_format for more details.
     *
     * @set
     *   short
     *   long
     *   full
     *
     * @example
     *
     *   Date.create().format()                                   -> ex. July 4, 2003
     *   Date.create().format('{Weekday} {d} {Month}, {yyyy}')    -> ex. Monday July 4, 2003
     *   Date.create().format('{hh}:{mm}')                        -> ex. 15:57
     *   Date.create().format('{12hr}:{mm}{tt}')                  -> ex. 3:57pm
     *   Date.create().format(Date.ISO8601_DATETIME)              -> ex. 2011-07-05 12:24:55.528Z
     *   Date.create('last week').format('short', 'ja')                -> ex. 先週
     *   Date.create('yesterday').format(function(value,unit,ms,loc) {
     *     // value = 1, unit = 3, ms = -86400000, loc = [current locale object]
     *   });                                                      -> ex. 1 day ago
     *
     ***/
    'format': function(f, localeCode) {
      return formatDate(this, f, false, localeCode);
    },

     /***
     * @method relative([fn], [locale] = currentLocale)
     * @returns String
     * @short Returns a relative date string offset to the current time.
     * @extra [fn] can be passed to provide for more granular control over the resulting string. [fn] is passed 4 arguments: the adjusted value, unit, offset in milliseconds, and a localization object. As an alternate syntax, [locale] can also be passed as the first (and only) parameter. For more, see @date_format.
     * @example
     *
     *   Date.create('90 seconds ago').relative() -> 1 minute ago
     *   Date.create('January').relative()        -> ex. 5 months ago
     *   Date.create('January').relative('ja')    -> 3ヶ月前
     *   Date.create('120 minutes ago').relative(function(val,unit,ms,loc) {
     *     // value = 2, unit = 3, ms = -7200, loc = [current locale object]
     *   });                                      -> ex. 5 months ago
     *
     ***/
    'relative': function(f, localeCode) {
      if(isString(f)) {
        localeCode = f;
        f = null;
      }
      return formatDate(this, f, true, localeCode);
    },

     /***
     * @method is(<d>, [margin] = 0)
     * @returns Boolean
     * @short Returns true if the date is <d>.
     * @extra <d> will accept a date object, timestamp, or text format. %is% additionally understands more generalized expressions like month/weekday names, 'today', etc, and compares to the precision implied in <d>. [margin] allows an extra margin of error in milliseconds.  For more, see @date_format.
     * @example
     *
     *   Date.create().is('July')               -> true or false?
     *   Date.create().is('1776')               -> false
     *   Date.create().is('today')              -> true
     *   Date.create().is('weekday')            -> true or false?
     *   Date.create().is('July 4, 1776')       -> false
     *   Date.create().is(-6106093200000)       -> false
     *   Date.create().is(new Date(1776, 6, 4)) -> false
     *
     ***/
    'is': function(d, margin, utc) {
      var tmp, comp;
      if(!this.isValid()) return;
      if(isString(d)) {
        d = d.trim().toLowerCase();
        comp = this.clone().utc(utc);
        switch(true) {
          case d === 'future':  return this.getTime() > new date().getTime();
          case d === 'past':    return this.getTime() < new date().getTime();
          case d === 'weekday': return callDateGet(comp, 'Day') > 0 && callDateGet(comp, 'Day') < 6;
          case d === 'weekend': return callDateGet(comp, 'Day') === 0 || callDateGet(comp, 'Day') === 6;
          case (tmp = English['weekdays'].indexOf(d) % 7) > -1: return callDateGet(comp, 'Day') === tmp;
          case (tmp = English['months'].indexOf(d) % 12) > -1:  return callDateGet(comp, 'Month') === tmp;
        }
      }
      return compareDate(this, d, margin, utc);
    },

     /***
     * @method reset([unit] = 'hours')
     * @returns Date
     * @short Resets the unit passed and all smaller units. Default is "hours", effectively resetting the time.
     * @example
     *
     *   Date.create().reset('day')   -> Beginning of today
     *   Date.create().reset('month') -> 1st of the month
     *
     ***/
    'reset': function(unit) {
      var params = {}, recognized;
      unit = unit || 'hours';
      if(unit === 'date') unit = 'days';
      recognized = DateUnits.some(function(u) {
        return unit === u.unit || unit === u.unit + 's';
      });
      params[unit] = unit.match(/^days?/) ? 1 : 0;
      return recognized ? this.set(params, true) : this;
    },

     /***
     * @method clone()
     * @returns Date
     * @short Clones the date.
     * @example
     *
     *   Date.create().clone() -> Copy of now
     *
     ***/
    'clone': function() {
      var d = new date(this.getTime());
      d.utc(!!this._utc);
      return d;
    }

  });


  // Instance aliases
  date.extend({

     /***
     * @method iso()
     * @alias toISOString
     *
     ***/
    'iso': function() {
      return this.toISOString();
    },

     /***
     * @method getWeekday()
     * @returns Number
     * @short Alias for %getDay%.
     * @set
     *   getUTCWeekday
     *
     * @example
     *
     +   Date.create().getWeekday();    -> (ex.) 3
     +   Date.create().getUTCWeekday();    -> (ex.) 3
     *
     ***/
    'getWeekday':    date.prototype.getDay,
    'getUTCWeekday':    date.prototype.getUTCDay

  });



  /***
   * Number module
   *
   ***/

  /***
   * @method [unit]()
   * @returns Number
   * @short Takes the number as a corresponding unit of time and converts to milliseconds.
   * @extra Method names can be both singular and plural.  Note that as "a month" is ambiguous as a unit of time, %months% will be equivalent to 30.4375 days, the average number in a month. Be careful using %months% if you need exact precision.
   *
   * @set
   *   millisecond
   *   milliseconds
   *   second
   *   seconds
   *   minute
   *   minutes
   *   hour
   *   hours
   *   day
   *   days
   *   week
   *   weeks
   *   month
   *   months
   *   year
   *   years
   *
   * @example
   *
   *   (5).milliseconds() -> 5
   *   (10).hours()       -> 36000000
   *   (1).day()          -> 86400000
   *
   ***
   * @method [unit]Before([d], [locale] = currentLocale)
   * @returns Date
   * @short Returns a date that is <n> units before [d], where <n> is the number.
   * @extra [d] will accept a date object, timestamp, or text format. Note that "months" is ambiguous as a unit of time. If the target date falls on a day that does not exist (ie. August 31 -> February 31), the date will be shifted to the last day of the month. Be careful using %monthsBefore% if you need exact precision. See @date_format for more.
   *
   * @set
   *   millisecondBefore
   *   millisecondsBefore
   *   secondBefore
   *   secondsBefore
   *   minuteBefore
   *   minutesBefore
   *   hourBefore
   *   hoursBefore
   *   dayBefore
   *   daysBefore
   *   weekBefore
   *   weeksBefore
   *   monthBefore
   *   monthsBefore
   *   yearBefore
   *   yearsBefore
   *
   * @example
   *
   *   (5).daysBefore('tuesday')          -> 5 days before tuesday of this week
   *   (1).yearBefore('January 23, 1997') -> January 23, 1996
   *
   ***
   * @method [unit]Ago()
   * @returns Date
   * @short Returns a date that is <n> units ago.
   * @extra Note that "months" is ambiguous as a unit of time. If the target date falls on a day that does not exist (ie. August 31 -> February 31), the date will be shifted to the last day of the month. Be careful using %monthsAgo% if you need exact precision.
   *
   * @set
   *   millisecondAgo
   *   millisecondsAgo
   *   secondAgo
   *   secondsAgo
   *   minuteAgo
   *   minutesAgo
   *   hourAgo
   *   hoursAgo
   *   dayAgo
   *   daysAgo
   *   weekAgo
   *   weeksAgo
   *   monthAgo
   *   monthsAgo
   *   yearAgo
   *   yearsAgo
   *
   * @example
   *
   *   (5).weeksAgo() -> 5 weeks ago
   *   (1).yearAgo()  -> January 23, 1996
   *
   ***
   * @method [unit]After([d], [locale] = currentLocale)
   * @returns Date
   * @short Returns a date <n> units after [d], where <n> is the number.
   * @extra [d] will accept a date object, timestamp, or text format. Note that "months" is ambiguous as a unit of time. If the target date falls on a day that does not exist (ie. August 31 -> February 31), the date will be shifted to the last day of the month. Be careful using %monthsAfter% if you need exact precision. See @date_format for more.
   *
   * @set
   *   millisecondAfter
   *   millisecondsAfter
   *   secondAfter
   *   secondsAfter
   *   minuteAfter
   *   minutesAfter
   *   hourAfter
   *   hoursAfter
   *   dayAfter
   *   daysAfter
   *   weekAfter
   *   weeksAfter
   *   monthAfter
   *   monthsAfter
   *   yearAfter
   *   yearsAfter
   *
   * @example
   *
   *   (5).daysAfter('tuesday')          -> 5 days after tuesday of this week
   *   (1).yearAfter('January 23, 1997') -> January 23, 1998
   *
   ***
   * @method [unit]FromNow()
   * @returns Date
   * @short Returns a date <n> units from now.
   * @extra Note that "months" is ambiguous as a unit of time. If the target date falls on a day that does not exist (ie. August 31 -> February 31), the date will be shifted to the last day of the month. Be careful using %monthsFromNow% if you need exact precision.
   *
   * @set
   *   millisecondFromNow
   *   millisecondsFromNow
   *   secondFromNow
   *   secondsFromNow
   *   minuteFromNow
   *   minutesFromNow
   *   hourFromNow
   *   hoursFromNow
   *   dayFromNow
   *   daysFromNow
   *   weekFromNow
   *   weeksFromNow
   *   monthFromNow
   *   monthsFromNow
   *   yearFromNow
   *   yearsFromNow
   *
   * @example
   *
   *   (5).weeksFromNow() -> 5 weeks ago
   *   (1).yearFromNow()  -> January 23, 1998
   *
   ***/
  function buildNumberToDateAlias(u, multiplier) {
    var unit = u.unit, methods = {};
    function base() { return round(this * multiplier); }
    function after() { return createDate(arguments)[u.addMethod](this);  }
    function before() { return createDate(arguments)[u.addMethod](-this); }
    methods[unit] = base;
    methods[unit + 's'] = base;
    methods[unit + 'Before'] = before;
    methods[unit + 'sBefore'] = before;
    methods[unit + 'Ago'] = before;
    methods[unit + 'sAgo'] = before;
    methods[unit + 'After'] = after;
    methods[unit + 'sAfter'] = after;
    methods[unit + 'FromNow'] = after;
    methods[unit + 'sFromNow'] = after;
    number.extend(methods);
  }

  number.extend({

     /***
     * @method duration([locale] = currentLocale)
     * @returns String
     * @short Takes the number as milliseconds and returns a unit-adjusted localized string.
     * @extra This method is the same as %Date#relative% without the localized equivalent of "from now" or "ago". [locale] can be passed as the first (and only) parameter. Note that this method is only available when the dates package is included.
     * @example
     *
     *   (500).duration() -> '500 milliseconds'
     *   (1200).duration() -> '1 second'
     *   (75).minutes().duration() -> '1 hour'
     *   (75).minutes().duration('es') -> '1 hora'
     *
     ***/
    'duration': function(localeCode) {
      return getLocalization(localeCode).getDuration(this);
    }

  });


  English = CurrentLocalization = date.addLocale('en', {
    'plural':     true,
    'timeMarker': 'at',
    'ampm':       'am,pm',
    'months':     'January,February,March,April,May,June,July,August,September,October,November,December',
    'weekdays':   'Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday',
    'units':      'millisecond:|s,second:|s,minute:|s,hour:|s,day:|s,week:|s,month:|s,year:|s',
    'numbers':    'one,two,three,four,five,six,seven,eight,nine,ten',
    'articles':   'a,an,the',
    'tokens':     'the,st|nd|rd|th,of',
    'short':      '{Month} {d}, {yyyy}',
    'long':       '{Month} {d}, {yyyy} {h}:{mm}{tt}',
    'full':       '{Weekday} {Month} {d}, {yyyy} {h}:{mm}:{ss}{tt}',
    'past':       '{num} {unit} {sign}',
    'future':     '{num} {unit} {sign}',
    'duration':   '{num} {unit}',
    'modifiers': [
      { 'name': 'sign',  'src': 'ago|before', 'value': -1 },
      { 'name': 'sign',  'src': 'from now|after|from|in|later', 'value': 1 },
      { 'name': 'edge',  'src': 'last day', 'value': -2 },
      { 'name': 'edge',  'src': 'end', 'value': -1 },
      { 'name': 'edge',  'src': 'first day|beginning', 'value': 1 },
      { 'name': 'shift', 'src': 'last', 'value': -1 },
      { 'name': 'shift', 'src': 'the|this', 'value': 0 },
      { 'name': 'shift', 'src': 'next', 'value': 1 }
    ],
    'dateParse': [
      '{num} {unit} {sign}',
      '{sign} {num} {unit}',
      '{month} {year}',
      '{shift} {unit=5-7}',
      '{0?} {date}{1}',
      '{0?} {edge} of {shift?} {unit=4-7?}{month?}{year?}'
    ],
    'timeParse': [
      '{0} {num}{1} {day} of {month} {year?}',
      '{weekday?} {month} {date}{1?} {year?}',
      '{date} {month} {year}',
      '{date} {month}',
      '{shift} {weekday}',
      '{shift} week {weekday}',
      '{weekday} {2?} {shift} week',
      '{num} {unit=4-5} {sign} {day}',
      '{0?} {date}{1} of {month}',
      '{0?}{month?} {date?}{1?} of {shift} {unit=6-7}'
    ]
  });

  buildDateUnits();
  buildDateMethods();
  buildCoreInputFormats();
  buildDateOutputShortcuts();
  buildAsianDigits();
  buildRelativeAliases();
  buildUTCAliases();
  setDateProperties();


  /***
   * @package DateRange
   * @dependency date
   * @description Date Ranges define a range of time. They can enumerate over specific points within that range, and be manipulated and compared.
   *
   ***/

  var DateRange = function(start, end) {
    this.start = date.create(start);
    this.end   = date.create(end);
  };

  // 'toString' doesn't appear in a for..in loop in IE even though
  // hasOwnProperty reports true, so extend() can't be used here.
  // Also tried simply setting the prototype = {} up front for all
  // methods but GCC very oddly started dropping properties in the
  // object randomly (maybe because of the global scope?) hence
  // the need for the split logic here.
  DateRange.prototype.toString = function() {
    /***
     * @method toString()
     * @returns String
     * @short Returns a string representation of the DateRange.
     * @example
     *
     *   Date.range('2003', '2005').toString() -> January 1, 2003..January 1, 2005
     *
     ***/
    return this.isValid() ? this.start.full() + '..' + this.end.full() : 'Invalid DateRange';
  };

  extend(DateRange, true, false, {

    /***
     * @method isValid()
     * @returns Boolean
     * @short Returns true if the DateRange is valid, false otherwise.
     * @example
     *
     *   Date.range('2003', '2005').isValid() -> true
     *   Date.range('2005', '2003').isValid() -> false
     *
     ***/
    'isValid': function() {
      return this.start < this.end;
    },

    /***
     * @method duration()
     * @returns Number
     * @short Return the duration of the DateRange in milliseconds.
     * @example
     *
     *   Date.range('2003', '2005').duration() -> 94694400000
     *
     ***/
    'duration': function() {
      return this.isValid() ? this.end.getTime() - this.start.getTime() : NaN;
    },

    /***
     * @method contains(<d>)
     * @returns Boolean
     * @short Returns true if <d> is contained inside the DateRange. <d> may be a date or another DateRange.
     * @example
     *
     *   Date.range('2003', '2005').contains(Date.create('2004')) -> true
     *
     ***/
    'contains': function(obj) {
      var self = this, arr = obj.start && obj.end ? [obj.start, obj.end] : [obj];
      return arr.every(function(d) {
        return d >= self.start && d <= self.end;
      });
    },

    /***
     * @method every(<increment>, [fn])
     * @returns Array
     * @short Iterates through the DateRange for every <increment>, calling [fn] if it is passed. Returns an array of each increment visited.
     * @extra When <increment> is a number, increments will be to the exact millisecond. <increment> can also be a string in the format %{number} {unit}s%, in which case it will increment in the unit specified. Note that a discrepancy exists in the case of months, as %(2).months()% is an approximation. Stepping through the actual months by passing %"2 months"% is usually preferable in this case.
     * @example
     *
     *   Date.range('2003-01', '2003-03').every("2 months") -> [...]
     *
     ***/
    'every': function(increment, fn) {
      var current = this.start.clone(), result = [], index = 0, params, isDay;
      if(isString(increment)) {
        current.advance(getDateParamsFromString(increment, 0), true);
        params = getDateParamsFromString(increment);
        isDay = increment.toLowerCase() === 'day';
      } else {
        params = { 'milliseconds': increment };
      }
      while(current <= this.end) {
        result.push(current);
        if(fn) fn(current, index);
        if(isDay && callDateGet(current, 'Hours') === 23) {
          // When DST traversal happens at 00:00 hours, the time is effectively
          // pushed back to 23:00, meaning 1) 00:00 for that day does not exist,
          // and 2) there is no difference between 23:00 and 00:00, as you are
          // "jumping" around in time. Hours here will be reset before the date
          // is advanced and the date will never in fact advance, so set the hours
          // directly ahead to the next day to avoid this problem.
          current = current.clone();
          callDateSet(current, 'Hours', 48);
        } else {
          current = current.clone().advance(params, true);
        }
        index++;
      }
      return result;
    },

    /***
     * @method union(<range>)
     * @returns DateRange
     * @short Returns a new DateRange with the earliest starting point as its start, and the latest ending point as its end. If the two ranges do not intersect this will effectively remove the "gap" between them.
     * @example
     *
     *   Date.range('2003=01', '2005-01').union(Date.range('2004-01', '2006-01')) -> Jan 1, 2003..Jan 1, 2006
     *
     ***/
    'union': function(range) {
      return new DateRange(
        this.start < range.start ? this.start : range.start,
        this.end   > range.end   ? this.end   : range.end
      );
    },

    /***
     * @method intersect(<range>)
     * @returns DateRange
     * @short Returns a new DateRange with the latest starting point as its start, and the earliest ending point as its end. If the two ranges do not intersect this will effectively produce an invalid range.
     * @example
     *
     *   Date.range('2003-01', '2005-01').intersect(Date.range('2004-01', '2006-01')) -> Jan 1, 2004..Jan 1, 2005
     *
     ***/
    'intersect': function(range) {
      return new DateRange(
        this.start > range.start ? this.start : range.start,
        this.end   < range.end   ? this.end   : range.end
      );
    },

    /***
     * @method clone()
     * @returns DateRange
     * @short Clones the DateRange.
     * @example
     *
     *   Date.range('2003-01', '2005-01').intersect(Date.range('2004-01', '2006-01')) -> Jan 1, 2004..Jan 1, 2005
     *
     ***/
    'clone': function(range) {
      return new DateRange(this.start, this.end);
    }

  });

  /***
   * @method each[Unit]([fn])
   * @returns Date
   * @short Increments through the date range for each [unit], calling [fn] if it is passed. Returns an array of each increment visited.
   *
   * @set
   *   eachMillisecond
   *   eachSecond
   *   eachMinute
   *   eachHour
   *   eachDay
   *   eachWeek
   *   eachMonth
   *   eachYear
   *
   * @example
   *
   *   Date.range('2003-01', '2003-02').eachMonth()     -> [...]
   *   Date.range('2003-01-15', '2003-01-16').eachDay() -> [...]
   *
   ***/
  extendSimilar(DateRange, true, false, 'Millisecond,Second,Minute,Hour,Day,Week,Month,Year', function(methods, name) {
    methods['each' + name] = function(fn) { return this.every(name, fn); }
  });


  /***
   * Date module
   ***/

  extend(date, false, false, {

     /***
     * @method Date.range([start], [end])
     * @returns DateRange
     * @short Creates a new date range.
     * @extra If either [start] or [end] are null, they will default to the current date.
     *
     ***/
    'range': function(start, end) {
      return new DateRange(start, end);
    }

  });


  /***
   * @package Function
   * @dependency core
   * @description Lazy, throttled, and memoized functions, delayed functions and handling of timers, argument currying.
   *
   ***/

  function setDelay(fn, ms, after, scope, args) {
    var index;
    // Delay of infinity is never called of course...
    if(ms === Infinity) return;
    if(!fn.timers) fn.timers = [];
    if(!isNumber(ms)) ms = 0;
    fn.timers.push(setTimeout(function(){
      fn.timers.splice(index, 1);
      after.apply(scope, args || []);
    }, ms));
    index = fn.timers.length;
  }

  extend(Function, true, false, {

     /***
     * @method lazy([ms] = 1, [limit] = Infinity)
     * @returns Function
     * @short Creates a lazy function that, when called repeatedly, will queue execution and wait [ms] milliseconds to execute again.
     * @extra Lazy functions will always execute as many times as they are called up to [limit], after which point subsequent calls will be ignored (if it is set to a finite number). Compare this to %throttle%, which will execute only once per [ms] milliseconds. %lazy% is useful when you need to be sure that every call to a function is executed, but in a non-blocking manner. Calling %cancel% on a lazy function will clear the entire queue. Note that [ms] can also be a fraction.
     * @example
     *
     *   (function() {
     *     // Executes immediately.
     *   }).lazy()();
     *   (3).times(function() {
     *     // Executes 3 times, with each execution 20ms later than the last.
     *   }.lazy(20));
     *   (100).times(function() {
     *     // Executes 50 times, with each execution 20ms later than the last.
     *   }.lazy(20, 50));
     *
     ***/
    'lazy': function(ms, limit) {
      var fn = this, queue = [], lock = false, execute, rounded, perExecution, result;
      ms = ms || 1;
      limit = limit || Infinity;
      rounded = ceil(ms);
      perExecution = round(rounded / ms) || 1;
      execute = function() {
        if(lock || queue.length == 0) return;
        // Allow fractions of a millisecond by calling
        // multiple times per actual timeout execution
        var max = math.max(queue.length - perExecution, 0);
        while(queue.length > max) {
          // Getting uber-meta here...
          result = Function.prototype.apply.apply(fn, queue.shift());
        }
        setDelay(lazy, rounded, function() {
          lock = false;
          execute();
        });
        lock = true;
      }
      function lazy() {
        // The first call is immediate, so having 1 in the queue
        // implies two calls have already taken place.
        if(!lock || queue.length < limit - 1) {
          queue.push([this, arguments]);
          execute();
        }
        // Return the memoized result
        return result;
      }
      return lazy;
    },

     /***
     * @method delay([ms] = 0, [arg1], ...)
     * @returns Function
     * @short Executes the function after <ms> milliseconds.
     * @extra Returns a reference to itself. %delay% is also a way to execute non-blocking operations that will wait until the CPU is free. Delayed functions can be canceled using the %cancel% method. Can also curry arguments passed in after <ms>.
     * @example
     *
     *   (function(arg1) {
     *     // called 1s later
     *   }).delay(1000, 'arg1');
     *
     ***/
    'delay': function(ms) {
      var fn = this;
      var args = multiArgs(arguments).slice(1);
      setDelay(fn, ms, fn, fn, args);
      return fn;
    },

     /***
     * @method throttle(<ms>)
     * @returns Function
     * @short Creates a "throttled" version of the function that will only be executed once per <ms> milliseconds.
     * @extra This is functionally equivalent to calling %lazy% with a [limit] of %1%. %throttle% is appropriate when you want to make sure a function is only executed at most once for a given duration. Compare this to %lazy%, which will queue rapid calls and execute them later.
     * @example
     *
     *   (3).times(function() {
     *     // called only once. will wait 50ms until it responds again
     *   }.throttle(50));
     *
     ***/
    'throttle': function(ms) {
      return this.lazy(ms, 1);
    },

     /***
     * @method debounce(<ms>)
     * @returns Function
     * @short Creates a "debounced" function that postpones its execution until after <ms> milliseconds have passed.
     * @extra This method is useful to execute a function after things have "settled down". A good example of this is when a user tabs quickly through form fields, execution of a heavy operation should happen after a few milliseconds when they have "settled" on a field.
     * @example
     *
     *   var fn = (function(arg1) {
     *     // called once 50ms later
     *   }).debounce(50); fn() fn() fn();
     *
     ***/
    'debounce': function(ms) {
      var fn = this;
      function debounced() {
        debounced.cancel();
        setDelay(debounced, ms, fn, this, arguments);
      };
      return debounced;
    },

     /***
     * @method cancel()
     * @returns Function
     * @short Cancels a delayed function scheduled to be run.
     * @extra %delay%, %lazy%, %throttle%, and %debounce% can all set delays.
     * @example
     *
     *   (function() {
     *     alert('hay'); // Never called
     *   }).delay(500).cancel();
     *
     ***/
    'cancel': function() {
      if(isArray(this.timers)) {
        while(this.timers.length > 0) {
          clearTimeout(this.timers.shift());
        }
      }
      return this;
    },

     /***
     * @method after([num] = 1)
     * @returns Function
     * @short Creates a function that will execute after [num] calls.
     * @extra %after% is useful for running a final callback after a series of asynchronous operations, when the order in which the operations will complete is unknown.
     * @example
     *
     *   var fn = (function() {
     *     // Will be executed once only
     *   }).after(3); fn(); fn(); fn();
     *
     ***/
    'after': function(num) {
      var fn = this, counter = 0, storedArguments = [];
      if(!isNumber(num)) {
        num = 1;
      } else if(num === 0) {
        fn.call();
        return fn;
      }
      return function() {
        var ret;
        storedArguments.push(multiArgs(arguments));
        counter++;
        if(counter == num) {
          ret = fn.call(this, storedArguments);
          counter = 0;
          storedArguments = [];
          return ret;
        }
      }
    },

     /***
     * @method once()
     * @returns Function
     * @short Creates a function that will execute only once and store the result.
     * @extra %once% is useful for creating functions that will cache the result of an expensive operation and use it on subsequent calls. Also it can be useful for creating initialization functions that only need to be run once.
     * @example
     *
     *   var fn = (function() {
     *     // Will be executed once only
     *   }).once(); fn(); fn(); fn();
     *
     ***/
    'once': function() {
      return this.throttle(Infinity);
    },

     /***
     * @method fill(<arg1>, <arg2>, ...)
     * @returns Function
     * @short Returns a new version of the function which when called will have some of its arguments pre-emptively filled in, also known as "currying".
     * @extra Arguments passed to a "filled" function are generally appended to the curried arguments. However, if %undefined% is passed as any of the arguments to %fill%, it will be replaced, when the "filled" function is executed. This allows currying of arguments even when they occur toward the end of an argument list (the example demonstrates this much more clearly).
     * @example
     *
     *   var delayOneSecond = setTimeout.fill(undefined, 1000);
     *   delayOneSecond(function() {
     *     // Will be executed 1s later
     *   });
     *
     ***/
    'fill': function() {
      var fn = this, curried = multiArgs(arguments);
      return function() {
        var args = multiArgs(arguments);
        curried.forEach(function(arg, index) {
          if(arg != null || index >= args.length) args.splice(index, 0, arg);
        });
        return fn.apply(this, args);
      }
    }


  });


  /***
   * @package Number
   * @dependency core
   * @description Number formatting, rounding (with precision), and ranges. Aliases to Math methods.
   *
   ***/


  function abbreviateNumber(num, roundTo, str, mid, limit, bytes) {
    var fixed        = num.toFixed(20),
        decimalPlace = fixed.search(/\./),
        numeralPlace = fixed.search(/[1-9]/),
        significant  = decimalPlace - numeralPlace,
        unit, i, divisor;
    if(significant > 0) {
      significant -= 1;
    }
    i = math.max(math.min((significant / 3).floor(), limit === false ? str.length : limit), -mid);
    unit = str.charAt(i + mid - 1);
    if(significant < -9) {
      i = -3;
      roundTo = significant.abs() - 9;
      unit = str.slice(0,1);
    }
    divisor = bytes ? (2).pow(10 * i) : (10).pow(i * 3);
    return (num / divisor).round(roundTo || 0).format() + unit.trim();
  }


  extend(number, false, false, {

    /***
     * @method Number.random([n1], [n2])
     * @returns Number
     * @short Returns a random integer between [n1] and [n2].
     * @extra If only 1 number is passed, the other will be 0. If none are passed, the number will be either 0 or 1.
     * @example
     *
     *   Number.random(50, 100) -> ex. 85
     *   Number.random(50)      -> ex. 27
     *   Number.random()        -> ex. 0
     *
     ***/
    'random': function(n1, n2) {
      var min, max;
      if(arguments.length == 1) n2 = n1, n1 = 0;
      min = math.min(n1 || 0, isUndefined(n2) ? 1 : n2);
      max = math.max(n1 || 0, isUndefined(n2) ? 1 : n2) + 1;
      return floor((math.random() * (max - min)) + min);
    }

  });

  extend(number, true, false, {

    /***
     * @method log(<base> = Math.E)
     * @returns Number
     * @short Returns the logarithm of the number with base <base>, or natural logarithm of the number if <base> is undefined.
     * @example
     *
     *   (64).log(2) -> 6
     *   (9).log(3)  -> 2
     *   (5).log()   -> 1.6094379124341003
     *
     ***/

    'log': function(base) {
       return math.log(this) / (base ? math.log(base) : 1);
     },

    /***
     * @method abbr([precision] = 0)
     * @returns String
     * @short Returns an abbreviated form of the number.
     * @extra [precision] will round to the given precision.
     * @example
     *
     *   (1000).abbr()    -> "1k"
     *   (1000000).abbr() -> "1m"
     *   (1280).abbr(1)   -> "1.3k"
     *
     ***/
    'abbr': function(precision) {
      return abbreviateNumber(this, precision, 'kmbt', 0, 4);
    },

    /***
     * @method metric([precision] = 0, [limit] = 1)
     * @returns String
     * @short Returns the number as a string in metric notation.
     * @extra [precision] will round to the given precision. Both very large numbers and very small numbers are supported. [limit] is the upper limit for the units. The default is %1%, which is "kilo". If [limit] is %false%, the upper limit will be "exa". The lower limit is "nano", and cannot be changed.
     * @example
     *
     *   (1000).metric()            -> "1k"
     *   (1000000).metric()         -> "1,000k"
     *   (1000000).metric(0, false) -> "1M"
     *   (1249).metric(2) + 'g'     -> "1.25kg"
     *   (0.025).metric() + 'm'     -> "25mm"
     *
     ***/
    'metric': function(precision, limit) {
      return abbreviateNumber(this, precision, 'nμm kMGTPE', 4, isUndefined(limit) ? 1 : limit);
    },

    /***
     * @method bytes([precision] = 0, [limit] = 4)
     * @returns String
     * @short Returns an abbreviated form of the number, considered to be "Bytes".
     * @extra [precision] will round to the given precision. [limit] is the upper limit for the units. The default is %4%, which is "terabytes" (TB). If [limit] is %false%, the upper limit will be "exa".
     * @example
     *
     *   (1000).bytes()                 -> "1kB"
     *   (1000).bytes(2)                -> "0.98kB"
     *   ((10).pow(20)).bytes()         -> "90,949,470TB"
     *   ((10).pow(20)).bytes(0, false) -> "87EB"
     *
     ***/
    'bytes': function(precision, limit) {
      return abbreviateNumber(this, precision, 'kMGTPE', 0, isUndefined(limit) ? 4 : limit, true) + 'B';
    },

    /***
     * @method isInteger()
     * @returns Boolean
     * @short Returns true if the number has no trailing decimal.
     * @example
     *
     *   (420).isInteger() -> true
     *   (4.5).isInteger() -> false
     *
     ***/
    'isInteger': function() {
      return this % 1 == 0;
    },

    /***
     * @method isOdd()
     * @returns Boolean
     * @short Returns true if the number is odd.
     * @example
     *
     *   (3).isOdd()  -> true
     *   (18).isOdd() -> false
     *
     ***/
    'isOdd': function() {
      return !isNaN(this) && !this.isMultipleOf(2);
    },

    /***
     * @method isEven()
     * @returns Boolean
     * @short Returns true if the number is even.
     * @example
     *
     *   (6).isEven()  -> true
     *   (17).isEven() -> false
     *
     ***/
    'isEven': function() {
      return this.isMultipleOf(2);
    },

    /***
     * @method isMultipleOf(<num>)
     * @returns Boolean
     * @short Returns true if the number is a multiple of <num>.
     * @example
     *
     *   (6).isMultipleOf(2)  -> true
     *   (17).isMultipleOf(2) -> false
     *   (32).isMultipleOf(4) -> true
     *   (34).isMultipleOf(4) -> false
     *
     ***/
    'isMultipleOf': function(num) {
      return this % num === 0;
    },


    /***
     * @method format([place] = 0, [thousands] = ',', [decimal] = '.')
     * @returns String
     * @short Formats the number to a readable string.
     * @extra If [place] is %undefined%, will automatically determine the place. [thousands] is the character used for the thousands separator. [decimal] is the character used for the decimal point.
     * @example
     *
     *   (56782).format()           -> '56,782'
     *   (56782).format(2)          -> '56,782.00'
     *   (4388.43).format(2, ' ')      -> '4 388.43'
     *   (4388.43).format(2, '.', ',') -> '4.388,43'
     *
     ***/
    'format': function(place, thousands, decimal) {
      var i, str, split, integer, fraction, result = '';
      if(isUndefined(thousands)) {
        thousands = ',';
      }
      if(isUndefined(decimal)) {
        decimal = '.';
      }
      str      = (isNumber(place) ? round(this, place || 0).toFixed(math.max(place, 0)) : this.toString()).replace(/^-/, '');
      split    = str.split('.');
      integer  = split[0];
      fraction = split[1];
      for(i = integer.length; i > 0; i -= 3) {
        if(i < integer.length) {
          result = thousands + result;
        }
        result = integer.slice(math.max(0, i - 3), i) + result;
      }
      if(fraction) {
        result += decimal + repeatString((place || 0) - fraction.length, '0') + fraction;
      }
      return (this < 0 ? '-' : '') + result;
    },

    /***
     * @method hex([pad] = 1)
     * @returns String
     * @short Converts the number to hexidecimal.
     * @extra [pad] will pad the resulting string to that many places.
     * @example
     *
     *   (255).hex()   -> 'ff';
     *   (255).hex(4)  -> '00ff';
     *   (23654).hex() -> '5c66';
     *
     ***/
    'hex': function(pad) {
      return this.pad(pad || 1, false, 16);
    },

    /***
     * @method upto(<num>, [fn], [step] = 1)
     * @returns Array
     * @short Returns an array containing numbers from the number up to <num>.
     * @extra Optionally calls [fn] callback for each number in that array. [step] allows multiples greater than 1.
     * @example
     *
     *   (2).upto(6) -> [2, 3, 4, 5, 6]
     *   (2).upto(6, function(n) {
     *     // This function is called 5 times receiving n as the value.
     *   });
     *   (2).upto(8, null, 2) -> [2, 4, 6, 8]
     *
     ***/
    'upto': function(num, fn, step) {
      return getRange(this, num, fn, step || 1);
    },

    /***
     * @method downto(<num>, [fn], [step] = 1)
     * @returns Array
     * @short Returns an array containing numbers from the number down to <num>.
     * @extra Optionally calls [fn] callback for each number in that array. [step] allows multiples greater than 1.
     * @example
     *
     *   (8).downto(3) -> [8, 7, 6, 5, 4, 3]
     *   (8).downto(3, function(n) {
     *     // This function is called 6 times receiving n as the value.
     *   });
     *   (8).downto(2, null, 2) -> [8, 6, 4, 2]
     *
     ***/
    'downto': function(num, fn, step) {
      return getRange(this, num, fn, -(step || 1));
    },

    /***
     * @method times(<fn>)
     * @returns Number
     * @short Calls <fn> a number of times equivalent to the number.
     * @example
     *
     *   (8).times(function(i) {
     *     // This function is called 8 times.
     *   });
     *
     ***/
    'times': function(fn) {
      if(fn) {
        for(var i = 0; i < this; i++) {
          fn.call(this, i);
        }
      }
      return this.toNumber();
    },

    /***
     * @method chr()
     * @returns String
     * @short Returns a string at the code point of the number.
     * @example
     *
     *   (65).chr() -> "A"
     *   (75).chr() -> "K"
     *
     ***/
    'chr': function() {
      return string.fromCharCode(this);
    },

    /***
     * @method pad(<place> = 0, [sign] = false, [base] = 10)
     * @returns String
     * @short Pads a number with "0" to <place>.
     * @extra [sign] allows you to force the sign as well (+05, etc). [base] can change the base for numeral conversion.
     * @example
     *
     *   (5).pad(2)        -> '05'
     *   (-5).pad(4)       -> '-0005'
     *   (82).pad(3, true) -> '+082'
     *
     ***/
    'pad': function(place, sign, base) {
      return padNumber(this, place, sign, base);
    },

    /***
     * @method ordinalize()
     * @returns String
     * @short Returns an ordinalized (English) string, i.e. "1st", "2nd", etc.
     * @example
     *
     *   (1).ordinalize() -> '1st';
     *   (2).ordinalize() -> '2nd';
     *   (8).ordinalize() -> '8th';
     *
     ***/
    'ordinalize': function() {
      var suffix, num = this.abs(), last = parseInt(num.toString().slice(-2));
      return this + getOrdinalizedSuffix(last);
    },

    /***
     * @method toNumber()
     * @returns Number
     * @short Returns a number. This is mostly for compatibility reasons.
     * @example
     *
     *   (420).toNumber() -> 420
     *
     ***/
    'toNumber': function() {
      return parseFloat(this, 10);
    }

  });

  /***
   * @method round(<precision> = 0)
   * @returns Number
   * @short Shortcut for %Math.round% that also allows a <precision>.
   *
   * @example
   *
   *   (3.241).round()  -> 3
   *   (-3.841).round() -> -4
   *   (3.241).round(2) -> 3.24
   *   (3748).round(-2) -> 3800
   *
   ***
   * @method ceil(<precision> = 0)
   * @returns Number
   * @short Shortcut for %Math.ceil% that also allows a <precision>.
   *
   * @example
   *
   *   (3.241).ceil()  -> 4
   *   (-3.241).ceil() -> -3
   *   (3.241).ceil(2) -> 3.25
   *   (3748).ceil(-2) -> 3800
   *
   ***
   * @method floor(<precision> = 0)
   * @returns Number
   * @short Shortcut for %Math.floor% that also allows a <precision>.
   *
   * @example
   *
   *   (3.241).floor()  -> 3
   *   (-3.841).floor() -> -4
   *   (3.241).floor(2) -> 3.24
   *   (3748).floor(-2) -> 3700
   *
   ***
   * @method [math]()
   * @returns Number
   * @short Math related functions are mapped as shortcuts to numbers and are identical. Note that %Number#log% provides some special defaults.
   *
   * @set
   *   abs
   *   sin
   *   asin
   *   cos
   *   acos
   *   tan
   *   atan
   *   sqrt
   *   exp
   *   pow
   *
   * @example
   *
   *   (3).pow(3) -> 27
   *   (-3).abs() -> 3
   *   (1024).sqrt() -> 32
   *
   ***/

  function buildNumber() {
    extendSimilar(number, true, false, 'round,floor,ceil', function(methods, name) {
      methods[name] = function(precision) {
        return round(this, precision, name);
      }
    });
    extendSimilar(number, true, false, 'abs,pow,sin,asin,cos,acos,tan,atan,exp,pow,sqrt', function(methods, name) {
      methods[name] = function(a, b) {
        return math[name](this, a, b);
      }
    });
  }

  buildNumber();

  /***
   * @package Object
   * @dependency core
   * @description Object manipulation, type checking (isNumber, isString, ...), extended objects with hash-like methods available as instance methods.
   *
   * Much thanks to kangax for his informative aricle about how problems with instanceof and constructor
   * http://perfectionkills.com/instanceof-considered-harmful-or-how-to-write-a-robust-isarray/
   *
   ***/

  var ObjectTypeMethods = 'isObject,isNaN'.split(',');
  var ObjectHashMethods = 'keys,values,select,reject,each,merge,clone,equal,watch,tap,has,toQueryString'.split(',');

  function setParamsObject(obj, param, value, deep) {
    var reg = /^(.+?)(\[.*\])$/, paramIsArray, match, allKeys, key;
    if(deep !== false && (match = param.match(reg))) {
      key = match[1];
      allKeys = match[2].replace(/^\[|\]$/g, '').split('][');
      allKeys.forEach(function(k) {
        paramIsArray = !k || k.match(/^\d+$/);
        if(!key && isArray(obj)) key = obj.length;
        if(!hasOwnProperty(obj, key)) {
          obj[key] = paramIsArray ? [] : {};
        }
        obj = obj[key];
        key = k;
      });
      if(!key && paramIsArray) key = obj.length.toString();
      setParamsObject(obj, key, value);
    } else if(value.match(/^[+-]?\d+(\.\d+)?$/)) {
      obj[param] = parseFloat(value);
    } else if(value === 'true') {
      obj[param] = true;
    } else if(value === 'false') {
      obj[param] = false;
    } else {
      obj[param] = value;
    }
  }

  function objectToQueryString(base, obj) {
    var tmp;
    // If a custom toString exists bail here and use that instead
    if(isArray(obj) || (isObject(obj) && obj.toString === internalToString)) {
      tmp = [];
      iterateOverObject(obj, function(key, value) {
        if(base) {
          key = base + '[' + key + ']';
        }
        tmp.push(objectToQueryString(key, value));
      });
      return tmp.join('&');
    } else {
      if(!base) return '';
      return sanitizeURIComponent(base) + '=' + (isDate(obj) ? obj.getTime() : sanitizeURIComponent(obj));
    }
  }

  function sanitizeURIComponent(obj) {
    // undefined, null, and NaN are represented as a blank string,
    // while false and 0 are stringified. "+" is allowed in query string
    return !obj && obj !== false && obj !== 0 ? '' : encodeURIComponent(obj).replace(/%20/g, '+');
  }

  function matchKey(key, match) {
    if(isRegExp(match)) {
      return match.test(key);
    } else if(isObjectPrimitive(match)) {
      return hasOwnProperty(match, key);
    } else {
      return key === string(match);
    }
  }

  function selectFromObject(obj, args, select) {
    var result = {}, match;
    iterateOverObject(obj, function(key, value) {
      match = false;
      flattenedArgs(args, function(arg) {
        if(matchKey(key, arg)) {
          match = true;
        }
      }, 1);
      if(match === select) {
        result[key] = value;
      }
    });
    return result;
  }


  /***
   * @method Object.is[Type](<obj>)
   * @returns Boolean
   * @short Returns true if <obj> is an object of that type.
   * @extra %isObject% will return false on anything that is not an object literal, including instances of inherited classes. Note also that %isNaN% will ONLY return true if the object IS %NaN%. It does not mean the same as browser native %isNaN%, which returns true for anything that is "not a number".
   *
   * @set
   *   isArray
   *   isObject
   *   isBoolean
   *   isDate
   *   isFunction
   *   isNaN
   *   isNumber
   *   isString
   *   isRegExp
   *
   * @example
   *
   *   Object.isArray([1,2,3])            -> true
   *   Object.isDate(3)                   -> false
   *   Object.isRegExp(/wasabi/)          -> true
   *   Object.isObject({ broken:'wear' }) -> true
   *
   ***/
  function buildTypeMethods() {
    extendSimilar(object, false, false, ClassNames, function(methods, name) {
      var method = 'is' + name;
      ObjectTypeMethods.push(method);
      methods[method] = typeChecks[name];
    });
  }

  function buildObjectExtend() {
    extend(object, false, function(){ return arguments.length === 0; }, {
      'extend': function() {
        var methods = ObjectTypeMethods.concat(ObjectHashMethods)
        if(typeof EnumerableMethods !== 'undefined') {
          methods = methods.concat(EnumerableMethods);
        }
        buildObjectInstanceMethods(methods, object);
      }
    });
  }

  extend(object, false, true, {
      /***
       * @method watch(<obj>, <prop>, <fn>)
       * @returns Nothing
       * @short Watches a property of <obj> and runs <fn> when it changes.
       * @extra <fn> is passed three arguments: the property <prop>, the old value, and the new value. The return value of [fn] will be set as the new value. This method is useful for things such as validating or cleaning the value when it is set. Warning: this method WILL NOT work in browsers that don't support %Object.defineProperty%. This notably includes IE 8 and below, and Opera. This is the only method in Sugar that is not fully compatible with all browsers. %watch% is available as an instance method on extended objects.
       * @example
       *
       *   Object.watch({ foo: 'bar' }, 'foo', function(prop, oldVal, newVal) {
       *     // Will be run when the property 'foo' is set on the object.
       *   });
       *   Object.extended().watch({ foo: 'bar' }, 'foo', function(prop, oldVal, newVal) {
       *     // Will be run when the property 'foo' is set on the object.
       *   });
       *
       ***/
    'watch': function(obj, prop, fn) {
      if(!definePropertySupport) return;
      var value = obj[prop];
      object.defineProperty(obj, prop, {
        'enumerable'  : true,
        'configurable': true,
        'get': function() {
          return value;
        },
        'set': function(to) {
          value = fn.call(obj, prop, value, to);
        }
      });
    }
  });

  extend(object, false, function(arg1, arg2) { return isFunction(arg2); }, {

    /***
     * @method keys(<obj>, [fn])
     * @returns Array
     * @short Returns an array containing the keys in <obj>. Optionally calls [fn] for each key.
     * @extra This method is provided for browsers that don't support it natively, and additionally is enhanced to accept the callback [fn]. Returned keys are in no particular order. %keys% is available as an instance method on extended objects.
     * @example
     *
     *   Object.keys({ broken: 'wear' }) -> ['broken']
     *   Object.keys({ broken: 'wear' }, function(key, value) {
     *     // Called once for each key.
     *   });
     *   Object.extended({ broken: 'wear' }).keys() -> ['broken']
     *
     ***/
    'keys': function(obj, fn) {
      var keys = object.keys(obj);
      keys.forEach(function(key) {
        fn.call(obj, key, obj[key]);
      });
      return keys;
    }

  });

  extend(object, false, false, {

    'isObject': function(obj) {
      return isObject(obj);
    },

    'isNaN': function(obj) {
      // This is only true of NaN
      return isNumber(obj) && obj.valueOf() !== obj.valueOf();
    },

    /***
     * @method equal(<a>, <b>)
     * @returns Boolean
     * @short Returns true if <a> and <b> are equal.
     * @extra %equal% in Sugar is "egal", meaning the values are equal if they are "not observably distinguishable". Note that on extended objects the name is %equals% for readability.
     * @example
     *
     *   Object.equal({a:2}, {a:2}) -> true
     *   Object.equal({a:2}, {a:3}) -> false
     *   Object.extended({a:2}).equals({a:3}) -> false
     *
     ***/
    'equal': function(a, b) {
      return isEqual(a, b);
    },

    /***
     * @method Object.extended(<obj> = {})
     * @returns Extended object
     * @short Creates a new object, equivalent to %new Object()% or %{}%, but with extended methods.
     * @extra See extended objects for more.
     * @example
     *
     *   Object.extended()
     *   Object.extended({ happy:true, pappy:false }).keys() -> ['happy','pappy']
     *   Object.extended({ happy:true, pappy:false }).values() -> [true, false]
     *
     ***/
    'extended': function(obj) {
      return new Hash(obj);
    },

    /***
     * @method merge(<target>, <source>, [deep] = false, [resolve] = true)
     * @returns Merged object
     * @short Merges all the properties of <source> into <target>.
     * @extra Merges are shallow unless [deep] is %true%. Properties of <source> will win in the case of conflicts, unless [resolve] is %false%. [resolve] can also be a function that resolves the conflict. In this case it will be passed 3 arguments, %key%, %targetVal%, and %sourceVal%, with the context set to <source>. This will allow you to solve conflict any way you want, ie. adding two numbers together, etc. %merge% is available as an instance method on extended objects.
     * @example
     *
     *   Object.merge({a:1},{b:2}) -> { a:1, b:2 }
     *   Object.merge({a:1},{a:2}, false, false) -> { a:1 }
     +   Object.merge({a:1},{a:2}, false, function(key, a, b) {
     *     return a + b;
     *   }); -> { a:3 }
     *   Object.extended({a:1}).merge({b:2}) -> { a:1, b:2 }
     *
     ***/
    'merge': function(target, source, deep, resolve) {
      var key, val;
      // Strings cannot be reliably merged thanks to
      // their properties not being enumerable in < IE8.
      if(target && typeof source != 'string') {
        for(key in source) {
          if(!hasOwnProperty(source, key) || !target) continue;
          val = source[key];
          // Conflict!
          if(isDefined(target[key])) {
            // Do not merge.
            if(resolve === false) {
              continue;
            }
            // Use the result of the callback as the result.
            if(isFunction(resolve)) {
              val = resolve.call(source, key, target[key], source[key])
            }
          }
          // Deep merging.
          if(deep === true && val && isObjectPrimitive(val)) {
            if(isDate(val)) {
              val = new date(val.getTime());
            } else if(isRegExp(val)) {
              val = new regexp(val.source, getRegExpFlags(val));
            } else {
              if(!target[key]) target[key] = array.isArray(val) ? [] : {};
              object.merge(target[key], source[key], deep, resolve);
              continue;
            }
          }
          target[key] = val;
        }
      }
      return target;
    },

    /***
     * @method values(<obj>, [fn])
     * @returns Array
     * @short Returns an array containing the values in <obj>. Optionally calls [fn] for each value.
     * @extra Returned values are in no particular order. %values% is available as an instance method on extended objects.
     * @example
     *
     *   Object.values({ broken: 'wear' }) -> ['wear']
     *   Object.values({ broken: 'wear' }, function(value) {
     *     // Called once for each value.
     *   });
     *   Object.extended({ broken: 'wear' }).values() -> ['wear']
     *
     ***/
    'values': function(obj, fn) {
      var values = [];
      iterateOverObject(obj, function(k,v) {
        values.push(v);
        if(fn) fn.call(obj,v);
      });
      return values;
    },

    /***
     * @method clone(<obj> = {}, [deep] = false)
     * @returns Cloned object
     * @short Creates a clone (copy) of <obj>.
     * @extra Default is a shallow clone, unless [deep] is true. %clone% is available as an instance method on extended objects.
     * @example
     *
     *   Object.clone({foo:'bar'})            -> { foo: 'bar' }
     *   Object.clone()                       -> {}
     *   Object.extended({foo:'bar'}).clone() -> { foo: 'bar' }
     *
     ***/
    'clone': function(obj, deep) {
      var target;
      // Preserve internal UTC flag when applicable.
      if(isDate(obj) && obj.clone) {
        return obj.clone();
      } else if(!isObjectPrimitive(obj)) {
        return obj;
      } else if (obj instanceof Hash) {
        target = new Hash;
      } else {
        target = new obj.constructor;
      }
      return object.merge(target, obj, deep);
    },

    /***
     * @method Object.fromQueryString(<str>, [deep] = true)
     * @returns Object
     * @short Converts the query string of a URL into an object.
     * @extra If [deep] is %false%, conversion will only accept shallow params (ie. no object or arrays with %[]% syntax) as these are not universally supported.
     * @example
     *
     *   Object.fromQueryString('foo=bar&broken=wear') -> { foo: 'bar', broken: 'wear' }
     *   Object.fromQueryString('foo[]=1&foo[]=2')     -> { foo: [1,2] }
     *
     ***/
    'fromQueryString': function(str, deep) {
      var result = object.extended(), split;
      str = str && str.toString ? str.toString() : '';
      str.replace(/^.*?\?/, '').split('&').forEach(function(p) {
        var split = p.split('=');
        if(split.length !== 2) return;
        setParamsObject(result, split[0], decodeURIComponent(split[1]), deep);
      });
      return result;
    },

    /***
     * @method Object.toQueryString(<obj>, [namespace] = null)
     * @returns Object
     * @short Converts the object into a query string.
     * @extra Accepts deep nested objects and arrays. If [namespace] is passed, it will be prefixed to all param names.
     * @example
     *
     *   Object.toQueryString({foo:'bar'})          -> 'foo=bar'
     *   Object.toQueryString({foo:['a','b','c']})  -> 'foo[0]=a&foo[1]=b&foo[2]=c'
     *   Object.toQueryString({name:'Bob'}, 'user') -> 'user[name]=Bob'
     *
     ***/
    'toQueryString': function(obj, namespace) {
      return objectToQueryString(namespace, obj);
    },

    /***
     * @method tap(<obj>, <fn>)
     * @returns Object
     * @short Runs <fn> and returns <obj>.
     * @extra  A string can also be used as a shortcut to a method. This method is used to run an intermediary function in the middle of method chaining. As a standalone method on the Object class it doesn't have too much use. The power of %tap% comes when using extended objects or modifying the Object prototype with Object.extend().
     * @example
     *
     *   Object.extend();
     *   [2,4,6].map(Math.exp).tap(function(arr) {
     *     arr.pop()
     *   });
     *   [2,4,6].map(Math.exp).tap('pop').map(Math.round); ->  [7,55]
     *
     ***/
    'tap': function(obj, arg) {
      var fn = arg;
      if(!isFunction(arg)) {
        fn = function() {
          if(arg) obj[arg]();
        }
      }
      fn.call(obj, obj);
      return obj;
    },

    /***
     * @method has(<obj>, <key>)
     * @returns Boolean
     * @short Checks if <obj> has <key> using hasOwnProperty from Object.prototype.
     * @extra This method is considered safer than %Object#hasOwnProperty% when using objects as hashes. See http://www.devthought.com/2012/01/18/an-object-is-not-a-hash/ for more.
     * @example
     *
     *   Object.has({ foo: 'bar' }, 'foo') -> true
     *   Object.has({ foo: 'bar' }, 'baz') -> false
     *   Object.has({ hasOwnProperty: true }, 'foo') -> false
     *
     ***/
    'has': function (obj, key) {
      return hasOwnProperty(obj, key);
    },

    /***
     * @method select(<obj>, <find>, ...)
     * @returns Object
     * @short Builds a new object containing the values specified in <find>.
     * @extra When <find> is a string, that single key will be selected. It can also be a regex, selecting any key that matches, or an object which will match if the key also exists in that object, effectively doing an "intersect" operation on that object. Multiple selections may also be passed as an array or directly as enumerated arguments. %select% is available as an instance method on extended objects.
     * @example
     *
     *   Object.select({a:1,b:2}, 'a')        -> {a:1}
     *   Object.select({a:1,b:2}, /[a-z]/)    -> {a:1,ba:2}
     *   Object.select({a:1,b:2}, {a:1})      -> {a:1}
     *   Object.select({a:1,b:2}, 'a', 'b')   -> {a:1,b:2}
     *   Object.select({a:1,b:2}, ['a', 'b']) -> {a:1,b:2}
     *
     ***/
    'select': function (obj) {
      return selectFromObject(obj, arguments, true);
    },

    /***
     * @method reject(<obj>, <find>, ...)
     * @returns Object
     * @short Builds a new object containing all values except those specified in <find>.
     * @extra When <find> is a string, that single key will be rejected. It can also be a regex, rejecting any key that matches, or an object which will match if the key also exists in that object, effectively "subtracting" that object. Multiple selections may also be passed as an array or directly as enumerated arguments. %reject% is available as an instance method on extended objects.
     * @example
     *
     *   Object.reject({a:1,b:2}, 'a')        -> {b:2}
     *   Object.reject({a:1,b:2}, /[a-z]/)    -> {}
     *   Object.reject({a:1,b:2}, {a:1})      -> {b:2}
     *   Object.reject({a:1,b:2}, 'a', 'b')   -> {}
     *   Object.reject({a:1,b:2}, ['a', 'b']) -> {}
     *
     ***/
    'reject': function (obj) {
      return selectFromObject(obj, arguments, false);
    }

  });


  buildTypeMethods();
  buildObjectExtend();
  buildObjectInstanceMethods(ObjectHashMethods, Hash);


  /***
   * @package RegExp
   * @dependency core
   * @description Escaping regexes and manipulating their flags.
   *
   * Note here that methods on the RegExp class like .exec and .test will fail in the current version of SpiderMonkey being
   * used by CouchDB when using shorthand regex notation like /foo/. This is the reason for the intermixed use of shorthand
   * and compiled regexes here. If you're using JS in CouchDB, it is safer to ALWAYS compile your regexes from a string.
   *
   ***/

  extend(regexp, false, false, {

   /***
    * @method RegExp.escape(<str> = '')
    * @returns String
    * @short Escapes all RegExp tokens in a string.
    * @example
    *
    *   RegExp.escape('really?')      -> 'really\?'
    *   RegExp.escape('yes.')         -> 'yes\.'
    *   RegExp.escape('(not really)') -> '\(not really\)'
    *
    ***/
    'escape': function(str) {
      return escapeRegExp(str);
    }

  });

  extend(regexp, true, false, {

   /***
    * @method getFlags()
    * @returns String
    * @short Returns the flags of the regex as a string.
    * @example
    *
    *   /texty/gim.getFlags('testy') -> 'gim'
    *
    ***/
    'getFlags': function() {
      return getRegExpFlags(this);
    },

   /***
    * @method setFlags(<flags>)
    * @returns RegExp
    * @short Sets the flags on a regex and retuns a copy.
    * @example
    *
    *   /texty/.setFlags('gim') -> now has global, ignoreCase, and multiline set
    *
    ***/
    'setFlags': function(flags) {
      return regexp(this.source, flags);
    },

   /***
    * @method addFlag(<flag>)
    * @returns RegExp
    * @short Adds <flag> to the regex.
    * @example
    *
    *   /texty/.addFlag('g') -> now has global flag set
    *
    ***/
    'addFlag': function(flag) {
      return this.setFlags(getRegExpFlags(this, flag));
    },

   /***
    * @method removeFlag(<flag>)
    * @returns RegExp
    * @short Removes <flag> from the regex.
    * @example
    *
    *   /texty/g.removeFlag('g') -> now has global flag removed
    *
    ***/
    'removeFlag': function(flag) {
      return this.setFlags(getRegExpFlags(this).replace(flag, ''));
    }

  });



  /***
   * @package String
   * @dependency core
   * @description String manupulation, escaping, encoding, truncation, and:conversion.
   *
   ***/

  function getAcronym(word) {
    var inflector = string.Inflector;
    var word = inflector && inflector.acronyms[word];
    if(isString(word)) {
      return word;
    }
  }

  function padString(str, p, left, right) {
    var padding = string(p);
    if(padding != p) {
      padding = '';
    }
    if(!isNumber(left))  left = 1;
    if(!isNumber(right)) right = 1;
    return padding.repeat(left) + str + padding.repeat(right);
  }

  function chr(num) {
    return string.fromCharCode(num);
  }

  var btoa, atob;

  function buildBase64(key) {
    if(this.btoa) {
      btoa = this.btoa;
      atob = this.atob;
      return;
    }
    var base64reg = /[^A-Za-z0-9\+\/\=]/g;
    btoa = function(str) {
      var output = '';
      var chr1, chr2, chr3;
      var enc1, enc2, enc3, enc4;
      var i = 0;
      do {
        chr1 = str.charCodeAt(i++);
        chr2 = str.charCodeAt(i++);
        chr3 = str.charCodeAt(i++);
        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;
        if (isNaN(chr2)) {
          enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
          enc4 = 64;
        }
        output = output + key.charAt(enc1) + key.charAt(enc2) + key.charAt(enc3) + key.charAt(enc4);
        chr1 = chr2 = chr3 = '';
        enc1 = enc2 = enc3 = enc4 = '';
      } while (i < str.length);
      return output;
    }
    atob = function(input) {
      var output = '';
      var chr1, chr2, chr3;
      var enc1, enc2, enc3, enc4;
      var i = 0;
      if(input.match(base64reg)) {
        throw new Error('String contains invalid base64 characters');
      }
      input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');
      do {
        enc1 = key.indexOf(input.charAt(i++));
        enc2 = key.indexOf(input.charAt(i++));
        enc3 = key.indexOf(input.charAt(i++));
        enc4 = key.indexOf(input.charAt(i++));
        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;
        output = output + chr(chr1);
        if (enc3 != 64) {
          output = output + chr(chr2);
        }
        if (enc4 != 64) {
          output = output + chr(chr3);
        }
        chr1 = chr2 = chr3 = '';
        enc1 = enc2 = enc3 = enc4 = '';
      } while (i < input.length);
      return output;
    }
  }


  extend(string, true, function(reg) { return isRegExp(reg) || arguments.length > 2; }, {

    /***
     * @method startsWith(<find>, [pos] = 0, [case] = true)
     * @returns Boolean
     * @short Returns true if the string starts with <find>.
     * @extra <find> may be either a string or regex. Search begins at [pos], which defaults to the entire string. Case sensitive if [case] is true.
     * @example
     *
     *   'hello'.startsWith('hell')           -> true
     *   'hello'.startsWith(/[a-h]/)          -> true
     *   'hello'.startsWith('HELL')           -> false
     *   'hello'.startsWith('ell', 1)         -> true
     *   'hello'.startsWith('HELL', 0, false) -> true
     *
     ***/
    'startsWith': function(reg, pos, c) {
      var str = this, source;
      if(pos) str = str.slice(pos);
      if(isUndefined(c)) c = true;
      source = isRegExp(reg) ? reg.source.replace('^', '') : escapeRegExp(reg);
      return regexp('^' + source, c ? '' : 'i').test(str);
    },

    /***
     * @method endsWith(<find>, [pos] = length, [case] = true)
     * @returns Boolean
     * @short Returns true if the string ends with <find>.
     * @extra <find> may be either a string or regex. Search ends at [pos], which defaults to the entire string. Case sensitive if [case] is true.
     * @example
     *
     *   'jumpy'.endsWith('py')            -> true
     *   'jumpy'.endsWith(/[q-z]/)         -> true
     *   'jumpy'.endsWith('MPY')           -> false
     *   'jumpy'.endsWith('mp', 4)         -> false
     *   'jumpy'.endsWith('MPY', 5, false) -> true
     *
     ***/
    'endsWith': function(reg, pos, c) {
      var str = this, source;
      if(isDefined(pos)) str = str.slice(0, pos);
      if(isUndefined(c)) c = true;
      source = isRegExp(reg) ? reg.source.replace('$', '') : escapeRegExp(reg);
      return regexp(source + '$', c ? '' : 'i').test(str);
    }

  });


  extend(string, true, false, {

     /***
      * @method escapeRegExp()
      * @returns String
      * @short Escapes all RegExp tokens in the string.
      * @example
      *
      *   'really?'.escapeRegExp()       -> 'really\?'
      *   'yes.'.escapeRegExp()         -> 'yes\.'
      *   '(not really)'.escapeRegExp() -> '\(not really\)'
      *
      ***/
    'escapeRegExp': function() {
      return escapeRegExp(this);
    },

     /***
      * @method escapeURL([param] = false)
      * @returns String
      * @short Escapes characters in a string to make a valid URL.
      * @extra If [param] is true, it will also escape valid URL characters for use as a URL parameter.
      * @example
      *
      *   'http://foo.com/"bar"'.escapeURL()     -> 'http://foo.com/%22bar%22'
      *   'http://foo.com/"bar"'.escapeURL(true) -> 'http%3A%2F%2Ffoo.com%2F%22bar%22'
      *
      ***/
    'escapeURL': function(param) {
      return param ? encodeURIComponent(this) : encodeURI(this);
    },

     /***
      * @method unescapeURL([partial] = false)
      * @returns String
      * @short Restores escaped characters in a URL escaped string.
      * @extra If [partial] is true, it will only unescape non-valid URL characters. [partial] is included here for completeness, but should very rarely be needed.
      * @example
      *
      *   'http%3A%2F%2Ffoo.com%2Fthe%20bar'.unescapeURL()     -> 'http://foo.com/the bar'
      *   'http%3A%2F%2Ffoo.com%2Fthe%20bar'.unescapeURL(true) -> 'http%3A%2F%2Ffoo.com%2Fthe bar'
      *
      ***/
    'unescapeURL': function(param) {
      return param ? decodeURI(this) : decodeURIComponent(this);
    },

     /***
      * @method escapeHTML()
      * @returns String
      * @short Converts HTML characters to their entity equivalents.
      * @example
      *
      *   '<p>some text</p>'.escapeHTML() -> '&lt;p&gt;some text&lt;/p&gt;'
      *   'one & two'.escapeHTML()        -> 'one &amp; two'
      *
      ***/
    'escapeHTML': function() {
      return this.replace(/&/g,  '&amp;' )
                 .replace(/</g,  '&lt;'  )
                 .replace(/>/g,  '&gt;'  )
                 .replace(/"/g,  '&quot;')
                 .replace(/'/g,  '&apos;')
                 .replace(/\//g, '&#x2f;');
    },

     /***
      * @method unescapeHTML([partial] = false)
      * @returns String
      * @short Restores escaped HTML characters.
      * @example
      *
      *   '&lt;p&gt;some text&lt;/p&gt;'.unescapeHTML() -> '<p>some text</p>'
      *   'one &amp; two'.unescapeHTML()                -> 'one & two'
      *
      ***/
    'unescapeHTML': function() {
      return this.replace(/&lt;/g,   '<')
                 .replace(/&gt;/g,   '>')
                 .replace(/&quot;/g, '"')
                 .replace(/&apos;/g, "'")
                 .replace(/&#x2f;/g, '/')
                 .replace(/&amp;/g,  '&');
    },

     /***
      * @method encodeBase64()
      * @returns String
      * @short Encodes the string into base64 encoding.
      * @extra This method wraps the browser native %btoa% when available, and uses a custom implementation when not available. It can also handle Unicode string encodings.
      * @example
      *
      *   'gonna get encoded!'.encodeBase64()  -> 'Z29ubmEgZ2V0IGVuY29kZWQh'
      *   'http://twitter.com/'.encodeBase64() -> 'aHR0cDovL3R3aXR0ZXIuY29tLw=='
      *
      ***/
    'encodeBase64': function() {
      return btoa(unescape(encodeURIComponent(this)));
    },

     /***
      * @method decodeBase64()
      * @returns String
      * @short Decodes the string from base64 encoding.
      * @extra This method wraps the browser native %atob% when available, and uses a custom implementation when not available. It can also handle Unicode string encodings.
      * @example
      *
      *   'aHR0cDovL3R3aXR0ZXIuY29tLw=='.decodeBase64() -> 'http://twitter.com/'
      *   'anVzdCBnb3QgZGVjb2RlZA=='.decodeBase64()     -> 'just got decoded!'
      *
      ***/
    'decodeBase64': function() {
      return decodeURIComponent(escape(atob(this)));
    },

    /***
     * @method each([search] = single character, [fn])
     * @returns Array
     * @short Runs callback [fn] against each occurence of [search].
     * @extra Returns an array of matches. [search] may be either a string or regex, and defaults to every character in the string.
     * @example
     *
     *   'jumpy'.each() -> ['j','u','m','p','y']
     *   'jumpy'.each(/[r-z]/) -> ['u','y']
     *   'jumpy'.each(/[r-z]/, function(m) {
     *     // Called twice: "u", "y"
     *   });
     *
     ***/
    'each': function(search, fn) {
      var match, i, len;
      if(isFunction(search)) {
        fn = search;
        search = /[\s\S]/g;
      } else if(!search) {
        search = /[\s\S]/g
      } else if(isString(search)) {
        search = regexp(escapeRegExp(search), 'gi');
      } else if(isRegExp(search)) {
        search = regexp(search.source, getRegExpFlags(search, 'g'));
      }
      match = this.match(search) || [];
      if(fn) {
        for(i = 0, len = match.length; i < len; i++) {
          match[i] = fn.call(this, match[i], i, match) || match[i];
        }
      }
      return match;
    },

    /***
     * @method shift(<n>)
     * @returns Array
     * @short Shifts each character in the string <n> places in the character map.
     * @example
     *
     *   'a'.shift(1)  -> 'b'
     *   'ク'.shift(1) -> 'グ'
     *
     ***/
    'shift': function(n) {
      var result = '';
      n = n || 0;
      this.codes(function(c) {
        result += chr(c + n);
      });
      return result;
    },

    /***
     * @method codes([fn])
     * @returns Array
     * @short Runs callback [fn] against each character code in the string. Returns an array of character codes.
     * @example
     *
     *   'jumpy'.codes() -> [106,117,109,112,121]
     *   'jumpy'.codes(function(c) {
     *     // Called 5 times: 106, 117, 109, 112, 121
     *   });
     *
     ***/
    'codes': function(fn) {
      var codes = [], i, len;
      for(i = 0, len = this.length; i < len; i++) {
        var code = this.charCodeAt(i);
        codes.push(code);
        if(fn) fn.call(this, code, i);
      }
      return codes;
    },

    /***
     * @method chars([fn])
     * @returns Array
     * @short Runs callback [fn] against each character in the string. Returns an array of characters.
     * @example
     *
     *   'jumpy'.chars() -> ['j','u','m','p','y']
     *   'jumpy'.chars(function(c) {
     *     // Called 5 times: "j","u","m","p","y"
     *   });
     *
     ***/
    'chars': function(fn) {
      return this.each(fn);
    },

    /***
     * @method words([fn])
     * @returns Array
     * @short Runs callback [fn] against each word in the string. Returns an array of words.
     * @extra A "word" here is defined as any sequence of non-whitespace characters.
     * @example
     *
     *   'broken wear'.words() -> ['broken','wear']
     *   'broken wear'.words(function(w) {
     *     // Called twice: "broken", "wear"
     *   });
     *
     ***/
    'words': function(fn) {
      return this.trim().each(/\S+/g, fn);
    },

    /***
     * @method lines([fn])
     * @returns Array
     * @short Runs callback [fn] against each line in the string. Returns an array of lines.
     * @example
     *
     *   'broken wear\nand\njumpy jump'.lines() -> ['broken wear','and','jumpy jump']
     *   'broken wear\nand\njumpy jump'.lines(function(l) {
     *     // Called three times: "broken wear", "and", "jumpy jump"
     *   });
     *
     ***/
    'lines': function(fn) {
      return this.trim().each(/^.*$/gm, fn);
    },

    /***
     * @method paragraphs([fn])
     * @returns Array
     * @short Runs callback [fn] against each paragraph in the string. Returns an array of paragraphs.
     * @extra A paragraph here is defined as a block of text bounded by two or more line breaks.
     * @example
     *
     *   'Once upon a time.\n\nIn the land of oz...'.paragraphs() -> ['Once upon a time.','In the land of oz...']
     *   'Once upon a time.\n\nIn the land of oz...'.paragraphs(function(p) {
     *     // Called twice: "Once upon a time.", "In teh land of oz..."
     *   });
     *
     ***/
    'paragraphs': function(fn) {
      var paragraphs = this.trim().split(/[\r\n]{2,}/);
      paragraphs = paragraphs.map(function(p) {
        if(fn) var s = fn.call(p);
        return s ? s : p;
      });
      return paragraphs;
    },

    /***
     * @method isBlank()
     * @returns Boolean
     * @short Returns true if the string has a length of 0 or contains only whitespace.
     * @example
     *
     *   ''.isBlank()      -> true
     *   '   '.isBlank()   -> true
     *   'noway'.isBlank() -> false
     *
     ***/
    'isBlank': function() {
      return this.trim().length === 0;
    },

    /***
     * @method has(<find>)
     * @returns Boolean
     * @short Returns true if the string matches <find>.
     * @extra <find> may be a string or regex.
     * @example
     *
     *   'jumpy'.has('py')     -> true
     *   'broken'.has(/[a-n]/) -> true
     *   'broken'.has(/[s-z]/) -> false
     *
     ***/
    'has': function(find) {
      return this.search(isRegExp(find) ? find : escapeRegExp(find)) !== -1;
    },


    /***
     * @method add(<str>, [index] = length)
     * @returns String
     * @short Adds <str> at [index]. Negative values are also allowed.
     * @extra %insert% is provided as an alias, and is generally more readable when using an index.
     * @example
     *
     *   'schfifty'.add(' five')      -> schfifty five
     *   'dopamine'.insert('e', 3)       -> dopeamine
     *   'spelling eror'.insert('r', -3) -> spelling error
     *
     ***/
    'add': function(str, index) {
      index = isUndefined(index) ? this.length : index;
      return this.slice(0, index) + str + this.slice(index);
    },

    /***
     * @method remove(<f>)
     * @returns String
     * @short Removes any part of the string that matches <f>.
     * @extra <f> can be a string or a regex.
     * @example
     *
     *   'schfifty five'.remove('f')     -> 'schity ive'
     *   'schfifty five'.remove(/[a-f]/g) -> 'shity iv'
     *
     ***/
    'remove': function(f) {
      return this.replace(f, '');
    },

    /***
     * @method reverse()
     * @returns String
     * @short Reverses the string.
     * @example
     *
     *   'jumpy'.reverse()        -> 'ypmuj'
     *   'lucky charms'.reverse() -> 'smrahc ykcul'
     *
     ***/
    'reverse': function() {
      return this.split('').reverse().join('');
    },

    /***
     * @method compact()
     * @returns String
     * @short Compacts all white space in the string to a single space and trims the ends.
     * @example
     *
     *   'too \n much \n space'.compact() -> 'too much space'
     *   'enough \n '.compact()           -> 'enought'
     *
     ***/
    'compact': function() {
      return this.trim().replace(/([\r\n\s　])+/g, function(match, whitespace){
        return whitespace === '　' ? whitespace : ' ';
      });
    },

    /***
     * @method at(<index>, [loop] = true)
     * @returns String or Array
     * @short Gets the character(s) at a given index.
     * @extra When [loop] is true, overshooting the end of the string (or the beginning) will begin counting from the other end. As an alternate syntax, passing multiple indexes will get the characters at those indexes.
     * @example
     *
     *   'jumpy'.at(0)               -> 'j'
     *   'jumpy'.at(2)               -> 'm'
     *   'jumpy'.at(5)               -> 'j'
     *   'jumpy'.at(5, false)        -> ''
     *   'jumpy'.at(-1)              -> 'y'
     *   'lucky charms'.at(2,4,6,8) -> ['u','k','y',c']
     *
     ***/
    'at': function() {
      return entryAtIndex(this, arguments, true);
    },

    /***
     * @method from([index] = 0)
     * @returns String
     * @short Returns a section of the string starting from [index].
     * @example
     *
     *   'lucky charms'.from()   -> 'lucky charms'
     *   'lucky charms'.from(7)  -> 'harms'
     *
     ***/
    'from': function(num) {
      return this.slice(num);
    },

    /***
     * @method to([index] = end)
     * @returns String
     * @short Returns a section of the string ending at [index].
     * @example
     *
     *   'lucky charms'.to()   -> 'lucky charms'
     *   'lucky charms'.to(7)  -> 'lucky ch'
     *
     ***/
    'to': function(num) {
      if(isUndefined(num)) num = this.length;
      return this.slice(0, num);
    },

    /***
     * @method dasherize()
     * @returns String
     * @short Converts underscores and camel casing to hypens.
     * @example
     *
     *   'a_farewell_to_arms'.dasherize() -> 'a-farewell-to-arms'
     *   'capsLock'.dasherize()           -> 'caps-lock'
     *
     ***/
    'dasherize': function() {
      return this.underscore().replace(/_/g, '-');
    },

    /***
     * @method underscore()
     * @returns String
     * @short Converts hyphens and camel casing to underscores.
     * @example
     *
     *   'a-farewell-to-arms'.underscore() -> 'a_farewell_to_arms'
     *   'capsLock'.underscore()           -> 'caps_lock'
     *
     ***/
    'underscore': function() {
      return this
        .replace(/[-\s]+/g, '_')
        .replace(string.Inflector && string.Inflector.acronymRegExp, function(acronym, index) {
          return (index > 0 ? '_' : '') + acronym.toLowerCase();
        })
        .replace(/([A-Z\d]+)([A-Z][a-z])/g,'$1_$2')
        .replace(/([a-z\d])([A-Z])/g,'$1_$2')
        .toLowerCase();
    },

    /***
     * @method camelize([first] = true)
     * @returns String
     * @short Converts underscores and hyphens to camel case. If [first] is true the first letter will also be capitalized.
     * @extra If the Inflections package is included acryonyms can also be defined that will be used when camelizing.
     * @example
     *
     *   'caps_lock'.camelize()              -> 'CapsLock'
     *   'moz-border-radius'.camelize()      -> 'MozBorderRadius'
     *   'moz-border-radius'.camelize(false) -> 'mozBorderRadius'
     *
     ***/
    'camelize': function(first) {
      return this.underscore().replace(/(^|_)([^_]+)/g, function(match, pre, word, index) {
        var acronym = getAcronym(word), capitalize = first !== false || index > 0;
        if(acronym) return capitalize ? acronym : acronym.toLowerCase();
        return capitalize ? word.capitalize() : word;
      });
    },

    /***
     * @method spacify()
     * @returns String
     * @short Converts camel case, underscores, and hyphens to a properly spaced string.
     * @example
     *
     *   'camelCase'.spacify()                         -> 'camel case'
     *   'an-ugly-string'.spacify()                    -> 'an ugly string'
     *   'oh-no_youDid-not'.spacify().capitalize(true) -> 'something else'
     *
     ***/
    'spacify': function() {
      return this.underscore().replace(/_/g, ' ');
    },

    /***
     * @method stripTags([tag1], [tag2], ...)
     * @returns String
     * @short Strips all HTML tags from the string.
     * @extra Tags to strip may be enumerated in the parameters, otherwise will strip all.
     * @example
     *
     *   '<p>just <b>some</b> text</p>'.stripTags()    -> 'just some text'
     *   '<p>just <b>some</b> text</p>'.stripTags('p') -> 'just <b>some</b> text'
     *
     ***/
    'stripTags': function() {
      var str = this, args = arguments.length > 0 ? arguments : [''];
      flattenedArgs(args, function(tag) {
        str = str.replace(regexp('<\/?' + escapeRegExp(tag) + '[^<>]*>', 'gi'), '');
      });
      return str;
    },

    /***
     * @method removeTags([tag1], [tag2], ...)
     * @returns String
     * @short Removes all HTML tags and their contents from the string.
     * @extra Tags to remove may be enumerated in the parameters, otherwise will remove all.
     * @example
     *
     *   '<p>just <b>some</b> text</p>'.removeTags()    -> ''
     *   '<p>just <b>some</b> text</p>'.removeTags('b') -> '<p>just text</p>'
     *
     ***/
    'removeTags': function() {
      var str = this, args = arguments.length > 0 ? arguments : ['\\S+'];
      flattenedArgs(args, function(t) {
        var reg = regexp('<(' + t + ')[^<>]*(?:\\/>|>.*?<\\/\\1>)', 'gi');
        str = str.replace(reg, '');
      });
      return str;
    },

    /***
     * @method truncate(<length>, [split] = true, [from] = 'right', [ellipsis] = '...')
     * @returns String
     * @short Truncates a string.
     * @extra If [split] is %false%, will not split words up, and instead discard the word where the truncation occurred. [from] can also be %"middle"% or %"left"%.
     * @example
     *
     *   'just sittin on the dock of the bay'.truncate(20)                 -> 'just sittin on the do...'
     *   'just sittin on the dock of the bay'.truncate(20, false)          -> 'just sittin on the...'
     *   'just sittin on the dock of the bay'.truncate(20, true, 'middle') -> 'just sitt...of the bay'
     *   'just sittin on the dock of the bay'.truncate(20, true, 'left')   -> '...the dock of the bay'
     *
     ***/
    'truncate': function(length, split, from, ellipsis) {
      var pos,
        prepend = '',
        append = '',
        str = this.toString(),
        chars = '[' + getTrimmableCharacters() + ']+',
        space = '[^' + getTrimmableCharacters() + ']*',
        reg = regexp(chars + space + '$');
      ellipsis = isUndefined(ellipsis) ? '...' : string(ellipsis);
      if(str.length <= length) {
        return str;
      }
      switch(from) {
        case 'left':
          pos = str.length - length;
          prepend = ellipsis;
          str = str.slice(pos);
          reg = regexp('^' + space + chars);
          break;
        case 'middle':
          pos    = floor(length / 2);
          append = ellipsis + str.slice(str.length - pos).trimLeft();
          str    = str.slice(0, pos);
          break;
        default:
          pos = length;
          append = ellipsis;
          str = str.slice(0, pos);
      }
      if(split === false && this.slice(pos, pos + 1).match(/\S/)) {
        str = str.remove(reg);
      }
      return prepend + str + append;
    },

    /***
     * @method pad[Side](<padding> = '', [num] = 1)
     * @returns String
     * @short Pads either/both sides of the string.
     * @extra [num] is the number of characters on each side, and [padding] is the character to pad with.
     *
     * @set
     *   pad
     *   padLeft
     *   padRight
     *
     * @example
     *
     *   'wasabi'.pad('-')         -> '-wasabi-'
     *   'wasabi'.pad('-', 2)      -> '--wasabi--'
     *   'wasabi'.padLeft('-', 2)  -> '--wasabi'
     *   'wasabi'.padRight('-', 2) -> 'wasabi--'
     *
     ***/
    'pad': function(padding, num) {
      return repeatString(num, padding) + this + repeatString(num, padding);
    },

    'padLeft': function(padding, num) {
      return repeatString(num, padding) + this;
    },

    'padRight': function(padding, num) {
      return this + repeatString(num, padding);
    },

    /***
     * @method first([n] = 1)
     * @returns String
     * @short Returns the first [n] characters of the string.
     * @example
     *
     *   'lucky charms'.first()   -> 'l'
     *   'lucky charms'.first(3)  -> 'luc'
     *
     ***/
    'first': function(num) {
      if(isUndefined(num)) num = 1;
      return this.substr(0, num);
    },

    /***
     * @method last([n] = 1)
     * @returns String
     * @short Returns the last [n] characters of the string.
     * @example
     *
     *   'lucky charms'.last()   -> 's'
     *   'lucky charms'.last(3)  -> 'rms'
     *
     ***/
    'last': function(num) {
      if(isUndefined(num)) num = 1;
      var start = this.length - num < 0 ? 0 : this.length - num;
      return this.substr(start);
    },

    /***
     * @method repeat([num] = 0)
     * @returns String
     * @short Returns the string repeated [num] times.
     * @example
     *
     *   'jumpy'.repeat(2) -> 'jumpyjumpy'
     *   'a'.repeat(5)     -> 'aaaaa'
     *   'a'.repeat(0)     -> ''
     *
     ***/
    'repeat': function(num) {
      var result = '', str = this;
      if(!isNumber(num) || num < 1) return '';
      while (num) {
        if (num & 1) {
          result += str;
        }
        if (num >>= 1) {
          str += str;
        }
      }
      return result;
    },

    /***
     * @method toNumber([base] = 10)
     * @returns Number
     * @short Converts the string into a number.
     * @extra Any value with a "." fill be converted to a floating point value, otherwise an integer.
     * @example
     *
     *   '153'.toNumber()    -> 153
     *   '12,000'.toNumber() -> 12000
     *   '10px'.toNumber()   -> 10
     *   'ff'.toNumber(16)   -> 255
     *
     ***/
    'toNumber': function(base) {
      var str = this.replace(/,/g, '');
      return str.match(/\./) ? parseFloat(str) : parseInt(str, base || 10);
    },

    /***
     * @method capitalize([all] = false)
     * @returns String
     * @short Capitalizes the first character in the string.
     * @extra If [all] is true, all words in the string will be capitalized.
     * @example
     *
     *   'hello'.capitalize()           -> 'Hello'
     *   'hello kitty'.capitalize()     -> 'Hello kitty'
     *   'hello kitty'.capitalize(true) -> 'Hello Kitty'
     *
     *
     ***/
    'capitalize': function(all) {
      var lastResponded;
      return this.toLowerCase().replace(all ? /[\s\S]/g : /^\S/, function(lower) {
        var upper = lower.toUpperCase(), result;
        result = lastResponded ? lower : upper;
        lastResponded = upper !== lower;
        return result;
      });
    },

    /***
     * @method assign(<obj1>, <obj2>, ...)
     * @returns String
     * @short Assigns variables to tokens in a string.
     * @extra If an object is passed, it's properties can be assigned using the object's keys. If a non-object (string, number, etc.) is passed it can be accessed by the argument number beginning with 1 (as with regex tokens). Multiple objects can be passed and will be merged together (original objects are unaffected).
     * @example
     *
     *   'Welcome, Mr. {name}.'.assign({ name: 'Franklin' })   -> 'Welcome, Mr. Franklin.'
     *   'You are {1} years old today.'.assign(14)             -> 'You are 14 years old today.'
     *   '{n} and {r}'.assign({ n: 'Cheech' }, { r: 'Chong' }) -> 'Cheech and Chong'
     *
     ***/
    'assign': function() {
      var assign = {};
      multiArgs(arguments, function(a, i) {
        if(isObject(a)) {
          simpleMerge(assign, a);
        } else {
          assign[i + 1] = a;
        }
      });
      return this.replace(/\{([^{]+?)\}/g, function(m, key) {
        return hasOwnProperty(assign, key) ? assign[key] : m;
      });
    }

  });


  // Aliases

  extend(string, true, false, {

    /***
     * @method insert()
     * @alias add
     *
     ***/
    'insert': string.prototype.add
  });

  buildBase64('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=');


  /***
   *
   * @package Inflections
   * @dependency string
   * @description Pluralization similar to ActiveSupport including uncountable words and acronyms. Humanized and URL-friendly strings.
   *
   ***/

  /***
   * String module
   *
   ***/


  var plurals      = [],
      singulars    = [],
      uncountables = [],
      humans       = [],
      acronyms     = {},
      Downcased,
      Inflector;

  function removeFromArray(arr, find) {
    var index = arr.indexOf(find);
    if(index > -1) {
      arr.splice(index, 1);
    }
  }

  function removeFromUncountablesAndAddTo(arr, rule, replacement) {
    if(isString(rule)) {
      removeFromArray(uncountables, rule);
    }
    removeFromArray(uncountables, replacement);
    arr.unshift({ rule: rule, replacement: replacement })
  }

  function paramMatchesType(param, type) {
    return param == type || param == 'all' || !param;
  }

  function isUncountable(word) {
    return uncountables.some(function(uncountable) {
      return new regexp('\\b' + uncountable + '$', 'i').test(word);
    });
  }

  function inflect(word, pluralize) {
    word = isString(word) ? word.toString() : '';
    if(word.isBlank() || isUncountable(word)) {
      return word;
    } else {
      return runReplacements(word, pluralize ? plurals : singulars);
    }
  }

  function runReplacements(word, table) {
    iterateOverObject(table, function(i, inflection) {
      if(word.match(inflection.rule)) {
        word = word.replace(inflection.rule, inflection.replacement);
        return false;
      }
    });
    return word;
  }

  function capitalize(word) {
    return word.replace(/^\W*[a-z]/, function(w){
      return w.toUpperCase();
    });
  }

  Inflector = {

    /*
     * Specifies a new acronym. An acronym must be specified as it will appear in a camelized string.  An underscore
     * string that contains the acronym will retain the acronym when passed to %camelize%, %humanize%, or %titleize%.
     * A camelized string that contains the acronym will maintain the acronym when titleized or humanized, and will
     * convert the acronym into a non-delimited single lowercase word when passed to String#underscore.
     *
     * Examples:
     *   String.Inflector.acronym('HTML')
     *   'html'.titleize()     -> 'HTML'
     *   'html'.camelize()     -> 'HTML'
     *   'MyHTML'.underscore() -> 'my_html'
     *
     * The acronym, however, must occur as a delimited unit and not be part of another word for conversions to recognize it:
     *
     *   String.Inflector.acronym('HTTP')
     *   'my_http_delimited'.camelize() -> 'MyHTTPDelimited'
     *   'https'.camelize()             -> 'Https', not 'HTTPs'
     *   'HTTPS'.underscore()           -> 'http_s', not 'https'
     *
     *   String.Inflector.acronym('HTTPS')
     *   'https'.camelize()   -> 'HTTPS'
     *   'HTTPS'.underscore() -> 'https'
     *
     * Note: Acronyms that are passed to %pluralize% will no longer be recognized, since the acronym will not occur as
     * a delimited unit in the pluralized result. To work around this, you must specify the pluralized form as an
     * acronym as well:
     *
     *    String.Inflector.acronym('API')
     *    'api'.pluralize().camelize() -> 'Apis'
     *
     *    String.Inflector.acronym('APIs')
     *    'api'.pluralize().camelize() -> 'APIs'
     *
     * %acronym% may be used to specify any word that contains an acronym or otherwise needs to maintain a non-standard
     * capitalization. The only restriction is that the word must begin with a capital letter.
     *
     * Examples:
     *   String.Inflector.acronym('RESTful')
     *   'RESTful'.underscore()           -> 'restful'
     *   'RESTfulController'.underscore() -> 'restful_controller'
     *   'RESTfulController'.titleize()   -> 'RESTful Controller'
     *   'restful'.camelize()             -> 'RESTful'
     *   'restful_controller'.camelize()  -> 'RESTfulController'
     *
     *   String.Inflector.acronym('McDonald')
     *   'McDonald'.underscore() -> 'mcdonald'
     *   'mcdonald'.camelize()   -> 'McDonald'
     */
    'acronym': function(word) {
      acronyms[word.toLowerCase()] = word;
      var all = object.keys(acronyms).map(function(key) {
        return acronyms[key];
      });
      Inflector.acronymRegExp = regexp(all.join('|'), 'g');
    },

    /*
     * Specifies a new pluralization rule and its replacement. The rule can either be a string or a regular expression.
     * The replacement should always be a string that may include references to the matched data from the rule.
     */
    'plural': function(rule, replacement) {
      removeFromUncountablesAndAddTo(plurals, rule, replacement);
    },

    /*
     * Specifies a new singularization rule and its replacement. The rule can either be a string or a regular expression.
     * The replacement should always be a string that may include references to the matched data from the rule.
     */
    'singular': function(rule, replacement) {
      removeFromUncountablesAndAddTo(singulars, rule, replacement);
    },

    /*
     * Specifies a new irregular that applies to both pluralization and singularization at the same time. This can only be used
     * for strings, not regular expressions. You simply pass the irregular in singular and plural form.
     *
     * Examples:
     *   String.Inflector.irregular('octopus', 'octopi')
     *   String.Inflector.irregular('person', 'people')
     */
    'irregular': function(singular, plural) {
      var singularFirst      = singular.first(),
          singularRest       = singular.from(1),
          pluralFirst        = plural.first(),
          pluralRest         = plural.from(1),
          pluralFirstUpper   = pluralFirst.toUpperCase(),
          pluralFirstLower   = pluralFirst.toLowerCase(),
          singularFirstUpper = singularFirst.toUpperCase(),
          singularFirstLower = singularFirst.toLowerCase();
      removeFromArray(uncountables, singular);
      removeFromArray(uncountables, plural);
      if(singularFirstUpper == pluralFirstUpper) {
        Inflector.plural(new regexp('({1}){2}$'.assign(singularFirst, singularRest), 'i'), '$1' + pluralRest);
        Inflector.plural(new regexp('({1}){2}$'.assign(pluralFirst, pluralRest), 'i'), '$1' + pluralRest);
        Inflector.singular(new regexp('({1}){2}$'.assign(pluralFirst, pluralRest), 'i'), '$1' + singularRest);
      } else {
        Inflector.plural(new regexp('{1}{2}$'.assign(singularFirstUpper, singularRest)), pluralFirstUpper + pluralRest);
        Inflector.plural(new regexp('{1}{2}$'.assign(singularFirstLower, singularRest)), pluralFirstLower + pluralRest);
        Inflector.plural(new regexp('{1}{2}$'.assign(pluralFirstUpper, pluralRest)), pluralFirstUpper + pluralRest);
        Inflector.plural(new regexp('{1}{2}$'.assign(pluralFirstLower, pluralRest)), pluralFirstLower + pluralRest);
        Inflector.singular(new regexp('{1}{2}$'.assign(pluralFirstUpper, pluralRest)), singularFirstUpper + singularRest);
        Inflector.singular(new regexp('{1}{2}$'.assign(pluralFirstLower, pluralRest)), singularFirstLower + singularRest);
      }
    },

    /*
     * Add uncountable words that shouldn't be attempted inflected.
     *
     * Examples:
     *   String.Inflector.uncountable('money')
     *   String.Inflector.uncountable('money', 'information')
     *   String.Inflector.uncountable(['money', 'information', 'rice'])
     */
    'uncountable': function(first) {
      var add = array.isArray(first) ? first : multiArgs(arguments);
      uncountables = uncountables.concat(add);
    },

    /*
     * Specifies a humanized form of a string by a regular expression rule or by a string mapping.
     * When using a regular expression based replacement, the normal humanize formatting is called after the replacement.
     * When a string is used, the human form should be specified as desired (example: 'The name', not 'the_name')
     *
     * Examples:
     *   String.Inflector.human(/_cnt$/i, '_count')
     *   String.Inflector.human('legacy_col_person_name', 'Name')
     */
    'human': function(rule, replacement) {
      humans.unshift({ rule: rule, replacement: replacement })
    },


    /*
     * Clears the loaded inflections within a given scope (default is 'all').
     * Options are: 'all', 'plurals', 'singulars', 'uncountables', 'humans'.
     *
     * Examples:
     *   String.Inflector.clear('all')
     *   String.Inflector.clear('plurals')
     */
    'clear': function(type) {
      if(paramMatchesType(type, 'singulars'))    singulars    = [];
      if(paramMatchesType(type, 'plurals'))      plurals      = [];
      if(paramMatchesType(type, 'uncountables')) uncountables = [];
      if(paramMatchesType(type, 'humans'))       humans       = [];
      if(paramMatchesType(type, 'acronyms'))     acronyms     = {};
    }

  };

  Downcased = [
    'and', 'or', 'nor', 'a', 'an', 'the', 'so', 'but', 'to', 'of', 'at',
    'by', 'from', 'into', 'on', 'onto', 'off', 'out', 'in', 'over',
    'with', 'for'
  ];

  Inflector.plural(/$/, 's');
  Inflector.plural(/s$/gi, 's');
  Inflector.plural(/(ax|test)is$/gi, '$1es');
  Inflector.plural(/(octop|vir|fung|foc|radi|alumn)(i|us)$/gi, '$1i');
  Inflector.plural(/(census|alias|status)$/gi, '$1es');
  Inflector.plural(/(bu)s$/gi, '$1ses');
  Inflector.plural(/(buffal|tomat)o$/gi, '$1oes');
  Inflector.plural(/([ti])um$/gi, '$1a');
  Inflector.plural(/([ti])a$/gi, '$1a');
  Inflector.plural(/sis$/gi, 'ses');
  Inflector.plural(/f+e?$/gi, 'ves');
  Inflector.plural(/(cuff|roof)$/gi, '$1s');
  Inflector.plural(/([ht]ive)$/gi, '$1s');
  Inflector.plural(/([^aeiouy]o)$/gi, '$1es');
  Inflector.plural(/([^aeiouy]|qu)y$/gi, '$1ies');
  Inflector.plural(/(x|ch|ss|sh)$/gi, '$1es');
  Inflector.plural(/(matr|vert|ind)(?:ix|ex)$/gi, '$1ices');
  Inflector.plural(/([ml])ouse$/gi, '$1ice');
  Inflector.plural(/([ml])ice$/gi, '$1ice');
  Inflector.plural(/^(ox)$/gi, '$1en');
  Inflector.plural(/^(oxen)$/gi, '$1');
  Inflector.plural(/(quiz)$/gi, '$1zes');
  Inflector.plural(/(phot|cant|hom|zer|pian|portic|pr|quart|kimon)o$/gi, '$1os');
  Inflector.plural(/(craft)$/gi, '$1');
  Inflector.plural(/([ft])[eo]{2}(th?)$/gi, '$1ee$2');

  Inflector.singular(/s$/gi, '');
  Inflector.singular(/([pst][aiu]s)$/gi, '$1');
  Inflector.singular(/([aeiouy])ss$/gi, '$1ss');
  Inflector.singular(/(n)ews$/gi, '$1ews');
  Inflector.singular(/([ti])a$/gi, '$1um');
  Inflector.singular(/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$/gi, '$1$2sis');
  Inflector.singular(/(^analy)ses$/gi, '$1sis');
  Inflector.singular(/(i)(f|ves)$/i, '$1fe');
  Inflector.singular(/([aeolr]f?)(f|ves)$/i, '$1f');
  Inflector.singular(/([ht]ive)s$/gi, '$1');
  Inflector.singular(/([^aeiouy]|qu)ies$/gi, '$1y');
  Inflector.singular(/(s)eries$/gi, '$1eries');
  Inflector.singular(/(m)ovies$/gi, '$1ovie');
  Inflector.singular(/(x|ch|ss|sh)es$/gi, '$1');
  Inflector.singular(/([ml])(ous|ic)e$/gi, '$1ouse');
  Inflector.singular(/(bus)(es)?$/gi, '$1');
  Inflector.singular(/(o)es$/gi, '$1');
  Inflector.singular(/(shoe)s?$/gi, '$1');
  Inflector.singular(/(cris|ax|test)[ie]s$/gi, '$1is');
  Inflector.singular(/(octop|vir|fung|foc|radi|alumn)(i|us)$/gi, '$1us');
  Inflector.singular(/(census|alias|status)(es)?$/gi, '$1');
  Inflector.singular(/^(ox)(en)?/gi, '$1');
  Inflector.singular(/(vert|ind)(ex|ices)$/gi, '$1ex');
  Inflector.singular(/(matr)(ix|ices)$/gi, '$1ix');
  Inflector.singular(/(quiz)(zes)?$/gi, '$1');
  Inflector.singular(/(database)s?$/gi, '$1');
  Inflector.singular(/ee(th?)$/gi, 'oo$1');

  Inflector.irregular('person', 'people');
  Inflector.irregular('man', 'men');
  Inflector.irregular('child', 'children');
  Inflector.irregular('sex', 'sexes');
  Inflector.irregular('move', 'moves');
  Inflector.irregular('save', 'saves');
  Inflector.irregular('save', 'saves');
  Inflector.irregular('cow', 'kine');
  Inflector.irregular('goose', 'geese');
  Inflector.irregular('zombie', 'zombies');

  Inflector.uncountable('equipment,information,rice,money,species,series,fish,sheep,jeans'.split(','));


  extend(string, true, false, {

    /***
     * @method pluralize()
     * @returns String
     * @short Returns the plural form of the word in the string.
     * @example
     *
     *   'post'.pluralize()         -> 'posts'
     *   'octopus'.pluralize()      -> 'octopi'
     *   'sheep'.pluralize()        -> 'sheep'
     *   'words'.pluralize()        -> 'words'
     *   'CamelOctopus'.pluralize() -> 'CamelOctopi'
     *
     ***/
    'pluralize': function() {
      return inflect(this, true);
    },

    /***
     * @method singularize()
     * @returns String
     * @short The reverse of String#pluralize. Returns the singular form of a word in a string.
     * @example
     *
     *   'posts'.singularize()       -> 'post'
     *   'octopi'.singularize()      -> 'octopus'
     *   'sheep'.singularize()       -> 'sheep'
     *   'word'.singularize()        -> 'word'
     *   'CamelOctopi'.singularize() -> 'CamelOctopus'
     *
     ***/
    'singularize': function() {
      return inflect(this, false);
    },

    /***
     * @method humanize()
     * @returns String
     * @short Creates a human readable string.
     * @extra Capitalizes the first word and turns underscores into spaces and strips a trailing '_id', if any. Like String#titleize, this is meant for creating pretty output.
     * @example
     *
     *   'employee_salary'.humanize() -> 'Employee salary'
     *   'author_id'.humanize()       -> 'Author'
     *
     ***/
    'humanize': function() {
      var str = runReplacements(this, humans), acronym;
      str = str.replace(/_id$/g, '');
      str = str.replace(/(_)?([a-z\d]*)/gi, function(match, _, word){
        acronym = hasOwnProperty(acronyms, word) ? acronyms[word] : null;
        return (_ ? ' ' : '') + (acronym || word.toLowerCase());
      });
      return capitalize(str);
    },

    /***
     * @method titleize()
     * @returns String
     * @short Creates a title version of the string.
     * @extra Capitalizes all the words and replaces some characters in the string to create a nicer looking title. String#titleize is meant for creating pretty output.
     * @example
     *
     *   'man from the boondocks'.titleize() -> 'Man from the Boondocks'
     *   'x-men: the last stand'.titleize() -> 'X Men: The Last Stand'
     *   'TheManWithoutAPast'.titleize() -> 'The Man Without a Past'
     *   'raiders_of_the_lost_ark'.titleize() -> 'Raiders of the Lost Ark'
     *
     ***/
    'titleize': function() {
      var fullStopPunctuation = /[.:;!]$/, hasPunctuation, lastHadPunctuation, isFirstOrLast;
      return this.spacify().humanize().words(function(word, index, words) {
        hasPunctuation = fullStopPunctuation.test(word);
        isFirstOrLast = index == 0 || index == words.length - 1 || hasPunctuation || lastHadPunctuation;
        lastHadPunctuation = hasPunctuation;
        if(isFirstOrLast || Downcased.indexOf(word) === -1) {
          return capitalize(word);
        } else {
          return word;
        }
      }).join(' ');
    },

    /***
     * @method parameterize()
     * @returns String
     * @short Replaces special characters in a string so that it may be used as part of a pretty URL.
     * @example
     *
     *   'hell, no!'.parameterize() -> 'hell-no'
     *
     ***/
    'parameterize': function(separator) {
      var str = this;
      if(separator === undefined) separator = '-';
      if(str.normalize) {
        str = str.normalize();
      }
      str = str.replace(/[^a-z0-9\-_]+/gi, separator)
      if(separator) {
        str = str.replace(new regexp('^{sep}+|{sep}+$|({sep}){sep}+'.assign({ 'sep': escapeRegExp(separator) }), 'g'), '$1');
      }
      return encodeURI(str.toLowerCase());
    }

  });

  string.Inflector = Inflector;
  string.Inflector.acronyms = acronyms;


  /***
   *
   * @package Language
   * @dependency string
   * @description Normalizing accented characters, character width conversion, Hiragana and Katakana conversions.
   *
   ***/

  /***
   * String module
   *
   ***/



  var NormalizeMap,
      NormalizeReg = '',
      NormalizeSource;


  /***
   * @method has[Script]()
   * @returns Boolean
   * @short Returns true if the string contains any characters in that script.
   *
   * @set
   *   hasArabic
   *   hasCyrillic
   *   hasGreek
   *   hasHangul
   *   hasHan
   *   hasKanji
   *   hasHebrew
   *   hasHiragana
   *   hasKana
   *   hasKatakana
   *   hasLatin
   *   hasThai
   *   hasDevanagari
   *
   * @example
   *
   *   'أتكلم'.hasArabic()          -> true
   *   'визит'.hasCyrillic()        -> true
   *   '잘 먹겠습니다!'.hasHangul() -> true
   *   'ミックスです'.hasKatakana() -> true
   *   "l'année".hasLatin()         -> true
   *
   ***
   * @method is[Script]()
   * @returns Boolean
   * @short Returns true if the string contains only characters in that script. Whitespace is ignored.
   *
   * @set
   *   isArabic
   *   isCyrillic
   *   isGreek
   *   isHangul
   *   isHan
   *   isKanji
   *   isHebrew
   *   isHiragana
   *   isKana
   *   isKatakana
   *   isKatakana
   *   isThai
   *   isDevanagari
   *
   * @example
   *
   *   'أتكلم'.isArabic()          -> true
   *   'визит'.isCyrillic()        -> true
   *   '잘 먹겠습니다!'.isHangul() -> true
   *   'ミックスです'.isKatakana() -> false
   *   "l'année".isLatin()         -> true
   *
   ***/
  var unicodeScripts = [
    { names: ['Arabic'],      source: '\u0600-\u06FF' },
    { names: ['Cyrillic'],    source: '\u0400-\u04FF' },
    { names: ['Devanagari'],  source: '\u0900-\u097F' },
    { names: ['Greek'],       source: '\u0370-\u03FF' },
    { names: ['Hangul'],      source: '\uAC00-\uD7AF\u1100-\u11FF' },
    { names: ['Han','Kanji'], source: '\u4E00-\u9FFF\uF900-\uFAFF' },
    { names: ['Hebrew'],      source: '\u0590-\u05FF' },
    { names: ['Hiragana'],    source: '\u3040-\u309F\u30FB-\u30FC' },
    { names: ['Kana'],        source: '\u3040-\u30FF\uFF61-\uFF9F' },
    { names: ['Katakana'],    source: '\u30A0-\u30FF\uFF61-\uFF9F' },
    { names: ['Latin'],       source: '\u0001-\u007F\u0080-\u00FF\u0100-\u017F\u0180-\u024F' },
    { names: ['Thai'],        source: '\u0E00-\u0E7F' }
  ];

  function buildUnicodeScripts() {
    unicodeScripts.forEach(function(s) {
      var is = regexp('^['+s.source+'\\s]+$');
      var has = regexp('['+s.source+']');
      s.names.forEach(function(name) {
        defineProperty(string.prototype, 'is' + name, function() { return is.test(this.trim()); });
        defineProperty(string.prototype, 'has' + name, function() { return has.test(this); });
      });
    });
  }

  // Support for converting character widths and katakana to hiragana.

  var widthConversionRanges = [
    { type: 'a', shift: 65248, start: 65,  end: 90  },
    { type: 'a', shift: 65248, start: 97,  end: 122 },
    { type: 'n', shift: 65248, start: 48,  end: 57  },
    { type: 'p', shift: 65248, start: 33,  end: 47  },
    { type: 'p', shift: 65248, start: 58,  end: 64  },
    { type: 'p', shift: 65248, start: 91,  end: 96  },
    { type: 'p', shift: 65248, start: 123, end: 126 }
  ];

  var WidthConversionTable;
  var allHankaku   = /[\u0020-\u00A5]|[\uFF61-\uFF9F][ﾞﾟ]?/g;
  var allZenkaku   = /[\u3000-\u301C]|[\u301A-\u30FC]|[\uFF01-\uFF60]|[\uFFE0-\uFFE6]/g;
  var hankakuPunctuation  = '｡､｢｣¥¢£';
  var zenkakuPunctuation  = '。、「」￥￠￡';
  var voicedKatakana      = /[カキクケコサシスセソタチツテトハヒフヘホ]/;
  var semiVoicedKatakana  = /[ハヒフヘホヲ]/;
  var hankakuKatakana     = 'ｱｲｳｴｵｧｨｩｪｫｶｷｸｹｺｻｼｽｾｿﾀﾁﾂｯﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔｬﾕｭﾖｮﾗﾘﾙﾚﾛﾜｦﾝｰ･';
  var zenkakuKatakana     = 'アイウエオァィゥェォカキクケコサシスセソタチツッテトナニヌネノハヒフヘホマミムメモヤャユュヨョラリルレロワヲンー・';

  function convertCharacterWidth(str, args, reg, type) {
    if(!WidthConversionTable) {
      buildWidthConversionTables();
    }
    var mode = multiArgs(args).join(''), table = WidthConversionTable[type];
    mode = mode.replace(/all/, '').replace(/(\w)lphabet|umbers?|atakana|paces?|unctuation/g, '$1');
    return str.replace(reg, function(c) {
      if(table[c] && (!mode || mode.has(table[c].type))) {
        return table[c].to;
      } else {
        return c;
      }
    });
  }

  function buildWidthConversionTables() {
    var hankaku;
    WidthConversionTable = {
      'zenkaku': {},
      'hankaku': {}
    };
    widthConversionRanges.forEach(function(r) {
      getRange(r.start, r.end, function(n) {
        setWidthConversion(r.type, chr(n), chr(n + r.shift));
      });
    });
    zenkakuKatakana.each(function(c, i) {
      hankaku = hankakuKatakana.charAt(i);
      setWidthConversion('k', hankaku, c);
      if(c.match(voicedKatakana)) {
        setWidthConversion('k', hankaku + 'ﾞ', c.shift(1));
      }
      if(c.match(semiVoicedKatakana)) {
        setWidthConversion('k', hankaku + 'ﾟ', c.shift(2));
      }
    });
    zenkakuPunctuation.each(function(c, i) {
      setWidthConversion('p', hankakuPunctuation.charAt(i), c);
    });
    setWidthConversion('k', 'ｳﾞ', 'ヴ');
    setWidthConversion('k', 'ｦﾞ', 'ヺ');
    setWidthConversion('s', ' ', '　');
  }

  function setWidthConversion(type, half, full) {
    WidthConversionTable['zenkaku'][half] = { type: type, to: full };
    WidthConversionTable['hankaku'][full] = { type: type, to: half };
  }




  function buildNormalizeMap() {
    NormalizeMap = {};
    iterateOverObject(NormalizeSource, function(normalized, str) {
      str.split('').forEach(function(character) {
        NormalizeMap[character] = normalized;
      });
      NormalizeReg += str;
    });
    NormalizeReg = regexp('[' + NormalizeReg + ']', 'g');
  }

  NormalizeSource = {
    'A':  'AⒶＡÀÁÂẦẤẪẨÃĀĂẰẮẴẲȦǠÄǞẢÅǺǍȀȂẠẬẶḀĄȺⱯ',
    'B':  'BⒷＢḂḄḆɃƂƁ',
    'C':  'CⒸＣĆĈĊČÇḈƇȻꜾ',
    'D':  'DⒹＤḊĎḌḐḒḎĐƋƊƉꝹ',
    'E':  'EⒺＥÈÉÊỀẾỄỂẼĒḔḖĔĖËẺĚȄȆẸỆȨḜĘḘḚƐƎ',
    'F':  'FⒻＦḞƑꝻ',
    'G':  'GⒼＧǴĜḠĞĠǦĢǤƓꞠꝽꝾ',
    'H':  'HⒽＨĤḢḦȞḤḨḪĦⱧⱵꞍ',
    'I':  'IⒾＩÌÍÎĨĪĬİÏḮỈǏȈȊỊĮḬƗ',
    'J':  'JⒿＪĴɈ',
    'K':  'KⓀＫḰǨḲĶḴƘⱩꝀꝂꝄꞢ',
    'L':  'LⓁＬĿĹĽḶḸĻḼḺŁȽⱢⱠꝈꝆꞀ',
    'M':  'MⓂＭḾṀṂⱮƜ',
    'N':  'NⓃＮǸŃÑṄŇṆŅṊṈȠƝꞐꞤ',
    'O':  'OⓄＯÒÓÔỒỐỖỔÕṌȬṎŌṐṒŎȮȰÖȪỎŐǑȌȎƠỜỚỠỞỢỌỘǪǬØǾƆƟꝊꝌ',
    'P':  'PⓅＰṔṖƤⱣꝐꝒꝔ',
    'Q':  'QⓆＱꝖꝘɊ',
    'R':  'RⓇＲŔṘŘȐȒṚṜŖṞɌⱤꝚꞦꞂ',
    'S':  'SⓈＳẞŚṤŜṠŠṦṢṨȘŞⱾꞨꞄ',
    'T':  'TⓉＴṪŤṬȚŢṰṮŦƬƮȾꞆ',
    'U':  'UⓊＵÙÚÛŨṸŪṺŬÜǛǗǕǙỦŮŰǓȔȖƯỪỨỮỬỰỤṲŲṶṴɄ',
    'V':  'VⓋＶṼṾƲꝞɅ',
    'W':  'WⓌＷẀẂŴẆẄẈⱲ',
    'X':  'XⓍＸẊẌ',
    'Y':  'YⓎＹỲÝŶỸȲẎŸỶỴƳɎỾ',
    'Z':  'ZⓏＺŹẐŻŽẒẔƵȤⱿⱫꝢ',
    'a':  'aⓐａẚàáâầấẫẩãāăằắẵẳȧǡäǟảåǻǎȁȃạậặḁąⱥɐ',
    'b':  'bⓑｂḃḅḇƀƃɓ',
    'c':  'cⓒｃćĉċčçḉƈȼꜿↄ',
    'd':  'dⓓｄḋďḍḑḓḏđƌɖɗꝺ',
    'e':  'eⓔｅèéêềếễểẽēḕḗĕėëẻěȅȇẹệȩḝęḙḛɇɛǝ',
    'f':  'fⓕｆḟƒꝼ',
    'g':  'gⓖｇǵĝḡğġǧģǥɠꞡᵹꝿ',
    'h':  'hⓗｈĥḣḧȟḥḩḫẖħⱨⱶɥ',
    'i':  'iⓘｉìíîĩīĭïḯỉǐȉȋịįḭɨı',
    'j':  'jⓙｊĵǰɉ',
    'k':  'kⓚｋḱǩḳķḵƙⱪꝁꝃꝅꞣ',
    'l':  'lⓛｌŀĺľḷḹļḽḻſłƚɫⱡꝉꞁꝇ',
    'm':  'mⓜｍḿṁṃɱɯ',
    'n':  'nⓝｎǹńñṅňṇņṋṉƞɲŉꞑꞥ',
    'o':  'oⓞｏòóôồốỗổõṍȭṏōṑṓŏȯȱöȫỏőǒȍȏơờớỡởợọộǫǭøǿɔꝋꝍɵ',
    'p':  'pⓟｐṕṗƥᵽꝑꝓꝕ',
    'q':  'qⓠｑɋꝗꝙ',
    'r':  'rⓡｒŕṙřȑȓṛṝŗṟɍɽꝛꞧꞃ',
    's':  'sⓢｓśṥŝṡšṧṣṩșşȿꞩꞅẛ',
    't':  'tⓣｔṫẗťṭțţṱṯŧƭʈⱦꞇ',
    'u':  'uⓤｕùúûũṹūṻŭüǜǘǖǚủůűǔȕȗưừứữửựụṳųṷṵʉ',
    'v':  'vⓥｖṽṿʋꝟʌ',
    'w':  'wⓦｗẁẃŵẇẅẘẉⱳ',
    'x':  'xⓧｘẋẍ',
    'y':  'yⓨｙỳýŷỹȳẏÿỷẙỵƴɏỿ',
    'z':  'zⓩｚźẑżžẓẕƶȥɀⱬꝣ',
    'AA': 'Ꜳ',
    'AE': 'ÆǼǢ',
    'AO': 'Ꜵ',
    'AU': 'Ꜷ',
    'AV': 'ꜸꜺ',
    'AY': 'Ꜽ',
    'DZ': 'ǱǄ',
    'Dz': 'ǲǅ',
    'LJ': 'Ǉ',
    'Lj': 'ǈ',
    'NJ': 'Ǌ',
    'Nj': 'ǋ',
    'OI': 'Ƣ',
    'OO': 'Ꝏ',
    'OU': 'Ȣ',
    'TZ': 'Ꜩ',
    'VY': 'Ꝡ',
    'aa': 'ꜳ',
    'ae': 'æǽǣ',
    'ao': 'ꜵ',
    'au': 'ꜷ',
    'av': 'ꜹꜻ',
    'ay': 'ꜽ',
    'dz': 'ǳǆ',
    'hv': 'ƕ',
    'lj': 'ǉ',
    'nj': 'ǌ',
    'oi': 'ƣ',
    'ou': 'ȣ',
    'oo': 'ꝏ',
    'ss': 'ß',
    'tz': 'ꜩ',
    'vy': 'ꝡ'
  };

  extend(string, true, false, {
    /***
     * @method normalize()
     * @returns String
     * @short Returns the string with accented and non-standard Latin-based characters converted into ASCII approximate equivalents.
     * @example
     *
     *   'á'.normalize()                  -> 'a'
     *   'Ménage à trois'.normalize()     -> 'Menage a trois'
     *   'Volkswagen'.normalize()         -> 'Volkswagen'
     *   'ＦＵＬＬＷＩＤＴＨ'.normalize() -> 'FULLWIDTH'
     *
     ***/
    'normalize': function() {
      if(!NormalizeMap) {
        buildNormalizeMap();
      }
      return this.replace(NormalizeReg, function(character) {
        return NormalizeMap[character];
      });
    },

    /***
     * @method hankaku([mode] = 'all')
     * @returns String
     * @short Converts full-width characters (zenkaku) to half-width (hankaku).
     * @extra [mode] accepts any combination of "a" (alphabet), "n" (numbers), "k" (katakana), "s" (spaces), "p" (punctuation), or "all".
     * @example
     *
     *   'タロウ　ＹＡＭＡＤＡです！'.hankaku()                      -> 'ﾀﾛｳ YAMADAです!'
     *   'タロウ　ＹＡＭＡＤＡです！'.hankaku('a')                   -> 'タロウ　YAMADAです！'
     *   'タロウ　ＹＡＭＡＤＡです！'.hankaku('alphabet')            -> 'タロウ　YAMADAです！'
     *   'タロウです！　２５歳です！'.hankaku('katakana', 'numbers') -> 'ﾀﾛｳです！　25歳です！'
     *   'タロウです！　２５歳です！'.hankaku('k', 'n')              -> 'ﾀﾛｳです！　25歳です！'
     *   'タロウです！　２５歳です！'.hankaku('kn')                  -> 'ﾀﾛｳです！　25歳です！'
     *   'タロウです！　２５歳です！'.hankaku('sp')                  -> 'タロウです! ２５歳です!'
     *
     ***/
    'hankaku': function() {
      return convertCharacterWidth(this, arguments, allZenkaku, 'hankaku');
    },

    /***
     * @method zenkaku([mode] = 'all')
     * @returns String
     * @short Converts half-width characters (hankaku) to full-width (zenkaku).
     * @extra [mode] accepts any combination of "a" (alphabet), "n" (numbers), "k" (katakana), "s" (spaces), "p" (punctuation), or "all".
     * @example
     *
     *   'ﾀﾛｳ YAMADAです!'.zenkaku()                         -> 'タロウ　ＹＡＭＡＤＡです！'
     *   'ﾀﾛｳ YAMADAです!'.zenkaku('a')                      -> 'ﾀﾛｳ ＹＡＭＡＤＡです!'
     *   'ﾀﾛｳ YAMADAです!'.zenkaku('alphabet')               -> 'ﾀﾛｳ ＹＡＭＡＤＡです!'
     *   'ﾀﾛｳです! 25歳です!'.zenkaku('katakana', 'numbers') -> 'タロウです! ２５歳です!'
     *   'ﾀﾛｳです! 25歳です!'.zenkaku('k', 'n')              -> 'タロウです! ２５歳です!'
     *   'ﾀﾛｳです! 25歳です!'.zenkaku('kn')                  -> 'タロウです! ２５歳です!'
     *   'ﾀﾛｳです! 25歳です!'.zenkaku('sp')                  -> 'ﾀﾛｳです！　25歳です！'
     *
     ***/
    'zenkaku': function() {
      return convertCharacterWidth(this, arguments, allHankaku, 'zenkaku');
    },

    /***
     * @method hiragana([all] = true)
     * @returns String
     * @short Converts katakana into hiragana.
     * @extra If [all] is false, only full-width katakana will be converted.
     * @example
     *
     *   'カタカナ'.hiragana()   -> 'かたかな'
     *   'コンニチハ'.hiragana() -> 'こんにちは'
     *   'ｶﾀｶﾅ'.hiragana()       -> 'かたかな'
     *   'ｶﾀｶﾅ'.hiragana(false)  -> 'ｶﾀｶﾅ'
     *
     ***/
    'hiragana': function(all) {
      var str = this;
      if(all !== false) {
        str = str.zenkaku('k');
      }
      return str.replace(/[\u30A1-\u30F6]/g, function(c) {
        return c.shift(-96);
      });
    },

    /***
     * @method katakana()
     * @returns String
     * @short Converts hiragana into katakana.
     * @example
     *
     *   'かたかな'.katakana()   -> 'カタカナ'
     *   'こんにちは'.katakana() -> 'コンニチハ'
     *
     ***/
    'katakana': function() {
      return this.replace(/[\u3041-\u3096]/g, function(c) {
        return c.shift(96);
      });
    }


  });

  buildUnicodeScripts();

/*
 *
 * Date.addLocale(<code>) adds this locale to Sugar.
 * To set the locale globally, simply call:
 *
 * Date.setLocale('da');
 *
 * var locale = Date.getLocale(<code>) will return this object, which
 * can be tweaked to change the behavior of parsing/formatting in the locales.
 *
 * locale.addFormat adds a date format (see this file for examples).
 * Special tokens in the date format will be parsed out into regex tokens:
 *
 * {0} is a reference to an entry in locale.tokens. Output: (?:the)?
 * {unit} is a reference to all units. Output: (day|week|month|...)
 * {unit3} is a reference to a specific unit. Output: (hour)
 * {unit3-5} is a reference to a subset of the units array. Output: (hour|day|week)
 * {unit?} "?" makes that token optional. Output: (day|week|month)?
 *
 * {day} Any reference to tokens in the modifiers array will include all with the same name. Output: (yesterday|today|tomorrow)
 *
 * All spaces are optional and will be converted to "\s*"
 *
 * Locale arrays months, weekdays, units, numbers, as well as the "src" field for
 * all entries in the modifiers array follow a special format indicated by a colon:
 *
 * minute:|s  = minute|minutes
 * thicke:n|r = thicken|thicker
 *
 * Additionally in the months, weekdays, units, and numbers array these will be added at indexes that are multiples
 * of the relevant number for retrieval. For example having "sunday:|s" in the units array will result in:
 *
 * units: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sundays']
 *
 * When matched, the index will be found using:
 *
 * units.indexOf(match) % 7;
 *
 * Resulting in the correct index with any number of alternates for that entry.
 *
 */

Date.addLocale('da', {
  'plural': true,
  'months': 'januar,februar,marts,april,maj,juni,juli,august,september,oktober,november,december',
  'weekdays': 'søndag|sondag,mandag,tirsdag,onsdag,torsdag,fredag,lørdag|lordag',
  'units': 'millisekund:|er,sekund:|er,minut:|ter,tim:e|er,dag:|e,ug:e|er|en,måned:|er|en+maaned:|er|en,år:||et+aar:||et',
  'numbers': 'en|et,to,tre,fire,fem,seks,syv,otte,ni,ti',
  'tokens': 'den,for',
  'articles': 'den',
  'short':'d. {d}. {month} {yyyy}',
  'long': 'den {d}. {month} {yyyy} {H}:{mm}',
  'full': '{Weekday} den {d}. {month} {yyyy} {H}:{mm}:{ss}',
  'past': '{num} {unit} {sign}',
  'future': '{sign} {num} {unit}',
  'duration': '{num} {unit}',
  'ampm': 'am,pm',
  'modifiers': [
    { 'name': 'day', 'src': 'forgårs|i forgårs|forgaars|i forgaars', 'value': -2 },
    { 'name': 'day', 'src': 'i går|igår|i gaar|igaar', 'value': -1 },
    { 'name': 'day', 'src': 'i dag|idag', 'value': 0 },
    { 'name': 'day', 'src': 'i morgen|imorgen', 'value': 1 },
    { 'name': 'day', 'src': 'over morgon|overmorgen|i over morgen|i overmorgen|iovermorgen', 'value': 2 },
    { 'name': 'sign', 'src': 'siden', 'value': -1 },
    { 'name': 'sign', 'src': 'om', 'value':  1 },
    { 'name': 'shift', 'src': 'i sidste|sidste', 'value': -1 },
    { 'name': 'shift', 'src': 'denne', 'value': 0 },
    { 'name': 'shift', 'src': 'næste|naeste', 'value': 1 }
  ],
  'dateParse': [
    '{num} {unit} {sign}',
    '{sign} {num} {unit}',
    '{1?} {num} {unit} {sign}',
    '{shift} {unit=5-7}'
  ],
  'timeParse': [
    '{0?} {weekday?} {date?} {month} {year}',
    '{date} {month}',
    '{shift} {weekday}'
  ]
});

/*
 *
 * Date.addLocale(<code>) adds this locale to Sugar.
 * To set the locale globally, simply call:
 *
 * Date.setLocale('de');
 *
 * var locale = Date.getLocale(<code>) will return this object, which
 * can be tweaked to change the behavior of parsing/formatting in the locales.
 *
 * locale.addFormat adds a date format (see this file for examples).
 * Special tokens in the date format will be parsed out into regex tokens:
 *
 * {0} is a reference to an entry in locale.tokens. Output: (?:the)?
 * {unit} is a reference to all units. Output: (day|week|month|...)
 * {unit3} is a reference to a specific unit. Output: (hour)
 * {unit3-5} is a reference to a subset of the units array. Output: (hour|day|week)
 * {unit?} "?" makes that token optional. Output: (day|week|month)?
 *
 * {day} Any reference to tokens in the modifiers array will include all with the same name. Output: (yesterday|today|tomorrow)
 *
 * All spaces are optional and will be converted to "\s*"
 *
 * Locale arrays months, weekdays, units, numbers, as well as the "src" field for
 * all entries in the modifiers array follow a special format indicated by a colon:
 *
 * minute:|s  = minute|minutes
 * thicke:n|r = thicken|thicker
 *
 * Additionally in the months, weekdays, units, and numbers array these will be added at indexes that are multiples
 * of the relevant number for retrieval. For example having "sunday:|s" in the units array will result in:
 *
 * units: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sundays']
 *
 * When matched, the index will be found using:
 *
 * units.indexOf(match) % 7;
 *
 * Resulting in the correct index with any number of alternates for that entry.
 *
 */

Date.addLocale('de', {
  'plural': true,
   'capitalizeUnit': true,
  'months': 'Januar,Februar,März|Marz,April,Mai,Juni,Juli,August,September,Oktober,November,Dezember',
  'weekdays': 'Sonntag,Montag,Dienstag,Mittwoch,Donnerstag,Freitag,Samstag',
  'units': 'Millisekunde:|n,Sekunde:|n,Minute:|n,Stunde:|n,Tag:|en,Woche:|n,Monat:|en,Jahr:|en',
  'numbers': 'ein:|e|er|en|em,zwei,drei,vier,fuenf,sechs,sieben,acht,neun,zehn',
  'tokens': 'der',
  'short':'{d}. {Month} {yyyy}',
  'long': '{d}. {Month} {yyyy} {H}:{mm}',
  'full': '{Weekday} {d}. {Month} {yyyy} {H}:{mm}:{ss}',
  'past': '{sign} {num} {unit}',
  'future': '{sign} {num} {unit}',
  'duration': '{num} {unit}',
  'timeMarker': 'um',
  'ampm': 'am,pm',
  'modifiers': [
    { 'name': 'day', 'src': 'vorgestern', 'value': -2 },
    { 'name': 'day', 'src': 'gestern', 'value': -1 },
    { 'name': 'day', 'src': 'heute', 'value': 0 },
    { 'name': 'day', 'src': 'morgen', 'value': 1 },
    { 'name': 'day', 'src': 'übermorgen|ubermorgen|uebermorgen', 'value': 2 },
    { 'name': 'sign', 'src': 'vor:|her', 'value': -1 },
    { 'name': 'sign', 'src': 'in', 'value': 1 },
    { 'name': 'shift', 'src': 'letzte:|r|n|s', 'value': -1 },
    { 'name': 'shift', 'src': 'nächste:|r|n|s+nachste:|r|n|s+naechste:|r|n|s+kommende:n|r', 'value': 1 }
  ],
  'dateParse': [
    '{sign} {num} {unit}',
    '{num} {unit} {sign}',
    '{shift} {unit=5-7}'
  ],
  'timeParse': [
    '{weekday?} {date?} {month} {year?}',
    '{shift} {weekday}'
  ]
});

/*
 *
 * Date.addLocale(<code>) adds this locale to Sugar.
 * To set the locale globally, simply call:
 *
 * Date.setLocale('es');
 *
 * var locale = Date.getLocale(<code>) will return this object, which
 * can be tweaked to change the behavior of parsing/formatting in the locales.
 *
 * locale.addFormat adds a date format (see this file for examples).
 * Special tokens in the date format will be parsed out into regex tokens:
 *
 * {0} is a reference to an entry in locale.tokens. Output: (?:the)?
 * {unit} is a reference to all units. Output: (day|week|month|...)
 * {unit3} is a reference to a specific unit. Output: (hour)
 * {unit3-5} is a reference to a subset of the units array. Output: (hour|day|week)
 * {unit?} "?" makes that token optional. Output: (day|week|month)?
 *
 * {day} Any reference to tokens in the modifiers array will include all with the same name. Output: (yesterday|today|tomorrow)
 *
 * All spaces are optional and will be converted to "\s*"
 *
 * Locale arrays months, weekdays, units, numbers, as well as the "src" field for
 * all entries in the modifiers array follow a special format indicated by a colon:
 *
 * minute:|s  = minute|minutes
 * thicke:n|r = thicken|thicker
 *
 * Additionally in the months, weekdays, units, and numbers array these will be added at indexes that are multiples
 * of the relevant number for retrieval. For example having "sunday:|s" in the units array will result in:
 *
 * units: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sundays']
 *
 * When matched, the index will be found using:
 *
 * units.indexOf(match) % 7;
 *
 * Resulting in the correct index with any number of alternates for that entry.
 *
 */

Date.addLocale('es', {
  'plural': true,
  'months': 'enero,febrero,marzo,abril,mayo,junio,julio,agosto,septiembre,octubre,noviembre,diciembre',
  'weekdays': 'domingo,lunes,martes,miércoles|miercoles,jueves,viernes,sábado|sabado',
  'units': 'milisegundo:|s,segundo:|s,minuto:|s,hora:|s,día|días|dia|dias,semana:|s,mes:|es,año|años|ano|anos',
  'numbers': 'uno,dos,tres,cuatro,cinco,seis,siete,ocho,nueve,diez',
  'tokens': 'el,de',
  'short':'{d} {month} {yyyy}',
  'long': '{d} {month} {yyyy} {H}:{mm}',
  'full': '{Weekday} {d} {month} {yyyy} {H}:{mm}:{ss}',
  'past': '{sign} {num} {unit}',
  'future': '{num} {unit} {sign}',
  'duration': '{num} {unit}',
  'timeMarker': 'a las',
  'ampm': 'am,pm',
  'modifiers': [
    { 'name': 'day', 'src': 'anteayer', 'value': -2 },
    { 'name': 'day', 'src': 'ayer', 'value': -1 },
    { 'name': 'day', 'src': 'hoy', 'value': 0 },
    { 'name': 'day', 'src': 'mañana|manana', 'value': 1 },
    { 'name': 'sign', 'src': 'hace', 'value': -1 },
    { 'name': 'sign', 'src': 'de ahora', 'value': 1 },
    { 'name': 'shift', 'src': 'pasad:o|a', 'value': -1 },
    { 'name': 'shift', 'src': 'próximo|próxima|proximo|proxima', 'value': 1 }
  ],
  'dateParse': [
    '{sign} {num} {unit}',
    '{num} {unit} {sign}',
    '{0?} {unit=5-7} {shift}',
    '{0?} {shift} {unit=5-7}'
  ],
  'timeParse': [
    '{shift} {weekday}',
    '{weekday} {shift}',
    '{date?} {1?} {month} {1?} {year?}'
  ]
});
Date.addLocale('fi', {
    'plural':     true,
    'timeMarker': 'kello',
    'ampm':       ',',
    'months':     'tammikuu,helmikuu,maaliskuu,huhtikuu,toukokuu,kesäkuu,heinäkuu,elokuu,syyskuu,lokakuu,marraskuu,joulukuu',
    'weekdays':   'sunnuntai,maanantai,tiistai,keskiviikko,torstai,perjantai,lauantai',
    'units':      'millisekun:ti|tia|teja|tina|nin,sekun:ti|tia|teja|tina|nin,minuut:ti|tia|teja|tina|in,tun:ti|tia|teja|tina|nin,päiv:ä|ää|iä|änä|än,viik:ko|koa|koja|on|kona,kuukau:si|sia|tta|den|tena,vuo:si|sia|tta|den|tena',
    'numbers':    'yksi|ensimmäinen,kaksi|toinen,kolm:e|as,neljä:s,vii:si|des,kuu:si|des,seitsemä:n|s,kahdeksa:n|s,yhdeksä:n|s,kymmene:n|s',
    'articles':   '',
    'optionals':  '',
    'short':      '{d}. {month}ta {yyyy}',
    'long':       '{d}. {month}ta {yyyy} kello {H}.{mm}',
    'full':       '{Weekday}na {d}. {month}ta {yyyy} kello {H}.{mm}',
    'relative':       function(num, unit, ms, format) {
      var units = this['units'];
      function numberWithUnit(mult) {
        return (num === 1 ? '' : num + ' ') + units[(8 * mult) + unit];
      }
      switch(format) {
        case 'duration':  return numberWithUnit(0);
        case 'past':      return numberWithUnit(num > 1 ? 1 : 0) + ' sitten';
        case 'future':    return numberWithUnit(4) + ' päästä';
      }
    },
    'modifiers': [
        { 'name': 'day',   'src': 'toissa päivänä|toissa päiväistä', 'value': -2 },
        { 'name': 'day',   'src': 'eilen|eilistä', 'value': -1 },
        { 'name': 'day',   'src': 'tänään', 'value': 0 },
        { 'name': 'day',   'src': 'huomenna|huomista', 'value': 1 },
        { 'name': 'day',   'src': 'ylihuomenna|ylihuomista', 'value': 2 },
        { 'name': 'sign',  'src': 'sitten|aiemmin', 'value': -1 },
        { 'name': 'sign',  'src': 'päästä|kuluttua|myöhemmin', 'value': 1 },
        { 'name': 'edge',  'src': 'viimeinen|viimeisenä', 'value': -2 },
        { 'name': 'edge',  'src': 'lopussa', 'value': -1 },
        { 'name': 'edge',  'src': 'ensimmäinen|ensimmäisenä', 'value': 1 },
        { 'name': 'shift', 'src': 'edellinen|edellisenä|edeltävä|edeltävänä|viime|toissa', 'value': -1 },
        { 'name': 'shift', 'src': 'tänä|tämän', 'value': 0 },
        { 'name': 'shift', 'src': 'seuraava|seuraavana|tuleva|tulevana|ensi', 'value': 1 }
    ],
    'dateParse': [
        '{num} {unit} {sign}',
        '{sign} {num} {unit}',
        '{num} {unit=4-5} {sign} {day}',
        '{month} {year}',
        '{shift} {unit=5-7}'
    ],
    'timeParse': [
        '{0} {num}{1} {day} of {month} {year?}',
        '{weekday?} {month} {date}{1} {year?}',
        '{date} {month} {year}',
        '{shift} {weekday}',
        '{shift} week {weekday}',
        '{weekday} {2} {shift} week',
        '{0} {date}{1} of {month}',
        '{0}{month?} {date?}{1} of {shift} {unit=6-7}'
    ]
});
/*
 *
 * Date.addLocale(<code>) adds this locale to Sugar.
 * To set the locale globally, simply call:
 *
 * Date.setLocale('fr');
 *
 * var locale = Date.getLocale(<code>) will return this object, which
 * can be tweaked to change the behavior of parsing/formatting in the locales.
 *
 * locale.addFormat adds a date format (see this file for examples).
 * Special tokens in the date format will be parsed out into regex tokens:
 *
 * {0} is a reference to an entry in locale.tokens. Output: (?:the)?
 * {unit} is a reference to all units. Output: (day|week|month|...)
 * {unit3} is a reference to a specific unit. Output: (hour)
 * {unit3-5} is a reference to a subset of the units array. Output: (hour|day|week)
 * {unit?} "?" makes that token optional. Output: (day|week|month)?
 *
 * {day} Any reference to tokens in the modifiers array will include all with the same name. Output: (yesterday|today|tomorrow)
 *
 * All spaces are optional and will be converted to "\s*"
 *
 * Locale arrays months, weekdays, units, numbers, as well as the "src" field for
 * all entries in the modifiers array follow a special format indicated by a colon:
 *
 * minute:|s  = minute|minutes
 * thicke:n|r = thicken|thicker
 *
 * Additionally in the months, weekdays, units, and numbers array these will be added at indexes that are multiples
 * of the relevant number for retrieval. For example having "sunday:|s" in the units array will result in:
 *
 * units: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sundays']
 *
 * When matched, the index will be found using:
 *
 * units.indexOf(match) % 7;
 *
 * Resulting in the correct index with any number of alternates for that entry.
 *
 */

Date.addLocale('fr', {
  'plural': true,
  'months': 'janvier,février|fevrier,mars,avril,mai,juin,juillet,août,septembre,octobre,novembre,décembre|decembre',
  'weekdays': 'dimanche,lundi,mardi,mercredi,jeudi,vendredi,samedi',
  'units': 'milliseconde:|s,seconde:|s,minute:|s,heure:|s,jour:|s,semaine:|s,mois,an:|s|née|nee',
  'numbers': 'un:|e,deux,trois,quatre,cinq,six,sept,huit,neuf,dix',
  'tokens': ["l'|la|le"],
  'short':'{d} {month} {yyyy}',
  'long': '{d} {month} {yyyy} {H}:{mm}',
  'full': '{Weekday} {d} {month} {yyyy} {H}:{mm}:{ss}',
  'past': '{sign} {num} {unit}',
  'future': '{sign} {num} {unit}',
  'duration': '{num} {unit}',
  'timeMarker': 'à',
  'ampm': 'am,pm',
  'modifiers': [
    { 'name': 'day', 'src': 'hier', 'value': -1 },
    { 'name': 'day', 'src': "aujourd'hui", 'value': 0 },
    { 'name': 'day', 'src': 'demain', 'value': 1 },
    { 'name': 'sign', 'src': 'il y a', 'value': -1 },
    { 'name': 'sign', 'src': "dans|d'ici", 'value': 1 },
    { 'name': 'shift', 'src': 'derni:èr|er|ère|ere', 'value': -1 },
    { 'name': 'shift', 'src': 'prochain:|e', 'value': 1 }
  ],
  'dateParse': [
    '{sign} {num} {unit}',
    '{sign} {num} {unit}',
    '{0?} {unit=5-7} {shift}'
  ],
  'timeParse': [
    '{weekday?} {0?} {date?} {month} {year?}',
    '{0?} {weekday} {shift}'
  ]
});

/*
 *
 * Date.addLocale(<code>) adds this locale to Sugar.
 * To set the locale globally, simply call:
 *
 * Date.setLocale('it');
 *
 * var locale = Date.getLocale(<code>) will return this object, which
 * can be tweaked to change the behavior of parsing/formatting in the locales.
 *
 * locale.addFormat adds a date format (see this file for examples).
 * Special tokens in the date format will be parsed out into regex tokens:
 *
 * {0} is a reference to an entry in locale.tokens. Output: (?:the)?
 * {unit} is a reference to all units. Output: (day|week|month|...)
 * {unit3} is a reference to a specific unit. Output: (hour)
 * {unit3-5} is a reference to a subset of the units array. Output: (hour|day|week)
 * {unit?} "?" makes that token optional. Output: (day|week|month)?
 *
 * {day} Any reference to tokens in the modifiers array will include all with the same name. Output: (yesterday|today|tomorrow)
 *
 * All spaces are optional and will be converted to "\s*"
 *
 * Locale arrays months, weekdays, units, numbers, as well as the "src" field for
 * all entries in the modifiers array follow a special format indicated by a colon:
 *
 * minute:|s  = minute|minutes
 * thicke:n|r = thicken|thicker
 *
 * Additionally in the months, weekdays, units, and numbers array these will be added at indexes that are multiples
 * of the relevant number for retrieval. For example having "sunday:|s" in the units array will result in:
 *
 * units: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sundays']
 *
 * When matched, the index will be found using:
 *
 * units.indexOf(match) % 7;
 *
 * Resulting in the correct index with any number of alternates for that entry.
 *
 */

Date.addLocale('it', {
  'plural': true,
  'months': 'Gennaio,Febbraio,Marzo,Aprile,Maggio,Giugno,Luglio,Agosto,Settembre,Ottobre,Novembre,Dicembre',
  'weekdays': 'Domenica,Luned:ì|i,Marted:ì|i,Mercoled:ì|i,Gioved:ì|i,Venerd:ì|i,Sabato',
  'units': 'millisecond:o|i,second:o|i,minut:o|i,or:a|e,giorn:o|i,settiman:a|e,mes:e|i,ann:o|i',
  'numbers': "un:|a|o|',due,tre,quattro,cinque,sei,sette,otto,nove,dieci",
  'tokens': "l'|la|il",
  'short':'{d} {Month} {yyyy}',
  'long': '{d} {Month} {yyyy} {H}:{mm}',
  'full': '{Weekday} {d} {Month} {yyyy} {H}:{mm}:{ss}',
  'past': '{num} {unit} {sign}',
  'future': '{num} {unit} {sign}',
  'duration': '{num} {unit}',
  'timeMarker': 'alle',
  'ampm': 'am,pm',
  'modifiers': [
    { 'name': 'day', 'src': 'ieri', 'value': -1 },
    { 'name': 'day', 'src': 'oggi', 'value': 0 },
    { 'name': 'day', 'src': 'domani', 'value': 1 },
    { 'name': 'day', 'src': 'dopodomani', 'value': 2 },
    { 'name': 'sign', 'src': 'fa', 'value': -1 },
    { 'name': 'sign', 'src': 'da adesso', 'value': 1 },
    { 'name': 'shift', 'src': 'scors:o|a', 'value': -1 },
    { 'name': 'shift', 'src': 'prossim:o|a', 'value': 1 }
  ],
  'dateParse': [
    '{num} {unit} {sign}',
    '{0?} {unit=5-7} {shift}',
    '{0?} {shift} {unit=5-7}'
  ],
  'timeParse': [
    '{weekday?} {date?} {month} {year?}',
    '{shift} {weekday}'
  ]
});

/*
 *
 * Date.addLocale(<code>) adds this locale to Sugar.
 * To set the locale globally, simply call:
 *
 * Date.setLocale('ja');
 *
 * var locale = Date.getLocale(<code>) will return this object, which
 * can be tweaked to change the behavior of parsing/formatting in the locales.
 *
 * locale.addFormat adds a date format (see this file for examples).
 * Special tokens in the date format will be parsed out into regex tokens:
 *
 * {0} is a reference to an entry in locale.tokens. Output: (?:the)?
 * {unit} is a reference to all units. Output: (day|week|month|...)
 * {unit3} is a reference to a specific unit. Output: (hour)
 * {unit3-5} is a reference to a subset of the units array. Output: (hour|day|week)
 * {unit?} "?" makes that token optional. Output: (day|week|month)?
 *
 * {day} Any reference to tokens in the modifiers array will include all with the same name. Output: (yesterday|today|tomorrow)
 *
 * All spaces are optional and will be converted to "\s*"
 *
 * Locale arrays months, weekdays, units, numbers, as well as the "src" field for
 * all entries in the modifiers array follow a special format indicated by a colon:
 *
 * minute:|s  = minute|minutes
 * thicke:n|r = thicken|thicker
 *
 * Additionally in the months, weekdays, units, and numbers array these will be added at indexes that are multiples
 * of the relevant number for retrieval. For example having "sunday:|s" in the units array will result in:
 *
 * units: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sundays']
 *
 * When matched, the index will be found using:
 *
 * units.indexOf(match) % 7;
 *
 * Resulting in the correct index with any number of alternates for that entry.
 *
 */

Date.addLocale('ja', {
  'monthSuffix': '月',
  'weekdays': '日曜日,月曜日,火曜日,水曜日,木曜日,金曜日,土曜日',
  'units': 'ミリ秒,秒,分,時間,日,週間|週,ヶ月|ヵ月|月,年',
  'short': '{yyyy}年{M}月{d}日',
  'long': '{yyyy}年{M}月{d}日 {H}時{mm}分',
  'full': '{yyyy}年{M}月{d}日 {Weekday} {H}時{mm}分{ss}秒',
  'past': '{num}{unit}{sign}',
  'future': '{num}{unit}{sign}',
  'duration': '{num}{unit}',
  'timeSuffixes': '時,分,秒',
  'ampm': '午前,午後',
  'modifiers': [
    { 'name': 'day', 'src': '一昨日', 'value': -2 },
    { 'name': 'day', 'src': '昨日', 'value': -1 },
    { 'name': 'day', 'src': '今日', 'value': 0 },
    { 'name': 'day', 'src': '明日', 'value': 1 },
    { 'name': 'day', 'src': '明後日', 'value': 2 },
    { 'name': 'sign', 'src': '前', 'value': -1 },
    { 'name': 'sign', 'src': '後', 'value':  1 },
    { 'name': 'shift', 'src': '去|先', 'value': -1 },
    { 'name': 'shift', 'src': '来', 'value':  1 }
  ],
  'dateParse': [
    '{num}{unit}{sign}'
  ],
  'timeParse': [
    '{shift}{unit=5-7}{weekday?}',
    '{year}年{month?}月?{date?}日?',
    '{month}月{date?}日?',
    '{date}日'
  ]
});

/*
 *
 * Date.addLocale(<code>) adds this locale to Sugar.
 * To set the locale globally, simply call:
 *
 * Date.setLocale('ko');
 *
 * var locale = Date.getLocale(<code>) will return this object, which
 * can be tweaked to change the behavior of parsing/formatting in the locales.
 *
 * locale.addFormat adds a date format (see this file for examples).
 * Special tokens in the date format will be parsed out into regex tokens:
 *
 * {0} is a reference to an entry in locale.tokens. Output: (?:the)?
 * {unit} is a reference to all units. Output: (day|week|month|...)
 * {unit3} is a reference to a specific unit. Output: (hour)
 * {unit3-5} is a reference to a subset of the units array. Output: (hour|day|week)
 * {unit?} "?" makes that token optional. Output: (day|week|month)?
 *
 * {day} Any reference to tokens in the modifiers array will include all with the same name. Output: (yesterday|today|tomorrow)
 *
 * All spaces are optional and will be converted to "\s*"
 *
 * Locale arrays months, weekdays, units, numbers, as well as the "src" field for
 * all entries in the modifiers array follow a special format indicated by a colon:
 *
 * minute:|s  = minute|minutes
 * thicke:n|r = thicken|thicker
 *
 * Additionally in the months, weekdays, units, and numbers array these will be added at indexes that are multiples
 * of the relevant number for retrieval. For example having "sunday:|s" in the units array will result in:
 *
 * units: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sundays']
 *
 * When matched, the index will be found using:
 *
 * units.indexOf(match) % 7;
 *
 * Resulting in the correct index with any number of alternates for that entry.
 *
 */

Date.addLocale('ko', {
  'digitDate': true,
  'monthSuffix': '월',
  'weekdays': '일요일,월요일,화요일,수요일,목요일,금요일,토요일',
  'units': '밀리초,초,분,시간,일,주,개월|달,년',
  'numbers': '일|한,이,삼,사,오,육,칠,팔,구,십',
  'short': '{yyyy}년{M}월{d}일',
  'long': '{yyyy}년{M}월{d}일 {H}시{mm}분',
  'full': '{yyyy}년{M}월{d}일 {Weekday} {H}시{mm}분{ss}초',
  'past': '{num}{unit} {sign}',
  'future': '{num}{unit} {sign}',
  'duration': '{num}{unit}',
  'timeSuffixes': '시,분,초',
  'ampm': '오전,오후',
  'modifiers': [
    { 'name': 'day', 'src': '그저께', 'value': -2 },
    { 'name': 'day', 'src': '어제', 'value': -1 },
    { 'name': 'day', 'src': '오늘', 'value': 0 },
    { 'name': 'day', 'src': '내일', 'value': 1 },
    { 'name': 'day', 'src': '모레', 'value': 2 },
    { 'name': 'sign', 'src': '전', 'value': -1 },
    { 'name': 'sign', 'src': '후', 'value':  1 },
    { 'name': 'shift', 'src': '지난|작', 'value': -1 },
    { 'name': 'shift', 'src': '이번', 'value': 0 },
    { 'name': 'shift', 'src': '다음|내', 'value': 1 }
  ],
  'dateParse': [
    '{num}{unit} {sign}',
    '{shift?} {unit=5-7}'
  ],
  'timeParse': [
    '{shift} {unit=5?} {weekday}',
    '{year}년{month?}월?{date?}일?',
    '{month}월{date?}일?',
    '{date}일'
  ]
});

/*
 *
 * Date.addLocale(<code>) adds this locale to Sugar.
 * To set the locale globally, simply call:
 *
 * Date.setLocale('nl');
 *
 * var locale = Date.getLocale(<code>) will return this object, which
 * can be tweaked to change the behavior of parsing/formatting in the locales.
 *
 * locale.addFormat adds a date format (see this file for examples).
 * Special tokens in the date format will be parsed out into regex tokens:
 *
 * {0} is a reference to an entry in locale.tokens. Output: (?:the)?
 * {unit} is a reference to all units. Output: (day|week|month|...)
 * {unit3} is a reference to a specific unit. Output: (hour)
 * {unit3-5} is a reference to a subset of the units array. Output: (hour|day|week)
 * {unit?} "?" makes that token optional. Output: (day|week|month)?
 *
 * {day} Any reference to tokens in the modifiers array will include all with the same name. Output: (yesterday|today|tomorrow)
 *
 * All spaces are optional and will be converted to "\s*"
 *
 * Locale arrays months, weekdays, units, numbers, as well as the "src" field for
 * all entries in the modifiers array follow a special format indicated by a colon:
 *
 * minute:|s  = minute|minutes
 * thicke:n|r = thicken|thicker
 *
 * Additionally in the months, weekdays, units, and numbers array these will be added at indexes that are multiples
 * of the relevant number for retrieval. For example having "sunday:|s" in the units array will result in:
 *
 * units: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sundays']
 *
 * When matched, the index will be found using:
 *
 * units.indexOf(match) % 7;
 *
 * Resulting in the correct index with any number of alternates for that entry.
 *
 */

Date.addLocale('nl', {
  'plural': true,
  'months': 'januari,februari,maart,april,mei,juni,juli,augustus,september,oktober,november,december',
  'weekdays': 'zondag|zo,maandag|ma,dinsdag|di,woensdag|woe|wo,donderdag|do,vrijdag|vrij|vr,zaterdag|za',
  'units': 'milliseconde:|n,seconde:|n,minu:ut|ten,uur,dag:|en,we:ek|ken,maand:|en,jaar',
  'numbers': 'een,twee,drie,vier,vijf,zes,zeven,acht,negen',
  'tokens': '',
  'short':'{d} {Month} {yyyy}',
  'long': '{d} {Month} {yyyy} {H}:{mm}',
  'full': '{Weekday} {d} {Month} {yyyy} {H}:{mm}:{ss}',
  'past': '{num} {unit} {sign}',
  'future': '{num} {unit} {sign}',
  'duration': '{num} {unit}',
  'timeMarker': "'s|om",
  'modifiers': [
    { 'name': 'day', 'src': 'gisteren', 'value': -1 },
    { 'name': 'day', 'src': 'vandaag', 'value': 0 },
    { 'name': 'day', 'src': 'morgen', 'value': 1 },
    { 'name': 'day', 'src': 'overmorgen', 'value': 2 },
    { 'name': 'sign', 'src': 'geleden', 'value': -1 },
    { 'name': 'sign', 'src': 'vanaf nu', 'value': 1 },
    { 'name': 'shift', 'src': 'laatste|vorige|afgelopen', 'value': -1 },
    { 'name': 'shift', 'src': 'volgend:|e', 'value': 1 }
  ],
  'dateParse': [
    '{num} {unit} {sign}',
    '{0?} {unit=5-7} {shift}',
    '{0?} {shift} {unit=5-7}'
  ],
  'timeParse': [
    '{weekday?} {date?} {month} {year?}',
    '{shift} {weekday}'
  ]
});
/*
 *
 * Date.addLocale(<code>) adds this locale to Sugar.
 * To set the locale globally, simply call:
 *
 * Date.setLocale('pl');
 *
 * var locale = Date.getLocale(<code>) will return this object, which
 * can be tweaked to change the behavior of parsing/formatting in the locales.
 *
 * locale.addFormat adds a date format (see this file for examples).
 * Special tokens in the date format will be parsed out into regex tokens:
 *
 * {0} is a reference to an entry in locale.optionals. Output: (?:the)?
 * {unit} is a reference to all units. Output: (day|week|month|...)
 * {unit3} is a reference to a specific unit. Output: (hour)
 * {unit3-5} is a reference to a subset of the units array. Output: (hour|day|week)
 * {unit?} "?" makes that token optional. Output: (day|week|month)?
 *
 * {day} Any reference to tokens in the modifiers array will include all with the same name. Output: (yesterday|today|tomorrow)
 *
 * All spaces are optional and will be converted to "\s*"
 *
 * Locale arrays months, weekdays, units, numbers, as well as the "src" field for
 * all entries in the modifiers array follow a special format indicated by a colon:
 *
 * minute:|s  = minute|minutes
 * thicke:n|r = thicken|thicker
 *
 * Additionally in the months, weekdays, units, and numbers array these will be added at indexes that are multiples
 * of the relevant number for retrieval. For example having "sunday:|s" in the units array will result in:
 *
 * units: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sundays']
 *
 * When matched, the index will be found using:
 *
 * units.indexOf(match) % 7;
 *
 * Resulting in the correct index with any number of alternates for that entry.
 *
 */

Date.addLocale('pl', {
  'plural':    true,
  'months':    'Styczeń|Stycznia,Luty|Lutego,Marzec|Marca,Kwiecień|Kwietnia,Maj|Maja,Czerwiec|Czerwca,Lipiec|Lipca,Sierpień|Sierpnia,Wrzesień|Września,Październik|Października,Listopad|Listopada,Grudzień|Grudnia',
  'weekdays':  'Niedziela|Niedzielę,Poniedziałek,Wtorek,Środ:a|ę,Czwartek,Piątek,Sobota|Sobotę',
  'units':     'milisekund:a|y|,sekund:a|y|,minut:a|y|,godzin:a|y|,dzień|dni,tydzień|tygodnie|tygodni,miesiące|miesiące|miesięcy,rok|lata|lat',
  'numbers':   'jeden|jedną,dwa|dwie,trzy,cztery,pięć,sześć,siedem,osiem,dziewięć,dziesięć',
  'optionals': 'w|we,roku',
  'short':     '{d} {Month} {yyyy}',
  'long':      '{d} {Month} {yyyy} {H}:{mm}',
  'full' :     '{Weekday}, {d} {Month} {yyyy} {H}:{mm}:{ss}',
  'past':      '{num} {unit} {sign}',
  'future':    '{sign} {num} {unit}',
  'duration':  '{num} {unit}',
  'timeMarker':'o',
  'ampm':      'am,pm',
  'modifiers': [
    { 'name': 'day', 'src': 'przedwczoraj', 'value': -2 },
    { 'name': 'day', 'src': 'wczoraj', 'value': -1 },
    { 'name': 'day', 'src': 'dzisiaj|dziś', 'value': 0 },
    { 'name': 'day', 'src': 'jutro', 'value': 1 },
    { 'name': 'day', 'src': 'pojutrze', 'value': 2 },
    { 'name': 'sign', 'src': 'temu|przed', 'value': -1 },
    { 'name': 'sign', 'src': 'za', 'value': 1 },
    { 'name': 'shift', 'src': 'zeszły|zeszła|ostatni|ostatnia', 'value': -1 },
    { 'name': 'shift', 'src': 'następny|następna|następnego|przyszły|przyszła|przyszłego', 'value': 1 }
  ],
  'dateParse': [
    '{num} {unit} {sign}',
    '{sign} {num} {unit}',
    '{month} {year}',
    '{shift} {unit=5-7}',
    '{0} {shift?} {weekday}'
  ],
  'timeParse': [
    '{date} {month} {year?} {1}',
    '{0} {shift?} {weekday}'
  ]
});

/*
 *
 * Date.addLocale(<code>) adds this locale to Sugar.
 * To set the locale globally, simply call:
 *
 * Date.setLocale('pt');
 *
 * var locale = Date.getLocale(<code>) will return this object, which
 * can be tweaked to change the behavior of parsing/formatting in the locales.
 *
 * locale.addFormat adds a date format (see this file for examples).
 * Special tokens in the date format will be parsed out into regex tokens:
 *
 * {0} is a reference to an entry in locale.tokens. Output: (?:the)?
 * {unit} is a reference to all units. Output: (day|week|month|...)
 * {unit3} is a reference to a specific unit. Output: (hour)
 * {unit3-5} is a reference to a subset of the units array. Output: (hour|day|week)
 * {unit?} "?" makes that token optional. Output: (day|week|month)?
 *
 * {day} Any reference to tokens in the modifiers array will include all with the same name. Output: (yesterday|today|tomorrow)
 *
 * All spaces are optional and will be converted to "\s*"
 *
 * Locale arrays months, weekdays, units, numbers, as well as the "src" field for
 * all entries in the modifiers array follow a special format indicated by a colon:
 *
 * minute:|s  = minute|minutes
 * thicke:n|r = thicken|thicker
 *
 * Additionally in the months, weekdays, units, and numbers array these will be added at indexes that are multiples
 * of the relevant number for retrieval. For example having "sunday:|s" in the units array will result in:
 *
 * units: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sundays']
 *
 * When matched, the index will be found using:
 *
 * units.indexOf(match) % 7;
 *
 * Resulting in the correct index with any number of alternates for that entry.
 *
 */

Date.addLocale('pt', {
  'plural': true,
  'months': 'janeiro,fevereiro,março,abril,maio,junho,julho,agosto,setembro,outubro,novembro,dezembro',
  'weekdays': 'domingo,segunda-feira,terça-feira,quarta-feira,quinta-feira,sexta-feira,sábado|sabado',
  'units': 'milisegundo:|s,segundo:|s,minuto:|s,hora:|s,dia:|s,semana:|s,mês|mêses|mes|meses,ano:|s',
  'numbers': 'um,dois,três|tres,quatro,cinco,seis,sete,oito,nove,dez,uma,duas',
  'tokens': 'a,de',
  'short':'{d} de {month} de {yyyy}',
  'long': '{d} de {month} de {yyyy} {H}:{mm}',
  'full': '{Weekday}, {d} de {month} de {yyyy} {H}:{mm}:{ss}',
  'past': '{num} {unit} {sign}',
  'future': '{sign} {num} {unit}',
  'duration': '{num} {unit}',
  'timeMarker': 'às',
  'ampm': 'am,pm',
  'modifiers': [
    { 'name': 'day', 'src': 'anteontem', 'value': -2 },
    { 'name': 'day', 'src': 'ontem', 'value': -1 },
    { 'name': 'day', 'src': 'hoje', 'value': 0 },
    { 'name': 'day', 'src': 'amanh:ã|a', 'value': 1 },
    { 'name': 'sign', 'src': 'atrás|atras|há|ha', 'value': -1 },
    { 'name': 'sign', 'src': 'daqui a', 'value': 1 },
    { 'name': 'shift', 'src': 'passad:o|a', 'value': -1 },
    { 'name': 'shift', 'src': 'próximo|próxima|proximo|proxima', 'value': 1 }
  ],
  'dateParse': [
    '{num} {unit} {sign}',
    '{sign} {num} {unit}',
    '{0?} {unit=5-7} {shift}',
    '{0?} {shift} {unit=5-7}'
  ],
  'timeParse': [
    '{date?} {1?} {month} {1?} {year?}',
    '{0?} {shift} {weekday}'
  ]
});

/*
 *
 * Date.addLocale(<code>) adds this locale to Sugar.
 * To set the locale globally, simply call:
 *
 * Date.setLocale('ru');
 *
 * var locale = Date.getLocale(<code>) will return this object, which
 * can be tweaked to change the behavior of parsing/formatting in the locales.
 *
 * locale.addFormat adds a date format (see this file for examples).
 * Special tokens in the date format will be parsed out into regex tokens:
 *
 * {0} is a reference to an entry in locale.tokens. Output: (?:the)?
 * {unit} is a reference to all units. Output: (day|week|month|...)
 * {unit3} is a reference to a specific unit. Output: (hour)
 * {unit3-5} is a reference to a subset of the units array. Output: (hour|day|week)
 * {unit?} "?" makes that token optional. Output: (day|week|month)?
 *
 * {day} Any reference to tokens in the modifiers array will include all with the same name. Output: (yesterday|today|tomorrow)
 *
 * All spaces are optional and will be converted to "\s*"
 *
 * Locale arrays months, weekdays, units, numbers, as well as the "src" field for
 * all entries in the modifiers array follow a special format indicated by a colon:
 *
 * minute:|s  = minute|minutes
 * thicke:n|r = thicken|thicker
 *
 * Additionally in the months, weekdays, units, and numbers array these will be added at indexes that are multiples
 * of the relevant number for retrieval. For example having "sunday:|s" in the units array will result in:
 *
 * units: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sundays']
 *
 * When matched, the index will be found using:
 *
 * units.indexOf(match) % 7;
 *
 * Resulting in the correct index with any number of alternates for that entry.
 *
 */

Date.addLocale('ru', {
  'months': 'Январ:я|ь,Феврал:я|ь,Март:а|,Апрел:я|ь,Ма:я|й,Июн:я|ь,Июл:я|ь,Август:а|,Сентябр:я|ь,Октябр:я|ь,Ноябр:я|ь,Декабр:я|ь',
  'weekdays': 'Воскресенье,Понедельник,Вторник,Среда,Четверг,Пятница,Суббота',
  'units': 'миллисекунд:а|у|ы|,секунд:а|у|ы|,минут:а|у|ы|,час:||а|ов,день|день|дня|дней,недел:я|ю|и|ь|е,месяц:||а|ев|е,год|год|года|лет|году',
  'numbers': 'од:ин|ну,дв:а|е,три,четыре,пять,шесть,семь,восемь,девять,десять',
  'tokens': 'в|на,года',
  'short':'{d} {month} {yyyy} года',
  'long': '{d} {month} {yyyy} года {H}:{mm}',
  'full': '{Weekday} {d} {month} {yyyy} года {H}:{mm}:{ss}',
  'relative': function(num, unit, ms, format) {
    var numberWithUnit, last = num.toString().slice(-1);
    switch(true) {
      case num >= 11 && num <= 15: mult = 3; break;
      case last == 1: mult = 1; break;
      case last >= 2 && last <= 4: mult = 2; break;
      default: mult = 3;
    }
    numberWithUnit = num + ' ' + this['units'][(mult * 8) + unit];
    switch(format) {
      case 'duration':  return numberWithUnit;
      case 'past':      return numberWithUnit + ' назад';
      case 'future':    return 'через ' + numberWithUnit;
    }
  },
  'timeMarker': 'в',
  'ampm': ' утра, вечера',
  'modifiers': [
    { 'name': 'day', 'src': 'позавчера', 'value': -2 },
    { 'name': 'day', 'src': 'вчера', 'value': -1 },
    { 'name': 'day', 'src': 'сегодня', 'value': 0 },
    { 'name': 'day', 'src': 'завтра', 'value': 1 },
    { 'name': 'day', 'src': 'послезавтра', 'value': 2 },
    { 'name': 'sign', 'src': 'назад', 'value': -1 },
    { 'name': 'sign', 'src': 'через', 'value': 1 },
    { 'name': 'shift', 'src': 'прошл:ый|ой|ом', 'value': -1 },
    { 'name': 'shift', 'src': 'следующ:ий|ей|ем', 'value': 1 }
  ],
  'dateParse': [
    '{num} {unit} {sign}',
    '{sign} {num} {unit}',
    '{month} {year}',
    '{0?} {shift} {unit=5-7}'
  ],
  'timeParse': [
    '{date} {month} {year?} {1?}',
    '{0?} {shift} {weekday}'
  ]
});

/*
 *
 * Date.addLocale(<code>) adds this locale to Sugar.
 * To set the locale globally, simply call:
 *
 * Date.setLocale('sv');
 *
 * var locale = Date.getLocale(<code>) will return this object, which
 * can be tweaked to change the behavior of parsing/formatting in the locales.
 *
 * locale.addFormat adds a date format (see this file for examples).
 * Special tokens in the date format will be parsed out into regex tokens:
 *
 * {0} is a reference to an entry in locale.tokens. Output: (?:the)?
 * {unit} is a reference to all units. Output: (day|week|month|...)
 * {unit3} is a reference to a specific unit. Output: (hour)
 * {unit3-5} is a reference to a subset of the units array. Output: (hour|day|week)
 * {unit?} "?" makes that token optional. Output: (day|week|month)?
 *
 * {day} Any reference to tokens in the modifiers array will include all with the same name. Output: (yesterday|today|tomorrow)
 *
 * All spaces are optional and will be converted to "\s*"
 *
 * Locale arrays months, weekdays, units, numbers, as well as the "src" field for
 * all entries in the modifiers array follow a special format indicated by a colon:
 *
 * minute:|s  = minute|minutes
 * thicke:n|r = thicken|thicker
 *
 * Additionally in the months, weekdays, units, and numbers array these will be added at indexes that are multiples
 * of the relevant number for retrieval. For example having "sunday:|s" in the units array will result in:
 *
 * units: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sundays']
 *
 * When matched, the index will be found using:
 *
 * units.indexOf(match) % 7;
 *
 * Resulting in the correct index with any number of alternates for that entry.
 *
 */

Date.addLocale('sv', {
  'plural': true,
  'months': 'januari,februari,mars,april,maj,juni,juli,augusti,september,oktober,november,december',
  'weekdays': 'söndag|sondag,måndag:|en+mandag:|en,tisdag,onsdag,torsdag,fredag,lördag|lordag',
  'units': 'millisekund:|er,sekund:|er,minut:|er,timm:e|ar,dag:|ar,veck:a|or|an,månad:|er|en+manad:|er|en,år:||et+ar:||et',
  'numbers': 'en|ett,två|tva,tre,fyra,fem,sex,sju,åtta|atta,nio,tio',
  'tokens': 'den,för|for',
  'articles': 'den',
  'short':'den {d} {month} {yyyy}',
  'long': 'den {d} {month} {yyyy} {H}:{mm}',
  'full': '{Weekday} den {d} {month} {yyyy} {H}:{mm}:{ss}',
  'past': '{num} {unit} {sign}',
  'future': '{sign} {num} {unit}',
  'duration': '{num} {unit}',
  'ampm': 'am,pm',
  'modifiers': [
    { 'name': 'day', 'src': 'förrgår|i förrgår|iförrgår|forrgar|i forrgar|iforrgar', 'value': -2 },
    { 'name': 'day', 'src': 'går|i går|igår|gar|i gar|igar', 'value': -1 },
    { 'name': 'day', 'src': 'dag|i dag|idag', 'value': 0 },
    { 'name': 'day', 'src': 'morgon|i morgon|imorgon', 'value': 1 },
    { 'name': 'day', 'src': 'över morgon|övermorgon|i över morgon|i övermorgon|iövermorgon|over morgon|overmorgon|i over morgon|i overmorgon|iovermorgon', 'value': 2 },
    { 'name': 'sign', 'src': 'sedan|sen', 'value': -1 },
    { 'name': 'sign', 'src': 'om', 'value':  1 },
    { 'name': 'shift', 'src': 'i förra|förra|i forra|forra', 'value': -1 },
    { 'name': 'shift', 'src': 'denna', 'value': 0 },
    { 'name': 'shift', 'src': 'nästa|nasta', 'value': 1 }
  ],
  'dateParse': [
    '{num} {unit} {sign}',
    '{sign} {num} {unit}',
    '{1?} {num} {unit} {sign}',
    '{shift} {unit=5-7}'
  ],
  'timeParse': [
    '{0?} {weekday?} {date?} {month} {year}',
    '{date} {month}',
    '{shift} {weekday}'
  ]
});

/*
 *
 * Date.addLocale(<code>) adds this locale to Sugar.
 * To set the locale globally, simply call:
 *
 * Date.setLocale('zh-CN');
 *
 * var locale = Date.getLocale(<code>) will return this object, which
 * can be tweaked to change the behavior of parsing/formatting in the locales.
 *
 * locale.addFormat adds a date format (see this file for examples).
 * Special tokens in the date format will be parsed out into regex tokens:
 *
 * {0} is a reference to an entry in locale.tokens. Output: (?:the)?
 * {unit} is a reference to all units. Output: (day|week|month|...)
 * {unit3} is a reference to a specific unit. Output: (hour)
 * {unit3-5} is a reference to a subset of the units array. Output: (hour|day|week)
 * {unit?} "?" makes that token optional. Output: (day|week|month)?
 *
 * {day} Any reference to tokens in the modifiers array will include all with the same name. Output: (yesterday|today|tomorrow)
 *
 * All spaces are optional and will be converted to "\s*"
 *
 * Locale arrays months, weekdays, units, numbers, as well as the "src" field for
 * all entries in the modifiers array follow a special format indicated by a colon:
 *
 * minute:|s  = minute|minutes
 * thicke:n|r = thicken|thicker
 *
 * Additionally in the months, weekdays, units, and numbers array these will be added at indexes that are multiples
 * of the relevant number for retrieval. For example having "sunday:|s" in the units array will result in:
 *
 * units: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sundays']
 *
 * When matched, the index will be found using:
 *
 * units.indexOf(match) % 7;
 *
 * Resulting in the correct index with any number of alternates for that entry.
 *
 */

Date.addLocale('zh-CN', {
  'variant': true,
  'monthSuffix': '月',
  'weekdays': '星期日|周日,星期一|周一,星期二|周二,星期三|周三,星期四|周四,星期五|周五,星期六|周六',
  'units': '毫秒,秒钟,分钟,小时,天,个星期|周,个月,年',
  'tokens': '日|号',
  'short':'{yyyy}年{M}月{d}日',
  'long': '{yyyy}年{M}月{d}日 {tt}{h}:{mm}',
  'full': '{yyyy}年{M}月{d}日 {weekday} {tt}{h}:{mm}:{ss}',
  'past': '{num}{unit}{sign}',
  'future': '{num}{unit}{sign}',
  'duration': '{num}{unit}',
  'timeSuffixes': '点|时,分钟?,秒',
  'ampm': '上午,下午',
  'modifiers': [
    { 'name': 'day', 'src': '前天', 'value': -2 },
    { 'name': 'day', 'src': '昨天', 'value': -1 },
    { 'name': 'day', 'src': '今天', 'value': 0 },
    { 'name': 'day', 'src': '明天', 'value': 1 },
    { 'name': 'day', 'src': '后天', 'value': 2 },
    { 'name': 'sign', 'src': '前', 'value': -1 },
    { 'name': 'sign', 'src': '后', 'value':  1 },
    { 'name': 'shift', 'src': '上|去', 'value': -1 },
    { 'name': 'shift', 'src': '这', 'value':  0 },
    { 'name': 'shift', 'src': '下|明', 'value':  1 }
  ],
  'dateParse': [
    '{num}{unit}{sign}',
    '{shift}{unit=5-7}'
  ],
  'timeParse': [
    '{shift}{weekday}',
    '{year}年{month?}月?{date?}{0?}',
    '{month}月{date?}{0?}',
    '{date}[日号]'
  ]
});

/*
 *
 * Date.addLocale(<code>) adds this locale to Sugar.
 * To set the locale globally, simply call:
 *
 * Date.setLocale('zh-TW');
 *
 * var locale = Date.getLocale(<code>) will return this object, which
 * can be tweaked to change the behavior of parsing/formatting in the locales.
 *
 * locale.addFormat adds a date format (see this file for examples).
 * Special tokens in the date format will be parsed out into regex tokens:
 *
 * {0} is a reference to an entry in locale.tokens. Output: (?:the)?
 * {unit} is a reference to all units. Output: (day|week|month|...)
 * {unit3} is a reference to a specific unit. Output: (hour)
 * {unit3-5} is a reference to a subset of the units array. Output: (hour|day|week)
 * {unit?} "?" makes that token optional. Output: (day|week|month)?
 *
 * {day} Any reference to tokens in the modifiers array will include all with the same name. Output: (yesterday|today|tomorrow)
 *
 * All spaces are optional and will be converted to "\s*"
 *
 * Locale arrays months, weekdays, units, numbers, as well as the "src" field for
 * all entries in the modifiers array follow a special format indicated by a colon:
 *
 * minute:|s  = minute|minutes
 * thicke:n|r = thicken|thicker
 *
 * Additionally in the months, weekdays, units, and numbers array these will be added at indexes that are multiples
 * of the relevant number for retrieval. For example having "sunday:|s" in the units array will result in:
 *
 * units: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sundays']
 *
 * When matched, the index will be found using:
 *
 * units.indexOf(match) % 7;
 *
 * Resulting in the correct index with any number of alternates for that entry.
 *
 */

  //'zh-TW': '1;月;年;;星期日|週日,星期一|週一,星期二|週二,星期三|週三,星期四|週四,星期五|週五,星期六|週六;毫秒,秒鐘,分鐘,小時,天,個星期|週,個月,年;;;日|號;;上午,下午;點|時,分鐘?,秒;{num}{unit}{sign},{shift}{unit=5-7};{shift}{weekday},{year}年{month?}月?{date?}{0},{month}月{date?}{0},{date}{0};{yyyy}年{M}月{d}日 {Weekday};{tt}{h}:{mm}:{ss};前天,昨天,今天,明天,後天;,前,,後;,上|去,這,下|明',

Date.addLocale('zh-TW', {
  'monthSuffix': '月',
  'weekdays': '星期日|週日,星期一|週一,星期二|週二,星期三|週三,星期四|週四,星期五|週五,星期六|週六',
  'units': '毫秒,秒鐘,分鐘,小時,天,個星期|週,個月,年',
  'tokens': '日|號',
  'short':'{yyyy}年{M}月{d}日',
  'long': '{yyyy}年{M}月{d}日 {tt}{h}:{mm}',
  'full': '{yyyy}年{M}月{d}日 {Weekday} {tt}{h}:{mm}:{ss}',
  'past': '{num}{unit}{sign}',
  'future': '{num}{unit}{sign}',
  'duration': '{num}{unit}',
  'timeSuffixes': '點|時,分鐘?,秒',
  'ampm': '上午,下午',
  'modifiers': [
    { 'name': 'day', 'src': '前天', 'value': -2 },
    { 'name': 'day', 'src': '昨天', 'value': -1 },
    { 'name': 'day', 'src': '今天', 'value': 0 },
    { 'name': 'day', 'src': '明天', 'value': 1 },
    { 'name': 'day', 'src': '後天', 'value': 2 },
    { 'name': 'sign', 'src': '前', 'value': -1 },
    { 'name': 'sign', 'src': '後', 'value': 1 },
    { 'name': 'shift', 'src': '上|去', 'value': -1 },
    { 'name': 'shift', 'src': '這', 'value':  0 },
    { 'name': 'shift', 'src': '下|明', 'value':  1 }
  ],
  'dateParse': [
    '{num}{unit}{sign}',
    '{shift}{unit=5-7}'
  ],
  'timeParse': [
    '{shift}{weekday}',
    '{year}年{month?}月?{date?}{0?}',
    '{month}月{date?}{0?}',
    '{date}[日號]'
  ]
});

})();