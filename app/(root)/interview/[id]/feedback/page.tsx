import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getFeedbackByInterviewId, getInterviewById } from "@/lib/actions/general.action";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/actions/auth.action";

const Feedback = async ({ params }: RouteParams) => {

    const { id } = await params;

    const user = await getCurrentUser();

    const interview = await getInterviewById(id);

    if (!interview) redirect("/");

    const feedback = await getFeedbackByInterviewId({
        interviewId: id,
        userId: user?.id!,
    });

    return (

        <section className="bg-gray-900 text-gray-100 min-h-screen p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header Card */}
                <div className="bg-gray-800 rounded-lg p-6 mb-6 shadow-lg">
                    <h1 className="text-2xl font-bold text-blue-400">
                        Feedback on the Interview -{" "}
                        <span className="text-white">{interview.role}</span> Interview
                    </h1>
                </div>

                {/* Score and Date Card */}
                <div className="bg-gray-800 rounded-lg p-6 mb-6 shadow-lg">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                        {/* Overall Impression */}
                        <div className="flex items-center gap-2 bg-gray-700 p-4 rounded-lg flex-1">
                            <Image src="/star.svg" width={22} height={22} alt="star" className="text-yellow-400" />
                            <p className="font-medium">
                                Overall Impression:{" "}
                                <span className="text-blue-400 font-bold">{feedback?.totalScore}</span>
                                /100
                            </p>
                        </div>

                        {/* Date */}
                        <div className="flex items-center gap-2 bg-gray-700 p-4 rounded-lg flex-1">
                            <Image src="/calendar.svg" width={22} height={22} alt="calendar" />
                            <p>
                                {feedback?.createdAt
                                    ? dayjs(feedback.createdAt).format("MMM D, YYYY h:mm A")
                                    : "N/A"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Final Assessment Card */}
                <div className="bg-gray-800 rounded-lg p-6 mb-6 shadow-lg">
                    <h2 className="text-xl font-semibold mb-4 text-blue-400">Final Assessment</h2>
                    <p className="text-gray-300 leading-relaxed">{feedback?.finalAssessment}</p>
                </div>

                {/* Interview Breakdown Card */}
                <div className="bg-gray-800 rounded-lg p-6 mb-6 shadow-lg">
                    <h2 className="text-xl font-semibold mb-4 text-blue-400">Breakdown of the Interview</h2>
                    <div className="space-y-4">
                        {feedback?.categoryScores?.map((category, index) => (
                            <div key={index} className="bg-gray-700 p-4 rounded-lg">
                                <p className="font-medium text-white">
                                    {index + 1}. {category.name} <span className="text-blue-400">({category.score}/100)</span>
                                </p>
                                <p className="text-gray-300 mt-2">{category.comment}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Strengths and Improvements Cards */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    {/* Strengths Card */}
                    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-green-400">Strengths</h3>
                        <ul className="space-y-2">
                            {feedback?.strengths?.map((strength, index) => (
                                <li key={index} className="flex items-start">
                                    <span className="text-green-400 mr-2">✓</span>
                                    <span className="text-gray-300">{strength}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Areas for Improvement Card */}
                    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-red-400">Areas for Improvement</h3>
                        <ul className="space-y-2">
                            {feedback?.areasForImprovement?.map((area, index) => (
                                <li key={index} className="flex items-start">
                                    <span className="text-red-400 mr-2">✗</span>
                                    <span className="text-gray-300">{area}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-lg transition duration-200">
                        <Link href="/" className="flex items-center justify-center">
                            <p className="flex items-center gap-2">
                                <span>←</span> Back to dashboard
                            </p>
                        </Link>
                    </Button>

                    <Button className="bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 px-6 rounded-lg transition duration-200">
                        <Link href={`/interview/${id}`} className="flex items-center justify-center">
                            <p className="flex items-center gap-2">
                                <span>↻</span> Retake Interview
                            </p>
                        </Link>
                    </Button>
                </div>
            </div>
        </section>

        // <section className="section-feedback">
        //     <div className="flex flex-row justify-center">
        //         <h1 className="text-4xl font-semibold">
        //             Feedback on the Interview -{" "}
        //             <span className="capitalize">{interview.role}</span> Interview
        //         </h1>
        //     </div>

        //     <div className="flex flex-row justify-center ">
        //         <div className="flex flex-row gap-5">
        //             {/* Overall Impression */}
        //             <div className="flex flex-row gap-2 items-center">
        //                 <Image src="/star.svg" width={22} height={22} alt="star" />
        //                 <p>
        //                     Overall Impression:{" "}
        //                     <span className="text-primary-200 font-bold">
        //                         {feedback?.totalScore}
        //                     </span>
        //                     /100
        //                 </p>
        //             </div>

        //             {/* Date */}
        //             <div className="flex flex-row gap-2">
        //                 <Image src="/calendar.svg" width={22} height={22} alt="calendar" />
        //                 <p>
        //                     {feedback?.createdAt
        //                         ? dayjs(feedback.createdAt).format("MMM D, YYYY h:mm A")
        //                         : "N/A"}
        //                 </p>
        //             </div>
        //         </div>
        //     </div>

        //     <hr />

        //     <p>{feedback?.finalAssessment}</p>

        //     {/* Interview Breakdown */}
        //     <div className="flex flex-col gap-4">
        //         <h2>Breakdown of the Interview:</h2>
        //         {feedback?.categoryScores?.map((category, index) => (
        //             <div key={index}>
        //                 <p className="font-bold">
        //                     {index + 1}. {category.name} ({category.score}/100)
        //                 </p>
        //                 <p>{category.comment}</p>
        //             </div>
        //         ))}
        //     </div>

        //     <div className="flex flex-col gap-3">
        //         <h3>Strengths</h3>
        //         <ul>
        //             {feedback?.strengths?.map((strength, index) => (
        //                 <li key={index}>{strength}</li>
        //             ))}
        //         </ul>
        //     </div>

        //     <div className="flex flex-col gap-3">
        //         <h3>Areas for Improvement</h3>
        //         <ul>
        //             {feedback?.areasForImprovement?.map((area, index) => (
        //                 <li key={index}>{area}</li>
        //             ))}
        //         </ul>
        //     </div>

        //     <div className="buttons">
        //         <Button className="btn-secondary flex-1">
        //             <Link href="/" className="flex w-full justify-center">
        //                 <p className="text-sm font-semibold text-primary-200 text-center">
        //                     Back to dashboard
        //                 </p>
        //             </Link>
        //         </Button>

        //         <Button className="btn-primary flex-1">
        //             <Link
        //                 href={`/interview/${id}`}
        //                 className="flex w-full justify-center"
        //             >
        //                 <p className="text-sm font-semibold text-black text-center">
        //                     Retake Interview
        //                 </p>
        //             </Link>
        //         </Button>
        //     </div>
        // </section>
    );
};

export default Feedback;