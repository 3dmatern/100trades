export const authConfig = {
    pages: {
        signIn: "/",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnHomePage = nextUrl.pathname === "/";

            if (isLoggedIn && isOnHomePage) {
                return Response.redirect(new URL("/deals", nextUrl));
            } else if (isLoggedIn) {
                return true;
            } else {
                return false; // Перенаправляем неаутентифицированных пользователей на страницу входа
            }
        },
    },
    providers: [], // Пока добавляем провайдеров с пустым массивом
};
