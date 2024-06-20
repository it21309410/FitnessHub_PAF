import React from 'react'
import SearchUser from '../SearchUser/SearchUser'
import PopularUserCard from './PopularUserCard'
import { Card } from '@mui/material'

const popularUser = [1, 1, 1, 1, 1]
const HomeRight = () => {
  return (
    <div style={{
      position:"fixed" ,
      padding: '0.2rem'
    }}
    >
      <SearchUser />
      <Card style={{
        padding: '1rem'
      }}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingTop: '1.25rem',
          alignItems: 'center'
        }}
        >
          <p style={{
            fontWeight: '600',
            opacity: '0.7'
          }}
          >Suggestions for you</p>
          <p style={{
            fontSize: '0.75rem',
            fontWeight: '600',
            opacity: '0.95'
          }}
          >View All</p>
        </div>
        <div style={{
          marginTop: '0.5rem',
          marginBottom: '1rem'
        }}
        >
          {popularUser.map((item)=><PopularUserCard />)}

        </div>

      </Card>

    </div>
  )
}

export default HomeRight