import { currentUser } from "@clerk/nextjs";

async function Page() {
    const user = await currentUser();
    if(!user) return null;
    return(
        <div></div>
    )
}

export default Page