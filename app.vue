<template>
    <div>
        <header class="top-layer">
          <div class="container">
              <div class="row">
                  <div class="col-md-4 d-none d-md-block">
                      
                      <i class="fas fa-envelope"></i> <span class="vertically-middle-top-header">contact@polldiary.com</span>
                  </div>
                  <div class="col-md-8">
                      <ul class="social-links">
                          <li><a href="https://www.facebook.com/officialPollDiary" target="_blank"><i class="fab fa-facebook"></i></a></li>
                          <li><a href="https://twitter.com/PollDiary" target="_blank"><i class="fab fa-twitter"></i></a></li>
                          <li><a href="https://www.instagram.com/officialpolldiary/" target="_blank"><i class="fab fa-instagram"></i></a></li>
                      </ul>
                  </div>
              </div>
          </div>
        </header>
        <nav class="navbar sticky-top navbar-light bg-light">
            <ul class="navbar-nav d-flex flex-row iWantToHideScroll">
                <li>
                    <img class="navbar-logo-custom" src="https://www.polldiary.online/public/logo/favicon2.webp" alt="logo" @click="gotoHome()">
                </li>
                <li class="nav-item gap-nav-items">
                    <a class="nav-link custom-cursor" href="/" :class="{ 'active': activeLink === 'home' }" @click="gotoHome()">Home</a>
                </li>
                <li class="nav-item gap-nav-items">
                    <a class="nav-link custom-cursor" href="/polls" :class="{ 'active': activeLink === 'polls' }" @click="gotoPolls()">Polls</a>
                </li>
                <li class="nav-item gap-nav-items" style="width: 97px;">
                    <a class="nav-link" style="width: 97px" href="/poll-history" :class="{ 'active': activeLink === 'pollHistory' }" @click="gotoPollHistory()">Poll History</a>
                </li>
            </ul>
        </nav>
        <!-- <nav class="navbar navbar-expand-lg navbar-light" style="width: 100% !important">
            <img class="navbar-brand navbar-logo-custom" src="https://www.polldiary.online/public/logo/favicon2.webp" alt="logo" @click="gotoHome()">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button> 
            
            <div class="navbar-collapse collapse" :class="{'hide-navbar-now': collapse}" id="navbarNav">
            <div class="navbar-collapse collapse">
                <ul class="navbar-nav">
                    <li class="nav-item active">
                        <a class="nav-link custom-cursor" href="/" :class="{ 'active': activeLink === 'home' }" @click="gotoHome()">Home</a>
                    </li>
                    <li class="nav-item active">
                        <a class="nav-link custom-cursor" href="/polls" :class="{ 'active': activeLink === 'polls' }" @click="gotoPolls()">Polls</a>
                    </li>
                    
                    
                    <li class="nav-item active">
                        <a class="nav-link custom-cursor" href="/poll-history" :class="{ 'active': activeLink === 'pollHistory' }" @click="gotoPollHistory()">Poll History</a>
                    </li>
                    <li class="nav-item active">
                        <a class="nav-link custom-cursor" href="/countries" :class="{ 'active': activeLink === 'countries' }" @click="gotoCountries()">Countries</a>
                    </li>
                    
                </ul>
                
            </div>
        </nav> -->
  
        <div class="content">
            <div id="toastContainer" aria-live="polite" aria-atomic="true"></div>
            <NuxtPage @class-changed="updateSpecificDivClass"/>
        </div>
        <div>
            
              <footer class="footer upper-layer-footer">
                  <div class="container">
                      <div class="row">
                          <div class="col-md-4">
                              <h4 class="footer-red">Pages</h4>
                              <p><a href="/">Home</a></p>
                              <p><a href="/about-us">About Us</a></p>
                              <p><a href="/contact-us">Contact Us</a></p>
                          </div>
                          <div class="col-md-4">
                              <h4 class="footer-red">Legal</h4>
                              <p><a href="/privacy-policy">Privacy Policy</a></p>
                              <p><a href="/terms-and-conditions">Terms & Conditions</a></p>
                          </div>
                          <div class="col-md-4">
                                <h4 class="footer-red">Social</h4>
                                <div class="social-links-footer">
                                    <a href="https://www.facebook.com/officialPollDiary" target="_blank"><i class="fab fa-facebook"></i></a>
                                    <a href="https://www.facebook.com/groups/polldiary" target="_blank"><i class="fab fa-facebook"></i></a>
                                    <a href="https://twitter.com/PollDiary" target="_blank"><i class="fab fa-twitter"></i></a>
                                    <a href="https://www.instagram.com/officialpolldiary/" target="_blank"><i class="fab fa-instagram"></i></a>
                                    
                                </div>   
                          </div>
                      </div>
                  </div>
              </footer>
              
              <!-- Lower Layer Footer (Copyright) -->
              <footer class="text-center bg-dark text-white lower-layer-footer">
                  <div class="container">
                      <p>&copy; 2023 PollDiary. All rights reserved.</p>
                  </div>
              </footer>
        </div>
    </div>
  </template>
  
  <script>
  
  export default {
    
  
    data: () => ({
        apiUrl: process.env.API_URL,
        collapse: false,
        foundLoggedinUser: false,
        userEmail: '',
        currentPage: '',
        activeLink: '',
        currentLocation: process.client ? window.location.pathname : '',
  
    }),

    mounted(){
        this.apiUrl = this.$config.public.API_URL;
        this.getCurrentWindowLocation();
    },
  
    methods:{
        
        gotoHome(){
            event.preventDefault();
            this.collapse = true;
            this.activeLink = 'home';
            this.$router.push('/');
        },
        
        gotoPolls(){
            event.preventDefault();
            this.collapse = true;
            this.activeLink = 'polls';
            this.$router.push('/polls');
        },
        
        getCurrentWindowLocation(){
            
            const parts = this.currentLocation.split('/');
            
          //   if((parts[1] === "" || parts[1] === "polls") && !parts[2]){
            if(parts[1] === ""){
                this.activeLink = 'home';
            }
            if(parts[1] === "industry" && parts[2] && parts[2].length > 0){
                this.activeLink = parts[2];
            }
            else if(parts[1] === "countries"){
                this.activeLink = 'countries';
            }
            else if(parts[1] === "change-password"){
                this.activeLink = 'changePassword';
            }
            else if(parts[1] === "login"){
                this.activeLink = 'login';
            }
            else if(parts[1] === "create-account"){
                this.activeLink = 'registration';
            }
            else if(parts[1] === "poll-history"){
                this.activeLink = 'pollHistory';
            }
            else if(parts[1] === "polls"){
                this.activeLink = 'polls';
            }
  
        },
  
        gotoCountries(){
            event.preventDefault();
            this.collapse = true
            this.activeLink = 'countries';
            this.$router.push('/countries');
        },
  
        gotoChangePassword(){
            event.preventDefault();
            this.collapse = true;
            this.activeLink = 'changePassword';
            this.$router.push('/change-password');
        },
  
        gotoPollHistory(){
            event.preventDefault();
            this.collapse = true;
            this.activeLink = 'pollHistory';
            this.$router.push('/poll-history');
        },
        transferIndustryTo(industry){
            event.preventDefault();
            this.collapse = true;
            this.activeLink = industry;
            this.$router.push(`/industry/${industry}`);
        },
        
        setActiveLink(link) {
            this.collapse = true;
            this.activeLink = link;
        },
  
        updateSpecificDivClass(usersEmailFromComponent){
            if(usersEmailFromComponent !== ""){
                this.userEmail = usersEmailFromComponent;
                this.foundLoggedinUser = true;
            }
            else{
                this.userEmail = null;
                this.foundLoggedinUser = false;
            }
        },
  
  
    }
  }
  </script>
  
  