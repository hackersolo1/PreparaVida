import { supabase } from './auth.js';
document.addEventListener('DOMContentLoaded', async () => {

    const urlData = 'http://127.0.0.1:3000/Frontend';

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        window.location.href = `${urlData}/index.html`;
        return;
    }

    document.querySelector('.profile-header__name').textContent = user.user_metadata.full_name;
    document.querySelector('#userHeaderAvatar').src = user.user_metadata.avatar_url;
    document.querySelector('.nav__user-name').textContent = user.user_metadata.full_name;
    document.querySelector('#profileAvatarMain').src = user.user_metadata.avatar_url;

    document.querySelector('.nav__logo').addEventListener('click', () => {
        window.location.href = `${urlData}/Frontend/index.html`;
    });

    document.querySelector('#signoutHeaderBtn').addEventListener('click', async () => {
        const { error } = await supabase.auth.signOut()
        if (error) {
            console.log(error)
        } else {
            window.location.href = `${urlData}/Frontend/index.html`;
        }
    });
});