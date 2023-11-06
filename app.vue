<template>
  <div>
    <header class="top-layer">
        <div class="container">
            <div class="row">
                <div class="col-md-4 d-none d-md-block">
                    <!-- <i class="fas fa-phone-alt"></i> -->
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
      <nav class="navbar navbar-expand-lg navbar-light" style="width: 100% !important">
          <img class="navbar-brand navbar-logo-custom" src="https://polldiary.online/public/logo/favicon2.webp" alt="logo" @click="gotoHome()">
          
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" @click="collapse = false">
              <span class="navbar-toggler-icon"></span>
          </button>
          <div class="navbar-collapse collapse" :class="{'hide-navbar-now': collapse}" id="navbarNav">
              <ul class="navbar-nav">
                  <li class="nav-item active">
                      <a class="nav-link custom-cursor" href="/" :class="{ 'active': activeLink === 'home' }" @click="gotoHome()">Home</a>
                  </li>
                  <li class="nav-item active">
                      <a class="nav-link custom-cursor" href="/" :class="{ 'active': activeLink === 'polls' }" @click="gotoPolls()">Polls</a>
                  </li>
                  <li class="nav-item dropdown">
                      <a class="nav-link dropdown-toggle text-truncate" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          Industry
                      </a>
                      <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                          <a class="dropdown-item capitalized custom-cursor" v-for="(industryName, index) in allIndustry" :key="index" :class="{ 'active': activeLink === industryName.which_industry }" :href="'/industry/'+industryName.which_industry" @click="transferIndustryTo(industryName.which_industry)">{{industryName.which_industry}}</a>
                          
                      </div>
                  </li>
                  <li class="nav-item active">
                      <a class="nav-link custom-cursor" href="/poll-history" :class="{ 'active': activeLink === 'pollHistory' }" @click="gotoPollHistory()">Poll History</a>
                  </li>
                  <li class="nav-item active">
                      <a class="nav-link custom-cursor" href="/countries" :class="{ 'active': activeLink === 'countries' }" @click="gotoCountries()">Countries</a>
                  </li>
                  
              </ul>
              <hr class="my-1">
              <ul class="navbar-nav ml-auto" :class="{'d-none': foundLoggedinUser}"> <!-- d-none -->
                  <li class="nav-item">
                      <a class="nav-link custom-cursor" :class="{ 'active': activeLink === 'login' }" href="" @click="loginClicked()">Login</a>
                  </li>
                  <li class="nav-item">
                      <a class="nav-link custom-cursor" :class="{ 'active': activeLink === 'registration' }" href="" @click="registrationClicked()">Registration</a>
                  </li>
              </ul>
              <ul class="navbar-nav ml-auto" :class="{'d-none': !foundLoggedinUser}">
                  <li class="nav-item dropdown">
                      <a class="nav-link dropdown-toggle text-truncate" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" :title="userEmail">
                          {{userEmail}}
                      </a>
                      <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                          <a class="dropdown-item custom-cursor" href="/change-password" :class="{ 'active': activeLink === 'changePassword' }" @click="gotoChangePassword()">Change password</a>
                          
                          <div class="dropdown-divider"></div>
                          <a href="" class="dropdown-item custom-cursor" @click="logoutClicked()">Logout</a>
                      </div>
                  </li>
              </ul>
          </div>
      </nav>

      <div class="content">
          <div id="toastContainer" aria-live="polite" aria-atomic="true"></div>
          <NuxtPage @class-changed="updateSpecificDivClass"/>
      </div>
      <div>
          <!-- Sticky footer -->
          <!-- <footer class="footer">
                <div class="container text-white">
                    <div class="row">
                        <div class="col-md-7">
                            <h5>Contact Information</h5>
                            <ul>
                                <li>Email: <a href="mailto:contact@example.com">contact@example.com</a></li>
                                <li>Phone: <a href="tel:+11234567890">+1 123-456-7890</a></li>
                            </ul>
                        </div>
                        <div class="col-md-5">
                            <h5>Connect with Us</h5>
                            <ul>
                                <li><a href="https://www.facebook.com/YourWebsiteName">Facebook</a></li>
                                <li><a href="https://twitter.com/YourWebsiteName">Twitter</a></li>
                                <li><a href="https://www.instagram.com/YourWebsiteName">Instagram</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <p>
                                Disclaimer: PollDiary is an independent platform and is not affiliated with any particular star or celebrity.
                                All content including text displayed on PollDiary except images, is protected by copyright laws.
                            </p>
                            <p>
                                <a href="/privacy-policy">Privacy Policy</a> | <a href="/terms-and-conditions">Terms and Conditions</a> | <a href="/about-us">About us</a> | <a href="/report-problem">Report a Problem</a>
                            </p>
                            <p>&copy; 2023 PollDiary. All rights reserved.

                            </p>
                        </div>
                    </div>
                </div>
            </footer> -->
            <footer class="footer upper-layer-footer">
                <div class="container">
                    <div class="row">
                        <div class="col-md-6">
                            <h4 class="footer-red">Disclaimer</h4>
                            <p>
                                PollDiary is an independent platform and is not affiliated with any particular star or celebrity.
                                All content including text displayed on PollDiary except images and names, is protected by copyright laws.
                            </p>
                        </div>
                        <div class="col-md-3">
                            <h4 class="footer-red">Pages</h4>
                            <p><a href="/">Home</a></p>
                            <p><a href="/about-us">About US</a></p>
                            <p><a href="/contact-us">Contact US</a></p>
                            <!-- <p><a href="/report-problem">Report a Problem</a></p> -->
                        </div>
                        <div class="col-md-3">
                            <h4 class="footer-red">Legal</h4>
                            <p><a href="/privacy-policy">Privacy Policy</a></p>
                            <p><a href="/terms-and-conditions">Terms & Conditions</a></p>
                        </div>
                        <!-- <div class="col-md-3">
                            <h4 class="footer-red">Social</h4>
                            <p>Facebook</p>
                            <p>Twitter</p>
                            <p>Instagram</p>
                        </div> -->
                    </div>
                </div>
            </footer>
            <footer class="footer upper-layer-footer">
                <div class="container">
                    <div class="row">
                        <h4 class="footer-red">Social</h4>
                        <ul class="social-links-footer">
                            <a href="https://www.facebook.com/officialPollDiary" target="_blank"><i class="fab fa-facebook"></i></a>
                            <a href="https://www.facebook.com/groups/polldiary" target="_blank"><i class="fab fa-facebook"></i></a>
                            <a href="https://twitter.com/PollDiary" target="_blank"><i class="fab fa-twitter"></i></a>
                            <a href="https://www.instagram.com/officialpolldiary/" target="_blank"><i class="fab fa-instagram"></i></a>

                            <!-- <a href="https://www.facebook.com/officialPollDiary" target="_blank">Facebook</a>
                            <a href="https://www.facebook.com/groups/polldiary" target="_blank">Facebook group</a>
                            <a href="https://twitter.com/PollDiary" target="_blank">Twitter</a>
                            <a href="https://www.instagram.com/officialpolldiary/" target="_blank">Instagram</a> -->
                        </ul>
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
import axios from 'axios';
// import { useToast } from 'vue-toastification'
// const toast = useToast()

export default {
  

  data: () => ({
      apiUrl: process.env.API_URL,
      collapse: false,
      foundLoggedinUser: false,
      userEmail: '',
      token: process.client ? localStorage.getItem('token') : '',
      currentPage: '',
      activeLink: '',
      allIndustry: [],
      currentLocation: process.client ? window.location.pathname : '',

  }),


  created(){

      // if(process.client){
      //     this.token = localStorage.getItem('token');
      //     // this.currentLocation = window.location.pathname;
      // }
      
      // console.log("window.location.href: "+window.location.href); // current URL
      // console.log("window.location.pathname: "+window.location.pathname); // path of the current URL
      // console.log("window.location.hash: "+window.location.hash); // anchor part of the current URL
      // console.log("window.location.search: "+window.location.search); // query string part of the current URL
      // this.$nuxt.$on('class-changed', ($event) => this.updateSpecificDivClass($event))
      this.apiUrl = this.$config.public.API_URL;
      this.checkIfUserLoggedin();
      // console.log("Public API URL: "+this.$config.public.API_URL);
      // console.log("Private API URL: "+this.$config.private_API_URL);
      
      this.getListOfIndustries();
    
      
  },

  mounted(){
      this.getCurrentWindowLocation();
  },

  methods:{
      showToast(message, delay) {
        // Create a new toast element
        var toast = document.createElement('div');
        toast.className = 'toast';
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
        var toastInstance = new bootstrap.Toast(toast);
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
        var toastInstance = new bootstrap.Toast(toast);
        toastInstance.show();
      },
      checkNotifi(){
        if(process.client){
          // this.$toast.success('this is a test');
          // var toast = new bootstrap.Toast(document.getElementById('liveToast'));
          // toast.show();
          this.showToast('Hello, world! This is a dynamically created toast.', 5000);
        }
      },
      gotoHome(){
          event.preventDefault();
          this.collapse = true;
          this.activeLink = 'home';
          this.$router.push('/');
          // console.log("this.activeLink: "+this.activeLink);
      },

      gotoPolls(){
          event.preventDefault();
          this.collapse = true;
          this.activeLink = 'polls';
          this.$router.push('/polls');
          // console.log("this.activeLink: "+this.activeLink);
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

          // console.log("this.activeLink: "+this.activeLink);
          // else{
          //     this.activeLink = 'home';
          // }
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
          // '/polls/'+industyName
      },
      getListOfIndustries(){
          axios.get(this.apiUrl+'/api/get-list-of-industries')
          .then(response =>{
            //   console.log(response);
              if(response.data.success === true){
                  response.data.all_industry.forEach(item =>{
                      this.allIndustry.push(item);
                  })
              }

          })
          .catch(error =>{
              console.log(error); 
          })
      },
      
      setActiveLink(link) {
          this.collapse = true;
          this.activeLink = link;
      },

      updateSpecificDivClass(usersEmailFromComponent){
          // console.log("ifUser: ",usersEmailFromComponent);
          if(usersEmailFromComponent !== ""){
              this.userEmail = usersEmailFromComponent;
              this.foundLoggedinUser = true;
          }
          else{
              this.userEmail = null;
              this.foundLoggedinUser = false;
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
                          this.foundLoggedinUser = true;
                          this.userEmail = response.data.userInfoFromTk.email;
                          // this.userId = response.data.userInfoFromTk.id;
                      }
                      else{
                          this.foundLoggedinUser = false;
                      }
                  })
                  .catch(error => {
                      console.log(error);
                      this.foundLoggedinUser = false;
                  });
              }
              // else{
              //     //no token means no user logged in
              //     console.log("no token in storage");
              // }
          }
      },

      logoutClicked(){
          event.preventDefault();
          if(process.client){
              this.collapse = true;
              // localStorage.setItem('logout', 'clicked');
              this.currentPage = window.location.pathname;
              // console.log("what is currentpage: "+this.currentPage);
              localStorage.removeItem('token');
              this.userEmail = null;
              this.foundLoggedinUser = false;
              if(this.currentPage === "/login" || this.currentPage === "/create-account" || this.currentPage === "/change-password"){
                  this.currentPage = "/";
                  this.activeLink = 'home';
              }
              this.$router.push(this.currentPage);
              const parts = this.currentPage.split('/');
              if((parts[1] === "" || parts[1] === "polls") && !parts[2]){
                  this.activeLink = 'home';
              }
              else if(parts[1] === "polls" && parts[2] && parts[2].length > 0){
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
          }
      },

      loginClicked(){
          event.preventDefault();
          if(process.client){
              this.collapse = true;
              this.activeLink = 'login';
              this.currentPage = window.location.pathname;
              if(this.currentPage === "/login" || this.currentPage === "/create-account" || this.currentPage === "/change-password"){
                  this.currentPage = "/";
              }
              localStorage.setItem('load-page', this.currentPage);
              this.$router.push("/login");
          }
      },

      registrationClicked(){
          event.preventDefault();
          if(process.client){
              this.collapse = true;
              this.activeLink = 'registration';
              this.currentPage = window.location.pathname;
              if(this.currentPage === "/login" || this.currentPage === "/create-account" || this.currentPage === "/change-password"){
                  this.currentPage = "/";
              }
              localStorage.setItem('load-page', this.currentPage);
              this.$router.push("/create-account");
          }
      }
  }
}
</script>
<style>
  /* Add CSS styles for the toast container */
  
        
</style>

