
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Search, Video, FileText, BarChart, ArrowRight, PlayCircle, Clock, Download } from 'lucide-react';

// Mock education resources data
const educationResources = [
  {
    id: 1,
    title: "Understanding Diabetes Management",
    category: "Chronic Conditions",
    type: "article",
    duration: "10 min read",
    thumbnail: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    featured: true,
  },
  {
    id: 2,
    title: "Nutrition Basics: Balanced Diet for Kenyan Families",
    category: "Nutrition",
    type: "video",
    duration: "15 min",
    thumbnail: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    featured: true,
  },
  {
    id: 3,
    title: "Malaria Prevention Strategies",
    category: "Infectious Diseases",
    type: "article",
    duration: "8 min read",
    thumbnail: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    featured: false,
  },
  {
    id: 4,
    title: "Mental Health Awareness: Recognizing Signs of Depression",
    category: "Mental Health",
    type: "video",
    duration: "20 min",
    thumbnail: "https://images.unsplash.com/photo-1493836512294-502baa1986e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    featured: false,
  },
  {
    id: 5,
    title: "Prenatal Care Guide for Expectant Mothers",
    category: "Maternal Health",
    type: "pdf",
    duration: "12 pages",
    thumbnail: "https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    featured: false,
  },
  {
    id: 6,
    title: "First Aid Basics: What Every Family Should Know",
    category: "Emergency Care",
    type: "article",
    duration: "15 min read",
    thumbnail: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    featured: true,
  },
  {
    id: 7,
    title: "Childhood Immunizations: Schedule and Importance",
    category: "Child Health",
    type: "infographic",
    duration: "1 page",
    thumbnail: "https://images.unsplash.com/photo-1565071559227-20ab25b7685e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    featured: false,
  },
  {
    id: 8,
    title: "HIV/AIDS: Prevention, Testing, and Management",
    category: "Infectious Diseases",
    type: "video",
    duration: "25 min",
    thumbnail: "https://images.unsplash.com/photo-1579154204601-01588f351e67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    featured: false,
  },
];

// Mock categories
const categories = [
  "All Categories",
  "Nutrition",
  "Chronic Conditions",
  "Infectious Diseases",
  "Mental Health",
  "Maternal Health",
  "Child Health",
  "Emergency Care"
];

const Education = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedTab, setSelectedTab] = useState("all");

  // Filter resources based on search, category, and tab
  const filteredResources = educationResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All Categories" || resource.category === selectedCategory;
    const matchesTab = selectedTab === "all" || 
                       (selectedTab === "featured" && resource.featured) ||
                       (selectedTab === "articles" && resource.type === "article") ||
                       (selectedTab === "videos" && resource.type === "video") ||
                       (selectedTab === "documents" && (resource.type === "pdf" || resource.type === "infographic"));
    
    return matchesSearch && matchesCategory && matchesTab;
  });

  // Get resource type icon
  const getResourceTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'article':
        return <FileText className="h-4 w-4" />;
      case 'pdf':
        return <FileText className="h-4 w-4" />;
      case 'infographic':
        return <BarChart className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow pt-20">
        <section className="bg-gradient-to-br from-health-primary to-health-secondary text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Health Education Resources</h1>
            <p className="text-xl max-w-3xl mx-auto opacity-90">
              Access culturally appropriate health information to enhance your understanding of health conditions, prevention, and management.
            </p>
          </div>
        </section>
        
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-6 mb-10">
              <div className="md:w-2/3 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input 
                  className="pl-10" 
                  placeholder="Search for health topics..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="md:w-1/3">
                <select 
                  className="w-full h-10 rounded-md border border-input px-3 py-2"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <Tabs defaultValue="all" value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="all">All Resources</TabsTrigger>
                <TabsTrigger value="featured">Featured</TabsTrigger>
                <TabsTrigger value="articles">Articles</TabsTrigger>
                <TabsTrigger value="videos">Videos</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredResources.map((resource) => (
                    <ResourceCard key={resource.id} resource={resource} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="featured" className="animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredResources.map((resource) => (
                    <ResourceCard key={resource.id} resource={resource} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="articles" className="animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredResources.map((resource) => (
                    <ResourceCard key={resource.id} resource={resource} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="videos" className="animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredResources.map((resource) => (
                    <ResourceCard key={resource.id} resource={resource} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="documents" className="animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredResources.map((resource) => (
                    <ResourceCard key={resource.id} resource={resource} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
            
            {filteredResources.length === 0 && (
              <div className="text-center py-20">
                <BookOpen className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-2">No resources found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your search or filters</p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All Categories");
                    setSelectedTab("all");
                  }}
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

// Resource Card Component
const ResourceCard = ({ resource }: { resource: any }) => {
  const getResourceTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'article':
        return <FileText className="h-4 w-4" />;
      case 'pdf':
        return <FileText className="h-4 w-4" />;
      case 'infographic':
        return <BarChart className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow group">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={resource.thumbnail} 
          alt={resource.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {resource.type === 'video' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-14 w-14 rounded-full bg-black/50 flex items-center justify-center">
              <PlayCircle className="h-8 w-8 text-white" />
            </div>
          </div>
        )}
        <div className="absolute top-2 right-2 bg-white text-health-primary px-2 py-1 rounded-md text-xs font-medium">
          {resource.category}
        </div>
        {resource.featured && (
          <div className="absolute top-2 left-2 bg-health-primary text-white px-2 py-1 rounded-md text-xs font-medium">
            Featured
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold line-clamp-2 mb-2 group-hover:text-health-primary transition-colors">
          {resource.title}
        </h3>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center text-sm text-gray-500">
            {getResourceTypeIcon(resource.type)}
            <span className="ml-1 capitalize">{resource.type}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-1" />
            {resource.duration}
          </div>
        </div>
        <Button className="w-full mt-4 bg-health-primary hover:bg-health-primary/90">
          {resource.type === 'pdf' || resource.type === 'infographic' ? (
            <>
              <Download className="mr-2 h-4 w-4" />
              Download
            </>
          ) : (
            <>
              View Resource
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default Education;
