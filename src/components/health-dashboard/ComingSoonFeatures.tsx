
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
      icon: <BrainCircuit className="h-12 w-12 text-white" />,
      color: "bg-gradient-to-br from-health-primary to-health-primary/80",
      eta: "Phase 1 - Coming Soon"
    },
    {
      title: "Wearable Device Integration",
      description: "Connect your wearable devices to track real-time health metrics, improving health monitoring by 40%.",
      icon: <Timer className="h-12 w-12 text-white" />,
      color: "bg-gradient-to-br from-health-accent to-health-accent/80",
      eta: "Phase 2 - Coming Soon"
    },
    {
      title: "Multi-language Support",
      description: "Access health information in both English and Swahili to improve cultural relevance and accessibility.",
      icon: <Languages className="h-12 w-12 text-white" />,
      color: "bg-gradient-to-br from-health-secondary to-health-secondary/80",
      eta: "Phase 2 - Coming Soon"
    },
    {
      title: "Enhanced Data Security",
      description: "Strong encryption and authentication methods to ensure compliance with the Kenya Data Protection Act.",
      icon: <Lock className="h-12 w-12 text-white" />,
      color: "bg-gradient-to-br from-health-success to-health-success/80",
      eta: "Phase 2 - Coming Soon"
    },
    {
      title: "Health Education Materials",
      description: "Culturally appropriate health education materials in multiple formats to increase health literacy by 35%.",
      icon: <FileText className="h-12 w-12 text-white" />,
      color: "bg-gradient-to-br from-health-warning to-health-warning/80",
      eta: "Phase 3 - Coming Soon"
    }
  ];

  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-3 text-gradient">Exciting Features Coming Soon</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We're working on these innovative features to revolutionize healthcare access and monitoring in Kenya.
          Stay tuned as we roll them out in our phased approach.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {upcomingFeatures.map((feature, index) => (
          <Card 
            key={index} 
            className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-none"
          >
            <div className={`${feature.color} p-6`}>
              <div className="mb-2">{feature.icon}</div>
              <CardTitle className="text-xl text-white">{feature.title}</CardTitle>
              <CardDescription className="text-white/80 font-medium mt-1">
                {feature.eta}
              </CardDescription>
            </div>
            <CardContent className="p-6">
              <p className="text-gray-700">{feature.description}</p>
              <div className="mt-4 flex items-center text-health-primary font-medium">
                <span>Learn more</span>
                <ChevronRight className="h-4 w-4 ml-1" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ComingSoonFeatures;
