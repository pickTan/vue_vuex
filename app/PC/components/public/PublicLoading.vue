<template>
    <div class="loading">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div>
</template>
<style>
    .loading{ width: 150px; height: 15px; margin: 0 auto; position: relative; margin-top:100px; }
    .loading span{ position: absolute; width: 15px; height: 100%; border-radius: 50%; background: #a6a6a6; animation:load 1.04s ease-in infinite alternate;-webkit-animation: load 1.04s ease-in infinite alternate; }
    @-webkit-keyframes load{ 0%{ opacity: 1; -webkit-transform: translate(0px); } 100%{ opacity: 0.2; -webkit-transform: translate(150px); } }
    .loading span:nth-child(1){ -webkit-animation-delay:0.13s; }
    .loading span:nth-child(2){ -webkit-animation-delay:0.26s; }
    .loading span:nth-child(3){ -webkit-animation-delay:0.39s; }
    .loading span:nth-child(4){ -webkit-animation-delay:0.52s; }
    .loading span:nth-child(5){ -webkit-animation-delay:0.65s; }

</style>
<script>
    export default{
    }
</script>
