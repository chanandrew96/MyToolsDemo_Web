import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, } from "@/components/ui/sidebar"
import { ArrowRightLeft, Home, KeyRound, ListCheck } from "lucide-react"

export function AppSidebar() {
    // Menu items.
    const items = [
        {
            title: "Home",
            url: "/",
            icon: Home,
        },
        {
            title: "Base64 Converter",
            url: "/base64converter",
            icon: ArrowRightLeft,
        },
        {
            title: "To-Do List",
            url: "/todo-list",
            icon: ListCheck,
        },
        {
            title: "Login",
            url: "/login",
            icon: KeyRound,
        }
    ]
    return (
        <Sidebar>
            <SidebarHeader />
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Image Processing Tools</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}