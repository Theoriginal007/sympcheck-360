
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Loader2, ChevronRight, Stethoscope, AlertCircle, ThumbsUp } from 'lucide-react';
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
    <div className="container mx-auto px-4 py-12 md:py-20 max-w-4xl">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-health-primary/10 p-6 md:p-8 border-b border-health-primary/20">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-health-primary rounded-full flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-health-text">AI Symptom Checker</h2>
              <p className="text-gray-600">Describe your symptoms for a preliminary health assessment</p>
            </div>
          </div>
        </div>
        
        <div className="p-6 md:p-8">
          {stage === 'input' && (
            <div className="animate-fade-in">
              {/* Symptom input */}
              <form onSubmit={handleSubmit} className="mb-8 relative">
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
                        <ThumbsUp className="w-4 h-4 mr-2 text-health-primary/70" />
                        {symptom}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Current symptoms */}
              <div className="space-y-4">
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
            <div className="py-12 flex flex-col items-center animate-fade-in">
              <Loader2 className="w-16 h-16 text-health-primary animate-spin mb-4" />
              <h3 className="text-xl font-medium mb-2">Analyzing your symptoms...</h3>
              <p className="text-gray-600 text-center max-w-md">
                Our AI system is analyzing your symptoms and comparing them with thousands of health conditions.
              </p>
            </div>
          )}
          
          {stage === 'results' && results && (
            <div className="animate-fade-in">
              {/* Results header */}
              <div className="mb-8 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-health-primary/10 mb-4">
                  <Stethoscope className="w-10 h-10 text-health-primary" />
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
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <ul className="space-y-2">
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
              <div className="mb-8 flex items-start p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
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
                  className="flex-1"
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
    </div>
  );
};

export default SymptomChecker;
