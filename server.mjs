// Import required modules
import express from 'express.mjs';
import bodyParser from 'body-parser.mjs';
import axios from 'axios.mjs';

// Create Express app
const app = express();

// Middleware setup
// Set Content-Type header to application/json
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

// Serialize response data to JSON
app.get('/users', (req, res) => {
  const users = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }];
  res.send(JSON.stringify(users));
});


// Array to store job data
const jobs = [];

// Array to store user data
const users = [];

// Endpoint for creating user profile
app.post('/users', (req, res) => {
  // Retrieve user data from request body
  const { name, email, password } = req.body;

  // Create new user object
  const user = { id: users.length + 1, name, email, password, likedJobs: [], appliedJobs: [] };

  // Add user to users array
  users.push(user);

  // Return JSON response with success message and user data
  res.json({ success: true, message: 'User profile created successfully', user });
});

// Endpoint for user login
app.post('/login', (req, res) => {
  // Retrieve login data from request body
  const { email, password } = req.body;

  // Find user in users array by email and password
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    // Return JSON response with success message and user data
    res.json({ success: true, message: 'User logged in successfully', user });
  } else {
    // Return JSON response with error message
    res.json({ success: false, message: 'Invalid email or password' });
  }
});

// Endpoint for liking a job
app.post('/jobs/:id/like', (req, res) => {
  // Retrieve job ID from URL parameters
  const jobId = parseInt(req.params.id);

  // Find job in jobs array by ID
  const job = jobs.find(j => j.id === jobId);

  if (job) {
    // Retrieve user ID from request body
    const userId = req.body.userId;

    // Find user in users array by ID
    const user = users.find(u => u.id === userId);

    if (user) {
      // Add job ID to user's likedJobs array
      user.likedJobs.push(jobId);

      // Return JSON response with success message
      res.json({ success: true, message: 'Job liked successfully' });
    } else {
      // Return JSON response with error message
      res.json({ success: false, message: 'User not found' });
    }
  } else {
    // Return JSON response with error message
    res.json({ success: false, message: 'Job not found' });
  }
});

// Endpoint for creating a new job
app.post('/jobs', async (req, res) => {
  // Retrieve job data from request body
  const { title, description, skills, postedBy } = req.body;

  try {
    // Make request to Indeed API with job title and other relevant data
    const response = await axios.get('https://api.indeed.com/ads/apisearch', {
      params: {
        q: title,
        // Other query parameters for Indeed API
        publisher: '59f8cd4f0412962df3bd87972e65d9ac66c72df872fcccbb19466f0b76420fc7', // Replace with your actual API key
        // ...
      }
    });

    // Process response and send relevant job data to client-side
    const jobResults = response.data.results;

    // Create new job object
    const job = {
      id: jobs.length + 1,
      title,
      description,
      skills,
      postedBy,
     // Add additional job data from Indeed API response
      // ...
    };

    // Add job to jobs array
    jobs.push(job);

    // Return JSON response with success message and job data
    res.json({ success: true, message: 'Job created successfully', job });
  } catch (error) {
    // Return JSON response with error message
    res.json({ success: false, message: 'Failed to create job', error: error.message });
  }
});

// Endpoint for updating job information
app.put('/jobs/:id', (req, res) => {
  // Retrieve job ID from URL parameters
  const jobId = parseInt(req.params.id);

  // Find job in jobs array by ID
  const job = jobs.find(j => j.id === jobId);

  if (job) {
    // Retrieve updated job data from request body
    const { title, description, skills } = req.body;

    // Update job information
    job.title = title || job.title;
    job.description = description || job.description;
    job.skills = skills || job.skills;

    // Return JSON response with success message and updated job data
    res.json({ success: true, message: 'Job information updated successfully', job });
  } else {
    // Return JSON response with error message
    res.json({ success: false, message: 'Job not found' });
  }
});

// Endpoint for applying to a job
app.post('/jobs/:id/apply', (req, res) => {
  // Retrieve job ID from URL parameters
  const jobId = parseInt(req.params.id);

  // Find job in jobs array by ID
  const job = jobs.find(j => j.id === jobId);

  if (job) {
    // Retrieve user ID from request body
    const userId = req.body.userId;

    // Find user in users array by ID
    const user = users.find(u => u.id === userId);

    if (user) {
      // Add job ID to user's appliedJobs array
      user.appliedJobs.push(jobId);

      // Return JSON response with success message
      res.json({ success: true, message: 'Job applied successfully' });
    } else {
      // Return JSON response with error message
      res.json({ success: false, message: 'User not found' });
    }
  } else {
    // Return JSON response with error message
    res.json({ success: false, message: 'Job not found' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});

