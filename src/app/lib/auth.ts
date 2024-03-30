import GoogleProvider from "next-auth/providers/google";

export const NEXT_AUTH = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
        }),

    ],
    callbacks: {

        async signIn({ user, account, profile }: any) {
            console.log("USER: " , user)
            console.log("ACCOUNT: " , account)
            console.log("PROFILE: " , profile)
            return user
        },
        
        async redirect( {url, baseUrl }: { url: string, baseUrl: string }) {
            return Promise.resolve(baseUrl + '/dashboard');
        },

        async jwt( { token, account, profile }: any){
            return token;
        },

        async session( { session, token, user }: any) {
            session.accessToken = token.accessToken
            session.user.id = token.sub

            return session
          }
    }
}