import CourseCurriculum from "@/components/courses/CourseCurriculum";
import React from "react";

export const PrebuiltComponent: Record<string, {component: React.ElementType, label: string}> = {
    'courseCurricullum': {
        component: CourseCurriculum,
        label: "Curricullum"
    }
}