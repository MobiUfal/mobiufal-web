import React, { useReducer, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import { CardMedia } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      alignContent: 'center',
      flexWrap: 'wrap',
      width: 400,
      height: 970,
      margin: 'auto'
    },
    header: {
      textAlign: 'center',
      background: '#29AAD7',
      color: '#fff'
    },
    title: {
      fontFamily: 'Arial',
      fontWeight: 'bold'
    },
    card: {
      marginTop: theme.spacing(10),
      marginBottom: theme.spacing(10)
    },
    image: {
      width: 'calc(20vw * 0.45)',
      backgroundColor: '#29AAD7',
    },
    grid: {
      spacing: 0,
      alignItems: 'center',
      backgroundColor: '#29AAD7'
    },
    loginBtn: {
      marginTop: theme.spacing(2),
      backgroundColor: '#F93633',
      textTransform: 'none',
      flexGrow: 1
    }
  })
);

//state type

type State = {
  email: string
  senha:  string
  isButtonDisabled: boolean
  helperText: string
  isError: boolean
};

const initialState:State = {
  email: '',
  senha: '',
  isButtonDisabled: true,
  helperText: '',
  isError: false
};

type Action = { type: 'setEmail', payload: string }
  | { type: 'setSenha', payload: string }
  | { type: 'setIsButtonDisabled', payload: boolean }
  | { type: 'loginSuccess', payload: string }
  | { type: 'loginFailed', payload: string }
  | { type: 'setIsError', payload: boolean };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setEmail': 
      return {
        ...state,
        email: action.payload
      };
    case 'setSenha': 
      return {
        ...state,
        senha: action.payload
      };
    case 'setIsButtonDisabled': 
      return {
        ...state,
        isButtonDisabled: action.payload
      };
    case 'loginSuccess': 
      return {
        ...state,
        helperText: action.payload,
        isError: false
      };
    case 'loginFailed': 
      return {
        ...state,
        helperText: action.payload,
        isError: true
      };
    case 'setIsError': 
      return {
        ...state,
        isError: action.payload
      };
  }
}

const Login = () => {
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.email.trim() && state.senha.trim()) {
     dispatch({
       type: 'setIsButtonDisabled',
       payload: false
     });
    } else {
      dispatch({
        type: 'setIsButtonDisabled',
        payload: true
      });
    }
  }, [state.email, state.senha]);

  const handleLogin = () => {
    if (state.email === 'abc@email.com' && state.senha === 'senha') {
      dispatch({
        type: 'loginSuccess',
        payload: 'Login realizado com sucesso'
      });
    } else {
      dispatch({
        type: 'loginFailed',
        payload: 'Email ou senha incorreto(s)'
      });
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.keyCode === 13 || event.which === 13) {
      state.isButtonDisabled || handleLogin();
    }
  };

  const handleEmailChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      dispatch({
        type: 'setEmail',
        payload: event.target.value
      });
    };

  const handleSenhaChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      dispatch({
        type: 'setSenha',
        payload: event.target.value
      });
    }
  return (
    <form className={classes.container} noValidate autoComplete="off">
      <Card className={classes.card}>
        <Grid className={classes.grid} container direction="column">
          <CardHeader className={classes.header} classes={{title: classes.title}} title="MobiUfal" titleTypographyProps={{variant: 'h3'}}/>
          <CardMedia className={classes.image} component="img" image={require('./material/logo-mobi.png')} title="CardMedia Image"/>    
        </Grid>
        <CardContent>
          <div>
            <TextField
              error={state.isError}
              fullWidth
              id="email"
              type="email"
              label="Email"
              placeholder="Email"
              margin="normal"
              onChange={handleEmailChange}
              onKeyPress={handleKeyPress}
            />
            <TextField
              error={state.isError}
              fullWidth
              id="senha"
              type="password"
              label="Senha"
              placeholder="Senha"
              margin="normal"
              helperText={state.helperText}
              onChange={handleSenhaChange}
              onKeyPress={handleKeyPress}
            />
            </div>
        </CardContent>
        <Link href="#" variant="body2"> {'Esqueceu a senha?'} </Link>
        <CardActions>
          <Button
            variant="contained"
            size="large"
            color="primary"
            className={classes.loginBtn}
            onClick={handleLogin}
            disabled={state.isButtonDisabled}>
            Login
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}

export default Login;