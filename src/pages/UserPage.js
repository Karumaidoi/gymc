import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import moment from 'moment/moment';
// @mui
import { Stack, Popover, MenuItem, Container, Typography } from '@mui/material';
import { Tag, Table, Button } from 'antd';
import { capitalizeString } from '../utils/formatString';

// components
import Iconify from '../components/iconify';
import { formatDistanceFromNow } from '../utils/helpers';
import { useBids } from '../hooks/bids/useBids';
import { useUpdateBid } from '../hooks/bids/useUpdateBid';

export default function UserPage() {
  const { bids, gettingBids, error } = useBids();
  const { editBid, isEditingBid } = useUpdateBid();

  const [open, setOpen] = useState(null);

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleClick = (newObj) => {
    editBid(newObj);
  };

  // Columns Data
  const columnsData = [
    {
      title: 'Created At',
      dataIndex: 'date',
      key: 'date',
    },

    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => <Tag color="success">{status}</Tag>,
    },

    {
      title: 'Verify',
      dataIndex: 'accept',
      key: 'accept',
      render: (status) => (
        <Button color="success" onClick={() => handleClick({ isVerified: true })}>
          {'Accept'}
        </Button>
      ),
    },

    {
      title: 'Decline',
      dataIndex: 'accept',
      key: 'accept',
      render: (status) => (
        <Button danger onClick={() => handleClick({ isVerified: false })}>
          {'Decline'}
        </Button>
      ),
    },
  ];

  const userData = bids?.map((bid) => bid?.Users);
  console.log(bids);

  const data = userData?.map((user, index) => ({
    key: index,
    date: formatDistanceFromNow(moment(user?.created_at).format('YYYYMMDD')),
    userIndex: user?.id ?? index,
    email: user?.email,
    phone: user?.phone,
    userName: capitalizeString(user?.userName ?? 'Not Found'),
    address: user?.address,
    status: 'Active',
    id: user?.id,
    accept: user,
  }));

  // if (loadingUsers) return <Spin style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} />;

  return (
    <>
      <Helmet>
        <title> User | GYM Portal </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Users
          </Typography>
        </Stack>
        <Table dataSource={data} columns={columnsData} />
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
