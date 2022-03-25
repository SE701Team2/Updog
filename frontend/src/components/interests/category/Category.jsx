import React from 'react'
import Tag from '../tag/Tag'
import classes from './category.module.scss'

/**
 * This component will be used in 'Choose your interests' screen, and it can be used in the
 * following way.
 *
 * For example:
 *
 * <Category
 *  label="Trending"
 *  tagArray={["Shrey", "Tailor", "SomethingElse"]}/>
 *
 * This will create tags for all items in the array above. Note that this component should be
 * wrapped around the InterestsContextProvider component, because the Tag components use functions
 * exported by that component.
 */
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
