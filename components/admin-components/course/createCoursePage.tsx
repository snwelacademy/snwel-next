'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import BreadCrumb from '@/components/BreadCrumb';
import MutateCourse from '@/components/courses/MutateCourse';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  GraduationCap, 
  FileText, 
  Image as ImageIcon, 
  Settings, 
  Eye,
  ArrowLeft,
  Save,
  Send
} from 'lucide-react';
import { cn } from '@/lib/utils';

const steps = [
  { id: 1, name: 'Basic Info', icon: FileText, description: 'Course title and description' },
  { id: 2, name: 'Content', icon: GraduationCap, description: 'Curriculum and materials' },
  { id: 3, name: 'Media', icon: ImageIcon, description: 'Images and promotional content' },
  { id: 4, name: 'Settings', icon: Settings, description: 'Pricing and preferences' },
];

const CreateNewCoursePage = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const breadcrumbItems = [{ title: "Courses", link: "/admin/courses" }];
    
  return (
    <div className="min-h-screen bg-muted/20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b">
        <div className="container mx-auto px-4 md:px-8 py-4">
          <BreadCrumb items={breadcrumbItems} />
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.back()}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <GraduationCap className="h-6 w-6 text-primary" />
                  </div>
                  Create New Course
                </h1>
                <p className="text-muted-foreground mt-1">
                  Build an engaging learning experience for your students
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Eye className="h-4 w-4" />
                Preview
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Save className="h-4 w-4" />
                Save Draft
              </Button>
              <Button size="sm" className="gap-2">
                <Send className="h-4 w-4" />
                Publish
              </Button>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="mt-6">
            <div className="flex items-center justify-between">
              {steps.map((step, idx) => (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all",
                        currentStep >= step.id
                          ? "bg-primary border-primary text-primary-foreground"
                          : "bg-muted border-muted-foreground/30 text-muted-foreground"
                      )}
                    >
                      <step.icon className="h-4 w-4" />
                    </div>
                    <div className="hidden md:block">
                      <p className={cn(
                        "text-sm font-medium",
                        currentStep >= step.id ? "text-foreground" : "text-muted-foreground"
                      )}>
                        {step.name}
                      </p>
                      <p className="text-xs text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                  {idx < steps.length - 1 && (
                    <div
                      className={cn(
                        "flex-1 h-0.5 mx-4 transition-all",
                        currentStep > step.id ? "bg-primary" : "bg-muted"
                      )}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-8 py-6">
        <MutateCourse currentStep={currentStep} setCurrentStep={setCurrentStep} />
      </div>
    </div>
  )
}

export default CreateNewCoursePage