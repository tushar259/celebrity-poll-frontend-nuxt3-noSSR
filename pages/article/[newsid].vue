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
            <div class="styling-link font-selected">
                <router-link to="/" class="navigator-link">Home</router-link><div class="navigator-link-divider">/</div>
                <router-link :to="'/article/'+newsid" class="navigator-link">{{headline}}</router-link>
            </div>
            <div class="px-20-gap"></div>
            <h1>{{headline}}</h1>
            

            <div class="btn-group news-follow-everything">
                <button type="button" class="btn btn-light share-button news-share-button" disabled>
                    <span>Follow Us</span>
                </button>
                <a href="https://www.facebook.com/officialPollDiary" target="_blank"><i class="fab fa-facebook news-follow-icon"></i></a>
                <a href="https://www.facebook.com/groups/polldiary" target="_blank"><i class="fab fa-facebook news-follow-icon"></i></a>
                <a href="https://twitter.com/PollDiary" target="_blank"><i class="fab fa-twitter news-follow-icon"></i></a>
                <a href="https://www.instagram.com/officialpolldiary/" target="_blank"><i class="fab fa-instagram news-follow-icon" style="padding-right: 10px;"></i></a>

                <button type="button" id="shareButton" class="btn btn-secondary share-button news-share-button" data-bs-toggle="dropdown" aria-expanded="false">
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
            <div class="px-15-gap"></div>
            <div class="row">
                <div class="col-md-9">
                    <div class="news-details" v-html="newsDetails"></div>
                </div>
                <div class="col-md-3">
                    <h4>
                        You May Like This
                    </h4>
                    <div class="px-10-gap"></div>
                    <div v-for="(singleSideNews, index) in sideNews" :key="index" class="single-news-side-news-all-article">
                        <a :href="singleSideNews.url"><img :src="apiUrl+'/'+singleSideNews.thumbnail" class="single-news-side-news-img">
                        <span>{{singleSideNews.headline}}</span></a>
                        <div class="px-10-gap"></div>
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
            const route = useRoute()
            const ssrNewsid = route.params.newsid;
            useHead({
                title: `Article - ${ssrNewsid}`,
                meta: [
                    
                    {name: 'description', content: ''},

                    { hid: 'og:title', property: 'og:title', content: `Article - ${ssrNewsid}` },
                    { hid: 'og:description', property: 'og:description', content: 'Welcome to PollDiary! Vote your favourite star. We are dedicated to providing an engaging platform for star polls and discussions.' },
                    { hid: 'og:image', property: 'og:image', content: process.env.API_URL+'/logo/favicon2.png' },
                    { hid: 'og:url', property: 'og:url', content: process.env.Project_URL },
                    { hid: 'og:type', property: 'og:type', content: 'website' },

                    { name: 'twitter:title', content: `Article - ${ssrNewsid}` },
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
            apiUrl: process.env.API_URL,
            token: process.client ? localStorage.getItem('token') : '',
            userEmail: '',
            // 'id', 'headline', 'news_details', 'industry', 'created_at'
            nId: '',
            newsid: '',
            headline: '',
            newsDetails: '',
            industry: '',
            createdAt: '',
            newsFound: null,
            thumbnail: '',
            sideNews: [],
        }),

        created(){
            // this.$router.push(`/polls`);
            this.apiUrl = this.$config.public.API_URL;
            this.newsid = this.$route.params.newsid;
            this.fetchCurrentNews()
        },

        methods:{
            fetchCurrentNews() {
                const formData = {
                    'newsid': this.newsid
                }
                axios.post(this.apiUrl+`/api/get-current-news-description`, formData)
                .then((response) => {
                    console.log(response);
                    this.nId = response.data.id;
                    this.headline = response.data.mainNews.headline;
                    this.newsDetails = response.data.mainNews.news_details;
                    this.industry = response.data.mainNews.industry;
                    this.createdAt = response.data.mainNews.created_at;
                    this.thumbnail = response.data.mainNews.thumbnail;
                    response.data.sideNews.forEach(item => {
                        this.sideNews.push(item);
                    });
                    this.newsFound = true;
                })
                .catch((error) => {
                    console.error('Error fetching poll description', error);
                    this.newsFound = false;
                });
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
