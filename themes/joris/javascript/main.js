import './_dark-mode'
import './_service-worker'

if (document.querySelector('.filter') !== null) {
  import('./_filter').then(({ default: filter }) => {
      filter();
  });
}
