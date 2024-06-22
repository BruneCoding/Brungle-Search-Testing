function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  } 
  return "no";
}

document.addEventListener("DOMContentLoaded", function(){
  if (getQueryVariable("query") != "no"){
    search(encodeURIComponent(query))
  }
})

document.getElementById('search-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const query = document.getElementById('query').value;
  search(query);
});

function search(query) {
  const apiKey = 'AIzaSyAfU2qf_tKGN8JmiEVLszhRIAjsR80VBb0';
  const searchEngineId = '564f027734c9441fe';
  const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${query}`;

  fetch(url)
      .then(response => response.json())
      .then(data => {
          const results = document.getElementById('results');
          const aiSummary = document.getElementById('ai-summary');
          results.innerHTML = '';

          if (data.items) {
              data.items.forEach(item => {
                  const li = document.createElement('li');
                  li.className = 'result-item';

                  const a = document.createElement('a');
                  a.href = item.link;
                  a.textContent = item.title;
                  a.target = '_blank';

                  const p = document.createElement('p');
                  p.className = 'result-description';
                  p.textContent = item.snippet;

                  li.appendChild(a);
                  li.appendChild(p);
                  results.appendChild(li);
              });

              // Mock AI summarization for the demonstration
              aiSummary.textContent = "Found more than 3000 Results";
          } else {
              results.innerHTML = '<li>No results found.</li>';
              aiSummary.textContent = '';
          }
      })
      .catch(error => console.error('Error:', error));
}
