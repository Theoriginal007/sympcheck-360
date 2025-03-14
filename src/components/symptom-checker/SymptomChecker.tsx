
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Loader2, 
  ChevronRight, 
  Stethoscope, 
  AlertCircle, 
  ThumbsUp, 
  Brain, 
  MessageCircle, 
  Shield, 
  ActivitySquare, 
  ArrowRight
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Mock data for demo purposes
const mockSymptomDatabase = [
  { id: 1, name: "Fever", keywords: ["hot", "temperature", "burning", "fever"], common: true },
  { id: 2, name: "Headache", keywords: ["head pain", "headache", "migraine", "head pounding"], common: true },
  { id: 3, name: "Cough", keywords: ["coughing", "cough", "chest", "throat"], common: true },
  { id: 4, name: "Fatigue", keywords: ["tired", "exhausted", "fatigue", "no energy"], common: true },
  { id: 5, name: "Sore throat", keywords: ["throat pain", "sore", "throat", "swallowing pain"], common: true },
  { id: 6, name: "Shortness of breath", keywords: ["breathing", "short breath", "breathless", "difficult breathing"], common: false },
  { id: 7, name: "Nausea", keywords: ["sick", "vomit", "nausea", "queasy"], common: false },
  { id: 8, name: "Joint pain", keywords: ["joint", "pain", "ache", "arthritis"], common: false },
  { id: 9, name: "Chest pain", keywords: ["chest", "pain", "heart", "pressure"], common: false },
  { id: 10, name: "Dizziness", keywords: ["dizzy", "lightheaded", "vertigo", "spinning"], common: false },
  { id: 11, name: "Rash", keywords: ["skin", "itchy", "rash", "bumps"], common: false },
  { id: 12, name: "Abdominal pain", keywords: ["stomach", "pain", "abdomen", "cramps"], common: false },
  { id: 13, name: "Back pain", keywords: ["back", "pain", "spine", "backache"], common: false },
  { id: 14, name: "Diarrhea", keywords: ["loose stool", "watery", "diarrhea"], common: false },
  { id: 15, name: "Muscle aches", keywords: ["muscle", "pain", "ache", "soreness"], common: false }
];

// Common symptom combinations for recommendations
const commonSymptomCombinations = [
  { name: "Cold symptoms", symptoms: ["Fever", "Cough", "Sore throat"] },
  { name: "Flu-like symptoms", symptoms: ["Fever", "Headache", "Fatigue", "Muscle aches"] },
  { name: "Digestive issues", symptoms: ["Nausea", "Abdominal pain", "Diarrhea"] },
  { name: "Respiratory problems", symptoms: ["Cough", "Shortness of breath", "Chest pain"] },
  { name: "Stress-related symptoms", symptoms: ["Headache", "Fatigue", "Muscle aches"] }
];

const mockDiagnoses = [
  {
    symptoms: ["Fever", "Cough", "Fatigue", "Sore throat"],
    condition: "Common Cold",
    confidence: 85,
    urgency: "Low",
    recommendations: [
      "Rest and stay hydrated",
      "Take over-the-counter cold medications",
      "Use throat lozenges for sore throat",
      "Monitor for worsening symptoms"
    ]
  },
  {
    symptoms: ["Fever", "Cough", "Shortness of breath", "Fatigue"],
    condition: "Respiratory Infection",
    confidence: 78,
    urgency: "Medium",
    recommendations: [
      "Rest and stay hydrated",
      "Consider consulting a healthcare provider",
      "Monitor oxygen levels if possible",
      "Take fever reducers as needed"
    ]
  },
  {
    symptoms: ["Chest pain", "Shortness of breath"],
    condition: "Seek Emergency Care",
    confidence: 95,
    urgency: "High",
    recommendations: [
      "This could be a medical emergency",
      "Contact emergency services immediately",
      "Do not attempt to self-diagnose or treat"
    ]
  },
  {
    symptoms: ["Headache", "Nausea", "Fatigue"],
    condition: "Migraine or Tension Headache",
    confidence: 70,
    urgency: "Low",
    recommendations: [
      "Rest in a dark, quiet room",
      "Take over-the-counter pain relievers",
      "Apply cold compresses to the head",
      "Stay hydrated and consider relaxation techniques"
    ]
  },
  {
    symptoms: ["Joint pain", "Fatigue"],
    condition: "Joint Inflammation",
    confidence: 65,
    urgency: "Low",
    recommendations: [
      "Rest the affected joints",
      "Apply hot or cold compresses",
      "Consider over-the-counter anti-inflammatory medications",
      "Consult a healthcare provider if persistent"
    ]
  }
];

const SymptomChecker = () => {
  const [inputText, setInputText] = useState('');
  const [userSymptoms, setUserSymptoms] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [stage, setStage] = useState<'input' | 'analyzing' | 'results'>('input');
  const [results, setResults] = useState<any>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recommendedSymptoms, setRecommendedSymptoms] = useState<string[]>([]);
  const { toast } = useToast();

  // Generate recommended symptoms based on current symptoms
  useEffect(() => {
    if (userSymptoms.length > 0) {
      // Find related symptoms
      let related: string[] = [];
      
      // Check if current symptoms match any common combinations
      for (const combo of commonSymptomCombinations) {
        const matchedSymptoms = combo.symptoms.filter(s => userSymptoms.includes(s));
        if (matchedSymptoms.length > 0 && matchedSymptoms.length < combo.symptoms.length) {
          // Add symptoms from the combination that aren't already selected
          related = [...related, ...combo.symptoms.filter(s => !userSymptoms.includes(s))];
        }
      }
      
      // Add common symptoms that aren't selected yet
      if (related.length < 3) {
        const commonSymptoms = mockSymptomDatabase
          .filter(s => s.common && !userSymptoms.includes(s.name))
          .map(s => s.name);
        related = [...related, ...commonSymptoms].slice(0, 5);
      }
      
      // Remove duplicates and limit to 5
      setRecommendedSymptoms([...new Set(related)].slice(0, 5));
    } else {
      // If no symptoms are selected, show common symptoms
      const commonSymptoms = mockSymptomDatabase
        .filter(s => s.common)
        .map(s => s.name);
      setRecommendedSymptoms(commonSymptoms);
    }
  }, [userSymptoms]);

  // Function to handle input changes and provide suggestions
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputText(value);
    
    if (value.length > 2) {
      // Find matching symptoms
      const matches = mockSymptomDatabase.filter(symptom => 
        symptom.keywords.some(keyword => 
          keyword.toLowerCase().includes(value.toLowerCase())
        )
      );
      
      // Extract unique symptom names
      const matchNames = [...new Set(matches.map(match => match.name))];
      setSuggestions(matchNames);
      setShowSuggestions(matchNames.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Function to add a symptom
  const addSymptom = (symptom: string) => {
    if (!userSymptoms.includes(symptom)) {
      setUserSymptoms([...userSymptoms, symptom]);
      setInputText('');
      setSuggestions([]);
      setShowSuggestions(false);
      
      toast({
        title: "Symptom Added",
        description: `"${symptom}" has been added to your list.`,
        duration: 2000,
      });
    }
  };

  // Function to remove a symptom
  const removeSymptom = (symptom: string) => {
    setUserSymptoms(userSymptoms.filter(s => s !== symptom));
  };

  // Function to analyze symptoms
  const analyzeSymptoms = () => {
    if (userSymptoms.length === 0) {
      toast({
        title: "No Symptoms Added",
        description: "Please add at least one symptom to analyze.",
        variant: "destructive",
      });
      return;
    }
    
    setStage('analyzing');
    
    // Simulate AI analysis with a delay
    setTimeout(() => {
      // Find the closest match in our mock database
      let bestMatch = null;
      let highestMatchCount = 0;
      
      for (const diagnosis of mockDiagnoses) {
        const matchCount = diagnosis.symptoms.filter(s => userSymptoms.includes(s)).length;
        if (matchCount > highestMatchCount) {
          highestMatchCount = matchCount;
          bestMatch = diagnosis;
        }
      }
      
      // If we found a reasonable match
      if (bestMatch && highestMatchCount > 0) {
        setResults(bestMatch);
      } else {
        // No good match
        setResults({
          condition: "Insufficient Information",
          confidence: 30,
          urgency: "Unknown",
          recommendations: [
            "The symptoms provided don't match any specific condition in our database",
            "Consider adding more symptoms for a better analysis",
            "Consult with a healthcare provider for personalized advice"
          ]
        });
      }
      
      setStage('results');
    }, 3000);
  };

  // Function to restart the process
  const restart = () => {
    setUserSymptoms([]);
    setInputText('');
    setResults(null);
    setStage('input');
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() !== '') {
      addSymptom(inputText);
    }
  };

  // Get urgency color
  const getUrgencyColor = (urgency: string) => {
    switch (urgency.toLowerCase()) {
      case 'low': return 'text-health-success';
      case 'medium': return 'text-health-warning';
      case 'high': return 'text-health-error';
      default: return 'text-health-muted';
    }
  };

  // Get confidence color
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-health-success';
    if (confidence >= 60) return 'text-health-warning';
    return 'text-health-muted';
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-20 max-w-5xl">
      {/* Hero section */}
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-health-primary to-health-accent">
          AI-Powered Symptom Checker
        </h1>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
          Our advanced system analyzes your symptoms and provides personalized health guidance
          based on the latest medical knowledge, adapted for Kenyan healthcare context.
        </p>
      </div>
      
      {/* Key benefits */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[
          {
            icon: <Brain className="h-8 w-8 text-white" />,
            title: "AI-Powered Analysis",
            description: "Utilizes advanced artificial intelligence to analyze symptoms",
            color: "bg-health-primary",
          },
          {
            icon: <Shield className="h-8 w-8 text-white" />,
            title: "Privacy Protected",
            description: "Your health data is secure and protected under Kenya's Data Protection Act",
            color: "bg-health-success",
          },
          {
            icon: <MessageCircle className="h-8 w-8 text-white" />,
            title: "Culturally Relevant",
            description: "Recommendations tailored to Kenyan healthcare context and practices",
            color: "bg-health-accent",
          },
        ].map((benefit, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-fade-in" style={{ animationDelay: `${0.2 * index}s` }}>
            <div className={`${benefit.color} p-4 flex items-center`}>
              <div className="bg-white/20 rounded-lg p-2">
                {benefit.icon}
              </div>
              <h3 className="ml-3 text-xl font-bold text-white">{benefit.title}</h3>
            </div>
            <div className="p-4">
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-health-primary/20 to-health-secondary/20 p-6 md:p-8 border-b border-health-primary/10">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-health-primary rounded-full flex items-center justify-center">
              <Stethoscope className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-health-text">Symptom Analysis</h2>
              <p className="text-gray-600">Share your symptoms for a preliminary health assessment</p>
            </div>
          </div>
        </div>
        
        <div className="p-6 md:p-8">
          {stage === 'input' && (
            <div className="animate-fade-in">
              {/* How it works section */}
              <div className="mb-8 bg-gray-50 p-6 rounded-xl border border-gray-100">
                <h3 className="text-xl font-semibold mb-4">How It Works</h3>
                <div className="grid md:grid-cols-4 gap-4">
                  {[
                    {
                      step: 1,
                      title: "Describe Symptoms",
                      description: "Tell us what you're experiencing",
                      icon: <MessageCircle className="h-6 w-6 text-health-primary" />
                    },
                    {
                      step: 2,
                      title: "AI Analysis",
                      description: "Our AI evaluates your symptoms",
                      icon: <Brain className="h-6 w-6 text-health-primary" />
                    },
                    {
                      step: 3,
                      title: "Get Insights",
                      description: "Receive preliminary guidance",
                      icon: <ActivitySquare className="h-6 w-6 text-health-primary" />
                    },
                    {
                      step: 4,
                      title: "Next Steps",
                      description: "Book a consultation if needed",
                      icon: <ArrowRight className="h-6 w-6 text-health-primary" />
                    }
                  ].map((step, index) => (
                    <div key={index} className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 rounded-full bg-health-primary/10 flex items-center justify-center mb-3">
                        {step.icon}
                      </div>
                      <div className="text-sm font-semibold">{step.title}</div>
                      <div className="text-xs text-gray-500">{step.description}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Symptom input */}
              <form onSubmit={handleSubmit} className="mb-8 relative">
                <h3 className="text-lg font-semibold mb-4">Enter Your Symptoms</h3>
                <div className="flex items-center space-x-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      className="pl-10 pr-4 py-6 rounded-xl"
                      placeholder="Type your symptoms here (e.g., fever, headache)"
                      value={inputText}
                      onChange={handleInputChange}
                    />
                    {showSuggestions && suggestions.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white shadow-lg rounded-xl border border-gray-200 max-h-64 overflow-y-auto">
                        {suggestions.map((suggestion, index) => (
                          <div
                            key={index}
                            className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                            onClick={() => addSymptom(suggestion)}
                          >
                            {suggestion}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <Button type="submit" className="bg-health-primary hover:bg-health-primary/90">
                    Add
                  </Button>
                </div>
              </form>
              
              {/* Recommended symptoms */}
              {recommendedSymptoms.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-medium text-lg mb-3">Common symptoms you might be experiencing:</h3>
                  <div className="flex flex-wrap gap-2">
                    {recommendedSymptoms.map((symptom, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="bg-gray-50 hover:bg-gray-100 border-gray-200"
                        onClick={() => addSymptom(symptom)}
                      >
                        <ThumbsUp className="w-4 h-4 mr-2 text-health-primary" />
                        {symptom}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Current symptoms */}
              <div className="space-y-4 bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="font-medium text-lg">Your symptoms:</h3>
                {userSymptoms.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {userSymptoms.map((symptom, index) => (
                      <div 
                        key={index}
                        className="bg-health-primary/10 text-health-primary px-3 py-1 rounded-full text-sm flex items-center"
                      >
                        <span>{symptom}</span>
                        <button 
                          className="ml-2 text-health-primary/70 hover:text-health-primary"
                          onClick={() => removeSymptom(symptom)}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No symptoms added yet. Type your symptoms in the field above or select from the recommendations.</p>
                )}
              </div>
              
              {/* Analyze button */}
              <div className="mt-8">
                <Button 
                  className="w-full bg-health-primary hover:bg-health-primary/90 py-6 text-lg rounded-xl"
                  onClick={analyzeSymptoms}
                  disabled={userSymptoms.length === 0}
                >
                  Analyze My Symptoms
                </Button>
                <p className="text-gray-500 text-sm mt-2 text-center">
                  This is a preliminary assessment tool and does not replace professional medical advice.
                </p>
              </div>
            </div>
          )}
          
          {stage === 'analyzing' && (
            <div className="py-20 flex flex-col items-center animate-fade-in">
              <div className="relative w-24 h-24 mb-6">
                <div className="absolute inset-0 bg-health-primary/20 rounded-full animate-ping"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="w-16 h-16 text-health-primary animate-spin" />
                </div>
              </div>
              <h3 className="text-2xl font-medium mb-3 text-health-primary">Analyzing your symptoms...</h3>
              <p className="text-gray-600 text-center max-w-lg">
                Our AI system is analyzing your symptoms and comparing them with thousands of health conditions
                to provide you with the most accurate preliminary assessment.
              </p>
            </div>
          )}
          
          {stage === 'results' && results && (
            <div className="animate-fade-in">
              {/* Results header */}
              <div className="mb-8 text-center">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-health-primary to-health-secondary mb-4">
                  <Stethoscope className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{results.condition}</h3>
                <div className="flex items-center justify-center space-x-4">
                  {results.confidence && (
                    <div className="flex items-center">
                      <span className="text-gray-600 text-sm mr-2">Confidence:</span>
                      <span className={`font-medium ${getConfidenceColor(results.confidence)}`}>
                        {results.confidence}%
                      </span>
                    </div>
                  )}
                  {results.urgency && (
                    <div className="flex items-center">
                      <span className="text-gray-600 text-sm mr-2">Urgency:</span>
                      <span className={`font-medium ${getUrgencyColor(results.urgency)}`}>
                        {results.urgency}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Matched symptoms */}
              {results.symptoms && (
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Matching Symptoms:</h4>
                  <div className="flex flex-wrap gap-2">
                    {results.symptoms.map((symptom: string, index: number) => (
                      <div 
                        key={index}
                        className={`px-3 py-1 rounded-full text-sm ${
                          userSymptoms.includes(symptom) 
                            ? 'bg-health-success/10 text-health-success' 
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {symptom}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Recommendations */}
              <div className="mb-8">
                <h4 className="font-medium mb-3">Recommendations:</h4>
                <div className="bg-gradient-to-r from-health-primary/5 to-health-secondary/5 rounded-xl p-6 border border-health-primary/10">
                  <ul className="space-y-3">
                    {results.recommendations.map((rec: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <ChevronRight className="w-5 h-5 text-health-primary flex-shrink-0 mt-0.5" />
                        <span className="ml-2">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Disclaimer */}
              <div className="mb-8 flex items-start p-5 bg-yellow-50 rounded-xl border border-yellow-200">
                <AlertCircle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-0.5" />
                <div className="ml-3">
                  <h5 className="font-medium text-yellow-700">Important Disclaimer</h5>
                  <p className="text-yellow-700 text-sm">
                    This is an AI-generated preliminary assessment only. It is not a diagnosis. Always consult with a healthcare professional for medical advice.
                  </p>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="outline" 
                  className="flex-1 border-health-primary text-health-primary hover:bg-health-primary/5"
                  onClick={restart}
                >
                  Start Over
                </Button>
                <Button 
                  className="flex-1 bg-health-primary hover:bg-health-primary/90"
                  onClick={() => window.location.href = '/consultations'}
                >
                  Book Consultation
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Additional information section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Why Use HealthSphere's Symptom Checker?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Culturally Relevant",
              description: "Adapted specifically for Kenyan healthcare context and medical practices",
              color: "border-health-primary"
            },
            {
              title: "AI-Powered",
              description: "Utilizes advanced artificial intelligence for accurate symptom analysis",
              color: "border-health-accent"
            },
            {
              title: "Healthcare Integration",
              description: "Seamlessly connects with virtual consultations for comprehensive care",
              color: "border-health-secondary"
            }
          ].map((feature, index) => (
            <div key={index} className={`p-6 rounded-xl bg-white shadow-sm ${feature.color} border`}>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SymptomChecker;
