import React from 'react'
// import AvatarEditor from 'react-avatar-editor'
import { Box, Button, Divider, Modal, Typography, Input } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import Footer from '../../components/layout/footer/FooterController'
import HeaderCustom from '../../components/layout/headercustom/HeaderCustomController'
import Logo from '../../images/logo.png'
import classes from './profilesettings.module.scss'

const ProfileSettingsView = ({
  user,
  updateProfile,
  avatarOpen,
  handleAvatarOpen,
  handleAvatarClose,
}) => (
  <div>
    <div style={{ flex: 'true' }}>
      <HeaderCustom title="Edit Profile" />
    </div>
    <div className={classes.banner}>
      <img className={classes.bannerImg} src={Logo} alt="Banner" />
      <Button
        className={classes.edit}
        variant="contained"
        endIcon={<EditIcon />}
      >
        Change Banner Image
      </Button>
    </div>

    <Divider className={classes.divider} variant="middle" />

    <div className={classes.flex}>
      <img className={classes.avatar} src={Logo} alt="Avatar" />
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

export default ProfileSettingsView
