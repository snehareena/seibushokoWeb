import { Paper, Title, TextInput, Button, Container, Group, PasswordInput } from '@mantine/core';
import { useStyles } from '../../../../styles/reset_pwd_styles';
import { useForm } from "@mantine/form";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { patch } from '@/pages/api/apiUtils';
import { notifications } from '@mantine/notifications';
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default function ResetPassword() {
    const { classes } = useStyles();
    const router = useRouter();
    const { t } = useTranslation('common')
    const { id, token } = router.query;

    const form = useForm({
      initialValues:{
        newPassword:'',
        confirmPassword:'',
      },
      validate:{
        newPassword:(value) => {
          if (!value) {
            return 'Password is required';
          }
          if (value.length < 8) {
            return 'Your password must contain at least 8 characters';
          }
          if (!/[!@#$%^&*]/.test(value)) {
            return 'Your password should have a special symbol';
          }
          return null;
        },
        confirmPassword:(value, values)=>{
          if (value !== values.newPassword) {
            return 'Passwords do not match';
          }
          return null;
        }
        
      }
    })

    const handleSubmit = async (e) => {
      e.preventDefault();
      form.validate();
      if (!form.validate().hasErrors) {
        updatePassword();
      }

    };

    const updatePassword = async() => {
      const encodedPassword = btoa(form.values.confirmPassword)
      const result = {
        password: encodedPassword,
        token: token,
        user_id_base64: id,
      }
      try{
      const endpoint = `/auth/password_reset_complete/`
      const response = await patch(endpoint,result);
      notifications.show({
        title:t('Success'),
        message: t(response),
        color:'green'
      })
      router.push('/login')
    }catch(error){
      notifications.show({
        title: t('Error'),
        message:t(error),
        color:'red',
      });
    }
    }
  
    return (
      <Container size={460} my={30}>
        <Title className={classes.title} align="center">
          {t('Reset your password!')}
        </Title>
  
        <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <form onSubmit={handleSubmit}>
          <PasswordInput
           label="New Password" 
           required
           name='newPassword'
           {...form.getInputProps("newPassword")}
          />
          <PasswordInput
            label="Confirm Password"
            required
            name='confirmPassword'
            {...form.getInputProps("confirmPassword")}
          />
          <Group position="right" mt="lg" className={classes.controls}>
            <Button type='submit' className={classes.control}>Reset password</Button>
          </Group>
          </form>
        </Paper>
      </Container>
    );
  }
  export const getStaticPaths = async () => {

    return {
        paths: [],
        fallback: 'blocking'
    }
  }
  export const getStaticProps = async ({
    locale,
  }) => ({
    props: {
      ...(await serverSideTranslations(locale ?? 'en', [
        'common'
      ])),
    },
  })


