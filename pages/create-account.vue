<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6 log-reg-pas-container">
                <img class="log-reg-logo-image mx-auto d-block" :src="apiUrl+'/logo/favicon2.png'" alt="logo">
                <h2 class="text-center">Create Account</h2>
                <div class="text-center lite-color-in-project">Create an account to continue with us.</div>
                <div class="px-20-gap"></div>
                <div class="form-group">
                    <label for="email">Email address*</label>
                    <input type="email" class="form-control" id="email" v-model="email" @keyup.enter="createAccount()" @focus="removeError()" @blur="checkIfEmailExist()" placeholder="Email">
                    <small v-html="emailMessage"></small>
                </div>
                <div class="form-group">
                    <label for="password">Password*</label>
                    <input :type="passwordType" class="form-control" id="password" v-model="password" @keyup.enter="createAccount()" placeholder="Password">
                    <small v-html="passwordMessage"></small>
                    <div class="show-password-div">
                        <input class="form-check-input" type="checkbox" id="showPasswordCheckbox" name="showPasswordCheckbox" style="vertical-align: middle;" v-model="showPassword" @click="showPasswordClicked()">
                        <label for="showPasswordCheckbox" style="margin-left: 5px;" @click="showPasswordClicked()">Show password</label>
                    </div>
                </div>

                <div class="form-group" title="Your selected question will be asked if you forget password">
                    <label for="question">Password Recovery Question*</label>
                    <select class="form-control" id="question" v-model="selectedQuestion">
                        <option value="">Select a question</option>
                        <option value="What is your mother's maiden name?">What is your mother's maiden name?</option>
                        <option value="What is the name of your favorite pet?">What is the name of your favorite pet?</option>
                        <option value="In which city were you born?">In which city were you born?</option>
                        <option value="What is your favorite movie?">What is your favorite movie?</option>
                        <option value="What is the name of your elementary school?">What is the name of your elementary school?</option>
                        <option value="What is your favorite book?">What is your favorite book?</option>
                        <option value="What is the model of your first car?">What is the model of your first car?</option>
                        <option value="What is your favorite food?">What is your favorite food?</option>
                        <option value="What is the name of your best friend?">What is the name of your best friend?</option>
                        <option value="What is your favorite vacation destination?">What is your favorite vacation destination?</option>
                    </select>
                    <!-- <small>*Your selected question will be asked if you forget password*</small> -->
                    <div class="px-5-gap"></div>
                    <small v-html="recoveryQueMessage"></small>
                </div>
                <div class="form-group" title="Remember your answer to recover your password">
                    <label for="answer">Password Recovery Answer*</label>
                    <input class="form-control" id="answer" v-model="selectedAnswer" @keyup.enter="createAccount()" placeholder="Answer">
                    <!-- <small>*Remember your answer to recover your password*</small> -->
                    <div class="px-5-gap"></div>
                    <small v-html="recoveryAnsMessage"></small>
                </div>
                <small style="display: inline-block; vertical-align: middle;">
                    <input type="checkbox" style="vertical-align: middle;" v-model="isChecked">
                    <span style="margin-left: 5px;">I accept <router-link to="/terms-and-conditions" target="_blank">Terms and conditions</router-link> & <router-link to="/privacy-policy">Privacy policy</router-link></span>
                </small>
                <div class="px-5-gap"></div>
                <small v-html="termsNconditionsMessage"></small>
                <div class="px-15-gap"></div>
                <div class="d-flex">
                    <span :class="{'visually-hidden': uploadLoading}">Please Wait..</span>
                    <div class="spinner-border text-primary" :class="{'visually-hidden': uploadLoading}" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
                <button class="btn btn-primary btn-block" @click="createAccount()" :disabled="isLoading">
                    <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    {{ isLoading ? 'Creating account...' : 'Create account' }}
                </button>
                <div class="px-20-gap"></div>
                <div class="log-reg-or-sign"><span>or</span></div>
                <div class="px-5-gap"></div>
                <div class="text-center">
                    <span>Already have account? </span><router-link to="/login" :disabled="isLoading">Login</router-link>
                </div>
                <div class="px-5-gap"></div>
                
            </div>
        </div>
    </div>
</template>

<script>
    // import { useToast } from 'vue-toastification';
    // const toast = useToast();
    import axios from 'axios';
    export default {
        setup(){
            // Now you can use router and route as needed
            
            
            useHead({
                title: `PollDiary - Create account`,
                meta: [
                    
                    {name: 'description', content: ''},

                    { hid: 'og:title', property: 'og:title', content: 'PollDiary - Create account'},
                    { hid: 'og:description', property: 'og:description', content: 'Welcome to PollDiary! We are dedicated to providing an engaging platform for star polls and discussions.' },
                    { hid: 'og:image', property: 'og:image', content: process.env.API_URL+'/logo/favicon2.png' },
                    { hid: 'og:url', property: 'og:url', content: process.env.Project_URL+'/create-account' },
                    { hid: 'og:type', property: 'og:type', content: 'website' },

                    { name: 'twitter:title', content: 'PollDiary - Create account'},
                    { name: 'twitter:description', content: 'Welcome to PollDiary! We are dedicated to providing an engaging platform for star polls and discussions.' },
                    { name: 'twitter:image', content: process.env.API_URL+'/logo/favicon2.png' },
                    { name: 'twitter:card', content: 'summary' },
                    // { name: 'poll-id', content: '123456' }, // Replace with the actual poll ID
                    // { name: 'poll-title', content: 'My Awesome Poll' },
                ]
            })
        },

        data() {
            return {
                apiUrl: process.env.API_URL,
                email: '',
                emailMessage: '',
                passwordMessage: '',
                recoveryQueMessage: '',
                recoveryAnsMessage: '',
                termsNconditionsMessage: '',
                checkIfEmailUsed: false,
                checkIfEmailValid: "",
                password: '',
                selectedQuestion: '',
                selectedAnswer: '',
                isChecked: false,
                isLoading: false,
                submitFormMessage: '',
                uploadLoading: true,
                userEmail: '',
                token: process.client ? localStorage.getItem('token') : '',
                showPassword: false,
                passwordType: 'password',
            }
        },


        created(){
            this.apiUrl = this.$config.public.API_URL;
            // this.submitFormMessage = "<span style='color:green;'>Account created.</span>";
            this.checkIfUserLoggedin();
        },

        methods: {

            showPasswordClicked(){
                if(this.showPassword){
                    this.passwordType = "password";
                }
                else{
                    this.passwordType = "";
                }
            },
            removeError(){
                this.emailMessage = "";
            },

            checkIfEmailExist(){
                this.emailMessage = "";
                this.checkIfEmailUsed = false;
                this.checkIfEmailValid = "";
                if(this.email === ""){
                    this.emailMessage = "<span style='color:red;'>Email cannot be empty.</span>";
                }
                else{
                    const formData = {
                        "email": this.email
                    }
                    axios.post(this.apiUrl+'/api/check-if-email-exist-creating-account', formData)
                    .then(response =>{
                        if(response.data.success === true){
                            this.checkIfEmailUsed = true;
                            this.emailMessage = "<span style='color:red;'>"+response.data.message+"</span>";
                        }
                        // console.log(response.data);
                    })
                    .catch(error =>{
                        console.log(error);
                        if(error.response.data.errors.email[0]){
                            this.emailMessage = "<span style='color:red;'>"+error.response.data.errors.email[0]+"</span>";
                            this.checkIfEmailValid = error.response.data.errors.email[0];
                        }
                    });
                }
            },

            createAccount(){
                this.isLoading = true;
                this.email = this.email.replace("<", "");
                this.selectedAnswer = this.selectedAnswer.replace("<", "");
                this.uploadLoading = true;
                this.emailMessage = "";
                this.emailMessage = "";
                this.passwordMessage = "";
                this.recoveryQueMessage = "";
                this.recoveryAnsMessage = "";
                this.termsNconditionsMessage = "";
                if(this.email === "" || this.password === "" || this.password.length < 5 || this.selectedQuestion === "" || this.selectedAnswer === "" || this.isChecked === false || this.checkIfEmailUsed === true || this.checkIfEmailValid !== ""){
                    if(this.email === ""){
                        this.emailMessage = "<span style='color:red;'>Email cannot be empty.</span>";
                    }
                    if(this.password === ""){
                        this.passwordMessage = "<span style='color:red;'>Password cannot be empty.</span>";
                    }
                    if(this.selectedQuestion === ""){
                        this.recoveryQueMessage = "<span style='color:red;'>Please select a question.</span>";
                    }
                    if(this.selectedAnswer === ""){
                        this.recoveryAnsMessage = "<span style='color:red;'>Please write your answer.</span>";
                    }
                    if(this.isChecked === false){
                        this.termsNconditionsMessage = "<span style='color:red;'>Please select terms and conditions.</span>";
                    }
                    if(this.checkIfEmailUsed === true){
                        this.emailMessage = "<span style='color:red;'>Email used already.</span>";
                    }
                    if(this.checkIfEmailValid !== ""){
                        this.emailMessage = "<span style='color:red;'>"+this.checkIfEmailValid+"</span>";
                    }
                    if(this.password.length < 5){
                        this.passwordMessage = "<span style='color:red;'>At least 5 characters need to be used.</span>";
                    }
                    this.isLoading = false;
                }
                else{

                    const formData = {
                        'email': this.email,
                        'password': this.password,
                        'selectedQuestion': this.selectedQuestion,
                        'selectedAnswer': this.selectedAnswer,
                        'isChecked': this.isChecked
                    }

                    axios.post(this.apiUrl+'/api/auth/create-account', formData)
                    .then(response => {
                        if(response.data.success === true){
                            this.showToast(response.data.message, 5000);
                            // this.submitFormMessage = "<span style='color:green;'>"+response.data.message+" Please wait..</span>";
                            this.uploadLoading = false;
                            this.loginNow();
                        }
                        else{
                            this.showDangerToast(response.data.message, 5000);
                            // this.submitFormMessage = "<span style='color:red;'>"+response.data.message+"</span>";
                            this.isLoading = false;
                        }
                        
                        // console.log(response.data);
                    })
                    .catch(error => {
                        this.showDangerToast("Something went wrong", 5000);
                        // this.submitFormMessage = "<span style='color:red;'>Something went wrong</span>";
                        this.isLoading = false;
                        console.error("An error occurred:", error);
                    });
                }
            },

            loginNow(){
                if(process.client){
                    if(this.email === "" || this.password === ""){
                        if(this.email === ""){
                            this.emailMessage = "<span style='color:red;'>Please enter email address.</span>"
                        }
                        if(this.password === ""){
                            this.passwordMessage = "<span style='color:red;'>Please enter password.</span>"
                        }
                        this.isLoading = false;
                    }
                    else{
                        const formData = {
                            'email': this.email,
                            'password': this.password
                        }
                        axios.post(this.apiUrl+'/api/auth/login', formData)
                        .then(response => {
                            // console.log(response.data);
                            if(response.data.success === true){
                                localStorage.setItem('token', response.data.token);
                                this.userEmail = response.data.userEmail;
                                this.email = "";
                                this.password = "";
                                this.selectedQuestion = "";
                                this.selectedAnswer = "";
                                this.isChecked = "";
                                this.$emit('class-changed', this.userEmail);
                                setTimeout(() => {
                                    this.isLoading = false;
                                    this.uploadLoading = true;
                                    if(localStorage.getItem('load-page') && localStorage.getItem('load-page').length > 0){
                                        this.$router.push(localStorage.getItem('load-page'));
                                    }
                                    else{
                                        this.$router.push(`/`);
                                    }
                                }, 2000);
                            }
                            else if(response.data.success === false){
                                this.showDangerToast("Email or password did not match.", 5000);
                                // this.submitFormMessage = "<span style='color:red;'>Email or password did not match.</span>"
                                this.isLoading = false;
                            }
                        })
                        .catch(error => {
                            // console.log(error);
                            if(error.response.data.errors.email){
                                this.emailMessage = "<span style='color:red;'>"+error.response.data.errors.email[0]+"</span>";
                            }
                            if(error.response.data.errors.password){
                                this.passwordMessage = "<span style='color:red;'>"+error.response.data.errors.password[0]+"</span>";
                            }
                            this.isLoading = false;
                        });
                        // this.isLoading = false;
                    }
                }
            },

            checkIfUserLoggedin(){
                if(process.client){
                    // const formData = new FormData();
                    // formData.append("token", this.token);
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
                                this.$router.push(`/`);
                                // this.userId = response.data.userInfoFromTk.id;
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });
                    }
                    
                }
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
        }
    }
</script>
