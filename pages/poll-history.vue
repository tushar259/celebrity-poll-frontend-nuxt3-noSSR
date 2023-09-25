<template>
    <div class="country-page">
        <div class="container">
            <div class="styling-link-for-countries font-selected">
                <router-link to="/" class="navigator-link">Home</router-link> <div class="navigator-link-divider">/</div> 
                <router-link to="" class="navigator-link capitalized">Poll History</router-link>
            </div>
            <div class="row">
                
                <div class="col-md-12 horizontal-scroll-container">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th class="col-auto"></th>
                                <th class="col-3"><input class="form-control" v-model="starName" @input="handleGivenInput('starName')" placeholder="Star name"></th>
                                <th class="col-2"><input type="number" class="form-control" v-model="totalVotes" @input="handleGivenInput('totalVotes')" placeholder="Greater than >"></th>
                                <th class="col-2"></th>
                                <th class="col-2"><input type="number" class="form-control" v-model="nominated" @input="handleGivenInput('nominated')" placeholder="Greater than >"></th>
                                <th class="col-2"><input type="number" class="form-control" v-model="wonPoll" @input="handleGivenInput('wonPoll')" placeholder="Greater than >"></th>
                            </tr>
                            <tr>
                                <th>Rows</th>
                                <th>Star name</th>
                                <th>Total votes received</th>
                                <th>Average votes</th>
                                <th class="custom-align">Nominated</th>
                                <th class="custom-align">Won</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="dataFetched == false">
                                <td class="loading-spinner-view parent-background">
                                    <div class="spinner-border text-primary" role="status">
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                </td>
                            </tr>
                            <tr v-else v-for="(poll, index) in pollHistory" :key="index" :class="index % 2 == 0 ? 'even-row' : 'odd-row'">
                                <td>{{index+1}}</td>
                                <td class="capitalized">{{ poll.star_name }}</td>
                                <td>{{ formatNumber(poll.total_votes_received) }}</td>
                                <td>{{ formatNumber(poll.averageVotes)}}</td>
                                <td class="custom-align">{{ formatNumber(poll.total_nominations) }}</td>
                                <td v-if="poll.total_won > 0" class="custom-align" style="color: rgb(0, 17, 255);"><strong>{{ formatNumber(poll.total_won) }}</strong></td>
                                <td v-else class="custom-align" style="color: rgb(255, 0, 0)"><strong>{{ formatNumber(poll.total_won) }}</strong></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        setup(){
            // Now you can use router and route as needed
            
            
            useHead({
                title: `PollDiary - Poll history`,
                meta: [
                    
                    {name: 'description', content: ''},

                    { hid: 'og:title', property: 'og:title', content: 'PollDiary - Poll history'},
                    { hid: 'og:description', property: 'og:description', content: 'Welcome to PollDiary! We are dedicated to providing an engaging platform for star polls and discussions.' },
                    { hid: 'og:image', property: 'og:image', content: process.env.API_URL+'/logo/favicon2.png' },
                    { hid: 'og:url', property: 'og:url', content: process.env.Project_URL+'/poll-history/'},
                    { hid: 'og:type', property: 'og:type', content: 'website' },

                    { name: 'twitter:title', content: 'PollDiary - Poll history'},
                    { name: 'twitter:description', content: 'Welcome to PollDiary! We are dedicated to providing an engaging platform for star polls and discussions.' },
                    { name: 'twitter:image', content: process.env.API_URL+'/logo/favicon2.png' },
                    { name: 'twitter:card', content: 'summary_large_image' },
                    // { name: 'poll-id', content: '123456' }, // Replace with the actual poll ID
                    // { name: 'poll-title', content: 'My Awesome Poll' },
                ]
            })
        },

        data: () => ({
            apiUrl: process.env.API_URL,
            pollHistory: [],
            originalPollHistory: [],
            starName: '',
            totalVotes: '',
            nominated: '',
            wonPoll: '',
            pageDescriptionForMeta: '',
            dataFetched: false,
        }),
        
        

        created(){
            this.apiUrl = this.$config.public.API_URL;
            // this.getCountriesInfoFromApi();
            // this.getCountriesInfoFromController();
            this.getPollHistory();
        },

        methods: {
            getPollHistory(){
                axios.get(this.apiUrl+'/api/get-list-of-all-poll-history')
                .then(response =>{
                    // console.log(response);
                    if(response.data.success === true){
                        response.data.value.forEach(item => {
                            if(item.total_votes_received > 0){
                                item.averageVotes = item.total_votes_received / item.total_nominations;
                            }
                            else{
                                item.averageVotes = 0;
                            }
                            this.pollHistory.push(item);
                            this.originalPollHistory.push(item);
                            this.pageDescriptionForMeta += item.star_name +" (Votes "+item.total_votes_received+", Won "+item.total_won+"), "
                        });
                        this.dataFetched = true;
                    }
                })
                .catch(error =>{
                    console.log(error);
                })
                
            },
            formatNumber(number) {
                return number.toLocaleString();
            },

            handleGivenInput(input){
                // const formData = {
                //     whichColumn: input,
                //     starName: this.starName,
                //     totalVotes: this.totalVotes,
                //     nominated: this.nominated,
                //     wonPoll: this.wonPoll
                // };

                // this.$axios.post(this.apiUrl+'/api/search-history-poll-by', formData)
                // .then(response =>{
                //     console.log(response.data.value);
                //     if(response.data.success === true){
                //         this.pollHistory = [];
                //         response.data.value.forEach(item => {
                //             item.averageVotes = item.total_votes_received / item.total_nominations;
                //             this.pollHistory.push(item);
                //             console.log("this.pollHistory", this.pollHistory);
                //         });
                //     }
                //     else{
                //         this.pollHistory = [];
                //     }
                // })
                // .catch(error =>{
                //     console.log(error);
                // });

                if (
                    this.starName === '' &&
                    this.totalVotes === '' &&
                    this.nominated === '' &&
                    this.wonPoll === ''
                    ) {
                        // If any input field is empty, show all data without filtering
                        this.pollHistory = [...this.originalPollHistory];
                        return;
                }

                // Clone the original data into the pollHistory before applying filters
                this.pollHistory = [...this.originalPollHistory];

                const filteredData = this.pollHistory.filter(item => {
                    if (input === 'starName') {
                        return item.star_name.toLowerCase().includes(this.starName.toLowerCase());
                    } 
                    else if (input === 'totalVotes') {
                        return item.total_votes_received >= parseInt(this.totalVotes, 10);
                    } 
                    else if (input === 'nominated') {
                        return item.total_nominations >= parseInt(this.nominated, 10);
                    } 
                    else if (input === 'wonPoll') {
                        return item.total_won >= parseInt(this.wonPoll, 10);
                    }
                    // Make sure to return a value for any other case, for example:
                    return true;
                });

                // Update the pollHistory with the filtered results
                this.pollHistory = filteredData;
            }
            
        }
    }
</script>
