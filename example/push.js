async function pushContent(t,e="body"){const n=await fetch(t),c=await n.text(),r=await extract(c),a=document.querySelector(e);a.innerHTML=r,a.classList.remove("slide-in"),await makeTheScriptsRun(a),a.classList.add("slide-in")}async function extract(t){return(await/<body[^>]*>((.|[\n\r])*)<\/body>/im.exec(t))[1]}function replaceScript(t){t.parentElement.replaceChild(cloneScript(t),t)}function cloneScript(t){const e=document.createElement("script");e.innerText=t.textContent;let n,c=-1,r=t.attributes;for(;++c<r.length;)e.setAttribute((n=r[c]).name,n.value);return e}async function makeTheScriptsRun(t=document.body){Array.from(document.getElementsByTagName("script")).forEach((e=>{e.parentElement===t&&replaceScript(e)}))}document.querySelectorAll("[push]").forEach((t=>{const e=t.getAttribute("push"),n=t.getAttribute("push-target");t.addEventListener("click",(function(){""!==e&&(null!==n?pushContent(e,n):pushContent(e))}))}));