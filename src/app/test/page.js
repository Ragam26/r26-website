'use client';

import { EventModal } from "@/components/common/eventModal/EventModal";
import { useState } from "react";

export default function TestPage() {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <button
                onClick={() => setShowModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
                Open Event Modal
            </button>
            <EventModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                event={{
                    title: "FASHION",
                    prizesWorth: "Rs. 25,000",
                    eventDate: "30th Jan 2024",
                    regDeadline: "25th Jan 2024",
                    about: "-Teams must consist of a minimum of 3 members and maximum of 25 members. The entire event would be divided into two categories-Thematic and Non-thematic Each performance is allotted a time frame of a minimum of 3 minutes to a maximum of 10 minutes, empty to empty. Exceeding this time limit may result in team disqualification. Only college students will be allowed to participate One individual cannot participate in more than one team. A college can have one team in each category. Participating teams must send a video of their performance (Drive Link/YouTube link) to pc@ragam.co.in, along with the following details for screening: College Name (and Team Name, if any) Name and Contact Information of two team members List of all team members. Shortlisted teams will receive an email from pc@ragam.co.in. Confirmed teams must send their audio in MP3 format and background video in mp4 to pc@ragam.co.in.Use of breakable items, fire, water, inflammable items, or items that may make the dance floore",
                    contacts: [
                        { name: "JOHN DOE", phone: "+91 12345 67890" },
                        { name: "JANE DOE", phone: "+91 12345 67890" },
                    ],
                }}
            />
        </div>
    );
}