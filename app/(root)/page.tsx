import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import InterviewCard from '@/components/InterviewCard';
import {dummyInterviews} from "@/constants";

const page = () => {
  return <>
    <section className='card-cta'>

      <div className='flex flex-col gap-6 max-w-lg'>

        <h2>Ace Every Interview - Practice with AI, Succeed in Reality</h2>

        <p className='text-lg'>
          Simulate real interview scenarios, get instant AI feedback, and track your progress over time. <b>It's time to LevelUp ⚡</b>
        </p>

        <Button asChild className='btn-primary max-sm:w-full'>
            <Link href="/interview">
                Simulate an Interview
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
          {/* <p>You havent taken any interviews yet ! </p> */}

          {dummyInterviews.map( (interview) => (
            <InterviewCard {...interview}  key={interview.id}/>
          ))}
        </div>
    </section>

    <section className='flex flex-col gap-6 mt-8'>
        <h2>Take an Interview</h2>

        <div className='interviews-section'>
          {/* <p>There are no interviews available</p> */}

          {dummyInterviews.map( (interview) => (
            <InterviewCard {...interview} key={interview.id}/>
          ))}
        </div>
    </section>


  </>
}

export default page