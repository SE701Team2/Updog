import React, { useState } from 'react'
// import AvatarEditor from 'react-avatar-editor'
import { Box, Button, Divider, Modal, Typography, Input } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import Avatar from '@mui/material/Avatar'
import Footer from '../../components/layout/footer/FooterController'
import HeaderCustom from '../../components/layout/headercustom/HeaderCustomController'
import classes from './profilesettings.module.scss'
import BannerSettingController from '../../components/user/BannerSetting/BannerSettingController'

// TODO: Remove when is ready
const mock = [
  {
    name: 'default-banner-1',
    imageUrl: 'https://i.ibb.co/L0cf3y7/Himalayan-chocolate-point.jpg',
  },
  {
    name: 'default-banner-2',
    imageUrl:
      'https://images.unsplash.com/photo-1519861531473-9200262188bf?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80',
  },
  {
    name: 'default-banner-3',
    imageUrl:
      'https://i.ibb.co/hgbQNpX/9-BBB1-C95-49-E9-4-F86-A0-CB-57-D07-A00098-B.png',
  },
  {
    name: 'default-banner-4',
    imageUrl:
      'https://i.ibb.co/p3QnfGT/dog-puppy-on-garden-royalty-free-image-1586966191.jpg',
  },
]

const ProfileSettingsView = ({
  user,
  updateProfile,
  avatarOpen,
  handleAvatarOpen,
  handleAvatarClose,
}) => {
  const [openDialog, setOpenDialog] = useState(false)

  return (
    <div>
      <div style={{ flex: 'true' }}>
        <HeaderCustom title="Edit Profile" />
      </div>
      <div className={classes.banner}>
        <img
          className={classes.bannerImg}
          src={user.profilePic ?? 'https://i.imgur.com/PcEvuMw.png'}
          alt="Banner"
        />
        <Button
          className={classes.edit}
          variant="contained"
          endIcon={<EditIcon />}
          onClick={() => {
            setOpenDialog(true)
          }}
          id="ChangeBanner"
        >
          Change Banner Image
        </Button>
        <BannerSettingController
          opened={openDialog}
          defaultBanners={mock}
          upload={setOpenDialog}
          currentBanner="https://i.ibb.co/L0cf3y7/Himalayan-chocolate-point.jpg"
          setOpen={setOpenDialog}
        />
      </div>

      <Divider className={classes.divider} variant="middle" />

      <div className={classes.flex}>
        <Avatar
          className={classes.avatar}
          sx={{ width: 80, height: 80 }}
          src={user.profileBanner}
        />
        <Button
          variant="outlined"
          endIcon={<EditIcon />}
          onClick={handleAvatarOpen}
        >
          Edit Avatar
        </Button>
      </div>

      <Divider className={classes.divider} variant="middle" />

      <div className={classes.flex}>
        <div className={classes.left}>
          <p style={{ fontWeight: 'bold' }}>Username</p>
        </div>
        <div className={classes.right}>
          <p style={{ color: 'grey' }}>{user.username}</p>
        </div>
      </div>

      <Divider className={classes.divider} variant="middle" />
      <div className={classes.flex}>
        <div className={classes.left}>
          <p style={{ fontWeight: 'bold' }}>Handle</p>
        </div>
        <div className={classes.right}>
          <p style={{ color: 'grey' }}>{user.nickname}</p>
        </div>
      </div>
      <p className={classes.subtext}>Your handle will appear as:</p>
      <p className={classes.subtext} style={{ marginBottom: '14px' }}>
        @{user.nickname}
      </p>

      <Divider className={classes.divider} variant="middle" />

      <div className={classes.flex}>
        <div className={classes.left}>
          <p style={{ fontWeight: 'bold' }}>Bio</p>
        </div>
        <div className={classes.right}>
          <Button variant="text">Edit</Button>
        </div>
      </div>
      <p className={classes.subtext} style={{ marginBottom: '14px' }}>
        {user.bio}
      </p>

      <Divider className={classes.divider} variant="middle" />

      <div className={classes.save}>
        <Button type="submit" variant="contained" onClick={updateProfile}>
          Save
        </Button>
      </div>

      <Footer />
      {avatarOpen ? (
        <Modal open={avatarOpen} onClose={handleAvatarClose}>
          <div>
            <Box className={classes.modal}>
              <Typography id="modal-modal-title" variant="h5" component="h3">
                Edit your Avatar
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Please upload an image.
              </Typography>
              <label htmlFor="contained-button-file">
                <Input
                  className={classes.upload}
                  accept="image/*"
                  id="contained-button-file"
                  multiple
                  type="file"
                />
                <Button
                  variant="contained"
                  component="span"
                  className={classes.upload}
                >
                  Upload
                </Button>
              </label>
              {/* <div className={classes.avatarEditor}>
                        <AvatarEditor
                            image={Logo}
                            width={150}
                            height={150}
                            border={50}
                            color={[255, 255, 255, 0.8]} // RGBA
                            scale={1.2}
                            rotate={0}
                        />
                    </div> */}
            </Box>
          </div>
        </Modal>
      ) : null}
    </div>
  )
}

export default ProfileSettingsView
