
// import { cn } from "@/lib/utils";
import Link from "next/link";
import { UserNav } from "./user-nav";


export default function Header() {
  return (
    <div className="fixed top-0 left-0 right-0 supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur z-20">
      <nav className="h-14 flex items-center justify-between px-4">
        <div className="hidden lg:block">
          <Link
            href={"/"}
            target="_blank"
            className="w-[50px]"
          >
            <span className='inline-block text-3xl font-bold text-primary rounded-full'>
              <img className="w-[120px] md:w-[120px]" src="/assets/images/logo.png" />
            </span>
          </Link>
        </div>
        {/* <div className={cn("block lg:!hidden")}>
          <MobileSidebar />
        </div> */}

        <div className="flex items-center gap-2">
          <UserNav />
          {/* <ThemeToggle /> */}
        </div>
      </nav>
    </div>
  );
}