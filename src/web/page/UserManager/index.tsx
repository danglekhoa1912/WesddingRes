import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../store';
import {getAllUser} from '../../../store/profile/thunkApi';
import {Button, TabelData} from '../../components';
import {IUser} from '../../../type/user';
import {styled} from '@mui/material/styles';
import {TableCell, tableCellClasses} from '@mui/material';
import ModalEdit from './ModalEdit';

const StyledTableCell = styled(TableCell)(({theme}) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#f8f8f9',
    color: theme.palette.common.black,
    padding: 12,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: theme.typography.body1,
    height: 50,
  },
}));

const UserManager = () => {
  const [userList, setUserList] = useState<IUser[]>([]);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const totalItem = useRef<number>(0);
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = React.useState(false);
  const user = useRef<IUser>();

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleEdit = (data: any) => {
    setOpen(true);
    user.current = data;
  };

  const handleClose = () => setOpen(false);

  const handleLoadData = () => {
    dispatch(
      getAllUser({
        page: page + 1,
        searchByName: search,
      }),
    ).then(data => {
      setUserList(data.payload.record);
      totalItem.current = data.payload.totalRecord;
    });
  };

  useEffect(() => {
    handleLoadData();
  }, [page, search]);

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 30,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <h1>User Manager</h1>
          <TextInput
            value={search}
            onChangeText={setSearch}
            style={{
              backgroundColor: '#f3f5f7',
              height: 40,
              width: 240,
              borderRadius: 12,
              marginLeft: 24,
              padding: 12,
            }}
            placeholder="Search"
            placeholderTextColor="gray"
          />
        </View>
        <Button
          title="Add User"
          onPress={() => {
            handleEdit(null);
          }}
        />
      </View>
      <TabelData
        renderData={data => {
          return (
            <>
              <StyledTableCell align={'center'}>
                <img src={data.avatar} width={50} height={50} />
              </StyledTableCell>
              <StyledTableCell align={'center'}>{data.name}</StyledTableCell>
              <StyledTableCell align={'center'}>
                {data.birthday}
              </StyledTableCell>
              <StyledTableCell align={'center'}>{data.email}</StyledTableCell>
              <StyledTableCell align={'center'}>{data.mobile}</StyledTableCell>
              <StyledTableCell align={'center'}>{data.role}</StyledTableCell>
            </>
          );
        }}
        currentPage={page}
        onChangePage={handleChangePage}
        totalItem={totalItem.current}
        data={userList}
        menu={[
          {label: 'Edit', action: handleEdit},
          {label: 'Remove', action: () => {}},
        ]}
        rowTitle={[
          {label: '#', minWidth: 10},
          {label: 'Avatar', minWidth: 70},
          {label: 'Name', minWidth: 80},
          {label: 'Birthday', minWidth: 100},
          {label: 'Email', minWidth: 60},
          {label: 'Mobile', minWidth: 10},
          {label: 'Role', minWidth: 10},
          {label: 'Status', minWidth: 10},
          {label: 'Action', minWidth: 10},
        ]}
      />
      <ModalEdit
        onReLoadData={handleLoadData}
        data={user.current}
        open={open}
        handleClose={handleClose}
      />
    </View>
  );
};

export default UserManager;

const styles = StyleSheet.create({});
