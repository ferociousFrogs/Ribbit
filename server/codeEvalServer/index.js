const app = require('express')();
const bodyParser = require('body-parser');

const port = process.env.port || 8080;

app.use(bodyParser.json());

const codeParser = (code) => {
  // is comment cleanup needed??? .replace(/\/\/*\\n/gi, '')
  code.value = code.value.replace(/\\n/gi, '');
  if (code.language === 'Javascript') {
    return eval(code.value);
  } else if (code.language === 'Python') {
    return 'Python coming soon!';
  } else if (code.language === 'Ruby') {
    return 'Ruby coming soon!';
  }
  return null;
};

app.get('/evalCode', (req, res) => {
  const code = JSON.parse(req.query.code);
  console.log(code);
  const result = codeParser(code);
  console.log(result);

  res.status(200).send(JSON.stringify(result));
});

console.log(`listening on port ${port}...\n`);
app.listen(port);
