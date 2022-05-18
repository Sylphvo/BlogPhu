import PropTypes from 'prop-types';
// material
import { Grid } from '@material-ui/core';
//
import ProfileAboutAdmin from './ProfileAboutAdmin';
import ProfilePostInput from './ComposeMailUser';
import ProfileFollowInfo from './ProfileFollowInfo';
import ProfileFollowInfo2 from './ProfileFollowInfo2';

// ----------------------------------------------------------------------

Profile.propTypes = {
  myProfile: PropTypes.object
};

export default function Profile({ myProfile }) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <ProfileFollowInfo profile={myProfile} />
        <ProfileFollowInfo2 profile={myProfile} />
        <ProfileAboutAdmin profile={myProfile} />
      </Grid>

      <Grid item xs={12} md={8}>
        <ProfilePostInput />
      </Grid>
    </Grid>
  );
}
