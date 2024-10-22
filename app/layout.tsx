import type { Metadata } from "next";
import "./globals.css";
import AppProviders from "@/components/AppProviders";
import { getSession } from "@/lib/auth";
import { fetchAllSettings } from "@/services/admin/setting-service";
import {  SETTINGS } from "@/types/Setting";
import { GeistSans } from 'geist/font/sans'
import { getAllIntegrations } from "@/services/admin/admin-integration";




export async function generateMetadata(): Promise<Metadata> {
  let settings = await fetchAllSettings();
  const defaultSitename = "SNWel Academy";
  const defaultDesc =  "At SNWEL Academy' we go beyond traditional training methods by focusing on knowledge and skill-based learning that aligns with real-world career goals.";
  if (!settings.success) {
    return {
      title: defaultSitename,
      description: defaultDesc
    }
  }
  const generalSetting = settings.data?.docs.find(dt => dt.code === SETTINGS.GENERAL);
  return {
    title: generalSetting?.data.siteName||defaultSitename,
    description: defaultDesc
  }
}


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  const settings = await fetchAllSettings();
  const integrations = await getAllIntegrations()
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <AppProviders data={{
          settings: settings.data?.docs||[]
        }} session={session}>
          <div>{children}</div>
        </AppProviders>
      </body>
    </html>
  );
}
