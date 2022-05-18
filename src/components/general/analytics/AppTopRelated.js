/* eslint-disable no-unused-vars */
import faker from 'faker';
import { filter } from 'lodash';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import appleFilled from '@iconify/icons-ant-design/apple-filled';
import windowsFilled from '@iconify/icons-ant-design/windows-filled';
// material
import { useTheme, makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import {
  Box,
  Card,
  CardHeader,
  Typography,
  CardContent
} from '@material-ui/core';
// utils
import { fCurrency, fShortenNumber } from '../../../utils/formatNumber';
//
import Label from '../../Label';
import Scrollbar from '../../Scrollbar';
import { getTopUser } from '../../../redux/slices/transaction';
// ----------------------------------------------------------------------

// const APPLICATIONS = [
//   {
//     name: 'Chrome',
//     system: 'Mac',
//     price: 0,
//     rating: faker.datatype.number({ min: 0, max: 5, precision: 0.1 }),
//     review: faker.datatype.number(),
//     shortcut: '/static/icons/ic_chrome.svg'
//   },
//   {
//     name: 'Drive',
//     system: 'Mac',
//     price: faker.datatype.number({ min: 4, max: 99, precision: 0.01 }),
//     rating: faker.datatype.number({ min: 0, max: 5, precision: 0.1 }),
//     review: faker.datatype.number(),
//     shortcut: '/static/icons/ic_drive.svg'
//   },
//   {
//     name: 'Dropbox',
//     system: 'Windows',
//     price: faker.datatype.number({ min: 4, max: 99, precision: 0.01 }),
//     rating: faker.datatype.number({ min: 0, max: 5, precision: 0.1 }),
//     review: faker.datatype.number(),
//     shortcut: '/static/icons/ic_dropbox.svg'
//   },
//   {
//     name: 'Evernote',
//     system: 'Mac',
//     price: 0,
//     rating: faker.datatype.number({ min: 0, max: 5, precision: 0.1 }),
//     review: faker.datatype.number(),
//     shortcut: '/static/icons/ic_evernote.svg'
//   },
//   {
//     name: 'Github',
//     system: 'Windows',
//     price: 0,
//     rating: faker.datatype.number({ min: 0, max: 5, precision: 0.1 }),
//     review: faker.datatype.number(),
//     shortcut: '/static/icons/ic_github.svg'
//   }
// ];

// ----------------------------------------------------------------------

// ApplicationItem.propTypes = {
//   app: PropTypes.object
// };
const iconFirst = '/static/icons/ic_No1.svg';
const iconSecond = '/static/icons/ic_No2.svg';
const iconThird = '/static/icons/ic_No3.svg';
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  if (query) {
    return filter(
      array,
      (topUserName) =>
        topUserName.username.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}
function checkRating(index, classes) {
  if (index === 1) {
    return (
      <span>
        <ImageList className={classes.imageList} cols={2}>
          <ImageListItem key={iconFirst}>
            <img src={iconFirst} alt={iconFirst} />
          </ImageListItem>
        </ImageList>
      </span>
    );
  }
  if (index === 2) {
    return (
      <span>
        <ImageList className={classes.imageList} cols={2}>
          <ImageListItem key={iconSecond}>
            <img src={iconSecond} alt={iconSecond} />
          </ImageListItem>
        </ImageList>
      </span>
    );
  }
  if (index === 3) {
    return (
      <span>
        <ImageList className={classes.imageList} cols={2}>
          <ImageListItem key={iconThird}>
            <img src={iconThird} alt={iconThird} />
          </ImageListItem>
        </ImageList>
      </span>
    );
  }
  return (
    <ImageList className={classes.fixNo} cols={2}>
      {index}
    </ImageList>
  );
}
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  },
  imageList: {
    width: 85,
    height: 55
  },
  fixNo: {
    alignItems: 'center',
    marginLeft: '10px',
    marginRight: '40px',
    height: 55,
    fontSize: 22
  }
}));
export default function AppTopRelated() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [take, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('username');
  const [skip, setPage] = useState(0);
  const [username, setFilterName] = useState('');

  const [level, setLevel] = useState(0);
  const { topUserName, topUserLevel } = useSelector(
    (state) => state.transaction
  );
  useEffect(() => {
    dispatch(getTopUser(username));
  }, [dispatch, username]);

  const filteredTransactions = applySortFilter(
    topUserName,
    getComparator(order, orderBy),
    username
  );
  const classes = useStyles();
  return (
    <Card>
      <CardHeader title="Top 5 Level Users" />

      <CardContent>
        <Scrollbar>
          {/* {APPLICATIONS.map((index) => (
            <ApplicationItem key={index.name} app={index} />
          ))} */}
          {filteredTransactions.map((row, index) => {
            const { username, level } = row;

            <span>{(index += 1)}</span>;
            return (
              <div key={username}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    '&:not(:first-of-type)': { mt: 1 }
                  }}
                >
                  <Box sx={{ mx: 2 }}>
                    <Typography variant="subtitle1">
                      {checkRating(index, classes)}
                    </Typography>
                    <Box
                      sx={{
                        mt: 1,
                        display: 'flex',
                        alignItems: 'center',
                        color: 'text.secondary'
                      }}
                    >
                      {' '}
                    </Box>
                  </Box>
                  <Box sx={{ flexGrow: 1, minWidth: 160 }}>
                    <Typography variant="subtitle1">{username}</Typography>
                    <Box
                      sx={{
                        mt: 1,
                        display: 'flex',
                        alignItems: 'center',
                        color: 'text.secondary'
                      }}
                    >
                      {' '}
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-end',
                      color: 'red'
                    }}
                  >
                    {level}
                  </Box>
                </Box>
              </div>
            );
          })}
        </Scrollbar>
      </CardContent>
    </Card>
  );
}
