'use client';

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenuSub,
  SidebarMenuSubButton,
} from '@/components/ui/sidebar';
import { useAuth } from '@/hooks/use-auth';
import {
  LayoutDashboard,
  Code,
  LineChart,
  Users,
  CreditCard,
  FileText,
  Wrench,
  Book,
  Settings,
  ShieldQuestion,
  Loader2,
  Leaf,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserNav } from './user-nav';

const navItems = [
  { href: '/dashboard', icon: <LayoutDashboard />, label: 'Dashboard' },
];

const apiNav = [
    { href: '/api/fields', icon: <Code />, label: 'API Response Fields' },
    { href: '/api/analytics', icon: <LineChart />, label: 'Analytics' },
]

const accountsNav = [
    { href: '/accounts/plan', icon: <CreditCard />, label: 'Change Plan' },
    { href: '/accounts/payment', icon: <Wrench />, label: 'Payment Method' },
    { href: '/accounts/billing', icon: <FileText />, label: 'Billing' },
]

const toolsNav = [
    { href: '/tools/explorer', icon: <Book />, label: 'API Explorer' },
    { href: '/tools/swagger', icon: <Book />, label: 'Swagger Tool' },
]


export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, loading } = useAuth();

  if (loading || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const getPageTitle = () => {
    const allNavs = [...navItems, ...apiNav, ...accountsNav, ...toolsNav, { href: '/settings', label: 'Settings' }];
    return allNavs.find(item => pathname.startsWith(item.href))?.label || 'Dashboard';
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Leaf className="h-8 w-8 text-primary" />
            <span className="font-bold text-lg font-headline group-data-[collapsible=icon]:hidden">
              API Dashboard
            </span>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={{ children: item.label }}
                >
                  <Link href={item.href}>
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}

            <SidebarGroup>
                <SidebarGroupLabel>API</SidebarGroupLabel>
                {apiNav.map(item => (
                    <SidebarMenuItem key={item.href}>
                        <SidebarMenuButton asChild isActive={pathname.startsWith(item.href)} tooltip={{children: item.label}}>
                            <Link href={item.href}>{item.icon}<span>{item.label}</span></Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarGroup>
            
            <SidebarGroup>
                <SidebarGroupLabel>Accounts</SidebarGroupLabel>
                {accountsNav.map(item => (
                    <SidebarMenuItem key={item.href}>
                        <SidebarMenuButton asChild isActive={pathname.startsWith(item.href)} tooltip={{children: item.label}}>
                            <Link href={item.href}>{item.icon}<span>{item.label}</span></Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarGroup>

            <SidebarGroup>
                <SidebarGroupLabel>Tools</SidebarGroupLabel>
                {toolsNav.map(item => (
                    <SidebarMenuItem key={item.href}>
                        <SidebarMenuButton asChild isActive={pathname.startsWith(item.href)} tooltip={{children: item.label}}>
                            <Link href={item.href}>{item.icon}<span>{item.label}</span></Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarGroup>

            <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname.startsWith('/settings')} tooltip={{children: 'Settings'}}>
                    <Link href="/settings"><Settings /><span>Settings</span></Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname.startsWith('/support')} tooltip={{children: 'Support'}}>
                    <Link href="/support"><ShieldQuestion /><span>Support</span></Link>
                </SidebarMenuButton>
            </SidebarMenuItem>

          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 items-center justify-between border-b px-6">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="md:hidden" />
            <h2 className="text-xl font-semibold font-headline">
              {getPageTitle()}
            </h2>
          </div>
          <UserNav user={user} />
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
