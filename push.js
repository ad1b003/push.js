async function pushContent(file, target = 'body') {
  const fetchedObject = await fetch(file);
  const text = await fetchedObject.text();
  const content = await extract(text);
  const tElement = document.querySelector(target);
  tElement.innerHTML = content;
  tElement.classList.remove('slide-in');
  await makeTheScriptsRun(tElement);
  tElement.classList.add('slide-in');
}

async function extract(strVal) {
  const pattern = /<body[^>]*>((.|[\n\r])*)<\/body>/im;
  const arrayOfMatched = await pattern.exec(strVal);
  return arrayOfMatched[1]; // innerHTML
}

function replaceScript(element) {
  element.parentElement.replaceChild(cloneScript(element), element);
}

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
    if (tag.parentElement === parent) {
      replaceScript(tag);
    }
  })
}

// getting all elements which have push attribute
document.querySelectorAll('[push]').forEach(x => {
  const href = x.getAttribute('push'); // link
  const target = x.getAttribute('push-target'); // wher will the content go
  // adding click event
  x.addEventListener('click', function() {
    if (href !== '') {
      target !== null ? pushContent(href, target) : pushContent(href);
    }
  });
});
