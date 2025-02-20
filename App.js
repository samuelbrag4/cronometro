import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default function App() {
  const [numero, setNumero] = useState('00:00:00.000');
  const [botao, setBotao] = useState('marcha');
  const [ultimo, setUltimo] = useState(null);
  const [milisegundos, setMilisegundos] = useState(0);
  const [ativa, setAtiva] = useState(false);

  useEffect(() => {
    let intervalo = null;
    if (ativa) {
      const inicio = Date.now() - milisegundos

      intervalo = setInterval(() => {
        setMilisegundos(Date.now - inicio);
      }, 10);
    } else if (!ativa) {
      clearInterval(intervalo);
    }
    return () => clearInterval(intervalo); 
  }, [ativa]);

  useEffect(() => {
    const hh = String(Math.floor(milisegundos / 3600000)).padStart(2, '0');
    const mm = String(Math.floor((milisegundos % 3600000) / 60000)).padStart(2, '0');
    const ss = String(Math.floor((milisegundos % 60000) / 1000)).padStart(2, '0');
    const ms = String(milisegundos % 1000).padStart(3, '0');

    setNumero(`${hh}:${mm}:${ss}.${ms}`);
  }, [milisegundos]);

  function marcha() {
    setAtiva(!ativa);
    setBotao(ativa ? 'MARCHA' : 'PARAR');
  }

  function limpar() {
    setAtividade(false);
    setUltimo(numero);
    setMilisegundos(0);
    setNumero('MARCHA');
  }

  return (
    <View style={styles.container}>
      <Image source={require('./src/cronometro.png')} style={styles.cronometro} />
      <Text style={styles.timer}>{numero}</Text>
      <View style={styles.btnArea}>
        <TouchableOpacity style={styles.btn} onPress={marcha}>
          <Text style={styles.btnTexto}>{botao}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={limpar}>
          <Text style={styles.btnTexto}>LIMPAR</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.areaUltima}>
        <Text style={styles.textoCorrida}>
          {ultimo ? 'Último tempo: ' + ultimo : ''}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00aeef',
  },
  timer: {
    color: '#FFF',
    fontSize: 65,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    marginTop: -150,
  },
  btnArea: {
    flexDirection: 'row',
    marginTop: 70,
    height: 40,
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    height: 40,
    margin: 17,
    borderRadius: 9,
  },
  btnTexto: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00aeef',
  },
  areaUltima: {
    marginTop: 40,
  },
  textoCorrida: {
    fontSize: 25,
    fontStyle: 'italic',
    color: '#FFF',
  },
  cronometro: {
    width: 250,
    height: 250,
    marginTop: -50,
  },
})