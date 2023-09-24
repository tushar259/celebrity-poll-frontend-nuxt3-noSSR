<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6 log-reg-pas-container">
                <img class="log-reg-logo-image mx-auto d-block" :src="apiUrl+'/logo/favicon2.png'" alt="logo">
                <h2 class="text-center mb-4">Change password</h2>
                
                <div v-if="emailFound == 'second phase'">
                    <div class="form-group">
                        Email: <b>{{email}}</b>
                    </div>
                    <div class="px-10-gap"></div>
                    <div class="form-group">
                        {{passwordRecoveryQuestion}}
                    </div>
                    <div class="form-group">
                        <input class="form-control" id="answer" v-model="selectedAnswer" @keyup.enter="recoverPasswordSecondTime()" placeholder="Answer">
                    </div>
                    <button class="btn btn-primary btn-block" @click="recoverPasswordSecondTime()" :disabled="isLoading">
                        <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        {{ isLoading ? 'Loading...' : 'Submit' }}
                    </button>
                </div>
                <div v-else-if="emailFound == 'third phase'">
                    <div class="form-group">
                        <label for="password">New password (at least 5 or at most 20 characters)</label>
                        <input :type="passwordType" class="form-control" v-model="changePassword" @keyup.enter="recoverPasswordFinalStep()" placeholder="Password">
                        <small v-html="changePasswordMessage"></small>
                    </div>
                    <div class="form-group">
                        <label for="password">Confirm password</label>
                        <input :type="passwordType" class="form-control" v-model="confirmPassword" @keyup.enter="recoverPasswordFinalStep()" placeholder="Password">
                        <small v-html="confirmPasswordMessage"></small>
                        <div class="show-password-div">
                            <input class="form-check-input" type="checkbox" id="showPasswordCheckbox" name="showPasswordCheckbox" style="vertical-align: middle;" v-model="showPassword" @click="showPasswordClicked()">
                            <label for="showPasswordCheckbox" style="margin-left: 5px;" @click="showPasswordClicked()">Show password</label>
                        </div>
                    </div>
                    
                    <button class="btn btn-primary btn-block" @click="recoverPasswordFinalStep()" :disabled="isLoading">
                        <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        {{ isLoading ? 'Loading...' : 'Change password' }}
                    </button>
                </div>
                <div v-else>
                    <div class="form-group">
                        <label for="email">Email address</label>
                        <input type="email" class="form-control" id="email" v-model="email" @keyup.enter="recoverPassword()" placeholder="Email">
                        <small v-html="emailMessage"></small>
                    </div>
                    <button class="btn btn-primary btn-block" @click="recoverPassword()" :disabled="isLoading">
                        <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        {{ isLoading ? 'Loading...' : 'Recover password' }}
                    </button>
                </div>
                
                
            </div>
        </div>
    </div>
</template>

<script>
    // import { useToast } from 'vue-toastification';
    // const toast = useToast();
    import axios from 'axios';
    export default {
        

        data() {
            return {
                apiUrl: process.env.API_URL,
                userIdFromDatabase: '',
                email: '',
                emailMessage: '',
                submitFormMessage: '',
                isLoading: false,
                emailFound: "first phase",
                selectedAnswer: '',
                passwordRecoveryQuestion: '',
                passwordRecoveryAnswer: '',
                changePassword: '',
                confirmPassword: '',
                changePasswordMessage: '',
                confirmPasswordMessage: '',
                token: process.client ? localStorage.getItem('token') : '',
                userEmail: '',
                showPassword: false,
                passwordType: 'password',
            }
        },

        created(){
            this.apiUrl = this.$config.public.API_URL;
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

            recoverPassword(){
                this.isLoading = true;
                this.emailMessage = "";
                // this.submitFormMessage = "";
                if(this.email === ""){
                    this.emailMessage = "<span style='color:red;'>Please enter your email.</span>";
                    this.isLoading = false;
                }
                else{
                    const formData = {
                        "email": this.email
                    }
                    axios.post(this.apiUrl+'/api/check-if-email-exist', formData)
                    .then(response =>{
                        if(response.data.success === true){
                            this.emailFound = "second phase";
                            this.userIdFromDatabase = response.data.you_can_find_question_and_ans_here.id;
                            this.passwordRecoveryQuestion = response.data.you_can_find_question_and_ans_here.password_recovery_ques;
                            this.passwordRecoveryAnswer = response.data.you_can_find_question_and_ans_here.password_recovery_ans;
                            this.isLoading = false;
                        }
                        else if(response.data.success === false){
                            this.emailFound = "first phase";
                            this.showDangerToast(response.data.message, 2000);
                            // this.submitFormMessage = "<span style='color:red;'>"+response.data.message+"</span>";
                            this.isLoading = false;
                        }
                        // console.log(response.data);
                    })
                    .catch(error => {
                        this.showDangerToast("Something went wrong!", 2000);
                        // this.submitFormMessage = "<span style='color:red;'>Something went wrong!</span>";
                        this.isLoading = false;
                        console.log(error);
                    });
                }
            },

            recoverPasswordSecondTime(){
                this.isLoading = true;
                // this.submitFormMessage = "";
                if(this.passwordRecoveryAnswer === this.selectedAnswer){
                    this.emailFound = "third phase";
                    this.isLoading = false;
                }
                else{
                    this.showDangerToast("Answer did not match!", 2000);
                    // this.submitFormMessage = "<span style='color:red;'>Answer did not match!</span>";
                    // setTimeout(() => {
                    // 	this.submitFormMessage = '';
                    // }, 2000);
                    this.isLoading = false;
                }
            },

            recoverPasswordFinalStep(){
                this.isLoading = true;
                // this.submitFormMessage = "";
                this.changePasswordMessage = "";
                this.confirmPasswordMessage = "";
                // console.log(this.changePassword.length);
                if(this.changePassword === "" || this.confirmPassword === "" || this.changePassword.length < 5 || this.changePassword.length > 20 || (this.changePassword !== this.confirmPassword) || (this.email === "" || this.userIdFromDatabase === "")){
                    if(this.changePassword === ""){
                        this.changePasswordMessage = "<span style='color:red;'>Password cannot be empty.</span>";
                    }
                    if(this.confirmPassword === ""){
                        this.confirmPasswordMessage = "<span style='color:red;'>Password cannot be empty.</span>";
                    }
                    if(this.changePassword.length < 5){
                        this.changePasswordMessage = "<span style='color:red;'>At least 5 characters need to be used.</span>";
                    }
                    if(this.changePassword.length > 20){
                        this.changePasswordMessage = "<span style='color:red;'>At most 20 characters can be used.</span>";
                    }
                    if(this.changePassword !== this.confirmPassword){
                        this.showDangerToast("Password did not match.", 2000);
                        // this.submitFormMessage = "<span style='color:red;'>Password did not match.</span>";
                        this.isLoading = false;
                    }
                    if(this.email === "" || this.userIdFromDatabase === ""){
                        this.showDangerToast("Something went wrong, please reload and try again.", 2000);
                        // this.submitFormMessage = "<span style='color:red;'>Something went wrong, please reload and try again.</span>";
                        this.isLoading = false;
                    }
                    this.isLoading = false;
                }
                else{
                    const formData = {
                        "email": this.email,
                        "userId": this.userIdFromDatabase,
                        "newPassword": this.changePassword
                    }
                    axios.post(this.apiUrl+'/api/change-password-now',formData)
                    .then(response =>{
                        if(response.data.success === true){
                            this.showToast(response.data.message, 5000);
                            // this.submitFormMessage = "<span style='color:green;'>"+response.data.message+"</span>";
                            this.email = "";
                            this.userIdFromDatabase = "";
                            this.changePassword = ""; 
                            this.confirmPassword = "";
                            
                            // setTimeout(() => {
                                // this.submitFormMessage = '';
                            this.$router.push(`/login`);
                            // }, 1000);
                            this.isLoading = false;
                        }
                        else{
                            this.showDangerToast(response.data.message, 2000);
                            // this.submitFormMessage = response.data.message;
                            this.isLoading = false;
                        }
                        
                    })
                    .catch(error => {
                        this.isLoading = false;
                        this.showDangerToast("Something went wrong, please reload and try again.", 2000);
                        // this.submitFormMessage = "<span style='color:red;'>Something went wrong, please reload and try again.</span>";
                        console.log(error);
                    });
                    
                    
                }
            },

            checkIfUserLoggedin(){
                if(process.client){
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
                                this.emailFound = "second phase";
                                this.userEmail = response.data.userInfoFromTk.email;
                                this.email = this.userEmail;
                                this.userIdFromDatabase = response.data.userInfoFromTk.id;
                                this.passwordRecoveryQuestion = response.data.userInfoFromTk.password_recovery_ques;
                                this.passwordRecoveryAnswer = response.data.userInfoFromTk.password_recovery_ans;
                                // this.$router.push(`/`);
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
            },

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
        }
    }
</script>
