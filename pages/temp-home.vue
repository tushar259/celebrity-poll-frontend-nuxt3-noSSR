<template>
    <div >
        <!-- welcome home -->
        <div class="newsfeed-container">
            <div v-if="newsFound == false">
                Page not found
            </div>
            <div v-else-if="newsFound == null" class="loading-spinner-view">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
            <div v-else-if="newsFound == true">
                <div class="row">
                    <div class="col">
                        <!-- <div class="row top-left-news">
                            <div class="col-md-3" v-for="(singletopLeftNews, index) in topLeftNews" :key="index">
                                <a :href="'/article/' + singletopLeftNews.url">
                                    <img :src="apiUrl + '/' + singletopLeftNews.thumbnail" class="top-left-news-image">
                                    <span>{{singletopLeftNews.headline}}</span>
                                </a>
                                <div class="px-20-gap"></div>
                            </div>
                        </div> -->
                        <div class="row top-left-news">
                            <div class="col-md-6">
                                <a :href="'/article/' + topOftopLeftNews[0].url" class="top-left-news-image-latest">
                                    <img :src="apiUrl + '/' + topOftopLeftNews[0].thumbnail" ><br>
                                    <span>{{topOftopLeftNews[0].headline}}</span>
                                    <div class="px-10-gap"></div>
                                </a>
                            </div>
                        </div>
                        <div class="row top-left-news">
                            <div v-for="(singletopLeftNews, index) in topLeftNews" :key="index" class="col-md-5">
                                <hr class="d-block d-sm-none">
                                <div class="px-5-gap"></div>
                                <a :href="'/article/' + singletopLeftNews.url" class="d-flex top-left-news-image">
                                    <img :src="apiUrl + '/' + singletopLeftNews.thumbnail">
                                    <span>{{singletopLeftNews.headline}}</span>
                                </a>
                                <div class="px-5-gap"></div>
                            </div>
                        </div>

                        <div class="px-10-gap"></div>
                        <div class="home-top-news-show-more"><button class="btn">Show More</button></div>
                        <div class="px-10-gap"></div>

                        <ul class="nav nav-tabs home-news-nav-tab">
                            <li class="nav-item" @click="selectedOption = 'Bollywood';getNewsIndustryWise('Bollywood')">
                                <a class="nav-link" :class="{ active: selectedOption == 'Bollywood' }">Bollywood</a>
                            </li>
                            <li class="nav-item" @click="selectedOption = 'Music';getNewsIndustryWise('Music')">
                                <a class="nav-link" :class="{ active: selectedOption == 'Music' }">Music</a>
                            </li>
                            <li class="nav-item" @click="selectedOption = 'Hollywood';getNewsIndustryWise('Hollywood')">
                                <a class="nav-link" :class="{ active: selectedOption == 'Hollywood' }">Hollywood</a>
                            </li>
                            <li class="nav-item" @click="selectedOption = 'South India';getNewsIndustryWise('South India')">
                                <a class="nav-link" :class="{ active: selectedOption == 'South India' }">South India</a>
                            </li>
                            <li class="nav-item" @click="selectedOption = 'TV';getNewsIndustryWise('TV')">
                                <a class="nav-link" :class="{ active: selectedOption == 'TV' }">TV</a>
                            </li>
                            <li class="nav-item" @click="selectedOption = 'Worldwide';getNewsIndustryWise('Worldwide')">
                                <a class="nav-link" :class="{ active: selectedOption == 'Worldwide' }">Worldwide</a>
                            </li>
                            <li class="nav-item" @click="selectedOption = 'Others';getNewsIndustryWise('Others')">
                                <a class="nav-link" :class="{ active: selectedOption == 'Others' }">Others</a>
                            </li>
                        </ul>
                        <div class="px-20-gap"></div>

                        <div class="row top-left-news" v-if="selectedOption == 'Bollywood'">
                            <div v-for="(singlebollywoodNews, index) in bollywoodNews" :key="index" class="col-md-5" >
                                
                                <div class="px-5-gap"></div>
                                <a :href="'/article/' + singlebollywoodNews.url" class="d-flex top-left-news-image">
                                    <img :src="apiUrl + '/' + singlebollywoodNews.thumbnail">
                                    <span>{{singlebollywoodNews.headline}}</span>
                                </a>
                                <div class="px-5-gap"></div>
                                <hr class="d-block d-sm-none">
                            </div>
                        </div>

                        <div class="row top-left-news" v-if="selectedOption == 'Music'">
                            <div v-for="(singlemusicNews, index) in musicNews" :key="index" class="col-md-5" >
                                
                                <div class="px-5-gap"></div>
                                <a :href="'/article/' + singlemusicNews.url" class="d-flex top-left-news-image">
                                    <img :src="apiUrl + '/' + singlemusicNews.thumbnail">
                                    <span>{{singlemusicNews.headline}}</span>
                                </a>
                                <div class="px-5-gap"></div>
                                <hr class="d-block d-sm-none">
                            </div>
                        </div>

                        <div class="row top-left-news" v-if="selectedOption == 'Hollywood'">
                            <div v-for="(singlehollywoodNews, index) in hollywoodNews" :key="index" class="col-md-5" >
                                
                                <div class="px-5-gap"></div>
                                <a :href="'/article/' + singlehollywoodNews.url" class="d-flex top-left-news-image">
                                    <img :src="apiUrl + '/' + singlehollywoodNews.thumbnail">
                                    <span>{{singlehollywoodNews.headline}}</span>
                                </a>
                                <div class="px-5-gap"></div>
                                <hr class="d-block d-sm-none">
                            </div>
                        </div>

                        <div class="row top-left-news" v-if="selectedOption == 'South India'">
                            <div v-for="(singlesouthIndiaNews, index) in southIndiaNews" :key="index" class="col-md-5" >
                                
                                <div class="px-5-gap"></div>
                                <a :href="'/article/' + singlesouthIndiaNews.url" class="d-flex top-left-news-image">
                                    <img :src="apiUrl + '/' + singlesouthIndiaNews.thumbnail">
                                    <span>{{singlesouthIndiaNews.headline}}</span>
                                </a>
                                <div class="px-5-gap"></div>
                                <hr class="d-block d-sm-none">
                            </div>
                        </div>

                        <div class="row top-left-news" v-if="selectedOption == 'TV'">
                            <div v-for="(singletvNews, index) in tvNews" :key="index" class="col-md-5" >
                                
                                <div class="px-5-gap"></div>
                                <a :href="'/article/' + singletvNews.url" class="d-flex top-left-news-image">
                                    <img :src="apiUrl + '/' + singletvNews.thumbnail">
                                    <span>{{singletvNews.headline}}</span>
                                </a>
                                <div class="px-5-gap"></div>
                                <hr class="d-block d-sm-none">
                            </div>
                        </div>

                        <div class="row top-left-news" v-if="selectedOption == 'Worldwide'">
                            <div v-for="(singleworldwideNews, index) in worldwideNews" :key="index" class="col-md-5" >
                                
                                <div class="px-5-gap"></div>
                                <a :href="'/article/' + singleworldwideNews.url" class="d-flex top-left-news-image">
                                    <img :src="apiUrl + '/' + singleworldwideNews.thumbnail">
                                    <span>{{singleworldwideNews.headline}}</span>
                                </a>
                                <div class="px-5-gap"></div>
                                <hr class="d-block d-sm-none">
                            </div>
                        </div>

                        <div class="row top-left-news" v-if="selectedOption == 'Others'">
                            <div v-for="(singleOthersNews, index) in othersNews" :key="index" class="col-md-5" >
                                
                                <div class="px-5-gap"></div>
                                <a :href="'/article/' + singleOthersNews.url" class="d-flex top-left-news-image">
                                    <img :src="apiUrl + '/' + singleOthersNews.thumbnail">
                                    <span>{{singleOthersNews.headline}}</span>
                                </a>
                                <div class="px-5-gap"></div>
                                <hr class="d-block d-sm-none">
                            </div>
                        </div>

                        <div class="px-10-gap"></div>
                    </div>
                    <div class="col-md-3">
                        <h4>
                            Top News
                        </h4>
                        <div class="px-10-gap"></div>
                        <div v-for="(singlemostViewedNews, index) in mostViewedNews" :key="index" class="most-viewed-news">
                            <a :href="'/article/' + singlemostViewedNews.url" class="">
                                <img :src="apiUrl + '/' + singlemostViewedNews.thumbnail">
                                <span>{{singlemostViewedNews.headline}}</span>
                            </a>
                            <div class="px-15-gap"></div>
                        </div>
                    </div>
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
            topOftopLeftNews: [],
            newsFound: null,
            mostViewedNews: [],
            bollywoodNews: [],
            musicNews: [],
            hollywoodNews: [],
            southIndiaNews: [],
            tvNews: [],
            worldwideNews: [],
            othersNews: [],
            selectedOption: 'Bollywood',
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
                        response.data.topLeftNews.forEach((element, index) => {
                            if(index == 0){
                                this.topOftopLeftNews.push(element); //insert first index only
                            }
                            else{
                                this.topLeftNews.push(element); //insert rest of the indexes
                            }
                        });
                        response.data.mostViewedNews.forEach(element =>{
                            this.mostViewedNews.push(element);
                        });
                        response.data.bollywoodNews.forEach(element =>{
                            this.bollywoodNews.push(element);
                        });
                        this.newsFound = true;
                    }
                    else{
                        this.newsFound = false;
                    }
                })
                .catch(error =>{
                    console.log(error);
                    this.newsFound = false;
                });
            },

            getNewsIndustryWise(industry){
                console.log(industry);
                if(industry == 'Bollywood'){
                    if(this.bollywoodNews.length == 0){
                        const formData = {
                            'industry' : industry
                        }
                        axios.post(this.apiUrl+`/api/get-this-industry-news`, formData)
                        .then(response =>{
                            console.log(response);
                            if(response.data.success == 'true'){
                                response.data.industryNews.forEach(element =>{
                                    this.bollywoodNews.push(element);
                                });
                            }
                        })
                        .catch(error =>{
                            console.log(error);
                        });
                    }
                }
                else if(industry == 'Music'){
                    if(this.musicNews.length == 0){
                        const formData = {
                            'industry' : industry
                        }
                        axios.post(this.apiUrl+`/api/get-this-industry-news`, formData)
                        .then(response =>{
                            console.log(response);
                            if(response.data.success == 'true'){
                                response.data.industryNews.forEach(element =>{
                                    this.musicNews.push(element);
                                });
                            }
                        })
                        .catch(error =>{
                            console.log(error);
                        });
                    }
                }
                else if(industry == 'Hollywood'){
                    if(this.hollywoodNews.length == 0){
                        const formData = {
                            'industry' : industry
                        }
                        axios.post(this.apiUrl+`/api/get-this-industry-news`, formData)
                        .then(response =>{
                            console.log(response);
                            if(response.data.success == 'true'){
                                response.data.industryNews.forEach(element =>{
                                    this.hollywoodNews.push(element);
                                });
                            }
                        })
                        .catch(error =>{
                            console.log(error);
                        });
                    }
                }
                else if(industry == 'South India'){
                    if(this.southIndiaNews.length == 0){
                        const formData = {
                            'industry' : industry
                        }
                        axios.post(this.apiUrl+`/api/get-this-industry-news`, formData)
                        .then(response =>{
                            console.log(response);
                            if(response.data.success == 'true'){
                                response.data.industryNews.forEach(element =>{
                                    this.southIndiaNews.push(element);
                                });
                            }
                        })
                        .catch(error =>{
                            console.log(error);
                        });
                    }
                }
                else if(industry == 'TV'){
                    if(this.tvNews.length == 0){
                        const formData = {
                            'industry' : industry
                        }
                        axios.post(this.apiUrl+`/api/get-this-industry-news`, formData)
                        .then(response =>{
                            console.log(response);
                            if(response.data.success == 'true'){
                                response.data.industryNews.forEach(element =>{
                                    this.tvNews.push(element);
                                });
                            }
                        })
                        .catch(error =>{
                            console.log(error);
                        });
                    }
                }
                else if(industry == 'Worldwide'){
                    if(this.worldwideNews.length == 0){
                        const formData = {
                            'industry' : industry
                        }
                        axios.post(this.apiUrl+`/api/get-this-industry-news`, formData)
                        .then(response =>{
                            console.log(response);
                            if(response.data.success == 'true'){
                                response.data.industryNews.forEach(element =>{
                                    this.worldwideNews.push(element);
                                });
                            }
                        })
                        .catch(error =>{
                            console.log(error);
                        });
                    }
                }
                else if(industry == 'Others'){
                    if(this.othersNews.length == 0){
                        const formData = {
                            'industry' : industry
                        }
                        axios.post(this.apiUrl+`/api/get-this-industry-news`, formData)
                        .then(response =>{
                            console.log(response);
                            if(response.data.success == 'true'){
                                response.data.industryNews.forEach(element =>{
                                    this.othersNews.push(element);
                                });
                            }
                        })
                        .catch(error =>{
                            console.log(error);
                        });
                    }
                }
            },

            
        }
    }
</script>
