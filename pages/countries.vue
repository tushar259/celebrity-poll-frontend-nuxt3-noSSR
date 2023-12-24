<template>
    <div class="country-page">
        <div class="container">
            <div class="styling-link-for-countries font-selected">
                <router-link to="/" class="navigator-link">Home</router-link> <div class="navigator-link-divider">/</div> 
                <router-link to="" class="navigator-link capitalized">Countries</router-link>
            </div>
            <div class="row">
                
                <div class="col-md-8">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>Country</th>
                                <th>Population</th>
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
                            <tr v-else v-for="(country, index) in countries" :key="index" :class="index % 2 === 0 ? 'even-row' : 'odd-row'">
                                <td>{{ country.name }}</td>
                                <td>{{ formatNumber(country.population) }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Total Population</h5>
                            <p class="card-text">{{ formatNumber(totalPopulation) }}</p>
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
        setup(){
            // Now you can use router and route as needed
            
            
            useHead({
                title: `Countries`,
                meta: [
                    
                    {name: 'description', content: 'Welcome to PollDiary! Get all the latest news & polls on entertainment & lifestyle. Get updates on Bollywood, Hollywood, Beauty, Health, Box Office, Movies, Music, K-Pop & more'},

                    { hid: 'og:title', property: 'og:title', content: 'Countries'},
                    { hid: 'og:description', property: 'og:description', content: 'Welcome to PollDiary! Get all the latest news & polls on entertainment & lifestyle. Get updates on Bollywood, Hollywood, Beauty, Health, Box Office, Movies, Music, K-Pop & more' },
                    //{ hid: 'og:image', property: 'og:image', content: process.env.API_URL+'/logo/favicon2.png' },
                    { hid: 'og:url', property: 'og:url', content: 'https://www.polldiary.com/countries' },
                    { hid: 'og:type', property: 'og:type', content: 'website' },

                    { name: 'twitter:title', content: 'Countries'},
                    { name: 'twitter:description', content: 'Welcome to PollDiary! Get all the latest news & polls on entertainment & lifestyle. Get updates on Bollywood, Hollywood, Beauty, Health, Box Office, Movies, Music, K-Pop & more' },
                    //{ name: 'twitter:image', content: process.env.API_URL+'/logo/favicon2.png' },
                    { name: 'twitter:card', content: 'summary' },
                    // { name: 'poll-id', content: '123456' }, // Replace with the actual poll ID
                    // { name: 'poll-title', content: 'My Awesome Poll' },
                ]
            })
        },

        data: () => ({
            apiUrl: process.env.API_URL,
            countries: [],
            totalPopulation: 0,
            pageDescriptionForMeta: '',
            dataFetched: false,
        }),
        
        created(){
            this.apiUrl = this.$config.public.API_URL;
            // this.getCountriesInfoFromApi();
            this.getCountriesInfoFromController();
        },

        methods: {
            formatNumber(number) {
                return number.toLocaleString();
            },

            getCountriesInfoFromApi(){
                axios.get(this.apiUrl+'https://restcountries.com/v3.1/all')
                .then(response => {
                    // console.log(response);
                    // const countries = response.data.map(country => ({
                    //     name: country.name.common,
                    //     population: country.population,
                    // }));

                    // const totalPopulation = countries.reduce((total, country) => total + country.population, 0);
                    
                    // console.log('Countries:', countries);
                    // console.log('Total Population:', totalPopulation);
                })
                .catch(error =>{
                    console.log('Error: ',error);
                });
            },

            getCountriesInfoFromController(){
                axios.get(this.apiUrl+'/api/show-country-list')
                .then(response =>{
                    if(response.data.success == true){
                        response.data.countries_list.forEach(item => {
                            this.totalPopulation += item.population;
                            this.countries.push(item);
                        });
                        this.dataFetched = true;
                    }
                })
                .catch(error =>{
                    console.log(error);
                });
            }
        }
    }
</script>
