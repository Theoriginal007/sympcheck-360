
# HealthSphere - Healthcare Web Application

## Overview
HealthSphere is a comprehensive healthcare web application designed to connect users with medical professionals through virtual consultations. It offers features such as symptom checking, health dashboard monitoring, educational resources, and virtual consultation bookings.

## Project Structure
The project is structured as follows:

```
src/
├── components/      # Reusable UI components
│   ├── consultations/     # Components for consultation booking
│   ├── health-dashboard/  # Components for health monitoring dashboard
│   ├── home/              # Components for the home page
│   ├── layout/            # Layout components like Header and Footer
│   ├── symptom-checker/   # Components for symptom assessment
│   └── ui/                # UI components from shadcn/ui library
├── hooks/           # Custom React hooks
├── lib/             # Utility functions and libraries
├── pages/           # Main page components for routing
└── main.tsx         # Application entry point
```

## Pages

### Home Page (`/pages/Index.tsx`)
- Landing page displaying main features of the application
- Contains hero section, feature highlights, statistics, and testimonials
- Provides navigation to other sections of the application

### Symptom Checker (`/pages/SymptomChecker.tsx`)
- Allows users to input symptoms and receive potential causes
- Provides recommendations for next steps based on symptom assessment
- User-friendly interface with guided symptom selection

### Health Dashboard (`/pages/Dashboard.tsx`)
- Displays user's health metrics and statistics
- Shows historical health data and trends
- Provides personalized health insights and recommendations

### Consultations (`/pages/Consultations.tsx`)
- Enables booking virtual consultations with healthcare providers
- Offers video, audio, and text consultation options
- Includes doctor selection, scheduling, and booking confirmation

### Education (`/pages/Education.tsx`)
- Provides health education resources and articles
- Offers downloadable content on various health topics
- Organizes content by categories for easy navigation

### Authentication Pages
- Sign In (`/pages/SignIn.tsx`): User login functionality
- Get Started (`/pages/GetStarted.tsx`): New user registration

## Key Components

### Layout Components
- `Header`: Navigation bar with links to main sections
- `Footer`: Contains site information, links, and copyright

### Consultation Components
- `ConsultationTypes`: Displays consultation options (video, audio, text)
- `DoctorCard`: Shows doctor information and selection functionality
- `TimeSlotPicker`: Interface for selecting appointment times
- `BookingForm`: Multi-step form for scheduling appointments
- `BookingConfirmation`: Displays booking details after successful scheduling

### Dashboard Components
- `HealthDashboard`: Main dashboard displaying health metrics
- Contains various charts and statistics visualizing health data

### Symptom Checker Components
- `SymptomChecker`: Interactive symptom assessment tool
- Provides automated analysis of potential conditions

## Technologies Used

### Frontend
- React: JavaScript library for building user interfaces
- TypeScript: Static type-checking for JavaScript
- Tailwind CSS: Utility-first CSS framework for styling
- Vite: Frontend build tool for fast development
- React Router: Library for routing and navigation

### UI Components
- shadcn/ui: Component library for consistent UI elements
- Lucide React: Icon library for visual elements
- Recharts: Chart library for data visualization

### Form Management
- React Hook Form: Library for form validation and handling

### State Management
- React Query (@tanstack/react-query): Data-fetching and state management

## Getting Started

### Prerequisites
- Node.js (v14 or later)
- npm or yarn package manager

### Installation
1. Clone the repository
```sh
git clone <repository-url>
cd healthsphere
```

2. Install dependencies
```sh
npm install
```

3. Start the development server
```sh
npm run dev
```

4. Open your browser and navigate to http://localhost:8080

## Making Changes

### Adding New Pages
1. Create a new component in the `/pages` directory
2. Add the route in `App.tsx` under the appropriate section
3. Add navigation links in the Header or other navigation areas

### Adding New Components
1. Create components in the appropriate subdirectory under `/components`
2. Keep components small and focused on a single responsibility
3. Use TypeScript interfaces for props to ensure type safety

### Styling
- Use Tailwind CSS classes for styling
- Maintain consistent styling with the existing design system
- Use shadcn/ui components where possible for consistency

## Deployment
The application can be deployed to various hosting platforms:

1. Build the production version:
```sh
npm run build
```

2. The built files will be in the `dist/` directory, ready for deployment

## Contributing
1. Create a feature branch from `main`
2. Make your changes
3. Submit a pull request with a clear description of the changes

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments
- shadcn/ui for the component library
- Tailwind CSS for the styling framework
- React and related libraries for the development framework
