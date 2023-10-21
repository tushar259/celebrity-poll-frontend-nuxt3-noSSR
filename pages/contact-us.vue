<template>
    <div class="contact-us">
        <div class="container">
            <h2>Contact Information</h2>
            <p>If you have any questions or need assistance, please feel free to contact us through the following channels:</p>

            <div class="contact-links">
                <a class="contact-link" href="mailto:contact@polldiary.com">Email</a>
                <a class="contact-link" href="https://www.facebook.com/officialPollDiary" target="_blank">Facebook</a>
                <a class="contact-link" href="https://www.facebook.com/groups/polldiary" target="_blank">Facebook group</a>
                <a class="contact-link" href="https://twitter.com/PollDiary" target="_blank">Twitter</a>
                <a class="contact-link" href="https://www.instagram.com/officialpolldiary/" target="_blank">Instagram</a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        setup(){
            // Now you can use router and route as needed
            
            
            useHead({
                title: `PollDiary - Contact US`,
                meta: [
                    
                    {name: 'description', content: ''},

                    { hid: 'og:title', property: 'og:title', content: 'PollDiary - Contact US'},
                    { hid: 'og:description', property: 'og:description', content: 'Welcome to PollDiary! We are dedicated to providing an engaging platform for star polls and discussions.' },
                    { hid: 'og:image', property: 'og:image', content: process.env.API_URL+'/logo/favicon2.png' },
                    { hid: 'og:url', property: 'og:url', content: process.env.Project_URL+'/privacy-policy' },
                    { hid: 'og:type', property: 'og:type', content: 'website' },

                    { name: 'twitter:title', content: 'PollDiary - Contact US'},
                    { name: 'twitter:description', content: 'Welcome to PollDiary! We are dedicated to providing an engaging platform for star polls and discussions.' },
                    { name: 'twitter:image', content: process.env.API_URL+'/logo/favicon2.png' },
                    { name: 'twitter:card', content: 'summary' },
                    // { name: 'poll-id', content: '123456' }, // Replace with the actual poll ID
                    // { name: 'poll-title', content: 'My Awesome Poll' },
                ]
            })
        },
        
    }
</script>
<style>
.contact-us .container{
    padding-top: 50px;
    text-align: center;
}
.contact-links {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
}

.contact-link {
    text-decoration: none;
    margin: 10px;
    padding: 10px 20px;
    border: 1px solid #333;
    background-color: #333;
    color: #fff;
    border-radius: 5px;
    font-weight: bold;
    transition: background-color 0.3s ease;
}

.contact-link:hover {
    background-color: #555;
}
</style>
