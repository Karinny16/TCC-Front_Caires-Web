import React from 'react'
import './FieldGroup.css'

/**
 * @param {string[]} labels
 * @param {number}   count
 * @param {string}   colGap
 * @param {string}   rowGap
 * @param {string}   fieldWidth
 * @param {number}   scrollThreshold  qtd a partir da qual aparece scroll
 * @param {string}   maxHeight        altura máxima se ultrapassar threshold
 * @param {object}   style            CSS-var extras
 */
export default function FieldGroup({
  labels = [],
  count = 8,
  colGap = '20px',
  rowGap = '8px',
  fieldWidth = '100px',
  scrollThreshold = 7,
  maxHeight = '47vh',
  style = {}
}) {
  const needsScroll = count > scrollThreshold
  const vars = {
    '--fg-col-gap': colGap,
    '--fg-row-gap': rowGap,
    '--fg-field-width': fieldWidth,
    '--fg-max-height': needsScroll ? maxHeight : 'none',
    ...style
  }

  return (
    <div className="fg-container" style={vars}>
      {labels.map((title, i) => (
        <div className="fg-column" key={i}>
          <p className="fg-label">{title}</p>
          {Array.from({ length: count }).map((_, j) => (
            <div className="fg-field" key={j} />
          ))}
        </div>
      ))}
    </div>
  )
}
