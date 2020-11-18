<template>
  <div class="home-page">
    <section class="intro">
      <h1>Welcome to my Blog</h1>
      <button class="btn"><nuxt-link to="/admin/auth"><h3>Click here to Sign Up/Login to Create or Edit your posts</h3> </nuxt-link></button>
    </section>
    <PostList :posts="loadedPosts" />
  </div>
</template>

<script>
export default {
  computed: {
    loadedPosts() {
      return this.$store.getters.loadedPosts
    }
  }
  // data() {
  //   return {
  //     loadedPosts: []
  //   };
  // },
};
</script>


<style scoped>
.intro {
  height: 300px;
  position: relative;
  padding: 30px;
  box-sizing: border-box;
  background-image: url("~assets/images/bg.jpg");
  background-position: center;
  background-size: cover;
}

.intro h1 {
  position: absolute;
  top: 10%;
  left: 5%;
  width: 90%;
  font-size: 1.5rem;
  color: black;
  background-color: lightblue;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 3px 3px 3px black;
  box-sizing: border-box;
  border: 1px solid black;
}

.btn{
  position: absolute;
  top:70%;
  left:34%;
  width:500px;
  background-color:  lightblue;
  text-decoration: none;
  padding:4px;
  border-radius: 10px;
}

@media (min-width: 768px) {
  .intro h1 {
    font-size: 2rem;
  }
}

.featured-posts {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>
