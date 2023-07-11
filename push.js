async function pushContent(file, target = 'body') {
  const fetchedObject = await fetch(file);
  const text = await fetchedObject.text();
  const content = await extract(text);
  const tElement = document.querySelector(target); // 🎯 element
  tElement.classList.remove('slide-in'); // remove for transition
  tElement.innerHTML = content; // swapping content
  await makeTheScriptsRun(tElement);;
  tElement.classList.add('slide-in'); // add new transition
}

// extract what is in between body tag
async function extract(strVal) {
  const pattern = /<body[^>]*>((.|[\n\r])*)<\/body>/im;
  const arrayOfMatched = await pattern.exec(strVal);
  return arrayOfMatched[1]; // HTML inside <body></body>
}

/*
    * by injecting HTML using innerHTML, code inside the script tags never get executed
    * to execute the code, we are -
      * creating a new script tag with its attributes and inner text (code)
      * then replacing it with the original one
      * repeating it for each one of the script tags
 */

// replacing
function replaceScript(element) {
  element.parentElement.replaceChild(cloneScript(element), element);
}

// cloning / creating a script tag
function cloneScript(element) {
  const script = document.createElement("script");
  script.innerText = element.textContent;
  let i = -1,
    attrs = element.attributes,
    attr;
  while (++i < attrs.length) {
    script.setAttribute((attr = attrs[i]).name, attr.value);
  }
  return script;
}

async function makeTheScriptsRun(parent = document.body) {
  Array.from(document.getElementsByTagName('script')).forEach(tag => {
    if (tag.parentElement === parent) { // only script tags inside the fetched HTML
      replaceScript(tag);
    }
  })
}

// getting all elements which have push attribute
document.querySelectorAll('[push]').forEach(x => {
  const href = x.getAttribute('push'); // link
  const target = x.getAttribute('push-target'); // where will the content go
  // adding click event
  x.addEventListener('click', function() {
    if (href !== '') {
      target !== null ? pushContent(href, target) : pushContent(href);
    }
  });
});
