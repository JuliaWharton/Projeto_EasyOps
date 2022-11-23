import {React, useState, useEffect} from 'react'
import axios from 'axios'
import {
    AppBar,
    Box,
    Button,
    Toolbar,
    Typography,
    TextField,Container,
    Grid,Paper,
    MenuItem,
  } from '@mui/material';


const Alternativas = ({state,onChangeAlternativaCorreta, setAlternativa}) =>{
    return (state.tipoQuestao === 'objetiva') ?(
      <div>
        <TextField
          className='col-md-12'
          type='text'
          placeholder='Alternativa A'
          name = 'alternativaA'
          id = 'alternativaA'
          value={state.alternativaA ? state.alternativaA : ''}
          onChange={setAlternativa}
          sx={{     
            width: 1000,
            ml: 5, mt: 6
          }} 
        >
        </TextField>
        <TextField
          className='col-md-12'
          type='text'
          placeholder='Alternativa B'
          name = 'alternativaB'
          id = 'alternativaB'
          value={state.alternativaB ? state.alternativaB : ''}
          onChange={setAlternativa}
          sx={{     
            width: 1000,
            ml: 5, mt: 1
          }}
        >
        </TextField>
        <TextField
          className='col-md-12'
          type='text'
          placeholder='Alternativa C'
          name = 'alternativaC'
          id = 'alternativaC'
          value={state.alternativaC ? state.alternativaC : ''}
          onChange={setAlternativa}
          sx={{     
            width: 1000,
            ml: 5, mt: 1
          }}
        >
        </TextField>
        <TextField
          className='col-md-12'
          type='text'
          placeholder='Alternativa D'
          name = 'alternativaD'
          id = 'alternativaD'
          value={state.alternativaD ? state.alternativaD : ''}
          onChange={setAlternativa}
          sx={{     
            width: 1000,
            ml: 5, mt: 1
          }}
        >
        </TextField>
        <TextField
          className='col-md-12'
          type='text'
          placeholder='Alternativa E'
          name = 'alternativaE'
          id = 'alternativaE'
          value={state.alternativaE ? state.alternativaE : ''}
          onChange={setAlternativa}
          sx={{     
            width: 1000,
            ml: 5, mt: 1
          }}
        >
        </TextField>

        <TextField
              margin="normal"
              required
              fullWidth
              name="alternativaCorreta"
              label="Alternativa Correta"
              id="alternativaCorreta"
              onChange={onChangeAlternativaCorreta}
              select
              sx = {{width: 200 , height: 8, ml: 2, mt: 1}}
            >
            <MenuItem value={"a"}>A</MenuItem>
            <MenuItem value={"b"}>B</MenuItem>
            <MenuItem value={"c"}>C</MenuItem>
            <MenuItem value={"d"}>D</MenuItem>
            <MenuItem value={"e"}>E</MenuItem>
            </TextField>

      </div>
    ) : (
    <div></div>
    );
  }
 

const CadastroQuestaoForm = () => {

  const [state, setState] = useState({
    descricao: '',
    alternativaA: '',
    alternativaB: '',
    alternativaC: '',
    alternativaD: '',
    alternativaE: '',
    questaoCorreta: 'a',
    tipoQuestao: 'discursiva'
  });
 

  const setInputValue = (property, val) => {
    setState({
      ...state,
      [property]: val
    });
  }


   const cadastrar = async() =>{
    if (!state.descricao) {
      return;
    }

  //   axios.post('https://enade-backend.herokuapp.com/questao/save', {
  //     descricao: this.state.descricao,
  //     alternativaA: this.state.alternativaA,
  //     alternativaB: this.state.alternativaB,
  //     alternativaC: this.state.alternativaC,
  //     alternativaD: this.state.alternativaD,
  //     alternativaE: this.state.alternativaE,
  //     questaoCorreta: this.state.tipoQuestao == 1 ? '' : this.state.questaoCorreta,
  //     tipoQuestao: this.state.tipoQuestao
  //   })
  //     .then((response) => {
        alert('Questão cadastrada com sucesso!!!');
  //     })

 }


  const onChangeAlternativaCorreta = (e) => {
    const { name, value } = e.target;
    setInputValue('questaoCorreta', value)
  }

  const onChangeTipoQuestao = (e) => {
    setInputValue('tipoQuestao', e.target.value);
}

const setAlternativa = (e) => {
  const { name, value } = e.target;
  setInputValue(name, value);
}
const setDescricao = (e) => {
  const { name, value } = e.target;
  setInputValue(name, value);
}

  const voltar = () => {

  return (
       <div>
         <br></br>
         <br></br>
         <br></br>
         <br></br>
       </div>
     )
   }


    return (
        <Box sx={{ display: 'flex' }}>

        <AppBar position="absolute">
          <Toolbar sx={{ pr: '24px' }}>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
 
            >
              Cadastro de Questões
            </Typography>
  
          </Toolbar>
        </AppBar>
  
          
        <div style={{
              backgroundImage: "url(/xa.jpg)",
              backgroundRepeat: "no-repeat",
              maxWidth: 'false',
              backgroundSize: 'cover', 
              backgroundColor: "#48D1CC", top: 0,
              bottom: 0,
              right: 0,
              left: 0,
              position: 'absolute',
          }}>
 
          <Toolbar />
  
                   <div style={{
                  backgroundColor: 'white',
                  marginLeft: '5%',
                  marginTop: '2%',
                  marginRight: '5%',
                  borderRadius: '10px'
              }}>
          <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ ml: 4}}
            >
            Características da questão
            </Typography>
      
        < TextField
          className='col-md-12'
          type='text'
          placeholder='Descrição'
          name = 'descricao'
          value={state.descricao ? state.descricao : ''}
          onChange={setDescricao }
          sx = {{width: 1250 , height: 8, ml: 5, mt: 1}}
        >
        </TextField>

        <TextField
              margin="normal"
              required
              fullWidth
              name="tipoQuestao"
              label="Tipo de Questão"
              id="tipoQuestao"
              onChange={onChangeTipoQuestao}
              select
              sx = {{width: 1250 , height: 8, ml: 5, mt: 9}}
            >
              <MenuItem  value= {'discursiva'}>discursiva</MenuItem>
              <MenuItem value = {'objetiva'}>objetiva</MenuItem>
            </TextField>

    <Alternativas state = {state} setInputValue = {setInputValue} onChangeAlternativaCorreta = {onChangeAlternativaCorreta} setAlternativa = {setAlternativa} />
  
        <Button
        sx={{ width:500 , mt: 3, mb: 2, ml: 15, mb: 5}}
        variant="contained"
          onClick={cadastrar}
        >
          Cadastrar
        </Button>
        <Button
        sx={{ width:500, mt:2.5,  ml: 10, mb: 5}}
        variant="contained"
          onClick={voltar}
        >
          Voltar
         </Button>
      </div>
    </div>
      </Box>
    )
  }


export default CadastroQuestaoForm;