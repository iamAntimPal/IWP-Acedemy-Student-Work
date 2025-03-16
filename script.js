document.addEventListener('DOMContentLoaded', () => {
  async function fetchTopRepos() {
    const username = 'iamAntimPal';
    try {
      const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
      let repos = await response.json();

      // Sort repositories by combined stars and forks (descending)
      repos.sort((a, b) => (b.stargazers_count + b.forks_count) - (a.stargazers_count + a.forks_count));

      // Select the top four repositories
      const topRepos = repos.slice(0, 4);
      const container = document.getElementById('repos-container');

      topRepos.forEach(repo => {
        // Create repository card element
        const repoCard = document.createElement('a');
        repoCard.href = repo.html_url;
        repoCard.target = '_blank';

        // Create image element using GitHub ReadMe Stats pin URL
        const repoImg = document.createElement('img');
        repoImg.src = `https://github-readme-stats.vercel.app/api/pin/?username=${username}&repo=${repo.name}&theme=dark`;
        repoImg.alt = repo.name;

        // Create overlay for repository name
        const overlay = document.createElement('div');
        overlay.classList.add('repo-overlay');
        overlay.textContent = repo.name;

        // Append image and overlay to repository card
        repoCard.appendChild(repoImg);
        repoCard.appendChild(overlay);

        // Append repository card to container
        container.appendChild(repoCard);
      });
    } catch (error) {
      console.error('Error fetching repositories:', error);
      document.getElementById('repos-container').innerHTML = '<p>Failed to load repositories.</p>';
    }
  }

  fetchTopRepos();
});
