/* eslint-disable @next/next/no-img-element */
import { Course } from "@/types/Course";
import Typography from "@/components/typography";
import { formatToLocalCurrency } from "@/lib/utils";
import EnrollCourseModal from "./EnrollCourseModal";
import { Button } from "../ui/button";
import YouTube from "react-youtube";
import { nanoid } from "nanoid";
import Link from "next/link";

const LinkType = ({ linkStyle, name }: { linkStyle: string; name: string }) => {
  if (linkStyle === "text-link")
    return <Button variant={"link"}>{name}</Button>;
  return <Button variant={'outline'}>{name}</Button>;
};

const PrebuiltInfo = ({
  infoKey,
  course,
}: {
  infoKey: string;
  course: Course;
}) => {
  let component = null;
  switch (infoKey) {
    case "categories":
      component = (
        <>
          {course.categories.map((c) => {
            return (
              <Typography key={nanoid()} as="p" className="font-bold">
                {c.title}
              </Typography>
            );
          })}
        </>
      );
      break;
    case "lessons":
      component = (
        <Typography as="p" className="font-bold">
          {course.curriculum.length}
        </Typography>
      );
      break;
    case "duration":
      component = (
        <Typography as="p" className="font-bold">
          {course.courseDuration}
        </Typography>
      );
      break;
    case "price":
      component = (
        <Typography
          as="p"
          className="font-bold text-orange-500 font-mono text-lg"
        >
          {formatToLocalCurrency(course.price)}
        </Typography>
      );
      break;
    case "certificate":
      component = <img alt="" className="w-6" src={"/assets/images/check.png"} />;
      break;
    case "isPremium":
      component = <img alt="" className="w-6" src={"/assets/images/work.png"} />;
      break;
    case "rating":
      component = (
        <Typography as="p" className="font-bold">
          {course.rating}
        </Typography>
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

const CourseInfoSidebar = ({ course }: { course: Course }) => {
  return (
    <div className="shadow p-2 md:p-4 rounded-xl">
      <div className="grid grid-cols-1 gap-2">
        {course.content?.info &&
          course.content.info
            .filter((inf) => inf.isActive)
            .map((info) => {
              return (
                <div key={nanoid()} className=" gap-2 border-b py-3">
                  {info.type === "PREBUILT" ? (
                    <div className="flex items-center gap-2">
                      <Typography as="p">{info.lable}:</Typography>
                      <PrebuiltInfo course={course} infoKey={info.value} />
                    </div>
                  ) : info.type === "IMAGE_LINK" ? (
                    <div className="space-y-3">
                      <Typography as="p">{info.lable}:</Typography>
                      {
                        info.imageLink ?
                          <a href={info.imageLink} target="_blank" className="block">
                            <div className="aspect-video overflow-hidden">
                              <img alt="" src={info.value} className="max-w-full " />
                            </div>
                          </a>
                          : <div className="aspect-video overflow-hidden">
                          <img alt="" src={info.value} className="max-w-full " />
                        </div>
                      }
                    </div>
                  ) : info.type === "VIDEO_LINK" ? (
                    <div className="space-y-3 max-w-full overflow-hidden">
                      <Typography as="p">{info.lable}:</Typography>
                      <VideoPlayer link={info.value} />
                    </div>
                  ) : info.type === "LINK" ? (
                    <div className="flex items-center gap-2 border-b py-3">
                      <Typography as="p">{info.lable}:</Typography>
                      {info.style?.linkType === "external" ? (
                        <>
                          <a href={info.value} target="_blank">
                            <LinkType
                              linkStyle={info.style?.linkStyle || ""}
                              name={info.style?.name || ""}
                            />
                          </a>
                        </>
                      ) : (
                        <Link href={info.value}>
                          <LinkType
                            linkStyle={info.style?.linkStyle || ""}
                            name={info.style?.name || ""}
                          />
                        </Link>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 border-b py-3">
                      <Typography as="p">{info.lable}:</Typography>
                      <Typography as="p" className="font-bold">
                        {info.value}
                      </Typography>
                    </div>
                  )}
                </div>
              );
            })}
      </div>
      {/* <div className='flex items-center gap-2 border-b py-3' >
                <Typography as="p">Lessons: </Typography>
                <div className='flex flex-wrap '>
                    <Typography as="p" className='font-bold'>{course.curriculum.length}</Typography>
                </div>
            </div>
            <div className='flex items-center gap-2 border-b py-3' >
                <Typography as="p">Duration: </Typography>
                <div className='flex flex-wrap '>
                    <Typography as="p" className='font-bold'>{course.courseDuration}</Typography>
                </div>
            </div>

            <div className='flex items-center gap-2 border-b py-3' >
                <Typography as="p">Price: </Typography>
                <div className='flex flex-wrap '>
                    <Typography as="p" className='font-bold text-orange-500 font-mono text-lg'>{formatToLocalCurrency(course.price)}</Typography>
                </div>
            </div>

            {
                course.certificate &&
                <div className='flex items-center gap-2 border-b py-3' >
                    <Typography as="p">Certificate: </Typography>
                    <div className='flex flex-wrap '>
                        <img className='w-6' src={"/assets/images/check.png"} />
                    </div>
                </div>
            }

            {
                course.isPremium &&
                <div className='flex items-center gap-2 border-b py-3' >
                    <Typography as="p">Job Guarantee: </Typography>
                    <div className='flex flex-wrap '>
                        <img className='w-6' src={"/assets/images/work.png"} />
                    </div>
                </div>
            } */}
      <div className="flex items-center gap-2  py-3">
        <EnrollCourseModal
          trigger={<Button className="w-full">Enroll Now</Button>}
          courseId={course._id}
        />
      </div>
    </div>
  );
};

export default CourseInfoSidebar;
