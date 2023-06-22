import * as yup from 'yup';

export const invitationValidationSchema = yup.object().shape({
  invited_email: yup.string().required(),
  role: yup.string().required(),
  me_id: yup.string().nullable(),
  inviter_id: yup.string().nullable(),
});
