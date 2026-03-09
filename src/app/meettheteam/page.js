'use client'

import React from 'react'
import TeamMemberCard from '@/components/meettheteam/TeamMemberCard'
import { techLeads, techMembers } from './team'

export default function MeetTheTeamPage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundImage: "url('/images/meetheteam/bg.png')",
        backgroundSize: '100% auto',
        backgroundPosition: 'center top',
        backgroundRepeat: 'repeat',
        backgroundAttachment: 'fixed',
        color: '#fff',
      }}
    >
      <style>{`
        @media (max-width: 640px) {
          .meet-team-grid {
            padding: 0 1.5rem !important;
          }
          .meet-team-grid > div {
            flex: 0 1 100% !important;
            max-width: 100% !important;
          }
        }
      `}</style>

      <div style={{ width: '100%', backgroundColor: '#ffbf83', display: 'flex', justifyContent: 'center', padding: 0, marginTop: '64px' }}>
        <h1 style={{ fontSize: '4rem', fontWeight: 900, margin: 0, paddingTop: '1rem', letterSpacing: '0.05em', textAlign: 'center', color: '#6b0000', fontFamily: '"Jersey 10", sans-serif', lineHeight: 0.90 }}>
          MEET OUR TEAM
        </h1>
      </div>

      <div
        style={{
          background: 'transparent',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: '1rem 0.5rem',
        }}
      >
        {/* Leads */}
        <div
          className="meet-team-grid"
          style={{
            display: 'flex',
            columnGap: '3rem',
            rowGap: '2rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
            width: '100%',
            maxWidth: 1200,
          }}
        >
          {techLeads.map((member, idx) => (
            <div
              key={`lead-${member.name}-${idx}`}
              style={{
                flex: '0 1 calc((100% - 6rem) / 3)',
                boxSizing: 'border-box',
                minWidth: 100,
                maxWidth: 320,
              }}
            >
              <TeamMemberCard name={member.name} image={member.image} hoverImage={member.hoverImage} position={member.position} linkedin={member.linkedin} github={member.github} />
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{ width: '100%', maxWidth: 1200, margin: '2.5rem 0', borderTop: '1px solid rgba(255,255,255,0.3)' }} />

        {/* Members */}
        <div
          className="meet-team-grid"
          style={{
            display: 'flex',
            columnGap: '3rem',
            rowGap: '2rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
            width: '100%',
            maxWidth: 1200,
          }}
        >
          {techMembers.map((member, idx) => (
            <div
              key={`member-${member.name}-${idx}`}
              style={{
                flex: '0 1 calc((100% - 6rem) / 3)',
                boxSizing: 'border-box',
                minWidth: 100,
                maxWidth: 320,
              }}
            >
              <TeamMemberCard name={member.name} image={member.image} hoverImage={member.hoverImage} position={member.position} linkedin={member.linkedin} github={member.github} />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}