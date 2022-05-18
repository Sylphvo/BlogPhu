import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@material-ui/core';
// material
import Iframe from 'react-iframe';
import SearchNotFound from '../../SearchNotFound';
import { getLiveGame } from '../../../redux/slices/user';
// ----------------------------------------------------------------------

// eslint-disable-next-line react/prop-types
export default function LiveGame({ username }) {
  const { url } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLiveGame(username));
  }, [dispatch, username]);

  return (
    <div>
      {url === 'Not found User' ? (
        <Box>
          <SearchNotFound searchQuery={null} />
        </Box>
      ) : (
        <Iframe
          width="100%"
          height="800px"
          url={url}
          id="myId"
          className="liveGame"
          display="initial"
          position="relative"
        />
      )}
    </div>
  );
}
