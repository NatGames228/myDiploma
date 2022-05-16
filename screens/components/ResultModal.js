import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { COLORS } from '../../constants/theme'

const ResultModal = ({
  isModalVisible,
  correctCount,
  incorrectCount,
  totalCount,
  handleOnClose,
  handleRetry,
  handleHome,
}) => {
  return (
    <Modal
      animationType={'slide'}
      transparent={true}
      visible={isModalVisible}
      onRequestClose={handleOnClose}>
      <View
        style={styles.resultView}>
        <View
          style={styles.bg}>
          <Text style={{ fontSize: 28, color: COLORS.black }}>Results</Text>
          <View
            style={styles.answers}>
            <View style={{ alignItems: 'center', padding: 20 }}>
              <Text style={{ color: COLORS.success, fontSize: 30 }}>
                {correctCount}
              </Text>
              <Text style={{ fontSize: 16 }}>Correct</Text>
            </View>
            <View style={{ alignItems: 'center', padding: 20 }}>
              <Text style={{ color: COLORS.error, fontSize: 30 }}>
                {incorrectCount}
              </Text>
              <Text style={{ fontSize: 16 }}>Incorrect</Text>
            </View>
          </View>
          <Text style={{ opacity: 0.8 }}>
            {totalCount - (incorrectCount + correctCount)} Unattempted
          </Text>

          {/* Try agian */}
          <TouchableOpacity
            style={styles.tryAgain}
            onPress={handleRetry}>
            <Ionicons name="refresh" style={{ color: COLORS.white, transform: [{ rotateY: '180deg' }] }} />
            <Text
              style={styles.tryAgainText}>
              Try Again
            </Text>
          </TouchableOpacity>
          {/* Go Home */}
          <TouchableOpacity
            style={styles.goHome}
            onPress={handleHome}>
            <Ionicons name="home" style={{ color: COLORS.primary }} />
            <Text
              style={styles.goHomeText}>
              Go Home
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ResultModal;

const styles = StyleSheet.create({
  resultView: {
    flex: 1,
    backgroundColor: COLORS.black + '90',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bg: {
    backgroundColor: COLORS.white,
    width: '90%',
    borderRadius: 5,
    padding: 40,
    alignItems: 'center',
  },
  answers: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tryAgain: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    width: '100%',
    backgroundColor: COLORS.primary,
    marginTop: 20,
    borderRadius: 50,
  },
  tryAgainText: {
    textAlign: 'center',
    color: COLORS.white,
    marginLeft: 10,
  },
  goHome: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    width: '100%',
    backgroundColor: COLORS.primary + '20',
    marginTop: 20,
    borderRadius: 50,
  },
  goHomeText: {
    textAlign: 'center',
    color: COLORS.primary,
    marginLeft: 10,
  },
});

