import { useState, createContext, useEffect } from "react";
import eventBus from "../helpers/Eventbus";
import AuthService from "../services/Auth";

const AuthContext = createContext();

export function AuthContextProvider({children}) {
    const[authenticated, setAuthenticated] = useState(false);
    const[userData, setUserData] = useState(null);
    const[isLoading, setIsLoading] = useState(false);

    useEffect( () => {
        const hydrateContextEvent = eventBus.subscribe("hydrate:context", (data) => {
            if(data.mobile) {
                hydrateUserContext(data.mobile);
            }
        });

        return () => {
            hydrateContextEvent.unsubscribe();
        }
    }, []);

    function hydrateUserContext(mobile) {
        setIsLoading(true)
        AuthService.signin({
            mobile: mobile
        }).then( (res) => {
            localStorage.setItem("access_token", res.data.access_token);
            localStorage.setItem("user_info", JSON.stringify({
                mobile: mobile
            }));
        })
        .catch( err => {
            // clear all data
            localStorage.removeItem("access_token");
            localStorage.removeItem("user_info");
            window.location.reload();
        });
    }

    if(isLoading) {
		return (
			<div style={{height: '500px', paddingTop: '20%'}} className="text-center">
				<div className="spinner-grow text-primary" role="status">
					<span className="sr-only">Loading...</span>
				</div>
			</div>
		)
	}

    return (
        <AuthContext.Provider value={{
            authenticated, setAuthenticated,
            userData, setUserData,
            }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;