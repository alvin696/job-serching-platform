document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('#job-search-form');
  const jobListings = document.querySelector('#job-listings');

  form.addEventListener('submit', async function(event) {
    event.preventDefault();
    const searchQuery = document.querySelector('#job-search-input').value;
    const locationQuery = document.querySelector('#location-input').value;

    try {
      const response = await fetch(`http://localhost:3000/jobSearches?q=${searchQuery}&location=${locationQuery}`);
      const jobList = await response.json();
      let jobListHTML = '';

      jobList.forEach(function(job) {
        jobListHTML += `
          <li class="collection-item">
            <div>
              <h5>${job.title}</h5>
              <p>${job.company} - ${job.location}</p>
              <p>${job.description}</p>
              <p>${job.salary}</p>
              <p>${job.date}</p>
            </div>
          </li>
        `;
      });

      jobListings.innerHTML = jobListHTML;
    } catch(error) {
      console.error(error);
    }
  });
});
