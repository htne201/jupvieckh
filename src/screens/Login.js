import React, { Component, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  ToastAndroid,

} from 'react-native';
import Utils from "../../app/Utils";
import LogoApp from "../componentsApp/LogoApp";
import { Images } from "../Images";
import { colors } from "../styles";
import { reSize, reText } from "../styles/size";
import axios from 'axios';

const url = "https://nhutthang-jupviec-nodejs.onrender.com/api/create-new-client";


const Login = (props) => {
  const [trangThaiDangNhap, setTrangThaiDangNhap] = useState(true)
  const [visibleMatKhau, setVisibleMatKhau] = useState(true)
  const [visibleReMatKhau, setVisibleReMatKhau] = useState(true)
  const [hoten, setHoTen] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')

  const onLogin = async () => {
    if (trangThaiDangNhap) {
      Utils.replace({ props: props }, "Home")
    } else {
      await axios.post(url, {
        email: email,
        password: password,
        hoten: hoten,

      })
        .then((res) => {
          if (res?.status) {
            ToastAndroid.show(res?.data?.message || res?.data?.errMessage || 'Đăng ký thành công!', 3000)
          } else {
            ToastAndroid.show('Có lỗi xảy ra, vui lòng thử lại sau!', 3000)
          }
        }).catch((err) => {
          ToastAndroid.show('Có lỗi xảy ra, vui lòng thử lại sau!', 3000)
        })
    }
  }

  const onRegister = () => {
    if (trangThaiDangNhap) {
      //set thành trạng thái đăng ký
      setTrangThaiDangNhap(false)
    }
    else {
      //set về thành trạng thái đăng nhập
      setTrangThaiDangNhap(true)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.grayBorder }}>
      <ScrollView showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flex: 1, alignItems: 'center' }}
      >
        <LogoApp Styles={{ marginTop: reSize(100), marginBottom: reSize(30) }} />
        {/* <Text style={{ fontSize: reText(16), color: colors.Jup, marginTop: reSize(5) }}>{`Ứng dụng dành cho`}</Text>
        <Text style={{ fontSize: reText(16), fontWeight: 'bold', color: colors.Jup, marginTop: reSize(5), marginBottom: reSize(50) }}>{`NHÂN VIÊN GIÚP VIỆC`}</Text> */}
        <TextInput
          placeholder="Họ và tên"
          value={hoten}
          onChangeText={setHoTen}
          style={styles.styleTextInput}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.styleTextInput}
        />

        <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
          <View style={styles.styleTextInput}>
            <TextInput
              placeholder="Mật khẩu"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={visibleMatKhau}
              style={{ flex: 1, padding: 0 }}
            />
            <TouchableOpacity
              onPress={() => { setVisibleMatKhau(!visibleMatKhau) }}
            >
              <Image
                source={visibleMatKhau ? Images.icHidden : Images.icView}
                style={{ width: reSize(18), height: reSize(18), tintColor: 'gray' }}
                resizeMode='contain'
              />
            </TouchableOpacity>
          </View>
        </View>

        {!trangThaiDangNhap && <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
          <View style={styles.styleTextInput}>
            <TextInput
              placeholder="Nhập lại mật khẩu"
              secureTextEntry={visibleReMatKhau}
              value={rePassword}
              onChangeText={setRePassword}
              style={{ flex: 1, padding: 0 }}
            />
            <TouchableOpacity
              onPress={() => { setVisibleReMatKhau(!visibleReMatKhau) }}
            >
              <Image
                source={visibleReMatKhau ? Images.icHidden : Images.icView}
                style={{ width: reSize(18), height: reSize(18), tintColor: 'gray' }}
                resizeMode='contain'
              />
            </TouchableOpacity>
          </View>
        </View>}

        {trangThaiDangNhap && <TouchableOpacity
          style={{ alignSelf: 'flex-end', marginRight: '6%', paddingVertical: reSize(30) }}
        >
          <Text style={{ color: colors.Jup }}>{`Quên mật khẩu?`}</Text>
        </TouchableOpacity>}

        {/*button đăng nhập */}
        <TouchableOpacity style={styles.loginBtn} onPress={() => { onLogin() }}>
          <Text style={styles.loginText}>{trangThaiDangNhap ? `ĐĂNG NHẬP` : `ĐĂNG KÝ NGAY`}</Text>
        </TouchableOpacity>

        {/* button tạo tài khoản */}
        <TouchableOpacity style={[styles.loginBtn, { backgroundColor: colors.Viec }]} onPress={() => onRegister()}>
          <Text style={styles.loginText}>{trangThaiDangNhap ? `TẠO TÀI KHOẢN` : 'QUAY LẠI ĐĂNG NHẬP'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
};
export default Login;
const styles = StyleSheet.create({
  loginBtn: {
    width: "90%",
    borderRadius: reSize(10),
    alignItems: 'center',
    justifyContent: "center",
    marginTop: 10,
    paddingVertical: reSize(15),
    backgroundColor: colors.Jup,
  },
  loginText: {
    color: colors.white,
    fontWeight: 'bold'
  },
  styleTextInput: {
    width: "90%",
    backgroundColor: colors.white,
    marginVertical: reSize(5),
    padding: reSize(10),
    borderRadius: reSize(6),
    flexDirection: 'row',
    alignItems: 'center'
  }

});