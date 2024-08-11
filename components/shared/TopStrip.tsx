import Typography from "../typography"

const TopStrip = () => {
  return (
    <div className='flex items-center bg-primary justify-center text-primary-foreground py-2'>
        <Typography as="label" className="text-xs md:text-base">Want to launch innovative new courses –  <span className='underline'>We’ll Show You.</span></Typography>
    </div>
  )
}

export default TopStrip