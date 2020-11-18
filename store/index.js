import Vuex from "vuex";
import axios from "axios";

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: [],
      token:null
    },
    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts;
      },
      addPost(state, post) {
        state.loadedPosts.push(post)
      },
      editPost(state, editedPost) {
        const postIndex = state.loadedPosts.findIndex(
          post => post.id === editedPost.id
        );
        state.loadedPosts[postIndex] = editedPost
      },
      setToken(state,token){
        state.token=token
      },
      clearToken(state){
        state.token=null;
      }
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        return axios
          .get("https://nuxtblog-8a993.firebaseio.com/posts.json")
          .then(res => {
            const postsArray = [];
            for (const key in res.data) {
              postsArray.push({ ...res.data[key], id: key });
            }
            vuexContext.commit("setPosts", postsArray);
          })
          .catch(e => context.error(e));
      },
      addPost(vuexContext, post) {
        const createdPost = {
          ...post,
          updatedDate: new Date()
        }
        return axios
        .post("https://nuxtblog-8a993.firebaseio.com/posts.json?auth="+vuexContext.state.token, createdPost)
        .then(result => {
          vuexContext.commit('addPost', {...createdPost, id: result.data.name})
        })
        .catch(e => console.log(e));
      },
      editPost(vuexContext, editedPost) {
        return axios.put("https://nuxtblog-8a993.firebaseio.com/posts/" +
          editedPost.id +
          ".json?auth="+vuexContext.state.token, editedPost)
          .then(res => {
            vuexContext.commit('editPost', editedPost)
          })
          .catch(e => console.log(e))
      },
      authenticateUser(vuexContext,authData){
        let authUrl="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB0bKLs5_3B90kMinbqo1EEippJpbUzEZQ"
        if(authData.isLogin)
        {
          authUrl='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB0bKLs5_3B90kMinbqo1EEippJpbUzEZQ'
        }
        return this.$axios.$post(authUrl,
        {
          email:authData.email,
          password:authData.password,
          returnSecureToken:true
        }
        )
        .then(result=>{
          vuexContext.commit("setToken",result.idToken)
          vuexContext.dispatch("setLogOutTimer",result.expiresIn*1000)
        })
        .catch(e=> console.log(e.response.data.error.message))
      },
      setLogOutTimer(vuexContext,duration){
        setTimeout(()=>{
          vuexContext.commit('clearToken')
        },duration)
      },
      setPosts(vuexContext, posts) {
        vuexContext.commit("setPosts", posts);
      }
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts;
      },
      isAuth(state){
        return state.token!=null
      }
    }
  });
};

export default createStore;
