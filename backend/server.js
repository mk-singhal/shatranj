const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('<h1>Welcome to the backend!</h1>');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
});
