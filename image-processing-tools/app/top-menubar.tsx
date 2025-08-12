import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ArrowRightLeft, Home } from "lucide-react"

export function TopMenuBar() {
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
        }
    ]
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <SidebarTrigger />
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <NavigationMenuLink>Link</NavigationMenuLink>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}