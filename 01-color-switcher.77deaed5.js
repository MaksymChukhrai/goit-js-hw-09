const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),n=document.body;let a=null;t.addEventListener("click",(function(){a||(a=setInterval((()=>{n.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}),1e3),t.disabled=!0)})),e.addEventListener("click",(function(){clearInterval(a),a=null,t.disabled=!1}));
//# sourceMappingURL=01-color-switcher.77deaed5.js.map
