import {React, useState, useEffect} from 'react';
import axios from 'axios';
import {
    AppBar,
    Box,
    Button,
    Toolbar,
    Typography,
    TextField,
    MenuItem,
    Card
  } from '@mui/material';
  import LocalizationProvider from '@mui/lab/LocalizationProvider';
  import AdapterDateFns from '@mui/lab/AdapterDateFns';
  import DateTimePicker from '@mui/lab/DateTimePicker';
  import ptBRLocale from 'date-fns/locale/pt-BR';



const CadastroProvaForm = () => {

  const [state, setState] = useState({
    dataInicio: '',
    dataFim: '',
    questoes: [],
    // questoes: [ {
    //   descricao:
    //     'A retomada da Antiguidade clássica pela perspectiva do patrimônio cultural foi realizada com o objetivo de:',
    //   tipoQuestao: 'objetiva',
    //   alternativaA: 'afirmar o ideário cristão para reconquistar a grandeza perdida.',
    //   alternativaB:  'utilizar os vestígios restaurados para justificar o regime político.',
    //   alternativaC: 'difundir os saberes ancestrais para moralizar os costumes sociais.',
    //   alternativaD: 'refazer o urbanismo clássico para favorecer a participação política.',
    //   alternativaE: 'recompor a organização republicana para fortalecer a administração estatal.',
    //   },
    
    // {
    //   descricao:
    //     'A retomada da Antiguidade clássica pela perspectiva do patrimônio cultural foi realizada com o objetivo de:',
    //   tipoQuestao: 'objetiva',
     
    //     alternativaA:'afirmar o ideário cristão para reconquistar a grandeza perdida.',
    //     alternativaB:'utilizar os vestígios restaurados para justificar o regime político.',
    //     alternativaC:'difundir os saberes ancestrais para moralizar os costumes sociais.',
    //   alternativaD: 'refazer o urbanismo clássico para favorecer a participação política.',
    //   alternativaE: 'recompor a organização republicana para fortalecer a administração estatal.',
    
    // },
    // {
    //   descricao:
    //     '“A Técnica de PCR tem inúmeras aplicações. Na clínica, por exemplo, é utilizado no diagnóstico de doenças infecciosas e na detecção de eventos patológicos raros. Na criminalística, um único fio de cabelo pode identificar o doador.” (O que é PCR? in www.madasa.com.br. Acesso em 17/outubro/2007). Esclareça por que a técnica de PCR (reação em cadeia da polimerase) e a técnica de hibridização, conjugadas, podem ser um método eficaz em medicina preventiva nos casos de detecção de anomalias genéticas.',
    // tipoQuestao: 'discursiva'
    //   },],
    questoesSelecionadas: [],
    turmasSelecionadas: []
  });
  
  const [turmas, setTurmas] = useState([]);

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

  const setValor = (e) => {
    const { name, value } = e.target;
    setInputValue(name, value);
  }

  // const  buscarQuestoes = async() => {
  //   axios.get('https://.herokuapp.com/questao/findallativa')
  //     .then((response) => {
  //       this.setInputValue('questoes', response.data)
  //       console.log(response.data)
  //     })

  // }
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

          <Typography
              component="h1"
              variant="h6"
              color="inherit"
              sx ={{mt: 5, ml: 4}}
 
            >Detalhes da Prova</Typography>

        <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBRLocale}>
        <DateTimePicker
          label="Data Inicio"
          renderInput={(params) => <TextField {...params} sx={{ pb: 2, mr: 2, ml:4}} />}
          value={state.dataInicio}
          onChange={setValor}
        />
        </LocalizationProvider>

         <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBRLocale}>
        <DateTimePicker
          label="Data Fim"
          renderInput={(params) => <TextField {...params} sx={{ pb: 2 }} />}
          value={state.dataFinal}
          onChange={setValor}
        />
      </LocalizationProvider>
      <TextField
              fullWidth
              value={state.turmaEscolhida}
              required
              onChange={setValor}
              select 
              label="Turma(s)"
              id="turmaEscolhida"
              multiple
              sx={{ maxWidth: 300, ml: 5 }}
            >
              {turmas.map((t) => (
                <MenuItem value={t}>{t}
              </MenuItem>
              ))}
            </TextField>
                
            <TextField
              fullWidth
              value={state.turmaEscolhida}
              required
              onChange={setValor}
              label="Duração (em minutos)"
              id="turmaEscolhida"
              sx={{ maxWidth: 300, ml: 5 }}
            >
             
            </TextField>


          <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ ml: 4}}
            >
            Escolha as questões
            </Typography>
      
        
            {state.questoes.map((questao, index) => {
          if (questao.tipoQuestao === 'discursiva') {
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
            <Card.Title>{questao.descricao}</Card.Title>
            <Card.Footer>{questao.estado === 1 ? 'Ativo' : 'Não ativo'}</Card.Footer>
          </Card.Body>
        </Card>

    
            </div>
          } else {
            return <div></div>
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
        // onClick={cadastrar}
        >
          Cadastrar
        </Button>
        <Button
        sx={{ width:500, mt:2.5,  ml: 10, mb: 5}}
        variant="contained"
        //  href="/DashboardProfessor"
        >
          Voltar
         </Button>
      </div>
    </div>
      </Box>
    )
  }


export default CadastroProvaForm;