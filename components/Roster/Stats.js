import React from 'react'

import styles from './Roster.module.css'

const Value = ({ label, value, units }) => (
  <div className={styles.statsItem}>
    <div className={styles.statsItemLabel}>{label}</div>
    <div className={styles.statsItemValue}>
      {value}
      {units}
    </div>
  </div>
)

const Section = ({ title, mainValue, otherValues }) => (
  <div className={styles.statsSection}>
    <div className={styles.statsSectionTop}>
      <Value
        label={mainValue.label}
        value={mainValue.value}
        units={mainValue.units}
      />
      <div className={styles.statsSectionTitle}>{title}</div>
    </div>
    <div className={styles.statsSectionBot}>
      {otherValues.map(({ label, value, units }) => (
        <Value key={label} label={label} value={value} units={units} />
      ))}
    </div>
  </div>
)

export const Stats = ({
  stats: {
    nextDataWorking,
    readCurrentWorking,
    scanTriesWorking,
    trieStats: { depth, numValues, numWeakTries, numStrongTries },
    working,
    writeQueryWorking,
  },
}) => (
  <div className={styles.stats}>
    <Section
      title="app workload"
      mainValue={{ label: 'total', value: working, units: 'ms' }}
      otherValues={[
        { label: 'read cache', value: readCurrentWorking, units: 'ms' },
        { label: 'create next data', value: nextDataWorking, units: 'ms' },
        { label: 'write cache', value: writeQueryWorking, units: 'ms' },
        { label: 'scanning tries', value: scanTriesWorking, units: 'ms' },
      ]}
    />
    <Section
      title="cache.data.storageTrie"
      mainValue={{ label: 'depth', value: depth, units: '' }}
      otherValues={[
        { label: 'numValues', value: numValues, units: '' },
        { label: 'numWeakTries', value: numWeakTries, units: '' },
        { label: 'numStrongTries', value: numStrongTries, units: '' },
      ]}
    />
  </div>
)
