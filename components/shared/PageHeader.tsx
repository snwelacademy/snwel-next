
// import Typography from '../typography'
// import { constants } from '@/config/constants'

// const PageHeader = ({
//   title,
//   subtitle,
//   image
// }: {
//   title: string,
//   image?: string,
//   subtitle?: string
// }) => {
//   return (
//     <div className='relative w-full bg-center bg-cover flex flex-col items-center justify-center  min-h-72' style={{ backgroundImage: `url(${image || constants.imagePath + '/bim.jpg'})` }}>
//       <div className='absolute w-full h-full bg-primary/50 let-0 right-0 top-0 bottom-0  space-y-4'></div>
//       <Typography as="heroTitle" className='text-primary-foreground z-20 max-w-3xl text-center'>{title}</Typography>
//       {
//         subtitle &&
//         <p className='text-xl text-blue-200 max-w-2xl mx-auto mt-4 z-20'>{subtitle}</p>
//       }
//     </div>
//   )
// }

// export default PageHeader



import Typography from '../typography'
import { constants } from '@/config/constants'

const PageHeader = ({
  title,
  subtitle,
  image
}: {
  title: string
  image?: string
  subtitle?: string
}) => {
  return (
    <div
      className="relative w-full bg-cover bg-no-repeat flex flex-col items-center justify-center min-h-72"
      style={{
        backgroundImage: `url(${image || constants.imagePath + '/bim.jpg'})`,
        backgroundPosition: 'center 30%' // 👈 IMAGE NICHE AAYEGI
      }}
    >
      <div className="absolute inset-0 bg-primary/50"></div>

      <Typography
        as="heroTitle"
        className="text-primary-foreground z-20 max-w-3xl text-center"
      >
        {title}
      </Typography>

      {subtitle && (
        <p className="text-xl text-blue-200 max-w-2xl mx-auto mt-4 z-20">
          {subtitle}
        </p>
      )}
    </div>
  )
}

export default PageHeader
