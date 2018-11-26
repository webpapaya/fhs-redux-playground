# Run locally
docker-compose up

# Run db migrations
docker-compose run flyway -url=jdbc:postgresql://db:5432/compup -user=dbuser -password=password migrate
docker-compose restart server


# What I personally want:
- Unified form fields API
    - DateInput with Picker behaves exactly the same as a TextInput
- Split UI logic from data fetching logic (makes it possible to develop in storybook)
    - Prevent this by the API (eg. use HOCs)
- Create forms with minimal boilerplate
    - Automatically handle server errors (eg. username already exists, API needs to change here)
    - Automatically prevent double submission (automatically disable form while submitting)
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