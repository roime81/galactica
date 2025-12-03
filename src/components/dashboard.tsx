import { BronzeLayer } from "@/components/bronze-layer";
import { Auth } from "./auth";
import { SidebarProvider, Sidebar, SidebarTrigger, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, SidebarFooter } from "@/components/ui/sidebar";
import { GalacticaIcon, BronzeIcon, SilverIcon, GoldIcon } from "@/components/icons";
import { Separator } from "@/components/ui/separator";

export function Dashboard() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
             <GalacticaIcon className="w-7 h-7 text-primary" />
             <h1 className="text-xl font-semibold">Galactica</h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive>
                <BronzeIcon className="w-5 h-5" />
                Bronze Layer
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <SilverIcon className="w-5 h-5" />
                Silver Layer
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <GoldIcon className="w-5 h-5" />
                Gold Layer
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
           <Auth />
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
         <header className="flex justify-between items-center p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <Separator orientation="vertical" className="h-6" />
            <div>
              <span className="text-sm text-muted-foreground">Pipeline > </span>
              <span className="text-sm font-medium">BRONZE Layer</span>
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mt-8">
              <BronzeLayer />
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
