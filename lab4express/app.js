const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
