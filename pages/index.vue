<template>
    <div >
        <!-- welcome home -->
    </div>
</template>

<script>
    export default {
        setup(){
            // Now you can use router and route as needed
            
            useHead({
                title: `PollDiary - Home`,
                meta: [
                    
                    {name: 'description', content: ''},

                    { hid: 'og:title', property: 'og:title', content: `PollDiary - Home` },
                    { hid: 'og:description', property: 'og:description', content: 'Welcome to PollDiary! Vote your favourite star. We are dedicated to providing an engaging platform for star polls and discussions.' },
                    { hid: 'og:image', property: 'og:image', content: process.env.API_URL+'/logo/favicon2.png' },
                    { hid: 'og:url', property: 'og:url', content: process.env.Project_URL },
                    { hid: 'og:type', property: 'og:type', content: 'website' },

                    { name: 'twitter:title', content: `PollDiary - Home` },
                    { name: 'twitter:description', content: 'Welcome to PollDiary! Vote your favourite star. We are dedicated to providing an engaging platform for star polls and discussions.' },
                    { name: 'twitter:image', content: process.env.API_URL+'/logo/favicon2.png' },
                    { name: 'twitter:card', content: 'summary_large_image' },
                    // { name: 'poll-id', content: '123456' }, // Replace with the actual poll ID
                    // { name: 'poll-title', content: 'My Awesome Poll' },
                ]
            })
        },

        data: () => ({
            token: process.client ? localStorage.getItem('token') : '',
            userEmail: '',
        }),

        created(){
            this.$router.push(`/polls`);
        }
    }
</script>
