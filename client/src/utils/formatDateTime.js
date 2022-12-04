function adicionaZero(numero) {
  if (numero <= 9) return '0' + numero;
  else return numero;
}

export const formatDateTime = (date) => {
  return (
    adicionaZero(date.getDate().toString()) +
    '/' +
    adicionaZero(date.getMonth() + 1).toString() +
    '/' +
    date.getFullYear() +
    ' ' +
    adicionaZero(date.getHours()) +
    ':' +
    adicionaZero(date.getMinutes())
  );
};

export const formatTime = (time = 600) => {
  const horas = Number.parseInt(time / 3600);
  const minutos = Number.parseInt(time / 60) - horas * 3600;
  const segundos = time - horas * 3600 - minutos * 60;
  return (
    adicionaZero(horas) +
    ':' +
    adicionaZero(minutos) +
    ':' +
    adicionaZero(segundos)
  );
};
