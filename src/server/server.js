const express = require('express');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const fetch = require('node-fetch');
const path = require('path');
const fs = require('fs');
const App = require('../client/App').default;

const app = express();
// app.use(express.static(path.join(__dirname, 'dist')));
// app.use(express.static(path.resolve(__dirname, 'dist')));
app.use(express.static('dist'));

// app.use(express.static(path.resolve(__dirname, 'dist')));

// app.get('/', (req, res) => {
//   res.send('hello world');
// });
app.get('/home', (req, res) => {
  const pageNum = req.query.page;
  fetch(`https://hn.algolia.com/api/v1/search?hitsPerPage=50&page=${pageNum}`)
    .then(resp => resp.json())
    .then((hackerData) => {
      fs.readFile(path.resolve(__dirname, '../../public/index.html'), 'utf-8', (err, data) => {
        let fileData = data;
        if (err) {
          console.log(err);
          return res.status(500).send('some error');
        }
        // console.log('serevr', hackerData);
        const html = ReactDOMServer.renderToString(<App list={hackerData} />);
        // console.log(`html is >>>>>>>>>>>>>>>>>>>>>> ${html}`);
        fileData = fileData.replace('<div id="root"></div>', `<div id="root">${html}</div><script>window.__INITIAL_PROPS__ = ${JSON.stringify(hackerData)}</script>`);
        // console.log(`fileData is >>>>>>>>>>>>>>>>>>>>>> ${fileData}`);
        res.send(fileData);
        return null;
      });
    })
    .catch(err => console.log(err));
});

app.use('/', (req, res) => {
  fetch('https://hn.algolia.com/api/v1/search?hitsPerPage=50&page=0')
    .then(resp => resp.json())
    .then((hackerData) => {
      fs.readFile(path.resolve(__dirname, '../../public/index.html'), 'utf-8', (err, data) => {
        let fileData = data;
        if (err) {
          console.log(err);
          return res.status(500).send('some error');
        }
        // console.log('serevr', hackerData);
        const html = ReactDOMServer.renderToString(<App list={hackerData} />);
        // console.log(`html is >>>>>>>>>>>>>>>>>>>>>> ${html}`);
        fileData = fileData.replace('<div id="root"></div>', `<div id="root">${html}</div><script>window.__INITIAL_PROPS__ = ${JSON.stringify(hackerData)}</script>`);
        // console.log(`fileData is >>>>>>>>>>>>>>>>>>>>>> ${fileData}`);
        res.send(fileData);
        return null;
      });
    })
    .catch(err => console.log(err));
});

// app.use('/', (req, res) => {
//   fs.readFile(path.resolve(__dirname, '../../dist/index.html'), 'utf-8', (err, data) => {
//     if (err) {
//       console.log(err);
//       return res.status(500).send('some error');
//     }
//     res.send('<h1>lola!</h1>');
//     return null;
//   });
// });

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
