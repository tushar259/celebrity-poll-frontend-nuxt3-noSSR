<template>
    <div >
        <!-- welcome home -->
    </div>
</template>

<script>
    export default {
        setup(){
            // Now you can use router and route as needed
            
            
            useHead({
                title: `PollDiary - Home`,
            })
        },

        data: () => ({
            token: process.client ? localStorage.getItem('token') : '',
            userEmail: '',
        }),

        created(){
            this.$router.push(`/polls`);
        }
    }
</script>
