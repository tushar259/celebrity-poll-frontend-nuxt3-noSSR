// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    private_API_URL: process.env.API_URL,
    public: {
       API_URL: process.env.API_URL, 
       Project_URL: process.env.Project_URL
    }
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      bodyAttrs: {
          class: 'bg-gray-100'
      },
      meta: [
        {charset: 'utf-8'},
        {name: 'viewport', content: 'width=device-width, initial-scale=1'},
        {hid: 'description', name: 'description', content: ''},
        {name: 'format-detection', content: 'telephone=no'},
        { hid: 'og:image', property: 'og:image', content: 'https://www.polldiary.online/public/logo/favicon2.webp' },
        { name: 'twitter:image', content: 'https://www.polldiary.online/public/logo/favicon2.webp' },
        {name: "google-site-verification", content: "tiXPW3D2tlqlJslBcDLYfIMdopMxTU7OC3zTN6r7Sew"}
      ],
      script: [
        // {src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js',},
        // {src: 'https://code.jquery.com/jquery-3.2.1.slim.min.js' },
        // {src: 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js',},
        // {src: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js' },
        // {src: 'https://kit.fontawesome.com/a076d05399.js', crossorigin: 'anonymous' },
        // { src: 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/js/bootstrap.bundle.min.js' },
        {
          src: 'https://www.googletagmanager.com/gtag/js?id=G-R03V9LK5WC', 
          async: true,
        },
        {
          innerHTML: `
            window.dataLayer = window.dataLayer || [];
            function gtag() {
              window.dataLayer.push(arguments);
            }
            gtag('js', new Date());
            gtag('config', 'G-R03V9LK5WC'); 
          `,
        },
        {
          src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9463354317363004',
          async: true,
          crossorigin: 'anonymous'
        },
      ],
      link: [
        {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},

        {rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css", integrity: "sha512-..", crossorigin: "anonymous", referrerpolicy: "no-referrer" },
        // {rel: 'preconnect', href: 'https://fonts.bunny.net' },
        // {rel: 'stylesheet', href: 'https://fonts.bunny.net/css?family=figtree:400,600&display=swap',},
        // {rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css',},
        // {rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',},
      ],
      
    }
  },
  css: [
    '~/assets/custom.css',
    'bootstrap/dist/css/bootstrap.css',
    'bootstrap/dist/css/bootstrap.min.css'
  ],
  
  plugins: [
    '~/plugins/jquery.js',
    // {src: '~/jsplugins/bootstrap.client.js', mode: 'client'},
    // { src: "~/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js", mode: "client" }
  ],
  modules: ['nuxt-speedkit', 'nuxt-simple-sitemap'],

  speedkit: {
    // Example configuration options
    prefetch: {
      includePaths: ['/article/**', '/poll/**'],
      // excludePaths: ['/admin/**'],
    },
    preload: {
      includePaths: ['/', '/polls'],
      // excludePaths: ['/contact'],
    },
    cache: {
      browser: true,
      server: true,
    },
  },
  
  components: true,

  image: {
    domains: ['https://polldiary.online/public']
  }
})
