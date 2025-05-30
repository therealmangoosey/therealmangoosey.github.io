
import { useQuery } from '@tanstack/react-query';
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedProject from "@/components/FeaturedProject";
import ProjectCarousel from "@/components/ProjectCarousel";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { fetchModrinthUserProjects } from "@/utils/modrinth";

const Index = () => {
  const { data: projects, isLoading } = useQuery({
    queryKey: ['modrinth-projects'],
    queryFn: () => fetchModrinthUserProjects('therealmangoosey'),
    refetchInterval: 300000, // Refetch every 5 minutes
  });

  // Get the most downloaded project as featured
  const featuredProject = projects?.sort((a, b) => b.downloads - a.downloads)[0];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        
        {isLoading ? (
          <div className="container px-4 py-12 text-center animate-pulse">
            <p className="font-minecraft text-modrinth-green">Loading projects...</p>
          </div>
        ) : featuredProject ? (
          <FeaturedProject 
            title={featuredProject.title}
            description={featuredProject.description}
            downloads={featuredProject.downloads}
            url={`https://modrinth.com/plugin/${featuredProject.slug}`}
          />
        ) : null}
        
        <ProjectCarousel />
        <AboutSection />
        <ContactSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
