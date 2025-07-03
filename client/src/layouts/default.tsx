import { Divider, Link } from '@heroui/react';

import { Navbar } from '@/components/navbar';
import { GithubIcon } from '@/components/icons';

export default function DefaultLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen dishcovery-dark">
      <Navbar />
      <main className="container mx-auto max-w-7xl px-6 pb-6 flex-grow pt-16">
        {children}
      </main>
      <Divider />
      <footer className="w-full flex items-center justify-center py-3">
        <Link
          isExternal
          className="flex items-center gap-1 text-current"
          href="https://github.com/Zetouny"
          title="A. Zetouny Github Profile"
        >
          <span className="text-default-600">
            This web app was created for education purposes
          </span>
          <p className="text-primary">A. Zetouny</p>
          <GithubIcon />
        </Link>
      </footer>
    </div>
  );
}
