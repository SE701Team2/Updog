import React from 'react'
import Tag from '../tag/tag'
import classes from './category.module.css'

export default function Category({ label, tagArray }) {
  return (
    <div className={classes.container}>
      <h3>{label}</h3>
      <div className={classes.tagsContainer}>
        {tagArray.map((tag) => (
          <Tag key={tag} label={tag} />
        ))}
      </div>
    </div>
  )
}
