import { ImageResponse } from 'next/og'
 
// Route segment config
export const runtime = 'edge'
 
// Image metadata
export const alt = 'PadashJoo - Free Income & Rewards'
export const size = {
  width: 1200,
  height: 630,
}
 
export const contentType = 'image/png'
 
// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          background: 'linear-gradient(to bottom right, #eff6ff, #ffffff)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#2563eb',
                borderRadius: '24px',
                width: '120px',
                height: '120px',
                marginBottom: '40px',
                boxShadow: '0 20px 50px rgba(37, 99, 235, 0.3)',
            }}
        >
            {/* Simple P Icon */}
            <svg width="64" height="64" viewBox="0 0 24 24" fill="white">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
        </div>

        <div style={{ fontSize: 80, fontWeight: 900, color: '#1e3a8a', letterSpacing: '-2px' }}>
          PadashJoo
        </div>
        <div style={{ fontSize: 32, color: '#64748b', marginTop: '20px', fontWeight: 600 }}>
          The First Fair Referral Platform
        </div>
        
        {/* Decorative Badge */}
        <div style={{ 
            marginTop: '40px', 
            background: '#dbeafe', 
            color: '#1d4ed8', 
            padding: '10px 30px', 
            borderRadius: '50px',
            fontSize: 24,
            fontWeight: 700
        }}>
            padashjoo.ir
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}