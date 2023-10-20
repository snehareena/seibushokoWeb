import { Box, Button } from '@mantine/core'
import React from 'react'
import { useTranslation } from "next-i18next";

const SubmitButtons = (props) => {
    const {isEditing,isSubmitting}=props;
    const { t } = useTranslation('common');

  return (
    <Box span={12} style={{marginTop:30}}>
    <Button
      loading={isSubmitting}
      type="submit"
      onClick={(e) => props.onSubmit(e)}
    >
       {isEditing ? t('Update') : t('Submit')}
    </Button>
  {!isEditing &&  <Button
   loading={isSubmitting}
      type="submit"
      onClick={(e) => props.onSubmit(e, "addanother")}
      ml='sm'
    >
      {t('Save and add another')}
    </Button>}
  </Box> 
  )
}

export default SubmitButtons