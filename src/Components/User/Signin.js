import { useRef, useState, useCallback } from 'react';
import { useLocation, useNavigate, useHistory } from 'react-router';
import { useAxiosPublic } from '../../Hooks/useAxios'
import useAuth from '../../Hooks/useAuth';

// import {
//     LoginSocialGoogle,
//     LoginSocialFacebook,
//     LoginSocialInstagram,
//     IResolveParams,
// } from 'reactjs-social-login';

// import {
//     FacebookLoginButton,
//     GoogleLoginButton,
//     InstagramLoginButton,
// } from 'react-social-login-buttons';


const Signin = () => {

    const auth = useAuth();
    const api = useAxiosPublic();

    const emailRef = useRef();
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const [provider, setProvider] = useState('');
    const [profile, setProfile] = useState('');

    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || false;

    const onLoginFormSubmit = async (e) => {

        e.preventDefault();

        auth?.setLogin(false);
        auth?.setUser({});

        try {

            const response = await api.post('auth/signin',
                JSON.stringify({
                    email: email ? email : '',
                    password: pwd ? pwd : ''
                }),
                {}
            );

            const error = response?.data?.error;
            const access_token = response?.data?.access_token;
            const full_name = response?.data?.full_name;
            const roles = response?.data?.roles;

            if (!error && access_token) {

                auth?.setLogin(true);

                auth?.setUser({
                    email: email,
                    full_name: full_name,
                    access_token: access_token,
                    roles: roles
                })

                setEmail('');
                setPwd('');
                if (from) {
                    navigate(from, { replace: true });
                }
                else {
                    navigate(-1);
                }

            }
            if (error) {
                setErrMsg(error?.message);
            }

        } catch (error) {
            console.log(error);
        }
    }

    const REDIRECT_URI = 'http://localhost:3000/user/signin/facebook';

    const onSocialLoginStart = useCallback(() => {
    }, []);

    const onSocialLogoutSuccess = useCallback(() => {
        setProfile(null);
        setProvider('');
        alert('logout success');
    }, []);

    return (

        !auth.login
            ?
            <section className="mx-auto w-96">
                <form onSubmit={onLoginFormSubmit} className="block p-[5px] mb-11">
                    <label htmlFor="username" className="block 0 mb-2 text-xs text-slate-600">E-mailadres:</label>
                    <input
                        type="text"
                        id="email"
                        ref={emailRef}
                        autoComplete="off"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                        className="first-letter:form-input px-[var(--app-body-padding)] py-[7px] block mb-[var(--app-body-padding)] w-full"
                    />
                    <label htmlFor="password" className="block mb-2 text-xs text-slate-600 2">Password:</label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        className="first-letter:form-input px-[var(--app-body-padding)] py-[7px]  block mb-[var(--app-body-padding)] w-full"

                    />
                    <button className="block px-5 py-2 bg-indigo-500 hover:bg-indigo-600 text-slate-50">Sign In</button>
                </form>
                {/* <LoginSocialFacebook
                    appId="3608051676092620"
                    fieldsProfile={
                        'id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender'
                    }
                    onLoginStart={onSocialLoginStart}
                    onLogoutSuccess={onSocialLogoutSuccess}
                    redirect_uri={REDIRECT_URI}
                    onResolve={({ provider, data }) => {
                        console.log(provider);
                        console.log(data);
                        setProvider(provider);
                        setProfile(data);
                    }}
                    onReject={err => {
                        console.log(err);
                    }}
                >
                    <FacebookLoginButton />
                </LoginSocialFacebook> */}
            </section>
            :
            <>Already logged in as: {auth?.user?.full_name}</>


    );
}

export default Signin