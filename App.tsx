import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const toBin = (number: string | undefined) => {

    if (number === undefined) {
      setErroMessage('Número inválido')
      return
    }
    let value = Number(number.trim())
    const bin = []

    while (true) {
      bin.unshift(value % 2)
      value = Math.floor(value / 2)

      if (value === 0) {

        break;
      }
    }
    let result = ''
    for (var num of bin) {
      result += num
    }
    setErroMessage('')
    setResult(result)
  }

  const toDec = (number: string | undefined) => {
    const regex = /^[01]+$/
    if (number === undefined || !regex.test(number.toString())) {
      setErroMessage('Número inválido')
      return
    }

    const num = number.toString()

    let result = 0
    for (let i: number = 0; i < num.toString().length; i++) {
      result += Number(num[i]) * Math.pow(2, (num.toString().length - 1) - i)
    }
    setErroMessage('')
    setResult(`${result}`)
  }



  const [result, setResult] = useState<string>()
  const [number, setNumber] = useState<string>()
  const [error, setErroMessage] = useState<string>()
  const regex = /^[01]+$/


  return (
    <View style={styles.container}>

      <Text style={styles.title}>{'Binario <-> Decimal'}</Text>
      <Text style={styles.subTitle}>Conversor</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o número!"
        keyboardType="numeric"
        onChangeText={setNumber}
      />
      <Text style={error ? styles.error : null}>{error}</Text>

      <Pressable style={styles.button} onPress={() => toBin(number ? number : undefined)}>
        <Text style={styles.text}>{'Decimal -> Binario'}</Text>
      </Pressable>
      <Pressable
        style={regex.test(number || '') ? styles.button : [styles.button, styles.buttonDisabled]}
        onPress={() => toDec(number ? number : undefined)}
        disabled={regex.test(number || '') ? false : true}
      >
        <Text style={styles.text}>{'Binario -> Decimal'}</Text>
      </Pressable>

      <Text style={styles.resultTitle}>Resultado</Text>
      <Text style={styles.result}>{result}</Text>

      <StatusBar style="dark" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    paddingTop: 50
  },
  subTitle: {
    fontSize: 25
  },
  input: {
    width: '70%',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    textAlign: 'center'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#113467',
    margin: 10

  },
  buttonDisabled: {
    backgroundColor: 'gray'
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  resultTitle: {
    fontSize: 30,
    marginTop: 20,
    marginBottom: 10
  },
  result: {
    fontSize: 40
  },
  error: {
    marginTop: 10,
    marginBottom: 20,
    color: 'red'
  }
});
