<template>
    <div >
        
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
                <Head>
                    <Title>PollDiary - Home</Title>
                    <Meta name="description" content="Welcome to PollDiary! Get all the latest news & polls on entertainment & lifestyle. Get updates on Bollywood, Hollywood, Beauty, Health, Box Office, Movies, Music, K-Pop & more" />
                    <Meta hid="og:title" property="og:title" content="PollDiary - Home" />
                    <Meta hid="og:description" property="og:description" content="Welcome to PollDiary! Get all the latest news & polls on entertainment & lifestyle. Get updates on Bollywood, Hollywood, Beauty, Health, Box Office, Movies, Music, K-Pop & more" />
                    <!-- <Meta hid="og:image" property="og:image" :content="" /> -->
                    <Meta hid="og:url" property="og:url" :content="ssrFrontEndUrl" />
                    <Meta hid="og:type" property="og:type" content="website" />
                    
                    
                    <Meta name="twitter:title" content="PollDiary - Home" />
                    <Meta name="twitter:description" content="Welcome to PollDiary! Get all the latest news & polls on entertainment & lifestyle. Get updates on Bollywood, Hollywood, Beauty, Health, Box Office, Movies, Music, K-Pop & more" />
                    <Meta name="twitter:card" content="summary" />
                    <!-- <Meta name="twitter:image" :content="getOgImageUrl(ssrApiUrl, thumbnail)" /> -->


                    <!-- <Meta name="description" :content="title" /> -->
                    
                </Head>
                <div class="row">
                    <div class="col">
                        <div class="row top-left-news">
                            <div class="col-md-6">
                                <a :href="'/article/' + topOftopLeftNews[0].url" class="top-left-news-image-latest">
                                    <div class="top-left-new-image-frame">
                                        <img :src="apiUrl + '/' + topOftopLeftNews[0].thumbnail" :alt="topOftopLeftNews[0].headline" ><br>
                                    </div>
                                    <span>{{topOftopLeftNews[0].headline}}<br>
                                        <small>{{beautifyTime(topOftopLeftNews[0].created_at)}}</small>
                                        <div class="summary-color">{{trimSummary(topOftopLeftNews[0].summary)}}</div>
                                    </span>
                                    
                                    
                                </a>
                            </div>
                            <div class="col-md-6">
                                <div v-for="(singletopOftopLeftNews, index) in topOftopLeftNews" :key="index">
                                    <div v-if="index > 0">
                                        <hr class="d-block d-sm-none">
                                        <div class="px-5-gap"></div>
                                        <a :href="'/article/' + singletopOftopLeftNews.url" class="d-flex top-left-news-image">
                                            <img :src="apiUrl + '/' + singletopOftopLeftNews.thumbnail" :alt="singletopOftopLeftNews.headline" ><br>
                                            <span>{{singletopOftopLeftNews.headline}}<br>
                                                <small>{{beautifyTime(singletopOftopLeftNews.created_at)}}</small>
                                                
                                            </span>
                                            
                                        </a>
                                        <div class="summary-color">{{trimSummary(singletopOftopLeftNews.summary)}}</div>
                                        <div class="px-20-gap" v-if="index == 1"></div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        <div class="px-10-gap"></div>
                        <div class="row top-left-news">
                            <div v-for="(singletopLeftNews, index) in topLeftNews" :key="index" class="col-md-6">
                                <hr class="d-block d-sm-none">
                                <div class="px-5-gap"></div>
                                <a :href="'/article/' + singletopLeftNews.url" class="d-flex top-left-news-image">
                                    <img :src="apiUrl + '/' + singletopLeftNews.thumbnail" :alt="singletopLeftNews.headline">
                                
                                    <span>
                                        {{singletopLeftNews.headline}}<br>
                                        <small>{{beautifyTime(singletopLeftNews.created_at)}}</small>
                                        
                                    </span>
                                </a>
                                <div class="summary-color">{{trimSummary(singletopLeftNews.summary)}}</div>
                                <div class="px-30-gap"></div>
                            </div>
                        </div>

                        <div class="px-10-gap"></div>
                        <div class="home-top-news-show-more"><button class="btn" @click="showMoreTopNews()">Show More</button></div>
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
                            <div v-for="(singlebollywoodNews, index) in bollywoodNews" :key="index" class="col-md-6" >
                                
                                <div class="px-5-gap"></div>
                                <a :href="'/article/' + singlebollywoodNews.url" class="d-flex top-left-news-image">
                                    <img :src="apiUrl + '/' + singlebollywoodNews.thumbnail" :alt="singlebollywoodNews.headline">
                                    <span>
                                        {{singlebollywoodNews.headline}}<br>
                                        <small>{{beautifyTime(singlebollywoodNews.created_at)}}</small>
                                        
                                    </span>
                                </a>
                                <div class="summary-color">{{trimSummary(singlebollywoodNews.summary)}}</div>
                                <div class="px-30-gap"></div>
                                <hr class="d-block d-sm-none">
                            </div>
                        </div>

                        <div class="row top-left-news" v-if="selectedOption == 'Music'">
                            <div v-for="(singlemusicNews, index) in musicNews" :key="index" class="col-md-6" >
                                
                                <div class="px-5-gap"></div>
                                <a :href="'/article/' + singlemusicNews.url" class="d-flex top-left-news-image">
                                    <img :src="apiUrl + '/' + singlemusicNews.thumbnail" :alt="singlemusicNews.headline">
                                    <span>
                                        {{singlemusicNews.headline}}<br>
                                        <small>{{singlemusicNews.created_at}}</small>
                                        
                                    </span>
                                </a>
                                <div class="summary-color">{{trimSummary(singlemusicNews.summary)}}</div>
                                <div class="px-30-gap"></div>
                                <hr class="d-block d-sm-none">
                            </div>
                        </div>

                        <div class="row top-left-news" v-if="selectedOption == 'Hollywood'">
                            <div v-for="(singlehollywoodNews, index) in hollywoodNews" :key="index" class="col-md-6" >
                                
                                <div class="px-5-gap"></div>
                                <a :href="'/article/' + singlehollywoodNews.url" class="d-flex top-left-news-image">
                                    <img :src="apiUrl + '/' + singlehollywoodNews.thumbnail" :alt="singlehollywoodNews.headline">
                                    <span>
                                        {{singlehollywoodNews.headline}}<br>
                                        <small>{{singlehollywoodNews.created_at}}</small>
                                        
                                    </span>
                                </a>
                                <div class="summary-color">{{trimSummary(singlehollywoodNews.summary)}}</div>
                                <div class="px-30-gap"></div>
                                <hr class="d-block d-sm-none">
                            </div>
                        </div>

                        <div class="row top-left-news" v-if="selectedOption == 'South India'">
                            <div v-for="(singlesouthIndiaNews, index) in southIndiaNews" :key="index" class="col-md-6" >
                                
                                <div class="px-30-gap"></div>
                                <a :href="'/article/' + singlesouthIndiaNews.url" class="d-flex top-left-news-image">
                                    
                                    <img :src="apiUrl + '/' + singlesouthIndiaNews.thumbnail" :alt="singlesouthIndiaNews.headline">
                                    
                                    <span>
                                        {{singlesouthIndiaNews.headline}}<br>
                                        <small>{{singlesouthIndiaNews.created_at}}</small>
                                        
                                    </span>
                                </a>
                                <div class="summary-color">{{trimSummary(singlesouthIndiaNews.summary)}}</div>
                                <div class="px-30-gap"></div>
                                <hr class="d-block d-sm-none">
                            </div>
                        </div>

                        <div class="row top-left-news" v-if="selectedOption == 'TV'">
                            <div v-for="(singletvNews, index) in tvNews" :key="index" class="col-md-6" >
                                
                                <div class="px-5-gap"></div>
                                <a :href="'/article/' + singletvNews.url" class="d-flex top-left-news-image">
                                    <img :src="apiUrl + '/' + singletvNews.thumbnail" :alt="singletvNews.headline">
                                    <span>
                                        {{singletvNews.headline}}<br>
                                        <small>{{singletvNews.created_at}}</small>
                                        
                                    </span>
                                </a>
                                <div class="summary-color">{{trimSummary(singletvNews.summary)}}</div>
                                <div class="px-30-gap"></div>
                                <hr class="d-block d-sm-none">
                            </div>
                        </div>

                        <div class="row top-left-news" v-if="selectedOption == 'Worldwide'">
                            <div v-for="(singleworldwideNews, index) in worldwideNews" :key="index" class="col-md-6" >
                                
                                <div class="px-5-gap"></div>
                                <a :href="'/article/' + singleworldwideNews.url" class="d-flex top-left-news-image">
                                    <img :src="apiUrl + '/' + singleworldwideNews.thumbnail" :alt="singleworldwideNews.headline">
                                    <span>
                                        {{singleworldwideNews.headline}}<br>
                                        <small>{{singleworldwideNews.created_at}}</small>
                                        
                                    </span>
                                </a>
                                <div class="summary-color">{{trimSummary(singleworldwideNews.summary)}}</div>
                                <div class="px-30-gap"></div>
                                <hr class="d-block d-sm-none">
                            </div>
                        </div>

                        <div class="row top-left-news" v-if="selectedOption == 'Others'">
                            
                            <div v-for="(singleOthersNews, index) in othersNews" :key="index" class="col-md-6" >
                                
                                <div class="px-5-gap"></div>
                                <a :href="'/article/' + singleOthersNews.url" class="d-flex top-left-news-image">
                                    <img :src="apiUrl + '/' + singleOthersNews.thumbnail" :alt="singleOthersNews.headline">
                                    <span>
                                        {{singleOthersNews.headline}}<br>
                                        <small>{{singleOthersNews.created_at}}</small>
                                        
                                    </span>
                                </a>
                                <div class="summary-color">{{trimSummary(singleOthersNews.summary)}}</div>
                                <div class="px-30-gap"></div>
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
                                <div class="most-viewed-img-frame">
                                    <img :src="apiUrl + '/' + singlemostViewedNews.thumbnail" :alt="singlemostViewedNews.headline">
                                </div>
                                <span>
                                    {{singlemostViewedNews.headline}}
                                    
                                </span>
                            </a>
                            <div class="summary-color">{{trimSummary(singlemostViewedNews.summary)}}</div>
                            <div class="px-15-gap"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        async setup(){
            const config = useRuntimeConfig();
            const ssrApiUrl = config.public.API_URL;
            const ssrFrontEndUrl = config.public.Project_URL;
            const topOftopLeftNews = ref([]);
            const topLeftNews = ref([]);
            const mostViewedNews = ref([]);
            const bollywoodNews = ref([]);
            const newsFound = ref(null);

            const response = {};

            const {data} = await useFetch(`${ssrApiUrl}/api/get-all-current-news`);

            response.value = data.value;
            
            topOftopLeftNews.value = response.value.topLeftNews.slice(0, 3);
            topLeftNews.value = response.value.topLeftNews.slice(3);

            if(response.value.success == 'true'){
                newsFound.value = true;
            }
            else{
                newsFound.value = false;
            }
            
            mostViewedNews.value = response.value.allNews.slice().sort((a, b) => b.times_visited - a.times_visited).slice(0, 6);
            bollywoodNews.value = response.value.allNews.filter(news => news.industry == 'Bollywood').slice(0, 20);
            
            return{
                newsFound,
                topOftopLeftNews,
                topLeftNews,
                ssrFrontEndUrl,
                mostViewedNews,
                bollywoodNews
            }
            
        },

        data: () => ({
            newsFound: null,
            token: process.client ? localStorage.getItem('token') : '',
            userEmail: '',
            apiUrl: process.env.API_URL,
            topCurrentShowPagination: 0,
            musicNews: [],
            hollywoodNews: [],
            southIndiaNews: [],
            tvNews: [],
            worldwideNews: [],
            othersNews: [],
            selectedOption: 'Bollywood',
        }),

        created(){
            this.apiUrl = this.$config.public.API_URL;
            // this.getAllSideNews();
        },

        methods:{
            getAllSideNews(){
                axios.get(this.apiUrl+`/api/get-all-side-news-at-home`)
                .then(response =>{
                    if(response.data.success == 'true'){
                        this.mostViewedNews = [...response.data.mostViewedNews];
                        this.bollywoodNews = [...response.data.bollywoodNews];
                        
                    }
                })
                .catch(error =>{
                    console.log(error);
                });
                
            },

            trimSummary(summary){
                
                if(summary == null || summary == undefined || summary.trim() == '' || summary == 'null'){
                    return "";
                }
                else{
                    const dotIndex = summary.indexOf('.');
                    if (dotIndex !== -1) {
                        return summary.substring(0, dotIndex + 1); // Include the dot in the substring
                    }
                    return summary;
                }
                
            },

            getNewsIndustryWise(industry){
                if(industry == 'Bollywood'){
                    if(this.bollywoodNews.length == 0){
                        const formData = {
                            'industry' : industry
                        }
                        axios.post(this.apiUrl+`/api/get-this-industry-news`, formData)
                        .then(response =>{
                            if(response.data.success == 'true'){
                                response.data.industryNews.forEach(element =>{
                                    element.created_at = this.beautifyTime(element.created_at);
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
                            //console.log(response);
                            if(response.data.success == 'true'){
                                response.data.industryNews.forEach(element =>{
                                    element.created_at = this.beautifyTime(element.created_at);
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
                            //console.log(response);
                            if(response.data.success == 'true'){
                                response.data.industryNews.forEach(element =>{
                                    element.created_at = this.beautifyTime(element.created_at);
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
                            //console.log(response);
                            if(response.data.success == 'true'){
                                response.data.industryNews.forEach(element =>{
                                    element.created_at = this.beautifyTime(element.created_at);
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
                            //console.log(response);
                            if(response.data.success == 'true'){
                                response.data.industryNews.forEach(element =>{
                                    element.created_at = this.beautifyTime(element.created_at);
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
                            //console.log(response);
                            if(response.data.success == 'true'){
                                response.data.industryNews.forEach(element =>{
                                    element.created_at = this.beautifyTime(element.created_at);
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
                            //console.log(response);
                            if(response.data.success == 'true'){
                                response.data.industryNews.forEach(element =>{
                                    element.created_at = this.beautifyTime(element.created_at);
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

            showMoreTopNews(){
                this.topCurrentShowPagination += 1;
                const formData = {
                    'showAmount': this.topCurrentShowPagination
                };

                axios.post(this.apiUrl+`/api/show-next-amount-top-news`, formData)
                .then(response =>{
                    //console.log(response);
                    if(response.data.success == 'true'){
                        response.data.currentNews.forEach(element => {
                            //element.created_at = this.beautifyTime(element.created_at);
                            this.topLeftNews.push(element); //insert rest of the indexes
                        });
                    }
                })
                .catch(error =>{
                    console.log(error);
                });
            },

            beautifyTime(timestamp) {
            	const getIndiaTimeNow = Date.now();
                const indiaTime = new Date(getIndiaTimeNow).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
                
                timestamp = Date.parse(timestamp) / 1000;
                //const now = Date.now() / 1000;
                const now = Date.parse(indiaTime) / 1000;
                const diff = Math.floor(now - timestamp);
                if (diff < 60) {
                    return 'now';
                } else if (diff < 3600) {
                    const minutes = Math.floor(diff / 60);
                    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
                } else if (diff < 86400) {
                    const hours = Math.floor(diff / 3600);
                    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
                } else {
                    const date = new Date(timestamp * 1000);
                    const formatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                    return formatter.format(date);
                    //const days = Math.floor(diff / 86400);
                    //return `${days} day${days > 1 ? 's' : ''} ago`;
                }
            },
            
        }
    }
</script>
