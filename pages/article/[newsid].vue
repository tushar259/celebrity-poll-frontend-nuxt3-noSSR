<template>
    
    <div class="newsfeed-container">
        
        <!-- welcome home -->
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
                <Title>Article - {{ headline }}</Title>
                <Meta name="description" :content="trimDescription(newsDetails)" />
                <Meta hid="og:title" property="og:title" :content="'Article - '+headline" />
                <Meta hid="og:description" property="og:description" :content="trimDescription(newsDetails)" />
                <Meta hid="og:image" property="og:image" :content="getOgImageUrl(ssrApiUrl, thumbnail)" />
                <Meta hid="og:url" property="og:url" :content="ssrFrontEndUrl+'/article/'+ssrNewsid" />
                <Meta hid="og:type" property="og:type" content="website" />
                
                
                <Meta name="twitter:title" :content="'Article - '+headline" />
                <Meta name="twitter:description" :content="trimDescription(newsDetails)" />
                <Meta name="twitter:card" content="summary" />
                <Meta name="twitter:image" :content="getOgImageUrl(ssrApiUrl, thumbnail)" />


                <!-- <Meta name="description" :content="title" /> -->
                <!-- <Style type="text/css" children="body { background-color: green; }" /> -->
            </Head>
            <div class="styling-link font-selected">
                <router-link to="/" class="navigator-link">Home</router-link><div class="navigator-link-divider">/</div>
                <router-link :to="'/article/'+newsid" class="navigator-link">{{headline}}</router-link>
            </div>
            <div class="px-20-gap"></div>
            <h1>{{headline}}</h1>
            <small>Published on {{createdAt}}</small>
            <div class="px-10-gap"></div>
            <div class="btn-group news-follow-everything">
                <button type="button" class="news-share-button" disabled>
                    <span>Follow Us</span>
                </button>
                <a href="https://www.facebook.com/officialPollDiary" target="_blank"><i class="fab fa-facebook news-follow-icon"></i></a>
                <a href="https://www.facebook.com/groups/polldiary" target="_blank"><i class="fab fa-facebook news-follow-icon"></i></a>
                <a href="https://twitter.com/PollDiary" target="_blank"><i class="fab fa-twitter news-follow-icon"></i></a>
                <a href="https://www.instagram.com/officialpolldiary/" target="_blank"><i class="fab fa-instagram news-follow-icon" style="padding-right: 10px;"></i></a>

                <button type="button" id="shareButton" class="news-share-button" data-bs-toggle="dropdown" aria-expanded="false">
                    <span><i class="fas fa-share-alt"></i> Share</span>
                </button>
                <ul class="dropdown-menu share-dropdown-button">
                    <li style="display:flex;align-items: center;">
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" title="facebook" style="margin-right: 13px;margin-left: 10px;" @click="shareOnFacebook">
                            <!-- <img :src="apiUrl+'/logo/Facebook-logo.png'" alt="Facebook Share" style="height: 30px;width: 48px;"> -->
                            <i class="fab fa-facebook" style="font-size:26px"></i>
                        </a>
                    
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" title="twitter" style="margin-right: 13px;" @click="shareOnTwitter">
                            <!-- <img :src="apiUrl+'/logo/Twitter-logo.svg.png'" alt="Twitter Share" style="height: 24px;width: 31px;"> -->
                            <i class="fab fa-twitter" style="font-size:28px"></i>
                        </a>
                    
                        <!-- <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" title="instagram" @click="shareOnInstagram">
                            <img :src="apiUrl+'/logo/Instagram_logo_2016.svg.webp'" alt="LinkedIn Share" style="height: 27px;width: 27px;">
                        </a> -->
                        <a href="#" @click="copyLinkToClipboard()">
                            <i class="fas fa-copy fa-lg" style="padding-bottom: 10px;"></i>
                            <!-- <i class="fa-regular fa-copy fa-lg"></i> -->
                            <!-- <i class="fa fa-copy" style="font-size:24px"></i> -->
                            
                        </a>
                    </li>
                </ul>
                
            </div>
            <div class="px-30-gap"></div>
            <div class="row">
                <div class="col-md-9">
                    <div class="news-details" v-html="newsDetails"></div>

                    <div class="px-15-gap"></div>
                    <h4>
                        You May Like This
                    </h4>
                    <div class="bottom-news">
                        <div class="px-10-gap"></div>
                        <div class="bottom-news-row" v-for="(singlebottomNews, index) in bottomNews" :key="index">
                            <div class="bottom-news-column" v-if="index == 0 || index%3 == 0">
                                <a :href="singlebottomNews.url"><div class="most-viewed-img-frame"><img :src="apiUrl+'/'+singlebottomNews.thumbnail" :alt="singlebottomNews.headline" class="bottom-news-img"></div>
                                <span>{{singlebottomNews.headline}}</span></a>
                                <div class="px-10-gap"></div>
                            </div>
                            <div class="bottom-news-column" v-else-if="index == 1 || index%2 == 1">
                                <a :href="singlebottomNews.url"><div class="most-viewed-img-frame"><img :src="apiUrl+'/'+singlebottomNews.thumbnail" :alt="singlebottomNews.headline" class="bottom-news-img"></div>
                                <span>{{singlebottomNews.headline}}</span></a>
                                <div class="px-10-gap"></div>
                            </div>
                            <div class="bottom-news-column" v-else-if="index == 2 || index%2 == 2">
                                <a :href="singlebottomNews.url"><div class="most-viewed-img-frame"><img :src="apiUrl+'/'+singlebottomNews.thumbnail" :alt="singlebottomNews.headline" class="bottom-news-img"></div>
                                <span style="display: block;">{{singlebottomNews.headline}}</span></a>
                                <div class="px-10-gap"></div>
                            </div>
                        </div>
                        <div class="px-10-gap"></div>
                    </div>
                    
                </div>
                <div class="col-md-3">
                    <h4>
                        You May Like This
                    </h4>
                    <div class="px-10-gap"></div>
                    <div v-for="(singleSideNews, index) in sideNews" :key="index" class="single-news-side-news-all-article">
                        <a :href="singleSideNews.url"><img :src="apiUrl+'/'+singleSideNews.thumbnail" :alt="singleSideNews.headline" class="single-news-side-news-img">
                        <span>{{singleSideNews.headline}}</span></a>
                        <div class="px-20-gap"></div>
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
        async setup(){
            // Now you can use router and route as needed
            const route = useRoute();
            const ssrNewsid = route.params.newsid;
            const config = useRuntimeConfig();
            const ssrApiUrl = config.public.API_URL;
            const ssrFrontEndUrl = config.public.Project_URL;
            const headline = ref("");
            const newsFound = ref(null);
            const nId = ref("");
            const newsDetails = ref("");
            const industry = ref("");
            const createdAt = ref("");
            const thumbnail = ref("");
            const sideNews = ref([]);
            const bottomNews = ref([]);        

            // console.log("ssrApiUrl: "+ssrApiUrl)

            await useFetch(`${ssrApiUrl}/api/get-current-news-description-details`, {
                method: 'post',
                body:{
                    newsid: ssrNewsid
                }
            })
            .then(response =>{
                // console.log(response.data.value.bottomNews);
                if(response.data.value.success == 'true'){
                    nId.value = response.data.value.id;
                    headline.value = response.data.value.mainNews.headline;
                    newsDetails.value = response.data.value.mainNews.news_details;
                    industry.value = response.data.value.mainNews.industry;
                    createdAt.value = moment(response.data.value.mainNews.created_at).format('MMM D, YYYY');
                    thumbnail.value = response.data.value.mainNews.thumbnail;
                    sideNews.value = response.data.value.sideNews;
                    bottomNews.value = response.data.value.bottomNews;
                    // response.data.sideNews.forEach(item => {
                    //     this.sideNews.push(item);
                    // });
                    // response.data.bottomNews.forEach(item =>{
                    //     this.bottomNews.push(item);
                    // });
                    newsFound.value = true;
                    
                }
                else{
                    newsFound.value = false;
                }
            })
            .catch(error =>{
                console.log(error);
            });

            return{
                headline, 
                newsFound, 
                nId, 
                newsDetails, 
                industry, 
                createdAt,
                thumbnail,
                sideNews,
                bottomNews,
                ssrApiUrl,
                ssrFrontEndUrl,
                ssrNewsid
            }
            
        },

        data: () => ({
            apiUrl: process.env.API_URL,
            token: process.client ? localStorage.getItem('token') : '',
            userEmail: '',
            nId: '',
            newsid: '',
            headline: '',
            newsDetails: '',
            industry: '',
            createdAt: '',
            newsFound: null,
            thumbnail: '',
            sideNews: [],
            bottomNews: [],
        }),


        created(){
            // this.$router.push(`/polls`);
            this.apiUrl = this.$config.public.API_URL;
            this.newsid = this.$route.params.newsid;
            // this.fetchCurrentNews();
        },

        methods:{
            fetchCurrentNews() {
                const formData = {
                    'newsid': this.newsid
                }
                axios.post(this.apiUrl+`/api/get-current-news-description-details`, formData)
                .then((response) => {
                    console.log(response);
                    if(response.data.success == "true"){
                        this.nId = response.data.id;
                        this.headline = response.data.mainNews.headline;
                        this.newsDetails = response.data.mainNews.news_details;
                        this.industry = response.data.mainNews.industry;
                        // this.createdAt = response.data.mainNews.created_at;
                        this.createdAt = moment(response.data.mainNews.created_at).format('MMM D, YYYY');
                        this.thumbnail = response.data.mainNews.thumbnail;
                        response.data.sideNews.forEach(item => {
                            this.sideNews.push(item);
                        });
                        response.data.bottomNews.forEach(item =>{
                            this.bottomNews.push(item);
                        });
                        this.newsFound = true;
                    }
                    else{
                        this.newsFound = false;
                    }
                    
                })
                .catch((error) => {
                    console.error('Error fetching poll description', error);
                    this.newsFound = false;
                });
            },

            trimDescription(text){
                const withoutTags = text.replace(/<[^>]+>/g, '');
                const index = withoutTags.indexOf('.', withoutTags.indexOf('.', withoutTags.indexOf('.') + 1) + 1);

                return index !== -1 ? withoutTags.substring(0, index + 1) : withoutTags;
            },

            getOgImageUrl(apiUrl, thumbnail){
                return apiUrl + '/' + thumbnail;
            },

            copyLinkToClipboard(){
                if(process.client){
                    const urlToCopy = window.location.href;
                    const dummyTextArea = document.createElement('textarea');
                    dummyTextArea.value = urlToCopy;
                    document.body.appendChild(dummyTextArea);
                    dummyTextArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(dummyTextArea);

                    this.showToast('Link copied to clipboard!', 5000);
                }
            },
            shareOnFacebook() {
                if(process.client){
                    const protocol = window.location.protocol; // e.g., "http:" or "https:"
                    const hostname = window.location.hostname; // e.g., "www.example.com"
                    const port = window.location.port; // e.g., "8080" (if exists)
                    const url = `${protocol}//${hostname}${port ? `:${port}` : ''}`;

                    const currentLink = window.location.href;
                    const title = this.headline;
                    const description = 'Welcome to PollDiary!';
                    const imageUrl = this.apiUrl+'/'+this.thumbnail;
                    const pageUrl = currentLink;

                    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}&quote=${encodeURIComponent(description)}&hashtag=${encodeURIComponent(title)}&picture=${encodeURIComponent(imageUrl)}`;
                    // const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentLink)}`;
                    window.open(shareUrl, '_blank');
                }
            },

            shareOnTwitter() {
                if(process.client){
                    const protocol = window.location.protocol; // e.g., "http:" or "https:"
                    const hostname = window.location.hostname; // e.g., "www.example.com"
                    const port = window.location.port; // e.g., "8080" (if exists)
                    const url = `${protocol}//${hostname}${port ? `:${port}` : ''}`;

                    const currentLink = window.location.href;
                    const title = this.headline+'\r\n\r\n';
                    const pageUrl = currentLink;
                    const twitterUsername = 'PollDiary';

                    const text = `${title}`;

                    const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(text)}&via=${twitterUsername}`;
                    // const text = "Check out this link!";
                    // const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentLink)}&text=${encodeURIComponent(text)}`;
                    // const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentLink)}`;
                    window.open(shareUrl, '_blank');
                }
            },

            shareOnInstagram() {
                if(process.client){
                    const protocol = window.location.protocol; // e.g., "http:" or "https:"
                    const hostname = window.location.hostname; // e.g., "www.example.com"
                    const port = window.location.port; // e.g., "8080" (if exists)
                    const url = `${protocol}//${hostname}${port ? `:${port}` : ''}`;

                    const currentLink = window.location.href;
                    const title = this.pollTitle;
                    const description = 'Your Description';
                    const imageUrl = this.apiUrl+'/'+this.thumbnail;
                    const pageUrl = currentLink;
                    const text = `Check out this link! ${imageUrl} ${title} ${description} ${pageUrl}`;
                    const shareText = encodeURIComponent(text);
                    const shareUrl = `https://www.instagram.com/?text=${shareText}`;
                    // const shareText = encodeURIComponent(`Check out this link: ${currentLink}`);
                    // const shareUrl = `https://www.instagram.com/?text=${shareText}`;
                    window.open(shareUrl, '_blank');
                }
            },
        }
    }
</script>
