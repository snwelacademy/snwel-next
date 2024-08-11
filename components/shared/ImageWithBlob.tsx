import { cn } from '@/lib/utils'

const ImageWithBlob = ({
    image,
    className
}: { image: string, className?: string, svgClassName?: string }) => {
    return (
        <div className={cn([
            'aspect-square relative z-20',
            className
        ])}>
            <div className='absolute top-0 left-0 right-0 bottom-0 w-full -z-10 '>
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path className='fill-gradient' d="M33,-39.9C43.2,-30.8,52.3,-20.8,58.9,-6.9C65.4,6.9,69.4,24.6,63,37C56.6,49.4,39.9,56.4,24,59.4C8.1,62.3,-6.8,61.1,-24.7,58.6C-42.6,56.1,-63.4,52.4,-72.1,40.3C-80.7,28.1,-77.1,7.6,-73.3,-12.8C-69.5,-33.1,-65.6,-53.3,-53.4,-62.1C-41.1,-70.9,-20.6,-68.2,-4.6,-62.8C11.4,-57.3,22.8,-49,33,-39.9Z" transform="translate(100 100)" />
                </svg>
            </div>
            <div>
                <img src={image} />
            </div>

        </div>
    )
}

export default ImageWithBlob