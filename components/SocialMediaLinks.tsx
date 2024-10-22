import { cn } from "@/lib/utils";
import { InstagramLogoIcon } from "@radix-ui/react-icons";
import { Facebook, Instagram, Linkedin, Twitter, X, Youtube } from "lucide-react";
import { useEffect, useState } from "react";
import { GoogleMyBusinessIcon } from "./custom-icons/GoogleBIcon";

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
            <div className="flex space-x-4">
              {
                links?.facebook &&
                <a href={links?.facebook || "#"} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:scale-110 " aria-label="Facebook">
                <Facebook className="h-6 w-6" />
              </a>
              }
              {
                links?.insta && 
              <a href={links?.insta || "#"} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:scale-110 " aria-label="Instagram">
                <Instagram className="h-6 w-6" />
              </a>
              }
              {
                links.x &&
                <a href={links?.x || "#"} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:scale-110 " aria-label="Twitter">
                  <Twitter className="h-6 w-6" />
                </a>
              }
              {
                links.googleb &&
                <a href={links?.googleb || "#"} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:scale-110 " aria-label="Twitter">
                  <GoogleMyBusinessIcon className="h-6 w-6" />
                </a>
              }

              {
                links?.youtub &&
                <a href={links?.youtube || "#"} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:scale-110 " aria-label="YouTube">
                <Youtube className="h-6 w-6" />
              </a>
              }
              {
                links?.linkedin &&
                <a href={links?.linkedin || "#"} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:scale-110 " aria-label="LinkedIn">
                <Linkedin className="h-6 w-6" />
              </a>
              }
            </div>
        </div>

    )
}