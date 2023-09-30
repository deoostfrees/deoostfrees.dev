export default function filter() {
  const FILTER_EL = document.querySelector('.filter')
  const FILTER_ELS = FILTER_EL.querySelectorAll('.btn')
  const ARTICLE_ELS = document.querySelectorAll('li[data-type]')

  FILTER_EL.removeAttribute('hidden')

  const hide = (el) => {
    const LINK = el.querySelector('a')

    LINK.setAttribute('tabindex', '-1')

    el.classList.add('hide')
    el.setAttribute('aria-hidden', 'true')
  }

  const show = (el) => {
    const LINK = el.querySelector('a')

    LINK.removeAttribute('tabindex')

    el.classList.remove('hide')
    el.removeAttribute('aria-hidden')
  }

  FILTER_ELS.forEach((filterEl) => {
    filterEl.removeAttribute('aria-disabled')

    filterEl.addEventListener('click', () => {
      if (filterEl.getAttribute('aria-pressed') === 'true') {
        return
      }

      const TYPE = filterEl.getAttribute('data-type')

      FILTER_ELS.forEach((filterEl) => {
        filterEl.setAttribute('aria-pressed', 'false')
      })

      ARTICLE_ELS.forEach((articleEl) => {
        const ARTICLE_TYPE = articleEl.getAttribute('data-type');

        if (TYPE === '' || ARTICLE_TYPE === TYPE) {
          show(articleEl)
        } else {
          hide(articleEl)
        }
      })

      filterEl.setAttribute('aria-pressed', 'true')
    })
  })
}
