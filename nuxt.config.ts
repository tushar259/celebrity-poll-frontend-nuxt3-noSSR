// https://nuxt.com/docs/api/configuration/nuxt-config
const getPollRoutes = async () => {
  try{
    const response = await fetch(`${process.env.API_URL}/api/get-all-dynamic-sitemap`)
    const data = await response.json();
    // return data.map(item => `/poll/${item.poll_title}`)
    const pollTables = data.pollTables.map(item => `/poll/${item.poll_title}`);
    const newsTables = data.newsTables.map(item => `/article/${item.url}`);
    const pollIndustry = data.pollIndustry.map(item => `/industry/${item.which_industry}`);
    const pollWinning = data.pollWinning.map(item => `/poll-winner/${item.poll_title}`);
    
    return {
      pollTables,
      newsTables,
      pollIndustry,
      pollWinning
    }
  }
  catch(error){
    return {};
  }
  
  
}
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    // apiKey: process.env.API_KEY || 'abcd', // Default to an empty string, automatically set at runtime using process.env.NUXT_API_KEY
    private_API_URL: process.env.API_URL,
    public: {
       API_URL: process.env.API_URL, // Exposed to the frontend as well.
       Project_URL: process.env.Project_URL
    }
  },
  hooks: {
    async 'nitro:config'(nitroConfig) {
      if (nitroConfig.dev) return

      // const slugs = await getPollRoutes();
      const {pollTables, newsTables, pollIndustry, pollWinning} = await getPollRoutes();
      nitroConfig.prerender.routes.push(...pollTables, ...newsTables, ...pollIndustry, ...pollWinning);
      
    },
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
        {name: 'format-detection', content: 'telephone=no'}
      ],
      script: [
        // <script src="https://myawesome-lib.js"></script>
        // { src: 'https://awesome-lib.js' }
        {src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js',},
        {src: 'https://code.jquery.com/jquery-3.2.1.slim.min.js' },
        {src: 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js',},
        {src: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js' },
        {src: 'https://kit.fontawesome.com/a076d05399.js', crossorigin: 'anonymous' },
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/js/bootstrap.bundle.min.js' },
        {
          src: 'https://www.googletagmanager.com/gtag/js?id=G-R03V9LK5WC', // Replace 'G-abcd' with your actual Google Analytics property ID
          async: true,
        },
        {
          innerHTML: `
            window.dataLayer = window.dataLayer || [];
            function gtag() {
              window.dataLayer.push(arguments);
            }
            gtag('js', new Date());
            gtag('config', 'G-R03V9LK5WC'); // Replace 'G-abcd' with your actual Google Analytics property ID
          `,
        },
      ],
      link: [
        {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},

        {rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css", integrity: "sha512-..", crossorigin: "anonymous", referrerpolicy: "no-referrer" },
        {rel: 'preconnect', href: 'https://fonts.bunny.net' },
        {rel: 'stylesheet', href: 'https://fonts.bunny.net/css?family=figtree:400,600&display=swap',},
        {rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css',},
        {rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',},
        
        // <link rel="stylesheet" href="https://myawesome-lib.css">
        // { rel: 'stylesheet', href: 'https://awesome-lib.css' }
        {rel: "stylesheet", href:"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.0/css/all.min.css"}
      ],
      // please note that this is an area that is likely to change
      style: [
        // <style type="text/css">:root { color: red }</style>
        // { children: ':root { color: red }', type: 'text/css' }
      ],
      noscript: [
        // <noscript>JavaScript is required</noscript>
        // { children: 'JavaScript is required' }
      ]
    }
  },
  css: [
    '~/assets/custom.css',
    'bootstrap/dist/css/bootstrap.css',
    'bootstrap/dist/css/bootstrap.min.css'
  ],
  
  plugins: [
    '~/jsplugins/jquery.js',
    // '~/jsplugins/bootstrap.client.js'
    { src: '~/jsplugins/bootstrap.client.js', mode: 'client' }
  ],
  
  build:{
    // vue-toastification - old commonjs module 
    // transpile: ['vue-toastification'],
  },
  components: true,
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', 'sitemap.xml'],
      ignore: ['/tak', '/konfiguration', '/checkout'],
    },
  },

  modules: ['nuxt-simple-sitemap'],
  sitemap: {
    urls: async () =>{
      // const slugs = await getPollRoutes();
      const {pollTables, newsTables, pollIndustry, pollWinning} = await getPollRoutes();
      const allRoutes = [...pollTables, ...newsTables, ...pollIndustry, ...pollWinning];
      const sitemapArray = [];

      for(let i=0; i<allRoutes.length; i++){
        const sitemapObject = {
          loc: allRoutes[i]
        }
        sitemapArray.push(sitemapObject);
      }

      return sitemapArray;
    }
  }
  
  // site: {
  //   url: 'https://www.polldiary.com/',
  // },
  // sitemap: {
  //   sitemaps: {
  //     allPages: {
  //       //should only include /bar urls
  //       include: ['/**'],
  //     },
  //     industryPages: {
  //       //should only include /bar urls
  //       include: ['/bar/**'],
  //     },
  //   },
  // },
})
