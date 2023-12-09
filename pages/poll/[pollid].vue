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
        <div v-if="thumbnail != ''" class="custom-thumbnail">
            <div class="image-card">
                <div class="image-card-body">
                    <img :src="apiUrl+'/'+thumbnail">
                    <br>
                    <p class="texts-under-thumbnail">image courtesy: Google, Facebook, Instagram, Twitter, Pinterest, Wikipedia, IMDB, etc.</p>
                    <h1 class="poll-title texts-under-thumbnail">{{pollTitle}}?</h1>
                    <div class="d-flex align-items-center texts-under-thumbnail">
                        <div class="poll-date">Started - {{startingDate}}</div>
                        <div class="distance-between-two custom-align">&bull;</div>
                        <div class="poll-date">Closing - {{endingDate}}</div>
                    </div>
                </div>
                <div class="px-15-gap"></div>
            </div>
        </div>
        <div class="px-10-gap"></div>
        
        <div class="row poll-page-row">
            <div class="col-md-6">
                <div class="styling-link font-selected">
                    <router-link to="/" class="navigator-link">Home</router-link><div class="navigator-link-divider">/</div>
                    <router-link to="/polls" class="navigator-link">Polls</router-link><div class="navigator-link-divider">/</div>
                    <router-link :to="'/industry/'+whichIndustry" class="navigator-link capitalized">{{whichIndustry}}</router-link><div class="navigator-link-divider">/</div>
                    <router-link :to="'/poll/'+pollId" class="navigator-link">{{pollId}}</router-link>
                </div>
            </div>
            <div class="col-md-6" style="text-align: right;">
                
                <div class="btn-group">
                    <button type="button" id="shareButton" class="btn btn-primary share-button" data-bs-toggle="dropdown" aria-expanded="false">
                        <span><i class="fas fa-share-alt"></i> Share</span>
                    </button>
                    <ul class="dropdown-menu share-dropdown-button" aria-labelledby="shareButton">
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
            </div>
        </div>
        <div class="px-10-gap"></div>
        
        <div class="row poll-page-row">
            <div class="col-md-5 custom-column">
                <div class="poll-page-custom-card">
                    <h5>{{ pollTitle }}?</h5>
                    <span class="lite-color-in-project">Participate in Poll, Cast your vote.</span>
                    <div class="px-30-gap"></div>
                    <div  v-for="(poll, index) in pollsVoted" :key="index" class="polls-in-page">
                        <div class="form-check">
                            <input class="form-check-input exampleRadios-in-poll" type="radio" name="exampleRadios" :id="`exampleRadios${index}`" @change="selectedOptionToVote(poll.id, poll.polls)" :value="poll.id">
                            
                            <div class="total-votes">
                                <div class="votes-received-here" :style="{'width': poll.percent + '%'}"></div>
                                <label class="form-check-label font-weight-in-poll d-flex justify-content-between align-items-center capitalized" :for="`exampleRadios${index}`">
                                    {{poll.polls}}
                                    <div></div>
                                    <span class="poll-votes-color">{{poll.percent}}%</span>
                                    
                                </label>
								
                                
                            </div>
                            <small class="lite-color-in-project">{{formatNumber(poll.votes)}} votes</small>
                            <div class="px-10-gap"></div>
                            
                        </div>
                    </div>
                    <div class="total-votes-count-in-poll-page">{{formatNumber(totalVotes)}} votes</div>
                    <div class="total-votes-count-in-poll-page" v-if="showTimer == true">Vote again in <span class="vote-again">{{youCanVoteIn}}</span>s</div>
                    <div class="custom-align">
                        

                        <button type="button" class="btn mt-3" @click="voteNow()" :disabled="disableVote">Vote</button>
                    </div>
                </div>
            </div>
            <div class="col-md-7 custom-column" v-if="beforePollDescription !== ''">
                <div class="poll-page-custom-card">
                    <div v-html="beforePollDescription" class="poll-details"></div>
                    
                </div>
            </div>
        </div>

    </div>
    
</template>

<script>
    import moment from 'moment';
    // import { useToast } from 'vue-toastification';
    // const toast = useToast();
    import axios from 'axios';
    export default {
        
        setup(){
            const route = useRoute()
            const pollid = route.params.pollid;
            // Now you can use router and route as needed
            
            
            useHead({
                title: `Poll - ${pollid}`,
                meta: [
                    
                    {name: 'description', content: 'Welcome to PollDiary! Get all the latest news & polls on entertainment & lifestyle. Get updates on Bollywood, Hollywood, Beauty, Health, Box Office, Movies, Music, K-Pop & more'},

                    { hid: 'og:title', property: 'og:title', content: 'Poll - '+pollid },
                    { hid: 'og:description', property: 'og:description', content: 'Welcome to PollDiary! Get all the latest news & polls on entertainment & lifestyle. Get updates on Bollywood, Hollywood, Beauty, Health, Box Office, Movies, Music, K-Pop & more' },
                    // { hid: 'og:image', property: 'og:image', content: process.env.API_URL+'/logo/favicon2.png' },
                    { hid: 'og:url', property: 'og:url', content: 'https://www.polldiary.com/poll/'+pollid },
                    { hid: 'og:type', property: 'og:type', content: 'website' },

                    { name: 'twitter:title', content: 'Poll - '+pollid },
                    { name: 'twitter:description', content: 'Welcome to PollDiary! Get all the latest news & polls on entertainment & lifestyle. Get updates on Bollywood, Hollywood, Beauty, Health, Box Office, Movies, Music, K-Pop & more' },
                    // { name: 'twitter:image', content: process.env.API_URL+'/logo/favicon2.png' },
                    { name: 'twitter:card', content: 'summary' },
                ]
            })
        },
        

        data: () => ({
            apiUrl: process.env.API_URL,
            pollId: null,
            pollFound: null,
            pollTitle: '',
            beforePollDescription: '',
            afterPollDescription: '',
            whichIndustry: '',
            startingDate: '',
            endingDate: '',
            pollsVoted: [],
            imagesFound: [],
            totalVotes: 0,
            thumbnail: '',
            idSelectedToVote: '',
            tableNameStartsWith: '',
            disableVote: false,
            token: process.client ? localStorage.getItem('token') : '',
            userEmail: '',
            voteMessage: '',
            pageDescriptionForMeta: '',
            selectedPollTagName: '',
            youCanVoteIn: 60,
            timer: null,
            showTimer: false,
            ifUserVotedThenTime: '',
            ifUserVotedThenCanVoteNow: "true",
        }),

        

        created() {
            this.apiUrl = this.$config.public.API_URL;
            this.pollId = this.$route.params.pollid;
            //this.pollId = this.pollId.replace(/:/g, '');

            this.ifUserVotedThenTime = process.client ? localStorage.getItem(`whenUserVoted${this.pollId}`) : '',
            this.ifUserVotedThenCanVoteNow = process.client ? localStorage.getItem(`canUserVoteNow${this.pollId}`) : "true",
            // this.pollId = this.pollId.replace(/-/g, ' ');
            // console.log(this.pollId);
            // if(process.client){
            //     document.title = 'Fans - '+this.pollTitle;
            // }
            // const protocol = window.location.protocol; // e.g., "http:" or "https:"
            // const hostname = window.location.hostname; // e.g., "www.example.com"
            // const port = window.location.port; // e.g., "8080" (if exists)
            // const url = `${protocol}//${hostname}${port ? `:${port}` : ''}`;
            // console.log(url);

            this.getPollInfo();

            if(process.client){
                if(this.ifUserVotedThenCanVoteNow == "false"){
                    const newTime = localStorage.getItem(`whenUserVoted${this.pollId}`);
                    this.startCountdown(newTime);
                }
            }
        },

        beforeMount(){
            // if(process.client){
            //     window.scrollTo(0, 0);
            // }
        },

        methods: {
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
                    const title = this.pollTitle;
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
                    const title = "Vote for "+this.pollTitle+'\r\n\r\n';
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
            formatNumber(number) {
                return number.toLocaleString();
            },

            getPollInfo(){
                // const formData = new FormData();
                // formData.append('pollId', this.pollId);
                const formData = {
                    'pollId': this.pollId
                }
                axios.post(this.apiUrl+'/api/get-poll-info', formData)
                .then(response => {
                    // console.log(response);
                    if(response.data.success === true){
                        this.pollFound = true;
                        this.pollTitle = response.data.title_n_other_info.poll_title;
                        this.beforePollDescription = response.data.title_n_other_info.before_poll_description;
                        this.afterPollDescription = response.data.title_n_other_info.after_poll_description;
                        this.whichIndustry = response.data.title_n_other_info.which_industry;
                        this.startingDate = moment(response.data.title_n_other_info.starting_date).format('D MMM YYYY');
                        this.endingDate = moment(response.data.title_n_other_info.ending_date).format('D MMM YYYY');
                        this.tableNameStartsWith = response.data.title_n_other_info.table_name_starts_with;
                        
                        response.data.polls_n_counts.forEach(item => {
                            
                            if(((item.votes / response.data.total_votes) * 100).toFixed(1) > 0){
                                item.percent = ((item.votes / response.data.total_votes) * 100).toFixed(1);
                            }
                            else{
                                item.percent = 0;
                            }
                            this.pollsVoted.push(item);
                            this.pageDescriptionForMeta += item.polls +':('+item.percent+'%), ';
                        });

                        this.totalVotes = parseInt(response.data.total_votes);
                        
                        if(response.data.images_uploaded[0]){
                            this.thumbnail = response.data.images_uploaded[0].placeholder;
                        }
                        
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

            selectedOptionToVote(id, name){
                // console.log(id);
                this.idSelectedToVote = id;
                this.selectedPollTagName = name;
            },

            checkIfUserLoggedin(){
                if(process.client){
                    return new Promise((resolve, reject) => {
                        
                        // const formData = {
                        //     "token": this.token
                        // };
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
                                    resolve(true);
                                    // this.$router.push(`/`);
                                    // this.userId = response.data.userInfoFromTk.id;
                                }
                                else{
                                    resolve(false);
                                }
                            })
                            .catch(error => {
                                console.log(error);
                                resolve(false);
                            });
                        }
                        else{
                            resolve(false);
                            // console.log("no token in storage");
                        }
                    });
                }
            },

            preCheckBeforeVote(){
                // this.disableVote = true;
                // this.voteMessage = "";
                // if(this.token.length > 0){
                //     let value = await this.checkIfUserLoggedin();
                //     console.log("is he logged in: "+this.userEmail);
                //     if(value == true){
                //         this.voteNow();
                //     }
                //     else{
                //         this.disableVote = false;
                //         this.voteMessage = "<span style='color:red;'>You need to login.</span>";
                //         setTimeout(() => {
                //             this.voteMessage = "";
                //         }, 2000);
                        
                //     }
                // }
                // else{
                //     this.disableVote = false;
                //     this.voteMessage = "<span style='color:red;'>You need to login.</span>";
                //     setTimeout(() => {
                //         this.voteMessage = "";
                //     }, 2000);
                // }
                if(process.client){
                    this.disableVote = true;
                    // this.voteMessage = "";
                    if(localStorage.getItem('token')){
                        if (this.token.length > 0) {
                            this.checkIfUserLoggedin().then((value) => {
                                // console.log("Is he logged in: " + this.userEmail);
                                if (value === true) {
                                    this.voteNow();
                                } 
                                else{
                                    this.disableVote = false;
                                    this.showDangerToast("You need to login.", 5000);
                                    // this.voteMessage = "<span style='color:red;'>You need to login.</span>";
                                    // setTimeout(() => {
                                    //     this.voteMessage = "";
                                    // }, 2000);
                                }
                            }).catch((error) => {
                                this.disableVote = false;
                                console.log(error);
                                this.showDangerToast("You need to login.", 5000);
                                // this.voteMessage = "<span style='color:red;'>Server went down.</span>";
                                // setTimeout(() => {
                                //     this.voteMessage = "";
                                // }, 2000);
                            });
                        }
                        else{
                            this.disableVote = false;
                            this.showDangerToast("You need to login.", 5000);
                            // this.voteMessage = "<span style='color:red;'>You need to login.</span>";
                            // setTimeout(() => {
                            //     this.voteMessage = "";
                            // }, 2000);
                        }
                    }
                    else{
                        this.disableVote = false;
                        this.showDangerToast("You need to login.", 5000);
                    }
                }
            },

            voteNow(){

                if(this.idSelectedToVote === "" || this.idSelectedToVote === null || (this.ifUserVotedThenCanVoteNow == "false" || localStorage.getItem(`canUserVoteNow${this.pollId}`) == "false")){
                    this.disableVote = false;
                    
                    if(this.idSelectedToVote === "" || this.idSelectedToVote === null){
                        this.showDangerToast("Please select an option.", 5000);
                    }
                    if(this.ifUserVotedThenCanVoteNow == "false" || localStorage.getItem(`canUserVoteNow${this.pollId}`) == "false"){
                        const newTime = localStorage.getItem(`whenUserVoted${this.pollId}`);
                        this.showDangerToast("Please wait for a moment.", 5000);
                        this.startCountdown(newTime);
                    }
                    // this.voteMessage = "<span style='color:red;'>Please select an option.</span>";
                    // setTimeout(() => {
                    //     this.voteMessage = "";
                    // }, 2000);
                }
                else{
                    localStorage.setItem(`canUserVoteNow${this.pollId}`, "false");
                    this.ifUserVotedThenCanVoteNow = "false";
                    const formData = {
                        "selected_id": this.idSelectedToVote,
                        "table_name_starts_with": this.tableNameStartsWith,
                        // "email": this.userEmail
                    };
                    axios.post(this.apiUrl+'/api/vote-selected-candidate', formData)
                    .then(response => {
                        // console.log(response);
                        this.pollsVoted = [];
                        if(response.data.success === true){
                            response.data.new_polls.forEach(item => {
                                // const votesNumber = parseInt(item.votes);
                                if(((item.votes / response.data.total_votes) * 100).toFixed(1) > 0){
                                    item.percent = ((item.votes / response.data.total_votes) * 100).toFixed(1);
                                }
                                else{
                                    item.percent = 0;
                                }
                                
                                // item.votes = votesNumber.toLocaleString();
                                item.votes = parseInt(item.votes);
                                this.pollsVoted.push(item);
                            });
                            this.totalVotes = parseInt(response.data.total_votes);
                            if(response.data.message === "You have already voted."){
                                this.showToast(response.data.message, 5000);
                            }
                            else{
                                this.showToast("You have voted '"+this.capitalizeWords(this.selectedPollTagName)+"'", 7000);
                                localStorage.setItem(`userVotedOption${this.pollId}`, this.selectedPollTagName);
                                localStorage.setItem(`canUserVoteNow${this.pollId}`, "false");
                                this.ifUserVotedThenCanVoteNow = "false";
                                const newTime = new Date().getTime();
                                localStorage.setItem(`whenUserVoted${this.pollId}`, newTime);
                                
                                this.startCountdown(newTime);

                                // setTimeout(() => {
                                //     this.voteMessage = "";
                                // }, 2000);
                            }
                            
                            // this.voteMessage = "<span style='color:green;'>"+response.data.message+"</span>";
                        }
                        this.disableVote = false;
                    })
                    .catch(error => {
                        console.log(error);
                        this.disableVote = false;
                    });
                }
            },
            startCountdown(newTime) {
                this.timer = setInterval(() => {
                    const currentTime = new Date().getTime();
                    const elapsedTime = currentTime - newTime;
                    const remainingSeconds = Math.max(60 - Math.floor(elapsedTime / 1000), 0);

                    if(remainingSeconds > 0){
                        this.showTimer = true;
                        this.youCanVoteIn = remainingSeconds;
                    } 
                    else{
                        this.showTimer = false;
                        localStorage.setItem(`canUserVoteNow${this.pollId}`, "true");
                        this.ifUserVotedThenCanVoteNow = "true";
                        clearInterval(this.timer); // Stop the timer when it reaches 0
                        window.location.reload();
                    }
                }, 1000); // Update every 1000 milliseconds (1 second)
                
            },
            
            capitalizeWords(inputString) {
                return inputString
                    .toLowerCase()
                    .split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');
            },

            showToast(message, delay) {
                // Create a new toast element
                var toast = document.createElement('div');
                toast.className = 'toast bg-success text-white';
                toast.setAttribute('role', 'alert');
                toast.setAttribute('aria-live', 'assertive');
                toast.setAttribute('aria-atomic', 'true');

                // Create toast header
                var header = document.createElement('div');
                header.className = 'toast-header';
                var strong = document.createElement('strong');
                strong.className = 'me-auto';
                strong.textContent = 'Success';
                var small = document.createElement('small');
                small.textContent = 'just now';
                var closeBtn = document.createElement('button');
                closeBtn.type = 'button';
                closeBtn.className = 'btn-close';
                closeBtn.setAttribute('data-bs-dismiss', 'toast');
                closeBtn.setAttribute('aria-label', 'Close');
                
                header.appendChild(strong);
                header.appendChild(small);
                header.appendChild(closeBtn);

                // Create toast body
                var body = document.createElement('div');
                body.className = 'toast-body';
                body.textContent = message;

                // Add header and body to the toast element
                toast.appendChild(header);
                toast.appendChild(body);

                // Set the delay for the toast (in milliseconds)
                toast.setAttribute('data-bs-delay', delay);

                // Add the toast to the container
                document.getElementById('toastContainer').appendChild(toast);

                // Initialize the Bootstrap toast component and show it
                var toastInstance = new this.$bootstrap.Toast(toast);
                toastInstance.show();
            },
            showDangerToast(message, delay) {
                // Create a new toast element
                var toast = document.createElement('div');
                toast.className = 'toast bg-danger text-white'; // Apply danger styling
                toast.setAttribute('role', 'alert');
                toast.setAttribute('aria-live', 'assertive');
                toast.setAttribute('aria-atomic', 'true');

                // Create toast header
                var header = document.createElement('div');
                header.className = 'toast-header';
                var strong = document.createElement('strong');
                strong.className = 'me-auto';
                strong.textContent = 'Error'; // Indicate an error
                var small = document.createElement('small');
                small.textContent = 'just now';
                var closeBtn = document.createElement('button');
                closeBtn.type = 'button';
                closeBtn.className = 'btn-close';
                closeBtn.setAttribute('data-bs-dismiss', 'toast');
                closeBtn.setAttribute('aria-label', 'Close');
                
                header.appendChild(strong);
                header.appendChild(small);
                header.appendChild(closeBtn);

                // Create toast body
                var body = document.createElement('div');
                body.className = 'toast-body';
                body.textContent = message;

                // Add header and body to the toast element
                toast.appendChild(header);
                toast.appendChild(body);

                // Set the delay for the toast (in milliseconds)
                toast.setAttribute('data-bs-delay', delay);

                // Add the toast to the container
                document.getElementById('toastContainer').appendChild(toast);

                // Initialize the Bootstrap toast component and show it
                var toastInstance = new this.$bootstrap.Toast(toast);
                toastInstance.show();
            },
            
        },
        beforeDestroy() {
            // Cleanup: Stop the timer when the component is destroyed
            clearInterval(this.timer);
        },
    }
</script>
