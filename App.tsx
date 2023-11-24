import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  Button,
  StatusBar,
} from 'react-native';
import choices from './data/mockData.js';

function App(): JSX.Element {
  const [userChoice, setUserChoice] = useState('');
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [userPoint, setUserPoint] = useState(0);
  const [pcPoint, setPcPoint] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const handleUserChoice = item => {
    setUserChoice(item);
    setSelectedChoice(item);
    const randomIndex = Math.floor(Math.random() * choices.length);
    setComputerChoice(choices[randomIndex].name);
    setTimeout(() => {
      const gameResult = winner(item, choices[randomIndex].name);
      setResult(gameResult);
      updateScores(gameResult);
    }, 0);
  };

  const updateScores = gameResult => {
    if (gameResult.includes('Kazandınız')) {
      setUserPoint(pointUser => pointUser + 1);
    } else if (gameResult.includes('Kaybettiniz')) {
      setPcPoint(pointPc => pointPc + 1);
    }
  };

  useEffect(() => {
    if (pcPoint == 3 || userPoint == 3) {
      setShowModal(true);
    }
  }, [pcPoint, userPoint]);

  const winner = (user, computer) => {
    if (user === computer) {
      return 'Berabere... :/';
    } else if (
      (user === 'TAŞ' && computer === 'MAKAS') ||
      (user === 'MAKAS' && computer === 'KAĞIT') ||
      (user === 'KAĞIT' && computer === 'TAŞ')
    ) {
      return 'Kazandınız... :)';
    } else {
      return 'Kaybettiniz... :(';
    }
  };

  const resetGame = () => {
    setPcPoint(0);
    setUserPoint(0);
    setShowModal(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="pink" />
      <View style={styles.textCenter}>
        <Text style={styles.headerTittle}>TAŞ KAĞIT MAKAS</Text>
        <Text style={styles.userChoiceText}>Kullanıcının Seçimi:</Text>
        <View style={styles.TouchableOpacity}>
          {choices.map((item, idx) => (
            <TouchableOpacity
              onPress={() => handleUserChoice(item.name)}
              key={idx}>
              <Image
                style={[
                  styles.image,
                  selectedChoice === item.name && styles.selectedItem,
                ]}
                source={item.image}
              />
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.userChoiceText}>
          Kullanıcı:{userPoint}, Bilgisayar:{pcPoint}
        </Text>
        <View style={styles.textCenter}>
          <Text style={styles.userChoiceText}> Bilgisayrın Seçimi:</Text>
          {computerChoice ? (
            <Image
              style={[styles.image, styles.selectedItem]}
              source={choices.find(c => c.name === computerChoice)?.image}
            />
          ) : (
            <Text style={styles.userChoiceText}>
              Pc seçim yapmanızı bekliyor!
            </Text>
          )}
        </View>
      </View>
      {/* Modal */}
      <Modal visible={showModal} animationType="slide" transparent>
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              {userPoint === 3
                ? 'Kazandınız! Tebrikler!'
                : 'Kaybettiniz! Tekrar deneyin.'}
            </Text>
            <Button title="Yeniden Başla" onPress={resetGame} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink',
  },
  headerTittle: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
  },
  textCenter: {
    alignItems: 'center',
    gap: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  TouchableOpacity: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  userChoiceText: {
    fontSize: 22,
  },
  selectedItem: {
    borderColor: 'black',
    borderWidth: 2,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, .6)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 22,
    marginBottom: 10,
  },
});

export default App;
