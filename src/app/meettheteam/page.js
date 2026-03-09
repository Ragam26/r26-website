'use client'

import { useState, useEffect, useRef } from 'react'
import TeamMemberCard from '@/components/meettheteam/TeamMemberCard'
import { techLeads, techTeam, uiTeam } from './team'
import { cnr, content, design, gpc, hospitality, iink, informals, infra, judging, lasIn, lasOut, marketing, media, pad, pc, prc, prodezza } from './committee'

const tabs = ['Council', 'Web Team', 'Committees']

function CommitteesTab() {
  const committees = [
    { name: 'C & R', members: cnr},
    { name: 'Content', members: content},
    { name: 'Design', members: design},
    { name: 'GPC', members: gpc},
    { name: 'Hospitality', members: hospitality},
    { name: 'I-Ink', members: iink},
    { name: 'Informals', members: informals},
    { name: 'Infra', members: infra},
    { name: 'Judging', members: judging},
    { name: 'LAS In', members: lasIn},
    { name: 'LAS Out', members: lasOut},
    { name: 'Marketing', members: marketing},
    { name: 'Media', members: media},
    { name: 'PAD', members: pad},
    { name: 'PRC', members: prc},
    { name: 'PC', members: pc},
    { name: 'Prodezza', members: prodezza},
    { name: 'Proshow', members: []},
    { name: 'Social Media', members: []},
    { name: 'Sports', members: []},
    { name: 'Transportation', members: []},
    { name: 'Workshop', members: []},
  ]

  const [currentIdx, setCurrentIdx] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const current = committees[currentIdx]
  const dropdownRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [isOpen])

  return (
    <>
      <div ref={dropdownRef} style={{ position: 'relative', marginBottom: '2rem', zIndex: 10 }}>
        {/* Trigger button */}
        <button
          onClick={() => setIsOpen(o => !o)}
          style={{
            background: '#6b0000',
            color: '#ffbf83',
            border: '2px solid #ffbf83',
            borderRadius: '999px',
            padding: '0.5rem 2.5rem 0.5rem 2rem',
            fontSize: '1rem',
            fontFamily: '"Anton", sans-serif',
            letterSpacing: '0.08em',
            cursor: 'pointer',
            outline: 'none',
            minWidth: '220px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          {current.name.toUpperCase()}
          <span style={{ fontSize: '0.8rem' }}>{isOpen ? '▲' : '▼'}</span>
        </button>

        {/* Dropdown list */}
        {isOpen && (
          <div 
            style={{
              position: 'absolute',
              top: 'calc(100% + 0.5rem)',
              left: 0,
              minWidth: '220px',
              background: '#ffbf83',
              border: '2px solid #6b0000',
              borderRadius: '12px',
              overflow: 'hidden',
              maxHeight: '300px',
              overflowY: 'auto',
            }}
            onWheel={e=>e.stopPropagation()}
            onTouchMove={e=>e.stopPropagation()}
          >
            {committees.map((committee, idx) => (
              <div
                key={idx}
                onClick={() => { setCurrentIdx(idx); setIsOpen(false) }}
                style={{
                  padding: '0.5rem 1.5rem',
                  fontFamily: '"Anton", sans-serif',
                  fontSize: '1rem',
                  letterSpacing: '0.08em',
                  cursor: 'pointer',
                  borderBottom: idx < committees.length - 1 ? '1px solid rgba(107,0,0,0.3)' : 'none',
                  background: idx === currentIdx ? '#6b0000' : '#ffbf83',
                  color: idx === currentIdx ? '#ffbf83' : '#6b0000',
                }}
              >
                {committee.name.toUpperCase()}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="meet-team-grid" style={{ display: 'flex', columnGap: '3rem', rowGap: '2rem', flexWrap: 'wrap', justifyContent: 'center', width: '100%', maxWidth: 1300 }}>
        {current.members.length > 0 ? current.members.map((member, idx) => (
          <div key={`committee-${idx}`} style={{ flex: '0 1 calc((100% - 6rem) / 3)', boxSizing: 'border-box', minWidth: 100, maxWidth: 350 }}>
            <TeamMemberCard {...member} />
          </div>
        )) : (
          <p style={{ color: '#fff', fontFamily: '"Anton", sans-serif' }}>COMING SOON</p>
        )}
      </div>
    </>
  )
}

export default function MeetTheTeamPage() {
  const [activeTab, setActiveTab] = useState('Council')

  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundImage: "url('/images/meettheteam/bg.png')",
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
          .tab-bar {
            gap: 0.2rem !important;
          }
          .tab-btn {
            padding: 0.3rem 1rem !important;
            font-size: 0.75rem !important;
            margin: 0.4rem 0.2rem !important;
          }
        }
      `}</style>

      <div style={{ width: '100%', backgroundColor: '#ffbf83', display: 'flex', justifyContent: 'center', padding: 0, marginTop: '64px' }}>
        <h1 style={{ fontSize: '4rem', fontWeight: 900, margin: 0, paddingTop: '1rem', letterSpacing: '0.05em', textAlign: 'center', color: '#6b0000', fontFamily: '"Jersey 10", sans-serif', lineHeight: 0.90 }}>
          MEET OUR TEAM
        </h1>
      </div>

      {/* Tabs */}
      <div className='tab-bar' style={{ width: '100%', backgroundColor: '#ffbf83', display: 'flex', justifyContent: 'center', gap: '0', paddingBottom: '0' }}>
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className='tab-btn'
            style={{
            background: activeTab === tab ? '#6b0000' : 'transparent',
            color: activeTab === tab ? '#ffbf83' : '#6b0000',
            border: '2px solid #6b0000',
            borderRadius: '999px',
            padding: '0.4rem 1.8rem',
            margin: '0.5rem 0.4rem',
            fontSize: '1rem',
            fontWeight: 700,
            fontFamily: '"Anton", sans-serif',
            letterSpacing: '0.08em',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          {tab.toUpperCase()}
        </button>
        ))}
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
        {activeTab === 'Web Team' && (
          <>
            {/* Leads */}
            <div className="meet-team-grid" style={{ display: 'flex', columnGap: '3rem', rowGap: '2rem', flexWrap: 'wrap', justifyContent: 'center', width: '100%', maxWidth: 1200 }}>
              {techLeads.map((member, idx) => (
                <div key={`lead-${member.name}-${idx}`} style={{ flex: '0 1 calc((100% - 6rem) / 3)', boxSizing: 'border-box', minWidth: 100, maxWidth: 320 }}>
                  <TeamMemberCard {...member} />
                </div>
              ))}
            </div>

            <div style={{ width: '100vw', margin: '2.5rem 0', lineHeight: 0 }}>
              <img src="/images/meettheteam/divider.png" alt="divider" style={{ width: '100%', height: '40px', objectFit: 'cover', display: 'block' }} />
            </div>

            <div className="meet-team-grid" style={{ display: 'flex', columnGap: '3rem', rowGap: '2rem', flexWrap: 'wrap', justifyContent: 'center', width: '100%', maxWidth: 1200 }}>
              {techTeam.map((member, idx) => (
                <div key={`member-${member.name}-${idx}`} style={{ flex: '0 1 calc((100% - 6rem) / 3)', boxSizing: 'border-box', minWidth: 100, maxWidth: 320 }}>
                  <TeamMemberCard {...member} />
                </div>
              ))}
            </div>

            <div style={{ width: '100vw', margin: '2.5rem 0', lineHeight: 0 }}>
              <img src="/images/meettheteam/divider.png" alt="divider" style={{ width: '100%', height: '40px', objectFit: 'cover', display: 'block' }} />
            </div>

            <div className="meet-team-grid" style={{ display: 'flex', columnGap: '3rem', rowGap: '2rem', flexWrap: 'wrap', justifyContent: 'center', width: '100%', maxWidth: 1200 }}>
              {uiTeam.map((member, idx) => (
                <div key={`ui-${member.name}-${idx}`} style={{ flex: '0 1 calc((100% - 6rem) / 3)', boxSizing: 'border-box', minWidth: 100, maxWidth: 320 }}>
                  <TeamMemberCard {...member} />
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'Council' && (
          <div className="meet-team-grid" style={{ display: 'flex', columnGap: '3rem', rowGap: '2rem', flexWrap: 'wrap', justifyContent: 'center', width: '100%', maxWidth: 1200 }}>
            {/* Add council data here */}
            <p style={{ color: '#fff', fontFamily: '"Anton", sans-serif' }}>COMING SOON</p>
          </div>
        )}

        {activeTab === 'Committees' && <CommitteesTab />}
      </div>
    </main>
  )
}