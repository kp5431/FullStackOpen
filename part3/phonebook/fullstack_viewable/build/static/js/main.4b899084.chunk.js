(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{40:function(e,n,t){},41:function(e,n,t){"use strict";t.r(n);var c=t(15),r=t.n(c),o=t(3),a=t(2),u=t(0),i=function(e){var n=e.content,t=e.clickHandler;return Object(u.jsx)("li",{children:Object(u.jsxs)("p",{children:[n.name," ",n.number," ",Object(u.jsx)("button",{onClick:t,children:"delete"})]})})},s=function(e){var n=e.formHandler,t=e.perChange,c=e.numChange,r=e.nameState,o=e.numState;return Object(u.jsxs)("form",{onSubmit:n,children:[Object(u.jsx)("div",{children:Object(u.jsxs)("ul",{children:[Object(u.jsxs)("li",{children:["name: ",Object(u.jsx)("input",{value:r,onChange:t})]}),Object(u.jsxs)("li",{children:["number: ",Object(u.jsx)("input",{value:o,onChange:c})]})]})}),Object(u.jsx)("div",{children:Object(u.jsx)("button",{type:"submit",children:"add"})})]})},l=function(e){var n=e.str,t=e.handler;return Object(u.jsx)("input",{value:n,onChange:t})},d=t(4),j=t.n(d),f="/api/persons",h={getAll:function(){return j.a.get(f).then((function(e){return e.data}))},create:function(e){return j.a.post(f,e).then((function(e){return e.data}))},update:function(e,n){return j.a.put("".concat(f,"/").concat(e),n).then((function(e){return e.data}))},del:function(e){return j.a.delete("".concat(f,"/").concat(e)).then((function(e){return e.data}))}},b=function(e){var n=e.msg;return null===n?null:Object(u.jsx)("div",{className:"notification",children:n})},m=function(){var e=Object(a.useState)([]),n=Object(o.a)(e,2),t=n[0],c=n[1],r=Object(a.useState)(""),d=Object(o.a)(r,2),j=d[0],f=d[1],m=Object(a.useState)(""),O=Object(o.a)(m,2),p=O[0],v=O[1],x=Object(a.useState)(""),g=Object(o.a)(x,2),w=g[0],y=g[1],C=Object(a.useState)(null),S=Object(o.a)(C,2),k=S[0],A=S[1];Object(a.useEffect)((function(){h.getAll().then((function(e){c(e)}))}),[]);var H=w.length?t.filter((function(e){return e.name.toLowerCase().includes(w.toLowerCase())})):t;return Object(u.jsxs)("div",{children:[Object(u.jsx)(b,{msg:k}),Object(u.jsx)("h2",{children:"Phonebook"}),Object(u.jsxs)("form",{children:["show names only containing:",Object(u.jsx)(l,{str:w,handler:function(e){y(e.target.value)}})," "]}),Object(u.jsx)("h2",{children:"Add a new"}),Object(u.jsx)(s,{formHandler:function(e){e.preventDefault(),j.length&&p.length||window.alert("Please don't enter an empty string");var n={name:j,number:p};t.some((function(e){return e.name===j}))?window.confirm("".concat(j," is already added to phonebook, would you like to replace their number?"))&&(h.update(t.find((function(e){return e.name===j})).id,n).then((function(e){c(t.map((function(n){return n.name===j?e:n})))})).catch((function(e){c(t.filter((function(e){return e.name!==j}))),A("Error: The person ".concat(j," has already been removed from the server, cannot change their number.")),setTimeout((function(){A(null)}),5e3)})),A("".concat(j,"'s number is now set to ").concat(p)),setTimeout((function(){A(null)}),5e3)):(h.create(n).then((function(e){c(t.concat(e)),f(""),v("")})),A("".concat(j," added to the phonebook!")),setTimeout((function(){A(null)}),5e3)),f(""),v("")},perChange:function(e){f(e.target.value)},numChange:function(e){v(e.target.value)},nameState:j,numState:p})," ",Object(u.jsx)("h2",{children:"Numbers"}),Object(u.jsxs)("ul",{children:[H.map((function(e){return Object(u.jsx)(i,{content:e,clickHandler:function(){return function(e){var n=t.find((function(n){return n.id===e}));window.confirm("Are you sure you want to remove ".concat(n.name,"?"))&&h.del(e).then((function(){c(t.filter((function(n){return n.id!==e})))})).catch((function(e){alert("the person '".concat(n.name," was already removed from the server'")),console.log(e)}))}(e.id)}},e.name)}))," "]})]})};t(40);r.a.render(Object(u.jsx)(m,{}),document.getElementById("root"))}},[[41,1,2]]]);
//# sourceMappingURL=main.4b899084.chunk.js.map