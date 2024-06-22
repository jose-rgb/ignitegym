import axios, { AxiosInstance, AxiosError }  from "axios";
import { AppError } from "@utils/AppError";
import { storageAuthTokenGet, storageAuthTokenSave } from "@storage/storageAuthToken";

type SignOut = () => void;

type PromiseType = {
    onSuccess: (token: string) => void;
    onFailure: (error: AxiosError) => void;
}

type APIInstanceProps = AxiosInstance & {
    registerInterceptTokenManager: (signOut: SignOut) => () => void;
}

const api = axios.create({
    baseURL: 'http://192.168.3.6:3333'
}) as APIInstanceProps;


let failedQueued: Array<PromiseType> = [];
let isRefreshing = false;


api.registerInterceptTokenManager = signOut => {

    const interceptTokenManager = api.interceptors.response.use(response => response, async(requestError) => {

        //token invalid || expired ?
        if(requestError.response?.status === 401) {
            if(requestError.response.data?.message === 'token.expired' || requestError.response.data?.message === 'token.invalid') {
                const { refresh_token } = await storageAuthTokenGet();

                //refresh_token does not exist ?
                if(!refresh_token) {
                    signOut();
                    return Promise.reject(requestError);
                }

                //refresh_token exist ?
                const originalRequestConfig = requestError.config;

                //new token? add req in failed Queued
                if(isRefreshing) {
                    return new Promise((resolve, reject) => {
                        failedQueued.push({
                            onSuccess: (token: string) => {
                                originalRequestConfig.headers = { 'Authorization': `Bearer ${token}` };
                                resolve(api(originalRequestConfig));
                            },
                            onFailure: (error: AxiosError) => {
                                reject(error);
                            },
                        })
                    });
                }

                isRefreshing = true;

                //new token
                return new Promise( async(resolve, reject) => {
                    try {

                        const { data } = await api.post('/sessions/refresh-token', { refresh_token });

                        await storageAuthTokenSave({ token: data.token, refresh_token: data.refresh_token });
                        
                    } catch (error: any) {

                        failedQueued.forEach(request => {
                            request.onFailure(error);
                        })
              
                        signOut();
                        reject(error);

                    } finally {
                        isRefreshing = false;
                        failedQueued = [];
                    }
                });
            }
      
            signOut();
        }


        if(requestError.response && requestError.response.data) {
            return Promise.reject(new AppError(requestError.response.data.message));
        } else {
            return Promise.reject(requestError);
        }
    });

    return () => {
        api.interceptors.response.eject(interceptTokenManager);
    };
}



export { api };