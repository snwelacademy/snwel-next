'use client'

import BreadCrumb from '@/components/BreadCrumb';
import ModernLoader from '@/components/ModernLoader';
import MutateCourse from '@/components/courses/MutateCourse';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useQueryClient } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { changeCourseStatus, getCourse } from '@/services/admin/admin-course-service';
import { cn } from '@/lib/utils';
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
import { useState } from 'react';
import { COURSE_STATUS } from '@/types/Course';

const steps = [
  { id: 1, name: 'Basic Info', icon: FileText, description: 'Course title and description' },
  { id: 2, name: 'Content', icon: GraduationCap, description: 'Curriculum and materials' },
  { id: 3, name: 'Media', icon: ImageIcon, description: 'Images and promotional content' },
  { id: 4, name: 'Settings', icon: Settings, description: 'Pricing and preferences' },
];

const MutateCoursePage = () => {
  const router = useRouter();
  const params = useParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [statusLoading, setStatusLoading] = useState(false);
  const { toast } = useToast();
  const client = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['course', params.id],
    queryFn: () => getCourse(params.id as string),
    enabled: Boolean(params?.id),
  });

  const breadcrumbItems = [{ title: 'Courses', link: '/admin/courses' }];

  const handleStatus = async (status: COURSE_STATUS) => {
    if (!data?._id) return;
    setStatusLoading(true);
    try {
      await changeCourseStatus(data._id, status);
      toast({
        title: 'Success',
        description: status === COURSE_STATUS.SAVED ? 'Course saved as draft.' : 'Course published.',
        variant: 'success'
      });
      client.invalidateQueries({ queryKey: ['course', params.id] });
    } catch (error: any) {
      toast({ title: 'Error', description: error?.message || 'Failed to update status', variant: 'destructive' });
    } finally {
      setStatusLoading(false);
    }
  }

  // Button states and tooltips
  const isSaveDisabled = statusLoading || isLoading || !data || data?.status === COURSE_STATUS.SAVED;
  const isPublishDisabled = statusLoading || isLoading || !data || data?.status === COURSE_STATUS.PUBLISHED;

  const saveTooltip = (() => {
    if (!data) return 'Course not loaded yet';
    if (isLoading) return 'Loading course...';
    if (statusLoading) return 'Updating status...';
    if (data.status === COURSE_STATUS.SAVED) return 'Already saved as draft';
    return 'Save this course as draft';
  })();

  const publishTooltip = (() => {
    if (!data) return 'Course not loaded yet';
    if (isLoading) return 'Loading course...';
    if (statusLoading) return 'Updating status...';
    if (data.status === COURSE_STATUS.PUBLISHED) return 'Already published';
    return 'Publish this course to make it live';
  })();

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
                  {params.id ? 'Update Course' : 'Create Course'}
                </h1>
                <p className="text-muted-foreground mt-1">
                  {params.id ? 'Update this course and manage its content' : 'Build an engaging learning experience for your students'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div title={saveTooltip}>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={() => handleStatus(COURSE_STATUS.SAVED)}
                  disabled={isSaveDisabled}
                >
                  <Save className="h-4 w-4" />
                  Save Draft
                </Button>
              </div>
              <div title={publishTooltip}>
                <Button
                  size="sm"
                  className="gap-2"
                  onClick={() => handleStatus(COURSE_STATUS.PUBLISHED)}
                  disabled={isPublishDisabled}
                >
                  <Send className="h-4 w-4" />
                  Publish
                </Button>
              </div>
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
                        'flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all',
                        currentStep >= step.id
                          ? 'bg-primary border-primary text-primary-foreground'
                          : 'bg-muted border-muted-foreground/30 text-muted-foreground'
                      )}
                    >
                      <step.icon className="h-4 w-4" />
                    </div>
                    <div className="hidden md:block">
                      <p className={cn(
                        'text-sm font-medium',
                        currentStep >= step.id ? 'text-foreground' : 'text-muted-foreground'
                      )}>
                        {step.name}
                      </p>
                      <p className="text-xs text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                  {idx < steps.length - 1 && (
                    <div
                      className={cn(
                        'flex-1 h-0.5 mx-4 transition-all',
                        currentStep > step.id ? 'bg-primary' : 'bg-muted'
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
        {isLoading && (
          <Card>
            <CardContent className="py-10">
              <ModernLoader variant={'default'} />
            </CardContent>
          </Card>
        )}

        {!isLoading && isError && (
          <Card>
            <CardContent className="py-10 text-destructive">Failed to load course.</CardContent>
          </Card>
        )}

        {!isLoading && !isError && !data && (
          <Card>
            <CardContent className="py-10">Invalid Course</CardContent>
          </Card>
        )}

        {!isLoading && data && (
          <MutateCourse courseData={data} currentStep={currentStep} setCurrentStep={setCurrentStep} />
        )}
      </div>
    </div>
  )
}

export default MutateCoursePage