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
        
        <div class="row poll-page-background">
            
            <div class="styling-link-for-home font-selected">
                <router-link to="" class="navigator-link">Home</router-link>
            </div>
            
            <div class="col-md-6 list-of-anything">
                
                <h6 class="poll-heads-in-all-poll-new"><span>New polls</span></h6>
                <div v-if="allRecentPollsFound == true">
                    <div v-for="(poll, index) in allRecentUploadedPolls" :key="index">
                        <router-link class="card my-3 custom-card-border" :to="'/poll/'+poll.poll_title"> 
                            <div class="card-body d-flex">
                                <div>
                                    <img :src="apiUrl+'/'+poll.thumbnail_image" class="thumbnail-images-in-list-of-polls">
                                </div>
                                
                                <div class="thumbnail-texts-in-list-of-polls">
                                    <h4 class="card-title custom-card-title">
                                    <strong>{{poll.poll_title}}</strong>
                                    </h4>
                                    <span class="custom-card-ending-date"><span class="which-industry">{{poll.which_industry}}</span> &bull; Closing {{poll.ending_date}}</span>
                                    <div class="px-20-gap"></div>
                                    <div v-for="(tag, indexT) in poll.poll_tags" :key="indexT" class="card-name-n-votes">
                                        <div v-if="indexT <= 1">
                                            <span v-if="indexT !== poll.poll_tags.length - 1">
                                                <b>{{tag.polls}}</b> ({{tag.votes}} votes),&nbsp;
                                            </span>
                                            <span v-else>
                                                <b>{{tag.polls}}</b> ({{tag.votes}} votes)
                                            </span>
                                        </div>
                                    </div>
                                    ..See more
                                </div>
                            </div>
                        </router-link>
                        <div v-if="index%6==0">
                            <!-- ad -->
                        </div>
                    </div>
                    
                </div>
            </div>
            <div class="col-md-6" >
                
                <h6 class="poll-heads-in-all-poll-new"><span>Recent results</span></h6>
                <div v-if="resultPollsFound == true">
                    <div v-for="(poll, index) in resultAllPolls" :key="index">
                        <router-link class="card my-3 custom-card-border" :to="'/poll-winner/'+poll.poll_title">
                            
                            <div class="card-body d-flex">
                                <div>
                                    <img :src="apiUrl+'/'+poll.thumbnail_image" class="thumbnail-images-in-list-of-polls">
                                </div>
                                <div class="thumbnail-texts-in-list-of-polls">
                                    <h4 class="card-title custom-card-title">
                                    <strong>{{poll.poll_title}}</strong>
                                    </h4>
                                    <span class="custom-card-ending-date"><span class="which-industry">{{poll.which_industry}}</span> &bull; Published {{poll.updated_at}}</span>
                                    <div class="px-20-gap"></div>
                                    ..See more
                                </div>
                            </div>
                        </router-link>
                    </div>
                </div>
                <div class="px-10-gap"></div>
                <h6 class="poll-heads-in-all-poll-new"><span>Polls ending</span></h6>
                <div v-if="allPollFound == true">
                    <div v-for="(poll, index) in allPolls" :key="index">
                        <router-link class="card my-3 custom-card-border" :to="'/poll/'+poll.poll_title">
                            
                            <div class="card-body d-flex">
                                <div>
                                    <img :src="apiUrl+'/'+poll.thumbnail_image" class="thumbnail-images-in-list-of-polls">
                                </div>
                                <div class="thumbnail-texts-in-list-of-polls">
                                    <h4 class="card-title custom-card-title">
                                    <strong>{{poll.poll_title}}</strong> 
                                    </h4>
                                    <span class="custom-card-ending-date"><span class="which-industry">{{poll.which_industry}}</span> &bull; Closing {{poll.ending_date}}</span>
                                    <div class="px-20-gap"></div>
                                    <div v-for="(tag, indexT) in poll.poll_tags" :key="indexT" class="card-name-n-votes">
                                        <div v-if="indexT <= 1">
                                            <span v-if="indexT !== poll.poll_tags.length - 1">
                                                <b>{{tag.polls}}</b>({{tag.votes}} votes),&nbsp;
                                            </span>
                                            <span v-else>
                                                <b>{{tag.polls}}</b>({{tag.votes}} votes)
                                            </span>
                                        </div>
                                    </div>
                                    ..See more
                                </div>
                            </div>
                        </router-link>
                        <div v-if="index%3==0">
                            <!-- ad -->
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import moment from 'moment';
    export default {
        setup(){
            // Now you can use router and route as needed
            
            useHead({
                title: `PollDiary - Polls`,
                meta: [
                    
                    {name: 'description', content: ''},

                    { hid: 'og:title', property: 'og:title', content: 'PollDiary - Polls'},
                    { hid: 'og:description', property: 'og:description', content: 'Welcome to PollDiary! We are dedicated to providing an engaging platform for star polls and discussions.' },
                    { hid: 'og:image', property: 'og:image', content: process.env.API_URL+'/logo/favicon2.png' },
                    { hid: 'og:url', property: 'og:url', content: process.env.Project_URL+'/polls' },
                    { hid: 'og:type', property: 'og:type', content: 'website' },

                    { name: 'twitter:title', content: 'PollDiary - Polls'},
                    { name: 'twitter:description', content: 'Welcome to PollDiary! We are dedicated to providing an engaging platform for star polls and discussions.' },
                    { name: 'twitter:image', content: process.env.API_URL+'/logo/favicon2.png' },
                    { name: 'twitter:card', content: 'summary' },
                    // { name: 'poll-id', content: '123456' }, // Replace with the actual poll ID
                    // { name: 'poll-title', content: 'My Awesome Poll' },
                ]
            })
        },
        
        data: () => ({
            apiUrl: process.env.API_URL,
            allPolls: [],
            pollFound: null,
            allPollFound: null,
            resultAllPolls: [],
            resultPollsFound: null,
            token: process.client ? localStorage.getItem('token') : '',
            userEmail: '',
            allRecentUploadedPolls: [],
            allRecentPollsFound: null,
            // showRecentPolls: false,
            // showResultPolls: false,
            // showEndingPolls: false,
            pageDescriptionForMeta: ''
            
        }),

        

        created() {
            this.apiUrl = this.$config.public.API_URL;
            this.getAllRecentPolls();
            this.getAllPollsEnding();
            this.getlistOfResultPolls();
        },

        methods: {
            getAllRecentPolls(){
                axios.get(this.apiUrl+'/api/get-all-recent-uploaded-poll')
                .then(response => {
                    
                    if(response.data.success === true){
                        this.allRecentPollsFound = true;
                        
                        response.data.all_polls.forEach(item => {
                            // item.all_tags = response.data.all_tags;
                            item.ending_date = moment(item.ending_date).format('D MMM YYYY');
                            this.allRecentUploadedPolls.push(item);
                        });
                        // console.log("why");
                        // console.log(this.allRecentUploadedPolls);
                        // console.log("why");
                        
                    }
                    else if(response.data.success === false && response.data.message === "No polls uploaded yet"){
                        this.allRecentPollsFound = false;
                    }
                    else{
                        this.allRecentPollsFound = false;
                    }
                    this.pollFound = true;
                })
                .catch(error => {
                    console.log(error);
                    this.pollFound = true;
                    this.allRecentPollsFound = false;
                });
            },

            getAllPollsEnding(){
                axios.get(this.apiUrl+'/api/get-all-poll')
                .then(response => {
                    if(response.data.success === true){
                        this.allPollFound = true;
                        
                        response.data.all_polls.forEach(item => {
                            // item.all_tags = response.data.all_tags;
                            item.ending_date = moment(item.ending_date).format('D MMM YYYY');
                            this.allPolls.push(item);
                        });
                        // console.log(response);
                    }
                    else if(response.data.success === false && response.data.message === "No polls uploaded yet"){
                        this.allPollFound = false;
                    }
                    else{
                        this.allPollFound = false;
                    }
                    this.pollFound = true;
                })
                .catch(error => {
                    console.log(error);
                    this.pollFound = true;
                    this.allPollFound = false;
                });
            },

            getlistOfResultPolls(){
                axios.get(this.apiUrl+'/api/get-result-list-poll')
                .then(response => {
                    if(response.data.success === true){
                        this.resultPollsFound = true;
                            
                        response.data.all_poll_result.forEach(item => {
                            item.updated_at = this.beautifyTime(item.updated_at);
                            this.resultAllPolls.push(item);
                        });
                    }
                    else if(response.data.success === false && response.data.message === "No poll found"){
                        this.resultPollsFound = false;
                    }
                    // console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
            },

            endingPollClicked(event, tableNameStartsWith){
                if(process.client){
                    if (event.ctrlKey){
                        window.open('/poll/'+tableNameStartsWith, '_blank');
                    }
                    else{
                        window.location.href = '/poll/'+tableNameStartsWith;
                    }
                    // this.$router.push(`/poll/${tableNameStartsWith}`);
                }
            },

            resultPollsClicked(event, tableNameStartsWith){
                if(process.client){
                    if (event.ctrlKey){
                        window.open('/poll-winner/'+tableNameStartsWith, '_blank');
                    }
                    else{
                        window.location.href = '/poll-winner/'+tableNameStartsWith;
                    }
                    // this.$router.push(`/poll/${tableNameStartsWith}`);
                }
            },

            beautifyTime(timestamp) {
                timestamp = Date.parse(timestamp) / 1000;
                const now = Date.now() / 1000;
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
                    const days = Math.floor(diff / 86400);
                    return `${days} day${days > 1 ? 's' : ''} ago`;
                }
            },

            checkIfUserLoggedin(){
                if(process.client){
                    const formData = new FormData();
                    formData.append("token", this.token);
                    if(localStorage.getItem('token')){
                        axios.post(this.apiUrl+'/api/auth/check-if-user-logged-in', {
                            // other data you want to send
                        }, {
                            headers: {
                                'Authorization': `Bearer ${this.token}`
                            }
                        })
                        .then(response =>{
                            // console.log(response.data);
                            if(response.data.success === true && response.data.message === "User logged in"){
                                this.userEmail = response.data.userInfoFromTk.email;
                                // this.userId = response.data.userInfoFromTk.id;
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });
                    }
                    // else{
                    //     //no token means no user logged in
                    //     console.log("no token in storage");
                    // }
                }
            }
        }
    }
</script>
