const CourseDescription = ({
  desc
}: {
  desc?: string
}) => {
  return (
    <article className="prose prose-p:my-1 prose-headings:my-2 max-w-none">
      <div dangerouslySetInnerHTML={{ __html: desc || "No Description" }}></div>
    </article>
  )
}

export default CourseDescription