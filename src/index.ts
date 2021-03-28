const express = require('express');

const app = express();

app.get('/', (req: any, res: any) => {
    res.send('Hello world with typescript');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App listening on PORT ${port}`));
