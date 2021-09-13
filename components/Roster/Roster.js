import React from 'react'

import { useQuery } from '@apollo/client'

import { query, queryAccessor, queryOptions } from './query'
import { Stats } from './Stats'
import { useDirectMutation } from './useDirectMutation'

import styles from './Roster.module.css'

const Row = ({
  person: {
    personId,
    firstName,
    numPets,
    apples,
    oranges,
    bananas,
    silkworms,
    marzapan,
  },
}) => (
  <>
    <div className={styles.cell}>{personId}</div>
    <div className={styles.cell}>{firstName}</div>
    <div className={styles.cell}>{numPets}</div>
    <div className={styles.cell}>{apples}</div>
    <div className={styles.cell}>{oranges}</div>
    <div className={styles.cell}>{bananas}</div>
    <div className={styles.cell}>{silkworms}</div>
    <div className={styles.cell}>{marzapan}</div>
  </>
)

export const Roster = () => {
  const { data } = useQuery(query, queryOptions)

  const stats = useDirectMutation()

  const persons = data?.[queryAccessor]

  return (
    <div className={styles.outerCol}>
      <Stats stats={stats} />
      {persons ? (
        <div className={styles.grid}>
          <div className={styles.cell}>id</div>
          <div className={styles.cell}>name</div>
          <div className={styles.cell}>pets</div>
          <div className={styles.cell}>apples</div>
          <div className={styles.cell}>oranges</div>
          <div className={styles.cell}>bananas</div>
          <div className={styles.cell}>silkworms</div>
          <div className={styles.cell}>marzapan</div>
          {persons.map(person => (
            <Row key={person.personId} person={person} />
          ))}
        </div>
      ) : (
        <div>no data</div>
      )}
    </div>
  )
}
