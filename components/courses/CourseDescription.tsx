
const CourseDescription = ({
    desc
}: {
    desc?: string
}) => {
  return (
    <article className="prose">
      <div dangerouslySetInnerHTML={{__html: desc||"No Description"}}></div>
    </article>
  )
}

export default CourseDescription