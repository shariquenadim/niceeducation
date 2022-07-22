// function createHTML(id, name) {
//    const html = `<div class="courses-item" data-wow-delay="600ms" data-wow-duration="1500ms">
//                      <div class="service_content_box relative-position">
//                         <div class="service_text_box saas2-headline pera-content">
//                            <a href="/courses/${id}"><h3>${name}</h3></a>
//                         </div>
//                         <div class="view-more-btn">
//                            <a href="/courses/${id}">View More</a>
//                         </div>
//                      </div>
//                </div>`;

//    return html;
// }

// function getCourses(courseContainer) {
//    fetch("/api/courses")
//    .then(res => res.json())
//    .then(res => {
//       courseContainer.innerHTML = '';
//       res.forEach((val,i) => {
//          const html = createHTML(val.id, val.name)
//          courseContainer.insertAdjacentHTML('beforeend', html);
//       })
//       console.log(res)
//    })
//    .then(res => {
//       $('#courses').slick({
//          autoplay: false,
//          arrows: true,
//          slidesToShow: 3,
//          infinite: false,
//          rows: 4,
//          dots: false,
//          responsive: [
//          {
//             breakpoint: 1024,
//             settings: {
//             slidesToShow: 3,
//             rows: 4,
//             arrows: true,
//             infinite: true,
//             }
//          },
//          {
//             breakpoint: 800,
//             settings: {
//             slidesToShow: 2,
//             rows: 4,
//             }
//          },
//          {
//             breakpoint: 480,
//             settings: {
//             slidesToShow: 1,
//             rows: 4,
//             }
//          }
//       ]
//       });
//    })
//    .catch(err => {
//       courseContainer.innerHTML = '';
//       courseContainer.insertAdjacentHTML('beforeend', '<h3>Something Went Wrong</h3><br><h3>Please refresh</h3>');
//       console.log(err);
//    })
// }


// $(document).ready(function(){
//    const courseContainer = $('#courses')[0];
//    getCourses(courseContainer);
// });

$('#courses').slick({
   autoplay: false,
   arrows: true,
   slidesToShow: 3,
   infinite: false,
   rows: 4,
   dots: false,
   responsive: [
      {
         breakpoint: 1024,
         settings: {
         slidesToShow: 3,
         rows: 4,
         arrows: true,
         infinite: true,
         }
      },
      {
         breakpoint: 800,
         settings: {
         slidesToShow: 2,
         rows: 4,
         }
      },
      {
         breakpoint: 480,
         settings: {
         slidesToShow: 1,
         rows: 4,
         }
      }
   ]
});