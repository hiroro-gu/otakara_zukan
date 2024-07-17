const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;
const authRouter = require('./routes/auth');
const zukanRouter = require('./routes/zukan');
const entryRouter = require('./routes/entry');
app.use('/api/zukans', zukanRouter);
app.use('/api/entries', entryRouter);

app.use('/api/auth', authRouter);

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
