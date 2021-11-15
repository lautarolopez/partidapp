import { Field, Formik } from 'formik';
import React from 'react';

import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from '@chakra-ui/react';

import { COLORS } from '../utils/constants';

interface Props {
  handleComment: (nickname: string, comment: string) => void;
}

const NewComment: React.FC<Props> = ({ handleComment }: Props) => {
  const validateNickName = (value: any) => {
    let error;
    if (!value) {
      error = 'Name is required';
    } else if (value.toLowerCase().includes('puto')) {
      error = 'Please do not use homophobic nicknames.';
    }
    return error;
  };

  const validateComment = (value: any) => {
    let error;
    if (!value) {
      error = 'Comment is required';
    } else if (value.length > 360) {
      error = 'Comment too long. Please go to Twitter.';
    }
    return error;
  };

  const handleFormSubmit = (values: any, actions: any) => {
    actions.resetForm();
    handleComment(values.nickname, values.comment);
  };

  return (
    <Formik
      initialValues={{ nickname: '', comment: '' }}
      onSubmit={handleFormSubmit}
    >
      {({ handleSubmit }) => (
        <Flex width="100%" mt="5" direction="column">
          <Flex width="100%" alignItems="flex-end">
            <Field name="nickname" validate={validateNickName}>
              {({ field, form }: { field: any; form: any }) => (
                <FormControl
                  id="nickname"
                  isRequired
                  width="70%"
                  isInvalid={form.errors.nickname && form.touched.nickname}
                >
                  <FormLabel htmlFor="nickname">Nickname</FormLabel>
                  <Input
                    {...field}
                    id="nickname"
                    placeholder="Choose a nickname"
                  />
                  <FormErrorMessage>{form.errors.nickname}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button
              type="submit"
              color="white"
              bgColor="brand.100"
              width="20%"
              ml="auto"
              onClick={() => {
                handleSubmit();
              }}
              _hover={{
                backgroundColor: COLORS.PRIMARY,
                color: 'white',
              }}
            >
              Send
            </Button>
          </Flex>
          <Field name="comment" validate={validateComment}>
            {({ field, form }: { field: any; form: any }) => (
              <FormControl
                id="comment"
                isRequired
                isInvalid={form.errors.comment && form.touched.comment}
              >
                <FormLabel htmlFor="comment">New comment</FormLabel>
                <Textarea
                  {...field}
                  placeholder="Leave a comment on the match"
                  resize="block"
                />
                <FormErrorMessage>{form.errors.comment}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
        </Flex>
      )}
    </Formik>
  );
};

export default NewComment;
