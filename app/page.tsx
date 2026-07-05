import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import prisma from "@/lib/prisma";
import { defaultPortfolioData, PortfolioData } from "@/data/portfolioData";

// Set revalidate to 0 to make it dynamic server-side rendering
export const revalidate = 0;

async function getPortfolioData(): Promise<PortfolioData> {
    try {
        const records = await prisma.portfolioSection.findMany();
        const mergedData = { ...defaultPortfolioData };
        
        records.forEach((record) => {
            const key = record.key as keyof PortfolioData;
            if (key in defaultPortfolioData) {
                (mergedData as any)[key] = record.content;
            }
        });
        
        return mergedData as PortfolioData;
    } catch (e) {
        console.error("Failed to load portfolio database records:", e);
        return defaultPortfolioData;
    }
}

export default async function Home() {
    const data = await getPortfolioData();

    return (
        <>
            <Hero data={data.hero} />
            <About data={data.about} />
            <Skills data={data.skills} />
            <Projects data={data.projects} />
            <Experience data={data.experience} />
            <Education data={data.education} />
            <Blog />
            <Contact data={data.contact} />
        </>
    );
}
