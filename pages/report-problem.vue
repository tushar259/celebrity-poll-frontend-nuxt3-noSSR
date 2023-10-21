<template>
    <div>
        <div class="container terms-n-conditions-page">
            <h2>Report a Problem</h2>
            
            <div class="form-group">
                <label for="name">Email / Name / Phone</label>
                <input class="form-control" id="name" v-model="name" @keyup.enter="submitProblem()" required>
            </div>
            <div class="form-group">
                <label for="subject">Subject</label>
                <input class="form-control" id="subject" v-model="subject" @keyup.enter="submitProblem()" required>
            </div>
            <div class="form-group">
                <label for="description">Problem Description</label>
                <textarea class="form-control" id="description" v-model="description" @keyup.enter="submitProblem()" rows="5" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary" @click="submitProblem()">Submit</button>
            
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
                title: `PollDiary - Report problem`,
                meta: [
                    
                    {name: 'description', content: ''},

                    { hid: 'og:title', property: 'og:title', content: 'PollDiary - Report problem'},
                    { hid: 'og:description', property: 'og:description', content: 'Welcome to PollDiary! We are dedicated to providing an engaging platform for star polls and discussions.' },
                    { hid: 'og:image', property: 'og:image', content: process.env.API_URL+'/logo/favicon2.png' },
                    { hid: 'og:url', property: 'og:url', content: process.env.Project_URL+'/report-problem' },
                    { hid: 'og:type', property: 'og:type', content: 'website' },

                    { name: 'twitter:title', content: 'PollDiary - Report problem'},
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
                name: '',
                subject: '',
                description: ''
            }
        },

        created(){
            this.apiUrl = this.$config.public.API_URL;
        },
        methods: {
            submitProblem(){
                if(this.name.trim() === '' || this.subject.trim() === '' || this.description.trim() === ''){
                    this.showDangerToast("Fields cannot be empty!", 5000);
                }
                else{
                    const formData = {
                        "name": this.name,
                        "subject": this.subject,
                        "description": this.description
                    };
                    axios.post(this.apiUrl+'/api/report-a-problem', formData)
                    .then(response =>{
                        // console.log(response);
                        if(response.data.success === true){
                            this.name = '';
                            this.subject = '';
                            this.description = '';
                            this.showToast(response.data.message, 5000);
                        }
                    })
                    .catch(error =>{
                        console.log(error);
                    });
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
