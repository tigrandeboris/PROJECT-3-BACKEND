require('dotenv').config();
const express = require('express');

// DB config
require('./configs/db.config');

const app = express();

// Middleware config
require('./configs/middleware.config')(app);
require('./configs/cors.config')(app);

// Session config + Passport
require('./configs/session.config')(app);
require('./configs/passport.config')(app);


//Routes
const authRouter = require('./routes/auth.routes');
const projectsRouter = require ('./routes/projects.routes')
const tasksRouter = require('./routes/tasks.routes');
app.use('/api/auth', authRouter);
app.use('/api/projects', projectsRouter)
app.use('/api/tasks', tasksRouter);

// ROUTE FOR SERVING REACT APP (index.html)
app.use((req, res, next) => {
  // If no previous routes match the request, send back the React app.
  res.sendFile(__dirname + "/public/index.html");
});

app.use((req, res) => {
  return res.status(404).json({ message: "Not found"});
})

module.exports = app;