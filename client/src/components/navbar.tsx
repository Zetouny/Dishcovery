import { Link } from '@heroui/react';
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem
} from '@heroui/navbar';

import { ThemeSwitch } from '@/components/theme-switch';
import { Logo } from '@/components/icons';
import UserAuth from '@/components/UserAuth';

export const Navbar = () => {
  return (
    <HeroUINavbar isBordered maxWidth="xl" position="sticky">
      <NavbarContent className="basis-3/4 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <Link
            className="flex justify-start items-center gap-1"
            color="foreground"
            href="/"
          >
            <Logo />
            <p className="font-bold text-lg ml-2 text-inherit hover:text-primary transition">
              DISHCOVERY
            </p>
          </Link>
        </NavbarBrand>

        {/* <div className="hidden sm:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <Link
                className={clsx(
                  linkStyles({ color: 'foreground' }),
                  'data-[active=true]:text-primary data-[active=true]:font-medium'
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </Link>
            </NavbarItem>
          ))}
        </div> */}
      </NavbarContent>

      <NavbarContent className="basis-1/4" justify="end">
        {/* <div className="sm:hidden">
          <NavbarMenuToggle />
        </div> */}
        <NavbarItem className="flex">
          <ThemeSwitch />
        </NavbarItem>

        {/* {user && (
          <NavbarItem className="flex">
            <NavLink to={'/favorites'}>
              <HeartFilledIcon />
            </NavLink>
          </NavbarItem>
        )} */}

        <NavbarItem className="flex">
          <UserAuth />
        </NavbarItem>
      </NavbarContent>

      {/* <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link color={'foreground'} href="#" size="lg">
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu> */}
    </HeroUINavbar>
  );
};
