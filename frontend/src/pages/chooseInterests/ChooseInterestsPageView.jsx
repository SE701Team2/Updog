import { Typography } from '@mui/material'
import Category from '../../components/interests/category/Category'
import logo from '../../images/logo.png'
import classes from './chooseinterestspage.module.scss'

export default function ChooseInterestsPageView({ data, onSubmit }) {
  return (
    <>
      <div className={classes.page}>
        <img className={classes.image} width={60} src={logo} alt="Updog Logo" />
        <Typography variant="h5">
          <b>What are you interested in?</b>
        </Typography>
        <Typography className={classes.description} variant="subtitle">
          Select some topics you’re interested in to personalize your dashboard
          feed.
        </Typography>
        {data.map((category) => (
          <Category
            key={category.name}
            label={category.name}
            tagArray={category.tags}
          />
        ))}
      </div>
      <div className={classes.stickyContainer}>
        <div className={classes.gradient} />
        <div className={classes.buttonContainer}>
          <button
            id="continue-to-dashboard"
            className={classes.button}
            type="button"
            onClick={onSubmit}
          >
            <Typography variant="button">Continue to dashboard</Typography>
          </button>
        </div>
      </div>
    </>
  )
}
