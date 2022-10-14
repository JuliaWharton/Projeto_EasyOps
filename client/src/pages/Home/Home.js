import React from 'react';
import { Button } from '@mui/material';


const Home = () => {
    return (
        <div style={{
            backgroundImage: "url(/xa.jpg)",
            backgroundRepeat: "no-repeat",
            maxWidth: 'false',
            backgroundSize: 'cover', backgroundPositionX: "center", backgroundPositionY: "center",
            backgroundColor: "#48D1CC", top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            position: 'absolute',
        }}>
            <div style={{
                border: '2px solid #FF6347',
                marginLeft: '2%',
                marginTop: '2%',
                marginRight: '2%',
                bottom: 2,
                borderRadius: '5px'
            }}>

                <div style={{
                    marginTop: '10%',
                    fontFamily: 'Montserrat',
                    fontSize: '30px',
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    color: '#FF6347'
                }}>
                    <h2>Bem Vindo à EasyOps!</h2>
                </div>
                <div style={{
                    marginTop: '-2.5%',
                    fontFamily: 'Montserrat',
                    fontSize: '20px',
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    color: '#FF6347'
                }}>
                    <h2> Acesse seu portal de avaliações digitais.</h2>
                </div>

                <Button style={{
                    display: 'inline-block',
                    fontSize: '15px',
                    textAlign: 'center',
                    padding: '7px',
                    width: '10%',
                    cursor: 'pointer',
                    alignItems: 'center',
                    position: 'relative',
                    left: '45%',
                    marginTop: '8%',
                    marginBottom: '14%'
                }}
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    href='/login'
                >
                    Login
                </Button>
                
            </div>
        </div>
    )

}

export default Home;