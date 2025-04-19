import React from 'react'
import Image from 'next/image';
import { cn } from "@/lib/utils"

enum CallStatus {
    INACTIVE = "INACTIVE",
    CONNECTING = "CONNECTING",
    ACTIVE = "ACTIVE",
    FINISHED = "FINISHED",
}

const Agent = ({ userName }: AgentProps) => {

    const callStatus = CallStatus.ACTIVE;

    const isSpeaking = true;

    const messages = [
        'Hello! Whats your name ?',
        'Hi! My name is Chintu Rai'
    ]

    const lastMessage = messages[messages.length - 1];

    return (
        <>

            {/* Call User Cards (Interviewer and User) */}
            <div className='call-view'>

                {/* Interviewer Card */}
                <div className='card-interviewer'>

                    <div className='avatar'>
                        <Image
                            src="/ai-avatar.png"
                            alt='AI-Interviewer-Avatar-Pic'
                            width={65}
                            height={54}
                            className='object-cover'
                        />

                        {isSpeaking && <span className='animate-speak' />}

                    </div>

                    <h3>Rai - Your AI Interviewer </h3>
                </div>

                {/* User Card */}
                <div className='card-border'>
                    <div className='card-content'>
                        <Image
                            src='/pfpNew.jpg'
                            alt='user-avatar-pic'
                            height={540}
                            width={540}
                            className='rounded-full object-cover size-[120px]'
                        />

                        <h3> {userName} </h3>
                    </div>
                </div>

            </div>

            {/* Transcripted Chat */}
            {messages.length > 0 && (
                <div className='transcript-border'>
                    <div className='transcript'>
                        <p key={lastMessage} className={cn("transition-opacity duration-500 opacity-0","animate-fadeIn opacity-100")}>
                            {lastMessage}
                        </p>
                    </div>
                </div>
            )}

            {/* Call / End Buttons */}
            <div className="w-full flex justify-center">
                {callStatus !== "ACTIVE" ? (
                    <button className="relative btn-call">

                        <span className={cn("absolute animate-ping rounded-full opacity-75", callStatus !== "CONNECTING" && "hidden")} />

                        <span className="relative">
                            {callStatus === "INACTIVE" || callStatus === "FINISHED" ? "Call" : ". . ."}
                        </span>

                    </button>
                ) : (
                    <button className="btn-disconnect">
                        End
                    </button>
                )}
            </div>

        </>

    )
}

export default Agent