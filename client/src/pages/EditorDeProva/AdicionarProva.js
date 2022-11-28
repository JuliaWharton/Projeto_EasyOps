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
    Card
  } from '@mui/material';
  import LocalizationProvider from '@mui/lab/LocalizationProvider';
  import AdapterDateFns from '@mui/lab/AdapterDateFns';
  import DatePicker from '@mui/lab/DatePicker';
  import ptBRLocale from 'date-fns/locale/pt-BR';



const CadastroProvaForm = () => {

  const [state, setState] = useState({
    data: '',
    questoes: [],
    questoesSelecionadas: []
  });
 

  const setInputValue = (property, val) => {
    setState({
      ...state,
      [property]: val
    });
  }

  const componentDidMount = async() =>{
    try {
      this.buscarQuestoes()
    } catch (error) {

    }
  }


  const  buscarQuestoes = async() => {
    axios.get('https://.herokuapp.com/questao/findallativa')
      .then((response) => {
        this.setInputValue('listaQuestoes', response.data)
        console.log(response.data)
      })

  }
    const cadastrar = async() => {
      if (this.state.listaQuestoesAdicionadas.length < 36) {
        alert(`Você não selecionou 36 questões, faltam ${36 - this.state.listaQuestoesAdicionadas.length}`)
      } else {
        axios.post('https://.herokuapp.com/prova/save', {
          data: this.state.data,
          questoes: this.state.questoesSelecionadas
        })
          .then((response) => {
            alert('Prova cadastrado com sucesso!!!');
            const element = (
              <div>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
              </div>
            )
        
          })
          .catch((err) => {
            alert("Erro ao cadastrar prova!!!");
          })
      }
    }

    const adicionaQuestao = (questao) => {
      const list = state.questoesSelecionadas.copy();
      list.push(questao)
      setInputValue('listaQuestoesAdicionadas', list)
    }
  
    const removeQuestao = (questao) => {
      const list = state.questoesSelecionadas.copy();
      list.pop(questao)
      this.setInputValue('questoesSelecionadas', list)
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
   const [date, setDate] = useState(new Date());

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
              Cadastro de prova
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

     <h4>Data da prova:</h4>
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBRLocale}>
        <DatePicker
          label="Data"
          renderInput={(params) => <TextField {...params} sx={{ pb: 2 }} />}
          value={state.date}
          placeholder="dd/mm/aaaa"
          onChange={setInputValue}
        />
      </LocalizationProvider>
 
          <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ ml: 4}}
            >
            Escolha as questões e a turma
            </Typography>
      
        
            {state.questoes.map((questao, index) => {
          if (questao.tipoQuestao === 1) {
            return <div>

         <Button
          variant= {state.questoesSelecionadas.includes(questao) ? "danger" : null}
          disabled={false}
          onClick={() => state.questoesSelecionadas.includes(questao) ? this.removeQuestao(questao) : this.adicionaQuestao(questao)}
          text ={state.questoesSelecionadas.includes(questao) ? 'Remover' : 'Adicionar'}
        >
       
        </Button>
              
        <Card>
          <Card.Header>{`Questão ${index + 1}`}</Card.Header>
          <Card.Body>
            <Card.Title className=" d-flex justify-content-left">{questao.descricao}</Card.Title>
            <br></br>
            <Card.Footer className="text-muted">{questao.estado === 1 ? 'Ativo' : 'Não ativo'}</Card.Footer>
          </Card.Body>
        </Card>

    
            </div>
          } else {
            return <div>

              <Button
          variant= {state.questoesSelecionadas.includes(questao) ? "danger" : null}
          disabled={false}
          onClick={() => state.questoesSelecionadas.includes(questao) ? removeQuestao(questao) : adicionaQuestao(questao)}
          text ={state.questoesSelecionadas.includes(questao) ? 'Remover' : 'Adicionar'}
        >
       
        </Button>
              
              <Card>
          <Card.Header>{`Questão ${index + 1}`}</Card.Header>
          <Card.Body>
            <Card.Title>{questao.descricao}</Card.Title>
            <Card.Text>{`a) ${questao.alternativaA}`}</Card.Text>
            <Card.Text>{`b) ${questao.alternativaB}`}</Card.Text>
            <Card.Text>{`c) ${questao.alternativaC}`}</Card.Text>
            <Card.Text>{`d) ${questao.alternativaD}`}</Card.Text>
            <Card.Text>{`e) ${questao.alternativaE}`}</Card.Text>
            <br></br>
            <Card.Footer className="text-muted">{questao.estado === 1 ? 'Ativo' : 'Não ativo'}</Card.Footer>
          </Card.Body>
        </Card>

            </div>
          }

        })}
   
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


export default CadastroProvaForm;