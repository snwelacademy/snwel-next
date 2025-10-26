/* eslint-disable @next/next/no-img-element */
import { Course } from "@/types/Course";
import Typography from "@/components/typography";
import { formatToLocalCurrency } from "@/lib/utils";
import EnrollCourseModal from "./EnrollCourseModal";
import { Button } from "../ui/button";
import YouTube from "react-youtube";
import { nanoid } from "nanoid";
import Link from "next/link";
import { Star } from "lucide-react";

const LinkType = ({ linkStyle, name }: { linkStyle: string; name: string }) => {
  if (linkStyle === "text-link")
    return <Button variant={"link"}>{name}</Button>;
  return <Button variant={'outline'}>{name}</Button>;
};

const PrebuiltInfo = ({
  infoKey,
  course,
  variant = "default",
}: {
  infoKey: string;
  course: Course;
  variant?: "default" | "colored";
}) => {
  let component = null;
  switch (infoKey) {
    case "categories":
      component = (
        <div className="flex flex-wrap gap-2">
          {course.categories.map((c) => {
            return (
              <span key={nanoid()} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                {c.title}
              </span>
            );
          })}
        </div>
      );
      break;
    case "lessons":
      component = (
        <Typography as="p" className="text-gray-800 font-semibold text-lg">
          {course.curriculum.length} Lessons
        </Typography>
      );
      break;
    case "duration":
      component = (
        <Typography as="p" className="text-gray-800 font-semibold text-lg">
          {course.courseDuration}
        </Typography>
      );
      break;
    case "price":
      component = (
        <Typography
          as="p"
          className="text-gray-800 font-bold font-mono text-xl"
        >
          {formatToLocalCurrency(course.price)}
        </Typography>
      );
      break;
    case "certificate":
      component = (
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-gray-800 font-medium">Certificate Included</span>
        </div>
      );
      break;
    case "isPremium":
      component = (
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-gray-800 font-medium">Premium Course</span>
        </div>
      );
      break;
    case "rating":
      component = (
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < Math.round(course.rating) 
                ? "text-amber-400 fill-amber-400" 
                : "text-gray-300"
              }`}
              strokeWidth={1.5}
            />
          ))}
          <span className="ml-2 text-sm font-medium text-gray-700">{Number(course.rating || 0).toFixed(1)}</span>
        </div>
      );
      break;
    default:
      component = (
        <Typography as="p" className="font-bold">
          {infoKey}
        </Typography>
      );
      break;
  }
  return component;
};

const VideoPlayer = ({ link }: { link: string }) => {
  return (
    <YouTube
      className="w-full"
      videoId={link}
      iframeClassName="aspect-video w-full"
    />
  );
};

const CourseInfoSidebar = ({ course, variant = "default" }: { course: Course; variant?: "default" | "colored" }) => {
  const isColored = variant === "colored";
  
  return (
    <div className="space-y-3">
      {course.content?.info &&
        course.content.info
          .filter((inf) => inf.isActive)
          .map((info) => {
            return (
              <div key={nanoid()} className="p-4 rounded-lg bg-white/80 backdrop-blur-sm border border-white/20 shadow-sm hover:shadow-md transition-shadow">
                {info.type === "PREBUILT" ? (
                  <div className="space-y-2">
                    <Typography as="p" className="text-sm font-medium text-gray-600 uppercase tracking-wide">{info.lable}</Typography>
                    <div className="text-gray-800">
                      <PrebuiltInfo course={course} infoKey={info.value} variant={variant} />
                    </div>
                  </div>
                ) : info.type === "IMAGE_LINK" ? (
                  <div className="space-y-3">
                    <Typography as="p" className="text-sm font-medium text-gray-600 uppercase tracking-wide">{info.lable}</Typography>
                    <div className="relative group">
                      {info.imageLink ? (
                        <a href={info.imageLink} target="_blank" className="block">
                          <div className="aspect-video overflow-hidden rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                            <img alt="" src={info.value} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                          </div>
                        </a>
                      ) : (
                        <div className="aspect-video overflow-hidden rounded-lg border border-gray-200 shadow-sm">
                          <img alt="" src={info.value} className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                  </div>
                ) : info.type === "VIDEO_LINK" ? (
                  <div className="space-y-3">
                    <Typography as="p" className="text-sm font-medium text-gray-600 uppercase tracking-wide">{info.lable}</Typography>
                    <div className="rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                      <VideoPlayer link={info.value} />
                    </div>
                  </div>
                ) : info.type === "LINK" ? (
                  <div className="space-y-2">
                    <Typography as="p" className="text-sm font-medium text-gray-600 uppercase tracking-wide">{info.lable}</Typography>
                    <div>
                      {info.style?.linkType === "external" ? (
                        <a href={info.value} target="_blank" className="inline-block">
                          <LinkType
                            linkStyle={info.style?.linkStyle || ""}
                            name={info.style?.name || ""}
                          />
                        </a>
                      ) : (
                        <Link href={info.value} className="inline-block">
                          <LinkType
                            linkStyle={info.style?.linkStyle || ""}
                            name={info.style?.name || ""}
                          />
                        </Link>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Typography as="p" className="text-sm font-medium text-gray-600 uppercase tracking-wide">{info.lable}</Typography>
                    <Typography as="p" className="text-gray-800 font-medium">
                      {info.value}
                    </Typography>
                  </div>
                )}
              </div>
            );
          })}
    </div>
  );
};

export default CourseInfoSidebar;
