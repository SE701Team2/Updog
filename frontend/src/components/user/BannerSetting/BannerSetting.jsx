/* eslint-disable no-unused-vars */
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  Dialog,
  DialogTitle,
  Grid,
  styled,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload'
import classes from './bannerSetting.module.scss'

const SelectedCard = styled(Card)(() => ({
  outline: '4px #1d3557 inset',
}))

export default function BannerSetting({
  opened,
  defaultBanners,
  upload,
  currentBanner,
  setOpen,
}) {
  const [selected, setSelected] = useState(currentBanner)

  const handleSave = () => {
    setOpen(false)
  }

  return (
    <Dialog open={opened} fullWidth maxWidth="xl">
      <Grid container direction="column">
        <Grid item>
          <Card>
            <DialogTitle>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Typography variant="h6">
                    <strong>Change Banner</strong>
                  </Typography>
                </Grid>
                <Grid item>
                  <CloseIcon
                    onClick={() => {
                      setOpen(false)
                    }}
                  />
                </Grid>
                <Grid
                  container
                  spacing={2}
                  className={classes.defaultBannerContainer}
                >
                  {defaultBanners.map((url) => (
                    <Grid
                      item
                      xs={6}
                      onClick={() => {
                        setSelected(url)
                      }}
                    >
                      {url !== selected ? (
                        <Card>
                          <CardActionArea>
                            <CardMedia
                              component="img"
                              height="50"
                              image={url}
                              title="default banner"
                            />
                          </CardActionArea>
                        </Card>
                      ) : (
                        <SelectedCard>
                          <CardActionArea>
                            <CardMedia
                              component="img"
                              height="50"
                              image={url}
                              title="default banner"
                            />
                          </CardActionArea>
                        </SelectedCard>
                      )}
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </DialogTitle>
          </Card>
        </Grid>
        <Grid item>
          <Grid
            container
            direction="column"
            alignItems="center"
            spacing={3}
            className={classes.container}
          >
            <Grid item>
              <Grid container direction="column" alignItems="center">
                <Grid item>
                  <Button
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <DriveFolderUploadIcon
                      sx={{ height: '40%', width: '40%' }}
                    />
                  </Button>
                </Grid>
                <Grid item>
                  <Grid item className={classes.typography}>
                    <Typography>
                      <strong>Choose image from your device</strong>
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item alignSelf="center">
              <Button
                variant="contained"
                onClick={() => handleSave()}
                className={classes.saveButton}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Dialog>
  )
}
