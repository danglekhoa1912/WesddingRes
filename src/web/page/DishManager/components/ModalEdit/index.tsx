import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Modal from '../../../../components/Modal';
import {IDish, IDishRes} from '../../../../../type/dish';
import {useForm} from 'react-hook-form';
import {DropDown, ImagePicker, TextField} from '../../../../components';
import {Select} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, AppState} from '../../../../../store';
import {ISelectItem} from '../../../../../type/common';
import {sCategoryOpts} from '../../../../../store/dish/selector';
import {updateDish} from '../../../../../store/dish/thunkApi';

interface IModalEdit {
  handleClose: () => void;
  open: boolean;
  data?: IDish;
}

const ModalEdit = ({handleClose, open, data}: IModalEdit) => {
  const {control, reset, handleSubmit, getValues} = useForm<IDishRes>({
    defaultValues: {
      category: 0,
      image: '',
      name: '',
      price: 0,
    },
  });

  const dispatch = useDispatch<AppDispatch>();

  const pCategoryOpts = useSelector<AppState, ISelectItem[]>(state =>
    sCategoryOpts(state),
  );

  const onSubmit = (data: IDishRes) => {
    console.log(data);
    dispatch(
      updateDish({
        ...data,
      }),
    );
  };

  useEffect(() => {
    reset({
      id: data?.id,
      name: data?.name,
      price: data?.price,
      image: data?.image,
      category: data?.categoryId?.id,
    });
  }, [data, pCategoryOpts]);

  return (
    <Modal
      cancelButton={{
        title: 'Cancel',
        variant: 'outlined',
        onClick: handleClose,
        color: 'dark',
      }}
      saveButton={{
        title: 'Save',
        onClick: handleSubmit(onSubmit),
        color: 'primary',
      }}
      open={open}
      header={{title: 'Edit Dish'}}>
      <View>
        <ImagePicker
          initPreviewImg={getValues('image')}
          label="Image"
          disabled={false}
          control={control}
          name="image"
        />
        <View>
          <Text>Name</Text>
          <TextField control={control} name="name" />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: '40%',
            }}>
            <Text>Category</Text>
            <DropDown
              options={pCategoryOpts}
              control={control}
              name="category"
            />
          </View>
          <View
            style={{
              width: '40%',
            }}>
            <Text>Price</Text>
            <TextField
              keyboardType="number-pad"
              control={control}
              name="price"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalEdit;

const styles = StyleSheet.create({});
