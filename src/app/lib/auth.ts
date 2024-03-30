import prisma from "@/db";
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
            // console.log("USER: " , user)
            // console.log("ACCOUNT: " , account)
            // console.log("PROFILE: " , profile)
            
            // do db logic here and return false or true

            try{
                const findUser = await prisma.user.findFirst({
                    where: {
                        id : user.id 
                    }
                });
                
                if( !findUser ){
                    const newUser = await prisma.user.create({
                        data: {
                            id: user.id,
                            email: user.email
                        }
                    })
                    console.log("New User: ", newUser);
                    return true;
                }
                else {
                    console.log("User already exist.")
                    return true;
                }

            } catch(e){
                console.log(e);
                return false;
            }
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