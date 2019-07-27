# Documentation

Webpack loader from docx to html raw.

![docx-loader](docx-loader.png)

### docx-loader

`npm i docx-loader --save-dev`

or

`yarn add docx-loader -D`

#

### Add it in your webpack config file

```javascript
{
  test: /\.docx$/,
  use: [
    {
      loader: "docx-loader",
      options: {
        removeLinks: true
      }
    }
  ]
}
```

You can also add options

```javascript
  options: {
    removeLinks: true,
    mammoth: { // we're using mammoth npm package for docx2html
      styleMap: [
        "p[style-name='Section Title'] => h1:fresh",
        "p[style-name='Subsection Title'] => h2:fresh"
      ]
    },
  }
```

## How it works

```javascript
import demo from "./demo.docx";
console.log(demo); // <div><h1>Demo...

document.body.innerHtml = demo;
```

or with React

```javascript
import demo from "./demo.docx";
export default <div dangerouslySetInnerHTML={{ __html: demo }} />;
```
