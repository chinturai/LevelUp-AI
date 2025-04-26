import React, { ReactNode } from 'react'
import Link from "next/link";
import Image from "next/image";
import { isAuthenticated, signOut } from '@/lib/actions/auth.action';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';

const RootLayout = async ( { children } : { children : ReactNode} ) => {

  const isUserAuthenticated = await isAuthenticated();
  if(!isUserAuthenticated) redirect("/sign-in");

  return (
    <div className='root-layout'>
      <nav className="flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="LevelUp AI Logo" width={38} height={32} />
          <h2 className="text-primary-100">LevelUp AI ⚡</h2>
        </Link>
        <form action={async () => {
          'use server';
          await signOut();
          redirect('/sign-in');
        }}>
          <Button type="submit" className="text-black hover:text-primary-50 transition-all">
            Logout
          </Button>
        </form>
      </nav>
      {children}
    </div>
  )
}

export default RootLayout