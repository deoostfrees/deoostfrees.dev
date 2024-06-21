export default function share () {
  const SHARE_EL = document.querySelector('.btn--share')

  if (navigator.share) {
    SHARE_EL.addEventListener('click', () => {
      navigator.share({
        title: SHARE_EL.getAttribute('data-title'),
        url: SHARE_EL.getAttribute('data-href')
      })
    })
  } else {
    SHARE_EL.parentNode.setAttribute('hidden', '')
  }
}
