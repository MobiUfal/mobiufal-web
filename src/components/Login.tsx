import React, { useReducer, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import { CardMedia} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      width: 400,
      margin: `${theme.spacing(0)} auto`
    },
    loginBtn: {
      marginTop: theme.spacing(2),
      backgroundColor: '#F93633',
      textTransform: 'none',
      flexGrow: 1
    },
    header: {
      textAlign: 'center',
      background: '#29AAD7',
      color: '#fff'
    },
    card: {
      marginTop: theme.spacing(10),
      marginBottom: theme.spacing(7.6)
    },
    image: {
      height: '25vh',
      width: 'calc(20vw * 0.40)',
      marginLeft: '140px',
      backgroundColor: '#29AAD7'
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
        <CardHeader className={classes.header} title="MobiUfal" titleTypographyProps={{variant: 'h3'}}/>
        <CardMedia className={classes.image} component="img" image={require('./material/logo-mobi.png')} title="CardMedia Image"/>
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
        <CardActions>
          <Button
            variant="contained"
            size="large"
            color="secondary"
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