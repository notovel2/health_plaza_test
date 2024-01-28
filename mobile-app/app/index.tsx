import { Button, StyleSheet, TextInput, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { QUESTIONS } from '@/constants/Questions';
import { LeaderboardItem, Question } from '@/types/types';
import QuestionInfo from '@/components/QuestionInfo';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TabOneScreen() {
  const [score, setScore] = useState(0);
  const [current, setCurrent] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [newHighscore, setNewHightscore] = useState(false);
  const [showRetry, setShowRetry] = useState(false);
  const [text, setText] = useState('');
  const [leaderboard, setLeaderboard] = useState<LeaderboardItem[]>([]);

  const isComplete = current >= questions.length;

  const onAnswer = (choiceId: number) => {
    const question = questions[current];
    if (question.answer === choiceId) {
      setScore(score + 1);
    }
    setCurrent(current + 1);
    if (current + 1 >= questions.length) {
      onComplete();
    }
  };

  const onComplete = async () => {
    const data = await AsyncStorage.getItem('leaderboard');
    const lb: LeaderboardItem[] = data ? JSON.parse(data) : [];
    setLeaderboard(lb);
    const lastLeaderScore = lb[lb.length - 1]?.score ?? 0;
    if (lastLeaderScore < score || lb.length < 10) {
      setNewHightscore(true);
    } else {
      setShowRetry(true);
    }
  }

  const addToLeaderBoard = async () => {
    const newLeaderboard = [...leaderboard];
    newLeaderboard.push({ title: text, score });
    newLeaderboard.sort((a, b) => b.score - a.score);
    await AsyncStorage.setItem('leaderboard', JSON.stringify(newLeaderboard));
    setLeaderboard(newLeaderboard);
    setShowRetry(true);
    setNewHightscore(false);
  };

  const onTextChange = (text: string) => {
    setText(text);
  }

  const reset = () => {
    setScore(0);
    setCurrent(0);
    const newQuestions = [...QUESTIONS];
    newQuestions.sort(() => Math.random() - 0.5);
    setQuestions(newQuestions);
    setText('');
    setShowRetry(false);
    setNewHightscore(false);
  }

  useEffect(() => {
    reset();
  }, []);

  return (
    <View style={styles.container}>
      {!isComplete && <QuestionInfo question={questions[current]} onAnswer={onAnswer} />}
      {isComplete && newHighscore && (
        <>
          <Text>{`Your score is ${score} and reach to new leaderboard`}</Text>
          <TextInput style={{ borderWidth: 1 }} onChangeText={onTextChange} value={text} placeholder="Enter your name" />
          <Button
            title="Submit"
            onPress={addToLeaderBoard}
          />
        </>
      )}
      {isComplete && showRetry && (
        <>
          <Text>Leader board</Text>
          {leaderboard.map((lb) => (
            <Text>{lb.title} {lb.score}</Text>
          ))}
          <Button
            title="Try again"
            onPress={reset}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
