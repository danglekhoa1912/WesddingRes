import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Button, TabelData} from '../../components';
import {IDish} from '../../../type/dish';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, AppState} from '../../../store';
import {getCategories, getDishList} from '../../../store/dish/thunkApi';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import {sCategoryOpts} from '../../../store/dish/selector';
import {ISelectItem} from '../../../type/common';
import Modal from '../../components/Modal';
import ModalEdit from './components/ModalEdit';

const DishManager = () => {
  const [dishList, setDishList] = useState<IDish[]>([]);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const totalItem = useRef<number>(0);
  const [category, setCategory] = useState(1);
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = React.useState(false);
  const dish = useRef<IDish>();

  const pCategoryOpts = useSelector<AppState, ISelectItem[]>(state =>
    sCategoryOpts(state),
  );

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };
  const handleChange = (event: SelectChangeEvent) => {
    setCategory(+event.target.value);
    setPage(0);
  };

  const handleEdit = (data: any) => {
    setOpen(true);
    dish.current = data;
  };

  const handleClose = () => setOpen(false);

  useEffect(() => {
    dispatch(
      getDishList({
        categoryId: category,
        page: page + 1,
        searchByName: search,
      }),
    ).then(data => {
      console.log(data.payload);
      setDishList(data.payload.record);
      totalItem.current = data.payload.totalRecord;
    });
  }, [page, search, category]);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

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
          <h1>Dish Manager</h1>
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
        <View>
          <FormControl
            style={{
              width: 200,
            }}>
            <InputLabel>Categories</InputLabel>
            <Select
              style={{
                height: 40,
              }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="Category"
              onChange={handleChange}>
              {pCategoryOpts.map(item => (
                <MenuItem key={item.id} value={item.id}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </View>
        <Button
          title="Add Dish"
          onPress={() => {
            handleEdit(null);
          }}
        />
      </View>
      <TabelData
        currentPage={page}
        onChangePage={handleChangePage}
        totalItem={totalItem.current}
        data={dishList}
        menu={[
          {label: 'Edit', action: handleEdit},
          {label: 'Remove', action: () => {}},
        ]}
        rowTitle={[
          {label: '#', minWidth: 10},
          {label: 'Image', minWidth: 70},
          {label: 'Name', minWidth: 70},
          {label: 'Price', minWidth: 60},
          {label: 'Status', minWidth: 10},
          {label: 'Action', minWidth: 10},
        ]}
      />
      <ModalEdit data={dish.current} open={open} handleClose={handleClose} />
    </View>
  );
};

export default DishManager;

const styles = StyleSheet.create({});
