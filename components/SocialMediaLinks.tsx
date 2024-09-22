import { cn } from "@/lib/utils";
import { InstagramLogoIcon } from "@radix-ui/react-icons";
import { Facebook, Instagram, Linkedin, Twitter, X, Youtube } from "lucide-react";
import { useEffect, useState } from "react";

type LinkData = {
    facebook?: string,
    insta?: string,
    x?: string,
    youtube?: string,
    linkedIn?: string,
}

const supportedLink = ['facebook', 'insta', 'x', 'youtube', 'linkedIn'];
export const SocialMediaLinks = ({ links, hideLable = false, className }: { links: Record<string, string>, hideLable?: boolean, className?: string }) => {
    const [linksData, setLinksData] = useState<LinkData>()
    const prepare = () => {
        const linkData: LinkData = {}
        if(!links) return linkData;
        Object.entries(links).map(([key, value]) => {
            if ( supportedLink.includes(key) && Boolean(value)) {
                linkData[key as keyof LinkData] = value
            }
        });
        return linkData;
    }

    useEffect(() => {
       const res = prepare();
       
       setLinksData(res)
    }, [links])
    return (

        <div className={cn([
            "flex justify-center space-x-4",
            className
        ])}>
            {
                linksData?.facebook &&
                <a href={linksData.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                    <Facebook className="h-8 w-8" />
                    {
                        !hideLable && <span className="sr-only">Facebook</span>
                    }
                </a>
            }
            {
                linksData?.x &&
                <a href={linksData.x} target="_blank" rel="noopener noreferrer" className="text-black ">
                    <X className="h-8 w-8" />
                    <span className="sr-only">Twitter</span>
                </a>
            }
            {
                linksData?.insta &&
                <a href={linksData.insta} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800">
                    <InstagramLogoIcon className="h-8 w-8" />
                    {
                        !hideLable && <span className="sr-only">Instagram</span>
                    }
                </a>
            }
            {
                linksData?.linkedIn &&
                <a href={linksData.linkedIn} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900">
                    <Linkedin className="h-8 w-8" />
                    {
                        !hideLable && <span className="sr-only">LinkedIn</span>
                    }
                </a>
            }
            {
                linksData?.youtube &&
                <a href={linksData.youtube} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-800">
                    <Youtube className="h-8 w-8" />
                    {
                        !hideLable && <span className="sr-only">YouTube</span>
                    }
                </a>
            }
        </div>

    )
}