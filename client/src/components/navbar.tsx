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
      </NavbarContent>

      <NavbarContent className="basis-1/4" justify="end">
        <NavbarItem className="flex">
          <ThemeSwitch />
        </NavbarItem>

        <NavbarItem className="flex">
          <UserAuth />
        </NavbarItem>
      </NavbarContent>
    </HeroUINavbar>
  );
};
