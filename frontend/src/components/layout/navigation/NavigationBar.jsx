/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react'
import { Tabs, Tab } from '@mui/material'
import { styled } from '@mui/material/styles'
import { NavigationContext } from './contexts/NavigationProvider'
import classes from './navigation.module.scss'

/**
 * Remember to wrap in NavigationProvider before use.
 *
 * <NavigationBar selections={["Top", "Latest", "People"]} />
 * This will put each item in the array into a Tab.
 */
export default function NavigationBar({ selections }) {
  const { selection, changeSelection } = useContext(NavigationContext)

  const StyledTabs = styled((props) => (
    <Tabs
      {...props}
      TabIndicatorProps={{
        children: <span className="MuiTabs-indicatorSpan" />,
      }}
    />
  ))({
    '& .MuiTabs-indicator': {
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'transparent',
      height: 3,
      marginBottom: '5px',
    },
    '& .MuiTabs-indicatorSpan': {
      maxWidth: 70,
      width: '100%',
      backgroundColor: '#1D3557',
      borderRadius: '3px',
    },
  })

  const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
      textTransform: 'none',
      fontWeight: 'bold',
      fontSize: theme.typography.pxToRem(15),
      marginRight: theme.spacing(1),
      color: 'black',
    })
  )

  return (
    <div className={classes.navigationContainer}>
      <StyledTabs
        onChange={changeSelection}
        value={selection || selections[0]}
        variant="fullWidth"
      >
        {selections.map((item) => (
          <StyledTab key={item} value={item} label={item} />
        ))}
      </StyledTabs>
    </div>
  )
}
