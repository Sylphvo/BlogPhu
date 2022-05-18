import PropTypes from 'prop-types';
// material
import { Grid } from '@material-ui/core';
//
import ProfileAbout from './ProfileAbout';
import ProfileFollowInfo from './ProfileFollowInfo';
import ProfileFollowInfo2 from './ProfileFollowInfo2';
import ProfileFollowInfo3 from './ProfileFollowInfo3';
import ProfileFollowInfo4 from './ProfileFollowInfo4';
import ProfileFollowInfo5 from './ProfileFollowinfo5';
// ----------------------------------------------------------------------

Profile.propTypes = {
  myProfile: PropTypes.object
};

export default function Profile({ myProfile }) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <ProfileFollowInfo2 profile={myProfile} />
        <ProfileAbout profile={myProfile} />
      </Grid>

      <Grid item xs={12} md={8}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <ProfileFollowInfo profile={myProfile} />
          </Grid>
          <Grid item xs={12} md={6}>
            <ProfileFollowInfo4 profile={myProfile} />
          </Grid>
        </Grid>
        <ProfileFollowInfo3 profile={myProfile} />
        <ProfileFollowInfo5 profile={myProfile} />
      </Grid>
    </Grid>
  );
}
