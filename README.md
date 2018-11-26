# Run locally
docker-compose up

# Run db migrations
docker-compose run flyway -url=jdbc:postgresql://db:5432/compup -user=dbuser -password=password migrate
docker-compose restart server


# What I personally want:
- Form itself
    - Validations-server
        - Right now server only returns the first error not all of them
    - Validations-client
        - define schema (I like formiks validations)
        - (should be unit testable -> NO react-test-renderer)
    - Submission (isSubmitting state, ...)
    - Must be able to develop in storybook (logic must move to somewhere else)
    - Automatically prevent double submission (automatically disable form while submitting)
    - Ability to reuse Form Component for Create and Update
    - Notifications???? (part of form itself or part of react/redux)
- Form fields
    - Easy to add new types of form fields (eg. IBAN Input, no god component)
        - e.g. via reducers (should be unit testable -> NO react-test-renderer)
    - Unified API across ALL input fields (DateInput needs to behave exactly like a TextInput)
    - Unified look and feel/by project (should be easy to customize between projects)
    - Only minimal client validation (eg. field is required/format/etc.)

eg.:
```
import React from 'react';
import { isForm } from '../../components/core/form';
import TextInput from '../../components/core/text-input';
import PasswordInput from '../../components/core/password-input';
import Button from '../../components/core/button';
import LogoWithHeading from '../../components/core/logo-with-heading';
import AuthenticationLinks from '../../components/core/authentication-links';
import t from './translate';

export const SignIn = isForm(({ isSubmitting, errors }) => (
  <div>
    <LogoWithHeading>{ t('welcome') }<br />Crewmeister</LogoWithHeading>
    <TextInput
      placeholder={ t('emailOrUsername') }
      name="identifier"
      errors={ errors.username }
      required
    />
    <PasswordInput
      placeholder={ t('password') }
      name="password"
      errors={ errors.password }
      required
    />
    <Button type="submit" loading={ isSubmitting } spacingBottom>{ t('submit') }</Button>
    <AuthenticationLinks signUp resetPassword />
  </div>
));

export default SignIn;
```