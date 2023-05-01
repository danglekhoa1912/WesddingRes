import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useMemo} from 'react';
import {IUser, IUserRes} from '../../../../type/user';
import {useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../../store';
import {convertImageToFile} from '../../../../utils/convertImageToFile';
import {ImagePicker, TextField} from '../../../components';
import Modal from '../../../components/Modal';
import DatePicker from '../../../components/DatePicker';
import moment from 'moment';

interface IModalEdit {
  handleClose: () => void;
  open: boolean;
  data?: IUser;
  onReLoadData: () => void;
}

const ModalEdit = ({handleClose, open, data, onReLoadData}: IModalEdit) => {
  const {control, reset, handleSubmit, getValues} = useForm<IUserRes>({
    defaultValues: {
      name: '',
      mobile: '',
      role: '',
      email: '',
    },
  });

  const mode = useMemo(() => {
    if (!!data) return 'edit';
    return 'create';
  }, [data]);

  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = (data: IUserRes) => {
    // dispatch(
    //   mode === 'edit'
    //     ? updateLobby({
    //         ...data,
    //       })
    //     : addLooby({
    //         ...data,
    //       }),
    // ).then(() => {
    //   handleClose();
    //   onReLoadData();
    // });
  };

  useEffect(() => {
    if (data) {
      (async () => {
        reset({
          id: data?.id,
          name: data?.name,
          birthday: moment(new Date(data?.birthday)).format('yyyy-MM-DD'),
          email: data?.email,
          mobile: data?.mobile,
          role: data?.role,
          avatar: await convertImageToFile(data?.avatar || ''),
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
      header={{title: 'Edit Staff'}}>
      <View
        style={{
          paddingVertical: 12,
        }}>
        <ImagePicker
          initPreviewImg={data?.avatar}
          label="Image"
          disabled={false}
          control={control}
          name="image"
        />
        <View>
          <Text>Name</Text>
          <TextField control={control} name="name" />
        </View>
        <View>
          <Text>Email</Text>
          <TextField control={control} name="email" />
        </View>
        <View>
          <Text>Number phone</Text>
          <TextField control={control} name="mobile" />
        </View>
        <View>
          <Text>Birth Day</Text>
          <DatePicker control={control} name="birthday" />
        </View>
      </View>
    </Modal>
  );
};

export default ModalEdit;

const styles = StyleSheet.create({});
