## push.js
### swap content from another HTML file with transition

#### How to use
**Add** inside `<head>`
```html
<link rel="stylesheet" href="push-transition.css">
```
then inside `<body>`
```html
<script src="push.js"></script>
```
**Add** `push` attribute with the *link* of the HTML page
```html
<button push="content.html">Swap</button>
```
#### additional attributes
`push-target` : *Specifies where the fetched HTML will go,* Default: `<body></body>`.
Any patterns that work with `querySelector` will work in `push-target`

`transition` : *Specifies the type of transition* Default: `slide-in` and another is `slide-out`
```html
<button push="content.html" push-target="body" transition="slide-out">Swap</button>
```
#### ⚠️⚠️⚠️ Won't work with `<a>` tag
###### See example folder for more
