
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
  Languages
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
      icon: <BrainCircuit className="h-10 w-10 text-health-primary" />,
      eta: "Phase 1 - Coming Soon"
    },
    {
      title: "Wearable Device Integration",
      description: "Connect your wearable devices to track real-time health metrics, improving health monitoring by 40%.",
      icon: <Timer className="h-10 w-10 text-health-accent" />,
      eta: "Phase 2 - Coming Soon"
    },
    {
      title: "Multi-language Support",
      description: "Access health information in both English and Swahili to improve cultural relevance and accessibility.",
      icon: <Languages className="h-10 w-10 text-health-secondary" />,
      eta: "Phase 2 - Coming Soon"
    },
    {
      title: "Enhanced Data Security",
      description: "Strong encryption and authentication methods to ensure compliance with the Kenya Data Protection Act.",
      icon: <Lock className="h-10 w-10 text-health-success" />,
      eta: "Phase 2 - Coming Soon"
    },
    {
      title: "Health Education Materials",
      description: "Culturally appropriate health education materials in multiple formats to increase health literacy by 35%.",
      icon: <FileText className="h-10 w-10 text-health-warning" />,
      eta: "Phase 3 - Coming Soon"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      {upcomingFeatures.map((feature, index) => (
        <Card key={index} className="border-2 border-dashed border-gray-200 bg-gray-50">
          <CardHeader className="pb-2">
            <div className="mb-2">{feature.icon}</div>
            <CardTitle className="text-lg">{feature.title}</CardTitle>
            <CardDescription className="text-amber-600 font-medium">
              {feature.eta}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">{feature.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ComingSoonFeatures;
