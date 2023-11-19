import { Inter } from "next/font/google";
import type { Metadata} from "next"
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Topbar from "@/components/shared/Topbar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import RightSidebar from "@/components/shared/RightSidebar";
import Bottombar from "@/components/shared/Bottombar";


const inter = Inter({subsets:["latin"]});

export const metaData:Metadata = {
    title:"Vista",
    description:"All in one social media application"
}

export default function RootLayout({children}: {children: React.ReactNode}) {
return(
<ClerkProvider appearance={{
    baseTheme: dark
}}>

<html lang="en">

<body className={inter.className}>
    <Topbar/>
    <main className="flex flex-row">
        <LeftSidebar />
        <section>
            {children}
        </section>
        <RightSidebar />
    </main>
    <Bottombar/>
</body>
</html>
</ClerkProvider>
)
}