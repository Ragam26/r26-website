'use client'

import React from 'react'
import TeamMemberCard from '@/components/meettheteam/TeamMemberCard'

const team = Array.from({ length: 18 }).map(() => ({
  name: 'name',
  image: null,
}))

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

      <div style={{ width: '100%', backgroundColor: '#ffbf83', display: 'flex', justifyContent: 'center', padding: 0, marginTop: '64px' }}>
        <h1 style={{ fontSize: '4rem', fontWeight: 900, margin: 0, paddingTop: '1rem', letterSpacing: '0.05em', textAlign: 'center', color: '#6b0000', fontFamily: '"Jersey 10", sans-serif', lineHeight: 0.90 }}>
          MEET OUR TEAM
        </h1>
      </div>

      <div
        style={{
          background: 'rgba(0,0,0,0.45)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: '1rem 0.5rem',
        }}
      >

        <div
          className="meet-team-grid"
          style={{
            display: 'flex',
            gap: '2rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
            width: '100%',
            maxWidth: 1200,
          }}
        >
          {team.map((member, idx) => (
            <div
              key={`${member.name}-${idx}`}
              style={{
                flex: '0 1 calc((100% - 8rem) / 4)',
                boxSizing: 'border-box',
                minWidth: 100,
                maxWidth: 220,
              }}
            >
              <TeamMemberCard name={member.name} image={member.image} />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
