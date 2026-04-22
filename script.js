import { supabase } from './auth.js';

document.addEventListener('DOMContentLoaded', async () => {

    const urlData = 'https://prepara-vida.vercel.app';

    // LOGIN COM O GOOGLE
    document.querySelector('#googleHeaderLoginBtn').addEventListener('click', async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${urlData}/profile.html`
            }
        })
        if (error) {
            console.log(error);
        }
    });

    // Pegar o usuário atual
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
        const userName = user.user_metadata.full_name;
        const userEmail = user.email;
        const userId = user.id;
        const userImage = user.user_metadata.avatar_url;

        document.querySelector('#googleHeaderLoginBtn').style.display = 'none';
        document.querySelector('#profileHeader').style.display = 'flex';
        document.querySelector('#usernameHeaderProfile').textContent = user.user_metadata.full_name;
        document.querySelector('#userHeaderAvatar').src = user.user_metadata.avatar_url;
        document.querySelector('#logoutHeaderButton').style.display = 'flex';

        saveOnTable(userName, userEmail, userId);
    } else {
        document.querySelector('#googleHeaderLoginBtn').style.display = 'flex';
        document.querySelector('#profileHeader').style.display = 'none';
        document.querySelector('#logoutHeaderButton').style.display = 'none';
    }

    document.querySelector('#logoutHeaderButton').addEventListener('click', async () => {
        const { error } = await supabase.auth.signOut()
        if (error) {
            console.log(error)
        } else {
            document.querySelector('#googleHeaderLoginBtn').style.display = 'flex';
            document.querySelector('#profileHeader').style.display = 'none';
            document.querySelector('#logoutHeaderButton').style.display = 'none';
        }
    });

    async function saveOnTable(name, email, id) {
        const { error } = await supabase.from('users').insert([
            {
                id: id,
                name: name,
                email: email,
                position: 'normal'
            }
        ])

        if (error) {
            console.log(error)
        }
    }


});
