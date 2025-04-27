document.addEventListener('DOMContentLoaded', function() {
  const loadMoreBtn = document.getElementById('loadMoreFaq');
  const hiddenFaqs = document.querySelectorAll('.faq-item.hidden');
  let isExpanded = false;

  loadMoreBtn.addEventListener('click', function() {
      isExpanded = !isExpanded;
      
      hiddenFaqs.forEach(faq => {
          if (isExpanded) {
              faq.classList.remove('hidden');
              faq.classList.add('show');
              loadMoreBtn.classList.add('active');
              loadMoreBtn.innerHTML = '<span>Show Less</span><i class="fas fa-chevron-up"></i>';
          } else {
              faq.classList.add('hidden');
              faq.classList.remove('show');
              loadMoreBtn.classList.remove('active');
              loadMoreBtn.innerHTML = '<span>Load More</span><i class="fas fa-chevron-down"></i>';
          }
      });

      // Reinitialize AOS for new elements
      AOS.refresh();

      // Smooth scroll to new content if expanding
      if (isExpanded) {
          const lastVisibleFaq = document.querySelector('.faq-item.show:last-child');
          if (lastVisibleFaq) {
              lastVisibleFaq.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
      }
  });
});