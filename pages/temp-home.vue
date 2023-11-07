<template>
    <div >
        <!-- welcome home -->
        <div class="newsfeed-container">
            <div class="row">
                <div class="col">
                    <div class="row top-left-news">
                        <div class="col-md-3" v-for="(singletopLeftNews, index) in topLeftNews" :key="index">
                            <a :href="'/article/' + singletopLeftNews.url">
                                <img :src="apiUrl + '/' + singletopLeftNews.thumbnail" class="top-left-news-image">
                                <span>{{singletopLeftNews.headline}}</span>
                            </a>
                            <div class="px-20-gap"></div>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <h4>
                        Top News
                    </h4>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from 'moment';
    import axios from 'axios';
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
                    // { name: 'twitter:image', content: process.env.API_URL+'/logo/favicon2.png' },
                    { name: 'twitter:card', content: 'summary' },
                    // { name: 'poll-id', content: '123456' }, // Replace with the actual poll ID
                    // { name: 'poll-title', content: 'My Awesome Poll' },
                ]
            });
            // navigateTo('/polls');
        },

        data: () => ({
            token: process.client ? localStorage.getItem('token') : '',
            userEmail: '',
            apiUrl: process.env.API_URL,
            topLeftNews: [],
        }),

        created(){
            // this.$router.push(`/polls`);
            this.apiUrl = this.$config.public.API_URL;
            this.getAllCurrentNews();
        },

        methods:{
            getAllCurrentNews(){
                axios.get(this.apiUrl+`/api/get-all-current-news`)
                .then(response =>{
                    console.log(response);
                    if(response.data.success == 'true'){
                        response.data.topLeftNews.forEach(element => {
                            this.topLeftNews.push(element);
                        });
                    }
                })
                .catch(error =>{
                    console.log(error);
                });
            }
        }
    }
</script>
