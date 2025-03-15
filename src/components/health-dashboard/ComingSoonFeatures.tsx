
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  BrainCircuit, 
  Timer, 
  FileText, 
  Lock, 
  Languages,
  ChevronRight
} from "lucide-react";

/**
 * Displays upcoming features that are currently in development
 * These include AI-powered symptom checking, wearable device integration,
 * multi-language support, and enhanced security features
 */
const ComingSoonFeatures = () => {
  const upcomingFeatures = [
    {
      title: "AI Symptom Analysis",
      description: "Our advanced AI system will analyze your symptoms and provide guidance based on the latest medical knowledge, adapted for Kenyan healthcare context.",
      icon: <BrainCircuit className="h-14 w-14 text-white" />,
      color: "bg-gradient-to-br from-health-primary to-health-primary/80",
      eta: "Phase 1 - Coming Soon"
    },
    {
      title: "Wearable Device Integration",
      description: "Connect your wearable devices to track real-time health metrics, improving health monitoring by 40%.",
      icon: <Timer className="h-14 w-14 text-white" />,
      color: "bg-gradient-to-br from-health-accent to-health-accent/80",
      eta: "Phase 2 - Coming Soon"
    },
    {
      title: "Multi-language Support",
      description: "Access health information in both English and Swahili to improve cultural relevance and accessibility.",
      icon: <Languages className="h-14 w-14 text-white" />,
      color: "bg-gradient-to-br from-health-secondary to-health-secondary/80",
      eta: "Phase 2 - Coming Soon"
    },
    {
      title: "Enhanced Data Security",
      description: "Strong encryption and authentication methods to ensure compliance with the Kenya Data Protection Act.",
      icon: <Lock className="h-14 w-14 text-white" />,
      color: "bg-gradient-to-br from-health-success to-health-success/80",
      eta: "Phase 2 - Coming Soon"
    },
    {
      title: "Health Education Materials",
      description: "Culturally appropriate health education materials in multiple formats to increase health literacy by 35%.",
      icon: <FileText className="h-14 w-14 text-white" />,
      color: "bg-gradient-to-br from-health-warning to-health-warning/80",
      eta: "Phase 3 - Coming Soon"
    }
  ];

  return (
    <div className="mb-16">
      <div className="text-center mb-10">
        <h2 className="text-5xl font-bold mb-6 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-health-primary to-health-accent">Exciting Features Coming Soon</h2>
        <p className="text-gray-600 max-w-3xl mx-auto text-lg">
          We're working on these innovative features to revolutionize healthcare access and monitoring in Kenya.
          Stay tuned as we roll them out in our phased approach.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {upcomingFeatures.map((feature, index) => (
          <Card 
            key={index} 
            className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-none"
          >
            <div className={`${feature.color} p-8`}>
              <div className="mb-4">{feature.icon}</div>
              <CardTitle className="text-2xl text-white">{feature.title}</CardTitle>
              <CardDescription className="text-white/90 font-medium mt-2 text-base">
                {feature.eta}
              </CardDescription>
            </div>
            <CardContent className="p-6">
              <p className="text-gray-700 text-lg">{feature.description}</p>
              <div className="mt-6 flex items-center text-health-primary font-medium">
                <span>Learn more</span>
                <ChevronRight className="h-5 w-5 ml-1" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ComingSoonFeatures;
