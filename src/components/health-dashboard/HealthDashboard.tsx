
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Activity, Heart, Droplet, Scale, Clock, PlusCircle, Thermometer, TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for the charts
const heartRateData = [
  { day: 'Mon', value: 72, min: 65, max: 80 },
  { day: 'Tue', value: 75, min: 68, max: 82 },
  { day: 'Wed', value: 70, min: 65, max: 75 },
  { day: 'Thu', value: 73, min: 68, max: 79 },
  { day: 'Fri', value: 76, min: 72, max: 85 },
  { day: 'Sat', value: 80, min: 74, max: 88 },
  { day: 'Sun', value: 77, min: 72, max: 84 },
];

const bloodPressureData = [
  { day: 'Mon', systolic: 120, diastolic: 80 },
  { day: 'Tue', systolic: 118, diastolic: 78 },
  { day: 'Wed', systolic: 122, diastolic: 82 },
  { day: 'Thu', systolic: 119, diastolic: 79 },
  { day: 'Fri', systolic: 121, diastolic: 81 },
  { day: 'Sat', systolic: 117, diastolic: 77 },
  { day: 'Sun', systolic: 120, diastolic: 80 },
];

const sleepData = [
  { day: 'Mon', hours: 7.5, deep: 2.1, light: 3.8, rem: 1.6 },
  { day: 'Tue', hours: 6.8, deep: 1.8, light: 3.5, rem: 1.5 },
  { day: 'Wed', hours: 7.2, deep: 2.0, light: 3.6, rem: 1.6 },
  { day: 'Thu', hours: 8.0, deep: 2.3, light: 4.0, rem: 1.7 },
  { day: 'Fri', hours: 6.5, deep: 1.7, light: 3.3, rem: 1.5 },
  { day: 'Sat', hours: 8.5, deep: 2.5, light: 4.2, rem: 1.8 },
  { day: 'Sun', hours: 7.8, deep: 2.2, light: 3.9, rem: 1.7 },
];

const weightData = [
  { date: 'Jan 1', value: 72.5 },
  { date: 'Feb 1', value: 72.0 },
  { date: 'Mar 1', value: 71.3 },
  { date: 'Apr 1', value: 70.8 },
  { date: 'May 1', value: 70.2 },
  { date: 'Jun 1', value: 70.0 },
  { date: 'Jul 1', value: 69.5 },
];

// Mock data for quick stats
const quickStats = [
  {
    name: 'Heart Rate',
    value: '72',
    unit: 'bpm',
    icon: <Heart className="w-5 h-5" />,
    status: 'normal',
    change: { value: '+2', direction: 'up' },
    color: 'text-health-primary',
    bgColor: 'bg-health-primary/10',
  },
  {
    name: 'Blood Pressure',
    value: '120/80',
    unit: 'mmHg',
    icon: <Activity className="w-5 h-5" />,
    status: 'normal',
    change: { value: '-2/0', direction: 'down' },
    color: 'text-health-success',
    bgColor: 'bg-health-success/10',
  },
  {
    name: 'Weight',
    value: '70.5',
    unit: 'kg',
    icon: <Scale className="w-5 h-5" />,
    status: 'improving',
    change: { value: '-0.5', direction: 'down' },
    color: 'text-health-success',
    bgColor: 'bg-health-success/10',
  },
  {
    name: 'Sleep',
    value: '7.5',
    unit: 'hrs',
    icon: <Clock className="w-5 h-5" />,
    status: 'normal',
    change: { value: '+0.5', direction: 'up' },
    color: 'text-health-accent',
    bgColor: 'bg-health-accent/10',
  },
  {
    name: 'Temperature',
    value: '36.6',
    unit: '°C',
    icon: <Thermometer className="w-5 h-5" />,
    status: 'normal',
    change: { value: '0', direction: 'same' },
    color: 'text-health-primary',
    bgColor: 'bg-health-primary/10',
  },
  {
    name: 'Hydration',
    value: '2.1',
    unit: 'L',
    icon: <Droplet className="w-5 h-5" />,
    status: 'attention',
    change: { value: '-0.4', direction: 'down' },
    color: 'text-health-warning',
    bgColor: 'bg-health-warning/10',
  },
];

const HealthDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const getChangeIcon = (direction: string) => {
    if (direction === 'up') return <TrendingUp className="w-4 h-4 text-health-accent" />;
    if (direction === 'down') return <TrendingDown className="w-4 h-4 text-health-success" />;
    return null;
  };
  
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Health Dashboard</h1>
        <p className="text-gray-600">Track and monitor your vital health metrics in real-time</p>
      </div>
      
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-between items-center mb-6">
          <TabsList className="bg-gray-100">
            <TabsTrigger value="overview" className="data-[state=active]:bg-health-primary data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="heart" className="data-[state=active]:bg-health-primary data-[state=active]:text-white">
              Heart Rate
            </TabsTrigger>
            <TabsTrigger value="blood-pressure" className="data-[state=active]:bg-health-primary data-[state=active]:text-white">
              Blood Pressure
            </TabsTrigger>
            <TabsTrigger value="sleep" className="data-[state=active]:bg-health-primary data-[state=active]:text-white">
              Sleep
            </TabsTrigger>
            <TabsTrigger value="weight" className="data-[state=active]:bg-health-primary data-[state=active]:text-white">
              Weight
            </TabsTrigger>
          </TabsList>
          
          <Button className="bg-health-primary hover:bg-health-primary/90">
            <PlusCircle className="w-4 h-4 mr-2" />
            <span>Add Data</span>
          </Button>
        </div>
        
        <TabsContent value="overview" className="mt-0 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {quickStats.map((stat, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 ${stat.bgColor} rounded-full flex items-center justify-center ${stat.color}`}>
                      {stat.icon}
                    </div>
                    <div className="ml-3">
                      <h3 className="font-medium">{stat.name}</h3>
                      <div className="flex items-baseline">
                        <span className="text-2xl font-bold">{stat.value}</span>
                        <span className="text-sm text-gray-500 ml-1">{stat.unit}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center text-sm">
                    {getChangeIcon(stat.change.direction)}
                    <span className="ml-1">{stat.change.value}</span>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Status</span>
                    <span className={`text-sm font-medium ${
                      stat.status === 'normal' ? 'text-health-success' :
                      stat.status === 'attention' ? 'text-health-warning' :
                      stat.status === 'warning' ? 'text-health-error' :
                      'text-health-success'
                    }`}>
                      {stat.status.charAt(0).toUpperCase() + stat.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Heart Rate Chart */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-health-primary/10 rounded-full flex items-center justify-center text-health-primary">
                    <Heart className="w-5 h-5" />
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium">Heart Rate</h3>
                    <p className="text-sm text-gray-500">Last 7 days</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="text-sm">
                  <BarChart3 className="w-4 h-4 mr-1" />
                  Details
                </Button>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={heartRateData}>
                    <defs>
                      <linearGradient id="heartRateGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0080FF" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#0080FF" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="day" />
                    <YAxis domain={['dataMin - 10', 'dataMax + 10']} />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#0080FF" 
                      fill="url(#heartRateGradient)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Blood Pressure Chart */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-health-success/10 rounded-full flex items-center justify-center text-health-success">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium">Blood Pressure</h3>
                    <p className="text-sm text-gray-500">Last 7 days</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="text-sm">
                  <BarChart3 className="w-4 h-4 mr-1" />
                  Details
                </Button>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={bloodPressureData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="day" />
                    <YAxis domain={[60, 140]} />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="systolic" 
                      stroke="#FF5C00" 
                      strokeWidth={2}
                      dot={{ strokeWidth: 2 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="diastolic" 
                      stroke="#00C853" 
                      strokeWidth={2}
                      dot={{ strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="heart" className="mt-0 animate-fade-in">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-health-primary/10 rounded-full flex items-center justify-center text-health-primary">
                <Heart className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-bold">Heart Rate Details</h2>
                <p className="text-gray-600">Detailed view of your heart rate measurements</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Average</h3>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold">74</span>
                  <span className="ml-1 text-gray-500">bpm</span>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Minimum</h3>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold">65</span>
                  <span className="ml-1 text-gray-500">bpm</span>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Maximum</h3>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold">88</span>
                  <span className="ml-1 text-gray-500">bpm</span>
                </div>
              </div>
            </div>
            
            <div className="h-80 mb-8">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={heartRateData}>
                  <defs>
                    <linearGradient id="heartDetailGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0080FF" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#0080FF" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="day" />
                  <YAxis domain={[60, 100]} />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="max" 
                    stroke="#0080FF" 
                    fill="url(#heartDetailGradient)"
                    strokeWidth={1}
                    strokeDasharray="3 3"
                    strokeOpacity={0.6}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="min" 
                    stroke="#0080FF" 
                    fill="none"
                    strokeWidth={1}
                    strokeDasharray="3 3"
                    strokeOpacity={0.6}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#0080FF" 
                    fill="none"
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            <div className="bg-health-primary/5 rounded-xl p-4 border border-health-primary/10">
              <h3 className="font-medium mb-2">Health Insights</h3>
              <p className="text-gray-700 text-sm">
                Your heart rate is within the normal range. Regular physical activity can help maintain a healthy heart rate. Consider moderate aerobic exercises like walking, swimming, or cycling.
              </p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="blood-pressure" className="mt-0 animate-fade-in">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-health-success/10 rounded-full flex items-center justify-center text-health-success">
                <Activity className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-bold">Blood Pressure Details</h2>
                <p className="text-gray-600">Detailed view of your blood pressure measurements</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Current</h3>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold">120/80</span>
                  <span className="ml-1 text-gray-500">mmHg</span>
                </div>
                <span className="text-sm text-health-success mt-1 inline-block">Normal</span>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Average (7 days)</h3>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold">119/79</span>
                  <span className="ml-1 text-gray-500">mmHg</span>
                </div>
                <span className="text-sm text-health-success mt-1 inline-block">Normal</span>
              </div>
            </div>
            
            <div className="h-80 mb-8">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={bloodPressureData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="day" />
                  <YAxis domain={[60, 140]} />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="systolic" 
                    name="Systolic"
                    stroke="#FF5C00" 
                    strokeWidth={3}
                    dot={{ r: 4, strokeWidth: 2 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="diastolic" 
                    name="Diastolic"
                    stroke="#00C853" 
                    strokeWidth={3}
                    dot={{ r: 4, strokeWidth: 2 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="bg-health-success/5 rounded-xl p-4 border border-health-success/10">
              <h3 className="font-medium mb-2">Health Insights</h3>
              <p className="text-gray-700 text-sm">
                Your blood pressure readings are within the healthy range. Maintaining a healthy diet low in sodium, regular physical activity, and stress management can help keep your blood pressure at optimal levels.
              </p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="sleep" className="mt-0 animate-fade-in">
          {/* Sleep tab content */}
          {/* Similar structure as heart rate and blood pressure tabs */}
        </TabsContent>
        
        <TabsContent value="weight" className="mt-0 animate-fade-in">
          {/* Weight tab content */}
          {/* Similar structure as heart rate and blood pressure tabs */}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HealthDashboard;
