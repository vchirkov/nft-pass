import React, { useMemo } from 'react'
import styled, { createGlobalStyle } from 'styled-components'

import { useSelector } from 'react-redux'
import {
    Box,
    H5,
    H2,
    Label,
    Input,
    FormGroup,
    Button,
    ButtonGroup,
    Text,
    MessageBox,
    SoftwareBrothers,
    themeGet
} from '@adminjs/design-system'
import { useTranslation, ReduxState } from 'adminjs';

const GlobalStyle = createGlobalStyle`
  html, body, #app {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }
`

const Wrapper = styled(Box)`
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
`

const StyledLogo = styled.img`
  max-width: 200px;
  margin: ${themeGet('space', 'md')} 0;
`

export type AuthProps = {
    type: 'login' | 'register';
    link: string;
    action: string;
    message?: string;
}

export const Auth: React.FC<AuthProps> = (props) => {
    const { type, action, link, message } = props
    const { translateLabel, translateButton, translateProperty, translateMessage } = useTranslation()
    const branding = useSelector((state: ReduxState) => state.branding)

    const buttons = useMemo(() =>{
        switch (type){
            case 'register':
                return [
                    {
                        label: translateButton('register'),
                        variant: 'primary',
                        as: Button
                    },
                    {
                        label: translateButton('navigateLogin'),
                        href: link
                    }
                ];
            case 'login':
            default:
                return [
                    {
                        label: translateButton('login'),
                        variant: 'primary',
                        as: Button
                    },
                    {
                        label: translateButton('register'),
                        href: link
                    }
                ];
        }
    }, [type, link]);

    return (
        <React.Fragment>
            <GlobalStyle/>
            <Wrapper flex variant="grey">
                <Box bg="white" height="440px" flex boxShadow="auth" width={[1, 2 / 3, 'auto']}>
                    <Box
                        bg="primary100"
                        color="white"
                        p="x3"
                        width="380px"
                        flexGrow={0}
                        display={['none', 'none', 'block']}
                        position="relative"
                    >
                        <H2 fontWeight="lighter">{translateLabel('authWelcome')}</H2>
                        <Text fontWeight="lighter" mt="default">
                            {translateMessage('authWelcome')}
                        </Text>
                        <Text textAlign="center" p="xxl">
                        </Text>
                    </Box>
                    <Box
                        as="form"
                        action={action}
                        method="POST"
                        p="x3"
                        flexGrow={1}
                        width={['100%', '100%', '480px']}
                    >
                        <H5 marginBottom="xxl">
                            {branding.logo ? (
                                <StyledLogo
                                    src={branding.logo}
                                    alt={branding.companyName}
                                />
                            ) : branding.companyName}
                        </H5>
                        {message && (
                            <MessageBox
                                my="lg"
                                message={message.split(' ').length > 1 ? message : translateMessage(message)}
                                variant="danger"
                            />
                        )}
                        <FormGroup>
                            <Label required>{translateProperty('email')}</Label>
                            <Input name="email"
                                   required
                                   placeholder={translateProperty('email')}/>
                        </FormGroup>
                        <FormGroup>
                            <Label required>{translateProperty('password')}</Label>
                            <Input
                                type="password"
                                name="password"
                                required
                                placeholder={translateProperty('password')}
                                autoComplete="new-password"
                            />
                        </FormGroup>
                            <ButtonGroup buttons={buttons}/>
                        <Text mt="xl" textAlign="center">
                        </Text>
                        <Text mt="xl" textAlign="center">
                        </Text>
                    </Box>
                </Box>
                {branding.softwareBrothers ? (<Box mt="xxl"><SoftwareBrothers/></Box>) : null}
            </Wrapper>
        </React.Fragment>
    )
}

export default Auth
