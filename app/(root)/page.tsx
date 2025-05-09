import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import InterviewCard from '@/components/InterviewCard';
import { dummyInterviews } from "@/constants";
import { getCurrentUser } from '@/lib/actions/auth.action';
import {getInterviewsByUserId, getLatestInterviews } from '@/lib/actions/general.action';

const page = async () => {

  const user = await getCurrentUser();

  //Parallel Request Fetching 
  const [userInterviews, latestInterviews] = await Promise.all([
    getInterviewsByUserId(user?.id!),
    getLatestInterviews({ userId: user?.id! }),
  ]);

  // Classic Method 
  // const userInterviews = await getInterviewsByUserId(user?.id!);
  // const latestInterviews = await getLatestInterviews( { userId : user?.id!});

  const hasPastInterviews = userInterviews?.length! > 0;
  const hasUpcomingInterviews =  latestInterviews?.length! > 0;

  return <>
    <section className='card-cta'>

      <div className='flex flex-col gap-6 max-w-lg'>

        <h2 className='text-6xl'>Ace Every Interview - Practice with AI, Succeed in Reality</h2>

        <p className='text-lg'>
          Simulate real interview scenarios, get instant AI feedback, and track your progress over time. <b>It's time to LevelUp⚡</b>
        </p>

        <Button asChild className='btn-primary max-sm:w-full'>
          <Link href="/interview">
            Generate an Interview  →
          </Link>
        </Button>

      </div>

      <Image
        src="/hero.png"
        height={400}
        width={400}
        alt='HeroImage'
        className='max-sm:hidden'
      />

    </section>

    <section className='flex flex-col gap-6 mt-8'>
      <h2>Your Interviews</h2>

      <div className='interviews-section'>
        {hasPastInterviews ? (userInterviews?.map((interview) => (
          <InterviewCard {...interview} key={interview.id} />
        ))) : (<p>You havent taken any interviews yet ! </p>)}
      </div>
    </section>

    <section className='flex flex-col gap-6 mt-8'>
      <h2>Take an Interview</h2>
      <p><i>(These are Interviews created by other users)</i></p>

      <div className='interviews-section'>
      {hasUpcomingInterviews ? (latestInterviews?.map((interview) => (
          <InterviewCard {...interview} key={interview.id} />
        ))) : (<h3>There are no new interviews available at the moment. </h3>)}
      </div>
    </section>


  </>
}

export default page