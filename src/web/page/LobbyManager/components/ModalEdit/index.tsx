import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useMemo} from 'react';
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
import {ILobby, ILobbyRes} from '../../../../../type/lobby';
import {addLooby, updateLobby} from '../../../../../store/lobby/thunkApi';
import {convertImageToFile} from '../../../../../utils/convertImageToFile';

interface IModalEdit {
  handleClose: () => void;
  open: boolean;
  data?: ILobby;
  onReLoadData: () => void;
}

const ModalEdit = ({handleClose, open, data, onReLoadData}: IModalEdit) => {
  const {control, reset, handleSubmit, getValues} = useForm<ILobbyRes>({
    defaultValues: {
      capacity: 0,
      describe: '',
      price: 0,
      name: '',
    },
  });

  const mode = useMemo(() => {
    if (!!data) return 'edit';
    return 'create';
  }, [data]);

  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = (data: ILobbyRes) => {
    dispatch(
      mode === 'edit'
        ? updateLobby({
            ...data,
          })
        : addLooby({
            ...data,
          }),
    ).then(() => {
      handleClose();
      onReLoadData();
    });
  };

  useEffect(() => {
    if (data) {
      (async () => {
        reset({
          id: data?.id,
          name: data?.name,
          price: data?.price,
          image: await convertImageToFile(data?.image || ''),
          capacity: data?.capacity,
          describe: data?.describe || '',
        });
      })();
    } else reset({});
  }, [data]);

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
      <View
        style={{
          paddingVertical: 12,
        }}>
        <ImagePicker
          initPreviewImg={data?.image}
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
            <Text>Capacity</Text>
            <TextField
              keyboardType="number-pad"
              control={control}
              name="capacity"
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
        <View>
          <Text>Description</Text>
          <TextField
            multiline
            numberOfLines={6}
            maxLength={40}
            control={control}
            name="describe"
          />
        </View>
      </View>
    </Modal>
  );
};

export default ModalEdit;

const styles = StyleSheet.create({});
