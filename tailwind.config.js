const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        standalone: { raw: '(display-mode: standalone)' },
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        '.no-tap-highlighting': {
          'webkit-tap-highlight-color': 'rgba(0,0,0,0)'
        },
        '.safe-top': {
          paddingTop: 'constant(safe-area-inset-top)',
          paddingTop: 'env(safe-area-inset-top)'
        },
        '.safe-left': {
          paddingLeft: 'constant(safe-area-inset-left)',
          paddingLeft: 'env(safe-area-inset-left)'
        },
        '.safe-right': {
          paddingRight: 'constant(safe-area-inset-right)',
          paddingRight: 'env(safe-area-inset-right)'
        },
        '.safe-bottom': {
          paddingBottom: 'constant(safe-area-inset-bottom)',
          paddingBottom: 'env(safe-area-inset-bottom)'
        },


        '.app-body': {
          'z-index': '10'
        },
        '.app-nav': {
          'z-index': '20'
        },
        '.app-blackout': {
          'z-index': '29'
        },
        '.app-modal': {
          'z-index': '30'
        },

        '.max-width': {
          'width': '100%',
          'max-width': 'var(--app-max-width)',
          'margin-left': 'auto',
          'margin-right': 'auto'
        },

        // Friendz Headers

        '.friendz-header-sm': {
          'padding-top': '0',
          'height': 'calc(var(--friendz-header-height-sm))',
        },
        '.friendz-header-sa': {
          'padding-top': ' env(safe-area-inset-top)',
          'height': 'calc(var(--friendz-header-height-sa) + env(safe-area-inset-top))',
        },
        '.friendz-header-md': {
          'padding-top': ' env(safe-area-inset-top)',
          'height': 'calc(var(--friendz-header-height-md) + env(safe-area-inset-top))',
        },
        '.friendz-header-lg': {
          'padding-top': '0',
          'height': 'calc(var(--friendz-header-height-lg))',
        },

        // Page Headers

        '.page-header-sm': {
          'top': 'calc(var(--friendz-header-height-sm)  + env(safe-area-inset-top))',
          'height': 'calc(var(--page-header-height-sm))'
        },
        '.page-header-sa': {
          'top': 'calc(var(--friendz-header-height-sa) + env(safe-area-inset-top))',
          'height': 'calc(var(--page-header-height-sa))'
        },
        '.page-header-md': {
          'top': 'var(--friendz-header-height-md)',
          'height': 'calc(var(--page-header-height-md))',
        },
        '.page-header-lg': {
          'top': 'var(--friendz-header-height-lg)',
          'height': 'calc(var(--page-header-height-lg))',
        },

        // Body 

        '.friendz-body-sm': {
          'padding-top': 'calc(var(--friendz-header-height-sm) + env(safe-area-inset-top))',
          'padding-bottom': 'calc(var(--friendz-footer-height-sm) + env(safe-area-inset-bottom))'
        },
        '.friendz-body-sa': {
          'padding-top': 'calc(var(--friendz-header-height-sa) + env(safe-area-inset-top))',
          'padding-bottom': 'calc(var(--friendz-footer-height-sa) + env(safe-area-inset-bottom))'
        },
        '.friendz-body-md': {
          'padding-top': 'calc(var(--friendz-header-height-md) + env(safe-area-inset-top))',
          'padding-bottom': 'calc(var(--friendz-footer-height-md) + env(safe-area-inset-bottom))'
        },
        '.friendz-body-lg': {
          'padding-top': 'calc(var(--friendz-header-height-lg))',
          'padding-bottom': '0'
        },

        // Friendz  Footer 

        '.friendz-footer-sm': {
          'height': 'calc(var(--friendz-footer-height-sm) + env(safe-area-inset-bottom))'
        },
        '.friendz-footer-sa': {
          'height': 'calc(var(--friendz-footer-height-sa) + env(safe-area-inset-bottom))'
        },
        '.friendz-footer-md': {
          'height': 'calc(var(--friendz-footer-height-md) + env(safe-area-inset-bottom))'
        },
        '.friendz-footer-lg': {
          'height': 'calc(var(--friendz-footer-height-lg) + env(safe-area-inset-bottom))'
        },

        // Sticky Header 

        '.sticky-friendz': {
          'position': 'sticky',
          'top': 'calc(var(--friendz-header-height-sm) + env(safe-area-inset-top))'
        },


        // Slide Menu

        '.slidemenu-sm': {
          'width': 'calc(var(--slidemenu-width-sm))'
        },
        '.slidemenu-sa': {
          'width': 'calc(var(--slidemenu-width-sa))'
        },
        '.slidemenu-md': {
          'width': 'calc(var(--slidemenu-width-md))'
        },
        '.slidemenu-lg': {
          'width': 'calc(var(--slidemenu-width-lg))'
        },

        '.slidemenu-header-sm': {
          'height': 'calc(var(--friendz-header-height-sm) + var(--page-header-height-sm) + env(safe-area-inset-top))'
        },
        '.slidemenu-header-sa': {
          'height': 'calc(var(--friendz-header-height-sa) + var(--page-header-height-sa) + env(safe-area-inset-top))'
        },
        '.slidemenu-header-md': {
          'height': 'calc(var(--friendz-header-height-md) + env(safe-area-inset-top))'
        },
        '.slidemenu-header-lg': {
          'height': 'calc(var(--friendz-header-height-lg) + env(safe-area-inset-top))'
        },



        // Modals
        ///////////////////////////////////////////////////////

        '.popup-over-sm': {
          'margin-top': 'calc(var(--friendz-header-height-sm) + env(safe-area-inset-top) + var(--popup-over-inset-sm))',
          'inset': 'auto var(--popup-over-inset-sm) 0 var(--popup-over-inset-sm)'
        },
        '.popup-over-sa': {
          'margin-top': 'calc(var(--friendz-header-height-sm) + env(safe-area-inset-top) + var(--popup-over-inset-sm))',
          'inset': 'auto var(--popup-over-inset-sa) 0 var(--popup-over-inset-sa)'
        },
        '.popup-over-md': {
          'margin-top': 'calc(var(--friendz-header-height-md) + env(safe-area-inset-top) + var(--popup-over-inset-sm))',
          'inset': 'auto var(--popup-over-inset-md) 0 var(--popup-over-inset-md)'
        },
        '.popup-over-lg': {
          'margin-top': 'calc(var(--friendz-header-height-lg) + env(safe-area-inset-top) + var(--popup-over-inset-sm))',
          'inset': 'auto var(--popup-over-inset-lg) 0 var(--popup-over-inset-lg)'
        },

        // Hero Sections
        ////////////////////////////////////////////////////////

        // Hero Body 100%

        '.hero-100-hb-sm': {
          'height': 'calc(100vh - calc(var(--friendz-header-height-sm) + var(--friendz-footer-height-sm) + env(safe-area-inset-top) + env(safe-area-inset-bottom))  )',
          'margin-top': 'calc(var(--page-header-height-sm) * -1)'
        },
        '.hero-100-hb-sa': {
          'height': 'calc(100vh - calc(var(--friendz-header-height-sa) + var(--friendz-footer-height-sa) + env(safe-area-inset-top) + env(safe-area-inset-bottom))  )',
          'margin-top': 'calc(var(--page-header-height-sa) * -1)'
        },
        '.hero-100-hb-md': {
          'height': 'calc(100vh - calc(var(--friendz-header-height-md) + var(--friendz-footer-height-md) + env(safe-area-inset-top) + env(safe-area-inset-bottom)) )',
          'margin-top': 'calc(var(--page-header-height-md) * -1)'
        },
        '.hero-100-hb-lg': {
          'height': 'calc(100vh - calc(var(--friendz-header-height-lg)) )',
          'margin-top': 'calc(var(--page-header-height-lg) * -1)'
        },


        // Hero Body 75%

        '.hero-75-hb-sm': {
          'height': 'calc(75vh - calc( env(safe-area-inset-top) + env(safe-area-inset-bottom))  )',
          'margin-top': 'calc(var(--page-header-height-sm) * -1)'
        },
        '.hero-75-hb-sa': {
          'height': 'calc(75vh - calc( env(safe-area-inset-top) + env(safe-area-inset-bottom))  )',
          'margin-top': 'calc(var(--page-header-height-sa) * -1)'
        },
        '.hero-75-hb-md': {
          'margin-top': 'calc(var(--page-header-height-md) * -1)'
        },
        '.hero-75-hb-lg': {
          'margin-top': 'calc(var(--page-header-height-lg) * -1)'
        },

        // Hero Body 66%

        '.hero-66-hb-sm': {
          'height': 'calc(66vh - calc( env(safe-area-inset-top) + env(safe-area-inset-bottom))  )',
          'margin-top': 'calc(var(--page-header-height-sm) * -1)'
        },
        '.hero-66-hb-sa': {
          'height': 'calc(66vh - calc( env(safe-area-inset-top) + env(safe-area-inset-bottom))  )',
          'margin-top': 'calc(var(--page-header-height-sa) * -1)'
        },
        '.hero-66-hb-md': {
          'height': 'calc(66vh - calc( env(safe-area-inset-top) + env(safe-area-inset-bottom))  )',
          'margin-top': 'calc(var(--page-header-height-md) * -1)'
        },
        '.hero-66-hb-lg': {
          'height': 'calc(66vh - calc( env(safe-area-inset-top) + env(safe-area-inset-bottom))  )',
          'margin-top': 'calc(var(--page-header-height-lg) * -1)'
        },

        // Hero Body 50%

        '.hero-50-hb-sm': {
          'height': 'calc(50vh - calc( env(safe-area-inset-top) + env(safe-area-inset-bottom))  )',
          'margin-top': 'calc(var(--page-header-height-sm) * -1)'
        },
        '.hero-50-hb-sa': {
          'height': 'calc(50vh - calc( env(safe-area-inset-top) + env(safe-area-inset-bottom))  )',
          'margin-top': 'calc(var(--page-header-height-sa) * -1)'
        },
        '.hero-50-hb-md': {
          'height': 'calc(50vh - calc( env(safe-area-inset-top) + env(safe-area-inset-bottom))  )',
          'margin-top': 'calc(var(--page-header-height-md) * -1)'
        },
        '.hero-50-hb-lg': {
          'height': 'calc(50vh - calc( env(safe-area-inset-top) + env(safe-area-inset-bottom))  )',
          'margin-top': 'calc(var(--page-header-height-lg) * -1)'
        },

        // Hero Body 33%

        '.hero-33-hb-sm': {
          'height': 'calc(33vh - calc( env(safe-area-inset-top) + env(safe-area-inset-bottom))  )',
          'margin-top': 'calc(var(--page-header-height-sm) * -1)'
        },
        '.hero-33-hb-sa': {
          'height': 'calc(33vh - calc( env(safe-area-inset-top) + env(safe-area-inset-bottom))  )',
          'margin-top': 'calc(var(--page-header-height-sm) * -1)'
        },
        '.hero-33-hb-md': {
          'height': 'calc(33vh - calc( env(safe-area-inset-top) + env(safe-area-inset-bottom))  )',
          'margin-top': 'calc(var(--page-header-height-md) * -1)'
        },
        '.hero-33-hb-lg': {
          'height': 'calc(33vh - calc( env(safe-area-inset-top) + env(safe-area-inset-bottom))  )',
          'margin-top': 'calc(var(--page-header-height-lg) * -1)'
        },


      }
      addUtilities(newUtilities);
    })
  ],
}
