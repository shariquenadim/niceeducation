const marqueeContainer = document.getElementById("marquee");

fetch("/api/notice")
  .then(res => res.json())
  .then(res => {
    res.map(val => {
      const html = `<a href="/blog/${val.id}">${val.title}</a>`;
      marqueeContainer.insertAdjacentHTML('beforeend', html);
    })
  })
  .catch(err => {
    console.log(err);
  })