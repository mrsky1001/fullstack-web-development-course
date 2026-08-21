require('dotenv').config();

const PORT = 3000;

const app = require('./app');

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
