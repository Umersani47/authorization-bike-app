export const selectAuthState = (state) => state.auth;
export const selectIsLoggedIn = (state) => !!state.auth.token;
