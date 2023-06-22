import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getInvitationById, updateInvitationById } from 'apiSdk/invitations';
import { Error } from 'components/error';
import { invitationValidationSchema } from 'validationSchema/invitations';
import { InvitationInterface } from 'interfaces/invitation';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { MeInterface } from 'interfaces/me';
import { UserInterface } from 'interfaces/user';
import { getUs } from 'apiSdk/us';
import { getUsers } from 'apiSdk/users';

function InvitationEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<InvitationInterface>(
    () => (id ? `/invitations/${id}` : null),
    () => getInvitationById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: InvitationInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateInvitationById(id, values);
      mutate(updated);
      resetForm();
      router.push('/invitations');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<InvitationInterface>({
    initialValues: data,
    validationSchema: invitationValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Invitation
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="invited_email" mb="4" isInvalid={!!formik.errors?.invited_email}>
              <FormLabel>Invited Email</FormLabel>
              <Input
                type="text"
                name="invited_email"
                value={formik.values?.invited_email}
                onChange={formik.handleChange}
              />
              {formik.errors.invited_email && <FormErrorMessage>{formik.errors?.invited_email}</FormErrorMessage>}
            </FormControl>
            <FormControl id="role" mb="4" isInvalid={!!formik.errors?.role}>
              <FormLabel>Role</FormLabel>
              <Input type="text" name="role" value={formik.values?.role} onChange={formik.handleChange} />
              {formik.errors.role && <FormErrorMessage>{formik.errors?.role}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<MeInterface>
              formik={formik}
              name={'me_id'}
              label={'Select Me'}
              placeholder={'Select Me'}
              fetcher={getUs}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.name}
                </option>
              )}
            />
            <AsyncSelect<UserInterface>
              formik={formik}
              name={'inviter_id'}
              label={'Select User'}
              placeholder={'Select User'}
              fetcher={getUsers}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.email}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'invitation',
  operation: AccessOperationEnum.UPDATE,
})(InvitationEditPage);
