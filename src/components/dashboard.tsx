import { BronzeLayer } from "@/components/bronze-layer";
import { Auth } from "./auth";
import { SidebarProvider, Sidebar, SidebarTrigger, SidebarContent, SidebarHeader, SidebarMenu, SidebarFooter, SidebarInset, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { GalacticaIcon, BronzeIcon, SilverIcon, GoldIcon } from "@/components/icons";
import { Separator } from "@/components/ui/separator";
import { PipelineStepper } from "@/components/pipeline-stepper";

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
                <SidebarMenuButton tooltip="Bronze Layer" isActive>
                  <BronzeIcon />
                  <span>Bronze Layer</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Silver Layer">
                  <SilverIcon />
                  <span>Silver Layer</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Gold Layer">
                  <GoldIcon />
                  <span>Gold Layer</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
           {/* Auth component moved to the header */}
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
          <Auth />
        </header>
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <PipelineStepper currentStep="Bronze" />
            <div className="mt-8">
              <BronzeLayer />
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
