<template>
    <div v-if="pollFound == false" class="parent-background">
        Page not found
    </div>
    <div v-else-if="pollFound == null" class="loading-spinner-view parent-background">
        <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
    <div v-else-if="pollFound == true" class="parent-background">
        <Head>
            <Title>Poll Winner - {{pollWinnerId}}</Title>
            <Meta name="description" :content="pageDescriptionForMeta" />
            <Meta hid="og:title" property="og:title" :content="'Poll Winner - '+pollWinnerId" />
            <Meta hid="og:description" property="og:description" :content="pageDescriptionForMeta" />
            <Meta hid="og:image" property="og:image" :content="ssrApiUrl+'/'+thumbnail" />
            <Meta hid="og:url" property="og:url" :content="ssrFrontEndUrl+'/poll-winner/'+pollWinnerId" />
            <Meta hid="og:type" property="og:type" content="website" />
             
            <Meta name="twitter:title" :content="'Poll Winner - '+pollWinnerId" />
            <Meta name="twitter:description" :content="pageDescriptionForMeta" />
            <Meta name="twitter:card" content="summary_large_image" />
            <Meta name="twitter:image" :content="ssrApiUrl+'/'+thumbnail" />
        </Head>
        <div v-if="thumbnail != ''" class="custom-thumbnail">
            <div class="image-card">
                <div class="image-card-body">
                    <img :src="apiUrl+'/'+thumbnail">
                    <br>
                    <p class="texts-under-thumbnail">image courtesy: Google, Facebook, Instagram, Twitter, X, Pinterest, Wikipedia, IMDB, etc.</p>
                    <h1 class="poll-title texts-under-thumbnail">{{pollTitle}}?</h1>
                    <div class="d-flex align-items-center texts-under-thumbnail">
                        <div class="poll-date">Started - {{startingDate}}</div>
                        <div class="distance-between-two custom-align">&bull;</div>
                        <div class="poll-date">Published - {{publishedDate}}</div>
                    </div>
                </div>
                <div class="px-10-gap"></div>
            </div>
        </div>
        <div class="px-10-gap"></div>
        <div class="row poll-page-row">
            <div class="styling-link font-selected">
                <router-link to="/" class="navigator-link">Home</router-link><div class="navigator-link-divider">/</div>
                <router-link to="/polls" class="navigator-link">Polls</router-link>
            </div>
        </div>
        <div class="px-10-gap"></div>
        
        <div class="row poll-page-row">
            <div class="col-md-5 custom-column">
                <div class="poll-page-custom-card winner-animation">
                    <!-- <h5 class="text-color-in-winner">{{ pollTitle }}?</h5> -->
                    <div class="px-20-gap"></div>
                    <div class="custom-align">
                        <h5 class="flashing text-color-in-winner">W I N N E R</h5>
                        <img :src="apiUrl+'/'+winnersThumbnail" class="winners-picture">
                        <br>
                        <h5 class="text-color-in-winner">{{winnersName}}</h5>
                    </div>
                    <div class="px-20-gap"></div>
                    
                </div>
            </div>

            <div class="col-md-7 custom-column" v-if="afterPollDescription !== ''">
                <div class="poll-page-custom-card">
                    <div v-html="afterPollDescription" class="poll-details"></div>
                </div>
            </div>
        </div>

    </div>
    
</template>

<script>
    import axios from 'axios';
    import moment from 'moment';
    export default {
        async setup(){
            const route = useRoute()
            const pollWinnerId = route.params.pollwinnerid;
            
            const config = useRuntimeConfig();
            const ssrApiUrl = config.public.API_URL;
            const ssrFrontEndUrl = config.public.Project_URL;
            const pollFound = ref(null);
            const pollTitle = ref("");
            // const beforePollDescription = ref("");
            const afterPollDescription = ref("");
            const whichIndustry = ref("");
            const startingDate = ref("");
            const endingDate = ref("");
            const publishedDate = ref("");
            const winnersName = ref("");
            const winnersVotes = ref("");
            const pageDescriptionForMeta = ref("");
            const totalVotes = ref("");
            const thumbnail = ref("");
            const winnersThumbnail = ref("");

            const response = {};

            const {data} = await useFetch(`${ssrApiUrl}/api/get-poll-winner-info`, {
                method: 'post',
                body:{
                    pollId: pollWinnerId
                }
            })

            response.value = data.value;
            
            pollTitle.value = response.value.title_n_other_info.poll_title;
            afterPollDescription.value = response.value.title_n_other_info.after_poll_description;
            whichIndustry.value = response.value.title_n_other_info.which_industry;
            startingDate.value = moment(response.value.title_n_other_info.starting_date).format('D MMM YYYY');
            endingDate.value = response.value.title_n_other_info.ending_date;
            publishedDate.value = moment(response.value.title_n_other_info.updated_at).format('D MMM YYYY');
            
            winnersName.value = response.value.title_n_other_info.winners_name;
            
            totalVotes.value = response.value.title_n_other_info.total_votes;
            winnersVotes.value = response.value.title_n_other_info.winners_votes;

            thumbnail.value = response.value.images_uploaded[0].placeholder;
            winnersThumbnail.value = response.value.images_uploaded[2].placeholder;

            if(response.value.success == true){
                pollFound.value = true;
            }
            else{
                pollFound.value = false;
            }

            const hasHTMLTags = /<[a-z][\s\S]*>/i.test(response.value.title_n_other_info.after_poll_description);

            if (hasHTMLTags) {
                const strippedText = response.value.title_n_other_info.after_poll_description.replace(/<[^>]+>/g, '');
                
                const trimmedText = strippedText.split('\n')[0].trim(); 

                pageDescriptionForMeta.value = trimmedText;
            } else {
                pageDescriptionForMeta.value = response.value.title_n_other_info.after_poll_description.trim();
            }

            return{
                pollFound,
                pollWinnerId,
                pollTitle,
                afterPollDescription,
                ssrApiUrl,
                ssrFrontEndUrl,
                whichIndustry,
                startingDate,
                endingDate,
                publishedDate,
                winnersName,
                totalVotes,
                winnersVotes,
                thumbnail,
                winnersThumbnail,
                pageDescriptionForMeta,

            }
        },
        

        data: () => ({
            apiUrl: process.env.API_URL,
            pollId: null,
            pollFound: null,
            imagesFound: [],
            token: process.client ? localStorage.getItem('token') : '',
            userEmail: '',
        }),


        created() {
            this.apiUrl = this.$config.public.API_URL;
            this.pollId = this.$route.params.pollwinnerid;
            this.pollId = this.pollId.replace(/:/g, '');
            // this.pollId = this.pollId.replace(/-/g, ' ');
            // this.getPollInfo();
            // window.scrollTo(0, 0);
        },

        methods: {
            getPollInfo(){
                const formData = new FormData();
                this.pollId = this.pollId.replace(":", "");
                formData.append('pollId', this.pollId);
                axios.post(this.apiUrl+'/api/get-poll-winner-info', formData)
                .then(response => {
                    if(response.data.success === true){
                        this.pollFound = true;
                        this.pollTitle = response.data.title_n_other_info.poll_title;
                        this.afterPollDescription = response.data.title_n_other_info.after_poll_description;
                        this.whichIndustry = response.data.title_n_other_info.which_industry;
                        this.startingDate = moment(response.data.title_n_other_info.starting_date).format('D MMM YYYY');
                        this.endingDate = response.data.title_n_other_info.ending_date;
                        this.publishedDate = moment(response.data.title_n_other_info.updated_at).format('D MMM YYYY');
                        
                        this.winnersName = response.data.title_n_other_info.winners_name;
                        
                        this.totalVotes = response.data.title_n_other_info.total_votes;
                        this.winnersVotes = response.data.title_n_other_info.winners_votes;

                        this.thumbnail = response.data.images_uploaded[0].placeholder;
                        this.winnersThumbnail = response.data.images_uploaded[2].placeholder;
                        
                    }
                    if(response.data.success === false && response.data.message === "Found error while fetching data"){
                        this.pollFound = false;
                    }
                    if(response.data.success === false && response.data.message === "Poll not found"){
                        // this.$router.push('/*');
                        this.pollFound = false;
                    }
                    // console.log(response);
                })
                .catch(error => {
                    console.log(error);
                });
            },

            beautifyTime(timestamp) {
                timestamp = Date.parse(timestamp) / 1000;
                const now = Date.now() / 1000;
                const diff = Math.floor(now - timestamp);
                if (diff < 60) {
                    return 'published now';
                } else if (diff < 3600) {
                    const minutes = Math.floor(diff / 60);
                    return `published ${minutes} minute${minutes > 1 ? 's' : ''} ago`;
                } else if (diff < 86400) {
                    const hours = Math.floor(diff / 3600);
                    return `published ${hours} hour${hours > 1 ? 's' : ''} ago`;
                } else {
                    const days = Math.floor(diff / 86400);
                    return `published ${days} day${days > 1 ? 's' : ''} ago`;
                }
            }

            
            
        }
    }
</script>

