const BROWSER_WINDOW = window
const DIALOG_EL = document.getElementById("theme-selector")
const DOCUMENT_EL = document.documentElement
const DARKMODE_TOGGLE = document.querySelector('.btn--dialog-open')

DARKMODE_TOGGLE.removeAttribute('aria-disabled')

/**
 * Set color mode
 *
 * @param {string} theme - Theme
 */
const setColorMode = (theme, save) => {
  DOCUMENT_EL.setAttribute('data-theme', theme)

  if (save) {
    localStorage.setItem('color-mode', theme)
  }
}

DARKMODE_TOGGLE.addEventListener('click', () => {
  const selectedTheme = localStorage.getItem('color-mode')

  const themeInputs = DIALOG_EL.querySelectorAll('input[name="theme"]')

  themeInputs.forEach((input) => {
    if (input.value === selectedTheme) {
      input.checked = true
    } else {
      input.checked = false
    }
  })

  DIALOG_EL.showModal()
})

DIALOG_EL.addEventListener("click", ({ target }) => {
  if (target.matches('dialog')) {
    DIALOG_EL.close()
  }
})

DIALOG_EL.querySelector('fieldset.theme').addEventListener('change', (event) => {
  setColorMode(event.target.value)
})

DIALOG_EL.querySelector('.btn--dialog-close').addEventListener("click", () => {
  if (localStorage.getItem('color-mode')) {
    currentTheme = localStorage.getItem('color-mode')
  } else {
    currentTheme = 'system'
  }

  setColorMode(currentTheme)

  DIALOG_EL.close()
})

DIALOG_EL.querySelector('.btn--dialog-save').addEventListener("click", function() {
  currentTheme = DOCUMENT_EL.getAttribute('data-theme')

  setColorMode(currentTheme, true)

  DIALOG_EL.close()
})

/**
 * Check prefers color scheme
 *
 */
const COLOR_QUERY = window.matchMedia('(prefers-color-scheme: dark)')

const prefersColorCheck = () => {
  let colorMode

  if (localStorage.getItem('color-mode')) {
    colorMode = localStorage.getItem('color-mode')
  } else {
    colorMode = 'system'
  }

  setColorMode(colorMode, true)
}

prefersColorCheck()

// Check for any OS level changes to the preference
COLOR_QUERY.addEventListener('change', prefersColorCheck)

/**
 * Check for any storage changes
 * It fires on a page every time another page from the same domain has modified a value
 *
 */
BROWSER_WINDOW.addEventListener('storage', (event) => {
  if (event.key === 'color-mode') {
    setColorMode(event.newValue, true)
  }
})
