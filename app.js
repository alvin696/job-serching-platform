// Create user profile
// Create user profile
axios.post('http://localhost:3000/users', { 
  name: 'John Doe', 
  email: 'johndoe@example.com', 
  password: 'password123' 
}, {
  headers: {
    'Content-Type': 'application/json'
  }
})
.then(response => {
  console.log(response.data);
})
.catch(error => {
  console.error(error.response.data);
});

// User login
axios.post('http://localhost:3000/login', { 
  email: 'johndoe@example.com', 
  password: 'password123' 
})
.then(response => {
  console.log(response.data);
})
.catch(error => {
  console.error(error.response.data);
});

// Like a job
axios.post('http://localhost:3000/jobs/1/like', { 
  userId: 1 
})
.then(response => {
  console.log(response.data);
})
.catch(error => {
  console.error(error.response.data);
});

// Apply to a job
axios.post('http://localhost:3000/jobs/1/apply', { 
  userId: 1 
})
.then(response => {
  console.log(response.data);
})
.catch(error => {
  console.error(error.response.data);
});

// Retrieve job details
axios.get('http://localhost:3000/jobs/1')
.then(response => {
  console.log(response.data);
})
.catch(error => {
  console.error(error.response.data);
});

// Create a new job
axios.post('http://localhost:3000/jobs', { 
  title: 'Front-end Developer', 
  description: 'Job description', 
  skills: ['HTML', 'CSS', 'JavaScript'], 
  postedBy: 1 
})
.then(response => {
  console.log(response.data);
})
.catch(error => {
  console.error(error.response.data);
});

// Update job information
const jobId = 1; // ID of the job to be updated
const updatedJobData = { 
  title: 'Senior Front-end Developer', 
  description: 'Updated job description' 
};
axios.put(`http://localhost:3000/jobs/${jobId}`, updatedJobData)
.then(response => {
  console.log(response.data);
})
.catch(error => {
  console.error(error.response.data);
});

// Apply to a job
const jobId = 1; // ID of the job to apply to
const userId = 1; // ID of the user applying for the job
axios.post(`http://localhost:3000/jobs/${jobId}/apply`, { 
  userId 
})
.then(response => {
  console.log(response.data);
})
.catch(error => {
  console.error(error.response.data);
});
