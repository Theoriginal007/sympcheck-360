
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Search, Video, FileText, BarChart, ArrowRight, PlayCircle, Clock, Download, Eye } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Mock education resources data - enhanced with download URLs
const educationResources = [
  {
    id: 1,
    title: "Understanding Diabetes Management",
    category: "Chronic Conditions",
    type: "article",
    duration: "10 min read",
    thumbnail: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    featured: true,
    url: "#"
  },
  {
    id: 2,
    title: "Nutrition Basics: Balanced Diet for Kenyan Families",
    category: "Nutrition",
    type: "video",
    duration: "15 min",
    thumbnail: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    featured: true,
    url: "#"
  },
  {
    id: 3,
    title: "Malaria Prevention Strategies",
    category: "Infectious Diseases",
    type: "article",
    duration: "8 min read",
    thumbnail: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    featured: false,
    url: "#"
  },
  {
    id: 4,
    title: "Mental Health Awareness: Recognizing Signs of Depression",
    category: "Mental Health",
    type: "video",
    duration: "20 min",
    thumbnail: "https://images.unsplash.com/photo-1493836512294-502baa1986e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    featured: false,
    url: "#"
  },
  {
    id: 5,
    title: "Prenatal Care Guide for Expectant Mothers",
    category: "Maternal Health",
    type: "pdf",
    duration: "12 pages",
    thumbnail: "https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    featured: false,
    url: "#download-pdf",
    fileSize: "2.4 MB"
  },
  {
    id: 6,
    title: "First Aid Basics: What Every Family Should Know",
    category: "Emergency Care",
    type: "article",
    duration: "15 min read",
    thumbnail: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    featured: true,
    url: "#"
  },
  {
    id: 7,
    title: "Childhood Immunizations: Schedule and Importance",
    category: "Child Health",
    type: "infographic",
    duration: "1 page",
    thumbnail: "https://images.unsplash.com/photo-1565071559227-20ab25b7685e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    featured: false,
    url: "#download-pdf",
    fileSize: "1.2 MB"
  },
  {
    id: 8,
    title: "HIV/AIDS: Prevention, Testing, and Management",
    category: "Infectious Diseases",
    type: "video",
    duration: "25 min",
    thumbnail: "https://images.unsplash.com/photo-1579154204601-01588f351e67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    featured: false,
    url: "#"
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
  const [selectedResource, setSelectedResource] = useState<any>(null);
  const [showResourceModal, setShowResourceModal] = useState(false);
  const { toast } = useToast();

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

  // Handle resource selection
  const handleResourceSelect = (resource: any) => {
    setSelectedResource(resource);
    setShowResourceModal(true);
  };

  // Handle resource download
  const handleDownload = (resource: any) => {
    toast({
      title: "Download Started",
      description: `${resource.title} will download shortly.`,
      duration: 3000,
    });

    // Simulate download completion after a delay
    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: `${resource.title} has been downloaded successfully.`,
        duration: 3000,
      });
    }, 2000);
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
                    <ResourceCard 
                      key={resource.id} 
                      resource={resource} 
                      onView={() => handleResourceSelect(resource)}
                      onDownload={() => handleDownload(resource)}
                    />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="featured" className="animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredResources.map((resource) => (
                    <ResourceCard 
                      key={resource.id} 
                      resource={resource} 
                      onView={() => handleResourceSelect(resource)}
                      onDownload={() => handleDownload(resource)}
                    />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="articles" className="animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredResources.map((resource) => (
                    <ResourceCard 
                      key={resource.id} 
                      resource={resource} 
                      onView={() => handleResourceSelect(resource)}
                      onDownload={() => handleDownload(resource)}
                    />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="videos" className="animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredResources.map((resource) => (
                    <ResourceCard 
                      key={resource.id} 
                      resource={resource} 
                      onView={() => handleResourceSelect(resource)}
                      onDownload={() => handleDownload(resource)}
                    />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="documents" className="animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredResources.map((resource) => (
                    <ResourceCard 
                      key={resource.id} 
                      resource={resource} 
                      onView={() => handleResourceSelect(resource)}
                      onDownload={() => handleDownload(resource)}
                    />
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

            {/* Resource Viewer Modal */}
            {showResourceModal && selectedResource && (
              <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl max-w-3xl w-full max-h-[80vh] overflow-auto">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h2 className="text-2xl font-bold">{selectedResource.title}</h2>
                      <button 
                        onClick={() => setShowResourceModal(false)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        ×
                      </button>
                    </div>
                    
                    <div className="mb-4">
                      <span className="inline-block bg-health-primary/10 text-health-primary px-3 py-1 rounded-full text-sm mr-2">
                        {selectedResource.category}
                      </span>
                      <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        {selectedResource.type.charAt(0).toUpperCase() + selectedResource.type.slice(1)}
                      </span>
                    </div>
                    
                    {selectedResource.type === 'video' ? (
                      <div className="aspect-video bg-black rounded-lg mb-6 flex items-center justify-center">
                        <div className="text-center text-white">
                          <PlayCircle className="h-16 w-16 mx-auto mb-2" />
                          <p>Video preview not available in demo</p>
                        </div>
                      </div>
                    ) : selectedResource.type === 'pdf' || selectedResource.type === 'infographic' ? (
                      <div className="aspect-[4/3] bg-gray-100 rounded-lg mb-6 p-8 flex items-center justify-center border">
                        <div className="text-center">
                          <FileText className="h-16 w-16 mx-auto mb-2 text-gray-400" />
                          <p className="text-gray-600 mb-2">{selectedResource.title}</p>
                          <p className="text-sm text-gray-500">{selectedResource.fileSize} • {selectedResource.duration}</p>
                        </div>
                      </div>
                    ) : (
                      <img 
                        src={selectedResource.thumbnail} 
                        alt={selectedResource.title}
                        className="w-full h-64 object-cover rounded-lg mb-6"
                      />
                    )}
                    
                    <div className="prose max-w-none mb-6">
                      <p>This is a placeholder content for the {selectedResource.title} resource. In a real application, this would contain the actual educational content.</p>
                      <p>The content would be formatted appropriately based on the resource type and would provide valuable health information related to {selectedResource.category}.</p>
                    </div>
                    
                    <div className="flex space-x-4">
                      <Button 
                        variant="outline" 
                        onClick={() => setShowResourceModal(false)}
                      >
                        Close
                      </Button>
                      {(selectedResource.type === 'pdf' || selectedResource.type === 'infographic') && (
                        <Button 
                          onClick={() => handleDownload(selectedResource)}
                          className="bg-health-primary hover:bg-health-primary/90"
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
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
const ResourceCard = ({ 
  resource, 
  onView, 
  onDownload 
}: { 
  resource: any, 
  onView: () => void, 
  onDownload: () => void 
}) => {
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
        
        <div className="grid grid-cols-2 gap-2 mt-4">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={onView}
          >
            <Eye className="mr-2 h-4 w-4" />
            View
          </Button>
          
          {resource.type === 'pdf' || resource.type === 'infographic' ? (
            <Button 
              className="w-full bg-health-primary hover:bg-health-primary/90"
              onClick={onDownload}
            >
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          ) : (
            <Button 
              className="w-full bg-health-primary hover:bg-health-primary/90"
              onClick={onView}
            >
              Open
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Education;
