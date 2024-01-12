export const authConfig = {
    pages: {
        signIn: "/",
    },
    // callbacks: {
    //     authorized({ auth, request: { nextUrl } }) {
    //         const isLoggedIn = !!auth?.user;
    //         const isOnHomePage = nextUrl.pathname === "/";
    //         const isOnRegistrationPage = nextUrl.pathname === "/registration";
    //         const isOnDealsPage = nextUrl.pathname === "/deals";
    //         const isOnProfilePage = nextUrl.pathname === "/profile";

    //         if (isLoggedIn && (isOnHomePage || isOnRegistrationPage)) {
    //             return Response.redirect(new URL("/deals", nextUrl));
    //         } else if (!isLoggedIn && (isOnDealsPage || isOnProfilePage)) {
    //             return Response.redirect(new URL("/", nextUrl));
    //         }
    //         return true;
    //     },
    // },
    providers: [], // Пока добавляем провайдеров с пустым массивом
};
