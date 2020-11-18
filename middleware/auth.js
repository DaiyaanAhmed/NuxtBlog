export default function(context){
    console.log('Auth Mid is running')
    if(!context.store.getters.isAuth){
        context.redirect('/admin/auth')
    }
}