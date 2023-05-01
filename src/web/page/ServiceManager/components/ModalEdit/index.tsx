import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useMemo} from 'react';
import Modal from '../../../../components/Modal';
import {useForm} from 'react-hook-form';
import {ImagePicker, TextField} from '../../../../components';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, AppState} from '../../../../../store';
import {IService, IServiceRes} from '../../../../../type/service';
import {addService, updateService} from '../../../../../store/service/thunkApi';
import {convertImageToFile} from '../../../../../utils/convertImageToFile';
import {Loading} from '../../../../components/Loading';

interface IModalEdit {
  handleClose: () => void;
  open: boolean;
  data?: IService;
  onReloadData: () => void;
}

const ModalEdit = ({handleClose, open, data, onReloadData}: IModalEdit) => {
  const {control, reset, handleSubmit, getValues} = useForm<IServiceRes>({
    defaultValues: {
      image: '',
      name: '',
      price: 0,
      serviceDescribe: '',
    },
  });

  const mode = useMemo(() => {
    if (!!data) return 'edit';
    return 'create';
  }, [data]);

  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = (data: IServiceRes) => {
    dispatch(
      mode === 'edit'
        ? updateService({
            ...data,
          })
        : addService({
            ...data,
          }),
    ).then(data => {
      handleClose();
      onReloadData();
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
          serviceDescribe: data?.serviceDescribe,
        });
      })();
    }
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
      <View style={{paddingVertical: 12}}>
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
            width: '40%',
          }}>
          <Text>Price</Text>
          <TextField keyboardType="number-pad" control={control} name="price" />
        </View>
        <View>
          <Text>Description</Text>
          <TextField
            multiline
            numberOfLines={6}
            maxLength={40}
            control={control}
            name="serviceDescribe"
          />
        </View>
      </View>
    </Modal>
  );
};

export default ModalEdit;

const styles = StyleSheet.create({});
